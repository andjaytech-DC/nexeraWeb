# Deployment runbook — nexaraWeb (Nexara Global Solutions)

This document describes how this project is deployed and configured, what each
environment variable gates at runtime, and how to verify a deployment without
trusting optimistic output. It reflects the code **as it exists here** — this
is not the jambodweep/J Digital runbook, and no launch gate exists in this repo.

## 1. What this app actually is at runtime

| Concern | Mechanism |
| --- | --- |
| Site pages | Next.js App Router, statically prerendered |
| Contact inquiries | `POST /api/inquiries` → validate → rate-limit (10/10 min) → idempotent persist |
| Inquiry/talent storage | Private Vercel Blob when connected (`BLOB_STORE_ID` + `VERCEL_OIDC_TOKEN`, or `BLOB_READ_WRITE_TOKEN`); JSON files under `.data/` in local dev only |
| Careers listings/applications | PostgreSQL via Prisma (`Job`, `JobApplication`, `TalentProfile`) |
| Admin area `/admin` | Password + HMAC-signed cookie (`ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`) |
| Owner email | Optional Resend / webhook notification after an inquiry is accepted (see §6) |
| Webhook fan-out | Optional `CONTACT_WEBHOOK_URL`, `CAREERS_WEBHOOK_URL` |

**Critical storage boundary:** inquiries are *not* stored in PostgreSQL. The
`Inquiry` Prisma model is unused at runtime. The admin panel reads the browser's
local store — on production, confirm received inquiries through the Blob store
or your webhook/email target, not the database.

## 2. Environment variables and what breaks without them

Full list with comments: `.env.example`. Audit any environment with:

```
npm run check:config            # report only
npm run check:config -- --enforce  # exit 1 when a REQUIRED item is missing
```

| Variable | Status without it | Production verdict |
| --- | --- | --- |
| `ADMIN_PASSWORD` | `/admin` stays locked | **Required** |
| `ADMIN_SESSION_SECRET` | Falls back to `ADMIN_PASSWORD` — acceptable but weaker; rotating one rotates both | **Required** (distinct value) |
| `DATABASE_URL` | Careers jobs/applications answer 503; placeholder URLs are detected and rejected | **Required** |
| Blob store (`BLOB_STORE_ID` + `VERCEL_OIDC_TOKEN` or `BLOB_READ_WRITE_TOKEN`) | Inquiries and resume uploads are rejected with 503 rather than silently lost | **Required** |
| `CONTACT_TO_EMAIL` / `CONTACT_TO_NAME` | Records still stored, but no delivery routing and no notification recipient | Recommended |
| `RESEND_API_KEY` or `EMAIL_WEBHOOK_URL` | Nothing is emailed — response records `emailed: false` truthfully | Recommended |
| `CONTACT_WEBHOOK_URL` / `CAREERS_WEBHOOK_URL` | No fan-out | Optional |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL derived from the Vercel domain | Optional |

Never set a variable that disables a check to make a gate pass. If a check
reports "unavailable", that is the state until the backend is actually reachable.

## 3. Deploying to Vercel

1. Import the repository into Vercel (framework: Next.js; `postinstall` runs
   `prisma generate`; zero-config build otherwise).
2. Set the **required** variables from §2 (or connect a Blob store + Postgres
   from the Vercel marketplace — connecting sets the Blob variables via OIDC
   automatically).
3. Deploy, then point the production domain at the deployment.

## 4. Database provisioning (careers only)

The repo has **no `prisma/migrations/` directory** — `prisma migrate deploy`
(`npm run db:migrate`) has nothing to apply and is not the provisioning path.
Two honest options:

- **Quick path:** `npx prisma db push` against a `DATABASE_URL` that points at
  the production database. Schema is created/patched directly.
- **Migrations path (recommended):** create a baseline once,
  `npx prisma migrate dev --name init`, commit `prisma/migrations/`, and from
  then on `npm run db:migrate` works as a release step in CI/CD.

Safety rails already in `src/lib/prisma.ts`: a placeholder
(`user:password@…`) `DATABASE_URL` never reaches a real server, and database
failures degrade to file storage (careers) or 503s — never fake successes.
The schema is additive so far; `db push` migrations have not dropped data.

## 5. Post-deploy smoke test

Run against the deployed domain, not localhost:

1. `GET <domain>/api/health` → `{"status":"ok","checks":{"app":"ok","db":"ok"|"unavailable","blob":"configured"|"not-configured"}}`
   - `db:"unavailable"` or `blob:"not-configured"` on a production deployment is
     a **failing smoke test**: inquiries would 503 and careers would be down.
2. Submit a test inquiry through `/contact` → expect reference `INQ/…` in the
   response JSON, and the record to be retrievable from the Blob store.
3. Open `/admin`, log in with `ADMIN_PASSWORD`; an incorrect password must be
   rejected.
4. Browse `/careers`, open a job, confirm the listing serves (DB health).
5. `npx prisma studio` against the production URL or the hosting console to
   confirm PostgreSQL tables exist.

## 6. Email delivery

Implemented in `src/lib/email.ts`, wired into `/api/inquiries` *after* storage
succeeds:

- `RESEND_API_KEY` → sends via Resend's HTTP API to `CONTACT_TO_EMAIL`.
- else `EMAIL_WEBHOOK_URL` → POSTs `{ type: "contact.inquiry.email", record }`
  to your own relay.
- else nothing is sent; the response records
  `emailed: false, emailDetail: "No email provider configured…"`.

Truth constraints:
- `sent: true` means **the provider accepted the request**, not that anything
  reached a mailbox. Before go-live, send one real test inquiry with `EMAIL_FROM`
  set to a **verified domain** sender — `onboarding@resend.dev` is a test sender
  that only delivers to the account owner.
- Email failures never fail the submission: storage has already succeeded.

Tests (`npm run test:contact`) cover: disabled truthfully, missing recipient
truthfully, webhook 2xx → `sent: true`, webhook 5xx → `sent: false`.

## 7. Rollback

Redeploy the previous build from the Vercel dashboard. Database and Blob
schemas are additive; rolling back code does not orphan stored records.

## 8. Known limitations (do not hand-wave these)

- The admin inquiry list reads browser-local storage; server-stored B2C
  inquiries must be reviewed via Blob/webhook/email until an admin API is built.
- No launch gate exists in this repository. `docs/` contains no evidence
  checklist; treat "deployed" as "smoke test in §5 passed", nothing less.
- Careers talent-profile uploads fall back to local files in dev only;
  production requires the Blob store.

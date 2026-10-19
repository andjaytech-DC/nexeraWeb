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

### 3a. Dashboard-first path (no CLI)

1. In vercel.com/new, import the GitHub repo (`andjaytech-DC/nexeraWeb`).
   Framework detection is automatic; every route is prerendered or a route
   handler, so no build overrides are needed.
2. **Before the first deploy**, open the project's *Settings → Environment
   Variables* and add the §2 items. The truth audit of what's outstanding is
   `npm run check:config` (it never prints values). `ADMIN_PASSWORD` and
   `ADMIN_SESSION_SECRET` are your local secrets — copy them from the local
   `.env` file.
3. In the project's *Storage* tab, connect one Postgres store and one Blob
   store. Connecting them injects their environment variables automatically —
   do not hand-edit those.
4. Deploy, then point the production domain at the deployment.
5. Email notifications: create an API key at resend.com/api-keys and set
   `RESEND_API_KEY` plus `EMAIL_FROM`. A verified sending domain is not needed
   for launch *if* notifications go to your own inbox — the unverified test
   sender (`onboarding@resend.dev`) delivers only to the Resend account
   owner's mailbox, which is exactly the owner-notification case. Verify the
   domain before relying on delivery to anyone else.

### 3b. CLI path

1. `npx vercel login`, then `npx vercel link`.
2. `npx vercel env pull .env.vercel` to inspect, `npx vercel env add` to set
   variables (or connect stores in the dashboard as above — CLI cannot create
   marketplace stores).
3. `npx vercel --prod` to release.

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

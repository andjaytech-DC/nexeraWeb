# Nexara Global Solutions — nexeraWeb

Marketing and intake site for Nexara Global Solutions: services, industries,
solutions, a Solution Finder, careers, and an admin panel.

## Stack

Next.js (App Router) · React 19 · Tailwind CSS 4 · Prisma/PostgreSQL · Vercel Blob

## Getting started

```bash
npm install
cp .env.example .env      # fill in values; see docs/deployment.md §2
npm run dev
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Development, production build, production server |
| `npm run typecheck` / `lint` | TypeScript and ESLint (lint currently reports pre-existing warnings, no errors) |
| `npm run test` | Recommendation-engine checks |
| `npm run test:intake` | HTTP tests against the intake endpoints (spins its own server) |
| `npm run test:contact` | Validation/webhook/email module tests (no server needed) |
| `npm run check:config` | Truthful audit of deployment configuration; `-- --enforce` fails on missing REQUIRED items |
| `npm run db:push` / `db:migrate` | Apply the Prisma schema / deploy migrations once a baseline exists |

## Architecture notes

- **Inquiries** (`/contact` → `POST /api/inquiries`) persist to Vercel Blob when
  configured, else to `.data/` files in local dev; on Vercel without Blob they
  are rejected with 503 rather than lost.
- **Careers** use PostgreSQL via Prisma. The repo ships **without a migrations
  folder** — provision with `prisma db push` or create a baseline first
  (docs/deployment.md §4).
- **Admin** (`/admin`) is secured by `ADMIN_PASSWORD` + `ADMIN_SESSION_SECRET`
  via a signed cookie.
- **Email** to the owner after an inquiry is accepted is optional and
  truthfully reported: see `src/lib/email.ts` and docs/deployment.md §6.

## Deployment

See [`docs/deployment.md`](docs/deployment.md) for the full runbook: required
environment variables and what breaks without them, Vercel + PostgreSQL
provisioning, post-deploy smoke tests (`/api/health`, test inquiry via
`/contact`, admin login), rollback, and known limitations.

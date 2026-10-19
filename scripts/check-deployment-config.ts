/**
 * Deployment configuration audit for nexeraWeb.
 *
 * Reports, truthfully and without echoing values, which production
 * configuration is in place. Never fabricates readiness: a placeholder
 * DATABASE_URL or an unset admin password is reported as missing even if
 * something is technically set.
 *
 * Usage:
 *   npm run check:config            → report only (always exit 0)
 *   npm run check:config -- --enforce → exit 1 if a REQUIRED item is missing
 *
 * See docs/deployment.md for what each item gates at runtime.
 */
import "dotenv/config";

interface Item {
  name: string;
  requirement: "REQUIRED" | "recommended" | "optional";
  configured: boolean;
  note: string;
}

const env = (k: string): string | undefined => {
  const v = process.env[k];
  return v && v.trim() ? v : undefined;
};

// DATABASE_URL counts only when it is a real URL, not the scaffold placeholder.
const dbUrl = env("DATABASE_URL");
const dbReal = Boolean(dbUrl && !dbUrl.includes("user:password@"));

const adminPassword = env("ADMIN_PASSWORD");
const adminSecret = env("ADMIN_SESSION_SECRET");
const secretEqualsPassword = Boolean(
  adminPassword && adminSecret && adminSecret === adminPassword,
);

const blobConfigured = Boolean(
  env("BLOB_READ_WRITE_TOKEN") ||
    (env("BLOB_STORE_ID") && env("VERCEL_OIDC_TOKEN")),
);

const emailConfigured = Boolean(env("RESEND_API_KEY") || env("EMAIL_WEBHOOK_URL"));

const items: Item[] = [
  {
    name: "ADMIN_PASSWORD",
    requirement: "REQUIRED",
    configured: Boolean(adminPassword),
    note: "Without it /admin stays locked.",
  },
  {
    name: "ADMIN_SESSION_SECRET",
    requirement: "REQUIRED",
    configured: Boolean(adminSecret) && !secretEqualsPassword,
    note: secretEqualsPassword
      ? "Set, but identical to ADMIN_PASSWORD — set a distinct value."
      : "Signs the admin session cookie; must differ from ADMIN_PASSWORD.",
  },
  {
    name: "DATABASE_URL (real)",
    requirement: "REQUIRED",
    configured: dbReal,
    note: dbUrl && !dbReal
      ? "Still the scaffold placeholder (user:password@…) — careers DB is unavailable."
      : "Serves the careers tables (PostgreSQL). Inquiries do not use the database.",
  },
  {
    name: "Blob store",
    requirement: "REQUIRED",
    configured: blobConfigured,
    note: "Durable intake storage. On Vercel without it, inquiries and resume uploads answer 503.",
  },
  {
    name: "CONTACT_TO_EMAIL",
    requirement: "recommended",
    configured: Boolean(env("CONTACT_TO_EMAIL")),
    note: "Notification recipient and inquiry-delivery routing.",
  },
  {
    name: "Email provider",
    requirement: "recommended",
    configured: emailConfigured,
    note: "RESEND_API_KEY or EMAIL_WEBHOOK_URL. Without either, inquiries are stored but no email is sent — the response says so.",
  },
  {
    name: "CONTACT_WEBHOOK_URL",
    requirement: "optional",
    configured: Boolean(env("CONTACT_WEBHOOK_URL")),
    note: "Fan-out of accepted inquiries to an external system.",
  },
  {
    name: "CAREERS_WEBHOOK_URL",
    requirement: "optional",
    configured: Boolean(env("CAREERS_WEBHOOK_URL")),
    note: "Fan-out of careers submissions to an ATS/CRM.",
  },
  {
    name: "NEXT_PUBLIC_SITE_URL",
    requirement: "optional",
    configured: Boolean(env("NEXT_PUBLIC_SITE_URL")),
    note: "Pins the canonical URL; otherwise derived from the Vercel domain.",
  },
];

console.log("\nDeployment configuration audit — nexeraWeb");
console.log("(values are never printed, only whether each item is configured)\n");

let missingRequired = 0;
for (const item of items) {
  const mark = item.configured ? "✓" : "✗";
  const tag =
    item.requirement === "REQUIRED"
      ? "[required]"
      : item.requirement === "recommended"
        ? "[recommended]"
        : "[optional]";
  console.log(`  ${mark} ${item.name.padEnd(24)} ${tag.padEnd(14)} ${item.note}`);
  if (!item.configured && item.requirement === "REQUIRED") missingRequired++;
}

console.log(
  missingRequired === 0
    ? "\nAll REQUIRED deployment configuration is in place."
    : `\n${missingRequired} REQUIRED item(s) missing. See docs/deployment.md.`,
);

if (process.argv.includes("--enforce") && missingRequired > 0) {
  process.exit(1);
}

/**
 * Contact submission — server logic.
 *
 * Validation is pure so unit tests can import it without a runtime.
 * Persistence and webhook fan-out are async handlers that touch the
 * environment.
 */

import { LIMITS, asOptionalText, asText, isValidEmail } from "@/lib/intake-server";

export interface ContactInput {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  preferredContact: string;
  /** Honeypot — must be empty. Named `website` in the payload. */
  website?: string;
  /** Client-supplied idempotency key (optional). */
  idempotencyKey?: string;
  source?: string;
  industry?: string;
  goal?: string;
  challenges?: string[];
  solution?: string;
}

export interface ContactRecord extends Omit<ContactInput, "website"> {
  id: string;
  reference: string;
  createdAt: string;
  /** Optional notification routing, taken from CONTACT_TO_* (server env). */
  toEmail?: string;
  toName?: string;
}

/* ── Validation — pure, fully unit-testable ── */

export const CONTACT_LIMIT = 25 * 1024; // max JSON body, bytes

export type ContactError =
  | { field: "name"; message: string }
  | { field: "email"; message: string }
  | { field: "description"; message: string }
  | { field: "honeypot"; message: string };

const ALLOWED_SERVICES = new Set<string>([
  "Custom Software", "CRM", "ERP", "SCM", "SaaS", "AI Software", "Mobile",
  "iOS", "Enterprise Software", "Cloud & Integration", "BPO",
  "Resource Management", "Other",
]);

const ALLOWED_CONTACT = new Set<string>(["Email", "Phone", "Either"]);

/**
 * Validate a contact payload. Free-text fields are trimmed, whitespace-
 * collapsed and capped; enumerated fields fall back to safe defaults.
 */
export function validateContact(
  body: unknown,
): { ok: true; value: ContactInput } | { ok: false; error: ContactError } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: { field: "description", message: "Invalid submission." } };
  }
  const b = body as Record<string, unknown>;

  // Honeypot first — bots fill it; humans can't see it.
  const website = typeof b.website === "string" ? b.website : "";
  if (website.trim().length > 0) {
    return { ok: false, error: { field: "honeypot", message: "Submission rejected." } };
  }

  const name = asText(b.name, LIMITS.name);
  if (name.length < 2) {
    return { ok: false, error: { field: "name", message: "Full name is required (min 2 characters)." } };
  }

  const email = asText(b.email, LIMITS.email);
  if (!isValidEmail(email)) {
    return { ok: false, error: { field: "email", message: "A valid email address is required." } };
  }

  const description = asText(b.description, LIMITS.description);
  if (description.length < 20) {
    return { ok: false, error: { field: "description", message: "Please describe your project (min 20 characters)." } };
  }

  const service = asText(b.service, LIMITS.service);
  const projectType = asText(b.projectType, LIMITS.projectType);
  const preferredContact = asText(b.preferredContact, LIMITS.preferredContact);

  const raw = b.challenges;
  const challenges: string[] = Array.isArray(raw)
    ? raw
        .filter((c): c is string => typeof c === "string")
        .map((c) => asText(c, 80))
        .filter((c) => c.length > 0)
        .slice(0, 12)
    : [];

  return {
    ok: true,
    value: {
      name,
      email,
      company: asOptionalText(b.company, LIMITS.company),
      phone: asOptionalText(b.phone, LIMITS.phone),
      service: service && ALLOWED_SERVICES.has(service) ? service : "Other",
      projectType: projectType || "Other",
      budget: asOptionalText(b.budget, LIMITS.budget) || "Not specified",
      timeline: asOptionalText(b.timeline, LIMITS.timeline) || "Not specified",
      description,
      preferredContact:
        preferredContact && ALLOWED_CONTACT.has(preferredContact) ? preferredContact : "Email",
      industry: asOptionalText(b.industry, 80),
      goal: asOptionalText(b.goal, 80),
      challenges,
      solution: asOptionalText(b.solution, 120),
      source: asOptionalText(b.source, 80),
      idempotencyKey:
        typeof b.idempotencyKey === "string" ? b.idempotencyKey.slice(0, 128) : undefined,
    },
  };
}


/* ── Storage configuration ── */

export function isBlobStorageConfigured(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN),
  );
}

export function isWebhookConfigured(): boolean {
  return Boolean(process.env.CONTACT_WEBHOOK_URL);
}

/**
 * Persist an accepted submission. Storage hierarchy mirrors careers-file.ts:
 * private Vercel Blob when configured, JSON file under .data/inquiries (never
 * public/) as a local fallback. Record ids are UUIDs or the validated client
 * key, so retries are idempotent.
 */
export async function storeContactSubmission(
  input: Omit<ContactRecord, "id" | "reference" | "createdAt">,
  opts?: { id?: string; now?: string },
): Promise<ContactRecord> {
  const id =
    opts?.id ??
    (typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replace(/-/g, "")
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 14)}`);
  const now = new Date();
  const reference = `INQ/${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}/${String(now.getMinutes()).padStart(2, "0")}/${String(now.getSeconds()).padStart(2, "0")}/${Math.random().toString(16).slice(2, 10).toUpperCase().padStart(8, "0")}`;
  const createdAt = opts?.now ?? now.toISOString();
  const record: ContactRecord = { ...input, id, reference, createdAt };
  const payload = JSON.stringify(record, null, 2);

  if (isBlobStorageConfigured()) {
    const { put } = await import("@vercel/blob");
    await put(`inquiries/${id}.json`, payload, {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
    });
    return record;
  }

  if (process.env.VERCEL) {
    // Epoch filesystem is read-only; surface this as a storage failure, never
    // a fake success.
    throw new Error(
      "Contact storage is not configured on this deployment. Connect a Vercel Blob store or set CONTACT_WEBHOOK_URL.",
    );
  }

  const path = await import("path");
  const { mkdir, writeFile } = await import("fs/promises");
  const dir = path.join(process.cwd(), ".data", "inquiries");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, `${id}.json`), payload, "utf8");
  return record;
}

/**
 * Best-effort webhook fan-out. Rejects on any failure so the caller can report
 * the degraded state truthfully. 8s timeout keeps the endpoint responsive.
 */
export async function forwardContactWebhook(record: ContactRecord): Promise<void> {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) throw new Error("CONTACT_WEBHOOK_URL is not configured.");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "contact.inquiry.created", record }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}.`);
  } finally {
    clearTimeout(timer);
  }
}

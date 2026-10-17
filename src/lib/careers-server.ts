/**
 * Shared helpers for the careers intake routes (apply / resume / talent).
 *
 * All extracted validators here are pure so the unit tests can cover them
 * without a request runtime.
 */

import {
  LIMITS,
  asOptionalText,
  asText,
  isValidEmail,
} from "@/lib/intake-server";

export interface CareersCommonFields {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  portfolioUrl: string;
}

export type CareersError = { message: string };

/** Extract + sanitize the fields every careers form shares. */
export function parseCommonFields(form: FormData): CareersCommonFields {
  return {
    fullName: asText(form.get("fullName"), LIMITS.name),
    email: asText(form.get("email"), LIMITS.email),
    phone: asOptionalText(form.get("phone"), LIMITS.phone),
    location: asOptionalText(form.get("location"), LIMITS.location),
    linkedinUrl: asOptionalText(form.get("linkedinUrl"), LIMITS.url),
    portfolioUrl: asOptionalText(form.get("portfolioUrl"), LIMITS.url),
  };
}

export function requireName(fields: CareersCommonFields): CareersError | null {
  if (!fields.fullName || fields.fullName.length < 2) {
    return { message: "Full name is required" };
  }
  return null;
}

export function requireEmail(fields: CareersCommonFields): CareersError | null {
  if (!fields.email || !isValidEmail(fields.email)) {
    return { message: "Valid email is required" };
  }
  return null;
}

export function requireConsent(form: FormData): CareersError | null {
  if (!form.get("consent")) return { message: "Consent is required" };
  return null;
}

/**
 * Optional URL fields must be valid absolute http(s) URLs when present.
 * Anything else is rejected rather than stored.
 */
export function validateOptionalUrl(value: string): boolean {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function checkProfileUrls(
  fields: Pick<CareersCommonFields, "linkedinUrl" | "portfolioUrl">,
): CareersError | null {
  if (!validateOptionalUrl(fields.linkedinUrl)) {
    return { message: "LinkedIn URL must be a valid http(s) link" };
  }
  if (!validateOptionalUrl(fields.portfolioUrl)) {
    return { message: "Portfolio URL must be a valid http(s) link" };
  }
  return null;
}

/**
 * Whether DB persistence is available. Centralised so every careers route
 * fails with the same truthful 503 instead of returning a fake success.
 */
export function isDbConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  return typeof url === "string" && !url.includes("user:password");
}

/** Careers-specific webhook configuration — separate env var so contact and
 *  careers submissions can go to different downstream systems. */
export function isCareersWebhookConfigured(): boolean {
  return Boolean(process.env.CAREERS_WEBHOOK_URL);
}

/**
 * Best-effort webhook fan-out for careers submissions. Rejects on any failure
 * so the caller can report the degraded state truthfully. 8s timeout keeps the
 * endpoint responsive.
 */
export async function forwardCareersWebhook(record: unknown): Promise<void> {
  const url = process.env.CAREERS_WEBHOOK_URL;
  if (!url) throw new Error("CAREERS_WEBHOOK_URL is not configured.");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "careers.submission.created", record }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}.`);
  } finally {
    clearTimeout(timer);
  }
}

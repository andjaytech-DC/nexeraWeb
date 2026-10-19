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
export interface TalentProfileRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  portfolioUrl: string;
  yearsExperience: string;
  areaOfInterest: string;
  employmentType: string;
  resumeUrl: string;
  resumeName: string;
  resumeType: string;
  resumeSize: number;
  message: string | null;
  consent: boolean;
  status: string;
  createdAt: string;
}

/**
 * File/blob-backed talent profile persistence — used when no database is
 * configured (local dev / demo). Mirrors the contact submission storage.
 */
export async function storeTalentProfile(
  profile: Omit<TalentProfileRecord, "createdAt"> & { createdAt?: string },
): Promise<TalentProfileRecord> {
  const record: TalentProfileRecord = {
    ...profile,
    createdAt: profile.createdAt ?? new Date().toISOString(),
  } as TalentProfileRecord;
  const payload = JSON.stringify(record, null, 2);

  const isBlob = Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN),
  );

  if (isBlob) {
    const { put } = await import("@vercel/blob");
    await put(`talent-profiles/${record.id}.json`, payload, {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return record;
  }

  if (process.env.VERCEL) {
    throw new Error("Talent profile storage is not configured on this deployment.");
  }

  const path = await import("path");
  const { mkdir, writeFile } = await import("fs/promises");
  const dir = path.join(process.cwd(), ".data", "talent-profiles");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, `${record.id}.json`), payload, "utf8");
  return record;
}

export async function listTalentProfiles(): Promise<TalentProfileRecord[]> {
  const isBlob = Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN),
  );

  if (isBlob) {
    try {
      const { list, get } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: "talent-profiles/" });
      const out: TalentProfileRecord[] = [];
      for (const b of blobs) {
        if (!b.pathname.endsWith(".json")) continue;
        try {
          const res = await get(b.pathname, { access: "private" });
          if (res && res.statusCode === 200 && res.stream) {
            const text = await new Response(res.stream).text();
            out.push(JSON.parse(text) as TalentProfileRecord);
          }
        } catch {}
      }
      return out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    } catch {
      return [];
    }
  }

  if (process.env.VERCEL) return [];
  try {
    const path = await import("path");
    const { readdir, readFile } = await import("fs/promises");
    const dir = path.join(process.cwd(), ".data", "talent-profiles");
    const files = await readdir(dir);
    const out: TalentProfileRecord[] = [];
    for (const f of files) {
      if (!f.endsWith(".json")) continue;
      try {
        const raw = await readFile(path.join(dir, f), "utf8");
        out.push(JSON.parse(raw) as TalentProfileRecord);
      } catch {}
    }
    return out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  } catch {
    return [];
  }
}

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

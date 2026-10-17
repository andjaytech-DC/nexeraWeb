/**
 * Shared server-side helpers for public intake endpoints.
 *
 * Server-only module. There is no "use client" here and nothing client-side
 * imports this file — the export constraint is enforced by keeping every
 * consumer a route.ts (server context) or a *.server.* module.
 *
 * Pure where possible so unit tests can import the validators directly.
 */

/* ── Email ── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Structural email check (single DNS-free regex, no network). */
export function isValidEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_RE.test(value);
}

/* ── Length caps ── */

export const LIMITS = {
  name: 120,
  email: 254,
  company: 200,
  phone: 40,
  service: 80,
  projectType: 80,
  budget: 40,
  timeline: 40,
  description: 8000,
  preferredContact: 40,
  notes: 8000,
  status: 20,
  url: 2000,
  areaOfInterest: 120,
  employmentType: 40,
  yearsExperience: 20,
  location: 200,
  coverLetter: 8000,
  message: 8000,
} as const;

export function clamp(value: string, max: number): string {
  return value.length > max ? value.slice(0, max).trimEnd() : value;
}

/** Coerce an unknown value to a trimmed string, capped at `max` chars. */
export function asText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return clamp(value.trim().replace(/\s+/g, " "), max);
}

export function asOptionalText(value: unknown, max: number): string {
  const text = asText(value, max);
  return text;
}

/* ── Safe errors ── */

/**
 * Convert an unknown failure into a user-facing message.
 * Server internals (stacks, paths, provider payloads) never leak to clients.
 */
export function safeMessage(err: unknown, fallback: string): string {
  if (err instanceof Error && err.message && !/Error: |at |ENOENT|EACCES/i.test(err.message)) {
    return err.message.length > 220 ? fallback : err.message;
  }
  return fallback;
}

/* ── Idempotency ── */

/**
 * A client-supplied idempotency key is accepted verbatim only when it looks
 * like a UUID/uuid-ish token. Otherwise a server-side key is minted.
 * Callers use the key as the filename/record id so retries are idempotent.
 */
export function normalizeIdempotencyKey(raw: unknown): { key: string; clientSupplied: boolean } {
  if (typeof raw === "string" && /^[A-Za-z0-9][A-Za-z0-9_-]{7,127}$/.test(raw.trim())) {
    return { key: raw.trim(), clientSupplied: true };
  }
  const key =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
  return { key, clientSupplied: false };
}

/** Shape all JSON responses identically so clients can rely on the contract. */
export function ok(data: Record<string, unknown> = {}) {
  return Response.json({ ok: true, ...data }, { status: 202 });
}

export function fail(status: number, error: string, extra?: Record<string, unknown>) {
  return Response.json({ ok: false, error, ...extra }, { status });
}

/* ── Rate limiting (in-memory, per instance) ── */

interface Bucket {
  count: number;
  resetAt: number;
}

/**
 * Token-bucket-ish limiter keyed by caller identity. In-memory per server
 * instance — appropriate for this deployment's single-instance footprint.
 * Returns the number of seconds to wait when limited, or 0 when allowed.
 */
const buckets = new Map<string, Bucket>();

export function checkRateLimit(
  identity: string,
  opts: { limit: number; windowMs: number; now?: number },
): { limited: boolean; retryAfterSec: number } {
  const now = opts.now ?? Date.now();
  const bucket = buckets.get(identity);
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(identity, { count: 1, resetAt: now + opts.windowMs });
    return { limited: false, retryAfterSec: 0 };
  }
  bucket.count += 1;
  if (bucket.count > opts.limit) {
    return { limited: true, retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
  }
  return { limited: false, retryAfterSec: 0 };
}

/** Test hook — clears all buckets. Not used by routes. */
export function __resetRateLimitBuckets(): void {
  buckets.clear();
}

/**
 * Best-effort caller identity: explicit header first, then the runtime's best
 * guess. Never used for auth — only to scope rate limits.
 */
export function callerIdentity(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return `ip:${first.slice(0, 64)}`;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return `ip:${realIp.trim().slice(0, 64)}`;
  return "ip:unknown";
}

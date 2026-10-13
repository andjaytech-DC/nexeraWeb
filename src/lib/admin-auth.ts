/**
 * Stateless admin session: a signed, HttpOnly cookie.
 *
 * No database is involved — the session is `<expiresAt>.<hmac>` where the
 * HMAC is keyed by ADMIN_SESSION_SECRET (falling back to ADMIN_PASSWORD).
 * This module must stay free of Next.js request APIs so it can be imported
 * from both `src/proxy.ts` and route handlers.
 */

export const ADMIN_COOKIE_NAME = "nexara_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

const encoder = new TextEncoder();

/** ADMIN_PASSWORD is what the operator types; it is required to enable login. */
export function isAdminAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function getSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  return secret && secret.length > 0 ? secret : null;
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );
  return toHex(signature);
}

/** Constant-time comparison so a wrong password cannot be brute-forced by timing. */
export function safeEqual(a: string, b: string): boolean {
  const ab = encoder.encode(a);
  const bb = encoder.encode(b);
  let diff = ab.length ^ bb.length;
  const len = Math.max(ab.length, bb.length);
  for (let i = 0; i < len; i++) {
    diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  }
  return diff === 0;
}

export async function createSessionToken(): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE * 1000;
  const signature = await sign(`admin:${expiresAt}`, secret);
  return `${expiresAt}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  const secret = getSecret();
  if (!secret || !token) return false;

  const separator = token.indexOf(".");
  if (separator <= 0) return false;

  const expiresAtRaw = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;

  const expected = await sign(`admin:${expiresAtRaw}`, secret);
  return safeEqual(signature, expected);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  };
}

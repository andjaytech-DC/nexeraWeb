import {
  asOptionalText,
  callerIdentity,
  checkRateLimit,
  fail,
  normalizeIdempotencyKey,
  ok,
  safeMessage,
} from "@/lib/intake-server";
import {
  CONTACT_LIMIT,
  forwardContactWebhook,
  isWebhookConfigured,
  storeContactSubmission,
  validateContact,
} from "@/lib/contact-server";

/**
 * POST /api/inquiries — accept a contact-form submission.
 *
 * Pipeline: body cap → rate limit → validation → idempotent persist →
 * optional webhook fan-out. Success is only ever returned after the record is
 * durably stored. If storage throws, the client gets a 503 — never a success.
 *
 * Rate limit: 10 submissions / 10 min per caller identity (IP header).
 * Response contract: { ok: true, id } on 202; { ok: false, error[, field] }.
 */
export async function POST(req: Request) {
  // 1. Body size cap before parsing.
  const contentLength = req.headers.get("content-length");
  if (contentLength && Number(contentLength) > CONTACT_LIMIT) {
    return fail(413, "Submission is too large.");
  }

  // 2. Rate limit.
  const identity = `inquiries:${callerIdentity(req)}`;
  const { limited, retryAfterSec } = checkRateLimit(identity, {
    limit: 10,
    windowMs: 10 * 60 * 1000,
  });
  if (limited) {
    const res = fail(429, "Too many submissions. Please wait a few minutes and try again.", {
      retryAfterSec,
    });
    res.headers.set("Retry-After", String(retryAfterSec));
    return res;
  }

  // 3. Parse + validate. Content-type must be JSON.
  let body: unknown = null;
  try {
    const raw = await req.text();
    if (raw.length > CONTACT_LIMIT) return fail(413, "Submission is too large.");
    body = raw ? (JSON.parse(raw) as unknown) : null;
  } catch {
    return fail(400, "Invalid submission.");
  }

  const validated = validateContact(body);
  if (!validated.ok) {
    if (validated.error.field === "honeypot") {
      // Indistinguishable generic rejection for bots.
      return fail(400, "Submission rejected.");
    }
    return fail(400, validated.error.message, { field: validated.error.field });
  }

  const { website: _website, idempotencyKey: rawKey, ...fields } = validated.value;
  const { key } = normalizeIdempotencyKey(rawKey);

  // 4. Persist. Any throw → 503 (storage missing or failed). No fake success.
  let id: string;
  try {
    const contactEmail = asOptionalText(process.env.CONTACT_TO_EMAIL, 254);
    const contactName = asOptionalText(process.env.CONTACT_TO_NAME, 120);
    const record = await storeContactSubmission(
      { ...fields, toEmail: contactEmail || undefined, toName: contactName || undefined },
      { id: key },
    );
    id = record.id;
  } catch (e) {
    console.error("[inquiries] storage failed", safeMessage(e, "Storage unavailable."));
    return fail(
      503,
      "We could not save your inquiry right now. Please try again later or contact us directly.",
      { code: "STORAGE_UNAVAILABLE" },
    );
  }

  // 5. Optional webhook fan-out. Best effort — storage already succeeded, so
  //    the client still gets a success, annotated truthfully.
  let forwarded = false;
  if (isWebhookConfigured()) {
    try {
      await forwardContactWebhook({ ...fields, id, createdAt: new Date().toISOString() });
      forwarded = true;
    } catch (e) {
      console.error("[inquiries] webhook failed", safeMessage(e, "Webhook failed."));
    }
  }

  return ok({ id, forwarded });
}

export async function GET() {
  return fail(405, "Method not allowed.");
}

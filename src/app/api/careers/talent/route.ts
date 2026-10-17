import { safeDb } from "@/lib/prisma";
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
  checkProfileUrls,
  forwardCareersWebhook,
  isCareersWebhookConfigured,
  isDbConfigured,
  parseCommonFields,
  requireConsent,
  requireEmail,
  requireName,
} from "@/lib/careers-server";

export async function POST(req: Request) {
  try {
    const identity = `careers-talent:${callerIdentity(req)}`;
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

    if (!isDbConfigured()) {
      return fail(
        503,
        "Talent intake is unavailable right now. Please try again later or email us directly.",
        { code: "DB_UNAVAILABLE" },
      );
    }

    const form = await req.formData();
    const fields = parseCommonFields(form);
    const yearsExperience = asOptionalText(form.get("yearsExperience"), 20);
    const areaOfInterest = asOptionalText(form.get("areaOfInterest"), 120);
    const employmentType = asOptionalText(form.get("employmentType"), 40) || "Full-time";
    const message = asOptionalText(form.get("message"), 8000);

    const nameErr = requireName(fields);
    if (nameErr) return fail(400, nameErr.message, { field: "fullName" });
    const emailErr = requireEmail(fields);
    if (emailErr) return fail(400, emailErr.message, { field: "email" });
    if (!areaOfInterest) return fail(400, "Area of interest is required", { field: "areaOfInterest" });
    const urlErr = checkProfileUrls(fields);
    if (urlErr) return fail(400, urlErr.message, { field: "linkedinUrl" });
    const consentErr = requireConsent(form);
    if (consentErr) return fail(400, consentErr.message, { field: "consent" });

    const { key } = normalizeIdempotencyKey(form.get("idempotencyKey"));

    const created = await safeDb(async (db) => {
      return db.talentProfile.upsert({
        where: { id: key },
        update: {
          fullName: fields.fullName,
          email: fields.email,
          phone: fields.phone || null,
          location: fields.location || null,
          linkedinUrl: fields.linkedinUrl || null,
          portfolioUrl: fields.portfolioUrl || null,
          yearsExperience: yearsExperience || null,
          areaOfInterest,
          employmentType,
          message: message || null,
          consent: true,
          status: "New",
        },
        create: {
          id: key,
          fullName: fields.fullName,
          email: fields.email,
          phone: fields.phone || null,
          location: fields.location || null,
          linkedinUrl: fields.linkedinUrl || null,
          portfolioUrl: fields.portfolioUrl || null,
          yearsExperience: yearsExperience || null,
          areaOfInterest,
          employmentType,
          message: message || null,
          consent: true,
          status: "New",
        },
      });
    }, null as unknown as { id: string });

    if (!created) {
      return fail(
        503,
        "We could not save your profile right now. Please try again later or email us directly.",
        { code: "DB_UNAVAILABLE" },
      );
    }

    // Best-effort webhook fan-out — storage already succeeded, so annotate truthfully.
    let forwarded = false;
    if (isCareersWebhookConfigured()) {
      try {
        await forwardCareersWebhook({
          type: "talent_profile",
          id: created.id,
          fullName: fields.fullName,
          email: fields.email,
          phone: fields.phone || null,
          location: fields.location || null,
          linkedinUrl: fields.linkedinUrl || null,
          portfolioUrl: fields.portfolioUrl || null,
          yearsExperience: yearsExperience || null,
          areaOfInterest,
          employmentType,
          message: message || null,
          status: "New",
          createdAt: new Date().toISOString(),
        });
        forwarded = true;
      } catch (e) {
        console.error("[careers] talent webhook failed", safeMessage(e, "Webhook failed."));
      }
    }

    return ok({ id: created.id, forwarded });
  } catch (e) {
    console.error("[careers] talent error", e);
    return fail(500, "Internal error. Please try again.");
  }
}
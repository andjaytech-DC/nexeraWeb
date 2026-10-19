import { safeDb } from "@/lib/prisma";
import { validateResumeFile, storeResumeFile } from "@/lib/careers-file";
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
  storeTalentProfile,
  requireConsent,
  requireEmail,
  requireName,
} from "@/lib/careers-server";

export async function POST(req: Request) {
  try {
    const identity = `careers-resume:${callerIdentity(req)}`;
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

    const form = await req.formData();
    const fields = parseCommonFields(form);
    const location = asOptionalText(form.get("location"), 200);
    const yearsExperience = asOptionalText(form.get("yearsExperience"), 20);
    const areaOfInterest = asOptionalText(form.get("areaOfInterest"), 120);
    const employmentType = asOptionalText(form.get("employmentType"), 40) || "Full-time";
    const message = asOptionalText(form.get("message"), 8000);
    const file = form.get("resume") as File | null;

    const nameErr = requireName(fields);
    if (nameErr) return fail(400, nameErr.message, { field: "fullName" });
    const emailErr = requireEmail(fields);
    if (emailErr) return fail(400, emailErr.message, { field: "email" });
    if (!fields.phone) return fail(400, "Phone is required", { field: "phone" });
    if (!location) return fail(400, "Location is required", { field: "location" });
    if (!yearsExperience) return fail(400, "Years of experience is required", { field: "yearsExperience" });
    if (!areaOfInterest) return fail(400, "Area of interest is required", { field: "areaOfInterest" });
    if (!employmentType) return fail(400, "Employment type is required", { field: "employmentType" });
    const urlErr = checkProfileUrls(fields);
    if (urlErr) return fail(400, urlErr.message, { field: "linkedinUrl" });
    const consentErr = requireConsent(form);
    if (consentErr) return fail(400, consentErr.message, { field: "consent" });

    const fileErr = validateResumeFile(file);
    if (fileErr) return fail(400, fileErr, { field: "resume" });

    const { key } = normalizeIdempotencyKey(form.get("idempotencyKey"));

    // Storage failure (e.g. no Blob store on Vercel) → truthful 503.
    let stored;
    try {
      stored = await storeResumeFile(file as File);
    } catch (e) {
      console.error("[careers] resume storage failed", safeMessage(e, "Storage unavailable."));
      return fail(
        503,
        "Resume storage is unavailable right now. Please try again later or email us directly.",
        { code: "STORAGE_UNAVAILABLE" },
      );
    }

    let created: { id: string };
    if (isDbConfigured()) {
      const dbCreated = await safeDb(async (db) => {
        return db.talentProfile.upsert({
          where: { id: key },
          update: {
            fullName: fields.fullName,
            email: fields.email,
            phone: fields.phone,
            location,
            linkedinUrl: fields.linkedinUrl || null,
            portfolioUrl: fields.portfolioUrl || null,
            yearsExperience,
            areaOfInterest,
            employmentType,
            resumeUrl: stored.url,
            resumeName: stored.name,
            resumeType: stored.type,
            resumeSize: stored.size,
            message: message || null,
            consent: true,
            status: "New",
          },
          create: {
            id: key,
            fullName: fields.fullName,
            email: fields.email,
            phone: fields.phone,
            location,
            linkedinUrl: fields.linkedinUrl || null,
            portfolioUrl: fields.portfolioUrl || null,
            yearsExperience,
            areaOfInterest,
            employmentType,
            resumeUrl: stored.url,
            resumeName: stored.name,
            resumeType: stored.type,
            resumeSize: stored.size,
            message: message || null,
            consent: true,
            status: "New",
          },
        });
      }, null as unknown as { id: string });

      if (!dbCreated) {
        return fail(
          503,
          "We could not save your profile right now. Please try again later or email us directly.",
          { code: "DB_UNAVAILABLE" },
        );
      }
      created = dbCreated;
    } else {
      try {
        const profile = await storeTalentProfile({
          id: key,
          fullName: fields.fullName,
          email: fields.email,
          phone: fields.phone,
          location,
          linkedinUrl: fields.linkedinUrl || "",
          portfolioUrl: fields.portfolioUrl || "",
          yearsExperience,
          areaOfInterest,
          employmentType,
          resumeUrl: stored.url,
          resumeName: stored.name,
          resumeType: stored.type,
          resumeSize: stored.size,
          message: message || null,
          consent: true,
          status: "New",
        });
        created = { id: profile.id };
      } catch (e) {
        console.error("[careers] talent profile storage failed", safeMessage(e, "Storage unavailable."));
        return fail(
          503,
          "Resume storage is unavailable right now. Please try again later or email us directly.",
          { code: "STORAGE_UNAVAILABLE" },
        );
      }
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
          phone: fields.phone,
          location,
          linkedinUrl: fields.linkedinUrl || null,
          portfolioUrl: fields.portfolioUrl || null,
          yearsExperience,
          areaOfInterest,
          employmentType,
          resumeUrl: stored.url,
          resumeName: stored.name,
          message: message || null,
          status: "New",
          createdAt: new Date().toISOString(),
        });
        forwarded = true;
      } catch (e) {
        console.error("[careers] resume webhook failed", safeMessage(e, "Webhook failed."));
      }
    }

    return ok({ id: created.id, forwarded });
  } catch (e) {
    console.error("[careers] resume error", e);
    return fail(500, "Internal error. Please try again.");
  }
}
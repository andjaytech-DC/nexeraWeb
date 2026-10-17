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
  requireConsent,
  requireEmail,
  requireName,
} from "@/lib/careers-server";

export async function POST(req: Request) {
  try {
    const identity = `careers-apply:${callerIdentity(req)}`;
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
        "Job applications are unavailable right now. Please try again later or email us directly.",
        { code: "DB_UNAVAILABLE" },
      );
    }

    const form = await req.formData();
    const jobId = asOptionalText(form.get("jobId"), 64);
    const fields = parseCommonFields(form);
    const coverLetter = asOptionalText(form.get("coverLetter"), 8000);
    const file = form.get("resume") as File | null;

    if (!jobId) return fail(400, "Job is required", { field: "jobId" });
    const nameErr = requireName(fields);
    if (nameErr) return fail(400, nameErr.message, { field: "fullName" });
    const emailErr = requireEmail(fields);
    if (emailErr) return fail(400, emailErr.message, { field: "email" });
    const urlErr = checkProfileUrls(fields);
    if (urlErr) return fail(400, urlErr.message, { field: "linkedinUrl" });
    const consentErr = requireConsent(form);
    if (consentErr) return fail(400, consentErr.message, { field: "consent" });

    const fileErr = validateResumeFile(file);
    if (fileErr) return fail(400, fileErr, { field: "resume" });

    const job = await safeDb(async (db) => db.job.findUnique({ where: { id: jobId } }), null);
    if (!job || !job.isPublished) {
      return fail(404, "Job not available", { field: "jobId" });
    }

    const { key } = normalizeIdempotencyKey(form.get("idempotencyKey"));

    let stored;
    try {
      stored = await storeResumeFile(file as File);
    } catch (e) {
      console.error("[careers] apply storage failed", safeMessage(e, "Storage unavailable."));
      return fail(
        503,
        "Resume storage is unavailable right now. Please try again later or email us directly.",
        { code: "STORAGE_UNAVAILABLE" },
      );
    }

    const created = await safeDb(async (db) => {
      return db.jobApplication.upsert({
        where: { id: key },
        update: {
          jobId,
          fullName: fields.fullName,
          email: fields.email,
          phone: fields.phone || null,
          location: fields.location || null,
          linkedinUrl: fields.linkedinUrl || null,
          portfolioUrl: fields.portfolioUrl || null,
          resumeUrl: stored.url,
          resumeName: stored.name,
          resumeType: stored.type,
          resumeSize: stored.size,
          coverLetter: coverLetter || null,
          status: "New",
        },
        create: {
          id: key,
          jobId,
          fullName: fields.fullName,
          email: fields.email,
          phone: fields.phone || null,
          location: fields.location || null,
          linkedinUrl: fields.linkedinUrl || null,
          portfolioUrl: fields.portfolioUrl || null,
          resumeUrl: stored.url,
          resumeName: stored.name,
          resumeType: stored.type,
          resumeSize: stored.size,
          coverLetter: coverLetter || null,
          status: "New",
        },
      });
    }, null as unknown as { id: string });

    if (!created) {
      return fail(
        503,
        "We could not save your application right now. Please try again later or email us directly.",
        { code: "DB_UNAVAILABLE" },
      );
    }

    // Best-effort webhook fan-out — storage already succeeded, so annotate truthfully.
    let forwarded = false;
    if (isCareersWebhookConfigured()) {
      try {
        await forwardCareersWebhook({
          type: "job_application",
          id: created.id,
          jobId,
          fullName: fields.fullName,
          email: fields.email,
          phone: fields.phone || null,
          location: fields.location || null,
          linkedinUrl: fields.linkedinUrl || null,
          portfolioUrl: fields.portfolioUrl || null,
          resumeUrl: stored.url,
          resumeName: stored.name,
          coverLetter: coverLetter || null,
          status: "New",
          createdAt: new Date().toISOString(),
        });
        forwarded = true;
      } catch (e) {
        console.error("[careers] apply webhook failed", safeMessage(e, "Webhook failed."));
      }
    }

    return ok({ id: created.id, forwarded });
  } catch (e) {
    console.error("[careers] apply error", e);
    return fail(500, "Internal error. Please try again.");
  }
}
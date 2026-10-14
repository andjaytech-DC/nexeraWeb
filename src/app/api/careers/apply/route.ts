import { NextResponse } from "next/server";
import { safeDb } from "@/lib/prisma";
import { validateResumeFile, storeResumeFile } from "@/lib/careers-file";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const jobId = String(form.get("jobId") || "").trim();
    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const location = String(form.get("location") || "").trim();
    const linkedinUrl = String(form.get("linkedinUrl") || "").trim();
    const portfolioUrl = String(form.get("portfolioUrl") || "").trim();
    const coverLetter = String(form.get("coverLetter") || "").trim();
    const consent = form.get("consent");
    const file = form.get("resume") as File | null;

    if (!jobId) return NextResponse.json({ error: "Job is required" }, { status: 400 });
    if (!fullName || fullName.length < 2) return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    if (!consent) return NextResponse.json({ error: "Consent is required" }, { status: 400 });

    const fileErr = validateResumeFile(file);
    if (fileErr) return NextResponse.json({ error: fileErr }, { status: 400 });

    const job = await safeDb(async (db) => db.job.findUnique({ where: { id: jobId } }), null);
    if (!job || !job.isPublished) return NextResponse.json({ error: "Job not available" }, { status: 404 });

    const stored = await storeResumeFile(file as File);

    const created = await safeDb(async (db) => {
      return db.jobApplication.create({
        data: {
          jobId,
          fullName,
          email,
          phone: phone || null,
          location: location || null,
          linkedinUrl: linkedinUrl || null,
          portfolioUrl: portfolioUrl || null,
          resumeUrl: stored.url,
          resumeName: stored.name,
          resumeType: stored.type,
          resumeSize: stored.size,
          coverLetter: coverLetter || null,
          status: "New",
        },
      });
    }, null as unknown as { id: string });

    // If DB not configured, still succeed but warn — no persistence
    if (!created) {
      console.warn("[careers] apply — DB not configured, application not persisted", { jobId, email });
      return NextResponse.json({ ok: true, warning: "DB not configured — application not persisted. Configure DATABASE_URL for production." });
    }

    return NextResponse.json({ ok: true, id: created.id });
  } catch (e) {
    console.error("[careers] apply error", e);
    return NextResponse.json({ error: "Internal error. Please try again." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { safeDb } from "@/lib/prisma";
import { validateResumeFile, storeResumeFile } from "@/lib/careers-file";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const location = String(form.get("location") || "").trim();
    const linkedinUrl = String(form.get("linkedinUrl") || "").trim();
    const portfolioUrl = String(form.get("portfolioUrl") || "").trim();
    const yearsExperience = String(form.get("yearsExperience") || "").trim();
    const areaOfInterest = String(form.get("areaOfInterest") || "").trim();
    const employmentType = String(form.get("employmentType") || "").trim();
    const message = String(form.get("message") || "").trim();
    const consent = form.get("consent");
    const file = form.get("resume") as File | null;

    if (!fullName || fullName.length < 2) return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    if (!phone) return NextResponse.json({ error: "Phone is required" }, { status: 400 });
    if (!location) return NextResponse.json({ error: "Location is required" }, { status: 400 });
    if (!yearsExperience) return NextResponse.json({ error: "Years of experience is required" }, { status: 400 });
    if (!areaOfInterest) return NextResponse.json({ error: "Area of interest is required" }, { status: 400 });
    if (!employmentType) return NextResponse.json({ error: "Employment type is required" }, { status: 400 });
    if (!consent) return NextResponse.json({ error: "Consent is required" }, { status: 400 });

    const fileErr = validateResumeFile(file);
    if (fileErr) return NextResponse.json({ error: fileErr }, { status: 400 });

    const stored = await storeResumeFile(file as File);

    const created = await safeDb(async (db) => {
      return db.talentProfile.create({
        data: {
          fullName,
          email,
          phone,
          location,
          linkedinUrl: linkedinUrl || null,
          portfolioUrl: portfolioUrl || null,
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

    if (!created) {
      console.warn("[careers] resume — DB not configured, not persisted", { email });
      return NextResponse.json({ ok: true, warning: "DB not configured — profile not persisted. Configure DATABASE_URL." });
    }
    return NextResponse.json({ ok: true, id: created.id });
  } catch (e) {
    console.error("[careers] resume error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

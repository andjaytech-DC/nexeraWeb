import { NextResponse } from "next/server";
import { safeDb } from "@/lib/prisma";

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
    const employmentType = String(form.get("employmentType") || "Full-time").trim();
    const message = String(form.get("message") || "").trim();
    const consent = form.get("consent");

    if (!fullName || fullName.length < 2) return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    if (!areaOfInterest) return NextResponse.json({ error: "Area of interest is required" }, { status: 400 });
    if (!consent) return NextResponse.json({ error: "Consent is required" }, { status: 400 });

    const created = await safeDb(async (db) => {
      return db.talentProfile.create({
        data: {
          fullName,
          email,
          phone: phone || null,
          location: location || null,
          linkedinUrl: linkedinUrl || null,
          portfolioUrl: portfolioUrl || null,
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
      console.warn("[careers] talent — DB not configured", { email });
      return NextResponse.json({ ok: true, warning: "DB not configured — not persisted." });
    }
    return NextResponse.json({ ok: true, id: created.id });
  } catch (e) {
    console.error("[careers] talent error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

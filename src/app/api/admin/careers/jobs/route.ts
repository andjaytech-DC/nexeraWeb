import { NextResponse } from "next/server";
import { prisma, safeDb } from "@/lib/prisma";

// POST — create job (admin)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, department, location, employmentType, experienceLevel, description, responsibilities, requirements, preferredSkills, status, isPublished } = body;
    if (!title || !slug || !department || !location || !employmentType || !description || !responsibilities || !requirements) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    // Basic slug validation
    if (!/^[a-z0-9-]+$/.test(slug)) return NextResponse.json({ error: "Slug must be lowercase alphanumeric with hyphens" }, { status: 400 });

    const created = await safeDb(async (db) => {
      return db.job.create({
        data: {
          title, slug, department, location, employmentType,
          experienceLevel: experienceLevel || null,
          description, responsibilities, requirements,
          preferredSkills: preferredSkills || null,
          status: status || "Draft",
          isPublished: Boolean(isPublished),
        },
      });
    }, null);

    if (!created) return NextResponse.json({ error: "DB not configured — set DATABASE_URL to persist jobs" }, { status: 503 });
    return NextResponse.json({ ok: true, job: created });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error";
    if (String(msg).includes("Unique constraint")) return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    console.error("[admin] create job error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET() {
  const jobs = await safeDb(async (db) => db.job.findMany({ orderBy: { createdAt: "desc" } }), []);
  return NextResponse.json({ jobs });
}

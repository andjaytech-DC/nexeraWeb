import { NextResponse } from "next/server";
import { safeDb } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin-session";

const unauthorized = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// POST — create job (admin)
export async function POST(req: Request) {
  if (!(await isAdminRequest())) return unauthorized();
  try {
    const body = await req.json();
    const { title, slug, department, location, employmentType, experienceLevel, description, responsibilities, requirements, preferredSkills, applyEmail, workMode, shiftInfo, status, isPublished } = body;
    if (!title || !slug || !department || !location || !employmentType || !description || !responsibilities || !requirements) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    // Basic slug validation
    if (!/^[a-z0-9-]+$/.test(slug)) return NextResponse.json({ error: "Slug must be lowercase alphanumeric with hyphens" }, { status: 400 });
    if (!isValidStatus(status)) return NextResponse.json({ error: `Status must be one of ${VALID_STATUSES.join(", ")}` }, { status: 400 });

    const created = await safeDb(async (db) => {
      return db.job.create({
        data: {
          title, slug, department, location, employmentType,
          experienceLevel: asOptional(experienceLevel),
          description, responsibilities, requirements,
          preferredSkills: asOptional(preferredSkills),
          applyEmail: asOptional(applyEmail),
          workMode: asOptional(workMode),
          shiftInfo: asOptional(shiftInfo),
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
  if (!(await isAdminRequest())) return unauthorized();
  const jobs = await safeDb(async (db) => db.job.findMany({ orderBy: { createdAt: "desc" } }), []);
  return NextResponse.json({ jobs });
}

// PATCH — edit an existing job: content fields, lifecycle status transitions
// (Draft ⇄ Published → Closed) and the publish flag. Admin-only; unknown
// fields are ignored so accidental payloads cannot write unvalidated data.
const VALID_STATUSES = ["Draft", "Published", "Closed"] as const;
const isValidStatus = (s: unknown) =>
  s === undefined || s === null || (typeof s === "string" && (VALID_STATUSES as readonly string[]).includes(s));
const asOptional = (v: unknown): string | null => {
  const s = typeof v === "string" ? v.trim() : "";
  return s ? s : null;
};

export async function PATCH(req: Request) {
  if (!(await isAdminRequest())) return unauthorized();
  try {
    const body = await req.json() as Record<string, unknown>;
    const id = typeof body.id === "string" ? body.id : "";
    if (!id) return NextResponse.json({ error: "Missing job id" }, { status: 400 });
    if (!isValidStatus(body.status)) {
      return NextResponse.json({ error: `Status must be one of ${VALID_STATUSES.join(", ")}` }, { status: 400 });
    }
    const slug = asOptional(body.slug);
    if (slug && !/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ error: "Slug must be lowercase alphanumeric with hyphens" }, { status: 400 });
    }

    // Only string/boolean fields we know, so unknown payload keys are dropped.
    const data: Record<string, string | boolean | null> = {};
    for (const k of ["title", "department", "location", "employmentType", "description", "responsibilities", "requirements"] as const) {
      const v = body[k];
      if (v === undefined) continue;
      if (typeof v !== "string" || !v.trim()) {
        return NextResponse.json({ error: `${k} must be a non-empty string` }, { status: 400 });
      }
      data[k] = v.trim();
    }
    if (slug !== null) data.slug = slug;
    for (const k of ["experienceLevel", "preferredSkills", "applyEmail", "workMode", "shiftInfo"] as const) {
      if (body[k] !== undefined) data[k] = asOptional(body[k]);
    }
    if (body.status !== undefined) data.status = String(body.status);
    if (body.isPublished !== undefined) data.isPublished = Boolean(body.isPublished);

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const updated = await safeDb(async (db) => {
      return db.job.update({ where: { id }, data });
    }, null);

    if (!updated) {
      return NextResponse.json({ error: "Job not found (or DB not configured)" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, job: updated });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error";
    if (String(msg).includes("Unique constraint")) return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    console.error("[admin] update job error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

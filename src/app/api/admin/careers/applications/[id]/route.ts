import { NextResponse } from "next/server";
import { safeDb } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin-session";

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest())) return unauthorized();
  const { id } = await params;
  try {
    const body = await req.json();
    const status = typeof body?.status === "string" ? body.status : undefined;
    if (!status) return NextResponse.json({ error: "status required" }, { status: 400 });
    const updated = await safeDb(async (db) => {
      return db.jobApplication.update({ where: { id }, data: { status } });
    }, null);
    if (!updated) return NextResponse.json({ error: "DB not configured or not found" }, { status: 503 });
    return NextResponse.json({ ok: true, application: updated });
  } catch (e) {
    console.error("[admin] update application error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
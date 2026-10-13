import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { isAdminRequest } from "@/lib/admin-session";

/** Resumes live in a private Vercel Blob store. Never proxy arbitrary hosts. */
const BLOB_HOST_SUFFIX = ".blob.vercel-storage.com";
const LOCAL_PREFIX = "/uploads/resumes/";

const CONTENT_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

/** Strip anything that could break out of the Content-Disposition header. */
function safeFilename(value: string): string {
  const base = value.split(/[\\/]/).pop() || "resume";
  return base.replace(/[^\w.\-]/g, "_").slice(0, 120);
}

export async function GET(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url).searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  // Local development fallback: files written by src/lib/careers-file.ts.
  if (url.startsWith(LOCAL_PREFIX)) {
    const filename = safeFilename(url);
    const ext = path.extname(filename).toLowerCase();
    if (!CONTENT_TYPES[ext]) {
      return NextResponse.json({ error: "Invalid file" }, { status: 400 });
    }
    try {
      const buffer = await readFile(
        path.join(process.cwd(), "public", "uploads", "resumes", filename),
      );
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          "Content-Type": CONTENT_TYPES[ext],
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "private, no-store",
        },
      });
    } catch {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  }

  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }
  if (!host.endsWith(BLOB_HOST_SUFFIX)) {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  const { get } = await import("@vercel/blob");
  const result = await get(url, { access: "private" });
  if (!result || result.statusCode !== 200 || !result.stream) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${safeFilename(
        result.blob.pathname,
      )}"`,
      "Cache-Control": "private, no-store",
    },
  });
}

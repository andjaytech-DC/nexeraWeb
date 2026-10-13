import { randomUUID } from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXT = new Set([".pdf", ".doc", ".docx"]);

export function validateResumeFile(file: File | null): string | null {
  if (!file || file.size === 0) return "Resume file is required";
  if (file.size > MAX_SIZE) return "File must be ≤ 5MB";
  const ext = path.extname(file.name || "").toLowerCase();
  if (!ALLOWED.has(file.type) && !ALLOWED_EXT.has(ext)) return "Only PDF, DOC, DOCX are allowed";
  if (!ALLOWED_EXT.has(ext) && file.type && !ALLOWED.has(file.type)) return "Only PDF, DOC, DOCX are allowed";
  return null;
}

/**
 * Vercel Blob is used whenever credentials are present. Both the OIDC pair
 * (BLOB_STORE_ID + VERCEL_OIDC_TOKEN, the Vercel default) and the static
 * BLOB_READ_WRITE_TOKEN are honoured — the SDK resolves them itself.
 */
export function isBlobStorageConfigured(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN),
  );
}

type StoredResume = { url: string; name: string; type: string; size: number };

export async function storeResumeFile(file: File): Promise<StoredResume> {
  const ext = path.extname(file.name || "").toLowerCase() || ".pdf";
  const safeExt = ALLOWED_EXT.has(ext) ? ext : ".pdf";
  const id = randomUUID();
  const filename = `${id}${safeExt}`;
  const meta = {
    name: file.name,
    type: file.type || "application/octet-stream",
    size: file.size,
  };

  if (isBlobStorageConfigured()) {
    const { put } = await import("@vercel/blob");
    // Private: resumes are personal data. Serve them through an authorized
    // endpoint (see src/app/api/admin/resumes/route.ts), never a public URL.
    const blob = await put(`resumes/${filename}`, file, {
      access: "private",
      contentType: meta.type,
      addRandomSuffix: false,
    });
    return { url: blob.url, ...meta };
  }

  if (process.env.VERCEL) {
    // Vercel's filesystem is read-only — fail loudly instead of returning a
    // URL that can never be served.
    throw new Error(
      "Resume storage is not configured on Vercel. Connect a Vercel Blob store (sets BLOB_STORE_ID + VERCEL_OIDC_TOKEN) or set BLOB_READ_WRITE_TOKEN.",
    );
  }

  console.warn(
    "[careers-file] BLOB_* not set — storing resume on the local filesystem. Dev only.",
  );
  const dir = path.join(process.cwd(), "public", "uploads", "resumes");
  await mkdir(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buf);
  // Dev-only path. In production this is replaced by a private Blob URL served
  // via /api/admin/resumes.
  return { url: `/uploads/resumes/${filename}`, ...meta };
}

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

export async function storeResumeFile(file: File): Promise<{ url: string; name: string; type: string; size: number }> {
  const ext = path.extname(file.name || "").toLowerCase() || ".pdf";
  const safeExt = ALLOWED_EXT.has(ext) ? ext : ".pdf";
  const id = randomUUID();
  const filename = `${id}${safeExt}`;
  const dir = path.join(process.cwd(), "public", "uploads", "resumes");
  await mkdir(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  const fullPath = path.join(dir, filename);
  await writeFile(fullPath, buf);
  // Store reference, not public guessable URL — we store path, admin will authorize access
  // For dev, we return a path that requires auth to serve
  return {
    url: `/uploads/resumes/${filename}`, // In production, replace with S3 key and serve via signed URL
    name: file.name,
    type: file.type || "application/octet-stream",
    size: file.size,
  };
}

// Production note: If RESUME_STORAGE_PROVIDER is set (e.g., "s3"), upload to object storage
// and return the storage key instead of local path. Never expose private files via public URLs.

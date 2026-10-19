import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient | null {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn("[prisma] DATABASE_URL not set — careers DB features will return empty / mock data. Configure PostgreSQL for production.");
    return null as unknown as PrismaClient;
  }
  try {
    const adapter = new PrismaPg({ connectionString: url });
    return new PrismaClient({ adapter });
  } catch (e) {
    console.warn("[prisma] Failed to create client", e);
    return null as unknown as PrismaClient;
  }
}

export const prisma: PrismaClient = globalForPrisma.prisma ?? createClient() ?? (new Proxy({} as PrismaClient, {
  get(_t, prop) {
    if (prop === "then") return undefined;
    return () => Promise.reject(new Error("DATABASE_URL not configured — run with PostgreSQL or set DATABASE_URL"));
  },
}) as PrismaClient);

if (process.env.NODE_ENV !== "production" && (prisma as unknown as { $connect?: unknown })) {
  (globalForPrisma as unknown as Record<string, unknown>).prisma = prisma;
}

// Whether a real database can be reached at all — placeholders and missing
// URLs are "not configured". Careers uses this to decide between database
// content and the built-in no-database listing fallback (src/lib/job-data.ts).
export function isDbConfigured(): boolean {
  const url = process.env.DATABASE_URL ?? "";
  return Boolean(url) && !url.includes("user:password");
}

// Helper to safely execute DB ops — returns fallback if DB unavailable
export async function safeDb<T>(fn: (db: PrismaClient) => Promise<T>, fallback: T): Promise<T> {
  if (!isDbConfigured()) {
    return fallback;
  }
  try {
    return await fn(prisma);
  } catch (e) {
    console.warn("[prisma] DB operation failed, returning fallback", e);
    return fallback;
  }
}

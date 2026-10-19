import { safeDb } from "@/lib/prisma";
import { isBlobStorageConfigured } from "@/lib/contact-server";

/**
 * GET /api/health — deployment smoke check.
 *
 * Reports liveness and backend readiness separately and truthfully:
 *  - app:    "ok" when the handler answered at all.
 *  - db:     "ok" only when a real PostgreSQL query succeeds. A placeholder
 *            DATABASE_URL (dev file-store mode) or an unreachable database
 *            both report "unavailable" — deployment configs must not fake
 *            readiness (see docs/deployment.md §2).
 *  - blob:   whether durable inquiry/resume storage is configured. Not
 *            configured is dev-correct; on Vercel it means intake answers 503.
 *
 * No auth (harmless), no secrets in the response.
 */
export async function GET() {
  const dbOk = await safeDb(
    async (db) => {
      await db.$queryRaw`SELECT 1`;
      return true;
    },
    false,
  );

  return Response.json({
    status: "ok",
    checks: {
      app: "ok",
      db: dbOk ? "ok" : "unavailable",
      blob: isBlobStorageConfigured() ? "configured" : "not-configured",
    },
  });
}

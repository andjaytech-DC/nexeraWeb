/**
 * Careers seed — the seven approved job listings (HR, US-process BPO, IT).
 *
 * The listing content lives in src/lib/job-data.ts (single source of truth,
 * shared with the no-database public fallback). This script only handles
 * database insertion.
 *
 * Idempotent and admin-edit-safe:
 *  - rows are matched on the unique slug;
 *  - a row that already exists keeps ALL content as it is (so edits made in
 *    the admin panel survive re-seeds) and only refreshes the public flag;
 *  - nothing is deleted — there is no fabricated data beyond these seven
 *    approved listings.
 *
 * Usage (needs a real DATABASE_URL):  npm run db:seed
 * Apply-by-email override:            JOBS_APPLY_EMAIL=... npm run db:seed
 * See docs/deployment.md §4b.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { BUILTIN_APPLY_EMAIL, BUILTIN_JOBS } from "../src/lib/job-data";

// Prisma 7 connects through a driver adapter, mirroring src/lib/prisma.ts.
// The client is created only after the DATABASE_URL guard passes.
let prisma: PrismaClient | null = null;

const APPLY_EMAIL = process.env.JOBS_APPLY_EMAIL ?? BUILTIN_APPLY_EMAIL;

async function main() {
  // Truthful guard: never "seed" without a real database — a placeholder URL
  // would silently write nowhere or fail confusingly.
  const url = process.env.DATABASE_URL ?? "";
  if (!url || url.includes("user:password")) {
    console.error(
      "DATABASE_URL is missing or still the scaffold placeholder (user:password@…). " +
        "Provision PostgreSQL and set a real DATABASE_URL first — see docs/deployment.md §4.",
    );
    process.exitCode = 1;
    return;
  }
  prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });

  let created = 0;
  let refreshed = 0;
  for (const job of BUILTIN_JOBS) {
    const existing = await prisma.job.findUnique({ where: { slug: job.slug } });
    if (existing) {
      // Idempotent + edit-safe: keep all admin-edited content, only ensure the
      // listing is publicly visible (Publish), matching the seed intent.
      await prisma.job.update({
        where: { slug: job.slug },
        data: { isPublished: true, status: "Published" },
      });
      refreshed += 1;
      console.log(`  refreshed ${existing.slug} (content preserved as edited in admin)`);
    } else {
      await prisma.job.create({
        data: {
          ...job,
          applyEmail: APPLY_EMAIL,
          isPublished: true,
          status: "Published",
        },
      });
      created += 1;
      console.log(`  created ${job.slug}`);
    }
  }
  console.log(`Seed complete (${BUILTIN_JOBS.length} listings): ${created} created, ${refreshed} refreshed. Apply-by-email: ${APPLY_EMAIL}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma?.$disconnect();
  });

import Link from "next/link";
import type { Job } from "@prisma/client";
import { safeDb } from "@/lib/prisma";
import { CreateJobForm } from "./CreateJobForm";
import { JobsTable } from "./JobsTable";

export default async function AdminJobsPage() {
  const jobs = await safeDb(async (db) => db.job.findMany({ orderBy: { createdAt: "desc" } }), [] as Job[]);

  return (
    <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-[800] tracking-[-0.03em]">Job Listings</h1>
        <div className="flex items-center gap-3">
          <CreateJobForm />
          <Link href="/api/admin/careers/jobs" className="text-xs text-white/40">API →</Link>
        </div>
      </div>
      <p className="mt-2 text-sm text-white/50">Draft → Published → Closed. Only Published + isPublished appear publicly. Seven proposed listings seed with `npm run db:seed` — unpublish or edit any of them here.</p>

      <JobsTable jobs={jobs} />
      <p className="mt-4 text-xs text-white/30">DB fallback active when DATABASE_URL not configured — shows empty. Configure PostgreSQL to persist jobs.</p>
    </div>
  );
}

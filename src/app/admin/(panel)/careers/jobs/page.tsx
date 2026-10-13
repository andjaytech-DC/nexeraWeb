import Link from "next/link";
import { safeDb } from "@/lib/prisma";

export default async function AdminJobsPage() {
  const jobs = await safeDb(async (db) => db.job.findMany({ orderBy: { createdAt: "desc" } }), [] as any[]);

  return (
    <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-[800] tracking-[-0.03em]">Job Listings</h1>
        <Link href="/api/admin/careers/jobs" className="text-xs text-white/40">API → /api/admin/careers/jobs</Link>
      </div>
      <p className="mt-2 text-sm text-white/50">Draft → Published → Closed → Archived. Only Published + isPublished appear publicly. Use Prisma directly or extend this UI with create/edit actions.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-[#0F141E]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-xs tracking-[0.08em] font-[700] text-white/40">
              <tr><th className="text-left px-4 py-3">Title</th><th className="text-left px-4 py-3">Department</th><th className="text-left px-4 py-3">Location</th><th className="text-left px-4 py-3">Type</th><th className="text-left px-4 py-3">Status</th><th className="text-left px-4 py-3">Published</th></tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center">
                  <p className="text-sm text-white/60">No jobs yet — honest empty state (no fake jobs created).</p>
                  <p className="mt-2 text-xs text-white/30">Create via Prisma Studio or POST to /api/admin/careers/jobs when DB is configured. See prisma/seed guidance.</p>
                  <div className="mt-4 rounded-xl bg-[#070A0F] border border-white/5 p-4 text-left max-w-[640px] mx-auto">
                    <div className="text-xs font-[700] text-white/60">Example (when DB ready):</div>
                    <pre className="mt-2 text-xs leading-5 text-white/50 overflow-x-auto">{`POST /api/admin/careers/jobs
{
  "title": "Software Engineer",
  "slug": "software-engineer-noida",
  "department": "Software Engineering",
  "location": "Noida",
  "employmentType": "Full-time",
  "experienceLevel": "Mid",
  "description": "...",
  "responsibilities": "...",
  "requirements": "...",
  "status": "Published",
  "isPublished": true
}`}</pre>
                  </div>
                </td></tr>
              ) : (
                jobs.map((j: any) => (
                  <tr key={j.id} className="border-t border-white/5">
                    <td className="px-4 py-3 text-white">{j.title}<div className="text-xs text-white/40">/{j.slug}</div></td>
                    <td className="px-4 py-3 text-white/60">{j.department}</td>
                    <td className="px-4 py-3 text-white/60">{j.location}</td>
                    <td className="px-4 py-3 text-white/60">{j.employmentType}</td>
                    <td className="px-4 py-3"><span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs">{j.status}</span></td>
                    <td className="px-4 py-3 text-xs">{j.isPublished ? "Yes" : "No"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-4 text-xs text-white/30">DB fallback active when DATABASE_URL not configured — shows empty. Configure PostgreSQL to persist jobs.</p>
    </div>
  );
}

import { safeDb } from "@/lib/prisma";

export default async function AdminApplicationsPage() {
  const apps = await safeDb(async (db) => db.jobApplication.findMany({ include: { job: true }, orderBy: { createdAt: "desc" }, take: 100 }), [] as any[]);

  return (
    <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-8">
      <h1 className="text-[24px] font-[800] tracking-[-0.03em]">Applications</h1>
      <p className="mt-2 text-sm text-white/50">Candidate name, email, phone, job, department, experience, date, status. Stored via Prisma — never exposed publicly.</p>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-[#0F141E]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-xs tracking-[0.08em] font-[700] text-white/40">
              <tr><th className="text-left px-4 py-3">Candidate</th><th className="text-left px-4 py-3">Job</th><th className="text-left px-4 py-3">Department</th><th className="text-left px-4 py-3">Email</th><th className="text-left px-4 py-3">Date</th><th className="text-left px-4 py-3">Status</th></tr>
            </thead>
            <tbody>
              {apps.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-sm text-white/50">No applications yet. Submit via /careers/job-search/[slug] when jobs are published.</td></tr>
              ) : (
                apps.map((a: any) => (
                  <tr key={a.id} className="border-t border-white/5">
                    <td className="px-4 py-3 text-white">{a.fullName}</td>
                    <td className="px-4 py-3 text-white/60">{a.job?.title || a.jobId}</td>
                    <td className="px-4 py-3 text-white/60">{a.job?.department || "—"}</td>
                    <td className="px-4 py-3 text-white/60">{a.email}</td>
                    <td className="px-4 py-3 text-xs text-white/40">{new Date(a.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3"><span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs">{a.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-4 text-xs text-white/30">Statuses: New, Reviewing, Shortlisted, Interview, Offer, Hired, Rejected, Archived. Resume files stored as secure references — serve via authorized endpoint, not public URLs.</p>
    </div>
  );
}

import { safeDb } from "@/lib/prisma";

export default async function AdminTalentPage() {
  const profiles = await safeDb(async (db) => db.talentProfile.findMany({ orderBy: { createdAt: "desc" }, take: 100 }), [] as any[]);

  return (
    <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-8">
      <h1 className="text-[24px] font-[800] tracking-[-0.03em]">Talent Profiles & Resume Submissions</h1>
      <p className="mt-2 text-sm text-white/50">From /careers/send-resume and /careers/talent-community — stored via Prisma, not browser storage.</p>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-[#0F141E]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-xs tracking-[0.08em] font-[700] text-white/40">
              <tr><th className="text-left px-4 py-3">Name</th><th className="text-left px-4 py-3">Email</th><th className="text-left px-4 py-3">Area</th><th className="text-left px-4 py-3">Experience</th><th className="text-left px-4 py-3">Employment</th><th className="text-left px-4 py-3">Date</th><th className="text-left px-4 py-3">Status</th></tr>
            </thead>
            <tbody>
              {profiles.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-sm text-white/50">No talent profiles yet. Submissions from Send Resume and Talent Community will appear here.</td></tr>
              ) : (
                profiles.map((p: any) => (
                  <tr key={p.id} className="border-t border-white/5">
                    <td className="px-4 py-3 text-white">{p.fullName}</td>
                    <td className="px-4 py-3 text-white/60">{p.email}</td>
                    <td className="px-4 py-3 text-white/60">{p.areaOfInterest}</td>
                    <td className="px-4 py-3 text-white/60">{p.yearsExperience || "—"}</td>
                    <td className="px-4 py-3 text-white/60">{p.employmentType}</td>
                    <td className="px-4 py-3 text-xs text-white/40">{new Date(p.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3"><span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs">{p.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-4 text-xs text-white/30">Resume file metadata (name/type/size/reference) is stored in PostgreSQL; binary is stored via file/object storage (local dev: public/uploads/resumes — production: S3 with signed URLs).</p>
    </div>
  );
}

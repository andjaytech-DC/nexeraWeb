import Link from "next/link";
import { safeDb } from "@/lib/prisma";

export default async function AdminCareersPage() {
  const counts = await safeDb(async (db) => {
    const [jobs, apps, talent] = await Promise.all([
      db.job.count(),
      db.jobApplication.count(),
      db.talentProfile.count(),
    ]);
    return { jobs, apps, talent };
  }, { jobs: 0, apps: 0, talent: 0 });

  return (
    <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-8">
      <h1 className="text-[24px] font-[800] tracking-[-0.03em]">Careers</h1>
      <p className="mt-2 text-sm text-white/50">Manage jobs, applications and talent profiles. Architecture: Next.js → Prisma → PostgreSQL (browser localStorage is NOT used for candidate data).</p>
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-6">
          <div className="text-xs tracking-[0.12em] font-[700] text-white/40">JOB LISTINGS</div>
          <div className="mt-2 text-[28px] font-[800]">{counts.jobs}</div>
          <Link href="/admin/careers/jobs" className="mt-3 inline-flex text-xs font-[600] text-[#4F7EFF] hover:text-white">Manage jobs →</Link>
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-6">
          <div className="text-xs tracking-[0.12em] font-[700] text-white/40">APPLICATIONS</div>
          <div className="mt-2 text-[28px] font-[800]">{counts.apps}</div>
          <Link href="/admin/careers/applications" className="mt-3 inline-flex text-xs font-[600] text-[#4F7EFF] hover:text-white">View applications →</Link>
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-6">
          <div className="text-xs tracking-[0.12em] font-[700] text-white/40">TALENT PROFILES</div>
          <div className="mt-2 text-[28px] font-[800]">{counts.talent}</div>
          <Link href="/admin/careers/talent" className="mt-3 inline-flex text-xs font-[600] text-[#4F7EFF] hover:text-white">View talent →</Link>
        </div>
      </div>
      <div className="mt-8 rounded-2xl border border-amber-500/15 bg-amber-500/[0.06] px-6 py-4">
        <p className="text-sm font-[700] text-amber-300">File storage</p>
        <p className="mt-1 text-sm leading-6 text-white/60">Resumes are stored as files (local <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">public/uploads/resumes</code> in dev) and only metadata (name/type/size/reference) is kept in PostgreSQL. Production must use S3/R2/GCS with signed URLs — never expose private files via public guessable URLs.</p>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <Link href="/admin/careers/jobs" className="rounded-2xl border border-white/5 bg-[#0F141E] p-6 hover:bg-[#131A27] transition">
          <h3 className="text-sm font-[700] text-white">Job Listings</h3>
          <p className="mt-1 text-sm text-white/50">Create, edit, publish/unpublish, archive jobs. Only Published jobs appear on /careers/job-search.</p>
        </Link>
        <Link href="/admin/careers/talent" className="rounded-2xl border border-white/5 bg-[#0F141E] p-6 hover:bg-[#131A27] transition">
          <h3 className="text-sm font-[700] text-white">Resume Submissions</h3>
          <p className="mt-1 text-sm text-white/50">Profiles from /careers/send-resume — stored via Prisma, not browser storage.</p>
        </Link>
      </div>
    </div>
  );
}

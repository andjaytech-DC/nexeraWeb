import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma, safeDb } from "@/lib/prisma";
import JobApplyForm from "./JobApplyForm";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await safeDb(async (db) => db.job.findUnique({ where: { slug } }), null as any);
  if (!job || !job.isPublished) return { title: "Job — Nexara Careers", robots: { index: false } };
  return {
    title: `${job.title} — ${job.department} | Nexara Careers`,
    description: job.description.slice(0, 160),
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await safeDb(async (db) => db.job.findUnique({ where: { slug } }), null as any);

  if (!job || !job.isPublished || job.status !== "Published") {
    return (
      <div className="bg-[#070A0F] text-[#E6EAF0]">
        <Header />
        <div className="mx-auto max-w-[800px] px-5 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-[28px] font-[800] tracking-[-0.03em] text-white">Position not available</h1>
          <p className="mt-3 text-sm leading-6 text-white/50">This opening is not currently published. Explore other opportunities or share your resume for future roles.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/careers/job-search" className="rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm font-[600] text-white">Back to Job Search</Link>
            <Link href="/careers/send-resume" className="rounded-full bg-[#4F7EFF] px-5 py-2.5 text-sm font-[700] text-white">Send Your Resume →</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.createdAt,
    employmentType: job.employmentType,
    hiringOrganization: { "@type": "Organization", name: "Nexara Global Solutions", sameAs: "https://nexara.example.com" },
    jobLocation: { "@type": "Place", address: job.location },
  };

  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[960px] px-5 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] font-[700] text-white/40"><Link href="/careers" className="hover:text-white">CAREERS</Link><span>/</span><Link href="/careers/job-search" className="hover:text-white">JOB SEARCH</Link><span>/</span><span className="text-white/60">{job.title.toUpperCase()}</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[32px] sm:text-[40px] font-[800] tracking-[-0.03em] leading-[1.05] text-white">{job.title}</h1>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/60">{job.department}</span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/60">{job.location}</span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/60">{job.employmentType}</span>
            {job.experienceLevel && <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/60">{job.experienceLevel}</span>}
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[960px] px-5 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-[1.35fr_0.85fr] gap-10">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h2 className="text-sm font-[700] text-white">About the role</h2>
            <p className="mt-3 text-sm leading-7 text-white/70 whitespace-pre-wrap">{job.description}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h2 className="text-sm font-[700] text-white">Responsibilities</h2>
            <p className="mt-3 text-sm leading-7 text-white/60 whitespace-pre-wrap">{job.responsibilities}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h2 className="text-sm font-[700] text-white">Required skills</h2>
            <p className="mt-3 text-sm leading-7 text-white/60 whitespace-pre-wrap">{job.requirements}</p>
          </div>
          {job.preferredSkills && (
            <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
              <h2 className="text-sm font-[700] text-white">Preferred skills</h2>
              <p className="mt-3 text-sm leading-7 text-white/60 whitespace-pre-wrap">{job.preferredSkills}</p>
            </div>
          )}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-7">
            <h2 className="text-xs tracking-[0.12em] font-[700] text-white/40">WHAT YOU&apos;LL WORK ON</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">Projects across software engineering, AI, cloud and digital transformation for real business impact — not generic ticket work.</p>
          </div>
        </div>
        <div className="space-y-6 lg:sticky lg:top-[84px] self-start">
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h3 className="text-xs tracking-[0.12em] font-[700] text-white/40">EXPERIENCE</h3>
            <p className="mt-2 text-sm text-white/70">{job.experienceLevel || "As per requirements"}</p>
            <h3 className="mt-4 text-xs tracking-[0.12em] font-[700] text-white/40">EMPLOYMENT TYPE</h3>
            <p className="mt-2 text-sm text-white/70">{job.employmentType}</p>
          </div>
          <JobApplyForm jobId={job.id} jobTitle={job.title} />
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs leading-5 text-white/40">
            By applying you consent to Nexara using your information to consider you for this and related opportunities. Resumes are stored securely — not at public URLs.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

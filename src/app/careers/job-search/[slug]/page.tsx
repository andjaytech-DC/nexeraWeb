import type { Metadata } from "next";
import Link from "next/link";
import type { Job } from "@prisma/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site-url";
import { safeDb } from "@/lib/prisma";
import JobApplyForm from "./JobApplyForm";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await safeDb(async (db) => db.job.findUnique({ where: { slug } }), null as Job | null);
  if (!job || !job.isPublished) return { title: "Job", robots: { index: false } };
  return {
    title: `${job.title} — ${job.department}`,
    description: job.description.slice(0, 160),
    alternates: { canonical: `/careers/job-search/${slug}` },
    openGraph: { title: `${job.title} — ${job.department}`, description: job.description.slice(0, 160) },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await safeDb(async (db) => db.job.findUnique({ where: { slug } }), null as Job | null);

  if (!job || !job.isPublished || job.status !== "Published") {
    return (
      <div className="bg-canvas text-ink">
        <Header />
        <div className="mx-auto max-w-[800px] px-5 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-[28px] font-[800] tracking-[-0.03em] text-ink">Position not available</h1>
          <p className="mt-3 text-sm leading-6 text-ink-secondary">This opening is not currently published. Explore other opportunities or share your resume for future roles.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/careers/job-search" className="rounded-full border border-line bg-white/[0.05] px-5 py-2.5 text-sm font-[600] text-ink">Back to Job Search</Link>
            <Link href="/careers/send-resume" className="rounded-full bg-brand px-5 py-2.5 text-sm font-[700] text-white">Send Your Resume →</Link>
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
    hiringOrganization: { "@type": "Organization", name: "Nexara Global Solutions", sameAs: siteUrl() },
    jobLocation: { "@type": "Place", address: job.location },
  };

  return (
    <div className="bg-canvas text-ink">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[960px] px-5 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] font-[700] text-ink-muted"><Link href="/careers" className="hover:text-brand">CAREERS</Link><span>/</span><Link href="/careers/job-search" className="hover:text-brand">JOB SEARCH</Link><span>/</span><span className="text-ink-secondary">{job.title.toUpperCase()}</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[32px] sm:text-[40px] font-[800] tracking-[-0.03em] leading-[1.05] text-ink">{job.title}</h1>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-line bg-surface-alt px-3 py-1.5 text-ink-secondary">{job.department}</span>
            <span className="rounded-full border border-line bg-surface-alt px-3 py-1.5 text-ink-secondary">{job.location}</span>
            <span className="rounded-full border border-line bg-surface-alt px-3 py-1.5 text-ink-secondary">{job.employmentType}</span>
            {job.experienceLevel && <span className="rounded-full border border-line bg-surface-alt px-3 py-1.5 text-ink-secondary">{job.experienceLevel}</span>}
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[960px] px-5 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-[1.35fr_0.85fr] gap-10">
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h2 className="text-sm font-[700] text-ink">About the role</h2>
            <p className="mt-3 text-sm leading-7 text-ink-secondary whitespace-pre-wrap">{job.description}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h2 className="text-sm font-[700] text-ink">Responsibilities</h2>
            <p className="mt-3 text-sm leading-7 text-ink-secondary whitespace-pre-wrap">{job.responsibilities}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h2 className="text-sm font-[700] text-ink">Required skills</h2>
            <p className="mt-3 text-sm leading-7 text-ink-secondary whitespace-pre-wrap">{job.requirements}</p>
          </div>
          {job.preferredSkills && (
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-sm font-[700] text-ink">Preferred skills</h2>
              <p className="mt-3 text-sm leading-7 text-ink-secondary whitespace-pre-wrap">{job.preferredSkills}</p>
            </div>
          )}
          <div className="rounded-2xl border border-line bg-surface-alt p-7">
            <h2 className="text-xs tracking-[0.12em] font-[700] text-ink-muted">WHAT YOU&apos;LL WORK ON</h2>
            <p className="mt-2 text-sm leading-6 text-ink-secondary">Projects across software engineering, AI, cloud and digital transformation for real business impact — not generic ticket work.</p>
          </div>
        </div>
        <div className="space-y-6 lg:sticky lg:top-[84px] self-start">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h3 className="text-xs tracking-[0.12em] font-[700] text-ink-muted">EXPERIENCE</h3>
            <p className="mt-2 text-sm text-white/80">{job.experienceLevel || "As per requirements"}</p>
            <h3 className="mt-4 text-xs tracking-[0.12em] font-[700] text-ink-muted">EMPLOYMENT TYPE</h3>
            <p className="mt-2 text-sm text-white/80">{job.employmentType}</p>
          </div>
          <JobApplyForm jobId={job.id} jobTitle={job.title} />
          <div className="rounded-xl border border-line bg-surface-alt p-4 text-xs leading-5 text-ink-muted">
            By applying you consent to Nexara using your information to consider you for this and related opportunities. Resumes are stored securely — not at public URLs.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

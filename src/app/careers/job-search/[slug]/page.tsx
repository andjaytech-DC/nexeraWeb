import type { Metadata } from "next";
import Link from "next/link";
import type { Job } from "@prisma/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site-url";
import { contactInfo } from "@/lib/site-data";
import { safeDb, isDbConfigured } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BUILTIN_APPLY_EMAIL, BUILTIN_JOBS, BUILTIN_LISTED_AT, type BuiltinJob } from "@/lib/job-data";
import JobApplyForm from "./JobApplyForm";

/** DB job when configured, otherwise the matching approved built-in listing.
 *  `missing` is true only when no published built-in and no DB row exists —
 *  the page then renders a true 404 instead of a soft not-available screen. */
async function getJobOrBuiltin(slug: string): Promise<{ job: Job | null; fromDb: boolean; missing: boolean }> {
  if (!isDbConfigured()) {
    const builtin = BUILTIN_JOBS.find((j) => j.slug === slug);
    return { job: builtin ? builtinToJob(builtin) : null, fromDb: false, missing: !builtin };
  }
  const dbJob = await safeDb(async (db) => db.job.findUnique({ where: { slug } }), null as Job | null);
  // A DB row exists but is unpublished → "hidden" intent → not-available
  // screen (never leak which slugs exist). No row at all → missing.
  return { job: dbJob, fromDb: true, missing: !dbJob };
}

/** Shapes a built-in listing as a Job so the detail page needs one render path. */
function builtinToJob(j: BuiltinJob): Job {
  return {
    id: `builtin:${j.slug}`,
    title: j.title,
    slug: j.slug,
    department: j.department,
    location: j.location,
    employmentType: j.employmentType,
    experienceLevel: j.experienceLevel,
    description: j.description,
    responsibilities: j.responsibilities,
    requirements: j.requirements,
    preferredSkills: j.preferredSkills,
    applyEmail: BUILTIN_APPLY_EMAIL,
    workMode: j.workMode,
    shiftInfo: j.shiftInfo,
    status: "Published",
    isPublished: true,
    createdAt: BUILTIN_LISTED_AT,
    updatedAt: BUILTIN_LISTED_AT,
    applications: [],
  } as unknown as Job;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { job } = await getJobOrBuiltin(slug);
  if (!job || !job.isPublished || job.status !== "Published") return { title: "Job", robots: { index: false } };
  return {
    title: job.title,
    description: job.description.slice(0, 155),
    alternates: { canonical: `/careers/job-search/${slug}` },
    openGraph: { title: job.title, description: job.description.slice(0, 155) },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { job, fromDb, missing } = await getJobOrBuiltin(slug);
  if (!job && missing) notFound();

  if (!job || !job.isPublished || job.status !== "Published") {
    return (
      <div className="bg-canvas text-ink">
        <Header />
        <div className="mx-auto max-w-[800px] px-5 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-[28px] font-[800] tracking-[-0.03em] text-ink">Position not available</h1>
          <p className="mt-3 text-sm leading-6 text-ink-secondary">This opening is not currently published. Explore other opportunities or share your resume for future roles.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/careers/job-search" className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-[600] text-ink">Back to Job Search</Link>
            <Link href="/careers/send-resume" className="rounded-full bg-brand px-5 py-2.5 text-sm font-[700] text-white">Send Your Resume →</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const applyEmail = job.applyEmail || contactInfo.email;
  const applySubject = `Application: ${job.title}`;
  const applyBody = [
    `Hello Nexara Team,`,
    ``,
    `I am applying for the ${job.title} position listed on your careers page.`,
    ``,
    `My resume is attached. Contact details:`,
    `Name: `,
    `Email: `,
    `Phone: `,
    `Location: `,
    ``,
    `Looking forward to hearing from you.`,
    ``,
    `Best regards,`,
  ].join("\n");

  const jsonLd: Record<string, unknown> = {
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
          <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] font-[700] text-ink-muted">
            <Link href="/careers" className="hover:text-brand">CAREERS</Link><span>/</span>
            <Link href="/careers/job-search" className="hover:text-brand">JOB SEARCH</Link><span>/</span>
            <span className="text-ink-secondary">{job.title.toUpperCase()}</span>
          </div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[32px] sm:text-[40px] font-[800] tracking-[-0.03em] leading-[1.05] text-ink">{job.title}</h1>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-line bg-surface-alt px-3 py-1.5 text-ink-secondary">{job.department}</span>
            <span className="rounded-full border border-line bg-surface-alt px-3 py-1.5 text-ink-secondary">{job.location}</span>
            <span className="rounded-full border border-line bg-surface-alt px-3 py-1.5 text-ink-secondary">{job.employmentType}</span>
            <span className="rounded-full border border-line bg-surface-alt px-3 py-1.5 text-ink-secondary">{job.experienceLevel || "Experience: as per role"}</span>
            {job.workMode && <span className="rounded-full border border-line bg-surface-alt px-3 py-1.5 text-ink-secondary">{job.workMode}</span>}
            {job.shiftInfo && <span className="rounded-full border border-line bg-surface-alt px-3 py-1.5 text-ink-secondary">{job.shiftInfo}</span>}
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
            <MultiLineList text={job.responsibilities} />
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h2 className="text-sm font-[700] text-ink">Required skills</h2>
            <MultiLineList text={job.requirements} />
          </div>
          {job.preferredSkills && (
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-sm font-[700] text-ink">Preferred skills</h2>
              <MultiLineList text={job.preferredSkills} />
            </div>
          )}
          <div className="rounded-2xl border border-line bg-surface-alt p-7">
            <h2 className="text-xs tracking-[0.12em] font-[700] text-ink-muted">ELIGIBILITY & WORK SETUP</h2>
            <dl className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-[700] text-ink-muted">Experience</dt>
                <dd className="mt-1 text-sm text-ink-secondary">{job.experienceLevel || "As per requirements"}</dd>
              </div>
              <div>
                <dt className="text-xs font-[700] text-ink-muted">Location</dt>
                <dd className="mt-1 text-sm text-ink-secondary">{job.location}</dd>
              </div>
              <div>
                <dt className="text-xs font-[700] text-ink-muted">Work mode</dt>
                <dd className="mt-1 text-sm text-ink-secondary">{job.workMode || "As per role requirements"}</dd>
              </div>
              <div>
                <dt className="text-xs font-[700] text-ink-muted">Shift</dt>
                <dd className="mt-1 text-sm text-ink-secondary">{job.shiftInfo || "As per role requirements"}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="space-y-6 lg:sticky lg:top-[84px] self-start">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h3 className="text-xs tracking-[0.12em] font-[700] text-ink-muted">HOW TO APPLY</h3>
            {fromDb ? (
              <p className="mt-2 text-sm leading-6 text-ink-secondary">
                Apply with the form below, or email us your CV/resume directly — applications from either route reach the same inbox.
              </p>
            ) : (
              <p className="mt-2 text-sm leading-6 text-ink-secondary">
                Email us your CV/resume using the button below — it opens a pre-filled application for this role. Your application lands in our hiring inbox directly.
              </p>
            )}
          </div>
          {fromDb && <JobApplyForm jobId={job.id} jobTitle={job.title} />}
          <a
            href={`mailto:${applyEmail}?subject=${encodeURIComponent(applySubject)}&body=${encodeURIComponent(applyBody)}`}
            className={
              fromDb
                ? "flex w-full items-center justify-center gap-2 rounded-full border border-line bg-surface-alt px-6 py-3 text-sm font-[700] text-ink transition hover:border-brand hover:text-brand"
                : "flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-[700] text-white transition hover:bg-brand-hover"
            }
          >
            Apply by Email <span aria-hidden>→</span>
            <span className="sr-only"> for {job.title}</span>
          </a>
          <div className="rounded-xl border border-line bg-surface-alt p-4 text-xs leading-5 text-ink-muted">
            By applying you consent to Nexara using your information to consider you for this and related opportunities. Resumes are stored securely — not at public URLs.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/** Renders newline/“•”-separated free text as list items without inventing content. */
function MultiLineList({ text }: { text: string }) {
  const items = text
    .split(/\r?\n|\u2022/)
    .map((s) => s.replace(/^[\s\-*·]+/, "").trim())
    .filter(Boolean);
  if (items.length <= 1) {
    return <p className="mt-3 text-sm leading-7 text-ink-secondary whitespace-pre-wrap">{text}</p>;
  }
  return (
    <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-secondary">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

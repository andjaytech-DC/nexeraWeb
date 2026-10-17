import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Students & Entry Level — Careers",
  description: "For students, recent graduates and early-career professionals — software development, AI & data, QA, UI/UX, mobile, cloud and business operations.",
  alternates: { canonical: "/careers/students" },
  openGraph: { title: "Students & Entry Level — Careers", description: "For students, recent graduates and early-career professionals — software development, AI & data, QA, UI/UX, mobile, cloud and business operations." },
};

export default function StudentsPage() {
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] font-[700] text-ink-muted"><Link href="/careers" className="hover:text-brand">CAREERS</Link><span>/</span><span className="text-ink-secondary">STUDENTS</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[32px] sm:text-[40px] font-[800] tracking-[-0.03em] text-ink">Students & Entry Level</h1>
          <p className="mt-3 max-w-[640px] text-sm leading-6 text-ink-secondary">For students, recent graduates, entry-level developers, interns and early-career technology professionals looking to build a foundation in real product and platform work.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-[1.3fr_0.9fr] gap-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h2 className="text-sm font-[700] text-ink">Possible areas</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
              {["Software Development","AI & Data","QA","UI/UX","Mobile","Cloud / DevOps","Business Operations"].map((t) => (
                <span key={t} className="rounded-xl border border-line bg-surface-alt px-3.5 py-2.5 text-sm text-ink-secondary">{t}</span>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-ink-muted">We only offer internships or graduate programs where Nexara has confirmed capacity. Listings appear in Job Search when available.</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface-alt p-7">
            <h3 className="text-sm font-[700] text-ink">What you&apos;ll learn</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-secondary">
              <li className="flex gap-2"><span className="text-brand">•</span> Working in real stacks — not isolated exercises</li>
              <li className="flex gap-2"><span className="text-brand">•</span> Code review, QA and delivery in sprints</li>
              <li className="flex gap-2"><span className="text-brand">•</span> Mentorship from senior engineering where available</li>
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-brand-line bg-brand-soft p-7">
            <h3 className="text-sm font-[700] text-ink">Explore open student roles</h3>
            <p className="mt-2 text-sm text-white/80">When internships or entry-level roles are open, they appear in Job Search with experience level “Entry”.</p>
            <Link href="/careers/job-search" className="mt-4 inline-flex rounded-full bg-brand text-white px-5 py-2.5 text-sm font-[700] hover:bg-brand-hover">View Job Search →</Link>
          </div>
          <div className="rounded-2xl bg-brand p-7 text-white">
            <h3 className="text-sm font-[700]">No suitable opening now?</h3>
            <p className="mt-2 text-sm text-white/80">Share your profile and we&apos;ll consider it for future early-career opportunities.</p>
            <Link href="/careers/send-resume" className="mt-4 inline-flex rounded-full bg-brand text-white px-5 py-2.5 text-sm font-[700]">Send Your Resume →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

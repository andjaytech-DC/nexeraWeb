import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contract Opportunities — Careers",
  description: "Flexible contract opportunities for engineers, designers, QA, mobile, AI, DevOps and operations specialists — where Nexara engages contractors.",
  alternates: { canonical: "/careers/contract-opportunities" },
  openGraph: { title: "Contract Opportunities — Careers", description: "Flexible contract opportunities for engineers, designers, QA, mobile, AI, DevOps and operations specialists — where Nexara engages contractors." },
};

export default function ContractPage() {
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] font-[700] text-ink-muted"><Link href="/careers" className="hover:text-brand">CAREERS</Link><span>/</span><span className="text-ink-secondary">CONTRACT</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[32px] sm:text-[40px] font-[800] tracking-[-0.03em] text-ink">Contract Opportunities</h1>
          <p className="mt-3 max-w-[640px] text-sm leading-6 text-ink-secondary">Flexible engagements where Nexara works with specialist talent. We only list contract roles we genuinely intend to fill — no placeholder vacancies.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-[1.3fr_0.9fr] gap-8">
        <div className="rounded-2xl border border-line bg-surface p-7">
          <h2 className="text-sm font-[700] text-ink">Potential categories</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
            {["Software Engineers","QA Engineers","UI/UX Designers","Mobile Developers","AI Engineers","DevOps Engineers","Technical Specialists","BPO / Operations Specialists"].map((t) => (
              <span key={t} className="rounded-xl border border-line bg-surface-alt px-3.5 py-2.5 text-sm text-ink-secondary">{t}</span>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-ink-muted">We do not claim positions are currently available unless genuine openings exist. Check Job Search and filter by Contract.</p>
          <Link href="/careers/job-search" className="mt-4 inline-flex text-xs font-[600] text-brand hover:text-brand">Search contract roles →</Link>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h3 className="text-sm font-[700] text-ink">How contracting works</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-secondary">
              <li className="flex gap-2"><span className="text-brand">•</span> Scoped deliverables or capacity-based</li>
              <li className="flex gap-2"><span className="text-brand">•</span> Integrate with our delivery rhythm</li>
              <li className="flex gap-2"><span className="text-brand">•</span> Governed by quality and delivery milestones</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-brand p-7 text-white">
            <h3 className="text-sm font-[700]">Interested in contract work?</h3>
            <p className="mt-2 text-sm text-white/80">Submit your profile — we&apos;ll consider it when a relevant contract need arises.</p>
            <Link href="/careers/send-resume" className="mt-4 inline-flex rounded-full bg-brand text-white px-5 py-2.5 text-sm font-[700]">Submit Your Profile →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

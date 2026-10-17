import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { solutions } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Outcome-based solutions: Digital Transformation, Intelligent Automation, Product Engineering, Enterprise Technology, AI-Powered Software, Digital Platforms, Business Process Transformation and System Integration.",
  alternates: { canonical: "/solutions" },
  openGraph: { title: "Solutions", description: "Outcome-based solutions: Digital Transformation, Intelligent Automation, Product Engineering, Enterprise Technology, AI-Powered Software, Digital Platforms, Business Process Transformation and System Integration." },
};

export default function SolutionsPage() {
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(49,94,251,0.07),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-[11px] tracking-[0.18em] font-[700] text-brand">SOLUTIONS</p>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[36px] sm:text-[48px] font-[800] tracking-[-0.04em] leading-[0.9] text-ink">Solutions That Move<br /> Businesses Forward</h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-ink-secondary">Organized around business outcomes — not technology buzzwords. Each solution is a dedicated destination connecting challenge, approach, capabilities and outcomes.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/contact?type=new-project" className="rounded-full bg-brand px-5 py-2.5 text-sm font-[700] text-white hover:bg-brand-hover transition">Start a Project â†’</Link>
            <Link href="/process" className="rounded-full border border-line-strong bg-surface px-5 py-2.5 text-sm font-[600] text-ink hover:border-brand hover:text-brand transition">How we deliver â†’</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid md:grid-cols-2 gap-5">
          {solutions.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`} className="group rounded-[20px] border border-line bg-surface p-7 hover:border-brand-line hover:bg-surface-alt transition flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.14em] font-[700] text-ink-muted">{s.k} — SOLUTION</span>
                <span className="h-8 w-8 rounded-full border border-line bg-surface-alt flex items-center justify-center text-ink-muted group-hover:text-brand transition">â†—</span>
              </div>
              <h2 className="mt-3 text-[18px] font-[700] tracking-[-0.01em] text-ink group-hover:text-brand">{s.title}</h2>
              <p className="mt-2 text-[13px] leading-6 text-ink-secondary flex-1">{s.desc}</p>
              <ul className="mt-4 space-y-1.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-ink-secondary"><span className="h-1 w-1 rounded-full bg-brand/70" />{b}</li>
                ))}
              </ul>
              <span className="mt-6 inline-flex text-xs font-[700] tracking-[0.08em] text-brand group-hover:text-brand">EXPLORE SOLUTION â†’</span>
            </Link>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-line bg-surface-alt px-6 py-6 flex flex-col lg:flex-row gap-6 justify-between">
          <div>
            <h3 className="text-sm font-[700] text-ink">Not sure which solution fits?</h3>
            <p className="mt-1 text-sm text-ink-secondary">Talk to our team — we map your business challenge to the right approach before proposing technology.</p>
          </div>
          <Link href="/contact" className="shrink-0 self-start lg:self-center rounded-full bg-brand text-white px-6 py-2.5 text-sm font-[700] hover:bg-brand-hover transition">Talk to our team â†’</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}


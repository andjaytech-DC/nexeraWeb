import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export const metadata: Metadata = {
  title: "Product Engineering — Solutions",
  description: "Transform an idea into a scalable digital product — from discovery to deployment.",
  alternates: { canonical: "/solutions/product-engineering" },
  openGraph: { title: "Product Engineering — Solutions", description: "Transform an idea into a scalable digital product — from discovery to deployment." },
};
export default function Page(){
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.16em] font-[700] text-ink-muted"><Link href="/solutions" className="hover:text-brand">SOLUTIONS</Link><span>/</span><span className="text-brand">03</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[34px] sm:text-[46px] font-[800] tracking-[-0.04em] leading-[0.9] text-ink">Product Engineering</h1>
          <p className="mt-3 text-[18px] sm:text-[20px] font-[600] tracking-[-0.02em] text-ink-secondary">From idea to product, engineered to scale.</p>
          <p className="mt-4 max-w-[640px] text-sm leading-6 text-ink-secondary">Transform an idea into a scalable digital product — from discovery to deployment. Business challenge first — technology in service of outcomes.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact?type=new-project" className="rounded-full bg-brand px-6 py-2.5 text-sm font-[700] text-white hover:bg-brand-hover transition">Start a Project →</Link>
            <Link href="/process" className="rounded-full border border-line bg-surface-alt px-6 py-2.5 text-sm font-[600] text-ink hover:bg-surface-alt transition">How we deliver →</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14 grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h2 className="text-xs tracking-[0.14em] font-[700] text-brand">THE CHALLENGE</h2>
            <ul className="mt-4 space-y-3">
              {["Unclear product requirements and scope","Design that doesn't convert to engineering","MVP that can't scale past launch","No sustainable delivery rhythm"].map((t)=>(
                <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand-line bg-brand-soft p-7">
            <h2 className="text-xs tracking-[0.14em] font-[700] text-ink">WHAT NEXARA SOLVES</h2>
            <p className="mt-3 text-sm leading-6 text-ink">Nexara runs discovery → architecture → UX → build → launch as one accountable delivery partner — with modern architecture and iterative delivery.</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">APPROACH</h2>
            <ol className="mt-4 grid gap-3">
              {["Discover — goals, users, constraints","Define — roadmap, architecture, scope","Design — UX and system design","Build & Launch — sprints, QA, deployment"].map((t,i)=>(
                <li key={t} className="flex gap-3 rounded-xl border border-line bg-surface-alt px-4 py-3">
                  <span className="h-7 w-7 rounded-lg bg-brand text-white text-xs font-[800] flex items-center justify-center shrink-0">{String(i+1).padStart(2,"0")}</span>
                  <span className="text-sm text-ink-secondary">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">CAPABILITIES</h2>
            <ul className="mt-4 space-y-2.5">
              {["Discovery & product roadmap","UX/UI and design systems","Architecture & MVP delivery","Product development (web & mobile)","QA, security and deployment","Continuous improvement"].map((t)=>(
                <li key={t} className="flex items-center gap-2 text-sm text-ink-secondary"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-success-line bg-success-soft p-7">
            <h2 className="text-xs tracking-[0.14em] font-[700] text-success">BUSINESS OUTCOMES</h2>
            <ul className="mt-4 space-y-2">
              {["Clear roadmap and scope","Product that is usable and maintainable","Launch-ready with quality and security","Partner for evolution after launch"].map((t)=>(
                <li key={t} className="text-sm text-ink-secondary flex gap-2"><span className="text-success">✓</span>{t}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ink-muted">Outcomes are observable improvements. Measurable results are added with client permission when available.</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface-alt p-7">
            <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">RELATED SERVICES</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {["SaaS Development","Mobile App Development","iOS Development","Cloud & Integration"].map((t)=>(
                <span key={t} className="rounded-full border border-line bg-surface-alt px-3.5 py-1.5 text-xs font-[500] text-ink-secondary">{t}</span>
              ))}
            </div>
            <Link href="/services" className="mt-4 inline-flex text-xs font-[600] text-brand hover:text-brand">View all services →</Link>
          </div>
          <div className="rounded-2xl bg-brand p-7 text-white">
            <h3 className="text-sm font-[700]">Ready to explore product engineering?</h3>
            <p className="mt-2 text-sm text-white/80">We map your challenge to the right approach before proposing technology.</p>
            <Link href="/contact?type=new-project" className="mt-4 inline-flex rounded-full bg-white text-brand px-5 py-2.5 text-sm font-[700] hover:bg-brand-soft transition">Start a Project →</Link>
          </div>
        </div>
      </section>
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-6 justify-between">
          <div>
            <h2 className="text-sm font-[700] text-ink">How Nexara delivers product engineering</h2>
            <p className="mt-1 text-sm text-ink-secondary">Discover → Define → Design → Build → Launch → Evolve. Transparent sprints, architecture reviews, security and documentation.</p>
          </div>
          <Link href="/process" className="shrink-0 self-start lg:self-center rounded-full border border-line bg-surface px-6 py-2.5 text-sm font-[600] text-ink hover:bg-surface-alt transition">View process →</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

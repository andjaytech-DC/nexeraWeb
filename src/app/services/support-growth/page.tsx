import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Support & Digital Growth — Services",
  description: "Website and application maintenance, performance and accessibility improvements, technical SEO, analytics, conversion optimization and continuous product support.",
  alternates: { canonical: "/services/support-growth" },
  openGraph: { title: "Support & Digital Growth — Services", description: "Maintenance, performance, accessibility, technical SEO, analytics and conversion optimization for websites and applications." },
};

export default function Page() {
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.16em] font-[700] text-ink-muted"><Link href="/services" className="hover:text-brand">SERVICES</Link><span>/</span><span className="text-ink-secondary">Support &amp; Digital Growth</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[34px] sm:text-[46px] font-[800] tracking-[-0.04em] leading-[0.9] text-ink">Support &amp; Digital Growth</h1>
          <p className="mt-4 max-w-[640px] text-sm leading-6 text-ink-secondary">Launch is the starting line. We keep your website and applications healthy — and improve them against real numbers. <span className="text-ink-secondary">Maintenance, performance, technical SEO, analytics and conversion optimization.</span></p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact?type=new-project" className="rounded-full bg-brand px-6 py-2.5 text-sm font-[700] text-white hover:bg-brand-hover transition">Discuss Your Project →</Link>
            <Link href="/services/resource-management" className="rounded-full border border-line bg-surface-alt px-6 py-2.5 text-sm font-[600] text-ink hover:bg-surface-alt transition">Need a dedicated team?</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1.35fr_0.85fr] gap-8">
          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-brand">BUSINESS PROBLEMS ADDRESSED</h2>
              <ul className="mt-4 space-y-2.5">
                {["Product launched — then nobody maintained it","Page experience is slow and rankings slip","Nobody can say which pages and flows convert","Fixes queue behind developers who have moved on"].map(t=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">WHAT WE COVER</h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
                {["Website and application maintenance","Bug fixes and security updates","Performance and accessibility improvements","Technical SEO and analytics","Conversion optimization","Product enhancements and modernization","Monitoring, backup and recovery","Managed support and continuous improvement"].map(t=>(
                  <span key={t} className="rounded-xl border border-line bg-surface-alt px-3.5 py-2.5 text-sm text-ink-secondary">{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">TYPICAL USE CASES</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Post-launch retainers","Marketing-site growth programs","Legacy cleanup & modernization","Analytics & reporting setup","Seasonal campaign support"].map(t=>(
                  <span key={t} className="rounded-full border border-line bg-surface-alt px-3.5 py-1.5 text-xs font-[500] text-ink-secondary">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">HOW IT WORKS</h2>
              <ol className="mt-4 space-y-2.5">
                {["Audit — health, performance, SEO and accessibility baseline","Prioritize — risks first, then growth opportunities","Fix and improve — in scheduled, reported increments","Measure — analytics review against agreed metrics","Repeat — monthly cycle of improvements and reporting"].map((t,i)=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="h-6 w-6 rounded-lg bg-surface-alt border border-line flex items-center justify-center text-xs font-[700] text-ink-secondary shrink-0">{i+1}</span>{t}</li>
                ))}
              </ol>
              <p className="mt-4 text-xs text-ink-muted">Engagements are scoped per system — retainers for ongoing support, or project-based for defined improvements.</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-alt p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">RELATED SERVICES</h2>
              <div className="mt-3 space-y-1.5">
                {[["Website Design & Development","/services/website-development"],["Custom Web Applications","/services/web-app-development"],["Cloud & Integration (operations)","/services/cloud-integration"],["Resource Management (dedicated capacity)","/services/resource-management"]].map(([label,href])=>(
                  <Link key={href} href={href} className="block text-sm font-[600] text-ink-secondary hover:text-brand transition">{label} →</Link>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">FAQ</h2>
              <div className="mt-4 space-y-4">
                {[["Do you support systems you did not build?","Often yes — it starts with an audit to understand the stack, deployment and risks before committing to ongoing support."],["Retainer or project-based?","Retainer suits sites and apps under continuous change; project-based suits a defined backlog. We advise based on the change rate, not the other way round."]].map(([q,a])=>(
                  <div key={q}><div className="text-sm font-[600] text-ink">{q}</div><div className="mt-1 text-sm leading-6 text-ink-secondary">{a}</div></div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-brand p-7 text-white">
              <h3 className="text-sm font-[700]">Need someone accountable for your digital products?</h3>
              <p className="mt-2 text-sm text-white/80">Start with an audit — we will show you what needs fixing and what is worth improving, in plain language.</p>
              <Link href="/contact?type=new-project" className="mt-4 inline-flex rounded-full bg-white text-brand px-5 py-2.5 text-sm font-[700] hover:bg-brand-soft transition">Discuss Your Project →</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

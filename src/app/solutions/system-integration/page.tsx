import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export const metadata: Metadata = {
  title: "System Integration — Solutions | Nexara Global Solutions",
  description: "Make systems share data, trigger workflows and deliver a unified operational view.",
};
export default function Page(){
  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.16em] font-[700] text-white/40"><Link href="/solutions" className="hover:text-white">SOLUTIONS</Link><span>/</span><span className="text-[#4F7EFF]">08</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[34px] sm:text-[46px] font-[800] tracking-[-0.04em] leading-[0.9] text-white">System Integration</h1>
          <p className="mt-3 text-[18px] sm:text-[20px] font-[600] tracking-[-0.02em] text-white/70">One connected enterprise, not a patchwork.</p>
          <p className="mt-4 max-w-[640px] text-sm leading-6 text-white/50">Make systems share data, trigger workflows and deliver a unified operational view. Business challenge first — technology in service of outcomes.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact?type=new-project" className="rounded-full bg-[#4F7EFF] px-6 py-2.5 text-sm font-[700] text-white hover:bg-[#3E6AF0] transition">Start a Project →</Link>
            <Link href="/process" className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-[600] text-white hover:bg-white/10 transition">How we deliver →</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14 grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h2 className="text-xs tracking-[0.14em] font-[700] text-[#4F7EFF]">THE CHALLENGE</h2>
            <ul className="mt-4 space-y-3">
              {["Point-to-point integrations that break","Duplicate data and reconciliation","No event-driven responsiveness","No observability across integrations"].map((t)=>(
                <li key={t} className="flex gap-3 text-sm leading-6 text-white/70"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#4F7EFF] shrink-0" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#4F7EFF]/15 bg-[#4F7EFF]/10 p-7">
            <h2 className="text-xs tracking-[0.14em] font-[700] text-white">WHAT NEXARA SOLVES</h2>
            <p className="mt-3 text-sm leading-6 text-white">Nexara designs the API and event layer that makes systems cooperate — with data integrity, security and observability.</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h2 className="text-xs tracking-[0.14em] font-[700] text-white/60">APPROACH</h2>
            <ol className="mt-4 grid gap-3">
              {["Diagnose — integration landscape","Design — API & event strategy","Integrate — build and migrate","Operate — monitor and evolve"].map((t,i)=>(
                <li key={t} className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
                  <span className="h-7 w-7 rounded-lg bg-[#4F7EFF] text-white text-xs font-[800] flex items-center justify-center shrink-0">{String(i+1).padStart(2,"0")}</span>
                  <span className="text-sm text-white/70">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h2 className="text-xs tracking-[0.14em] font-[700] text-white/60">CAPABILITIES</h2>
            <ul className="mt-4 space-y-2.5">
              {["API strategy & governance","Event-driven architecture","Data unification & MDM","Legacy system bridging","Security & access control","Monitoring and alerting"].map((t)=>(
                <li key={t} className="flex items-center gap-2 text-sm text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/10 p-7">
            <h2 className="text-xs tracking-[0.14em] font-[700] text-emerald-300">BUSINESS OUTCOMES</h2>
            <ul className="mt-4 space-y-2">
              {["Reliable, governed integrations","Single source of truth","Responsive, event-driven ops","Visible integration health"].map((t)=>(
                <li key={t} className="text-sm text-white/80 flex gap-2"><span className="text-emerald-300">✓</span>{t}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-white/40">Outcomes are observable improvements. Measurable results are added with client permission when available.</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-7">
            <h2 className="text-xs tracking-[0.14em] font-[700] text-white/60">RELATED SERVICES</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Cloud & Integration","Enterprise Software","CRM Development","ERP Development"].map((t)=>(
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-[500] text-white/60">{t}</span>
              ))}
            </div>
            <Link href="/services" className="mt-4 inline-flex text-xs font-[600] text-[#4F7EFF] hover:text-white">View all services →</Link>
          </div>
          <div className="rounded-2xl bg-[#4F7EFF] p-7 text-white">
            <h3 className="text-sm font-[700]">Ready to explore system integration?</h3>
            <p className="mt-2 text-sm text-white/80">We map your challenge to the right approach before proposing technology.</p>
            <Link href="/contact?type=new-project" className="mt-4 inline-flex rounded-full bg-white text-[#070A0F] px-5 py-2.5 text-sm font-[700] hover:bg-white/90 transition">Start a Project →</Link>
          </div>
        </div>
      </section>
      <section className="border-t border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-6 justify-between">
          <div>
            <h2 className="text-sm font-[700] text-white">How Nexara delivers system integration</h2>
            <p className="mt-1 text-sm text-white/50">Discover → Define → Design → Build → Launch → Evolve. Transparent sprints, architecture reviews, security and documentation.</p>
          </div>
          <Link href="/process" className="shrink-0 self-start lg:self-center rounded-full border border-white/10 bg-[#0F141E] px-6 py-2.5 text-sm font-[600] text-white hover:bg-white/10 transition">View process →</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

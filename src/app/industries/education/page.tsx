import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export const metadata: Metadata = {
  title: "Education — Industries | Nexara Global Solutions",
  description: "Education platforms coordinate students, faculty, operations and compliance — at institutional scale.",
};
export default function Page(){
  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.16em] font-[700] text-white/40"><Link href="/industries" className="hover:text-white">INDUSTRIES</Link><span>/</span><span className="text-white/60">Education</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[34px] sm:text-[46px] font-[800] tracking-[-0.04em] leading-[0.9] text-white">Education</h1>
          <p className="mt-4 max-w-[640px] text-sm leading-6 text-white/60">Education platforms coordinate students, faculty, operations and compliance — at institutional scale.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact?type=new-project" className="rounded-full bg-[#4F7EFF] px-6 py-2.5 text-sm font-[700] text-white hover:bg-[#3E6AF0] transition">Start a Project →</Link>
            <Link href="/contact" className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-[600] text-white hover:bg-white/10 transition">Talk to our team</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14 grid lg:grid-cols-[1.25fr_0.95fr] gap-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h2 className="text-xs tracking-[0.14em] font-[700] text-[#4F7EFF]">INDUSTRY CONTEXT</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">Education platforms coordinate students, faculty, operations and compliance — at institutional scale.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
              <h3 className="text-xs tracking-[0.14em] font-[700] text-white/60">COMMON CHALLENGES</h3>
              <ul className="mt-4 space-y-2.5">
                {["Student and course data fragmentation","Operations and fee workflows manual","No unified academic and ops view","Engagement across devices"].map(t=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-white/70"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#4F7EFF] shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
              <h3 className="text-xs tracking-[0.14em] font-[700] text-white/60">DIGITAL OPPORTUNITIES</h3>
              <ul className="mt-4 space-y-2.5">
                {["Student and course management platform","Fee, enrollment and operations workflows","Faculty and student portals","Mobile and analytics"].map(t=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-white/70"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#22D3EE] shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/10 p-7">
            <h3 className="text-xs tracking-[0.14em] font-[700] text-emerald-300">WHAT NEXARA BRINGS</h3>
            <p className="mt-3 text-sm leading-6 text-white/70">We adapt proven solution patterns — Enterprise Software, Mobile App Development, SaaS Development, Resource Management — to education operations, process and compliance, with integration to your existing estate.</p>
            <Link href="/solutions" className="mt-3 inline-flex text-xs font-[600] text-white hover:text-emerald-300">View relevant solutions →</Link>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h3 className="text-xs tracking-[0.14em] font-[700] text-white/60">CAPABILITIES</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Portals and workflows","Data and reporting","Mobile and integrations","Cloud deployment"].map(t=>(
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-[500] text-white/60">{t}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h3 className="text-xs tracking-[0.14em] font-[700] text-white/60">RELEVANT SERVICES</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Enterprise Software","Mobile App Development","SaaS Development","Resource Management"].map(t=>(
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-[500] text-white/60">{t}</span>
              ))}
            </div>
            <Link href="/services" className="mt-4 inline-flex text-xs font-[600] text-[#4F7EFF] hover:text-white">View services →</Link>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h3 className="text-xs tracking-[0.14em] font-[700] text-white/60">TECHNOLOGY POSSIBILITIES</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["React / Next.js","Node.js","PostgreSQL","AWS"].map(t=>(
                <span key={t} className="rounded-full border border-[#4F7EFF]/20 bg-[#4F7EFF]/10 px-3 py-1.5 text-xs font-[600] text-[#8AA8FF]">{t}</span>
              ))}
            </div>
            <Link href="/technologies" className="mt-3 inline-flex text-xs font-[600] text-white/50 hover:text-white">View technology →</Link>
          </div>
          <div className="rounded-2xl bg-[#4F7EFF] p-7 text-white">
            <h3 className="text-sm font-[700]">Explore Education with Nexara</h3>
            <p className="mt-2 text-sm text-white/80">We start with your business challenge — then map the right solution and delivery approach.</p>
            <Link href="/contact?type=new-project" className="mt-4 inline-flex rounded-full bg-white text-[#070A0F] px-5 py-2.5 text-sm font-[700] hover:bg-white/90 transition">Start a Project →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

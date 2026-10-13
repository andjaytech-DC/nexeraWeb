import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export const metadata: Metadata = {
  title: "BPO Services — Services | Nexara Global Solutions",
  description: "Technology-enabled business process outsourcing for scale and consistency.",
};
export default function Page(){
  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.16em] font-[700] text-white/40"><Link href="/services" className="hover:text-white">SERVICES</Link><span>/</span><span className="text-white/60">BPO Services</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[34px] sm:text-[46px] font-[800] tracking-[-0.04em] leading-[0.9] text-white">BPO Services</h1>
          <p className="mt-4 max-w-[640px] text-sm leading-6 text-white/60">Technology-enabled business process outsourcing for scale and consistency. <span className="text-white/80">BPO that improves consistency and scalability through technology — not just headcount.</span></p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact?type=new-project" className="rounded-full bg-[#4F7EFF] px-6 py-2.5 text-sm font-[700] text-white hover:bg-[#3E6AF0] transition">Start a Project →</Link>
            <Link href="/contact" className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-[600] text-white hover:bg-white/10 transition">Talk to our team</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1.35fr_0.85fr] gap-8">
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-[#4F7EFF]">BUSINESS PROBLEMS ADDRESSED</h2>
              <ul className="mt-4 space-y-2.5">
                {["Ops that are manual and inconsistent","Backlogs and SLA breaches","No workflow visibility","Scale that increases cost linearly"].map(t=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-white/70"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#4F7EFF] shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-white/60">CAPABILITIES</h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
                {["Customer support operations","Back-office and data processing","Technical support tiers","Workflow and SLA governance","Automation-assisted operations","Reporting and quality controls"].map(t=>(
                  <span key={t} className="rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white/70">{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-white/60">TYPICAL USE CASES</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Support and helpdesk","Back-office processing","Data operations","Managed business operations"].map(t=>(
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-[500] text-white/60">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-white/60">DELIVERY APPROACH</h2>
              <ol className="mt-4 space-y-2.5">
                {["Map the process and SLA","Design workflow and automation","Operate with governance and QA","Improve with data and automation"].map((t,i)=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-white/70"><span className="h-6 w-6 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-[700] text-white/70 shrink-0">{i+1}</span>{t}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-white/60">TECHNOLOGY APPROACH</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Workflow platforms","Automation and AI assistance","Analytics and dashboards"].map(t=>(
                  <span key={t} className="rounded-full border border-[#4F7EFF]/20 bg-[#4F7EFF]/10 px-3 py-1.5 text-xs font-[600] text-[#8AA8FF]">{t}</span>
                ))}
              </div>
              <p className="mt-3 text-xs text-white/40">Technology is chosen by requirements, scale and maintainability — only technologies we genuinely support are shown.</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-white/60">RELATED SOLUTIONS</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Business Process Transformation","Intelligent Automation","Resource Management"].map(t=>(
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-[500] text-white/60">{t}</span>
                ))}
              </div>
              <Link href="/solutions" className="mt-4 inline-flex text-xs font-[600] text-[#4F7EFF] hover:text-white">View solutions →</Link>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-white/60">FAQ</h2>
              <div className="mt-4 space-y-4">
                {[["Is this just staffing?","No — we combine process design, automation and operations with governance."]].map(([q,a])=>(
                  <div key={q}><div className="text-sm font-[600] text-white">{q}</div><div className="mt-1 text-sm leading-6 text-white/50">{a}</div></div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-[#4F7EFF] p-7 text-white">
              <h3 className="text-sm font-[700]">Build bpo services with Nexara?</h3>
              <p className="mt-2 text-sm text-white/80">We start with your business problem — then propose the right technology and delivery model.</p>
              <Link href="/contact?type=new-project" className="mt-4 inline-flex rounded-full bg-white text-[#070A0F] px-5 py-2.5 text-sm font-[700] hover:bg-white/90 transition">Start a Project →</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

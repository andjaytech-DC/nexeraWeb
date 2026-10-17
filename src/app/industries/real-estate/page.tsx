import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export const metadata: Metadata = {
  title: "Real Estate — Industries",
  description: "Real estate coordinates listings, customers, sales and service — with long lifecycle and high trust.",
  alternates: { canonical: "/industries/real-estate" },
  openGraph: { title: "Real Estate — Industries", description: "Real estate coordinates listings, customers, sales and service — with long lifecycle and high trust." },
};
export default function Page(){
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.16em] font-[700] text-ink-muted"><Link href="/industries" className="hover:text-brand">INDUSTRIES</Link><span>/</span><span className="text-ink-secondary">Real Estate</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[34px] sm:text-[46px] font-[800] tracking-[-0.04em] leading-[0.9] text-ink">Real Estate</h1>
          <p className="mt-4 max-w-[640px] text-sm leading-6 text-ink-secondary">Real estate coordinates listings, customers, sales and service — with long lifecycle and high trust.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact?type=new-project" className="rounded-full bg-brand px-6 py-2.5 text-sm font-[700] text-white hover:bg-brand-hover transition">Start a Project →</Link>
            <Link href="/contact" className="rounded-full border border-line bg-surface-alt px-6 py-2.5 text-sm font-[600] text-ink hover:bg-surface-alt transition">Talk to our team</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14 grid lg:grid-cols-[1.25fr_0.95fr] gap-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h2 className="text-xs tracking-[0.14em] font-[700] text-brand">INDUSTRY CONTEXT</h2>
            <p className="mt-3 text-sm leading-6 text-ink-secondary">Real estate coordinates listings, customers, sales and service — with long lifecycle and high trust.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h3 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">COMMON CHALLENGES</h3>
              <ul className="mt-4 space-y-2.5">
                {["Listing and customer data scattered","Sales pipeline not visible","Service and handover gaps","No unified property and customer view"].map(t=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h3 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">DIGITAL OPPORTUNITIES</h3>
              <ul className="mt-4 space-y-2.5">
                {["Listing and CRM platform","Sales pipeline and forecasting","Customer and service portal","Document and workflow automation"].map(t=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-2xl border border-success-line bg-success-soft p-7">
            <h3 className="text-xs tracking-[0.14em] font-[700] text-success">WHAT NEXARA BRINGS</h3>
            <p className="mt-3 text-sm leading-6 text-ink-secondary">We adapt proven solution patterns — CRM Development, Enterprise Software, Mobile App Development, Cloud & Integration — to real estate operations, process and compliance, with integration to your existing estate.</p>
            <Link href="/solutions" className="mt-3 inline-flex text-xs font-[600] text-ink hover:text-success">View relevant solutions →</Link>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h3 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">CAPABILITIES</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["CRM and portals","Document workflows","Mobile and integrations","Analytics"].map(t=>(
                <span key={t} className="rounded-full border border-line bg-surface-alt px-3.5 py-1.5 text-xs font-[500] text-ink-secondary">{t}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h3 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">RELEVANT SERVICES</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["CRM Development","Enterprise Software","Mobile App Development","Cloud & Integration"].map(t=>(
                <span key={t} className="rounded-full border border-line bg-surface-alt px-3 py-1.5 text-xs font-[500] text-ink-secondary">{t}</span>
              ))}
            </div>
            <Link href="/services" className="mt-4 inline-flex text-xs font-[600] text-brand hover:text-brand">View services →</Link>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h3 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">TECHNOLOGY POSSIBILITIES</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["React","Node.js","PostgreSQL","AWS / Azure"].map(t=>(
                <span key={t} className="rounded-full border border-brand-line bg-brand-soft px-3 py-1.5 text-xs font-[600] text-brand">{t}</span>
              ))}
            </div>
            <Link href="/technologies" className="mt-3 inline-flex text-xs font-[600] text-ink-secondary hover:text-brand">View technology →</Link>
          </div>
          <div className="rounded-2xl bg-brand p-7 text-white">
            <h3 className="text-sm font-[700]">Explore Real Estate with Nexara</h3>
            <p className="mt-2 text-sm text-white/80">We start with your business challenge — then map the right solution and delivery approach.</p>
            <Link href="/contact?type=new-project" className="mt-4 inline-flex rounded-full bg-white text-brand px-5 py-2.5 text-sm font-[700] hover:bg-brand-soft transition">Start a Project →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

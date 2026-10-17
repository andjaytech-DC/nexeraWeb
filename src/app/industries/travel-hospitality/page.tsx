import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export const metadata: Metadata = {
  title: "Travel & Hospitality — Industries",
  description: "Travel and hospitality coordinate bookings, operations and guest experience — with seasonality and high volume.",
  alternates: { canonical: "/industries/travel-hospitality" },
  openGraph: { title: "Travel & Hospitality — Industries", description: "Travel and hospitality coordinate bookings, operations and guest experience — with seasonality and high volume." },
};
export default function Page(){
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.16em] font-[700] text-ink-muted"><Link href="/industries" className="hover:text-brand">INDUSTRIES</Link><span>/</span><span className="text-ink-secondary">Travel & Hospitality</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[34px] sm:text-[46px] font-[800] tracking-[-0.04em] leading-[0.9] text-ink">Travel & Hospitality</h1>
          <p className="mt-4 max-w-[640px] text-sm leading-6 text-ink-secondary">Travel and hospitality coordinate bookings, operations and guest experience — with seasonality and high volume.</p>
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
            <p className="mt-3 text-sm leading-6 text-ink-secondary">Travel and hospitality coordinate bookings, operations and guest experience — with seasonality and high volume.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h3 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">COMMON CHALLENGES</h3>
              <ul className="mt-4 space-y-2.5">
                {["Bookings and operations not connected","Guest experience fragmented","Operations that spike with season","No unified guest and ops view"].map(t=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h3 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">DIGITAL OPPORTUNITIES</h3>
              <ul className="mt-4 space-y-2.5">
                {["Booking and operations platform","Guest portal and mobile experience","Operations and staff workflows","Analytics and personalization hooks"].map(t=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-2xl border border-success-line bg-success-soft p-7">
            <h3 className="text-xs tracking-[0.14em] font-[700] text-success">WHAT NEXARA BRINGS</h3>
            <p className="mt-3 text-sm leading-6 text-ink-secondary">We adapt proven solution patterns — SaaS Development, Mobile App Development, Enterprise Software, BPO Services — to travel & hospitality operations, process and compliance, with integration to your existing estate.</p>
            <Link href="/solutions" className="mt-3 inline-flex text-xs font-[600] text-ink hover:text-success">View relevant solutions →</Link>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h3 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">CAPABILITIES</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Booking and ops platform","Guest portal and mobile","Operations workflows","Integration and analytics"].map(t=>(
                <span key={t} className="rounded-full border border-line bg-surface-alt px-3.5 py-1.5 text-xs font-[500] text-ink-secondary">{t}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h3 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">RELEVANT SERVICES</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["SaaS Development","Mobile App Development","Enterprise Software","BPO Services"].map(t=>(
                <span key={t} className="rounded-full border border-line bg-surface-alt px-3 py-1.5 text-xs font-[500] text-ink-secondary">{t}</span>
              ))}
            </div>
            <Link href="/services" className="mt-4 inline-flex text-xs font-[600] text-brand hover:text-brand">View services →</Link>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h3 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">TECHNOLOGY POSSIBILITIES</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["React / Next.js","Node.js","PostgreSQL","AWS"].map(t=>(
                <span key={t} className="rounded-full border border-brand-line bg-brand-soft px-3 py-1.5 text-xs font-[600] text-brand">{t}</span>
              ))}
            </div>
            <Link href="/technologies" className="mt-3 inline-flex text-xs font-[600] text-ink-secondary hover:text-brand">View technology →</Link>
          </div>
          <div className="rounded-2xl bg-brand p-7 text-white">
            <h3 className="text-sm font-[700]">Explore Travel & Hospitality with Nexara</h3>
            <p className="mt-2 text-sm text-white/80">We start with your business challenge — then map the right solution and delivery approach.</p>
            <Link href="/contact?type=new-project" className="mt-4 inline-flex rounded-full bg-white text-brand px-5 py-2.5 text-sm font-[700] hover:bg-brand-soft transition">Start a Project →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

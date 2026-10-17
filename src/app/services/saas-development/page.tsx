import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export const metadata: Metadata = {
  title: "SaaS Development — Services",
  description: "End-to-end SaaS product engineering from architecture to production.",
  alternates: { canonical: "/services/saas-development" },
  openGraph: { title: "SaaS Development — Services", description: "End-to-end SaaS product engineering from architecture to production." },
};
export default function Page(){
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.16em] font-[700] text-ink-muted"><Link href="/services" className="hover:text-brand">SERVICES</Link><span>/</span><span className="text-ink-secondary">SaaS Development</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[34px] sm:text-[46px] font-[800] tracking-[-0.04em] leading-[0.9] text-ink">SaaS Development</h1>
          <p className="mt-4 max-w-[640px] text-sm leading-6 text-ink-secondary">End-to-end SaaS product engineering from architecture to production. <span className="text-ink-secondary">A SaaS product engineered for multi-tenancy, billing, scale and operability — not just features.</span></p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact?type=new-project" className="rounded-full bg-brand px-6 py-2.5 text-sm font-[700] text-white hover:bg-brand-hover transition">Start a Project →</Link>
            <Link href="/contact" className="rounded-full border border-line bg-surface-alt px-6 py-2.5 text-sm font-[600] text-ink hover:bg-surface-alt transition">Talk to our team</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1.35fr_0.85fr] gap-8">
          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-brand">BUSINESS PROBLEMS ADDRESSED</h2>
              <ul className="mt-4 space-y-2.5">
                {["Single-tenant architecture that can't scale","Billing and subscription complexity","Tenant isolation and security risk","Release velocity that is slow and risky"].map(t=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">CAPABILITIES</h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
                {["Multi-tenant architecture and isolation","Subscription, billing and entitlements","Onboarding and tenant management","APIs, webhooks and integrations","Analytics and usage metering","DevOps, observability and CI/CD"].map(t=>(
                  <span key={t} className="rounded-xl border border-line bg-surface-alt px-3.5 py-2.5 text-sm text-ink-secondary">{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">TYPICAL USE CASES</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["B2B SaaS platforms","Marketplace and portal products","Subscription software","Data and analytics products"].map(t=>(
                  <span key={t} className="rounded-full border border-line bg-surface-alt px-3.5 py-1.5 text-xs font-[500] text-ink-secondary">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">DELIVERY APPROACH</h2>
              <ol className="mt-4 space-y-2.5">
                {["Architect for tenants and scale","Build product, billing and APIs","Launch on cloud with observability","Grow — onboard tenants and iterate"].map((t,i)=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="h-6 w-6 rounded-lg bg-surface-alt border border-line flex items-center justify-center text-xs font-[700] text-ink-secondary shrink-0">{i+1}</span>{t}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">TECHNOLOGY APPROACH</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Next.js / React","Node.js / NestJS","PostgreSQL / Redis","AWS / GCP / Docker / Kubernetes"].map(t=>(
                  <span key={t} className="rounded-full border border-brand-line bg-brand-soft px-3 py-1.5 text-xs font-[600] text-brand">{t}</span>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-muted">Technology is chosen by requirements, scale and maintainability — only technologies we genuinely support are shown.</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-alt p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">RELATED SOLUTIONS</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Digital Platforms & SaaS","Cloud & Integration","Product Engineering"].map(t=>(
                  <span key={t} className="rounded-full border border-line bg-surface-alt px-3.5 py-1.5 text-xs font-[500] text-ink-secondary">{t}</span>
                ))}
              </div>
              <Link href="/solutions" className="mt-4 inline-flex text-xs font-[600] text-brand hover:text-brand">View solutions →</Link>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">FAQ</h2>
              <div className="mt-4 space-y-4">
                {[["How do you handle billing?","We integrate Stripe / Razorpay patterns or your billing provider with entitlement checks."]].map(([q,a])=>(
                  <div key={q}><div className="text-sm font-[600] text-ink">{q}</div><div className="mt-1 text-sm leading-6 text-ink-secondary">{a}</div></div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-brand p-7 text-white">
              <h3 className="text-sm font-[700]">Build saas development with Nexara?</h3>
              <p className="mt-2 text-sm text-white/80">We start with your business problem — then propose the right technology and delivery model.</p>
              <Link href="/contact?type=new-project" className="mt-4 inline-flex rounded-full bg-white text-brand px-5 py-2.5 text-sm font-[700] hover:bg-brand-soft transition">Start a Project →</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

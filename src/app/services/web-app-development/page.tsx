import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Custom Web Applications — Services",
  description: "Custom web application development — customer, vendor and employee portals, dashboards, admin panels, booking and workflow systems, APIs and third-party integrations.",
  alternates: { canonical: "/services/web-app-development" },
  openGraph: { title: "Custom Web Applications — Services", description: "Customer, vendor and employee portals, dashboards, admin panels, booking and workflow systems, APIs and integrations." },
};

export default function Page() {
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.16em] font-[700] text-ink-muted"><Link href="/services" className="hover:text-brand">SERVICES</Link><span>/</span><span className="text-ink-secondary">Custom Web Applications</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[34px] sm:text-[46px] font-[800] tracking-[-0.04em] leading-[0.9] text-ink">Custom Web Applications</h1>
          <p className="mt-4 max-w-[640px] text-sm leading-6 text-ink-secondary">Applications built around your operations — portals, dashboards and workflow systems that replace spreadsheets and manual handoffs. <span className="text-ink-secondary">Built to integrate, not to sit in a silo.</span></p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact?type=new-project" className="rounded-full bg-brand px-6 py-2.5 text-sm font-[700] text-white hover:bg-brand-hover transition">Discuss Your Project →</Link>
            <Link href="/services/saas-development" className="rounded-full border border-line bg-surface-alt px-6 py-2.5 text-sm font-[600] text-ink hover:bg-surface-alt transition">Building a SaaS product?</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1.35fr_0.85fr] gap-8">
          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-brand">BUSINESS PROBLEMS ADDRESSED</h2>
              <ul className="mt-4 space-y-2.5">
                {["Critical operations still run on spreadsheets","Off-the-shelf software almost fits — but not quite","No self-service portal for customers, vendors or partners","Reporting means manually assembling data from five places"].map(t=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">WHAT WE BUILD</h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
                {["Custom business applications","Customer, vendor and dealer portals","Employee and internal tools","Dashboards, admin panels and reporting","Booking, scheduling and workflow systems","API development and third-party integrations","Multi-tenant applications, when justified","Approval, audit-trail and access control"].map(t=>(
                  <span key={t} className="rounded-xl border border-line bg-surface-alt px-3.5 py-2.5 text-sm text-ink-secondary">{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">TYPICAL USE CASES</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["B2B partner & vendor portals","B2C customer portals & bookings","Internal operations & approvals","Startup MVP web apps","Sales & order management","Data & reporting platforms"].map(t=>(
                  <span key={t} className="rounded-full border border-line bg-surface-alt px-3.5 py-1.5 text-xs font-[500] text-ink-secondary">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">DELIVERY APPROACH</h2>
              <ol className="mt-4 space-y-2.5">
                {["Discovery — map the workflow, roles and data","Architecture — data model, permissions, integrations","Build — highest-friction workflow first","Test with real users — UAT and rollout","Operate — monitoring, support and iteration"].map((t,i)=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="h-6 w-6 rounded-lg bg-surface-alt border border-line flex items-center justify-center text-xs font-[700] text-ink-secondary shrink-0">{i+1}</span>{t}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">TECHNOLOGY APPROACH</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["React / Next.js","Node.js / NestJS / Python","PostgreSQL / MySQL","REST / GraphQL APIs","AWS / Azure"].map(t=>(
                  <span key={t} className="rounded-full border border-brand-line bg-brand-soft px-3 py-1.5 text-xs font-[600] text-brand">{t}</span>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-muted">Technology is chosen by requirements, scale and maintainability — only technologies we genuinely support are shown.</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-alt p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">RELATED SERVICES</h2>
              <div className="mt-3 space-y-1.5">
                {[["Website Design & Development","/services/website-development"],["SaaS Development","/services/saas-development"],["Enterprise Software","/services/enterprise-software"],["AI Software Development","/services/ai-software-development"]].map(([label,href])=>(
                  <Link key={href} href={href} className="block text-sm font-[600] text-ink-secondary hover:text-brand transition">{label} →</Link>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">FAQ</h2>
              <div className="mt-4 space-y-4">
                {[["Web app or website — which do we need?","If it primarily informs, it is a website; if users log in and do work, it is an application. Many projects need both — we build and connect them."],["Is multi-tenancy necessary?","Only when distinct customer organizations share one application with isolated data. Otherwise it adds cost without benefit — we recommend it when it is genuinely justified."]].map(([q,a])=>(
                  <div key={q}><div className="text-sm font-[600] text-ink">{q}</div><div className="mt-1 text-sm leading-6 text-ink-secondary">{a}</div></div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-brand p-7 text-white">
              <h3 className="text-sm font-[700]">Replacing spreadsheets or fitting a process into an app?</h3>
              <p className="mt-2 text-sm text-white/80">We start with how your operations actually run — then scope the smallest system that removes the friction.</p>
              <Link href="/contact?type=new-project" className="mt-4 inline-flex rounded-full bg-white text-brand px-5 py-2.5 text-sm font-[700] hover:bg-brand-soft transition">Discuss Your Project →</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

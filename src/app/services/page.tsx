import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { services } from "@/lib/site-data";
import { accent, SERVICE_ACCENTS } from "@/lib/card-accents";

export const metadata: Metadata = {
  title: "Services",
  description: "Websites for B2B and B2C, custom web applications, Android and iOS mobile apps, CRM, ERP, SCM, SaaS, AI software, cloud, BPO, resource management and support.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Services", description: "Websites for B2B and B2C, custom web applications, Android and iOS mobile apps, CRM, ERP, SCM, SaaS, AI software, cloud, BPO, resource management and support." },
};

export default function ServicesPage() {
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(49,94,251,0.07),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-[11px] tracking-[0.18em] font-[700] text-brand">SERVICES</p>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[36px] sm:text-[48px] font-[800] tracking-[-0.04em] leading-[0.9] text-ink">Our Technology<br /> Capabilities</h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-ink-secondary">End-to-end digital product delivery — we design, build, integrate, deploy and maintain websites, web applications, mobile apps and enterprise software. Each service is a dedicated destination.</p>
        </div>
      </section>
      <section className="border-b border-line bg-surface-alt">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-12">
          <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">WHO WE BUILD FOR</h2>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "B2B businesses", desc: "Corporate and lead-generation websites, partner portals, CRM, ERP, procurement, SaaS and enterprise integrations.", href: "/contact?type=new-project&source=b2b", cta: "Discuss a B2B project", color: "sky" },
              { title: "B2C businesses", desc: "E-commerce and D2C storefronts, customer portals, mobile shopping, booking, subscription and marketplace applications.", href: "/contact?type=new-project&source=b2c", cta: "Discuss a B2C project", color: "emerald" },
              { title: "Startups & SMEs", desc: "MVP development, product discovery, UX/UI, prototypes, web and mobile apps and SaaS foundations.", href: "/contact?type=new-project&source=startup", cta: "Start with an MVP", color: "amber" },
              { title: "By industry", desc: "Retail and e-commerce, healthcare, education, manufacturing, logistics, professional services and financial services — scoped to applicable regulatory and security requirements.", href: "/industries", cta: "Explore industries", color: "violet" },
            ].map((a) => (
              <div key={a.title} className={`flex flex-col rounded-2xl border border-line bg-surface p-6 ${accent(a.color).ring}`}>
                <div className={`h-9 w-9 rounded-xl border flex items-center justify-center text-xs font-[700] ${accent(a.color).tile}`}>{a.title.slice(0, 2).toUpperCase()}</div>
                <h3 className="mt-4 text-[15px] font-[700] text-ink">{a.title}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-6 text-ink-secondary">{a.desc}</p>
                <Link href={a.href} className="mt-4 text-xs font-[700] tracking-[0.06em] text-brand hover:text-brand-hover">{a.cta.toUpperCase()} →</Link>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-5 text-ink-muted">Every engagement is scoped to your requirements — the right stack, budget and timeline differ per project, and we say so before any commitment.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => {
            const sa = accent(SERVICE_ACCENTS[s.slug]);
            return (
              <Link key={s.slug} href={`/services/${s.slug}`} className={`group rounded-2xl border border-line bg-surface p-7 hover:bg-surface-alt transition flex flex-col ${sa.ring}`}>
                <div className={`h-9 w-9 rounded-xl border flex items-center justify-center text-xs font-[700] ${sa.tile}`}>{s.title.slice(0, 2).toUpperCase()}</div>
                <h2 className="mt-4 text-[15px] font-[700] text-ink">{s.title}</h2>
                <p className="mt-2 text-[13px] leading-6 text-ink-secondary flex-1">{s.short}</p>
                <span className="mt-4 inline-flex text-xs font-[700] tracking-[0.08em] text-brand group-hover:text-brand">EXPLORE SERVICE →</span>
              </Link>
            );
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
}

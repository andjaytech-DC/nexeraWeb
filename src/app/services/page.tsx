import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description: "Technology capabilities: CRM, ERP, SCM, SaaS, AI Software, Mobile, iOS, Enterprise Software, Cloud & Integration, BPO and Resource Management.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Services", description: "Technology capabilities: CRM, ERP, SCM, SaaS, AI Software, Mobile, iOS, Enterprise Software, Cloud & Integration, BPO and Resource Management." },
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
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-ink-secondary">Comprehensive execution across the modern enterprise stack. One partner for strategy through to production — each service is a dedicated destination.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group rounded-2xl border border-line bg-surface p-7 hover:border-brand-line hover:bg-surface-alt transition flex flex-col">
              <div className="h-9 w-9 rounded-xl bg-surface-alt border border-line flex items-center justify-center text-ink-secondary group-hover:text-brand text-xs font-[700]">{s.title.slice(0, 2).toUpperCase()}</div>
              <h2 className="mt-4 text-[15px] font-[700] text-ink">{s.title}</h2>
              <p className="mt-2 text-[13px] leading-6 text-ink-secondary flex-1">{s.short}</p>
              <span className="mt-4 inline-flex text-xs font-[700] tracking-[0.08em] text-brand group-hover:text-brand">EXPLORE SERVICE →</span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

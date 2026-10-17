import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { contactInfo } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "Nexara Global Solutions is a technology and digital transformation partner based in Noida, India — turning complex challenges into practical digital solutions.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About", description: "Nexara Global Solutions is a technology and digital transformation partner based in Noida, India — turning complex challenges into practical digital solutions." },
};

export default function AboutPage() {
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-[11px] tracking-[0.18em] font-[700] text-brand">ABOUT</p>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[36px] sm:text-[48px] font-[800] tracking-[-0.04em] leading-[0.9] text-ink">Technology partner<br /> for complex challenges</h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-ink-secondary">We turn complex business challenges into practical digital solutions — strategy, engineering, AI and scalable technology under one accountable partner.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14 grid lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-line bg-surface p-7">
          <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">WHO WE ARE</h2>
          <p className="mt-3 text-sm leading-6 text-ink-secondary">Nexara Global Solutions is headquartered in Noida, India, serving global clients. We bring business-first engineering across custom software, CRM, ERP, SCM, SaaS, AI, mobile, cloud and enterprise platforms.</p>
          <div className="mt-6 rounded-xl bg-canvas border border-line p-5">
            <div className="text-xs tracking-[0.12em] font-[700] text-ink-muted">PRINCIPAL PLACE OF BUSINESS</div>
            <p className="mt-2 text-sm leading-6 text-ink-secondary">3rd Floor, D23 Building, S3V Business Park<br />Sector-59, Noida, Gautambuddha Nagar<br />Uttar Pradesh – 201301, India</p>
            <p className="mt-3 text-sm font-[600] text-ink">Phone: <a href={contactInfo.phoneHref} className="text-brand hover:text-brand">{contactInfo.phoneDisplay}</a></p>
            <p className="mt-1.5 text-sm font-[600] text-ink">Email: <a href={contactInfo.emailHref} className="text-brand hover:text-brand">{contactInfo.email}</a></p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h3 className="text-sm font-[700] text-ink">What we build</h3>
            <p className="mt-2 text-sm leading-6 text-ink-secondary">Custom software, CRM, ERP, SCM, SaaS, AI-powered software, mobile and iOS apps, enterprise platforms, cloud and integration, BPO and resource management.</p>
            <Link href="/services" className="mt-3 inline-flex text-xs font-[600] text-brand hover:text-brand">View services →</Link>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h3 className="text-sm font-[700] text-ink">How we work</h3>
            <p className="mt-2 text-sm leading-6 text-ink-secondary">Discover → Define → Design → Build → Launch → Evolve. Transparent sprints, architecture reviews and long-term partnership.</p>
            <Link href="/process" className="mt-3 inline-flex text-xs font-[600] text-brand hover:text-brand">View process →</Link>
          </div>
          <div className="rounded-2xl bg-brand p-7 text-white">
            <h3 className="text-sm font-[700]">Let&apos;s build</h3>
            <p className="mt-1 text-sm text-ink-secondary">We start with your business challenge — then propose the right technology.</p>
            <Link href="/contact?type=new-project" className="mt-4 inline-flex rounded-full bg-brand text-white px-5 py-2.5 text-sm font-[700]">Start a Project →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { contactInfo } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About — Nexara Global Solutions",
  description: "Nexara Global Solutions is a technology and digital transformation partner based in Noida, India — turning complex challenges into practical digital solutions.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">ABOUT</p>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[36px] sm:text-[48px] font-[800] tracking-[-0.04em] leading-[0.9] text-white">Technology partner<br /> for complex challenges</h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-white/60">We turn complex business challenges into practical digital solutions — strategy, engineering, AI and scalable technology under one accountable partner.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14 grid lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
          <h2 className="text-xs tracking-[0.14em] font-[700] text-white/60">WHO WE ARE</h2>
          <p className="mt-3 text-sm leading-6 text-white/70">Nexara Global Solutions is headquartered in Noida, India, serving global clients. We bring business-first engineering across custom software, CRM, ERP, SCM, SaaS, AI, mobile, cloud and enterprise platforms.</p>
          <div className="mt-6 rounded-xl bg-[#070A0F] border border-white/5 p-5">
            <div className="text-xs tracking-[0.12em] font-[700] text-white/40">PRINCIPAL PLACE OF BUSINESS</div>
            <p className="mt-2 text-sm leading-6 text-white/70">3rd Floor, D23 Building, S3V Business Park<br />Sector-59, Noida, Gautambuddha Nagar<br />Uttar Pradesh – 201301, India</p>
            <p className="mt-3 text-sm font-[600] text-white">Phone: <a href={contactInfo.phoneHref} className="text-[#4F7EFF] hover:text-white">{contactInfo.phoneDisplay}</a></p>
            <p className="mt-1.5 text-sm font-[600] text-white">Email: <a href={contactInfo.emailHref} className="text-[#4F7EFF] hover:text-white">{contactInfo.email}</a></p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h3 className="text-sm font-[700] text-white">What we build</h3>
            <p className="mt-2 text-sm leading-6 text-white/50">Custom software, CRM, ERP, SCM, SaaS, AI-powered software, mobile and iOS apps, enterprise platforms, cloud and integration, BPO and resource management.</p>
            <Link href="/services" className="mt-3 inline-flex text-xs font-[600] text-[#4F7EFF] hover:text-white">View services →</Link>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h3 className="text-sm font-[700] text-white">How we work</h3>
            <p className="mt-2 text-sm leading-6 text-white/50">Discover → Define → Design → Build → Launch → Evolve. Transparent sprints, architecture reviews and long-term partnership.</p>
            <Link href="/process" className="mt-3 inline-flex text-xs font-[600] text-[#4F7EFF] hover:text-white">View process →</Link>
          </div>
          <div className="rounded-2xl bg-[#4F7EFF] p-7 text-white">
            <h3 className="text-sm font-[700]">Let&apos;s build</h3>
            <p className="mt-1 text-sm text-white/80">We start with your business challenge — then propose the right technology.</p>
            <Link href="/contact?type=new-project" className="mt-4 inline-flex rounded-full bg-white text-[#070A0F] px-5 py-2.5 text-sm font-[700]">Start a Project →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

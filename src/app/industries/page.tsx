import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { industries } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Industries — Nexara Global Solutions",
  description: "Industry-focused technology for Automotive, Healthcare, Financial Services, Retail, Manufacturing, Logistics, Education, Real Estate, E-commerce, Travel & Hospitality and Professional Services.",
};

export default function IndustriesPage() {
  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">INDUSTRIES</p>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[36px] sm:text-[48px] font-[800] tracking-[-0.04em] leading-[0.9] text-white">Built for how<br /> your industry works</h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-white/60">Each industry has distinct operations, regulation and customer expectations. We adapt technology to your domain — not the reverse. No invented clients or statistics.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind) => (
            <Link key={ind.slug} href={`/industries/${ind.slug}`} className="group rounded-2xl border border-white/5 bg-[#0F141E] p-7 hover:border-[#4F7EFF]/20 hover:bg-[#131A27] transition">
              <div className="h-9 w-9 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/50 group-hover:text-white text-xs font-[700]">{ind.title.slice(0, 2).toUpperCase()}</div>
              <h2 className="mt-4 text-[16px] font-[700] text-white">{ind.title}</h2>
              <p className="mt-2 text-[13px] leading-6 text-white/50">Industry context, common challenges, digital opportunities and Nexara capabilities.</p>
              <span className="mt-4 inline-flex text-xs font-[700] tracking-[0.08em] text-[#4F7EFF] group-hover:text-white">EXPLORE INDUSTRY →</span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

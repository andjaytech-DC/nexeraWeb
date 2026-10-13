import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Case Studies — Nexara Global Solutions",
  description: "Selected work and engagement patterns. Real case studies are published with client permission — no invented clients or statistics.",
};

export default function CaseStudiesPage() {
  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">CASE STUDIES</p>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[36px] sm:text-[48px] font-[800] tracking-[-0.04em] leading-[0.9] text-white">Proof in delivery</h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-white/60">Real case studies are published with client permission. Representative engagement patterns below — detailed narratives will be added when approved. No invented clients, metrics or logos.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ["Enterprise Platform", "Unified CRM + ERP + SCM integration for operations at scale", ["System integration", "APIs", "Cloud"]],
            ["AI-Powered Product", "Document intelligence and workflow automation for enterprise teams", ["Generative AI", "Automation", "SaaS"]],
            ["Digital Transformation", "Legacy modernization to cloud-native, multi-tenant architecture", ["Modernization", "SaaS", "Mobile"]],
          ].map(([title, desc, tags]) => (
            <div key={String(title)} className="rounded-2xl border border-white/5 bg-[#0F141E] overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-[#4F7EFF]/20 via-[#22D3EE]/10 to-transparent border-b border-white/5 flex items-center justify-center">
                <span className="text-xs tracking-[0.14em] font-[700] text-white/30">CASE STUDY — COMING SOON</span>
              </div>
              <div className="p-6">
                <div className="text-xs tracking-[0.12em] font-[700] text-[#4F7EFF]">{String(title).toUpperCase()}</div>
                <p className="mt-2 text-[13px] leading-6 text-white/60">{String(desc)}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(tags as string[]).map((t) => (
                    <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/5 text-white/50">{t}</span>
                  ))}
                </div>
                <div className="mt-4 text-xs text-white/30">[ Detailed case study placeholder — real metrics to be added with client approval ]</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/contact" className="rounded-full bg-white text-[#070A0F] px-6 py-2.5 text-sm font-[700] hover:bg-white/90 transition">Request case studies →</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export const metadata: Metadata = {
  title: "AI — Insights | Nexara Global Solutions",
  description: "Practical AI built into products and workflows — assistants, search, document intelligence and automation.",
};
export default function Page(){
  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] font-[700] text-white/40"><Link href="/insights" className="hover:text-white">INSIGHTS</Link><span>/</span><span className="text-white/60">AI</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[32px] sm:text-[40px] font-[800] tracking-[-0.03em] text-white">AI</h1>
          <p className="mt-3 max-w-[640px] text-sm leading-6 text-white/50">Practical AI built into products and workflows — assistants, search, document intelligence and automation.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-8">
          <h2 className="text-sm font-[700] text-white">Editorial category — AI</h2>
          <p className="mt-2 text-sm leading-6 text-white/50">Articles for this category will appear here. For now, explore all insights or start a conversation with our team.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/insights" className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-[600] text-white hover:bg-white/10 transition">View all insights</Link>
            <Link href="/contact?type=new-project" className="rounded-full bg-[#4F7EFF] px-5 py-2.5 text-sm font-[700] text-white hover:bg-[#3E6AF0] transition">Start a Project →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

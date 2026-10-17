import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export const metadata: Metadata = {
  title: "Digital Transformation — Insights",
  description: "Modernize processes, systems and data — without disrupting operations.",
  alternates: { canonical: "/insights/digital-transformation" },
  openGraph: { title: "Digital Transformation — Insights", description: "Modernize processes, systems and data — without disrupting operations." },
};
export default function Page(){
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] font-[700] text-ink-muted"><Link href="/insights" className="hover:text-brand">INSIGHTS</Link><span>/</span><span className="text-ink-secondary">DIGITAL TRANSFORMATION</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[32px] sm:text-[40px] font-[800] tracking-[-0.03em] text-ink">Digital Transformation</h1>
          <p className="mt-3 max-w-[640px] text-sm leading-6 text-ink-secondary">Modernize processes, systems and data — without disrupting operations.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl border border-line bg-surface p-8">
          <h2 className="text-sm font-[700] text-ink">Editorial category — Digital Transformation</h2>
          <p className="mt-2 text-sm leading-6 text-ink-secondary">Articles for this category will appear here. For now, explore all insights or start a conversation with our team.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/insights" className="rounded-full border border-line bg-surface-alt px-5 py-2.5 text-sm font-[600] text-ink hover:bg-surface-alt transition">View all insights</Link>
            <Link href="/contact?type=new-project" className="rounded-full bg-brand px-5 py-2.5 text-sm font-[700] text-white hover:bg-brand-hover transition">Start a Project →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

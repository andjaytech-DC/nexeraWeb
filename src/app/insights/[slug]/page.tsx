import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const articles: Record<string, { title: string; cat: string; desc: string; catSlug: string }> = {
  "ai-automate-workflows": { title: "How AI Can Automate Repetitive Business Workflows", cat: "AI", desc: "Practical patterns for workflow, document and support automation — with governance.", catSlug: "ai" },
  "when-replace-legacy": { title: "When Should a Business Replace a Legacy System?", cat: "Digital Transformation", desc: "A framework for modernization timing, risk and phased migration.", catSlug: "digital-transformation" },
  "crm-vs-custom-platform": { title: "CRM vs Custom Business Platform: What Should You Build?", cat: "Enterprise Software", desc: "Decision criteria for CRM extension vs custom platform investment.", catSlug: "enterprise-software" },
  "plan-enterprise-saas": { title: "How to Plan an Enterprise SaaS Product", cat: "SaaS", desc: "Multi-tenancy, billing, isolation and scale from day one.", catSlug: "enterprise-software" },
  "cloud-transformation": { title: "Cloud Transformation Without Business Disruption", cat: "Cloud", desc: "Migration and integration without stopping operations.", catSlug: "cloud" },
  "erp-implementation": { title: "What Makes an ERP Implementation Successful?", cat: "Technology Strategy", desc: "Scope, integration, data and adoption — what matters most.", catSlug: "technology-strategy" },
  "workflow-agents": { title: "Workflow Agents: From Rules to Intelligence", cat: "Business Automation", desc: "From deterministic rules to intelligent agents with human-in-the-loop.", catSlug: "business-automation" },
  "document-intelligence": { title: "Document Intelligence: From Unstructured to Usable", cat: "AI", desc: "Extraction, search and knowledge from unstructured documents.", catSlug: "ai" },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articles[slug];
  if (!a) return { title: "Article — Nexara" };
  return { title: `${a.title} — Insights | Nexara`, description: a.desc };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles[slug];
  if (!a) {
    return (
      <div className="bg-[#070A0F] text-[#E6EAF0]"><Header /><div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-20"><p>Article not found.</p><Link href="/insights" className="text-[#4F7EFF]">Back to insights</Link></div><Footer /></div>
    );
  }
  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <article className="mx-auto max-w-[800px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] font-[700] text-white/40"><Link href="/insights" className="hover:text-white">INSIGHTS</Link><span>/</span><Link href={`/insights/${a.catSlug}`} className="hover:text-white">{a.cat.toUpperCase()}</Link></div>
        <h1 className="mt-4 font-[var(--font-jakarta)] text-[30px] sm:text-[40px] font-[800] tracking-[-0.03em] leading-[1.05] text-white">{a.title}</h1>
        <p className="mt-4 text-sm leading-6 text-white/50">{a.desc}</p>
        <div className="mt-3 flex gap-3 text-xs text-white/30"><span>Editorial placeholder</span><span>•</span><span>5 min read</span></div>
        <div className="mt-8 prose prose-invert max-w-none">
          <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.06] px-6 py-5">
            <p className="text-sm font-[700] text-amber-300">Editorial placeholder — will be replaced with real article</p>
            <p className="mt-2 text-sm leading-6 text-white/60">This article demonstrates the editorial layout and information architecture. Real content will include author, published date, body, code/diagrams where useful, and internal links to solutions and services — without fake research, statistics or citations.</p>
          </div>
          <div className="mt-8 space-y-4 text-sm leading-7 text-white/60">
            <h2 className="text-white font-[700] text-[18px] tracking-[-0.02em]">Why this topic matters</h2>
            <p>Business leaders need technology that delivers outcomes — not just features. This article will explain the business problem, the opportunity and how Nexara approaches delivery, with links to the relevant <Link href="/solutions" className="text-[#4F7EFF] hover:text-white">solutions</Link> and <Link href="/services" className="text-[#4F7EFF] hover:text-white">services</Link>.</p>
            <h2 className="text-white font-[700] text-[18px] tracking-[-0.02em]">What the article will cover</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>The business challenge and its impact</li>
              <li>Where technology creates leverage</li>
              <li>Nexara approach and architecture considerations</li>
              <li>What to do next — with a clear conversion path</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/contact?type=new-project" className="rounded-full bg-[#4F7EFF] px-6 py-2.5 text-sm font-[700] text-white hover:bg-[#3E6AF0] transition">Discuss your project →</Link>
          <Link href="/insights" className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-[600] text-white hover:bg-white/10 transition">Back to insights</Link>
        </div>
      </article>
      <Footer />
    </div>
  );
}

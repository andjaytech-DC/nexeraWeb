import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { insightCategories } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Insights",
  description: "Editorial insights on AI, Digital Transformation, Enterprise Software, SaaS, Cloud, Mobile, Business Automation and Technology Strategy.",
  alternates: { canonical: "/insights" },
  openGraph: { title: "Insights", description: "Editorial insights on AI, Digital Transformation, Enterprise Software, SaaS, Cloud, Mobile, Business Automation and Technology Strategy." },
};

const articles = [
  { cat: "AI", slug: "ai-automate-workflows", title: "How AI Can Automate Repetitive Business Workflows", catSlug: "ai", meta: "5 min — Workflow automation, AI assistants, document intelligence" },
  { cat: "Digital Transformation", slug: "when-replace-legacy", title: "When Should a Business Replace a Legacy System?", catSlug: "digital-transformation", meta: "4 min — Modernization strategy & risk" },
  { cat: "Enterprise Software", slug: "crm-vs-custom-platform", title: "CRM vs Custom Business Platform: What Should You Build?", catSlug: "enterprise-software", meta: "6 min — Architecture decisions" },
  { cat: "SaaS", slug: "plan-enterprise-saas", title: "How to Plan an Enterprise SaaS Product", catSlug: "enterprise-software", meta: "7 min — Multi-tenancy, billing, scale" },
  { cat: "Cloud", slug: "cloud-transformation", title: "Cloud Transformation Without Business Disruption", catSlug: "cloud", meta: "5 min — Migration, integration, CI/CD" },
  { cat: "Technology Strategy", slug: "erp-implementation", title: "What Makes an ERP Implementation Successful?", catSlug: "technology-strategy", meta: "6 min — Scope, integration, adoption" },
  { cat: "Business Automation", slug: "workflow-agents", title: "Workflow Agents: From Rules to Intelligence", catSlug: "business-automation", meta: "5 min — Agents, approvals, SLA" },
  { cat: "AI", slug: "document-intelligence", title: "Document Intelligence: From Unstructured to Usable", catSlug: "ai", meta: "4 min — Extraction, search, knowledge" },
];

export default function InsightsPage() {
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-[11px] tracking-[0.18em] font-[700] text-brand">INSIGHTS</p>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[36px] sm:text-[48px] font-[800] tracking-[-0.04em] leading-[0.9] text-ink">Ideas that demonstrate<br /> expertise</h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-ink-secondary">Editorial content focused on business outcomes. Clearly marked placeholders where real articles will replace them — no fake authors, research or citations.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {insightCategories.map((c) => (
              <Link key={c.slug} href={`/insights/${c.slug}`} className="rounded-full border border-line bg-surface-alt px-4 py-1.5 text-xs font-[600] text-ink-secondary hover:text-brand hover:border-line-strong transition">{c.title}</Link>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a) => (
            <Link key={a.slug} href={`/insights/${a.slug}`} className="group rounded-2xl border border-line bg-surface p-6 hover:border-line hover:bg-surface-alt transition flex flex-col">
              <span className="inline-flex self-start rounded-full border border-line bg-surface-alt px-2.5 py-1 text-[11px] font-[700] tracking-[0.08em] text-ink-secondary">{a.cat}</span>
              <h2 className="mt-4 text-[14px] font-[700] leading-6 text-ink group-hover:text-brand transition flex-1">{a.title}</h2>
              <p className="mt-2 text-xs text-ink-muted">{a.meta}</p>
              <span className="mt-4 inline-flex text-xs font-[600] text-ink-muted group-hover:text-brand">Read article →</span>
            </Link>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-warning-line bg-warning-soft px-6 py-5">
          <p className="text-xs tracking-[0.12em] font-[700] text-warning">EDITORIAL PLACEHOLDERS</p>
          <p className="mt-1 text-sm text-ink-secondary">These are editorial placeholders that will be replaced with real articles, authors and dates. No fake research, statistics or citations are presented as real.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Technology",
  description: "The technologies we genuinely support — application engineering, frontend, backend, mobile, AI and data, databases, cloud, DevOps and integration.",
  alternates: { canonical: "/technologies" },
  openGraph: { title: "Technology", description: "The technologies we genuinely support — application engineering, frontend, backend, mobile, AI and data, databases, cloud, DevOps and integration." },
};

const groups = [
  { title: "Application Engineering", desc: "End-to-end engineering: discovery, architecture, build, QA and DevOps — with maintainability built in.", items: ["Architecture design", "System design", "QA & testing", "Security practices", "Documentation", "Sustainable delivery"] },
  { title: "Frontend", desc: "Interfaces that are fast, accessible and maintainable.", items: ["React", "Next.js", "Angular", "Vue", "TypeScript"] },
  { title: "Backend", desc: "APIs and services that scale and evolve.", items: ["Node.js", "NestJS", "Python", "Java", ".NET"] },
  { title: "Mobile", desc: "Customer, field and enterprise mobile.", items: ["Android / Kotlin", "iOS / Swift", "Flutter", "React Native"] },
  { title: "AI & Data", desc: "Intelligence grounded in workflows and governed data.", items: ["Machine Learning", "Generative AI", "LLM Integration", "Data Analytics", "Python"] },
  { title: "Databases", desc: "Data that is reliable, governed and performant.", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQL Server"] },
  { title: "Cloud", desc: "Cloud that is observable, secure and cost-aware.", items: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD"] },
  { title: "DevOps", desc: "Ship safely, operate reliably.", items: ["CI/CD pipelines", "Docker & Kubernetes", "Observability & logging", "Security & secrets", "Cost & performance"] },
  { title: "Integration", desc: "Make systems share, trigger and reconcile.", items: ["REST & GraphQL APIs", "Event-driven & async", "Legacy bridging", "API governance", "Data unification"] },
];

export default function TechnologiesPage() {
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-[11px] tracking-[0.18em] font-[700] text-brand">TECHNOLOGY</p>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[36px] sm:text-[48px] font-[800] tracking-[-0.04em] leading-[0.9] text-ink">Built With the Right<br /> Technology</h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-ink-secondary">We select technology based on your requirements, scale and maintainability — not trends. Only technologies we genuinely support are shown.</p>
          <p className="mt-3 text-xs text-ink-muted">This page reflects actual capability — not simply the stack used to build this website.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g) => (
            <div key={g.title} className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">{g.title.toUpperCase()}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-secondary">{g.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((t) => (
                  <span key={t} className="rounded-full border border-line bg-surface-alt px-3 py-1.5 text-xs font-[500] text-ink-secondary">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-brand-line bg-brand-soft px-6 py-6 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
          <div>
            <h3 className="text-sm font-[700] text-ink">Need guidance on stack selection?</h3>
            <p className="mt-1 text-sm text-ink-secondary">We recommend architecture with trade-offs explained — so you can decide with confidence.</p>
          </div>
          <Link href="/contact?type=new-project" className="shrink-0 rounded-full bg-brand text-white px-6 py-2.5 text-sm font-[700] hover:bg-brand-hover transition">Discuss your stack →</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

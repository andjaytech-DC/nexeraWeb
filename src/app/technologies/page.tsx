import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Technology — Nexara Global Solutions",
  description: "Built with the right technology: Application Engineering, Frontend, Backend, Mobile, AI & Data, Databases, Cloud, DevOps and Integration — only technologies we genuinely support.",
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
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">TECHNOLOGY</p>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[36px] sm:text-[48px] font-[800] tracking-[-0.04em] leading-[0.9] text-white">Built With the Right<br /> Technology</h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-white/60">We select technology based on your requirements, scale and maintainability — not trends. Only technologies we genuinely support are shown.</p>
          <p className="mt-3 text-xs text-white/40">This page reflects actual capability — not simply the stack used to build this website.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g) => (
            <div key={g.title} className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-white/60">{g.title.toUpperCase()}</h2>
              <p className="mt-2 text-sm leading-6 text-white/50">{g.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-[500] text-white/70">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-[#4F7EFF]/15 bg-[#4F7EFF]/10 px-6 py-6 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
          <div>
            <h3 className="text-sm font-[700] text-white">Need guidance on stack selection?</h3>
            <p className="mt-1 text-sm text-white/60">We recommend architecture with trade-offs explained — so you can decide with confidence.</p>
          </div>
          <Link href="/contact?type=new-project" className="shrink-0 rounded-full bg-white text-[#070A0F] px-6 py-2.5 text-sm font-[700] hover:bg-white/90 transition">Discuss your stack →</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

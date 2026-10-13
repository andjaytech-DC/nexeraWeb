import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Process — How Nexara Delivers | Nexara Global Solutions",
  description: "Our delivery process: Discover, Define, Design, Build, Launch, Evolve — a premium consulting and engineering narrative for transparent delivery.",
};

const steps = [
  { n: "01", t: "Discover", d: "Understand goals, users, processes, constraints and current systems before proposing technology. Workshops, interviews and process mapping.", bullets: ["Stakeholder workshops", "Process & system mapping", "Constraints & risk", "Success criteria"] },
  { n: "02", t: "Define", d: "Convert business requirements into a clear product and technology roadmap with architecture and delivery phases.", bullets: ["Requirements & scope", "Architecture & integration", "Roadmap & milestones", "Delivery model & governance"] },
  { n: "03", t: "Design", d: "Create user experiences and technical architecture aligned to outcomes — design systems, APIs and data models.", bullets: ["UX & design systems", "Architecture & data model", "API & workflow design", "Security & accessibility"] },
  { n: "04", t: "Build", d: "Develop, integrate and test with transparent sprints, architecture reviews and QA — in your tools and cadence.", bullets: ["Sprints with demos", "Integration & APIs", "QA, security & review", "Transparent reporting"] },
  { n: "05", t: "Launch", d: "Deploy, stabilize and hand over with training, documentation and runbooks — with a clear support path.", bullets: ["Deployment & release", "Stabilization & QA", "Training & documentation", "Runbooks & handover"] },
  { n: "06", t: "Evolve", d: "Optimize, automate, scale and continuously improve based on data and usage — beyond the initial launch.", bullets: ["Optimization & automation", "Scale & performance", "Continuous improvement", "Long-term partnership"] },
];

export default function ProcessPage() {
  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">PROCESS</p>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[36px] sm:text-[48px] font-[800] tracking-[-0.04em] leading-[0.9] text-white">How Nexara Delivers</h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-white/60">An established engineering process — not a generic six-card component. Transparent, governed and built for real business delivery.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="relative">
          <div className="hidden lg:block absolute left-[28px] top-6 bottom-6 w-px bg-gradient-to-b from-[#4F7EFF]/40 via-white/10 to-transparent" />
          <div className="grid gap-6">
            {steps.map((s) => (
              <div key={s.n} className="relative grid lg:grid-cols-[72px_1fr_0.9fr] gap-6 rounded-2xl border border-white/5 bg-[#0F141E] p-7">
                <div className="hidden lg:flex h-12 w-12 items-center justify-center rounded-xl bg-[#4F7EFF] text-white font-[800] text-sm shadow-[0_8px_20px_rgba(79,126,255,0.3)]">{s.n}</div>
                <div className="lg:hidden text-xs tracking-[0.12em] font-[800] text-[#4F7EFF]">{s.n}</div>
                <div>
                  <h2 className="text-[18px] font-[700] tracking-[-0.01em] text-white">{s.t}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/60">{s.d}</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
                  <ul className="space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-white/60"><span className="h-1.5 w-1.5 rounded-full bg-[#4F7EFF]/60" />{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h3 className="text-xs tracking-[0.14em] font-[700] text-white/60">WHAT YOU CAN EXPECT</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li className="flex gap-2"><span className="text-[#4F7EFF]">•</span> Architecture reviews and security by default</li>
              <li className="flex gap-2"><span className="text-[#4F7EFF]">•</span> Sprints with demos and transparent reporting</li>
              <li className="flex gap-2"><span className="text-[#4F7EFF]">•</span> Documentation, training and runbooks</li>
              <li className="flex gap-2"><span className="text-[#4F7EFF]">•</span> Support and continuous improvement after launch</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-7">
            <h3 className="text-xs tracking-[0.14em] font-[700] text-white/60">ENGAGEMENT MODELS</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Project delivery — fixed scope and roadmap</li>
              <li>Dedicated team — pod that extends your team</li>
              <li>Long-term partnership — evolution and scale</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-[#4F7EFF] p-7 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-[700]">Start with Discovery</h3>
              <p className="mt-2 text-sm text-white/80">We map your business challenge to the right approach before proposing technology.</p>
            </div>
            <Link href="/contact?type=new-project" className="mt-6 inline-flex rounded-full bg-white text-[#070A0F] px-6 py-2.5 text-sm font-[700] hover:bg-white/90 transition self-start">Start a Project →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

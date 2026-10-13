import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Careers — Build What's Next With Nexara | Nexara Global Solutions",
  description: "Join Nexara Global Solutions — software, AI-powered solutions and digital systems that help businesses operate and grow. Explore job search, students, contract and talent community.",
};

export default function CareersPage() {
  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(79,126,255,0.14),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">CAREERS</p>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[36px] sm:text-[48px] font-[800] tracking-[-0.04em] leading-[0.9] text-white">Build What&apos;s Next<br /> With Nexara</h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-white/60">Join a technology team building software, AI-powered solutions and digital systems that help businesses operate and grow.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/careers/job-search" className="rounded-full bg-[#4F7EFF] px-6 py-2.5 text-sm font-[700] text-white hover:bg-[#3E6AF0] transition">View Open Positions →</Link>
            <Link href="/careers/send-resume" className="rounded-full border border-white/10 bg-white/[0.05] px-6 py-2.5 text-sm font-[600] text-white hover:bg-white/10 transition">Send Your Resume</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "Job Search", desc: "Search by title, keyword and location. Filter by department, employment type and experience.", href: "/careers/job-search", cta: "Search jobs →" },
            { title: "Students & Entry Level", desc: "For students, recent graduates and early-career professionals across engineering, AI, QA, UI/UX and cloud.", href: "/careers/students", cta: "Explore →" },
            { title: "Contract Opportunities", desc: "Flexible engagements for engineers, designers, QA, mobile, AI, DevOps and operations specialists.", href: "/careers/contract-opportunities", cta: "View contracts →" },
            { title: "Talent Community", desc: "Stay connected — tell us your skills and interests for future opportunities.", href: "/careers/talent-community", cta: "Join community →" },
            { title: "Send Your Resume", desc: "Don't see the right opening? Share your profile and we'll consider it for relevant roles.", href: "/careers/send-resume", cta: "Send resume →" },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="group rounded-2xl border border-white/5 bg-[#0F141E] p-7 hover:border-[#4F7EFF]/20 hover:bg-[#131A27] transition flex flex-col">
              <h2 className="text-[16px] font-[700] text-white">{c.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/50 flex-1">{c.desc}</p>
              <span className="mt-4 inline-flex text-xs font-[700] tracking-[0.08em] text-[#4F7EFF] group-hover:text-white">{c.cta}</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/5 bg-[#0F141E] p-7 grid lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-[700] text-white">What we look for</h3>
            <p className="mt-2 text-sm leading-6 text-white/50">Pragmatic engineers and operators who care about outcomes, maintainability and teamwork — across software engineering, AI & data, mobile, UI/UX, QA, DevOps & cloud, and business operations.</p>
            <p className="mt-3 text-xs text-white/30">We only list roles we genuinely intend to hire for. No fake vacancies.</p>
          </div>
          <div className="rounded-xl bg-[#070A0F] border border-white/5 p-5">
            <div className="text-xs tracking-[0.12em] font-[700] text-white/40">AREAS OF INTEREST</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Software Engineering","AI & Data","Mobile Development","UI/UX","QA","Cloud & DevOps","Business Development","BPO / Operations"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/60">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

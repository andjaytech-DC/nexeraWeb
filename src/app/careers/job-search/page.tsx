import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma, safeDb } from "@/lib/prisma";
import JobSearchClient from "./JobSearchClient";

export const metadata: Metadata = {
  title: "Job Search — Careers | Nexara Global Solutions",
  description: "Search open positions at Nexara Global Solutions by title, keyword, location, department, employment type and experience.",
};

export default async function JobSearchPage() {
  const jobs = await safeDb(async (db) => {
    return db.job.findMany({
      where: { isPublished: true, status: "Published" },
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, slug: true, department: true, location: true, employmentType: true, experienceLevel: true, createdAt: true },
    });
  }, [] as any[]);

  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] font-[700] text-white/40"><Link href="/careers" className="hover:text-white">CAREERS</Link><span>/</span><span className="text-white/60">JOB SEARCH</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[32px] sm:text-[40px] font-[800] tracking-[-0.03em] text-white">Job Search</h1>
          <p className="mt-3 max-w-[640px] text-sm leading-6 text-white/50">Search by title, keyword or location. Use filters to narrow by department, employment type and experience. Only genuine openings are listed.</p>
        </div>
      </section>
      <JobSearchClient initialJobs={jobs} />
      <Footer />
    </div>
  );
}

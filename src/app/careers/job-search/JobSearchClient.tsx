"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

type Job = {
  id: string; title: string; slug: string; department: string; location: string; employmentType: string; experienceLevel?: string | null; createdAt: Date;
};

export default function JobSearchClient({ initialJobs }: { initialJobs: Job[] }) {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");
  const [type, setType] = useState("All");
  const [level, setLevel] = useState("All");
  const [location, setLocation] = useState("All");

  const jobs = initialJobs;

  const depts = ["All","IT","BPO","HR","Software Engineering","AI & Data","Mobile Development","UI/UX","QA & Testing","DevOps & Cloud","Business Development","Sales","Operations","Other"];
  const types = ["All","Full-time","Part-time","Contract","Internship"];
  // Experience options come from the live listings (same pattern as locations)
  // so the exact-match filter always matches whatever the admin published.
  const levels = ["All", ...Array.from(new Set(jobs.map(j=>j.experienceLevel).filter((x): x is string => Boolean(x))))];
  const locs = ["All", ...Array.from(new Set(jobs.map(j=>j.location)))];

  const filtered = useMemo(() => {
    return jobs.filter(j => {
      if (q && ![j.title, j.department, j.location].join(" ").toLowerCase().includes(q.toLowerCase())) return false;
      if (dept !== "All" && j.department !== dept) return false;
      if (type !== "All" && j.employmentType !== type) return false;
      if (level !== "All" && (j.experienceLevel || "") !== level) return false;
      if (location !== "All" && j.location !== location) return false;
      return true;
    });
  }, [jobs, q, dept, type, level, location]);

  return (
    <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10">
      <div className="rounded-2xl border border-line bg-surface p-5">
        <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-4">
          <div className="flex gap-2">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by job title, keyword, location…" className="flex-1 rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <select value={dept} onChange={e=>setDept(e.target.value)} className="rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm text-ink">
              {depts.map(d=><option key={d} value={d}>{d}</option>)}
            </select>
            <select value={type} onChange={e=>setType(e.target.value)} className="rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm text-ink">
              {types.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
            <select value={level} onChange={e=>setLevel(e.target.value)} className="rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm text-ink">
              {levels.map(l=><option key={l} value={l}>{l}</option>)}
            </select>
            <select value={location} onChange={e=>setLocation(e.target.value)} className="rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm text-ink">
              {locs.map(l=><option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
        <p className="mt-3 text-xs text-ink-muted">Departments shown are only those we genuinely recruit for. Filters update instantly.</p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-line bg-surface-alt px-8 py-14 text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-surface-alt border border-line flex items-center justify-center text-ink-secondary">◎</div>
          <h2 className="mt-4 text-[18px] font-[700] text-ink">No current openings</h2>
          <p className="mt-2 max-w-[560px] mx-auto text-sm leading-6 text-ink-secondary">We don&apos;t have a suitable opening at the moment. You can still share your resume with our team for future opportunities.</p>
          <Link href="/careers/send-resume" className="mt-6 inline-flex rounded-full bg-brand px-6 py-2.5 text-sm font-[700] text-white hover:bg-brand-hover transition">Send Your Resume →</Link>
          <p className="mt-3 text-xs text-ink-muted">When real vacancies become available, they will appear here with full details.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {filtered.map(j=>(
            <Link key={j.id} href={`/careers/job-search/${j.slug}`} className="group rounded-2xl border border-line bg-surface p-6 hover:border-brand-line hover:bg-surface-alt transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-[16px] font-[700] text-ink group-hover:text-brand transition">{j.title}</h3>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-ink-secondary">
                  <span className="rounded-full border border-line bg-surface-alt px-2.5 py-1">{j.department}</span>
                  <span className="rounded-full border border-line bg-surface-alt px-2.5 py-1">{j.location}</span>
                  <span className="rounded-full border border-line bg-surface-alt px-2.5 py-1">{j.employmentType}</span>
                  {j.experienceLevel && <span className="rounded-full border border-line bg-surface-alt px-2.5 py-1">{j.experienceLevel}</span>}
                </div>
              </div>
              <span className="shrink-0 inline-flex items-center gap-2 rounded-full border border-line bg-surface-alt px-4 py-2 text-sm font-[600] text-ink-secondary group-hover:text-brand group-hover:border-line-strong transition">View details →</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

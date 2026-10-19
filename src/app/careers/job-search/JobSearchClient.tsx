"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

type Job = {
  id: string; title: string; slug: string; department: string; location: string; employmentType: string; experienceLevel?: string | null; createdAt: Date;
};

/* Colorful card accents shared by department. Full literal class strings so
   the Tailwind compiler picks every variant up; darker tiers stay legible on
   the dark surface. */
type Accent = { chip: string; bar: string; ring: string; dot: string };
const ACCENTS: Record<string, Accent> = {
  IT: {
    chip: "border-sky-400/30 bg-sky-400/10 text-sky-300",
    bar: "bg-gradient-to-b from-sky-400 to-cyan-300",
    ring: "group-hover:border-sky-400/40",
    dot: "bg-sky-400",
  },
  BPO: {
    chip: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    bar: "bg-gradient-to-b from-violet-400 to-fuchsia-300",
    ring: "group-hover:border-violet-400/40",
    dot: "bg-violet-400",
  },
  HR: {
    chip: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    bar: "bg-gradient-to-b from-amber-400 to-orange-300",
    ring: "group-hover:border-amber-400/40",
    dot: "bg-amber-400",
  },
};
const NEUTRAL: Accent = {
  chip: "border-line bg-surface-alt text-ink-secondary",
  bar: "bg-gradient-to-b from-brand to-brand-hover",
  ring: "group-hover:border-brand/40",
  dot: "bg-brand",
};
const accentFor = (department: string): Accent => ACCENTS[department] ?? NEUTRAL;

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
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {filtered.map(j => <JobCard key={j.id} job={j} />)}
        </div>
      )}
    </section>
  );
}

function JobCard({ job: j }: { job: Job }) {
  const a = accentFor(j.department);
  return (
    <Link
      href={`/careers/job-search/${j.slug}`}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 pl-7 transition hover:bg-surface-alt ${a.ring} flex flex-col gap-4 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0`}
    >
      <span aria-hidden className={`absolute inset-y-0 left-0 w-[5px] opacity-80 transition group-hover:w-[7px] motion-reduce:group-hover:w-[5px] motion-reduce:transition-none ${a.bar}`} />
      <div className="flex flex-wrap items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-[700] ${a.chip}`}>
          <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
          {j.department}
        </span>
        <span className="rounded-full border border-line bg-surface-alt px-2.5 py-1 text-xs text-ink-secondary">{j.employmentType}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-[17px] font-[700] leading-snug text-ink transition group-hover:text-brand">{j.title}</h3>
        <div className="mt-2.5 flex flex-wrap gap-2 text-xs text-ink-secondary">
          <span className="inline-flex items-center gap-1.5"><span aria-hidden className="text-ink-muted">◎</span>{j.location}</span>
          {j.experienceLevel && <><span aria-hidden className="text-ink-muted">·</span><span>{j.experienceLevel}</span></>}
        </div>
      </div>
      <span className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-surface-alt px-4 py-2 text-sm font-[600] text-ink-secondary transition group-hover:border-brand/40 group-hover:text-brand">
        Apply now <span aria-hidden className="transition group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0">→</span>
      </span>
    </Link>
  );
}

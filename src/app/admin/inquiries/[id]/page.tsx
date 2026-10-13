"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { inquiryRepository, statusLabels, statusColors, type Inquiry, type InquiryStatus } from "@/lib/inquiry-store";

export default function InquiryDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const [inq, setInq] = useState<Inquiry | undefined>(undefined);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<InquiryStatus>("NEW");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    inquiryRepository.get(id).then((found) => {
      if (!alive) return;
      if (found) { setInq(found); setNotes(found.notes || ""); setStatus(found.status); }
      setLoading(false);
    });
    return () => { alive = false; };
  }, [id]);

  if (loading) return <div className="mx-auto max-w-[800px] px-5 py-12 text-white/50">Loading…</div>;
  if (!inq) {
    return (
      <div className="mx-auto max-w-[800px] px-5 sm:px-6 lg:px-8 py-12">
        <Link href="/admin/inquiries" className="text-sm text-[#4F7EFF] hover:text-white">← Back to inquiries</Link>
        <p className="mt-6 text-white/60">Inquiry not found. It may have been cleared from this browser&apos;s storage — or the API returned 404.</p>
      </div>
    );
  }

  async function save() {
    await inquiryRepository.update(id, { notes, status });
    setInq({ ...inq!, notes, status });
  }

  async function remove() {
    await inquiryRepository.remove(id);
    router.push("/admin/inquiries");
  }

  return (
    <div className="mx-auto max-w-[1100px] px-5 sm:px-6 lg:px-8 py-8">
      <Link href="/admin/inquiries" className="text-sm text-white/60 hover:text-white">← Back to inquiries</Link>
      <div className="mt-4 flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-[800] tracking-[-0.02em] text-white">{inq.name}</h1>
          <p className="mt-1 text-sm text-white/50">{inq.company || "No company"} • {inq.email} • {inq.phone || "No phone"} • {new Date(inq.createdAt).toLocaleString()}</p>
        </div>
        <div className="flex gap-3">
          <select value={status} onChange={(e) => setStatus(e.target.value as InquiryStatus)} className={`rounded-full border px-4 py-2 text-sm font-[700] ${statusColors[status]}`}>
            {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <button onClick={save} className="rounded-full bg-white text-[#070A0F] px-5 py-2 text-sm font-[700] hover:bg-white/90">Save</button>
          <button onClick={remove} className="rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2 text-sm font-[600] text-red-300 hover:bg-red-500/15">Delete</button>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-[1.4fr_0.9fr] gap-6">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-6">
            <h2 className="text-xs tracking-[0.12em] font-[700] text-white/40">CUSTOMER INFORMATION</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div><div className="text-white/40 text-xs">Name</div><div className="text-white">{inq.name}</div></div>
              <div><div className="text-white/40 text-xs">Company</div><div className="text-white">{inq.company || "—"}</div></div>
              <div><div className="text-white/40 text-xs">Email</div><div className="text-white">{inq.email}</div></div>
              <div><div className="text-white/40 text-xs">Phone</div><div className="text-white">{inq.phone || "—"}</div></div>
              <div><div className="text-white/40 text-xs">Preferred contact</div><div className="text-white">{inq.preferredContact || "—"}</div></div>
              <div><div className="text-white/40 text-xs">Submitted</div><div className="text-white text-xs">{new Date(inq.createdAt).toLocaleString()}</div></div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-6">
            <h2 className="text-xs tracking-[0.12em] font-[700] text-white/40">PROJECT REQUIREMENTS</h2>
            <div className="mt-4 space-y-4 text-sm">
              <div className="grid grid-cols-3 gap-4">
                <div><div className="text-white/40 text-xs">Service</div><div className="text-white">{inq.service}</div></div>
                <div><div className="text-white/40 text-xs">Budget</div><div className="text-white">{inq.budget}</div></div>
                <div><div className="text-white/40 text-xs">Timeline</div><div className="text-white">{inq.timeline}</div></div>
              </div>
              <div><div className="text-white/40 text-xs">Project type</div><div className="text-white">{inq.projectType}</div></div>
              <div><div className="text-white/40 text-xs">Description</div><div className="mt-1 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-white/80 leading-6 whitespace-pre-wrap">{inq.description}</div></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-[#0F141E] p-6">
            <h3 className="text-xs tracking-[0.12em] font-[700] text-white/40">INTERNAL NOTES</h3>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={6} placeholder="Add internal notes — follow-up, next steps, context…" className="mt-3 w-full rounded-xl border border-white/10 bg-[#070A0F] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#4F7EFF]/50 focus:outline-none resize-none" />
            <button onClick={save} className="mt-3 w-full rounded-full bg-[#4F7EFF] py-2.5 text-sm font-[700] text-white hover:bg-[#3E6AF0] transition">Save notes & status</button>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h3 className="text-xs tracking-[0.12em] font-[700] text-white/40">RESPONSE AREA</h3>
            <p className="mt-2 text-sm text-white/50">In production this binds to email/CRM via the repository. Demo: notes are persisted through the repository interface.</p>
            <a href={`mailto:${inq.email}?subject=Re: Your inquiry to Nexara`} className="mt-3 inline-flex rounded-full bg-white text-[#070A0F] px-4 py-2 text-sm font-[700] hover:bg-white/90">Reply via email →</a>
          </div>
          <div className="rounded-2xl border border-amber-500/15 bg-amber-500/10 p-4">
            <p className="text-xs font-[700] text-amber-300">Repository pattern</p>
            <p className="mt-1 text-xs leading-5 text-white/60">UI calls <code className="rounded bg-white/10 px-1 py-0.5">inquiryRepository</code> — local today, API tomorrow. Flip <code className="rounded bg-white/10 px-1 py-0.5">NEXT_PUBLIC_INQUIRY_API</code> and implement the fetch adapter. No component rewrite.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

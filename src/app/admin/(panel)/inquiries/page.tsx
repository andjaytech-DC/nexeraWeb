"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { inquiryRepository, statusLabels, statusColors, type Inquiry, type InquiryStatus } from "@/lib/inquiry-store";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<InquiryStatus | "ALL">("ALL");
  const [q, setQ] = useState("");

  useEffect(() => {
    let alive = true;
    inquiryRepository.list().then((d) => { if (alive) setInquiries(d); });
    const upd = () => inquiryRepository.list().then((d) => { if (alive) setInquiries(d); });
    window.addEventListener("storage", upd);
    window.addEventListener("nexara:inquiry-created" as unknown as string, upd as EventListener);
    return () => { alive = false; window.removeEventListener("storage", upd); window.removeEventListener("nexara:inquiry-created" as unknown as string, upd as EventListener); };
  }, []);

  const filtered = useMemo(() => {
    return inquiries.filter((i) => {
      if (filter !== "ALL" && i.status !== filter) return false;
      if (q && ![i.name, i.company, i.email, i.service, i.projectType].join(" ").toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [inquiries, filter, q]);

  return (
    <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h1 className="text-[24px] font-[800] tracking-[-0.03em]">Inquiries</h1>
        <div className="flex flex-wrap gap-3 items-center">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, company, email, service…" className="w-[260px] rounded-xl border border-white/10 bg-[#0F141E] px-3.5 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#4F7EFF]/50 focus:outline-none" />
          <button onClick={() => {
            const rows = [["Name","Company","Email","Service","Project Type","Status","Submitted"], ...filtered.map(i => [i.name,i.company,i.email,i.service,i.projectType,i.status,new Date(i.createdAt).toISOString()])];
            const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = "inquiries.csv"; a.click(); URL.revokeObjectURL(url);
          }} className="rounded-xl border border-white/10 bg-[#0F141E] px-3.5 py-2 text-sm text-white hover:border-brand">Export CSV</button>
          <select value={filter} onChange={(e) => setFilter(e.target.value as unknown as InquiryStatus | "ALL")} className="rounded-xl border border-white/10 bg-[#0F141E] px-3.5 py-2 text-sm text-white">
            <option value="ALL">All statuses</option>
            {Object.keys(statusLabels).map((s) => <option key={s} value={s}>{statusLabels[s as InquiryStatus]}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-[#0F141E]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-xs tracking-[0.08em] font-[700] text-white/40">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Company</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Service</th>
                <th className="text-left px-4 py-3">Project Type</th>
                <th className="text-left px-4 py-3">Submitted</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-white/50">No inquiries match your filter. Try <Link href="/contact" className="text-[#4F7EFF] hover:text-white">creating one</Link>.</td></tr>
              ) : (
                filtered.map((i) => (
                  <tr key={i.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-3"><Link href={`/admin/inquiries/${i.id}`} className="font-[600] text-white hover:text-[#4F7EFF]">{i.name}</Link></td>
                    <td className="px-4 py-3 text-white/60">{i.company || "—"}</td>
                    <td className="px-4 py-3 text-white/60">{i.email}</td>
                    <td className="px-4 py-3 text-white/60">{i.service}</td>
                    <td className="px-4 py-3 text-white/60">{i.projectType}</td>
                    <td className="px-4 py-3 text-white/40 text-xs">{new Date(i.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3"><span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-[600] ${statusColors[i.status]}`}>{statusLabels[i.status]}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-white/30">Data via <code className="rounded bg-white/10 px-1 py-0.5">InquiryRepository</code> — today <code className="rounded bg-white/10 px-1 py-0.5">LocalInquiryRepository</code> (this browser only). Swap to <code className="rounded bg-white/10 px-1 py-0.5">ApiInquiryRepository</code> with <code className="rounded bg-white/10 px-1 py-0.5">NEXT_PUBLIC_INQUIRY_API=1</code> — no UI changes.</p>
    </div>
  );
}

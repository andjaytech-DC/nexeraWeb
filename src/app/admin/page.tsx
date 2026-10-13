"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { inquiryRepository, statusLabels, type Inquiry } from "@/lib/inquiry-store";

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  useEffect(() => {
    let alive = true;
    inquiryRepository.list().then((data) => { if (alive) setInquiries(data); });
    const onUpdate = () => inquiryRepository.list().then((d) => { if (alive) setInquiries(d); });
    window.addEventListener("storage", onUpdate);
    window.addEventListener("nexara:inquiry-created" as unknown as string, onUpdate as EventListener);
    return () => { alive = false; window.removeEventListener("storage", onUpdate); window.removeEventListener("nexara:inquiry-created" as unknown as string, onUpdate as EventListener); };
  }, []);
  const byStatus = inquiries.reduce<Record<string, number>>((acc, cur) => { acc[cur.status] = (acc[cur.status] || 0) + 1; return acc; }, {});
  const total = inquiries.length;
  return (
    <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-8">
      <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.06] px-6 py-4">
        <p className="text-sm font-[700] text-amber-300">Admin UX complete — storage is replaceable</p>
        <p className="mt-1 text-sm leading-6 text-white/60">This admin is built against the <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">InquiryRepository</code> interface (<code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">src/lib/inquiry-store.ts</code>). Today it uses <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">LocalInquiryRepository</code> (localStorage, demo-only). Set <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_INQUIRY_API=1</code> to swap in <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">ApiInquiryRepository</code> — no UI rebuild needed. Do not store sensitive data in the demo adapter.</p>
      </div>
      <h1 className="mt-8 text-[28px] font-[800] tracking-[-0.03em]">Dashboard</h1>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["Total Inquiries", String(total)],
          ["New", String(byStatus["NEW"] || 0)],
          ["In Discussion", String(byStatus["IN_DISCUSSION"] || 0)],
          ["Won", String(byStatus["WON"] || 0)],
        ].map(([label, val]) => (
          <div key={label} className="rounded-2xl border border-white/5 bg-[#0F141E] p-6">
            <div className="text-xs tracking-[0.12em] font-[700] text-white/40">{label.toUpperCase()}</div>
            <div className="mt-2 text-[28px] font-[800] text-white">{val}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-white/5 bg-[#0F141E] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-[700] text-white">Recent inquiries</h2>
          <Link href="/admin/inquiries" className="text-xs font-[600] text-[#4F7EFF] hover:text-white">View all →</Link>
        </div>
        {total === 0 ? (
          <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-10 text-center">
            <p className="text-sm text-white/50">No inquiries yet. Submit the contact form to create one.</p>
            <Link href="/contact?type=new-project" className="mt-3 inline-flex rounded-full bg-white text-[#070A0F] px-4 py-2 text-sm font-[700]">Go to contact</Link>
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs tracking-[0.08em] font-[700] text-white/40">
                <tr><th className="text-left py-2">Name</th><th className="text-left py-2">Company</th><th className="text-left py-2">Service</th><th className="text-left py-2">Status</th></tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 5).map((i) => (
                  <tr key={i.id} className="border-t border-white/5">
                    <td className="py-3 text-white"><Link href={`/admin/inquiries/${i.id}`} className="hover:text-[#4F7EFF]">{i.name}</Link></td>
                    <td className="py-3 text-white/60">{i.company || "—"}</td>
                    <td className="py-3 text-white/60">{i.service}</td>
                    <td className="py-3"><span className="rounded-full border px-2.5 py-1 text-xs">{statusLabels[i.status]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

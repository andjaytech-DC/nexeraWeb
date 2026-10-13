"use client";
import { useState } from "react";
import { inquiryRepository } from "@/lib/inquiry-store";

export default function AdminSettings() {
  const [done, setDone] = useState(false);
  return (
    <div className="mx-auto max-w-[800px] px-5 sm:px-6 lg:px-8 py-8">
      <h1 className="text-[24px] font-[800] tracking-[-0.03em] text-white">Settings</h1>
      <div className="mt-6 rounded-2xl border border-white/5 bg-[#0F141E] p-7 space-y-6">
        <div>
          <h2 className="text-sm font-[700] text-white">Replaceable storage layer</h2>
          <p className="mt-2 text-sm leading-6 text-white/60">
            All inquiry reads/writes go through <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">InquiryRepository</code> (<code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">src/lib/inquiry-store.ts</code>).
            <br />• <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">LocalInquiryRepository</code> — demo, localStorage, no cross-device sync.
            <br />• <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">ApiInquiryRepository</code> — stubbed <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">fetch(&quot;/api/inquiries&quot;)</code> — implement when your backend is ready.
            <br />Switch with <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_INQUIRY_API=1</code> (+ optional <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_INQUIRY_API_URL</code>). UI stays identical — async interface already in place.
          </p>
          <pre className="mt-3 rounded-xl bg-[#070A0F] border border-white/10 p-4 text-xs leading-5 text-white/60 overflow-x-auto">{`// src/lib/inquiry-store.ts
export interface InquiryRepository {
  list(): Promise<Inquiry[]>
  get(id: string): Promise<Inquiry | undefined>
  create(data: ...): Promise<Inquiry>
  update(id: string, patch: ...): Promise<void>
  remove(id: string): Promise<void>
}
// UI:
// import { inquiryRepository } from "@/lib/inquiry-store"
// await inquiryRepository.create({ name, email, ... })
// Set NEXT_PUBLIC_INQUIRY_API=1 to use ApiInquiryRepository`}</pre>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
          <h3 className="text-xs tracking-[0.12em] font-[700] text-white/40">DEMO STORE CONTROLS</h3>
          <p className="mt-2 text-sm text-white/50">Clear all locally stored inquiries. Only affects this browser. Disabled in API mode.</p>
          <button
            onClick={async () => { try { await inquiryRepository.clear(); setDone(true); setTimeout(() => setDone(false), 2000); } catch { alert("clear() not supported in API mode"); } }}
            className="mt-4 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2 text-sm font-[600] text-red-300 hover:bg-red-500/15"
          >
            Clear all demo inquiries
          </button>
          {done && <span className="ml-3 text-sm text-emerald-400">Cleared — refresh inquiries list.</span>}
        </div>
        <div>
          <h2 className="text-sm font-[700] text-white">Security</h2>
          <p className="mt-2 text-sm leading-6 text-white/60">Do not store sensitive customer data in browser storage. Production requires authentication, authorization, encryption, audit logs and a real database. This area is <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">noindex</code> and excluded from sitemap (<code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">src/app/robots.ts</code> disallows <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">/admin</code>).</p>
        </div>
      </div>
    </div>
  );
}

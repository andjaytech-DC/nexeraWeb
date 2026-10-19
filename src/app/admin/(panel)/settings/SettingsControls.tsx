"use client";
import { useState } from "react";
import { inquiryRepository } from "@/lib/inquiry-store";

export function SettingsControls() {
  const [done, setDone] = useState(false);
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
      <h3 className="text-xs tracking-[0.12em] font-[700] text-white/40">DEMO STORE CONTROLS</h3>
      <p className="mt-2 text-sm text-white/50">
        Clear all locally stored inquiries. Only affects this browser. Disabled in API mode.
      </p>
      <button
        onClick={async () => {
          try {
            await inquiryRepository.clear();
            setDone(true);
            setTimeout(() => setDone(false), 2000);
          } catch {
            alert("clear() not supported in API mode");
          }
        }}
        className="mt-4 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2 text-sm font-[600] text-red-300 hover:bg-red-500/15"
      >
        Clear all demo inquiries
      </button>
      {done && <span className="ml-3 text-sm text-emerald-400">Cleared — refresh inquiries list.</span>}
    </div>
  );
}
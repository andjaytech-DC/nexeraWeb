import Link from "next/link";

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="Nexara Global Solutions home">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#4F7EFF] overflow-hidden shrink-0">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <path d="M7 7L14 12L21 7V21L14 16L7 21V7Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="7" cy="7" r="1.6" fill="white" />
          <circle cx="14" cy="12" r="1.6" fill="white" />
          <circle cx="21" cy="7" r="1.6" fill="white" />
          <circle cx="21" cy="21" r="1.6" fill="white" />
          <circle cx="7" cy="21" r="1.6" fill="white" />
          <circle cx="14" cy="16" r="1.6" fill="white" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-[700] tracking-[-0.02em] text-[17px] ${light ? "text-white" : "text-[#0A0E13]"} font-[var(--font-jakarta)]`}>NEXARA</span>
        <span className={`text-[10px] tracking-[0.18em] font-[600] ${light ? "text-white/60" : "text-black/50"}`}>GLOBAL SOLUTIONS</span>
      </span>
    </Link>
  );
}

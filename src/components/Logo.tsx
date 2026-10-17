import Link from "next/link";

/* ───────────────────────────────────────────────────────────────────────────
   Nexara logo — light theme.

   Wordmark in main text colour with the brand blue mark; `onDark` is available
   for the selective navy panels.
   ─────────────────────────────────────────────────────────────────────────── */

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Nexara Global Solutions home">
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-brand">
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M7 7L14 12L21 7V21L14 16L7 21V7Z"
            stroke="white"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="7" cy="7" r="1.6" fill="white" />
          <circle cx="14" cy="12" r="1.6" fill="white" />
          <circle cx="21" cy="7" r="1.6" fill="white" />
          <circle cx="21" cy="21" r="1.6" fill="white" />
          <circle cx="7" cy="21" r="1.6" fill="white" />
          <circle cx="14" cy="16" r="1.6" fill="white" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-[var(--font-display)] text-[17px] font-[800] tracking-[-0.02em] ${
            onDark ? "text-white" : "text-ink"
          }`}
        >
          NEXARA
        </span>
        <span
          className={`text-[10px] font-[600] uppercase tracking-[0.18em] ${
            onDark ? "text-white/70" : "text-ink-muted"
          }`}
        >
          Global Solutions
        </span>
      </span>
    </Link>
  );
}

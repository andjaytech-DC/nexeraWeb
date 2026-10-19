
import Link from "next/link";

type LogoProps = {
  onDark?: boolean;
  compact?: boolean;
  className?: string;
};

export function Logo({
  onDark = false,
  compact = false,
  className = "",
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Nexara Global Solutions home"
      className={`group inline-flex w-fit shrink-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 ${className}`}
    >
      {/* Original vector logo mark — no PNG required */}
      <span
        aria-hidden="true"
        className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#0B1F44] via-[#1749A2] to-[#3478F6] shadow-[0_5px_16px_-5px_rgba(52,120,246,0.5)] ring-1 ring-white/15 transition-transform duration-200 group-hover:scale-[1.03] motion-reduce:transition-none"
      >
        <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />

        <svg
          viewBox="0 0 48 48"
          className="relative h-9 w-9"
          fill="none"
        >
          <path
            d="M11 35V13L37 35V13"
            stroke="white"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="11" cy="13" r="3" fill="#93C5FD" />
          <circle cx="37" cy="35" r="3" fill="#93C5FD" />
          <circle cx="24" cy="24" r="2" fill="white" />
        </svg>
      </span>

      {!compact && (
        <span className="flex min-w-0 flex-col gap-[5px]">
          <span
            className={`font-[var(--font-display)] text-[19px] font-extrabold leading-none tracking-[0.065em] ${
              onDark ? "text-white" : "text-[#10274D]"
            }`}
          >
            NEXARA
          </span>

          <span
            className={`whitespace-nowrap text-[9px] font-semibold uppercase leading-none tracking-[0.19em] ${
              onDark ? "text-white/65" : "text-[#60718B]"
            }`}
          >
            Global Solutions
          </span>
        </span>
      )}
    </Link>
  );
}

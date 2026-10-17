import Link from "next/link";
import { Container, Section } from "@/components/ui";

/* ───────────────────────────────────────────────────────────────────────────
   Homepage — Business Solution Finder entry point.

   The one navy feature panel on the page, giving the new feature clear
   prominence without making every section dark.
   ─────────────────────────────────────────────────────────────────────────── */

const STEPS = ["Your industry", "Your challenges", "Your goal"];

export function FinderCta() {
  return (
    <Section tone="alt" size="sm">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-10 sm:px-12 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_85%_10%,rgba(49,94,251,0.32),transparent_60%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_10%_90%,rgba(8,145,178,0.20),transparent_60%)]"
            aria-hidden
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-brand-line sm:text-xs">
                Solution finder
              </p>
              <h2 className="mt-3 max-w-[600px] font-[var(--font-display)] text-[27px] font-[800] leading-[1.14] tracking-[-0.025em] text-white sm:text-[36px]">
                Find the right solution
              </h2>
              <p className="mt-4 max-w-[580px] text-[16px] leading-7 text-white/75 sm:text-[17px]">
                Tell us about your business goals and explore technology solutions tailored to your
                needs. Three short questions, then a clear starting point.
              </p>

              <ul className="mt-6 flex flex-wrap gap-2.5">
                {STEPS.map((s, i) => (
                  <li
                    key={s}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-3.5 py-1.5 text-[13px] font-[600] text-white"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-[11px] font-[800]">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/solution-finder"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[16px] font-[800] text-brand transition hover:bg-brand-soft"
                >
                  Start the solution finder <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-[700] text-white transition hover:border-white/50 hover:bg-white/10"
                >
                  Browse solutions instead
                </Link>
              </div>
            </div>

            {/* Outcome illustration */}
            <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-6">
              <p className="text-[11px] font-[800] uppercase tracking-[0.14em] text-white/60">
                You will get
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "Solution categories matched to your challenges",
                  "Why each one fits, in plain language",
                  "Suggested implementation phases",
                  "A clear next step — consultation is optional",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 text-[14px] leading-6 text-white/80">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-1 shrink-0"
                      aria-hidden
                    >
                      <circle cx="8" cy="8" r="7" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                      <path
                        d="M5 8.2L7.1 10.2L11 6"
                        stroke="#67E8F9"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-white/15 pt-4 text-[12px] leading-5 text-white/55">
                No registration required. Recommendations are preliminary guidance, not a quotation.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

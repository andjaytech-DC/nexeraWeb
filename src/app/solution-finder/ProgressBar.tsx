"use client";

import { Container, cx } from "@/components/ui";

/* ─────────────────────────────────────────────────────────────────────────────
   Solution Finder — progress indicator.

   Exposes a real role="progressbar" with aria-valuetext so assistive tech
   announces position, and mirrors the current step in an aria-live region.
   ───────────────────────────────────────────────────────────────────────────── */

export interface StepMeta {
  label: string;
  short: string;
}

export function ProgressBar({
  step,
  totalSteps,
  steps,
}: {
  step: number;
  totalSteps: number;
  steps: StepMeta[];
}) {
  const current = steps[step - 1];
  const progressPercent = Math.round(((step - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="border-b border-line bg-surface">
      <Container className="py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] font-[800] uppercase tracking-[0.12em] text-ink-muted">
            Step {step} of {totalSteps}
          </p>
          <p className="text-[13px] font-[600] text-ink-secondary" aria-live="polite">
            {current.label}
          </p>
        </div>

        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-alt"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-valuetext={`Step ${step} of ${totalSteps}: ${current.label}`}
        >
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <ol className="mt-4 hidden gap-2 sm:grid sm:grid-cols-6">
          {steps.map((s, i) => (
            <li
              key={s.label}
              className={cx(
                "rounded-full border px-3 py-1.5 text-center text-[12px] font-[600]",
                i + 1 === step
                  ? "border-brand bg-brand-soft text-brand"
                  : i + 1 < step
                    ? "border-success-line bg-success-soft text-success"
                    : "border-line bg-surface-alt text-ink-muted",
              )}
            >
              {s.short}
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}

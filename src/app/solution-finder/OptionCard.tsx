"use client";

import { cx } from "@/components/ui";

/* ─────────────────────────────────────────────────────────────────────────────
   Selectable option row used by every step of the Solution Finder.

   Built on real radio/checkbox inputs inside a <label> so it is fully keyboard
   operable and announced correctly by screen readers — the visual card is
   purely presentational.
   ───────────────────────────────────────────────────────────────────────────── */

export interface OptionCardProps {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: () => void;
  /** id of the element describing this option, when a hint exists */
  describedById?: string;
}

export function OptionCard({
  type,
  name,
  value,
  label,
  hint,
  checked,
  onChange,
  describedById,
}: OptionCardProps) {
  return (
    <label
      className={cx(
        "relative flex cursor-pointer gap-3 rounded-2xl border bg-surface p-4 transition duration-200 sm:p-5",
        "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand",
        checked
          ? "border-brand bg-brand-soft shadow-[0_4px_16px_rgba(49,94,251,0.10)]"
          : "border-line hover:border-line-strong hover:bg-surface-alt",
      )}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-describedby={hint ? describedById : undefined}
        className="mt-1 h-4 w-4 shrink-0 accent-brand"
      />
      <span className="min-w-0">
        <span className="block text-[15px] font-[600] leading-6 text-ink">{label}</span>
        {hint ? (
          <span id={describedById} className="mt-1 block text-[13px] leading-5 text-ink-muted">
            {hint}
          </span>
        ) : null}
      </span>
    </label>
  );
}

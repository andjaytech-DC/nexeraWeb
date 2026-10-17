import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "./primitives";

/* ── Buttons ────────────────────────────────────────────────────────────────
   One shared scale so every CTA on the site is identical in size, radius,
   weight, focus ring and hover behaviour.
   ─────────────────────────────────────────────────────────────────────────── */

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-[700] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const BUTTON_VARIANTS = {
  /** Primary brand CTA */
  primary: "bg-brand text-white hover:bg-brand-hover shadow-[0_6px_20px_rgba(49,94,251,0.26)]",
  /** Selective dark navy CTA for high-emphasis moments */
  navy: "bg-navy text-white hover:bg-navy-soft",
  /** Outlined secondary action */
  secondary: "border border-line-strong bg-surface text-ink hover:border-brand hover:text-brand",
  /** Quiet action */
  ghost: "border border-line bg-surface-alt text-ink hover:bg-surface hover:border-line-strong",
  /** For use on navy/dark panels */
  invert: "bg-white text-brand hover:bg-brand-soft",
} as const;

const BUTTON_SIZES = {
  sm: "px-4 py-2 text-[14px]",
  md: "px-6 py-3 text-[15px]",
  lg: "px-7 py-3.5 text-[16px]",
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
export type ButtonSize = keyof typeof BUTTON_SIZES;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={cx(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...rest
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "className">) {
  return (
    <button
      type={type}
      className={cx(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

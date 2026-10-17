import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* ───────────────────────────────────────────────────────────────────────────
   Shared light-theme primitives — layout & typography.

   Every public page composes from these so spacing, radii, borders and type
   scale stay consistent. Dependency-free and fully typed.
   ─────────────────────────────────────────────────────────────────────────── */

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/* ── Layout ─────────────────────────────────────────────────────────────── */

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
}) {
  const max =
    width === "narrow" ? "max-w-[820px]" : width === "wide" ? "max-w-[1440px]" : "max-w-[1200px]";
  return <div className={cx("mx-auto w-full px-5 sm:px-6 lg:px-8", max, className)}>{children}</div>;
}

export type SectionTone = "canvas" | "surface" | "alt" | "navy";

const SECTION_TONES: Record<SectionTone, string> = {
  canvas: "bg-canvas",
  surface: "bg-surface",
  alt: "bg-surface-alt",
  navy: "bg-navy",
};

/** Consistent vertical rhythm across every page. */
export function Section({
  children,
  tone = "canvas",
  size = "default",
  className,
  id,
  as: Tag = "section",
  ...rest
}: {
  children: ReactNode;
  tone?: SectionTone;
  size?: "default" | "lg" | "sm";
  className?: string;
  id?: string;
  as?: "section" | "div" | "article" | "aside";
} & Omit<ComponentPropsWithoutRef<"section">, "children" | "className" | "as">) {
  const pad =
    size === "lg"
      ? "py-16 sm:py-20 lg:py-24"
      : size === "sm"
        ? "py-10 sm:py-12"
        : "py-12 sm:py-16 lg:py-20";
  return (
    <Tag id={id} className={cx(SECTION_TONES[tone], pad, className)} {...rest}>
      {children}
    </Tag>
  );
}

/* ── Typography ─────────────────────────────────────────────────────────── */

/** Small uppercase eyebrow above a heading. */
export function Eyebrow({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: "brand" | "muted" | "invert";
  className?: string;
}) {
  const tones = { brand: "text-brand", muted: "text-ink-muted", invert: "text-brand-line" };
  return (
    <p className={cx("text-[11px] font-[700] uppercase tracking-[0.16em] sm:text-xs", tones[tone], className)}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  tone = "light",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  tone?: "light" | "dark";
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={cx(align === "center" ? "mx-auto max-w-[720px] text-center" : "max-w-[720px]", className)}>
      {eyebrow ? <Eyebrow tone={tone === "dark" ? "invert" : "brand"}>{eyebrow}</Eyebrow> : null}
      <Tag
        className={cx(
          "mt-3 font-[var(--font-display)] text-[26px] font-[800] leading-[1.15] tracking-[-0.025em] sm:text-[32px] lg:text-[38px]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cx(
            "mt-4 text-[16px] leading-7 sm:text-[17px]",
            tone === "dark" ? "text-white/75" : "text-ink-secondary",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* ── Cards ──────────────────────────────────────────────────────────────── */

export function Card({
  children,
  className,
  as: Tag = "div",
  interactive = false,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  interactive?: boolean;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "className" | "as">) {
  const Component = Tag as "div";
  return (
    <Component
      className={cx(
        "rounded-2xl border border-line bg-surface p-6 sm:p-7",
        interactive &&
          "transition duration-200 hover:-translate-y-0.5 hover:border-brand-line hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Soft brand-tinted panel — replaces the old dark-blue blocks. */
export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("rounded-2xl border border-brand-line bg-brand-soft p-6 sm:p-7", className)}>
      {children}
    </div>
  );
}

/** Card heading — consistent size/weight for card titles across the site. */
export function CardTitle({
  children,
  as: Tag = "h3",
  className,
}: {
  children: ReactNode;
  as?: "h3" | "h4";
  className?: string;
}) {
  return (
    <Tag
      className={cx(
        "font-[var(--font-display)] text-[17px] font-[700] leading-6 tracking-[-0.01em] text-ink",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cx("mt-2 text-[15px] leading-7 text-ink-secondary", className)}>{children}</p>;
}

/* ── Feature cards ────────────────────────────────────────────────────────── */

/**
 * Unified feature/service card. Replaces the repeated border + hover-lift
 * pattern scattered across ServicesOverview, IndustriesSection,
 * CaseStudiesSection, ProcessSection and EngagementPaths.
 */
export type FeatureCardTone = "surface" | "brand";

export function FeatureCard({
  children,
  tone = "surface",
  className,
}: {
  children: ReactNode;
  tone?: FeatureCardTone;
  className?: string;
}) {
  const tones: Record<FeatureCardTone, string> = {
    surface:
      "rounded-2xl border border-line bg-surface p-6 transition duration-200 hover:-translate-y-0.5 hover:border-brand-line hover:bg-brand-soft",
    brand:
      "rounded-2xl border border-brand-line bg-brand-soft p-6 transition duration-200 hover:border-brand hover:bg-brand",
  };
  return (
    <article className={cx(tones[tone], className)}>{children}</article>
  );
}

/**
 * Consistent feature grid: two columns on sm+, three on lg+.
 */
export function FeatureGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ul className={cx("grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {children}
    </ul>
  );
}

/* ── Small elements ─────────────────────────────────────────────────────── */

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "brand" | "accent" | "success";
  className?: string;
}) {
  const tones = {
    neutral: "border-line bg-surface-alt text-ink-secondary",
    brand: "border-brand-line bg-brand-soft text-brand",
    accent: "border-accent/30 bg-accent-soft text-brand",
    success: "border-success-line bg-success-soft text-success",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-[13px] font-[600]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Bulleted list with a coloured marker — replaces repeated inline styling. */
export function BulletList({
  items,
  marker = "brand",
  className,
}: {
  items: readonly string[];
  marker?: "brand" | "accent" | "success";
  className?: string;
}) {
  const colors = { brand: "bg-brand", accent: "bg-accent", success: "bg-success" };
  return (
    <ul className={cx("space-y-3", className)}>
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px] leading-7 text-ink-secondary">
          <span className={cx("mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full", colors[marker])} aria-hidden />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** Numbered ordered list used for delivery approaches and roadmaps. */
export function NumberedList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ol className={cx("grid gap-3", className)}>
      {items.map((t, i) => (
        <li
          key={t}
          className="flex gap-3 rounded-xl border border-line bg-surface-alt px-4 py-3 text-[15px] leading-6 text-ink-secondary"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-xs font-[800] text-brand">
            {i + 1}
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ol>
  );
}

/** Section label used inside cards (replaces the old ALL-CAPS h2 pattern). */
export function CardLabel({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: "muted" | "brand" | "success";
  className?: string;
}) {
  const tones = {
    muted: "text-ink-muted",
    brand: "text-brand",
    success: "text-success",
  };
  return (
    <h3 className={cx("text-[11px] font-[800] uppercase tracking-[0.14em]", tones[tone], className)}>
      {children}
    </h3>
  );
}

/**
 * Shared colorful card accents — the system introduced on the job-search
 * cards (IT / BPO / HR), extended across the site's card grids.
 *
 * Tailwind requirement: every utility string is written out in full (no
 * template interpolation) so the compiler's scanner sees each variant.
 * Text colors use Tailwind's 300-tier for legibility on the site's dark
 * surfaces; chips/tiles use 10-30% alpha fills.
 */

export interface CardAccent {
  /** Small category pill. */
  chip: string;
  /** Icon tile. */
  tile: string;
  /** Gradient edge bar (e.g. job cards). */
  bar: string;
  /** Hover border ring. */
  ring: string;
  /** Bullet / status dot. */
  dot: string;
  /** Large gradient header wash. */
  glow: string;
}

export const ACCENTS: Record<string, CardAccent> = {
  sky: {
    chip: "border-sky-400/30 bg-sky-400/10 text-sky-300",
    tile: "border-sky-400/25 bg-sky-400/10 text-sky-300",
    bar: "bg-gradient-to-b from-sky-400 to-cyan-300",
    ring: "group-hover:border-sky-400/40",
    dot: "bg-sky-400",
    glow: "from-sky-400/25 via-sky-400/10 to-transparent",
  },
  blue: {
    chip: "border-blue-400/30 bg-blue-400/10 text-blue-300",
    tile: "border-blue-400/25 bg-blue-400/10 text-blue-300",
    bar: "bg-gradient-to-b from-blue-400 to-sky-300",
    ring: "group-hover:border-blue-400/40",
    dot: "bg-blue-400",
    glow: "from-blue-400/25 via-blue-400/10 to-transparent",
  },
  cyan: {
    chip: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
    tile: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",
    bar: "bg-gradient-to-b from-cyan-400 to-sky-300",
    ring: "group-hover:border-cyan-400/40",
    dot: "bg-cyan-400",
    glow: "from-cyan-400/25 via-cyan-400/10 to-transparent",
  },
  teal: {
    chip: "border-teal-400/30 bg-teal-400/10 text-teal-300",
    tile: "border-teal-400/25 bg-teal-400/10 text-teal-300",
    bar: "bg-gradient-to-b from-teal-400 to-emerald-300",
    ring: "group-hover:border-teal-400/40",
    dot: "bg-teal-400",
    glow: "from-teal-400/25 via-teal-400/10 to-transparent",
  },
  emerald: {
    chip: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    tile: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
    bar: "bg-gradient-to-b from-emerald-400 to-teal-300",
    ring: "group-hover:border-emerald-400/40",
    dot: "bg-emerald-400",
    glow: "from-emerald-400/25 via-emerald-400/10 to-transparent",
  },
  lime: {
    chip: "border-lime-400/30 bg-lime-400/10 text-lime-300",
    tile: "border-lime-400/25 bg-lime-400/10 text-lime-300",
    bar: "bg-gradient-to-b from-lime-400 to-green-300",
    ring: "group-hover:border-lime-400/40",
    dot: "bg-lime-400",
    glow: "from-lime-400/25 via-lime-400/10 to-transparent",
  },
  violet: {
    chip: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    tile: "border-violet-400/25 bg-violet-400/10 text-violet-300",
    bar: "bg-gradient-to-b from-violet-400 to-fuchsia-300",
    ring: "group-hover:border-violet-400/40",
    dot: "bg-violet-400",
    glow: "from-violet-400/25 via-violet-400/10 to-transparent",
  },
  fuchsia: {
    chip: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300",
    tile: "border-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-300",
    bar: "bg-gradient-to-b from-fuchsia-400 to-pink-300",
    ring: "group-hover:border-fuchsia-400/40",
    dot: "bg-fuchsia-400",
    glow: "from-fuchsia-400/25 via-fuchsia-400/10 to-transparent",
  },
  pink: {
    chip: "border-pink-400/30 bg-pink-400/10 text-pink-300",
    tile: "border-pink-400/25 bg-pink-400/10 text-pink-300",
    bar: "bg-gradient-to-b from-pink-400 to-rose-300",
    ring: "group-hover:border-pink-400/40",
    dot: "bg-pink-400",
    glow: "from-pink-400/25 via-pink-400/10 to-transparent",
  },
  rose: {
    chip: "border-rose-400/30 bg-rose-400/10 text-rose-300",
    tile: "border-rose-400/25 bg-rose-400/10 text-rose-300",
    bar: "bg-gradient-to-b from-rose-400 to-pink-300",
    ring: "group-hover:border-rose-400/40",
    dot: "bg-rose-400",
    glow: "from-rose-400/25 via-rose-400/10 to-transparent",
  },
  orange: {
    chip: "border-orange-400/30 bg-orange-400/10 text-orange-300",
    tile: "border-orange-400/25 bg-orange-400/10 text-orange-300",
    bar: "bg-gradient-to-b from-orange-400 to-amber-300",
    ring: "group-hover:border-orange-400/40",
    dot: "bg-orange-400",
    glow: "from-orange-400/25 via-orange-400/10 to-transparent",
  },
  amber: {
    chip: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    tile: "border-amber-400/25 bg-amber-400/10 text-amber-300",
    bar: "bg-gradient-to-b from-amber-400 to-orange-300",
    ring: "group-hover:border-amber-400/40",
    dot: "bg-amber-400",
    glow: "from-amber-400/25 via-amber-400/10 to-transparent",
  },
  // Brand fallback matches the original job-card default styling.
  brand: {
    chip: "border-line bg-surface-alt text-ink-secondary",
    tile: "border-brand/25 bg-brand/10 text-brand",
    bar: "bg-gradient-to-b from-brand to-brand-hover",
    ring: "group-hover:border-brand/40",
    dot: "bg-brand",
    glow: "from-brand/25 via-brand/10 to-transparent",
  },
};

export const accent = (name: string | undefined | null): CardAccent =>
  (name && ACCENTS[name]) || ACCENTS.brand;

/* ── Thematic per-slug assignments (one site-wide map per collection) ── */

export const SERVICE_ACCENTS: Record<string, string> = {
  "website-development": "sky",
  "web-app-development": "blue",
  "mobile-app-development": "emerald",
  "android-app-development": "teal",
  "ios-development": "indigo",
  "crm-development": "rose",
  "erp-development": "amber",
  "scm-development": "orange",
  "saas-development": "fuchsia",
  "enterprise-software": "lime",
  "ai-software-development": "violet",
  "cloud-integration": "cyan",
  bpo: "violet",
  "resource-management": "pink",
  "support-growth": "emerald",
};

export const INDUSTRY_ACCENTS: Record<string, string> = {
  automotive: "rose",
  ecommerce: "pink",
  education: "violet",
  "financial-services": "emerald",
  healthcare: "cyan",
  logistics: "orange",
  manufacturing: "amber",
  "professional-services": "sky",
  "real-estate": "teal",
  retail: "fuchsia",
  "travel-hospitality": "indigo",
};

export const SOLUTION_ACCENTS: Record<string, string> = {
  "digital-transformation": "orange",
  "intelligent-automation": "fuchsia",
  "product-engineering": "sky",
  "enterprise-technology": "indigo",
  "ai-powered-software": "violet",
  "digital-platforms": "cyan",
  "business-process-transformation": "amber",
  "system-integration": "teal",
};

export const INSIGHT_ACCENTS: Record<string, string> = {
  ai: "violet",
  "digital-transformation": "orange",
  "enterprise-software": "emerald",
  saas: "fuchsia",
  cloud: "cyan",
  "technology-strategy": "amber",
  "business-automation": "rose",
};

export const CAREERS_ACCENTS: Record<string, string> = {
  "/careers/job-search": "sky",
  "/careers/students": "emerald",
  "/careers/contract-opportunities": "amber",
  "/careers/talent-community": "violet",
  "/careers/send-resume": "cyan",
};

/**
 * One-off migration script: maps the legacy dark-theme Tailwind classes used
 * across the public pages onto the new light-theme design tokens.
 *
 *   npx tsx scripts/migrate-light-theme.ts          # dry run, prints summary
 *   npx tsx scripts/migrate-light-theme.ts --apply  # writes the files
 *
 * Context-aware by design:
 *  • `text-white` becomes ink text EXCEPT inside dark CTA panels (those
 *    panels are turned into navy panels, where white text must be kept).
 *    Those blocks are tracked with a small state machine.
 *  • White "pill" buttons (`bg-white text-[#070A0F]`) become brand buttons so
 *    they remain visible on a light background.
 *
 * The admin area is intentionally excluded — it stays on the dark theme.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const APPLY = process.argv.includes("--apply");

/** Exact string/class replacements, applied in order. */
const GLOBAL: Array<[RegExp, string]> = [
  // ── White pill buttons → brand buttons (must precede generic bg-white) ──
  [/bg-white text-\[#070A0F\]/g, "bg-brand text-white"],
  [/hover:bg-white\/90/g, "hover:bg-brand-hover"],
  [/bg-white text-\[#0A0E13\]/g, "bg-brand text-white"],
  [/text-\[#070A0F\]/g, "text-brand"],
  [/text-\[#0A0E13\]/g, "text-ink"],

  // ── Surfaces ──
  [/bg-\[#070A0F\]/g, "bg-canvas"],
  [/bg-\[#0C1018\]/g, "bg-surface"],
  [/bg-\[#0F141E\]\/80/g, "bg-surface/95"],
  [/bg-\[#0F141E\]/g, "bg-surface"],
  [/bg-\[#131A27\]/g, "bg-surface-alt"],

  // ── Main text ──
  [/text-\[#E6EAF0\]/g, "text-ink"],

  // ── Translucent white fills → light surfaces ──
  [/bg-white\/\[0\.02\]/g, "bg-surface-alt"],
  [/bg-white\/\[0\.03\]/g, "bg-surface-alt"],
  [/bg-white\/\[0\.04\]/g, "bg-surface-alt"],
  [/bg-white\/\[0\.06\]/g, "bg-surface-alt"],
  [/bg-white\/\[0\.07\]/g, "bg-brand-soft"],
  [/bg-white\/5\b/g, "bg-surface-alt"],
  [/bg-white\/10\b/g, "bg-surface-alt"],

  // ── Borders ──
  [/border-white\/\[0\.06\]/g, "border-line"],
  [/border-white\/5\b/g, "border-line"],
  [/border-white\/10\b/g, "border-line"],
  [/border-white\/15\b/g, "border-line-strong"],
  [/divide-white\/5\b/g, "divide-line"],

  // ── Brand blue ──
  [/bg-\[#4F7EFF\]\/10/g, "bg-brand-soft"],
  [/bg-\[#4F7EFF\]\/15/g, "bg-brand-soft"],
  [/bg-\[#4F7EFF\]\/20/g, "bg-brand-soft"],
  [/bg-\[#4F7EFF\]\/30/g, "bg-brand-soft"],
  [/border-\[#4F7EFF\]\/15/g, "border-brand-line"],
  [/border-\[#4F7EFF\]\/20/g, "border-brand-line"],
  [/border-\[#4F7EFF\]\/50/g, "border-brand"],
  [/focus:border-\[#4F7EFF\]\/50/g, "focus:border-brand"],
  [/bg-\[#4F7EFF\]/g, "bg-brand"],
  [/hover:bg-\[#3E6AF0\]/g, "hover:bg-brand-hover"],
  [/bg-\[#3E6AF0\]/g, "bg-brand-hover"],
  [/text-\[#4F7EFF\]/g, "text-brand"],
  [/text-\[#8AA8FF\]/g, "text-brand"],
  [/from-\[#4F7EFF\]/g, "from-brand"],
  [/to-\[#22D3EE\]/g, "to-accent"],
  [/via-\[#22D3EE\]\/10/g, "via-accent/10"],
  [/bg-\[#22D3EE\]/g, "bg-accent"],
  [/text-\[#22D3EE\]/g, "text-accent"],
  [/hover:text-\[#22D3EE\]/g, "hover:text-accent"],
  [/selection:bg-\[#4F7EFF\]\/30/g, "selection:bg-brand/20"],

  // ── Status colours ──
  [/bg-emerald-500\/10/g, "bg-success-soft"],
  [/bg-emerald-500\/15/g, "bg-success-soft"],
  [/border-emerald-500\/10/g, "border-success-line"],
  [/border-emerald-500\/15/g, "border-success-line"],
  [/border-emerald-500\/20/g, "border-success-line"],
  [/text-emerald-300/g, "text-success"],
  [/text-emerald-400/g, "text-success"],
  [/hover:text-emerald-300/g, "hover:text-success"],
  [/bg-red-500\/5/g, "bg-danger-soft"],
  [/bg-red-500\/10/g, "bg-danger-soft"],
  [/border-red-500\/20/g, "border-danger-line"],
  [/border-red-500\/50/g, "border-danger"],
  [/text-red-300/g, "text-danger"],
  [/border-amber-500\/15/g, "border-warning-line"],
  [/bg-amber-500\/\[0\.06\]/g, "bg-warning-soft"],
  [/bg-amber-500\/10/g, "bg-warning-soft"],
  [/text-amber-300/g, "text-warning"],
  [/bg-amber-500\b/g, "bg-warning"],

  // ── Dark-only shadows ──
  [
    /shadow-\[0_24px_64px_rgba\(0,0,0,0\.6\)\]/g,
    "shadow-[0_20px_50px_rgba(15,23,42,0.12)]",
  ],
  [
    /shadow-\[0_8px_32px_rgba\(79,126,255,0\.35\)\]/g,
    "shadow-[0_6px_20px_rgba(49,94,251,0.26)]",
  ],
  [
    /shadow-\[0_8px_24px_rgba\(79,126,255,0\.3\)\]/g,
    "shadow-[0_6px_20px_rgba(49,94,251,0.26)]",
  ],
  [
    /bg-\[radial-gradient\(ellipse_80%_60%_at_50%_-10%,rgba\(79,126,255,0\.22\),transparent_60%\),radial-gradient\(ellipse_60%_40%_at_90%_20%,rgba\(34,211,238,0\.12\),transparent_60%\)\]/g,
    "bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(49,94,251,0.07),transparent_60%)]",
  ],
  [
    /bg-\[radial-gradient\(ellipse_70%_45%_at_50%_0%,rgba\(79,126,255,0\.14\),transparent_60%\)\]/g,
    "bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(49,94,251,0.07),transparent_60%)]",
  ],
  [/rgba\(79,126,255,/g, "rgba(49,94,251,"],
  [/rgba\(34,211,238,/g, "rgba(8,145,178,"],
];


/**
 * Opacity-suffixed white text → ink equivalents, applied only OUTSIDE dark
 * panels. `text-white/60` on a dark surface ≈ `text-ink-secondary` on light.
 */
const WHITE_TEXT: Array<[RegExp, string]> = [
  [/text-white\/80/g, "text-ink-secondary"],
  [/text-white\/70/g, "text-ink-secondary"],
  [/text-white\/60/g, "text-ink-secondary"],
  [/text-white\/50/g, "text-ink-secondary"],
  [/text-white\/45/g, "text-ink-muted"],
  [/text-white\/40/g, "text-ink-muted"],
  [/text-white\/35/g, "text-ink-muted"],
  [/text-white\/30/g, "text-ink-muted"],
  [/text-white\/25/g, "text-ink-muted"],
  [/hover:text-white\/70/g, "hover:text-brand"],
  [/hover:text-white\/60/g, "hover:text-brand"],
  [/hover:text-white\/50/g, "hover:text-brand"],
  // A white hover colour is invisible on the new light cards.
  [/hover:text-white\b/g, "hover:text-brand"],
  [/group-hover:text-white\b/g, "group-hover:text-brand"],
  [/placeholder:text-white\/30/g, "placeholder:text-ink-muted"],
];

/** Lines that open a dark CTA panel, where inner white text must be kept. */
const DARK_PANEL_OPEN = /bg-\[#4F7EFF\] p-7 text-white|bg-\[#4F7EFF\] p-6 text-white/;

/**
 * Applies white→ink conversion with a small state machine so text inside a
 * dark CTA panel keeps its white colour (the panel itself becomes navy).
 */
function convertWhiteText(source: string): string {
  const lines = source.split("\n");
  const out: string[] = [];
  let inDarkPanel = false;

  for (const line of lines) {
    if (!inDarkPanel && DARK_PANEL_OPEN.test(line)) {
      inDarkPanel = true;
      out.push(line);
      const opens = (line.match(/<div/g) ?? []).length;
      const closes = (line.match(/<\/div>/g) ?? []).length;
      if (closes > 0 && closes >= opens) inDarkPanel = false;
      continue;
    }

    if (inDarkPanel) {
      out.push(line);
      const opens = (line.match(/<div/g) ?? []).length;
      const closes = (line.match(/<\/div>/g) ?? []).length;
      if (closes > 0 && closes >= opens) inDarkPanel = false;
      continue;
    }

    let converted = line;
    for (const [re, replacement] of WHITE_TEXT) converted = converted.replace(re, replacement);
    converted = converted.replace(/(?<![\w:/.-])text-white\b(?!\/)/g, "text-ink");
    out.push(converted);
  }

  return out.join("\n");
}

/** Convert one file's contents from the legacy dark theme to the light theme. */
export function convertSource(original: string): string {
  let text = original;

  for (const [re, replacement] of GLOBAL) text = text.replace(re, replacement);
  text = convertWhiteText(text);

  // Brand CTA panels become explicit navy panels so their white text reads.
  text = text.replace(/rounded-2xl bg-brand p-7 text-white/g, "rounded-2xl bg-navy p-7 text-white");
  text = text.replace(/rounded-2xl bg-brand p-6 text-white/g, "rounded-2xl bg-navy p-6 text-white");

  return text;
}

/** Public pages + shared components. Admin is excluded (stays dark). */
function targetFiles(): string[] {
  const out = execSync("git ls-files \"src/app/*\" \"src/components/*\" \"src/lib/*\"", {
    encoding: "utf8",
  });
  return out
    .split(/\r?\n/)
    .filter((f) => f.trim())
    .filter((f) => /\.tsx?$/.test(f))
    .filter((f) => !f.includes("src/app/admin"))
    .filter((f) => !f.includes("src/app/solution-finder"))
    .filter((f) => !f.includes("src/components/ui/"))
    .filter((f) => !f.includes("src/lib/solution-finder/"))
    .filter((f) => !f.includes("src/lib/nav-data.ts"))
    .filter(
      (f) =>
        ![
          "src/components/Header.tsx",
          "src/components/Footer.tsx",
          "src/components/Logo.tsx",
          "src/components/HeaderMenus.tsx",
          "src/components/AdminLogoutButton.tsx",
          "src/app/page.tsx",
          "src/app/layout.tsx",
          "src/app/globals.css",
        ].includes(f),
    );
}

let changed = 0;
const report: string[] = [];

/** Only run the batch when invoked directly, not when imported for preview. */
const isMain = process.argv[1]?.includes("migrate-light-theme");

if (isMain) {
for (const file of targetFiles()) {
  const original = readFileSync(file, "utf8");
  const text = convertSource(original);

  if (text !== original) {
    changed += 1;
    report.push(file);
    if (APPLY) writeFileSync(file, text, "utf8");
  }
}

console.log(`${APPLY ? "Updated" : "Would update"} ${changed} files`);
for (const r of report) console.log(`  ${r}`);
}


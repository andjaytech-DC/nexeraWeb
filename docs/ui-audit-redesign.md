### 1.2 Header, navigation & CTA placement

| Finding | Status | Impact | Correction | File |
|---|---|---|---|---|
| Sticky header, 68px height, `backdrop-blur-xl`, `border-b border-line`. | Verified (code) | Height is appropriate (not excessive); blur gives depth without clutter. | Added a subtle scroll-state shadow so the header gains presence when the user scrolls down. | `src/components/Header.tsx` |
| Logo wordmark + brand-blue mark; `onDark` variant for the navy footer. | Verified (code) | Brand stays recognizable on both light and dark surfaces. | None needed. | `src/components/Logo.tsx` |
| Primary nav groups Solutions / Services / Industries / Case Studies / Technology / Process / Insights; Careers is a grouped dropdown. | Verified (code) | Sensible grouping; Careers is correctly separated from product navigation. | None needed. | `src/components/Header.tsx`, `src/lib/nav-data.ts` |
| "Start a Project" brand CTA in the header; "Start the solution finder" in the navy FinderCta panel; "Start a project" / "Talk to our team" in FinalCta. | Verified (code) | Consistent primary CTA wording across the page. | Unified focus-visible rings on all CTAs. | `src/components/Header.tsx`, `src/components/Footer.tsx` |
| Mobile drawer menu with Careers submenu, skip-to-main link, address + phone + email in the drawer footer. | Verified (code) | Keyboard-accessible skip link present; mobile nav covers the essentials. | Added `focus-visible` ring to the mobile menu toggle button. | `src/components/Header.tsx` |

### 1.3 Typography

| Finding | Status | Impact | Correction | File |
|---|---|---|---|---|
| Fonts: Inter (sans/body), Plus Jakarta Sans (display/headings), JetBrains Mono (mono). All loaded via `next/font/google` with `display: swap`. | Verified (code) | Strong, legible pairing; self-hosted by Next.js (no external font requests, no layout shift from font loading). | None needed — already excellent. | `src/app/layout.tsx`, `src/app/globals.css` |
| Heading scale: H1 36–60px, section headings 26–38px, card titles 17px. Body 15–17px, leading 1.6–1.75. | Verified (code) | Consistent type scale; readable paragraph widths (`max-w-[560px]`–`max-w-[720px]`). | None needed. | `src/components/ui/primitives.tsx`, `src/app/sections/*.tsx` |
| Line lengths: hero supporting paragraph `max-w-[560px]` (~60–75 chars at 17px). | Verified (code) | Within the optimal 45–75 character measure for body text. | None needed. | `src/app/sections/Hero.tsx` |

### 1.4 Color, contrast & section separation

| Finding | Status | Impact | Correction | File |
|---|---|---|---|---|
| Token system in `globals.css`: canvas `#F8FAFC`, surface `#FFFFFF`, ink `#111827`, brand `#315EFB`, navy `#0F172A`, accent `#0891B2`. Contrast claims documented in comments (ink 17.4:1, ink-secondary 7.5:1, ink-muted 4.8:1). | Verified (code) | Coherent, documented token system. Contrast claims should be re-verified with a color-contrast tool against the rendered page. | None in code; added to the verification checklist below. | `src/app/globals.css` |
| Section tones alternate canvas / surface / alt / navy, so no two adjacent sections look identical. | Verified (code) | Good vertical rhythm; navy panels (FinderCta, FinalCta) create high-contrast bookends. | None needed. | `src/components/ui/primitives.tsx` (`Section` tone prop) |
| Selective use of dark — navy reserved for CTAs only, not full-page dark mode. | Verified (code) | Matches the "light enterprise" brief; avoids an unnecessary dark-mode toggle. | None needed. | `src/app/globals.css`, `src/app/sections/FinderCta.tsx`, `src/app/sections/FinalCta.tsx` |

### 1.5 Container, alignment, whitespace & vertical rhythm

| Finding | Status | Impact | Correction | File |
|---|---|---|---|---|
| `Container` primitive: `max-w-[1200px]`, `px-5 sm:px-6 lg:px-8`; narrow/wide variants. | Verified (code) | Generous but bounded content width; consistent padding breakpoints. | None needed. | `src/components/ui/primitives.tsx` |
| `Section` primitive: consistent vertical padding (`py-12 sm:py-16 lg:py-20` default; `lg`/`sm` variants). | Verified (code) | Uniform vertical rhythm across all sections. | None needed. | `src/components/ui/primitives.tsx` |
| `grid-pattern` decorative texture on Hero and PageHeader (low-contrast 32px grid). | Verified (code) | Subtle, non-distracting decoration. | None needed. | `src/app/globals.css` |

# Nexara Global Solutions — Homepage UI Audit & Redesign

**Status:** Implemented (surgical refinement of the existing light-enterprise theme).  
**Repository:** `C:\Users\bobby\nexeraWeb`  
**Stack:** Next.js 16.3.5 (Turbopack), React 19, Tailwind CSS v4, TypeScript strict

## 0. Important scope note

No homepage screenshot was supplied to me in this conversation, so I could not perform a direct visual comparison against a provided image. Every finding below is **verified from source inspection** of `C:\Users\bobby\nexeraWeb` (components, sections, design tokens, and the running homepage on `localhost:3000`, status 200). Where a judgment calls on visual rendering I cannot confirm, it is explicitly marked as an assumption and flagged for verification against the actual screenshot.

## 1. Screenshot audit (code-verified findings)

### 1.1 Visual hierarchy & first-screen effectiveness

| Finding | Status | Impact | Correction | File |
|---|---|---|---|---|
| Hero uses a split layout with a "How we engage" workflow diagram on the right and a clear headline ("Build better. Operate smarter. Grow faster.") on the left. | Verified (code) | Strong first-screen clarity; the diagram is a genuine visual focal point rather than decorative stock imagery. | None needed — already working. Retain. | `src/app/sections/Hero.tsx` |
| Hero headline is split across three lines with "Grow faster." in brand color. | Verified (code) | Readable, controlled line length; brand color draws the eye to the value verb. | None needed. | `src/app/sections/Hero.tsx` |
| Two CTAs side by side ("Find the right solution" primary, "Start a project" secondary). | Verified (code) | Clear conversion path; primary/secondary distinction via filled vs outlined style. | Add explicit visual separation so the secondary CTA doesn't compete with the primary. | `src/app/sections/Hero.tsx` |

### 1.6 Cards, buttons, badges, borders, shadows, radii

| Finding | Status | Impact | Correction | File |
|---|---|---|---|---|
| `Button` primitive: primary/navy/secondary/ghost/invert variants; sm/md/lg sizes; `rounded-full`; consistent shadow on primary. | Verified (code) | One shared CTA scale sitewide. | Added `focus-visible` rings to header mobile toggle and footer CTAs. | `src/components/ui/Button.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx` |
| Cards previously used an inline repeated pattern (`rounded-2xl border border-line bg-surface p-6 hover:-translate-y-0.5 hover:border-brand-line`) across IndustriesSection, CaseStudiesSection, ProcessSection, EngagementPaths. | Verified (code) | Consistent visually, but the pattern was duplicated inline in 4 sections — a maintenance and consistency risk. | Introduced a unified `FeatureCard` primitive (`tone: "surface" | "brand"`) and refactored all 4 sections to use it. | `src/components/ui/primitives.tsx`, `src/app/sections/{IndustriesSection,CaseStudiesSection,ProcessSection,EngagementPaths}.tsx` |
| `Badge` primitive: neutral/brand/accent/success tones, `rounded-full`. | Verified (code) | Restrained badge scale. | None needed. | `src/components/ui/primitives.tsx` |
| No `box-shadow` utility overuse; shadows only on primary Button (`shadow-[0_6px_20px_rgba(...)]`) and card hover. | Verified (code) | Restrained shadow use — appropriate for enterprise. | Added `--shadow-card` and `--shadow-elevated` tokens to `globals.css` for future consistency. | `src/app/globals.css` |
| Radii previously arbitrary (`rounded-2xl`, `rounded-3xl`, `rounded-xl`, `rounded-full`). | Verified (code) | Mostly consistent but undocumented. | Added `--radius-sm`…`--radius-full` tokens to `globals.css`. | `src/app/globals.css` |

### 1.7 Section ordering, content density & conversion paths

| Finding | Status | Impact | Correction | File |
|---|---|---|---|---|
| Order: Hero → ServicesOverview → FinderCta → IndustriesSection → CaseStudiesSection → CapabilitiesSection → ProcessSection → EngagementPaths → FinalCta. | Verified (code) | Logical funnel: what we do → how to start → who we serve → proof → how we work → ways to engage → final CTA. | None needed — the sequence is sound. | `src/app/page.tsx` |
| Each section deliberately uses a different layout shape (split, comparison panel, diagram, highlights, compact list) rather than repeating one card grid. | Verified (code) | Avoids visual monotony; good rhythm. | None needed. | `src/app/page.tsx`, section comments |
| No invented clients, logos, metrics, testimonials, or awards. Case studies are labelled as "engagement patterns" with an explicit disclaimer. | Verified (code) | Compliant with the "no invented content" constraint. | None needed. | `src/app/sections/CaseStudiesSection.tsx`, `src/lib/solution-finder/config.ts` |
| Solution Finder (3 steps: industry → challenges → outcome) linked from Hero, FinderCta, EngagementPaths, and Footer. | Verified (code) | A genuine, non-generic conversion path. | None needed. | `src/app/solution-finder/`, `src/lib/solution-finder/config.ts` |

### 1.8 Mobile & tablet responsiveness

| Finding | Status | Impact | Correction | File |
|---|---|---|---|---|
| Header: desktop nav `lg:flex`, mobile drawer `lg:hidden`; drawer closes on resize ≥1024px. | Verified (code) | Responsive header; drawer state resets correctly. | Added scroll-state shadow + focus-visible ring on mobile toggle. | `src/components/Header.tsx` |
| Hero: `lg:grid-cols-[1.05fr_0.95fr]` split; single column on mobile. | Verified (code) | Responsive hero; workflow diagram stacks appropriately. | None needed. | `src/app/sections/Hero.tsx` |
| Sections use `sm:`/`lg:` breakpoint prefixes consistently. | Verified (code) | Tablet and desktop layouts are considered. | None needed. | `src/components/ui/primitives.tsx`, section files |

### 1.9 Accessibility (keyboard, focus, semantics, reduced motion)

| Finding | Status | Impact | Correction | File |
|---|---|---|---|---|
| Skip-to-main link (`#main`), `sr-only-focusable`, visible on focus. | Verified (code) | Keyboard users can bypass the header. | None needed. | `src/app/layout.tsx` |
| `:focus-visible` global ring (`2px solid #315EFB`, offset 2px). | Verified (code) | Keyboard focus visible on all interactive elements. | None needed globally; added to header mobile toggle + footer CTAs. | `src/app/globals.css` |
| `prefers-reduced-motion` respected: `scroll-behavior: auto`, animations reduced to `0.01ms`. | Verified (code) | Motion-sensitive users are accommodated. | Added `.nx-reduced-motion` utility class for opt-out per-component. | `src/app/globals.css` |
| Semantic HTML: `header`, `nav`, `main`, `section`, `article`, `ol`, `ul`, `address`, `aria-label`, `aria-current`, `aria-expanded`, `aria-hidden`. | Verified (code) | Good semantic foundation. | None needed. | Across components |
| Color contrast claims documented but not independently verified against rendered output. | Assumed | ink-muted `#64748B` on white may fall below AA (4.5:1) for small body text. | Verify with a contrast tool; treat ink-muted as decorative/meta only or increase size. | `src/app/globals.css` |


## 2. External frontend resources studied

| Resource | URL | Verified? | What it offers | Relevance to this redesign |
|---|---|---|---|---|
| Motion Primitives | https://motion-primitives.com/ | Yes | Open-source React motion component kit (Framer Motion-based, copy-paste components), made by Edouard Wilfrid Buquet. Free, open source, regular component releases. | Source of inspiration for subtle entrance/hover motion. We already have `nx-fade-up` + `prefers-reduced-motion` in `globals.css`; no new dependency added. |
| Master UI | https://master-ui.com/ | Yes | Figma design system by MasterBorn (Wrocław, Poland). 20+ components, 720+ variants, Tailwind CSS tokens, atomic design, light/dark mode. Free download (email-gated). | Design-process inspiration (tokens-first, variant-organized components). We already maintain tokens in `globals.css` and variants in `Button.tsx`/`Badge.tsx`. |
| Skipper UI | https://skipper-ui.com/ | No (fetch failed) | Could not be verified; not referenced. | — |
| UI Magic | https://uimagic.co/ | No (fetch failed) | Could not be verified; not referenced. | — |

**Decision:** No new libraries installed. The existing stack (Tailwind v4 + `next/font/google` + dependency-free primitives in `src/components/ui/`) already provides everything the resources inspired, with a smaller dependency footprint and no licensing uncertainty.

## 3. Design system established (implemented)

All tokens live in `src/app/globals.css` (`@theme inline`). Surfaces, text, brand, accent, navy, status colors, and the Inter / Plus Jakarta Sans / JetBrains Mono font stack were already defined with documented contrast ratios.

### 3.1 Tokens added in this redesign

```
--shadow-sm / --shadow-card / --shadow-elevated
--radius-sm / --radius-md / --radius-lg / --radius-xl / --radius-2xl / --radius-full
.nx-reduced-motion utility class
```

### 3.2 Primitives added in this redesign

| Primitive | Purpose | File |
|---|---|---|
| `FeatureCard(tone)` | Unified card with consistent border, padding, and hover-lift (replaces duplicated inline patterns) | `src/components/ui/primitives.tsx` |
| `FeatureGrid` | Consistent 2-col (sm) / 3-col (lg) feature grid | `src/components/ui/primitives.tsx` |

Both exported from `src/components/ui/index.ts`.

### 3.3 Typography scale (retained)

| Use | Font | Size | Weight | Line height |
|---|---|---|---|---|
| Display headings | Plus Jakarta Sans | 26–60px | 800 | 1.06–1.2 |
| Body | Inter | 14–17px | 400–600 | 1.6–1.75 |
| Mono (technical) | JetBrains Mono | 12–13px | 600 | — |

## 4. Redesign changes implemented

| Area | Change | File(s) |
|---|---|---|
| Design tokens | Added `--shadow-*`, `--radius-*`, `.nx-reduced-motion` | `src/app/globals.css` |
| Feature primitives | Added `FeatureCard` + `FeatureGrid` | `src/components/ui/primitives.tsx`, `src/components/ui/index.ts` |
| Industries section | Refactored featured-industry cards onto `FeatureCard` | `src/app/sections/IndustriesSection.tsx` |
| Case Studies section | Refactored story cards onto `FeatureCard` | `src/app/sections/CaseStudiesSection.tsx` |
| Process section | Refactored phase cards onto `FeatureCard` | `src/app/sections/ProcessSection.tsx` |
| Engagement Paths | Refactored path cards onto `FeatureCard` (brand tone for featured) | `src/app/sections/EngagementPaths.tsx` |
| Header | Added scroll-state shadow (`scrolled > 8px`), `focus-visible` ring on mobile menu toggle | `src/components/Header.tsx` |
| Footer | Added `focus-visible` outline on nav links and the "Find the right solution" CTA | `src/components/Footer.tsx` |
| Hero | Applied `nx-anim-in` entrance animation | `src/app/sections/Hero.tsx` |

### What was deliberately NOT changed
- Brand colors, fonts, logo, and company contact details (Noida, India; phone/email) — preserved per constraint.
- No invented clients, case studies, metrics, testimonials, or awards were added.
- No backend, authentication, forms, or routes were introduced or modified.
- The existing section ordering and rhythm were retained (they are already sound).

## 5. Verification & next steps

### 5.1 Checks performed
- `npx tsc --noEmit` — no errors in any file I modified (pre-existing errors remain only in `scripts/test-contact.ts`, which is out of scope).
- `npx eslint` — no errors in any file I modified (pre-existing errors remain in API routes and `scripts/test-contact.ts`).
- `npx next build` — Next.js compilation succeeded ("Compiled successfully in 32.1s"); the type-check step fails only on the pre-existing `scripts/test-contact.ts`.

### 5.2 Still to verify (against the actual screenshot & rendered page)
1. **Color contrast** — run ink/ink-secondary/ink-muted on `#FFFFFF` through a WCAG contrast checker; confirm AA (4.5:1) for normal text and 3:1 for UI controls.
2. **Visual regression** — open `localhost:3000` and compare the rendered homepage against the supplied screenshot; confirm the scroll-state shadow, focus rings, and `FeatureCard` hover lift render as intended.
3. **Keyboard navigation** — Tab through the header, mobile drawer, footer links, and CTAs; confirm visible focus rings everywhere.
4. **Reduced motion** — enable `prefers-reduced-motion` in the OS/browser and confirm animations disable.
5. **Mobile rendering** — check the drawer menu and hero stack on a narrow viewport (≤768px).

## 6. Files changed

- `src/app/globals.css` — tokens + reduced-motion utility
- `src/components/ui/primitives.tsx` — `FeatureCard`, `FeatureGrid`
- `src/components/ui/index.ts` — barrel exports
- `src/components/Header.tsx` — scroll shadow, focus ring
- `src/components/Footer.tsx` — focus rings
- `src/app/sections/Hero.tsx` — entrance animation
- `src/app/sections/IndustriesSection.tsx` — FeatureCard
- `src/app/sections/CaseStudiesSection.tsx` — FeatureCard
- `src/app/sections/ProcessSection.tsx` — FeatureCard
- `src/app/sections/EngagementPaths.tsx` — FeatureCard
- `docs/ui-audit-redesign.md` — this document


/* ───────────────────────────────────────────────────────────────────────────
   Site navigation data — single source shared by the Header, Footer and the
   mobile menu. Sentence-case labels for navigation, per the content guidance.
   ─────────────────────────────────────────────────────────────────────────── */

export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Technology", href: "/technologies" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
];

export const careersItems: Array<NavItem & { desc: string }> = [
  { label: "Job Search", href: "/careers/job-search", desc: "Find your next role" },
  { label: "Students & Entry Level", href: "/careers/students", desc: "Early career" },
  { label: "Contract Opportunities", href: "/careers/contract-opportunities", desc: "Flexible engagements" },
  { label: "Talent Community", href: "/careers/talent-community", desc: "Stay connected" },
  { label: "Send Your Resume", href: "/careers/send-resume", desc: "Share your profile" },
];

/** Shared nav-link styling — used by desktop and mobile menus alike. */
export const NAV_LINK = "text-[14px] font-[500] transition";
export const NAV_IDLE = "text-ink-secondary hover:text-brand";
export const NAV_ACTIVE = "text-brand";

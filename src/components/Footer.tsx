import Link from "next/link";
import { Logo } from "./Logo";
import { contactInfo } from "@/lib/site-data";

/* ───────────────────────────────────────────────────────────────────────────
   Site footer — light theme, structured into useful navigation columns plus
   full contact details. Only links to routes that exist are rendered; the
   legal entries remain unlinked because no policy pages exist yet.
   ─────────────────────────────────────────────────────────────────────────── */

const FOOTER_LINK =
  "text-white/65 transition focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2 hover:text-white";
const FOOTER_HEADING = "text-[11px] font-[800] uppercase tracking-[0.14em] text-white/55";
const FOOTER_MUTED = "text-white/55";

const columns: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "Solutions",
    links: [
      { label: "All solutions", href: "/solutions" },
      { label: "Digital transformation", href: "/solutions/digital-transformation" },
      { label: "Intelligent automation", href: "/solutions/intelligent-automation" },
      { label: "Product engineering", href: "/solutions/product-engineering" },
      { label: "Enterprise technology", href: "/solutions/enterprise-technology" },
      { label: "AI-powered software", href: "/solutions/ai-powered-software" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "All services", href: "/services" },
      { label: "CRM development", href: "/services/crm-development" },
      { label: "ERP development", href: "/services/erp-development" },
      { label: "SCM development", href: "/services/scm-development" },
      { label: "SaaS development", href: "/services/saas-development" },
      { label: "AI software", href: "/services/ai-software-development" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "All industries", href: "/industries" },
      { label: "Financial services", href: "/industries/financial-services" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Retail & e-commerce", href: "/industries/retail" },
      { label: "Logistics", href: "/industries/logistics" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Case studies", href: "/case-studies" },
      { label: "Technology", href: "/technologies" },
      { label: "How we deliver", href: "/process" },
      { label: "Insights", href: "/insights" },
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2.6fr]">
          {/* Brand + contact */}
          <div>
            <Logo onDark />
            <p className="mt-4 max-w-[340px] text-[15px] leading-7 text-white/70">
              We turn complex business challenges into practical digital solutions — strategy,
              engineering, AI and scalable technology under one accountable partner.
            </p>
            <Link
              href="/solution-finder"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-[14px] font-[700] text-white transition focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 hover:border-white/50 hover:bg-white/[0.16]"
            >
              Find the right solution →
            </Link>
            <address className="mt-6 space-y-1.5 text-[14px] leading-6 not-italic text-white/70">
              <p>3rd Floor, D23 Building, S3V Business Park</p>
              <p>Sector-59, Noida, Gautam Buddha Nagar</p>
              <p>Uttar Pradesh – 201301, India</p>
              <p className="pt-2">
                <a href={contactInfo.phoneHref} className="font-[600] text-white hover:text-white/80">
                  {contactInfo.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={contactInfo.emailHref} className="font-[600] text-white hover:text-white/80">
                  {contactInfo.email}
                </a>
              </p>
            </address>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className={FOOTER_HEADING}>{col.title}</h2>
                <ul className="mt-4 space-y-2.5 text-[14px]">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className={FOOTER_LINK}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className={FOOTER_MUTED}>
            © 2026 Nexara Global Solutions. All rights reserved.
          </p>
          <ul className={`flex gap-5 text-[13px] ${FOOTER_MUTED}`}>
            {/* No policy pages exist yet, so these are intentionally not links. */}
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

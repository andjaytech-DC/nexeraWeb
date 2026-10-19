import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Website Design & Development — Services",
  description: "Corporate, B2B lead-generation and B2C e-commerce website development — booking, directory, marketplace and CMS-driven websites, landing pages and modernization.",
  alternates: { canonical: "/services/website-development" },
  openGraph: { title: "Website Design & Development — Services", description: "Corporate, B2B lead-generation and B2C e-commerce website development — booking, directory, marketplace and CMS-driven websites, landing pages and modernization." },
};

export default function Page() {
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.16em] font-[700] text-ink-muted"><Link href="/services" className="hover:text-brand">SERVICES</Link><span>/</span><span className="text-ink-secondary">Website Design &amp; Development</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[34px] sm:text-[46px] font-[800] tracking-[-0.04em] leading-[0.9] text-ink">Website Design &amp; Development</h1>
          <p className="mt-4 max-w-[640px] text-sm leading-6 text-ink-secondary">Websites for B2B, B2C and every business model in between — planned, designed and built to generate leads, sales and trust. <span className="text-ink-secondary">One partner from first wireframe to launch and beyond.</span></p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact?type=new-project" className="rounded-full bg-brand px-6 py-2.5 text-sm font-[700] text-white hover:bg-brand-hover transition">Discuss Your Project →</Link>
            <Link href="/services/web-app-development" className="rounded-full border border-line bg-surface-alt px-6 py-2.5 text-sm font-[600] text-ink hover:bg-surface-alt transition">Need an application instead?</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1.35fr_0.85fr] gap-8">
          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-brand">BUSINESS PROBLEMS ADDRESSED</h2>
              <ul className="mt-4 space-y-2.5">
                {["No website, or one that undermines credibility","Visitors arrive but never become leads or orders","Site is slow, not mobile-friendly and hard to update","Content changes always depend on a developer"].map(t=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">WHAT WE BUILD</h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
                {["Corporate, business and startup websites","B2B and lead-generation websites","Partner and dealer portals","B2C e-commerce, D2C storefronts and catalogs","Booking, appointment and directory websites","Marketplace websites","CMS-driven, multilingual and content-heavy sites","Landing pages, CRO and website modernization"].map(t=>(
                  <span key={t} className="rounded-xl border border-line bg-surface-alt px-3.5 py-2.5 text-sm text-ink-secondary">{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">TYPICAL USE CASES</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["B2B corporate & lead-gen sites","B2C online stores","Booking & appointments","Startups & MVP landing pages","Catalog & brochure sites","Modernizing an outdated site"].map(t=>(
                  <span key={t} className="rounded-full border border-line bg-surface-alt px-3.5 py-1.5 text-xs font-[500] text-ink-secondary">{t}</span>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-ink-muted">A B2B website is judged on qualified leads; a B2C storefront on conversion and repeat purchase. We scope stack, features and content for your business model — not one template for everyone.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">DELIVERY APPROACH</h2>
              <ol className="mt-4 space-y-2.5">
                {["Discovery — audience, business model and goals","UX/UI design — structure, content and prototypes","Build — responsive, CMS-enabled, integrated","Launch — SEO, analytics, speed and training","Grow — conversion optimization and support"].map((t,i)=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="h-6 w-6 rounded-lg bg-surface-alt border border-line flex items-center justify-center text-xs font-[700] text-ink-secondary shrink-0">{i+1}</span>{t}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">TECHNOLOGY APPROACH</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Next.js / React","Headless CMS","Node.js APIs","PostgreSQL","Cloud deployment"].map(t=>(
                  <span key={t} className="rounded-full border border-brand-line bg-brand-soft px-3 py-1.5 text-xs font-[600] text-brand">{t}</span>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-muted">Technology is chosen by requirements, scale and maintainability — only technologies we genuinely support are shown.</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-alt p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">RELATED SERVICES</h2>
              <div className="mt-3 space-y-1.5">
                {[["Custom Web Applications","/services/web-app-development"],["Mobile App Development","/services/mobile-app-development"],["AI Software Development","/services/ai-software-development"],["Support & Digital Growth","/services/support-growth"]].map(([label,href])=>(
                  <Link key={href} href={href} className="block text-sm font-[600] text-ink-secondary hover:text-brand transition">{label} →</Link>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">FAQ</h2>
              <div className="mt-4 space-y-4">
                {[["What does a website cost?","It depends on scope — pages, integrations, e-commerce and content. Discovery produces a fixed, itemized proposal; there is no one-size price."],["Can we edit the content ourselves?","Yes — content-driven sites get a CMS so your team publishes pages, catalogs and news without a developer."],["Do you also handle e-commerce?","Yes — B2C and D2C storefronts with catalog, cart, payments and order workflows, scoped to your operations."]].map(([q,a])=>(
                  <div key={q}><div className="text-sm font-[600] text-ink">{q}</div><div className="mt-1 text-sm leading-6 text-ink-secondary">{a}</div></div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-brand p-7 text-white">
              <h3 className="text-sm font-[700]">Planning a new website?</h3>
              <p className="mt-2 text-sm text-white/80">Tell us about your business and audience — we will propose the right structure, features and delivery model.</p>
              <Link href="/contact?type=new-project" className="mt-4 inline-flex rounded-full bg-white text-brand px-5 py-2.5 text-sm font-[700] hover:bg-brand-soft transition">Discuss Your Project →</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

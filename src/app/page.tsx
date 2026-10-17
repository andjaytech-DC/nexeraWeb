import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { solutions, services, industries } from "@/lib/site-data";
import { Hero } from "./sections/Hero";
import { ServicesOverview } from "./sections/ServicesOverview";
import { FinderCta } from "./sections/FinderCta";
import { IndustriesSection } from "./sections/IndustriesSection";
import { CaseStudiesSection } from "./sections/CaseStudiesSection";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { ProcessSection } from "./sections/ProcessSection";
import { EngagementPaths } from "./sections/EngagementPaths";
import { FinalCta } from "./sections/FinalCta";

export const metadata: Metadata = {
  title: "Nexara Global Solutions — Build Better. Operate Smarter. Grow Faster.",
  description:
    "Nexara Global Solutions helps businesses turn complex challenges into intelligent digital products, enterprise platforms, AI-powered software and scalable technology solutions.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nexara Global Solutions — Build Better. Operate Smarter. Grow Faster.",
    description:
      "Nexara Global Solutions helps businesses turn complex challenges into intelligent digital products, enterprise platforms, AI-powered software and scalable technology solutions.",
  },
};

/* ───────────────────────────────────────────────────────────────────────────
   Homepage — light enterprise theme.

   The section rhythm deliberately alternates and varies in layout (split,
   comparison panel, diagram, highlights, compact list) rather than repeating
   the same card grid. All content comes from the existing site-data sources —
   no invented clients, metrics or testimonials.
   ─────────────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        <Hero />
        <ServicesOverview services={services} />
        <FinderCta />
        <IndustriesSection industries={industries} />
        <CaseStudiesSection />
        <CapabilitiesSection />
        <ProcessSection />
        <EngagementPaths solutionCount={solutions.length} />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}

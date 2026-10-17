import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SolutionFinderClient from "./SolutionFinderClient";

export const metadata: Metadata = {
  title: "Business Solution Finder",
  description:
    "Answer a few questions about your industry, business challenges and goals. We map them to the Nexara services and delivery approach that fit — preliminary guidance, no registration required.",
  alternates: { canonical: "/solution-finder" },
};

export default function SolutionFinderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Header />
      <main id="main" className="flex-1">
        {/* Page intro — keeps the H1 above the wizard's step headings. */}
        <div className="border-b border-line bg-surface">
          <div className="mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
            <p className="text-[11px] font-[700] uppercase tracking-[0.16em] text-brand sm:text-xs">
              Solution Finder
            </p>
            <h1 className="mt-3 max-w-[760px] font-[var(--font-display)] text-[30px] font-[800] leading-[1.12] tracking-[-0.03em] text-ink sm:text-[42px]">
              Find the right solution for your business
            </h1>
            <p className="mt-4 max-w-[680px] text-[16px] leading-7 text-ink-secondary sm:text-[17px]">
              Tell us about your business goals and explore technology solutions tailored to your
              needs. Six short steps, no registration, and you can change any answer as you go.
            </p>
          </div>
        </div>

        <SolutionFinderClient />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import TalentCommunityForm from "./TalentCommunityForm";

export const metadata: Metadata = {
  title: "Talent Community — Stay Connected With Nexara | Nexara Global Solutions",
  description: "Join Nexara's talent community — share your skills and interests for future opportunities.",
};

export default function TalentCommunityPage() {
  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] font-[700] text-white/40"><Link href="/careers" className="hover:text-white">CAREERS</Link><span>/</span><span className="text-white/60">TALENT COMMUNITY</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[32px] sm:text-[40px] font-[800] tracking-[-0.03em] text-white">Stay Connected With Nexara</h1>
          <p className="mt-3 max-w-[640px] text-sm leading-6 text-white/50">Tell us about your skills and interests so we can consider your profile for relevant future opportunities. We do not promise every submission will receive a response.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[960px] px-5 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-sm leading-6 text-white/60">
          Joining the talent community does not create a job application. It lets us keep your profile for when a relevant role opens.
        </div>
        <div className="mt-6">
          <TalentCommunityForm />
        </div>
      </section>
      <Footer />
    </div>
  );
}

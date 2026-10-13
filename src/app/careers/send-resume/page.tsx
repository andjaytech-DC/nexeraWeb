import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SendResumeForm from "./SendResumeForm";

export const metadata: Metadata = {
  title: "Send Your Resume — Careers | Nexara Global Solutions",
  description: "Don't see the right opportunity? Share your profile with Nexara and we'll consider it for relevant future opportunities.",
};

export default function SendResumePage() {
  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] font-[700] text-white/40"><Link href="/careers" className="hover:text-white">CAREERS</Link><span>/</span><span className="text-white/60">SEND YOUR RESUME</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[32px] sm:text-[40px] font-[800] tracking-[-0.03em] text-white">Send Your Resume</h1>
          <p className="mt-3 max-w-[640px] text-sm leading-6 text-white/50">Don&apos;t see the right opportunity? Share your profile with Nexara and we&apos;ll consider it for relevant future opportunities.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[960px] px-5 sm:px-6 lg:px-8 py-10">
        <SendResumeForm />
        <p className="mt-4 text-xs text-center text-white/30">By submitting you consent to Nexara using your information for employment consideration. Resumes are stored securely and never at public URLs.</p>
      </section>
      <Footer />
    </div>
  );
}

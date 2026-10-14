import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ContactClient from "./ContactClient";
import { contactInfo } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact — Talk to Our Team | Nexara Global Solutions",
  description: `Start a project or talk to our team. Nexara Global Solutions, 3rd Floor, D23 Building, S3V Business Park, Sector-59, Noida — ${contactInfo.phoneDisplay}`,
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const sp = await searchParams;
  const initialType = sp?.type === "new-project" ? "new-project" : undefined;
  return (
    <div className="bg-[#070A0F] text-[#E6EAF0]">
      <Header />
      <Suspense fallback={<div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-20 text-white/50">Loading…</div>}>
        <ContactClient initialType={initialType} />
      </Suspense>
      <Footer />
    </div>
  );
}

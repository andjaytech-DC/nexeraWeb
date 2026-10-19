import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Android App Development — Services",
  description: "Native Android app development with Kotlin — B2C shopping, booking and delivery apps, B2B field-service and sales apps, Play Store release and ongoing support.",
  alternates: { canonical: "/services/android-app-development" },
  openGraph: { title: "Android App Development — Services", description: "Native Android apps with Kotlin — B2C and B2B apps, Play Store release and ongoing support." },
};

export default function Page() {
  return (
    <div className="bg-canvas text-ink">
      <Header />
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.16em] font-[700] text-ink-muted"><Link href="/services" className="hover:text-brand">SERVICES</Link><span>/</span><span className="text-ink-secondary">Android App Development</span></div>
          <h1 className="mt-3 font-[var(--font-jakarta)] text-[34px] sm:text-[46px] font-[800] tracking-[-0.04em] leading-[0.9] text-ink">Android App Development</h1>
          <p className="mt-4 max-w-[640px] text-sm leading-6 text-ink-secondary">Native Android applications built with Kotlin — for customers, field teams and operations. <span className="text-ink-secondary">Released properly on Google Play, with backend, testing and support handled end to end.</span></p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact?type=new-project" className="rounded-full bg-brand px-6 py-2.5 text-sm font-[700] text-white hover:bg-brand-hover transition">Discuss Your Project →</Link>
            <Link href="/services/mobile-app-development" className="rounded-full border border-line bg-surface-alt px-6 py-2.5 text-sm font-[600] text-ink hover:bg-surface-alt transition">Cross-platform instead?</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1.35fr_0.85fr] gap-8">
          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-brand">BUSINESS PROBLEMS ADDRESSED</h2>
              <ul className="mt-4 space-y-2.5">
                {["Android — often the largest share of the market — is underserved","App crashes and fragmentation across devices and OS versions","Play Store submission, review and updates repeatedly stall","Offline field work is not handled at all"].map(t=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">CAPABILITIES</h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
                {["Native Kotlin development","Material Design conventions","Offline-first architecture and sync","Push notifications and device features","API integration and background sync","Automated and device-lab testing","Play Store release and update ops","Enterprise MDM and security"].map(t=>(
                  <span key={t} className="rounded-xl border border-line bg-surface-alt px-3.5 py-2.5 text-sm text-ink-secondary">{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">TYPICAL USE CASES</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["B2C shopping, booking & delivery apps","B2B field-service & sales apps","Employee & warehouse apps","Marketplace & on-demand apps","Logistics & tracking","Customer-service & loyalty apps"].map(t=>(
                  <span key={t} className="rounded-full border border-line bg-surface-alt px-3.5 py-1.5 text-xs font-[500] text-ink-secondary">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">DELIVERY APPROACH</h2>
              <ol className="mt-4 space-y-2.5">
                {["Define users, jobs-to-be-done and success measures","Design the Android UX and offline model","Build — Kotlin app, APIs and integration","Test across devices, then staged rollout","Release and support — Play ops, analytics, iteration"].map((t,i)=>(
                  <li key={t} className="flex gap-3 text-sm leading-6 text-ink-secondary"><span className="h-6 w-6 rounded-lg bg-surface-alt border border-line flex items-center justify-center text-xs font-[700] text-ink-secondary shrink-0">{i+1}</span>{t}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">TECHNOLOGY APPROACH</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Kotlin","Flutter / React Native (when cross-platform)","Firebase / Node.js backends","REST APIs"].map(t=>(
                  <span key={t} className="rounded-full border border-brand-line bg-brand-soft px-3 py-1.5 text-xs font-[600] text-brand">{t}</span>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-muted">Technology is chosen by requirements, scale and maintainability — only technologies we genuinely support are shown.</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-alt p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">RELATED SERVICES</h2>
              <div className="mt-3 space-y-1.5">
                {[["Mobile App Development (cross-platform)","/services/mobile-app-development"],["iOS Development","/services/ios-development"],["Cloud & Integration (backends)","/services/cloud-integration"],["AI Software Development","/services/ai-software-development"]].map(([label,href])=>(
                  <Link key={href} href={href} className="block text-sm font-[600] text-ink-secondary hover:text-brand transition">{label} →</Link>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-xs tracking-[0.14em] font-[700] text-ink-secondary">FAQ</h2>
              <div className="mt-4 space-y-4">
                {[["Native Android or cross-platform?","Neither is best for every project. Native Kotlin suits deep device integration, performance-sensitive apps and Android-first markets; cross-platform (Flutter / React Native) suits shared feature sets on both stores with one team. We recommend per project — not by default."],["Do you handle the Play Store?","Yes — developer account setup guidance, release builds, store listing, staged rollouts and update management."],["Do you build the backend too?","Yes — APIs, authentication, push and analytics infrastructure, integrated with your existing systems where required."]].map(([q,a])=>(
                  <div key={q}><div className="text-sm font-[600] text-ink">{q}</div><div className="mt-1 text-sm leading-6 text-ink-secondary">{a}</div></div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-brand p-7 text-white">
              <h3 className="text-sm font-[700]">Building an Android app?</h3>
              <p className="mt-2 text-sm text-white/80">Tell us who will use it and what it must do — we will propose the right approach for Android and beyond.</p>
              <Link href="/contact?type=new-project" className="mt-4 inline-flex rounded-full bg-white text-brand px-5 py-2.5 text-sm font-[700] hover:bg-brand-soft transition">Discuss Your Project →</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

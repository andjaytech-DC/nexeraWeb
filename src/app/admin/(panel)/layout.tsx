import Link from "next/link";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import { AdminNav } from "./AdminNav";
import { Logo } from "@/components/Logo";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="border-b border-white/10 bg-[#0F141E] sticky top-0 z-40">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo compact />
            <span className="font-[700] tracking-[-0.02em] text-white/80">ADMIN</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-sm text-white/60 hover:text-white">← Back to site</Link>
            <AdminLogoutButton />
          </div>
        </div>
        <AdminNav />
      </div>
      {children}
    </>
  );
}

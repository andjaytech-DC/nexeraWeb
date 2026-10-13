import Link from "next/link";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="border-b border-white/10 bg-[#0F141E] sticky top-0 z-40">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-lg bg-[#4F7EFF] flex items-center justify-center text-white font-[800] text-xs">N</span>
            <span className="font-[700] tracking-[-0.02em]">NEXARA ADMIN</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-sm text-white/60 hover:text-white">← Back to site</Link>
            <AdminLogoutButton />
          </div>
        </div>
        <nav className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 flex gap-6 text-sm overflow-x-auto">
          <Link href="/admin" className="py-3 border-b-2 border-transparent hover:text-white text-white/60 hover:border-white/20 whitespace-nowrap">Dashboard</Link>
          <Link href="/admin/inquiries" className="py-3 border-b-2 border-transparent hover:text-white text-white/60 hover:border-white/20 whitespace-nowrap">Inquiries</Link>
          <Link href="/admin/careers" className="py-3 border-b-2 border-transparent hover:text-white text-white/60 hover:border-white/20 whitespace-nowrap">Careers</Link>
          <Link href="/admin/careers/jobs" className="py-3 border-b-2 border-transparent hover:text-white text-white/50 hover:border-white/20 whitespace-nowrap">Jobs</Link>
          <Link href="/admin/careers/applications" className="py-3 border-b-2 border-transparent hover:text-white text-white/50 hover:border-white/20 whitespace-nowrap">Applications</Link>
          <Link href="/admin/careers/talent" className="py-3 border-b-2 border-transparent hover:text-white text-white/50 hover:border-white/20 whitespace-nowrap">Talent</Link>
          <Link href="/admin/settings" className="py-3 border-b-2 border-transparent hover:text-white text-white/60 hover:border-white/20 whitespace-nowrap">Settings</Link>
        </nav>
      </div>
      {children}
    </>
  );
}

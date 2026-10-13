import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Nexara Global Solutions",
  description: "Admin area for managing inquiries and careers.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#070A0F] text-white">{children}</div>;
}

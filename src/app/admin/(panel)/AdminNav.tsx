"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/careers", label: "Careers" },
  { href: "/admin/careers/jobs", label: "Jobs" },
  { href: "/admin/careers/applications", label: "Applications" },
  { href: "/admin/careers/talent", label: "Talent" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);
  return (
    <nav className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 flex gap-6 text-sm overflow-x-auto">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`py-3 border-b-2 whitespace-nowrap transition ${
            isActive(l.href)
              ? "text-white border-brand"
              : "text-white/60 border-transparent hover:text-white hover:border-white/20"
          }`}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
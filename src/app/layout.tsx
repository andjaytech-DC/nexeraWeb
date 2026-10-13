import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Nexara Global Solutions — Build Better. Operate Smarter. Grow Faster.",
    template: "%s | Nexara Global Solutions",
  },
  description:
    "Nexara Global Solutions helps businesses turn complex challenges into intelligent digital products, enterprise platforms, AI-powered software and scalable technology solutions. Noida, India.",
  metadataBase: new URL("https://nexara.example.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Nexara Global Solutions",
    title: "Nexara Global Solutions — Technology & Digital Transformation Partner",
    description:
      "We turn complex business challenges into practical digital solutions. Custom software, CRM, ERP, SCM, SaaS, AI, Mobile & Cloud.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#070A0F] text-[#E6EAF0] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

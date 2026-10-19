import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { siteUrl } from "@/lib/site-url";
import { contactInfo } from "@/lib/site-data";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

/* Organization + WebSite structured data. Emitted once from the root layout so
   every page carries org-level schema (ContactPoint carries the monitored
   inbox and the published address — same values the site displays). */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl()}/#organization`,
      name: "Nexara Global Solutions",
      url: siteUrl(),
      logo: { "@type": "ImageObject", url: `${siteUrl()}/images/logo.png` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "3rd Floor, D23 Building, S3V Business Park, Sector-59",
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201301",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-8882033199",
          email: contactInfo.email,
          contactType: "customer support",
          areaServed: "IN",
          availableLanguage: "en",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl()}/#website`,
      url: siteUrl(),
      name: "Nexara Global Solutions",
      inLanguage: "en-IN",
      publisher: { "@id": `${siteUrl()}/#organization` },
    },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Nexara Global Solutions — Software, AI & Digital Systems",
    template: "%s | Nexara Global Solutions",
  },
  description:
    "Nexara Global Solutions turns complex challenges into intelligent digital products, enterprise platforms and AI-powered software — from Noida, India.",
  metadataBase: new URL(siteUrl()),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Nexara Global Solutions",
    title: "Nexara Global Solutions — Technology & Digital Transformation Partner",
    description:
      "We turn complex business challenges into practical digital solutions — websites, web applications, mobile apps, CRM, ERP, SCM, SaaS, AI and Cloud.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <a
          href="#main"
          className="sr-only-focusable absolute left-4 top-4 z-[100] rounded-full bg-brand px-5 py-2.5 text-[14px] font-[700] text-white"
        >
          Skip to main content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}

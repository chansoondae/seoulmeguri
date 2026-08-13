import type { Metadata } from "next";
import { Zen_Maru_Gothic, Zen_Kaku_Gothic_New, Outfit } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_URL, SITE_NAME, SITE_INSTAGRAM } from "@/lib/site";

const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-zen-maru",
  display: "swap",
  preload: false,
});

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen-kaku",
  display: "swap",
  preload: false,
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Seoulmeguri｜ソウル、何曜日に行く？",
    template: "%s - Seoulmeguri",
  },
  description:
    "ソウルの「行ける日」と「行けない日」を、曜日から言い切る日本語ガイド。市庁・貞洞、漢南、江南の1日コースと、日本人のための両替ガイド。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Seoulmeguri｜ソウル、何曜日に行く？",
    description:
      "ソウルの「行ける日」と「行けない日」を、曜日から言い切る日本語ガイド。",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seoulmeguri｜ソウル、何曜日に行く？",
    description:
      "ソウルの「行ける日」と「行けない日」を、曜日から言い切る日本語ガイド。",
  },
  alternates: {
    canonical: "/",
    languages: {
      ja: "/",
      "x-default": "/",
    },
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "ソウルめぐり",
  url: SITE_URL,
  sameAs: [SITE_INSTAGRAM],
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ja",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${zenMaru.variable} ${zenKaku.variable} ${outfit.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:text-accent-ink focus:px-3 focus:py-2 focus:rounded-md"
        >
          本文へスキップ
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </body>
    </html>
  );
}

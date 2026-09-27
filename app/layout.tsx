import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const siteUrl = "https://dawn-7dq.pages.dev";
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "台中黎明扶輪社",
      url: siteUrl,
      logo: `${siteUrl}/media/site/taichung-liming-rotary-logo-web.png`,
      telephone: "+886-4-2322-7799",
      address: {
        "@type": "PostalAddress",
        streetAddress: "公益路二段 61 號 13 樓之 1",
        addressLocality: "南屯區",
        addressRegion: "台中市",
        addressCountry: "TW",
      },
      sameAs: [
        "https://dawnrotaryclub.tw/",
        "https://www.facebook.com/groups/376285655902508/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "黎明公益網 手牽手愛無限",
      inLanguage: "zh-Hant-TW",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Event",
      "@id": `${siteUrl}/#football-event`,
      name: "足球築夢・希望啟航｜雙龍國小公益行動",
      description: "台中黎明扶輪社前往雙龍國小捐贈足球訓練設備、募集生活物資並進行部落公益交流。",
      startDate: "2026-09-10T10:30:00+08:00",
      endDate: "2026-09-10T12:00:00+08:00",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: "南投縣雙龍國民小學", address: { "@type": "PostalAddress", streetAddress: "雙龍村光復巷4號", addressLocality: "信義鄉", addressRegion: "南投縣", addressCountry: "TW" } },
      organizer: { "@id": `${siteUrl}/#organization` },
      image: [`${siteUrl}/media/football-finals/15-finals-panorama.jpg`],
      url: `${siteUrl}/#shuanglong-20260910`,
    },
  ],
};
export const metadata: Metadata = {
  metadataBase: new URL("https://dawn-7dq.pages.dev"),
  title: "黎明公益網｜台中黎明扶輪社・手牽手愛無限公益行動",
  description: "黎明公益網記錄台中黎明扶輪社「手牽手愛無限」公益行動，包含中寮偏鄉關懷、雙龍國小教育支持、十年英語陪伴與社區照護成果。",
  keywords: ["台中黎明扶輪社", "黎明公益網", "手牽手愛無限", "足球築夢", "雙龍國小", "地區獎助金", "公益活動", "偏鄉關懷"],
  verification: { google: "49Kjbm2s-tx5ydR7bdH4jIwrbcSOpsHNOgIr8KmcUOI" },
  alternates: { canonical: "/", languages: { "zh-Hant-TW": "/" } },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "/",
    siteName: "黎明公益網 手牽手愛無限",
    title: "黎明公益網｜台中黎明扶輪社・手牽手愛無限",
    description: "看見中寮偏鄉關懷、雙龍國小教育支持、十年英語陪伴與社區照護的公益成果。",
    images: [{ url: "/media/latest-event/event-poster-latest.jpg", width: 1024, height: 1536, alt: "台中黎明扶輪社手牽手愛無限公益活動海報" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "黎明公益網｜台中黎明扶輪社・手牽手愛無限",
    description: "中寮偏鄉關懷、雙龍國小教育支持、十年英語陪伴與社區照護成果。",
    images: ["/media/latest-event/event-poster-latest.jpg"],
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="zh-Hant-TW"><body className={`${geist.variable} ${mono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}} />{children}</body></html>; }

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
      name: "黎明公益網",
      url: siteUrl,
      description: "獨立第三方公益紀實網站，依據公開資料、活動紀錄與現場素材，整理台中黎明扶輪社參與的公益行動。",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#taichung-dawn-rotary-club`,
      name: "台中黎明扶輪社",
      url: "https://dawnrotaryclub.tw/",
      sameAs: ["https://www.facebook.com/groups/376285655902508/"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "黎明公益網 手牽手愛無限",
      description: "獨立第三方公益紀實網站，客觀、忠實整理台中黎明扶輪社參與的公益行動。",
      inLanguage: "zh-Hant-TW",
      publisher: { "@id": `${siteUrl}/#organization` },
      about: { "@id": `${siteUrl}/#taichung-dawn-rotary-club` },
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
      organizer: { "@id": `${siteUrl}/#taichung-dawn-rotary-club` },
      image: [`${siteUrl}/media/football-finals/15-finals-panorama.jpg`],
      url: `${siteUrl}/#shuanglong-20260910`,
    },
  ],
};
export const metadata: Metadata = {
  metadataBase: new URL("https://dawn-7dq.pages.dev"),
  title: "黎明公益網｜公益行動・成果紀錄・媒體報導",
  description: "黎明公益網記錄台中黎明扶輪社「手牽手愛無限」公益行動，包含中寮偏鄉關懷、雙龍國小教育支持、十年英語陪伴與社區照護成果。",
  keywords: ["台中黎明扶輪社", "黎明公益網", "手牽手愛無限", "足球築夢", "雙龍國小", "地區獎助金", "公益活動", "偏鄉關懷"],
  verification: { google: "49Kjbm2s-tx5ydR7bdH4jIwrbcSOpsHNOgIr8KmcUOI" },
  alternates: { canonical: "/", languages: { "zh-Hant-TW": "/" } },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "/",
    siteName: "黎明公益網 手牽手愛無限",
    title: "黎明公益網｜公益行動・成果紀錄・媒體報導",
    description: "閱讀各大媒體報導，回顧教育陪伴、偏鄉關懷與社區服務，讓每一份善意被看見。",
    images: [{ url: "/media/site/dawn-homepage-share-20260930.png", width: 1440, height: 1000, alt: "黎明公益網首頁｜公益行動、活動成果與新聞媒體報導" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "黎明公益網｜公益行動・成果紀錄・媒體報導",
    description: "中寮偏鄉關懷、雙龍國小教育支持、十年英語陪伴與社區照護成果。",
    images: ["/media/site/dawn-homepage-share-20260930.png"],
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="zh-Hant-TW"><body className={`${geist.variable} ${mono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}} />{children}</body></html>; }

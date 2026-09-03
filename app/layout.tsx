import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const siteUrl = "https://liming-hand-in-hand.alanyang42.chatgpt.site";
const eventStructuredData = { "@context":"https://schema.org", "@type":"Event", "@id":`${siteUrl}/#football-event`, name:"足球築夢・希望啟航｜雙龍國小公益行動", description:"台中黎明扶輪社前往雙龍國小捐贈足球訓練設備、募集生活物資並進行部落公益交流。", startDate:"2026-09-10T10:30:00+08:00", endDate:"2026-09-10T12:00:00+08:00", eventStatus:"https://schema.org/EventScheduled", eventAttendanceMode:"https://schema.org/OfflineEventAttendanceMode", location:{"@type":"Place",name:"南投縣雙龍國民小學",address:{"@type":"PostalAddress",streetAddress:"雙龍村光復巷4號",addressLocality:"信義鄉",addressRegion:"南投縣",addressCountry:"TW"}}, organizer:{"@type":"Organization",name:"台中黎明扶輪社"}, image:[`${siteUrl}/media/football-finals/15-finals-panorama.jpg`], url:siteUrl };
export const metadata: Metadata = {
  metadataBase: new URL("https://liming-hand-in-hand.alanyang42.chatgpt.site"),
  title: "黎明公益網 手牽手愛無限｜台中黎明扶輪社",
  description: "台中黎明扶輪社投入偏鄉教育與社區關懷。2026 年 9 月 10 日前往雙龍國小舉辦足球設備捐贈、生活物資募集與部落公益交流。",
  keywords: ["台中黎明扶輪社", "黎明公益網", "手牽手愛無限", "足球築夢", "雙龍國小", "地區獎助金", "公益活動", "偏鄉關懷"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "/",
    siteName: "黎明公益網 手牽手愛無限",
    title: "足球築夢・希望啟航｜台中黎明扶輪社",
    description: "9 月 10 日前往雙龍國小，捐贈足球訓練設備並募集生活物資，把支持與希望送進偏鄉。",
    images: [{ url: "/media/football-finals/15-finals-panorama.jpg", width: 2048, height: 1152, alt: "南投雙龍國小女足全國賽事公益紀錄" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "足球築夢・希望啟航｜台中黎明扶輪社",
    description: "9 月 10 日雙龍國小足球設備捐贈與偏鄉生活物資募集。",
    images: ["/media/football-finals/15-finals-panorama.jpg"],
  },
  robots: { index: true, follow: true },
  other: { "codex-preview": "development" },
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="zh-Hant"><body className={`${geist.variable} ${mono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(eventStructuredData)}} />{children}</body></html>; }

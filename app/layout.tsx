import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL("https://liming-hand-in-hand.alanyang42.chatgpt.site"),
  title: "黎明手牽手 愛無限｜台中黎明扶輪社公益網站",
  description: "台中黎明扶輪社串聯社友與在地夥伴，投入偏鄉教育、生活照護與社區關懷，讓每一份善意真正抵達需要的地方。",
  keywords: ["台中黎明扶輪社", "黎明手牽手", "公益活動", "偏鄉關懷", "雙龍國小足球隊", "慢飛天使"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "/",
    siteName: "黎明手牽手 愛無限",
    title: "黎明手牽手 愛無限｜讓善意成為改變",
    description: "從生活照護、偏鄉教育到社區關懷，一起看見台中黎明扶輪社的公益行動與孩子們勇敢追夢的故事。",
    images: [{ url: "/media/football-finals/15-finals-panorama.jpg", width: 2048, height: 1152, alt: "南投雙龍國小女足全國賽事公益紀錄" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "黎明手牽手 愛無限｜讓善意成為改變",
    description: "生活照護、偏鄉教育與社區關懷的公益行動紀錄。",
    images: ["/media/football-finals/15-finals-panorama.jpg"],
  },
  robots: { index: true, follow: true },
  other: { "codex-preview": "development" },
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="zh-Hant"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>; }

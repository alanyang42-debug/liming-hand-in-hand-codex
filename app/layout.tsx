import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
export const metadata: Metadata = { title: "黎明手牽手 愛無限｜台中黎明扶輪社公益網站", description: "台中黎明扶輪社公益行動、活動照片、成果統計、合作夥伴與聯絡資訊。", other: { "codex-preview": "development" } };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="zh-Hant"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>; }

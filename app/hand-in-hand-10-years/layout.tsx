import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "手牽手英語教學十年有成｜黎明公益網・台中黎明扶輪社",
  description: "台中黎明扶輪社在太平國小推動手牽手英語教育，持續陪伴弱勢學童十年。閱讀黎明公益網的教育支持成果與活動影像紀錄。",
  alternates: { canonical: "/hand-in-hand-10-years/" },
  openGraph: {
    type: "article",
    locale: "zh_TW",
    url: "/hand-in-hand-10-years/",
    title: "手牽手英語教學十年有成｜黎明公益網",
    description: "從一堂英語課走成十年的教育承諾，記錄台中黎明扶輪社與教育夥伴長期陪伴孩子的成果。",
    images: [{ url: "/media/hand-in-hand-10-years/01.jpg", width: 1400, height: 930, alt: "台中黎明扶輪社手牽手英語教學十年有成紀錄" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "手牽手英語教學十年有成｜黎明公益網",
    description: "台中黎明扶輪社與教育夥伴長期陪伴弱勢學童的十年成果紀錄。",
    images: ["/media/hand-in-hand-10-years/01.jpg"],
  },
};

export default function DecadeLayout({children}:{children:React.ReactNode}) {return children;}

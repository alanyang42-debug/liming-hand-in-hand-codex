import type { Metadata } from "next";
import TenYearsPage from "../../hand-in-hand-10-years/decade-page";

export const metadata: Metadata = {
  title: "Ten Years of Hand in Hand English Learning | Dawn Charity Network",
  description:
    "A ten-year education partnership supporting children at Taiping Elementary through English learning, steady companionship and community participation.",
  keywords: [
    "Hand in Hand English learning",
    "Taiping Elementary School",
    "Dawn Charity Network",
    "Rotary Club of Taichung Dawn",
  ],
  alternates: {
    canonical: "/en/hand-in-hand-10-years/",
    languages: {
      "zh-Hant": "/hand-in-hand-10-years/",
      en: "/en/hand-in-hand-10-years/",
      "x-default": "/hand-in-hand-10-years/",
    },
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "/en/hand-in-hand-10-years/",
    title: "Ten Years of Hand in Hand English Learning | Dawn Charity Network",
    description:
      "Ten years of English learning, encouragement and partnership at Taiping Elementary School.",
    images: [
      {
        url: "/media/hand-in-hand-10-years/01.jpg",
        width: 1400,
        height: 930,
        alt: "Ten years of Hand in Hand English learning at Taiping Elementary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ten Years of Hand in Hand English Learning | Dawn Charity Network",
    description: "A decade of English learning and companionship at Taiping Elementary School.",
    images: ["/media/hand-in-hand-10-years/01.jpg"],
  },
};

export default function EnglishTenYearsPage() {
  return <TenYearsPage initialLang="en" />;
}

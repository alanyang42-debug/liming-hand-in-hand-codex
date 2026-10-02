import type { Metadata } from "next";
import HomePage from "../home-page";

export const metadata: Metadata = {
  title: "Dawn Charity Network | Community Action, Impact & Media Coverage",
  description:
    "Dawn Charity Network documents the Rotary Club of Taichung Dawn’s rural outreach, education support, long-term English learning and community care.",
  keywords: [
    "Dawn Charity Network",
    "Rotary Club of Taichung Dawn",
    "rural outreach Taiwan",
    "education support",
    "community care",
  ],
  alternates: {
    canonical: "/en/",
    languages: { "zh-Hant": "/", en: "/en/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en/",
    siteName: "Dawn Charity Network",
    title: "Dawn Charity Network | Community Action, Impact & Media Coverage",
    description:
      "Stories of rural outreach, education support and community care led by the Rotary Club of Taichung Dawn and its partners.",
    images: [
      {
        url: "/media/site/dawn-homepage-share-20260930.png",
        width: 1440,
        height: 1000,
        alt: "Dawn Charity Network homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawn Charity Network | Community Action & Impact",
    description:
      "Rural outreach, education support, long-term English learning and community care.",
    images: ["/media/site/dawn-homepage-share-20260930.png"],
  },
};

export default function EnglishHomePage() {
  return <HomePage initialLang="en" />;
}

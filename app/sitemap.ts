import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-02");
  return [
    {
      url: "https://dawn-7dq.pages.dev/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { "zh-Hant": "https://dawn-7dq.pages.dev/", en: "https://dawn-7dq.pages.dev/en/" } },
    },
    {
      url: "https://dawn-7dq.pages.dev/en/",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { "zh-Hant": "https://dawn-7dq.pages.dev/", en: "https://dawn-7dq.pages.dev/en/" } },
    },
    {
      url: "https://dawn-7dq.pages.dev/hand-in-hand-10-years/",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { "zh-Hant": "https://dawn-7dq.pages.dev/hand-in-hand-10-years/", en: "https://dawn-7dq.pages.dev/en/hand-in-hand-10-years/" } },
    },
    {
      url: "https://dawn-7dq.pages.dev/en/hand-in-hand-10-years/",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { "zh-Hant": "https://dawn-7dq.pages.dev/hand-in-hand-10-years/", en: "https://dawn-7dq.pages.dev/en/hand-in-hand-10-years/" } },
    },
  ];
}

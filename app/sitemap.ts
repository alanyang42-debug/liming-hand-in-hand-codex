import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-27");
  return [
    { url: "https://dawn-7dq.pages.dev/", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://dawn-7dq.pages.dev/hand-in-hand-10-years/", lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}

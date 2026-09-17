import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: "https://dawn-7dq.pages.dev",
    lastModified: new Date("2026-09-03"),
    changeFrequency: "weekly",
    priority: 1,
  }];
}

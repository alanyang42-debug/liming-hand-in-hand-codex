import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: "https://liming-hand-in-hand.alanyang42.chatgpt.site",
    lastModified: new Date("2026-09-03"),
    changeFrequency: "weekly",
    priority: 1,
  }];
}

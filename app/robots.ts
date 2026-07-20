import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://liming-hand-in-hand.alanyang42.chatgpt.site/sitemap.xml",
  };
}

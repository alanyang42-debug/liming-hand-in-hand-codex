/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/sitemap.xml" || url.pathname === "/sitemap.xml/") {
      const entries = [
        {
          loc: "https://dawn-7dq.pages.dev/",
          zh: "https://dawn-7dq.pages.dev/",
          en: "https://dawn-7dq.pages.dev/en/",
          frequency: "weekly",
          priority: "1.0",
        },
        {
          loc: "https://dawn-7dq.pages.dev/en/",
          zh: "https://dawn-7dq.pages.dev/",
          en: "https://dawn-7dq.pages.dev/en/",
          frequency: "weekly",
          priority: "0.9",
        },
        {
          loc: "https://dawn-7dq.pages.dev/hand-in-hand-10-years/",
          zh: "https://dawn-7dq.pages.dev/hand-in-hand-10-years/",
          en: "https://dawn-7dq.pages.dev/en/hand-in-hand-10-years/",
          frequency: "monthly",
          priority: "0.8",
        },
        {
          loc: "https://dawn-7dq.pages.dev/en/hand-in-hand-10-years/",
          zh: "https://dawn-7dq.pages.dev/hand-in-hand-10-years/",
          en: "https://dawn-7dq.pages.dev/en/hand-in-hand-10-years/",
          frequency: "monthly",
          priority: "0.7",
        },
      ];
      const urls = entries.map((entry) => `  <url>
    <loc>${entry.loc}</loc>
    <xhtml:link rel="alternate" hreflang="zh-Hant" href="${entry.zh}" />
    <xhtml:link rel="alternate" hreflang="en" href="${entry.en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${entry.zh}" />
    <lastmod>2026-10-02</lastmod>
    <changefreq>${entry.frequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join("\n");
      return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>\n`, {
        headers: { "content-type": "application/xml; charset=UTF-8", "cache-control": "public, max-age=3600" },
      });
    }

    if (url.pathname === "/robots.txt" || url.pathname === "/robots.txt/") {
      return new Response("User-agent: *\nAllow: /\nSitemap: https://dawn-7dq.pages.dev/sitemap.xml\n", {
        headers: { "content-type": "text/plain; charset=UTF-8", "cache-control": "public, max-age=3600" },
      });
    }

    if (url.searchParams.get("lang") === "en") {
      const englishPath = url.pathname === "/" || url.pathname === ""
        ? "/en/"
        : url.pathname === "/hand-in-hand-10-years" || url.pathname === "/hand-in-hand-10-years/"
          ? "/en/hand-in-hand-10-years/"
          : null;
      if (englishPath) {
        url.pathname = englishPath;
        url.searchParams.delete("lang");
        return Response.redirect(url.toString(), 308);
      }
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-dawn-language", url.pathname === "/en" || url.pathname.startsWith("/en/") ? "en" : "zh-Hant-TW");
    return handler.fetch(new Request(request, { headers: requestHeaders }), env, ctx);
  },
};

export default worker;

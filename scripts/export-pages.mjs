import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist", "client");
const workerModule = pathToFileURL(resolve(root, "dist", "server", "index.js"));
workerModule.searchParams.set("export", Date.now().toString());
const { default: app } = await import(workerModule.href);

const env = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
};
const ctx = { waitUntil() {}, passThroughOnException() {} };

const pages = [
  ["/", "index.html"],
  ["/en/", "en/index.html"],
  ["/hand-in-hand-10-years/", "hand-in-hand-10-years/index.html"],
  ["/en/hand-in-hand-10-years/", "en/hand-in-hand-10-years/index.html"],
  ["/sitemap.xml", "sitemap.xml"],
  ["/robots.txt", "robots.txt"],
];

for (const [pathname, filename] of pages) {
  const response = await app.fetch(new Request(`https://dawn-7dq.pages.dev${pathname}`), env, ctx);
  if (!response.ok) throw new Error(`Export failed for ${pathname}: ${response.status}`);
  const destination = resolve(output, filename);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, await response.text(), "utf8");
}

const pagesWorker = `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const legacyEnglish = url.searchParams.get("lang") === "en";
    if (legacyEnglish && (url.pathname === "/" || url.pathname === "/hand-in-hand-10-years" || url.pathname === "/hand-in-hand-10-years/")) {
      url.pathname = url.pathname === "/" ? "/en/" : "/en/hand-in-hand-10-years/";
      url.searchParams.delete("lang");
      return Response.redirect(url.toString(), 308);
    }
    const canonicalPaths = {
      "/en": "/en/",
      "/hand-in-hand-10-years": "/hand-in-hand-10-years/",
      "/en/hand-in-hand-10-years": "/en/hand-in-hand-10-years/",
    };
    if (canonicalPaths[url.pathname]) {
      url.pathname = canonicalPaths[url.pathname];
      return Response.redirect(url.toString(), 308);
    }
    return env.ASSETS.fetch(request);
  },
};
`;
await writeFile(resolve(output, "_worker.js"), pagesWorker, "utf8");

console.log(`Exported ${pages.length} public routes and the Pages redirect worker.`);

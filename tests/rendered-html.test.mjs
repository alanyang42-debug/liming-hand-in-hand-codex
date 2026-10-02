import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};
const ctx = {
  waitUntil() {},
  passThroughOnException() {},
};

async function request(path) {
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    env,
    ctx,
  );
}

test("renders the homepage as HTML", async () => {
  const response = await request("/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), /<title>黎明公益網｜公益行動・成果紀錄・媒體報導<\/title>/);
});

test("serves one localized title and complete language metadata", async () => {
  const cases = [
    {
      path: "/",
      lang: "zh-Hant-TW",
      canonical: "https://dawn-7dq.pages.dev/",
      description: "黎明公益網記錄台中黎明扶輪社",
    },
    {
      path: "/en/",
      lang: "en",
      canonical: "https://dawn-7dq.pages.dev/en/",
      description: "Dawn Charity Network documents the Rotary Club of Taichung Dawn",
    },
    {
      path: "/hand-in-hand-10-years/",
      lang: "zh-Hant-TW",
      canonical: "https://dawn-7dq.pages.dev/hand-in-hand-10-years/",
      description: "台中黎明扶輪社在太平國小推動手牽手英語教育",
    },
    {
      path: "/en/hand-in-hand-10-years/",
      lang: "en",
      canonical: "https://dawn-7dq.pages.dev/en/hand-in-hand-10-years/",
      description: "A ten-year education partnership supporting children at Taiping Elementary",
    },
  ];

  for (const item of cases) {
    const response = await request(item.path);
    assert.equal(response.status, 200, item.path);
    const html = await response.text();
    assert.equal((html.match(/<title(?:\s[^>]*)?>/gi) ?? []).length, 1, `${item.path} title count`);
    assert.match(html, new RegExp(`<html[^>]+lang=["']${item.lang}["']`, "i"));
    assert.ok(html.includes(item.description), `${item.path} description`);
    assert.ok(html.includes(`rel="canonical" href="${item.canonical}"`), `${item.path} canonical`);
    assert.match(html, /hrefLang="zh-Hant"/i, `${item.path} zh hreflang`);
    assert.match(html, /hrefLang="en"/i, `${item.path} en hreflang`);
  }
});

test("redirects legacy English query URLs to canonical English paths", async () => {
  const home = await request("/?lang=en");
  assert.equal(home.status, 308);
  assert.equal(home.headers.get("location"), "http://localhost/en/");

  const decade = await request("/hand-in-hand-10-years/?lang=en");
  assert.equal(decade.status, 308);
  assert.equal(decade.headers.get("location"), "http://localhost/en/hand-in-hand-10-years/");
});

test("sitemap lists only live Chinese and English canonical pages", async () => {
  let response = await request("/sitemap.xml");
  if (response.status >= 300 && response.status < 400) {
    response = await request(new URL(response.headers.get("location"), "http://localhost").pathname);
  }
  assert.equal(response.status, 200);
  const xml = await response.text();
  for (const url of [
    "https://dawn-7dq.pages.dev/",
    "https://dawn-7dq.pages.dev/en/",
    "https://dawn-7dq.pages.dev/hand-in-hand-10-years/",
    "https://dawn-7dq.pages.dev/en/hand-in-hand-10-years/",
  ]) {
    assert.ok(xml.includes(`<loc>${url}</loc>`), url);
  }
});

test("Cloudflare Pages export contains every public HTML route", async () => {
  for (const [file, canonical] of [
    ["../dist/client/index.html", "https://dawn-7dq.pages.dev/"],
    ["../dist/client/en/index.html", "https://dawn-7dq.pages.dev/en/"],
    ["../dist/client/hand-in-hand-10-years/index.html", "https://dawn-7dq.pages.dev/hand-in-hand-10-years/"],
    ["../dist/client/en/hand-in-hand-10-years/index.html", "https://dawn-7dq.pages.dev/en/hand-in-hand-10-years/"],
  ]) {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    assert.equal((html.match(/<title(?:\s[^>]*)?>/gi) ?? []).length, 1, file);
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`), file);
  }
  const pagesWorker = await readFile(new URL("../dist/client/_worker.js", import.meta.url), "utf8");
  assert.match(pagesWorker, /Response\.redirect\(url\.toString\(\), 308\)/);
});

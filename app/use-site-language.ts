"use client";
import { useEffect, useState } from "react";
import { languageOptions, translate, type Lang } from "./i18n";
const storageKey = "liming-site-language";
export function useSiteLanguage(initialLang: Lang = "zh") {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const readLanguage = () => {
      const requested = new URLSearchParams(window.location.search).get("lang");
      let saved: string | null = null;
      try { saved = window.localStorage.getItem(storageKey); } catch { /* Language links also work without browser storage. */ }
      const pathLanguage = window.location.pathname === "/en" || window.location.pathname.startsWith("/en/") ? "en" : null;
      const selected = pathLanguage ?? requested ?? saved ?? initialLang;
      setLangState(languageOptions.some(option => option.code === selected) ? selected as Lang : initialLang);
      setReady(true);
    };
    readLanguage();
    window.addEventListener("popstate", readLanguage);
    return () => window.removeEventListener("popstate", readLanguage);
  }, [initialLang]);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = languageOptions.find(option => option.code === lang)?.htmlLang ?? "zh-Hant";
    try { window.localStorage.setItem(storageKey, lang); } catch { /* Storage is optional. */ }
    const url = new URL(window.location.href);
    if (lang === "en" && (url.pathname === "/en" || url.pathname.startsWith("/en/"))) {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", lang);
    }
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }, [lang, ready]);
  useEffect(() => {
    if (!ready) return;
    const title = (window.location.pathname.includes("hand-in-hand-10-years") ? translate(lang, "十年有成") + " | " : "") + translate(lang, "黎明公益網") + " | " + translate(lang, "台中黎明扶輪社");
    const updateTitle = () => { if (document.title !== title) document.title = title; };
    updateTitle();
  }, [lang, ready]);
  const setLang = (nextLang: Lang) => {
    if (typeof window === "undefined") return;
    const currentPath = window.location.pathname;
    const basePath = currentPath === "/en" || currentPath === "/en/"
      ? "/"
      : currentPath.startsWith("/en/")
        ? currentPath.slice(3) || "/"
        : currentPath;
    const targetPath = nextLang === "en"
      ? basePath === "/" ? "/en/" : `/en${basePath.endsWith("/") ? basePath : `${basePath}/`}`
      : basePath;
    const url = new URL(targetPath, window.location.origin);
    if (nextLang !== "zh") url.searchParams.set("lang", nextLang);
    url.hash = window.location.hash;
    window.location.assign(`${url.pathname}${url.search}${url.hash}`);
  };
  const localizedPath = (path: string) => {
    if (lang === "en") return path === "/" ? "/en/" : `/en${path.endsWith("/") ? path : `${path}/`}`;
    return lang === "zh" ? path : `${path}?lang=${lang}`;
  };
  return { lang, setLang, t: (value: string) => translate(lang, value), localizedPath };
}

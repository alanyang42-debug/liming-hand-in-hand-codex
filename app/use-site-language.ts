"use client";
import { useEffect, useState } from "react";
import { languageOptions, translate, type Lang } from "./i18n";
const storageKey = "liming-site-language";
export function useSiteLanguage() {
  const [lang, setLang] = useState<Lang>("zh");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const readLanguage = () => {
      const requested = new URLSearchParams(window.location.search).get("lang");
      let saved: string | null = null;
      try { saved = window.localStorage.getItem(storageKey); } catch { /* Language links also work without browser storage. */ }
      const selected = requested ?? saved;
      setLang(languageOptions.some(option => option.code === selected) ? selected as Lang : "zh");
      setReady(true);
    };
    readLanguage();
    window.addEventListener("popstate", readLanguage);
    return () => window.removeEventListener("popstate", readLanguage);
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = languageOptions.find(option => option.code === lang)?.htmlLang ?? "zh-Hant";
    try { window.localStorage.setItem(storageKey, lang); } catch { /* Storage is optional. */ }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }, [lang, ready]);
  useEffect(() => {
    if (!ready) return;
    const title = (window.location.pathname.includes("hand-in-hand-10-years") ? translate(lang, "十年有成") + " | " : "") + translate(lang, "黎明公益網") + " | " + translate(lang, "台中黎明扶輪社");
    const updateTitle = () => { if (document.title !== title) document.title = title; };
    updateTitle();
    // Static-export metadata may finish streaming after language hydration.
    const observer = new MutationObserver(updateTitle);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [lang, ready]);
  return { lang, setLang, t: (value: string) => translate(lang, value), localizedPath: (path: string) => `${path}?lang=${lang}` };
}

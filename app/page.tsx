"use client";

import Image from "next/image";
import OutreachVisit from "./components/OutreachVisit";
import ShuanglongRecord from "./components/ShuanglongRecord";
import PreparationRecord from "./components/PreparationRecord";
import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { languageOptions, translate, type Lang } from "./i18n";

// 日後更新網站，只要修改這份集中資料即可。
const content = {
  name: "黎明公益網 手牽手愛無限",
  fullName: "台中黎明扶輪社",
  slogan: "手牽手，愛無限；因為有您，我們可以讓世界更美好。",
  intro: "串聯社友、眷屬與在地夥伴，從生活照護、教育支持到社區關懷，讓每一份善意真正抵達需要的地方。",
  stats: [
    [5, "項", "年度重點行動"],
    [7, "所", "合作學校"],
    [1, "隊", "支持偏鄉球隊"],
    [365, "天", "讓善意持續發生"],
  ] as const,
  timeline: [
    ["01", "生活照護", "改善照護環境", "攜手公益夥伴汰換社區家園老舊設備，讓陪伴落實在更安心、舒適的日常。"],
    ["02", "偏鄉關懷", "把資源送到需要的地方", "串聯社友、眷屬與在地力量，讓關懷不只是一次活動，而是一段持續同行的關係。"],
    ["03", "教育支持", "陪孩子勇敢追夢", "支持南投雙龍國小女足走上全國賽場，把每一份鼓勵化成孩子繼續奔跑的力量。"],
    ["04", "地區獎助金捐贈", "足球築夢・希望啟航", "2026 年 9 月 10 日前往雙龍國小，捐贈足球訓練設備、教學資源與生活物資，陪孩子在偏鄉勇敢追夢。"],
    ["05", "最新活動", "偏鄉中秋公益音樂節", "2026 年 9 月 19 日相聚中寮國小，讓音樂、公益服務、在地市集與中秋團圓在偏鄉相遇。"],
    ["∞", "未來進行式", "下一個故事，期待有您", "捐助、志工、物資或專業服務，每一種參與都能讓善意繼續向前。"],
  ] as const,
  featuredCampaign: {
    poster: "/media/football-donation/football-dream-donation-2026.jpg",
    posterAlt: "足球築夢・希望啟航地區獎助金捐贈活動海報",
    video: "/media/football-donation/shuanglong-school-promo-starless.mp4",
    socialVideo: "/media/football-donation/shuanglong-social-story-starless.mp4",
    registrationUrl: "https://reurl.cc/vG6ZZl",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=%E5%8D%97%E6%8A%95%E7%B8%A3%E4%BF%A1%E7%BE%A9%E9%84%89%E9%9B%99%E9%BE%8D%E6%9D%91%E5%85%89%E5%BE%A9%E5%B7%B74%E8%99%9F",
    eyebrow: "FEATURED EVENT · 地區獎助金捐贈",
    title: "足球築夢・希望啟航",
    subtitle: "把設備與愛心送進雙龍偏鄉部落",
    date: "115 年 9 月 10 日（四）",
    time: "10:30－12:00",
    place: "南投縣信義鄉・雙龍國小",
    address: "南投縣信義鄉雙龍村光復巷 4 號",
    text: "本計畫協助南投縣信義鄉雙龍國小足球隊發展，透過捐贈足球訓練設備、教學資源及相關物資，改善偏鄉學童的運動學習環境。",
    activities: [
      "足球訓練器材設備捐贈儀式",
      "生活物資募集・送愛到偏鄉",
      "雙龍部落風味午餐",
      "雙龍七彩吊橋・雙龍瀑布踏青",
    ],
    collection: "邀請社友將家中用不到的衣物、鞋、帽、包、袋及各項生活用品整理募集，活動當天一起送到雙龍偏鄉部落。感謝大家的愛心！",
    invitation: "社長 周哲民 Joe・秘書 吳錦河 Health 敬邀",
  },
  latestEvent: {
    url: "https://hand-in-hand.pages.dev/",
    posters: [
      {
        src: "/media/latest-event/stage-one-poster.webp",
        label: "第一階段",
        alt: "第一階段公益嘉年華活動海報",
        width: 768,
        height: 1152,
      },
      {
        src: "/media/latest-event/stage-two-poster.webp",
        label: "第二階段",
        alt: "第二階段中秋公益晚會活動海報",
        width: 768,
        height: 1152,
      },
    ],
    eyebrow: "LATEST EVENT · 2026 最新活動",
    title: "手牽手・愛無限",
    subtitle: "偏鄉弱勢關懷公益中秋活動",
    date: "2026 年 9 月 19 日（六）",
    time: "15:00－20:30",
    place: "南投・中寮國小",
    text: "從午後公益嘉年華到中秋公益晚會，現場安排音樂、義剪、農產品展售、魔術、歌手演唱、公益捐贈與賓果活動，邀請大家相聚中寮，把希望與溫暖送進偏鄉。",
    highlights: ["月光音樂饗宴", "公益義剪", "農產品展售・幸福市集", "弱勢家庭關懷"],
    schedule: [
      {
        phase: "下午場流程",
        hours: "15:00－17:30",
        items: [
          ["15:00－15:30", "市集表演團體報到"],
          ["15:30－16:00", "音樂饗宴"],
          ["15:30－17:30", "義剪／農產品展售／市集"],
          ["16:00－16:15", "貴賓致詞／大合影"],
          ["16:15－16:40", "魔術師趣味互動"],
          ["16:40－17:00", "歌手藝人演唱"],
          ["17:00－17:10", "中寮國小非洲鼓／舞蹈表演"],
          ["17:10－17:30", "玫瑰啟能訓練中心「慢兔兔」表演"],
        ],
      },
      {
        phase: "晚會流程",
        hours: "17:30－20:30",
        items: [
          ["17:30－17:50", "輕盈樂團薩克斯風演奏"],
          ["17:50－18:00", "慢兔兔啦啦隊演出"],
          ["18:00－18:15", "主辦單位／貴賓致詞"],
          ["18:15－18:20", "愛心捐贈儀式"],
          ["18:20－19:00", "音樂饗宴"],
          ["19:00－19:20", "超級魔術秀"],
          ["19:20－19:40", "獎落誰家"],
          ["19:40－20:00", "藝人小璇演唱"],
          ["20:00－20:10", "賓果大挑戰"],
          ["20:10－20:30", "卡拉 OK・中秋佳節快樂，明年再見"],
        ],
      },
    ],
  },
  stories: [
    {
      eyebrow: "A BETTER EVERYDAY · 生活照護",
      title: "一台新設備，換來更安心的每一天。",
      text: "公益不只在遠方，也藏在生活最細微的需要裡。透過設備汰舊換新，我們和照護夥伴一起改善日常環境，讓被照顧的人更舒適，也讓第一線工作者多一份安心。",
      image: "/media/community-care/01-equipment-renewal-presentation.jpg",
      alt: "社區家園設備汰舊換新活動紀錄",
    },
    {
      eyebrow: "RUN FOR THE DREAM · 教育支持",
      title: "孩子向前奔跑，我們在身後守候。",
      text: "烈日下的每一步都不容易。孩子們用勇氣、默契與不放棄完成全國賽事，而社友與夥伴的陪伴，讓她們知道：追夢的路上，從來不是一個人。",
      image: "/media/football-finals/17-warm-support.jpg",
      alt: "陪伴南投雙龍國小女足追夢",
    },
    {
      eyebrow: "SHARE THE JOY · 成果時刻",
      title: "全國第七名，是努力被看見的笑容。",
      text: "名次是一份肯定，更珍貴的是孩子在球場上長出的自信與團隊精神。每一張合照、每一次擊掌，都記錄了善意如何變成真實的改變。",
      image: "/media/football-finals/14-seventh-place.jpg",
      alt: "南投雙龍國小女足全國第七名成果合影",
    },
  ] as const,
  actions: [
    { tag: "生活照護", title: "社區家園設備汰舊換新", text: "攜手中華存善慢飛天使關懷協會，協助彰化慈愛教養院改善老舊空調設備，讓照護空間更舒適安心。", result: "改善日常照護環境", image: "/media/community-care/01-equipment-renewal-presentation.jpg", imageSecondary: "/media/community-care/02-equipment-renewal-group.jpg" },
    { tag: "教育支持", title: "陪伴偏鄉孩子勇敢追夢", text: "支持南投雙龍國小足球隊參與全國賽事，讓孩子在球場上累積自信、團隊精神與更大的夢想。", result: "國小女生高年級組全國第七名", image: "/media/football-finals/14-seventh-place.jpg" },
    { tag: "社區串聯", title: "手牽手・愛無限", text: "集結扶輪社友、夫人與在地夥伴的專業與資源，讓單次捐助延伸為彼此陪伴、長期共好的公益行動。", result: "串聯跨界公益力量", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1400&q=85" },
  ],
  event: {
    title: "114學年度小學生足球賽全國決賽",
    subtitle: "南投雙龍國小女足｜國小女生高年級組",
    result: "全國第七名",
    text: "從烈日下的每一次奔跑，到場邊的一句加油，孩子們用勇氣、默契與不放棄的精神完成全國賽事。「黎明公益網・手牽手愛無限」陪伴孩子走進更大的球場，也把每一份支持化成繼續前進的力量。",
    video: "/media/football-finals/highlight.mp4",
    poster: "/media/football-finals/15-finals-panorama.jpg",
    shortVideo: "/media/football-finals/2026-shuanglong-football-finals.mp4",
    shortPoster: "/media/football-finals/2026-shuanglong-football-finals-poster.jpg",
    instagramUrl: "https://www.instagram.com/reel/DaQIcd1kmLZ/",
    instagramEmbed: "https://www.instagram.com/reel/DaQIcd1kmLZ/embed/captioned/",
    threadsUrl: "https://www.threads.com/@alanyang42/post/DaQIuAIDYvs",
  },
  gallery: [
    ["賽事氛圍", "盛夏球場・夢想開踢", "/media/football-finals/01-opening-field.jpg"],
    ["場上精彩", "烈日下・全力以赴", "/media/football-finals/02-match-day.jpg"],
    ["團隊時刻", "場邊整備・一起守候", "/media/football-finals/03-sideline-support.jpg"],
    ["賽事氛圍", "全國決賽・熱血賽場", "/media/football-finals/04-finals-venue.jpg"],
    ["場上精彩", "帶球突破・勇敢向前", "/media/football-finals/05-dribble.jpg"],
    ["場上精彩", "團隊進攻・默契同行", "/media/football-finals/06-team-attack.jpg"],
    ["場上精彩", "禁區守護・全神貫注", "/media/football-finals/07-penalty-area.jpg"],
    ["場上精彩", "跌倒再起・永不放棄", "/media/football-finals/08-never-give-up.jpg"],
    ["場上精彩", "關鍵一腳・全力出擊", "/media/football-finals/09-key-shot.jpg"],
    ["場上精彩", "並肩作戰・迎戰每刻", "/media/football-finals/10-team-lineup.jpg"],
    ["場上精彩", "守住球門・守住信念", "/media/football-finals/11-defend-goal.jpg"],
    ["場上精彩", "穩住陣線・彼此支援", "/media/football-finals/12-defensive-line.jpg"],
    ["團隊時刻", "教練指導・賽前凝聚", "/media/football-finals/13-coach-briefing.jpg"],
    ["成果紀錄", "全國第七名・汗水有了答案", "/media/football-finals/14-seventh-place.jpg"],
    ["賽事氛圍", "全國決賽・為夢奔跑", "/media/football-finals/15-finals-panorama.jpg"],
    ["團隊時刻", "場邊補給・笑容滿滿", "/media/football-finals/16-team-smiles.jpg"],
    ["團隊時刻", "暖心支持・陪孩子追夢", "/media/football-finals/17-warm-support.jpg"],
    ["團隊時刻", "每一份鼓勵・都是前進力量", "/media/football-finals/18-encouragement.jpg"],
    ["成果紀錄", "努力被看見・開心收下祝福", "/media/football-finals/19-gift.jpg"],
  ] as const,
  partners: [
    ["存善", "中華存善慢飛天使關懷協會", "關懷服務夥伴"],
    ["慈愛", "彰化慈愛教養院", "服務合作單位"],
    ["雙龍", "南投雙龍國小足球隊", "教育支持夥伴"],
    ["偏鄉", "中寮：偏鄉關懷活動", "企業・社團・個人"],
  ] as const,
};

function Counter({ value, unit }: { value: number; unit: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const ob = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1000, 1);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      ob.disconnect();
    }, { threshold: .4 });
    ob.observe(el);
    return () => { ob.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref} className="counter">{n}<small>{unit}</small></span>;
}

function WarmParticles({ compact = false }: { compact?: boolean }) {
  const particles = useMemo(() => Array.from({ length: compact ? 18 : 30 }, (_, i) => ({
    x: (i * 37 + 9) % 100,
    y: (i * 53 + 17) % 100,
    size: 2 + (i % 4) * 1.4,
    delay: -(i % 12) * .7,
    duration: 7 + (i % 6) * 1.5,
  })), [compact]);

  return <div className="warm-particles" aria-hidden="true">
    {particles.map((p, i) => <i key={i} style={{
      "--x": `${p.x}%`,
      "--y": `${p.y}%`,
      "--size": `${p.size}px`,
      "--delay": `${p.delay}s`,
      "--duration": `${p.duration}s`,
    } as CSSProperties}/>)}
  </div>;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const [languageReady, setLanguageReady] = useState(false);
  const [filter, setFilter] = useState("全部");
  const [photo, setPhoto] = useState<(typeof content.gallery)[number] | null>(null);
  const [guide, setGuide] = useState(false);
  const [menu, setMenu] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [campaignShareStatus, setCampaignShareStatus] = useState("");
  const filters = useMemo(() => ["全部", ...new Set(content.gallery.map(x => x[0]))], []);
  const photos = filter === "全部" ? content.gallery : content.gallery.filter(x => x[0] === filter);
  const t = (value: string) => translate(lang, value);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("lang") as Lang | null;
    const saved = window.localStorage.getItem("liming-site-language") as Lang | null;
    if (requested && languageOptions.some(option => option.code === requested)) setLang(requested);
    else if (saved && languageOptions.some(option => option.code === saved)) setLang(saved);
    setLanguageReady(true);
  }, []);

  useEffect(() => {
    if (!languageReady) return;
    const option = languageOptions.find(item => item.code === lang);
    document.documentElement.lang = option?.htmlLang ?? "zh-Hant";
    window.localStorage.setItem("liming-site-language", lang);
    const url = new URL(window.location.href);
    if (lang === "zh") url.searchParams.delete("lang");
    else url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, [lang, languageReady]);

  useEffect(() => {
    const ob = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("show")), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(x => ob.observe(x));
    const key = (e: KeyboardEvent) => e.key === "Escape" && (setPhoto(null), setGuide(false), setMenu(false));
    window.addEventListener("keydown", key);
    return () => { ob.disconnect(); window.removeEventListener("keydown", key); };
  }, []);

  const shareSite = async () => {
    const shareData = {
      title: t("黎明公益網 手牽手愛無限"),
      text: t("一起看見台中黎明扶輪社的公益行動，讓每一份善意成為改變。"),
      url: window.location.origin,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        setShareStatus(t("連結已複製 ✓"));
        window.setTimeout(() => setShareStatus(""), 2400);
      } else {
        setShareStatus(t("請複製網址列"));
        window.setTimeout(() => setShareStatus(""), 2400);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareStatus(t("請稍後再試"));
      window.setTimeout(() => setShareStatus(""), 2400);
    }
  };

  const shareCampaign = async () => {
    const campaignUrl = new URL(window.location.href);
    campaignUrl.hash = "featured-campaign";
    const shareData = {
      title: t("足球築夢・希望啟航｜台中黎明扶輪社"),
      text: t("邀請您一起關注雙龍國小足球設備捐贈與偏鄉生活物資募集活動。"),
      url: campaignUrl.toString(),
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        setCampaignShareStatus(t("連結已複製 ✓"));
        window.setTimeout(() => setCampaignShareStatus(""), 2400);
      } else {
        setCampaignShareStatus(t("請複製網址列"));
        window.setTimeout(() => setCampaignShareStatus(""), 2400);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setCampaignShareStatus(t("請稍後再試"));
      window.setTimeout(() => setCampaignShareStatus(""), 2400);
    }
  };

  const shareCampaignToLine = () => {
    const campaignUrl = new URL(window.location.href);
    campaignUrl.hash = "featured-campaign";
    const message = [
      `⚽【${t("足球築夢・希望啟航")}】`,
      t("台中黎明扶輪社｜地區獎助金捐贈公益活動"),
      "",
      `📅 ${t(content.featuredCampaign.date)} ${content.featuredCampaign.time}`,
      `📍 ${t(content.featuredCampaign.place)}`,
      "",
      t("捐贈足球訓練設備、教學資源與生活物資，陪伴偏鄉孩子勇敢追夢！"),
      "",
      `📝 ${t("活動報名")}：${content.featuredCampaign.registrationUrl}`,
      `🌐 ${t("活動詳情")}：${campaignUrl.toString()}`,
    ].join("\n");
    window.open(`https://line.me/R/msg/text/?${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return <main data-lang={lang}>
    <div className="club-logo-strip" id="top">
      <Image src="/media/site/taichung-liming-rotary-logo-web.png" alt={t("國際扶輪3462地區・台中黎明扶輪社")} width={2048} height={682} priority unoptimized/>
    </div>
    <header>
      <a className="brand" href="#top"><span className="sun header-charity-logo"><Image src="/media/brand/hand-in-hand-mark-transparent.png" alt="" width={700} height={288} aria-hidden="true" unoptimized/></span><span><b>{t(content.name)}</b><small>HAND IN HAND · LOVE WITHOUT LIMITS</small></span></a>
      <nav className={menu ? "open" : ""}>
        <a href="#ten-years" onClick={() => setMenu(false)}>{t("十年有成")}</a><a href="#featured-campaign" onClick={() => setMenu(false)}>{t("焦點活動")}</a><a href="#latest-event" onClick={() => setMenu(false)}>{t("中秋活動")}</a><a href="#actions" onClick={() => setMenu(false)}>{t("公益行動")}</a><a href="#charity-logo" onClick={() => setMenu(false)}>{t("公益 Logo")}</a><a href="#timeline" onClick={() => setMenu(false)}>{t("行動足跡")}</a><a href="#stories" onClick={() => setMenu(false)}>{t("照片故事")}</a><a href="#contact" onClick={() => setMenu(false)}>{t("加入行動")}</a>
      </nav>
      <div className="header-tools">
        <label className="language-switcher">
          <span>{t("選擇語言")}</span>
          <select aria-label={t("選擇語言")} value={lang} onChange={event => setLang(event.target.value as Lang)}>
            {languageOptions.map(option => <option key={option.code} value={option.code}>{option.label}</option>)}
          </select>
        </label>
        <a className="header-cta" href="#contact">{t("一起行動 ↗")}</a>
        <button className="menu" aria-label={t("開啟選單")} onClick={() => setMenu(!menu)}>☰</button>
      </div>
    </header>

    <section className="hero">
      <WarmParticles/>
      <div className="hero-copy reveal">
        <div className="site-role-note"><span>{t("台中黎明扶輪社｜公益行動專站")}</span><a href="https://dawnrotaryclub.tw/" target="_blank" rel="noreferrer">{t("前往社務官方網站 ↗")}</a></div>
        <p className="eyebrow">{t("HAND IN HAND · 手牽手，愛無限")}</p>
        <div className="hero-title-lockup"><h1><span className="hero-title-first">{t("手牽手")}<Image src="/media/brand/hand-in-hand-mark-transparent.png" alt="" width={700} height={288} aria-hidden="true" unoptimized/></span><em>{t("讓愛無限")}</em></h1></div>
        <p>{t(content.intro)}</p>
        <div className="actions"><a className="btn gold" href="#actions">{t("看見我們的行動 ↓")}</a><a className="btn outline" href="#contact">{t("成為合作夥伴 ↗")}</a><button className="btn outline share-btn" type="button" onClick={shareSite} aria-live="polite">{shareStatus || t("分享黎明公益網 ↗")}</button></div>
        <small><i/> {t("公益不是一場活動，而是一段長久的陪伴")}</small>
      </div>
      <div className="hero-art hero-education-art reveal">
        <figure><Image src="/media/hand-in-hand-10-years/hero-poster.jpg" alt="手牽手十年有成海報" width={505} height={758} priority unoptimized/></figure>
        <div className="mini"><Image src="/media/hand-in-hand-10-years/hero-group.jpg" alt="台中黎明扶輪社八位社友於太平國小合照" width={1033} height={775} unoptimized/></div>
        <div className="stamp"><span>{t("手牽手")}</span><Image src="/media/brand/hand-in-hand-mark-transparent.png" alt="手牽手愛無限公益 Logo" width={700} height={288} unoptimized/><span>{t("愛無限")}</span></div>
      </div>
    </section>

    <section className="stats" aria-label={t("成果統計")}>{content.stats.map(([v,u,l], i) => <div key={l} style={{"--stat-delay": `${i * 100}ms`} as CSSProperties}><Counter value={v} unit={t(u)}/><p>{t(l)}</p></div>)}</section>

    <section className="ten-years-feature" id="ten-years">
      <div className="section ten-years-grid">
        <div className="ten-years-collage reveal" aria-label="手牽手十年有成拍攝紀錄">
          <figure className="ten-years-main"><Image src="/media/hand-in-hand-10-years/01.jpg" alt="台中黎明扶輪社於太平國小拍攝手牽手十年有成紀錄" width={1200} height={800} unoptimized/></figure>
          <figure className="ten-years-small"><Image src="/media/hand-in-hand-10-years/02.jpg" alt="手牽手教育陪伴十年紀錄拍攝現場" width={900} height={600} unoptimized/></figure>
          <span className="ten-years-seal"><b>10</b><small>YEARS<br/>TOGETHER</small></span>
        </div>
        <div className="ten-years-copy reveal">
          <p className="eyebrow">MILESTONE STORY · 重點公益紀錄</p>
          <p className="event-kicker">教育陪伴｜台中市北區太平國小</p>
          <h2>手牽手<br/><em>十年有成</em></h2>
          <p>從一堂英語課開始，十年的相遇、學習與陪伴，累積成孩子成長路上的溫暖力量。台中黎明扶輪社與教育夥伴長期投入弱勢學童英語學習，讓公益不只停留在一次活動，而是成為持續同行的承諾。</p>
          <dl className="ten-years-facts"><div><dt>服務主題</dt><dd>弱勢學童英語教育</dd></div><div><dt>紀錄地點</dt><dd>臺中市北區太平國小</dd></div><div><dt>拍攝紀錄</dt><dd>2024.12.16</dd></div></dl>
          <div className="ten-years-actions"><a className="btn ten-years-primary" href="/hand-in-hand-10-years">閱讀十年完整紀錄 ↗</a><a className="ten-years-album-link" href="https://dawnrotaryclub.tw/index.php?ID=882&mode=gallery_album" target="_blank" rel="noreferrer">查看原始活動相簿 →</a></div>
        </div>
      </div>
    </section>

    <ShuanglongRecord lang={lang} />

    <section className="featured-campaign" id="featured-campaign">
      <div className="section featured-campaign-film reveal">
        <div className="featured-campaign-film-frame">
          <div className="campaign-date-stamp logo-date-badge" aria-label={t("活動日期 2026 年 9 月 10 日")}><Image src="/media/brand/hand-in-hand-solid-note-v2.png" alt="" width={700} height={288} aria-hidden="true" unoptimized/><span className="logo-date-copy"><b>2026.9.10</b><small>{t("最新活動")}</small></span></div>
          <video autoPlay muted loop controls playsInline preload="metadata" poster={content.featuredCampaign.poster} aria-label={t("雙龍國小足球築夢公益活動形象短片")}>
            <source src={content.featuredCampaign.video} type="video/mp4"/>
            {t("您的瀏覽器目前無法播放這段影片。")}
          </video>
          <div className="featured-campaign-film-label" aria-hidden="true"><b>SHUANGLONG</b><span>FOOTBALL DREAM · 2026</span></div>
        </div>
        <div className="featured-campaign-film-copy">
          <p className="eyebrow">{t("CAMPAIGN FILM · 活動形象短片")}</p>
          <p className="event-kicker">{t("10 秒影音預告")}</p>
          <h3>{t("全國第七名的實力，缺一雙合腳的球鞋")}</h3>
          <p>{t("從足球築夢到物資關懷，邀請您先透過影片感受這趟送愛到偏鄉的公益行動。")}</p>
          <span>{t("點選影片可開啟聲音與全螢幕播放")}</span>
        </div>
      </div>
      <div className="section featured-campaign-social-film reveal">
        <div className="featured-campaign-social-copy">
          <p className="eyebrow">{t("SOCIAL STORY · 9/3 影音分享")}</p>
          <p className="event-kicker">{t("直式 10 秒公益短片")}</p>
          <h3>{t("從一座山裡的球場，看見孩子奔向夢想")}</h3>
          <p>{t("山景、足球、雙龍國小與愛心物資，濃縮成一支適合 LINE、Facebook 與手機分享的短片。")}</p>
          <span>{t("9 月 3 日首波宣傳建議：影片先行，活動海報接續補充資訊")}</span>
        </div>
        <div className="featured-campaign-social-frame">
          <div className="campaign-date-stamp logo-date-badge" aria-label={t("活動日期 2026 年 9 月 10 日")}><Image src="/media/brand/hand-in-hand-solid-note-v2.png" alt="" width={700} height={288} aria-hidden="true" unoptimized/><span className="logo-date-copy"><b>2026.9.10</b><small>{t("最新活動")}</small></span></div>
          <video controls playsInline preload="metadata" aria-label={t("雙龍國小足球公益直式分享短片")}>
            <source src={content.featuredCampaign.socialVideo} type="video/mp4"/>
            {t("您的瀏覽器目前無法播放這段影片。")}
          </video>
        </div>
      </div>
      <div className="section featured-campaign-grid">
        <figure className="featured-campaign-poster reveal">
          <Image src={content.featuredCampaign.poster} alt={t(content.featuredCampaign.posterAlt)} width={1024} height={1536} priority unoptimized/>
        </figure>
        <div className="featured-campaign-copy reveal">
          <p className="eyebrow">{t(content.featuredCampaign.eyebrow)}</p>
          <p className="event-kicker">{t("台中黎明扶輪社・雙龍偏鄉公益日")}</p>
          <h2>{t(content.featuredCampaign.title)}<br/><em>{t(content.featuredCampaign.subtitle)}</em></h2>
          <p>{t(content.featuredCampaign.text)}</p>
          <dl className="featured-campaign-facts">
            <div><dt>{t("日期")}</dt><dd>{t(content.featuredCampaign.date)}</dd></div>
            <div><dt>{t("時間")}</dt><dd>{content.featuredCampaign.time}</dd></div>
            <div><dt>{t("地點")}</dt><dd>{t(content.featuredCampaign.place)}<small>{t(content.featuredCampaign.address)}</small></dd></div>
          </dl>
          <div className="featured-campaign-program" aria-label={t("活動內容")}>
            {content.featuredCampaign.activities.map((item, i) => <span key={item}><b>0{i + 1}</b>{t(item)}</span>)}
          </div>
          <aside className="featured-campaign-collection">
            <b>{t("募集生活物資")}</b>
            <p>{t(content.featuredCampaign.collection)}</p>
          </aside>
          <div className="featured-campaign-actions">
            <a className="btn campaign-primary" href="#shuanglong-20260910">{({zh:"查看活動成果 →",en:"View event record →",ja:"活動記録を見る →",ko:"행사 기록 보기 →"})[lang]}</a>
            <a className="campaign-map-link" href={content.featuredCampaign.mapUrl} target="_blank" rel="noreferrer">{t("查看雙龍國小地圖 →")}</a>
            <button className="btn campaign-share" type="button" onClick={shareCampaign} aria-live="polite">{campaignShareStatus || t("好康分享（分享活動）")}</button>
            <button className="btn campaign-line" type="button" onClick={shareCampaignToLine} aria-label={t("使用 LINE 分享活動")}><span aria-hidden="true">LINE</span>{t("LINE 分享")}</button>
          </div>
          <small className="featured-campaign-invitation">{t(content.featuredCampaign.invitation)}</small>
        </div>
      </div>
      <aside className="section road-closure-alert reveal" aria-labelledby="road-closure-title">
        <div className="road-closure-copy">
          <p className="eyebrow">TRAFFIC NOTICE · {t("重要交通提醒")}</p>
          <h3 id="road-closure-title">{t("前往雙龍國小，請留意台 16 線施工封閉")}</h3>
          <p>{t("台 16 線人和至民和路段辦理瀝青刨鋪工程，施工期間道路封閉、禁止通行。參與雙龍國小活動的夥伴，請預留交通時間並依現場人員指揮改道。")}</p>
          <dl className="road-closure-facts">
            <div><dt>{t("施工日期")}</dt><dd>2026.09.07－09.11</dd></div>
            <div><dt>{t("每日封閉時間")}</dt><dd>08:00－17:00</dd></div>
            <div><dt>{t("封閉路段")}</dt><dd>{t("台 16 線 20K+600（人和）至 25K+900（民和）")}</dd></div>
          </dl>
          <div className="road-closure-route">
            <b>{t("建議改道路線")}</b>
            <p>{t("台 16 線 20K+600 → 人倫橋 → 人和波石聯絡道 → 寶石橋 → 接回台 16 線 25K+900。請依現場交通人員指揮行駛。")}</p>
          </div>
          <div className="road-closure-links">
            <a href="https://168.thb.gov.tw/" target="_blank" rel="noreferrer">{t("查詢即時路況 ↗")}</a>
            <a href="tel:+886492791510">{t("道路工程洽詢：049-2791510")}</a>
          </div>
        </div>
        <figure className="road-closure-poster">
          <Image src="/media/football-donation/ta16-road-closure-20260907.jpg" alt={t("台 16 線人和至民和路段施工封閉及改道路線公告")} width={1536} height={1536} unoptimized/>
        </figure>
      </aside>
    </section>

    <section className="latest-event" id="latest-event">
      <WarmParticles compact/>
      <div className="section latest-event-grid">
        <div className="latest-event-posters reveal" aria-label={t("第一階段與第二階段活動海報")}>
          <span>2026<br/><b>{t("最新活動")}</b></span>
          {content.latestEvent.posters.map((poster) => (
            <figure key={poster.label}>
              <Image src={poster.src} alt={t(poster.alt)} width={poster.width} height={poster.height} unoptimized/>
              <figcaption>{t(poster.label)}</figcaption>
            </figure>
          ))}
        </div>
        <div className="latest-event-copy reveal">
          <p className="eyebrow">{t(content.latestEvent.eyebrow)}</p>
          <p className="event-kicker">{t("台中黎明扶輪社・中寮偏鄉關懷")}</p>
          <h2>{t(content.latestEvent.title)}<br/><em>{t(content.latestEvent.subtitle)}</em></h2>
          <p>{t(content.latestEvent.text)}</p>
          <dl className="latest-event-facts">
            <div><dt>{t("日期")}</dt><dd>{t(content.latestEvent.date)}</dd></div>
            <div><dt>{t("時間")}</dt><dd>{content.latestEvent.time}</dd></div>
            <div><dt>{t("地點")}</dt><dd>{t(content.latestEvent.place)}</dd></div>
          </dl>
          <div className="latest-event-highlights" aria-label={t("活動亮點")}>
            {content.latestEvent.highlights.map((item, i) => <span key={item}><b>0{i + 1}</b>{t(item)}</span>)}
          </div>
          <div className="latest-event-schedule" aria-labelledby="latest-event-schedule-title">
            <div className="latest-event-schedule-heading">
              <p>{t("UPDATED PROGRAM · 最新活動流程")}</p>
              <h3 id="latest-event-schedule-title">{t("9／19 完整活動流程")}</h3>
            </div>
            <div className="latest-event-schedule-grid">
              {content.latestEvent.schedule.map((block) => (
                <article key={block.phase}>
                  <header>
                    <h4>{t(block.phase)}</h4>
                    <span>{block.hours}</span>
                  </header>
                  <ol>
                    {block.items.map(([time, item]) => (
                      <li key={`${time}-${item}`}><time>{time}</time><span>{t(item)}</span></li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
          <div className="latest-event-actions">
            <a className="btn gold" href={`${content.latestEvent.url}?utm_source=liming&utm_medium=referral&utm_campaign=2026_midautumn&utm_content=latest_event_cta`} target="_blank" rel="noreferrer">{t("進入完整活動專頁 ↗")}</a>
            <a className="latest-event-text-link" href={`${content.latestEvent.url}location?utm_source=liming&utm_medium=referral&utm_campaign=2026_midautumn&utm_content=location_link`} target="_blank" rel="noreferrer">{t("查看地點與交通 →")}</a>
          </div>
          <small>{t("完整流程、主題曲、活動地圖與主／協辦單位介紹，請前往活動專頁查看。")}</small>
        </div>
      </div>
    </section>

    <OutreachVisit lang={lang} />
    <PreparationRecord lang={lang} />

    <section className="section actions-section" id="actions">
      <div className="heading reveal"><p className="eyebrow">{t("OUR ACTIONS · 公益行動")}</p><h2>{t("把關心，落實在")}<br/>{t("每一個需要裡。")}</h2><p>{t("聚焦照護、教育與社區串聯，讓資源精準抵達，也讓故事被更多人看見。")}</p></div>
      <div className="action-list">{content.actions.map((a,i) => <article className="action-card reveal" key={a.title}>
        <span>0{i+1}</span><div className="action-img"><Image src={a.image} alt={i === 0 ? t("社區家園設備汰舊換新活動合影") : i === 1 ? t("南投雙龍國小女足全國第七名合影") : `${t(a.title)}${t("示意照片")}`} width={650} height={430} unoptimized/><small>{i <= 1 ? t("活動實錄") : t("示意照片・可替換")}</small></div>
        <div><p className="tag">{t(a.tag)}</p><h3>{t(a.title)}</h3><p>{t(a.text)}</p><b>✓ {t(a.result)}</b></div>
      </article>)}</div>
    </section>

    <section className="timeline-section" id="timeline">
      <WarmParticles compact/>
      <div className="section">
        <div className="timeline-heading reveal">
          <div><p className="eyebrow">{t("OUR JOURNEY · 行動足跡")}</p><h2>{t("每一次伸手，")}<br/>{t("都讓改變向前一步。")}</h2></div>
          <p>{t("從生活照護、偏鄉關懷到教育支持，我們把善意串成一條持續前進的時間軸。")}</p>
        </div>
        <div className="timeline">
          {content.timeline.map((item, i) => <article className="timeline-item reveal" key={item[0]}>
            <div className="timeline-marker"><span>{item[0]}</span></div>
            <div className="timeline-copy">
              <p>{t(item[1])}</p>
              <h3>{t(item[2])}</h3>
              <small>{t(item[3])}</small>
            </div>
            <b>0{i + 1}</b>
          </article>)}
        </div>
      </div>
    </section>

    <section className="stories-section" id="stories">
      <div className="section">
        <div className="stories-heading reveal">
          <p className="eyebrow">{t("STORIES BEHIND THE PHOTOS · 照片故事")}</p>
          <h2>{t("照片留住一刻，")}<br/>{t("故事讓感動繼續。")}</h2>
        </div>
        <div className="story-list">
          {content.stories.map((story, i) => <article className={`story reveal ${i % 2 ? "reverse" : ""}`} key={story.title}>
            <figure>
              <Image src={story.image} alt={t(story.alt)} width={1200} height={820} unoptimized/>
              <span>0{i + 1}</span>
            </figure>
            <div>
              <p className="eyebrow">{t(story.eyebrow)}</p>
              <h3>{t(story.title)}</h3>
              <p>{t(story.text)}</p>
              <a href={i === 0 ? "#actions" : "#gallery"}>{i === 0 ? t("看見生活照護行動") : t("觀看完整活動紀錄")} ↗</a>
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="football-feature" id="football">
      <div className="section football-grid">
        <div className="football-copy reveal">
          <p className="eyebrow">{t("FOOTBALL DREAM · 足球公益紀錄")}</p>
          <p className="event-kicker">{t(content.event.subtitle)}</p>
          <h2>{t(content.event.title)}</h2>
          <div className="result-badge"><span>FINAL RESULT</span><b>{t(content.event.result)}</b></div>
          <p>{t(content.event.text)}</p>
          <a className="btn gold" href="#gallery">{t("看完整活動相簿 ↓")}</a>
        </div>
        <div className="event-video reveal">
          <video controls playsInline preload="metadata" poster={content.event.poster} aria-label={t("114學年度小學生足球賽全國決賽活動影片")}>
            <source src={content.event.video} type="video/mp4"/>
            {t("您的瀏覽器目前無法播放這段影片。")}
          </video>
          <div><span>EVENT FILM</span><b>{t("奔跑的每一步，都有人在身後加油")}</b></div>
        </div>
      </div>
      <div className="section football-reel reveal">
        <div className="reel-copy">
          <p className="eyebrow">{t("NEW SHORT FILM · 新增影音")}</p>
          <p className="event-kicker">{t("13 秒精彩紀錄")}</p>
          <h2>{t("2026 雙龍國小")}<br/>{t("足球全國賽")}</h2>
          <p>{t("重溫孩子們在全國賽場上的勇氣、笑容與團隊精神；每一次奔跑，都有滿滿的支持陪伴。")}</p>
        </div>
        <div className="reel-video">
          <video controls playsInline preload="metadata" poster={content.event.shortPoster} aria-label={t("2026雙龍國小足球全國賽短影音")}>
            <source src={content.event.shortVideo} type="video/mp4"/>
            {t("您的瀏覽器目前無法播放這段影片。")}
          </video>
        </div>
      </div>
      <div className="section instagram-reel reveal" id="instagram-reel">
        <div className="instagram-frame">
          <iframe
            src={content.event.instagramEmbed}
            title={t("雙龍國小足球全國賽 Instagram Reel")}
            loading="lazy"
            allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
        <div className="instagram-copy">
          <p className="eyebrow">{t("FOLLOW THE STORY · IG 影音")}</p>
          <p className="event-kicker">Instagram Reel</p>
          <h2>{t("一起為孩子的")}<br/>{t("每一步喝采")}</h2>
          <p>{t("從黎明公益網直接觀看最新賽事影音；若您的瀏覽器限制 Instagram 嵌入內容，也可前往原貼文觀看。")}</p>
          <a className="btn gold" href={content.event.instagramUrl} target="_blank" rel="noreferrer">{t("在 Instagram 觀看 ↗")}</a>
        </div>
      </div>
      <div className="section threads-reel reveal" id="threads-reel">
        <div className="threads-copy">
          <p className="eyebrow">{t("MORE MOMENTS · THREADS 影音")}</p>
          <p className="event-kicker">Threads Post</p>
          <h2>{t("讓每一份感動")}<br/>{t("繼續被看見")}</h2>
          <p>{t("透過 Threads 分享球場上的精彩時刻，也讓更多人看見孩子們勇敢追夢的身影。")}</p>
          <a className="btn gold" href={content.event.threadsUrl} target="_blank" rel="noreferrer">{t("在 Threads 觀看 ↗")}</a>
        </div>
        <div className="threads-frame">
          <blockquote
            className="text-post-media"
            data-text-post-permalink={content.event.threadsUrl}
            data-text-post-version="0"
          >
            <a href={content.event.threadsUrl} target="_blank" rel="noreferrer">{t("在 Threads 觀看這則影音")}</a>
          </blockquote>
        </div>
      </div>
      <Script async src="https://www.threads.com/embed.js" strategy="afterInteractive" />
    </section>

    <section className="gallery-section" id="gallery">
      <div className="section gallery-head reveal"><div><p className="eyebrow">{t("MOMENTS OF COURAGE · 賽事相簿")}</p><h2>{t("每張照片，都是")}<br/>{t("勇氣發生的證明。")}</h2><p className="gallery-intro">{t("共 19 張活動紀錄，依賽事氛圍、場上精彩、團隊時刻與成果紀錄分類整理。")}</p></div><div className="filters">{filters.map(f => <button className={filter===f?"active":""} onClick={()=>setFilter(f)} key={f}>{t(f)}</button>)}</div></div>
      <div className="section gallery">{photos.map((p,i) => <button className={`photo p${i%6}`} key={p[2]} onClick={()=>setPhoto(p)} aria-label={`${t("放大查看")}${t(p[1])}`}><Image src={p[2]} alt={t(p[1])} width={1000} height={700} unoptimized/><span><i>{t(p[0])}</i><b>{t(p[1])}</b><em>＋</em></span></button>)}</div>
    </section>

    <section className="section impact" id="impact">
      <div className="quote reveal"><span>“</span><h2>{t(content.slogan)}</h2><p>— {t(content.fullName)}</p></div>
      <div className="partner-head reveal" id="partners"><p className="eyebrow">{t("TOGETHER, WE GO FURTHER · 合作夥伴")}</p><h2>{t("所有相關合作單位")}</h2></div>
      <p className="partner-summary">{t("7所合作學校・2個公益與照護單位。感謝每一位教育與公益夥伴，讓陪伴持續發生。")}</p>
      <p className="partner-note">{t("本區彙整歷年服務與活動合作紀錄，不代表所有單位目前均持續開課或參與同一活動。")}</p>
      <div className="partner-category">
        <h3>{t("手牽手英語教學｜歷年合作學校")}</h3>
        <p>{t("透過英語學習支持弱勢學童；各校本年度開課情形以學校與主辦單位公告為準。")}</p>
        <div className="partner-directory">{["臺中市東區樂業國小", "臺中市北區太平國小", "臺中市烏日區旭光國小", "臺中市大里區塗城國小", "臺中市大里區瑞城國小"].map(name => <article key={name}><span>{t("歷年英語教學")}</span><h4>{t(name)}</h4><p>{t("手牽手英語教育與學習陪伴")}</p></article>)}</div>
        <a className="partner-record" href="https://www.dawnrotaryclub.tw/index.php?ID=103&mode=pdf_dl" target="_blank" rel="noreferrer">{t("查看黎明社官方歷年教學紀錄 ↗")}</a>
      </div>
      <div className="partner-category">
        <h3>{t("公益合作學校｜活動與服務")}</h3>
        <div className="partner-directory">
          <article><span>{t("教育支持・活動合作")}</span><h4>{t("南投縣信義鄉雙龍國小")}</h4><p>{t("足球隊賽事支持、足球設備與物資捐贈。")}</p><a href="#featured-campaign">{t("查看相關公益行動 →")}</a></article>
          <article><span>{t("公益活動場地")}</span><h4>{t("南投縣中寮鄉中寮國小")}</h4><p>{t("中寮手牽手愛無限公益活動與中秋共融。")}</p><a href="#latest-event">{t("查看相關公益行動 →")}</a></article>
        </div>
      </div>
      <div className="partner-category">
        <h3>{t("公益與照護夥伴｜服務紀錄")}</h3>
        <div className="partner-directory">
          <article><span>{t("公益協作")}</span><h4>{t("中華存善慢飛天使關懷協會")}</h4><p>{t("串聯關懷服務、公益物資及中寮活動合作。")}</p><a href="#latest-event">{t("查看相關公益行動 →")}</a></article>
          <article><span>{t("照護服務支持")}</span><h4>{t("彰化慈愛教養院")}</h4><p>{t("協助改善老舊空調設備與日常照護環境。")}</p><a href="#actions">{t("查看相關公益行動 →")}</a></article>
        </div>
      </div>
    </section>

    <section className="action-banner" aria-label={t("捐助或志工行動")}>
      <WarmParticles compact/>
      <div className="action-banner-copy reveal">
        <p className="eyebrow">{t("TAKE ACTION · 一起行動")}</p>
        <h2>{t("您的一份心意，")}<br/>{t("可以成為下一個改變。")}</h2>
        <p>{t("無論是公益捐助、物資支持、專業服務或親自投入志工行動，我們都期待與您並肩同行。")}</p>
        <div className="action-banner-buttons">
          <a className="btn donate" href="#contact"><span>♥</span> {t("洽詢捐助方式")}</a>
          <a className="btn volunteer" href="#contact"><span>✦</span> {t("洽詢參與方式")}</a>
        </div>
        <small>{t("實際捐助方式與志工活動名額，請與台中黎明扶輪社聯絡確認。")}</small>
      </div>
    </section>

    <section className="contact" id="contact">
      <div className="reveal"><p className="eyebrow">{t("LET’S CREATE IMPACT · 聯絡我們")}</p><h2>{t("下一個好故事，")}<br/><em>{t("期待有您同行。")}</em></h2><p>{t("企業合作、物資支持、專業服務或活動參與，都歡迎與我們聊聊。")}</p><div className="actions"><a className="btn light" href="tel:+886423227799">{t("立即來電 ↗")}</a><a className="btn outline" href="https://dawnrotaryclub.tw/" target="_blank" rel="noreferrer">{t("黎明扶輪社官方網站 ↗")}</a></div></div>
      <aside className="contact-card reveal"><p>TAICHUNG DAWN</p><h3>{t(content.fullName)}</h3><dl><div><dt>{t("電話")}</dt><dd><a href="tel:+886423227799">04-2322-7799</a></dd></div><div><dt>{t("辦公室")}</dt><dd>{t("台中市南屯區公益路二段 61 號")}<br/>{t("13 樓之 1")}</dd></div><div><dt>{t("合作洽詢")}</dt><dd>{t("歡迎來電洽詢公益合作與活動資訊")}</dd></div></dl><a href="https://www.facebook.com/groups/376285655902508/" target="_blank">{t("Facebook 社群 ↗")}</a></aside>
    </section>

    <section className="charity-logo-section" id="charity-logo" aria-labelledby="charity-logo-title">
      <div className="section charity-logo-heading reveal"><div><p className="eyebrow">BRAND FOR GOOD · {t("公益識別")}</p><h2 id="charity-logo-title">{t("一雙手，成就更多愛與希望。")}</h2></div><p>{t("「手牽手・愛無限」以一個能被記住、也能被實際使用的公益符號，串聯每一次關懷、陪伴與共同參與。")}</p></div>
      <div className="section charity-logo-story reveal">
        <div className="charity-logo-display"><Image src="/media/brand/hand-in-hand-logo-transparent.png" alt="HAND IN HAND · LOVE WITHOUT LIMITS 公益 Logo" width={1672} height={940} unoptimized/></div>
        <div className="charity-logo-elements">
          <article><b>01</b><h3>{t("雙手")}</h3><p>{t("雙手相連並合成愛心，代表陪伴、合作，以及把善意化為行動。")}</p></article>
          <article><b>02</b><h3>{t("愛心")}</h3><p>{t("中央愛心是關懷的核心，象徵每一次公益行動都從理解與溫暖出發。")}</p></article>
          <article><b>03</b><h3>{t("天使翅膀")}</h3><p>{t("向上展開的翅膀代表守護、希望與前進的力量，陪伴需要的人飛向更好的未來。")}</p></article>
          <article><b>04</b><h3>{t("紅色 × 白色")}</h3><p>{t("紅色傳達愛、行動與熱情；白色代表純粹、守護與值得信任。")}</p></article>
        </div>
      </div>
      <div className="section charity-logo-extension reveal">
        <div className="charity-logo-merch"><Image src="/media/brand/hand-in-hand-merchandise.webp" alt={t("公益 Logo 商品與活動應用示意")} width={1600} height={1193} unoptimized/></div>
        <div className="charity-logo-extension-copy"><p className="eyebrow">FROM MARK TO MOVEMENT · {t("從識別到行動")}</p><h2>{t("讓一致的識別，走進每一個公益現場。")}</h2><p>{t("Logo 可延伸至活動主背板、志工服飾、公益提袋、識別牌、社群圖卡與宣傳海報。無論遠看或縮小，都能快速辨識，讓每一份支持形成共同記憶。")}</p><ul><li>{t("活動主背板與舞台識別")}</li><li>{t("志工服飾與工作證")}</li><li>{t("公益提袋與紀念小物")}</li><li>{t("社群圖卡、海報與影音片尾")}</li></ul></div>
      </div>
    </section>

    <nav className="alliance-matrix" aria-label={t("黎明公益聯盟數位行動矩陣")}>
      <strong><span>{t("Alan 網頁矩陣")}</span><small>{t("人文 × 科技 × 公益 × 專業")}</small></strong>
      <a href="https://liming-hand-in-hand.alanyang42.chatgpt.site" aria-current="page"><small>{t("公益行動")}</small><b>{t("黎明公益網")}</b></a>
      <a href="https://hand-in-hand.pages.dev/?utm_source=liming&amp;utm_medium=referral&amp;utm_campaign=2026_midautumn&amp;utm_content=alliance_footer" target="_blank" rel="noreferrer"><small>{t("最新活動")}</small><b>{t("手牽手・愛無限")}</b></a>
      <a href="https://www.smartspeaker.com.tw/?utm_source=liming&amp;utm_medium=referral&amp;utm_campaign=public_good_alliance&amp;utm_content=alliance_footer" target="_blank" rel="noreferrer"><small>{t("專業信任")}</small><b>Health Salon</b></a>
      <a href="https://www.alanyang.com.tw/?utm_source=liming&amp;utm_medium=referral&amp;utm_campaign=public_good_alliance&amp;utm_content=alliance_footer" target="_blank" rel="noreferrer"><small>{t("企劃紀錄")}</small><b>A+ Project Journal</b></a>
    </nav>
    <section className="alan-team-intro" aria-labelledby="alan-team-title">
      <div className="alan-team-heading">
        <p>ALAN × AI PROJECT TEAM</p>
        <h2 id="alan-team-title">{t("讓想法落地，讓公益被看見。")}</h2>
        <span>{t("由 Alan 統籌方向，結合五位 AI 虛擬專員，協助研究、內容、設計、網站與多媒體整合，讓每一項公益行動都能被清楚記錄與持續分享。")}</span>
        <a href="https://www.alanyang.com.tw/?utm_source=liming&amp;utm_medium=referral&amp;utm_campaign=alan_ai_team&amp;utm_content=team_footer" target="_blank" rel="noreferrer">{t("認識 Alan 團隊 ↗")}</a>
      </div>
      <div className="alan-team-roles">
        <article className="team-lead"><b>01</b><small>PROJECT LEAD</small><h3>{t("Alan｜總指揮")}</h3><p>{t("方向決策・企劃整合・跨域協作")}</p></article>
        <article><b>02</b><small>RESEARCH</small><h3>{t("資料研究")}</h3><p>{t("背景整理・資訊查核・策略分析")}</p></article>
        <article><b>03</b><small>CONTENT</small><h3>{t("內容企劃")}</h3><p>{t("故事轉譯・活動文案・多語內容")}</p></article>
        <article><b>04</b><small>DESIGN</small><h3>{t("視覺設計")}</h3><p>{t("版面風格・海報圖像・品牌一致")}</p></article>
        <article><b>05</b><small>WEB</small><h3>{t("網站建置")}</h3><p>{t("互動體驗・手機優化・網站更新")}</p></article>
        <article><b>06</b><small>MEDIA</small><h3>{t("多媒體整合")}</h3><p>{t("影音內容・社群串聯・成果傳播")}</p></article>
      </div>
      <aside className="alan-credit-panel">
        <p>{t("本站由")} <strong>Alan Yang {t("數位企劃團隊")}</strong> {t("規劃設計，協助品牌定位、內容架構、活動紀錄與網站維護，讓每一次值得被看見的行動，都有一個可信任的數位入口。")}</p>
        <a href="https://www.alanyang.com.tw/?utm_source=liming&amp;utm_medium=referral&amp;utm_campaign=alan_ai_team&amp;utm_content=credit_footer" target="_blank" rel="noreferrer">{t("認識企劃夥伴 Alan Yang ↗")}</a>
      </aside>
    </section>
    <footer><a className="brand" href="#top"><span className="sun">✦</span><b>{t(content.name)}</b></a><p>© 2026 {t(content.fullName)} · {t("讓善意持續發生")}</p><p>{t("內容更新 2026.09")}</p></footer>
    <button className="guide-btn" onClick={()=>setGuide(true)}>✦ {t("內容更新指南")}</button>

    {photo && <div className="backdrop" onClick={()=>setPhoto(null)}><div className="photo-modal" onClick={e=>e.stopPropagation()}><button onClick={()=>setPhoto(null)} aria-label={t("關閉照片")}>×</button><Image src={photo[2]} alt={t(photo[1])} width={1500} height={1000} unoptimized/><div><p>{t(photo[0])}</p><h3>{t(photo[1])}</h3><small>{t(content.event.title)}・{t("活動實錄")}</small></div></div></div>}
    {guide && <div className="backdrop" onClick={()=>setGuide(false)}><aside className="guide" onClick={e=>e.stopPropagation()}><button onClick={()=>setGuide(false)}>×</button><p className="eyebrow">EASY TO UPDATE</p><h2>{t("一處更新，")}<br/>{t("全站同步。")}</h2><p>{t("活動、數字、照片與合作夥伴已集中管理；替換內容後，版面與互動會自動保留。")}</p><ol><li><b>01</b><span><strong>{t("活動資訊")}</strong><small>{t("新增標題、摘要與成果")}</small></span></li><li><b>02</b><span><strong>{t("照片相簿")}</strong><small>{t("替換照片與分類說明")}</small></span></li><li><b>03</b><span><strong>{t("成果夥伴")}</strong><small>{t("調整數字與合作單位")}</small></span></li></ol><a className="btn gold" href="#contact" onClick={()=>setGuide(false)}>{t("準備下一次活動 ↗")}</a></aside></div>}
  </main>;
}

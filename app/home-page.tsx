"use client";

import Image from "next/image";
import OutreachVisit from "./components/OutreachVisit";
import ShuanglongRecord from "./components/ShuanglongRecord";
import PreparationRecord from "./components/PreparationRecord";
import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { languageOptions, type Lang } from "./i18n";
import { useSiteLanguage } from "./use-site-language";

function NavIcon({kind}:{kind:string}) {
  const paths:Record<string,string> = {
    action:"M12 20S3 14 3 8a4 4 0 0 1 9-2 4 4 0 0 1 9 2c0 6-9 12-9 12Z",
    results:"M5 21V9h4v12M10 21V3h4v18M15 21V6h4v15M3 21h18",
    press:"M4 4h13v16H4zM17 8h4v10a2 2 0 0 1-4 0M7 8h7M7 12h7M7 16h4",
    stories:"M3 5h18v14H3zM10 9l5 3-5 3z",
    about:"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 11v6M12 7v1",
    globe:"M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18"
  };
  return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]}/></svg>;
}
// 日後更新網站，只要修改這份集中資料即可。
const content = {
  name: "黎明公益網 手牽手愛無限",
  fullName: "台中黎明扶輪社",
  slogan: "手牽手，愛無限；因為有您，我們可以讓世界更美好。",
  intro: "串聯社友、眷屬與在地夥伴，從生活照護、教育支持到社區關懷，讓每一份善意真正抵達需要的地方。",
  stats: [
    [35, "萬元", "公益捐贈總額"],
    [137, "戶", "弱勢家庭關懷"],
    [250, "份", "學童愛心餐盒"],
    [14, "桌", "中秋公益音樂饗宴"],
  ] as const,
  timeline: [
    ["01", "生活照護", "改善照護環境", "攜手公益夥伴汰換社區家園老舊設備，讓陪伴落實在更安心、舒適的日常。"],
    ["02", "偏鄉關懷", "把資源送到需要的地方", "串聯社友、眷屬與在地力量，讓關懷不只是一次活動，而是一段持續同行的關係。"],
    ["03", "教育支持", "陪孩子勇敢追夢", "支持南投雙龍國小女足走上全國賽場，把每一份鼓勵化成孩子繼續奔跑的力量。"],
    ["04", "地區獎助金捐贈", "足球築夢・希望啟航", "2026 年 9 月 10 日前往雙龍國小，捐贈足球訓練設備、教學資源與生活物資，陪孩子在偏鄉勇敢追夢。"],
    ["05", "成果專題", "中寮手牽手・愛無限", "2026 年 9 月 19 日，中寮國小匯聚公益服務、在地夥伴與中秋團圓；完整成果已收錄於中寮手牽手成果網站。"],
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
        src: "/media/latest-event/event-poster-latest.jpg",
        label: "活動宣傳回顧",
        alt: "攜手愛無限偏鄉弱勢關懷公益中秋活動最新海報",
        width: 1024,
        height: 1536,
      },
    ],
    eyebrow: "IMPACT STORY · 2026 成果專題",
    title: "手牽手・愛無限",
    subtitle: "偏鄉弱勢關懷公益中秋活動",
    date: "2026 年 9 月 19 日（六）",
    time: "15:00－20:30",
    place: "南投・中寮國小",
    text: "從午後公益嘉年華到中秋公益晚會，社友、在地夥伴與居民在中寮相聚。成果網站完整收錄活動故事、服務成果與現場影像，讓這份跨域合作與偏鄉關懷持續被看見。",
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

export default function Home({ initialLang = "zh" }: { initialLang?: Lang }) {
 const { lang, setLang, t, localizedPath } = useSiteLanguage(initialLang);

  const [filter, setFilter] = useState("全部");
  const [photo, setPhoto] = useState<(typeof content.gallery)[number] | null>(null);
  const [menu, setMenu] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [campaignShareStatus, setCampaignShareStatus] = useState("");
  const filters = useMemo(() => ["全部", ...new Set(content.gallery.map(x => x[0]))], []);
  const photos = filter === "全部" ? content.gallery : content.gallery.filter(x => x[0] === filter);




  useEffect(() => {
    const ob = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("show")), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(x => ob.observe(x));
    const key = (e: KeyboardEvent) => e.key === "Escape" && (setPhoto(null), setMenu(false));
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
    <div id="top"/>
    <header className="editorial-header">
      <div className="editorial-brand-lockup">
        <a className="editorial-charity-brand" href="#top" aria-label={t("黎明公益網")}><Image src="/media/brand/hand-in-hand-white-wings-gold-heart.png" alt="" width={700} height={288} aria-hidden="true" unoptimized/><span className="charity-brand-copy"><b className="charity-brand-name">{t("黎明公益網")}</b><small className="charity-brand-tagline">Hand in Hand, Love without limit</small></span></a>
        <span className="editorial-brand-divider" aria-hidden="true"/>
        <a className="editorial-club-brand" href="https://dawnrotaryclub.tw/" target="_blank" rel="noreferrer"><Image src="/media/site/taichung-liming-rotary-logo-web.png" alt={t("台中黎明扶輪社 ROTARY CLUB OF TAICHUNG DAWN")} width={2048} height={682} priority unoptimized/></a>
      </div>
      <nav className={menu ? "open" : ""}>
        <a href="#concept-pillars" onClick={() => setMenu(false)}><NavIcon kind="action"/>{t("公益行動")}</a><a href="#concept-highlights" onClick={() => setMenu(false)}><NavIcon kind="results"/>{t("活動成果")}</a><a href="#media-stories" onClick={() => setMenu(false)}><NavIcon kind="press"/>{t("媒體報導")}</a><a href="#stories" onClick={() => setMenu(false)}><NavIcon kind="stories"/>{t("影像故事")}</a><a href="#about-publication" onClick={() => setMenu(false)}><NavIcon kind="about"/>{t("關於黎明公益網")}</a>
        <button className="language-toggle" type="button" aria-expanded={languageOpen} aria-controls="homepage-language-options" onClick={() => setLanguageOpen(!languageOpen)}><NavIcon kind="globe"/>EN / JP / KR / 中文 <span aria-hidden="true">{languageOpen ? "▴" : "▾"}</span></button>
      </nav>
      {languageOpen && <div className="homepage-language-options" id="homepage-language-options" role="group" aria-label={t("選擇語言")}>
        {([{code:"en",label:"EN · English"},{code:"ja",label:"JP · 日本語"},{code:"ko",label:"KR · 한국어"},{code:"zh",label:"中文 · 繁體中文"}] as {code:Lang;label:string}[]).map(option => <button type="button" key={option.code} lang={option.code === "zh" ? "zh-Hant" : option.code} aria-pressed={lang === option.code} onClick={() => {setLang(option.code);setLanguageOpen(false);}}>{option.label}</button>)}
      </div>}

      <div className="header-tools">
        <label className="language-switcher">
          <span>{t("選擇語言")}</span>
          <select aria-label={t("選擇語言")} value={lang} onChange={event => setLang(event.target.value as Lang)}>
            {languageOptions.map(option => <option key={option.code} value={option.code}>{option.label}</option>)}
          </select>
        </label>
        <button className="menu" aria-label={t("開啟選單")} onClick={() => setMenu(!menu)}>☰</button>
      </div>
    </header>

    <section className="concept-hero" aria-labelledby="hero-opening-title">
      <Image src="/media/zhongliao-report/02-final-group-banner.jpg" alt={t("中寮攜手愛無限公益活動現場合影")} fill sizes="100vw" priority unoptimized/>
      <div className="concept-hero-shade"/>
      <div className="concept-hero-copy reveal">
        <p>{t("用行動點亮偏鄉　讓愛走得更遠")}</p>
        <h1 id="hero-opening-title">{t("中寮")}<br/>{t("攜手")}<em>{t("愛")}</em>{t("無限")}</h1>
        <strong>{t("一場相聚，讓善意在偏鄉交會。")}</strong>
        <a href="#latest-event">{t("閱讀完整成果　→")}</a>
        <small>SMALL HANDS<br/>BIG CHANGES</small>
      </div>
      <span className="concept-hero-handnote">{t("為更好的")}<br/>{t("明天")}<br/>{t("一起努力 ♡")}</span>
    </section>

    <section className="concept-overview" aria-labelledby="concept-intro-title">
      <div className="concept-intro reveal">
        <p>A BRIGHTER TOMORROW</p>
        <h2 id="concept-intro-title">{t("從相聚開始，")}<br/>{t("讓善意持續發生")}</h2>
        <div>{t("台中黎明扶輪社以行動串連社會善意，")}<br/>{t("在南投中寮用愛心與陪伴，為偏鄉帶來更多希望。")}<br/>{t("我們相信，每一次相聚，都是改變的起點；")}<br/>{t("每一份關懷，都能讓更多孩子看見更大的未來。")}</div>
        <blockquote className="concept-love-quote"><span aria-hidden="true">♡</span><p>{t("愛，沒有距離。")}<br/><strong>{t("只有更多的可能。")}</strong></p></blockquote>
      </div>
      <div className="concept-results">
        <div className="concept-results-head"><p className="results-kicker">2026 · IMPACT IN ACTION</p><h3>{t("每一份善意，都有回響")}</h3><p className="results-event">{t("中寮關懷暨中秋公益晚會")}<span>{t("成果數據")}</span></p></div>
        <div className="concept-metrics">{content.stats.map(([v,u,l]) => <article key={l}><b>{u === "萬元" && lang === "en" ? "350K" : v}<small>{u === "萬元" && lang === "en" ? "TWD" : t(u)}</small></b><p>{t(l)}</p></article>)}</div>
        <div className="concept-pillars" id="concept-pillars">
          <article className="concept-education"><figure><Image src="/media/hand-in-hand-10-years/01.jpg" alt={t("手牽手十年有成：扶輪社夥伴與太平國小孩子的大合照")} fill sizes="(max-width: 800px) 100vw, 23vw" unoptimized/></figure><div><b>01</b><span><h3>{t("教育陪伴")}</h3><p>{t("陪伴孩子探索興趣，")}<br/>{t("用教育打開更寬廣的未來。")}</p></span></div></article>
          <article><figure><Image src="/media/shuanglong-20260910/1000094025.jpg" alt={t("偏鄉培育")} fill sizes="(max-width: 800px) 100vw, 23vw" unoptimized/></figure><div><b>02</b><span><h3>{t("偏鄉培育")}</h3><p>{t("縮短城鄉資源落差，")}<br/>{t("讓每個孩子都有發光的機會。")}</p></span></div></article>
          <article className="concept-community"><figure className="community-split"><span><svg className="community-heart-icon" viewBox="0 0 100 100" role="img" aria-label={t("愛心關懷")}><path fill="#e52335" d="M50 86C39 77 9 57 9 32C9 11 36 6 50 25C64 6 91 11 91 32C91 57 61 77 50 86Z"/></svg></span><span><Image src="/media/zhongliao-report/community-care-market-08.jpg" alt={t("中寮攜手愛無限公益市集盛況")} fill sizes="(max-width: 700px) 50vw, 12vw" unoptimized/></span></figure><div><b>03</b><span><h3>{t("社區關懷")}</h3><p>{t("在地連結、長期陪伴，")}<br/>{t("讓善意在社區持續循環。")}</p></span></div></article>
        </div>
      </div>
    </section>

    <section className="concept-highlights" id="concept-highlights">
      <article className="reveal"><header><h2>{t("精選活動")}</h2><a href="#actions">{t("探索更多活動　→")}</a></header><div className="concept-highlight-body"><figure><Image src="/media/zhongliao-report/02-final-group-banner.jpg" alt={t("2026 中寮關懷暨中秋公益晚會")} fill sizes="(max-width: 800px) 100vw, 22vw" unoptimized/></figure><div><h3>{t("2026 中寮關懷暨中秋公益晚會")}</h3><p>{t("月圓人團圓，愛心無距離。")}<br/>{t("台中黎明扶輪社與在地夥伴攜手，")}<br/>{t("用實際行動傳遞溫暖，讓中寮的夜晚充滿愛與希望。")}</p><a href="#latest-event">{t("閱讀完整成果　→")}</a></div></div></article>
      <article className="reveal"><header><h2>{t("新聞媒體報導")}</h2><a href="#media-stories">{t("查看更多報導　→")}</a></header><div className="concept-highlight-body"><figure><Image src="/media/site/press-editorial-photo-v2.png" alt={t("報紙與雜誌示意，象徵新聞媒體報導")} fill sizes="(max-width:700px) 100vw, 25vw" unoptimized/></figure><div><h3>{t("用行動，讓愛被看見")}</h3><p>{t("從在地到更遠的地方，")}<br/>{t("台中黎明扶輪社持續推動公益行動，")}<br/>{t("讓得各界媒體關注與肯定。")}</p><a href="#media-stories">{t("閱讀相關報導　→")}</a></div></div></article>
    </section>

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
      <div className="section full-impact-report">
        <div className="report-intro reveal">
          <div>
            <p className="eyebrow">{t("FULL IMPACT REPORT · 完整成果報告")}</p>
            <p className="report-issue">ISSUE 01 · 2026</p>
          </div>
          <div className="report-intro-copy">
            <h2>{t("中寮手牽手・愛無限")}</h2>
            <p>{t("從午後公益服務到月光下的團圓晚宴，政府、學校、社福、扶輪與民間夥伴在中寮相聚，把關懷化為可被驗證、可被延續的在地成果。")}</p><p className="press-gratitude">{t("誠摯感謝黎明扶輪社承辦聯誼主委 Jerry 和 Health 秘書長的用心投入，讓「中寮攜手愛無限」匯聚溫暖，讓公益關懷持續傳遞。")}</p>
          </div>
        </div>

        <figure className="report-lead-photo reveal">
          <div className="report-lead-photo-image"><Image src="/media/zhongliao-report/02-final-group-banner.jpg" alt={t("中秋傳愛幸福中寮活動團隊大合照")} fill sizes="100vw" unoptimized/></div>
          <figcaption><strong>{t("中秋傳愛・幸福中寮")}</strong><span>{t("主辦與協力夥伴共同留下圓滿紀錄")}</span></figcaption>
        </figure>

        <div className="report-meta reveal">
          <span><b>DATE</b>{t("2026 年 9 月 19 日")}</span>
          <span><b>PLACE</b>{t("南投縣中寮國小")}</span>
          <span><b>MISSION</b>{t("偏鄉關懷・教育支持・共融陪伴")}</span>
        </div>

        <section className="report-summary reveal" aria-labelledby="report-summary-title">
          <div className="report-section-number">01</div>
          <div className="report-section-copy">
            <p>{t("EXECUTIVE SUMMARY · 成果摘要")}</p>
            <h3 id="report-summary-title">{t("讓每一份投入被看見，讓每一份溫暖繼續傳遞。")}</h3>
            <p>{t("本次行動以公益市集、義剪、衛教、學童與身心障礙團體演出、家庭關懷及中秋共餐串起一整天。資源不只在舞台上被宣布，更實際進入校園、家庭與社福現場，回應地方真實需要。")}</p>
          </div>
          <dl className="report-metrics">
            <div><dt>{lang === "en" ? "350K" : "35"}<small>{lang === "en" ? "TWD" : t("萬元")}</small></dt><dd>{t("公益捐贈總額")}</dd></div>
            <div><dt>137<small>{t("戶")}</small></dt><dd>{t("弱勢家庭關懷")}</dd></div>
            <div><dt>250<small>{t("份")}</small></dt><dd>{t("學童愛心餐盒")}</dd></div>
            <div><dt>14<small>{t("桌")}</small></dt><dd>{t("中秋公益共餐")}</dd></div>
          </dl>
        </section>

        <section className="report-donation-section reveal" aria-labelledby="report-donation-title">
          <div className="report-section-heading">
            <span>02</span>
            <div><p>{t("GIVING MADE VISIBLE · 捐贈成果")}</p><h3 id="report-donation-title">{t("兩筆捐贈，回應學校、家庭與社福需要")}</h3></div>
          </div>
          <div className="report-donation-grid">
            <article>
              <figure><Image src="/media/zhongliao-report/03-donation-check.jpg" alt={t("台中黎明扶輪社捐贈五萬元中寮國小獎助學金")} fill sizes="(max-width: 800px) 100vw, 50vw" unoptimized/></figure>
              <div><span>{t("教育支持")}</span><h4>{t("新臺幣 5 萬元")}</h4><p>{t("台中黎明扶輪社由社長周哲民 JOE 代表全體社友，捐贈中寮國小獎助學金，支持偏鄉學童安心學習。")}</p></div>
            </article>
            <article>
              <figure><Image src="/media/zhongliao-report/49-thirty-million-check.jpg" alt={t("中華存善慢飛天使關懷協會捐贈三十萬元公益款項")} fill sizes="(max-width: 800px) 100vw, 50vw" unoptimized/></figure>
              <div><span>{t("在地關懷")}</span><h4>{t("新臺幣 30 萬元")}</h4><p>{t("中華存善慢飛天使關懷協會由理事長吳錦河及理監事代表，投入弱勢家庭、獎助學金與玫瑰啟能訓練中心支持。")}</p></div>
            </article>
          </div>
        </section>

        <section className="report-impact-section reveal" aria-labelledby="report-impact-title">
          <div className="report-section-heading">
            <span>03</span>
            <div><p>{t("THREE LAYERS OF IMPACT · 三大影響")}</p><h3 id="report-impact-title">{t("服務走進生活，舞台接住差異，資源留在地方")}</h3></div>
          </div>
          <div className="report-impact-grid">
            <article><figure><Image src="/media/zhongliao-report/62-care-registration.jpg" alt={t("公益關懷服務登記與物資發放現場")} fill sizes="(max-width: 800px) 100vw, 33vw" unoptimized/></figure><div><b>01</b><h4>{t("社區服務")}</h4><p>{t("公益市集、義剪、健康宣導與家庭關懷走進居民日常，讓服務更靠近需要。")}</p></div></article>
            <article><figure><Image src="/media/zhongliao-report/21-student-drums.jpg" alt={t("中寮國小學生非洲鼓演出")} fill sizes="(max-width: 800px) 100vw, 33vw" unoptimized/></figure><div><b>02</b><h4>{t("共融舞台")}</h4><p>{t("學童、慢飛天使與表演者共享舞台；每一次掌聲，都是理解與陪伴。")}</p></div></article>
            <article><figure><Image src="/media/zhongliao-report/55-community-certificate-presentation.jpg" alt={t("中寮地方代表與公益夥伴共同展示感謝狀")} fill sizes="(max-width: 800px) 100vw, 33vw" unoptimized/></figure><div><b>03</b><h4>{t("資源落地")}</h4><p>{t("捐款、餐盒、共餐與社福支持形成具體成果，讓一次活動成為持續合作的起點。")}</p></div></article>
          </div>
        </section>

        <footer className="report-footer reveal">
          <div><p>{t("完整影像紀錄與中英文專題")}</p><h3>{t("看見成果，也邀請下一次同行。")}</h3></div>
          <div className="report-footer-actions">
            <a className="btn gold" href={`${content.latestEvent.url}?utm_source=liming&utm_medium=referral&utm_campaign=zhongliao_results&utm_content=full_report_footer`} target="_blank" rel="noreferrer">{t("開啟完整成果網站 ↗")}</a>
            <a className="latest-event-text-link" href="https://hand-in-hand.pages.dev/en/?utm_source=liming&amp;utm_medium=referral&amp;utm_campaign=zhongliao_results&amp;utm_content=full_report_english" target="_blank" rel="noreferrer" hrefLang="en">View English Report →</a>
          </div>
        </footer>
      </div>
    </section>

    <section className="newsroom" id="media-stories" aria-labelledby="media-stories-title">
      <span className="anchor-alias" id="education-news" aria-hidden="true"/>
      <div className="section newsroom-heading reveal">
        <div><p className="eyebrow">DAWN CHARITY NETWORK · PRESS ROOM</p><h2 id="media-stories-title">{t("新聞媒體")}<span>{t("報導專區")}</span></h2><p className="newsroom-deck">{t("讓每一則報導，成為公益行動的見證。")}</p></div>
        <div className="newsroom-intro"><p>{t("集中收錄黎明公益網相關媒體報導，從教育陪伴、偏鄉關懷到青少年培育，透過不同媒體視角保存每一段值得被看見的公益歷程。")}</p><dl><div><dt>7</dt><dd>{t("媒體報導")}</dd></div><div><dt>3</dt><dd>{t("公益專題")}</dd></div><div><dt>2026</dt><dd>{t("持續更新")}</dd></div></dl></div>
      </div>

      <div className="section press-editorial-banner">
        <figure><Image src="/media/site/press-editorial-photo-v2.png" alt={t("報紙與雜誌示意照片")} fill sizes="(max-width:700px) 100vw, 40vw" unoptimized/></figure>
        <div><p>{t("IN THE NEWS · 媒體視角")}</p><h3>{t("看見行動的價值")}<br/>{t("保存善意的足跡")}</h3><span>{t("從教育陪伴到偏鄉關懷，透過新聞報導，閱讀每一次投入的故事。")}</span><a href="#press-all-coverage">{t("瀏覽全部報導")}<span aria-hidden="true">↓</span></a></div>
      </div>
      <div className="section press-outlet-strip" aria-label={t("已收錄媒體")}><span>{t("收錄媒體")}</span><b>{t("經濟日報")}</b><b>{t("PeoPo 公民新聞")}</b><b>{t("新頭條")}</b><b>{t("耀新聞／覞傳媒")}</b><b>{t("睿傳媒 Rightmedia")}</b><b>{t("獨家報導")}</b><b>{t("工商時報")}</b></div>
      <div className="section press-feature-label"><span>01 / FEATURED STORY</span><strong>{t("焦點報導")}</strong><span>{t("教育陪伴 · 最新收錄")}</span></div>
      <article className="newsroom-feature reveal">
        <figure><Image src="/media/site/edn-taiping-20260929.jpg" alt={t("經濟日報報導照片：太平國小學童參與英語拼字互動")} fill sizes="(max-width: 850px) 100vw, 52vw" unoptimized/><span>{t("最新收錄")}</span><figcaption className="press-photo-credit">{t("照片來源：經濟日報原文")}</figcaption></figure>
        <div className="newsroom-feature-copy">
          <p>{t("教育陪伴")}</p><div className="press-source"><strong>{t("經濟日報")}</strong><time dateTime="2026-09-29">{t("報導日期｜2026.09.29")}</time></div>
          <h3>{t("中市北區太平國小「手牽手英語課」中秋開課　扶輪社攜手傳愛")}</h3>
          <p>{t("台中黎明扶輪社支持低年級英語學習，以雙語故事、英語歌曲與拼字遊戲陪伴孩子扎根；在地企業也共同投入，讓節慶成為溫暖的學習時光。")}</p><p className="press-gratitude">{t("誠摯感謝黎明社手牽手承辦主委 Auto 的用心投入，讓英語教育陪伴持續傳遞。")}</p>
          <div><a className="newsroom-primary press-read-featured" href="https://money.udn.com/money/story/5723/9782564" target="_blank" rel="noopener noreferrer">{t("閱讀經濟日報原文 ↗")}</a><a className="newsroom-secondary" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmoney.udn.com%2Fmoney%2Fstory%2F5723%2F9782564" target="_blank" rel="noopener noreferrer">{t("分享報導")}</a></div>
        </div>
      </article>

      <div className="section newsroom-archive" id="press-all-coverage">
        <div className="newsroom-archive-heading reveal"><p>{t("ALL COVERAGE · 全部報導")}</p><h3>{t("依公益專題完整收錄")}</h3><span>{t("點選每一篇報導，可前往媒體網站閱讀原文。")}</span></div>
        <div className="newsroom-grid">
          <article className="newsroom-card reveal"><figure><Image src="/media/site/peopo-taiping-20260929.webp" alt={t("PeoPo 公民新聞報導照片：太平國小手牽手英語課開課活動合照")} fill sizes="(max-width: 800px) 100vw, 50vw" unoptimized/><b>{t("教育陪伴")}</b><figcaption className="press-photo-credit">{t("照片來源：PeoPo 公民新聞原文")}</figcaption></figure><div><div className="press-source"><strong>{t("PeoPo 公民新聞")}</strong><time dateTime="2026-09-29">{t("報導日期｜2026.09.29")}</time></div><h4>{t("太平國小「手牽手英語課」中秋開課，扶輪社攜手企業傳愛")}</h4><span>{t("雙語故事、歌唱與遊戲，讓孩子在節慶中快樂接觸英語，也記錄長期教育陪伴的延續。")}</span><p className="press-gratitude">{t("誠摯感謝黎明社手牽手承辦主委 Auto 的用心投入，讓英語教育陪伴持續傳遞。")}</p><a className="press-read-featured" href="https://www.peopo.org/news/858920" target="_blank" rel="noopener noreferrer">{t("閱讀 PeoPo 報導 ↗")}</a></div></article>
          <article className="newsroom-card reveal"><figure><Image src="/media/zhongliao-report/02-final-group-banner.jpg" alt={t("中寮手牽手愛無限公益活動合影")} fill sizes="(max-width: 800px) 100vw, 50vw" unoptimized/><b>{t("偏鄉關懷")}</b></figure><div><div className="press-source"><strong>{t("新頭條 TheHubNews")}</strong><time dateTime="2026-09-28">{t("報導日期｜2026.09.28")}</time></div><h4>{t("逾 30 萬元愛心，挹注弱勢家庭、學童與慢飛天使")}</h4><span>{t("跨團體匯聚資源，把中秋關懷化為弱勢家庭、偏鄉學童與慢飛天使的實際支持。")}</span><p className="press-gratitude">{t("誠摯感謝黎明扶輪社承辦聯誼主委 Jerry 和 Health 秘書長的用心投入，讓「中寮攜手愛無限」匯聚溫暖，讓公益關懷持續傳遞。")}</p><a className="press-read-featured" href="https://www.thehubnews.net/archives/669432" target="_blank" rel="noopener noreferrer">{t("閱讀新頭條報導 ↗")}</a></div></article>
<article className="newsroom-card reveal"><figure><Image src="/media/zhongliao-report/02-final-group-banner.jpg" alt={t("中寮手牽手愛無限公益活動合影")} fill sizes="(max-width: 800px) 100vw, 50vw" unoptimized/><b>{t("偏鄉關懷")}</b></figure><div><div className="press-source"><strong>{t("睿傳媒 Rightmedia")}</strong><time dateTime="2026-09-28">{t("報導日期｜2026.09.28")}</time></div><h4>{t("逾 30 萬元愛心，挹注弱勢家庭、學童與慢飛天使")}</h4><span>{t("跨團體匯聚資源，把中秋關懷化為弱勢家庭、偏鄉學童與慢飛天使的實際支持。")}</span><p className="press-gratitude">{t("誠摯感謝黎明扶輪社承辦聯誼主委 Jerry 和 Health 秘書長的用心投入，讓「中寮攜手愛無限」匯聚溫暖，讓公益關懷持續傳遞。")}</p><a className="press-read-featured" href="https://www.right-media.news/archives/235914" target="_blank" rel="noopener noreferrer">{t("閱讀睿傳媒報導 ↗")}</a></div></article>
<article className="newsroom-card reveal"><figure><Image src="/media/zhongliao-report/02-final-group-banner.jpg" alt={t("中寮手牽手愛無限公益活動合影")} fill sizes="(max-width: 800px) 100vw, 50vw" unoptimized/><b>{t("偏鄉關懷")}</b></figure><div><div className="press-source"><strong>{t("獨家報導")}</strong><time dateTime="2026-09-28">{t("報導日期｜2026.09.28")}</time></div><h4>{t("逾 30 萬元愛心，挹注弱勢家庭、學童與慢飛天使")}</h4><span>{t("跨團體匯聚資源，把中秋關懷化為弱勢家庭、偏鄉學童與慢飛天使的實際支持。")}</span><p className="press-gratitude">{t("誠摯感謝黎明扶輪社承辦聯誼主委 Jerry 和 Health 秘書長的用心投入，讓「中寮攜手愛無限」匯聚溫暖，讓公益關懷持續傳遞。")}</p><a className="press-read-featured" href="https://www.scooptw.com/local_news/532770/" target="_blank" rel="noopener noreferrer">{t("閱讀獨家報導 ↗")}</a></div></article>
          <article className="newsroom-card reveal"><figure><Image src="/media/zhongliao-report/49-thirty-million-check.jpg" alt={t("中寮公益中秋活動捐贈儀式")} fill sizes="(max-width: 800px) 100vw, 50vw" unoptimized/><b>{t("共融行動")}</b></figure><div><div className="press-source"><strong>{t("耀新聞／覞傳媒")}</strong><time dateTime="2026-09-23">{t("報導日期｜2026.09.23")}</time></div><h4>{t("南投中寮中秋公益晚會，以教育扶助與共融餐會點亮微光")}</h4><span>{t("從生活禮券、教育經費到市集服務與共融餐會，呈現資源如何實際回應地方需要。")}</span><p className="press-gratitude">{t("誠摯感謝黎明扶輪社承辦聯誼主委 Jerry 和 Health 秘書長的用心投入，讓「中寮攜手愛無限」匯聚溫暖，讓公益關懷持續傳遞。")}</p><a className="press-read-featured" href="https://yaonews.net/news_view.php?new_sn=143935&new_csn=3188" target="_blank" rel="noopener noreferrer">{t("閱讀耀新聞報導 ↗")}</a></div></article>
          <article className="newsroom-card reveal"><figure><Image src="/media/shuanglong-20260910/1000094025.jpg" alt={t("台中黎明扶輪社與雙龍國小師生合影")} fill sizes="(max-width: 800px) 100vw, 50vw" unoptimized/><b>{t("青少年培育")}</b></figure><div><div className="press-source"><strong>{t("工商時報")}</strong><time dateTime="2026-09-10">{t("報導日期｜2026.09.10")}</time></div><h4>{t("足球築夢希望啟航　讓愛與資源走進雙龍偏鄉")}</h4><span>{t("足球設備、生活物資與親身陪伴走進雙龍部落，支持孩子突破環境限制、勇敢追夢。")}</span><p className="press-gratitude">{t("誠摯感謝黎明社扶輪基金主委 Value 協助基金補助，以及社友們熱情參與物資捐贈，讓愛與資源走進雙龍，陪伴孩子勇敢追夢。")}</p><a className="press-read-featured" href="https://www.ctee.com.tw/news/20260910701521-431208" target="_blank" rel="noopener noreferrer">{t("閱讀工商時報報導 ↗")}</a></div></article>
        </div>
      </div>
    </section>

    <section className="rick-visit" id="rick-visit" aria-labelledby="rick-visit-title">
      <div className="section rick-visit-grid">
        <div className="rick-visit-copy reveal">
          <p className="eyebrow">{t("WITH GRATITUDE · 蒞臨指導")}</p>
          <p className="rick-visit-date">{t("2026.09.19・南投中寮")}</p>
          <h2 id="rick-visit-title">{t("感謝 2027–28 年度")}<br/><em>{t("準總監 Rick 蒞臨指導")}</em></h2>
          <p>{t("感謝準總監 Rick 親臨「手牽手・愛無限」中寮公益行動現場，與服務夥伴及地方來賓交流，為偏鄉關懷、教育支持與公益串聯帶來珍貴鼓勵。崴正公司長期投入中寮孩童及長者的弱勢關懷，今年並於永康國小舉辦成果展，讓持續投入的愛心與陪伴被更多人看見。")}</p>
          <blockquote>{t("一份親自到場的支持，讓投入服務的每一雙手更有力量，也讓中寮的溫暖持續被看見。")}</blockquote>
        </div>
        <div className="rick-visit-photos reveal" aria-label={t("準總監 Rick 蒞臨中寮公益活動照片")}>
          <figure className="rick-visit-main"><Image src="/media/zhongliao-report/63-rick-group.jpg" alt={t("2027至28年度準總監 Rick 參與中寮攜手愛無限活動並與服務夥伴合影")} fill sizes="(max-width: 800px) 100vw, 58vw" unoptimized/><figcaption>{t("活動紀錄｜準總監 Rick 參與中寮「攜手愛無限」公益行動，與服務夥伴合影")}</figcaption></figure>
          <figure className="rick-visit-detail"><Image src="/media/zhongliao-report/64-rick-guidance.jpg" alt={t("吳理事長、春風社莊社長及2027至28年度準總監 Rick 於中寮攜手愛無限活動合影")} fill sizes="(max-width: 800px) 100vw, 32vw" unoptimized/><figcaption>{t("現場紀實｜吳理事長、春風社莊社長及 Rick 準總監合影")}</figcaption></figure>
        </div>
      </div>
    </section>

    <section className="ten-years-feature" id="ten-years">
      <div className="section ten-years-grid">
        <div className="ten-years-collage reveal" aria-label={t("手牽手十年有成拍攝紀錄")}>
          <figure className="ten-years-main"><Image src="/media/hand-in-hand-10-years/01.jpg" alt={t("台中黎明扶輪社於太平國小拍攝手牽手十年有成紀錄")} width={1200} height={800} unoptimized/></figure>
          <figure className="ten-years-small"><Image src="/media/hand-in-hand-10-years/02.jpg" alt={t("手牽手教育陪伴十年紀錄拍攝現場")} width={900} height={600} unoptimized/></figure>
          <span className="ten-years-seal"><b>10</b><small>YEARS<br/>TOGETHER</small></span>
        </div>
        <div className="ten-years-copy reveal">
          <p className="eyebrow">{t("MILESTONE STORY · 活動成果紀錄")}</p>
          <p className="event-kicker">{t("教育陪伴｜台中市北區太平國小")}</p>
          <h2>{t("手牽手")}<br/><em>{t("十年有成")}</em></h2>
          <p>{t("從一堂英語課開始，十年的相遇、學習與陪伴，累積成孩子成長路上的溫暖力量。台中黎明扶輪社與教育夥伴長期投入弱勢學童英語學習，讓公益不只停留在一次活動，而是成為持續同行的承諾。")}</p>
          <dl className="ten-years-facts"><div><dt>{t("服務主題")}</dt><dd>{t("弱勢學童英語教育")}</dd></div><div><dt>{t("紀錄地點")}</dt><dd>{t("臺中市北區太平國小")}</dd></div><div><dt>{t("拍攝紀錄")}</dt><dd>2024.12.16</dd></div></dl>
          <div className="ten-years-actions"><a className="btn ten-years-primary" href={localizedPath("/hand-in-hand-10-years")}>{t("閱讀十年完整紀錄 ↗")}</a><a className="ten-years-album-link" href="https://dawnrotaryclub.tw/index.php?ID=882&mode=gallery_album" target="_blank" rel="noreferrer">{t("查看原始活動相簿 →")}</a></div>
        </div>
      </div>
    </section>

    <ShuanglongRecord lang={lang} />

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
      <div className="partner-stats" aria-label={t("合作夥伴統計")}><article><span>SCHOOLS</span><p><strong>8</strong><em>{t("所")}</em></p><h3>{t("合作學校")}</h3></article><article><span>CARE PARTNERS</span><p><strong>2</strong><em>{t("個")}</em></p><h3>{t("公益與照護單位")}</h3></article></div><p className="partner-gratitude"><span aria-hidden="true">♡</span>{t("誠摯感謝每一所學校、每一位教育與公益夥伴，")}<br/>{t("讓善意相連，讓陪伴持續發生。")}</p>
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
          <article><span>{t("公益活動場地")}</span><h4>{t("南投縣中寮鄉中寮國小")}</h4><p>{t("中寮手牽手愛無限公益活動與中秋共融。")}</p><a href="#latest-event">{t("查看相關公益行動 →")}</a></article><article className="ailan-partner" id="ruizhe-gratitude">
  <div className="ailan-feature-heading"><span>{t("WITH GRATITUDE · 長期教育支持")}</span><h4>{t("南投愛蘭國小")}</h4><p>{t("多年同行，讓教育陪伴持續發生。")}</p></div>
  <div className="ailan-feature-story">
    <p>{t("誠摯感謝")}<strong>{t("瑞哲工業股份有限公司")}</strong>{t("多年來全額贊助愛蘭國小。這份持續投入的心意，讓公益不只是一時的熱情，更成為與學校長期同行的支持。")}</p>
    <p>{t("教育需要時間，陪伴也需要堅持。年復一年的支持，承載著對孩子成長的重視，以及對學校教育工作的信任。我們珍惜這份長久的承諾，也希望透過紀錄，讓每一份默默付出的善意被看見。")}</p>
    <blockquote>{t("一份長期的支持，是對教育的信任，也是對孩子未來的祝福。")}</blockquote>
    <p className="partner-sponsor-credit">{t("特別感謝瑞哲工業股份有限公司董事長")}<strong>Wrench</strong>{t("。身為")}<strong>{t("台中黎明扶輪社的優秀社友")}</strong>{t("，他以實際行動支持教育，將企業的力量與扶輪服務的心意相連，讓關懷在校園中持續傳遞。")}</p>
    <p>{t("也誠摯感謝愛蘭國小教育夥伴的投入。企業的支持與學校的用心，共同寫下這段值得珍惜的公益歷程。願這份多年累積的善意，繼續陪伴孩子迎向更多可能。")}</p>
    <div className="ailan-sponsor-signature"><span>{t("長期全額贊助")}</span><strong>{t("瑞哲工業股份有限公司")}</strong><small>{t("董事長 Wrench｜台中黎明扶輪社社友")}</small></div>
  </div>
</article>
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

    <section className="about-publication" id="about-publication" aria-labelledby="about-publication-title">
      <div className="about-publication-inner reveal">
        <p className="eyebrow">{t("ABOUT THIS PUBLICATION · 關於黎明公益網")}</p>
        <div className="about-publication-grid">
          <h2 id="about-publication-title">{t("以紀實保存行動，")}<br/><em>{t("讓公益被清楚看見。")}</em></h2>
          <div>
            <p>{t("黎明公益網為獨立第三方公益紀實網站，依據公開資料、活動紀錄與現場素材，客觀、忠實整理台中黎明扶輪社參與的各項公益行動。")}</p>
            <p>{t("本站並非台中黎明扶輪社官方網站，內容以資料保存、公益傳播與社會記錄為目的。")}</p>
            <a href="https://dawnrotaryclub.tw/" target="_blank" rel="noreferrer">{t("前往台中黎明扶輪社官方網站 ↗")}</a>
          </div>
        </div>
      </div>
    </section>

    <section className="founders-gratitude" id="founders-gratitude" aria-labelledby="founders-gratitude-title">
      <div className="founders-gratitude-inner">
        <div className="founders-intro">
          <p className="founders-kicker">{t("WITH GRATITUDE · 感恩・發起感謝文")}</p>
          <svg className="founders-seed" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M40 67V34M40 48C17 48 12 30 15 17c20 0 29 12 25 31ZM40 36C40 18 51 9 67 12c1 18-10 27-27 24M24 69h32"/></svg>
          <h2 id="founders-gratitude-title">{t("一顆小小的種子，")}<br/><em>{t("長成手牽手的愛")}</em></h2>
          <p className="founders-lead">{t("一切，都從一份最單純的初衷開始。")}</p>
          <div className="founders-names"><span>{t("由衷感謝共同發起的夥伴")}</span><strong>{t("黎明扶輪社創社社長 CPA")}</strong><strong>Michael</strong><strong>Stanley</strong><span>{t("共同發起至今")}</span></div>
        </div>
        <div className="founders-letter">
          <p>{t("台中黎明扶輪社創社之初，便懷抱著一個心願：讓公益成為這個社團最溫暖的底色。多年後，這份初衷化成了「手牽手 愛無限」，我們想把關懷送到偏鄉，特別是弱勢孩子的英文教育。因為我們相信，每個孩子都值得擁有看見世界的機會，不論他生在城市或山邊。")}</p>
          <p>{t("自")}<strong>{t("黎明扶輪社創社社長 CPA、Michael、Stanley 等夥伴")}</strong>{t("共同發起至今，這份公益初心持續傳承。他們不只提出想法，更以行動「拋磚引玉」，率先付出，邀請各行各業的菁英一起加入。也正因為這塊磚拋得真誠，才引來了一塊又一塊的玉。")}</p>
          <p>{t("感謝每一位願意伸出手的夥伴。你們來自不同的專業與領域，卻因同一份善意站在一起。有人出力，有人出錢，有人出點子，有人只是默默地在旁邊說一句「我來幫忙」，這些都是「愛無限」最珍貴的樣子。")}</p>
          <p>{t("也感謝每一位關心偏鄉孩子的朋友。你的一次分享、一句鼓勵、一份參與，都會成為孩子學習路上的一盞小燈。")}</p>
          <blockquote>{t("公益不是一個人走得很快，")}<br/>{t("而是一群人走得很遠。")}</blockquote>
          <p>{t("願我們繼續手牽著手，把這份溫暖傳下去，讓更多孩子在英文的世界裡，找到自信，也找到夢想。")}</p>
          <p className="founders-thanks">{t("謝謝你們，讓愛不斷延伸。")}</p>
          <div className="founders-signature"><span>{t("社友")}</span><strong>Alan Yang <small>{t("敬上")}</small></strong><p>{t("台中黎明扶輪社「手牽手 愛無限」")}</p></div>
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
        <small>{t("捐贈方式、志工參與及公益合作，可洽台中黎明扶輪社或中華存善慢飛天使關懷協會，相關細節請與各單位確認。")}</small>
      </div>
    </section>

    <section className="contact" id="contact">
      <div className="reveal"><p className="eyebrow">{t("LET’S CREATE IMPACT · 聯絡我們")}</p><h2>{t("下一個好故事，")}<br/><em>{t("期待有您同行。")}</em></h2><p>{t("企業合作、物資支持、專業服務或活動參與，都歡迎與我們聊聊。")}</p><div className="actions"><a className="btn light" href="tel:+886423227799">{t("立即來電 ↗")}</a><a className="btn outline" href="https://dawnrotaryclub.tw/" target="_blank" rel="noreferrer">{t("黎明扶輪社官方網站 ↗")}</a></div></div>
      <div className="contact-organizations"><aside className="contact-card reveal"><p>TAICHUNG DAWN</p><h3>{t(content.fullName)}</h3><dl><div><dt>{t("電話")}</dt><dd><a href="tel:+886423227799">04-2322-7799</a></dd></div><div><dt>{t("辦公室")}</dt><dd>{t("台中市南屯區公益路二段 61 號")}<br/>{t("13 樓之 1")}</dd></div><div><dt>{t("合作洽詢")}</dt><dd>{t("歡迎來電洽詢公益合作與活動資訊")}</dd></div></dl><a href="https://www.facebook.com/groups/376285655902508/" target="_blank">{t("Facebook 社群 ↗")}</a></aside><aside className="contact-card association-contact"><p>{t("CHARITY PARTNER · 公益合作夥伴")}</p><h3>{t("中華存善")}<br/>{t("慢飛天使關懷協會")}</h3><dl><div><dt>{t("聯繫電話")}</dt><dd><a href="tel:+886423200368">04-2320-0368</a></dd></div><div><dt>{t("協會位置")}</dt><dd><a href="https://www.google.com/maps/search/?api=1&amp;query=台中市中區光復路134號" target="_blank" rel="noopener noreferrer">{t("台中市中區光復路 134 號")}<br/><span className="association-map-label">{t("開啟 Google 地圖 ↗")}</span></a></dd></div><div><dt>{t("捐贈洽詢")}</dt><dd>{t("公益捐助、物資支持與關懷服務")}</dd></div><div><dt>{t("合作洽談")}</dt><dd>{t("公益活動協作、在地關懷與資源串聯")}</dd></div></dl><a className="association-facebook" href="https://www.facebook.com/cunshan.org/" target="_blank" rel="noopener noreferrer">{t("Facebook 官方粉絲專頁 ↗")}</a><p className="association-contact-note">{t("感謝每一份愛心與支持。捐贈及合作細節，請與協會確認。")}</p></aside></div>
    </section>

    <section className="charity-logo-section" id="charity-logo" aria-labelledby="charity-logo-title">
      <div className="section charity-logo-heading reveal"><div><p className="eyebrow">BRAND FOR GOOD · {t("公益識別")}</p><h2 id="charity-logo-title">{t("一雙手，成就更多愛與希望。")}</h2></div><p>{t("「手牽手・愛無限」以一個能被記住、也能被實際使用的公益符號，串聯每一次關懷、陪伴與共同參與。")}</p></div>
      <div className="section charity-logo-story reveal">
        <div className="charity-logo-display"><Image src="/media/brand/hand-in-hand-logo-transparent.png" alt={t("HAND IN HAND · LOVE WITHOUT LIMITS 公益 Logo")} width={1672} height={940} unoptimized/></div>
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
      <a href="https://dawn-7dq.pages.dev" aria-current="page"><small>{t("公益行動")}</small><b>{t("黎明公益網")}</b></a>
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
    <section className="concept-closing" id="concept-closing" aria-label={t("加入公益行動")}>
      <Image src="/media/site/taiwan-mountain-sunrise-banner.png" alt={t("台灣山林晨光")} fill sizes="100vw" unoptimized/>
      <div className="concept-closing-shade"/>
      <div className="concept-closing-title"><h2>{t("因為有你，")}<br/>{t("世界可以更好")}</h2><p>TOGETHER FOR A KINDER TOMORROW</p></div>
      <div className="concept-closing-action"><p>{t("黎明公益網，串連更多善意，")}<br/>{t("陪伴每一個需要的角落，")}<br/>{t("讓愛心沒有距離，讓希望持續發生。")}</p><a href="#actions">{t("加入公益行動　→")}</a></div>
      <span>{t("愛無界限")}<br/>{t("善的力量")}<br/>{t("一直都在 ♡")}</span>
    </section>
    <footer><a className="brand" href="#top"><span className="sun">✦</span><b>{t(content.name)}</b></a><p>© 2026 {t(content.name)} · {t("讓善意持續發生")}</p><p className="independent-notice">{t("獨立第三方公益紀實網站｜非台中黎明扶輪社官方網站")}</p><p>{t("內容更新 2026.09")}</p></footer>
    {photo && <div className="backdrop" onClick={()=>setPhoto(null)}><div className="photo-modal" onClick={e=>e.stopPropagation()}><button onClick={()=>setPhoto(null)} aria-label={t("關閉照片")}>×</button><Image src={photo[2]} alt={t(photo[1])} width={1500} height={1000} unoptimized/><div><p>{t(photo[0])}</p><h3>{t(photo[1])}</h3><small>{t(content.event.title)}・{t("活動實錄")}</small></div></div></div>}
  </main>;
}

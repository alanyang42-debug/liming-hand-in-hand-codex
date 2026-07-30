"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

// 日後更新網站，只要修改這份集中資料即可。
const content = {
  name: "黎明手牽手 愛無限",
  fullName: "台中黎明扶輪社",
  slogan: "手牽手，愛無限；因為有您，我們可以讓世界更美好。",
  intro: "串聯社友、眷屬與在地夥伴，從生活照護、教育支持到社區關懷，讓每一份善意真正抵達需要的地方。",
  stats: [
    [3, "項", "年度重點行動"],
    [2, "所", "服務合作單位"],
    [1, "隊", "支持偏鄉球隊"],
    [365, "天", "讓善意持續發生"],
  ] as const,
  timeline: [
    ["01", "生活照護", "改善照護環境", "攜手公益夥伴汰換社區家園老舊設備，讓陪伴落實在更安心、舒適的日常。"],
    ["02", "偏鄉關懷", "把資源送到需要的地方", "串聯社友、眷屬與在地力量，讓關懷不只是一次活動，而是一段持續同行的關係。"],
    ["03", "教育支持", "陪孩子勇敢追夢", "支持南投雙龍國小女足走上全國賽場，把每一份鼓勵化成孩子繼續奔跑的力量。"],
    ["∞", "未來進行式", "下一個故事，期待有您", "捐助、志工、物資或專業服務，每一種參與都能讓善意繼續向前。"],
  ] as const,
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
    text: "從烈日下的每一次奔跑，到場邊的一句加油，孩子們用勇氣、默契與不放棄的精神完成全國賽事。「黎明手牽手 愛無限」陪伴孩子走進更大的球場，也把每一份支持化成繼續前進的力量。",
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
  const [filter, setFilter] = useState("全部");
  const [photo, setPhoto] = useState<(typeof content.gallery)[number] | null>(null);
  const [guide, setGuide] = useState(false);
  const [menu, setMenu] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const filters = useMemo(() => ["全部", ...new Set(content.gallery.map(x => x[0]))], []);
  const photos = filter === "全部" ? content.gallery : content.gallery.filter(x => x[0] === filter);

  useEffect(() => {
    const ob = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("show")), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(x => ob.observe(x));
    const key = (e: KeyboardEvent) => e.key === "Escape" && (setPhoto(null), setGuide(false), setMenu(false));
    window.addEventListener("keydown", key);
    return () => { ob.disconnect(); window.removeEventListener("keydown", key); };
  }, []);

  const shareSite = async () => {
    const shareData = {
      title: "黎明手牽手 愛無限",
      text: "一起看見台中黎明扶輪社的公益行動，讓每一份善意成為改變。",
      url: window.location.origin,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        setShareStatus("連結已複製 ✓");
        window.setTimeout(() => setShareStatus(""), 2400);
      } else {
        setShareStatus("請複製網址列");
        window.setTimeout(() => setShareStatus(""), 2400);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareStatus("請稍後再試");
      window.setTimeout(() => setShareStatus(""), 2400);
    }
  };

  return <main>
    <div className="club-logo-strip" id="top">
      <Image src="/media/site/taichung-liming-rotary-logo-web.png" alt="國際扶輪3462地區・台中黎明扶輪社" width={2048} height={682} priority unoptimized/>
    </div>
    <header>
      <a className="brand" href="#top"><span className="sun">✦</span><span><b>{content.name}</b><small>HAND IN HAND · LOVE WITHOUT LIMITS</small></span></a>
      <nav className={menu ? "open" : ""}>
        <a href="#actions" onClick={() => setMenu(false)}>公益行動</a><a href="#timeline" onClick={() => setMenu(false)}>行動足跡</a><a href="#stories" onClick={() => setMenu(false)}>照片故事</a><a href="#football" onClick={() => setMenu(false)}>足球紀錄</a><a href="#contact" onClick={() => setMenu(false)}>加入行動</a>
      </nav>
      <a className="header-cta" href="#contact">一起行動 ↗</a>
      <button className="menu" aria-label="開啟選單" onClick={() => setMenu(!menu)}>☰</button>
    </header>

    <section className="hero">
      <WarmParticles/>
      <div className="hero-copy reveal">
        <p className="eyebrow">HAND IN HAND · 手牽手，愛無限</p>
        <h1>手牽手<br/><em>讓愛無限</em></h1>
        <p>{content.intro}</p>
        <div className="actions"><a className="btn gold" href="#actions">看見我們的行動 ↓</a><a className="btn outline" href="#contact">成為合作夥伴 ↗</a><button className="btn outline share-btn" type="button" onClick={shareSite} aria-live="polite">{shareStatus || "分享公益網站 ↗"}</button></div>
        <small><i/> 公益不是一場活動，而是一段長久的陪伴</small>
      </div>
      <div className="hero-art reveal">
        <figure><Image src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1400&q=85" alt="公益活動示意照片" width={900} height={1000} unoptimized/><figcaption>FEATURED ACTION<br/><b>社區家園・生活照護</b></figcaption></figure>
        <div className="mini"><Image src={content.actions[1].image} alt="南投雙龍國小女足全國賽事紀錄" width={400} height={500} unoptimized/></div>
        <div className="stamp">手牽手<br/><b>∞</b><br/>愛無限</div>
      </div>
    </section>

    <section className="stats" aria-label="成果統計">{content.stats.map(([v,u,l], i) => <div key={l} style={{"--stat-delay": `${i * 100}ms`} as CSSProperties}><Counter value={v} unit={u}/><p>{l}</p></div>)}</section>

    <section className="section actions-section" id="actions">
      <div className="heading reveal"><p className="eyebrow">OUR ACTIONS · 公益行動</p><h2>把關心，落實在<br/>每一個需要裡。</h2><p>聚焦照護、教育與社區串聯，讓資源精準抵達，也讓故事被更多人看見。</p></div>
      <div className="action-list">{content.actions.map((a,i) => <article className="action-card reveal" key={a.title}>
        <span>0{i+1}</span><div className="action-img"><Image src={a.image} alt={i === 0 ? "社區家園設備汰舊換新活動合影" : i === 1 ? "南投雙龍國小女足全國第七名合影" : `${a.title}示意照片`} width={650} height={430} unoptimized/><small>{i <= 1 ? "活動實錄" : "示意照片・可替換"}</small></div>
        <div><p className="tag">{a.tag}</p><h3>{a.title}</h3><p>{a.text}</p><b>✓ {a.result}</b></div>
      </article>)}</div>
    </section>

    <section className="timeline-section" id="timeline">
      <WarmParticles compact/>
      <div className="section">
        <div className="timeline-heading reveal">
          <div><p className="eyebrow">OUR JOURNEY · 行動足跡</p><h2>每一次伸手，<br/>都讓改變向前一步。</h2></div>
          <p>從生活照護、偏鄉關懷到教育支持，我們把善意串成一條持續前進的時間軸。</p>
        </div>
        <div className="timeline">
          {content.timeline.map((item, i) => <article className="timeline-item reveal" key={item[0]}>
            <div className="timeline-marker"><span>{item[0]}</span></div>
            <div className="timeline-copy">
              <p>{item[1]}</p>
              <h3>{item[2]}</h3>
              <small>{item[3]}</small>
            </div>
            <b>0{i + 1}</b>
          </article>)}
        </div>
      </div>
    </section>

    <section className="stories-section" id="stories">
      <div className="section">
        <div className="stories-heading reveal">
          <p className="eyebrow">STORIES BEHIND THE PHOTOS · 照片故事</p>
          <h2>照片留住一刻，<br/>故事讓感動繼續。</h2>
        </div>
        <div className="story-list">
          {content.stories.map((story, i) => <article className={`story reveal ${i % 2 ? "reverse" : ""}`} key={story.title}>
            <figure>
              <Image src={story.image} alt={story.alt} width={1200} height={820} unoptimized/>
              <span>0{i + 1}</span>
            </figure>
            <div>
              <p className="eyebrow">{story.eyebrow}</p>
              <h3>{story.title}</h3>
              <p>{story.text}</p>
              <a href={i === 0 ? "#actions" : "#gallery"}>{i === 0 ? "看見生活照護行動" : "觀看完整活動紀錄"} ↗</a>
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="football-feature" id="football">
      <div className="section football-grid">
        <div className="football-copy reveal">
          <p className="eyebrow">FOOTBALL DREAM · 足球公益紀錄</p>
          <p className="event-kicker">{content.event.subtitle}</p>
          <h2>{content.event.title}</h2>
          <div className="result-badge"><span>FINAL RESULT</span><b>{content.event.result}</b></div>
          <p>{content.event.text}</p>
          <a className="btn gold" href="#gallery">看完整活動相簿 ↓</a>
        </div>
        <div className="event-video reveal">
          <video controls playsInline preload="metadata" poster={content.event.poster} aria-label="114學年度小學生足球賽全國決賽活動影片">
            <source src={content.event.video} type="video/mp4"/>
            您的瀏覽器目前無法播放這段影片。
          </video>
          <div><span>EVENT FILM</span><b>奔跑的每一步，都有人在身後加油</b></div>
        </div>
      </div>
      <div className="section football-reel reveal">
        <div className="reel-copy">
          <p className="eyebrow">NEW SHORT FILM · 新增影音</p>
          <p className="event-kicker">13 秒精彩紀錄</p>
          <h2>2026 雙龍國小<br/>足球全國賽</h2>
          <p>重溫孩子們在全國賽場上的勇氣、笑容與團隊精神；每一次奔跑，都有滿滿的支持陪伴。</p>
        </div>
        <div className="reel-video">
          <video controls playsInline preload="metadata" poster={content.event.shortPoster} aria-label="2026雙龍國小足球全國賽短影音">
            <source src={content.event.shortVideo} type="video/mp4"/>
            您的瀏覽器目前無法播放這段影片。
          </video>
        </div>
      </div>
      <div className="section instagram-reel reveal" id="instagram-reel">
        <div className="instagram-frame">
          <iframe
            src={content.event.instagramEmbed}
            title="雙龍國小足球全國賽 Instagram Reel"
            loading="lazy"
            allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
        <div className="instagram-copy">
          <p className="eyebrow">FOLLOW THE STORY · IG 影音</p>
          <p className="event-kicker">Instagram Reel</p>
          <h2>一起為孩子的<br/>每一步喝采</h2>
          <p>從公益網站直接觀看最新賽事影音；若您的瀏覽器限制 Instagram 嵌入內容，也可前往原貼文觀看。</p>
          <a className="btn gold" href={content.event.instagramUrl} target="_blank" rel="noreferrer">在 Instagram 觀看 ↗</a>
        </div>
      </div>
      <div className="section threads-reel reveal" id="threads-reel">
        <div className="threads-copy">
          <p className="eyebrow">MORE MOMENTS · THREADS 影音</p>
          <p className="event-kicker">Threads Post</p>
          <h2>讓每一份感動<br/>繼續被看見</h2>
          <p>透過 Threads 分享球場上的精彩時刻，也讓更多人看見孩子們勇敢追夢的身影。</p>
          <a className="btn gold" href={content.event.threadsUrl} target="_blank" rel="noreferrer">在 Threads 觀看 ↗</a>
        </div>
        <div className="threads-frame">
          <blockquote
            className="text-post-media"
            data-text-post-permalink={content.event.threadsUrl}
            data-text-post-version="0"
          >
            <a href={content.event.threadsUrl} target="_blank" rel="noreferrer">在 Threads 觀看這則影音</a>
          </blockquote>
        </div>
      </div>
      <Script async src="https://www.threads.com/embed.js" strategy="afterInteractive" />
    </section>

    <section className="gallery-section" id="gallery">
      <div className="section gallery-head reveal"><div><p className="eyebrow">MOMENTS OF COURAGE · 賽事相簿</p><h2>每張照片，都是<br/>勇氣發生的證明。</h2><p className="gallery-intro">共 19 張活動紀錄，依賽事氛圍、場上精彩、團隊時刻與成果紀錄分類整理。</p></div><div className="filters">{filters.map(f => <button className={filter===f?"active":""} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div></div>
      <div className="section gallery">{photos.map((p,i) => <button className={`photo p${i%6}`} key={p[2]} onClick={()=>setPhoto(p)} aria-label={`放大查看${p[1]}`}><Image src={p[2]} alt={p[1]} width={1000} height={700} unoptimized/><span><i>{p[0]}</i><b>{p[1]}</b><em>＋</em></span></button>)}</div>
    </section>

    <section className="section impact" id="impact">
      <div className="quote reveal"><span>“</span><h2>{content.slogan}</h2><p>— {content.fullName}</p></div>
      <div className="partner-head reveal"><p className="eyebrow">TOGETHER, WE GO FURTHER · 合作夥伴</p><h2>一起走，讓愛更有力量。</h2></div>
      <div className="partners reveal">{content.partners.map(p => <article key={p[1]}><span>{p[0]}</span><p>{p[2]}</p><h3>{p[1]}</h3><small>連結專業與資源，讓公益行動走得更穩、更遠。</small></article>)}</div>
    </section>

    <section className="action-banner" aria-label="捐助或志工行動">
      <WarmParticles compact/>
      <div className="action-banner-copy reveal">
        <p className="eyebrow">TAKE ACTION · 一起行動</p>
        <h2>您的一份心意，<br/>可以成為下一個改變。</h2>
        <p>無論是公益捐助、物資支持、專業服務或親自投入志工行動，我們都期待與您並肩同行。</p>
        <div className="action-banner-buttons">
          <a className="btn donate" href="tel:+886423227799"><span>♥</span> 我要捐助</a>
          <a className="btn volunteer" href="#contact"><span>✦</span> 加入志工</a>
        </div>
        <small>實際捐助方式與志工活動名額，請與台中黎明扶輪社聯絡確認。</small>
      </div>
    </section>

    <section className="contact" id="contact">
      <div className="reveal"><p className="eyebrow">LET’S CREATE IMPACT · 聯絡我們</p><h2>下一個好故事，<br/><em>期待有您同行。</em></h2><p>企業合作、物資支持、專業服務或活動參與，都歡迎與我們聊聊。</p><div className="actions"><a className="btn light" href="tel:+886423227799">立即來電 ↗</a><a className="btn outline" href="https://dawnrotaryclub.tw/" target="_blank">官方網站 ↗</a></div></div>
      <aside className="contact-card reveal"><p>TAICHUNG DAWN</p><h3>{content.fullName}</h3><dl><div><dt>電話</dt><dd><a href="tel:+886423227799">04-2322-7799</a></dd></div><div><dt>辦公室</dt><dd>台中市南屯區公益路二段 61 號<br/>13 樓之 1</dd></div><div><dt>合作洽詢</dt><dd>歡迎來電洽詢公益合作與活動資訊</dd></div></dl><a href="https://www.facebook.com/groups/376285655902508/" target="_blank">Facebook 社群 ↗</a></aside>
    </section>

    <footer><a className="brand" href="#top"><span className="sun">✦</span><b>{content.name}</b></a><p>© 2026 {content.fullName} · 讓善意持續發生</p><p>內容更新 2026.07</p></footer>
    <button className="guide-btn" onClick={()=>setGuide(true)}>✦ 內容更新指南</button>

    {photo && <div className="backdrop" onClick={()=>setPhoto(null)}><div className="photo-modal" onClick={e=>e.stopPropagation()}><button onClick={()=>setPhoto(null)} aria-label="關閉照片">×</button><Image src={photo[2]} alt={photo[1]} width={1500} height={1000} unoptimized/><div><p>{photo[0]}</p><h3>{photo[1]}</h3><small>{content.event.title}・活動實錄</small></div></div></div>}
    {guide && <div className="backdrop" onClick={()=>setGuide(false)}><aside className="guide" onClick={e=>e.stopPropagation()}><button onClick={()=>setGuide(false)}>×</button><p className="eyebrow">EASY TO UPDATE</p><h2>一處更新，<br/>全站同步。</h2><p>活動、數字、照片與合作夥伴已集中管理；替換內容後，版面與互動會自動保留。</p><ol><li><b>01</b><span><strong>活動資訊</strong><small>新增標題、摘要與成果</small></span></li><li><b>02</b><span><strong>照片相簿</strong><small>替換照片與分類說明</small></span></li><li><b>03</b><span><strong>成果夥伴</strong><small>調整數字與合作單位</small></span></li></ol><a className="btn gold" href="#contact" onClick={()=>setGuide(false)}>準備下一次活動 ↗</a></aside></div>}
  </main>;
}

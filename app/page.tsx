"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

// 日後更新網站，只要修改這份集中資料即可。
const content = {
  name: "黎明手牽手 愛無限",
  fullName: "台中黎明扶輪社",
  slogan: "手牽手，愛無限；因為您可以讓世界更美好",
  intro: "串聯社友、眷屬與在地夥伴，從生活照護、教育支持到社區關懷，讓每一份善意真正抵達需要的地方。",
  stats: [
    [3, "項", "年度重點行動"],
    [2, "所", "服務合作單位"],
    [1, "隊", "支持偏鄉球隊"],
    [365, "天", "讓善意持續發生"],
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

export default function Home() {
  const [filter, setFilter] = useState("全部");
  const [photo, setPhoto] = useState<(typeof content.gallery)[number] | null>(null);
  const [guide, setGuide] = useState(false);
  const [menu, setMenu] = useState(false);
  const filters = useMemo(() => ["全部", ...new Set(content.gallery.map(x => x[0]))], []);
  const photos = filter === "全部" ? content.gallery : content.gallery.filter(x => x[0] === filter);

  useEffect(() => {
    const ob = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("show")), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(x => ob.observe(x));
    const key = (e: KeyboardEvent) => e.key === "Escape" && (setPhoto(null), setGuide(false), setMenu(false));
    window.addEventListener("keydown", key);
    return () => { ob.disconnect(); window.removeEventListener("keydown", key); };
  }, []);

  return <main>
    <div className="club-logo-strip" id="top">
      <Image src="/media/site/taichung-liming-rotary-logo-web.png" alt="國際扶輪3462地區・台中黎明扶輪社" width={2048} height={682} priority unoptimized/>
    </div>
    <header>
      <a className="brand" href="#top"><span className="sun">✦</span><span><b>{content.name}</b><small>HAND IN HAND · LOVE WITHOUT LIMITS</small></span></a>
      <nav className={menu ? "open" : ""}>
        <a href="#actions" onClick={() => setMenu(false)}>公益行動</a><a href="#football" onClick={() => setMenu(false)}>足球紀錄</a><a href="#gallery" onClick={() => setMenu(false)}>活動相簿</a><a href="#impact" onClick={() => setMenu(false)}>成果夥伴</a><a href="#contact" onClick={() => setMenu(false)}>聯絡我們</a>
      </nav>
      <a className="header-cta" href="#contact">一起行動 ↗</a>
      <button className="menu" aria-label="開啟選單" onClick={() => setMenu(!menu)}>☰</button>
    </header>

    <section className="hero">
      <div className="hero-copy reveal">
        <p className="eyebrow">HAND IN HAND · 手牽手，愛無限</p>
        <h1>手牽手<br/><em>讓愛無限</em></h1>
        <p>{content.intro}</p>
        <div className="actions"><a className="btn gold" href="#actions">看見我們的行動 ↓</a><a className="btn outline" href="#contact">成為合作夥伴 ↗</a></div>
        <small><i/> 公益不是一場活動，而是一段長久的陪伴</small>
      </div>
      <div className="hero-art reveal">
        <figure><Image src={content.actions[0].image} alt="社區家園設備汰舊換新活動合影" width={900} height={1000} unoptimized/><figcaption>FEATURED ACTION<br/><b>社區家園・生活照護</b></figcaption></figure>
        <div className="mini"><Image src={content.actions[0].imageSecondary} alt="台中黎明扶輪社與公益夥伴活動合影" width={400} height={500} unoptimized/></div>
        <div className="stamp">手牽手<br/><b>∞</b><br/>愛無限</div>
      </div>
    </section>

    <section className="stats" aria-label="成果統計">{content.stats.map(([v,u,l]) => <div key={l}><Counter value={v} unit={u}/><p>{l}</p></div>)}</section>

    <section className="section actions-section" id="actions">
      <div className="heading reveal"><p className="eyebrow">OUR ACTIONS · 公益行動</p><h2>把關心，落實在<br/>每一個需要裡。</h2><p>聚焦照護、教育與社區串聯，讓資源精準抵達，也讓故事被更多人看見。</p></div>
      <div className="action-list">{content.actions.map((a,i) => <article className="action-card reveal" key={a.title}>
        <span>0{i+1}</span><div className="action-img"><Image src={a.image} alt={i === 0 ? "社區家園設備汰舊換新活動合影" : i === 1 ? "南投雙龍國小女足全國第七名合影" : `${a.title}示意照片`} width={650} height={430} unoptimized/><small>{i <= 1 ? "活動實錄" : "示意照片・可替換"}</small></div>
        <div><p className="tag">{a.tag}</p><h3>{a.title}</h3><p>{a.text}</p><b>✓ {a.result}</b></div>
      </article>)}</div>
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

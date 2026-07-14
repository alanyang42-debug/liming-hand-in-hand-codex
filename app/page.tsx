"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

// 日後更新網站，只要修改這份集中資料即可。
const content = {
  name: "黎明手牽手",
  fullName: "台中黎明扶輪社",
  slogan: "手牽手，愛無限",
  intro: "串聯社友、眷屬與在地夥伴，從生活照護、教育支持到社區關懷，讓每一份善意真正抵達需要的地方。",
  stats: [
    [3, "項", "年度重點行動"],
    [2, "所", "服務合作單位"],
    [1, "隊", "支持偏鄉球隊"],
    [365, "天", "讓善意持續發生"],
  ] as const,
  actions: [
    { tag: "生活照護", title: "社區家園設備汰舊換新", text: "攜手中華存善慢飛天使關懷協會，協助彰化慈愛教養院改善老舊空調設備，讓照護空間更舒適安心。", result: "改善日常照護環境", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1400&q=85" },
    { tag: "教育支持", title: "陪伴偏鄉孩子勇敢追夢", text: "支持南投雙龍國小足球隊參與全國 U12 賽事，讓孩子在球場上累積自信、團隊精神與更大的夢想。", result: "支持偏鄉足球隊", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1400&q=85" },
    { tag: "社區串聯", title: "手牽手・愛無限", text: "集結扶輪社友、夫人與在地夥伴的專業與資源，讓單次捐助延伸為彼此陪伴、長期共好的公益行動。", result: "串聯跨界公益力量", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1400&q=85" },
  ],
  gallery: [
    ["關懷服務", "讓照護空間更安心", "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1400&q=85"],
    ["教育支持", "球場上的勇氣與夢想", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1400&q=85"],
    ["社區串聯", "因為同行，善意走得更遠", "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85"],
    ["教育支持", "每一次練習都靠近夢想", "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1400&q=85"],
    ["關懷服務", "服務，從看見需要開始", "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1400&q=85"],
    ["社區串聯", "把專業變成溫柔的力量", "https://images.unsplash.com/photo-1520857014576-2c4f4c972b57?auto=format&fit=crop&w=1400&q=85"],
  ] as const,
  partners: [
    ["存善", "中華存善慢飛天使關懷協會", "關懷服務夥伴"],
    ["慈愛", "彰化慈愛教養院", "服務合作單位"],
    ["雙龍", "南投雙龍國小足球隊", "教育支持夥伴"],
    ["＋", "期待與您同行", "企業・社團・個人"],
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
    <header>
      <a className="brand" href="#top"><span className="sun">✦</span><span><b>{content.name}</b><small>HAND IN HAND · LOVE WITHOUT LIMITS</small></span></a>
      <nav className={menu ? "open" : ""}>
        <a href="#actions" onClick={() => setMenu(false)}>公益行動</a><a href="#gallery" onClick={() => setMenu(false)}>活動相簿</a><a href="#impact" onClick={() => setMenu(false)}>成果夥伴</a><a href="#contact" onClick={() => setMenu(false)}>聯絡我們</a>
      </nav>
      <a className="header-cta" href="#contact">一起行動 ↗</a>
      <button className="menu" aria-label="開啟選單" onClick={() => setMenu(!menu)}>☰</button>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy reveal">
        <p className="eyebrow">HAND IN HAND · 手牽手，愛無限</p>
        <h1>手牽手<br/><em>讓愛無限</em></h1>
        <p>{content.intro}</p>
        <div className="actions"><a className="btn gold" href="#actions">看見我們的行動 ↓</a><a className="btn outline" href="#contact">成為合作夥伴 ↗</a></div>
        <small><i/> 公益不是一場活動，而是一段長久的陪伴</small>
      </div>
      <div className="hero-art reveal">
        <figure><Image src={content.actions[0].image} alt="公益活動示意照片" width={900} height={1000} unoptimized/><figcaption>FEATURED ACTION<br/><b>社區家園・生活照護</b></figcaption></figure>
        <div className="mini"><Image src={content.actions[1].image} alt="兒童關懷示意照片" width={400} height={500} unoptimized/></div>
        <div className="stamp">手牽手<br/><b>∞</b><br/>愛無限</div>
      </div>
    </section>

    <section className="stats" aria-label="成果統計">{content.stats.map(([v,u,l]) => <div key={l}><Counter value={v} unit={u}/><p>{l}</p></div>)}</section>

    <section className="section actions-section" id="actions">
      <div className="heading reveal"><p className="eyebrow">OUR ACTIONS · 公益行動</p><h2>把關心，落實在<br/>每一個需要裡。</h2><p>聚焦照護、教育與社區串聯，讓資源精準抵達，也讓故事被更多人看見。</p></div>
      <div className="action-list">{content.actions.map((a,i) => <article className="action-card reveal" key={a.title}>
        <span>0{i+1}</span><div className="action-img"><Image src={a.image} alt={`${a.title}示意照片`} width={650} height={430} unoptimized/><small>示意照片・可替換</small></div>
        <div><p className="tag">{a.tag}</p><h3>{a.title}</h3><p>{a.text}</p><b>✓ {a.result}</b></div>
      </article>)}</div>
    </section>

    <section className="gallery-section" id="gallery">
      <div className="section gallery-head reveal"><div><p className="eyebrow">MOMENTS OF SERVICE · 活動相簿</p><h2>每張照片，都是<br/>善意發生的證明。</h2></div><div className="filters">{filters.map(f => <button className={filter===f?"active":""} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div></div>
      <div className="section gallery">{photos.map((p,i) => <button className={`photo p${i%6}`} key={p[1]} onClick={()=>setPhoto(p)} aria-label={`放大查看${p[1]}`}><Image src={p[2]} alt={`${p[1]}示意照片`} width={1000} height={700} unoptimized/><small>示意照片</small><span><i>{p[0]}</i><b>{p[1]}</b><em>＋</em></span></button>)}</div>
    </section>

    <section className="section impact" id="impact">
      <div className="quote reveal"><span>“</span><h2>{content.slogan}；<br/>一起把善意變成改變。</h2><p>— {content.fullName}</p></div>
      <div className="partner-head reveal"><p className="eyebrow">TOGETHER, WE GO FURTHER · 合作夥伴</p><h2>一起走，讓愛更有力量。</h2></div>
      <div className="partners reveal">{content.partners.map(p => <article key={p[1]}><span>{p[0]}</span><p>{p[2]}</p><h3>{p[1]}</h3><small>連結專業與資源，讓公益行動走得更穩、更遠。</small></article>)}</div>
    </section>

    <section className="contact" id="contact">
      <div className="reveal"><p className="eyebrow">LET’S CREATE IMPACT · 聯絡我們</p><h2>下一個好故事，<br/><em>期待有您同行。</em></h2><p>企業合作、物資支持、專業服務或活動參與，都歡迎與我們聊聊。</p><div className="actions"><a className="btn light" href="tel:+886423227799">立即來電 ↗</a><a className="btn outline" href="https://dawnrotaryclub.tw/" target="_blank">官方網站 ↗</a></div></div>
      <aside className="contact-card reveal"><p>TAICHUNG DAWN</p><h3>{content.fullName}</h3><dl><div><dt>電話</dt><dd><a href="tel:+886423227799">04-2322-7799</a></dd></div><div><dt>辦公室</dt><dd>台中市南屯區公益路二段 61 號<br/>13 樓之 1</dd></div><div><dt>合作洽詢</dt><dd>歡迎來電洽詢公益合作與活動資訊</dd></div></dl><a href="https://www.facebook.com/groups/376285655902508/" target="_blank">Facebook 社群 ↗</a></aside>
    </section>

    <footer><a className="brand" href="#top"><span className="sun">✦</span><b>{content.name}</b></a><p>© 2026 {content.fullName} · 讓善意持續發生</p><p>內容更新 2026.07</p></footer>
    <button className="guide-btn" onClick={()=>setGuide(true)}>✦ 內容更新指南</button>

    {photo && <div className="backdrop" onClick={()=>setPhoto(null)}><div className="photo-modal" onClick={e=>e.stopPropagation()}><button onClick={()=>setPhoto(null)}>×</button><Image src={photo[2]} alt={photo[1]} width={1500} height={1000} unoptimized/><div><p>{photo[0]}</p><h3>{photo[1]}</h3><small>示意照片，可替換為實際活動照片</small></div></div></div>}
    {guide && <div className="backdrop" onClick={()=>setGuide(false)}><aside className="guide" onClick={e=>e.stopPropagation()}><button onClick={()=>setGuide(false)}>×</button><p className="eyebrow">EASY TO UPDATE</p><h2>一處更新，<br/>全站同步。</h2><p>活動、數字、照片與合作夥伴已集中管理；替換內容後，版面與互動會自動保留。</p><ol><li><b>01</b><span><strong>活動資訊</strong><small>新增標題、摘要與成果</small></span></li><li><b>02</b><span><strong>照片相簿</strong><small>替換照片與分類說明</small></span></li><li><b>03</b><span><strong>成果夥伴</strong><small>調整數字與合作單位</small></span></li></ol><a className="btn gold" href="#contact" onClick={()=>setGuide(false)}>準備下一次活動 ↗</a></aside></div>}
  </main>;
}

import Image from "next/image";
import Link from "next/link";

const photos = [
  ["/media/hand-in-hand-10-years/01.jpg", "十年有成拍攝現場紀錄"],
  ["/media/hand-in-hand-10-years/02.jpg", "黎明社友與教育夥伴於太平國小相聚"],
  ["/media/hand-in-hand-10-years/03.jpg", "手牽手英語教育陪伴成果紀錄"],
] as const;

export default function TenYearsPage() {
  return <main className="decade-page">
    <header className="decade-header"><Link href="/" className="decade-brand"><Image src="/media/brand/hand-in-hand-mark-transparent.png" alt="手牽手愛無限公益 Logo" width={700} height={288} unoptimized/><span>黎明公益網</span></Link><Link href="/">回到公益網首頁 ←</Link></header>
    <section className="decade-hero"><div className="decade-hero-copy"><p>MILESTONE STORY · EDUCATION</p><h1>手牽手<br/><em>十年有成</em></h1><blockquote>十年，不只是時間的累積；<br/>是一次次準時出現，把陪伴變成孩子相信自己的力量。</blockquote><div><span>教育陪伴</span><span>太平國小</span><span>十年紀錄</span></div></div><figure><Image src="/media/hand-in-hand-10-years/01.jpg" alt="台中黎明扶輪社手牽手十年有成拍攝紀錄" width={1400} height={930} priority unoptimized/><figcaption>TAIPING ELEMENTARY SCHOOL<br/><b>2024.12.16</b></figcaption></figure></section>
    <section className="decade-intro"><div><p>10 YEARS · 一段長久的陪伴</p><h2>從一堂英語課，<br/>走成十年的教育承諾。</h2></div><div><p>「手牽手提升弱勢兒童英語程度」計畫，串聯台中黎明扶輪社、學校與教育志工，持續陪伴孩子建立英語能力與學習自信。</p><p>十年有成的意義，不只在成果數字，而在每一次課堂相遇、每一份不間斷的支持，以及孩子逐漸相信自己也能走向更寬廣世界的眼神。</p></div></section>
    <section className="decade-values"><article><b>01</b><p>持續陪伴</p><h3>公益不是一次抵達</h3><span>穩定、長期地回到孩子身邊，讓關係成為支持成長的根基。</span></article><article><b>02</b><p>教育支持</p><h3>讓學習多一種可能</h3><span>以英語教育打開視野，也陪孩子練習表達、建立自信。</span></article><article><b>03</b><p>共同成長</p><h3>每一雙手彼此成就</h3><span>社友、教師、志工與孩子同行，讓付出成為雙向的學習。</span></article></section>
    <section className="decade-gallery"><div className="decade-gallery-title"><p>PHOTO RECORD · 活動實錄</p><h2>鏡頭留下的，<br/>是十年同行的溫度。</h2></div><div className="decade-photo-grid">{photos.map(([src, alt], index) => <figure key={src}><Image src={src} alt={alt} width={1200} height={800} unoptimized/><span>0{index + 1}</span></figure>)}</div><div className="decade-source"><p>第514次例會・手牽手十年有成拍攝</p><span>拍攝地點｜臺中市北區太平國民小學　拍攝日期｜2024 年 12 月 16 日</span><a href="https://dawnrotaryclub.tw/index.php?ID=882&mode=gallery_album" target="_blank" rel="noreferrer">前往黎明扶輪社原始活動相簿 ↗</a></div></section>
    <section className="decade-closing"><Image src="/media/brand/hand-in-hand-mark-transparent.png" alt="" width={700} height={288} aria-hidden="true" unoptimized/><p>HAND IN HAND · LOVE WITHOUT LIMITS</p><h2>十年是一座里程碑，<br/>也是下一段陪伴的開始。</h2><Link href="/">繼續看見黎明公益行動 ↗</Link></section>
  </main>;
}

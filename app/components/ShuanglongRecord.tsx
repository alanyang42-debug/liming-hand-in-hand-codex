type Lang = "zh" | "en" | "ja" | "ko";
const copy = {
  zh: ["青少年培育 × 偏鄉關懷", "足球築夢・希望啟航", "2026 年 9 月 10 日，台中黎明扶輪社走進南投縣信義鄉雙龍國小，集結社友與夥伴的愛心，支持孩子的足球學習，也將物資與關懷送進偏鄉。", "從球隊受贈、師生交流到大家的合影，每一個畫面，都留下共同付出的足跡。謝謝學校、社友與所有支持夥伴，陪伴孩子累積自信、勇敢追夢。", "閱讀當日新聞報導 ↗", "活動現場・一起留下公益足跡", "過去的努力，成為今天的力量；有您同行，未來我們可以做得更多、更好。", "活動照片紀錄"],
  en: ["Youth development × Rural care", "Football dreams, new hope", "On September 10, 2026, Taichung Dawn Rotary Club visited Shuanglong Elementary School in Xinyi Township, Nantou, bringing members and partners together to support football learning and deliver supplies and care.", "Equipment presentations, exchanges with students and teachers, and group photographs record this shared effort. Thank you to the school and every partner helping children grow in confidence.", "Read the event news report ↗", "Together at the community service event", "With your support, we can continue to do more for children and communities.", "Event photo record"],
  ja: ["青少年育成 × 地域への支援", "サッカーで夢と希望を育む", "2026年9月10日、台中黎明ロータリークラブは南投県信義郷の双龍小学校を訪問。会員と協力者の思いをつなぎ、子どもたちのサッカー学習を支え、物資と温かな応援を届けました。", "用品の贈呈、児童や先生との交流、記念写真に、ともに取り組んだ足跡を残しました。学校とすべての協力者の皆さまに感謝します。", "当日のニュース記事を読む ↗", "ともに残す公益活動の足跡", "皆さまとともに、これからも子どもたちと地域を支えていきます。", "活動写真記録"],
  ko: ["청소년 성장 × 지역 돌봄", "축구로 키우는 꿈과 희망", "2026년 9월 10일, 타이중 리밍 로타리클럽은 난터우현 신이향의 솽룽초등학교를 방문했습니다. 회원과 협력자들의 마음을 모아 아이들의 축구 학습을 지원하고 물품과 따뜻한 응원을 전했습니다.", "용품 전달, 학생·교사와의 교류, 단체사진에 함께한 노력을 담았습니다. 학교와 모든 협력자께 감사드립니다.", "당일 뉴스 기사 보기 ↗", "함께 남기는 봉사의 발자취", "여러분과 함께 아이들과 지역을 위해 더 많은 일을 이어가겠습니다.", "행사 사진 기록"]
};
const photos = ["1000094025.jpg", "1000094053.jpg", "1000094011.jpg", "1000094019.jpg", "1000094055.jpg", "1000094051.jpg"];
export default function ShuanglongRecord({lang = "zh"}: {lang?: Lang}) {
  const t = copy[lang];
  return <section className="preparation-record" id="shuanglong-20260910" aria-labelledby="shuanglong-title"><div className="preparation-inner">
    <div className="shuanglong-heading"><div className="shuanglong-title-panel"><div className="shuanglong-meta"><time dateTime="2026-09-10">2026.09.10</time><span>{t[0]}</span></div><h2 id="shuanglong-title" className={lang === "zh" ? "shuanglong-title-zh" : ""}>{lang === "zh" ? <><strong>足球築夢</strong><em>希望啟航</em></> : t[1]}</h2></div><div className="shuanglong-intro"><p>{t[2]}</p><p>{t[3]}</p><p><a className="btn" href="https://www.ctee.com.tw/news/20260910701521-431208" target="_blank" rel="noopener noreferrer">{t[4]}</a></p></div></div>
    <figure><a href={`/media/shuanglong-20260910/${photos[0]}`} target="_blank" rel="noopener noreferrer"><img src={`/media/shuanglong-20260910/${photos[0]}`} alt={t[5]} width="1536" height="1152" loading="lazy" /></a><figcaption>{t[5]}</figcaption></figure>
    <div className="preparation-gallery">{photos.slice(1).map((file,i)=><figure key={file}><a href={`/media/shuanglong-20260910/${file}`} target="_blank" rel="noopener noreferrer"><img src={`/media/shuanglong-20260910/${file}`} alt={`${t[7]} ${i+2}`} loading="lazy" /></a><figcaption>{t[7]} · {String(i+2).padStart(2,"0")}</figcaption></figure>)}</div>
    <footer className="preparation-thanks"><p>{t[6]}</p></footer>
  </div></section>;
}

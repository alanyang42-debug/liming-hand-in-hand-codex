type Lang = "zh" | "en" | "ja" | "ko";

const copy = {
  zh: { tag: "2026.09.08・活動籌備紀錄", title: "因為一起投入，活動還沒開始，溫暖已經發生。", intro: "9 月 8 日，我們與中華存善慢飛天使關懷協會理事們再次相聚，逐項討論 9／19「手牽手・愛無限」活動流程與任務分配。席間充分感受到每位理事的熱情、活力與真誠支持，也讓所有籌備工作更加踏實。", birthday: "更溫暖的是，適逢其中一位理事生日將近，夥伴特別準備蛋糕與大家分享。會議桌上的笑容與祝福，讓緊湊的籌備時光多了一份如家人般的溫度，也為活動注入滿滿的正能量。", captions: ["圍桌交流活動流程，逐項確認執行細節。", "凝聚共識、分配任務，為 9／19 的相聚做好準備。", "生日蛋糕與真摯祝福，留下最溫暖的籌備記憶。"], thanks: "誠摯感謝每一個協力單位，以及每一位熱心公益的合作夥伴。因為大家願意牽起彼此的手，善意才能匯聚成力量。期待活動順利圓滿，也祝福大家健康、平安、快樂。" },
  en: { tag: "2026.09.08 · Event preparation", title: "Before the event begins, warmth is already growing.", intro: "On September 8, we met with the board members of the Cunshan association to review the September 19 program and divide responsibilities. Their energy, enthusiasm and wholehearted support gave the team even greater confidence.", birthday: "A thoughtful birthday cake for a board member added an especially warm moment. The smiles and blessings around the table brought a family-like spirit to the busy preparations and filled the gathering with positive energy.", captions: ["Reviewing the program and confirming key details together.", "Sharing responsibilities and preparing for September 19.", "A birthday cake and heartfelt wishes made the meeting especially memorable."], thanks: "Our sincere thanks to every participating organization and every caring partner. By joining hands, kindness becomes action. May the event be a joyful success, and may everyone enjoy health and happiness." },
  ja: { tag: "2026.09.08・イベント準備記録", title: "ともに取り組むことで、開催前から温かさが生まれています。", intro: "9月8日、中華存善慢飛天使關懷協會の理事の皆さまと、9月19日「手牽手・愛無限」の進行と役割分担を確認しました。皆さまの情熱、活力、心強い支えを感じ、準備への思いを一つにしました。", birthday: "誕生日を迎える理事のために用意されたケーキも、会議に温かなひとときを添えました。笑顔と祝福に包まれ、忙しい準備の時間にも家族のような温もりと前向きな力が満ちました。", captions: ["進行内容を囲んで話し合い、実施の細部を確認。", "役割を分担し、9月19日の集いに向けて準備。", "ケーキと心からの祝福が残した温かな準備の思い出。"], thanks: "すべての協力団体、そして公益に心を寄せるすべての皆さまに心より感謝申し上げます。手を取り合うことで、思いやりは力になります。イベントの成功と、皆さまの健康と幸せを願っています。" },
  ko: { tag: "2026.09.08 · 행사 준비 기록", title: "함께 마음을 모으니 행사 전부터 따뜻함이 피어납니다.", intro: "9월 8일, 중화춘산 협회 이사님들과 만나 9월 19일 ‘손에 손잡고·끝없는 사랑’의 진행 순서와 역할을 확인했습니다. 모든 분의 열정과 활기, 진심 어린 응원 속에서 준비의 마음을 하나로 모았습니다.", birthday: "생일을 앞둔 한 이사님을 위해 마련한 케이크는 회의에 특별한 온기를 더했습니다. 웃음과 축복이 바쁜 준비 시간에 가족 같은 따뜻함과 긍정의 에너지를 채워 주었습니다.", captions: ["행사 흐름과 세부 실행 내용을 함께 확인했습니다.", "역할을 나누고 9월 19일 만남을 준비했습니다.", "생일 케이크와 진심 어린 축복이 남긴 따뜻한 기억."], thanks: "함께해 주신 모든 기관과 공익 파트너께 진심으로 감사드립니다. 서로 손을 맞잡을 때 선한 마음은 큰 힘이 됩니다. 행사의 성공과 모두의 건강, 평안을 기원합니다." },
} as const;

const attendanceNote: Record<Lang, string> = {
  zh: "當日共有十多位理監事與會；照片為過程紀錄，未能拍齊全體與會者，敬請海涵。",
  en: "More than ten directors and supervisors attended. These photos document moments from the meeting and do not include every attendee; thank you for your understanding.",
  ja: "当日は10名を超える理事・監事が出席しました。写真は会議中の記録で、出席者全員を撮影できておりません。何卒ご了承ください。",
  ko: "당일 10여 명이 넘는 이사·감사님이 참석했습니다. 사진은 회의 과정의 일부 기록으로 모든 참석자를 담지 못한 점 너른 양해 부탁드립니다.",
};

export default function PreparationRecord({ lang = "zh" }: { lang?: Lang }) {
  const t = copy[lang] ?? copy.zh;
  return <section className="preparation-record" id="preparation-20260908" aria-labelledby="preparation-title"><div className="preparation-inner">
    <header className="preparation-heading"><span>{t.tag}</span><h2 id="preparation-title">{t.title}</h2><p>{t.intro}</p><p className="preparation-note">{attendanceNote[lang]}</p></header>
    <div className="preparation-gallery">{["01-discussion.jpg", "02-task-planning.jpg"].map((src, i) => <figure key={src}><img src={`/media/preparation-20260908/${src}`} alt={t.captions[i]} width="1536" height="864" loading="lazy" /><figcaption>{t.captions[i]}</figcaption></figure>)}</div>
    <div className="preparation-heart"><figure><img src="/media/preparation-20260908/03-birthday-blessing.jpg" alt={t.captions[2]} width="1536" height="1152" loading="lazy" /><figcaption>{t.captions[2]}</figcaption></figure><div><span aria-hidden="true">♥</span><p>{t.birthday}</p></div></div>
    <footer className="preparation-thanks"><small>WITH GRATITUDE</small><p>{t.thanks}</p></footer>
  </div></section>;
}

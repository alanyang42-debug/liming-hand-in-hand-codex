import posts from "./school-activities.json";
import styles from "./SchoolActivities.module.css";

/** Original-language activity records; do not infer or add children's names. */
export default function SchoolActivities() {
  return <section className={styles.section} id="school-activities-202610" lang="zh-Hant" aria-labelledby="school-activities-title">
    <div className={styles.inner}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>EDUCATION IN ACTION · 校園活動紀錄</p>
        <h2 id="school-activities-title">讓陪伴，走進每一堂課</h2>
        <p>記錄太平國小與樂業國小的活動現場，感謝社友與眷屬一同參與。</p>
        <nav className={styles.links} aria-label="兩場校園活動">{posts.map(post => <a key={post.slug} href={`#${post.slug}`}>{post.date.replaceAll("-", ".")} · {post.title}<span aria-hidden="true"> ↓</span></a>)}</nav>
      </div>
      {posts.map(post => <article className={styles.article} id={post.slug} key={post.slug} aria-labelledby={`${post.slug}-title`}>
        <div className={styles.heading}>
          <div><time className={styles.date} dateTime={post.date}>{post.date.replaceAll("-", ".")}</time><h3 id={`${post.slug}-title`}>{post.title}</h3></div>
          <div className={styles.copy}>{post.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
        <div className={styles.gallery}>
          {post.photos.map((photo, index) => <figure className={index === 0 ? styles.cover : styles.photo} key={photo.src}>
            <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`開啟原圖：${photo.caption}`}>
              {/* Native image retains the supplied photograph's full aspect ratio. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} width={photo.width} height={photo.height} alt={photo.caption} loading="lazy" decoding="async" />
            </a>
            <figcaption><span>{String(index + 1).padStart(2, "0")}</span> {photo.caption}</figcaption>
          </figure>)}
        </div>
        <p className={styles.source}>活動日期與參與名單依提供資料整理；照片為本次活動原始紀錄。</p>
      </article>)}
    </div>
  </section>;
}

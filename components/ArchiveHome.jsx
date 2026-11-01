import Image from 'next/image';
import { generatedArt } from '../app/site-data';
import { evergreenGuides } from '../lib/evergreen';
import { allTurkishPosts, allEnglishPosts } from '../lib/content-collections';
import { englishTopics } from '../data/en-topics';
import styles from './ArchiveHome.module.css';
import ImageCredit from './ImageCredit';

const turkishTopics = [
  { title: 'Arkeoloji', href: '/label/Arkeoloji' },
  { title: 'Antik Uygarlıklar', href: '/label/Antik%20Uygarlıklar' },
  { title: 'Anadolu Tarihi', href: '/label/Anadolu%20Tarihi' },
  { title: 'Antik Teknoloji', href: '/label/Antik%20Teknoloji' },
  { title: 'Tarihsel Gizemler', href: '/label/%C3%87%C3%B6z%C3%BClmemi%C5%9F%20Gizemler' },
  { title: 'Ders Notları', href: '/p/ders-notlari.html' },
];

function SearchIcon() { return <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>; }
function Arrow() { return <span aria-hidden="true">→</span>; }

export default function ArchiveHome({ language = 'tr' }) {
  const en = language === 'en';
  const allPosts = en ? allEnglishPosts() : allTurkishPosts();
  const guides = evergreenGuides(allPosts, en ? 'en' : 'tr');
  const lead = allPosts.find((post) => /karahan[-]?tepe/i.test(post.primaryPath)) || guides[0] || allPosts[0];
  const stories = guides.filter((post) => post.primaryPath !== lead?.primaryPath).slice(0, 6);
  const topics = en ? englishTopics.map((topic) => ({ title: topic.name, href: `/en/topic/${topic.slug}` })) : turkishTopics;
  const archive = en ? '/en/archive' : '/arsiv';
  const search = en ? '/en/search' : '/search';
  const tools = en ? [
    { href: '/en/archive', title: 'Browse the archive', note: 'All articles, one place', mark: '01' },
    { href: '/en/topic/undeciphered-scripts', title: 'Ancient scripts', note: 'Signs, languages & evidence', mark: '02' },
    { href: '/en/sources-and-fact-checking', title: 'Follow the sources', note: 'How we check the evidence', mark: '03' },
  ] : [
    { href: '/p/tarih-kronolojisi.html', title: 'Kronoloji', note: 'Dönemleri birlikte gör', mark: '01' },
    { href: '/p/ders-notlari.html', title: 'Ders notları', note: 'Kavramları hızlıca hatırla', mark: '02' },
    { href: '/p/tarih-quiz.html', title: 'Tarih quiz', note: 'Bilgini kısa testlerle dene', mark: '03' },
  ];
  const leadTitle = lead && /karahan[-]?tepe/i.test(lead.primaryPath) ? (en ? 'Karahantepe and the Taş Tepeler sites' : 'Karahan Tepe ve Taş Tepeler') : lead?.title;

  return <div className={styles.root} data-archive-home={language} lang={language}>
    <section className={styles.introduction} aria-labelledby="archive-home-title">
      <div><h1 id="archive-home-title">{en ? 'A closer look at history.' : 'Tarihi keşfet.'}</h1><p>{en ? 'Archaeology, ancient worlds and the evidence they left behind.' : 'Arkeoloji, uygarlıklar ve geçmişin izleri.'}</p></div>
      <form className={styles.search} action={search} method="get" role="search">
        <SearchIcon /><input type="search" name="q" aria-label={en ? 'Search the history archive' : 'Arşivde ara'} placeholder={en ? 'Find a topic or question…' : 'Konu veya soru ara…'} /><button type="submit">{en ? 'Search' : 'Ara'}</button>
      </form>
    </section>
    <nav className={styles.topics} aria-label={en ? 'Explore topics' : 'Konuları keşfet'}>{topics.map((topic) => <a key={topic.href} href={topic.href}>{topic.title}</a>)}</nav>

    <section className={styles.featureSection} aria-labelledby="feature-title">
      <div className={styles.heading}><h2 id="feature-title">{en ? 'A good place to start' : 'Okumaya buradan başla'}</h2><a href={en ? '/en/archive' : '/rehberler'}>{en ? 'All guides' : 'Tüm rehberler'} <Arrow /></a></div>
      {lead ? <a className={styles.feature} href={lead.primaryPath} aria-label={lead.title}>
        <div className={styles.featureImage}><Image src={lead.image || generatedArt.explorerDesk} alt={lead.imageAlt || lead.title} fill sizes="(max-width: 600px) 120px, (max-width: 900px) 46vw, 55vw" priority /></div>
        <div className={styles.featureCopy}><span className={styles.label}>{lead.labels?.[0] || (en ? 'HISTORY & ARCHAEOLOGY' : 'TARİH & ARKEOLOJİ')}</span><h3>{leadTitle}</h3><p>{lead.description}</p><strong>{en ? 'Read the story' : 'Yazıyı keşfet'} <Arrow /></strong></div>
      </a> : null}
      <ImageCredit credit={lead?.imageCredit} english={en} />
    </section>

    <section className={styles.utilities} aria-label={en ? 'Explore the archive' : 'Tarih araçları'}>{tools.map((tool) => <a href={tool.href} key={tool.href}><span className={styles.utilityMark}>{tool.mark}</span><span><strong>{tool.title}</strong><small>{tool.note}</small></span><Arrow /></a>)}</section>

    <section className={styles.reading} id={en ? 'latest-research' : 'hizli-cevaplar'} aria-labelledby="reading-title">
      <div className={styles.heading}><h2 id="reading-title">{en ? 'Stories worth exploring' : 'Merak edenler için'}</h2><a href={archive}>{en ? 'The archive' : 'Arşivin tamamı'} <Arrow /></a></div>
      <div className={styles.storyGrid}>{stories.map((post) => <article key={post.primaryPath} className={styles.story}>
        <a href={post.primaryPath} className={styles.storyImage} aria-label={post.title}><Image src={post.image || generatedArt.explorerDesk} alt={post.title} fill sizes="(max-width: 600px) 96px, (max-width: 900px) 46vw, 31vw" /></a>
        <div className={styles.storyCopy}><span className={styles.label}>{en ? 'HISTORY & EVIDENCE' : (post.labels?.[0] || 'TARİH & ARKEOLOJİ')}</span><h3><a href={post.primaryPath}>{post.title}</a></h3><p>{post.description}</p><a className={styles.readLink} href={post.primaryPath}>{en ? 'Read on' : 'Devamını oku'} <Arrow /></a></div>
      </article>)}</div>
    </section>
    <div className={styles.archiveLink}><div><strong>{en ? 'Keep following your curiosity.' : 'Merak ettiğin başka bir konu mu var?'}</strong><p>{en ? `${allPosts.length} articles to explore at your own pace.` : `${allPosts.length} yazı arasından konunu seç, kendi okuma rotanı oluştur.`}</p></div><a href={archive}>{en ? 'Explore all articles' : 'Arşivi keşfet'} <Arrow /></a></div>
  </div>;
}

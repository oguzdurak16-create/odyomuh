import Image from 'next/image';
import { generatedArt } from '../app/site-data';
import { evergreenGuides } from '../lib/evergreen';
import { allTurkishPosts } from '../lib/content-collections';

const topics = [
  { title: 'Arkeoloji', text: 'Kazılar, yeni buluntular ve bilimsel incelemeler', href: '/label/Arkeoloji' },
  { title: 'Antik Uygarlıklar', text: 'Mezopotamya, Mısır, Anadolu, Yunan ve Roma', href: '/label/Antik%20Uygarlıklar' },
  { title: 'Anadolu Tarihi', text: 'Anadolu’nun kültürleri, kentleri ve imparatorlukları', href: '/label/Anadolu%20Tarihi' },
  { title: 'Antik Teknoloji', text: 'Eski dünyanın mühendisliği ve üretim bilgisi', href: '/label/Antik%20Teknoloji' },
  { title: 'Tarihsel Gizemler', text: 'Çözülemeyen metinler, yapılar ve tartışmalı kanıtlar', href: '/label/%C3%87%C3%B6z%C3%BClmemi%C5%9F%20Gizemler' },
  { title: 'Tarih Ders Notları', text: 'Temel kavramlar, karşılaştırmalar ve konu özetleri', href: '/p/ders-notlari.html' },
];

const tools = [
  { title: 'Tarih Kronolojisi', text: 'Dönemleri ve önemli kırılma noktalarını tek akışta inceleyin.', href: '/p/tarih-kronolojisi.html' },
  { title: 'Ders Notları', text: 'Kısa konu özetleri ve sınava yönelik net cevaplar.', href: '/p/ders-notlari.html' },
  { title: 'Tarih Quiz', text: 'Bilginizi kısa testlerle ölçün ve eksik konuyu bulun.', href: '/p/tarih-quiz.html' },
  { title: 'Kalıcı Rehberler', text: 'Tarih ve arkeoloji sorularına tekrar başvurabileceğiniz açıklamalar.', href: '/rehberler' },
];

function publicationDateKey(post) {
  const published = String(post?.published || post?.updated || '').match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
  if (published) return published;
  return String(post?.image || '').match(/^\/generated-daily\/(\d{4}-\d{2}-\d{2})-/)?.[1] || '0000-00-00';
}

function publicationDateTime(post) {
  if (post?.published || post?.updated) return post.published || post.updated;
  const key = publicationDateKey(post);
  return key === '0000-00-00' ? '' : `${key}T12:00:00+03:00`;
}

function formatDate(value) {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Istanbul' }).format(parsed);
}

function formatPostDate(post) { return formatDate(publicationDateTime(post)); }

function orderedUniquePosts(posts) {
  const seen = new Set();
  return [...posts]
    .filter((post) => {
      if (!post?.primaryPath || seen.has(post.primaryPath)) return false;
      seen.add(post.primaryPath);
      return true;
    })
    .sort((a, b) => publicationDateKey(b).localeCompare(publicationDateKey(a)));
}

function ArticleCard({ post, priority = false }) {
  const dateTime = publicationDateTime(post);
  return <article className="clean-article-card">
    <a className="clean-article-image" href={post.primaryPath} aria-label={post.title}>
      <Image src={post.image || generatedArt.explorerDesk} alt={post.title} fill sizes="(max-width: 620px) 100vw, (max-width: 1080px) 50vw, 33vw" priority={priority} />
    </a>
    <div className="clean-article-body">
      <div className="clean-article-meta"><span>{post.labels?.[0] || 'Tarih'}</span>{dateTime ? <time dateTime={dateTime}>{formatPostDate(post)}</time> : null}</div>
      <h3><a href={post.primaryPath}>{post.title}</a></h3>
      <p>{post.description}</p>
      <a className="clean-text-link" href={post.primaryPath}>Cevabı gör <span aria-hidden="true">→</span></a>
    </div>
  </article>;
}

export default function ProfessionalHome() {
  const articles = orderedUniquePosts(allTurkishPosts());
  const guides = evergreenGuides(articles);
  const highIntent = guides.slice(0, 6);
  const lead = highIntent[0] || articles[0];
  const latest = guides.slice(6);
  const leadDateTime = lead ? publicationDateTime(lead) : '';

  return <div className="clean-home">
    <nav className="clean-mobile-shortcuts" aria-label="Hızlı gezinme"><a href="#hizli-cevaplar">Hızlı cevaplar</a><a href="/search">Ara</a><a href="/arsiv">Arşiv</a></nav>
    <section className="clean-hero">
      <div className="clean-hero-copy">
        <span className="clean-kicker">ODYOMUH · kaynaklı tarih cevapları ve araçları</span>
        <h1>Tarih sorularına <span>kaynaklı cevaplar.</span></h1>
        <p>Arkeoloji, Türk tarihi ve antik uygarlıklar. Kısa cevaptan başlayın, kanıtları ve farklı yorumları kaynaklarıyla inceleyin.</p>
        <form className="clean-search" action="/search" method="get" role="search"><input name="q" type="search" placeholder="Örn. Orun nedir, Sümer Kral Listesi, Anunnaki..." aria-label="Arşivde ara" /><button type="submit">Cevabı bul</button></form>
        <div className="clean-hero-actions"><a className="clean-primary-button" href="#hizli-cevaplar">Kısa cevaplar</a><a className="clean-secondary-button" href="/p/tarih-kronolojisi.html">Kronolojiyi aç</a></div>
        <div className="clean-stat-row"><span><strong>{articles.length}</strong> araştırma dosyası</span><span><strong>{tools.length}</strong> ücretsiz araç</span><span><strong>{topics.length}</strong> ana alan</span></div>
      </div>
      {lead ? <a className="clean-lead" href={lead.primaryPath} aria-label={`Öne çıkan cevap: ${lead.title}`}>
        <Image src={lead.image || generatedArt.explorerDesk} alt={lead.title} fill sizes="(max-width: 1080px) 100vw, 58vw" priority />
        <div className="clean-lead-content"><div className="clean-lead-meta"><span>Öne çıkan cevap</span>{leadDateTime ? <time dateTime={leadDateTime}>{formatPostDate(lead)}</time> : null}</div><h2>{lead.title}</h2><p>{lead.description}</p><strong className="clean-lead-link">Kısa cevabı aç <span aria-hidden="true">→</span></strong></div>
      </a> : null}
    </section>

    <section className="clean-section" aria-labelledby="araclar-baslik"><div className="clean-section-head"><div><span className="clean-kicker">Siteyi kullan</span><h2 id="araclar-baslik">Tarih araçları</h2></div><p>Sadece yazı okumayın; kronolojide gezin, ders notuna geçin veya bilginizi test edin.</p></div><div className="clean-tools">{tools.map((tool)=><a className="clean-tool" href={tool.href} key={tool.title}><strong>{tool.title}</strong><p>{tool.text}</p><span aria-hidden="true">→</span></a>)}</div></section>

    {highIntent.length ? <section className="clean-section" id="hizli-cevaplar" aria-labelledby="hizli-cevaplar-baslik"><div className="clean-section-head"><div><span className="clean-kicker">Doğrudan cevap</span><h2 id="hizli-cevaplar-baslik">Türk tarihi ve antik uygarlıklar hakkında sorular</h2></div><p>Önce sonucu öğrenin; sonra kaynak, örnek ve ayrıntıya inin.</p></div><div className="clean-article-grid">{highIntent.map((post,index)=><ArticleCard post={post} priority={false} key={post.primaryPath} />)}</div></section> : null}

    <section className="clean-section" aria-labelledby="konular-baslik"><div className="clean-section-head"><div><span className="clean-kicker">Konuya göre keşfet</span><h2 id="konular-baslik">Araştırma alanları</h2></div><p>Dağınık arama sonuçları yerine ilgili dosyaları aynı konu altında bulun.</p></div><div className="clean-topics">{topics.map((topic,index)=><a className="clean-topic" href={topic.href} key={topic.title}><span>{String(index+1).padStart(2,'0')}</span><h3>{topic.title}</h3><p>{topic.text}</p></a>)}</div></section>

    <section className="clean-section" id="son-yazilar" aria-labelledby="son-yazilar-baslik"><div className="clean-section-head clean-section-head-action"><div><span className="clean-kicker">Kalıcı okuma listesi</span><h2 id="son-yazilar-baslik">Türk tarihi, mitoloji ve antik yaşam rehberleri</h2></div><a className="clean-section-link" href="/rehberler">Tüm rehberler <span aria-hidden="true">→</span></a></div><div className="clean-article-grid">{latest.map((post,index)=><ArticleCard post={post} priority={false} key={post.primaryPath} />)}</div></section>
  </div>;
}

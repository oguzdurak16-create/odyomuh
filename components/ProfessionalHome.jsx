import Image from 'next/image';
import { generatedArt } from '../app/site-data';
import { currentTurkishPosts } from '../data/current-updates';
import { allTurkishPosts } from '../lib/content-collections';

const topics = [
  { title: 'Arkeoloji', text: 'Kazılar, yeni buluntular ve bilimsel incelemeler', href: '/label/Arkeoloji' },
  { title: 'Antik Uygarlıklar', text: 'Mezopotamya, Mısır, Anadolu, Yunan ve Roma', href: '/label/Antik%20Uygarlıklar' },
  { title: 'Anadolu Tarihi', text: 'Anadolu’nun kültürleri, kentleri ve imparatorlukları', href: '/label/Anadolu%20Tarihi' },
  { title: 'Antik Teknoloji', text: 'Eski dünyanın mühendisliği ve üretim bilgisi', href: '/label/Antik%20Teknoloji' },
  { title: 'Tarihsel Gizemler', text: 'Çözülemeyen metinler, yapılar ve tartışmalı kanıtlar', href: '/label/%C3%87%C3%B6z%C3%BClmemi%C5%9F%20Gizemler' },
  { title: 'Orta Doğu Gündemi', text: 'Güncel gelişmelerin tarihsel arka planı', href: '/gundem/orta-dogu' },
];

const tools = [
  { title: 'Tüm Yazılar', text: 'Arşivdeki bütün araştırma dosyalarını görüntüleyin.', href: '/arsiv' },
  { title: 'Tarih Kronolojisi', text: 'Dönemleri ve önemli kırılma noktalarını sırayla inceleyin.', href: '/p/tarih-kronolojisi.html' },
  { title: 'Ders Notları', text: 'Kısa konu özetleri ve sınava yönelik içerikler.', href: '/p/ders-notlari.html' },
  { title: 'Tarih Quiz', text: 'Bilginizi kısa testlerle ölçün.', href: '/p/tarih-quiz.html' },
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
      <a className="clean-text-link" href={post.primaryPath}>Yazıyı oku <span aria-hidden="true">→</span></a>
    </div>
  </article>;
}

export default function ProfessionalHome() {
  const current = orderedUniquePosts(currentTurkishPosts);
  const archive = orderedUniquePosts(allTurkishPosts());
  const articles = orderedUniquePosts([...current, ...archive]);
  const lead = current[0] || articles[0];
  const latest = articles.slice(0, 6);
  const leadDateTime = lead ? publicationDateTime(lead) : '';
  const priorityPaths = [
    '/2025/10/antik-uygarliklarin-kaybolan-teknolojileri-modern-dunyaya-isik-tutan-sirlar.html',
    '/2025/12/feodalite-nedir-feodal-sistem-ve-ozellikleri-ders-notu.html',
    '/2025/12/ongun-turk-boylarinin-kutsal-damgalari-ve-totem-hayvanlari.html',
    '/2026/06/1518-dans-salgini-strasbourg-halki-neden-dans-etti.html',
    '/2025/11/anunnakiler-kimdir-mitolojik-kokenlerden-bilimsel-konsensuse-kadar-kapsamli-rehber.html',
  ];
  const selected = priorityPaths.map((path) => articles.find((post) => post.primaryPath === path)).filter(Boolean);

  return <div className="clean-home">
    <nav className="clean-mobile-shortcuts" aria-label="Hızlı gezinme"><a href="#son-yazilar">Son yazılar</a><a href="/search">Ara</a><a href="/arsiv">Arşiv</a></nav>
    <section className="clean-hero">
      <div className="clean-hero-copy">
        <span className="clean-kicker">ODYOMUH · kanıt odaklı tarih platformu</span>
        <h1>Geçmişi daha net oku.</h1>
        <p>Arkeoloji, antik uygarlıklar, tarihsel gizemler ve güncel olayların geçmişini; kaynak, bağlam ve kanıt ayrımını koruyarak tek arşivde keşfedin.</p>
        <div className="clean-hero-actions"><a className="clean-primary-button" href="#son-yazilar">Yeni araştırmalar</a><a className="clean-secondary-button" href="/arsiv">Arşivi keşfet</a></div>
        <form className="clean-search" action="/search" method="get"><input name="q" type="search" placeholder="Konu, uygarlık, kişi veya olay ara" aria-label="Arşivde ara" /><button type="submit">Ara</button></form>
        <div className="clean-stat-row"><span><strong>{articles.length}</strong> araştırma dosyası</span><span><strong>{topics.length}</strong> ana alan</span><span><strong>{lead ? formatPostDate(lead) : ''}</strong> son yayın</span></div>
      </div>
      {lead ? <a className="clean-lead" href={lead.primaryPath} aria-label={`Yeni araştırma: ${lead.title}`}>
        <Image src={lead.image || generatedArt.explorerDesk} alt={lead.title} fill sizes="(max-width: 1080px) 100vw, 58vw" priority />
        <div className="clean-lead-content"><div className="clean-lead-meta"><span>Yeni araştırma</span>{leadDateTime ? <time dateTime={leadDateTime}>{formatPostDate(lead)}</time> : null}</div><h2>{lead.title}</h2><p>{lead.description}</p><strong className="clean-lead-link">Dosyayı aç <span aria-hidden="true">→</span></strong></div>
      </a> : null}
    </section>

    <section className="clean-section" aria-labelledby="konular-baslik"><div className="clean-section-head"><div><span className="clean-kicker">Konuya göre keşfet</span><h2 id="konular-baslik">Araştırma alanları</h2></div><p>Dağınık etiketler yerine arşivin ana kümelerine doğrudan girin.</p></div><div className="clean-topics">{topics.map((topic,index)=><a className="clean-topic" href={topic.href} key={topic.title}><span>{String(index+1).padStart(2,'0')}</span><h3>{topic.title}</h3><p>{topic.text}</p></a>)}</div></section>

    <section className="clean-section" id="son-yazilar" aria-labelledby="son-yazilar-baslik"><div className="clean-section-head clean-section-head-action"><div><span className="clean-kicker">Güncel arşiv</span><h2 id="son-yazilar-baslik">Son yayımlananlar</h2></div><a className="clean-section-link" href="/arsiv">Tüm yazılar <span aria-hidden="true">→</span></a></div><div className="clean-article-grid">{latest.map((post,index)=><ArticleCard post={post} priority={index===0} key={post.primaryPath} />)}</div><div className="clean-update-note">Son içerik güncellemesi: {lead ? formatPostDate(lead) : ''}</div></section>

    <section className="clean-section" aria-labelledby="araclar-baslik"><div className="clean-section-head"><div><span className="clean-kicker">Hızlı erişim</span><h2 id="araclar-baslik">Arşiv araçları</h2></div></div><div className="clean-tools">{tools.map((tool)=><a className="clean-tool" href={tool.href} key={tool.title}><strong>{tool.title}</strong><p>{tool.text}</p><span aria-hidden="true">→</span></a>)}</div></section>

    {selected.length ? <section className="clean-section" aria-labelledby="secki-baslik"><div className="clean-section-head"><div><span className="clean-kicker">Arşivden seçilenler</span><h2 id="secki-baslik">Derin okumalar</h2></div><p>Gündem akışının dışında kalan kapsamlı tarih ve arkeoloji dosyaları.</p></div><div className="clean-article-grid">{selected.map((post)=><ArticleCard post={post} key={post.primaryPath} />)}</div></section> : null}
  </div>;
}

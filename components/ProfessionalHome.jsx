import { generatedArt } from '../app/site-data';
import { currentTurkishPosts, currentUpdateDate } from '../data/current-updates';
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

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
}

function uniquePosts(posts) {
  const seen = new Set();
  return posts.filter((post) => {
    if (!post?.primaryPath || seen.has(post.primaryPath)) return false;
    seen.add(post.primaryPath);
    return true;
  });
}

function ArticleCard({ post, priority = false }) {
  return (
    <article className="clean-article-card">
      <a className="clean-article-image" href={post.primaryPath} aria-label={post.title}>
        <img
          src={post.image || generatedArt.explorerDesk}
          alt={post.title}
          width="1672"
          height="941"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
      </a>
      <div className="clean-article-body">
        <div className="clean-article-meta">
          <span>{post.labels?.[0] || 'Tarih'}</span>
          {post.published ? <time dateTime={post.published}>{formatDate(post.published)}</time> : null}
        </div>
        <h3><a href={post.primaryPath}>{post.title}</a></h3>
        <p>{post.description}</p>
        <a className="clean-text-link" href={post.primaryPath}>Yazıyı oku <span aria-hidden="true">→</span></a>
      </div>
    </article>
  );
}

export default function ProfessionalHome() {
  const archive = allTurkishPosts();
  const articles = uniquePosts([...currentTurkishPosts, ...archive]);
  const lead = articles[0];
  const latest = articles.slice(0, 6);
  const priorityPaths = [
    '/2025/10/antik-uygarliklarin-kaybolan-teknolojileri-modern-dunyaya-isik-tutan-sirlar.html',
    '/2025/12/feodalite-nedir-feodal-sistem-ve-ozellikleri-ders-notu.html',
    '/2025/12/ongun-turk-boylarinin-kutsal-damgalari-ve-totem-hayvanlari.html',
    '/2026/06/1518-dans-salgini-strasbourg-halki-neden-dans-etti.html',
    '/2025/11/anunnakiler-kimdir-mitolojik-kokenlerden-bilimsel-konsensuse-kadar-kapsamli-rehber.html',
  ];
  const selected = priorityPaths.map((path) => articles.find((post) => post.primaryPath === path)).filter(Boolean);

  return (
    <div className="clean-home">
      <style>{`
        .clean-home {
          --clean-bg: #15100c;
          --clean-surface: #1d1611;
          --clean-surface-2: #251c15;
          --clean-border: rgba(226, 190, 132, .18);
          --clean-text: #f5eee5;
          --clean-muted: #b9aa9b;
          --clean-accent: #d7aa63;
          --clean-accent-strong: #f0c984;
          color: var(--clean-text);
          padding: 28px 0 84px;
        }
        [data-theme='light'] .clean-home {
          --clean-bg: #f7f1e8;
          --clean-surface: #fffaf3;
          --clean-surface-2: #f2e8da;
          --clean-border: rgba(83, 56, 31, .16);
          --clean-text: #261b13;
          --clean-muted: #6f5d4e;
          --clean-accent: #8b5b24;
          --clean-accent-strong: #6b4219;
        }
        .clean-home *, .clean-home *::before, .clean-home *::after { box-sizing: border-box; }
        .clean-home a { color: inherit; text-decoration: none; }
        .clean-home .clean-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 16px;
          color: var(--clean-accent-strong);
          font: 700 .76rem/1 var(--font-inter);
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .clean-home .clean-kicker::before { content: ''; width: 28px; height: 1px; background: currentColor; }
        .clean-hero {
          display: grid;
          grid-template-columns: minmax(0, .92fr) minmax(0, 1.08fr);
          min-height: 560px;
          overflow: hidden;
          border: 1px solid var(--clean-border);
          border-radius: 26px;
          background: var(--clean-surface);
          box-shadow: 0 24px 70px rgba(0,0,0,.18);
        }
        .clean-hero-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(34px, 5vw, 72px);
        }
        .clean-hero h1 {
          max-width: 11ch;
          margin: 0;
          font: 900 clamp(2.55rem, 5vw, 5.15rem)/.98 var(--font-cinzel);
          letter-spacing: -.045em;
        }
        .clean-hero-copy > p {
          max-width: 620px;
          margin: 24px 0 0;
          color: var(--clean-muted);
          font: 400 clamp(1rem, 1.35vw, 1.18rem)/1.75 var(--font-merriweather);
        }
        .clean-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
        .clean-primary-button, .clean-secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 20px;
          border-radius: 999px;
          font: 700 .9rem/1 var(--font-inter);
        }
        .clean-primary-button { background: var(--clean-accent); color: #17100a !important; }
        .clean-secondary-button { border: 1px solid var(--clean-border); background: transparent; }
        .clean-search {
          display: flex;
          margin-top: 28px;
          padding: 6px;
          border: 1px solid var(--clean-border);
          border-radius: 14px;
          background: var(--clean-surface-2);
        }
        .clean-search input {
          width: 100%; min-width: 0; border: 0; outline: 0; background: transparent;
          color: var(--clean-text); padding: 0 14px; font: 500 .92rem/1 var(--font-inter);
        }
        .clean-search input::placeholder { color: var(--clean-muted); }
        .clean-search button {
          min-width: 78px; min-height: 40px; border: 0; border-radius: 10px;
          background: var(--clean-text); color: var(--clean-bg); cursor: pointer; font-weight: 800;
        }
        .clean-lead {
          position: relative;
          display: flex;
          align-items: flex-end;
          min-height: 560px;
          overflow: hidden;
          background: #21170f;
        }
        .clean-lead img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .clean-lead::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(15,9,5,.04) 18%, rgba(15,9,5,.9) 100%); }
        .clean-lead-content { position: relative; z-index: 1; width: 100%; padding: clamp(28px, 4vw, 52px); color: #fff; }
        .clean-lead-meta { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 13px; font: 700 .75rem/1 var(--font-inter); text-transform: uppercase; letter-spacing: .09em; }
        .clean-lead-meta span { padding: 7px 10px; border-radius: 999px; background: rgba(0,0,0,.45); backdrop-filter: blur(8px); }
        .clean-lead-meta time { color: rgba(255,255,255,.78); }
        .clean-lead h2 { max-width: 18ch; margin: 0; font: 800 clamp(1.85rem, 3.4vw, 3.65rem)/1.08 var(--font-cinzel); letter-spacing: -.025em; }
        .clean-lead p { max-width: 680px; margin: 16px 0 0; color: rgba(255,255,255,.79); font: 400 .98rem/1.65 var(--font-merriweather); }
        .clean-section { margin-top: clamp(56px, 7vw, 92px); }
        .clean-section-head { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin-bottom: 24px; }
        .clean-section-head h2 { margin: 0; font: 800 clamp(1.8rem, 3vw, 3rem)/1.08 var(--font-cinzel); letter-spacing: -.025em; }
        .clean-section-head > p { max-width: 570px; margin: 0; color: var(--clean-muted); font: 400 .95rem/1.65 var(--font-merriweather); }
        .clean-topics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .clean-topic {
          display: block; min-height: 150px; padding: 24px; border: 1px solid var(--clean-border);
          border-radius: 18px; background: var(--clean-surface); transition: transform .2s ease, border-color .2s ease;
        }
        .clean-topic:hover { transform: translateY(-3px); border-color: var(--clean-accent); }
        .clean-topic span { display: block; color: var(--clean-accent-strong); font: 800 .72rem/1 var(--font-inter); letter-spacing: .14em; text-transform: uppercase; }
        .clean-topic h3 { margin: 16px 0 8px; font: 800 1.15rem/1.2 var(--font-cinzel); }
        .clean-topic p { margin: 0; color: var(--clean-muted); font: 400 .9rem/1.55 var(--font-merriweather); }
        .clean-article-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .clean-article-card { overflow: hidden; border: 1px solid var(--clean-border); border-radius: 20px; background: var(--clean-surface); }
        .clean-article-image { display: block; aspect-ratio: 16/9; overflow: hidden; background: var(--clean-surface-2); }
        .clean-article-image img { width: 100%; height: 100%; object-fit: cover; transition: transform .35s ease; }
        .clean-article-card:hover .clean-article-image img { transform: scale(1.035); }
        .clean-article-body { padding: 22px; }
        .clean-article-meta { display: flex; justify-content: space-between; gap: 12px; color: var(--clean-muted); font: 700 .7rem/1.3 var(--font-inter); text-transform: uppercase; letter-spacing: .07em; }
        .clean-article-meta span { color: var(--clean-accent-strong); }
        .clean-article-body h3 { margin: 15px 0 10px; font: 800 1.18rem/1.28 var(--font-cinzel); }
        .clean-article-body p { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin: 0; color: var(--clean-muted); font: 400 .9rem/1.62 var(--font-merriweather); }
        .clean-text-link { display: inline-flex; gap: 8px; align-items: center; margin-top: 18px; color: var(--clean-accent-strong) !important; font: 800 .82rem/1 var(--font-inter); }
        .clean-tools { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); overflow: hidden; border: 1px solid var(--clean-border); border-radius: 20px; background: var(--clean-surface); }
        .clean-tool { padding: 25px; border-right: 1px solid var(--clean-border); }
        .clean-tool:last-child { border-right: 0; }
        .clean-tool strong { display: block; font: 800 1rem/1.25 var(--font-cinzel); }
        .clean-tool p { margin: 9px 0 0; color: var(--clean-muted); font: 400 .84rem/1.55 var(--font-merriweather); }
        .clean-tool span { display: inline-block; margin-top: 15px; color: var(--clean-accent-strong); font-weight: 800; }
        .clean-update-note { margin-top: 18px; color: var(--clean-muted); font: 500 .78rem/1.4 var(--font-inter); text-align: right; }
        @media (max-width: 1050px) {
          .clean-hero { grid-template-columns: 1fr; }
          .clean-lead { min-height: 520px; }
          .clean-topics, .clean-article-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .clean-tools { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .clean-tool:nth-child(2) { border-right: 0; }
          .clean-tool:nth-child(-n+2) { border-bottom: 1px solid var(--clean-border); }
        }
        @media (max-width: 680px) {
          .clean-home { padding-top: 14px; }
          .clean-hero { border-radius: 18px; min-height: 0; }
          .clean-hero-copy { padding: 30px 22px 34px; }
          .clean-hero h1 { font-size: clamp(2.35rem, 12vw, 3.65rem); }
          .clean-lead { min-height: 460px; }
          .clean-lead-content { padding: 24px 20px; }
          .clean-section-head { display: block; }
          .clean-section-head > p { margin-top: 12px; }
          .clean-topics, .clean-article-grid, .clean-tools { grid-template-columns: 1fr; }
          .clean-tool { border-right: 0; border-bottom: 1px solid var(--clean-border); }
          .clean-tool:last-child { border-bottom: 0; }
          .clean-search button { min-width: 64px; }
        }
      `}</style>

      <section className="clean-hero">
        <div className="clean-hero-copy">
          <span className="clean-kicker">Kaynak odaklı dijital tarih arşivi</span>
          <h1>Tarihi kanıtlar üzerinden keşfedin.</h1>
          <p>Arkeoloji, antik uygarlıklar, tarihsel gizemler ve güncel olayların geçmişi hakkında düzenli, okunabilir ve kaynaklandırılmış araştırma dosyaları.</p>
          <div className="clean-hero-actions">
            <a className="clean-primary-button" href="#son-yazilar">Son yazıları incele</a>
            <a className="clean-secondary-button" href="/arsiv">Tüm arşiv</a>
          </div>
          <form className="clean-search" action="/search" method="get">
            <input name="q" type="search" placeholder="Konu, uygarlık, kişi veya olay ara" aria-label="Arşivde ara" />
            <button type="submit">Ara</button>
          </form>
        </div>
        {lead ? (
          <a className="clean-lead" href={lead.primaryPath}>
            <img src={lead.image || generatedArt.explorerDesk} alt={lead.title} width="1672" height="941" fetchPriority="high" decoding="async" />
            <div className="clean-lead-content">
              <div className="clean-lead-meta"><span>Yeni araştırma</span><time dateTime={lead.published}>{formatDate(lead.published)}</time></div>
              <h2>{lead.title}</h2>
              <p>{lead.description}</p>
            </div>
          </a>
        ) : null}
      </section>

      <section className="clean-section" aria-labelledby="konular-baslik">
        <div className="clean-section-head">
          <div><span className="clean-kicker">Konuya göre keşfet</span><h2 id="konular-baslik">Ana araştırma alanları</h2></div>
          <p>Yüzlerce dağınık etiket yerine, arşivin temel başlıklarına doğrudan ulaşın.</p>
        </div>
        <div className="clean-topics">
          {topics.map((topic, index) => (
            <a className="clean-topic" href={topic.href} key={topic.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{topic.title}</h3>
              <p>{topic.text}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="clean-section" id="son-yazilar" aria-labelledby="son-yazilar-baslik">
        <div className="clean-section-head">
          <div><span className="clean-kicker">Güncel arşiv</span><h2 id="son-yazilar-baslik">Son yayımlanan yazılar</h2></div>
          <p>Ana sayfada yalnızca en güncel dosyalar gösterilir. Eski içeriklerin tamamı arşivde korunur.</p>
        </div>
        <div className="clean-article-grid">
          {latest.map((post) => <ArticleCard post={post} key={post.primaryPath} />)}
        </div>
        <div className="clean-update-note">Son içerik güncellemesi: {formatDate(currentUpdateDate)}</div>
      </section>

      <section className="clean-section" aria-labelledby="araclar-baslik">
        <div className="clean-section-head">
          <div><span className="clean-kicker">Hızlı erişim</span><h2 id="araclar-baslik">Arşiv ve çalışma araçları</h2></div>
        </div>
        <div className="clean-tools">
          {tools.map((tool) => (
            <a className="clean-tool" href={tool.href} key={tool.title}>
              <strong>{tool.title}</strong><p>{tool.text}</p><span aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </section>

      {selected.length ? (
        <section className="clean-section" aria-labelledby="secki-baslik">
          <div className="clean-section-head">
            <div><span className="clean-kicker">Arşivden seçilenler</span><h2 id="secki-baslik">Derin okumalar</h2></div>
            <p>Gündem akışının dışında kalan kapsamlı tarih ve arkeoloji dosyaları.</p>
          </div>
          <div className="clean-article-grid">
            {selected.map((post) => <ArticleCard post={post} key={post.primaryPath} />)}
          </div>
        </section>
      ) : null}
    </div>
  );
}

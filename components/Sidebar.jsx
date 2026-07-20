import { canonicalLabel } from '../app/site-data';

function getLabelStats(posts = []) {
  const counts = new Map();
  for (const post of posts || []) {
    for (const raw of post.labels || []) {
      const label = canonicalLabel(raw);
      counts.set(label, (counts.get(label) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => (b[1] - a[1]) || a[0].localeCompare(b[0], 'tr'))
    .map(([label, count]) => ({ label, count }));
}

function SocialIcon({ type }) {
  if (type === 'facebook') return <span className="social-glyph" aria-hidden="true">f</span>;
  if (type === 'instagram') return <span className="social-glyph" aria-hidden="true">◎</span>;
  return <span className="social-glyph" aria-hidden="true">▶</span>;
}

export default function Sidebar({ posts, labels, site }) {
  const popular = posts.slice(0, 5);
  const labelStats = getLabelStats(posts);
  const featuredLabels = labelStats.slice(0, 14);
  const moreLabels = labelStats.slice(14, 30);

  return (
    <aside className="sidebar" aria-label="Yan alan">
      <section className="widget search-widget">
        <h3 className="widget-title">Arama</h3>
        <form action="/search" method="get">
          <input name="q" type="search" placeholder="Tarihte ara..." />
          <button type="submit" aria-label="Ara">Ara</button>
        </form>
      </section>

      <section className="widget about-widget">
        <h3 className="widget-title">ODYOMUH</h3>
        <p>{site.description || 'Tarih, mitoloji ve kadim uygarlıkların gizemlerini anlatan özgün içerikler.'}</p>
      </section>

      <section className="widget">
        <h3 className="widget-title">Popüler Yazılar</h3>
        <ul className="popular-posts-list">
          {popular.map((post) => (
            <li className="popular-post-item" key={post.id}>
              <a className="popular-post-thumb" href={post.primaryPath}>{post.image ? <img src={post.image} alt={post.title} width="1672" height="941" loading="lazy" decoding="async" /> : null}</a>
              <div className="popular-post-content"><a className="popular-post-title" href={post.primaryPath}>{post.title}</a></div>
            </li>
          ))}
        </ul>
      </section>

      <section className="widget tag-widget">
        <div className="widget-heading-inline">
          <h3 className="widget-title">Etiketler</h3>
          <span className="widget-count">{labelStats.length}</span>
        </div>
        <div className="post-labels tag-cloud">
          {featuredLabels.map(({ label, count }) => (
            <a key={label} href={`/label/${encodeURIComponent(label)}`} title={`${count} içerik`}>
              <span>{label}</span>
              <small>{count}</small>
            </a>
          ))}
        </div>
        {moreLabels.length ? (
          <details className="tag-cloud-more">
            <summary>Daha fazla etiket</summary>
            <div className="post-labels tag-cloud extra-tags">
              {moreLabels.map(({ label, count }) => (
                <a key={label} href={`/label/${encodeURIComponent(label)}`} title={`${count} içerik`}>
                  <span>{label}</span>
                  <small>{count}</small>
                </a>
              ))}
            </div>
          </details>
        ) : null}
      </section>

      <section className="widget social-panel">
        <div className="widget-heading-inline">
          <h3 className="widget-title">Sosyal</h3>
          <span className="widget-count">3</span>
        </div>
        <div className="social-widget social-grid">
          <a className="social-link social-facebook" href="https://www.facebook.com/profile.php?id=61554477900461" rel="noopener noreferrer" target="_blank">
            <SocialIcon type="facebook" />
            <span className="social-copy"><strong>Facebook</strong><small>Güncellemeler</small></span>
          </a>
          <a className="social-link social-instagram" href="https://instagram.com/tarihdedektifi0" rel="noopener noreferrer" target="_blank">
            <SocialIcon type="instagram" />
            <span className="social-copy"><strong>Instagram</strong><small>Reels ve gönderiler</small></span>
          </a>
          <a className="social-link social-youtube" href="https://www.youtube.com/@tarihdedektifi0" rel="noopener noreferrer" target="_blank">
            <SocialIcon type="youtube" />
            <span className="social-copy"><strong>YouTube</strong><small>Videolar</small></span>
          </a>
        </div>
      </section>
    </aside>
  );
}

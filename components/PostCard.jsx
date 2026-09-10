import Image from 'next/image';

function stripHtml(value = '') { return String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); }
function readingTime(post) { const text = stripHtml(post.contentHtml || post.description || ''); return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 210)); }
function formatDate(value) { if (!value) return ''; return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Europe/Istanbul' }).format(new Date(value)); }

export default function PostCard({ post }) {
  const category = post.labels?.[0] || 'Tarih';
  const extraLabels = (post.labels || []).slice(1, 3);
  return <article className="post-outer premium-post-card">
    <a className="post-thumb clean-thumb premium-card-media" href={post.primaryPath} aria-label={post.title}>
      {post.image ? <Image src={post.image} alt={post.title} fill sizes="(max-width: 620px) 100vw, (max-width: 1080px) 50vw, 33vw" /> : <div className="thumb-placeholder">ODYOMUH</div>}
      <span className="thumb-label">{category}</span><span className="premium-card-read-time">{readingTime(post)} dk</span><span className="premium-card-image-shade" aria-hidden="true" />
    </a>
    <div className="post-body premium-card-body">
      <div className="post-meta-info premium-card-meta"><time dateTime={post.published}>{formatDate(post.published)}</time><span>ODYOMUH Arşivi</span></div>
      <h2 className="post-title"><a href={post.primaryPath}>{post.title}</a></h2><p className="post-snippet">{post.description}</p>
      <div className="premium-card-bottom"><div className="premium-card-tags">{extraLabels.map((label)=><a key={label} href={`/label/${encodeURIComponent(label)}`}>{label}</a>)}</div><a className="premium-card-read-link" href={post.primaryPath}>Oku <span aria-hidden="true">→</span></a></div>
    </div>
  </article>;
}

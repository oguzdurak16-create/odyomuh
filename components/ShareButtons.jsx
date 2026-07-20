function ShareIcon({ type }) {
  if (type === 'whatsapp') return <span className="share-glyph" aria-hidden="true">W</span>;
  if (type === 'telegram') return <span className="share-glyph" aria-hidden="true">T</span>;
  if (type === 'facebook') return <span className="share-glyph" aria-hidden="true">f</span>;
  return <span className="share-glyph" aria-hidden="true">X</span>;
}

function ShareButton({ className, href, label, shortLabel }) {
  return (
    <a className={`share-btn ${className}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
      <ShareIcon type={shortLabel} />
      <span className="share-btn-text">{label}</span>
    </a>
  );
}

export default function ShareButtons({ title, url }) {
  const encodedUrl = encodeURIComponent(url || '');
  const encodedTitle = encodeURIComponent(title || '');
  return (
    <div className="odyomuh-share">
      <div className="share-intro">
        <span className="share-label">Paylaş</span>
        <p className="share-subtitle">Bu yazıyı hızlıca gönder veya kaydet.</p>
      </div>
      <div className="share-actions">
        <ShareButton className="share-whatsapp" shortLabel="whatsapp" label="WhatsApp" href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} />
        <ShareButton className="share-telegram" shortLabel="telegram" label="Telegram" href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`} />
        <ShareButton className="share-facebook" shortLabel="facebook" label="Facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} />
        <ShareButton className="share-twitter" shortLabel="twitter" label="X" href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} />
      </div>
    </div>
  );
}

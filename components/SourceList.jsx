function sourceParts(source = '', linkLabel = 'Kaynağı aç') {
  return String(source).split(/(https?:\/\/[^\s]+)/g).filter(Boolean).map((part, index) => {
    if (!/^https?:\/\//i.test(part)) return part;
    const trailing = part.match(/[),.;]+$/)?.[0] || '';
    const href = trailing ? part.slice(0, -trailing.length) : part;
    return (
      <span key={`${href}-${index}`}>
        <a href={href} target="_blank" rel="noopener noreferrer">{linkLabel}</a>{trailing}
      </span>
    );
  });
}

export default function SourceList({ sources = [], locale = 'tr' }) {
  if (!sources?.length) return null;
  const english = locale === 'en';
  const linkLabel = english ? 'Open source' : 'Kaynağı aç';
  return (
    <section className="article-source-box" aria-labelledby={english ? 'article-sources-title' : 'yazi-kaynaklari-baslik'}>
      <p className="eyebrow">{english ? 'Source trail' : 'Kaynaklar'}</p>
      <h2 id={english ? 'article-sources-title' : 'yazi-kaynaklari-baslik'}>{english ? 'Selected references and research starting points' : 'Seçili kaynaklar ve araştırma başlangıçları'}</h2>
      <ol>{sources.map((source, index) => <li key={`${String(source).slice(0, 60)}-${index}`}>{sourceParts(source, linkLabel)}</li>)}</ol>
      <p>{english ? 'The list is a research trail. Specific claims should be checked against the cited edition, object record or publication.' : 'Bu liste araştırma izidir. Belirli iddialar, adı verilen yayın, eser kaydı veya kurum belgesi üzerinden ayrıca kontrol edilmelidir.'}</p>
    </section>
  );
}

const BLOCKED_SOURCE_HOSTS = ['wikipedia.org', 'wikimedia.org', 'fandom.com'];
const TRACKING_PARAM = /^(utm_|gclid$|fbclid$|mc_cid$|mc_eid$)/i;

function cleanSourceUrl(value = '') {
  try {
    const url = new URL(String(value));
    let host = url.hostname.toLowerCase().replace(/^www\./, '');

    if (BLOCKED_SOURCE_HOSTS.some((blocked) => host === blocked || host.endsWith(`.${blocked}`))) return null;

    if (host === 'tcmb.org.tr') {
      url.hostname = 'www.tcmb.gov.tr';
      host = 'tcmb.gov.tr';
    }

    for (const key of [...url.searchParams.keys()]) {
      if (TRACKING_PARAM.test(key)) url.searchParams.delete(key);
    }
    url.hash = '';
    return url.toString();
  } catch {
    return null;
  }
}

function sourceParts(source = '', linkLabel = 'Kaynağı aç') {
  const text = String(source);
  if (/(?:^|\.)wikipedia\.org|(?:^|\.)wikimedia\.org|(?:^|\.)fandom\.com/i.test(text)) return null;

  return text.split(/(https?:\/\/[^\s]+)/g).filter(Boolean).map((part, index) => {
    if (!/^https?:\/\//i.test(part)) return part;
    const trailing = part.match(/[),.;]+$/)?.[0] || '';
    const rawHref = trailing ? part.slice(0, -trailing.length) : part;
    const href = cleanSourceUrl(rawHref);
    if (!href) return null;
    return (
      <span key={`${href}-${index}`}>
        <a href={href} target="_blank" rel="noopener noreferrer">{linkLabel}</a>{trailing}
      </span>
    );
  }).filter(Boolean);
}

export default function SourceList({ sources = [], locale = 'tr' }) {
  if (!sources?.length) return null;
  const english = locale === 'en';
  const linkLabel = english ? 'Open source' : 'Kaynağı aç';
  const cleanSources = sources
    .map((source) => ({ source, parts: sourceParts(source, linkLabel) }))
    .filter(({ parts }) => parts?.length);

  if (!cleanSources.length) return null;

  return (
    <section className="article-source-box" aria-labelledby={english ? 'article-sources-title' : 'yazi-kaynaklari-baslik'}>
      <p className="eyebrow">{english ? 'Source trail' : 'Kaynaklar'}</p>
      <h2 id={english ? 'article-sources-title' : 'yazi-kaynaklari-baslik'}>{english ? 'Selected references and research starting points' : 'Seçili kaynaklar ve araştırma başlangıçları'}</h2>
      <ol>{cleanSources.map(({ source, parts }, index) => <li key={`${String(source).slice(0, 60)}-${index}`}>{parts}</li>)}</ol>
      <p>{english ? 'The list is a research trail. Specific claims should be checked against the cited edition, object record or publication.' : 'Bu liste araştırma izidir. Belirli iddialar, adı verilen yayın, eser kaydı veya kurum belgesi üzerinden ayrıca kontrol edilmelidir.'}</p>
    </section>
  );
}

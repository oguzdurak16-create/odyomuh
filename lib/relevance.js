// Rank topic matches above incidental mentions in article bodies.
export function normalize(value = '') {
  return String(value).toLocaleLowerCase('tr-TR').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i').replace(/[^a-z0-9]+/g, ' ').trim();
}
const generic = new Set(['tarih', 'tarihi', 'dunya', 'ders', 'notlari', 'nedir', 'nasil', 'bir', 've', 'icin', 'buyuk', 'mirasi', 'kasim', 'ocak', 'subat', 'mart', 'nisan', 'mayis', 'haziran', 'temmuz', 'agustos', 'eylul', 'ekim', 'aralik']);
export function searchScore(post, query) {
  const terms = normalize(query).split(' ').filter(Boolean);
  if (!terms.length) return 0;
  const title = normalize(post.title);
  const labels = normalize([...(post.labels || []), ...(post.searchAliases || [])].join(' '));
  const description = normalize(post.description);
  const body = normalize(String(post.contentHtml || '').replace(/<[^>]+>/g, ' '));
  if (!terms.every(term => `${title} ${labels} ${description} ${body}`.includes(term))) return 0;
  return terms.reduce((score, term) => score + (title.includes(term) ? 30 : 0)
    + (labels.includes(term) ? 15 : 0) + (description.includes(term) ? 5 : 0) + (body.includes(term) ? 1 : 0), 0);
}
export function relatedScore(a, b) {
  const labels = new Set((a.labels || []).map(normalize).filter(label => !label.split(' ').every(t => generic.has(t))));
  const sharedLabels = (b.labels || []).map(normalize).filter(label => labels.has(label)).length;
  const terms = new Set(normalize(`${a.title} ${(a.searchAliases || []).join(' ')}`).split(' ').filter(t => t.length > 3 && !generic.has(t)));
  const candidate = new Set(normalize(`${b.title} ${(b.searchAliases || []).join(' ')}`).split(' '));
  const modernTurkish = /\b(ataturk|kurtulus|cumhuriyet|10 kasim)\b/;
  const topicBonus = modernTurkish.test(normalize(a.title)) && modernTurkish.test(normalize(b.title)) ? 8 : 0;
  return topicBonus + sharedLabels * 5 + [...terms].filter(t => candidate.has(t)).length * 3;
}

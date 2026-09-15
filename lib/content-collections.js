import { posts, labels, canonicalLabel, normalizeSearchText } from '../app/site-data.js';
import { englishPosts } from '../data/en-posts.js';
import { currentTurkishPosts, currentEnglishPosts } from '../data/current-updates.js';
import { applyContentOverride } from '../data/seo-overrides.js';
import { applyTrafficOverride } from '../data/traffic-overrides.js';

const LEGACY_LABEL_ALIASES = new Map([
  ['dunya tarihi', 'Dünya Tarihi'],
  ['ders notlari', 'Ders Notları'],
  ['kadim uygarliklar', 'Kadim Uygarlıklar'],
  ['turk tarihi', 'Türk Tarihi'],
  ['gobekli tepe', 'Göbekli Tepe'],
  ['osmanli tarihi', 'Osmanlı Tarihi'],
  ['antik uygarliklar', 'Antik Uygarlıklar'],
  ['ortacag', 'Orta Çağ'],
  ['orta cag', 'Orta Çağ'],
  ['ilk turk devletleri', 'İlk Türk Devletleri'],
]);

// These legacy articles now permanently redirect to stronger canonical pages.
// Keep them routable for redirect compatibility, but remove them from archives,
// label pages, related-post widgets and sitemap-derived collections.
const CONSOLIDATED_TURKISH_PATHS = new Set([
  '/2025/11/anunnakilerin-gizli-mirasi-insanlik-tanrilarin-unuttugu-teknolojiyi-mi-yeniden-kesfediyor.html',
  '/2025/12/anunnaki-nedir-sumer-tanrilari-ve-antik-uzayli-teorisi-tarih-ve-gizem.html',
  '/2026/06/anunnaki-nedir-sumer-tanrilari-mi-uzayli-efsanesi-mi.html',
  '/2026/01/gobekli-tepe-nedir-dunyanin-en-eski-tapinagi-ve-gizemleri-tarih-ve-arkeoloji.html',
  '/2026/06/gobekli-tepe-sirri-12-bin-yillik-tapinak-gercekten-ne-anlatiyor.html',
  '/2026/06/catalhoyuk-sokaksiz-damdan-girilen-9000-yillik-kent.html',
  '/2026/06/antikythera-mekanizmasi-antik-dunyanin-disli-bilgisayari.html',
  '/2025/12/anadolu-nun-en-karanlik-sirri-kimsenin-bilmedigi-yeralti-sehri.html',
]);

const EDITORIAL_ROUTE_OVERRIDES = new Map([
  ['/2025/11/gobeklitepe-de-anunnaki-izleri-mi-var-12-bin-yillik-t-seklinde-sutunlarin-sok-edici-sirri.html', {
    title: 'Göbekli Tepe’de Anunnaki Kanıtı Var mı? Arkeoloji Ne Diyor?',
    description: 'Göbekli Tepe’yi Anunnaki ile ilişkilendiren popüler iddiaları; kazı verileri, tarihleme, T biçimli sütunlar ve Mezopotamya yazılı kaynakları üzerinden kontrol ediyoruz.',
    updated: '2026-09-15T00:00:00.000Z',
  }],
  ['/2025/11/antik-nukleer-enerji-teorisi-gecmiste-atom-cagi-mi-yasandi.html', {
    title: 'Antik Nükleer Savaş Gerçek mi? Mohenjo-Daro İddiaları Ne Kadar Doğru?',
    description: 'Mohenjo-Daro’da radyasyon, erimiş taşlar ve antik atom savaşı iddialarını arkeolojik kayıtlarla karşılaştırıyoruz. Kanıt ne söylüyor, efsane nerede başlıyor?',
    updated: '2026-09-15T00:00:00.000Z',
  }],
]);

function labelKey(value = '') {
  return normalizeSearchText(value).replace(/ı/g, 'i');
}

export function normalizeTurkishLabel(rawLabel = '') {
  const canonical = canonicalLabel(rawLabel);
  return LEGACY_LABEL_ALIASES.get(labelKey(canonical)) || canonical;
}

export function uniqueContent(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item?.id || item?.primaryPath;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function sortNewest(items = []) {
  return [...items].sort((a, b) => String(b.updated || b.published || '').localeCompare(String(a.updated || a.published || '')));
}

function applyEditorialRouteOverride(item) {
  const override = EDITORIAL_ROUTE_OVERRIDES.get(item?.primaryPath);
  return override ? { ...item, ...override } : item;
}

function applyOverrides(items = []) {
  return items.map(applyContentOverride).map(applyTrafficOverride).map(applyEditorialRouteOverride);
}

function normalizeEnglishPost(item) {
  if (!item || item.primaryPath || !item.slug) return item;
  return { ...item, primaryPath: `/en/${item.slug}` };
}

export function allTurkishPosts() {
  const items = uniqueContent([...currentTurkishPosts, ...posts()])
    .filter((post) => !CONSOLIDATED_TURKISH_PATHS.has(post.primaryPath));
  return sortNewest(applyOverrides(items));
}

export function allEnglishPosts() {
  const normalized = [...currentEnglishPosts, ...englishPosts].map(normalizeEnglishPost);
  return sortNewest(applyOverrides(uniqueContent(normalized)));
}

export function turkishLabelStats() {
  const counts = new Map();
  const latest = new Map();
  for (const post of allTurkishPosts()) {
    for (const rawLabel of post.labels || []) {
      const label = normalizeTurkishLabel(rawLabel);
      counts.set(label, (counts.get(label) || 0) + 1);
      const date = post.updated || post.published || null;
      if (date && (!latest.has(label) || String(date) > String(latest.get(label)))) latest.set(label, date);
    }
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count, latest: latest.get(label) || null }))
    .sort((a, b) => (b.count - a.count) || a.label.localeCompare(b.label, 'tr'));
}

export function allTurkishLabels() {
  const combined = new Set(labels().map(normalizeTurkishLabel));
  for (const item of turkishLabelStats()) combined.add(item.label);
  return [...combined].sort((a, b) => a.localeCompare(b, 'tr'));
}

export function postsForTurkishLabel(rawLabel) {
  const label = normalizeTurkishLabel(rawLabel);
  return allTurkishPosts().filter((post) => (post.labels || []).map(normalizeTurkishLabel).includes(label));
}

export function latestDate(items = []) {
  const latest = sortNewest(items)[0];
  return latest?.updated || latest?.published || null;
}

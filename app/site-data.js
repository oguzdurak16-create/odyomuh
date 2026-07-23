import exportData from '../data/blogger-export.json' with { type: 'json' };

export const site = exportData.blog;
export const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || site.domain || '').replace(/\/$/, '');

export const generatedArt = {
  explorerDesk: '/generated-history/explorer-desk.webp',
  classicalRuinsBust: '/generated-history/classical-ruins-bust.webp',
  excavationSite: '/generated-history/excavation-site.webp',
  ottomanManuscript: '/generated-history/ottoman-manuscript.webp',
  mythicTemple: '/generated-history/mythic-temple.webp',
  warRoomMap: '/generated-history/war-room-map.webp',
  ancientLibraryDesk: '/generated-history/ancient-library-desk.webp',
  maritimeChart: '/generated-history/maritime-chart.webp',
  templeTreasure: '/generated-history/temple-treasure.webp',
  mysteryRoomKey: '/generated-history/mystery-room-key.webp',
  globalHistoryHero: '/generated-global/global-history-hero.webp',
  anunnakiGlobal: '/generated-global/anunnaki-mesopotamian-gods.webp',
  igigiGlobal: '/generated-global/igigi-younger-gods.webp',
  enumaElishGlobal: '/generated-global/enuma-elish-creation-epic.webp',
  cuneiformGlobal: '/generated-global/cuneiform-decipherment.webp',
  rongorongoGlobal: '/generated-global/rongorongo-script.webp',
  antikytheraGlobal: '/generated-global/antikythera-mechanism.webp',
  gobekliGlobal: '/generated-global/gobekli-tepe.webp',
  nibiruGlobal: '/generated-global/nibiru-mesopotamian-astronomy.webp',
  mythsEvidenceGlobal: '/generated-global/myths-vs-evidence.webp',
  middleEastHub: '/generated-middle-east/iran-israel-conflict.webp',
  iranIsraelConflict: '/generated-middle-east/iran-israel-conflict.webp',
  usMiddleEastPolicy: '/generated-middle-east/us-middle-east-policy.webp',
  judaismIsraelZionism: '/generated-middle-east/judaism-israel-zionism.webp',
  houthisRedSea: '/generated-middle-east/houthis-yemen-red-sea.webp',
  sunniShia: '/generated-middle-east/sunni-shia-difference.webp',
  jewishMuslimRelations: '/generated-middle-east/jewish-muslim-relations.webp',
  iranianShia: '/generated-middle-east/iranian-shia-history.webp',
  israelPalestine: '/generated-middle-east/israel-palestine-history.webp',
  iranNuclear: '/generated-middle-east/iran-nuclear-program.webp',
  hormuzBab: '/generated-middle-east/hormuz-bab-el-mandeb.webp',
  axisResistance: '/generated-middle-east/axis-of-resistance.webp',
  iranUsWar2026: '/generated-middle-east/iran-us-war-2026.webp',
  goldenTonguesTrend: '/generated-trends/golden-tongues-egypt.webp',
  mayaMathematicianTrend: '/generated-trends/maya-mathematician.webp',
  vindolandaGeniusTrend: '/generated-trends/vindolanda-genius.webp',
  dakhlaCityTrend: '/generated-trends/dakhla-byzantine-city.webp',
  scythianDnaTrend: '/generated-trends/scythian-golden-man-dna.webp',
  stonehengePrototypeTrend: '/generated-trends/wooden-stonehenge-prototype.webp',
  qafzehInjuryTrend: '/generated-trends/qafzeh-jaw-injury.webp',
};

const fallbackSequence = [
  generatedArt.explorerDesk,
  generatedArt.classicalRuinsBust,
  generatedArt.excavationSite,
  generatedArt.ottomanManuscript,
  generatedArt.mythicTemple,
  generatedArt.warRoomMap,
  generatedArt.ancientLibraryDesk,
  generatedArt.maritimeChart,
  generatedArt.templeTreasure,
  generatedArt.mysteryRoomKey,
];

export function normalizeSearchText(value = '') {
  return String(value)
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}


const LABEL_ALIASES = new Map([
  ['arkeoloji', 'Arkeoloji'],
  ['arkeoloji ve tarih', 'Arkeoloji ve Tarih'],
  ['anunnaki', 'Anunnaki'],
  ['turkiye', 'Türkiye'],
  ['sumer', 'Sümer'],
  ['mezopotamya', 'Mezopotamya'],
  ['mitoloji', 'Mitoloji'],
  ['antik uygarliklar', 'Antik Uygarlıklar'],
  ['antik-uygarliklar', 'Antik Uygarlıklar'],
  ['antik tarih', 'Antik Tarih'],
  ['antik-tarih', 'Antik Tarih'],
  ['antik cag', 'Antik Çağ'],
  ['antik-cag', 'Antik Çağ'],
  ['antik misir', 'Antik Mısır'],
  ['antik-misir', 'Antik Mısır'],
  ['antik roma', 'Antik Roma'],
  ['antik-roma', 'Antik Roma'],
  ['avrupa tarihi', 'Avrupa Tarihi'],
  ['avrupa-tarihi', 'Avrupa Tarihi'],
  ['ataturk', 'Atatürk'],
  ['bermuda ucgeni', 'Bermuda Üçgeni'],
  ['bermuda-ucgeni', 'Bermuda Üçgeni'],
  ['birinci dunya savasi', 'Birinci Dünya Savaşı'],
  ['birinci-dunya-savasi', 'Birinci Dünya Savaşı'],
  ['antik astronotlar', 'Antik Astronotlar'],
  ['antik teknoloji', 'Antik Teknoloji'],
  ['antik yunan', 'Antik Yunan'],
  ['anadolu tarihi', 'Anadolu Tarihi'],
  ['bilim tarihi', 'Bilim Tarihi'],
  ['bizans', 'Bizans'],
  ['biyografi', 'Biyografi'],
]);


export function metaDescription(value = '', maxLength = 160) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  const shortened = text.slice(0, maxLength - 1).replace(/\s+\S*$/, '').trim();
  return `${shortened || text.slice(0, maxLength - 1)}…`;
}

function prettifyFallbackLabel(value = '') {
  const compact = String(value).trim().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');
  return compact.split(' ').filter(Boolean).map((word) => word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1)).join(' ');
}

export function canonicalLabel(label = '') {
  const value = String(label).trim();
  const normalized = normalizeSearchText(value);
  if (LABEL_ALIASES.has(normalized)) return LABEL_ALIASES.get(normalized);
  if (/^[a-z0-9\s_-]+$/i.test(value) && (value.includes('-') || value === value.toLocaleLowerCase('tr-TR'))) return prettifyFallbackLabel(value);
  return value;
}

function canonicalLabels(values = []) {
  return [...new Set(values.map(canonicalLabel).filter(Boolean))];
}

function includesAny(haystack, terms) {
  return terms.some((term) => haystack.includes(normalizeSearchText(term)));
}

function hashCode(value = '') {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 2147483647;
  }
  return Math.abs(hash);
}

function chooseGeneratedImage(item) {
  const haystack = normalizeSearchText(`${item.title} ${(item.labels || []).join(' ')} ${item.description || ''} ${item.contentHtml || ''}`);

  if (includesAny(haystack, ['bermuda', 'deniz', 'okyanus', 'gemi', 'denizcilik', 'pasifik', 'sefer', 'ucgen', 'üçgen'])) {
    return generatedArt.maritimeChart;
  }

  if (includesAny(haystack, ['gizem', 'cozulmemis', 'çözülmemiş', 'voynich', 'rongorongo', 'kriptografi', 'komplo', 'kayip', 'kayıp', 'sir', 'sır', 'dyatlov', 'esrar', 'gizli oda'])) {
    return generatedArt.mysteryRoomKey;
  }

  if (includesAny(haystack, ['osmanli', 'ottoman', 'istanbul', 'fetih', 'bizans', 'turk tarihi', 'türk tarihi', 'aksemseddin', 'iskan politikasi', 'kurulus donemi', 'selcuklu'])) {
    return generatedArt.ottomanManuscript;
  }

  if (includesAny(haystack, ['savasi', 'savaşı', 'dunya savasi', 'dünya savaşı', 'kurtulus', 'kurtuluş', 'devrim', 'revolution', 'ordu', 'cephe', 'isyan'])) {
    return generatedArt.warRoomMap;
  }

  if (includesAny(haystack, ['arkeoloji', 'gobekli', 'göbekli', 'catalhoyuk', 'çatalhöyük', 'pompeii', 'pompei', 'yerlesim', 'yerleşim', 'kazi', 'kazı', 'neolitik'])) {
    return generatedArt.excavationSite;
  }

  if (includesAny(haystack, ['mitoloji', 'anunnaki', 'sumer tanrilari', 'sümer tanrıları', 'tengri', 'destani', 'destanı', 'tanrilar', 'tanrılar'])) {
    return generatedArt.mythicTemple;
  }

  if (includesAny(haystack, ['kitap', 'belge', 'manuscript', 'yazi', 'yazı', 'ders-notlari', 'ders notu', 'history notes', 'notu', 'yazilar', 'yazılar'])) {
    return generatedArt.ancientLibraryDesk;
  }

  if (includesAny(haystack, ['antik yunan', 'antik roma', 'antik-cag', 'antik çağ', 'antik uygarliklar', 'antik uygarlıklar', 'kadim uygarliklar', 'kadim uygarlıklar', 'piramit', 'firavun', 'mezopotamya', 'misir', 'mısır'])) {
    return generatedArt.classicalRuinsBust;
  }

  if (includesAny(haystack, ['mekanizma', 'antikythera', 'bilim tarihi', 'teknoloji', '536', 'iklim', 'volkan', 'karanlik yil', 'karanlık yıl', 'gunesin soldugu', 'güneşin solduğu'])) {
    return generatedArt.explorerDesk;
  }

  if (includesAny(haystack, ['tapinak', 'tapınak', 'hazine', 'kayıp medeniyetler', 'kayip medeniyetler', 'efsane', 'legend'])) {
    return generatedArt.templeTreasure;
  }

  return fallbackSequence[hashCode(item.id || item.title) % fallbackSequence.length];
}

function decorate(item) {
  if (item.type !== 'POST') return item;
  return {
    ...item,
    labels: canonicalLabels(item.labels || []),
    originalImage: item.image || null,
    image: item.themeImage || chooseGeneratedImage(item),
  };
}

export function allItems() {
  return [...site.items]
    .sort((a, b) => (b.published || '').localeCompare(a.published || ''))
    .map(decorate);
}

export function posts() {
  return allItems().filter((item) => item.type === 'POST');
}

export function pages() {
  return allItems().filter((item) => item.type === 'PAGE');
}

export function findByPath(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return allItems().find((item) => item.routes?.includes(normalized));
}

export function labels() {
  const set = new Set();
  allItems().forEach((item) => (item.labels || []).forEach((label) => set.add(canonicalLabel(label))));
  return [...set].sort((a, b) => a.localeCompare(b, 'tr'));
}

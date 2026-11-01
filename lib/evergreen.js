// Editorial selections, not a recency score. Existing canonical URLs stay intact.
export const evergreenPaths = {
  tr: [
    '/2025/12/orun-ve-ulus-nedir-ilk-turk-devletlerinde-mevki-ve-pay-sistemi-ders-notu.html',
    '/2026/06/sumer-kral-listesi-28-800-yil-yasayan-krallar-gercek-mi.html',
    '/2026/08/gobekli-tepe-ilk-tapinak-neolitik-devrim.html',
    '/2026/07/catalhoyuk-evleri-sokaksiz-neolitik-kent.html',
    '/2026/08/antikythera-mekanizmasi-antik-cag-bilgisayari.html',
    '/2025/12/feodalite-nedir-feodal-sistem-ve-ozellikleri-ders-notu.html',
    '/2025/12/ongun-turk-boylarinin-kutsal-damgalari-ve-totem-hayvanlari.html',
    '/2025/11/anunnakiler-kimdir-mitolojik-kokenlerden-bilimsel-konsensuse-kadar-kapsamli-rehber.html',
    '/2026/06/derinkuyu-yeralti-sehri-kimler-neden-yapti.html',
    '/2026/07/pompeii-duvar-yazilari-antik-roma-gundelik-hayat.html',
  ],
  en: [
    '/en/how-cuneiform-was-deciphered-behistun-inscription',
    '/en/sumerian-king-list-did-kings-live-for-28800-years',
    '/en/gobekli-tepe-what-the-site-really-changed',
    '/en/catalhoyuk-life-inside-the-neolithic-megasite',
    '/en/antikythera-mechanism-how-the-ancient-computer-worked',
    '/en/who-were-the-anunnaki-mesopotamian-gods-explained',
    '/en/derinkuyu-underground-city-who-built-it-and-why',
    '/en/how-to-check-ancient-alien-claims',
    '/en/roman-concrete-why-ancient-harbors-survive',
    '/en/damascus-steel-what-was-lost-and-what-was-not',
  ],
};

export function evergreenGuides(posts, locale = 'tr') {
  const byPath = new Map(posts.map((post) => [post.primaryPath, post]));
  return evergreenPaths[locale].map((path) => byPath.get(path)).filter(Boolean);
}

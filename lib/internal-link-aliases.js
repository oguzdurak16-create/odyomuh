// Published article equivalents for mistyped legacy links. Do not redirect
// arbitrary missing articles to a home/archive page.
export const internalArticleAliases = {
  '/2026/06/anunnakiler-kimdir-sumer-mitolojisinde-tanrilar-ve-modern-iddialar.html': '/2025/11/anunnakiler-kimdir-mitolojik-kokenlerden-bilimsel-konsensuse-kadar-kapsamli-rehber.html',
  '/2026/06/karahan-tepe-ve-tas-tepeler-gobekli-tepe-tarihi-yeniden-yaziyor.html': '/2026/06/karahan-tepe-ve-tas-tepeler-gobekli-tepe-den-sonra-tarih-yeniden-mi-yaziliyor.html',
  '/en/wooden-stonehenge-prototype-discovery': '/en/wooden-stonehenge-prototype-bulford',
  '/2026/06/stonehenge-prototipi-ahsap-anit.html': '/2026/07/stonehenge-ahsap-prototip-bulford-gundonumu.html',
  '/2025/11/gobeklitepe-anunnaki-baglantisi-12-bin-yillik-tapinaklarin-tanri-meclisi.html': '/2025/11/gobeklitepe-de-anunnaki-izleri-mi-var-12-bin-yillik-t-seklinde-sutunlarin-sok-edici-sirri.html',
  '/2025/11/anunnakilerin-gizli-mirasi-modern-teknolojinin-kayip-kokeni.html': '/2025/11/anunnakiler-kimdir-mitolojik-kokenlerden-bilimsel-konsensuse-kadar-kapsamli-rehber.html',
};
export const englishTopicAliases = { 'ancient-civilizations': 'archaeological-mysteries' };
export function canonicalArticlePath(path) { return internalArticleAliases[path] || path; }

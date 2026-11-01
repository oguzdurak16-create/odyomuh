// These exact section headings identify old, repeated editorial appendices.
// Keep subsequent topic FAQs; leave other archaeological/method sections alone.
const APPENDIX = /<h2\b[^>]*>\s*(?:Building an evidence map from the tablets|How archaeology turns a site into an argument|From impressive object to engineering explanation|Separating the documented core from the modern story)\s*<\/h2>/i;
const FAQ = /<h2\b[^>]*>\s*Frequently asked questions\s*<\/h2>/i;
export function stripLegacyAppendices(html = '') {
  const value = String(html);
  const start = APPENDIX.exec(value);
  if (!start) return value;
  const suffix = value.slice(start.index + start[0].length);
  const faq = FAQ.exec(suffix);
  return value.slice(0, start.index) + (faq ? suffix.slice(faq.index) : '');
}

// Remove old instructions aimed at an editor, while retaining article context.
export function cleanEditorialLanguage(html = '') {
  return String(html)
    .replace(/<h2\b[^>]*>\s*(?:SEO açısından neden güçlü\?|Neden hâlâ arama alır\?)\s*<\/h2>[\s\S]*?(?=<h2\b|$)/gi, '')
    .replace(/<h2\b[^>]*>\s*Kavramları karıştırmamak neden SEO’dan daha önemli\?\s*<\/h2>[\s\S]*?(?=<h2\b|$)/gi,
      '<h2>Kimlik, devlet ve örgüt ayrımını neden korumalıyız?</h2><p>Dinî kimlik, vatandaşlık, etnik köken, devlet politikası ve silahlı örgüt üyeliği aynı değildir. Bir devletin veya örgütün kararını bütün bir dinin ya da halkın davranışı gibi sunmayın. Her iddiada hangi aktörün, hangi tarihte, ne yaptığını ve kaynağın neyi doğruladığını ayrı değerlendirin.</p>')
    .replace(/Quick glossary for search readers/gi, 'Quick glossary')
    .replace(/<h2\b[^>]*>Bu sayfa nasıl güncellenecek\?<\/h2>/gi, '<h2>Bu bölüm hangi dönemi anlatıyor?</h2>')
    .replace(/Yeni ateşkes, saldırı, anlaşma, IAEA raporu veya deniz trafiği kararı yayımlandığında tarih ve güncelleme notu değiştirilmelidir\./g, 'Bu tarihten sonraki ateşkes, saldırı, anlaşma, IAEA raporu ve deniz trafiği gelişmeleri bu tarihli anlatının dışında kalabilir; güncel durum için ilgili kurumun son kaydını kontrol edin.');
}

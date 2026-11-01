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

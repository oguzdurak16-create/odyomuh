export const metadata = {
  title: { default: 'History, Archaeology and Ancient Mysteries', template: '%s | ODYOMUH English' },
  description: 'Evidence-led history, archaeology, ancient texts, engineering and historical claim analysis for global readers.',
  alternates: { canonical: '/en', languages: { en: '/en', 'tr-TR': '/', 'x-default': '/en' } },
};

export default function EnglishLayout({ children }) {
  return <div lang="en">{children}</div>;
}

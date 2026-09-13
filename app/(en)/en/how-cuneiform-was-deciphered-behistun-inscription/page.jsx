import EnglishDynamicPage from '../[slug]/page';

const canonical = '/en/how-cuneiform-was-deciphered-behistun-inscription';
const title = 'Behistun Inscription: How Cuneiform Was Deciphered';
const description = 'How was cuneiform deciphered? Follow Rawlinson and the multilingual Behistun inscription through Old Persian, Elamite and Babylonian, with the evidence and museum context explained.';

export const metadata = {
  title,
  description,
  alternates: { canonical, languages: { en: canonical, 'en-US': canonical, 'x-default': canonical } },
  robots: { index: true, follow: true },
  openGraph: { type: 'article', locale: 'en_US', title, description, url: canonical },
  twitter: { card: 'summary_large_image', title, description },
};

export default function Page() {
  return EnglishDynamicPage({ params: Promise.resolve({ slug: 'how-cuneiform-was-deciphered-behistun-inscription' }) });
}

import EnglishDynamicPage from '../[slug]/page';

const canonical = '/en/how-cuneiform-was-deciphered-behistun-inscription';
const title = 'How Cuneiform Was Deciphered: The Behistun Inscription Explained';
const description = 'How did scholars decipher cuneiform? See how Rawlinson and other researchers used the multilingual Behistun inscription to unlock Old Persian, Elamite and Babylonian writing.';

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

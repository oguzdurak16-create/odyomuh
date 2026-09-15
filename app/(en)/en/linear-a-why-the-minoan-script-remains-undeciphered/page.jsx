import EnglishDynamicPage from '../[slug]/page';

const canonical = '/en/linear-a-why-the-minoan-script-remains-undeciphered';
const title = 'Why Is Linear A Still Undeciphered?';
const description = 'Why is Linear A undeciphered? The signs are partly known, but the Minoan language is not. Learn what Linear B reveals and what evidence is still missing.';

export const metadata = {
  title,
  description,
  alternates: { canonical, languages: { en: canonical, 'en-US': canonical, 'x-default': canonical } },
  robots: { index: true, follow: true },
  openGraph: { type: 'article', locale: 'en_US', title, description, url: canonical },
  twitter: { card: 'summary_large_image', title, description },
};

export default function Page() {
  return EnglishDynamicPage({ params: Promise.resolve({ slug: 'linear-a-why-the-minoan-script-remains-undeciphered' }) });
}

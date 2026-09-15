import EnglishDynamicPage from '../[slug]/page';

const canonical = '/en/linear-a-why-the-minoan-script-remains-undeciphered';
const title = 'Linear A: Why It Remains Undeciphered';
const description = 'Why is Linear A still undeciphered? Learn what scholars can read, how it differs from Linear B, and why the unknown Minoan language remains the key problem.';

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

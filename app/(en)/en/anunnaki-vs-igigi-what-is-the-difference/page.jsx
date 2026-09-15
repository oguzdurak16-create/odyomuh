import EnglishDynamicPage from '../[slug]/page';

const canonical = '/en/anunnaki-vs-igigi-what-is-the-difference';
const title = 'Anunnaki vs Igigi: What Is the Difference?';
const description = 'Anunnaki vs Igigi explained: compare their roles in Mesopotamian texts, the Atrahasis rebellion, where the groups overlap and what modern claims get wrong.';

export const metadata = {
  title,
  description,
  alternates: { canonical, languages: { en: canonical, 'en-US': canonical, 'x-default': canonical } },
  robots: { index: true, follow: true },
  openGraph: { type: 'article', locale: 'en_US', title, description, url: canonical },
  twitter: { card: 'summary_large_image', title, description },
};

export default function Page() {
  return EnglishDynamicPage({ params: Promise.resolve({ slug: 'anunnaki-vs-igigi-what-is-the-difference' }) });
}

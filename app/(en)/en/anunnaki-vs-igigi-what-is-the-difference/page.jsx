import EnglishDynamicPage from '../[slug]/page';

const canonical = '/en/anunnaki-vs-igigi-what-is-the-difference';
const title = 'Anunnaki vs Igigi: What Is the Difference in Mesopotamian Texts?';
const description = 'Compare Anunnaki and Igigi in Sumerian, Akkadian and Babylonian texts, including their roles, the Atrahasis rebellion and why modern alien claims do not match the ancient sources.';

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

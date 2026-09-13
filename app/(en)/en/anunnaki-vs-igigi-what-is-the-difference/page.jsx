import EnglishDynamicPage from '../[slug]/page';

const canonical = '/en/anunnaki-vs-igigi-what-is-the-difference';
const title = 'Anunnaki vs Igigi: What’s the Difference? Ancient Sources Explained';
const description = 'Anunnaki and Igigi are not the same group. Compare their roles in Mesopotamian religion, the Atrahasis tradition, and what ancient scholarly sources actually say.';

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

import EnglishDynamicPage from '../[slug]/page';

const canonical = '/en/rongorongo-easter-islands-undeciphered-script';
const title = 'Rongorongo: Why Is the Rapa Nui Script Undeciphered?';
const description = 'Why is Rongorongo still undeciphered? See the surviving Rapa Nui tablets, reverse-boustrophedon reading order, limited corpus and missing bilingual key.';

export const metadata = {
  title,
  description,
  alternates: { canonical, languages: { en: canonical, 'en-US': canonical, 'x-default': canonical } },
  robots: { index: true, follow: true },
  openGraph: { type: 'article', locale: 'en_US', title, description, url: canonical },
  twitter: { card: 'summary_large_image', title, description },
};

export default function Page() {
  return EnglishDynamicPage({ params: Promise.resolve({ slug: 'rongorongo-easter-islands-undeciphered-script' }) });
}

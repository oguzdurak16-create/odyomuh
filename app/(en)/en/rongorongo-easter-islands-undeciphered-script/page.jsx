import EnglishDynamicPage from '../[slug]/page';

const canonical = '/en/rongorongo-easter-islands-undeciphered-script';
const title = 'Rongorongo: Why Easter Island’s Script Is Still Undeciphered';
const description = 'What is Rongorongo and why has it not been deciphered? Examine the surviving Rapa Nui tablets, reading direction, proposed interpretations and the evidence scholars still lack.';

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

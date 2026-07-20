import { allEnglishPosts } from '../../../../lib/content-collections';
import EnglishSearch from '../../../../components/EnglishSearch';

export const metadata = {
  title: 'Search the English Archive',
  description: 'Search ODYOMUH English articles by subject, title and keyword.',
  alternates: { canonical: '/en/search', languages: { en: '/en/search', 'x-default': '/en/search' } },
  robots: { index: false, follow: true },
};

export default function EnglishSearchPage() {
  const searchable = allEnglishPosts().map(({ id, title, description, labels, topic, primaryPath, image }) => ({
    id, title, description, labels, topic, primaryPath, image,
  }));
  return (
    <div className="english-edition english-index-page" lang="en">
      <header className="english-page-hero">
        <p className="eyebrow">English archive search</p>
        <h1>Find the exact historical question</h1>
        <p>Searches match titles, summaries, topics and labels. Try a civilization, object, script or disputed claim.</p>
      </header>
      <EnglishSearch posts={searchable} />
    </div>
  );
}

import { englishTopics } from '../../../../data/en-topics';
import { baseUrl, site, generatedArt } from '../../../site-data';
import { allEnglishPosts } from '../../../../lib/content-collections';
import EnglishPostCard from '../../../../components/EnglishPostCard';

const siteUrl = baseUrl || 'https://www.odyomuh.net';

export const metadata = {
  title: 'English Archive | History and Archaeology Articles',
  description: 'Browse every ODYOMUH English article on ancient texts, archaeology, ancient engineering and historical claims.',
  alternates: { canonical: '/en/archive', languages: { en: '/en/archive', 'x-default': '/en/archive' } },
  openGraph: {
    title: 'ODYOMUH English Archive',
    description: 'Browse evidence-led history and archaeology articles by date or research cluster.',
    url: '/en/archive',
    images: [{ url: generatedArt.globalHistoryHero, width: 1672, height: 941, alt: 'ODYOMUH English history archive' }],
  },
};

export default function EnglishArchivePage() {
  const allPosts = allEnglishPosts();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'ODYOMUH English Archive',
    description: metadata.description,
    url: `${siteUrl}/en/archive`,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: `${site.name} English`, url: `${siteUrl}/en` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allPosts.length,
      itemListElement: allPosts.slice(0, 100).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        url: `${siteUrl}${post.primaryPath}`,
      })),
    },
  };

  return (
    <div className="english-edition english-index-page" lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="english-page-hero">
        <p className="eyebrow">Complete English archive</p>
        <h1>{allPosts.length} evidence-led history articles</h1>
        <p>Browse by topic or scan the full publication archive. Every article has its own canonical English URL and related-reading path.</p>
      </header>
      <nav className="english-topic-pills" aria-label="English topics">
        {englishTopics.map((topic) => <a key={topic.slug} href={`/en/topic/${topic.slug}`}>{topic.shortName}</a>)}
      </nav>
      <div className="english-post-grid english-archive-grid">
        {allPosts.map((post) => <EnglishPostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}

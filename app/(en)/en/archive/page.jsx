import { englishPosts } from '../../../../data/en-posts';
import { englishTopics } from '../../../../data/en-topics';
import EnglishPostCard from '../../../../components/EnglishPostCard';

export const metadata = {
  title: 'English Archive',
  description: 'Browse every ODYOMUH English article on ancient texts, archaeology, ancient engineering and historical claims.',
  alternates: { canonical: '/en/archive', languages: { en: '/en/archive', 'x-default': '/en/archive' } },
};

export default function EnglishArchivePage() {
  return (
    <div className="english-edition english-index-page" lang="en">
      <header className="english-page-hero">
        <p className="eyebrow">Complete English archive</p>
        <h1>{englishPosts.length} evidence-led history articles</h1>
        <p>Browse by topic or scan the full publication archive. Every article has its own canonical English URL and related-reading path.</p>
      </header>
      <nav className="english-topic-pills" aria-label="English topics">
        {englishTopics.map((topic) => <a key={topic.slug} href={`/en/topic/${topic.slug}`}>{topic.shortName}</a>)}
      </nav>
      <div className="english-post-grid english-archive-grid">
        {englishPosts.map((post) => <EnglishPostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}

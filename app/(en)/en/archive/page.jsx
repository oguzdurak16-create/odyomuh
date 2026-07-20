import { englishPosts } from '../../../../data/en-posts';
import { dailyEnglishPosts } from '../../../../data/daily-2026-07-20';
import { englishTopics } from '../../../../data/en-topics';
import EnglishPostCard from '../../../../components/EnglishPostCard';

export const metadata = {
  title: 'English Archive',
  description: 'Browse every ODYOMUH English article on ancient texts, archaeology, ancient engineering and historical claims.',
  alternates: { canonical: '/en/archive', languages: { en: '/en/archive', 'x-default': '/en/archive' } },
};

function uniquePosts(items) {
  const seen = new Set();
  return items.filter((post) => {
    const key = post.id || post.primaryPath;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function EnglishArchivePage() {
  const allPosts = uniquePosts([...dailyEnglishPosts, ...englishPosts]).sort((a, b) => (b.published || '').localeCompare(a.published || ''));
  return (
    <div className="english-edition english-index-page" lang="en">
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

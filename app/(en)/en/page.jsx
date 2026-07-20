import { englishPosts, findEnglishPost } from '../../../data/en-posts';
import { englishTopics } from '../../../data/en-topics';
import EnglishPostCard from '../../../components/EnglishPostCard';
import { generatedArt } from '../../site-data';

export const metadata = {
  title: 'History, Archaeology and Ancient Mysteries',
  description: 'Evidence-led English articles on Mesopotamia, ancient writing, archaeological mysteries, engineering history and viral historical claims.',
  alternates: {
    canonical: '/en',
    languages: { 'en': '/en', 'tr-TR': '/', 'x-default': '/en' },
  },
  openGraph: {
    locale: 'en_US',
    title: 'ODYOMUH English | History, Archaeology and Ancient Mysteries',
    description: 'Evidence-led history for global readers.',
    url: '/en',
    images: [{ url: generatedArt.globalHistoryHero, width: 1672, height: 941, alt: 'Ancient history and archaeology' }],
  },
};

export default function EnglishHomePage() {
  const lead = findEnglishPost('iran-us-conflict-2026-what-is-happening') || findEnglishPost('who-were-the-anunnaki-mesopotamian-gods-explained') || englishPosts[0];
  const latest = englishPosts.filter((post) => post.id !== lead.id).slice(0, 9);
  const middleEast = englishPosts.filter((post) => post.topic === 'middle-east').slice(0, 4);

  return (
    <div className="english-edition" lang="en">
      <section className="english-hero english-global-hero">
        <div className="english-hero-copy">
          <p className="eyebrow">ODYOMUH · Global English Edition</p>
          <h1>Ancient history without the fake certainty.</h1>
          <p>Archaeology, ancient texts, lost technology and the historical claims that spread faster than their evidence.</p>
          <div className="english-hero-actions">
            <a className="home-primary-action" href="/en/archive">Browse all articles</a>
            <a className="home-secondary-action" href="/en/search">Search the archive</a>
          </div>
          <div className="english-trust-row" aria-label="Editorial standards">
            <span>Primary evidence first</span>
            <span>Uncertainty labelled</span>
            <span>No forced language redirect</span>
          </div>
        </div>
        <a className="english-lead-card" href={lead.primaryPath}>
          <img src={lead.image} alt={lead.title} width="1672" height="941" fetchPriority="high" />
          <div className="english-card-shade" />
          <div className="english-lead-card-content">
            <span>{lead.labels[0]}</span>
            <h2>{lead.title}</h2>
            <p>{lead.description}</p>
            <strong>Open the evidence file →</strong>
          </div>
        </a>
      </section>


      {middleEast.length ? (
        <section className="english-stories-section english-current-affairs-section">
          <div className="home-section-heading">
            <div><p className="eyebrow">Current affairs · reviewed July 17, 2026</p><h2>Iran, Israel, the Houthis and strategic waterways</h2></div>
            <a className="section-text-link" href="/en/topic/middle-east">Open Middle East cluster →</a>
          </div>
          <div className="english-post-grid">{middleEast.map((post) => <EnglishPostCard post={post} key={post.id} />)}</div>
        </section>
      ) : null}

      <section className="english-intro-strip">
        <div><strong>{englishPosts.length}</strong><span>English articles</span></div>
        <div><strong>{englishTopics.length}</strong><span>Research clusters</span></div>
        <div><strong>2</strong><span>Independent editions</span></div>
        <p>The English edition has its own archive, search, topic pages, editorial policies and internal linking. It is not an automatic translation layer.</p>
      </section>

      <section className="english-topic-section" aria-labelledby="english-topics-title">
        <div className="home-section-heading">
          <div>
            <p className="eyebrow">Explore by question</p>
            <h2 id="english-topics-title">Five connected research clusters</h2>
          </div>
          <p>Each cluster links related evidence instead of leaving every article isolated.</p>
        </div>
        <div className="english-topic-grid">
          {englishTopics.map((topic) => {
            const count = englishPosts.filter((post) => post.topic === topic.slug).length;
            return (
              <a className="english-topic-card" href={`/en/topic/${topic.slug}`} key={topic.slug}>
                <img src={topic.image} alt="" width="640" height="360" loading="lazy" />
                <div>
                  <span>{count} articles</span>
                  <h3>{topic.name}</h3>
                  <p>{topic.description}</p>
                  <strong>Explore topic →</strong>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="english-stories-section" id="stories">
        <div className="home-section-heading">
          <div>
            <p className="eyebrow">Latest evidence files</p>
            <h2>New and expanded English articles</h2>
          </div>
          <a className="section-text-link" href="/en/archive">View complete archive →</a>
        </div>
        <div className="english-post-grid">
          {latest.map((post) => <EnglishPostCard post={post} key={post.id} />)}
        </div>
      </section>

      <section className="english-editorial-banner">
        <div>
          <p className="eyebrow">How the archive is built</p>
          <h2>Translations, dates and viral claims are checked by method, not by mood.</h2>
          <p>ODYOMUH separates what an artifact says, what scholars infer and what modern media adds later.</p>
        </div>
        <div className="english-editorial-links">
          <a href="/en/editorial-policy">Editorial policy</a>
          <a href="/en/sources-and-fact-checking">Sources and fact-checking</a>
          <a href="/en/corrections">Corrections</a>
        </div>
      </section>
    </div>
  );
}

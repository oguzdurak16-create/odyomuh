import { currentEnglishPosts, currentUpdateDate } from '../data/current-updates';
import { englishTopics } from '../data/en-topics';
import { allEnglishPosts } from '../lib/content-collections';
import EnglishPostCard from './EnglishPostCard';

function formatDate(value) {
  if (!value) return 'Latest research';
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export default function ProfessionalEnglishHome() {
  const allPosts = allEnglishPosts();
  const recentResearch = [...currentEnglishPosts].sort((a, b) => String(b.published || '').localeCompare(String(a.published || '')));
  const lead = recentResearch[0] || allPosts[0];
  const recentIds = new Set(recentResearch.map((post) => post.id));
  const latest = allPosts.filter((post) => post.id !== lead?.id && !recentIds.has(post.id)).slice(0, 9);

  return (
    <div className="english-edition" lang="en">
      <section className="english-hero english-global-hero">
        <div className="english-hero-copy">
          <p className="eyebrow">ODYOMUH · Global English Edition</p>
          <h1>Ancient history without fake certainty.</h1>
          <p>Evidence-led archaeology, ancient texts, historical mysteries and long-form research for global readers.</p>
          <div className="english-hero-actions">
            <a className="home-primary-action" href="#latest-research">Latest research</a>
            <a className="home-secondary-action" href="/en/archive">Browse all articles</a>
          </div>
          <div className="english-trust-row"><span>Primary evidence first</span><span>Uncertainty labelled</span><span>Independent English archive</span></div>
        </div>
        {lead ? (
          <a className="english-lead-card" href={lead.primaryPath}>
            <img src={lead.image} alt={lead.title} width="1672" height="941" fetchPriority="high" decoding="async" />
            <div className="english-card-shade" />
            <div className="english-lead-card-content">
              <span>{recentIds.has(lead.id) ? 'New research' : lead.labels?.[0]}</span>
              <h2>{lead.title}</h2>
              <p>{lead.description}</p>
              <strong>Open the evidence file →</strong>
            </div>
          </a>
        ) : null}
      </section>

      {recentResearch.length ? (
        <section className="english-stories-section" id="latest-research">
          <div className="home-section-heading">
            <div><p className="eyebrow">Latest release · {formatDate(currentUpdateDate)}</p><h2>New research files</h2></div>
            <a className="section-text-link" href="/en/archive">Complete archive →</a>
          </div>
          <div className="english-post-grid">{recentResearch.map((post) => <EnglishPostCard post={post} key={post.id} />)}</div>
        </section>
      ) : null}

      <section className="english-intro-strip">
        <div><strong>{allPosts.length}</strong><span>English articles</span></div>
        <div><strong>{englishTopics.length}</strong><span>Research clusters</span></div>
        <div><strong>2</strong><span>Independent editions</span></div>
        <p>The English edition has its own archive, search, topic pages and editorial standards.</p>
      </section>

      <section className="english-topic-section">
        <div className="home-section-heading">
          <div><p className="eyebrow">Explore by question</p><h2>Connected research clusters</h2></div>
          <p>Related evidence is grouped instead of leaving every article isolated.</p>
        </div>
        <div className="english-topic-grid">
          {englishTopics.map((topic) => {
            const count = allPosts.filter((post) => post.topic === topic.slug).length;
            return (
              <a className="english-topic-card" href={`/en/topic/${topic.slug}`} key={topic.slug}>
                <img src={topic.image} alt="" width="640" height="360" loading="lazy" decoding="async" />
                <div><span>{count} articles</span><h3>{topic.name}</h3><p>{topic.description}</p><strong>Explore topic →</strong></div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="english-stories-section">
        <div className="home-section-heading">
          <div><p className="eyebrow">Latest evidence files</p><h2>New and expanded English articles</h2></div>
          <a className="section-text-link" href="/en/archive">View complete archive →</a>
        </div>
        <div className="english-post-grid">{latest.map((post) => <EnglishPostCard post={post} key={post.id} />)}</div>
      </section>
    </div>
  );
}

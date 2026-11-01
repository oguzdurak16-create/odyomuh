import Image from 'next/image';
import { evergreenGuides } from '../lib/evergreen';
import { englishTopics } from '../data/en-topics';
import { allEnglishPosts } from '../lib/content-collections';
import EnglishPostCard from './EnglishPostCard';

export default function ProfessionalEnglishHome() {
  const allPosts = allEnglishPosts();
  const searchFocusPaths = ['/en/how-cuneiform-was-deciphered-behistun-inscription','/en/who-were-the-anunnaki-mesopotamian-gods-explained','/en/sunni-shia-difference-history-beliefs-and-practices','/en/strait-of-hormuz-and-bab-el-mandeb-explained','/en/mohenjo-daro-what-happened-to-the-indus-city'];
  const searchFocus = searchFocusPaths.map((path)=>allPosts.find((post)=>post.primaryPath===path)).filter(Boolean);
  const guides = evergreenGuides(allPosts, 'en');
  const recentResearch = guides.slice(0, 5);
  const lead = guides[0];
  const latest = guides.slice(5);

  return <div className="english-edition" lang="en">
    <section className="english-hero english-global-hero"><div className="english-hero-copy"><p className="eyebrow">ODYOMUH · Global English Edition</p><h1>History, stripped back to evidence.</h1><p>Evidence-led archaeology, ancient texts, historical mysteries and long-form research for global readers.</p><form className="edition-search" action="/en/search" method="get" role="search"><input type="search" name="q" aria-label="Search the history archive" placeholder="Find a topic or question…" /><button type="submit">Search</button></form><div className="english-hero-actions"><a className="home-primary-action" href="#latest-research">History guides</a><a className="home-secondary-action" href="/en/archive">Browse archive</a></div><div className="english-trust-row"><span>Primary evidence first</span><span>Uncertainty labelled</span><span>Independent archive</span></div></div>
      {lead ? <a className="english-lead-card" href={lead.primaryPath}><Image src={lead.image} alt={lead.title} fill sizes="(max-width: 1080px) 100vw, 58vw" priority /><div className="english-card-shade" /><div className="english-lead-card-content"><span>{'History explained'}</span><h2>{lead.title}</h2><p>{lead.description}</p><strong>Open the evidence file →</strong></div></a> : null}
    </section>
    {recentResearch.length ? <section className="english-stories-section" id="latest-research"><div className="home-section-heading"><div><p className="eyebrow">Foundations and evidence</p><h2>History and archaeology guides</h2></div><a className="section-text-link" href="/en/archive">Complete archive →</a></div><div className="english-post-grid">{recentResearch.filter((post)=>post.id!==lead?.id).map((post)=><EnglishPostCard post={post} key={post.id} />)}</div></section> : null}
    <section className="english-intro-strip"><div><strong>{allPosts.length}</strong><span>English articles</span></div><div><strong>{englishTopics.length}</strong><span>Research clusters</span></div><div><strong>2</strong><span>Independent editions</span></div><p>The English edition has its own archive, search, topic pages and editorial standards.</p></section>
    <section className="english-topic-section"><div className="home-section-heading"><div><p className="eyebrow">Explore by question</p><h2>Connected research clusters</h2></div><p>Related evidence is grouped instead of leaving every article isolated.</p></div><div className="english-topic-grid">{englishTopics.map((topic)=>{const count=allPosts.filter((post)=>post.topic===topic.slug).length; return <a className="english-topic-card" href={`/en/topic/${topic.slug}`} key={topic.slug}><span style={{position:'relative',display:'block'}}><Image src={topic.image} alt="" fill sizes="(max-width: 620px) 100vw, 42vw" /></span><div><span>{count} articles</span><h3>{topic.name}</h3><p>{topic.description}</p><strong>Explore topic →</strong></div></a>;})}</div></section>
    {searchFocus.length ? <section className="english-stories-section" aria-labelledby="essential-explainers-title"><div className="home-section-heading"><div><p className="eyebrow">Start with the evidence</p><h2 id="essential-explainers-title">Essential explainers</h2></div><a className="section-text-link" href="/en/archive">View complete archive →</a></div><div className="english-post-grid">{searchFocus.map((post)=><EnglishPostCard post={post} key={post.id} />)}</div></section> : null}
    <section className="english-stories-section"><div className="home-section-heading"><div><p className="eyebrow">Continue your research</p><h2>Ancient life, materials and interpretation</h2></div><a className="section-text-link" href="/en/archive">View complete archive →</a></div><div className="english-post-grid">{latest.map((post)=><EnglishPostCard post={post} key={post.id} />)}</div></section>
  </div>;
}

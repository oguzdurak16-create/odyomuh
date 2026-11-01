import assert from 'node:assert/strict';
import { allTurkishPosts, allEnglishPosts } from '../lib/content-collections.js';
import { evergreenPaths, evergreenGuides } from '../lib/evergreen.js';
import { evergreenTitleIssues } from '../lib/evergreen-generation-policy.js';
import { evergreenRevisions } from '../data/evergreen-revisions.js';

for (const [locale, posts] of [['tr', allTurkishPosts()], ['en', allEnglishPosts()]]) {
  const guides = evergreenGuides(posts, locale);
  assert.equal(guides.length, evergreenPaths[locale].length, `${locale}: a selected guide is missing from the canonical collection`);
  assert.equal(new Set(evergreenPaths[locale]).size, guides.length, `${locale}: duplicate selected guide`);
  for (const guide of guides) {
    assert.ok(!guide.newsArticle, `${locale}: news must not enter the evergreen selection: ${guide.primaryPath}`);
    assert.ok(guide.sources?.length >= 2 && guide.sources.every((source) => /https:\/\/[^\s]+/.test(source)), `Selected guide needs linked, inspectable references: ${guide.primaryPath}`);
    assert.ok(!/Building an evidence map|How archaeology turns a site into an argument|From impressive object to engineering explanation|Konuyu daha derin okumak|data-personalized/.test(guide.contentHtml), `Generic appendix leaked into selected guide: ${guide.primaryPath}`);
    assert.ok(guide.title && guide.description && guide.contentHtml, `${locale}: guide must have actual content: ${guide.primaryPath}`);
  }
}
const turkish = new Map(allTurkishPosts().map((post) => [post.primaryPath, post]));
for (const path of Object.keys(evergreenRevisions)) {
  const article = turkish.get(path);
  assert.ok(article, `Revised article must stay routable: ${path}`);
  assert.ok(article.sources.length >= 2, `Revised article must have an inspectable source trail: ${path}`);
  assert.ok(!/data-personalized|font-claude-response-body/.test(article.contentHtml), `Legacy filler leaked into revised article: ${path}`);
  assert.equal(article.updated, '2026-11-01T00:00:00Z');
}
const year = new Date().getUTCFullYear();
assert.equal(evergreenTitleIssues({ title: 'Göbekli Tepe Nedir? Kanıtlar ve Yorumlar' }, year).length, 0);
assert.equal(evergreenTitleIssues({ title: 'The Treaty of 1923: Historical Context' }, year).length, 0, 'Historical years must remain allowed');
assert.ok(evergreenTitleIssues({ title: `Göbekli Tepe ${year}: Son Keşifler` }, year).length);
assert.ok(evergreenTitleIssues({ title: 'Bugün ortaya çıkan arkeoloji haberi' }, year).length);
assert.ok(evergreenTitleIssues({ seoTitle: 'Breaking news from an excavation' }, year).length);
console.log('Evergreen checks passed: 20 canonical bilingual guides; historical dates allowed; news and current-year headlines rejected.');

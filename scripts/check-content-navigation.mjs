import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { allTurkishPosts, allEnglishPosts } from '../lib/content-collections.js';
import { internalArticleAliases, englishTopicAliases } from '../lib/internal-link-aliases.js';
import { findEnglishTopic, englishTopicHref } from '../data/en-topics.js';
import { stripLegacyAppendices } from '../lib/legacy-appendices.js';
import { priorityGuideRevisions } from '../data/priority-guide-revisions.js';
// Node requires explicit JSON import attributes; Next handles this source import itself.
registerHooks({ load(url, context, next) {
  return next(url, url.endsWith('.json') ? { ...context, importAttributes: { type: 'json' } } : context);
}});
const { sanitizeContent } = await import('../lib/sanitize-content.js');
const tr = allTurkishPosts(), en = allEnglishPosts();
const paths = new Set([...tr, ...en].map((post) => post.primaryPath));
for (const [from, to] of Object.entries(internalArticleAliases)) {
  assert.ok(paths.has(to), `Broken repair destination: ${to}`);
  assert.ok(!internalArticleAliases[to], `Repair must not create a redirect chain: ${from}`);
  const html = sanitizeContent(`<a href="${from}?ref=reading#evidence">Read</a>`);
  assert.ok(html.includes(`${to}?ref=reading#evidence`), 'Repair must preserve query and anchor');
}
for (const [from, to] of Object.entries(englishTopicAliases)) {
  assert.ok(findEnglishTopic(to), `Unknown replacement topic: ${from}`);
}
assert.equal(englishTopicHref(undefined), '/en/archive');
assert.equal(englishTopicHref('does-not-exist'), '/en/archive');
assert.equal(englishTopicHref('mesopotamia'), '/en/topic/mesopotamia');
for (const post of en) {
  if (post.turkishPath) assert.ok(paths.has(post.turkishPath), `Broken translation link: ${post.primaryPath} -> ${post.turkishPath}`);
  if (post.topic) assert.ok(findEnglishTopic(post.topic), `Unknown English topic: ${post.primaryPath}`);
}
for (const post of [...tr, ...en]) {
  const html = sanitizeContent(post.contentHtml);
  assert.ok(!/Building an evidence map from the tablets|How archaeology turns a site into an argument|From impressive object to engineering explanation|Konuyu daha derin okumak|data-personalized/.test(html), `Legacy appendix rendered: ${post.primaryPath}`);
}
for (const [path, revision] of Object.entries(priorityGuideRevisions)) {
  assert.ok(paths.has(path));
  assert.ok(revision.sources.length >= 2 && revision.sources.every((s) => /https:\/\//.test(s)), `Missing linked sources: ${path}`);
}
const sample = '<h2>Original argument</h2><p>Evidence</p><h2>Building an evidence map from the tablets</h2><p>Repeated advice</p><h2>Frequently asked questions</h2><p>Specific answer</p>';
const cleaned = stripLegacyAppendices(sample);
assert.ok(cleaned.includes('Original argument') && cleaned.includes('Specific answer') && !cleaned.includes('Repeated advice'));
assert.equal(stripLegacyAppendices(cleaned), cleaned, 'Appendix removal must be idempotent');
assert.equal(stripLegacyAppendices('<h2>How archaeology works</h2><p>Original research</p>'), '<h2>How archaeology works</h2><p>Original research</p>');
console.log(`Content/navigation checks passed: ${tr.length + en.length} resolved articles, ${Object.keys(priorityGuideRevisions).length} source-reviewed revisions, no rendered legacy appendices, valid translation/topic destinations.`);

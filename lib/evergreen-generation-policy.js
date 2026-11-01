export const evergreenGenerationPolicy = `
Mandatory evergreen publication policy:
- The enduring history or archaeology question is the article's subject. A trend may suggest a question, but must not turn the article into a daily news report.
- Write titles, slugs, summaries and main sections that remain useful after the publication week. Avoid today, this week, breaking news, a current-year freshness suffix and promises of a recent discovery.
- Preserve historical dates and the real dates of cited research. Explicitly date any recent finding used as evidence; do not imply that an old report is new.
- Explain what is established, what is interpretation, and what is disputed. Provide a direct answer, supporting primary sources and the limits of the evidence.
- Improve an existing guide when the topic is already covered; do not propose a near-duplicate merely to publish a fresh URL.
- Never advance a publication or review date to manufacture freshness.
`;

export function evergreenTitleIssues(article, year) {
  const issues = [];
  const headline = [article.title, article.seoTitle].filter(Boolean).join(' ');
  if (/\b(?:breaking news|today|this week|latest news)\b|son dakika|bugün|bu hafta/iu.test(headline)) issues.push('Evergreen title must not depend on current news or relative dates');
  if (year && new RegExp(`\\b${year}\\b`).test(headline)) issues.push('Evergreen title must not use the publication year as a freshness claim');
  return issues;
}

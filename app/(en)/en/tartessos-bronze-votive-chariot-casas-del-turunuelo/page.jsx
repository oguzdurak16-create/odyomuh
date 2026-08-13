import { dailyEnglishPosts } from '../../../../data/daily-2026-07-21';
import DailyArticlePage from '../../../../components/DailyArticlePage';
import { baseUrl } from '../../../site-data';

const post = dailyEnglishPosts.find((item) => item.id === 'en-daily-20260721-tartessos-bronze-chariot');
const siteUrl = baseUrl || 'https://www.odyomuh.net';
const seoTitle = 'Tartessos Bronze Chariot: Casas del Turuñuelo Discovery';
const seoDescription = 'What is the bronze votive chariot found at Casas del Turuñuelo? Explore its Tartessian context, dating, archaeological evidence and why the discovery matters.';

export const metadata = {
  title: seoTitle,
  description: seoDescription,
  keywords: [...post.labels, 'Tartessos bronze chariot', 'Casas del Turuñuelo', 'Tartessian archaeology'],
  alternates: { canonical: post.primaryPath, languages: { en: post.primaryPath, 'en-US': post.primaryPath, 'tr-TR': post.turkishPath, 'x-default': post.primaryPath } },
  openGraph: { type: 'article', locale: 'en_US', title: seoTitle, description: seoDescription, url: `${siteUrl}${post.primaryPath}`, images: [{ url: post.image, width: 1672, height: 941, alt: post.title }], publishedTime: post.published, modifiedTime: post.updated },
  twitter: { card: 'summary_large_image', title: seoTitle, description: seoDescription, images: [post.image] },
};

export default function Page() {
  return <DailyArticlePage post={post} locale="en" siteUrl={siteUrl} />;
}

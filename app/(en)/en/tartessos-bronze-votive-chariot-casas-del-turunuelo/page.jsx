import { dailyEnglishPosts } from '../../../../data/daily-2026-07-21';
import DailyArticlePage from '../../../../components/DailyArticlePage';
import { baseUrl } from '../../../site-data';

const post = dailyEnglishPosts.find((item) => item.id === 'en-daily-20260721-tartessos-bronze-chariot');
const siteUrl = baseUrl || 'https://www.odyomuh.net';
const seoTitle = 'Casas del Turuñuelo Bronze Chariot: The Tartessos Discovery Explained';
const seoDescription = 'Explore the bronze ceremonial chariot from Casas del Turuñuelo, its Tartessos-era archaeological context, dating and what the find reveals about ritual and elite culture.';

export const metadata = {
  title: seoTitle,
  description: seoDescription,
  keywords: [...post.labels, 'Casas del Turuñuelo bronze chariot', 'Tartessos bronze chariot', 'bronze ceremonial chariot', 'Tartessian archaeology'],
  alternates: { canonical: post.primaryPath, languages: { en: post.primaryPath, 'en-US': post.primaryPath, 'tr-TR': post.turkishPath, 'x-default': post.primaryPath } },
  robots: { index: true, follow: true },
  openGraph: { type: 'article', locale: 'en_US', title: seoTitle, description: seoDescription, url: `${siteUrl}${post.primaryPath}`, images: [{ url: post.image, width: 1672, height: 941, alt: post.title }], publishedTime: post.published, modifiedTime: post.updated },
  twitter: { card: 'summary_large_image', title: seoTitle, description: seoDescription, images: [post.image] },
};

export default function Page() {
  return <DailyArticlePage post={post} locale="en" siteUrl={siteUrl} />;
}

import { dailyEnglishPosts } from '../../../../data/current-updates-2026-07-22';
import DailyArticlePage from '../../../../components/DailyArticlePage';
import { baseUrl } from '../../../site-data';

const rawPost = dailyEnglishPosts.find((item) => item.id === 'en-catalhoyuk-rooftop-city');
const post = {
  ...rawPost,
  title: 'Çatalhöyük: Why People Entered Houses Through the Roof',
  description: 'Çatalhöyük had tightly packed mudbrick houses with few street-like gaps. See how roof access worked, what archaeologists found inside homes and how daily life was organized.',
  primaryPath: rawPost.primaryPath || `/en/${rawPost.slug}`,
};
const siteUrl = baseUrl || 'https://www.odyomuh.net';
const seoTitle = 'Çatalhöyük Houses: Why Were They Entered Through the Roof?';
const seoDescription = 'Why did Çatalhöyük houses have roof entrances? See the settlement plan, roof access, wall paintings, burials and what archaeology reveals about daily life.';

export const metadata = {
  title: seoTitle,
  description: seoDescription,
  keywords: post.labels,
  alternates: {
    canonical: post.primaryPath,
    languages: {
      en: post.primaryPath,
      'en-US': post.primaryPath,
      'tr-TR': post.turkishPath,
      'x-default': post.primaryPath,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    title: seoTitle,
    description: seoDescription,
    url: `${siteUrl}${post.primaryPath}`,
    images: [{ url: post.image, width: 1672, height: 941, alt: post.title }],
    publishedTime: post.published,
    modifiedTime: post.updated,
  },
  twitter: {
    card: 'summary_large_image',
    title: seoTitle,
    description: seoDescription,
    images: [post.image],
  },
};

export default function Page() {
  return <DailyArticlePage post={post} locale="en" siteUrl={siteUrl} />;
}

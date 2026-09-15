import TimelineExperience from '../../../../components/TimelineExperience';
import timelineData from '../../../../data/timeline-events.json';
import { baseUrl } from '../../../site-data';

const siteUrl = baseUrl || 'https://www.odyomuh.net';
const canonical = '/p/tarih-kronolojisi.html';
const title = 'Dünya Tarihi Kronolojisi: Çağlar ve Önemli Olaylar';
const description = 'MÖ 9600’den günümüze dünya tarihi kronolojisi. Tarih öncesi, Antik Çağ, Orta Çağ, erken modern ve modern dönemin önemli olaylarını filtreleyin ve arayın.';

export const metadata = {
  title,
  description,
  keywords: ['dünya tarihi kronolojisi', 'tarih kronolojisi', 'tarih çağları', 'dünya tarihi', 'tarih sıralaması', 'tarihsel olaylar'],
  alternates: { canonical },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    title,
    description,
    url: `${siteUrl}${canonical}`,
    images: [{ url: '/generated-history/explorer-desk.webp', width: 1672, height: 941, alt: 'Dünya tarihi kronolojisi' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/generated-history/explorer-desk.webp'] },
};

export default function TarihKronolojisiPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Dünya tarihi kronolojisi nereden başlar?', acceptedAnswer: { '@type': 'Answer', text: 'Tek bir evrensel başlangıç tarihi yoktur. İnsanlık tarihi tarih öncesi dönemlerden başlar; yazılı tarih farklı bölgelerde yazının kullanılmaya başlamasıyla farklı tarihlerde başlatılır.' } },
      { '@type': 'Question', name: 'Tarih çağları nelerdir?', acceptedAnswer: { '@type': 'Answer', text: 'Yaygın okul anlatısında İlk Çağ, Orta Çağ, Yeni Çağ ve Yakın Çağ gibi ayrımlar kullanılır. Akademik dönemlendirme ise coğrafya ve konuya göre değişebilir.' } },
      { '@type': 'Question', name: 'Kronoloji ne işe yarar?', acceptedAnswer: { '@type': 'Answer', text: 'Kronoloji olayların sırasını, eş zamanlı gelişmeleri ve neden-sonuç ilişkilerini görmeye yardımcı olur.' } },
    ],
  };
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${siteUrl}${canonical}`,
    inLanguage: 'tr-TR',
    isPartOf: { '@type': 'WebSite', name: 'ODYOMUH', url: siteUrl },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <TimelineExperience data={timelineData} />
    </>
  );
}

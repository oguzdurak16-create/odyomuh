import Link from 'next/link';
import HistoricalYearCalculator from '../../../../components/HistoricalYearCalculator';
const path = '/araclar/tarih-araligi-hesaplama';
export const metadata = { title: 'MÖ/MS Tarih Aralığı ve Yüzyıl Hesaplama', description: 'Milattan önce ve sonra verilen iki yıl arasındaki farkı yıl 0 eklemeden hesaplayın; her tarihin hangi yüzyıla ait olduğunu bulun.', alternates: { canonical: path } };
export default function HistoricalYearsPage() {
  return <article style={{ maxWidth: 860, margin: '28px auto', padding: '0 16px 32px', lineHeight: 1.8 }}>
    <Link href="/">Odyomuh ana sayfa</Link><h1 style={{ fontSize: 'clamp(27px,4vw,40px)', marginTop: 20, lineHeight: 1.25 }}>MÖ/MS tarih aralığı hesaplama</h1>
    <p>İki yıl arasındaki farkı ve yüzyılları bulun. Tarihsel MÖ/MS gösterimi kullanılır; MÖ 1 doğrudan MS 1 ile devam eder.</p>
    <HistoricalYearCalculator />
    <h2>Yıl 0 neden çıkarılır?</h2><p>Aynı dönemde iki yıl doğrudan çıkarılır. MÖ ve MS arasında geçerken iki yıl numarası toplanıp 1 çıkarılır. Örneğin MÖ 500 ile MS 500 arasında 999 yıl; MÖ 44 ile MS 14 arasında 57 yıl vardır. Gün ve ay bilinmiyorsa bu sonuç kesin yaş veya gün cinsinden süre değildir.</p>
    <h2>Yüzyıl nasıl bulunur?</h2><p>Pozitif yıl numarası 100’e bölünüp yukarı yuvarlanır. MS 1–100 birinci, MS 101–200 ikinci yüzyıldır. MÖ 100–1 birinci, MÖ 200–101 ikinci yüzyıldır. Astronomik yıl numaralandırmasının yıl 0 kullandığına dikkat edin; araç o gösterimi istemez.</p>
    <p>Takvim gösterimleri için <a href="https://aa.usno.navy.mil/faq/calendars" rel="noreferrer" target="_blank">ABD Deniz Gözlemevi takvim açıklamaları</a>. Bağlamı görmek için <Link href="/p/tarih-kronolojisi.html">dünya tarihi kronolojisini</Link> açın.</p>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'MÖ/MS tarih aralığı hesaplayıcı', url: 'https://www.odyomuh.net' + path, applicationCategory: 'EducationalApplication', operatingSystem: 'Any', isAccessibleForFree: true }) }} />
  </article>;
}

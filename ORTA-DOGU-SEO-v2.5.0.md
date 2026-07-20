# ODYOMUH v2.5.0 — Orta Doğu Gündemi ve SEO Kümesi

## Eklenen içerik yapısı

Bu sürümde güncel arama niyetlerine göre ayrı bir Orta Doğu konu kümesi oluşturuldu.

- 12 yeni Türkçe uzun makale
- 8 yeni İngilizce uzun makale
- 12 yeni 16:9 WebP kapak görseli
- Türkçe `/gundem/orta-dogu` merkez sayfası
- İngilizce `/en/topic/middle-east` konu sayfası
- Türkçe ve İngilizce eşleşen yazılarda karşılıklı `hreflang`
- NewsArticle, Article, FAQPage, BreadcrumbList, CollectionPage ve ItemList yapılandırılmış verileri
- Güncel dosyalarda son kontrol tarihi ve değişebilir durum uyarısı
- Kaynak listeleri, kavram sözlükleri ve iç bağlantı kümeleri
- Arama eş anlamlıları ve Türkçe/İngilizce transliterasyonlar
- Güncel içerikler için sitemap’te günlük tarama sinyali

## Türkçe yazılar

1. İran–Amerika Savaşı 2026: Ne Oluyor, Hürmüz Boğazı Neden Kritik?
2. İran–İsrail Çatışması Nasıl Başladı? Gölge Savaştan Açık Savaşa
3. Husiler Kimdir? Yemen, İran Bağlantısı ve Kızıldeniz Saldırıları
4. Hürmüz Boğazı ve Babülmendep Nerede? Dünya Ticareti Neden Bu İki Geçide Bağlı?
5. İran Nükleer Programı Nedir? Uranyum Zenginleştirme, IAEA ve Yaptırımlar
6. “Direniş Ekseni” Nedir? Hizbullah, Husiler, Hamas ve Irak Milisleri Aynı Yapı mı?
7. İranlı Şiiler Kimdir? On İki İmam Şiiliği, Safeviler ve Modern İran
8. Şii ve Sünni Arasındaki Fark Nedir? Tarih, İnanç ve Uygulamalar
9. Yahudilik, İsrail ve Siyonizm Aynı Şey mi? Kavramların Farkı
10. İsrail–Filistin Sorunu Nasıl Başladı? 19. Yüzyıldan Günümüze Kronoloji
11. Yahudiler ve Müslümanlar Tarihte Nasıl Yaşadı? Endülüs’ten Osmanlı’ya
12. ABD Orta Doğu’da Neden Var? Üsler, Petrol, İsrail ve Deniz Yolları

## Editoryal güvenlik

- Devlet, hükümet, halk, din, mezhep ve silahlı örgüt birbirinden ayrıldı.
- İran hükümeti bütün İranlılar veya Şiilerle özdeşleştirilmedi.
- İsrail hükümeti bütün Yahudilerle özdeşleştirilmedi.
- Hamas, Hizbullah ve Husiler bütün Müslümanlarla özdeşleştirilmedi.
- Antisemitik, İslamofobik, mezhepçi veya etnik kolektif suçlama kullanılmadı.

## Teknik doğrulama

- Next.js production build: başarılı
- Üretilen statik/dinamik rota toplamı: 353
- Yeni Türkçe yazı sayısı: 12
- Yeni İngilizce yazı sayısı: 8
- Yeni görsel sayısı: 12
- Yeni içeriklerde minimum kelime sayısı: 1.000 üzerinde
- `npm audit`: 0 güvenlik açığı
- `/gundem/orta-dogu`: HTTP 200
- Türkçe örnek makale: HTTP 200
- İngilizce örnek makale: HTTP 200
- `/en/topic/middle-east`: HTTP 200
- `sitemap.xml`: HTTP 200

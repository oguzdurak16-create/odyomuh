# ODYOMUH v2.4.0 Global Sürüm Raporu

Tarih: 16 Temmuz 2026

## Sonuç

- İngilizce makale: 38
- İngilizce konu kümesi: 6
- İngilizce politika/kurumsal sayfa: 7
- Yeni çift dilli keşif dosyası: 7
- En kısa İngilizce makale: 1.109 kelime
- En uzun İngilizce makale: 1.497 kelime
- Toplam İngilizce makale kelimesi: 47.079
- Production build: başarılı
- Üretilen toplam rota: 280
- Güvenlik denetimi: 0 açık

## Yeni global yapı

- `/en/topic/new-discoveries`: Temmuz 2026 arkeoloji ve antik tarih keşifleri
- 7 yeni İngilizce makale
- Her yeni İngilizce makalede Türkçe karşılığına hreflang eşleşmesi
- Article, FAQ ve Breadcrumb yapılandırılmış verileri
- Yerel WebP kapak ve sosyal paylaşım görselleri

## Konu dağılımı

- `archaeological-mysteries`: 6 makale
- `lost-technology`: 5 makale
- `mesopotamia`: 8 makale
- `myths-vs-evidence`: 6 makale
- `new-discoveries`: 7 makale
- `undeciphered-scripts`: 6 makale

## Doğrulamalar

- `npm run content:check`: başarılı; 38 İngilizce makalenin tamamı 1.000 kelimenin üzerinde.
- `npm run build`: başarılı; 280 rota üretildi.
- Yeni Türkçe ve İngilizce rotalar HTTP 200 ile test edildi.
- Yeni görseller HTTP 200 ile test edildi.
- `npm audit --omit=dev --audit-level=high`: 0 açık.

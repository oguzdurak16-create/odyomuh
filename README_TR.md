# ODYOMUH v2.4.0 - Güncel Trend İçerikleri ve Global Yayın Paketi

Bu paket, Blogger arşivini Next.js ve Vercel üzerinde yayınlamak için hazırlanmıştır.

## Yayina hazir kontrol listesi

- 84 Türkçe yazı ve 9 sayfa bulunur.
- 84 Türkçe yazının tamamı en az 1.000 kelimedir; 7 yeni güncel keşif yazısı Temmuz 2026 trendlerine göre eklenmiştir.
- Kelime sayısı raporu `data/content-word-counts.csv` dosyasındadır.
- Yazı kapakları ve ana sayfa tematik görselleri yerel WebP dosyalarıyla çalışır; yeni trend içerikleri için 7 ek görsel üretilmiştir.
- Tum kart, kapak, yan panel ve yazinin ust gorseli sabit oranli kutular kullanir. Gorseller `object-fit: cover` ile kutuyu doldurur.
- Yazinin icindeki resimler kirpilmaz; mobilde tasma yapmadan `contain` ile gorunur.
- Canonical URL, Open Graph, Twitter karti, sitemap, robots, WebSite/Organization/Article JSON-LD yapilandirmasi eklidir.
- `/search` arama sayfasi indeks disidir.
- `ads.txt` eklenmistir.
- Harici Blogger iceriginden gelen scriptler istemci tarafinda calistirilmaz.
- Npm registry public npm olarak sabitlenmiştir. Tekrarlanabilir kurulum için `package-lock.json` pakete dahildir.

## GitLab ve Vercel

1. Paketi cikarip mevcut GitLab repo klasorundeki dosyalarin uzerine yaz.
2. `GITLABA-YUKLE.bat` dosyasini calistir veya terminalden degisiklikleri push et.
3. Vercel projeni yeniden deploy et.
4. Domain baglandiktan sonra Vercel Environment Variables alanina sunu ekle:

```text
NEXT_PUBLIC_SITE_URL=https://www.odyomuh.net
```

5. Son olarak Google Search Console icinden su adresi gonder:

```text
https://www.odyomuh.net/sitemap.xml
```

## Vercel ayarlari

`vercel.json` otomatik olarak su komutlari uygular:

```text
Install Command: npm ci --no-audit --no-fund --prefer-online
Build Command: npm run build
```

Node sürümü proje içinde `24.x` olarak sabitlenmiştir.

## v2.4.0 Global English Edition

Global yayın `/en` altında bağımsız çalışır:

- `/en` global ana sayfa
- `/en/archive` İngilizce arşiv
- `/en/search` İngilizce arama
- `/en/topic/...` konu kümeleri
- `/en/feed.xml` RSS

İngilizce bölümde 38 adet 1.000+ kelimelik makale, 6 konu kümesi ve 7 yayın/güven sayfası bulunur. Yeni `new-discoveries` kümesi 7 güncel keşif yazısını içerir. Kontrol için:

```bash
npm ci
npm run content:check
npm run build
```

Ayrıntılı rapor: `GLOBAL-SURUM-RAPORU.md`

## v2.5.0 — Orta Doğu Gündemi

İran, ABD, İsrail, Husiler, Hürmüz, İran nükleer programı, Şii–Sünni tarihi, Yahudilik–İsrail–Siyonizm ayrımı ve İsrail–Filistin kronolojisi için yeni Türkçe/İngilizce SEO içerik kümesi eklendi. Ayrıntılar `ORTA-DOGU-SEO-v2.5.0.md` dosyasındadır.

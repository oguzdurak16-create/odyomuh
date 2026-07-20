# ODYOMUH v2.1.0

## Vercel build düzeltmeleri

- Node.js motoru `24.x` olarak güncellendi.
- `package-lock.json` içindeki yalnızca yerel çalışma ortamında erişilebilen dahili paket adresleri, resmi `registry.npmjs.org` adresleriyle değiştirildi.
- Vercel kurulumu `npm ci --no-audit --no-fund --prefer-online` olarak ayarlandı.
- Next.js `dependencies` altında sabit sürümle korunuyor.

## Görsel entegrasyonu

Üretilen 10 görsel WebP biçimine dönüştürülerek `public/generated-global` klasörüne eklendi. Toplam boyut yaklaşık 2.4 MB'dir. Görseller şu alanlarda kullanılır:

- Anunnaki
- İgigiler
- Enuma Eliş
- Çivi yazısının çözülmesi
- Rongorongo
- Antikythera mekanizması
- Göbekli Tepe
- Nibiru
- Mitler ve kanıt kontrolü
- İngilizce ana yayın/konu görseli

Tüm görseller makale kapaklarında, kartlarda, Open Graph ve Twitter paylaşım verilerinde aynı kaynak üzerinden görünür.

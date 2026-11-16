import { priorityGuideRevisions } from './priority-guide-revisions.js';
import { recoveryRevisions } from './recovery-revisions.js';
import { factcheckRevisions } from './factcheck-revisions.js';
import { legacyFactcheckRevisions } from './legacy-factcheck-revisions.js';
// Substantive revisions: preserve the original URL and publication timestamp.
// Keep the established page titles and search snippets when revising article bodies.
const updated = '2026-11-01T00:00:00Z';
export const evergreenRevisions = {
  '/2025/12/orun-ve-ulus-nedir-ilk-turk-devletlerinde-mevki-ve-pay-sistemi-ders-notu.html': {
    updated: '2026-11-09T00:00:00Z', newsArticle: false,
    contentHtml: `<div class="odyomuh-note"><strong>Kısa cevap:</strong> Orun, bir topluluk içindeki yer ve mevkiyi; ülüş ise payı anlatır. Oğuznâme geleneğinde oturma düzeni ve şölen paylarının ilişkisini açıklamak için birlikte kullanılırlar.</div>
<h2>Orun ile ülüşün farkı</h2>
<p>Bir toplantıda kişinin nerede oturacağını sormak orunla, bölüşümden ne alacağını sormak ülüşle ilgilidir. Kürşat Koçak’ın <a href="https://dergipark.org.tr/tr/pub/ijoess/article/105976">araştırması</a> bu düzenlemeyi hükümdarlık otoritesi ve tören protokolü bağlamında ele alır. Kavramları yalnızca günlük sözlük anlamlarıyla okumak, statüyle ilişkilerini gözden kaçırır.</p>
<table><thead><tr><th>Kavram</th><th>Temel soru</th><th>Öğrenme örneği</th></tr></thead><tbody><tr><td>Orun</td><td>Hangi yer veya mevki?</td><td>Toplantıda kimin nereye oturacağı</td></tr><tr><td>Ülüş</td><td>Hangi pay?</td><td>Şölende kime hangi payın ayrılacağı</td></tr></tbody></table>
<h2>Kaynaklar neden önemlidir?</h2>
<p>Ebru Birkan Akhan’ın <a href="https://dergipark.org.tr/en/pub/mahder/article/582547">Oğuznâmeler incelemesi</a>, anlatıların hem sözlü geleneğin hem de yazıya geçirildikleri dönemlerin izlerini taşıdığını vurgular. Bu yüzden destandaki bir düzenlemeyi, bütün Türk topluluklarında aynı biçimde uygulanmış yazılı kanun gibi sunmak doğru değildir.</p>
<h2>Ülüş, devletin mülk olarak bölünmesi mi demektir?</h2>
<p>Her durumda değil. Osman Gazi Özgüdenli’nin <a href="https://islamansiklopedisi.org.tr/ulus">TDV İslâm Ansiklopedisi’ndeki Ülüş maddesi</a>, şölen payı anlamıyla siyasî-idarî kullanımları ayırır. Hanedan üyelerinin bir bölgenin idaresiyle görevlendirilmesini, otomatik olarak ülkenin bağımsız mülkiyet parçalarına ayrılmasıyla eşitlememek gerektiğine dikkat çeker. Dönemi ve kullanılan metni belirtmek, tek cümlelik ezberden daha güvenli bir açıklama sağlar.</p>
<h2>Orun hakkı neden sadece oturma yeri değildi?</h2>
<p>Abdülkadir İnan’ın <a href="https://makale.isam.org.tr/items/5b90a548-41a7-485e-a3df-ca4603a9088a">orun hukuku incelemesi</a>, boy ve kabilelerin büyük toplantılarda ve ziyafetlerde oturacağı yerin töreyle belirlenmesini anlatır. Yani burada yalnızca sofra düzeni değil, diğer topluluklar karşısındaki kabul edilmiş mevki de söz konusudur. Şölende ayrılan payı bu yer düzeninden ayrı bir rastgele ikram gibi okumamak gerekir.</p>
<h2>Kaynaklar hangi yönü açıklıyor?</h2>
<table><thead><tr><th>Kaynak</th><th>Öne çıkardığı konu</th><th>Okurken dikkat edilmesi gereken</th></tr></thead><tbody><tr><td>Abdülkadir İnan, Orun Hukuku</td><td>Meclis ve ziyafetteki mevki kuralları</td><td>Töre ile aktarılan düzenin dönemi ve topluluğu</td></tr><tr><td>Kürşat Koçak, 2011</td><td>Protokolün hükümdar otoritesiyle ilişkisi</td><td>Kuralların siyasî anlamını yalnızca kelime tanımına indirgememek</td></tr><tr><td>Ebru Birkan Akhan, 2019</td><td>Oğuznâmelerde mevki ve payın anlatımı</td><td>Destanî anlatı ile belgelendirilmiş uygulamayı ayırmak</td></tr><tr><td>TDV Ülüş maddesi</td><td>Payın şölen ve idarî kullanımları</td><td>Farklı tarihsel anlamları birbirine karıştırmamak</td></tr></tbody></table>
<p>Bu karşılaştırma, “orun = mevki, ülüş = pay” kısa tanımının neden başlangıç noktası olduğunu gösterir: tarihsel bağlamda iki kavram birlikte sosyal sıralama ve paylaşım hakkında bilgi verir. Örneğin Oğuznâmelerde bir boyun yerine veya payına dair anlatım bulunması, aynı düzenlemenin bütün Türk devletlerinde değişmeden yürürlükte kaldığını kanıtlamaz.</p>
<h2>Kavramı örnek üzerinde kontrol edin</h2>
<p>Bir soruda oturma sırası anlatılıyorsa önce mevki ilişkisini; dağıtılan bir hisse anlatılıyorsa önce pay ilişkisini araştırın. Ardından örneğin hangi topluluk, dönem ve kaynaktan geldiğini sorun. Buradaki tablo bir öğrenme aracıdır; bütün tarihsel uygulamaların ayrıntılı dökümü değildir. <a href="/p/ders-notlari.html">Diğer tarih kavramlarına</a> geçerken de aynı bağlam kontrolünü kullanabilirsiniz.</p>`,
    faq: [
      { question: 'Orun ve ülüş aynı şey midir?', answer: 'Hayır. Orun yer ve mevkiyle, ülüş payla ilgilidir; statü ve bölüşüm bağlamında birlikte ele alınabilirler.' },
      { question: 'Ülüş her zaman ülkenin parçalanması anlamına mı gelir?', answer: 'Hayır. Şölen payı ile siyasî-idarî görevlendirme farklı bağlamlardır; hangi kaynak ve dönemin anlatıldığı kontrol edilmelidir.' },
    ],
    sources: [
      'Kürşat Koçak — İslamiyet’ten Önceki Türk Devlet Geleneklerine Göre Orun ve Ülüş, 2011: https://dergipark.org.tr/tr/pub/ijoess/article/105976',
      'Ebru Birkan Akhan — Oğuznâmelerde Orun ve Ülüş Paylaşımı, 2019: https://dergipark.org.tr/en/pub/mahder/article/582547',
      'Osman Gazi Özgüdenli — Ülüş, TDV İslâm Ansiklopedisi: https://islamansiklopedisi.org.tr/ulus',
      'Abdülkadir İnan — Orun ve Ülüş Meselesi I: Mevki-Orun Hukuku (TTK, 1968): https://makale.isam.org.tr/items/5b90a548-41a7-485e-a3df-ca4603a9088a',
    ],
  },
  '/2025/12/ongun-turk-boylarinin-kutsal-damgalari-ve-totem-hayvanlari.html': {
    updated: '2026-11-09T00:00:00Z', newsArticle: false,
    contentHtml: `<div class="odyomuh-note"><strong>Kısa cevap:</strong> Ongun veya onkun, Oğuz boylarına ilişkin anlatılarda boyla ilişkilendirilen hayvanı, özellikle kuşu anlatır. Damga ise bir işarettir. İkisini aynı şey saymak, kaynaklardaki ayrı bilgileri birbirine karıştırır.</div>
<h2>Ongun, damga ve ülüş nasıl ayrılır?</h2>
<p>Faruk Sümer’in <a href="https://islamansiklopedisi.org.tr/cavuldur">Çavuldur maddesi</a> somut bir karşılaştırma sunar: Reşîdüddin’in anlatısında boyun kuşu, şölen payı ve damgası ayrı ayrı verilir. Bu, her bir başlığın başka bir bilgi türünü taşıdığını gösterir. Bir kuş tasvirini görmek, onun aynı zamanda belirli bir boyun damgası olduğunu tek başına kanıtlamaz.</p>
<table><thead><tr><th>Terim</th><th>İncelenen bilgi</th></tr></thead><tbody><tr><td>Ongun / onkun</td><td>Boyla ilişkilendirilen hayvan veya kuş</td></tr><tr><td>Damga / tamga</td><td>Tanımlayıcı simgesel işaret</td></tr><tr><td>Ülüş</td><td>Pay ve bölüşüm ilişkisi</td></tr></tbody></table>
<h2>Döğer boyu örneğinde ongun, damga ve ülüş</h2>
<p>Faruk Sümer’in <a href="https://islamansiklopedisi.org.tr/doger">Döğer maddesi</a>, Reşîdüddin’in kaydından hareketle aynı boy için üç ayrı bilgi verir: <strong>onkun olarak kartal</strong>, şölen payı yani ülüş olarak “aşığlu” ve bunlardan ayrı bir damga şekli. Bu, hayvan simgesinin damganın kendisi veya yiyecek payı olmadığını somut biçimde gösterir. Kaydın tarihsel bir metnin aktarımı olduğu unutulmamalı; bütün Oğuz boyları için tek bir simge veya tek bir inanç biçimi varmış gibi genellenmemelidir.</p>
<table><thead><tr><th>Döğer kaydında</th><th>Verilen bilgi</th><th>Karıştırılmaması gereken</th></tr></thead><tbody><tr><td>Ongun / onkun</td><td>Kartal (boyla ilişkilendirilen kuş)</td><td>Damganın çizimi değildir</td></tr><tr><td>Damga / tamga</td><td>Boyu tanıtan ayrı işaret</td><td>Kuşun adı değildir</td></tr><tr><td>Ülüş</td><td>Şölen etinden ayrılan pay</td><td>Boyun hayvan sembolü değildir</td></tr></tbody></table>
<p>TDV İslâm Ansiklopedisi’nin <a href="https://islamansiklopedisi.org.tr/damga">Damga maddesi</a>, damgaların hayvanları işaretleme, sahipliği belirleme ve hanedan alameti olarak kullanımını örneklerle ele alır. Bu nedenle bir taş üzerindeki geometrik işareti kuş tasvirinden veya modern bir logodan bağımsız olarak belge ve dönemine göre yorumlamak gerekir.</p>
<h2>Damgalar nerelerde kullanılır?</h2>
<p>Nesrin Güllüdağ’ın <a href="https://dergipark.org.tr/tr/pub/avrasyad/article/175248">damga geleneği araştırması</a>, simgesel işaretlerin hayvanlar, mezar taşları, dokumalar ve başka nesneler üzerindeki kullanımını ele alır. Bir motifi değerlendirmek için yalnız biçim benzerliğine değil; bulunduğu yere, döneme ve karşılaştırılabilir örneklere bakılmalıdır.</p>
<h2>“Totem” sözcüğü bütün inançları açıklar mı?</h2>
<p>Bazı eski araştırmalar ongun için totem karşılığını kullanır. Fakat terimi kullanmak, her boyun aynı inanca sahip olduğunu veya bir hayvanı biyolojik atası saydığını kendiliğinden göstermez. Böyle bir iddia için incelenen metnin ne söylediği ayrıca gösterilmelidir. Bir ansiklopedi maddesindeki sınıflandırmayla, tarihsel kişinin kendi ifadesini ayırmak gerekir.</p>
<h2>Modern sembollerle bağlantı kurarken</h2>
<p>Bir spor kulübünün hayvan simgesini veya bir şirketin logosunu tarihî ongunun doğrudan devamı saymak için bağımsız belge gerekir. Benzerlik, süreklilik kanıtı değildir. Aynı nedenle bir internet tablosundan hareketle kişinin hangi boydan geldiğine karar verilemez. Bu rehber, soy tespiti yerine terimleri kaynaklarıyla ayırmayı amaçlar. <a href="/2025/12/orun-ve-ulus-nedir-ilk-turk-devletlerinde-mevki-ve-pay-sistemi-ders-notu.html">Orun ve ülüş açıklaması</a> bu karşılaştırmanın devamıdır.</p>`,
    faq: [
      { question: 'Ongun ile damga aynı mıdır?', answer: 'Hayır. Ongun boyla ilişkilendirilen hayvan veya kuşu, damga ise tanımlayıcı işareti anlatır.' },
      { question: 'Modern bir logonun eski bir onguna benzediği görülürse bağlantı kanıtlanır mı?', answer: 'Hayır. Tarihsel devamlılık iddiası için biçim benzerliğinin yanında belge ve bağlam gerekir.' },
    ],
    sources: [
      'Faruk Sümer — Çavuldur, TDV İslâm Ansiklopedisi: https://islamansiklopedisi.org.tr/cavuldur',
      'Nesrin Güllüdağ — Türklerde Damga Geleneği ve Nogay Türklerinin Damgaları Üzerine Bir İnceleme, 2015: https://dergipark.org.tr/tr/pub/avrasyad/article/175248',
      'Faruk Sümer — Döğer, TDV İslâm Ansiklopedisi: https://islamansiklopedisi.org.tr/doger',
      'Yusuf Halaçoğlu — Damga, TDV İslâm Ansiklopedisi: https://islamansiklopedisi.org.tr/damga',
    ],
  },
  '/2025/12/feodalite-nedir-feodal-sistem-ve-ozellikleri-ders-notu.html': {
    updated, newsArticle: false,
    contentHtml: `<div class="odyomuh-note"><strong>Kısa cevap:</strong> Feodalite, Orta Çağ toplumlarındaki toprak, hak, hizmet ve kişisel bağlılık ilişkilerini açıklamak için kullanılan bir kavramdır. Bütün Avrupa’da aynı biçimde işlemiş tek bir sistem varmış gibi anlaşılmamalıdır.</div>
<h2>Toprak, hizmet ve bağlılık</h2>
<p>Fordham Üniversitesi’nin <a href="https://sourcebooks.fordham.edu/sbook1i.asp">Orta Çağ kaynak derlemesi</a>, konuyu yeminler, sözleşmeler, toprak devri, yönetim ve askerî destek başlıklarına ayırır. Bu ayrım önemlidir: bir toprak tahsisinin koşullarıyla bir bağlılık yemininin koşulları her belgede aynı değildir. Fief, vassallık ve lordluk, metnin tarihine ve hukuk diline göre birlikte incelenmelidir.</p>
<h2>Senyör, vassal ve serf</h2>
<p>Giriş düzeyinde senyör, lordluk veya üst hak sahibi olma ilişkisini; vassal, bağlılık ve hizmet ilişkisini; serf ise köylü bağımlılığını anlatmak için kullanılır. Bu terimler birbirinin yerine geçmez. Bir soylunun bağlılık yeminiyle bir köylünün emek veya ödeme yükümlülüğünü aynı sözleşme türü gibi göstermek yanıltıcıdır.</p>
<h2>Feodal piramit neden yeterli değildir?</h2>
<p>Londra Üniversitesi Tarih Araştırmaları Enstitüsü’nün <a href="https://www.history.ac.uk/news-events/events/ihr-events-archive/remembering-susan-reynolds">Susan Reynolds değerlendirmesi</a>, kraldan köylüye uzanan basit piramit çiziminin tarihsel ilişkileri anlatmakta yetersiz kaldığına dikkat çeker. Reynolds’ın çalışmaları, fief ve vassallık hakkındaki genel varsayımları yeniden tartışmaya açmıştır. Dolayısıyla bir ders şeması, tek başına her dönem ve bölgeyi açıklayan kanıt değildir.</p>
<h2>Bir örneği nasıl okumalısınız?</h2>
<p>Önce belgenin nerede ve ne zaman üretildiğini belirleyin. Ardından kimin kime ne vaat ettiğini, hangi hakkın devredildiğini ve karşılığında hangi hizmetin istendiğini ayrı ayrı yazın. Son olarak kullanılan terimlerin belgenin kendi dili mi, araştırmacının sınıflandırması mı olduğunu sorun. Bu yöntem, ezberlediğiniz şemayı örneğe zorla uygulamak yerine örneğin ne söylediğini anlamaya yarar.</p>
<p><a href="/p/ders-notlari.html">Diğer tarih ders notlarında</a> da kısa tanımı başlangıç olarak kullanın; ayrıntılı karşılaştırmada kaynak, dönem ve bölge bilgisini koruyun.</p>`,
    faq: [
      { question: 'Feodalite bütün Orta Çağ toplumlarında aynı mıydı?', answer: 'Hayır. Kavramın açıklama gücü ve uygulamalar dönem, bölge ve kaynaklara göre değerlendirilmelidir.' },
      { question: 'Vassal ile serf aynı kişi tipi midir?', answer: 'Hayır. Vassallık bağlılık ve hizmet ilişkisini, serflik ise köylü bağımlılığını anlatır.' },
    ],
    sources: [
      'Fordham University — Internet Medieval Sourcebook, Feudalism? bölümü: https://sourcebooks.fordham.edu/sbook1i.asp',
      'University of London, Institute of Historical Research — Remembering Susan Reynolds: https://www.history.ac.uk/news-events/events/ihr-events-archive/remembering-susan-reynolds',
    ],
  },
  '/2026/06/derinkuyu-yeralti-sehri-kimler-neden-yapti.html': {
    updated, newsArticle: false,
    contentHtml: `<div class="odyomuh-note"><strong>Kısa cevap:</strong> Derinkuyu, Kapadokya’da kaya içine oyulmuş çok katlı bir yeraltı yerleşimidir. Barınma, depolama, ibadet ve korunma işlevleri bulunan bu yapıyı, tek tarihte tek bir topluluğun bitirdiği değişmez bir proje gibi düşünmek yanıltıcıdır.</div>
<h2>Derinkuyu nerede ve hangi bağlamda?</h2>
<p>Derinkuyu Nevşehir’dedir. <a href="https://whc.unesco.org/en/list/357/">UNESCO’nun Göreme ve Kapadokya kayalık alanları kaydı</a>, Derinkuyu’yu Kaymaklı’yla birlikte bölgenin yeraltı yerleşimleri arasında sayar. Kaya yerleşimleri, bölgedeki uzun süreli yaşam ve yeniden kullanımın parçasıdır; yalnızca sıra dışı bir mimari görüntüden ibaret değildir.</p>
<h2>İçeride hangi yapılar bulunur?</h2>
<p><a href="https://engelsiz.ktb.gov.tr/TR-288407/derinkuyu-yeralti-sehri.html">Kültür ve Turizm Bakanlığı’nın tanıtımı</a>, kilerler, yemekhane, kilise, şırahane, kuyular ve havalandırma bağlantıları gibi unsurları açıklar. Dar geçitler ve iç bağlantılar farklı işlevlerin birlikte düzenlendiğini gösterir. Bir mekânın adlandırılmasını değerlendirirken bunun resmî tanıtımdaki yorum mu, doğrudan belgelenmiş kullanım mı olduğunu ayırmak yararlıdır.</p>
<h2>İnsanlar neden yeraltına indi?</h2>
<p>UNESCO açıklaması, Kapadokya’daki yeraltı yerleşimlerini korunma ve sığınma bağlamında da ele alır. Ancak bu işlev, her bölümün aynı zamanda oyulduğunu veya her dönemde aynı amaçla kullanıldığını kanıtlamaz. Bir yapının ilk açılma tarihiyle sonradan genişletilmesi ve kullanım evreleri ayrı sorulardır.</p>
<h2>İlk yapan topluluğu kesin biliyor muyuz?</h2>
<p>Burada başvurulan kurum kayıtları, bütün katların ilk inşasını tek bir kişi ve kesin yılla açıklamaya yetmez. Bu nedenle popüler bir “ilk kurucu” iddiası için hangi kazı, tarihleme veya belgenin dayanak gösterildiğini sormak gerekir. Büyük bir yapı, tek başına gizli teknoloji ya da dünya dışı müdahale kanıtı değildir.</p>
<h2>Ziyaret bilgisiyle tarihsel bilgiyi ayırın</h2>
<p>Bu sayfa tarihsel bağlamı açıklayan bir rehberdir. Bilet, açık katlar ve ziyaret saatleri değişebilir; ziyaret öncesinde resmî müze bilgilerini kontrol edin. Güncel bir ziyaret duyurusunu, yerleşimin bütün tarihine ilişkin kanıt yerine kullanmayın.</p>`,
    faq: [
      { question: 'Derinkuyu’yu tek bir topluluk mu yaptı?', answer: 'Yapının ilk açılması, genişletilmesi ve sonraki kullanımları ayrı evrelerdir; bunları tek bir kurucu ve tarihle açıklamak için yeterli kanıt gösterilmelidir.' },
      { question: 'Bu sayfada güncel bilet ve ziyaret saatleri var mı?', answer: 'Hayır. Bu bir tarihsel açıklama rehberidir; güncel ziyaret bilgisi resmî kurumdan kontrol edilmelidir.' },
    ],
    sources: [
      'Kültür ve Turizm Bakanlığı — Derinkuyu Yeraltı Şehri: https://engelsiz.ktb.gov.tr/TR-288407/derinkuyu-yeralti-sehri.html',
      'UNESCO World Heritage Centre — Göreme National Park and the Rock Sites of Cappadocia: https://whc.unesco.org/en/list/357/',
    ],
  },
};

// Batch editorial evidence review (2026-11-16). Canonical URLs and original published dates remain unchanged.
const editorialAuditBatch20261116 = {
  "/2025/10/antik-uzaylilar-mi-yoksa-kayip-insanlik-teknolojisi-mi-gecmisin-imk-nsiz-muhendisligi.html": {
    "title": "Antik Uzaylılar ve Kayıp Teknoloji İddiaları: Arkeoloji Ne Söylüyor?",
    "seoTitle": "Antik Uzaylılar mı? Piramitler, Nazca ve Arkeolojik Kanıtlar",
    "description": "Piramitler, Nazca, Sümer tanrıları ve antik mekanikler uzaylı kanıtı mı? Arkeolojik bulguları popüler iddialarla karşılaştırıyoruz.",
    "updated": "2026-11-16T00:00:00Z",
    "newsArticle": false,
    "contentHtml": "<div class=\"odyomuh-note\"><strong>16 Kasım 2026 editoryal düzeltmesi:</strong> Önceki metinde piramitlerin enerji anteni olabileceği, Anunnakilerin insanlığa teknoloji öğrettiği ve antik taş işçiliğinin açıklanamadığı gibi iddialar kanıtla desteklenmeden sunulmuştu. Bunlar tarihsel bulgu olarak kullanılamaz. Yazı mevcut arkeolojik belgelerle yeniden hazırlandı.</div>\n<h2>Antik yapılar gerçekten açıklanamıyor mu?</h2>\n<p>Piramitler, taş tapınaklar ve büyük heykeller karmaşık mühendislik, örgütlenme ve uzun süreli emek gerektirdi. Fakat yapıların görkemli olması, onları dönemin insanlarının yapamayacağı anlamına gelmez. <a href=\"https://whc.unesco.org/en/list/86\">UNESCO'nun Memphis ve nekropol tanımı</a>, Giza ve çevresindeki piramitleri Eski Mısır'ın krallık, cenaze ve yapı geleneği içinde değerlendirir. İnşa sürecinin her ayrıntısının hâlâ araştırılıyor olması, dünya dışı müdahaleye kanıt sağlamaz.</p>\n<h2>Ağır taşlar nasıl taşınabildi?</h2>\n<p>Taş ocakları, işlenmiş bloklar, kızak tasvirleri ve ulaşım ağları antik taşımacılığı araştırmanın başlıca kanıtlarıdır. <a href=\"https://iop.uva.nl/content/news/2014/00/prl-egyptian-pyramids.html\">Amsterdam Üniversitesi'nin fizik deneyi</a> uygun biçimde nemlendirilmiş kumun kızak önündeki direnci azaltabildiğini gösterdi. Deney belirli bir sürtünme mekanizmasını açıklar; her piramit bloğunun aynı teknikle taşındığını kesinleştirmez. Ama mekanik çözüm üretilebildiğini gösterir.</p>\n<h2>Nazca çizgileri uzaylı iniş pisti mi?</h2>\n<p>Peru'daki Nazca ve Palpa jeoglifleri, yüzeydeki koyu taşların kaldırılmasıyla daha açık zeminin görünür hâle getirilmesi sayesinde oluşturuldu. <a href=\"https://whc.unesco.org/en/list/700\">UNESCO kayıtları</a> bu çizgileri bölgenin uzun süreli ritüel ve kültürel peyzajının bir parçası olarak ele alır. Bu işlemin yapılması için uçak veya uzay aracı gerekmez. Çizgilerin bütün işlevleri kesin olarak çözümlenmiş değildir; bunun yerine 'uzaylı iniş pisti' sonucuna atlamak doğru değildir.</p>\n<h2>Anunnaki tabletleri neyi kanıtlıyor?</h2>\n<p><a href=\"https://oracc.museum.upenn.edu/amgg/listofdeities/anunna/\">ORACC'ın Mezopotamya tanrıları incelemesine</a> göre Anunna veya Anunnaki belirli dönemlerde farklı anlamlarda kullanılan bir tanrılar grubunun adıdır. Metinler tanrıların dinsel ve edebî rollerini inceler. Sümer tabletlerinde bilimsel olarak belgelenmiş bir 'uzaylı mühendis ekibi' ya da antik elektrik şebekesi bulunmuyor. Mitolojik bir ifadenin tarihsel bir olay tutanağı gibi okunması metodolojik bir hatadır.</p>\n<h2>Antik dünyada ileri teknoloji yok muydu?</h2>\n<p>Vardı; ancak 'ileri' sözcüğü çağının teknik bağlamına göre tanımlanmalıdır. Su taşıma, ölçüm, takvim, taş işleme ve mekanik düzenekler ciddi birikim gerektiriyordu. Antik toplumların başarılarını açıklamak için bugün elde olmayan bir elektrik santrali ya da uçan makine varsaymak zorunda değiliz. Gözlenmiş nesne, hesaplama yöntemine ilişkin yorum ve kanıtlanmamış iddia ayrı anlatılmalıdır.</p>\n<h2>Bir iddia nasıl sınanır?</h2>\n<p>“Hiçbir alet izi yok”, “bütün taşlar lazer hassasiyetinde” veya “modern mühendisler bunu yapamaz” gibi genellemeler için ölçülen örneklerin, saha raporunun ve kullanılan yöntemin belirtilmesi gerekir. Bir yüzeyin hassas olması, modern motor veya dış kaynaklı teknolojinin varlığını göstermeye yetmez. Eski toplumların yetkinliği, gerçek arkeolojik kanıtlarla zaten takdir edilebilir.</p>\n<h2>Sonuç</h2><p>Antik uzaylılar ve kayıp yüksek teknoloji düşüncesi popüler bir anlatıdır. Piramitlerin, Nazca çizgilerinin ve Mezopotamya metinlerinin varlığı gerçektir; bunların ortak bir dünya dışı mühendislik projesi olduğuna dair güvenilir arkeolojik kanıt bulunmuyor.</p>",
    "sources": [
      "UNESCO Dünya Mirası — Memphis and its Necropolis: https://whc.unesco.org/en/list/86",
      "UNESCO Dünya Mirası — Lines and Geoglyphs of Nasca and Palpa: https://whc.unesco.org/en/list/700",
      "ORACC — Anunna (Anunnaku, Anunnaki): https://oracc.museum.upenn.edu/amgg/listofdeities/anunna/",
      "University of Amsterdam — Transporting pyramid stones over wet sand: https://iop.uva.nl/content/news/2014/00/prl-egyptian-pyramids.html"
    ],
    "faq": [
      {
        "question": "Piramitler uzaylılar tarafından mı yapıldı?",
        "answer": "Böyle bir iddiayı destekleyen arkeolojik kanıt yoktur. Piramitler Eski Mısır toplumunun yapı ve cenaze gelenekleri içinde incelenir."
      },
      {
        "question": "Nazca çizgileri uzaylılarla mı ilgili?",
        "answer": "Jeogliflerin yerel toplumlar tarafından oluşturulduğu belgelenmiştir; uzaylı iniş alanı iddiası kanıtlanmış değildir."
      }
    ]
  },
  "/2025/12/fatih-in-gizli-silahi-istanbul-u-fetheden-dehset-toplar.html": {
    "title": "1453 İstanbul Kuşatmasında Osmanlı Topları: Urban, Menzil ve Kanıtlar",
    "seoTitle": "Fatih'in Topları: 1453 Kuşatmasında Tarih ve Balistik",
    "description": "Fatih'in topları ve Urban'ın büyük bombardımanı ne kadar etkiliydi? Uydurma konuşmalar yerine tarihî anlatımlar ile 2018 balistik çalışmasını açıklıyoruz.",
    "updated": "2026-11-16T00:00:00Z",
    "newsArticle": false,
    "contentHtml": "<div class=\"odyomuh-note\"><strong>16 Kasım 2026 düzeltmesi:</strong> Önceki yazı, Fatih Sultan Mehmed ile döküm ustası Urban/Orban arasında geçtiği öne sürülen konuşmalar, başarısız denemelerde ölen işçiler, kesin işçi sayıları ve 'Şahin' adlı topun özellikleri için kaynak göstermiyordu. Bu diyalog ve kesin ölçüler tarihsel belge gibi kullanılamaz. Metin doğrulanabilir çerçevede yeniden yazıldı.</div>\n<h2>1453 kuşatmasında topların rolü neydi?</h2>\n<p>II. Mehmed'in 1453'teki Konstantinopolis kuşatmasında topçuluk, kara surlarına yönelik sürekli baskının önemli araçlarındandı. Theodosios kara surları kalın duvarlar ve savunma hatlarından oluşuyordu. Top atışları bir yandan malzemeyi aşındırırken bir yandan surların onarımı ve savunması üzerinde baskı yaratıyordu. Fetih yalnızca tek bir büyük topun sonucu değildi: abluka, kuşatma kuvvetleri, savunma koşulları ve birçok askerî etken birlikte rol oynadı.</p>\n<h2>Urban veya Orban kimdi?</h2>\n<p>Orban veya Urban olarak geçen dökümcü, tarihî anlatılarda büyük kuşatma toplarıyla ilişkilendirilir. Ustanın İstanbul savunmasına öneri sunduğu, ardından Osmanlı hizmetine girdiği anlatılır. Ancak farklı kaynakların ayrıntıları doğrudan tek bir tarihî stenografi gibi aktarılamaz. “Bana bin işçi veririm”, “Üç ayda bitir”, “Tekrar yap” biçimindeki sinematik konuşmalar için kayıt gösterilmediğinden bunları doğrudan alıntı olarak yazmak doğru değildir.</p>\n<h2>Topların çapı ve barut miktarı kesin mi?</h2>\n<p>Hayır. Büyük bombardıman toplarının boyutlarıyla ilgili rakamlar, dönemin anlatıları ve günümüze kalan benzer topların incelenmesi üzerinden yeniden değerlendirilir. <a href=\"https://www.sciencedirect.com/science/article/pii/S245232161830074X\">2018'de Procedia Structural Integrity'de yayımlanan mekanik çalışma</a>, tarihî raporlara dayanarak yaklaşık 752 mm gülle çapı, 600 kg gülle ve 177 kg barut yükü içeren bir balistik senaryo kurdu. Bunlar model girdileridir; her atışta tam bu değerlerin kullanıldığını kanıtlayan doğrudan ölçüm kaydı değildir.</p>\n<p>Önceki yazıdaki 8 metre, 17 ton, 200 kg barut, iki kilometrelik atış ve iki metrelik krater gibi sayıların aynı tek topa ait doğrulanmış ölçümler olduğu gösterilemiyor. Bu nedenle varsayımsal veya farklı dönemlere ait teknik bilgiler kesin gerçek olarak bir araya getirilmemelidir.</p>\n<h2>Modelleme bize neyi gösteriyor?</h2>\n<p>Balistik hesaplar, tarihî anlatılardaki top menzili ve sur üzerindeki etkinin fiziksel bakımdan makul olup olmadığını sınamak için kullanılabilir. Mermi kütlesi, atış açısı, namlu çıkış hızı, hedef mesafesi ve barut yükü hesaba girer. Ancak model bir doğrulama aracıdır; sahada gerçekleşen her olayın bağımsız arkeolojik kaydı değildir. Mühendislik sonucu, tarihçinin kullandığı kaynaklarla birlikte değerlendirilmelidir.</p>\n<h2>Kuşatmada yalnızca top mu vardı?</h2>\n<p>Hayır. Surların onarımı, kuşatma hatları, askerî birliklerin hareketi, deniz ablukası ve malzeme tedariki kuşatmanın temel parçalarıydı. Büyük topa ait dramatik bir hikâye, bu çok yönlü süreci gölgelememelidir. Topların tarihsel önemi, uydurulmuş kazalar ve konuşmalar olmadan da açıklanabilir.</p>\n<h2>Sonuç</h2><p>Osmanlı topçuluğunun 1453 kuşatmasında önemli rol oynadığı tarihsel açıdan sağlamdır. Buna karşılık belirli bir topun her ölçüsünü, döküm denemesini ve ustanın konuşmalarını belge olmadan kesinleştirmek doğru değildir. Bu yazı tarihsel kaynakları ve sayısal model varsayımlarını birbirinden ayırır.</p>",
    "sources": [
      "Kakaliagos ve Ninis (2018), Orban's gun ballistics and assessment of historical evidence, Procedia Structural Integrity: https://www.sciencedirect.com/science/article/pii/S245232161830074X",
      "DOI — Orban's gun ballistics and historical evidence (2018): https://doi.org/10.1016/j.prostr.2018.09.026"
    ],
    "faq": [
      {
        "question": "Fatih'in toplarının ölçüleri kesin biliniyor mu?",
        "answer": "Bütün teknik ölçüler kesin değil; kaynakların verdiği sayılar ile modern hesapların kullandığı varsayımlar ayrılmalı."
      },
      {
        "question": "1453 kuşatmasını tek bir büyük top mu kazandırdı?",
        "answer": "Hayır. Topçuluk önemliydi ancak kuşatmanın sonucu birçok askerî ve lojistik etkenle belirlendi."
      }
    ]
  },
  "/2025/11/arkeolojik-kanitlar-tabletler-muhurler-ve-tapinak-yazitlarinda-anunnaki.html": {
    "title": "Anunnaki Tabletlerde Geçiyor mu? Belgeler ve Kanıt Sınırları",
    "seoTitle": "Anunnaki'nin Arkeolojik Kanıtları: Tabletler Ne Anlatıyor?",
    "description": "Anunnaki adı Sümer ve Akad metinlerinde nasıl geçer? ORACC verileri, tanrı tasvirleri, adak kayıtları ve internetteki sahte alıntıların ayrımı.",
    "updated": "2026-11-16T00:00:00Z",
    "newsArticle": false,
    "contentHtml": "<div class=\"odyomuh-note\"><strong>16 Kasım 2026 düzeltmesi:</strong> Önceki sürüm, belirli tapınaklarda bulunduğu söylenen bazı çivi yazılı alıntıları tablet numarası ve yayını olmaksızın tırnak içinde veriyor; Anunnaki tanrı grubunun kendisine ait mühür tasvirlerini kesin gibi gösteriyordu. Kaynak gösterilmeyen sözler ve buluntu atıfları kaldırıldı.</div>\n<h2>Anunnaki gerçekten eski metinlerde geçer mi?</h2>\n<p>Evet. Anunna, Anunnaku ve Anunnaki, Mezopotamya dinsel metinlerinde tanrı grupları için kullanılan adlardır. <a href=\"https://oracc.museum.upenn.edu/amgg/listofdeities/anunna/\">ORACC Ancient Mesopotamian Gods and Goddesses kaydı</a>, terimin dönemlere göre değişen anlamlarını özetler: kimi Sümer metinlerinde önemli tanrılar, bazı geç metinlerde ise yeraltı dünyasıyla ilişkili tanrılar anlamı öne çıkar. Bu çeşitlilik nedeniyle Anunnaki'yi bütün metinlerde aynı sayıda üyeden oluşan tek bir kurum gibi tarif etmek yanlıştır.</p>\n<h2>Hangi metinler tanrılar grubundan söz eder?</h2>\n<p>ORACC araştırması, <em>Enki ve Dünya Düzeni</em> adlı Sümer anlatısının 207. satırına ve <em>İnanna'nın Yeraltına İnişi</em> anlatısının 167. satırına atıf yapar. İlkinde tanrıların kaderle ilişkisi, ikincisinde yeraltı yargıçlığına ilişkin bağlam öne çıkar. Bu örnekler, “Anunnaki” adının farklı edebî görevlerle kullanıldığını göstermeye yeter. Her tablette aynı hiyerarşi veya modern anlamda kozmolojik sistem aranmamalıdır.</p>\n<h2>Tapınaklarda Anunnaki adına sunular yapıldı mı?</h2>\n<p>ORACC kaydı, Ur III dönemine tarihlenen sınırlı sayıda idari metnin Anunna'ya yönelik sunulardan söz edebileceğini belirtir. Bu önemlidir; fakat tanrıların bütün kentlerde aynı biçimde örgütlenmiş tek bir kültü olduğunun kanıtı değildir. Aynı araştırma, yalnızca Anunna grubuna adanmış bağımsız bir tapınağın günümüzde bilinmediğini de belirtir. Bu nedenle “E-Abzu'da Anunnaki'ye ait özel tapınak bulundu” gibi ayrıntılar doğrudan belge olmadan yazılamaz.</p>\n<h2>Mühürlerde Anunnaki tasvirleri var mı?</h2>\n<p>Mezopotamya silindir mühürlerinde tanrılar, krallar ve dinî sahneler yer alır. Fakat ORACC'ın söz konusu grup için özetinde, Anunna veya Anunnaku'nun toplu kimliğiyle bilinen bir tasviri olmadığı, yalnız tekil tanrıların betimlemelerinin bulunduğu açıkça yazılır. Bir mühürde boynuzlu taçlı tanrı tasviri olması, o eserin kendiliğinden “Anunnaki konseyi mührü” olduğunu göstermez.</p>\n<h2>İnternetteki tablet alıntıları neden tehlikeli?</h2>\n<p>Bir sayfada “Ekur'un büyük meclisinde Anunnaki toplandı” gibi bir söz doğrudan alıntı olarak aktarılıyorsa metnin çivi yazılı katalog numarası, edisyonu, satırı ve çevirmeni gösterilmelidir. Bunlar olmadan tırnak içindeki cümlenin gerçek bir tablette bulunduğunu doğrulamak mümkün değildir. Önceki sürüm bu standardı karşılamıyordu. Eski metinlerde geçen ifade ile modern yorum açıkça ayrı gösterilmelidir.</p>\n<h2>Anunnaki uzaylı mıydı?</h2>\n<p>Bilinen Sümer ve Akad metinleri Anunnaki'yi dinî-edebî tanrılar topluluğu bağlamında ele alır. Bu metinleri başka gezegenden gelen mühendislerin arşivi olarak okuma önerisi modern spekülasyondur. Bir tanrı grubunun metinlerde geçmesi, onun tarihsel olarak yaşayan biyolojik bir topluluk olduğunun kanıtı değildir.</p>\n<h2>Sonuç</h2><p>Anunnaki adının antik yazılı belgelerde bulunması gerçektir. Ancak belirli tablette söylenmiş gibi aktarılan sözler, tanrılara ait mühürler ve bağımsız tapınaklar ancak kataloglanmış buluntu ve güvenilir metin edisyonuyla doğrulanabilir. İnanç tarihi ile uydurma arkeolojik ayrıntıları ayırmak gerekir.</p>",
    "sources": [
      "ORACC, Nicole Brisch — Anunna (Anunnaku, Anunnaki), 2019: https://oracc.museum.upenn.edu/amgg/listofdeities/anunna/",
      "ORACC — Ancient Mesopotamian Gods and Goddesses, deity list: https://oracc.museum.upenn.edu/amgg/listofdeities/"
    ],
    "faq": [
      {
        "question": "Anunnaki Sümer tabletlerinde geçiyor mu?",
        "answer": "Evet. Anunna adı farklı Sümer ve Akad metinlerinde tanrılar grubu olarak yer alır."
      },
      {
        "question": "Anunnaki mühürleri biliniyor mu?",
        "answer": "ORACC araştırması grubun ortak kimliğiyle bilinen bir tasvirinin olmadığını, tekil tanrı betimlemelerinin bulunduğunu bildirir."
      }
    ]
  },
  "/2025/11/dicle-kiyisinda-12-000-yillik-sir-cemka-hoyuk-teki-kadin-saman-mezari.html": {
    "title": "Çemka Höyük'teki 12 Bin Yıllık Kadın Mezarı: Şaman mıydı?",
    "seoTitle": "Çemka Höyük Kadın Mezarı: 2024 Araştırması Ne Kanıtlıyor?",
    "description": "Çemka Höyük'te 2019'da kazılan PPNA dönemi kadın mezarında hayvan kalıntıları bulundu. Araştırmacıların 'şaman olabilir' yorumunun kanıt sınırları.",
    "updated": "2026-11-16T00:00:00Z",
    "newsArticle": false,
    "contentHtml": "<div class=\"odyomuh-note\"><strong>16 Kasım 2026 düzeltmesi:</strong> Önceki metin mezardaki kadının 'şaman' olduğunu ve keşfin 2024 yılının en önemli buluşu seçildiğini kesin bir olay gibi anlatıyordu. Araştırmacılar ise şamanlık yorumunu olasılık olarak dile getiriyor. Belgelenemeyen ödül ve biyografik ayrıntılar çıkarıldı.</div>\n<h2>Çemka Höyük'te ne bulundu?</h2>\n<p>Mardin'in Dargeçit ilçesindeki Yukarı Dicle havzasında bulunan Çemka Höyük, Çanak Çömleksiz Neolitik A (PPNA) dönemi yerleşimlerindendir. 2019 kazı sezonunda ÇH 2019/05 olarak tanımlanan, bir kadına ait iskelet ve hayvan iskelet unsurlarının birlikte bulunduğu mezar kayda geçti. Kazı ve yorumlar, 2024'te <em>L'Anthropologie</em> dergisinde yayımlanan <a href=\"https://www.sciencedirect.com/science/article/pii/S0003552124000645\">A “shaman” burial from the PPNA settlement of Çemka Höyük</a> başlıklı araştırmada ele alındı.</p>\n<h2>Mezar neden dikkat çekti?</h2>\n<p>PPNA yerleşimlerinde gömü gelenekleri farklılık gösterir. Bu mezarda kadın iskeletinin yanında yer alan hayvan kalıntıları sıradan bir gömüden ayrılan bir uygulamaya işaret ediyor olabilir. Ancak nesnelerin ve kemiklerin birlikte bulunmasının nedenini arkeologlar kesin olarak bilemez. Defin töreninde hayvanların sembolik rol oynamış olabileceği, mümkün açıklamalardan biridir.</p>\n<h2>Kadının şaman olduğu kanıtlandı mı?</h2>\n<p><strong>Hayır.</strong> Çalışmanın başlığında 'şaman' sözcüğü tırnak içinde kullanılır. Makalenin özeti, kişinin şaman <em>olabileceğini</em> veya animizm ve şamanizm kavramlarıyla ilişkili uygulamaları olan biri tarafından gömülmüş olabileceğini ifade eder. Bu, tarih öncesi kişinin görevini, kendisine verilen unvanı veya toplumun inanç sistemini kesin olarak belirlemek anlamına gelmez. <a href=\"https://www.iletisim.gov.tr/turkce/dis_basinda_turkiye/detay/turkiyede-cemka-hoyukte-kesfedilen-12000-yillik-olasi-bir-kadin-saman-mezari\">2024 tarihli resmî basın derlemesi</a> de 'olası' ifadesini kullanır.</p>\n<h2>12.000 yıllık tarihleme ne anlama geliyor?</h2>\n<p>Mezarın tarihlendirmesi PPNA yerleşim bağlamıyla ilgilidir; tek bir kişinin yaşamının tüm ayrıntılarını anlatan bir yazılı belge yoktur. Bu dönem tarımdan önceki ve ilk yerleşik uygulamaların geliştiği karmaşık toplumsal süreçleri kapsar. “Bütün insanlar hâlâ yalnızca göçebeydi” veya “şamanizm bütün köylerde aynıydı” gibi genellemeler kanıtlanamaz.</p>\n<h2>Mezarın kesin olarak söyledikleri</h2>\n<table><thead><tr><th>Gözlem</th><th>Yorum</th></tr></thead><tbody><tr><td>PPNA dönemi bir kadın gömüsü tespit edildi</td><td>Yerleşim sakinlerinin gömü uygulamalarına ilişkin veri sağlar</td></tr><tr><td>Hayvan kalıntıları birlikte bulundu</td><td>Ritüel veya özel defin anlamı taşıyor olabilir</td></tr><tr><td>Yazılı kişinin unvanı yok</td><td>“Kesin şamandı” ifadesi doğrulanamaz</td></tr></tbody></table>\n<h2>Bu bulgunun önemi ne?</h2>\n<p>Çemka Höyük örneği Neolitik geçiş çağında kadınların ve gömü ritüellerinin nasıl yorumlandığına ilişkin yeni sorular açıyor. Bir kadının toplum içinde önemli konumu olabileceği ihtimali araştırılmaya değer; fakat yalnız bu gömüden bütün Neolitik kadınların dinî önder olduğu sonucu çıkarılamaz.</p>\n<h2>Sonuç</h2><p>Çemka Höyük'te arkeolojik olarak gerçek bir kadın mezarı tespit edildi. Ona 'şaman mezarı' denmesi araştırmacıların ihtiyatlı bir yorumudur. Bilimsel çalışmanın dili bu belirsizliği koruyor; popüler anlatının da koruması gerekir.</p>",
    "sources": [
      "Kodaş ve çalışma arkadaşları (2024), A “shaman” burial from the PPNA settlement of Çemka Höyük, L'Anthropologie: https://www.sciencedirect.com/science/article/pii/S0003552124000645",
      "Cumhurbaşkanlığı İletişim Başkanlığı (2024), Çemka Höyük'teki olası kadın şaman mezarı: https://www.iletisim.gov.tr/turkce/dis_basinda_turkiye/detay/turkiyede-cemka-hoyukte-kesfedilen-12000-yillik-olasi-bir-kadin-saman-mezari"
    ],
    "faq": [
      {
        "question": "Çemka Höyük'teki kadın kesin olarak şaman mıydı?",
        "answer": "Hayır. Araştırmacılar, gömü bağlamından hareketle şamanlıkla ilişkili olası bir rol yorumunu tartışıyor."
      },
      {
        "question": "Mezar hangi döneme ait?",
        "answer": "Çanak Çömleksiz Neolitik A (PPNA) dönemi yerleşim bağlamına aittir."
      }
    ]
  },
  "/2025/10/unutulmus-bilim-insanlari-tarihin-golgesinde-kalan-dehalar.html": {
    "title": "Bilim Tarihindeki Az Anlatılan İsimler: Katkıları ve Gerçekler",
    "seoTitle": "Hypatia, El Cezeri, Lovelace ve Franklin: Bilim Tarihi",
    "description": "Hypatia, El Cezeri, Ada Lovelace ve Rosalind Franklin'in katkılarını abartılı ilkler ve uydurma başarı hikâyeleri olmadan kaynaklarla inceleyin.",
    "updated": "2026-11-16T00:00:00Z",
    "newsArticle": false,
    "contentHtml": "<div class=\"odyomuh-note\"><strong>16 Kasım 2026 düzeltmesi:</strong> Önceki sürümde “ilk insan uçuşu kesin başarıldı”, “bir bilim insanının icadı olmasa bugünkü teknoloji olmazdı” ve “Nobel ödülü doğrudan bir kişiden alındı” gibi karmaşık tarihsel tartışmaları basitleştiren ifadeler yer alıyordu. Biyografileri daha izlenebilir kaynaklarla ve daha ölçülü dille düzenledik.</div>\n<h2>Bilim tarihinin gözden kaçan katkıları nasıl değerlendirilir?</h2>\n<p>Bir bilimsel keşif nadiren tek kişinin tek gecelik başarısıdır. Araştırma araçları, kaynak metinler, önceki çalışmalar ve farklı kişilerin emeği birbirine eklenir. Bu yüzden bir araştırmacıyı övmek için diğerlerini silmek veya “kesin ilk” sıfatını kanıtsız kullanmak gerekmez.</p>\n<h2>Hypatia: Antik İskenderiye'de öğretim</h2>\n<p>Hypatia, geç antik dönemde İskenderiye'de matematik ve felsefe öğretimiyle tanınan düşünürdü. 415 yılı dolaylarında kalabalık bir grubun şiddeti sonucu öldürüldü. Yaşamı ve ölümü şehrin siyasî-dinî çatışmaları bağlamında değerlendirilmelidir. Hypatia'nın tek başına bütün modern bilimin temellerini attığı veya ölümünün bilimsel çalışmayı bir günde durdurduğu iddiaları aşırı genellemedir.</p>\n<h2>El Cezeri: Mekanik tasarım ve düzenekler</h2>\n<p>El Cezeri'nin Orta Çağ'da geliştirdiği su saatleri, otomatik düzenekler ve mekanik tarifler mühendislik tarihi için önemlidir. Onu çağdaş robotik alanının doğrudan kurucusu ilan etmek yerine, hareket aktarımı ve sıvı kontrolü gibi mekanik ilkelerin tarihsel örnekleri üzerinde durmak daha açıklayıcıdır. Metin, çizim ve uygulanabilen makine arasındaki fark ayrıca incelenmelidir.</p>\n<h2>Ada Lovelace: Programlama fikrinin öncülerinden</h2>\n<p>Ada Lovelace, Charles Babbage'in Analitik Makinesi üzerine notlarıyla mekanik hesaplamanın yalnız sayısal sonuç üretmekten öte kullanılabileceğini tartıştı. <a href=\"https://blog.scienceandindustrymuseum.org.uk/babbage-library-in-the-air/\">Science and Industry Museum</a>, Lovelace'in bu programlanabilir makinenin olanaklarını erken kavrayan öncü kişilerden olduğunu açıklıyor. Analitik Makine kendi hayatlarında tamamlanmadığı için modern bir bilgisayarda çalışan program yazdığı söylenemez. Bu ayrım başarısının önemini azaltmaz.</p>\n<h2>Rosalind Franklin: DNA'nın yapısını anlamada deneysel kanıt</h2>\n<p>Franklin ve araştırma öğrencisi Raymond Gosling'in X-ışını kırınım çalışmaları DNA'nın helis yapısı üzerine temel deneysel veriler sağladı. <a href=\"https://www.sciencehistory.org/about/projects-initiatives/history-of-molecular-biology-collection/\">Science History Institute arşivi</a> 1952 tarihli ünlü Photo 51 görüntüsü ve ilgili çalışma malzemelerini koruyor. <a href=\"https://www.sciencehistory.org/about/news/new-research-challenges-misconceptions-about-photo-51/\">2026'da yayımlanan tarih araştırması</a>, Franklin'in Photo 51 öncesi Photo 49 üzerinde de helis yorumuna yönelik hesaplar yaptığını gösteriyor. Katkıyı yalnızca “başkasının gördüğü bir fotoğrafı çekti” cümlesine indirgemek de yeterli değildir.</p>\n<h2>Kimlerin adı 'unutulmuş' sayılır?</h2>\n<p>Tesla ve Lovelace gibi isimler bugün geniş kitlelerce biliniyor. “Unutulmuş” başlığı toplumların her dönem aynı ölçüde hatırladığı kişiler için nesnel bir sınıflama değildir. Bilim insanlarının eserlerinin farklı dönemlerde nasıl tanıtıldığını, kimlerin ödüllendirildiğini ve hangi kayıtların bulunduğunu somut örneklerle incelemek gerekir.</p>\n<h2>Sonuç</h2><p>Bilim tarihi bireysel yetenek kadar ortak emeğin tarihidir. Hypatia, El Cezeri, Lovelace ve Franklin gibi isimlerin katkılarını destekleyen gerçek çalışmalar zaten vardır. Onları öne çıkarmak için kaynak gösterilemeyen “ilkler” ve kişisel diyaloglar uydurulmasına gerek yoktur.</p>",
    "sources": [
      "Science and Industry Museum — Babbage's Library in the Air, Ada Lovelace and Analytical Engine: https://blog.scienceandindustrymuseum.org.uk/babbage-library-in-the-air/",
      "Science History Institute — History of Molecular Biology Collection, Rosalind Franklin: https://www.sciencehistory.org/about/projects-initiatives/history-of-molecular-biology-collection/",
      "Science History Institute (2026) — Photo 49 and Rosalind Franklin DNA research: https://www.sciencehistory.org/about/news/new-research-challenges-misconceptions-about-photo-51/"
    ],
    "faq": [
      {
        "question": "Ada Lovelace modern bilgisayarda program çalıştırdı mı?",
        "answer": "Hayır. Programlanabilir Analitik Makine üzerine kuramsal notlar yazdı; makine yaşamı boyunca tamamlanmadı."
      },
      {
        "question": "Rosalind Franklin DNA yapısına nasıl katkı sağladı?",
        "answer": "Raymond Gosling ile X-ışını kırınım deneyleri ve helis yapısının yorumuna yönelik çalışmalar yaptı."
      }
    ]
  },
  "/2025/10/ilk-muhendisler-antik-dunyanin-d-hiyane-yapilari-ve-mekanik-harikalari.html": {
    "title": "Antik Dünyanın Mühendislik Başarıları: Taş, Su ve Mekanik",
    "seoTitle": "Antik Mühendislik: Piramitler, Kızaklar ve Mekanik Düzenekler",
    "description": "Antik çağda taş taşımak, piramit inşa etmek ve mekanik düzenek geliştirmek nasıl mümkündü? Arkeolojik kanıtlar ve fiziksel mekanizmalar.",
    "updated": "2026-11-16T00:00:00Z",
    "newsArticle": false,
    "contentHtml": "<div class=\"odyomuh-note\"><strong>16 Kasım 2026 düzeltmesi:</strong> Önceki metindeki tüm piramit taşlarının 'milimetrik kusursuzlukta' kesildiği, Mısır'ın tartışmasız 'mühendisliğin doğduğu yer' olduğu ve bazı icatların doğrudan tek kişiye ait sayılması gibi genellemeler kaynakla desteklenmediğinden değiştirildi.</div>\n<h2>Mühendislik antik dünyada ne anlama geliyordu?</h2>\n<p>Mühendislik sözcüğü modern bir mesleği çağrıştırsa da eski toplumlar taş işleme, su yönetimi, ulaşım, ölçüm ve mekanik düzenek geliştirme konularında karmaşık sorunlar çözüyordu. Bu uygulamalar tek merkezde bir anda ortaya çıkmadı; farklı coğrafyalarda ve zamanlarda birikerek gelişti. Bir uygarlığı 'mühendisliğin tek kurucusu' ilan etmek bilim tarihini gereğinden fazla sadeleştirir.</p>\n<h2>Giza piramitlerinin mühendisliği</h2>\n<p><a href=\"https://whc.unesco.org/en/list/86\">UNESCO'nun Memphis ve nekropol değerlendirmesi</a>, Giza piramitlerini krallık ve cenaze yapılaşması bağlamında tanımlar. Piramitler taş ocaklarının kullanımı, blokların taşınması, iş gücünün örgütlenmesi ve ölçü alma becerilerini gösterir. Ancak bütün blokların aynı hassasiyetle işlendiği doğru değildir; görünür kaplama taşları, yapısal iç malzeme ve farklı yapı evreleri ayrılmalıdır. Ölçülen belirli yüzeylerin yüksek doğruluğu tüm taşlar için genellenemez.</p>\n<h2>Malzeme taşıma: Deney neyi kanıtlar?</h2>\n<p>Antik Mısır'da ağır cisimlerin kızaklarla taşındığını gösteren tasvirler bulunur. <a href=\"https://iop.uva.nl/content/news/2014/00/prl-egyptian-pyramids.html\">Amsterdam Üniversitesi'nin 2014 fizik çalışması</a>, kumun belirli derecede ıslatılmasının kızak önünde birikmeyi ve çekme direncini azaltabildiğini sınadı. Bu bir yöntemin uygulanabilirliğine kanıt sunar, bütün piramitlerin tek ve kesin yapım yöntemini belirlemez. Deneysel arkeolojiyle tarihî belgenin birbirini nasıl tamamladığına örnektir.</p>\n<h2>Su yönetimi nasıl bir teknik birikim yarattı?</h2>\n<p>Antik toplumlarda kanallar, su depoları ve ölçüm yapıları tarım ile yerleşim planlamasında önemliydi. Su yüksekliği, akış ve yapı malzemesi ilişkileri gözlemle değerlendiriliyordu. Fakat her su yapısının amacı, tam inşa tarihi veya kullanım tekniği yalnız görünüşünden çıkarılamaz; yerel kazı belgeleri ve tarihsel kayıtlar gereklidir.</p>\n<h2>Arşimet'e atfedilen eureka hikâyesi gerçek mi?</h2>\n<p>Arşimet, hidrostatik ve mekanik problemlerle ilişkilendirilen önemli antik bir matematikçidir. Hamamdan dışarı koştuğu ve yüksek sesle “Eureka” dediği anlatısı, onun yaşadığı döneme ait bir ses kaydı değil sonraki dönemlerden aktarılan popüler bir hikâyedir. Böyle bir anlatıdan hareketle bilimsel ilkenin tek anda keşfedildiğini kesinleştirmek doğru değildir. Fiziksel prensipler ve tarihsel anekdot ayrı incelenmelidir.</p>\n<h2>Roma yolları ve antik yapılar bugün ne gösteriyor?</h2>\n<p>Roma yolları, su kemerleri ve köprüleri çeşitli malzemelerin ve topografyanın birlikte değerlendirilmesini gerektiriyordu. Bazı yapılar bugün hâlâ ayakta; fakat “antik mühendisler her yapıyı bin yıl dayanacak şekilde tasarladı” demek veya bütün Romalı yapıların aynı yöntemle yapıldığını varsaymak bilimsel değildir. Onarım, kullanım değişikliği ve koruma çalışmaları da bugünkü durumlarında rol oynamıştır.</p>\n<h2>Mühendislik başarısını ölçmenin daha doğru yolu</h2>\n<p>Bir yapıyı değerlendirirken tarihlemeyi, malzemeyi, boyutları, işçiliği, tahmini yükleri ve benzer çağdaş örnekleri belirtin. Bu bilgiler bulunmadan “bugünün mühendisliğinin açıklayamayacağı teknoloji” demek açıklama üretmez. Antik toplumlar gerçekte bildikleri ve kullandıkları tekniklerle de büyük başarılar elde etmiştir.</p>\n<h2>Sonuç</h2><p>Eski dünya mühendisliği hayranlık uyandırıcıdır; fakat onu anlamak için doğaüstü veya kayıp enerji sistemleri gerekmez. Taş, su, sürtünme ve iş organizasyonu hakkında doğrulanabilir veriler antik teknik başarıların temelini oluşturur.</p>",
    "sources": [
      "UNESCO — Memphis and its Necropolis: https://whc.unesco.org/en/list/86",
      "University of Amsterdam (2014) — Egyptian stone transport over wet sand: https://iop.uva.nl/content/news/2014/00/prl-egyptian-pyramids.html"
    ],
    "faq": [
      {
        "question": "Piramitlerin bütün taşları milimetrik hassasiyette mi?",
        "answer": "Hayır. Taşların işlevleri ve işleme hassasiyetleri farklıdır; seçilmiş yüzeyleri bütün yapıya genellemek doğru değildir."
      },
      {
        "question": "Antik mühendislik nasıl bilimsel incelenir?",
        "answer": "Kazı verileri, malzeme özellikleri, ölçüler, tarihsel belgeler ve mekanik deneyler birlikte değerlendirilir."
      }
    ]
  },
  "/2025/10/kayip-kutuphaneler-bilginin-yok-olusu-ve-insanligin-unuttugu-bilgeler.html": {
    "title": "Kayıp Antik Kütüphaneler: İskenderiye, Bergama ve Bağdat",
    "seoTitle": "İskenderiye Kütüphanesi Nasıl Yok Oldu? Efsaneler ve Kanıtlar",
    "description": "İskenderiye Kütüphanesi tek gecede mi yandı? Bergama'da parşömen mi icat edildi? Kütüphanelerin tarihini farklı kaynaklar ve belirsizliklerle inceleyin.",
    "updated": "2026-11-16T00:00:00Z",
    "newsArticle": false,
    "contentHtml": "<div class=\"odyomuh-note\"><strong>16 Kasım 2026 düzeltmesi:</strong> Önceki sürüm İskenderiye, Bergama, Bağdat ve başka merkezlerdeki kütüphanelerin tamamının aynı tür yangınlarla tek anda yok olduğunu ileri sürüyordu. Ayrıca parşömenin Bergama'da kesin olarak icat edildiğini yazıyordu. Tarihçilerin tartıştığı olaylar kesin anlatılamaz; bu ifadeler düzeltildi.</div>\n<h2>İskenderiye Kütüphanesi tek bir yangında mı yok oldu?</h2>\n<p>Antik İskenderiye'deki büyük kütüphane Helenistik dünyanın önemli bilgi kurumlarından biriydi. Julius Caesar'ın MÖ 48/47 savaşlarında çıkan yangının kitaplara zarar vermiş olması, sonraki anlatılarda sıkça geçer. Ancak ne kadar kitabın kaybedildiği, ana kütüphanenin ne ölçüde etkilendiği ve kurumun hangi aşamalarla ortadan kalktığı tartışmalıdır. <a href=\"https://www.open.edu/openlearn/history-the-arts/library-alexandria/content-section-3\">Open University'nin akademik ders kaynağı</a>, Plutarkhos, Dio Cassius ve daha sonraki rivayetlerin birbiriyle nasıl karşılaştırılması gerektiğini anlatır.</p>\n<h2>Neden tek bir fail veya tek tarih vermek zor?</h2>\n<p>Büyük kütüphanelerin tarihlerinde yangınların yanında fonların azalması, siyasal değişimler, metinlerin kopyalanmaması, kurumların taşınması ve uzun süreli bakımsızlık da etkili olabilir. Antik yazarların olaylara ne kadar sonra tanıklık ettiği ve kullandığı 'kitap' ile 'kütüphane' sözcükleri önemlidir. Örneğin limandaki kitap depolarının zarar görmesi ile bütün akademik kurumun yok olması aynı olay olmayabilir.</p>\n<h2>391 ve 641 iddiaları ne durumda?</h2>\n<p>İskenderiye Serapeum'unun 391 yılındaki yıkımı ve 641 yılındaki Arap fethine bağlanan bütün kütüphanenin yakılması anlatıları da ayrıca değerlendirilir. <a href=\"https://www.open.edu/openlearn/mod/oucontent/view.php?id=19050&printable=1\">Open University'nin kaynak eleştirisi</a>, 641'de büyük kütüphanenin yakıldığı öyküsünün tarihsel olarak güvenilir olmadığını ve sonraki yüzyıllarda üretilmiş bir anlatı olduğunu açıklar. Dolayısıyla dramatik bir 'son gece' hikâyesi belge yerine kullanılmamalıdır.</p>\n<h2>Parşömen gerçekten Bergama'da mı icat edildi?</h2>\n<p>Bergama'nın Helenistik dönemdeki kütüphanesi ve papirüs kullanımına dair anlatılar önemlidir. Ancak parşömenin tek seferde Bergama'da icat edildiğini söylemek doğru değildir. <a href=\"https://www.ucl.ac.uk/museums-static/digitalegypt/craft/parchment.html\">University College London'ın malzeme tarihi kaydı</a>, hayvan derisi üzerinde yazının daha eski örneklerini ve Bergama'ya ilişkin antik rivayetin tarihsel belirsizliğini özetler. Bergama'yla ilişkili bir adın bulunması, tek mucidin veya tek icat tarihinin kanıtı değildir.</p>\n<h2>Bağdat'ta bilgi üretimi nasıl gelişti?</h2>\n<p>Abbasî Bağdat'ında çeviri, kâtiplik, tıp, matematik ve astronomi çalışmaları çok sayıda kişi ve kurumun katkılarıyla gelişti. “Bilgelik Evi” olarak anılan Beytü'l-Hikme'nin niteliği ve etkisi tarih yazımında tartışılmıştır. 1258 Moğol istilasının şehirde büyük bir yıkım yarattığı bilinir; fakat bütün İslam bilim geleneğinin aynı gün ortadan kalktığı sonucu çıkarılamaz. Bilgi üretimi başka şehirlerde ve dönemlerde de sürmüştür.</p>\n<h2>Belge kaybolduysa geriye ne kalır?</h2>\n<p>Bir kitabın kendisi günümüze ulaşmasa da sonraki yazarların atıfları, başka dillerde yapılan çeviriler, katalog kayıtları veya alıntılar onun varlığına ilişkin izler bırakabilir. Buna karşılık “dünyadaki bütün bilimsel bilgi bir günde yandı” gibi iddialar için gerekli envanter ve kayıp dökümü genellikle yoktur.</p>\n<h2>Sonuç</h2><p>Kayıp kütüphanelerin tarihi gerçek yıkımları ve belgelerin yaşayamamasını içerir. Fakat her merkezin tek gecede ve kesin bir kişi tarafından yakıldığı anlatısı tarihsel araştırmanın yerini alamaz. Kaynakların tarihi, türü ve aralarındaki uyuşmazlık belirtilmelidir.</p>",
    "sources": [
      "Open University — Library of Alexandria: The destruction of the library: https://www.open.edu/openlearn/history-the-arts/library-alexandria/content-section-3",
      "Open University — Library of Alexandria course (complete): https://www.open.edu/openlearn/mod/oucontent/view.php?id=19050&printable=1",
      "University College London, Digital Egypt — Parchment history: https://www.ucl.ac.uk/museums-static/digitalegypt/craft/parchment.html"
    ],
    "faq": [
      {
        "question": "İskenderiye Kütüphanesi kesin olarak hangi yılda yok oldu?",
        "answer": "Tek ve tartışmasız bir yok oluş tarihi belirlenmiş değildir; farklı dönemlere ait anlatılar ve aşamalı kayıp ihtimali tartışılır."
      },
      {
        "question": "Parşömen Bergama'da mı icat edildi?",
        "answer": "Hayvan derisinin yazı malzemesi olarak kullanımı daha eskiye gider; Bergama'da icat edildiği öyküsü kesin kanıt değildir."
      }
    ]
  }
};
const editorialSourceAdditions20261116 = {
  "/2026/08/fuente-alamo-roma-kutuphanesi-cordoba.html": [
    "Universidad de Granada — Fuente Álamo library identification, 29 July 2026: https://www.ugr.es/universidad/noticias/ugr-identifica-biblioteca-mas-antigua-peninsula-iberica",
    "EFE — Fuente Álamo Roma villa, Córdoba library study, 29 July 2026: https://efe.com/andalucia/2026-07-29/identifican-en-una-villa-romana-de-cordoba-la-biblioteca-mas-antigua-de-la-peninsula/"
  ],
  "/2026/08/hattusa-hitit-civi-yazisi-arsivleri.html": [
    "UNESCO World Heritage — Hattusha: the Hittite Capital: https://whc.unesco.org/en/list/377",
    "Anadolu Ajansı — Hattuşa Kadeş Antlaşması tablet parçası, 21 September 2026: https://www.aa.com.tr/en/culture/tablet-fragment-found-in-turkiye-adds-piece-to-world-s-oldest-known-peace-treaty/4063280"
  ]
};
export function applyEvergreenRevision(item) {
  const revision = item && (editorialAuditBatch20261116[item.primaryPath] || legacyFactcheckRevisions[item.primaryPath] || recoveryRevisions[item.primaryPath] || factcheckRevisions[item.primaryPath] || priorityGuideRevisions[item.primaryPath] || evergreenRevisions[item.primaryPath]);
  const supplementalSources = item && editorialSourceAdditions20261116[item.primaryPath];
  if (supplementalSources) {
    return {
      ...item,
      ...(revision || {}),
      sources: [...new Set([...(revision?.sources || item.sources || []), ...supplementalSources])],
      updated: revision?.updated || '2026-11-16T00:00:00Z',
    };
  }
  // A reviewed guide replaces its previous bibliography. Do not reinsert old
  // source-free notes: the canonical-guide CI requires inspectable URLs.
  return revision ? { ...item, ...revision } : item;
}

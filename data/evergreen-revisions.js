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
// Second 2026-11-16 scholarly source audit: original article URLs and publication dates retained.
const historicalSourceBatch20261116 = {
  "/2025/11/hurri-ve-hititlerde-eski-tanrilar-anunnaki-inancinin-anadolu-ya-uyarlanisi.html": {
    "title": "Hurri ve Hititlerde Eski Tanrılar: Anadolu ve Mezopotamya İlişkisi",
    "seoTitle": "Hitit ve Hurri Eski Tanrıları: Anunnaki ile Bağları Var mı?",
    "description": "Hitit ve Hurri metinlerinde eski tanrılar, yeraltı ve yemin tanıklığı nasıl anlatılıyor? Anunnaki ile benzerlikleri doğrudan eşitlik saymadan açıklıyoruz.",
    "contentHtml": "<div class=\"odyomuh-note\"><strong>16 Kasım 2026 tarihli kaynak düzeltmesi:</strong> Önceki metinde Hurri ve Hitit 'eski tanrılarının' Anunnaki'nin doğrudan ve değişmez yerel karşılığı olduğu, bazı yemin cümlelerinin gerçek tabletlerden alıntılandığı ve tanrıların sayısının her metinde yedi olduğu kesin biçimde aktarılıyordu. Metin numarası bulunmayan alıntılar ve genellemeler kaldırıldı.</div>\n<h2>Hurri ve Hitit metinlerinde 'eski tanrılar' ne demek?</h2>\n<p>Geç Tunç Çağı Anadolu'sunda birden fazla dil ve dinsel gelenek bir arada kullanılıyordu. Hitit arşivlerinde Hurrice tanrı adlarıyla Hititçe kavramların birlikte görülmesi, metinlerin ortak bir kültürel çevrede çoğaltıldığını ve uyarlandığını düşündürür. Hititçe 'eski' veya 'ilk kuşak' tanrılar için kullanılan adlandırmalar, kendilerinden sonra gelen tanrılardan önce hüküm sürmüş ilahi varlıkları anlatır. Bu tanrılar çoğu anlatıda yeraltı dünyasıyla ilişkilendirilir.</p>\n<h2>Anunnaki ile bağlantı nerede kurulabilir?</h2>\n<p>Mezopotamya metinlerinde Anunna/Anunnaki adı farklı dönemlerde tanrılar grubunu ve kimi metinlerde yeraltı tanrılarını belirtir. <a href=\"https://oracc.museum.upenn.edu/amgg/listofdeities/anunna/\">ORACC'ın Anunna maddesi</a>, anlamın zamana ve metne göre değiştiğini vurgular. Hurri-Hitit geleneklerinde ilk kuşak tanrılarının yeraltıyla ilişkilendirilmesi, Mezopotamya anlatılarıyla ortak motifler taşıyabilir. Ancak benzer işlevler, her yerde aynı üyeleri olan tek bir tanrı grubunun bulunduğunu ispatlamaz.</p>\n<h2>Kumarbi anlatısı hangi tanrılardan söz eder?</h2>\n<p>Hurri geleneğiyle bağlantılı Kumarbi çevrimi, farklı ilahi kuşaklar arasındaki iktidar mücadelesini işler. Anu, Alalu, Kumarbi ve Teşup gibi figürler bu anlatıların başlıca karakterlerindendir. <a href=\"https://www.academia.edu/11847296\">2015 tarihli 'To Swear to Heaven and Earth' araştırması</a>, Kumarbi Şarkısı'nın girişinde eski tanrıların ve Nara, Napşara, Minki, Ammunki gibi adların anıldığını açıklıyor. Bu belirli metin örneği, uydurulmuş ve katalog numarası verilmeyen genel yemin cümlelerinden daha sağlamdır.</p>\n<h2>Eski tanrılar yemin törenlerinde neden anılır?</h2>\n<p>Eski Yakın Doğu antlaşmaları, insan ilişkilerine tanrısal tanıklık ve yaptırım boyutu katabilir. Hitit antlaşma metinleri birden fazla tanrı ve kutsal varlığa başvurabilir. Yemin tanıklığı, yazılı bir hukuk ve din dilinin parçasıdır. Bununla birlikte 'sözünü bozanın soyunu yeraltına çekmek' gibi tek bir cümleyi özgün metin, tablet numarası ve çeviri olmadan tarihî alıntı biçiminde vermek doğru değildir.</p>\n<h2>Bu aktarım tek yönlü müydü?</h2>\n<p>Hurri, Hitit, Hatti ve Mezopotamya gelenekleri birbirleriyle etkileşim hâlindeydi. Tanrılar bazen eşleştirildi, bazen adları değişti, bazen de yerel işlevlerini sürdürdü. Bu yüzden 'Hititler Anunnaki dinini aynen kopyaladı' gibi bir sonuç araştırma bulgularını gereğinden fazla sadeleştirir. Aktarımın ayrıntısı için hangi ritüelin, hangi antlaşmanın ve hangi yüzyılın tartışıldığı belirtilmelidir.</p>\n<h2>Yedi eski tanrı iddiası doğru mu?</h2>\n<p>Bazı ritüel ve mitlerde belirli tanrı sayıları geçebilir. Ancak tüm eski tanrıları sayısı ve üyeleri her dönemde aynı kalan yedi kişilik bir heyete indirgemek güvenli değildir. ORACC'ın Anunna maddesi bile bir metinde Eridu'nun elli Anunna tanrısından söz edildiğini kaydeder. Sayı ve ad listesi metnin bağlamına göre okunmalıdır.</p>\n<h2>Sonuç</h2>\n<p>Hurri ve Hitit 'eski tanrıları' ile Mezopotamya'nın yeraltı ve ilahi kuşak anlatıları arasında belgelenebilir ilişkiler vardır. Bu ilişkileri açıklamanın yolu, metinleri birlikte karşılaştırmaktır; kanıtlanmamış tablet sözleri ve değişmez panteon şemaları üretmek değil.</p>",
    "sources": [
      "Nicole Brisch — Anunna (Anunnaku, Anunnaki), ORACC Ancient Mesopotamian Gods and Goddesses: https://oracc.museum.upenn.edu/amgg/listofdeities/anunna/",
      "To Swear to Heaven and Earth, from Mesopotamia to Greece (2015), Kumarbi ve eski tanrılar üzerine metin incelemesi: https://www.academia.edu/11847296"
    ],
    "faq": [
      {
        "question": "Hititlerin eski tanrıları Anunnaki ile aynı mıydı?",
        "answer": "Metinlerde yeraltı ve eski ilahi kuşaklar açısından ortak motifler vardır; tüm tanrı gruplarının kesin olarak özdeş olduğu söylenemez."
      },
      {
        "question": "Kumarbi anlatısında hangi eski tanrılar anılır?",
        "answer": "Bazı metinlerde Nara, Napşara, Minki ve Ammunki gibi eski tanrı adları yer alır."
      }
    ],
    "metaDescription": "Hitit ve Hurri metinlerinde eski tanrılar, yeraltı ve yemin tanıklığı nasıl anlatılıyor? Anunnaki ile benzerlikleri doğrudan eşitlik saymadan açıklıyoruz.",
    "updated": "2026-11-16T00:00:00Z",
    "newsArticle": false
  },
  "/2025/11/sumer-metinlerinde-anunnaki-kaderleri-belirleyenlerden-goksel-meclise.html": {
    "title": "Sümer Metinlerinde Anunnaki: Tabletlerdeki İfadeler ve Yorumlar",
    "seoTitle": "Sümer Tabletlerinde Anunnaki: Gerçek Metinler Ne Diyor?",
    "description": "Anunna adının geçtiği Sümer metinlerini Oxford ETCSL ve ORACC kayıtlarıyla inceleyin. Kader belirleme, yedi yargıç ve uydurma alıntı ayrımı.",
    "contentHtml": "<div class=\"odyomuh-note\"><strong>16 Kasım 2026 kaynak düzeltmesi:</strong> Eski sürümde Lagaş kralı Gudea'ya atfedilen, tablet ve satır numarası bulunmayan bir 'göğün ve yerin meclisi' alıntısı vardı. Bu cümle doğrulanmış doğrudan alıntı olarak sunulamaz. Metinleri numaralı akademik yayımlara göre yeniden açıklıyoruz.</div>\n<h2>Anunna sözcüğü gerçekten Sümerce metinlerde var mı?</h2>\n<p>Evet. Sümerce yazılarda Anunna; Akadca kaynaklarda Anunnaku veya Anunnaki biçimlerinde görülen bir tanrılar grubudur. <a href=\"https://oracc.museum.upenn.edu/amgg/listofdeities/anunna/\">ORACC araştırması</a>, adın farklı kentlerin tanrılar topluluğunu veya büyük tanrıları ifade edebildiğini; zamanla özellikle yeraltı dünyasıyla ilişkilendirildiğini açıklıyor. Bu tanrılar modern anlamda insanlar arasında yaşayan ayrı bir ırk olarak belgelenmiyor.</p>\n<h2>Enki ve Dünya Düzeni metnindeki somut kayıt</h2>\n<p><em>Enki and the World Order</em> adlı Sümer mitinde tanrıların insan dünyasındaki görevleri ve düzenin kurulması anlatılır. Oxford Üniversitesi'nin <a href=\"https://etcsl.orinst.ox.ac.uk/edition2/etcslgloss.php?charenc=gcirc&amp;lookup=c113.202\">ETCSL 1.1.3, 192–209. satırlarına ait yayını</a> Anunna'yı büyük tanrılar olarak anar ve Sümer topraklarında kaderleri belirlemelerinden söz eder. Bu metindeki işlev, eski dinî düşüncenin bir parçasıdır. Metnin tanrısal bir olayı anlatması, böyle bir olayın fiziksel tarihsel kayıt olarak doğrulandığı anlamına gelmez.</p>\n<h2>İnanna'nın Yeraltına İnişi ve yedi yargıç</h2>\n<p><em>Inana's Descent into the Netherworld</em> adlı anlatının 167. satırına ilişkin ORACC kaydı, yeraltında yargılayan yedi Anunna tanrısına işaret eder. 'Yedi yargıç' ifadesi belirli bir mitin sahnesidir. Dolayısıyla bütün Mezopotamya boyunca her Anunna grubunun mutlaka yedi üyeden oluştuğunu söylemek doğru değildir. Metinlerin ritüel, kent ve dönem bağlamı birbirinden ayrılmalıdır.</p>\n<h2>Gudea yazıtlarından ne anlıyoruz?</h2>\n<p>ORACC, Anunna adının erken belgeleri arasında Gudea dönemine ait yazıtları anar. Fakat adı belirli bir hükümdarın metninde geçti diye internet yazılarında dolaşan her cümle gerçek çeviri sayılmaz. 'Anunna tanrıları göğün ve yerin yüce meclisinde toplandı' türünden bir ifadeyi alıntı olarak kullanmak için yazıtın katalog numarası, satırı ve edisyonu gereklidir. Önceki sürümde bunlar yoktu; ifade kaldırıldı.</p>\n<h2>Anunnaki nerede tapınılıyordu?</h2>\n<p>Anunna adının dinî-edebî metinlerde geçtiği kesindir. Ancak farklı kentlerin tanrılarına yönelik törenler ile özel bir Anunna tapınağının varlığını karıştırmamak gerekir. ORACC, grup adına münhasıran ayrılmış bilinen bir tapınak bulunmadığını ve Ur III döneminden sunu atıflarının sınırlı olduğunu belirtir. Tek bir mühür üzerindeki tanrı figürünü de hiçbir yazıt olmadan 'Anunnaki konseyi' diye tanımlamamak gerekir.</p>\n<h2>Göksel meclis, uzaylı ekibi mi?</h2>\n<p>Mezopotamya metinlerinin ilahi bir meclis veya kader düzeninden söz etmesi, toplumların tanrılar aracılığıyla evreni açıklama yöntemini gösterir. Gökten inen makineler, maden çıkaran uzaylılar ve genetik mühendislik gibi çağdaş iddialar, bu belgelerde doğrulanan olgular değildir. Bir mit anlatısının edebî anlamı ile gerçek bir teknolojik olay aynı kategoriye girmez.</p>\n<h2>Sonuç</h2>\n<p>Anunnaki, özgün Sümer ve Akad belgelerinde karşılığı olan bir tanrı grubudur. Gerçek belgelerden öğrenilebilecek çok şey vardır; fakat bunu yaparken satır numarası olmayan alıntıları çıkarıp Oxford ETCSL gibi kontrol edilebilir çevirilere dayanmak gerekir.</p>",
    "sources": [
      "Oxford ETCSL, Enki and the World Order, 1.1.3, lines 192–209: https://etcsl.orinst.ox.ac.uk/edition2/etcslgloss.php?charenc=gcirc&lookup=c113.202",
      "ORACC — Anunna (Anunnaku, Anunnaki), metinler ve kaynaklar: https://oracc.museum.upenn.edu/amgg/listofdeities/anunna/"
    ],
    "faq": [
      {
        "question": "Anunnaki Sümer tabletlerinde geçiyor mu?",
        "answer": "Evet. Anunna adı Enki ve Dünya Düzeni gibi Sümer metinlerinde yer alır."
      },
      {
        "question": "Anunnaki hep yedi tanrı mıydı?",
        "answer": "Hayır. Belirli bir anlatıda yedi yeraltı yargıcı geçer; başka kaynaklarda grubun sayısı ve işlevi değişir."
      }
    ],
    "metaDescription": "Anunna adının geçtiği Sümer metinlerini Oxford ETCSL ve ORACC kayıtlarıyla inceleyin. Kader belirleme, yedi yargıç ve uydurma alıntı ayrımı.",
    "updated": "2026-11-16T00:00:00Z",
    "newsArticle": false
  },
  "/2025/11/yedi-basyuce-tanri-an-enlil-enki-ninhursag-nanna-utu-inanna.html": {
    "title": "Sümer'in Yedi Önemli Tanrısı: An, Enlil, Enki ve Diğerleri",
    "seoTitle": "Sümer Tanrıları: Yedi Büyük İsim ve Anunnaki Ayrımı",
    "description": "An, Enlil, Enki, Ninhursag, Nanna, Utu ve İnanna hangi alanlarla ilişkilendirilirdi? Yedi tanrılı listenin neden değişmez bir Anunnaki üyelik kaydı olmadığını öğrenin.",
    "contentHtml": "<div class=\"odyomuh-note\"><strong>16 Kasım 2026 düzeltmesi:</strong> Yazının önceki sürümü Anunnaki'nin değişmez biçimde bu yedi tanrıdan oluştuğunu ileri sürüyordu. Sümer tanrıları sayıca çok daha fazlaydı; yedi önemli tanrıyı öğretici bir listeye almak, Anunnaki'nin bütün dönemlerde yedi üyeli olduğunu kanıtlamaz.</div>\n<h2>Yedi büyük Sümer tanrısı listesi neyi anlatır?</h2>\n<p>Sümer dininde An, Enlil, Enki ve Ninhursag ile Nanna, Utu ve İnanna tarihsel metinlerde büyük öneme sahip ilahi figürlerdir. Bu yedili modern araştırmalarda kimi zaman dört temel ilah ve üç göksel ilah olarak birlikte anılır. Ancak isimler ve hiyerarşi kentten kente ve dönemden döneme değişir. <a href=\"https://oracc.museum.upenn.edu/amgg/listofdeities/\">ORACC'ın tanrılar dizini</a> çok sayıda başka tanrıyı da ayrı maddelerle ele alır.</p>\n<h2>An veya Anu: göğün tanrısı</h2>\n<p>An, Sümerce 'gök' kavramıyla ilişkilidir ve birçok metinde yüksek tanrısal otoriteyi temsil eder. Akadca gelenekte Anu biçimi kullanılır. <a href=\"https://oracc.museum.upenn.edu/amgg/listofdeities/an/\">ORACC An/Anu kaydı</a>, farklı dönemlerde tanrıların babası unvanıyla anıldığını, ancak liderlik ve soy ilişkilerinin bütün metinlerde aynı olmadığını açıklar.</p>\n<h2>Enlil: otorite ve ilahi karar</h2>\n<p>Enlil, özellikle Nippur'daki dinsel gelenekle ilişkili büyük bir tanrıdır. Hüküm, otorite ve evrenin düzeniyle bağları vardır. Bazı dönemlerde önem bakımından An ile yarışan veya onu gölgede bırakan konumda görünür. Enlil'in işlevini yalnızca hava durumunu kontrol eden tek bir 'rüzgâr tanrısı'na indirgemek sınırlayıcıdır.</p>\n<h2>Enki: tatlı su ve bilgelik</h2>\n<p>Enki, daha sonraki Akadca metinlerde Ea adıyla da bilinir. Tatlı yeraltı suları, bilgelik, yaratıcılık ve ritüel bilgi ile ilişkilendirilir. <em>Enki ve Dünya Düzeni</em> miti, tanrının dünyadaki düzen ve görevlerle bağlantısını inceler. Ancak metin tanrısal bir anlatıdır; belirli bir modern teknolojinin icat belgesi değildir.</p>\n<h2>Ninhursag: doğum ve ana tanrıça gelenekleri</h2>\n<p>Ninhursag veya Ninhursanga, çeşitli metinlerde ana tanrıça ve doğurganlıkla bağlantılıdır. Ninmah veya Nintur gibi adlarla ilişkiler dönem ve metne göre değerlendirilmelidir. Birden fazla adı birbirinin tam ve zamansız eşanlamlısı saymak, tanrıça geleneklerinin tarihsel değişimini gizler.</p>\n<h2>Nanna, Utu ve İnanna: ay, güneş ve Venüs</h2>\n<p>Nanna, Akadca metinlerde Sin; Utu ise Şamaş adıyla ilişkilendirilir. Nanna ay, Utu güneş ve adalet, İnanna ise farklı dönemlerde aşk, güç, savaş ve Venüs gezegeniyle bağlantılıdır. İnanna'nın Akadca gelenekteki İştar ile ilişkisi de Mezopotamya dinlerindeki süreklilik ve değişim örneklerindendir. Her tanrıyı yalnızca tek bir gök cisminin kişileştirmesi saymak yetersiz olabilir.</p>\n<h2>Bu yedi isim bütün Anunnaki'yi mi oluşturur?</h2>\n<p>Hayır. ORACC, Anunna topluluğunun belirli sayısını ve üyelerini bütün metinlerde belirlemenin mümkün olmadığını söylüyor. Bir metinde Eridu'nun elli Anunna tanrısı, bir diğerinde yedi yeraltı yargıcı bulunabilir. <a href=\"https://oracc.museum.upenn.edu/amgg/listofdeities/anunna/\">Anunna maddesi</a> tam olarak bu değişkenliği açıklar. Dolayısıyla burada verilen yedili liste öğretici bir başlıktır; kesin bir eski tanrılar sicili değildir.</p>\n<h2>Sonuç</h2>\n<p>Bu yedi tanrı Sümerlerin inanç dünyasını öğrenmek için yararlı bir başlangıç noktasıdır. Fakat antik kaynakları gerçek anlamıyla kavramak için kentleri, metinleri, tarihleri ve her tanrının birden fazla işlevini ayrı ayrı incelemek gerekir.</p>",
    "sources": [
      "ORACC — List of Mesopotamian deities: https://oracc.museum.upenn.edu/amgg/listofdeities/",
      "ORACC — Anunna group and historical variation: https://oracc.museum.upenn.edu/amgg/listofdeities/anunna/",
      "ORACC — An/Anu historical roles: https://oracc.museum.upenn.edu/amgg/listofdeities/an/"
    ],
    "faq": [
      {
        "question": "Yedi büyük Sümer tanrısı kimlerdir?",
        "answer": "Öğretici yedili listede An, Enlil, Enki, Ninhursag, Nanna, Utu ve İnanna bulunur."
      },
      {
        "question": "Bütün Anunnaki bu yedi tanrı mıydı?",
        "answer": "Hayır. Anunna teriminin kapsamı farklı metinlerde ve dönemlerde değişir."
      }
    ],
    "metaDescription": "An, Enlil, Enki, Ninhursag, Nanna, Utu ve İnanna hangi alanlarla ilişkilendirilirdi? Yedi tanrılı listenin neden değişmez bir Anunnaki üyelik kaydı olmadığını öğrenin.",
    "updated": "2026-11-16T00:00:00Z",
    "newsArticle": false
  },
  "/2025/12/ergenekon-dan-cikis-turklerin-yeniden-dogus-efsanesi.html": {
    "title": "Ergenekon Destanı: Demir Dağ, Kaynaklar ve Tarihsel Yorumlar",
    "seoTitle": "Ergenekon Destanı Nedir? Kaynağı ve Gerçeklik Tartışması",
    "description": "Ergenekon anlatısındaki dar vadi, demir dağı eritme ve yeniden doğuş motifleri; Reşîdüddin, Ebülgazi ve Türk-Moğol köken tartışmasıyla birlikte.",
    "contentHtml": "<div class=\"odyomuh-note\"><strong>16 Kasım 2026 düzeltmesi:</strong> Önceki metin, Ergenekon'un yerinin belirlenmiş olduğu ve destanda anlatılan olayların tarihsel bir göçü birebir anlattığı izlenimi veriyordu. Ergenekon bir destan geleneğidir; tarihsel kaynaklarda farklı yorumları ve köken tartışmaları bulunur.</div>\n<h2>Ergenekon Destanı kısaca nedir?</h2>\n<p>Ergenekon, ağır bir yenilgiden sonra sarp dağlarla çevrili bir yere sığınan topluluğun orada çoğalmasını ve daha sonra demir dağı eritip bir geçit açarak yeniden dışarı çıkmasını anlatan destandır. Bu anlatıda zorlu bir yenilginin ardından hayatta kalma, çoğalma ve yeni yurt bulma motifleri öne çıkar. Destandaki ayrıntılar, eski toplulukların tarihsel hafızasını simgeler; her unsurun birebir yaşanmış bir olay olduğunu göstermez.</p>\n<h2>Destanın yazılı kaynakları hangileri?</h2>\n<p><a href=\"https://islamansiklopedisi.org.tr/destan\">TDV İslâm Ansiklopedisi'nin Destan maddesi</a>, Ergenekon anlatısının kaynakları arasında Reşîdüddin'in <em>Câmiʿu't-tevârîḫ</em> eserini ve Ebülgazi Bahadır Han'ın <em>Şecere-i Türk</em> kitabını anar. Bunlar anlatının yazılı aktarımlarıdır; hikâyenin betimlediği en eski döneme ait doğrudan olay tutanakları değildir.</p>\n<h2>Demir dağı eritmek neyi temsil eder?</h2>\n<p>Destanda dağların arasında sıkışan topluluk demir içeren bir geçidi ısıtarak dışarı çıkmanın yolunu bulur. Demircilik, bozkır dünyasında teknik beceri, güç ve siyasal varlığı sürdürme simgesi olarak yorumlanabilir. Fakat anlatının içindeki dağın maden yatağı, eritilen demir miktarı veya ocak düzeni için arkeolojik bir ölçü verilmez. Bu nedenle “Ergenekon'da bugün de görülen demir fırınları bulundu” gibi iddialar bağımsız kazı verisi gerektirir.</p>\n<h2>Ergenekon'un Türk mü Moğol mu olduğu tartışması</h2>\n<p>Ergenekon modern Türk edebiyatı ve tarih bilincinde güçlü bir yere sahiptir. Ancak anlatının kökeni ve hangi metnin hangi topluluğa ait sayılması gerektiği akademik tartışma konusudur. <a href=\"https://www.sciencedirect.com/science/article/abs/pii/S1563011015001555\">B. R. Zoriktuev'in 2015 tarihli çalışması</a>, Reşîdüddin'deki Ergüne-kun anlatısının Moğol kökenine vurgu yapar. TDV ansiklopedisindeki anlatım ise destanı Türk destanları bağlamında inceler. Bu iki kaynak arasındaki fark, tarihsel aktarımı tek cümleyle kesin hükme bağlamamanın nedenidir.</p>\n<h2>Bozkurt anlatısıyla aynı hikâye mi?</h2>\n<p>Türk ve İç Asya geleneklerinde kurtla ilişkilendirilen köken anlatıları da bulunur. Fakat bu motiflerin her birini Ergenekon hikâyesinin aynı yazılı sürümü olarak kabul etmek doğru olmaz. Çin yıllıklarında anlatılan türeyiş hikâyeleri, Reşîdüddin'in aktardığı vadi anlatısı ve sonraki millî yorumlar farklı tür ve dönemlerde kaynaklardır.</p>\n<h2>Ergenekon nerede?</h2>\n<p>Anlatıda bir vadinin geçmesi, bugün haritada tek bir noktanın bilimsel biçimde tanımlandığı anlamına gelmez. Altay, Moğolistan veya başka bölgelerle ilişkilendirme önerileri bulunabilir; fakat belirli coğrafyayı kesinleştirmek için çağdaş belge ve yerleşim sürekliliği gibi güçlü kanıtlar gerekir. Destanın simgesel etkisi, tarihsel yer tespiti yapılmasa da devam edebilir.</p>\n<h2>Sonuç</h2>\n<p>Ergenekon'un önemi yenilgiden kurtuluş, demircilik ve topluluk hafızası motifleridir. Yazılı kaynakları tanımak, Türk ve Moğol tarih yazımındaki farklı yorumları birlikte incelemek ve destanı kesin kazı raporu gibi sunmamak gerekir.</p>",
    "sources": [
      "TDV İslâm Ansiklopedisi — Destan, Ergenekon ve Kurt'tan Türeyiş bölümleri: https://islamansiklopedisi.org.tr/destan",
      "B. R. Zoriktuev (2015), The Turkic Version of the Origins of the Ergene-Kun Legend, Archaeology, Ethnology and Anthropology of Eurasia: https://www.sciencedirect.com/science/article/abs/pii/S1563011015001555"
    ],
    "faq": [
      {
        "question": "Ergenekon Destanı gerçek bir tarih olayı mı?",
        "answer": "Destan yazılı kaynaklara sahip bir kültürel anlatıdır; içindeki bütün ayrıntıların birebir yaşandığı kanıtlanmış değildir."
      },
      {
        "question": "Ergenekon'un kökeni tartışmalı mı?",
        "answer": "Evet. Anlatının Türk ve Moğol kaynaklarıyla ilişkisine dair farklı akademik görüşler vardır."
      }
    ],
    "metaDescription": "Ergenekon anlatısındaki dar vadi, demir dağı eritme ve yeniden doğuş motifleri; Reşîdüddin, Ebülgazi ve Türk-Moğol köken tartışmasıyla birlikte.",
    "updated": "2026-11-16T00:00:00Z",
    "newsArticle": false
  },
  "/2025/12/gokyuzune-tapan-kavim-turklerin-gok-tanri-inanci.html": {
    "title": "Eski Türklerde Tengri, Umay ve Yer-Su İnancı: Yazıtlar Ne Diyor?",
    "seoTitle": "Gök Tanrı İnancı: Orhun Yazıtlarında Tengri ve Umay",
    "description": "Gök Tanrı, Umay ve Yer-Su inancını Orhun yazıtlarıyla inceleyin. Eski Türk dinini modern yorumlardan ve kesin tek tanrıcılık iddiasından ayırın.",
    "contentHtml": "<div class=\"odyomuh-note\"><strong>16 Kasım 2026 düzeltmesi:</strong> Önceki yazı, bütün eski Türk topluluklarının aynı inanç sistemine sahip olduğunu, Tanrı'nın kesinlikle insan biçiminde tasvir edilmediğini ve bu inancın bugünkü çevre etiğiyle birebir örtüştüğünü kanıtlanmış gibi anlatıyordu. Bunların çoğu yorumdur; metinlere dayalı bilgiler yeniden ayrıldı.</div>\n<h2>Eski Türklerde Tengri ne anlama gelirdi?</h2>\n<p>Tengri sözcüğü eski Türkçe metinlerde gökle ve tanrısal güçle bağlantılıdır. <a href=\"https://www.turkicatlas.org/tr/historiography/tengrism-historiography/\">Orhun yazıtlarının tarihsel incelemeleri</a>, göğün yaratılışı, hükümdarlık ve halkın kaderiyle ilgili ifadelerde Tengri'nin anıldığını gösterir. Ancak tek bir kelimenin geçmesi bütün Türk boylarında, bütün yüzyıllarda ve her yerde aynı ayrıntılı teolojiye inanıldığı anlamına gelmez.</p>\n<h2>Orhun yazıtları bize ne kadar bilgi veriyor?</h2>\n<p>Kül Tigin, Bilge Kağan ve Tonyukuk metinleri sekizinci yüzyıldaki siyasal ve kültürel dünyanın önemli tanıklarıdır. Metinlerde Tengri, kutsal Yer-Su ve Umay ile bağlantılı ifadeler bulunur. Bu taşlar baştan sona bir din kitabı olarak düzenlenmemiştir; hükümdarlığın meşruiyeti, savaşlar, öğütler ve devlet düzeni ana konular arasındadır. Dolayısıyla bütün bir din sistemini yalnızca birkaç satırdan yeniden kurmanın sınırları vardır.</p>\n<h2>Umay kimdi?</h2>\n<p>Umay, eski Türk inanç dünyasında kutsal bir kadın figürü olarak anılır. <a href=\"https://www.turkicatlas.org/religions/umay/\">Umay'a ilişkin yazıt incelemesi</a>, Kül Tigin ve Tonyukuk metinlerinde geçtiği bağlamları karşılaştırır. Bazı yorumlarda bereket ve koruyuculuk özellikleri öne çıkar; ancak bütün dönemlere ait Umay tasavvurlarını değişmez bir anne tanrıça portresiyle birleştirmek güvenli değildir.</p>\n<h2>Yer-Su ne demek?</h2>\n<p>Eski Türkçe <em>ıduk yer-sub</em> ifadesi 'kutsal yer ve su' bağlamında kullanılır. Bu, toprakla suyun kültürel ve kutsal anlam taşıyabileceğini gösterir. Ama her akarsu kenarında belirli bir teşekkür töreni yapıldığına veya her dağın aynı isimde bir ruhu olduğuna dair ayrıntıları tek bir yazıttan çıkaramayız. Bu tür ritüelleri anlatmak için ayrıca etnografik ve tarihsel kayıt gerekir.</p>\n<h2>Gök Tanrı inancı kesinlikle tek tanrılı mıydı?</h2>\n<p>Bu konuda araştırmacılar farklı açıklamalar yapmıştır. Tengri'nin yüksek bir yaratıcı veya hüküm verici güç olarak görünmesi tek tanrıcılık yorumunu destekleyebilir; ancak aynı metinlerde Umay ve Yer-Su gibi kutsal varlıkların da yer alması daha karmaşık bir tablo oluşturur. Modern 'Tengricilik' tanımına farklı çağların Sibirya, Türk ve Moğol halklarının bütün inançlarını doğrudan yerleştirmek tarihsel farkları örter.</p>\n<h2>Türk hükümdarlığında kut ne anlama gelir?</h2>\n<p>Hükümdarlık yetkisinin göksel veya kutsal meşruiyetle ilişkilendirilmesi Orhun yazıtlarını anlamada önemlidir. 'Kut' kavramını günümüz demokratik hesap verebilirlik, ekoloji veya modern anayasa görüşlerinin birebir karşılığı gibi sunmamak gerekir. Yazıtların siyasi dili kendi çağının kavramlarıyla okunmalıdır.</p>\n<h2>Sonuç</h2>\n<p>Eski Türk inancı gök, kutsal mekân, hükümdarlık ve topluluk düzeniyle ilişkili zengin bir tarihsel araştırma alanıdır. Tengri, Umay ve Yer-Su hakkında güvenilir ilk durak yazıtların farklı çevirileridir; dramatik öyküler veya bugünün değerlerini doğrudan eski topluluklara atfetmek değil.</p>",
    "sources": [
      "Turkic Atlas — Tengriciliğin oluşumu; Orhun yazıtları, tarih yazımı ve yorumlar: https://www.turkicatlas.org/tr/historiography/tengrism-historiography/",
      "Turkic Atlas — Umay ve Kül Tigin/Tonyukuk yazıtları: https://www.turkicatlas.org/religions/umay/",
      "Turkic Atlas — Türk halklarının tarihi, Yer-Su ve Umay bağlamı: https://www.turkicatlas.org/tr/ethnicities/history-of-the-turkic-peoples/"
    ],
    "faq": [
      {
        "question": "Gök Tanrı eski Türklerde tek tanrı inancı mıydı?",
        "answer": "Tengri'nin yüksek konumu belgelenmiştir; ancak yazıtlardaki Umay ve Yer-Su gibi figürler nedeniyle inanç sistemi tek bir modern tanıma indirgenemez."
      },
      {
        "question": "Umay Orhun yazıtlarında geçiyor mu?",
        "answer": "Evet. Kül Tigin ve Tonyukuk metinleri Umay adını belirli bağlamlarda anar."
      }
    ],
    "metaDescription": "Gök Tanrı, Umay ve Yer-Su inancını Orhun yazıtlarıyla inceleyin. Eski Türk dinini modern yorumlardan ve kesin tek tanrıcılık iddiasından ayırın.",
    "updated": "2026-11-16T00:00:00Z",
    "newsArticle": false
  },
  "/2025/12/aksemseddin-kimdir-hayati-eserleri-ve-istanbul-un-fethi-ders-notu.html": {
    "title": "Akşemseddin Kimdir? Hayatı, 1453 Fetihteki Rolü ve Eserleri",
    "seoTitle": "Akşemseddin: Hayatı, İstanbul'un Fethi ve Tıp Çalışmaları",
    "description": "Akşemseddin'in 1390 doğumu, 1459 vefatı, Hacı Bayram-ı Veli ile ilişkisi, fetihteki rolü ve mikrop teorisine dair tartışmalarını kaynakla öğrenin.",
    "contentHtml": "<div class=\"odyomuh-note\"><strong>16 Kasım 2026 kaynak düzeltmesi:</strong> Önceki ders notunda doğum yılı 1389 yazılıydı; TDV İslâm Ansiklopedisi 1390 verir. Hacı Bayram'a bağlanma tarihi belirsiz olduğu hâlde 1424 olarak kesinleştirilmişti. Ayrıca modern mikrop teorisinin doğrudan kurucusu olduğu izlenimi veriliyor ve kaynağı gösterilmeyen kişisel sözler doğrudan alıntılanıyordu.</div>\n<h2>Akşemseddin kimdir?</h2>\n<p>Akşemseddin, asıl adıyla Şemseddin Muhammed bin Hamza, Osmanlı döneminde yaşamış bir mutasavvıf, âlim ve hekimdir. <a href=\"https://islamansiklopedisi.org.tr/aksemseddin\">TDV İslâm Ansiklopedisi</a> onu 1390'da Şam'da doğmuş, 1459'da Göynük'te vefat etmiş kişi olarak tanıtır. Bu biyografide yıl ve tarihlerin bazıları takvim çevrimleri veya farklı tarihsel anlatılar nedeniyle değişiklik gösterebilir; doğrulanmamış ayrıntıları kesin biyografi olarak kullanmamak gerekir.</p>\n<h2>Akşemseddin'in eğitim ve tasavvuf hayatı</h2>\n<p>Çocukluğunda ailesiyle Anadolu'ya gelen Akşemseddin, dinî ilimler ve tıpla ilgilendi; Osmancık'ta müderrislik yaptığı aktarılır. Hacı Bayram-ı Velî'ye bağlanması Bayramiyye geleneğindeki yerinin temel aşamasıdır. Ancak TDV maddesi, intisap tarihinin kesin bilinmediğini özellikle söyler. Bu yüzden eski yazıdaki '1424' tarihini herkesçe kesinleşmiş kayıt gibi aktarmıyoruz.</p>\n<h2>İstanbul'un fethindeki rolü</h2>\n<p>Akşemseddin'in Fatih Sultan Mehmed ile ilişkisi ve kuşatmada orduya katılması kaynaklarda yer alır. TDV maddesi, padişaha mektuplarla moral verdiği ve 1453 fethinden sonra Ayasofya'daki ilk cuma hutbesini okuduğu yönündeki tarihsel anlatıları aktarır. Bunlar fetihte askerî komuta görevini üstlendiği veya tek başına fetih sonucunu belirlediği anlamına gelmez. Askerî kararlarla manevî rehberlik birbirinden ayrılmalıdır.</p>\n<h2>Ebû Eyyûb el-Ensârî'nin kabri hakkındaki anlatı</h2>\n<p>Osmanlı tarih yazımında Akşemseddin'in İstanbul'da Ebû Eyyûb el-Ensârî'nin kabrinin yerini belirlemesi anlatılır. TDV ansiklopedisi de bu rivayeti kaydeder. Ancak yüzyıllar önce gerçekleşmiş bir gömünün yerinin ilhamla bulunmasına ilişkin dinî gelenek ile modern arkeolojik konum doğrulamasını aynı yöntem saymamak gerekir. Tarihî anlatının türünü belirterek aktarmak en sağlıklı yoldur.</p>\n<h2>Mikropları Pasteur'den önce mi keşfetti?</h2>\n<p>Akşemseddin'in tıp çalışmalarında hastalıkların küçük canlı unsurlarla bulaşabileceğine ilişkin erken düşünceler bulunduğu öne sürülmüştür. TDV maddesinde bu yorumun tarihçiler arasında tartışıldığı da belirtilir. Fakat modern mikrobiyoloji; gözlem araçları, deney, etken izolasyonu ve birbirini doğrulayan çalışmalarla gelişmiş ayrı bir bilimsel tarih taşır. 'Akşemseddin modern mikrop teorisini 400 yıl önce bütünüyle kurdu' ifadesi, iki farklı bilgi düzeyini eşitleyen aşırı genellemedir.</p>\n<h2>Hangi eserleri bilinir?</h2>\n<p>TDV kaydında <em>Risâletü'n-nûriyye</em>, <em>Defʿu meṭâʿini'ṣ-ṣûfiyye</em>, <em>Makāmât-ı Evliyâ</em> gibi eserler yer alır. <em>Mâddetü'l-hayât</em> adlı tıp kitabının ona aidiyeti konusunda da araştırmacılar arasında değerlendirmeler bulunur. Eser adlarını anarken bunların hepsini aynı türden ve kesin biçimde müellifin günümüze ulaşmış nüshaları gibi göstermek doğru değildir.</p>\n<h2>Sınav için kısa özet</h2>\n<ul><li>1390 yılında Şam'da doğduğu, 1459'da Göynük'te öldüğü TDV tarafından belirtilir.</li><li>Hacı Bayram-ı Velî'nin takipçilerindendir; intisap yılı kesin değildir.</li><li>Fatih Sultan Mehmed ile ilişkisi ve fetih sırasındaki manevî rolü kaynaklarda anlatılır.</li><li>Tasavvuf ve tıpla ilgilendi; modern mikrop teorisini kurduğu kesin bilimsel sonuç değildir.</li><li>Eserleri ve kendisine atfedilen kitapların durumu akademik bibliyografyadan kontrol edilmelidir.</li></ul>\n<h2>Sonuç</h2><p>Akşemseddin'in tarihsel değeri, kaynaklara dayanan hayatı, eserleri ve Osmanlı düşünce dünyasındaki yeriyle anlaşılır. Ona doğrulanmamış sözler ve modern bilim alanlarının tartışmasız kuruculuğu gibi aşırı iddialar eklemek gerekli değildir.</p>",
    "sources": [
      "TDV İslâm Ansiklopedisi — Akşemseddin, biyografi, fetih rolü, eserler ve tıp tartışması: https://islamansiklopedisi.org.tr/aksemseddin",
      "TDV İslâm Ansiklopedisi — Akşemseddin'in ilişkili şahıs ve kurumları: https://islamansiklopedisi.org.tr/aksemseddin/iliskili-maddeler"
    ],
    "faq": [
      {
        "question": "Akşemseddin ne zaman doğdu ve öldü?",
        "answer": "TDV İslâm Ansiklopedisi doğum yılını 1390, vefat yılını 1459 olarak verir."
      },
      {
        "question": "Akşemseddin modern mikrop teorisini kurdu mu?",
        "answer": "Hastalığın bulaşması hakkında erken fikirler ona atfedilir; modern mikrop teorisinin tüm deneysel temellerini kurduğu iddiası doğru değildir."
      }
    ],
    "metaDescription": "Akşemseddin'in 1390 doğumu, 1459 vefatı, Hacı Bayram-ı Veli ile ilişkisi, fetihteki rolü ve mikrop teorisine dair tartışmalarını kaynakla öğrenin.",
    "updated": "2026-11-16T00:00:00Z",
    "newsArticle": false
  },
  "/2025/12/iskan-politikasi-nedir-osmanli-da-iskan-ve-surgun-sistemi-ders-notu.html": {
    "title": "Osmanlı İskân Politikası Nedir? Sürgün, Yerleştirme ve Sonuçları",
    "seoTitle": "Osmanlı İskân Politikası: Amaç, Sürgün ve Örnekler",
    "description": "Osmanlı iskân politikasının amaçları, teşvikli göç, zorunlu sürgün, Rumeli ve İstanbul örnekleri ile dönemler arasındaki değişimleri kaynaklarla öğrenin.",
    "contentHtml": "<div class=\"odyomuh-note\"><strong>16 Kasım 2026 kaynak düzeltmesi:</strong> Önceki not, Osmanlı 'sürgün'ünün ceza olmadığını ve bütün iskânın olumlu bir 'şenlendirme' yöntemi olduğunu ileri sürüyordu. Tarihsel kaynaklar hem teşvikli yerleştirmeyi hem zorunlu nakli hem de cezalandırma amacıyla sürgünü belgeliyor. Ders notundaki tek yönlü anlatım bu nedenle değiştirildi.</div>\n<h2>İskân politikası nedir?</h2>\n<p>İskân, bir topluluğun belirli bir yere yerleştirilmesi veya bir bölgenin meskûn hâle gelmesiyle ilgili uygulamaları anlatır. Osmanlı Devleti bunu fethedilmiş toprakları yeniden nüfuslandırmak, üretimi artırmak, güvenliği sağlamak, yollar ve şehirlerde ekonomik hayatı düzenlemek gibi amaçlarla kullandı. Ancak hedefler ve yöntemler devletin her döneminde aynı değildi. <a href=\"https://ansiklopedi.tubitak.gov.tr/ansiklopedi/osmanli_iskan_politikasi\">TÜBİTAK Osmanlı İskân Politikası maddesi</a> yöntemlerin ve coğrafyanın zaman içinde değiştiğini açıklar.</p>\n<h2>Yerleştirme her zaman gönüllü müydü?</h2>\n<p>Hayır. Belirli durumlarda göçmen aileler vergi muafiyetleri, arazi veya diğer teşviklerle yeni yerleşimlere yönlendirildi. Bazı durumlarda ise devlet emriyle zorunlu yer değiştirme uygulandı. <a href=\"https://islamansiklopedisi.org.tr/surgun\">TDV İslâm Ansiklopedisi'nin 'Sürgün' maddesi</a>, iskân amaçlı sürgün ile ceza amaçlı sürgün arasında her zaman keskin ayrım bulunmadığını vurgular. 'Sürgün Osmanlı'da ceza değil, sadece yerleştirmeydi' cümlesi bu yüzden hatalıdır.</p>\n<h2>İskânın başlıca amaçları nelerdi?</h2>\n<ul><li>Üretime açılmak istenen tarım arazilerini nüfuslandırmak.</li><li>Yeni fethedilmiş bölgelerde devletin idari ve askerî kontrolünü güçlendirmek.</li><li>Ticaret yolları, şehirler ve stratejik geçitlerde nüfus ve iş gücü sağlamak.</li><li>Konar-göçer toplulukların hareketlerini düzenlemek veya yerleşik hâle gelmelerini sağlamak.</li><li>Toprak kayıpları döneminde yeni gelen göçmenleri Osmanlı topraklarına yerleştirmek.</li></ul>\n<p>Bu hedefler devlet belgelerinin ve tarihsel yorumun bir parçasıdır. Uygulamaların yerel topluluklara nasıl etki ettiği ayrıca incelenmelidir; devletin amacı ile her ailenin yaşadığı sonuç aynı şey değildir.</p>\n<h2>Rumeli'de nasıl uygulandı?</h2>\n<p>Osmanlıların Balkanlarda genişlediği dönemlerde Anadolu'dan farklı toplulukların Rumeli'ye yerleştirilmesi iskân siyasetinin araçlarından biriydi. Konar-göçer gruplar, zanaatkârlar ve köylüler farklı koşullarda yeni yerleşimlere yönlendirildi. İskân, sadece etnik veya dinî kimlik değiştirme başlığıyla sınırlı görülemez; tarım üretimi, askeri lojistik ve nüfus idaresiyle de ilişkiliydi.</p>\n<h2>İstanbul'un fethinden sonra neler değişti?</h2>\n<p>1453 sonrasında İstanbul'un nüfus ve ekonomik hayatının canlandırılması için yeni yerleşimler düzenlendi. <a href=\"https://dergipark.org.tr/tr/pub/bilimname/article/952832\">İstanbul'a Zafer Hediyesi: Sürgünler (1453–1514)</a> araştırması, bu uygulamaları arşiv ve kronikler üzerinden inceler. Sürgünün burada yalnızca bir şehircilik planı değil, aynı zamanda hane halklarının hayatını etkileyen zorunlu hareketlilik boyutu vardı.</p>\n<h2>1699 sonrasında politika nasıl değişti?</h2>\n<p>Toprak kayıplarının artması, yeni gelen göçmenlerin ülke içindeki yerleşim sorunlarını önemli hâle getirdi. TDV kaydı bu dönemde dışarıdan gelen göçmenlerin yerleştirilmesini ve bazı aşiretlerin zorunlu iskânını öne çıkarır. Dolayısıyla 'Osmanlı bütün dönemlerde fethettiği toprağa Anadolu'dan aile gönderdi' cümlesi sistemin tarihsel değişimini yansıtmaz.</p>\n<h2>Sınav için örnek karşılaştırma</h2>\n<table><thead><tr><th>Yöntem</th><th>Özellik</th><th>Olası sonuç</th></tr></thead><tbody><tr><td>Teşvikli iskân</td><td>Muafiyet ve destekle yerleştirme</td><td>Üretim ve nüfus artışı</td></tr><tr><td>Zorunlu iskân</td><td>Devlet emriyle yer değiştirme</td><td>Yeni iş gücü ve nüfus düzeni; mağduriyet de doğurabilir</td></tr><tr><td>Ceza amaçlı sürgün</td><td>Cezalandırıcı nakil</td><td>İkamet ve toplumsal ilişkilerin zorla değişmesi</td></tr></tbody></table>\n<h2>Sonuç</h2>\n<p>Osmanlı iskân politikasının temel konusu yerleşim ve nüfus yönetimidir. Bunun yalnızca iyi sonuçlarını veya yalnızca zorlayıcı yönlerini anlatmak eksik kalır. Teşvik, zorunlu nakil, üretim, güvenlik ve toplumlar üzerindeki etkiler dönemlere göre birlikte değerlendirilmelidir.</p>",
    "sources": [
      "TÜBİTAK Ansiklopediler — Osmanlı İskân Politikası: https://ansiklopedi.tubitak.gov.tr/ansiklopedi/osmanli_iskan_politikasi",
      "TDV İslâm Ansiklopedisi — Sürgün, iskân ve ceza ayrımı: https://islamansiklopedisi.org.tr/surgun",
      "İstanbul'a Zafer Hediyesi: Sürgünler (1453–1514), bilimname (2022): https://dergipark.org.tr/tr/pub/bilimname/article/952832"
    ],
    "faq": [
      {
        "question": "Osmanlı'da sürgün yalnızca yerleştirme miydi?",
        "answer": "Hayır. Zorunlu iskânın yanı sıra ceza amaçlı sürgün de vardı."
      },
      {
        "question": "İskân politikasının amaçları nelerdi?",
        "answer": "Yerleşimi, üretimi ve güvenliği düzenlemek; bazı dönemlerde fethedilen bölgelere, bazı dönemlerde ülkeye yeni gelen göçmenleri yerleştirmekti."
      }
    ],
    "metaDescription": "Osmanlı iskân politikasının amaçları, teşvikli göç, zorunlu sürgün, Rumeli ve İstanbul örnekleri ile dönemler arasındaki değişimleri kaynaklarla öğrenin.",
    "updated": "2026-11-16T00:00:00Z",
    "newsArticle": false
  }
};

export function applyEvergreenRevision(item) {
  const revision = item && (historicalSourceBatch20261116[item.primaryPath] || editorialAuditBatch20261116[item.primaryPath] || legacyFactcheckRevisions[item.primaryPath] || recoveryRevisions[item.primaryPath] || factcheckRevisions[item.primaryPath] || priorityGuideRevisions[item.primaryPath] || evergreenRevisions[item.primaryPath]);
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

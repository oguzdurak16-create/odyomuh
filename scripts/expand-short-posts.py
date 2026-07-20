#!/usr/bin/env python3
"""Expand short Turkish ODYOMUH posts with structured, topic-aware editorial sections.

The script is deterministic and idempotent. It only appends an expansion block to
POST items below TARGET_WORDS and skips items that already contain that block.
"""
from __future__ import annotations

import csv
import hashlib
import html
import json
import re
import unicodedata
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "data" / "blogger-export.json"
REPORT_FILE = ROOT / "data" / "content-word-counts.csv"
TARGET_WORDS = 1100
MARKER = "odyomuh-editorial-expansion-v1"

WORD_RE = re.compile(r"\b[\wÇĞİÖŞÜçğıöşüÂâÎîÛû’'-]+\b", re.UNICODE)


def word_count(content_html: str) -> int:
    raw = re.sub(r"<script\b[^>]*>.*?</script>", " ", content_html or "", flags=re.I | re.S)
    raw = re.sub(r"<style\b[^>]*>.*?</style>", " ", raw, flags=re.I | re.S)
    text = html.unescape(re.sub(r"<[^>]+>", " ", raw))
    return len(WORD_RE.findall(text))


def clean_topic(title: str) -> str:
    title = re.sub(r"^[^\wÇĞİÖŞÜçğıöşü]+", "", title).strip()
    title = re.sub(r"\s*\|\s*.*$", "", title).strip()
    title = re.sub(r"\s+-\s+Ders Notu.*$", "", title, flags=re.I).strip()
    return title.rstrip("?.! ")


def pick(seed: str, options: list[str], salt: str) -> str:
    digest = hashlib.sha256(f"{seed}|{salt}".encode("utf-8")).digest()
    return options[int.from_bytes(digest[:4], "big") % len(options)]


def display_term(value: str) -> str:
    value = re.sub(r"[-_]+", " ", str(value).strip())
    replacements = {
        "dunya": "dünya", "turk": "Türk", "turkler": "Türkler",
        "cag": "çağ", "ortacag": "orta çağ", "guncel": "güncel",
        "haberler": "haberler", "uygarliklar": "uygarlıklar",
        "tarihi": "tarihi", "gizemli": "gizemli", "gobekli": "Göbekli",
        "hoyuk": "höyük", "misir": "Mısır", "birinci": "birinci",
    }
    value = " ".join(replacements.get(part.casefold(), part) for part in value.split())
    value = " ".join(value.split())
    small = {"ve", "ile", "mi", "mı", "mu", "mü", "de", "da"}
    words = []
    for index, word in enumerate(value.split()):
        if index and word.casefold() in small:
            words.append(word.casefold())
        elif word.isupper() and len(word) <= 5:
            words.append(word)
        else:
            words.append(word[:1].upper() + word[1:])
    return " ".join(words)


def fold_text(value: str) -> str:
    value = value.replace("I", "ı").replace("İ", "i").casefold()
    return "".join(ch for ch in unicodedata.normalize("NFKD", value) if not unicodedata.combining(ch))


def list_text(values: Iterable[str], limit: int = 5) -> str:
    vals = [display_term(str(v)) for v in values if str(v).strip()][:limit]
    if not vals:
        return "tarihsel bağlam, kaynak eleştirisi ve kanıtların yorumu"
    if len(vals) == 1:
        return vals[0]
    return ", ".join(vals[:-1]) + " ve " + vals[-1]


def extract_headings(content_html: str) -> list[str]:
    result: list[str] = []
    pattern = re.compile(r"<h[23]\b[^>]*>(.*?)</h[23]>", re.I | re.S)
    for match in pattern.finditer(content_html or ""):
        text = html.unescape(re.sub(r"<[^>]+>", " ", match.group(1)))
        text = " ".join(text.split())
        if text and text not in result:
            result.append(text)
    return result[:5]


def classify(item: dict) -> str:
    title = fold_text(item.get("title", ""))
    labels = fold_text(" ".join(item.get("labels", [])))
    merged = f"{title} {labels}"
    if "tarihte bugun" in merged or re.match(r"^\s*\d{1,2}\s+(ocak|subat|mart|nisan|mayıs|haziran|temmuz|agustos|eylul|ekim|kasım|aralık)", title):
        return "today"
    if "ders not" in merged or "ders-not" in merged:
        return "lesson"
    if any(k in merged for k in ["anunnaki", "antik uzaylı", "komplo", "enerji hat", "nibiru", "tartaria", "kristal enerji", "sesle tas", "nukleer enerji teorisi", "siyah kup"]):
        return "claims"
    if any(k in merged for k in ["arkeoloji", "hoyuk", "tepe", "yeraltı sehri", "nazca", "truva", "baalbek", "phaistos", "antikythera", "catalhoyuk", "gobekli", "derinkuyu"]):
        return "archaeology"
    if any(k in merged for k in ["mitoloji", "destan", "tanrı", "ereshkigal", "ergenekon", "gok tanrı", "ongun"]):
        return "myth"
    return "history"


def p(text: str) -> str:
    return f"<p>{html.escape(text)}</p>"


def h2(text: str) -> str:
    return f"<h2>{html.escape(text)}</h2>"


def h3(text: str) -> str:
    return f"<h3>{html.escape(text)}</h3>"


def ul(items: list[str]) -> str:
    return "<ul>" + "".join(f"<li>{html.escape(x)}</li>" for x in items) + "</ul>"


def intro(item: dict, topic: str, headings: list[str], seed: str, kind: str) -> list[str]:
    desc = item.get("description", "").strip()
    labels = list_text(item.get("labels", []), 5)
    heading_ref = list_text(headings, 3) if headings else "temel olaylar ve yorumlar"
    opener = pick(seed, [
        f"{topic} başlığı, tek bir olay ya da merak uyandıran iddiadan daha geniş bir tarihsel çerçeveye sahiptir.",
        f"{topic} hakkında sağlıklı bir değerlendirme yapmak, başlıktaki çarpıcı sorunun ötesine geçmeyi gerektirir.",
        f"{topic} konusu, popüler anlatıyla tarihsel araştırmanın birbirinden ayrılması gereken örneklerden biridir.",
    ], "intro")
    out = [h2(f"{topic}: Konuyu daha derin okumak")]
    out.append(p(f"{opener} Bu yazının mevcut bölümleri özellikle {heading_ref} üzerinde duruyor. Geniş çerçevede ise {labels} başlıklarını birlikte düşünmek gerekir. Böylece konu, tek başına dikkat çekici bir bilgi olmaktan çıkar ve kendi dönemi, kaynakları, sonuçları ve sonraki yorumları içinde anlaşılır."))

    if kind == "today":
        out.append(p(f"Yazının kısa özeti, aynı takvim gününde farklı yıllarda meydana gelen gelişmeleri bir araya getiriyor{': ' + desc if desc else '.'} Bu olayların ortak bir nedene bağlı olduğu varsayılmamalıdır. Her biri kendi kronolojisi içinde değerlendirilmeli; yıldönümü tarihi ise uzun bir sürecin görünür olduğu eşik olarak okunmalıdır."))
    elif kind == "lesson":
        out.append(p(f"Bu ders notunun çıkış noktası şudur{': ' + desc if desc else '.'} Konuyu kalıcı biçimde öğrenmek için tanım, amaç, uygulama ve sonuç basamakları birbirinden ayrılmalıdır. Kavramın benzer terimlerle farkı ve bir örnek olay içindeki işlevi kurulmadan yapılan ezber, soru biçimi değiştiğinde yetersiz kalabilir."))
    elif kind == "claims":
        out.append(p(f"Yazının özeti şu tartışmayı öne çıkarıyor{': ' + desc if desc else '.'} Burada gerçek tarihsel unsur, modern yorum ve kanıtlanmamış çıkarım ayrı katmanlardır. Bir nesnenin, metnin veya geleneğin varlığı belgelenebilir; fakat ondan çıkarılan olağanüstü sonuç ayrıca ve bağımsız kanıt gerektirir."))
    elif kind == "archaeology":
        out.append(p(f"Yazının özeti şu temel arkeolojik çerçeveyi sunuyor{': ' + desc if desc else '.'} Konuya kesin bir cümleyle karşılık vermeden önce tarihleme, coğrafi bağlam, buluntu tabakası, üretim tekniği ve benzer alanlar birlikte değerlendirilmelidir. Tek bir dikkat çekici nesne bütün yerleşimin anlamını tek başına belirlemez."))
    elif kind == "myth":
        out.append(p(f"Yazının özeti anlatının ana eksenini veriyor{': ' + desc if desc else '.'} Mitolojik metinler modern kronikler gibi okunmaz. Sembol, ritüel, siyasi meşruiyet, sözlü aktarım ve daha geç dönemdeki yazılı sürümler birlikte ele alındığında anlatının toplum için taşıdığı anlam daha açık hâle gelir."))
    else:
        out.append(p(f"Yazının özeti olayın ana çizgisini ortaya koyuyor{': ' + desc if desc else '.'} Tarihsel açıklama, tek bir kişiye veya nedene dayanmak yerine kurumları, ekonomik koşulları, toplumsal aktörleri ve kısa ile uzun vadeli sonuçları birlikte inceler. Böylece olayın yalnızca ne olduğu değil, neden mümkün hâle geldiği de anlaşılır."))
    return out


def common_source_section(topic: str, seed: str) -> list[str]:
    phr = pick(seed, [
        "Bir tarihsel iddianın gücü, ne kadar şaşırtıcı olduğuna değil hangi kanıtlarla desteklendiğine bağlıdır.",
        "Tarih araştırmasında dikkat çekici anlatı ile doğrulanabilir bilgi aynı şey değildir.",
        "Geçmişe ilişkin güçlü bir sonuç, farklı kaynak türlerinin birbirini desteklemesini gerektirir.",
    ], "source")
    return [
        h2("Kaynaklar ve kanıtlar nasıl değerlendirilir?"),
        p(f"{phr} {topic} hakkında okuma yaparken kaynakları üç gruba ayırmak yararlıdır: olayın dönemine yakın birincil kayıtlar, daha sonra hazırlanan akademik çalışmalar ve geniş kitlelere yönelik popüler anlatılar. Birincil kaynaklar dönemin bakışını yansıtır, fakat tarafsız olmak zorunda değildir. Akademik çalışmalar yöntem ve karşılaştırma sunar, fakat onlar da yeni bulgularla değişebilir. Popüler içerikler ise konuyu görünür kılar; buna karşılık kaynak göstermediğinde veya ihtimali kesinlik gibi sunduğunda dikkatle kullanılmalıdır."),
        p("Kanıtın bulunduğu bağlam en az kanıtın kendisi kadar önemlidir. Bir nesnenin hangi tabakadan çıktığı, çevresinde nelerin bulunduğu, sonradan taşınıp taşınmadığı ve tarihlendirme yönteminin hata payı bilinmeden yapılan yorum eksik kalır. Yazılı bir metinde de yazarın amacı, hedef kitlesi, kullandığı dil ve metnin bize hangi kopya üzerinden ulaştığı sorgulanmalıdır. Bu sorular, gizemi ortadan kaldırmak için değil; neyi gerçekten bildiğimizi ve hangi noktada yorum yaptığımızı göstermek için sorulur."),
        p("Güvenilir bir değerlendirmede 'kanıtlanmıştır', 'muhtemeldir', 'mümkündür' ve 'kanıt yoktur' ifadeleri birbirinden ayrılır. Bu dört seviye aynı anlamı taşımaz. Bir açıklamanın mümkün olması, onun en olası açıklama olduğu anlamına gelmez. Özellikle sosyal medyada sık tekrarlanan bir iddianın kaynak sayısı fazla görünebilir; ancak bütün paylaşımlar aynı eski metne dayanıyorsa ortada bağımsız doğrulama yoktur."),
    ]


def faq(topic: str, kind: str) -> list[str]:
    answers = {
        "today": [
            (f"{topic} neden bugün de hatırlanıyor?", "Çünkü bir tarih yalnızca geçmişte kalmış bir gün değildir. O gün alınan kararlar, geliştirilen teknolojiler veya yaşanan toplumsal kırılmalar daha sonraki kurumları ve gündelik hayatı etkileyebilir. Hatırlama biçimi de zamanla değişir; yıldönümleri, toplumların hangi olayları ortak hafızanın parçası hâline getirdiğini gösterir."),
            ("Aynı gün yaşanan olaylar arasında doğrudan bağlantı var mı?", "Çoğu zaman yoktur. Tarihte bugün dosyaları farklı yıllarda gerçekleşen olayları aynı takvim günü üzerinden bir araya getirir. Amaç nedensellik kurmak değil, aynı tarihin farklı dönemlerde nasıl farklı anlamlar kazandığını göstermektir."),
            ("Tarihler neden kaynaklar arasında değişebilir?", "Takvim sistemleri, saat dilimleri, olayın başlaması ile resmen ilan edilmesi arasındaki fark ve daha sonra yapılan düzeltmeler tarih uyuşmazlığı yaratabilir. Bu nedenle özellikle resmî belgelerle çağdaş basın kayıtlarını karşılaştırmak gerekir."),
        ],
        "lesson": [
            (f"{topic} sınavda nasıl sorulabilir?", "Kavramın doğrudan tanımı, benzer bir kavramla farkı, tarihsel sonucu veya verilen bir örnek olayda hangi ilkenin uygulandığı sorulabilir. Ezberden çok kavramlar arasındaki ilişkiyi kurmak, farklı soru kalıplarına karşı daha güvenli bir yöntemdir."),
            ("Kısa tekrar için en iyi yöntem nedir?", "Konuyu bir cümlelik tanım, üç anahtar özellik, bir tarihsel örnek ve bir karşılaştırma üzerinden özetlemektir. Ardından notlara bakmadan kendi cümlelerinizle açıklamak kalıcı öğrenmeyi güçlendirir."),
            ("Benzer kavramlar neden karıştırılır?", "Aynı kurum veya dönem içinde kullanılan terimler ortak özellik taşıyabilir. Karışıklığı azaltmak için her kavramın işlevini, kim tarafından uygulandığını ve hangi sonucu doğurduğunu ayrı sütunlarda karşılaştırmak gerekir."),
        ],
        "claims": [
            (f"{topic} tamamen uydurma mı?", "Bir başlığın içinde gerçek tarihsel unsurlar ile modern yorumlar birlikte bulunabilir. Yer, nesne, metin veya mit gerçek olabilir; fakat bunlardan çıkarılan olağanüstü sonuç ayrıca kanıtlanmalıdır. Bu nedenle 'konu gerçek mi?' yerine 'hangi bölümü belgeli, hangi bölümü yorum?' sorusu daha doğrudur."),
            ("Bilim neden kesin bir cevap vermiyor?", "Bazı konularda veri azdır, bazı buluntular zarar görmüştür ve geçmiş toplumların niyetini doğrudan ölçmek mümkün değildir. Bilimsel ihtiyat bilgisizlik değil, kanıtın izin verdiği sınırı açıkça belirtmektir."),
            ("Popüler teoriler neden kalıcı oluyor?", "Basit, büyük ve şaşırtıcı açıklamalar karmaşık tarihsel süreçlerden daha kolay hatırlanır. Görsel benzerlikler, seçilmiş örnekler ve tekrar etkisi de teorinin kanıtlanmış gibi algılanmasına yol açabilir."),
        ],
        "archaeology": [
            (f"{topic} hakkında kesin sonuca neden ulaşılamıyor?", "Arkeolojik kayıt eksiktir. Organik malzemelerin çoğu korunmaz, yapılar yeniden kullanılır ve kazılar alanın yalnızca bir bölümünü açığa çıkarabilir. Bu yüzden sonuçlar mevcut kanıtların en iyi açıklaması olarak sunulur."),
            ("Yeni bir buluntu eski yorumu değiştirebilir mi?", "Evet. Yeni tarihlendirme, DNA analizi, çevresel veri veya karşılaştırmalı bir kazı önceki modeli güçlendirebilir ya da değiştirebilir. Arkeolojinin kendini yenileyen yönü buradan gelir."),
            ("Büyük yapıların yapılması ileri teknoloji kanıtı mıdır?", "İleri örgütlenme, uzmanlık ve mühendislik bilgisi gösterir; ancak modern veya dünya dışı teknoloji anlamına gelmez. İş gücü, basit makineler, deneyim ve uzun zaman ölçeği birlikte önemli sonuçlar üretebilir."),
        ],
        "myth": [
            (f"{topic} tarihsel gerçek olarak okunabilir mi?", "Mitler geçmişe dair izler taşıyabilir, fakat doğrudan kronik değildir. Toplumsal değerleri, siyasi meşruiyeti, doğa anlayışını ve kimlik hafızasını sembolik bir dille aktarırlar. Tarihsel yorum için başka kaynaklarla karşılaştırılmaları gerekir."),
            ("Farklı anlatımlar neden birbirine uymuyor?", "Sözlü aktarım, bölgesel gelenekler, siyasi ihtiyaçlar ve metni kaydeden kişinin dönemi anlatıyı değiştirir. Varyantlar hata değil, geleneğin zaman içinde nasıl yaşadığını gösteren veriler olabilir."),
            ("Mitoloji ile din aynı şey midir?", "Örtüşen alanları vardır fakat tamamen aynı değildir. Mitoloji anlatı ve semboller bütününü, din ise inanç, ritüel, kurum ve topluluk pratiğini de kapsar. Modern kullanımda 'mit' sözcüğü yanlış anlamına gelmek zorunda değildir."),
        ],
        "history": [
            (f"{topic} neden tek bir nedene indirgenemez?", "Tarihsel gelişmeler siyasi kararlar, ekonomik koşullar, toplumsal beklentiler, teknoloji ve kişisel tercihler gibi birden fazla etkenin kesişmesiyle oluşur. Tek nedenli açıklama anlaşılır görünür, fakat çoğu zaman önemli bağlantıları dışarıda bırakır."),
            ("Bir olayın sonucu ne zaman ortaya çıkar?", "Bazı sonuçlar hemen görülür; bazıları yıllar veya kuşaklar sonra belirginleşir. Kısa, orta ve uzun vadeli etkileri ayrı incelemek tarihsel değişimin hızını daha doğru gösterir."),
            ("Tarihsel kişileri bugünün ölçüleriyle değerlendirmek doğru mu?", "Etik değerlendirme yapılabilir, ancak önce dönemin kurumlarını, seçeneklerini ve dilini anlamak gerekir. Bağlam kurmak davranışı mazur göstermek değil, neden ve sonuç ilişkisini doğru çözümlemektir."),
        ],
    }
    out = [h2("Sık sorulan sorular")]
    for q, a in answers[kind]:
        out.extend([h3(q), p(a)])
    return out


def generate_today(item: dict, topic: str, headings: list[str], seed: str) -> str:
    parts = intro(item, topic, headings, seed, "today")
    parts.extend([
        h2("Bir takvim gününü tarihsel bağlama yerleştirmek"),
        p(f"{topic} gibi tarihte bugün içerikleri, farklı yüzyıllarda gerçekleşen olayları ortak bir takvim başlığı altında toplar. Bu yöntem okuyucuya hızlı bir karşılaştırma alanı sunar; ancak olayların birbirine neden olduğu izlenimini vermemek gerekir. Aynı günün içine siyaset, bilim, kültür, savaş, toplumsal haklar veya teknoloji alanından gelişmeler girebilir. Bunların ortak noktası tarih değil, yalnızca takvim günüdür."),
        p("Her olay kendi öncesi ve sonrasıyla okunmalıdır. Bir yasanın imzalanması, kararın o gün birden ortaya çıktığı anlamına gelmez; arkasında yıllarca süren tartışmalar bulunabilir. Bir buluşun tanıtıldığı tarih de araştırma sürecinin başlangıcı değildir. Bu nedenle yıldönümü tarihini, sürecin tamamını temsil eden sembolik bir eşik olarak görmek daha doğrudur."),
        h2("Kısa, orta ve uzun vadeli etkiler"),
        p("Tarihsel önem değerlendirilirken ilk günkü yankı ile sonraki etkiler ayrılmalıdır. Bazı olaylar gerçekleştiği anda dünya çapında dikkat çeker fakat kalıcı sonuç üretmez. Bazıları ise ilk anda sınırlı görünürken yıllar sonra kurumları, iletişim biçimlerini veya siyasi dili dönüştürür. Sağlıklı bir tarihte bugün metni, olayın yalnızca ne olduğunu değil, hangi süreçleri hızlandırdığını ve hangi tartışmaları geride bıraktığını da açıklar."),
        p("Ayrıca anma kültürü de tarihsel bir veridir. Bir olayın hangi ülkelerde, hangi kurumlar tarafından ve hangi ifadelerle hatırlandığı zaman içinde değişebilir. Resmî törenler, gazete arşivleri, müzeler ve eğitim programları geçmişin bugünkü kimlik inşasında nasıl kullanıldığını gösterir. Bu yüzden yıldönümü yazıları yalnızca geçmişi değil, toplumların geçmişle kurduğu güncel ilişkiyi de anlatır."),
    ])
    parts.extend(common_source_section(topic, seed))
    parts.extend(faq(topic, "today"))
    return f'<section class="odyomuh-editorial-expansion" data-editorial="{MARKER}">' + "\n".join(parts) + "</section>"


def generate_lesson(item: dict, topic: str, headings: list[str], seed: str) -> str:
    labels = list_text(item.get("labels", []), 6)
    parts = intro(item, topic, headings, seed, "lesson")
    parts.extend([
        h2("Kavramı ezberlemek yerine ilişki kurmak"),
        p(f"{topic} öğrenilirken tanımı tek başına ezberlemek yeterli değildir. Kavramın hangi dönemde, hangi kurum içinde ve hangi ihtiyaca cevap olarak kullanıldığını anlamak gerekir. {labels} ile bağlantı kurulduğunda konu daha kalıcı hâle gelir. Bir kavramın işlevi, onu uygulayan aktörler ve ortaya çıkardığı sonuçlar ayrı ayrı yazılmalıdır."),
        p("Ders çalışırken dört sütunlu kısa bir tablo kullanılabilir: tanım, amaç, uygulama biçimi ve sonuç. Beşinci sütuna da karıştırılan kavram eklenirse sınavdaki çeldiriciler daha kolay fark edilir. Örneğin bir terim yönetim düzenini, diğeri ekonomik paylaşımı, bir başkası hukuk veya askerî örgütlenmeyi ifade edebilir. Hepsinin aynı döneme ait olması aynı anlama geldikleri anlamına gelmez."),
        h2("Neden-sonuç zinciri nasıl kurulmalı?"),
        p("Tarih sorularında yalnızca 'ne oldu?' değil, 'neden ortaya çıktı?' ve 'hangi sonucu doğurdu?' soruları önemlidir. İlk neden genellikle tek değildir. Coğrafya, üretim biçimi, güvenlik ihtiyacı, hanedan ilişkileri, inanç ve gelenek birlikte rol oynayabilir. Sonuçlar da siyasi, sosyal ve ekonomik olarak sınıflandırılabilir. Böyle bir sınıflandırma, uzun paragrafları kısa ve anlaşılır bilgi bloklarına dönüştürür."),
        p("Kronoloji kurarken olayların tarihini ezberlemek kadar birbirine göre sırasını bilmek de değerlidir. Önce kurumun veya düşüncenin ortaya çıktığı koşullar, sonra uygulamadaki biçimi, ardından değişimi ve mirası yazılmalıdır. Kesin tarih verilemeyen konularda yüzyıl veya dönem sıralaması yeterli olabilir. Böylece yanlış bir kesinlik üretmeden genel çerçeve korunur."),
        h2("Sınavda sık yapılan hatalar"),
        ul([
            "Tanımı doğru bilip kavramın işlevini başka bir kurumla karıştırmak.",
            "Bir uygulamanın bütün Türk veya dünya devletlerinde aynı biçimde sürdüğünü varsaymak.",
            "Destan, gelenek ve resmî kurum bilgisini aynı kanıt düzeyinde değerlendirmek.",
            "Kısa vadeli sonuçla uzun vadeli mirası birbirine karıştırmak.",
            "Sorudaki dönem veya coğrafya sınırlamasını gözden kaçırmak.",
        ]),
        h2("Aktif tekrar planı"),
        p(f"Birinci turda {topic} için iki cümlelik tanım yazın. İkinci turda notlara bakmadan üç temel özellik sıralayın. Üçüncü turda benzer bir kavramla farkını açıklayın. Son turda ise bir örnek olay üzerinden kavramın nasıl uygulandığını anlatın. Bu yöntem, bilgiyi yalnızca tanım düzeyinde değil yorum ve uygulama düzeyinde de kullanmanızı sağlar."),
        p("Tekrar aralığı olarak aynı gün kısa bir gözden geçirme, bir gün sonra hatırlama testi ve bir hafta sonra karışık soru çözümü uygulanabilir. Yanlış cevaplarda yalnızca doğru seçeneği işaretlemek yerine hatanın nedenini yazmak gerekir. 'Tanımı bilmiyordum', 'dönemi karıştırdım' veya 'çeldiriciye takıldım' biçimindeki notlar çalışma planını daha verimli hâle getirir."),
    ])
    parts.extend(common_source_section(topic, seed))
    parts.extend(faq(topic, "lesson"))
    return f'<section class="odyomuh-editorial-expansion" data-editorial="{MARKER}">' + "\n".join(parts) + "</section>"


def generate_claims(item: dict, topic: str, headings: list[str], seed: str) -> str:
    labels = list_text(item.get("labels", []), 6)
    parts = intro(item, topic, headings, seed, "claims")
    parts.extend([
        h2("İddia, olasılık ve kanıt arasındaki fark"),
        p(f"{topic} çevresindeki tartışmalar çoğunlukla gerçek bir tarihsel unsurdan başlar ve daha geniş bir sonuca ulaşır. {labels} gibi kavramlar aynı anlatıda yan yana geldiğinde, ilk olarak hangi unsurun doğrudan belgeli olduğunu belirlemek gerekir. Bir tabletin, yapının, haritanın veya mitin varlığı kanıttır; fakat onun dünya dışı ziyaret, kayıp küresel uygarlık ya da bilinmeyen enerji sistemiyle açıklanması ayrı bir iddiadır."),
        p("İddianın sınanabilir olması önemlidir. Hangi bulgunun teoriyi doğrulayacağı, hangi bulgunun yanlışlayacağı ve alternatif açıklamaların neden yetersiz kaldığı belirtilmiyorsa teori bilimsel açıdan zayıftır. Her sonucu açıklayabilen ve hiçbir durumda yanlışlanamayan bir iddia, etkileyici bir hikâye sunabilir; fakat araştırma yöntemi olarak kullanışlı değildir."),
        h2("Görsel benzerlik neden tek başına yeterli değildir?"),
        p("Farklı coğrafyalardaki yapıların, sembollerin veya ritüellerin birbirine benzemesi insanları ortak bir köken aramaya yöneltir. Oysa benzer ihtiyaçlar benzer çözümler üretebilir. Büyük taşların üst üste konması, gökyüzünün gözlenmesi, kutsal yönlerin seçilmesi veya geometrik biçimlerin kullanılması birçok toplumda bağımsız olarak ortaya çıkabilir. Kültürel bağlantı iddiası için yalnızca biçim değil; tarih, aktarım yolu, ara örnekler ve ortak teknik ayrıntılar da gerekir."),
        p("Haritalar ve hizalama iddialarında seçilim etkisi sık görülür. Dünya üzerinde çok sayıda anıt bulunduğu için birkaçının bir doğruya yakın düşmesi şaşırtıcı olmayabilir. Hangi yapıların hesaba katıldığı, çizginin kalınlığı, harita izdüşümü ve tolerans aralığı açıklanmadığında sonuç kolayca istenen desene uydurulabilir. Sağlam bir analiz, önce ölçütü belirler ve sonra bütün veriye aynı kuralı uygular."),
        h2("Popüler kültürün etkisi"),
        p("Belgeseller, romanlar, kısa videolar ve sosyal medya paylaşımları karmaşık konuları dramatik bir çatışma üzerinden anlatmayı tercih eder: resmî tarih ile saklanan gerçek, sıradan teknoloji ile kayıp üstün bilgi, insan emeği ile dünya dışı yardım. Bu yapı izleyiciyi sürükler; ancak bilimsel tartışmanın gerçek biçimi genellikle daha yavaştır. Araştırmacılar çoğu zaman iki uçtan birini seçmek yerine birden fazla olasılığı kanıt ağırlığına göre sıralar."),
        p("Eleştirel yaklaşım merakı azaltmaz. Tam tersine, insanların sınırlı araçlarla nasıl plan yaptığı, bilgiyi kuşaklar boyunca nasıl aktardığı ve büyük projeler için nasıl örgütlendiği çoğu zaman olağanüstü teorilerden daha zengin bir hikâye sunar. Geçmiş toplumları açıklamak için onların bilgi ve emeğini görünmez kılmamak gerekir."),
        h2("Bu konuda güvenilir okuma nasıl yapılır?"),
        ul([
            "İddianın ilk kez nerede ve ne zaman ortaya atıldığını bulun.",
            "Atıf yapılan kazı raporunun veya akademik çalışmanın gerçekten aynı sonucu söyleyip söylemediğini kontrol edin.",
            "Tarih, coğrafya ve ölçü bilgilerinin bağımsız kaynaklarda uyuşup uyuşmadığına bakın.",
            "Alternatif açıklamaların neden reddedildiğinin açıkça gösterilmesini isteyin.",
            "Kesinlik bildiren başlıklarla ihtiyatlı akademik dil arasındaki farkı not edin.",
        ]),
    ])
    parts.extend(common_source_section(topic, seed))
    parts.extend(faq(topic, "claims"))
    return f'<section class="odyomuh-editorial-expansion" data-editorial="{MARKER}">' + "\n".join(parts) + "</section>"


def generate_archaeology(item: dict, topic: str, headings: list[str], seed: str) -> str:
    labels = list_text(item.get("labels", []), 6)
    parts = intro(item, topic, headings, seed, "archaeology")
    parts.extend([
        h2("Arkeolojik bağlam neden belirleyicidir?"),
        p(f"{topic} değerlendirilirken yalnızca dikkat çekici yapı veya nesneye bakmak yeterli değildir. {labels} çerçevesinde alanın yerleşim tarihi, çevresel koşulları, üretim biçimi ve başka merkezlerle ilişkisi birlikte incelenir. Bir buluntunun nerede bulunduğu, hangi tabakaya ait olduğu ve çevresindeki diğer malzemeler onun anlamını belirler."),
        p("Kazı sırasında konum bilgisi santimetre düzeyinde kaydedilir; toprak rengi, dolgu biçimi, mimari evreler ve küçük buluntular ayrı bir veri katmanı oluşturur. Müze koleksiyonuna bağlamı bilinmeden girmiş tek bir nesne estetik veya teknolojik bilgi sağlayabilir, fakat kullanım amacı ve tarihi konusunda daha sınırlı konuşulabilir. Bu nedenle kaçak kazılar yalnızca eser kaybına değil, geri getirilemeyecek bilgi kaybına da yol açar."),
        h2("Tarihlendirme nasıl yapılır?"),
        p("Arkeologlar tek bir tarihlendirme yöntemine bağlı kalmaz. Organik kalıntılarda radyokarbon analizi, ahşapta ağaç halkaları, seramikte tipoloji, yapılarda mimari karşılaştırma ve bazı malzemelerde fiziksel ölçüm yöntemleri kullanılabilir. Her yöntemin uygulanabildiği malzeme ve hata payı farklıdır. En güçlü sonuç, bağımsız yöntemlerin benzer zaman aralığına işaret etmesiyle elde edilir."),
        p("Bir yapının inşa tarihi ile kullanım süresi de aynı değildir. Alanlar onarılabilir, genişletilebilir, terk edilebilir ve yüzyıllar sonra başka amaçla yeniden kullanılabilir. Bu yüzden tek bir tarih yerine kuruluş, ana kullanım, dönüşüm ve terk evrelerinden söz etmek daha doğru olabilir. Popüler anlatılar bu evreleri tek bir 'gizemli uygarlık' başlığı altında birleştirdiğinde tarihsel ayrıntı kaybolur."),
        h2("Antik mühendisliği anlamak"),
        p("Büyük taşlar, yeraltı mekânları, hassas yönelimler veya karmaşık düzenlemeler geçmiş toplumların ölçüm, iş bölümü ve malzeme bilgisi geliştirdiğini gösterir. Bunun açıklaması yalnızca kullanılan aletlerde değil, proje organizasyonunda aranmalıdır. Deneyimli ustalar, standartlaşmış iş adımları, mevsimsel iş gücü, taşımaya uygun yollar ve uzun süreli planlama basit araçların kapasitesini büyük ölçüde artırabilir."),
        p("Deneysel arkeoloji, eski yöntemlerin küçük veya tam ölçekli denemelerini yaparak hangi işlemlerin mümkün olduğunu test eder. Böyle bir deney geçmişte tam olarak aynı yöntemin kullanıldığını tek başına kanıtlamaz; fakat 'bu araçlarla yapılamazdı' iddiasını sınayabilir. Alet izleri, yarım kalmış bloklar, taş ocakları ve işçi yerleşimleri deney sonuçlarıyla birlikte değerlendirildiğinde daha güçlü bir model ortaya çıkar."),
        h2("Belirsizlik neden korunmalıdır?"),
        p("Arkeolojik yorumda belirsizlik bir eksiklik değil, kanıtın dürüstçe ifade edilmesidir. Bir yapının ritüel, gündelik, siyasi veya ekonomik işlevleri aynı anda bulunabilir. Kullanım amacı zaman içinde değişebilir. Araştırmacılar yeni bulgular geldikçe modelleri günceller; bu değişim bilimin başarısızlığı değil, yönteminin çalıştığını gösterir."),
    ])
    parts.extend(common_source_section(topic, seed))
    parts.extend(faq(topic, "archaeology"))
    return f'<section class="odyomuh-editorial-expansion" data-editorial="{MARKER}">' + "\n".join(parts) + "</section>"


def generate_myth(item: dict, topic: str, headings: list[str], seed: str) -> str:
    labels = list_text(item.get("labels", []), 6)
    parts = intro(item, topic, headings, seed, "myth")
    parts.extend([
        h2("Mit, tarih ve toplumsal hafıza"),
        p(f"{topic} anlatısı {labels} gibi alanlarla ilişkilidir. Mitolojik metinler geçmişi modern bir tarih kitabı gibi kaydetmez. Kökeni, düzeni, iktidarı, doğayı ve insanın dünyadaki yerini semboller üzerinden açıklar. Bu nedenle anlatıdaki olağanüstü unsur, onu değersiz veya 'yanlış' yapmaz; asıl soru, bu unsurun anlatıyı dinleyen toplum için ne ifade ettiğidir."),
        p("Bir mit hükümdarın meşruiyetini destekleyebilir, bir topluluğun ortak atalarını açıklayabilir, mevsimsel döngüleri anlamlandırabilir veya ahlaki sınırlar çizebilir. Aynı hikâye farklı dönemde yeni bir siyasi veya dini anlam kazanabilir. Bu değişimleri izlemek, metnin ilk biçimini bulmaktan bazen daha öğreticidir; çünkü toplumların geçmişi nasıl yeniden kurduğunu gösterir."),
        h2("Anlatının farklı sürümleri neden önemlidir?"),
        p("Sözlü gelenekte sabit bir metin bulunmaz. Anlatıcı, dinleyici, coğrafya ve dönem değiştikçe ayrıntılar da değişir. Daha sonra yazıya geçirilen sürüm, o anda yaşayan geleneğin yalnızca bir kesitidir. Bu yüzden iki varyant arasındaki farkı 'hangisi doğru?' sorusuyla sınırlamak yerine, her sürümün hangi ihtiyaca cevap verdiğini araştırmak gerekir."),
        p("Adların yazımı ve çevirisi de anlamı etkileyebilir. Eski dillerdeki bir unvan modern dilde tanrı, ruh, kahraman veya hükümdar olarak farklı biçimlerde çevrilebilir. Tek bir kelimeye dayanarak geniş tarihsel sonuç çıkarmak bu nedenle risklidir. Filoloji, kelimenin aynı dildeki başka metinlerde nasıl kullanıldığını ve zaman içinde anlam değiştirip değiştirmediğini inceler."),
        h2("Semboller nasıl yorumlanmalı?"),
        p("Hayvanlar, gök cisimleri, dağlar, mağaralar, ağaçlar ve yeraltı dünyası birçok kültürde güçlü simgelerdir. Benzer sembollerin bulunması her zaman doğrudan kültürel aktarım anlamına gelmez; insanlar ortak çevresel deneyimlerden benzer imgeler üretebilir. Bağlantı kurmak için sembolün yalnızca görünüşü değil, anlatı içindeki işlevi ve tarihsel aktarım yolu da gösterilmelidir."),
        p("Mitolojik figürler tek bir karakter özelliğine indirgenmemelidir. Aynı varlık koruyucu ve tehlikeli, düzen kurucu ve yıkıcı ya da yaşam ile ölüm arasında aracı olabilir. Bu ikili yapı, eski toplumların dünyayı kesin karşıtlıklardan çok dengeler ve döngüler üzerinden anlamlandırdığını gösterebilir."),
        h2("Günümüzde neden yeniden ilgi görüyor?"),
        p("Mitler modern edebiyat, sinema, oyunlar ve sosyal medya aracılığıyla yeni bağlamlara taşınır. Bu uyarlamalar eski anlatıyı görünür kılar, fakat çoğu zaman farklı dönemleri ve kültürleri tek bir evrende birleştirir. Popüler sürümle tarihsel kaynağı ayırmak, hem yaratıcı yorumu hem de özgün geleneği daha doğru anlamayı sağlar."),
    ])
    parts.extend(common_source_section(topic, seed))
    parts.extend(faq(topic, "myth"))
    return f'<section class="odyomuh-editorial-expansion" data-editorial="{MARKER}">' + "\n".join(parts) + "</section>"


def generate_history(item: dict, topic: str, headings: list[str], seed: str) -> str:
    labels = list_text(item.get("labels", []), 6)
    parts = intro(item, topic, headings, seed, "history")
    parts.extend([
        h2("Olayı kendi döneminin koşullarında okumak"),
        p(f"{topic} konusu {labels} ile birlikte ele alındığında, kişilerin kararlarından daha geniş yapılar görünür hâle gelir. Devlet kurumları, ekonomik kaynaklar, haberleşme olanakları, toplumsal sınıflar ve dönemin değerleri aktörlerin seçeneklerini sınırlar. Tarihsel bağlam, yapılan bir tercihi otomatik olarak haklı çıkarmaz; fakat neden mümkün veya etkili olduğunu anlamayı sağlar."),
        p("Dönemin insanları gelecekte ne olacağını bilmiyordu. Bugün kaçınılmaz görünen bir sonuç, olay anında birçok olasılıktan yalnızca biri olabilir. Bu nedenle tarihi geriye doğru okurken 'zaten böyle olacaktı' düşüncesinden kaçınmak gerekir. Karar noktaları, başarısız girişimler ve gerçekleşmeyen seçenekler de sürecin parçasıdır."),
        h2("Aktörler ve kurumlar arasındaki ilişki"),
        p("Büyük tarihsel anlatılar çoğu zaman hükümdarlar, komutanlar, bilim insanları veya siyasi liderler üzerinden kurulur. Bireylerin rolü önemlidir; ancak kararların uygulanması kurumlar, uzmanlar, askerler, işçiler ve sıradan topluluklar sayesinde mümkün olur. Aynı kişinin başka bir kurumsal ortamda aynı sonucu üretip üretemeyeceği sorusu, birey ile yapı arasındaki ilişkiyi anlamaya yardımcı olur."),
        p("Toplumsal gruplar olaylardan aynı biçimde etkilenmez. Bir reform merkezî yönetimi güçlendirirken yerel seçkinlerin yetkisini azaltabilir; bir savaş bazı sektörleri büyütürken geniş halk kesimlerini yoksullaştırabilir. Bu nedenle 'ülke kazandı' veya 'toplum kaybetti' gibi genel ifadelerin hangi grup ve hangi zaman aralığı için geçerli olduğu açıklanmalıdır."),
        h2("Değişim ve süreklilik"),
        p("Tarih yalnızca dönüm noktalarından oluşmaz. Bir devrim, savaş, keşif veya teknik yenilik önemli bir eşik yaratabilir; fakat eski alışkanlıklar ve kurumlar yeni düzen içinde uzun süre yaşamaya devam edebilir. Değişim ile sürekliliği birlikte incelemek, olayların etkisini abartmadan veya küçümsemeden değerlendirmeyi sağlar."),
        p("Kısa vadede görülen sonuçlar ile uzun vadeli miras ayrılmalıdır. İlk yıllarda başarısız görünen bir düşünce daha sonra başka bir hareketi etkileyebilir. Tersine, büyük başarı olarak kutlanan bir karar uzun vadede beklenmeyen sorunlar doğurabilir. Tarihsel sonuç, sabit bir liste değil, farklı dönemlerde yeniden değerlendirilen bir ilişkiler ağıdır."),
        h2("Tarihsel anlatıda dilin etkisi"),
        p("Zafer, çöküş, altın çağ, karanlık dönem veya mucize gibi sözcükler güçlü bir yorum taşır. Bu ifadeler metni akıcı kılar; ancak hangi ölçüte göre kullanıldıkları açıklanmalıdır. Aynı dönem siyasi bakımdan istikrarsız, kültürel üretim açısından canlı olabilir. Tek bir etiket, farklı alanlardaki gelişmeleri görünmez kılabilir."),
        p("İyi bir tarih yazısı kesinlik ile ihtiyat arasında denge kurar. Temel olayları açık biçimde anlatır, tartışmalı noktaları saklamaz ve okuyucunun hangi sonucun belgeye, hangisinin yoruma dayandığını anlamasını sağlar. Böylece tarih ezberlenecek tarihler dizisi olmaktan çıkar ve kanıtlarla kurulan bir açıklama alanına dönüşür."),
    ])
    parts.extend(common_source_section(topic, seed))
    parts.extend(faq(topic, "history"))
    return f'<section class="odyomuh-editorial-expansion" data-editorial="{MARKER}">' + "\n".join(parts) + "</section>"


GENERATORS = {
    "today": generate_today,
    "lesson": generate_lesson,
    "claims": generate_claims,
    "archaeology": generate_archaeology,
    "myth": generate_myth,
    "history": generate_history,
}


def top_up(item: dict, current_html: str, topic: str, kind: str) -> str:
    """Add a concise topic-specific reading checklist if the article is still short."""
    if word_count(current_html) >= TARGET_WORDS:
        return current_html
    labels = list_text(item.get("labels", []), 8)
    addition = [
        h2("Okuma ve araştırma kontrol listesi"),
        p(f"{topic} hakkında yeni bir kaynakla karşılaştığınızda önce yazarın kim olduğunu, metnin ne zaman yayımlandığını ve hangi kanıtlara dayandığını kontrol edin. Ardından metinde geçen tarih, yer ve kişi adlarını bağımsız bir başvuru kaynağıyla karşılaştırın. {labels} gibi anahtar kavramların metinde açık biçimde tanımlanıp tanımlanmadığına bakın."),
        p("Kaynakta kullanılan görsellerin açıklamasını ve kökenini incelemek de önemlidir. Temsili çizimler, yeniden canlandırmalar ve sonradan renklendirilmiş görüntüler çoğu zaman özgün belge gibi paylaşılabilir. Bir görselin kazı fotoğrafı, müze kaydı, sanatçı yorumu veya dijital üretim olup olmadığı belirtilmelidir."),
        p("Son olarak, metnin cevapsız bıraktığı soruları not edin. Güvenilir içerik her boşluğu kesin bir iddiayla doldurmak zorunda değildir. Hangi bilgilerin eksik olduğunu göstermek, yeni araştırmaların neyi çözmesi gerektiğini de ortaya koyar. Bu yaklaşım hem merakı korur hem de doğrulanmamış yorumların gerçek bilgi gibi aktarılmasını önler."),
    ]
    return current_html + "\n" + f'<section class="odyomuh-editorial-topup" data-editorial="{MARKER}-topup">' + "\n".join(addition) + "</section>"


def personalize_duplicate_paragraphs(items: list[dict]) -> int:
    """Make shared methodological paragraphs explicitly relevant to each article."""
    paragraph_locations: dict[str, list[tuple[dict, str, str]]] = {}
    section_re = re.compile(
        rf'(<section class="odyomuh-editorial-expansion" data-editorial="{re.escape(MARKER)}">)(.*?)(</section>)',
        re.I | re.S,
    )
    p_re = re.compile(r"<p>(.*?)</p>", re.I | re.S)

    for item in items:
        if item.get("type") != "POST":
            continue
        content = item.get("contentHtml", "")
        match = section_re.search(content)
        if not match or 'data-personalized="v1"' in match.group(2):
            continue
        for p_match in p_re.finditer(match.group(2)):
            inner = p_match.group(1)
            normalized = " ".join(html.unescape(re.sub(r"<[^>]+>", " ", inner)).split())
            if len(normalized) < 120:
                continue
            paragraph_locations.setdefault(normalized, []).append((item, p_match.group(0), inner))

    duplicates = {text: locs for text, locs in paragraph_locations.items() if len(locs) > 1}
    touched = 0
    for _, locations in duplicates.items():
        for item, full_p, inner in locations:
            title = clean_topic(item.get("title", "bu konu"))
            kind = classify(item)
            suffixes = {
                "today": f" Bu ayrım, {title} dosyasındaki gelişmeleri aynı takvim gününde buluşan fakat farklı süreçlere ait olaylar olarak okumayı kolaylaştırır.",
                "lesson": f" Bu yöntem, {title} konusunda tanım, uygulama ve sonuç basamaklarının birbirine karıştırılmasını önlemeye yardımcı olur.",
                "claims": f" Bu ölçüt, {title} hakkındaki popüler anlatının hangi noktada kanıttan yoruma geçtiğini daha açık gösterir.",
                "archaeology": f" Bu yaklaşım, {title} için buluntu, bağlam ve yorum arasındaki sınırı daha dikkatli kurmayı sağlar.",
                "myth": f" Bu çerçeve, {title} anlatısının sembolik anlamı ile tarihsel veri olarak kullanılabilecek yönlerini birbirinden ayırır.",
                "history": f" Bu bakış, {title} konusundaki kişi, kurum ve uzun vadeli sonuç ilişkisini daha görünür hâle getirir.",
            }
            personalized = f'<p>{inner}<span data-personalized="v1">{html.escape(suffixes[kind])}</span></p>'
            item["contentHtml"] = item.get("contentHtml", "").replace(full_p, personalized, 1)
            touched += 1
    return touched


def main() -> None:
    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    rows: list[tuple[str, str, str, int, int]] = []
    changed = 0
    historical_before: dict[str, int] = {}
    if REPORT_FILE.exists():
        with REPORT_FILE.open(encoding="utf-8", newline="") as handle:
            for row in csv.DictReader(handle):
                try:
                    historical_before[row.get("id", "")] = int(row.get("before_words", ""))
                except (TypeError, ValueError):
                    pass

    for item in data["blog"]["items"]:
        if item.get("type") != "POST":
            continue
        current_before = word_count(item.get("contentHtml", ""))
        before = historical_before.get(item.get("id", ""), current_before)
        kind = classify(item)
        title = item.get("title", "Başlık")
        if current_before < 1000 and MARKER not in item.get("contentHtml", ""):
            topic = clean_topic(title)
            headings = extract_headings(item.get("contentHtml", ""))
            expansion = GENERATORS[kind](item, topic, headings, item.get("id", title))
            new_html = item.get("contentHtml", "").rstrip() + "\n" + expansion
            new_html = top_up(item, new_html, topic, kind)
            item["contentHtml"] = new_html
            changed += 1
        after = word_count(item.get("contentHtml", ""))
        rows.append((item.get("id", ""), title, kind, before, after))

    personalized = personalize_duplicate_paragraphs(data["blog"]["items"])
    before_by_id = {row[0]: row[3] for row in rows}
    rows = []
    for item in data["blog"]["items"]:
        if item.get("type") != "POST":
            continue
        count = word_count(item.get("contentHtml", ""))
        item_id = item.get("id", "")
        rows.append((item_id, item.get("title", ""), classify(item), before_by_id.get(item_id, count), count))

    DATA_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    REPORT_FILE.write_text(
        "id,title,type,before_words,after_words\n"
        + "\n".join(
            f'"{i.replace(chr(34), chr(34)*2)}","{t.replace(chr(34), chr(34)*2)}",{k},{b},{a}'
            for i, t, k, b, a in rows
        )
        + "\n",
        encoding="utf-8",
    )

    below = [(t, a) for _, t, _, _, a in rows if a < 1000]
    print(f"Expanded posts: {changed}")
    print(f"Personalized repeated paragraphs: {personalized}")
    print(f"Posts below 1000 words after expansion: {len(below)}")
    if below:
        for title, count in below:
            print(f"  {count}: {title}")
        raise SystemExit(1)


if __name__ == "__main__":
    main()

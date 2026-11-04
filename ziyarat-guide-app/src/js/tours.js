/* راهنمای زیارت — tours
   کادر لینک‌های تور مجازی و پانوراما.
   لینک بیرونی است؛ جاسازی نشده است، چون هیچ منبعی اجازهٔ صریح جاسازی نداده است.
   مرحله‌ای که تور معتبر ندارد، کادر نمی‌گیرد (صادقانه خالی می‌ماند). */
function toursHTML(s) {
  if (!s.tours || !VIRTUAL_TOURS[s.tours]) return "";
  let html = `<div class="box gold"><h3>۲. تورهای مجازی و پانوراما</h3><p class="small">لینک بیرونی؛ با لمس، مستقیم همان تور/پانوراما/تصویرها در مرورگر باز می‌شود:</p><ul>`;
  VIRTUAL_TOURS[s.tours].forEach(t => html += `<li><a class="external" href="${t.url}" target="_blank" rel="noopener">${t.title}<span class="ttype">${t.type || "تور"}</span></a></li>`);
  html += `</ul></div>`;
  return html;
}

/* کارت لینک گزارش‌های فیسبوکیِ همین مرحله/مکان (نشانی‌ها عیناً از مالک). */
function reportsHTML(s) {
  if (!s.reports || !s.reports.length) return "";
  let html = `<div class="box gold"><h3>۳. 📣 گزارش‌های سفر</h3><p class="small">لینک بیرونی؛ با لمس، در فیسبوک باز می‌شود:</p><ul>`;
  s.reports.forEach(r => html += `<li><a class="external" href="${r.url}" target="_blank" rel="noopener">${r.title}</a></li>`);
  html += `</ul></div>`;
  return html;
}

/* کارت لینک گزارش‌های سطح بخش (در نمای بخش، زیر فهرست مرحله‌ها). */
function sectionReportsHTML(key) {
  const list = (typeof SECTION_REPORTS !== "undefined" && SECTION_REPORTS[key]) || [];
  if (!list.length) return "";
  let html = `<div class="box gold"><h3>📣 گزارش‌های سفر</h3><p class="small">لینک بیرونی؛ با لمس، در فیسبوک باز می‌شود:</p><ul>`;
  list.forEach(r => html += `<li><a class="external" href="${r.url}" target="_blank" rel="noopener">${r.title}</a></li>`);
  html += `</ul></div>`;
  return html;
}

/* کارت لینک کتاب‌های گوگل درایوِ همین زیارت (لینک‌ها عیناً از خودِ درایو).
   بخش ایران کتاب اختصاصی ندارد؛ فقط لینک پوشهٔ منابع نشان داده می‌شود. */
function driveHTML(key) {
  const books = (typeof DRIVE_BOOKS !== "undefined" && DRIVE_BOOKS[key]) || [];
  let html = `<div class="box gold"><h3>📖 کتاب‌های این زیارت</h3><p class="small">باز کردن یا دانلود از گوگل درایو «راهنمای زیارت - منابع»:</p><ul>`;
  books.forEach(b => html += `<li>${b.title}<br><a class="external" href="${b.view}" target="_blank" rel="noopener">باز کردن کتاب</a><a class="external" href="${b.download}" target="_blank" rel="noopener">دانلود</a></li>`);
  if (typeof DRIVE_FOLDER !== "undefined") html += `<li><a class="external" href="${DRIVE_FOLDER}" target="_blank" rel="noopener">پوشهٔ کامل منابع در درایو</a></li>`;
  html += `</ul></div>`;
  return html;
}

/* ---------- پیوند از مرحلهٔ اپ به اینفوگرافیک نقشه‌ای ----------
   فاز ۲ پژوهش مکان‌ها (۳ نوامبر ۲۰۲۶، فقط ویرایش محلی، بدون انتشار):
   هر اینفوگرافیک `-infographic.html` از دست‌کم یک مرحلهٔ اپ قابل دسترسی است.
   مسیرها نسبی به چیدمان فضای کاری‌اند (پوشهٔ اپ و پوشهٔ
   ziyarat-infographics هم‌جوارند، مثل پیوند معکوس اینفوگرافیک‌ها به اپ
   با `../ziyarat-guide-app/index.html#بخش-مرحله`)؛ پیش از هر انتشار،
   بسته‌بندی انتشار باید پوشهٔ اینفوگرافیک‌ها را هم شامل شود یا مسیرها
   بازنویسی شوند — این پیوندها به‌تنهایی مجوز انتشار نیستند.
   خواندن آزاد است؛ این تابع فقط از openStep صدا زده می‌شود.
   مرحله‌های بدون اینفوگرافیک کادر نمی‌گیرند. */
const STEP_INFOGRAPHICS = {
  "atabat-1": [
    { file: "najaf-infographic.html", label: "نقشهٔ نجف اشرف" },
    { file: "wadi-salam-infographic.html", label: "وادی السلام — قبرستان نجف (پیوستهٔ نجف)" },
    { file: "hanana-infographic.html", label: "مسجد حنانه — نزدیک نجف، سمت کوفه" },
    { file: "kumayl-infographic.html", label: "آرامگاه کمیل — ثویه، نزدیک نجف" }
  ],
  "atabat-2": [
    { file: "kufa-infographic.html", label: "مسجد کوفه" },
    { file: "sahla-infographic.html", label: "مسجد سهله" },
    { file: "kufa-outside-infographic.html", label: "کوفه — بیرون مسجد (مسلم، هانی، میثم، دارالاماره)" },
    { file: "sasa-infographic.html", label: "مسجد صعصعه — شرق مسجد سهله" }
  ],
  "atabat-21": [{ file: "kazimayn-infographic.html", label: "نقشهٔ کاظمین" }],
  "atabat-22": [{ file: "samarra-infographic.html", label: "نقشهٔ سامرا" }],
  "iran-1": [{ file: "mashhad-infographic.html", label: "نقشهٔ مشهد — کارت ۱: حرم امام رضا (ع)" }],
  "iran-2": [{ file: "qom-infographic.html", label: "نقشهٔ قم — کارت ۱: حرم حضرت معصومه (س)" }],
  "umrah-2": [{ file: "madina-infographic.html", label: "نقشهٔ مدینه و بقیع" }],
  /* فاز ۱ب: مکان‌های مکه و مدینه — هر مرحله، کارت هم‌نام خودش را در
     اینفوگرافیک می‌گیرد؛ شمارهٔ کارت مدینه = شمارهٔ مرحلهٔ اپ + ۲
     (چون کارت‌های ۱ و ۲ اینفوگرافیک، مسجد النبی و بقیع‌اند و در
     umrah-2 هستند، نه در بخش مدینه). */
  /* بازسازی مکه (۴ نوامبر ۲۰۲۶): شمارهٔ مرحله‌های تازه با کارت‌های
     اینفوگرافیک هم‌خوان نیست؛ نگاشت زیر بر پایهٔ هم‌نام بودن کارت است:
     کعبه و حرم هر دو کارت ۱، خیف و منا هر دو کارت ۴ را می‌گیرند؛
     حجر، مقام، صفا و مروه، زمزم، حمزه و فخ کارتی ندارند و کادر نمی‌گیرند. */
  "makka-1": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۱: مسجدالحرام و کعبه (کعبه)" }],
  "makka-2": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۱: مسجدالحرام و کعبه (مسجدالحرام)" }],
  "makka-6": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۷: غار ثور" }],
  "makka-7": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۶: غار حرا" }],
  "makka-9": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۲: عرفات" }],
  "makka-10": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۳: مزدلفه" }],
  "makka-11": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۴: منا (مسجد خیف)" }],
  "makka-13": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۴: منا" }],
  "makka-14": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۹: شعب ابی طالب" }],
  "makka-15": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۵: قبرستان ابوطالب" }],
  "makka-17": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۸: محل ولادت پیامبر (ص)" }],
  "makka-18": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۱۰: مسجد تنعیم" }],
  "makka-19": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۱۱: مساجد مکه" }],
  "makka-20": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۱۲: جعرانه و حدیبیه" }],
  "makka-21": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۱۳: کوه ابوقبیس" }],
  "madina-1": [{ file: "madina-infographic.html", label: "نقشهٔ مدینه — کارت ۳: احد" }],
  "madina-2": [{ file: "madina-infographic.html", label: "نقشهٔ مدینه — کارت ۴: مسجد قبا" }],
  "madina-3": [{ file: "madina-infographic.html", label: "نقشهٔ مدینه — کارت ۵: مسجد قبلتین" }],
  "madina-4": [{ file: "madina-infographic.html", label: "نقشهٔ مدینه — کارت ۶: مساجد فتح" }],
  "madina-5": [{ file: "madina-infographic.html", label: "نقشهٔ مدینه — کارت ۷: مسجد غمامه" }],
  "madina-6": [{ file: "madina-infographic.html", label: "نقشهٔ مدینه — کارت ۸: مسجد مباهله" }],
  "madina-7": [{ file: "madina-infographic.html", label: "نقشهٔ مدینه — کارت ۹: مسجد فضیخ" }],
  "umrah-4": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۱: مسجدالحرام و کعبه (طواف)" }],
  "umrah-5": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۱: مسجدالحرام و کعبه (نماز طواف)" }],
  "umrah-6": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۱: مسجدالحرام و مسعی (سعی)" }],
  "umrah-8": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۱: مسجدالحرام و کعبه (طواف نساء)" }],
  "hajj-3": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۱: مسجدالحرام و کعبه (طواف)" }],
  "hajj-8": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۴: منا (ورود به منا)" }],
  "hajj-9": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۲: عرفات" }],
  "hajj-10": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۳: مزدلفه" }],
  "hajj-11": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۴: منا، جمرات سه‌گانه" }],
  "hajj-14": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۱: مسجدالحرام و کعبه (طواف افاضه)" }],
  "hajj-15": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۱: مسجدالحرام و کعبه (طواف نساء)" }],
  "hajj-16": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۴: منا، جمرات سه‌گانه (رمی)" }],
  "hajj-17": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۴: منا (شب‌مانی)" }],
  "hajj-18": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۴: منا، جمرات سه‌گانه (رمی دوباره)" }],
  "hajj-19": [{ file: "makka-infographic.html", label: "نقشهٔ مکه — کارت ۱: مسجدالحرام و کعبه (طواف وداع)" }]
};
/* S7 (۲۵ پیشنهاد): پیوند جلدِ اینفوگرافیک از جعبهٔ مرحله حذف شد و فقط
   پیوند متنیِ همان فایل ماند تا یک فایل، دو پیوند نداشته باشد. جلدهای
   تأییدشدهٔ صفحه‌های اینفوگرافیک، در خودِ پوشهٔ ziyarat-infographics
   سر جایشان‌اند و با یک کلمه برمی‌گردند. */
/* اینفوگرافیک تصویری هر مرحله برای کارت ۶ (خلاصهٔ مرحله) — ۴ نوامبر ۲۰۲۶،
   فقط محلی، بدون انتشار: کلید = همان stepKey خلاصه (مثل atabat-1)،
   مقدار = فایل تصویر در assets/infographics. هر مرحله فقط پس از تأیید
   سبک نمونهٔ نجف و با یک پرامپت کامل جداگانه ساخته و با چشم‌خوانی قبول
   می‌شود؛ مرحلهٔ بدون ورودی، همان خلاصهٔ متنی پیشین را نشان می‌دهد. */
const STEP_IMAGES = {
  "atabat-1": "assets/infographics/atabat-1.png",
  "atabat-2": "assets/infographics/atabat-2.png",
  "atabat-3": "assets/infographics/atabat-3.png",
  "atabat-4": "assets/infographics/atabat-4.png",
  "atabat-5": "assets/infographics/atabat-5.png",
  "atabat-6": "assets/infographics/atabat-6.png",
  "atabat-7": "assets/infographics/atabat-7.png",
  "atabat-8": "assets/infographics/atabat-8.png",
  "atabat-9": "assets/infographics/atabat-9.png",
  "atabat-10": "assets/infographics/atabat-10.png",
  "atabat-11": "assets/infographics/atabat-11.png",
  "atabat-12": "assets/infographics/atabat-12.png",
  "atabat-13": "assets/infographics/atabat-13.png"
};
/* تصاویر افزودهٔ کارت ۶ (پس از تصویر مرحله می‌آیند) — مثل اینفوگرافیک
   «آثار و برکات زیارت امام حسین (ع)» که مالک ۴ نوامبر فرستاد. */
const STEP_EXTRA_IMAGES = {
  "atabat-1": ["assets/ahlolbait-ali.jpg"],
  "atabat-2": ["assets/ahlolbait-koofeh.jpg", "assets/ahlolbait-sahleh.jpg"],
  "atabat-3": ["assets/ahlolbait-abbas.jpg"],
  "atabat-5": ["assets/hussain-ziyarat-blessings.jpg", "assets/ahlolbait-hossein.jpg"],
  "atabat-15": ["assets/maqam-imam-zaman-hawzah.jpg"],
  "atabat-16": ["assets/alqama-stream-hawzah.jpg"],
  "atabat-21": ["assets/ahlolbait-kazemaiyn.jpg"],
  "atabat-22": ["assets/ahlolbait-asqareiean.jpg"],
  "iran-1": ["assets/reza-ziyarat-blessings.jpg", "assets/reza-ziyarat-etiquettes.jpg"],
  "iran-2": ["assets/masoumeh-virtues-tebyan.jpg", "assets/masoumeh-greatness-tebyan.jpg"],
  "iran-4": ["assets/abdolazim-bio-tasnim.jpg", "assets/abdolazim-letter-ahlolbait.jpg", "assets/abdolazim-1000years-iqna.jpg"],
  "umrah-2": ["assets/nabawi-map.jpg", "assets/baghi-map.jpg"],
  "umrah-3": ["assets/muharramat-umrah.png"],
  "umrah-4": ["assets/kaaba-rukn-setareh.jpg", "assets/kaaba-parts-namasha.jpg", "assets/kiswa-colors-nourtv.webp", "assets/tawaf-dua-rahaye.jpg"],
  "hajj-3": ["assets/kaaba-rukn-setareh.jpg", "assets/kaaba-parts-namasha.jpg", "assets/kiswa-colors-nourtv.webp", "assets/tawaf-dua-rahaye.jpg"],
  "umrah-6": ["assets/sai-corridor-setareh.jpg", "assets/safa-hill-iqna.jpg", "assets/sai-crowd-iqna-1.jpg", "assets/sai-crowd-iqna-2.jpg"],
  "hajj-4": ["assets/sai-corridor-setareh.jpg", "assets/safa-hill-iqna.jpg", "assets/sai-crowd-iqna-1.jpg", "assets/sai-crowd-iqna-2.jpg"],
  "hajj-1": ["assets/hajj-checklist-ammar.png"],
  "madina-4": ["assets/banners/madina-khandaq.jpg"]
};
/* اعتبار تصاویر افزودهٔ کارت ۶ — کلید = همان مسیر تصویر. */
const STEP_EXTRA_CREDITS = {
  "assets/hussain-ziyarat-blessings.jpg": "منبع تصویر: خبرگزاری موج",
  "assets/reza-ziyarat-blessings.jpg": "منبع تصویر: تبیان",
  "assets/reza-ziyarat-etiquettes.jpg": "منبع تصویر: آستان قدس رضوی",
  "assets/abdolazim-1000years-iqna.jpg": "منبع تصویر: ایکنا",
  "assets/masoumeh-virtues-tebyan.jpg": "منبع تصویر: تبیان",
  "assets/masoumeh-greatness-tebyan.jpg": "منبع تصویر: تبیان",
  "assets/abdolazim-bio-tasnim.jpg": "منبع تصویر: خبرگزاری تسنیم",
  "assets/abdolazim-letter-ahlolbait.jpg": "منبع تصویر: مؤسسهٔ اهل‌البیت",
  "assets/nabawi-map.jpg": "منبع تصویر: محمدامین عابدینی",
  "assets/baghi-map.jpg": "منبع تصویر: حجج",
  "assets/muharramat-umrah.png": "اینفوگرافیک آموزشی عمار غزنه — منابع: مناسک آیت‌الله العظمی سیستانی و آیت‌الله العظمی فیاض",
  "assets/ahlolbait-ali.jpg": "منبع تصویر: مؤسسهٔ اهل‌البیت",
  "assets/ahlolbait-koofeh.jpg": "منبع تصویر: مؤسسهٔ اهل‌البیت",
  "assets/ahlolbait-sahleh.jpg": "منبع تصویر: مؤسسهٔ اهل‌البیت",
  "assets/ahlolbait-abbas.jpg": "منبع تصویر: مؤسسهٔ اهل‌البیت",
  "assets/ahlolbait-hossein.jpg": "منبع تصویر: مؤسسهٔ اهل‌البیت",
  "assets/ahlolbait-kazemaiyn.jpg": "منبع تصویر: مؤسسهٔ اهل‌البیت",
  "assets/ahlolbait-asqareiean.jpg": "منبع تصویر: مؤسسهٔ اهل‌البیت",
  "assets/kaaba-rukn-setareh.jpg": "منبع تصویر: مجلهٔ ستاره",
  "assets/kaaba-parts-namasha.jpg": "منبع تصویر: نماشا",
  "assets/kiswa-colors-nourtv.webp": "منبع تصویر: نور تی‌وی",
  "assets/tawaf-dua-rahaye.jpg": "منبع تصویر: راه‌آیه",
  "assets/sai-corridor-setareh.jpg": "منبع تصویر: مجلهٔ ستاره",
  "assets/safa-hill-iqna.jpg": "منبع تصویر: ایقنا (عکس: حسین حاجیلری)",
  "assets/sai-crowd-iqna-1.jpg": "منبع تصویر: ایقنا (عکس: حسین حاجیلری)",
  "assets/sai-crowd-iqna-2.jpg": "منبع تصویر: ایقنا (عکس: حسین حاجیلری)",
  "assets/hajj-13-setareh.jpg": "منبع تصویر: مجلهٔ ستاره",
  "assets/hajj-checklist-ammar.png": "اینفوگرافیک عمار غزنه",
  "assets/maqam-imam-zaman-hawzah.jpg": "منبع تصویر: خبرگزاری حوزه",
  "assets/alqama-stream-hawzah.jpg": "منبع تصویر: خبرگزاری حوزه",
  "assets/banners/madina-khandaq.jpg": "منبع تصویر: ویکی‌مدیا کامانز"
};
function infographicHTML(key, s) {
  let links = (typeof STEP_INFOGRAPHICS !== "undefined" && STEP_INFOGRAPHICS[key + "-" + s.id]) || [];
  /* کربلا: هر ۱۸ مرحلهٔ اپ (atabat 3 تا 20) همان یک اینفوگرافیک کربلا
     را می‌گیرد؛ شمارهٔ کارت در اینفوگرافیک = شمارهٔ مرحلهٔ اپ منهای ۲
     (عباسِ اپ ۳ = کارت ۱ اینفوگرافیک، …، طفلان مسلمِ اپ ۲۰ = کارت ۱۸). */
  if (key === "atabat" && s.id >= 3 && s.id <= 20) {
    links = [{ file: "karbala-infographic.html", label: "نقشهٔ کربلا — کارت " + (s.id - 2) + ": " + s.title }];
  }
  if (!links.length) return "";
  let html = `<div class="box gold"><h3>🗺 اینفوگرافیک نقشه‌ای این مکان</h3><p class="small">در برگهٔ تازه باز می‌شود؛ در اینفوگرافیک، کارت هم‌نام را بزن تا توضیح و استنادش باز شود:</p><ul>`;
  links.forEach(l => {
    let item = `<li>`;
    item += `<a class="external" href="../ziyarat-infographics/${l.file}" target="_blank" rel="noopener">${l.label}</a></li>`;
    html += item;
  });
  html += `</ul></div>`;
  return html;
}

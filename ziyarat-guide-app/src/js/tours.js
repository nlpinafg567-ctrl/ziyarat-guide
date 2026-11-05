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
  let html = `<div class="box gold"><h3>۳. 📣 گزارش کاروان‌های عمار غزنه</h3><p class="small">لینک بیرونی؛ با لمس، در فیسبوک باز می‌شود:</p><ul>`;
  s.reports.forEach(r => html += `<li><a class="external" href="${r.url}" target="_blank" rel="noopener">${r.title}</a></li>`);
  html += `</ul></div>`;
  return html;
}

/* کارت لینک گزارش‌های سطح بخش (در نمای بخش، زیر فهرست مرحله‌ها). */
function sectionReportsHTML(key) {
  const list = (typeof SECTION_REPORTS !== "undefined" && SECTION_REPORTS[key]) || [];
  if (!list.length) return "";
  let html = `<div class="box gold"><h3>📣 گزارش کاروان‌های عمار غزنه</h3><p class="small">لینک بیرونی؛ با لمس، در فیسبوک باز می‌شود:</p><ul>`;
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
  /* عکس‌های کارت ۶ عتبات — دستهٔ اول کامانز (P6، ۵ نوامبر ۲۰۲۶، چشم‌خوانی‌شده).
     1-3 و 5-2 در انتظار راستی‌آزمایی صفحهٔ فایل‌اند و هنوز ننشسته‌اند. */
  "atabat-1": ["assets/ahlolbait-ali.jpg", "assets/extra/atabat-1-1.jpg", "assets/extra/atabat-1-2.jpg", "assets/extra/atabat-1-3.jpg"],
  "atabat-2": ["assets/ahlolbait-koofeh.jpg", "assets/ahlolbait-sahleh.jpg", "assets/extra/atabat-2-1.jpg", "assets/extra/atabat-2-2.jpg", "assets/extra/atabat-2-3.jpg", "assets/extra/atabat-2-4.jpg"],
  "atabat-3": ["assets/ahlolbait-abbas.jpg", "assets/extra/atabat-3-1.jpg", "assets/extra/atabat-3-2.jpg", "assets/extra/atabat-3-3.jpg"],
  "atabat-4": ["assets/extra/atabat-4-1.jpg", "assets/extra/atabat-4-2.jpg", "assets/extra/atabat-4-3.jpg"],
  "atabat-5": ["assets/hussain-ziyarat-blessings.jpg", "assets/ahlolbait-hossein.jpg", "assets/extra/atabat-5-1.jpg", "assets/extra/atabat-5-3.jpg"],
  "atabat-9": ["assets/extra/atabat-9-1.jpg", "assets/extra/atabat-9-2.jpg"],
  "atabat-19": ["assets/extra/atabat-19-1.jpg", "assets/extra/atabat-19-2.jpg"],
  "atabat-15": ["assets/maqam-imam-zaman-hawzah.jpg"],
  "atabat-16": ["assets/alqama-stream-hawzah.jpg", "assets/extra/atabat-16-2.jpg", "assets/extra/atabat-16-3.jpg"],
  "atabat-21": ["assets/ahlolbait-kazemaiyn.jpg", "assets/extra/atabat-21-1.jpg", "assets/extra/atabat-21-2.jpg", "assets/extra/atabat-21-3.jpg"],
  "atabat-22": ["assets/ahlolbait-asqareiean.jpg", "assets/extra/atabat-22-1.jpg", "assets/extra/atabat-22-2.jpg", "assets/extra/atabat-22-3.jpg"],
  "iran-1": ["assets/reza-ziyarat-blessings.jpg", "assets/reza-ziyarat-etiquettes.jpg", "assets/extra/iran-1-3.jpg"],
  "iran-2": ["assets/masoumeh-virtues-tebyan.jpg", "assets/masoumeh-greatness-tebyan.jpg", "assets/extra/iran-2-3.jpg"],
  "iran-4": ["assets/abdolazim-bio-tasnim.jpg", "assets/abdolazim-letter-ahlolbait.jpg", "assets/abdolazim-1000years-iqna.jpg"],
  /* عکس‌های کارت ۶ ایران (P6، ۵ نوامبر ۲۰۲۶، چشم‌خوانی‌شده): iran-5-1
     (جمکران از راه دور) ضعیف بود و ننشست؛ عکس سوم جمکران = ذخیرهٔ
     شبستان داخل مسجد که با دستهٔ بعدی دانلود می‌شود. */
  "iran-3": ["assets/extra/iran-3-1.jpg", "assets/extra/iran-3-2.jpg", "assets/extra/iran-3-3.jpg"],
  "iran-5": ["assets/extra/iran-5-1.jpg", "assets/extra/iran-5-2.jpg", "assets/extra/iran-5-3.jpg"],
  "umrah-2": ["assets/nabawi-map.jpg", "assets/baghi-map.jpg", "assets/extra/umrah-2-1.jpg", "assets/extra/umrah-2-2.jpg", "assets/extra/umrah-2-3.jpg"],
  "umrah-3": ["assets/muharramat-umrah.png", "assets/extra/umrah-3-1.jpg", "assets/extra/umrah-3-2.jpg", "assets/extra/umrah-3-3.jpg"],
  "umrah-4": ["assets/kaaba-rukn-setareh.jpg", "assets/kaaba-parts-namasha.jpg", "assets/kiswa-colors-nourtv.webp", "assets/tawaf-dua-rahaye.jpg"],
  "hajj-3": ["assets/kaaba-rukn-setareh.jpg", "assets/kaaba-parts-namasha.jpg", "assets/kiswa-colors-nourtv.webp", "assets/tawaf-dua-rahaye.jpg"],
  "umrah-6": ["assets/sai-corridor-setareh.jpg", "assets/safa-hill-iqna.jpg", "assets/sai-crowd-iqna-1.jpg", "assets/sai-crowd-iqna-2.jpg"],
  /* عکس‌های کارت ۶ عمره (P6، ۵ نوامبر ۲۰۲۶، چشم‌خوانی‌شده). umrah-5 فقط ۲ عکس
     دارد (آنتارا دانلود نشد — مجوز آزاد ندارد؛ عکس سوم با عکس مالک یا اجازهٔ او).
     umrah-7 فقط ۱ عکس دارد (۲ عکس دیگر نیازمند عکس مالک). */
  "umrah-1": ["assets/extra/umrah-1-1.jpg", "assets/extra/umrah-1-2.jpg", "assets/extra/umrah-1-3.jpg"],
  "umrah-5": ["assets/extra/umrah-5-1.jpg", "assets/extra/umrah-5-2.jpg"],
  "umrah-7": ["assets/extra/umrah-7-1.jpg"],
  "umrah-8": ["assets/extra/umrah-8-1.jpg", "assets/extra/umrah-8-2.jpg", "assets/extra/umrah-8-3.jpg"],
  "hajj-4": ["assets/sai-corridor-setareh.jpg", "assets/safa-hill-iqna.jpg", "assets/sai-crowd-iqna-1.jpg", "assets/sai-crowd-iqna-2.jpg"],
  "hajj-1": ["assets/hajj-checklist-ammar.png"],
  /* عکس‌های کارت ۶ حج — دستهٔ دوم (P6، ۵ نوامبر ۲۰۲۶، چشم‌خوانی‌شده).
     hajj-12 فقط ۱ عکس دارد (۱۲-۱ و ۱۲-۳ رمی بودند، نه قربانی — قرنطینه در
     docs/photos-card6-eval/)؛ hajj-14-2 همان umrah-8-1 است؛ hajj-15 سوم
     پیدا نشد (Tawaf-ar.jpg نمودار بود، نه عکس). */
  /* عکس‌های کارت ۶ حج — دستهٔ اول (P6، ۵ نوامبر ۲۰۲۶، چشم‌خوانی‌شده).
     ۶-۱، ۷-۳ و ۱۰-۳ در فایل اصلی ۹۰ درجه چرخیده بودند و پیش از نشستن
     صاف شدند؛ ۶-۲ همان umrah-8-3 است؛ hajj-2 هیچ عکسی ندارد (هر سه
     پروندهٔ ذوالحلیفه در کامانز وجود ندارند) و نیازمند عکس مالک است. */
  "hajj-6": ["assets/extra/hajj-6-1.jpg", "assets/extra/umrah-8-3.jpg", "assets/extra/hajj-6-3.jpg"],
  "hajj-7": ["assets/extra/hajj-7-1.jpg", "assets/extra/hajj-7-3.jpg"],
  "hajj-8": ["assets/extra/hajj-8-1.jpg", "assets/extra/hajj-8-2.jpg", "assets/extra/hajj-8-3.jpg"],
  "hajj-9": ["assets/extra/hajj-9-1.jpg", "assets/extra/hajj-9-2.jpg", "assets/extra/hajj-9-3.jpg"],
  "hajj-10": ["assets/extra/hajj-10-1.jpg", "assets/extra/hajj-10-3.jpg", "assets/extra/hajj-10-4.jpg"],
  "hajj-11": ["assets/extra/hajj-11-1.jpg", "assets/extra/hajj-11-2.jpg", "assets/extra/hajj-11-3.jpg"],
  "hajj-12": ["assets/extra/hajj-12-2.jpg"],
  "hajj-14": ["assets/extra/hajj-14-1.jpg", "assets/extra/umrah-8-1.jpg", "assets/extra/hajj-14-3.jpg"],
  "hajj-15": ["assets/extra/hajj-15-1.jpg", "assets/extra/hajj-15-2.jpg"],
  "hajj-16": ["assets/extra/hajj-16-1.jpg", "assets/extra/hajj-16-2.jpg", "assets/extra/hajj-16-3.jpg"],
  "hajj-17": ["assets/extra/hajj-17-1.jpg", "assets/extra/hajj-17-2.jpg", "assets/extra/hajj-17-3.jpg"],
  "hajj-18": ["assets/extra/hajj-18-1.jpg", "assets/extra/hajj-18-2.jpg", "assets/extra/hajj-18-3.jpg"],
  "hajj-19": ["assets/extra/hajj-19-1.jpg", "assets/extra/hajj-19-2.jpg", "assets/extra/hajj-19-3.jpg"],
  "madina-4": ["assets/banners/madina-khandaq.jpg", "assets/extra/madina-4-1.jpg", "assets/extra/madina-4-2.jpg", "assets/extra/madina-4-3.jpg"],
  /* عکس‌های کارت ۶ مکه و مدینه — بنرهای چشم‌خوانی‌شده (P6، ۵ نوامبر ۲۰۲۶).
     بنر madina-saba زیر مدینه-۴ ننشست (تصمیم ۵، شمارهٔ ۳ — با مالک است)؛
     مدینه-۷ هیچ بنر/عکسی ندارد (نیازمند عکس مالک)؛ مکه-۱۲ و ۱۴ و ۲۱ بنر ندارند. */
  "makka-1": ["assets/banners/makka-kaaba.jpg", "assets/kaaba-rukn-setareh.jpg", "assets/extra/makka-1-3.jpg"],
  "makka-2": ["assets/banners/makka-haram.jpg", "assets/extra/makka-2-2.jpg", "assets/extra/makka-2-3.jpg"],
  "makka-3": ["assets/banners/makka-hijr.jpg", "assets/extra/makka-3-2.jpg"],
  "makka-4": ["assets/banners/makka-maqam.jpg", "assets/extra/makka-4-2.jpg"],
  "makka-5": ["assets/banners/makka-safa.jpg", "assets/sai-corridor-setareh.jpg", "assets/sai-crowd-iqna-1.jpg", "assets/extra/makka-5-3.jpg"],
  "makka-6": ["assets/banners/makka-thawr.jpg", "assets/extra/makka-6-2.jpg"],
  "makka-7": ["assets/banners/makka-hira.jpg", "assets/extra/makka-7-2.jpg", "assets/extra/makka-7-3.jpg"],
  "makka-8": ["assets/banners/makka-zamzam.jpg"],
  "makka-9": ["assets/banners/makka-arafat.jpg", "assets/extra/makka-9-2.jpg", "assets/extra/makka-9-3.jpg"],
  "makka-10": ["assets/banners/makka-muzdalifah.jpg", "assets/extra/makka-10-3.jpg"],
  "makka-11": ["assets/banners/makka-khayf.jpg", "assets/extra/makka-11-2.jpg"],
  /* عکس‌های کارت ۶ مکه — دستهٔ اول (مرحله‌های ۱ تا ۱۱، P6، ۵ نوامبر ۲۰۲۶، چشم‌خوانی‌شده). ۴-۲ نخست به‌سبب تعارض مجوز ننشست (صفحهٔ فایل CC BY-SA 3.0 می‌گوید ولی EXIF ‏«All Rights Reserved» است)؛ مالک ۱۲:۲۰ با همان CC BY-SA 3.0 نشستنش را تأیید کرد و نشست؛ ۶-۳ رد شد (دهانهٔ غار دیده نمی‌شود + مجوز نامشخص)؛ ۸-۳ رد شد (مجوز نامشخص — محتوایش سردر قدیمی چاه زمزم در نمایشگاه است)؛ ۱۰-۲ رد شد (برچسب اشتباه: خودِ توضیح پرونده می‌گوید عرفات است، نه مزدلفه)؛ ۸-۲ دانلود نشد (پرونده‌ای در کامانز نیست). */
  "makka-13": ["assets/banners/makka-mina.jpg", "assets/extra/makka-13-2.jpg", "assets/extra/makka-13-3.jpg"],
  "makka-15": ["assets/banners/makka-mualla.jpg", "assets/extra/makka-15-2.jpg", "assets/extra/makka-15-3.jpg"],
  "makka-16": ["assets/banners/makka-fakh.jpg"],
  "makka-17": ["assets/banners/makka-mawlid.jpg"],
  "makka-18": ["assets/banners/makka-tanim.jpg", "assets/extra/makka-18-2.jpg"],
  "makka-19": ["assets/banners/makka-jinn.jpg"],
  "makka-20": ["assets/banners/makka-jirana.jpg", "assets/extra/makka-20-2.jpg"],
  /* عکس‌های کارت ۶ مکه — دستهٔ دوم (مرحله‌های ۱۲ تا ۲۱، P6، ۵ نوامبر ۲۰۲۶، چشم‌خوانی‌شده). ۱۲-۱ رد شد (۳۰۰ پیکسل + مجوز CC BY-NC-SA ویکی حج)؛ ۱۴-۱ فقط بندانگشت ۲۰۰ پیکسلی دانلود شد (فایل اصلی QNL هنوز گرفته نشده)؛ ۱۶-۲ رد شد (CC BY-NC-SA + محتوای مبهم)؛ ۲۱-۱ رد شد (حرم و برج ساعت را نشان می‌دهد، نه خود کوه)؛ ۱۲-۲، ۱۶-۳، ۱۷-۲، ۱۹-۲ و ۲۰-۳ دانلود نشدند. */
  "makka-21": ["assets/extra/makka-21-2.jpg"],
  /* عکس‌های کارت ۶ مدینه (P6، ۵ نوامبر ۲۰۲۶، چشم‌خوانی‌شده). ۱-۲ رد شد
     (فقط نوشتهٔ «شهداء أحد»، عکس قبرستان نیست)؛ ۵-۲ مجوزش محفوظ است و
     ننشست؛ ۷-۱ تا ۷-۳ قدیمی و کم‌کیفیت با مجوز نامشخص‌اند و ننشستند
     (تصمیم مالک)؛ ۳-۲ دانلود نشد (کلادفلر استراکچره)؛ ۶-۱ و ۶-۲ نمای
     تاریخی پیش از تخریب مسجد الاجابه‌اند. */
  "madina-1": ["assets/banners/madina-uhud.jpg", "assets/extra/madina-1-1.jpg", "assets/extra/madina-1-3.jpg"],
  "madina-2": ["assets/banners/madina-quba.jpg", "assets/extra/madina-2-1.jpg", "assets/extra/madina-2-2.jpg", "assets/extra/madina-2-3.jpg"],
  "madina-3": ["assets/banners/madina-qiblatayn.jpg", "assets/extra/madina-3-1.jpg"],
  "madina-5": ["assets/banners/madina-ghamama.jpg", "assets/extra/madina-5-1.jpg"],
  "madina-6": ["assets/banners/madina-ijabah.jpg", "assets/extra/madina-6-1.jpg", "assets/extra/madina-6-2.jpg"],
  /* عکس‌های کارت ۶ سوریه (P6، ۵ نوامبر ۲۰۲۶، چشم‌خوانی‌شده): ۱-۱ رد شد
     (فقط نمای نزدیک زائران، بدون گنبد)؛ ۷-۱ و ۷-۲ (V&A) به‌علت حقوق
     ننشستند؛ ۷-۳ مجوزش در دست بررسی است. */
  "syria-1": ["assets/extra/syria-1-2.jpg", "assets/extra/syria-1-3.jpg", "assets/extra/syria-1-4.jpg"],
  "syria-2": ["assets/extra/syria-2-1.jpg", "assets/extra/syria-2-2.jpg", "assets/extra/syria-2-3.jpg"],
  "syria-3": ["assets/extra/syria-3-1.jpg", "assets/extra/syria-3-2.jpg", "assets/extra/syria-3-3.jpg"],
  "syria-4": ["assets/extra/syria-4-1.jpg", "assets/extra/syria-4-2.jpg", "assets/extra/syria-4-3.jpg"],
  "syria-5": ["assets/extra/syria-5-1.jpg", "assets/extra/syria-5-2.jpg", "assets/extra/syria-5-3.jpg"],
  "syria-6": ["assets/extra/syria-6-1.jpg", "assets/extra/syria-6-2.jpg", "assets/extra/syria-6-3.jpg"],
  "syria-7": ["assets/extra/syria-7-3.jpg"]
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
  "assets/extra/atabat-16-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: المصور حسين حيدر، CC BY 4.0)",
  "assets/extra/atabat-16-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: khosh1341، CC BY 3.0)",
  "assets/banners/madina-khandaq.jpg": "منبع تصویر: ویکی‌مدیا کامانز",
  "assets/banners/makka-kaaba.jpg": "منبع تصویر: ویکی‌مدیا کامانز",
  "assets/banners/makka-haram.jpg": "منبع تصویر: ویکی‌مدیا کامانز",
  "assets/banners/makka-hijr.jpg": "منبع تصویر: دانشنامهٔ اسلامی",
  "assets/banners/makka-maqam.jpg": "منبع تصویر: دانشنامهٔ اسلامی",
  "assets/banners/makka-safa.jpg": "منبع تصویر: ایقنا (عکس: حسین حاجیلری) — فقط تپهٔ صفا",
  "assets/banners/makka-thawr.jpg": "منبع تصویر: دانشنامهٔ اسلامی",
  "assets/banners/makka-hira.jpg": "منبع تصویر: دانشنامهٔ اسلامی",
  "assets/banners/makka-zamzam.jpg": "منبع تصویر: ویکی‌مدیا کامانز — بنای قدیمی زمزم، پیش از انتقال به زیرزمین",
  "assets/banners/makka-arafat.jpg": "منبع تصویر: دانشنامهٔ اسلامی",
  "assets/banners/makka-muzdalifah.jpg": "منبع تصویر: ویکی‌مدیا کامانز",
  "assets/banners/makka-khayf.jpg": "منبع تصویر: دانشنامهٔ اسلامی",
  "assets/banners/makka-mina.jpg": "منبع تصویر: ویکی‌مدیا کامانز",
  "assets/banners/makka-mualla.jpg": "منبع تصویر: ویکی‌مدیا کامانز",
  "assets/banners/makka-fakh.jpg": "منبع تصویر: دانشنامهٔ اسلامی — محوطهٔ منتسب؛ هیچ تابلو/نشانه‌ای در عکس نیست",
  "assets/banners/makka-mawlid.jpg": "منبع تصویر: ویکی‌مدیا کامانز",
  "assets/banners/makka-tanim.jpg": "منبع تصویر: ویکی‌مدیا کامانز",
  "assets/banners/makka-jinn.jpg": "منبع تصویر: ویکی‌مدیا کامانز — فقط مسجد جن از چهار مسجد مرحله",
  "assets/banners/makka-jirana.jpg": "منبع تصویر: ویکی‌مدیا کامانز — فقط جعرانه؛ حدیبیه در عکس نیست",
  "assets/banners/madina-uhud.jpg": "منبع تصویر: تابناک (عکس: حامد جعفرنژاد)",
  "assets/banners/madina-quba.jpg": "منبع تصویر: ویکی‌مدیا کامانز",
  "assets/banners/madina-qiblatayn.jpg": "منبع تصویر: تابناک (عکس: حامد جعفرنژاد)",
  "assets/banners/madina-ghamama.jpg": "منبع تصویر: ویکی‌مدیا کامانز",
  "assets/banners/madina-ijabah.jpg": "منبع تصویر: ویکی‌مدیا کامانز — مسجد الاجابه؛ تطبیق با مباهله با احتیاط",
  "assets/extra/madina-1-1.jpg": "پانورامای کوه احد و محوطهٔ شهدا؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Ahmed Abdulbasit، CC BY-SA 4.0)",
  "assets/extra/madina-1-3.jpg": "کوه احد و محوطهٔ زیارت؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Bintladen، CC BY-SA 4.0)",
  "assets/extra/madina-2-1.jpg": "مسجد قبا در شب؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Diego Delso, delso.photo, License CC BY-SA)",
  "assets/extra/madina-2-2.jpg": "مسجد قبا؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: beendiid C، CC BY 2.0)",
  "assets/extra/madina-2-3.jpg": "مسجد قبا؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Tevfik Teker، CC BY 3.0)",
  "assets/extra/madina-3-1.jpg": "مسجد قبلتین؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Aiman titi، CC BY-SA 3.0)",
  "assets/extra/madina-4-1.jpg": "مسجد سلمان فارسی در مجموعهٔ مساجد سبعه؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Richard Mortel، CC BY 2.0)",
  "assets/extra/madina-4-2.jpg": "مسجد علی بن ابی‌طالب (ع) در مجموعهٔ مساجد سبعه؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Richard Mortel، CC BY 2.0)",
  "assets/extra/madina-4-3.jpg": "جزئیات دیوار سنگ بازالتی و لوح مسجد ابوبکر در مجموعهٔ مساجد سبعه؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Richard Mortel، CC BY 2.0)",
  "assets/extra/madina-5-1.jpg": "مسجد غمامه در شب؛ منبع تصویر: وردپرس (عکس: Muhammad Hassan Tariq، CC0)",
  "assets/extra/madina-6-1.jpg": "مسجد الاجابه — نمای تاریخی، پیش از تخریب (۲۰۱۳)؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Imam Khairul Annas، CC BY-SA 3.0)",
  "assets/extra/madina-6-2.jpg": "مسجد الاجابه — نمای تاریخی، پیش از تخریب (۲۰۱۳)؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Imam Khairul Annas، CC BY-SA 3.0)",
  /* اعتبار عکس‌های مکه — دستهٔ دوم (مرحله‌های ۱۲ تا ۲۱، P6). */
  "assets/extra/makka-13-2.jpg": "رمی جمره؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Al Jazeera English، CC BY-SA 2.0)",
  "assets/extra/makka-13-3.jpg": "پل جمرات از بالا؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala / Al Jazeera English، CC BY-SA 2.0)",
  "assets/extra/makka-15-2.jpg": "قبر حضرت خدیجه (س) و فرزندشان قاسم در قبرستان معلاة؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Richard Mortel، CC BY 2.0)",
  "assets/extra/makka-15-3.jpg": "ورودی بخش قدیمی قبرستان معلاة؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Richard Mortel، CC BY 2.0)",
  "assets/extra/makka-18-2.jpg": "مسجد عایشه (تنعیم)؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Imam Khairul Annas، CC BY-SA 4.0)",
  "assets/extra/makka-20-2.jpg": "مسجد حدیبیه (شمیسی)؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: GusJuned، CC BY-SA 3.0)",
  "assets/extra/makka-21-2.jpg": "نمای تاریخی حرم و دامنهٔ جبل ابوقبیس، حدود ۱۹۰۷؛ منبع تصویر: کتابخانهٔ دیجیتال قطر (عکس: H. A. Mirza & Sons، مالکیت عمومی)",
  /* اعتبار عکس‌های مکه — دستهٔ اول (مرحله‌های ۱ تا ۱۱، P6). عکاس ۶-۲ طبق صفحهٔ فایل Abdul Razzaq است (نه Abdelrhman 1990 که justumrah گفته بود). */
  "assets/extra/makka-4-2.jpg": "مقام ابراهیم در محفظهٔ طلایی؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Moataz Tawfek Egbaria، CC BY-SA 3.0)",
  "assets/extra/makka-1-3.jpg": "حجرالاسود؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Amerrycan Muslim، CC BY-SA 3.0)",
  "assets/extra/makka-2-2.jpg": "زائر در حال دعا در مسجدالحرام؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Ali Mansuri، CC BY-SA 2.5)",
  "assets/extra/makka-2-3.jpg": "مسجدالحرام از بالا؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Saudipics.com، CC BY-SA 4.0)",
  "assets/extra/makka-3-2.jpg": "حجر اسماعیل در کنار کعبه؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Al Jazeera English، CC BY-SA 2.0)",
  "assets/extra/makka-5-3.jpg": "تپهٔ مروه با تابلوی «المروة»؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Aiman titi، CC BY-SA 3.0)",
  "assets/extra/makka-6-2.jpg": "کوه ثور؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Abdul Razzaq، CC BY-SA 3.0)",
  "assets/extra/makka-7-2.jpg": "قلهٔ جبل النور؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Richard Mortel، CC BY 2.0)",
  "assets/extra/makka-7-3.jpg": "مکه از فراز جبل النور؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Adiput، مالکیت عمومی)",
  "assets/extra/makka-9-2.jpg": "مسجد نمره در عرفات؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Ilhamnobi، CC BY-SA 4.0)",
  "assets/extra/makka-9-3.jpg": "جمعیت دشت عرفات؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala / Al Jazeera English، CC BY-SA 2.0)",
  "assets/extra/makka-10-3.jpg": "شب‌مانی در مزدلفه؛ منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala / Al Jazeera English، CC BY-SA 2.0)",
  "assets/extra/makka-11-2.jpg": "مسجد خیف و منا، نمای تاریخی ۱۹۰۷؛ منبع تصویر: کتابخانهٔ دیجیتال قطر (عکس: H. A. Mirza & Sons، مالکیت عمومی)",
  /* اعتبار عکس‌های سوریه (P6) — برچسب صادقانه در همان سطر اعتبار است. */
  "assets/extra/syria-1-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: امیر حسامی‌نژاد / تسنیم)",
  "assets/extra/syria-1-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Aziz1005، مالکیت عمومی)",
  "assets/extra/syria-2-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Bernard Gagnon)",
  "assets/extra/syria-2-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Dosseman)",
  "assets/extra/syria-2-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Dosseman)",
  "assets/extra/syria-3-1.jpg": "مقام منسوب به رأس الحسین (ع) — منبع تصویر: ویکی‌مدیا کامانز (عکس: Toushiro، مالکیت عمومی)",
  "assets/extra/syria-3-2.jpg": "مقام منسوب به رأس الحسین (ع) — منبع تصویر: ویکی‌مدیا کامانز (عکس: Md iet)",
  "assets/extra/syria-3-3.jpg": "نمای عمومی مسجد اموی — منبع تصویر: ویکی‌مدیا کامانز (عکس: Vyacheslav Argenberg)",
  "assets/extra/syria-4-1.jpg": "نمای عمومی مسجد اموی — منبع تصویر: ویکی‌مدیا کامانز (عکس: Vyacheslav Argenberg)",
  "assets/extra/syria-4-2.jpg": "نمای عمومی مسجد اموی — منبع تصویر: ویکی‌مدیا کامانز (عکس: Vyacheslav Argenberg)",
  "assets/extra/syria-4-3.jpg": "نمای عمومی مسجد اموی — منبع تصویر: ویکی‌مدیا کامانز (عکس: Dosseman)",
  "assets/extra/syria-5-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Toushiro، مالکیت عمومی)",
  "assets/extra/syria-5-2.jpg": "حکاکی تاریخی، ۱۸۸۱ — کتاب Picturesque Palestine (مالکیت عمومی)",
  "assets/extra/syria-5-3.jpg": "مقام منسوب به عبدالملک بن مروان — منبع تصویر: ویکی‌مدیا کامانز (عکس: Andalusi97)",
  "assets/extra/syria-6-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Toushiro، مالکیت عمومی)",
  "assets/extra/syria-6-2.jpg": "سنگ منسوب به خون سر امام حسین (ع) — منبع تصویر: ویکی‌مدیا کامانز (عکس: Toushiro، مالکیت عمومی)",
  "assets/extra/syria-6-3.jpg": "لوح تاریخ مشهد — منبع تصویر: ویکی‌مدیا کامانز (عکس: Toushiro، مالکیت عمومی)",
  "assets/extra/syria-7-3.jpg": "منبع تصویر: Syria Photo Guide (عکس: Daniel Demeter) — مجوز در دست بررسی",
  /* اعتبار عکس‌های ایران (P6). */
  "assets/extra/iran-1-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: IA)",
  "assets/extra/iran-2-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: مصطفی معراجی)",
  "assets/extra/iran-3-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Herbert karim masihi)",
  "assets/extra/iran-3-2.jpg": "منبع تصویر: مهرنیوز (عکس: امین فائزی)",
  "assets/extra/iran-3-3.jpg": "منبع تصویر: مهرنیوز (عکس: امین فائزی)",
  "assets/extra/iran-5-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: محمد مهدی کریم)",
  "assets/extra/iran-5-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Saff V.)",
  "assets/extra/syria-1-4.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: شهاب‌الدین واجدی)",
  /* اعتبار عکس‌های عمره و شبستان جمکران (P6). عکاس ۱-۱ و ۱-۲ Omar Chatriwala است
     (نه Fadi El Benni که گزارش پژوهش گفته بود) و عکاس ۲-۳ Saleh Al Hussain است
     (Cergun62 بارگذار است)؛ ۸-۲ فقط GFDL 1.2 دارد. */
  "assets/extra/umrah-1-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala) — عکس موضوعی",
  "assets/extra/umrah-1-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala) — عکس موضوعی",
  "assets/extra/umrah-1-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Karim Manji) — عکس موضوعی (عرفه، لباس احرام)",
  "assets/extra/umrah-2-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Muhammad Mahdi Karim/www.micro2macro.net)",
  "assets/extra/umrah-2-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Muhammad Mahdi Karim/www.micro2macro.net)",
  "assets/extra/umrah-2-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Saleh Al Hussain)",
  "assets/extra/umrah-3-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Imam Khairul Annas)",
  "assets/extra/umrah-3-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Imam Khairul Annas)",
  "assets/extra/umrah-3-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Ayman Zaid)",
  "assets/extra/umrah-5-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: معتز توفیق اغباریه)",
  "assets/extra/umrah-5-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Islam90)",
  "assets/extra/umrah-7-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Fadi El Benni) — عکس موضوعی",
  "assets/extra/umrah-8-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Adli Wahid)",
  "assets/extra/umrah-8-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: محمد مهدی کریم)",
  "assets/extra/umrah-8-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Basheer Olakara)",
  "assets/extra/iran-5-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Mostafa Meraji)",
  /* اعتبار عکس‌های حج — دستهٔ دوم (P6). ۱۴-۳ عکس خبرگزاری فارس است (CC BY 4.0
     در کامانز) و واترمارک کوچک «FARS Hossein Velayati» در گوشهٔ پایین‌چپ خودِ
     عکس هست؛ ۱۴-۱ عکاس Omar Chatriwala است (نه Fadi El Benni). */
  "assets/extra/hajj-12-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Guilhem Vellut) — عکس موضوعی (قربانی عید در لاهور)",
  "assets/extra/hajj-14-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala)",
  "assets/extra/hajj-14-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: محمدحسین ولایتی)",
  "assets/extra/hajj-15-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala)",
  "assets/extra/hajj-15-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Mervat Salman)",
  "assets/extra/hajj-16-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala)",
  "assets/extra/hajj-16-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Aiman titi)",
  "assets/extra/hajj-16-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Aiman titi)",
  "assets/extra/hajj-17-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala)",
  "assets/extra/hajj-17-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Fadi El Benni)",
  "assets/extra/hajj-17-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala)",
  "assets/extra/hajj-18-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Fadi El Benni)",
  "assets/extra/hajj-18-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Fadi El Benni)",
  "assets/extra/hajj-18-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Fadi El Benni)",
  "assets/extra/hajj-19-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala)",
  "assets/extra/hajj-19-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Fadi El Benni)",
  "assets/extra/hajj-19-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: محمد شراونة) — عکس موضوعی (کعبه در شب)",
  /* اعتبار عکس‌های حج — دستهٔ اول (P6). ۱۰-۳ با وجود عنوان پرونده‌اش («خوابیدن
     زیر آسمان باز») در واقع جمع سنگریزه در شب مزدلفه را نشان می‌دهد و همان
     عملِ شب مزدلفه است؛ ۱۱-۱ کم‌وضوح است (۶۴۰×۳۶۰). */
  "assets/extra/hajj-6-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: محمد شراونة)",
  "assets/extra/hajj-6-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala)",
  "assets/extra/hajj-7-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Benjamin Richter)",
  "assets/extra/hajj-7-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: محمد شراونة)",
  "assets/extra/hajj-8-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Aiman titi)",
  "assets/extra/hajj-8-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala)",
  "assets/extra/hajj-8-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala)",
  "assets/extra/hajj-9-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala)",
  "assets/extra/hajj-9-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Fadi El Benni)",
  "assets/extra/hajj-9-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Arisdp)",
  "assets/extra/hajj-10-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Arisdp)",
  "assets/extra/hajj-10-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Fadi El Benni)",
  "assets/extra/hajj-10-4.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Fadi El Benni)",
  "assets/extra/hajj-11-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Zahed)",
  "assets/extra/hajj-11-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala)",
  "assets/extra/hajj-11-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Omar Chatriwala)",
  /* اعتبار عکس‌های عتبات — دستهٔ اول کامانز (P6). 3-1 فریم ویدئوی یوتیوب است؛
     9-1 و 9-2 کم‌وضوح‌اند؛ 21-1 فقط GFDL 1.2 دارد (نه CC)؛ 21-2 تاریخی است
     (۲۰۰۸، گنبدها در دست تعمیر)؛ 22-3 جزئیات شبکهٔ ضریح است. */
  "assets/extra/atabat-1-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Toushiro)",
  "assets/extra/atabat-1-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Safa Daneshvar)",
  "assets/extra/atabat-1-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Bmwz3hm)",
  "assets/extra/atabat-2-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Zygoptera)",
  "assets/extra/atabat-2-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Zygoptera)",
  "assets/extra/atabat-2-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Narjes Ahmed)",
  "assets/extra/atabat-2-4.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: ن.عامری)",
  "assets/extra/atabat-3-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (فریم ویدئوی یوتیوب: دفتر رسانه‌ای نخست‌وزیر عراق)",
  "assets/extra/atabat-3-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: BlueSky Tr)",
  "assets/extra/atabat-3-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Mohammed Harith Khalil) — به تأیید مالک: ایوان حرم حضرت عباس (ع) با مشک آویخته (صفحهٔ فایل آن را «ضریح امام حسین» خوانده است)",
  "assets/extra/atabat-4-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: BlueSky Tr)",
  "assets/extra/atabat-4-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Alireza Vasigh Ansari، خبرگزاری تسنیم)",
  "assets/extra/atabat-4-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Almas Asad)",
  "assets/extra/atabat-5-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: حمید وکیلی، خبرگزاری مهر)",
  "assets/extra/atabat-5-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Karbobala Photos)",
  "assets/extra/atabat-9-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Abbascon)",
  "assets/extra/atabat-9-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Abbascon)",
  "assets/extra/atabat-19-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: ن.عامری)",
  "assets/extra/atabat-19-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: ن.عامری)",
  "assets/extra/atabat-21-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Muhammad Mahdi Karim)",
  "assets/extra/atabat-21-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Toushiro) — نمای تاریخی (۲۰۰۸؛ گنبدها در دست تعمیر)",
  "assets/extra/atabat-21-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Jafaralshamma)",
  "assets/extra/atabat-22-1.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Amir Hesaminejad، خبرگزاری تسنیم)",
  "assets/extra/atabat-22-2.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Amir Hesaminejad، خبرگزاری تسنیم)",
  "assets/extra/atabat-22-3.jpg": "منبع تصویر: ویکی‌مدیا کامانز (عکس: Amir Hesaminejad، خبرگزاری تسنیم) — جزئیات شبکهٔ ضریح"
};
function infographicHTML(key, s) {
  let links = (typeof STEP_INFOGRAPHICS !== "undefined" && STEP_INFOGRAPHICS[key + "-" + s.id]) || [];
  /* کربلا: هر ۱۸ مرحلهٔ قدیمی اپ (atabat 3 تا 20) همان یک اینفوگرافیک کربلا
     را می‌گیرد؛ شمارهٔ کارت در اینفوگرافیک = شمارهٔ مرحلهٔ اپ منهای ۲
     (عباسِ اپ ۳ = کارت ۱ اینفوگرافیک، …، طفلان مسلمِ اپ ۲۰ = کارت ۱۸)؛ موزهٔ ۲۴ اینفوگرافیک نقشه‌ای ندارد و از این نگاشت بیرون است. */
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

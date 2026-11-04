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

/* پیوندهای بیشترِ همین بخش (دستور مالک ۴ نوامبر: لینک‌های فرستاده‌شده
   در مسیر اصلی خودشان به‌عنوان لینک می‌آیند؛ این‌جا فقط لینک است،
   نه تبلیغ و نه شمارهٔ تماس آن شرکت‌ها). */
const SECTION_LINKS = {
  atabat: [
    { title: "تور گردشگری جاذبه‌های تاریخی کربلا (مقالهٔ گروه زیارتی مدائن)", url: "https://share.google/hvKgOl1EsxsOqjCrj", type: "مقاله" },
    { title: "اماکن زیارتی شهرهای عراق (پست اینستاگرام)", url: "https://www.instagram.com/p/DaGP6u2CspP", type: "اینستاگرام" },
    { title: "اماکن زیارتی شهرهای عراق — کربلا، کاظمین، بغداد و حله (پست اینستاگرام)", url: "https://www.instagram.com/p/DaLNiEcj5V4", type: "اینستاگرام" },
    { title: "۱۸ مکان زیارتی نجف با جزئیات و نقشه (ویکی پرواز)", url: "https://share.google/qVFVrATXZYPghfZCM", type: "مقاله" }
  ],
  umrah: [
    { title: "زیارت مجازی قبرستان بقیع (پانورامای ۳۶۰)", url: "https://gahar.ir/%d8%b2%db%8c%d8%a7%d8%b1%d8%aa-%d9%85%d8%ac%d8%a7%d8%b2%db%8c-%d9%82%d8%a8%d8%b1%d8%b3%d8%aa%d8%a7%d9%86-%d8%a8%d9%82%db%8c%d8%b9/", type: "مقاله" }
  ]
};
function sectionLinksHTML(key) {
  const list = (typeof SECTION_LINKS !== "undefined" && SECTION_LINKS[key]) || [];
  if (!list.length) return "";
  let html = `<div class="box gold"><h3>🔗 پیوندهای بیشتر</h3><p class="small">لینک بیرونی؛ با لمس، در مرورگر باز می‌شود:</p><ul>`;
  list.forEach(l => html += `<li><a class="external" href="${l.url}" target="_blank" rel="noopener">${l.title}<span class="ttype">${l.type || "پیوند"}</span></a></li>`);
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
/* جلد عکس‌مرجع هر اینفوگرافیک (۴ نوامبر ۲۰۲۶، فقط ویرایش محلی، بدون انتشار):
   کلید = نام فایل اینفوگرافیک، مقدار = نام فایل جلد در پوشهٔ هم‌جوار
   ziyarat-infographics. هر ۱۵ جلد با چشم‌خوانی قبول شده‌اند؛ فقط یک مورد
   جلد ندارد و عمداً بدون تصویر می‌ماند تا شکاف دیده شود: کوفه-بیرون مسجد
   (جلد جداگانه‌ای برایش ساخته نشده). صافی صفا جلد جداگانه دارد
   (safi-safa-photo-3d.png) ولی هنوز صفحهٔ اینفوگرافیک جداگانه ندارد
   (تصمیم باز مالک)؛ پس در این نگاشت نیست. مجموعهٔ چهارتایی حنانه/کمیل/
   صعصعه/صافی صفا در بستهٔ تحویل کنار هم آمده است. */
const INFOGRAPHIC_COVERS = {
  "najaf-infographic.html": "najaf-photo-3d.png",
  "wadi-salam-infographic.html": "wadi-salam-photo-3d.png",
  "hanana-infographic.html": "hanana-photo-3d.png",
  "kumayl-infographic.html": "kumayl-photo-3d.png",
  "kufa-infographic.html": "kufa-photo-3d.png",
  "sahla-infographic.html": "sahla-photo-3d.png",
  "sasa-infographic.html": "sasa-photo-3d.png",
  "kazimayn-infographic.html": "kazimayn-photo-3d.png",
  "samarra-infographic.html": "samarra-photo-3d.png",
  "mashhad-infographic.html": "mashhad-photo-3d.png",
  "qom-infographic.html": "qom-photo-3d.png",
  "madina-infographic.html": "madina-photo-3d.png",
  "makka-infographic.html": "makka-photo-3d.png",
  "karbala-infographic.html": "karbala-photo-3d.png"
};
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
  "atabat-21": ["assets/ahlolbait-kazemaiyn.jpg"],
  "atabat-22": ["assets/ahlolbait-asqareiean.jpg"],
  "iran-1": ["assets/reza-ziyarat-blessings.jpg", "assets/reza-ziyarat-etiquettes.jpg"],
  "iran-2": ["assets/masoumeh-virtues-tebyan.jpg", "assets/masoumeh-greatness-tebyan.jpg"],
  "iran-4": ["assets/abdolazim-bio-tasnim.jpg", "assets/abdolazim-letter-ahlolbait.jpg", "assets/abdolazim-1000years-iqna.jpg"],
  "umrah-2": ["assets/nabawi-map.jpg", "assets/baghi-map.jpg"],
  "umrah-3": ["assets/muharramat-umrah.png"]
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
  "assets/ahlolbait-asqareiean.jpg": "منبع تصویر: مؤسسهٔ اهل‌البیت"
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
    const cover = (typeof INFOGRAPHIC_COVERS !== "undefined" && INFOGRAPHIC_COVERS[l.file]) || "";
    let item = `<li>`;
    if (cover) item += `<a class="infocover" href="../ziyarat-infographics/${l.file}" target="_blank" rel="noopener"><img src="../ziyarat-infographics/${cover}" alt="جلد ${l.label}" loading="lazy"></a>`;
    item += `<a class="external" href="../ziyarat-infographics/${l.file}" target="_blank" rel="noopener">${l.label} ↗</a></li>`;
    html += item;
  });
  html += `</ul></div>`;
  return html;
}

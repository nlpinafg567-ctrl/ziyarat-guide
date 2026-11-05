/* راهنمای زیارت — بنرهای عکسی (مورد ۲۲، ۴ نوامبر ۲۰۲۶)
   عکس واقعی هر مقام از ویکی‌مدیا کامانز (مجوز آزاد، ذکر منبع در
   سند منابع بنرها)؛ فایل‌ها در assets/banners/ و در
   کش سرویس‌ورکر (zg-v4) هستند. نمایش یکدست: نسبت ۱۶:۹ با برش cover.
   کلید مرحله "بخش-id" → نام فایل بنر (بدون مسیر و پسوند).
   لایه‌بندی صداقت: «دقیق» = عکس همان مقام؛ «نمایندهٔ زیارت» = عکس
   شاخص همان سفر برای مرحله‌هایی که عکس مستقلِ راستی‌آزمایی‌شده
   ندارند (کعبه برای آماده‌سازی/میقاتِ مکه‌محور و مزدلفه؛ حرم حسین
   برای مقام‌های کربلا). atabat-23 (سید محمد، بلد) در دور دوم
   zg-v7 عکس تاریخی آرامگاه بلد را گرفت (عنوان فایل و رکورد
   اسمیتسونیان آن را بلد می‌دانند؛ رده‌های کامنز به‌اشتباه به حرم
   عسکری هم اشاره می‌کنند و این نکته در سند بنرها ثبت شده است).
   umrah-2: بنر nabawi می‌ماند؛ عکس گنبد سبز خبرگزاری حوزه (۳۲۰ پیکسل)
   به‌علت وضوح پایین و نبود دانلود و چشم‌خوانی، نامزد استفاده‌نشده
   است و جایگزین نمی‌شود (تفویض ۴ نوامبر ۲۰۲۶). */
const BANNERS = {
  "umrah-1": "kaaba", "umrah-2": "nabawi", "umrah-3": "miqat",
  "umrah-4": "kaaba", "umrah-5": "kaaba", "umrah-6": "kaaba",
  "umrah-7": "kaaba", "umrah-8": "kaaba",
  "hajj-1": "kaaba", "hajj-2": "miqat", "hajj-3": "kaaba", "hajj-4": "kaaba",
  "hajj-5": "kaaba", "hajj-6": "kaaba", "hajj-7": "kaaba", "hajj-8": "mina",
  "hajj-9": "arafat", "hajj-10": "kaaba", "hajj-11": "mina", "hajj-12": "mina",
  "hajj-13": "mina", "hajj-14": "kaaba", "hajj-15": "kaaba", "hajj-16": "mina",
  "hajj-17": "mina", "hajj-18": "mina", "hajj-19": "kaaba",
  "atabat-1": "ali", "atabat-2": "kufa", "atabat-3": "abbas",
  "atabat-4": "husayn", "atabat-5": "husayn", "atabat-6": "husayn",
  "atabat-7": "husayn", "atabat-8": "husayn", "atabat-9": "husayn",
  "atabat-10": "husayn", "atabat-11": "husayn", "atabat-12": "husayn",
  "atabat-13": "husayn", "atabat-14": "husayn", "atabat-15": "husayn",
  "atabat-16": "husayn", "atabat-17": "husayn", "atabat-18": "husayn",
  "atabat-19": "husayn", "atabat-20": "husayn",
  "atabat-21": "kazimayn", "atabat-22": "askari",
  "iran-1": "reza", "iran-2": "masumeh", "iran-3": "shahcheragh",
  "iran-4": "abdolazim", "iran-5": "jamkaran",
  /* بنرهای مکه و مدینه (zg-v7، ۴ نوامبر ۲۰۲۶، چشم‌خوانی‌شده):
     makka-5 از همان عکس تپهٔ صفای موجود اپ است؛ madina-6 عکس
     ساختمان مسجد الاجابه است (تطبیق با مباهله، احتیاط باز C7) و
     نام فایل هم «ijabah» است نه «mubahala» تا هویتی ادعا نشود.
     دور دوم zg-v7: makka-1 کعبهٔ واقعی، makka-2 پانورامای حرم
     (برش ۱۶:۹ از مرکز برای حذف دستِ لبهٔ راست)، makka-8 زمزم،
     makka-10 مسجد مشعرالحرام در مزدلفه، atabat-23 آرامگاه بلد. */
  "makka-1": "makka-kaaba", "makka-2": "makka-haram",
  "makka-3": "makka-hijr", "makka-4": "makka-maqam",
  "makka-5": "makka-safa", "makka-6": "makka-thawr",
  "makka-7": "makka-hira", "makka-8": "makka-zamzam",
  "makka-9": "makka-arafat", "makka-10": "makka-muzdalifah",
  "makka-11": "makka-khayf", "makka-13": "makka-mina",
  "makka-15": "makka-mualla", "makka-16": "makka-fakh",
  "makka-17": "makka-mawlid", "makka-18": "makka-tanim",
  "makka-19": "makka-jinn", "makka-20": "makka-jirana",
  "madina-1": "madina-uhud", "madina-2": "madina-quba",
  "madina-3": "madina-qiblatayn", "madina-4": "madina-saba",
  "madina-5": "madina-ghamama", "madina-6": "madina-ijabah",
  "atabat-23": "atabat-balad",
  /* بنرهای سوریه (P6، ۵ نوامبر ۲۰۲۶، چشم‌خوانی‌شده): بنر هر مرحله =
     نامزد ۱ همان مرحله، جز ۱ که نامزد ۱ رد شد (بنر = ۱-۲) و ۷ که
     بنر = ۷-۳ است (۷-۱ و ۷-۲ V&A، حقوق نامشخص). */
  "syria-1": "syria-1", "syria-2": "syria-2", "syria-3": "syria-3",
  "syria-4": "syria-4", "syria-5": "syria-5", "syria-6": "syria-6",
  "syria-7": "syria-7"
};
/* اعتبار زیر هر بنر مرحله (zg-v7): چون بنرهای تازه همه از کامانز
   نیستند، اعتبار سخت‌کدشدهٔ «ویکی‌مدیا کامانز» در رندر با این نگاشت
   جایگزین می‌شود؛ کلیدِ بی‌نگاشت همان «عکس: ویکی‌مدیا کامانز» می‌ماند. */
const BANNER_CREDITS = {
  "makka-1": "عکس: ویکی‌مدیا کامانز",
  "makka-2": "عکس: ویکی‌مدیا کامانز",
  "makka-3": "عکس: دانشنامهٔ اسلامی",
  "makka-4": "عکس: دانشنامهٔ اسلامی",
  "makka-5": "عکس: ایقنا (عکس: حسین حاجیلری)",
  "makka-6": "عکس: دانشنامهٔ اسلامی",
  "makka-7": "عکس: دانشنامهٔ اسلامی",
  "makka-8": "عکس: ویکی‌مدیا کامانز",
  "makka-9": "عکس: دانشنامهٔ اسلامی",
  "makka-10": "عکس: ویکی‌مدیا کامانز",
  "makka-11": "عکس: دانشنامهٔ اسلامی",
  "makka-13": "عکس: ویکی‌مدیا کامانز",
  "makka-15": "عکس: ویکی‌مدیا کامانز",
  "makka-16": "عکس: دانشنامهٔ اسلامی",
  "makka-17": "عکس: ویکی‌مدیا کامانز",
  "makka-18": "عکس: ویکی‌مدیا کامانز",
  "makka-19": "عکس: ویکی‌مدیا کامانز",
  "makka-20": "عکس: ویکی‌مدیا کامانز",
  "madina-1": "عکس: تابناک (عکس: حامد جعفرنژاد)",
  "madina-2": "عکس: ویکی‌مدیا کامانز",
  "madina-3": "عکس: تابناک (عکس: حامد جعفرنژاد)",
  "madina-4": "عکس: ویکی‌مدیا کامانز",
  "madina-5": "عکس: ویکی‌مدیا کامانز",
  "madina-6": "عکس: ویکی‌مدیا کامانز",
  "atabat-23": "عکس: ویکی‌مدیا کامانز",
  "syria-1": "عکس: ویکی‌مدیا کامانز (عکس: امیر حسامی‌نژاد / تسنیم)",
  "syria-7": "عکس: Syria Photo Guide (عکس: Daniel Demeter) — مجوز در دست بررسی"
};
const SECTION_BANNERS = { umrah: "kaaba", hajj: "kaaba", atabat: "ali", iran: "reza" };

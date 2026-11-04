/* راهنمای زیارت — بنرهای عکسی (مورد ۲۲، ۴ نوامبر ۲۰۲۶)
   عکس واقعی هر مقام از ویکی‌مدیا کامانز (مجوز آزاد، ذکر منبع در
   سند منابع بنرها)؛ فایل‌ها در assets/banners/ و در
   کش سرویس‌ورکر (zg-v4) هستند. نمایش یکدست: نسبت ۱۶:۹ با برش cover.
   کلید مرحله "بخش-id" → نام فایل بنر (بدون مسیر و پسوند).
   لایه‌بندی صداقت: «دقیق» = عکس همان مقام؛ «نمایندهٔ زیارت» = عکس
   شاخص همان سفر برای مرحله‌هایی که عکس مستقلِ راستی‌آزمایی‌شده
   ندارند (کعبه برای آماده‌سازی/میقاتِ مکه‌محور و مزدلفه؛ حرم حسین
   برای مقام‌های کربلا). atabat-23 (سید محمد، بلد) عکس ندارد و بنر
   متنی فعلی‌اش می‌ماند — ساخته نشده، در سند بسته گزارش شده است. */
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
  "iran-4": "abdolazim"
};
const SECTION_BANNERS = { umrah: "kaaba", hajj: "kaaba", atabat: "ali", iran: "reza" };

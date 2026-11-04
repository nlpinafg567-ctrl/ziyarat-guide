/* راهنمای زیارت — sources
   فهرست منابع هر زیارت (کتاب‌شناسی کلی؛ جدا از فیلد source هر مرحله).
   لینک‌های DRIVE_BOOKS و DRIVE_FOLDER عیناً از خودِ گوگل درایو گرفته شده‌اند
   (پوشهٔ «راهنمای زیارت - منابع»، با لینک برای خواندن به‌اشتراک‌گذاشته‌شده)
   و هیچ لینکی در این فایل ساخته نشده است.
   شمارهٔ صفحه فقط جایی آمده که از خودِ کتاب راستی‌آزمایی شده باشد. */
const SOURCES = {
  umrah: [
    "راهنمای زائران عمره مفرده (معاونت آموزش و تحقیقات بعثه، مشعر ۱۳۸۱) — بخش‌های مدینه (ص ۱۱)، بقیع (ص ۱۲)، میقات (ص ۱۵)، مسجد الحرام (ص ۱۶)، صفا و مروه (ص ۱۹)",
    "مناسک حج (آیت‌الله العظمی فیاض؛ مناسک حج آیت‌الله العظمی سیستانی)",
    "مفاتیح‌الجنان (متن ادعیه و زیارات)"
  ],
  hajj: [
    "مناسک حج (آیت‌الله العظمی فیاض)",
    "مناسک حج (آیت‌الله العظمی سیستانی)",
    "مفاتیح‌الجنان (دعای عرفه، دعای وداع، دعاهای طواف)"
  ],
  atabat: [
    "دیدار با عترت — راهنمای زیارات عتبات عالیات",
    "زیارتگاه‌های عراق، جلد ۱ و ۲ (پژوهشکده حج و زیارت، مشعر)",
    "راهنمای اماکن زیارتی و سیاحتی در عراق، مصور (مقدس، مشعر ۱۳۸۷، ۳۲۳ صفحه — نسخهٔ تصویری بدون لایهٔ متن؛ شمارهٔ صفحهٔ مکان‌های تازه پس از بررسی نسخهٔ چاپی درج می‌شود)",
    "کامل‌الزیارات (مرجع کلاسیک زیارات)",
    "مفاتیح‌الجنان (متن ادعیه و زیارات)",
    "کتاب کربلا (جواد محدثی، مشعر) — بررسی شد: بخش مستقلی برای مکان‌های تازهٔ کربلا ندارد",
    "تذکر: «باغ امام صادق» با همین نام در چهار کتاب بررسی‌شده (دیدار با عترت؛ زیارتگاه‌های عراق جلد ۱ و ۲؛ کربلای محدثی) نیافت شد و همچنان منسوب/در حال بررسی است — نزدیک‌ترین مدخل، «مقام امام جعفر صادق (ع)» در زیارتگاه‌های عراق جلد ۱، ص ۲۴۶ است که اطرافش باغ‌های میوه بوده، ولی همانندی‌اش ثابت نشده است؛ «مقام امام زمان» در زیارتگاه‌های عراق جلد ۱، مدخل ۸۹، ص ۲۴۷ آمده است"
  ],
  iran: [
    "کامل‌الزیارات (مرجع کلاسیک زیارات)",
    "مفاتیح‌الجنان (متن ادعیه و زیارات)",
    "در حریم طوس (مشهد)",
    "شناختنامهٔ حضرت معصومه و شهر قم؛ شناختنامهٔ حضرت عبدالعظیم و شهر ری"
  ]
};

/* کتاب‌های گوگل درایو («راهنمای زیارت - منابع») برای هر زیارت.
   هر کتاب دو لینک از خودِ درایو دارد: باز کردن و دانلود مستقیم.
   بخش ایران کتاب اختصاصی در درایو ندارد؛ پس فقط لینک پوشه (DRIVE_FOLDER) دارد. */
const DRIVE_BOOKS = {
  umrah: [
    { title: "راهنمای زائران عمره مفرده (بعثه، مشعر ۱۳۸۱)",
      view: "https://drive.google.com/file/d/1AnCSnnqereY1GskpZWIUraHfb1eP9bRl/view?usp=drivesdk",
      download: "https://drive.google.com/uc?id=1AnCSnnqereY1GskpZWIUraHfb1eP9bRl&export=download" },
    { title: "مناسک حج (آیت‌الله العظمی سیستانی)",
      view: "https://drive.google.com/file/d/1dSyuXZy3i4_ljUowYHiGwOI8oNJwBo0v/view?usp=drivesdk",
      download: "https://drive.google.com/uc?id=1dSyuXZy3i4_ljUowYHiGwOI8oNJwBo0v&export=download" },
    { title: "مناسک عمره مفرده — ویژهٔ بانوان",
      view: "https://drive.google.com/file/d/1mAR4CCFUvJXoYbe3l6sMNroZA9v4M2k1/view?usp=drivesdk",
      download: "https://drive.google.com/uc?id=1mAR4CCFUvJXoYbe3l6sMNroZA9v4M2k1&export=download" }
  ],
  hajj: [
    { title: "مناسک حج (آیت‌الله العظمی سیستانی)",
      view: "https://drive.google.com/file/d/1dSyuXZy3i4_ljUowYHiGwOI8oNJwBo0v/view?usp=drivesdk",
      download: "https://drive.google.com/uc?id=1dSyuXZy3i4_ljUowYHiGwOI8oNJwBo0v&export=download" },
    { title: "ملحقات مناسک حج",
      view: "https://drive.google.com/file/d/1TLSuLcrMly5ByuPyPF7FsKBRi3c2fhB3/view?usp=drivesdk",
      download: "https://drive.google.com/uc?id=1TLSuLcrMly5ByuPyPF7FsKBRi3c2fhB3&export=download" },
    { title: "مناسک حج (پژوهشکده حج و زیارت)",
      view: "https://drive.google.com/file/d/1SIzQlD28igBMHkJKYw11h7FPTYJadqIz/view?usp=drivesdk",
      download: "https://drive.google.com/uc?id=1SIzQlD28igBMHkJKYw11h7FPTYJadqIz&export=download" },
    { title: "مناسک جامع حج (صافی گلپایگانی)",
      view: "https://drive.google.com/file/d/1Skud5gLGg6n8-576FN0htbUKXXD6Mfje/view?usp=drivesdk",
      download: "https://drive.google.com/uc?id=1Skud5gLGg6n8-576FN0htbUKXXD6Mfje&export=download" }
  ],
  atabat: [
    { title: "دیدار با عترت — راهنمای زیارات عتبات عالیات",
      view: "https://drive.google.com/file/d/1i84ogDG5U47OajjYuaHq-Efzn3UKgn8b/view?usp=drivesdk",
      download: "https://drive.google.com/uc?id=1i84ogDG5U47OajjYuaHq-Efzn3UKgn8b&export=download" },
    { title: "زیارتگاه‌های عراق — جلد ۱",
      view: "https://drive.google.com/file/d/1fvtxjwADJR3WCteZVAXfDPbf7m_9gMGG/view?usp=drivesdk",
      download: "https://drive.google.com/uc?id=1fvtxjwADJR3WCteZVAXfDPbf7m_9gMGG&export=download" },
    { title: "زیارتگاه‌های عراق — جلد ۲",
      view: "https://drive.google.com/file/d/1vW5hVB0VvKwPvLvu0lQWyjSdMx7BZjEg/view?usp=drivesdk",
      download: "https://drive.google.com/uc?id=1vW5hVB0VvKwPvLvu0lQWyjSdMx7BZjEg&export=download" },
    { title: "راهنمای اماکن زیارتی و سیاحتی در عراق — مصور",
      view: "https://drive.google.com/file/d/1mHovZOQjCxG9MOfUTqaI7lL9T2XxPYHF/view?usp=drivesdk",
      download: "https://drive.google.com/uc?id=1mHovZOQjCxG9MOfUTqaI7lL9T2XxPYHF&export=download" },
    { title: "کربلا (جواد محدثی)",
      view: "https://drive.google.com/file/d/1598lXdry7jzebQOgpTHh2pGFCgfvKwII/view?usp=drivesdk",
      download: "https://drive.google.com/uc?id=1598lXdry7jzebQOgpTHh2pGFCgfvKwII&export=download" }
  ]
};

/* پوشهٔ «راهنمای زیارت - منابع» در گوگل درایو (لینک از خودِ درایو). */
const DRIVE_FOLDER = "https://drive.google.com/drive/folders/1yKwMRXqx_CWMkXsUuLmshj5YlXph8to0";

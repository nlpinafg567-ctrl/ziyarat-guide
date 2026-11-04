/* راهنمای زیارت — utils
   ابزارهای عمومی: دسترسی به عنصر و تبدیل اعداد به فارسی.
   این فایل هیچ وابستگی‌ای ندارد و پیش از همهٔ ماژول‌های JS لود می‌شود. */
const $ = (id) => document.getElementById(id);

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const fa = (n) => String(n).split("").map(c => FA_DIGITS[c] || c).join("");

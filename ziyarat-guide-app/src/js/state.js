/* راهنمای زیارت — state
   تنها جای وضعیت اپ: حافظهٔ محلی، پیشرفت مرحله‌ها، خاطره‌ها و اندازهٔ قلم.
   هیچ تابعی در این فایل رندر نمی‌کند؛ فقط داده نگه می‌دارد و می‌خواند. */
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};

let memories = store.get("zg-memories", []);
let fontScale = store.get("zg-font", 1);

/* وضعیت ناوبری و ابزارِ مرحلهٔ جاری — در router.js و counters.js خوانده می‌شود. */
let currentSection = null;
let currentStep = null;
let counter = 0;

function progressKey(key) { return "zg-progress-" + key; }
function getProgress(key) { return store.get(progressKey(key), []); }
function isDone(key, id) { return getProgress(key).includes(id); }
function isUnlocked(key, id) {
  /* خواندن آزاد (۴ نوامبر ۲۰۲۶): همهٔ مرحله‌ها همیشه بازند؛ تیک اتمام
     فقط پیشرفت را نشان می‌دهد و دیگر قفل نیست. */
  return true;
}
function currentId(key) {
  const steps = SECTIONS[key].steps;
  for (const s of steps) if (!isDone(key, s.id)) return s.id;
  return steps.length;
}

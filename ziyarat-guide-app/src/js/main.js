/* راهنمای زیارت — main
   ورودی اپ: همهٔ ماژول‌ها را به هم وصل می‌کند.
   ترتیب لود در index.html: داده‌ها → utils → state → router → font →
   counters → diary → profile → checklist → card → share → tours → icons → render → main.
   اسکریپت‌ها کلاسیک‌اند (نه ES Module) تا اپ با باز کردن مستقیم index.html
   (حتی file://) هم کار کند و هندلرهای onclick سراسری سر جایشان بمانند. */
applyFont();
renderHome();
const _go = go;
go = function (view) { if (view === "booklet") renderBooklet(); _go(view); };

/* PWA: ثبت سرویس‌ورکر فقط روی http(s)؛ روی file:// بی‌صدا رد می‌شود. */
if (typeof navigator !== "undefined" && "serviceWorker" in navigator &&
    typeof location !== "undefined" && (location.protocol === "http:" || location.protocol === "https:")) {
  navigator.serviceWorker.register("sw.js").catch(function () {});
}

/* پیوند عمیق از اینفوگرافیک‌ها: #بخش-شمارهٔ مرحله، مثل #atabat-6.
   اگر مرحله قفل باشد، فقط صفحهٔ بخش باز می‌شود (قفل ترتیبی سر جایش است). */
(function () {
  try {
    const m = (location.hash || "").match(/^#([a-z]+)-(\d+)$/);
    if (!m || !SECTIONS[m[1]]) return;
    openSection(m[1]);
    const id = parseInt(m[2], 10);
    if (isUnlocked(m[1], id)) openStep(id);
  } catch (e) {}
})();

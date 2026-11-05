/* راهنمای زیارت — main
   ورودی اپ: همهٔ ماژول‌ها را به هم وصل می‌کند.
   ترتیب لود در index.html: داده‌ها → utils → state → router → font →
   counters → diary → profile → checklist → card → share → tours → icons → render → main.
   اسکریپت‌ها کلاسیک‌اند (نه ES Module) تا اپ با باز کردن مستقیم index.html
   (حتی file://) هم کار کند و هندلرهای onclick سراسری سر جایشان بمانند. */
applyFont();
renderHome();
/* دروازهٔ صلوات فقط نخستین بازدید: اگر پیش‌تر رد شده باشد، مستقیم خانه
   با پشتهٔ تازه باز می‌شود و اسپلش دیده نمی‌شود. */
if (typeof store !== "undefined" && store.get("zg-visited", false)) enterHome();
const _go = go;
go = function (view) { if (view === "booklet") renderBooklet(); _go(view); };

/* PWA: ثبت سرویس‌ورکر فقط روی http(s)؛ روی file:// بی‌صدا رد می‌شود. */
if (typeof navigator !== "undefined" && "serviceWorker" in navigator &&
    typeof location !== "undefined" && (location.protocol === "http:" || location.protocol === "https:")) {
  navigator.serviceWorker.register("sw.js").then(function (reg) {
    /* P8: اگر ورکر تازه رسید (پس از انتشار)، اعلان «نسخهٔ تازه» بده تا
       بازدیدکنندهٔ برگشتی نسخهٔ کهنه را نسخهٔ تازه نپندارد. */
    function showUpdate() {
      if (typeof document === "undefined" || document.getElementById("sw-update")) return;
      var bar = document.createElement("div");
      bar.id = "sw-update";
      bar.innerHTML = "نسخهٔ تازهٔ راهنما رسید. <button id=\"sw-reload\">بارگذاری دوباره</button> <button id=\"sw-dismiss\" aria-label=\"بستن\">×</button>";
      document.body.appendChild(bar);
      var r = document.getElementById("sw-reload");
      if (r) r.onclick = function () { location.reload(); };
      var d = document.getElementById("sw-dismiss");
      if (d) d.onclick = function () { bar.remove(); };
    }
    if (reg.waiting) showUpdate();
    reg.addEventListener("updatefound", function () {
      var nw = reg.installing;
      if (nw) nw.addEventListener("statechange", function () {
        if (nw.state === "installed" && navigator.serviceWorker.controller) showUpdate();
      });
    });
  }).catch(function () {});
}

/* پیوند عمیق از اینفوگرافیک‌ها: #بخش-شمارهٔ مرحله، مثل #atabat-6.
   خواندن آزاد است؛ مرحلهٔ پیوند مستقیم باز می‌شود. */
(function () {
  try {
    const m = (location.hash || "").match(/^#([a-z]+)-(\d+)$/);
    if (!m || !SECTIONS[m[1]]) return;
    openSection(m[1]);
    const id = parseInt(m[2], 10);
    openStep(id);
  } catch (e) {}
})();

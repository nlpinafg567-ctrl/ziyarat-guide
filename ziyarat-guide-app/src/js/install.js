/* راهنمای زیارت — نصب اپ (مورد ۲۸، ۴ نوامبر ۲۰۲۶)
   دکمهٔ نصب در صفحهٔ اصلی: اگر مرورگر رویداد نصب بدهد، همان اعلان
   بومی باز می‌شود؛ اگر نه، راهنمای نصب دستی نشان داده می‌شود.
   در حالت نصب‌شده (standalone) دکمه پنهان است. نصب‌شده + کش
   سرویس‌ورکر (zg-v3) یعنی اپ بدون اینترنت هم باز می‌شود. */
(function () {
  var btn = $("install-btn");
  if (!btn) return;
  function isStandalone() {
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      (typeof navigator !== "undefined" && navigator.standalone);
  }
  if (isStandalone()) { btn.style.display = "none"; return; }
  var deferred = null;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferred = e;
  });
  window.addEventListener("appinstalled", function () {
    deferred = null;
    btn.style.display = "none";
  });
  btn.addEventListener("click", function () {
    if (deferred) {
      deferred.prompt();
      if (deferred.userChoice) deferred.userChoice.then(function () { deferred = null; });
    } else {
      var help = $("install-help");
      if (help) help.style.display = help.style.display === "block" ? "none" : "block";
    }
  });
})();

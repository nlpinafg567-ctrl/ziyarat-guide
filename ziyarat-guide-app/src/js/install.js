/* راهنمای زیارت — نصب اپ (مورد ۲۸، ۴ نوامبر ۲۰۲۶)
   دکمهٔ نصب در صفحهٔ اصلی: اگر مرورگر رویداد نصب بدهد، همان اعلان
   بومی باز می‌شود؛ اگر نه، راهنمای نصب دستی نشان داده می‌شود.
   در حالت نصب‌شده (standalone) دکمه پنهان است. نصب‌شده + کش
   سرویس‌ورکر (zg-v15) یعنی اپ بدون اینترنت هم باز می‌شود.
   P2-14 (فاز ۲ zg-v15): دکمه فقط وقتی دیده می‌شود که نصب واقعاً ممکن
   باشد — اعلان بومی مرورگر (beforeinstallprompt) یا آیفون (افزودن
   دستی به صفحهٔ اصلی)؛ در مرورگر بی‌پشتیبانی، دکمه پنهان می‌ماند. */
(function () {
  var btn = $("install-btn");
  if (!btn) return;
  function isStandalone() {
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      (typeof navigator !== "undefined" && navigator.standalone);
  }
  function isIOS() {
    if (typeof navigator === "undefined") return false;
    var ua = navigator.userAgent || "";
    return /iphone|ipad|ipod/i.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }
  var deferred = null;
  function refreshInstallBtn() {
    btn.style.display = (isStandalone() || (!deferred && !isIOS())) ? "none" : "";
  }
  refreshInstallBtn();
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferred = e;
    refreshInstallBtn();
  });
  window.addEventListener("appinstalled", function () {
    deferred = null;
    refreshInstallBtn();
  });
  btn.addEventListener("click", function () {
    if (deferred) {
      deferred.prompt();
      if (deferred.userChoice) deferred.userChoice.then(function () { deferred = null; refreshInstallBtn(); });
    } else {
      var help = $("install-help");
      if (help) help.style.display = help.style.display === "block" ? "none" : "block";
    }
  });
})();

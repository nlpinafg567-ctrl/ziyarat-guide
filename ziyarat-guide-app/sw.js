/* راهنمای زیارت — service worker
   کش پوستهٔ اپ برای کارکرد آفلاین. بدون وابستگی خارجی در زمان اجرا؛
   فقط لینک‌های تور مجازی بیرونی‌اند و آفلاین باز نمی‌شوند.
   با هر انتشار، نسخهٔ کش (CACHE) بالا می‌رود. */
const CACHE = "zg-v2";
const FILES = [
  "./index.html",
  "./manifest.json",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/fonts/vazirmatn-arabic.woff2",
  "./assets/fonts/vazirmatn-latin.woff2",
  "./assets/logo-ammar.png",
  "./assets/qr-whatsapp.png",
  "./src/css/variables.css",
  "./src/css/fonts.css",
  "./src/css/base.css",
  "./src/css/splash.css",
  "./src/css/home.css",
  "./src/css/steps.css",
  "./src/css/diary.css",
  "./src/css/about-banner.css",
  "./src/css/profile.css",
  "./src/css/card.css",
  "./src/css/checklist.css",
  "./src/css/chatbot.css",
  "./src/css/print.css",
  "./src/data/umrah.js",
  "./src/data/hajj.js",
  "./src/data/atabat.js",
  "./src/data/iran.js",
  "./src/data/tours.js",
  "./src/data/sources.js",
  "./src/data/chatbot-kb.js",
  "./src/js/utils.js",
  "./src/js/state.js",
  "./src/js/router.js",
  "./src/js/font.js",
  "./src/js/counters.js",
  "./src/js/diary.js",
  "./src/js/profile.js",
  "./src/js/checklist.js",
  "./src/js/card.js",
  "./src/js/share.js",
  "./src/js/tours.js",
  "./src/js/icons.js",
  "./src/js/render.js",
  "./src/js/main.js",
  "./src/js/chatbot.js"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request))
  );
});

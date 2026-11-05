/* راهنمای زیارت — router
   ناوبری کم‌عمق تا زائر گم نشود.
   دکمهٔ بازگشت در همهٔ صفحه‌ها دقیقاً یک صفحه به عقب برمی‌گردد؛
   در خانه صفحهٔ قبلی نیست، پس دکمهٔ بازگشت آنجا حذف شده است. */
const stack = ["splash"];

function show(view) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  $("view-" + view).classList.add("active");
  if (view === "home") renderHome();
  window.scrollTo(0, 0);
}
function go(view) { stack.push(view); show(view); }
function back() { if (stack.length > 1) { stack.pop(); show(stack[stack.length - 1]); } }
/* ورود به خانه با پشتهٔ تازه: پس از رد شدن از دروازهٔ صلوات، خانه
   صفحهٔ اول پشته می‌شود تا بازگشت از خانه بی‌اثر بماند. */
function enterHome() { stack.length = 0; stack.push("home"); show("home"); }
/* رد شدن از دروازهٔ صلوات: فقط نخستین بازدید دروازه دیده می‌شود. */
function passGate() { store.set("zg-visited", true); go("welcome"); }

/* راهنمای زیارت — router
   ناوبری کم‌عمق تا زائر گم نشود.
   دکمهٔ بازگشت در همهٔ صفحه‌ها دقیقاً یک صفحه به عقب برمی‌گردد. */
const stack = ["splash"];

function show(view) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  $("view-" + view).classList.add("active");
  window.scrollTo(0, 0);
}
function go(view) { stack.push(view); show(view); }
function back() { if (stack.length > 1) { stack.pop(); show(stack[stack.length - 1]); } }

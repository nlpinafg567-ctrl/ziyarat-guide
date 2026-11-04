/* راهنمای زیارت — font
   کنترل اندازهٔ قلم؛ انتخاب زائر در حافظهٔ محلی می‌ماند. */
function applyFont() { document.documentElement.style.setProperty("--font-scale", fontScale); }
function fontSize(d) {
  fontScale = Math.min(1.4, Math.max(0.85, +(fontScale + d * 0.1).toFixed(2)));
  store.set("zg-font", fontScale);
  applyFont();
}

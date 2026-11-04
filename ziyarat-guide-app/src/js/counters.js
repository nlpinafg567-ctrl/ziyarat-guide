/* راهنمای زیارت — counters
   شماتیک‌های SVG و ابزارهای تعاملی مرحله‌ها.
   شمارنده‌ها ابزارند، نه بازی؛ مناسک هرگز بازی نمی‌شود. */
function tawafSVG() {
  let dots = "";
  for (let i = 0; i < 7; i++) {
    const a = (Math.PI * 2 * i) / 7 - Math.PI / 2;
    const x = (100 + 62 * Math.cos(a)).toFixed(1), y = (100 + 62 * Math.sin(a)).toFixed(1);
    dots += `<circle class="orbit-dot" cx="${x}" cy="${y}" r="9" fill="#e8e0cf" stroke="#C5A46D"/>`;
  }
  return `<svg viewBox="0 0 200 200" class="schema" role="img" aria-label="شماتیک طواف دور کعبه">
    <circle cx="100" cy="100" r="62" fill="none" stroke="#C5A46D" stroke-dasharray="4 6"/>
    <rect x="82" y="82" width="36" height="36" rx="4" fill="#0D3B2E" stroke="#C5A46D" stroke-width="2"/>
    <text x="100" y="104" text-anchor="middle" fill="#C5A46D" font-size="13">کعبه</text>${dots}</svg>`;
}
function saiSVG() {
  let segs = "";
  for (let i = 0; i < 7; i++) {
    const x = 20 + i * 22;
    segs += `<rect class="sai-seg" x="${x}" y="92" width="18" height="16" rx="4" fill="#e8e0cf" stroke="#C5A46D"/>`;
  }
  return `<svg viewBox="0 0 200 200" class="schema" role="img" aria-label="شماتیک سعی میان صفا و مروه">
    <text x="20" y="40" text-anchor="middle" fill="#0D3B2E" font-weight="bold">صفا</text>
    <text x="180" y="40" text-anchor="middle" fill="#0D3B2E" font-weight="bold">مروه</text>
    <line x1="20" y1="100" x2="180" y2="100" stroke="#C5A46D" stroke-width="3"/>${segs}
    <text x="100" y="150" text-anchor="middle" fill="#555" font-size="13">هر بار رفت‌وبرگشت = یک دور کامل</text></svg>`;
}
function ramiSVG() {
  let out = `<svg viewBox="0 0 200 120" class="schema" role="img" aria-label="شماتیک رمی جمرات">`;
  const names = ["صغری", "وسطی", "کبری"];
  for (let p = 0; p < 3; p++) {
    const x = 30 + p * 60;
    out += `<rect x="${x}" y="20" width="18" height="50" rx="4" fill="#0D3B2E" stroke="#C5A46D"/>`;
    out += `<text x="${x + 9}" y="88" text-anchor="middle" fill="#555" font-size="13">${names[p]}</text>`;
    for (let i = 0; i < 7; i++) {
      const idx = p * 7 + i;
      const sx = x - 8 + (i % 4) * 12, sy = i < 4 ? 100 : 112;
      out += `<circle class="rami-stone" data-idx="${idx}" cx="${sx}" cy="${sy}" r="4" fill="#e8e0cf" stroke="#C5A46D"/>`;
    }
  }
  out += `</svg>`;
  return out;
}
function toolHTML(s) {
  if (s.tool === "tawaf") return `<div class="box"><h3>🧭 شمارندهٔ طواف (ابزار)</h3>${tawafSVG()}
    <p class="small">هر دور که تمام شد، یکی بزن؛ تا ۷ دور.</p>
    <div class="counter"><button onclick="countStep(-1,7)">−</button><span class="count" id="cnt">۰</span><button onclick="countStep(1,7)">+</button></div>
    <p class="dots" id="dots">○ ○ ○ ○ ○ ○ ○</p></div>`;
  if (s.tool === "sai") return `<div class="box"><h3>🧭 شمارندهٔ سعی (ابزار)</h3>${saiSVG()}
    <p class="small">هر رفت‌وبرگشت که تمام شد، یکی بزن؛ تا ۷ بار.</p>
    <div class="counter"><button onclick="countStep(-1,7)">−</button><span class="count" id="cnt">۰</span><button onclick="countStep(1,7)">+</button></div>
    <p class="dots" id="dots">○ ○ ○ ○ ○ ○ ○</p></div>`;
  if (s.tool === "rami") return `<div class="box"><h3>🧭 شمارندهٔ سنگریزهٔ جمرهٔ عقبه (ابزار)</h3>
    <p class="small">هر سنگ که زدی، یکی بزن؛ تا ۷ سنگ.</p>
    <div class="counter"><button onclick="countStep(-1,7)">−</button><span class="count" id="cnt">۰</span><button onclick="countStep(1,7)">+</button></div>
    <p class="dots" id="dots">○ ○ ○ ○ ○ ○ ○</p></div>`;
  if (s.tool === "rami3") return `<div class="box"><h3>🧭 شمارندهٔ رمی سه جمره (ابزار)</h3>${ramiSVG()}
    <p class="small">به ترتیب: صغری ۷، وسطی ۷، کبری ۷؛ در مجموع ۲۱ سنگ.</p>
    <div class="counter"><button onclick="countStep(-1,21)">−</button><span class="count" id="cnt">۰</span><button onclick="countStep(1,21)">+</button></div>
    <p class="small" id="rami-stage">جمرهٔ صغری</p></div>`;
  if (s.tool === "ihram") return `<div class="box"><h3>📋 چک‌لیست احرام</h3>
    <div class="guide-note"><b>یادداشت راهنما:</b> پیش از محرم‌شدن، محرمات احرام (مانند بوی خوش، شکار، عقد، پوشیدن دوخته برای آقایان) را بدان و بپذیر.
    <label><input type="checkbox" id="accept-note" onchange="document.getElementById('ihram-list').style.opacity=this.checked?1:.4"> خواندم و پذیرفتم</label></div>
    <div class="checklist" id="ihram-list" style="opacity:.4">
      <label><input type="checkbox"> غسل احرام کردم</label>
      <label><input type="checkbox"> جامهٔ احرام پوشیدم</label>
      <label><input type="checkbox"> نیت کردم</label>
      <label><input type="checkbox"> تلبیه گفتم</label>
    </div></div>`;
  return `<div class="placeholder">🖼 جای تصویر/اینفوگرافیک این مرحله — پس از تأیید محتوا با جی‌پی‌تی ساخته می‌شود</div>`;
}
function countStep(d, max) {
  counter = Math.min(max, Math.max(0, counter + d));
  const el = $("cnt"); if (el) el.textContent = fa(counter);
  const dots = $("dots");
  if (dots) dots.textContent = Array.from({ length: max }, (_, i) => i < counter ? "●" : "○").join(" ");
  document.querySelectorAll(".orbit-dot").forEach((c, i) => c.setAttribute("fill", i < counter ? "#0D3B2E" : "#e8e0cf"));
  document.querySelectorAll(".sai-seg").forEach((c, i) => c.setAttribute("fill", i < counter ? "#0D3B2E" : "#e8e0cf"));
  document.querySelectorAll(".rami-stone").forEach(c => {
    const idx = parseInt(c.getAttribute("data-idx"), 10);
    c.setAttribute("fill", idx < counter ? "#0D3B2E" : "#e8e0cf");
  });
  const stage = $("rami-stage");
  if (stage) stage.textContent = counter < 7 ? "جمرهٔ صغری" : (counter < 14 ? "جمرهٔ وسطی" : "جمرهٔ کبری");
}

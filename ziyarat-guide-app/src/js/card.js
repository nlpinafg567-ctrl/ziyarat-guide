/* راهنمای زیارت — card
   کارت شناسایی زائر، پیش از هر سفر؛ سه مدل جداگانه با هویت بصری متفاوت.
   لوگوی واقعی عمار غزنه (فایل شفاف) همیشه مستقل می‌نشیند: بدون قاب، بدون
   بستر رنگی و بدون تصویر زیر آن. شمارهٔ تماس و QR واتساپ از CONTACTS
   (تعریف‌شده در index.html، تأیید مالک) می‌آیند؛ هیچ مقداری در این فایل
   ساخته نشده است. همهٔ داده فقط در گوشی زائر است. دانلود عکس با Canvas
   داخلی، بدون وابستگی خارجی. */
const CARD_MODELS = {
  atabat: { title: "کارت زائر عتبات عالیات", greet: "السلام علیک یا أباعبدالله الحسین (ع)" },
  umrah:  { title: "کارت زائر عمرهٔ مفرده", greet: "" },
  hajj:   { title: "کارت زائر حج تمتع", greet: "لبیک اللهم لبیک" }
};
let currentCardModel = "atabat";

function openCardView() {
  renderCard(currentCardModel);
  go("card");
}
function cardPhotoArea(p) {
  const photo = cardPhoto(p);
  if (photo) return `<img class="pcard-photo" src="${photo}" alt="عکس زائر">`;
  return `<div class="pcard-motif">${motifSVG(132)}</div>`;
}
function cardSpecsHTML(p) {
  let rows = "";
  if (p.city) rows += `<p><b>شهر:</b> ${esc(p.city)}</p>`;
  if (p.caravan) rows += `<p><b>کاروان:</b> ${esc(p.caravan)}</p>`;
  return rows;
}
function renderCard(model) {
  currentCardModel = CARD_MODELS[model] ? model : "atabat";
  const m = CARD_MODELS[currentCardModel];
  const p = loadProfile();
  const name = cardTitleName(currentCardModel, p);
  const tabs = Object.entries(CARD_MODELS).map(([k, v]) =>
    `<button class="btn small${k === currentCardModel ? " gold" : ""}" onclick="renderCard('${k}')">${v.title.replace("کارت زائر ", "")}</button>`).join(" ");
  let html = `<div class="card-tabs">${tabs}</div>`;
  if (!name) {
    html += `<div class="box"><h3>🪪 کارت شناسایی من</h3>` +
      `<p>برای ساخت کارت، نخست نامت را در بخش مشخصات وارد کن.</p>` +
      `<button class="btn gold" onclick="openProfile(false)">رفتن به مشخصات</button></div>`;
  } else {
    html += `<div id="card-print-area"><div class="pcard pcard-${currentCardModel}">` +
      `<img class="pcard-logo" src="assets/logo-ammar.png" alt="لوگوی عمار غزنه">` +
      `<p class="pcard-brand">شرکت سیاحتی و زیارتی عمار غزنه</p>` +
      `<p class="pcard-model">${m.title}</p>` +
      (m.greet ? `<p class="pcard-greet">${m.greet}</p>` : "") +
      `<div class="pcard-mid">${cardPhotoArea(p)}` +
      `<div class="pcard-info"><p class="pcard-name">${esc(name)}</p>${cardSpecsHTML(p)}` +
      `<p><b>شماره تماس:</b> <a href="${CONTACTS.tel}">تماس مستقیم</a> · <a href="${CONTACTS.whatsapp}" target="_blank" rel="noopener">واتساپ</a></p></div></div>` +
      `<div class="pcard-qr"><img src="assets/qr-whatsapp.png" alt="QR واتساپ"><span>واتساپ عمار غزنه</span></div>` +
      `<p class="pcard-privacy">🔒 فقط در گوشی خودت می‌ماند</p>` +
      `</div></div>`;
    html += `<div style="margin-top:13px">` +
      `<button class="btn gold" onclick="printCard()">🖨 چاپ کارت</button> ` +
      `<button class="btn" onclick="downloadCard()">⬇ دانلود عکس کارت</button></div>`;
  }
  html += `<p class="small" style="margin-top:13px">🔒 ${PRIVACY_LINE}؛ این کارت فقط روی گوشی خودت ساخته می‌شود.</p>`;
  $("card-body").innerHTML = html;
}
function printCard() {
  document.body.classList.add("print-card");
  const done = () => document.body.classList.remove("print-card");
  window.addEventListener("afterprint", done, { once: true });
  window.print();
  setTimeout(done, 3000);
}
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
function roundRectPath(x, px, py, w, h, r) {
  x.beginPath();
  x.moveTo(px + r, py);
  x.arcTo(px + w, py, px + w, py + h, r);
  x.arcTo(px + w, py + h, px, py + h, r);
  x.arcTo(px, py + h, px, py, r);
  x.arcTo(px, py, px + w, py, r);
  x.closePath();
}
function drawMotifCanvas(x, cx, cy, r) {
  x.save();
  x.strokeStyle = "#C5A46D";
  x.fillStyle = "#C5A46D";
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    x.beginPath();
    x.ellipse(cx + Math.cos(a) * r, cy + Math.sin(a) * r, r * 0.62, r * 0.34, a, 0, Math.PI * 2);
    x.fill();
  }
  x.beginPath(); x.arc(cx, cy, r * 0.42, 0, Math.PI * 2); x.fillStyle = "#0D3B2E"; x.fill();
  x.beginPath(); x.arc(cx, cy, r * 0.2, 0, Math.PI * 2); x.fillStyle = "#e8cf9a"; x.fill();
  x.restore();
}
async function downloadCard() {
  const p = loadProfile();
  const name = cardTitleName(currentCardModel, p);
  if (!name) { alert("اول نامت را در مشخصات وارد کن."); return; }
  const m = CARD_MODELS[currentCardModel];
  const W = 1000, H = 640;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d");
  const bg = { atabat: ["#1d332b", "#0D3B2E", "#081f18"], umrah: ["#FFFEFB", "#F7F3EA", "#f3e6c0"], hajj: ["#1a5c49", "#0D3B2E", "#083028"] }[currentCardModel];
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, bg[0]); g.addColorStop(0.55, bg[1]); g.addColorStop(1, bg[2]);
  x.fillStyle = g;
  roundRectPath(x, 0, 0, W, H, 36); x.fill();
  x.strokeStyle = "#C5A46D"; x.lineWidth = 6;
  roundRectPath(x, 10, 10, W - 20, H - 20, 28); x.stroke();
  const dark = currentCardModel !== "umrah";
  const ink = dark ? "#F7F3EA" : "#0D3B2E";
  const gold = "#C5A46D";
  x.textAlign = "center";
  try {
    const logo = await loadImage("assets/logo-ammar.png");
    const lw = 240, lh = Math.round(240 * logo.height / logo.width);
    x.drawImage(logo, (W - lw) / 2, 30, lw, lh);
  } catch (e) { /* لوگو لود نشد: فقط متن برند می‌ماند */ }
  x.fillStyle = gold;
  x.font = "bold 30px Vazirmatn, Tahoma";
  x.fillText("شرکت سیاحتی و زیارتی عمار غزنه", W / 2, 340);
  x.fillStyle = ink;
  x.font = "900 44px Vazirmatn, Tahoma";
  x.fillText(m.title, W / 2, 392);
  x.fillStyle = gold;
  x.font = "28px Vazirmatn, Tahoma";
  if (m.greet) x.fillText(m.greet, W / 2, 432);
  const photo = cardPhoto(p);
  const px = 70, py = 435, pw = 170, ph = 170;
  if (photo) {
    try {
      const img = await loadImage(photo);
      x.save();
      roundRectPath(x, px, py, pw, ph, 18); x.clip();
      const sc = Math.max(pw / img.width, ph / img.height);
      x.drawImage(img, px - (img.width * sc - pw) / 2, py - (img.height * sc - ph) / 2, img.width * sc, img.height * sc);
      x.restore();
      x.strokeStyle = gold; x.lineWidth = 4;
      roundRectPath(x, px, py, pw, ph, 18); x.stroke();
    } catch (e) { drawMotifCanvas(x, px + pw / 2, py + ph / 2, 52); }
  } else {
    drawMotifCanvas(x, px + pw / 2, py + ph / 2, 52);
  }
  /* ناحیهٔ متن میانی: بین عکس (تا ۲۴۰) و QR (از ۷۶۰)؛ وسط آن ۵۰۰ است.
     نام و مشخصات وسط‌چین در همین ناحیه‌اند تا هرگز زیر عکس یا QR نروند. */
  const tx = 500, tw = 460;
  x.textAlign = "center";
  x.fillStyle = ink;
  let fs = 40;
  x.font = "900 " + fs + "px Vazirmatn, Tahoma";
  while (fs > 24 && x.measureText(name).width > tw) { fs -= 2; x.font = "900 " + fs + "px Vazirmatn, Tahoma"; }
  x.fillText(name, tx, 500);
  x.font = "26px Vazirmatn, Tahoma";
  let ty = 540;
  if (p.city) { x.fillText("شهر: " + p.city, tx, ty); ty += 36; }
  if (p.caravan) { x.fillText("کاروان: " + p.caravan, tx, ty); ty += 36; }
  x.fillStyle = gold;
  x.font = "22px Vazirmatn, Tahoma";
  x.fillText("فقط در گوشی خودت می‌ماند", tx, 620);
  x.textAlign = "center";
  x.fillStyle = ink; x.font = "22px Vazirmatn, Tahoma";
  x.fillText("واتساپ عمار غزنه", W - 165, 448);
  try {
    const qr = await loadImage("assets/qr-whatsapp.png");
    x.drawImage(qr, W - 240, 455, 150, 150);
  } catch (e) {
    x.strokeStyle = gold; x.setLineDash([10, 8]); x.lineWidth = 3;
    x.strokeRect(W - 240, 455, 150, 150);
    x.setLineDash([]);
  }
  let url;
  try { url = c.toDataURL("image/png"); }
  catch (e) { alert("دانلود عکس در این مرورگر ممکن نشد؛ از دکمهٔ چاپ استفاده کن."); return; }
  const a = document.createElement("a");
  a.href = url;
  a.download = "kard-zaer.png";
  a.click();
}

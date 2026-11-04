/* راهنمای زیارت — share
   خلاصهٔ قابل دانلود هر مرحله + چاپ (از راه چاپ مرورگر، PDF). */
function summaryHTML(s, stepKey) {
  const irfani = (typeof LITERARY_SUMMARY !== "undefined" && stepKey) ? (LITERARY_SUMMARY[stepKey] || "") : "";
  return `<div class="box"><h3>۶. 🖼 اینفوگرافیک کلی این مرحله</h3>
    <div class="summary-card" id="summary-card">
      <h3>${s.title}</h3><p>${s.place}</p><p><b>${s.action}</b></p>
      ${irfani ? `<p class="irfani">${irfani}</p>` : ""}
      <ol style="text-align:right">${s.steps.map(t => `<li>${t}</li>`).join("")}</ol>
      <p class="small">${s.source}</p><p class="small">راهنمای زایرین عمار غزنه — زائر افغانستانی</p>
    </div>
    <button class="btn small gold" style="margin-top:8px" onclick="window.print()">چاپ / ذخیره به‌صورت PDF</button>
    <button class="btn small" style="margin-top:8px" onclick="downloadSummary()">دانلود فایل خلاصه</button></div>`;
}
function downloadSummary() {
  const card = $("summary-card").outerHTML;
  const doc = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><title>خلاصهٔ مرحله</title></head>
  <body style="font-family:Tahoma;background:#F7F3EA">${card}</body></html>`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([doc], { type: "text/html" }));
  a.download = "kholase-marhale.html";
  a.click();
}

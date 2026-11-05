/* راهنمای زیارت — share
   کارت خلاصهٔ هر مرحله (کارت ۶)؛ بدون چاپ و دانلود. */
function summaryHTML(s, stepKey) {
  const irfani = (typeof LITERARY_SUMMARY !== "undefined" && stepKey && !s.pending) ? (LITERARY_SUMMARY[stepKey] || "") : "";
  const stepImg = (typeof STEP_IMAGES !== "undefined" && stepKey && STEP_IMAGES[stepKey]) ? `<img class="stepinfo" src="${STEP_IMAGES[stepKey]}" alt="اینفوگرافیک ${s.title}" loading="lazy">` : "";
  const extraImg = (typeof STEP_EXTRA_IMAGES !== "undefined" && stepKey && STEP_EXTRA_IMAGES[stepKey]) ? STEP_EXTRA_IMAGES[stepKey].map(src => `<img class="stepinfo" src="${src}" alt="اینفوگرافیک افزودهٔ ${s.title}" loading="lazy">` + ((typeof STEP_EXTRA_CREDITS !== "undefined" && STEP_EXTRA_CREDITS[src]) ? `<p class="photocredit">${STEP_EXTRA_CREDITS[src]}</p>` : "")).join("") : "";
  return `<div class="box"><h3>🖼 اینفوگرافیک کلی این مرحله</h3>
    <div class="summary-card" id="summary-card">
      <h3>${s.title}</h3><p>${s.place}</p>${stepImg}${extraImg}<p><b>${s.action}</b></p>
      ${irfani ? `<p class="irfani">${irfani}</p>` : ""}
      <ol style="text-align:right">${s.steps.map(t => `<li>${t}</li>`).join("")}</ol>
      <p class="small">${s.source}</p><p class="small">راهنمای زایرین عمار غزنه — زائر افغانستانی</p>
    </div></div>`;
}

/* راهنمای زیارت — checklist
   چک‌لیست وسایل پیش از سفر: تیک‌زدنی، فقط در گوشی زائر می‌ماند.
   بخش برجستهٔ بالا «پیش از عزیمت از خانه» است؛ «شماره تلفن هتل‌های مقصد
   و راهنما» فقط یادآوری همراه‌داشتن است و هیچ شمارهٔ واقعی در اپ نیست.
   موارد گروه «موارد مشابه» جدا و با برچسب روشن مشخص‌اند. */
const CHECKLIST_GROUPS = [
  { id: "home", warn: true, title: "پیش از عزیمت از خانه", note: "پیش از راه‌افتادن، همین‌ها را در خانه بررسی کن",
    items: [
      { id: "passport", text: "گذرنامه" },
      { id: "visa", text: "ویزا" },
      { id: "ticket", text: "بلیت" }
    ] },
  { id: "health", title: "سلامت", items: [
      { id: "meds", text: "داروهای مهم" },
      { id: "sunscreen", text: "ضد آفتاب" }
    ] },
  { id: "power", title: "برق و ارتباط", items: [
      { id: "powerbank", text: "پاوربانک" },
      { id: "charger", text: "شارژر" },
      { id: "hotelphones", text: "شماره تلفن هتل‌های مقصد و راهنما — همراهت باشد" }
    ] },
  { id: "clothing", title: "پوشاک و شخصی", items: [
      { id: "slippers", text: "دمپایی" },
      { id: "personal", text: "وسایل شخصی" },
      { id: "perfume", text: "عطر" }
    ] },
  { id: "worship", title: "عبادی", items: [
      { id: "tasbih", text: "تسبیح و مهر" }
    ] },
  { id: "similar", title: "موارد مشابه", note: "موارد مشابه بدیهی", items: [
      { id: "docs", text: "مدارک سفر" },
      { id: "money", text: "پول/کارت" },
      { id: "clothes", text: "لباس مناسب سفر" }
    ] }
];
function getChecked() {
  const v = store.get("zg-checklist", []);
  return Array.isArray(v) ? v : [];
}
function renderChecklist() {
  const checked = getChecked();
  let total = 0, done = 0, html = "";
  CHECKLIST_GROUPS.forEach(gr => {
    html += `<div class="box check-group${gr.warn ? " check-warn" : ""}"><h3>${gr.warn ? "⚠ " : ""}${gr.title}</h3>` +
      (gr.note ? `<p class="small">${gr.note}</p>` : "");
    gr.items.forEach(it => {
      total++;
      const on = checked.includes(it.id);
      if (on) done++;
      html += `<label class="check-item${on ? " done" : ""}"><input type="checkbox"${on ? " checked" : ""} onchange="toggleCheck('${it.id}')"> ${it.text}</label>`;
    });
    html += `</div>`;
  });
  $("checklist-body").innerHTML = html;
  $("checklist-progress").style.width = (total ? Math.round(done * 100 / total) : 0) + "%";
  $("checklist-progress-text").textContent = done > 0 ? `${fa(done)} از ${fa(total)} مورد آماده شد` : `${fa(total)} مورد در پیش است`;
}
function toggleCheck(id) {
  let c = getChecked();
  c = c.includes(id) ? c.filter(x => x !== id) : [...c, id];
  store.set("zg-checklist", c);
  renderChecklist();
}
function resetChecklist() {
  if (!confirm("همهٔ تیک‌های چک‌لیست پاک شود؟")) return;
  store.set("zg-checklist", []);
  renderChecklist();
}
function openChecklist() { renderChecklist(); go("checklist"); }

/* راهنمای زیارت — diary
   خاطره و عکس: فقط در تلفن خود زائر می‌ماند؛ با دکمهٔ اشتراک‌گذاری قابل ارسال است. */
function memoryHTML() {
  return `<div class="box mem"><h3>۵. 📝 خاطرهٔ شخصی و عکس در این مکان</h3>
    <textarea id="mem-text" placeholder="خاطره‌ات را اینجا بنویس..."></textarea>
    <input type="file" id="mem-photo" accept="image/*" style="margin-top:8px">
    <button class="btn small gold" style="margin-top:8px" onclick="saveMemory()">ثبت در کتابچهٔ خاطرات</button>
    <p class="small">خاطره و عکس فقط در تلفن خودت می‌ماند و با دکمهٔ اشتراک‌گذاری قابل ارسال است.</p></div>`;
}
function saveMemory() {
  const text = $("mem-text").value.trim();
  const file = $("mem-photo").files[0];
  const done = (photo) => {
    memories.push({ section: currentSection, step: currentStep, text, photo, date: new Date().toLocaleDateString("fa-IR") });
    store.set("zg-memories", memories);
    alert("در کتابچهٔ خاطرات ثبت شد ✅");
    $("mem-text").value = "";
  };
  if (!text && !file) { alert("اول خاطره یا عکس را وارد کن."); return; }
  if (!file) return done(null);
  const img = new Image();
  img.onload = () => {
    const c = document.createElement("canvas");
    const scale = Math.min(1, 800 / Math.max(img.width, img.height));
    c.width = img.width * scale; c.height = img.height * scale;
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    done(c.toDataURL("image/jpeg", 0.75));
  };
  img.src = URL.createObjectURL(file);
}
function renderBooklet() {
  const p = loadProfile();
  const lk = lastJourneyKey();
  const tn = lk ? journeyTitleFor(lk, p) : "";
  const coverTitle = tn ? `سفرنامهٔ ${esc(tn)}` : (fullName(p) ? `سفرنامهٔ ${esc(fullName(p))}` : "سفرنامهٔ من");
  const coverPhoto = p.photo ? `<img class="cover-photo" src="${p.photo}" alt="عکس زائر">` : motifSVG(120);
  let cover = `<div class="booklet-cover">${coverPhoto}<h2>📖 ${coverTitle}</h2>` +
    `<p class="small">${memories.length > 0 ? `${fa(memories.length)} خاطره در این سفرنامه است` : "هنوز خاطره‌ای در این سفرنامه نیست"}</p></div>`;
  if (!memories.length) { $("booklet-list").innerHTML = cover + `<p>هنوز خاطره‌ای ثبت نشده است.</p>`; return; }
  $("booklet-list").innerHTML = cover + (() => {
    const names = niyabaNames(p);
    return names.length ? `<p class="small" style="text-align:center">🕊 به نیابت از: ${names.map(esc).join("، ")}</p>` : "";
  })() + memories.map((m, i) => {
    const sec = SECTIONS[m.section];
    const s = sec ? sec.steps.find(x => x.id === m.step) : null;
    return `<div class="box"><h3>${sec ? sec.title : ""} — ${s ? s.title : "مرحله"} — ${m.date}</h3>
      <p>${m.text || ""}</p>
      ${m.photo ? `<img class="booklet-photo" src="${m.photo}" alt="عکس خاطره">` : ""}
      <button class="btn small gold" onclick="shareMemory(${i})">اشتراک‌گذاری</button></div>`;
  }).join("");
}
async function shareMemory(i) {
  const m = memories[i];
  const sec = SECTIONS[m.section];
  const s = sec ? sec.steps.find(x => x.id === m.step) : null;
  const text = `خاطره از ${sec ? sec.title : ""} — ${s ? s.title : ""}: ${m.text || ""}`;
  if (navigator.share) {
    try { await navigator.share({ title: "خاطرهٔ زیارت", text }); return; }
    catch (e) {}
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
  a.download = "khatere.txt";
  a.click();
}

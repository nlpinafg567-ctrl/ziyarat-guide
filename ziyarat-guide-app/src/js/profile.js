/* راهنمای زیارت — profile
   شخصی‌سازی: نام و مشخصات، نیابت زیارت (گذشتگان/زندگان)، حاجات، عکس.
   همه‌چیز فقط در حافظهٔ محلی گوشی (localStorage) می‌ماند؛ هیچ تابعی در
   این فایل چیزی به سرور نمی‌فرستد. متن‌های کاربر پیش از رندر escape می‌شوند. */
const HAJAT_FIXED = "دعا برای سلامتی و تعجیل فرج مولا جان";
const PRIVACY_LINE = "این اطلاعات فقط در گوشی خودت می‌ماند و به هیچ سروری فرستاده نمی‌شود";

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function cleanName(s) { return String(s || "").trim().slice(0, 60); }
function defaultProfile() {
  return { name: "", family: "", gender: "", city: "", caravan: "", photo: null,
           showPhotoOnCard: false, niyabaPast: [], niyabaAlive: [], hajat: [], introduced: false,
           travelDate: "" };
}
function loadProfile() {
  const p = store.get("zg-profile", null);
  if (!p || typeof p !== "object") return defaultProfile();
  const d = defaultProfile();
  ["name", "family", "gender", "city", "caravan", "travelDate"].forEach(k => { if (typeof p[k] === "string") d[k] = p[k]; });
  if (typeof p.photo === "string" && p.photo.startsWith("data:image")) d.photo = p.photo;
  if (p.showPhotoOnCard === true) d.showPhotoOnCard = true;
  ["niyabaPast", "niyabaAlive", "hajat"].forEach(k => {
    if (Array.isArray(p[k])) d[k] = p[k].filter(x => typeof x === "string").map(cleanName).filter(Boolean).slice(0, 30);
  });
  if (p.introduced === true) d.introduced = true;
  return d;
}
function saveProfileData(p) { store.set("zg-profile", p); }

/* ---------- خطاب و سلام ---------- */
function addressTitle(p) {
  if (p.gender === "خانم" && p.family) return "خانم " + p.family;
  if (p.gender === "آقا" && p.family) return "آقای " + p.family;
  return "";
}
function fullName(p) { return [p.name, p.family].map(s => (s || "").trim()).filter(Boolean).join(" "); }
function greetText(p) {
  const lk = lastJourneyKey();
  const tn = lk ? journeyTitleFor(lk, p) : "";
  if (tn) return tn + " عزیز! قدم‌به‌قدم همراهت هستیم.";
  const t = addressTitle(p);
  if (t) return t + " عزیز! قدم‌به‌قدم همراهت هستیم.";
  if (p.name) return p.name + " عزیز! قدم‌به‌قدم همراهت هستیم.";
  return "زائر گرامی! قدم‌به‌قدم همراهت هستیم.";
}
function avatarHTML(p, cls) {
  if (!p.photo) return "";
  return `<img class="${cls || "avatar"}" src="${p.photo}" alt="عکس زائر">`;
}
function motifSVG(size) {
  const s = size || 120, c = s / 2, r = s * 0.30;
  let petals = "";
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const x = c + Math.cos(a) * r * 0.95, y = c + Math.sin(a) * r * 0.95;
    petals += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(r * 0.62).toFixed(1)}" ry="${(r * 0.34).toFixed(1)}" transform="rotate(${(i * 45)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="#C5A46D" opacity="0.9"/>`;
  }
  return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="نگارهٔ هنری">${petals}<circle cx="${c}" cy="${c}" r="${(r * 0.42).toFixed(1)}" fill="#0D3B2E"/><circle cx="${c}" cy="${c}" r="${(r * 0.20).toFixed(1)}" fill="#e8cf9a"/></svg>`;
}
/* عکس روی کارتِ قابل‌نشان‌دادن: آقا → عکس؛ خانم → فقط با گزینهٔ صریح؛ بی‌انتخاب → نگاره */
function cardPhoto(p) {
  if (!p.photo) return null;
  if (p.gender === "آقا") return p.photo;
  if (p.gender === "خانم" && p.showPhotoOnCard) return p.photo;
  return null;
}

/* ---------- نیابت و حاجات ---------- */
function niyabaNames(p) { return [...(p.niyabaPast || []), ...(p.niyabaAlive || [])]; }
function niyabaReminderHTML() {
  const names = niyabaNames(loadProfile());
  if (!names.length) return "";
  const shown = names.slice(0, 3).map(esc).join("، ");
  const more = names.length > 3 ? ` و ${fa(names.length - 3)} نفر دیگر` : "";
  return `<div class="box niyaba"><p>🕊 به یاد ${shown}${more} نایب‌الزیاره‌ای؛ در این مکان برایشان دعا کن.</p></div>`;
}
function hajatHTML() {
  const p = loadProfile();
  let html = `<div class="box hajat"><h3>🤲 حاجات تو در این مرحله</h3>` +
    `<p class="hajat-fixed">✨ ${HAJAT_FIXED} <span class="tag">همیشه در رأس</span></p>`;
  p.hajat.forEach(h => { html += `<p>• ${esc(h)}</p>`; });
  html += `<p class="small">حاجاتت را از بخش «مشخصات و نیابت من» ویرایش کن.</p></div>`;
  return html;
}

/* ---------- صفحهٔ مشخصات ---------- */
let profileDraft = null;
let profileIntroMode = false;

function openProfile(intro) {
  profileDraft = loadProfile();
  profileIntroMode = !!intro;
  renderProfile();
  go("profile");
}
function syncDraftFromForm() {
  if (!profileDraft) return;
  const g = (id) => { const e = $(id); return e ? e.value : ""; };
  profileDraft.name = cleanName(g("pf-name"));
  profileDraft.family = cleanName(g("pf-family"));
  profileDraft.city = cleanName(g("pf-city"));
  profileDraft.caravan = cleanName(g("pf-caravan"));
  profileDraft.travelDate = g("pf-travel-date");
  const cb = $("pf-show-photo");
  if (cb) profileDraft.showPhotoOnCard = !!cb.checked;
}
function setProfileGender(v) {
  syncDraftFromForm();
  profileDraft.gender = (v === "خانم" || v === "آقا") ? v : "";
  renderProfile();
}
function chipsHTML(list, fn) {
  return list.map((n, i) => `<span class="chip">${esc(n)} <button class="chip-x" onclick="${fn}(${i})" aria-label="حذف">×</button></span>`).join("");
}
function renderProfile() {
  const p = profileDraft || loadProfile();
  const title = profileIntroMode ? "👋 آشنایی با زائر" : "👤 مشخصات و نیابت من";
  const sub = profileIntroMode
    ? "برای اینکه اپ خیلی شخصی شود، نام و مشخصاتت را بنویس. همهٔ فیلدها اختیاری‌اند؛ هر وقت خواستی از صفحهٔ اصلی ویرایششان کن."
    : "مشخصات، نیابت‌ها و حاجاتت را اینجا ویرایش کن.";
  let html = `<h3>${title}</h3><p>${sub}</p><p class="small privacy">🔒 ${PRIVACY_LINE}</p>`;
  html += `<div class="box"><h3>مشخصات</h3>` +
    `<label class="pf-label">نام<input class="pf-input" id="pf-name" value="${esc(p.name)}" placeholder="نام شما"></label>` +
    `<label class="pf-label">نام خانوادگی (تخلص)<input class="pf-input" id="pf-family" value="${esc(p.family)}" placeholder="تخلص شما"></label>` +
    `<label class="pf-label">خانم / آقا (اختیاری)<select class="pf-input" id="pf-gender" onchange="setProfileGender(this.value)">` +
    `<option value=""${p.gender === "" ? " selected" : ""}>— انتخاب کنید —</option>` +
    `<option value="خانم"${p.gender === "خانم" ? " selected" : ""}>خانم</option>` +
    `<option value="آقا"${p.gender === "آقا" ? " selected" : ""}>آقا</option></select></label>` +
    `<label class="pf-label">شهر (اختیاری)<input class="pf-input" id="pf-city" value="${esc(p.city)}" placeholder="مثلاً غزنی"></label>` +
    `<label class="pf-label">کاروان (اختیاری)<input class="pf-input" id="pf-caravan" value="${esc(p.caravan)}" placeholder="نام کاروان، اگر داری"></label>` +
    `<label class="pf-label">تاریخ سفر (اختیاری، برای شمارش معکوس در خانه)<input class="pf-input" id="pf-travel-date" type="date" value="${esc(p.travelDate || "")}"></label>`;
  html += `<div class="pf-photo-row">${p.photo ? `<img class="pf-photo" src="${p.photo}" alt="عکس زائر">` : `<div class="pf-photo-empty">📷 هنوز عکسی نیست</div>`}` +
    `<div><label class="btn small gold file-btn">📷 عکس گرفتن<input type="file" accept="image/*" capture="user" onchange="handlePhotoFile(this)" hidden></label> ` +
    `<label class="btn small gold file-btn">🖼 انتخاب از گالری<input type="file" accept="image/*" onchange="handlePhotoFile(this)" hidden></label>` +
    (p.photo ? ` <button class="btn small" onclick="removePhoto()">حذف عکس</button>` : "") +
    `<p class="small">عکس فقط در گوشی خودت می‌ماند و روی کارت زائر می‌آید.</p></div></div>`;
  if (p.gender === "خانم") {
    html += `<label class="pf-check"><input type="checkbox" id="pf-show-photo"${p.showPhotoOnCard ? " checked" : ""}> عکسم روی کارت باشد (در غیر این صورت، روی کارتِ قابل‌نشان‌دادن نگارهٔ هنری می‌نشیند)</label>`;
  }
  html += `</div>`;
  html += `<div class="box"><h3>🕊 نیابت زیارت</h3><p class="small">نام کسانی را که از طرفشان نایب‌الزیاره می‌شوی بنویس؛ در طول سفر یادآوری‌شان می‌بینی.</p>` +
    `<label class="pf-label">گذشتگان<input class="pf-input" id="pf-niyaba-past-new" placeholder="نام، بعد دکمهٔ افزودن"></label>` +
    `<button class="btn small gold" onclick="addNiyaba('past')">＋ افزودن به گذشتگان</button>` +
    `<div class="chips">${chipsHTML(p.niyabaPast, "removeNiyabaPast")}</div>` +
    `<label class="pf-label">زندگان<input class="pf-input" id="pf-niyaba-alive-new" placeholder="نام، بعد دکمهٔ افزودن"></label>` +
    `<button class="btn small gold" onclick="addNiyaba('alive')">＋ افزودن به زندگان</button>` +
    `<div class="chips">${chipsHTML(p.niyabaAlive, "removeNiyabaAlive")}</div></div>`;
  html += `<div class="box"><h3>🤲 حاجات من</h3>` +
    `<p class="hajat-fixed">✨ ${HAJAT_FIXED} <span class="tag">همیشه در رأس، غیرقابل حذف</span></p>` +
    `<label class="pf-label">حاجت تازه<input class="pf-input" id="pf-hajat-new" placeholder="حاجتت را بنویس"></label>` +
    `<button class="btn small gold" onclick="addHajat()">＋ افزودن حاجت</button>` +
    `<div class="chips">${chipsHTML(p.hajat, "removeHajat")}</div></div>`;
  html += `<button class="btn" onclick="saveProfileForm()">${profileIntroMode ? "شروع سفر من" : "ذخیرهٔ تغییرات"}</button> ` +
    `<button class="btn gold" onclick="openCardView()">🪪 مشاهدهٔ کارت شناسایی</button>`;
  if (profileIntroMode) html += ` <button class="btn small" onclick="skipProfile()">بعداً تکمیل می‌کنم</button>`;
  html += `<div class="box"><h3>💾 خروجی و ورودی با یک کد</h3><p class="small">پیشرفت و مشخصاتت را با یک کد سادهٔ JSON به گوشی دیگر ببر؛ کد فقط در گوشی خودت می‌ماند و به هیچ سروری فرستاده نمی‌شود.</p>` +
    `<button class="btn small gold" onclick="exportBackup()">ساختن کد خروجی</button>` +
    `<textarea class="pf-input" id="pf-export" rows="4" readonly placeholder="کد خروجی اینجا می‌آید؛ آن را کپی کن"></textarea>` +
    `<label class="pf-label">کد ورودی از گوشی دیگر<textarea class="pf-input" id="pf-import" rows="4" placeholder="کد را اینجا بچسبان"></textarea></label>` +
    `<button class="btn small gold" onclick="importBackup()">بازیابی از روی کد</button></div>`;
  html += `<div style="margin-top:21px"><button class="btn small danger" onclick="clearProfileData()">پاک کردن اطلاعات من</button>` +
    `<p class="small">پاک کردن، فقط مشخصات، نیابت‌ها و حاجات را پاک می‌کند؛ پیشرفت مرحله‌ها و خاطره‌ها سر جایشان می‌مانند.</p></div>`;
  $("profile-body").innerHTML = html;
}
function addNiyaba(kind) {
  syncDraftFromForm();
  const input = kind === "past" ? $("pf-niyaba-past-new") : $("pf-niyaba-alive-new");
  const v = cleanName(input ? input.value : "");
  if (!v) { alert("اول نام را بنویس."); return; }
  const list = kind === "past" ? profileDraft.niyabaPast : profileDraft.niyabaAlive;
  if (list.length >= 30) { alert("فهرست پر شده است."); return; }
  list.push(v);
  renderProfile();
}
function removeNiyabaPast(i) { syncDraftFromForm(); profileDraft.niyabaPast.splice(i, 1); renderProfile(); }
function removeNiyabaAlive(i) { syncDraftFromForm(); profileDraft.niyabaAlive.splice(i, 1); renderProfile(); }
function addHajat() {
  syncDraftFromForm();
  const input = $("pf-hajat-new");
  const v = cleanName(input ? input.value : "").slice(0, 100);
  if (!v) { alert("اول حاجت را بنویس."); return; }
  if (profileDraft.hajat.length >= 20) { alert("فهرست حاجات پر شده است."); return; }
  profileDraft.hajat.push(v);
  renderProfile();
}
function removeHajat(i) { syncDraftFromForm(); profileDraft.hajat.splice(i, 1); renderProfile(); }
function handlePhotoFile(input) {
  const file = input.files && input.files[0];
  input.value = "";
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    const c = document.createElement("canvas");
    const scale = Math.min(1, 800 / Math.max(img.width, img.height));
    c.width = Math.max(1, Math.round(img.width * scale));
    c.height = Math.max(1, Math.round(img.height * scale));
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    if (!profileDraft) profileDraft = loadProfile();
    profileDraft.photo = c.toDataURL("image/jpeg", 0.75);
    renderProfile();
  };
  img.onerror = () => alert("عکس خوانده نشد؛ دوباره امتحان کن.");
  img.src = URL.createObjectURL(file);
}
function removePhoto() {
  syncDraftFromForm();
  profileDraft.photo = null;
  renderProfile();
}
function saveProfileForm() {
  syncDraftFromForm();
  profileDraft.introduced = true;
  saveProfileData(profileDraft);
  renderHome();
  if (profileIntroMode) { enterHome(); }
  else back();
}
function skipProfile() {
  const p = loadProfile();
  p.introduced = true;
  saveProfileData(p);
  renderHome();
  enterHome();
}
function clearProfileData() {
  if (!confirm("همهٔ مشخصات، نیابت‌ها و حاجاتت پاک شود؟ پیشرفت مرحله‌ها و خاطره‌ها پاک نمی‌شوند.")) return;
  store.del("zg-profile");
  profileDraft = defaultProfile();
  renderProfile();
  renderHome();
}
function goStart() { go("welcome"); }
function enterApp() {
  if (loadProfile().introduced) enterHome();
  else openProfile(true);
}

/* ---------- شمارش معکوس سفر ---------- */
function countdownDays(target, today) {
  const t = (today || new Date().toISOString().slice(0, 10));
  const pd = (s) => { const p = String(s).split("-"); return Date.UTC(+p[0], +p[1] - 1, +p[2]); };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(target))) return null;
  return Math.round((pd(target) - pd(t)) / (24 * 60 * 60 * 1000));
}
function countdownHTML() {
  const p = loadProfile();
  if (!p.travelDate) return "";
  const d = countdownDays(p.travelDate);
  if (d === null) return "";
  if (d > 0) return `⏳ ${fa(d)} روز تا سفر`;
  if (d === 0) return "🎒 امروز روز سفر است";
  return "📅 تاریخ سفر گذشته است؛ تاریخ تازه را در مشخصات بزن";
}

/* ---------- خروجی و ورودی با کد JSON ساده ----------
   بدون base64 (در سندباکس آزمون Buffer نیست و در مرورگر هم لازم نیست)؛
   فقط JSON خوانا. ورودی فقط وقتی می‌نشیند که ساختارش درست باشد. */
function exportBackup() {
  const data = { profile: loadProfile(), titles: getJourneyCompletions() };
  /* بکاپ، پیشرفت مکه و مدینه را هم دارد تا بی‌صدا نیفتد. */
  ["umrah", "hajj", "atabat", "iran", "makka", "madina"].forEach(k => { data[k] = getProgress(k); });
  const code = JSON.stringify(data);
  const el = $("pf-export");
  if (el) el.value = code;
  return code;
}
function importBackup() {
  const el = $("pf-import");
  const code = el ? el.value : "";
  let data;
  try { data = JSON.parse(code); } catch (e) { return false; }
  if (!data || typeof data !== "object" || !data.profile || typeof data.profile !== "object") return false;
  /* کدهای قدیمیِ بی‌مکه و مدینه هم تمیز وارد می‌شوند (undefined مجاز است). */
  const okProgress = ["umrah", "hajj", "atabat", "iran", "makka", "madina"].every(k =>
    data[k] === undefined || (Array.isArray(data[k]) && data[k].every(x => Number.isInteger(x))));
  if (!okProgress) return false;
  saveProfileData(Object.assign(defaultProfile(), data.profile));
  ["umrah", "hajj", "atabat", "iran", "makka", "madina"].forEach(k => {
    if (Array.isArray(data[k])) store.set(progressKey(k), data[k]);
  });
  if (data.titles && typeof data.titles === "object") store.set("zg-titles", data.titles);
  renderHome();
  return true;
}

/* ---------- عنوان بر اساس سفر ----------
   عنوان فقط وقتی داده می‌شود که همهٔ مرحله‌های آن بخش کامل شده باشد.
   مرد: کربلایی / حاجی / مشهدی؛ زن: کربلاییه خانم / حاجیه خانم / مشهدیه خانم.
   «حاجیه خانم» صورت درست ادبی است، نه «حاجی خانم». اگر جنسیت انتخاب نشده
   باشد، پیش‌فرض خنثی «زائر» می‌آید، نه صورت مردانه. زمان تکمیل هر بخش در
   zg-titles ذخیره می‌شود تا «آخرین سفر کامل‌شده» مشخص باشد.
   C11: اعطای خودکار عنوان مشهدی/مشهدیه تا تأیید مالک متوقف است؛ برای
   ایران و سوریه فقط نام خنثی برمی‌گردد (ورودی JOURNEY_TITLES سر جایش می‌ماند تا
   با یک خط برگردد). */
const JOURNEY_TITLES = {
  atabat: { m: "کربلایی", f: "کربلاییه خانم" },
  umrah:  { m: "حاجی", f: "حاجیه خانم" },
  hajj:   { m: "حاجی", f: "حاجیه خانم" },
  iran:   { m: "مشهدی", f: "مشهدیه خانم" }
};
function isSectionComplete(key) {
  if (typeof SECTIONS === "undefined" || !SECTIONS[key]) return false;
  const steps = SECTIONS[key].steps;
  return steps.length > 0 && getProgress(key).length >= steps.length;
}
function getJourneyCompletions() {
  const v = store.get("zg-titles", {});
  return v && typeof v === "object" ? v : {};
}
function recordJourneyCompletion(key) {
  if (!isSectionComplete(key)) return;
  const t = getJourneyCompletions();
  if (!t[key]) { t[key] = Date.now(); store.set("zg-titles", t); }
}
function backfillJourneyCompletions() {
  if (typeof SECTIONS === "undefined") return;
  const t = getJourneyCompletions();
  let changed = false;
  Object.keys(SECTIONS).forEach(k => {
    if (isSectionComplete(k) && !t[k]) { t[k] = Date.now(); changed = true; }
  });
  if (changed) store.set("zg-titles", t);
}
function lastJourneyKey() {
  backfillJourneyCompletions();
  const t = getJourneyCompletions();
  let best = null, bestTs = -1;
  Object.entries(t).forEach(([k, ts]) => { if (ts > bestTs) { bestTs = ts; best = k; } });
  return best;
}
function journeyTitleFor(key, p) {
  if (!key) return "";
  /* C11: برای ایران و سوریه عنوان اعطا نمی‌شود؛ فقط نام خنثی (تا تصمیم مالک). */
  if (key === "iran" || key === "syria") return fullName(p);
  if (!JOURNEY_TITLES[key]) return "";
  const nm = fullName(p);
  if (p.gender === "خانم") {
    const base = JOURNEY_TITLES[key].f;
    return p.family ? base + " " + p.family : (nm ? base + " " + nm : base);
  }
  if (p.gender === "آقا") {
    const base = JOURNEY_TITLES[key].m;
    return nm ? base + " " + nm : base;
  }
  return nm ? "زائر " + nm : "زائر";
}
function cardTitleName(model, p) {
  return isSectionComplete(model) ? journeyTitleFor(model, p) : fullName(p);
}

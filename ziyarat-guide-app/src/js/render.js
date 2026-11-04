/* راهنمای زیارت — render
   رندر صفحه‌ها و مرحله‌ها. رفتار عیناً مثل قبل است:
   قفل مرحله‌ها، تیک اتمام → بازگشت + باز شدن مرحلهٔ بعد، بازگشت یک صفحه.
   تنها تفاوت نسبت به نسخهٔ تخت، جلوه‌های بصری است (آیکون SVG، صحنه، نوار پیشرفت)
   و آکاردئون کارت‌های فرعی صفحهٔ مرحله (بسته، تک‌باز). */
const SECTIONS = {
  umrah:  { title: "حج عمره",      icon: SECTION_ICONS.umrah, steps: UMRAH_STEPS },
  hajj:   { title: "حج تمتع",      icon: SECTION_ICONS.hajj,  steps: HAJJ_STEPS },
  atabat: { title: "عتبات عالیات", icon: SECTION_ICONS.atabat, steps: ATABAT_STEPS },
  iran:   { title: "زیارات ایران", icon: SECTION_ICONS.iran, steps: IRAN_STEPS }
};

/* گزارش‌های فیسبوکیِ سطح بخش (نشانی‌ها عیناً از مالک).
   گزارش «نجف تا جمکران» هم زیر مکان نجف (در دادهٔ عتبات) و هم اینجا،
   در نمای بخش ایران، می‌نشیند؛ چون صفحهٔ اختصاصی جمکران در اپ نیست. */
const SECTION_REPORTS = {
  umrah: [
    { title: "آغاز کاروان سوم حج عمره", url: "https://facebook.com/100006072485713/posts/pfbid035rRX8tTefKaPKG1cdDbR3wrRcPfYgiQgXHqrsvUTWD71wt35G9zq8qHgCC6HApWQl/" },
    { title: "ثبت‌نام کاروان‌های زیارت بیت‌الله شریف", url: "https://facebook.com/100006072485713/posts/pfbid02mn7fbUm1EyYZLVUfAHnU16hb8QTo6iH6P9MwFeKRBjU2pCHVFicAHZTVME56CPSZl/" },
    { title: "اطلاعیهٔ کاروان حج عمره؛ تکت‌های پرواز ۱۱ نوامبر", url: "https://facebook.com/100006072485713/posts/pfbid0ogdu2ZozLyuoLku33aCHEFZibwSEybhdPrh4WQUZAGGn7kuUppPvBmtKRsAFSJrPl/" },
    { title: "فرصت زیارت حج عمره", url: "https://facebook.com/100006072485713/posts/pfbid025ZVnGhNkCD9GcMHq1J4xFzAhLViAoAeRpNtpE2JitWL11TMFMepEf1kbSLW9UBy7l/" },
    { title: "سفر حج عمره با شرکت عمار غزنه", url: "https://facebook.com/100006072485713/posts/pfbid02eV32cLv6jhY247xff2y7WGwHQVmmWaSiXoiRrCiQeLGf5GF4ghMQx4XddEEB8mtXl/" }
  ],
  iran: [
    { title: "سفر نه‌روزهٔ کاروان عمار غزنه به عتبات عالیات؛ از نجف به جمکران", url: "https://facebook.com/100006072485713/posts/pfbid02RkEFwJ8kKJ4jdZh7E8SS8YtAi7o1f5FQ5eRHPmWdQfscx17UUx673mPDqHKFhKsel/" }
  ]
};

/* ---------- صفحهٔ اصلی ---------- */
function renderHome() {
  const p = loadProfile();
  $("home-greet-wrap").innerHTML = avatarHTML(p) + `<p>${greetText(p)}</p>`;
  $("home-cards").innerHTML = Object.entries(SECTIONS).map(([key, sec]) => {
    const done = getProgress(key).length;
    const total = sec.steps.length;
    const sub = done === total && total > 0 ? "✅ همهٔ مرحله‌ها تمام شد" : (done > 0 ? `${fa(done)} از ${fa(total)} مرحله تمام شده` : sec.title === "حج عمره" ? "عمرهٔ مفرده، قدم‌به‌قدم" : "");
    return `<button class="zcard" onclick="openSection('${key}')">
      <div class="icon">${sec.icon}</div>
      <div><b>${sec.title}</b><span>${sub}</span></div></button>`;
  }).join("");
}
function openSection(key) {
  currentSection = key;
  $("section-title").textContent = SECTIONS[key].title;
  renderSection();
  go("section");
}
function renderSection() {
  const key = currentSection, sec = SECTIONS[key], cur = currentId(key);
  const done = getProgress(key).length, total = sec.steps.length;
  if (done === total && total > 0) {
    const p = loadProfile();
    const tn = journeyTitleFor(key, p);
    const photo = p.photo ? `<img class="cover-photo" src="${p.photo}" alt="عکس زائر">` : motifSVG(96);
    $("section-congrats").innerHTML = `<div class="box congrats">${photo}` +
      `<h3>🎉 ${tn ? "تبریک " + esc(tn) + "!" : "آفرین!"}</h3>` +
      `<p>بخش «${sec.title}» را کامل کردی؛ این سفر در کارنامهٔ زیارتی‌ات ثبت شد.</p></div>`;
  } else {
    $("section-congrats").innerHTML = "";
  }
  $("section-scene").innerHTML = sectionScene(key);
  $("section-progress").style.width = (total ? Math.round(done * 100 / total) : 0) + "%";
  $("section-progress-text").textContent = done > 0 ? `${fa(done)} از ${fa(total)} مرحله تمام شده` : `${fa(total)} مرحله در پیش است`;
  $("section-path").innerHTML = sec.steps.map(s => {
    const st = isDone(key, s.id) ? "done" : (s.id === cur ? "current" : "locked");
    const mark = isDone(key, s.id) ? "✓" : (s.id === cur ? "◉" : "🔒");
    return `<button class="node ${st}" ${st === "locked" ? "disabled" : ""} onclick="openStep(${s.id})">
      <span class="num">${fa(s.id)}</span>
      <span><b>${mark} ${s.title}</b><span>${s.place}</span></span></button>`;
  }).join("");
  $("section-list").innerHTML = sec.steps.map(s => {
    const st = isDone(key, s.id) ? "done" : (s.id === cur ? "current" : "locked");
    const mark = isDone(key, s.id) ? "✓ تکمیل شده" : (s.id === cur ? "در حال انجام" : "🔒 هنوز فعال نیست");
    return `<button class="stepcard ${st}" ${st === "locked" ? "disabled" : ""} onclick="openStep(${s.id})">
      <span class="st">${fa(s.id)}</span><span><b>${s.title}</b><span>${mark} — ${s.place}</span></span></button>`;
  }).join("");
  $("section-reports").innerHTML = sectionReportsHTML(key);
}

/* ---------- جزئیات مرحله ---------- */
function openStep(id) {
  const key = currentSection;
  if (!isUnlocked(key, id)) return;
  currentStep = id;
  counter = 0;
  const s = SECTIONS[key].steps.find(x => x.id === id);
  let html = `<div class="stepbanner">${fa(s.id)}. ${s.title}</div>`;
  html += `<p class="small">📍 ${s.place}</p>`;
  html += `<div class="box"><h3>تو چه باید بکنی؟</h3><p><b>${s.action}</b></p><ol>`;
  s.steps.forEach(t => html += `<li>${t}</li>`);
  html += `</ol><p><b>چرا؟</b> ${s.reason}</p></div>`;
  if (s.duas.length) {
    html += `<div class="box gold"><h3>مراحل عبادی و ادعیهٔ این مرحله</h3>`;
    s.duas.forEach(d => html += `<p><b>${d.title}</b><br><span class="small">${d.note}</span></p>`);
    html += `<p class="small">📖 منبع: ${s.source}</p></div>`;
    html += hajatHTML();
  } else {
    html += `<div class="box"><h3>منبع</h3><p class="small">📖 ${s.source}</p></div>`;
  }
  html += driveHTML(key);
  html += niyabaReminderHTML();
  html += toursHTML(s);
  html += infographicHTML(key, s);
  html += reportsHTML(s);
  html += toolHTML(s);
  html += `<div class="quiz" id="quizbox"><h3>خودت را بسنج</h3><p>${s.quiz.q}</p>
    <button class="btn small gold" onclick="document.getElementById('quizbox').classList.toggle('open')">دیدن جواب</button>
    <p class="answer">✅ ${s.quiz.a}</p></div>`;
  html += memoryHTML();
  html += summaryHTML(s);
  html += `<button class="btn" onclick="completeStep()">✓ این مرحلهٔ زیارتی را به اتمام رساندم</button>`;
  $("step-detail").innerHTML = html;
  accordifyStep();
  go("step");
}

/* ---------- آکاردئون کارت‌های فرعی صفحهٔ مرحله ----------
   بنر و بلوک اصلی «تو چه باید بکنی؟ / چرا؟» همیشه باز می‌مانند؛
   ۷ کارت فرعی بسته شروع می‌شوند و هر بار فقط یکی باز است؛
   زدن سربرگ کارت باز، همان را می‌بندد.
   در محیط آزمونِ بدون DOM واقعی، تابع بی‌صدا برمی‌گردد. */
const ACC_TITLES = [
  "مراحل عبادی و ادعیهٔ این مرحله",
  "📖 کتاب‌های این زیارت",
  "تورهای مجازی و پانوراما",
  "📣 گزارش‌های سفر",
  "خودت را بسنج",
  "📝 خاطرهٔ شخصی و عکس در این مکان",
  "🖼 اینفوگرافیک کلی این مرحله"
];
function accordifyStep() {
  const detail = $("step-detail");
  if (!detail.querySelectorAll) return;
  detail.querySelectorAll(".box, .quiz").forEach((card, i) => {
    const h = card.querySelector("h3");
    if (!h || !ACC_TITLES.includes(h.textContent.trim())) return;
    const label = h.textContent.trim();
    h.remove();
    const body = document.createElement("div");
    body.className = "acc-body";
    body.id = "acc-body-" + i;
    const inner = document.createElement("div");
    inner.className = "acc-inner";
    while (card.firstChild) inner.appendChild(card.firstChild);
    body.appendChild(inner);
    const head = document.createElement("button");
    head.type = "button";
    head.className = "acc-head";
    head.setAttribute("aria-expanded", "false");
    head.setAttribute("aria-controls", body.id);
    const lt = document.createElement("span");
    lt.textContent = label;
    const ar = document.createElement("span");
    ar.className = "acc-arrow";
    ar.textContent = "▾";
    head.appendChild(lt);
    head.appendChild(ar);
    head.addEventListener("click", () => {
      const wasOpen = card.classList.contains("acc-open");
      detail.querySelectorAll(".acc.acc-open").forEach(c => {
        c.classList.remove("acc-open");
        c.querySelector(".acc-head").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        card.classList.add("acc-open");
        head.setAttribute("aria-expanded", "true");
      }
    });
    card.classList.add("acc");
    card.appendChild(head);
    card.appendChild(body);
  });
}

/* ---------- تکمیل مرحله: بازگشت به فهرست + باز شدن مرحلهٔ بعد ---------- */
function completeStep() {
  const key = currentSection, id = currentStep;
  const p = getProgress(key);
  if (!p.includes(id)) { p.push(id); store.set(progressKey(key), p); }
  recordJourneyCompletion(key);
  counter = 0;
  back();
  renderSection();
}

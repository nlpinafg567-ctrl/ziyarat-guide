/* راهنمای زیارت — render
   رندر صفحه‌ها و مرحله‌ها. رفتار:
   خواندن آزاد همهٔ مرحله‌ها، تیک اتمام → بازگشت + ثبت پیشرفت، بازگشت یک صفحه.
   تنها تفاوت نسبت به نسخهٔ تخت، جلوه‌های بصری است (آیکون SVG، صحنه، نوار پیشرفت)
   و آکاردئون کارت‌های فرعی صفحهٔ مرحله (کارت اول باز، بقیه بسته و تک‌باز). */
const SECTIONS = {
  umrah:  { title: "عمرهٔ مفرده",   icon: SECTION_ICONS.umrah, steps: UMRAH_STEPS },
  hajj:   { title: "حج تمتع",      icon: SECTION_ICONS.hajj,  steps: HAJJ_STEPS },
  atabat: { title: "عتبات عالیات", icon: SECTION_ICONS.atabat, steps: ATABAT_STEPS },
  iran:   { title: "زیارات ایران", icon: SECTION_ICONS.iran, steps: IRAN_STEPS },
  /* فاز ۱ب: مکان‌های مکه و مدینه — بخش‌های شهری تازه، با کلید پیشرفت
     مستقل خودشان (zg-progress-makka / zg-progress-madina). آیکون،
     همان آیکون کعبهٔ عمره است (بدون تصویر تازه) و کارت «ادامهٔ سفر
     من» این دو بخش را نمی‌بیند تا رفتار چهار سفر موجود دست نخورد. */
  makka:  { title: "مکان‌های مکه",   icon: SECTION_ICONS.umrah, steps: MAKKA_STEPS },
  madina: { title: "مکان‌های مدینه", icon: SECTION_ICONS.umrah, steps: MADINA_STEPS }
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
function nextJourneyTarget() {
  for (const key of ["umrah", "hajj", "atabat", "iran"]) {
    const sec = SECTIONS[key];
    if (getProgress(key).length < sec.steps.length) {
      return { key, id: currentId(key) };
    }
  }
  return null;
}
function continueJourney() {
  const t = nextJourneyTarget();
  if (t) { openSection(t.key); openStep(t.id); }
}
function openSectionAndStep(key, id) { openSection(key); openStep(id); }
function renderHome() {
  const p = loadProfile();
  $("home-greet-wrap").innerHTML = avatarHTML(p) + `<p>${greetText(p)}</p>`;
  $("home-cards").innerHTML = Object.entries(COUNTRIES).map(([key, c]) =>
    `<button class="country-btn" onclick="openCountry('${key}')">
      <img class="country-flag" src="${c.flag}" alt="پرچم ${c.title}" loading="lazy">
      <div><b>${c.title}</b><span>${countrySub(key)}</span></div></button>`).join("");
  const t = nextJourneyTarget();
  const cd = countdownHTML();
  $("home-continue").innerHTML = (cd ? `<p class="countdown">${cd}</p>` : "") +
    (t ? `<button class="continue-card" onclick="continueJourney()">▶ ادامهٔ سفر من: ${SECTIONS[t.key].title} — مرحلهٔ ${fa(t.id)}</button>` : `<p class="small">🎉 هر چهار سفر اصلی کامل شده است.</p>`);
  /* ورود به خانه همیشه خلوت است: سطر «سایر بخش‌ها» بسته می‌شود. */
  const mx = $("home-more"), mb = $("home-more-btn");
  if (mx) mx.hidden = true;
  if (mb) { mb.textContent = "☰ سایر بخش‌ها ▾"; if (mb.setAttribute) mb.setAttribute("aria-expanded", "false"); }
}
/* سطر «سایر بخش‌ها» (۵ نوامبر ۲۰۲۶): خانه فقط چهار کشور را نشان می‌دهد؛
   بقیه در یک سطر جمع‌اند که با زدن باز و بسته می‌شود. */
function toggleHomeMore() {
  const box = $("home-more"), btn = $("home-more-btn");
  const willOpen = box.hidden !== false;
  box.hidden = !willOpen;
  btn.textContent = willOpen ? "☰ سایر بخش‌ها ▴" : "☰ سایر بخش‌ها ▾";
  if (btn.setAttribute) btn.setAttribute("aria-expanded", String(willOpen));
}
/* ---------- ناوبری کشوری (ساختار تازهٔ صفحهٔ اصلی) ----------
   خانه فقط چهار دکمهٔ کشوری دارد؛ هر کشور شهرهایش را نشان می‌دهد و
   هر شهر، مسیر مرحله‌وارِ فیلترشده از مرحله‌های موجود است — هیچ داده‌ای
   تکثیر نمی‌شود و کلید پیشرفت همان کلید بخش اصلی است (عتبات/ایران/
   عمره). شهر بی‌مرحله، صادقانه «به‌زودی» می‌ماند و مرحلهٔ ساختگی ندارد.
   نکتهٔ عراق: دادهٔ اپ سید محمد (ع) را «در سامرا» ثبت کرده و مرحله‌ای
   برای بلد ندارد؛ پس بلد دکمهٔ جدا ندارد تا مرحلهٔ ساختگی ساخته نشود. */
const COUNTRIES = {
  arabia: { title: "زیارات عربستان", flag: "assets/flags/saudi.svg" },
  iraq:   { title: "زیارات عراق",     flag: "assets/flags/iraq.svg" },
  syria:  { title: "زیارت سوریه",     flag: "assets/flags/syria.svg" },
  iran:   { title: "زیارات ایران",     flag: "assets/flags/iran.svg" }
};
function countrySub(key) {
  return key === "arabia" ? "مدینه و مکه؛ عمره و تمتع"
    : key === "iraq" ? "نجف، کوفه، کربلا، کاظمین، سامرا"
    : key === "syria" ? "دمشق و حلب — به‌زودی"
    : "مشهد، قم، شیراز، تهران";
}
const COUNTRY_CITIES = {
  iraq: [
    { id: "najaf",    title: "نجف",    section: "atabat", ids: [1] },
    { id: "kufa",     title: "کوفه",   section: "atabat", ids: [2] },
    { id: "karbala",  title: "کربلا",  section: "atabat", ids: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24] },
    { id: "kazimayn", title: "کاظمین", section: "atabat", ids: [21] },
    { id: "samarra",  title: "سامرا",  section: "atabat", ids: [22, 23] }
  ],
  iran: [
    { id: "mashhad", title: "مشهد مقدس", section: "iran", ids: [1] },
    { id: "qom",     title: "قم",         section: "iran", ids: [2, 5] },
    { id: "shiraz",  title: "شیراز",      section: "iran", ids: [3] },
    { id: "tehran",  title: "تهران",      section: "iran", ids: [4] }
  ],
  syria: [
    { id: "damascus", title: "دمشق", section: null, ids: [] },
    { id: "aleppo",   title: "حلب",  section: null, ids: [] }
  ],
  arabia: [
    /* فاز ۱ب: مدینه ۷ گرهٔ تازه دارد (کارت‌های ۳ تا ۹ اینفوگرافیک مدینه)؛
       مسجد النبی و بقیع (کارت‌های ۱ و ۲) تکثیر نشده‌اند و از بلوک صحنهٔ
       همین صفحه، با پیوند به umrah-2 در بخش عمره، در دسترس‌اند. */
    { id: "madina", title: "مدینه", section: "madina", ids: [1, 2, 3, 4, 5, 6, 7] },
    { id: "makka",  title: "مکه",   section: "makka",  ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] }
  ]
};
let currentCountry = null;
let currentCity = null;
function countryButtonsHTML(key) {
  if (key === "arabia") {
    return `<div class="country-group"><h3>مکان‌ها</h3>` +
      `<button class="place-btn" onclick="openCity('arabia','madina')">مدینه</button>` +
      `<button class="place-btn" onclick="openCity('arabia','makka')">مکه</button></div>` +
      `<div class="country-group"><h3>مناسک</h3>` +
      `<button class="ritual-btn" onclick="openSection('umrah')">عمره</button>` +
      `<button class="ritual-btn" onclick="openSection('hajj')">تمتع</button></div>`;
  }
  return `<div class="country-group">` + COUNTRY_CITIES[key].map(c => {
    const sub = c.ids.length ? `${fa(c.ids.length)} مرحله` : "به‌زودی";
    return `<button class="city-btn" onclick="openCity('${key}','${c.id}')">${c.title}<span>${sub}</span></button>`;
  }).join("") + `</div>`;
}
function openCountry(key) {
  currentCountry = key;
  $("country-title").textContent = COUNTRIES[key].title;
  $("country-buttons").innerHTML = countryButtonsHTML(key);
  go("country");
}
function openCity(countryKey, cityId) {
  currentCountry = countryKey;
  currentCity = cityId;
  const city = COUNTRY_CITIES[countryKey].find(c => c.id === cityId);
  if (city && city.section) currentSection = city.section;
  renderCity();
  go("city");
}
function citySceneHTML(city) {
  /* S2: در صحنهٔ مدینه ارائهٔ تکراریِ اینفوگرافیک و تورهای umrah-2 حذف
     شد تا مقصد دو بار نشان داده نشود. محتوای متمایز مدینه (۷ گره)
     دست نخورده است. تفویض: جعبهٔ طلایی دوم برای مسجد شجره است —
     مقصدی دیگر (پوشش میقات در umrah-3)، نه مرحلهٔ تازه و نه تکثیر؛
     با مسجد شجرهٔ مکه خلط نمی‌شود. */
  if (city.id === "madina") {
    return `<div class="box gold"><h3>🕌 مسجد النبی و بقیع</h3>` +
      `<p class="small">مسجد النبی و بقیع در بخش عمره‌اند و اینجا تکثیر نشده‌اند:</p>` +
      `<button class="btn gold" onclick="openSectionAndStep('umrah',2)">مدینهٔ منوره و بقیع — در بخش عمره ↗</button></div>` +
      `<div class="box gold"><h3>🕌 مسجد شجره (ذوالحلیفه) — میقات مدینه</h3>` +
      `<p class="small">مسجد شجرهٔ مدینه، مسجد میقات ذوالحلیفه است؛ احرام از آن در مرحلهٔ میقات بخش عمره و چت‌بات اپ آمده است. این مسجد با مسجد شجرهٔ مکه یکی نیست و اینجا مرحلهٔ تازه‌ای ندارد.</p>` +
      `<button class="btn gold" onclick="openSectionAndStep('umrah',3)">میقات ذوالحلیفه (مسجد شجره) — در بخش عمره ↗</button></div>`;
  }
  if (city.id === "makka") {
    let links = `<li><a class="external" href="../ziyarat-infographics/makka-infographic.html" target="_blank" rel="noopener">نقشهٔ مکه — مسجدالحرام و کعبه</a></li>`;
    VIRTUAL_TOURS.mecca.forEach(t => { links += `<li><a class="external" href="${t.url}" target="_blank" rel="noopener">${t.title}<span class="ttype">${t.type || "تور"}</span></a></li>`; });
    return `<div class="box gold"><h3>🗺 نقشه و تورهای مکه</h3><p class="small">لینک بیرونی؛ با لمس، در مرورگر باز می‌شود:</p><ul>${links}</ul>` +
      `<p class="small">مرحله‌های مناسک (طواف، سعی و…) در بخش‌های عمره و تمتع هستند.</p></div>`;
  }
  if (!city.ids.length) {
    return `<div class="box"><h3>به‌زودی</h3><p>زیارت‌های ${city.title} هنوز به اپ افزوده نشده‌اند.</p></div>`;
  }
  return "";
}
function renderCity() {
  const city = COUNTRY_CITIES[currentCountry].find(c => c.id === currentCity);
  $("city-title").textContent = city.title;
  const sec = city.section ? SECTIONS[city.section] : null;
  const steps = sec ? city.ids.map(id => sec.steps.find(s => s.id === id)).filter(Boolean) : [];
  const done = city.section ? city.ids.filter(id => isDone(city.section, id)).length : 0;
  const total = steps.length;
  $("city-progress").style.width = (total ? Math.round(done * 100 / total) : 0) + "%";
  $("city-progress-text").textContent = total ? (done > 0 ? `${fa(done)} از ${fa(total)} مرحله تمام شده` : `${fa(total)} مرحله در پیش است`) : "";
  /* G2: زیرنویس یک‌سطره برای هر صفحهٔ شهری که شمارهٔ اولش ۱ نیست
     (کربلا ۳–۲۰ و ۲۴، سامرا ۲۲–۲۳، کوفه ۲، کاظمین ۲۱): شماره‌ها ترتیب کلی
     سفر عتبات‌اند؛ نجف (شروع از ۱) زیرنویس ندارد. */
  const nonFirst = city.section === "atabat" && city.ids.length > 0 && Math.min(...city.ids) !== 1;
  $("city-note").textContent = nonFirst ? "شماره‌ها براساس ترتیب کلی مراحل سفر عتبات است." : "";
  /* S1: در مکه و مدینه صحنه زیر مسیر می‌آید (مثل کربلا)؛ پس صحنه به
     تهِ مسیر افزوده می‌شود و جایگاه صحنه خالی می‌ماند.
     G1: خط نقطه‌چین مسیر فقط دور گره‌هاست — گره‌ها در .path خودشان
     پیچیده می‌شوند تا خط در آخرین گره تمام شود، نه در پدینگ تهِ
     مسیر یا جعبه‌های صحنه ادامه یابد. */
  const scene = citySceneHTML(city);
  const nodes = steps.map(s => stageNodeHTML(city.section, s, currentId(city.section))).join("");
  const path = nodes ? `<div class="path">${nodes}</div>` : "";
  if (city.id === "makka" || city.id === "madina") {
    $("city-path").innerHTML = path + scene;
    $("city-scene").innerHTML = "";
  } else {
    $("city-path").innerHTML = path;
    $("city-scene").innerHTML = scene;
  }
}
function openSection(key) {
  currentSection = key;
  $("section-title").textContent = SECTIONS[key].title;
  renderSection();
  go("section");
}
/* ---------- مسیر بخش: گرهٔ مرحله + گروه‌بندی شهرهای عتبات ----------
   مورد ۲۱ بستهٔ ۴ نوامبر: نمای عتبات اول آیکون شهرها را نشان می‌دهد
   (نجف و کوفه با هم، کربلا، کاظمین، سامرا) و با زدن هر شهر، مقام‌های
   همان شهر مرحله‌وار می‌آیند. همهٔ گره‌ها در DOM می‌مانند (شهرهای بسته
   با CSS پنهان‌اند) تا شمارش و ترتیب آزمون‌ها به‌هم نخورد؛ خواندن آزاد
   است و فقط نما گروه‌بندی شده است. */
let expandedCity = null;
function stageNodeHTML(key, s, cur) {
  /* خواندن آزاد: گره‌ها سه حالت دارند — تمام‌شده، جاری (نخستین ناتمام)،
     باز (قابل خواندن، نه قفل). هیچ گرهی disabled نیست. حالت فقط از
     رنگ دایرهٔ شماره خوانده می‌شود (سبز = تمام‌شده، طلایی = جاری)؛
     نشانهٔ ○/◉ و زیرنویس تکراری مکان حذف شده‌اند. */
  const st = isDone(key, s.id) ? "done" : (s.id === cur ? "current" : "open");
  return `<button class="node ${st}" onclick="openStep(${s.id})">
      <span class="num">${fa(s.id)}</span>
      <b>${s.title}</b></button>`;
}
function sectionPathHTML(key, sec, cur) {
  if (key !== "atabat" || typeof ATABAT_CITIES === "undefined") {
    return sec.steps.map(s => stageNodeHTML(key, s, cur)).join("");
  }
  const byId = new Map(sec.steps.map(s => [s.id, s]));
  let open = expandedCity;
  if (open === null || open === undefined || open < 0 || open >= ATABAT_CITIES.length) {
    open = ATABAT_CITIES.findIndex(c => c.ids.includes(cur));
    if (open < 0) open = 0;
  }
  return ATABAT_CITIES.map((c, i) => {
    const done = c.ids.filter(id => isDone(key, id)).length;
    const arrow = i === open ? "▴" : "▾";
    const nodes = c.ids.map(id => stageNodeHTML(key, byId.get(id), cur)).join("");
    return `<div class="citycard"><button class="cityhead" onclick="toggleCity(${i})">` +
      `<span><b>${c.title}</b><span>${fa(c.ids.length)} مقام، ${fa(done)} تمام شده</span></span>` +
      `<span class="cityarrow">${arrow}</span></button>` +
      `<div class="citybody${i === open ? " open" : ""}">${nodes}</div></div>`;
  }).join("");
}
function toggleCity(i) { expandedCity = i; renderSection(); }
function renderSection() {
  const key = currentSection, sec = SECTIONS[key], cur = currentId(key);
  const done = getProgress(key).length, total = sec.steps.length;
  if (done === total && total > 0) {
    const p = loadProfile();
    const tn = journeyTitleFor(key, p);
    const photo = p.photo ? `<img class="cover-photo" src="${p.photo}" alt="عکس زائر">` : motifSVG(96);
    /* C11: پیام خنثی تکمیل ایران، به‌جای عنوان مشهدی/مشهدیه. */
    const h3 = key === "iran" ? "زیارت ایران تکمیل شد" : (tn ? "تبریک " + esc(tn) + "!" : "آفرین!");
    $("section-congrats").innerHTML = `<div class="box congrats">${photo}` +
      `<h3>🎉 ${h3}</h3>` +
      `<p>بخش «${sec.title}» را کامل کردی؛ این سفر در کارنامهٔ زیارتی‌ات ثبت شد.</p></div>`;
  } else {
    $("section-congrats").innerHTML = "";
  }
  $("section-scene").innerHTML = (key === "hajj" ? `<div class="photobanner fullimg"><img src="assets/hajj-tamattu-hamshahri.jpg" alt="اینفوگرافیک مناسک حج" loading="lazy"><p class="photocredit">منبع تصویر: همشهری آنلاین</p></div><div class="photobanner fullimg"><img src="assets/hajj-tamattu-local.png" alt="اینفوگرافیک بومی مناسک حج تمتع، ۱۹ گام" loading="lazy"><p class="photocredit">اینفوگرافیک بومی عمار غزنه — خلاصهٔ آموزشی ۱۹ گام حج</p></div><div class="photobanner fullimg"><img src="assets/hajj-13-ammar.png" alt="اینفوگرافیک مناسک ۱۳گانهٔ حج" loading="lazy"><p class="photocredit">اینفوگرافیک عمار غزنه — با الهام از طرح تسنیم</p></div>` : key === "umrah" ? `<div class="photobanner fullimg"><img src="assets/umrah-steps-ammar.png" alt="اینفوگرافیک ۷ گام عمرهٔ مفرده" loading="lazy"><p class="photocredit">اینفوگرافیک عمار غزنه — ۷ عمل عمرهٔ مفرده</p></div>` : "") + sectionScene(key);
  if (key === "hajj") {
    $("section-scene").innerHTML += `<div class="box literary"><h3>حج، سفرِ بازگشت به مردم</h3><p>حج، سفری از خویشتن به سوی خداست، همراه با مردم؛ نه فقط انجام چند عمل. در احرام، لباس‌ها یکی می‌شود تا برابری دیده شود: فقط بنده است و پروردگار. گرد خانهٔ خدا، مردم یک مرکز را می‌گردند؛ در سعی، حضرت هاجر (س) یاد می‌دهد تلاش برای زندگی، خودِ عبادت است. مقام حضرت ابراهیم (ع)، زائر را می‌خواند که ابراهیم‌وار بزید و بایستد. عرفه شناخت است، منا آمادگیِ گذشتن از دلبستگی‌هاست، و قربانی، رها کردن دلبستگیِ خویش. حجِ بزرگ‌تر، آن‌جاست که زائر از خدمت به خویش، به خدمت به مردم بازمی‌گردد؛ با آگاهی و مسئولیت.</p></div>` +
      `<div class="box gold"><h3>چک‌لیست احکام اصلی حج تمتع (۱۳ عمل، نزد آیت‌الله العظمی سیستانی)</h3><p>۱ احرام از مکه (رکن) ۲ وقوف عرفات (رکن) ۳ وقوف مشعر (رکن) ۴ رمی عقبه ۵ قربانی ۶ حلق یا تقصیر ۷ طواف حج (رکن) ۸ نماز طواف ۹ سعی (رکن) ۱۰ طواف نساء ۱۱ نماز طواف نساء ۱۲ بیتوتهٔ منا در شب‌های ۱۱ و ۱۲ ۱۳ رمی سه‌گانه در روزهای ۱۱ و ۱۲.</p><p>ترتیب روز عید: رمی، قربانی، حلق یا تقصیر، طواف و نماز و سعی، طواف نساء، بازگشت به منا. زائر افغانستانی که فاصله‌اش بیش از ۸۸ کیلومتر است، وظیفه‌اش حج تمتع است.</p><p class="small">📖 منابع: مناسک حج آیت‌الله العظمی سیستانی و مناسک حج آیت‌الله العظمی فیاض و مناسک حج آیت‌الله العظمی محقق کابلی (رحمت الله علیه)؛ اختلاف‌های مشعر، رمی روز ۱۳ و حلق سال‌اولی در چت‌بات اپ آمده است.</p></div>`;
  }
  $("section-progress").style.width = (total ? Math.round(done * 100 / total) : 0) + "%";
  $("section-progress-text").textContent = done > 0 ? `${fa(done)} از ${fa(total)} مرحله تمام شده` : `${fa(total)} مرحله در پیش است`;
  $("section-path").innerHTML = sectionPathHTML(key, sec, cur);
  $("section-reports").innerHTML = sectionReportsHTML(key);
}

/* ---------- سربرگ جریان مرحله (قدم‌به‌قدم) ----------
   «مرحلهٔ X از Y» که X جایگاه مرحله در آرایهٔ steps همان بخش است
   (نه id±1 — ترتیب ایران ۱، ۲، ۵، ۳، ۴ است) و Y شمار کل مرحله‌های
   همان بخش. دکمه‌های قبل/بعد فقط جزئیات را در جای خود عوض می‌کنند
   (stepFlow پشته را دست نمی‌زند) تا بازگشت همچنان به صفحهٔ بخش/شهر
   برسد، نه به مرحلهٔ پیشین. مرحلهٔ اول دکمهٔ قبلِ غیرفعال و مرحلهٔ
   آخر دکمهٔ بعدِ غیرفعال دارد.
   C12: ترتیب سراسری بخش در قبل/بعد حفظ شده است (طراحی عمدی)؛ نام شهر
   از نگاشت شهرهای کشور (COUNTRY_CITIES — همان دادهٔ مسیر شهر) در سربرگ
   می‌آید («کربلا — مرحلهٔ ۳ از ۲۴») و هنگام عبور از شهر، در برچسب دکمهٔ
   قبل/بعد هم می‌آید؛ بخش‌های بی‌شهر (عمره/حج) بی‌تغییر می‌مانند. */
function stepCityName(key, stepId) {
  if (typeof COUNTRY_CITIES === "undefined") return "";
  for (const cities of Object.values(COUNTRY_CITIES)) {
    const c = cities.find(x => x.section === key && x.ids.includes(stepId));
    if (c) return c.title;
  }
  return "";
}
function stepFlowHTML(key, id) {
  const steps = SECTIONS[key].steps;
  const idx = steps.findIndex(s => s.id === id);
  const total = steps.length;
  const prev = idx > 0 ? steps[idx - 1] : null;
  const next = idx >= 0 && idx < total - 1 ? steps[idx + 1] : null;
  const city = stepCityName(key, id);
  const prevCity = prev ? stepCityName(key, prev.id) : "";
  const nextCity = next ? stepCityName(key, next.id) : "";
  const mid = city ? `${city} — مرحلهٔ ${fa(idx + 1)} از ${fa(total)}` : `مرحلهٔ ${fa(idx + 1)} از ${fa(total)}`;
  const prevLabel = (prevCity && prevCity !== city) ? `→ مرحلهٔ قبل (${prevCity})` : "→ مرحلهٔ قبل";
  const nextLabel = (nextCity && nextCity !== city) ? `مرحلهٔ بعد (${nextCity}) ←` : "مرحلهٔ بعد ←";
  return `<div class="stepflow">` +
    `<button class="stepflow-btn" type="button" ${prev ? `onclick="stepFlow(${prev.id})"` : "disabled"} aria-label="مرحلهٔ قبل">${prevLabel}</button>` +
    `<div class="stepflow-mid"><b>${mid}</b></div>` +
    `<button class="stepflow-btn" type="button" ${next ? `onclick="stepFlow(${next.id})"` : "disabled"} aria-label="مرحلهٔ بعد">${nextLabel}</button>` +
    `</div>`;
}
/* جایگزینی درجا (بدون go): پشته دست‌نخورده می‌ماند. */
function stepFlow(id) {
  renderStepDetail(id);
  window.scrollTo(0, 0);
}
function openStep(id) {
  renderStepDetail(id);
  go("step");
}
function renderStepDetail(id) {
  const key = currentSection;
  currentStep = id;
  counter = 0;
  const s = SECTIONS[key].steps.find(x => x.id === id);
  let html = stepFlowHTML(key, id);
  html += `<div class="stepbanner">${fa(s.id)}. ${s.title}</div>`;
  if (typeof BANNERS !== "undefined" && BANNERS[key + "-" + s.id]) {
    const bc = (typeof BANNER_CREDITS !== "undefined" && BANNER_CREDITS[key + "-" + s.id]) || "عکس: ویکی‌مدیا کامانز";
    html += `<div class="photobanner"><img src="assets/banners/${BANNERS[key + "-" + s.id]}.jpg" alt="بنر عکسی این مرحلهٔ زیارتی" loading="lazy"><p class="photocredit">${bc}</p></div>`;
  }
  html += `<p class="small">📍 ${s.place}</p>`;
  /* C6: مرحلهٔ در انتظار تکمیل (مسجد حمزه مکه) برچسب وضعیت می‌گیرد و
     کارت‌های آزمونک و ادبی‌اش تا تکمیل محتوا نشان داده نمی‌شوند؛
     همان الگوی کارت‌های مشروط (مرحلهٔ بی‌تور کارت تور ندارد). */
  if (s.pending) html += `<div class="box gold"><p><b>⏳ در انتظار تکمیل اطلاعات مستند</b></p></div>`;
  if (typeof LITERARY_INTRO !== "undefined" && LITERARY_INTRO[key + "-" + s.id] && !s.pending) {
    html += `<div class="box literary"><p>${LITERARY_INTRO[key + "-" + s.id]}</p></div>`;
  }
  html += `<div class="box"><h3>تو چه باید بکنی؟</h3><p><b>${s.action}</b></p><ol>`;
  s.steps.forEach(t => html += `<li>${t}</li>`);
  html += `</ol><p><b>چرا؟</b> ${s.reason}</p></div>`;
  if (key === "umrah" && id === 3) html += `<div class="box gold"><h3>میقات‌های آغاز عمره</h3>
    <div class="miqat-chips"><span class="miqat-chip">ذوالحلیفه (مسجد شجره)</span><span class="miqat-chip">وادی عقیق</span><span class="miqat-chip">جحفه (امروز: رابغ)</span><span class="miqat-chip">یلملم</span><span class="miqat-chip">قرن المنازل</span></div>
    <div class="miqat-row"><b>راه هر میقات:</b> شجره راه مدینه؛ عقیق راه عراق و نجد؛ جحفه راه شام و مصر و مغرب؛ یلملم راه یمن؛ قرن المنازل راه طائف.</div>
    <div class="miqat-row"><b>عمرهٔ تمتع:</b> فقط از پنج میقات یا محاذات آن‌ها.</div>
    <div class="miqat-row"><b>عمرهٔ مفردهٔ ساکن مکه:</b> از ادنی‌الحل (مانند تنعیم).</div>
    <div class="miqat-row"><b>جده:</b> ساکن جده از خود جده محرم می‌شود؛ مسافرِ رسیده به جده فقط با نذر و در صورت احراز محاذات.</div>
    <p class="small">📖 منابع: مناسک حج آیت‌الله العظمی سیستانی و مناسک حج آیت‌الله العظمی فیاض؛ تفصیل در سند میقات‌های اپ. نظر آیت‌الله العظمی محقق کابلی (رحمت الله علیه) دربارهٔ شجره و جده در چت‌بات اپ آمده است.</p></div>`;
  if (s.duas.length) {
    html += `<div class="box gold"><h3>۱. مراحل عبادی و اعمال</h3>`;
    s.duas.forEach(d => {
      const ai = (typeof AMAL_LIST !== "undefined") ? AMAL_LIST.findIndex(x => x.title === d.title) : -1;
      /* یادداشت زیر هر مورد حذف شد؛ فقط یک خط منبع در پای کارت می‌ماند —
         جز موردهای بی‌پیوند که یادداشت‌شان خودِ ادعای صادقانه است
         («زیارت‌نامهٔ مستقل یافت نشد») و می‌ماند. */
      if (ai >= 0) html += `<p><a class="external" href="#" onclick="event.preventDefault();openAmal(${ai})">${d.title}</a></p>`;
      else html += `<p><b>${d.title}</b><br><span class="small">${d.note}</span></p>`;
    });
    html += `<p class="small">📖 منبع: ${s.source}</p></div>`;
  } else {
    html += `<div class="box"><h3>منبع</h3><p class="small">📖 ${s.source}</p></div>`;
  }
  html += niyabaReminderHTML();
  html += toursHTML(s);
  html += reportsHTML(s);
  html += toolHTML(s);
  const qs = Array.isArray(s.quiz) ? s.quiz : [s.quiz];
  if (!s.pending) html += `<div class="quiz"><h3>۴. خودت را بسنج</h3>` + qs.map((qq, i) =>
    `<div class="qitem"><p>${fa(i + 1)}. ${qq.q}</p>
    <button class="btn small gold" onclick="this.parentElement.classList.toggle('open')">دیدن جواب</button>
    <p class="answer">✅ ${qq.a}</p></div>`).join("") + `</div>`;
  html += memoryHTML();
  html += summaryHTML(s, key + "-" + s.id);
  /* S3: جعبهٔ اینفوگرافیک نقشه‌ای زیر کارت‌های شماره‌دار می‌آید و با
     آکاردئون جمع می‌شود، نه همیشه‌باز میان کارت‌های جمع‌شده. */
  html += infographicHTML(key, s);
  /* حاجات ته صفحهٔ مرحله است، نه میان کارت‌های شماره‌دار. */
  if (s.duas.length) html += hajatHTML();
  html += `<button class="btn finish" onclick="completeStep()">✓ این مرحلهٔ زیارتی را به اتمام رساندم</button>`;
  $("step-detail").innerHTML = html;
  accordifyStep();
}

/* ---------- آکاردئون کارت‌های فرعی صفحهٔ مرحله ----------
   بنر و بلوک اصلی «تو چه باید بکنی؟ / چرا؟» همیشه باز می‌مانند؛
   کارت‌های فرعی (شماره‌دار، اینفوگرافیک نقشه‌ای، حاجات، گذر ادبی)
   بسته شروع می‌شوند و هر بار فقط یکی باز است؛ زدن سربرگ کارت باز،
   همان را می‌بندد. کارت اول (عبادی و اعمال) پیش‌فرض باز است.
   در محیط آزمونِ بدون DOM واقعی، تابع بی‌صدا برمی‌گردد. */
const ACC_TITLES = [
  "۱. مراحل عبادی و اعمال",
  "۲. تورهای مجازی و پانوراما",
  "۳. 📣 گزارش‌های سفر",
  "۴. خودت را بسنج",
  "۵. 📝 خاطرهٔ شخصی و عکس در این مکان",
  "۶. 🖼 اینفوگرافیک کلی این مرحله",
  "🗺 اینفوگرافیک نقشه‌ای این مکان",
  "🤲 حاجات تو در این مرحله"
];
function accordifyStep() {
  const detail = $("step-detail");
  if (!detail.querySelectorAll) return;
  /* کارت اول (عبادی و اعمال) پیش‌فرض باز است؛ بقیه بسته و تک‌باز.
     گذر ادبی سربرگ ندارد و با برچسب «گذر ادبی» جمع می‌شود و هرگز
     کارتِ بازِ پیش‌فرض نیست. شمارهٔ نمایشی کارت‌های شماره‌دار، به
     ترتیب دیده‌شدن، از نو شماره می‌خورد (صفحهٔ بی‌تور/گزارش ۱،۲،۳،۴
     می‌خواند نه ۱،۴،۵،۶)؛ کارت‌های بی‌شماره شماره‌ای مصرف نمی‌کنند
     و هویت درونی کارت‌ها دست نمی‌خورد. */
  let firstAcc = true;
  let visibleNum = 0;
  detail.querySelectorAll(".box, .quiz").forEach((card, i) => {
    const h = card.querySelector("h3");
    let label = null;
    if (h && ACC_TITLES.includes(h.textContent.trim())) { label = h.textContent.trim(); h.remove(); }
    else if (card.classList.contains("literary")) { label = "گذر ادبی"; }
    else return;
    const m = label.match(/^([۰-۹]+)\.\s*(.*)$/);
    const shown = m ? (fa(++visibleNum) + ". " + m[2]) : label;
    const openByDefault = firstAcc && !card.classList.contains("literary");
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
    head.setAttribute("aria-expanded", openByDefault ? "true" : "false");
    head.setAttribute("aria-controls", body.id);
    const lt = document.createElement("span");
    lt.textContent = shown;
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
    if (openByDefault) { card.classList.add("acc-open"); firstAcc = false; }
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
  /* بازگشت از مرحلهٔ شهری به صفحهٔ شهر می‌رسد؛ همان را تازه کن تا
     تیک اتمام همان‌جا دیده شود. بازگشت به بخش، مثل پیش رندر بخش است. */
  if (stack[stack.length - 1] === "city") renderCity();
  else renderSection();
}

/* ---------- جست‌وجوی سراسری مرحله‌ها ---------- */
function searchSteps(q) {
  const norm = (s) => String(s || "").replace(/[\u064B-\u0655\u0670]/g, "").replace(/‌/g, "").trim();
  const needle = norm(q);
  if (!needle) return [];
  const out = [];
  Object.entries(SECTIONS).forEach(([key, sec]) => {
    sec.steps.forEach(s => {
      if (norm(s.title).includes(needle) || norm(s.place || "").includes(needle)) out.push({ key, s });
    });
  });
  return out;
}
function renderHomeSearch() {
  const input = $("home-search-input");
  const q = input ? input.value : "";
  const res = searchSteps(q);
  $("home-search-results").innerHTML = !q ? "" : (!res.length ? `<p class="small">چیزی پیدا نشد.</p>` :
    res.map(r => `<button class="search-item" onclick="openSectionAndStep('${r.key}',${r.s.id})">${SECTIONS[r.key].title} — ${fa(r.s.id)}. ${r.s.title}</button>`).join(""));
}

/* ---------- حالت حرم: یک ضربه از خانه، متن بزرگ، فقط اعمال و دعا ----------
   همهٔ داده‌ها محلی‌اند و در کش ورکر هست؛ پس حالت حرم آفلاین کار می‌کند.
   تورها و نقشه‌های بیرونی در این نما نمی‌آیند. */
function openHaram(key) {
  const k = key || (nextJourneyTarget() || { key: "umrah" }).key;
  currentSection = k;
  renderHaram(k, currentId(k));
  go("haram");
}
function renderHaram(key, id) {
  const sec = SECTIONS[key];
  const s = sec.steps.find(x => x.id === id) || sec.steps[0];
  /* C4: ناوبری حرم با جایگاه در آرایه، نه id±۱ (شناسه‌های ایران ترتیبی نیستند:
     قم ۲ → جمکران ۵ → شیراز ۳ → تهران ۴)؛ مرزها دکمهٔ غیرفعال می‌گیرند. */
  const idx = sec.steps.findIndex(x => x.id === s.id);
  const prev = sec.steps[idx - 1], next = sec.steps[idx + 1];
  currentStep = s.id;
  let html = `<div class="haram-big"><div class="stepbanner">مرحلهٔ ${fa(idx + 1)} از ${fa(sec.steps.length)} — ${s.title}</div><p class="small">📍 ${s.place}</p>`;
  html += `<div class="box"><h3>تو چه باید بکنی؟</h3><p><b>${s.action}</b></p><ol>`;
  s.steps.forEach(t => html += `<li>${t}</li>`);
  html += `</ol><p><b>چرا؟</b> ${s.reason}</p></div>`;
  if (s.duas.length) {
    html += `<div class="box gold"><h3>دعاها و اعمال</h3>`;
    s.duas.forEach(d => {
      const ai = (typeof AMAL_LIST !== "undefined") ? AMAL_LIST.findIndex(x => x.title === d.title) : -1;
      if (ai >= 0) html += `<p><a class="external" href="#" onclick="event.preventDefault();openAmal(${ai})">${d.title} ↗</a></p>`;
      else html += `<p><b>${d.title}</b></p>`;
    });
    html += `</div>`;
  }
  html += `<div class="haram-nav">` +
    `<button class="btn" ${prev ? `onclick="renderHaram('${key}',${prev.id})"` : "disabled"}>مرحلهٔ قبل</button>` +
    `<button class="btn gold" ${next ? `onclick="renderHaram('${key}',${next.id})"` : "disabled"}>مرحلهٔ بعد</button>` +
    `</div></div>`;
  $("haram-body").innerHTML = html;
}

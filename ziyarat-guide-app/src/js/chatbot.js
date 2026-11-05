/* راهنمای زیارت — چت‌بات هوشمند (متصل به منابع اپ)
   قلب کار: بازیابی از روی منابع خود اپ، نه جواب آماده.
   مسیر پاسخ: سؤال → نرمال‌سازی و امتیازدهی روی پایگاه مرحله‌ها +
   تورها + گزیدهٔ کتابی → مرتبط‌ترین قطعه‌ها + ذکر منبع.
   - اگر واسط سروری تنظیم نشده باشد، پاسخ‌سازی هوشمند (جی‌پی‌تی)
     صادقانه «غیرفعال تا اتصال کلید» است و فقط همان قطعه‌های منبع
     نشان داده می‌شوند؛ دکمهٔ نمایشی که وانمود کند جواب می‌دهد نیست.
   - اگر واسط تنظیم شده باشد، همان قطعه‌ها به واسط فرستاده می‌شوند و
     واسط با کلیدی که فقط در تنظیمات سرور خودش است، پاسخ انسانی
     می‌سازد؛ کلید هرگز به این کد، داده، لاگ یا چت نمی‌آید.
   قرارداد واسط (برای ساخت صبحگاهی آن):
     POST { question: string, chunks: [{title, source, text}] }
     → { answer: string }
     راهنمای پرامپت سرور: فقط از روی همین قطعه‌ها جواب کوتاه و گرم
     به دری بده، منبع هر جمله را بگو، بیرون از قطعه‌ها چیزی نساز،
     و حکم شرعی نامطمئن را به تماس با مسئول ارجاع بده.
   حریم خصوصی: گفت‌وگو فقط در حافظهٔ همین صفحه می‌ماند و ذخیره نمی‌شود.
   این فایل در Node هم بار می‌شود (برای آزمون بازیابی)؛ پس دسترسی به
   document فقط زیر نگهبان typeof است. */
const CHATBOT_PROXY_URL = "/api/chat"; /* واسط ورسل اپ؛ کلید فقط در Environment Variables
  ورسل (GEMINI_API_KEY) است و از ۵ نوامبر ۲۰۲۶ آنجاست. هرگز کلید اینجا ننویسید. */

const CHATBOT_STOPWORDS = ["از", "به", "در", "با", "که", "را", "و", "یا", "این", "آن", "است", "هست", "می", "برای", "تا", "هم", "نیز", "چه", "چطور", "چگونه", "کجا", "کجاست", "کی", "چرا", "آیا", "چند", "چقدر", "چیست", "کدام", "یک", "را"];
const CHATBOT_CITY_FA = { mecca: "مکه", madina: "مدینه", najaf: "نجف", karbala: "کربلا", mashhad: "مشهد", qom: "قم", mukhayam: "خیمه‌گاه", bayn: "بین الحرمین", museum: "موزهٔ حرم امام حسین (ع)", alqama: "علقمه", tiflan: "طفلان مسلم" };
const CHATBOT_SECTION_TITLES = { umrah: "عمرهٔ مفرده", hajj: "حج تمتع", atabat: "عتبات عالیات", iran: "زیارات ایران" };

/* سلام‌ها: فقط تطبیق دقیق پس از نرمال‌سازی — «سلام، طواف نساء چیست؟» سؤال واقعی است، نه سلام خالی. */
const CHATBOT_GREETINGS = ["سلام", "سلام علیکم", "سلام و علیکم", "سلام علیکم و رحمه الله", "صبح بخیر", "شب بخیر", "خوبی", "چطوری"];
function chatbotIsGreeting(s) {
  return CHATBOT_GREETINGS.indexOf(chatbotNormalize(s)) !== -1;
}

function chatbotNormalize(s) {
  return (s || "").replace(/[\u064B-\u0655\u0670]/g, "").replace(/ـ/g, "")
    .replace(/[يى]/g, "ی").replace(/ك/g, "ک").replace(/ة/g, "ه").replace(/[ؤإأآ]/g, "ا")
    .replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); })
    .replace(/[؟?،؛:.()«»""''\/\\-]/g, " ").replace(/‌/g, "").replace(/\s+/g, " ").trim();
}
function chatbotStem(w) {
  if (w.length > 4 && w.slice(-3) === "های") return w.slice(0, -3);
  if (w.length > 3 && w.slice(-2) === "ها") return w.slice(0, -2);
  return w;
}
function chatbotTokens(s) {
  return chatbotNormalize(s).split(" ").filter(Boolean)
    .map(chatbotStem).filter(function (w) { return CHATBOT_STOPWORDS.indexOf(w) === -1; });
}

function chatbotBuildIndex() {
  const entries = [];
  const sections = [];
  if (typeof UMRAH_STEPS !== "undefined") sections.push(["umrah", UMRAH_STEPS]);
  if (typeof HAJJ_STEPS !== "undefined") sections.push(["hajj", HAJJ_STEPS]);
  if (typeof ATABAT_STEPS !== "undefined") sections.push(["atabat", ATABAT_STEPS]);
  if (typeof IRAN_STEPS !== "undefined") sections.push(["iran", IRAN_STEPS]);
  sections.forEach(function (pair) {
    const key = pair[0];
    (pair[1] || []).forEach(function (st) {
      const duas = (st.duas || []).map(function (d) { return d.title; }).join("، ");
      const text = [st.action, (st.steps || []).join(" "), st.reason, duas ? ("دعاها: " + duas) : ""].filter(Boolean).join(" ");
      entries.push({
        id: "stage-" + key + "-" + st.id,
        title: "مرحلهٔ «" + st.title + "» — بخش " + CHATBOT_SECTION_TITLES[key],
        text: text, source: st.source || "داده‌های اپ",
        keys: (st.title + " " + (st.place || "")), section: key, stepId: st.id
      });
    });
  });
  if (typeof VIRTUAL_TOURS !== "undefined") {
    Object.keys(VIRTUAL_TOURS).forEach(function (city) {
      const list = VIRTUAL_TOURS[city] || [];
      if (!list.length) return;
      entries.push({
        id: "tour-" + city,
        title: "تور مجازی " + (CHATBOT_CITY_FA[city] || city),
        text: "برای " + (CHATBOT_CITY_FA[city] || city) + " این گزینه‌ها هست: " +
          list.map(function (t) { return t.type + " — " + t.title; }).join("؛ "),
        source: "داده‌های تور اپ",
        keys: "تور مجازی پانوراما تصاویر " + (CHATBOT_CITY_FA[city] || city),
        links: list.map(function (t) { return { label: t.type + " — " + t.title, url: t.url }; })
      });
    });
  }
  (typeof CHATBOT_EXTRA !== "undefined" ? CHATBOT_EXTRA : []).forEach(function (e) { entries.push(e); });
  return entries;
}

function chatbotRetrieve(question, limit) {
  const qTokens = chatbotTokens(question);
  const uniq = [];
  qTokens.forEach(function (t) { if (uniq.indexOf(t) === -1) uniq.push(t); });
  const scored = chatbotBuildIndex().map(function (e) {
    const titleT = chatbotTokens(e.title), keyT = chatbotTokens(e.keys || ""), textT = chatbotTokens(e.text);
    let score = 0;
    /* تطبیق کامل عنوان: اگر همهٔ واژه‌های عنوان ورودی در سؤال باشد،
       همان ورودی جواب آماده است و باید اول بیاید (نه حدس از روی متن). */
    if (titleT.length >= 2 && titleT.every(function (w) { return uniq.indexOf(w) !== -1; })) score += 6;
    uniq.forEach(function (t) {
      if (titleT.indexOf(t) !== -1) score += 3;
      else if (keyT.indexOf(t) !== -1) score += 2;
      else if (textT.indexOf(t) !== -1) score += 1;
    });
    return { entry: e, score: score };
  }).filter(function (r) { return r.score >= 4; });
  scored.sort(function (a, b) { return b.score - a.score; });
  return scored.slice(0, limit || 3).map(function (r) { return r.entry; });
}

function chatbotStatus() { return CHATBOT_PROXY_URL ? "proxy" : "no-proxy"; }

/* ---------- رابط کاربری (فقط در مرورگر) ---------- */
if (typeof document !== "undefined") {
  const CHATBOT_QUICK = ["طواف نساء چیست؟", "ترتیب زیارت کربلا چگونه است؟", "میقات‌های عمره کدام‌اند؟", "محرمات احرام چند مورد است؟", "اعمال عمرهٔ مفرده چیست؟", "اعمال حج تمتع چیست؟", "دعای طواف چیست؟", "از جده چگونه محرم شوم؟", "تور مجازی نجف را بده", "آداب زیارت چیست؟"];
  const CHATBOT_GREETING = "زایر محترم شرکت سیاحتی و زیارتی عمار غزنه، خوش آمدید! ما در خدمت شما هستیم تا سفری آسان و با معنویت و ارزان را تجربه کنید.";
  let chatbotGreeted = false; /* سلام فقط پیام اول گفت‌وگو: اولین جواب ساخته‌شدهٔ همین بازدید. */
  function chatbotEl(id) { return document.getElementById(id); }
  function chatbotEscape(s) {
    return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function chatbotStatusText() {
    return chatbotStatus() === "proxy"
      ? "پاسخ‌ها از روی منابع اپ ساخته می‌شوند و منبع هر جمله گفته می‌شود."
      : "پاسخ‌سازی هوشمند (جی‌پی‌تی) تا اتصال کلید غیرفعال است؛ فعلاً مرتبط‌ترین قطعه‌های منابع اپ را نشان می‌دهم، بدون جواب ساخته‌شده.";
  }
  function chatbotAddMsg(html, cls) {
    const box = chatbotEl("chat-msgs");
    const div = document.createElement("div");
    div.className = "chat-msg " + (cls || "bot");
    div.innerHTML = html;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    return div;
  }
  function chatbotRenderEntry(e) {
    let html = "<b>" + chatbotEscape(e.title) + "</b><p>" + chatbotEscape(e.text) + "</p>" +
      "<p class=\"chat-src\">منبع: " + chatbotEscape(e.source) + "</p>";
    if (e.links) {
      html += e.links.map(function (l) {
        return "<a class=\"chat-link\" href=\"" + chatbotEscape(l.url) + "\" target=\"_blank\" rel=\"noopener\">" + chatbotEscape(l.label) + "</a>";
      }).join("");
    }
    if (e.section && e.stepId && typeof openSection === "function") {
      html += "<button class=\"btn small gold\" onclick=\"chatbotOpenStep('" + e.section + "'," + e.stepId + ")\">باز کردن این مرحله در اپ</button>";
    }
    if (e.goView && typeof go === "function") {
      html += "<button class=\"btn small\" onclick=\"go('" + e.goView + "')\">رفتن به صفحهٔ تماس</button>";
    }
    if (e.refer) {
      html += "<p class=\"chat-src\">برای مورد شخصی خودت، با مسئول اپ (صفحهٔ دربارهٔ ما) هماهنگ کن.</p>";
    }
    return html;
  }
  function chatbotOpenStep(section, id) {
    try {
      openSection(section);
      if (typeof openStep === "function") openStep(id);
    } catch (err) {}
  }
  function chatbotNoMatch() {
    return "<b>در منابع اپ چیزی برای این سؤال پیدا نشد.</b><p>فقط دربارهٔ زیارت‌های عربستان، ایران و عراق از من بپرس — مثلاً اعمال عمره و حج، زیارت کربلا و نجف، یا زیارت مشهد و قم.</p><p>اگر سؤالت شرعی یا شخصی است، از صفحهٔ «دربارهٔ ما» با مسئول در تماس شو.</p>" +
      "<button class=\"btn small\" onclick=\"go('about')\">رفتن به صفحهٔ تماس</button>";
  }
  /* زمینهٔ زائر برای واسط: فقط ساختارِ مجاز — خطاب محترمانه، قدم بعدی سفر و
     شمارش خاطره‌ها. متن و عکس خاطره‌ها و گفت‌وگوهای قبلی هرگز فرستاده
     نمی‌شوند (قول حریم خصوصی اپ)؛ واسط فقط شمارش را می‌بیند. */
  function chatbotContext() {
    const ctx = {};
    try {
      if (typeof loadProfile === "function" && typeof fullName === "function") {
        const p = loadProfile();
        let address = "";
        if (typeof addressTitle === "function") address = addressTitle(p) || "";
        if (!address) address = fullName(p) || "";
        if (address) ctx.address = address.slice(0, 100);
      }
      if (typeof nextJourneyTarget === "function" && typeof SECTIONS !== "undefined") {
        const t = nextJourneyTarget();
        if (t && SECTIONS[t.key]) {
          const sec = SECTIONS[t.key];
          const step = (sec.steps || []).find(function (s) { return s.id === t.id; });
          ctx.nextJourney = (CHATBOT_SECTION_TITLES[t.key] || sec.title || t.key);
          if (step) ctx.nextStep = step.title;
          if (typeof getProgress === "function") {
            ctx.done = getProgress(t.key).length;
            ctx.total = (sec.steps || []).length;
          }
        }
      }
      if (typeof memories !== "undefined" && Array.isArray(memories) && memories.length) {
        const counts = {};
        memories.forEach(function (m) { if (m && m.section) counts[m.section] = (counts[m.section] || 0) + 1; });
        ctx.memoryCounts = counts;
        ctx.totalMemories = memories.length;
      }
    } catch (e) {}
    return ctx;
  }
  function sendChat(q) {
    const input = chatbotEl("chat-input");
    const question = (q !== undefined ? q : (input ? input.value : "")).trim();
    if (!question) return;
    const qEl = chatbotAddMsg(chatbotEscape(question), "me");
    if (input) input.value = "";
    /* سلام: جواب درست محلی، بدون واسط و بدون سهمیه؛ بار اول سلام ثابت + دعوت به سؤال، بعد کوتاه. */
    if (chatbotIsGreeting(question)) {
      if (!chatbotGreeted) {
        chatbotAddMsg("<p>" + chatbotEscape(CHATBOT_GREETING) + "</p><p>سؤالت را بپرس؛ مثلاً اعمال عمره چیست یا ترتیب زیارت کربلا چگونه است؟</p>", "bot");
        chatbotGreeted = true;
      } else {
        chatbotAddMsg("<p>سلام! در خدمتم؛ سؤالت را بپرس.</p>", "bot");
      }
      if (qEl && qEl.scrollIntoView) qEl.scrollIntoView({ block: "start" });
      return;
    }
    const chunks = chatbotRetrieve(question, 3);
    if (!chunks.length) { chatbotAddMsg(chatbotNoMatch(), "bot"); return; }
    if (chatbotStatus() === "proxy" && typeof fetch !== "undefined") {
      chatbotAddMsg("<p>در حال ساختن پاسخ از روی منابع…</p>", "bot wait");
      fetch(CHATBOT_PROXY_URL, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question, chunks: chunks.map(function (c) { return { title: c.title, source: c.source, text: c.text }; }), context: chatbotContext() })
      }).then(function (r) { return r.json(); }).then(function (data) {
        const wait = document.querySelector("#chat-msgs .wait");
        if (wait) wait.remove();
        if (data && data.answer) {
          let answer = data.answer;
          if (!chatbotGreeted) { answer = CHATBOT_GREETING + "\n\n" + answer; chatbotGreeted = true; }
          chatbotAddMsg("<p>" + chatbotEscape(answer) + "</p>" +
            "<p class=\"chat-src\">منبع‌ها: " + chunks.map(function (c) { return chatbotEscape(c.source); }).join("؛ ") + "</p>", "bot");
        } else {
          chunks.forEach(function (c) { chatbotAddMsg(chatbotRenderEntry(c), "bot"); });
        }
        if (qEl && qEl.scrollIntoView) qEl.scrollIntoView({ block: "start" });
      }).catch(function () {
        const wait = document.querySelector("#chat-msgs .wait");
        if (wait) wait.remove();
        chunks.forEach(function (c) { chatbotAddMsg(chatbotRenderEntry(c), "bot"); });
        if (qEl && qEl.scrollIntoView) qEl.scrollIntoView({ block: "start" });
      });
      return;
    }
    chunks.forEach(function (c) { chatbotAddMsg(chatbotRenderEntry(c), "bot"); });
    if (qEl && qEl.scrollIntoView) qEl.scrollIntoView({ block: "start" });
  }
  function toggleChat() {
    const panel = chatbotEl("chat-panel");
    const open = panel.hasAttribute("hidden");
    if (open) {
      panel.removeAttribute("hidden");
      chatbotEl("chat-status").textContent = chatbotStatusText();
      const input = chatbotEl("chat-input");
      if (input) input.focus();
      const box = chatbotEl("chat-msgs");
      if (box) box.scrollTop = box.scrollHeight;
    } else {
      panel.setAttribute("hidden", "");
    }
  }
  (function chatbotInit() {
    const status = chatbotEl("chat-status");
    if (status) status.textContent = chatbotStatusText();
    /* برچسب صادقانه: تا وقتی واسط هوشمند وصل نیست، «پاسخ‌های آماده» است. */
    const title = chatbotEl("chat-title");
    if (title) title.textContent = chatbotStatus() === "proxy" ? "راهنمای هوشمند" : "پاسخ‌های آماده";
    const quick = chatbotEl("chat-quick");
    if (quick) {
      CHATBOT_QUICK.forEach(function (q) {
        const b = document.createElement("button");
        b.className = "chat-chip";
        b.textContent = q;
        b.onclick = function () { sendChat(q); };
        quick.appendChild(b);
      });
    }
    const input = chatbotEl("chat-input");
    if (input) input.addEventListener("keydown", function (e) { if (e.key === "Enter") sendChat(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !chatbotEl("chat-panel").hasAttribute("hidden")) toggleChat();
    });
    const fab = chatbotEl("chat-fab");
    if (fab) fab.setAttribute("aria-label", chatbotStatus() === "proxy" ? "گفت‌وگو با راهنمای هوشمند" : "پاسخ‌های آماده");
    /* صدور سراسری برای onclickهای index.html (اسکریپت‌ها کلاسیک‌اند). */
    window.toggleChat = toggleChat;
    window.sendChat = sendChat;
    window.chatbotOpenStep = chatbotOpenStep;
  })();
}

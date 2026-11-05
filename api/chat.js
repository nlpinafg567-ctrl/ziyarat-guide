/* واسط پاسخ‌گوی هوشمند «راهنمای زایرین عمار غزنه» — تابع سروری ورسل.
   محل در مخزن: ریشهٔ مخزن، api/chat.js → نشانی زنده: /api/chat (همان هاست اپ).
   قرارداد با اپ (همان که در سربرگ src/js/chatbot.js آمده):
     POST { question: string, chunks: [{title, source, text}], context?: {address?, nextJourney?, nextStep?, done?, total?, totalMemories?, memoryCounts?} } → { answer: string }
     نبودِ answer یعنی «همان قطعه‌های منبع را نشان بده» و اپ خودش به آن برمی‌گردد.
   اصول (تصمیم‌های مالک):
   - کلید فقط از process.env.GEMINI_API_KEY خوانده می‌شود؛ هرگز در این فایل،
     در لاگ، در پاسخ یا در چت نمی‌آید. نبودِ کلید = 503 با بدنهٔ خالی، نه خطای لو‌دهنده.
   - مدل فقط از روی قطعه‌های فرستاده‌شدهٔ اپ جواب می‌سازد؛ بیرون از آن‌ها چیزی
     نمی‌سازد. اگر قطعه‌ها جواب را ندارند، مدل NO_ANSWER برمی‌گرداند و واسط {}
     می‌دهد تا اپ همان قطعه‌ها را نشان بدهد — هرگز جواب ساخته‌شدهٔ بی‌منبع.
   - لحن و ساختار جواب (دستور مالک ۵ نوامبر): سلام ثابت فقط پیام اول گفت‌وگوست
     و اپ خودش آن را می‌گذارد (پرچم chatbotGreeted در chatbot.js)؛ مدل سلام
     نمی‌گوید و مستقیم از جواب شروع می‌کند. زبان دری سادهٔ افغانستانی، انسانی و
     زیبا، مثل همراه و رفیق با حفظ احترام. هر جواب ساخته‌شده با یک سؤال مرتبط
     تمام می‌شود تا گفت‌وگو ادامه پیدا کند.
   - حافظهٔ زائر (بدون شکستن قول حریم خصوصی): هر سؤال همراه با خطاب محترمانه،
     قدم بعدی سفر و شمارش خاطره‌ها می‌آید تا مسیر روشن شود و پیشنهاد بدهد؛
     متن و عکس خاطره‌ها و گفت‌وگوهای قبلی هرگز فرستاده نمی‌شوند و مدل حق ندارد
     وانمود کند آن‌ها را خوانده است. قطعه‌های خامِ حالت برگشتی سلام و سؤال
     پایانی نمی‌گیرند چون جواب نیستند، نقل منبع‌اند.
   - هر خرابی (قطع جیمینای، سقف، مهلت) هم به {} ختم می‌شود تا اپ همیشه به
     نمایش صادقانهٔ قطعه‌ها برگردد؛ اپ در هیچ حالتی خراب نمی‌شود.
   - حافظهٔ موقت و سقف مصرف درون‌نمونه‌ای‌اند (سرورلس نمونه‌ها را به اشتراک
     نمی‌گذارد)؛ پس «بهترین تلاش»‌اند، نه تضمین سراسری. لایهٔ اصلیِ صرفه‌جویی
     این است که اپ فقط وقتی سؤال در منابعش قطعه دارد به واسط می‌آید.
   - بدون سربرگ CORS: فقط همان هاست اپ می‌تواند صدا بزند (same-origin).
   - هیچ دادهٔ درخواست (سؤال، قطعه، کلید) لاگ نمی‌شود.
   بدون وابستگی؛ فقط fetch داخلی نود ۱۸ به بالا. */
"use strict";

const MODEL = "gemini-3.5-flash-lite"; /* فلش‌لایت ۳٫۵: جایگزین ۲٫۵ که برای کاربران تازه بازنشسته شد (گوگل ۴۰۴ می‌دهد)؛ اگر گوگل نام مدل را عوض کرد، فقط همین سطر عوض می‌شود. */
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/" + MODEL + ":generateContent";
const MAX_QUESTION = 500;
const MAX_CHUNK_TEXT = 2000;
const MAX_ANSWER = 1500;
const TIMEOUT_MS = 20000;
const CACHE_MAX = 200;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 20;

/* سلام پیام اول با اپ است، نه با واسط: پرامپت به مدل می‌گوید سلام نگوید و اپ در
   اولین جواب ساخته‌شدهٔ هر بازدید سلام ثابت را اول جواب می‌گذارد (پرچم
   chatbotGreeted در chatbot.js). */

const cache = new Map();
const hits = new Map();

function clean(s, max) {
  return String(s || "").replace(/\s+/g, " ").trim().slice(0, max);
}
function clientIp(req) {
  const fwd = (req.headers && req.headers["x-forwarded-for"]) || "";
  return String(fwd).split(",")[0].trim() || "unknown";
}
function cacheKey(question, chunks, context) {
  return question + "\n" + chunks.map(function (c) { return c.title; }).join("|") + "\n" + JSON.stringify(context || {});
}
function buildPrompt(question, chunks, context) {
  const src = chunks.map(function (c, i) {
    return "[" + (i + 1) + "] " + c.title + " — منبع: " + c.source + "\n" + c.text;
  }).join("\n\n");
  const MEM_TITLES = { umrah: "عمره", hajj: "حج", atabat: "عتبات", iran: "ایران", makka: "مکه", madina: "مدینه" };
  const ctxLines = [];
  if (context.address) ctxLines.push("خطاب محترمانهٔ زائر: " + context.address);
  if (context.nextJourney) ctxLines.push("سفر جاری زائر: " + context.nextJourney);
  if (context.nextStep) ctxLines.push("قدم بعدی زائر: " + context.nextStep);
  if (typeof context.done === "number" && typeof context.total === "number")
    ctxLines.push("پیشرفت سفر جاری: " + context.done + " از " + context.total + " مرحله کامل شده است.");
  if (typeof context.totalMemories === "number" && context.totalMemories > 0) {
    let mem = "شمارش خاطره‌های زائر: " + context.totalMemories + " خاطره";
    if (context.memoryCounts) {
      const parts = Object.keys(context.memoryCounts).map(function (k) {
        return (MEM_TITLES[k] || k) + ": " + context.memoryCounts[k];
      });
      if (parts.length) mem += " (" + parts.join("، ") + ")";
    }
    ctxLines.push(mem);
  }
  return [
    "تو «راهنمای زایرین» هستی؛ همراه و رفیق زائر شیعهٔ افغانستانی، از طرف شرکت سیاحتی و زیارتی عمار غزنه، با حفظ احترام.",
    "فقط و فقط از روی قطعه‌های زیر جواب بده؛ بیرون از آن‌ها چیزی نساز.",
    "به دری سادهٔ افغانستانی، انسانی و زیبا بنویس؛ مثل یک همراه که کنار زائر است، نه مثل کتاب خشک.",
    "سلام را تو نگو؛ اپ در پیام اول گفت‌وگو سلام می‌گوید. تو مستقیم از خود جواب شروع کن.",
    "منبع هر جمله را با همان شمارهٔ قطعه بگو.",
    "اگر خطاب زائر داده شده، یکی دوبار در جواب با همان خطاب و با احترام صدایش کن؛ اگر نیست، بگو زایر محترم.",
    "مسیر را روشن کن: اگر قدم بعدی داده شده، بگو تا کجا آمده و قدم بعدی چیست.",
    "دربارهٔ خاطره‌ها فقط در حد همین شمارش حرف بزن؛ هرگز جزئیات خاطره‌ای را نساز و وانمود نکن که متن خاطره‌ای را خوانده‌ای — متن و عکس خاطره‌ها فقط در گوشی زائر است و برای تو فرستاده نمی‌شود.",
    "یک پیشنهاد جذاب و کوتاه برای سفری بهتر بده که به قدم بعدی یا بخش سفرش مربوط باشد؛ مکان، قیمت یا خدمتی نساز.",
    "جواب را با یک سؤال کوتاه و مرتبط با همین جواب تمام کن تا گفت‌وگو ادامه پیدا کند؛ نه جملهٔ کلی تکراری.",
    "اگر قطعه‌ها جواب سؤال را نمی‌دهند، دقیقاً همین را برگردان: NO_ANSWER",
    "حکم شرعی نامطمئن را نده؛ بگو با تماس انسانی اپ (صفحهٔ دربارهٔ ما) هماهنگ شود.",
    (ctxLines.length ? "شناخت زائر (فقط همین ساختار، نه متن خاطره و نه گفت‌وگوی قبلی):\n" + ctxLines.join("\n") : ""),
    "قطعه‌ها:\n" + src,
    "سؤال زائر: " + question
  ].filter(Boolean).join("\n");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") { res.status(405).json({}); return; }
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const question = clean(body && body.question, MAX_QUESTION);
  const rawChunks = Array.isArray(body && body.chunks) ? body.chunks.slice(0, 3) : [];
  const chunks = rawChunks.map(function (c) {
    return { title: clean(c.title, 200), source: clean(c.source, 200), text: clean(c.text, MAX_CHUNK_TEXT) };
  }).filter(function (c) { return c.title && c.text; });
  if (!question || !chunks.length) { res.status(400).json({}); return; }

  /* زمینهٔ زائر: فقط ساختارِ مجاز (خطاب، قدم بعدی، شمارش خاطره‌ها)؛ هر چیز
     دیگر از ورودی دور انداخته می‌شود. متن خاطره، عکس و گفت‌وگوی قبلی اصلاً
     در قرارداد نیست و هرگز به مدل نمی‌رسد. */
  const rawCtx = (body && typeof body.context === "object" && body.context) || {};
  const context = {};
  if (typeof rawCtx.address === "string" && rawCtx.address.trim()) context.address = clean(rawCtx.address, 100);
  if (typeof rawCtx.nextJourney === "string" && rawCtx.nextJourney.trim()) context.nextJourney = clean(rawCtx.nextJourney, 100);
  if (typeof rawCtx.nextStep === "string" && rawCtx.nextStep.trim()) context.nextStep = clean(rawCtx.nextStep, 200);
  if (Number.isFinite(rawCtx.done) && Number.isFinite(rawCtx.total)) {
    context.done = Math.floor(rawCtx.done);
    context.total = Math.floor(rawCtx.total);
  }
  if (Number.isFinite(rawCtx.totalMemories) && rawCtx.totalMemories > 0) {
    context.totalMemories = Math.floor(rawCtx.totalMemories);
    if (rawCtx.memoryCounts && typeof rawCtx.memoryCounts === "object") {
      const mc = {};
      Object.keys(rawCtx.memoryCounts).forEach(function (k) {
        if (Number.isFinite(rawCtx.memoryCounts[k])) mc[k] = Math.floor(rawCtx.memoryCounts[k]);
      });
      context.memoryCounts = mc;
    }
  }

  const now = Date.now();
  const ip = clientIp(req);
  const windowHits = (hits.get(ip) || []).filter(function (t) { return now - t < RATE_WINDOW_MS; });
  if (windowHits.length >= RATE_MAX) { res.status(429).json({}); return; }
  windowHits.push(now);
  hits.set(ip, windowHits);

  const key = cacheKey(question, chunks, context);
  if (cache.has(key)) { res.status(200).json({ answer: cache.get(key) }); return; }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) { res.status(503).json({}); return; }

  const controller = new AbortController();
  const timer = setTimeout(function () { controller.abort(); }, TIMEOUT_MS);
  try {
    const r = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: buildPrompt(question, chunks, context) }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 600 }
      }),
      signal: controller.signal
    });
    if (!r.ok) { res.status(200).json({}); return; }
    const data = await r.json();
    const parts = data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts;
    const text = Array.isArray(parts) ? parts.map(function (p) { return p.text || ""; }).join("").trim() : "";
    if (!text || text.indexOf("NO_ANSWER") !== -1) { res.status(200).json({}); return; }
    const answer = text.slice(0, MAX_ANSWER);
    cache.set(key, answer);
    if (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value);
    res.status(200).json({ answer: answer });
  } catch (e) {
    res.status(200).json({});
  } finally {
    clearTimeout(timer);
  }
};

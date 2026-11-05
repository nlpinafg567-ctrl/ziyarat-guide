/* واسط پاسخ‌گوی هوشمند «راهنمای زایرین عمار غزنه» — تابع سروری ورسل.
   محل در مخزن: ریشهٔ مخزن، api/chat.js → نشانی زنده: /api/chat (همان هاست اپ).
   قرارداد با اپ (همان که در سربرگ src/js/chatbot.js آمده):
     POST { question: string, chunks: [{title, source, text}] } → { answer: string }
     نبودِ answer یعنی «همان قطعه‌های منبع را نشان بده» و اپ خودش به آن برمی‌گردد.
   اصول (تصمیم‌های مالک):
   - کلید فقط از process.env.GEMINI_API_KEY خوانده می‌شود؛ هرگز در این فایل،
     در لاگ، در پاسخ یا در چت نمی‌آید. نبودِ کلید = 503 با بدنهٔ خالی، نه خطای لو‌دهنده.
   - مدل فقط از روی قطعه‌های فرستاده‌شدهٔ اپ جواب می‌سازد؛ بیرون از آن‌ها چیزی
     نمی‌سازد. اگر قطعه‌ها جواب را ندارند، مدل NO_ANSWER برمی‌گرداند و واسط {}
     می‌دهد تا اپ همان قطعه‌ها را نشان بدهد — هرگز جواب ساخته‌شدهٔ بی‌منبع.
   - لحن جواب: دری سادهٔ افغانستانی، انسانی و زیبا، مثل همراه و رفیق با حفظ
     احترام؛ فقط از روی قطعه‌های منابع خود اپ.
   - هر خرابی (قطع جیمینای، سقف، مهلت) هم به {} ختم می‌شود تا اپ همیشه به
     نمایش صادقانهٔ قطعه‌ها برگردد؛ اپ در هیچ حالتی خراب نمی‌شود.
   - حافظهٔ موقت و سقف مصرف درون‌نمونه‌ای‌اند (سرورلس نمونه‌ها را به اشتراک
     نمی‌گذارد)؛ پس «بهترین تلاش»‌اند، نه تضمین سراسری. لایهٔ اصلیِ صرفه‌جویی
     این است که اپ فقط وقتی سؤال در منابعش قطعه دارد به واسط می‌آید.
   - بدون سربرگ CORS: فقط همان هاست اپ می‌تواند صدا بزند (same-origin).
   - هیچ دادهٔ درخواست (سؤال، قطعه، کلید) لاگ نمی‌شود.
   بدون وابستگی؛ فقط fetch داخلی نود ۱۸ به بالا. */
"use strict";

const MODEL = "gemini-2.5-flash"; /* اگر گوگل نام مدل را عوض کرد، فقط همین سطر عوض می‌شود. */
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/" + MODEL + ":generateContent";
const MAX_QUESTION = 500;
const MAX_CHUNK_TEXT = 2000;
const MAX_ANSWER = 1500;
const TIMEOUT_MS = 20000;
const CACHE_MAX = 200;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 20;


const cache = new Map();
const hits = new Map();

function clean(s, max) {
  return String(s || "").replace(/\s+/g, " ").trim().slice(0, max);
}
function clientIp(req) {
  const fwd = (req.headers && req.headers["x-forwarded-for"]) || "";
  return String(fwd).split(",")[0].trim() || "unknown";
}
function cacheKey(question, chunks) {
  return question + "\n" + chunks.map(function (c) { return c.title; }).join("|");
}
function buildPrompt(question, chunks) {
  const src = chunks.map(function (c, i) {
    return "[" + (i + 1) + "] " + c.title + " — منبع: " + c.source + "\n" + c.text;
  }).join("\n\n");
  return [
    "تو «راهنمای زایرین» هستی؛ همراه و رفیق زائر شیعهٔ افغانستانی، از طرف شرکت سیاحتی و زیارتی عمار غزنه، با حفظ احترام.",
    "فقط و فقط از روی قطعه‌های زیر جواب بده؛ بیرون از آن‌ها چیزی نساز.",
    "به دری سادهٔ افغانستانی، انسانی و زیبا بنویس؛ مثل یک همراه که کنار زائر است، نه مثل کتاب خشک.",
    "منبع هر جمله را با همان شمارهٔ قطعه بگو.",
    "اگر قطعه‌ها جواب سؤال را نمی‌دهند، دقیقاً همین را برگردان: NO_ANSWER",
    "حکم شرعی نامطمئن را نده؛ بگو با تماس انسانی اپ (صفحهٔ دربارهٔ ما) هماهنگ شود.",
    "قطعه‌ها:\n" + src,
    "سؤال زائر: " + question
  ].join("\n");
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

  const now = Date.now();
  const ip = clientIp(req);
  const windowHits = (hits.get(ip) || []).filter(function (t) { return now - t < RATE_WINDOW_MS; });
  if (windowHits.length >= RATE_MAX) { res.status(429).json({}); return; }
  windowHits.push(now);
  hits.set(ip, windowHits);

  const key = cacheKey(question, chunks);
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
        contents: [{ role: "user", parts: [{ text: buildPrompt(question, chunks) }] }],
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

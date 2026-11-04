/* راهنمای زیارت — icons
   آیکون‌های موقت SVG و صحنه‌های سربرگ هر زیارت (نسخهٔ پرمایه‌تر بازطراحی
   ظاهری ۳ نوامبر؛ هنوز موقت تا رسیدن آیکون‌های سه‌بعدی نهایی جی‌پی‌تی).
   بر پایهٔ اصول «Ghazni Heritage 3D»:
   - سوژه به‌تنهایی، بدون بستر مربعی/کاشی/سکو؛ مستقیم روی سطح اپ می‌نشیند.
   - نور از یک جهت ثابت (بالا-چپ)، هایلایت نرم چندلایه، سایهٔ ملایم، عمق سه‌بعدی.
   - مفهوم در نگاه اول خوانا؛ نمادها کلی و نمادین‌اند، نه تصویر بنای واقعی
     مشخص؛ هیچ انسان و هیچ نوشته‌ای داخل تصویر نیست.
   - فقط پالت برند: زمردی، طلایی، کرم، سفید، ذغالی. */
const SECTION_ICONS = {
  umrah: `<svg viewBox="0 0 64 64" role="img" aria-label="عمره">
    <defs>
      <linearGradient id="u-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a7a5f"/><stop offset=".45" stop-color="#1a5c49"/><stop offset="1" stop-color="#0D3B2E"/></linearGradient>
      <linearGradient id="u-side" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0D3B2E"/><stop offset="1" stop-color="#052018"/></linearGradient>
      <linearGradient id="u-face" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d6b50"/><stop offset=".5" stop-color="#144f3c"/><stop offset="1" stop-color="#0D3B2E"/></linearGradient>
      <linearGradient id="u-band" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8cf9a"/><stop offset=".5" stop-color="#C5A46D"/><stop offset="1" stop-color="#a8873f"/></linearGradient>
    </defs>
    <ellipse cx="32" cy="56" rx="21" ry="4" fill="#0D3B2E" opacity="0.22"/>
    <ellipse cx="32" cy="56" rx="14" ry="2.5" fill="#0D3B2E" opacity="0.18"/>
    <polygon points="32,10 52,20 32,30 12,20" fill="url(#u-top)"/>
    <polygon points="20,14 32,20 32,26 20,20" fill="#ffffff" opacity="0.22"/>
    <polygon points="12,20 32,30 32,52 12,42" fill="url(#u-side)"/>
    <polygon points="52,20 32,30 32,52 52,42" fill="url(#u-face)"/>
    <polygon points="52,20 32,30 32,38 52,28" fill="#ffffff" opacity="0.10"/>
    <rect x="12" y="27" width="40" height="5" fill="url(#u-band)"/>
    <rect x="12" y="27" width="40" height="2" fill="#f3e2ac" opacity="0.9"/>
    <rect x="12" y="31" width="40" height="1" fill="#7a5f22" opacity="0.6"/>
  </svg>`,
  hajj: `<svg viewBox="0 0 64 64" role="img" aria-label="حج تمتع">
    <defs>
      <linearGradient id="h-dome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a7a5f"/><stop offset=".5" stop-color="#1a5c49"/><stop offset="1" stop-color="#0D3B2E"/></linearGradient>
      <linearGradient id="h-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e2ac"/><stop offset=".5" stop-color="#e8cf9a"/><stop offset="1" stop-color="#a8873f"/></linearGradient>
      <linearGradient id="h-min" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1a5c49"/><stop offset=".5" stop-color="#0D3B2E"/><stop offset="1" stop-color="#052018"/></linearGradient>
    </defs>
    <ellipse cx="32" cy="56" rx="22" ry="4" fill="#0D3B2E" opacity="0.22"/>
    <ellipse cx="32" cy="56" rx="15" ry="2.5" fill="#0D3B2E" opacity="0.18"/>
    <rect x="10" y="22" width="5" height="32" rx="2" fill="url(#h-min)"/>
    <rect x="10" y="22" width="2" height="32" rx="1" fill="#ffffff" opacity="0.20"/>
    <rect x="49" y="22" width="5" height="32" rx="2" fill="url(#h-min)"/>
    <rect x="49" y="22" width="2" height="32" rx="1" fill="#ffffff" opacity="0.20"/>
    <path d="M8 22 L12.5 12 L17 22 Z" fill="url(#h-gold)"/>
    <path d="M47 22 L51.5 12 L56 22 Z" fill="url(#h-gold)"/>
    <path d="M18 54 L18 34 Q18 22 32 22 Q46 22 46 34 L46 54 Z" fill="url(#h-dome)"/>
    <path d="M18 34 Q18 22 32 22 Q46 22 46 34 Q46 28 32 28 Q18 28 18 34 Z" fill="#ffffff" opacity="0.22"/>
    <path d="M22 40 Q24 28 32 26 Q28 36 26 54 Z" fill="#ffffff" opacity="0.12"/>
    <rect x="30" y="10" width="4" height="12" rx="2" fill="url(#h-gold)"/>
    <circle cx="32" cy="10" r="3.5" fill="#C5A46D"/>
    <circle cx="32" cy="10" r="3.5" fill="none" stroke="#f3e2ac" stroke-width="1" opacity="0.7"/>
    <rect x="14" y="52" width="36" height="2" fill="#C5A46D" opacity="0.5"/>
  </svg>`,
  atabat: `<svg viewBox="0 0 64 64" role="img" aria-label="عتبات عالیات">
    <defs>
      <linearGradient id="a-dome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e2ac"/><stop offset=".35" stop-color="#e8cf9a"/><stop offset=".7" stop-color="#C5A46D"/><stop offset="1" stop-color="#a8873f"/></linearGradient>
      <linearGradient id="a-base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a5c49"/><stop offset="1" stop-color="#0D3B2E"/></linearGradient>
    </defs>
    <ellipse cx="32" cy="56" rx="22" ry="4" fill="#0D3B2E" opacity="0.22"/>
    <ellipse cx="32" cy="56" rx="15" ry="2.5" fill="#0D3B2E" opacity="0.18"/>
    <path d="M16 54 L16 40 Q16 20 32 20 Q48 20 48 40 L48 54 Z" fill="url(#a-dome)"/>
    <path d="M16 40 Q16 20 32 20 Q48 20 48 40 Q48 32 32 32 Q16 32 16 40 Z" fill="#ffffff" opacity="0.30"/>
    <path d="M21 42 Q23 28 31 24 Q27 36 25 54 Z" fill="#ffffff" opacity="0.18"/>
    <rect x="30" y="8" width="4" height="12" rx="2" fill="#C5A46D"/>
    <circle cx="32" cy="8" r="3.5" fill="#C5A46D"/>
    <circle cx="32" cy="8" r="3.5" fill="none" stroke="#f3e2ac" stroke-width="1" opacity="0.7"/>
    <rect x="14" y="48" width="36" height="6" rx="3" fill="url(#a-base)"/>
    <rect x="14" y="48" width="36" height="2" rx="1" fill="#ffffff" opacity="0.20"/>
    <rect x="26" y="40" width="12" height="14" rx="3" fill="#0D3B2E"/>
    <rect x="28" y="40" width="3" height="14" rx="1.5" fill="#ffffff" opacity="0.15"/>
  </svg>`,
  iran: `<svg viewBox="0 0 64 64" role="img" aria-label="زیارات ایران">
    <defs>
      <linearGradient id="i-petal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a7a5f"/><stop offset=".5" stop-color="#1a5c49"/><stop offset="1" stop-color="#0D3B2E"/></linearGradient>
      <radialGradient id="i-gold" cx=".4" cy=".35" r=".9"><stop offset="0" stop-color="#f3e2ac"/><stop offset=".5" stop-color="#e8cf9a"/><stop offset="1" stop-color="#a8873f"/></radialGradient>
    </defs>
    <ellipse cx="32" cy="56" rx="18" ry="4" fill="#0D3B2E" opacity="0.22"/>
    <g fill="url(#i-petal)">
      <ellipse cx="32" cy="16" rx="8" ry="12"/>
      <ellipse cx="32" cy="48" rx="8" ry="12"/>
      <ellipse cx="16" cy="32" rx="12" ry="8"/>
      <ellipse cx="48" cy="32" rx="12" ry="8"/>
      <ellipse cx="21" cy="21" rx="9" ry="9" transform="rotate(-45 21 21)"/>
      <ellipse cx="43" cy="21" rx="9" ry="9" transform="rotate(45 43 21)"/>
      <ellipse cx="21" cy="43" rx="9" ry="9" transform="rotate(45 21 43)"/>
      <ellipse cx="43" cy="43" rx="9" ry="9" transform="rotate(-45 43 43)"/>
    </g>
    <ellipse cx="32" cy="12" rx="4" ry="6" fill="#ffffff" opacity="0.18"/>
    <ellipse cx="12" cy="32" rx="6" ry="4" fill="#ffffff" opacity="0.15"/>
    <circle cx="32" cy="32" r="10" fill="none" stroke="#C5A46D" stroke-width="1.5" opacity="0.8"/>
    <circle cx="32" cy="32" r="9" fill="url(#i-gold)"/>
    <circle cx="32" cy="32" r="4" fill="#0D3B2E"/>
    <circle cx="30.5" cy="30.5" r="1.5" fill="#ffffff" opacity="0.5"/>
  </svg>`
};

/* صحنهٔ سربرگ هر زیارت — نمادین و سبک (SVG خالص، بدون عکس و بدون انسان).
   بازطراحی: پس‌زمینهٔ گرادیانی آسمان، هالهٔ نور طلایی پشت سوژه، سایه و
   هایلایت چندلایه. عمره: کعبه و مدار طواف؛ حج: خیمه‌های منا و ستون‌های جمرات؛
   عتبات: گنبد زرین و موج نهر علقمه؛ ایران: ایوان و گنبد و ستاره. */
function sectionScene(key) {
  if (typeof SECTION_BANNERS !== "undefined" && SECTION_BANNERS[key]) {
    return `<div class="photobanner section"><img src="assets/banners/${SECTION_BANNERS[key]}.jpg" alt="بنر عکسی این زیارت" loading="lazy"><p class="photocredit">عکس: ویکی‌مدیا کامانز</p></div>`;
  }
  if (key === "umrah") return `<svg viewBox="0 0 320 120" class="scene" role="img" aria-label="صحنهٔ عمره">
    <defs>
      <linearGradient id="su-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf4"/><stop offset=".6" stop-color="#fdf3d7"/><stop offset="1" stop-color="#F7F3EA"/></linearGradient>
      <radialGradient id="su-glow" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#f3e2ac" stop-opacity=".8"/><stop offset="1" stop-color="#f3e2ac" stop-opacity="0"/></radialGradient>
      <linearGradient id="su-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a7a5f"/><stop offset="1" stop-color="#0D3B2E"/></linearGradient>
    </defs>
    <rect x="0" y="0" width="320" height="120" fill="url(#su-sky)"/>
    <circle cx="160" cy="62" r="62" fill="url(#su-glow)"/>
    <rect x="0" y="96" width="320" height="24" fill="#efe3c2"/>
    <rect x="0" y="96" width="320" height="2" fill="#C5A46D" opacity="0.6"/>
    <ellipse cx="160" cy="66" rx="86" ry="26" fill="none" stroke="#C5A46D" stroke-width="2" stroke-dasharray="4 6"/>
    <ellipse cx="160" cy="66" rx="58" ry="16" fill="none" stroke="#C5A46D" stroke-width="1.5" stroke-dasharray="3 5" opacity="0.7"/>
    <g fill="#C5A46D">
      <circle cx="160" cy="40" r="3"/><circle cx="220" cy="52" r="2.5"/><circle cx="100" cy="52" r="2.5"/>
      <circle cx="206" cy="80" r="2.5"/><circle cx="114" cy="80" r="2.5"/>
    </g>
    <ellipse cx="160" cy="94" rx="46" ry="5" fill="#0D3B2E" opacity="0.18"/>
    <polygon points="160,28 196,44 160,60 124,44" fill="url(#su-top)"/>
    <polygon points="136,34 160,44 160,50 136,40" fill="#ffffff" opacity="0.22"/>
    <polygon points="124,44 160,60 160,92 124,76" fill="#0D3B2E"/>
    <polygon points="196,44 160,60 160,92 196,76" fill="#144f3c"/>
    <polygon points="196,44 160,60 160,68 196,52" fill="#ffffff" opacity="0.10"/>
    <rect x="124" y="52" width="72" height="6" fill="#C5A46D"/>
    <rect x="124" y="52" width="72" height="2" fill="#f3e2ac" opacity="0.9"/>
  </svg>`;
  if (key === "hajj") return `<svg viewBox="0 0 320 120" class="scene" role="img" aria-label="صحنهٔ حج">
    <defs>
      <linearGradient id="sh-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf4"/><stop offset=".6" stop-color="#fdf3d7"/><stop offset="1" stop-color="#F7F3EA"/></linearGradient>
      <linearGradient id="sh-pillar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1a5c49"/><stop offset=".5" stop-color="#0D3B2E"/><stop offset="1" stop-color="#052018"/></linearGradient>
    </defs>
    <rect x="0" y="0" width="320" height="120" fill="url(#sh-sky)"/>
    <circle cx="160" cy="28" r="20" fill="#C5A46D" opacity="0.30"/>
    <circle cx="160" cy="28" r="14" fill="#C5A46D" opacity="0.25"/>
    <rect x="0" y="96" width="320" height="24" fill="#efe3c2"/>
    <rect x="0" y="96" width="320" height="2" fill="#C5A46D" opacity="0.6"/>
    <g fill="#ffffff" stroke="#C5A46D" stroke-width="2">
      <path d="M20 96 L44 60 L68 96 Z"/><path d="M76 96 L100 60 L124 96 Z"/>
      <path d="M132 96 L156 60 L180 96 Z"/><path d="M188 96 L212 60 L236 96 Z"/>
    </g>
    <g fill="#f3e6c0" opacity="0.8">
      <path d="M44 60 L56 96 L68 96 Z"/><path d="M100 60 L112 96 L124 96 Z"/>
      <path d="M156 60 L168 96 L180 96 Z"/><path d="M212 60 L224 96 L236 96 Z"/>
    </g>
    <g fill="url(#sh-pillar)" stroke="#C5A46D" stroke-width="1.5">
      <rect x="248" y="40" width="12" height="56" rx="3"/><rect x="268" y="34" width="12" height="62" rx="3"/><rect x="288" y="28" width="12" height="68" rx="3"/>
    </g>
    <g fill="#ffffff" opacity="0.20">
      <rect x="248" y="40" width="4" height="56" rx="2"/><rect x="268" y="34" width="4" height="62" rx="2"/><rect x="288" y="28" width="4" height="68" rx="2"/>
    </g>
    <g fill="#C5A46D"><circle cx="254" cy="38" r="3"/><circle cx="274" cy="32" r="3"/><circle cx="294" cy="26" r="3"/></g>
  </svg>`;
  if (key === "atabat") return `<svg viewBox="0 0 320 120" class="scene" role="img" aria-label="صحنهٔ عتبات">
    <defs>
      <linearGradient id="sa-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff8e6"/><stop offset=".6" stop-color="#fdf3d7"/><stop offset="1" stop-color="#F7F3EA"/></linearGradient>
      <linearGradient id="sa-dome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e2ac"/><stop offset=".4" stop-color="#e8cf9a"/><stop offset="1" stop-color="#a8873f"/></linearGradient>
    </defs>
    <rect x="0" y="0" width="320" height="120" fill="url(#sa-sky)"/>
    <circle cx="160" cy="52" r="58" fill="#f3e2ac" opacity="0.35"/>
    <g fill="#C5A46D" opacity="0.8">
      <circle cx="40" cy="20" r="2"/><circle cx="280" cy="18" r="2"/><circle cx="250" cy="34" r="1.5"/><circle cx="70" cy="34" r="1.5"/>
    </g>
    <rect x="0" y="96" width="320" height="24" fill="#0D3B2E"/>
    <path d="M96 96 L96 58 Q96 26 160 26 Q224 26 224 58 L224 96 Z" fill="url(#sa-dome)"/>
    <path d="M96 58 Q96 26 160 26 Q224 26 224 58 Q224 44 160 44 Q96 44 96 58 Z" fill="#ffffff" opacity="0.30"/>
    <path d="M112 58 Q114 36 136 28 Q124 46 122 96 Z" fill="#ffffff" opacity="0.18"/>
    <rect x="156" y="10" width="8" height="16" rx="3" fill="#C5A46D"/>
    <circle cx="160" cy="10" r="5" fill="#C5A46D"/>
    <circle cx="160" cy="10" r="5" fill="none" stroke="#f3e2ac" stroke-width="1" opacity="0.7"/>
    <rect x="40" y="44" width="8" height="52" rx="3" fill="#0D3B2E"/>
    <rect x="40" y="44" width="3" height="52" rx="1.5" fill="#ffffff" opacity="0.15"/>
    <path d="M36 44 L44 28 L52 44 Z" fill="#C5A46D"/>
    <rect x="272" y="44" width="8" height="52" rx="3" fill="#0D3B2E"/>
    <rect x="272" y="44" width="3" height="52" rx="1.5" fill="#ffffff" opacity="0.15"/>
    <path d="M268 44 L276 28 L284 44 Z" fill="#C5A46D"/>
    <path d="M0 104 Q40 98 80 104 T160 104 T240 104 T320 104" fill="none" stroke="#C5A46D" stroke-width="2"/>
    <path d="M0 112 Q40 106 80 112 T160 112 T240 112 T320 112" fill="none" stroke="#C5A46D" stroke-width="1.5" opacity="0.6"/>
  </svg>`;
  return `<svg viewBox="0 0 320 120" class="scene" role="img" aria-label="صحنهٔ زیارات ایران">
    <defs>
      <linearGradient id="si-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf4"/><stop offset=".6" stop-color="#fdf3d7"/><stop offset="1" stop-color="#F7F3EA"/></linearGradient>
      <linearGradient id="si-iwan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a5c49"/><stop offset="1" stop-color="#0D3B2E"/></linearGradient>
    </defs>
    <rect x="0" y="0" width="320" height="120" fill="url(#si-sky)"/>
    <circle cx="160" cy="48" r="48" fill="#f3e2ac" opacity="0.35"/>
    <rect x="0" y="96" width="320" height="24" fill="#efe3c2"/>
    <rect x="0" y="96" width="320" height="2" fill="#C5A46D" opacity="0.6"/>
    <path d="M110 96 L110 52 Q110 20 160 20 Q210 20 210 52 L210 96 Z" fill="url(#si-iwan)"/>
    <path d="M110 52 Q110 20 160 20 Q210 20 210 52 Q210 36 160 36 Q110 36 110 52 Z" fill="#ffffff" opacity="0.15"/>
    <path d="M132 96 L132 58 Q132 38 160 38 Q188 38 188 58 L188 96 Z" fill="#F7F3EA"/>
    <path d="M132 58 Q132 38 160 38 Q188 38 188 58 Q188 48 160 48 Q132 48 132 58 Z" fill="#C5A46D" opacity="0.5"/>
    <path d="M140 96 L140 62 Q140 46 160 46 Q152 62 152 96 Z" fill="#C5A46D" opacity="0.18"/>
    <g fill="#C5A46D">
      <polygon points="160,28 164,38 174,38 166,44 169,54 160,48 151,54 154,44 146,38 156,38"/>
    </g>
    <circle cx="160" cy="41" r="12" fill="none" stroke="#C5A46D" stroke-width="1" opacity="0.5"/>
    <rect x="60" y="60" width="8" height="36" rx="3" fill="#0D3B2E"/>
    <rect x="60" y="60" width="3" height="36" rx="1.5" fill="#ffffff" opacity="0.15"/>
    <rect x="252" y="60" width="8" height="36" rx="3" fill="#0D3B2E"/>
    <rect x="252" y="60" width="3" height="36" rx="1.5" fill="#ffffff" opacity="0.15"/>
  </svg>`;
}

// Logo concepts for DKS „Gavana” (harbor + garden theme). No dependencies.
// Run: node darzkopibas-koop/_src/logos.mjs  → writes darzkopibas-koop/logo/*.svg and logo/index.html
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'logo');
const C = { green: '#2F5233', leaf: '#6E9E4B', light: '#A9CF7A', cream: '#F7F2E7', soil: '#8B5E3C', sea: '#3A7CA5', sun: '#F2C14E', apple: '#C0392B' };
const wave = (y, w = 4, color = C.sea) => `<path d="M14 ${y}q8-6 16 0t16 0t16 0t16 0t16 0t16 0" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;

// Each mark is drawn in a 120×120 box.
const concepts = [
  {
    id: 'a-enkurs',
    name: { lv: 'Enkurs ar asnu', ru: 'Якорь с ростком' },
    idea: { lv: 'Enkura gredzena vietā aug divas lapas: osta un dārzs vienā zīmē.', ru: 'Вместо кольца якоря растут два листа: гавань и сад в одном знаке.' },
    mark: (id) => `
      <path d="M60 40C50 40 40 32 38 18C52 18 60 28 60 40z" fill="${C.leaf}"/>
      <path d="M60 40C70 36 80 26 82 12C68 14 60 24 60 40z" fill="${C.light}"/>
      <path d="M60 40V98M44 52H76M28 74Q32 100 60 100Q88 100 92 74" fill="none" stroke="${C.green}" stroke-width="7" stroke-linecap="round"/>
      <path d="M20 80L28 66L36 78zM84 78L92 66L100 80z" fill="${C.green}"/>
      ${wave(110)}`,
  },
  {
    id: 'b-baka',
    name: { lv: 'Bāka', ru: 'Маяк' },
    idea: { lv: 'Bākas gaismas stari ir lapas. Bāka rāda ceļu uz mājām un dārzu.', ru: 'Лучи маяка — это листья. Маяк показывает путь домой, в сад.' },
    mark: (id) => `
      <defs><clipPath id="${id}-c"><circle cx="60" cy="60" r="56"/></clipPath></defs>
      <circle cx="60" cy="60" r="56" fill="#E8F0DC"/>
      <g clip-path="url(#${id}-c)"><path d="M0 96q10-6 20 0t20 0t20 0t20 0t20 0t20 0V120H0z" fill="${C.sea}"/></g>
      <path d="M50 96L54 46H66L70 96z" fill="${C.cream}" stroke="${C.green}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M52.9 60H67.1L67.8 68H52.2zM51.4 78H68.6L69.2 86H50.8z" fill="${C.soil}"/>
      <rect x="52" y="36" width="16" height="10" fill="${C.sun}" stroke="${C.green}" stroke-width="3"/>
      <path d="M49 36L60 25L71 36z" fill="${C.green}"/>
      <path d="M49 41C40 34 29 33 18 38C28 46 40 47 49 41z" fill="${C.leaf}"/>
      <path d="M71 41C80 34 91 33 102 38C92 46 80 47 71 41z" fill="${C.light}"/>`,
  },
  {
    id: 'c-bura',
    name: { lv: 'Lapu bura', ru: 'Парус-лист' },
    idea: { lv: 'Laiva ar lapas buru ienāk mierīgā ostā. Silta, draudzīga zīme.', ru: 'Лодка с парусом-листом входит в тихую гавань. Тёплый, дружелюбный знак.' },
    mark: (id) => `
      <path d="M58 34C44 46 40 62 58 72z" fill="${C.light}"/>
      <path d="M62 22C90 32 96 58 62 74z" fill="${C.leaf}"/>
      <path d="M63 30Q75 50 63 70" fill="none" stroke="${C.light}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M60 20V80" stroke="${C.green}" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M24 80H96L86 95H34z" fill="${C.soil}"/>
      ${wave(103)}${wave(112, 3, '#7FB0CF')}`,
  },
  {
    id: 'd-zimogs',
    name: { lv: 'Ostas zīmogs', ru: 'Печать гавани' },
    idea: { lv: 'Apaļa emblēma ar ābeli krastā un jūras viļņiem. Der zīmogam un vārtiem.', ru: 'Круглая эмблема: яблоня на берегу и волны. Подходит для печати и табличек.' },
    mark: (id) => `
      <defs>
        <clipPath id="${id}-c"><circle cx="60" cy="60" r="38"/></clipPath>
        <path id="${id}-t" d="M60 60m-47 0a47 47 0 1 1 94 0"/>
        <path id="${id}-b" d="M60 60m-47 0a47 47 0 0 0 94 0"/>
      </defs>
      <circle cx="60" cy="60" r="58" fill="${C.green}"/>
      <circle cx="60" cy="60" r="38" fill="${C.cream}"/>
      <g clip-path="url(#${id}-c)">
        <circle cx="84" cy="42" r="8" fill="${C.sun}"/>
        <path d="M18 74Q46 62 70 70T102 70V100H18z" fill="${C.light}"/>
        <rect x="45" y="50" width="5" height="20" fill="${C.soil}"/>
        <circle cx="47.5" cy="44" r="13" fill="${C.leaf}"/>
        <circle cx="42" cy="42" r="2.6" fill="${C.apple}"/><circle cx="52" cy="47" r="2.6" fill="${C.apple}"/><circle cx="49" cy="37" r="2.6" fill="${C.apple}"/>
        <path d="M18 80q7-5 14 0t14 0t14 0t14 0t14 0t14 0V100H18z" fill="${C.sea}"/>
        <path d="M18 88q7-5 14 0t14 0t14 0t14 0t14 0t14 0" fill="none" stroke="#7FB0CF" stroke-width="2.5"/>
      </g>
      <text font-family="Georgia, serif" font-size="11" font-weight="700" letter-spacing="3" fill="${C.cream}"><textPath href="#${id}-t" startOffset="50%" text-anchor="middle">GAVANA</textPath></text>
      <text font-family="system-ui, sans-serif" font-size="7.5" font-weight="600" letter-spacing="1.5" fill="${C.light}" dy="6"><textPath href="#${id}-b" startOffset="50%" text-anchor="middle">DKS · 1992</textPath></text>`,
  },
];

const svg = (c, size = 120, id = c.id) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="${size}" height="${size}" role="img" aria-label="${c.name.lv}">${c.mark(id)}</svg>`;
// Horizontal lockup: mark + name, for the site header.
const lockup = (c, dark, id) => `<div class="lockup${dark ? ' lockup--dark' : ''}">${svg(c, 56, id)}<span><b>Gavana</b><small>Dārzkopības kooperatīvā sabiedrība</small></span></div>`;

mkdirSync(OUT, { recursive: true });
for (const c of concepts) writeFileSync(join(OUT, `${c.id}.svg`), svg(c, 512) + '\n');

writeFileSync(join(OUT, 'index.html'), `<!doctype html>
<html lang="lv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Logo idejas — DKS „Gavana”</title>
<meta name="robots" content="noindex, nofollow">
<style>
  :root { --green: ${C.green}; --cream: ${C.cream}; --muted: #5C665E; --line: #DCD6C6; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 16px/1.55 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #1E2420; background: #fff; }
  main { width: min(1100px, 100% - 32px); margin: 0 auto; padding: 40px 0 64px; }
  h1 { font-family: Georgia, serif; color: var(--green); margin: 0 0 8px; font-size: clamp(1.8rem, 1.3rem + 2vw, 2.6rem); }
  h2 { font-family: Georgia, serif; color: var(--green); margin: 0; font-size: 1.4rem; }
  .lead { color: var(--muted); max-width: 64ch; margin: 0 0 32px; }
  .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
  @media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
  .card { border: 1px solid var(--line); border-radius: 18px; overflow: hidden; background: #fff; }
  .card__art { display: grid; place-items: center; background: var(--cream); padding: 28px; }
  .card__art svg { width: min(200px, 60vw); height: auto; }
  .card__body { padding: 20px 22px 24px; display: grid; gap: 14px; }
  .num { display: inline-grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; background: var(--green); color: #fff; font-weight: 700; margin-right: 8px; font-size: .9rem; vertical-align: 2px; }
  .idea { margin: 0; color: var(--muted); }
  .idea + .idea { font-size: .92rem; margin-top: -8px; }
  .lockup { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid var(--line); border-radius: 12px; }
  .lockup span { display: grid; line-height: 1.2; }
  .lockup b { font-family: Georgia, serif; font-size: 1.25rem; color: var(--green); }
  .lockup small { color: var(--muted); font-size: .78rem; }
  .lockup--dark { background: #1F3823; border-color: #1F3823; }
  .lockup--dark b { color: var(--cream); }
  .lockup--dark small { color: ${C.light}; }
  .lockup--dark svg { background: var(--cream); border-radius: 12px; padding: 4px; }
  .sizes { display: flex; align-items: end; gap: 16px; }
  .sizes svg { flex: none; }
  .sizes small { color: var(--muted); font-size: .8rem; }
  .dl { font-size: .9rem; color: var(--green); font-weight: 600; }
</style>
</head>
<body>
<main>
  <h1>Logo idejas — DKS „Gavana”</h1>
  <p class="lead">Četras idejas: osta (gavana) un dārzs. Krāsas: zaļā, zemes brūnā un jūras zilā. Izvēlieties vienu, un mēs to pielāgosim un ieliksim mājaslapā.<br>
  Четыре идеи: гавань и сад. Цвета: зелёный, земляной коричневый и морской синий. Выберите одну, и мы доработаем её и поставим на сайт.</p>
  <div class="grid">
    ${concepts.map((c, i) => `<article class="card">
      <div class="card__art">${svg(c, 200, c.id + '-big')}</div>
      <div class="card__body">
        <h2><span class="num">${i + 1}</span>${c.name.lv} <small style="font-family:system-ui;font-size:.9rem;color:var(--muted);font-weight:400">/ ${c.name.ru}</small></h2>
        <p class="idea">${c.idea.lv}</p>
        <p class="idea">${c.idea.ru}</p>
        ${lockup(c, false, c.id + '-l1')}
        ${lockup(c, true, c.id + '-l2')}
        <div class="sizes">${svg(c, 48, c.id + '-s1')}${svg(c, 32, c.id + '-s2')}${svg(c, 16, c.id + '-s3')}<small>48 / 32 / 16 px</small></div>
        <a class="dl" href="${c.id}.svg" download>SVG ↓</a>
      </div>
    </article>`).join('')}
  </div>
</main>
</body>
</html>
`);
console.log('wrote logo/ (' + concepts.length + ' concepts)');

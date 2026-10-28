// Static site generator for the gardening cooperative site. No dependencies.
// Run: node darzkopibas-koop/_src/build.mjs  → writes darzkopibas-koop/{lv,ru}/**/index.html
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGS, org as O, board, routes, news, documents, fees, season, faq } from './content.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// ---------- helpers ----------
// [[text]] → highlighted placeholder in HTML; plain() strips the brackets for attributes.
const ph = (s) => String(s).replace(/\[\[(.+?)\]\]/g, '<mark class="ph" title="Jāaizpilda">$1</mark>');
const plain = (s) => String(s).replace(/\[\[(.+?)\]\]/g, '$1').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fileOf = (lang, slug) => join(lang, slug, 'index.html');
// Relative link ending in index.html, so pages also work when opened from disk.
const href = (from, lang, slug) => relative(dirname(from), fileOf(lang, slug)).split('\\').join('/') || 'index.html';
// Pick the language version of a { lv, ru } value; plain strings are the same in both.
const tr = (v, lang) => (v && typeof v === 'object' && 'lv' in v ? v[lang] : v);
const asset = (from, p) => relative(dirname(from), join('assets', p)).split('\\').join('/');
const route = (key) => routes.find((r) => r.key === key);
const MONTHS = {
  lv: ['janvārī', 'februārī', 'martā', 'aprīlī', 'maijā', 'jūnijā', 'jūlijā', 'augustā', 'septembrī', 'oktobrī', 'novembrī', 'decembrī'],
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
};
const fmtDate = (iso, lang) => {
  const [y, m, d] = iso.split('-').map(Number);
  return lang === 'lv' ? `${y}. gada ${d}. ${MONTHS.lv[m - 1]}` : `${d} ${MONTHS.ru[m - 1]} ${y} г.`;
};

const I = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
  drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.7S5 10 5 15a7 7 0 0 0 14 0c0-5-7-12.3-7-12.3z"/></svg>',
  people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/></svg>',
  euro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6.5A7 7 0 1 0 18 17.5M4 10h10M4 14h10"/></svg>',
  news: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h13v16H6a2 2 0 0 1-2-2zM17 8h3v10a2 2 0 0 1-2 2"/><path d="M8 8h5M8 12h5M8 16h3"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19c0-9 6-14 15-15-1 9-6 15-15 15z"/><path d="M5 19 13 11"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"/></svg>',
};
// Logo mark: a sprout in a rounded square. Replace with the client's logo when it arrives.
const mark = '<svg class="brand__mark" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="var(--green-700)"/><path d="M20 31V18" stroke="#F4EBD6" stroke-width="2.6" stroke-linecap="round"/><path d="M20 20c0-6 4-10 10-10 0 6-4 10-10 10z" fill="#A9CF7A"/><path d="M20 23c0-5-3.5-8-8.5-8 0 5 3.5 8 8.5 8z" fill="#F4EBD6"/></svg>';

// ---------- layout ----------
const UI = {
  lv: { skip: 'Pāriet uz saturu', menu: 'Izvēlne', mainMenu: 'Galvenā izvēlne', home: 'Sākums', draft: 'Melnraksts: <mark class="ph">iezīmētais teksts</mark> vēl jāaizstāj ar īstajiem datiem.', sections: 'Sadaļas', contact: 'Sazināties', reg: 'Reģ. Nr.', sample: 'paraugs', langName: 'Latviešu', ogLocale: 'lv_LV' },
  ru: { skip: 'Перейти к содержанию', menu: 'Меню', mainMenu: 'Главное меню', home: 'Главная', draft: 'Черновик: <mark class="ph">выделенный текст</mark> нужно заменить на настоящие данные.', sections: 'Разделы', contact: 'Связаться', reg: 'Рег. №', sample: 'пример', langName: 'Русский', ogLocale: 'ru_RU' },
};

function layout({ lang, slug, title, desc, body }) {
  const L = UI[lang];
  const from = fileOf(lang, slug);
  const key = routes.find((r) => r.slug === slug).key;
  const nav = routes.map((r) => `<li><a href="${href(from, lang, r.slug)}"${r.key === key ? ' aria-current="page"' : ''}>${tr(r.nav, lang)}</a></li>`).join('');
  const tagline = tr(O.tagline, lang);
  const fullTitle = key === 'home' ? `${plain(O.short)} — ${tagline}` : `${title} — ${plain(O.short)}`;
  const url = (l) => O.siteUrl + `${l}/${slug ? slug + '/' : ''}`;
  const switcher = `<div class="lang" aria-label="Valoda / Язык">${LANGS.map((l) => `<a href="${href(from, l, slug)}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`).join('')}</div>`;
  return `<!doctype html>
<html lang="${lang}" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${plain(desc)}">
<meta name="robots" content="noindex, nofollow">
${LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${url(l)}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${url('lv')}">
<meta property="og:type" content="website">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${plain(desc)}">
<meta property="og:locale" content="${L.ogLocale}">
<meta name="theme-color" content="#2F5233">
<link rel="icon" href="${asset(from, 'favicon.svg')}" type="image/svg+xml">
<link rel="stylesheet" href="${asset(from, 'site.css')}">
</head>
<body>
<a class="skip" href="#main">${L.skip}</a>
<div class="draft-bar">${L.draft}</div>
<header class="header">
  <div class="container header__inner">
    <a class="brand" href="${href(from, lang, '')}">${mark}<span><span class="brand__name">${ph(O.short)}</span><span class="brand__tag">${tagline}</span></span></a>
    <nav class="nav" aria-label="${L.mainMenu}"><ul>${nav}</ul></nav>
    ${switcher}
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="${L.menu}"><span></span></button>
  </div>
  <nav class="mobile-nav" id="mobile-nav" aria-label="${L.menu}"><ul>${nav}</ul></nav>
</header>
<main id="main">
${ph(body)}
</main>
<footer class="footer">
  <div class="container footer__grid">
    <div>
      <a class="brand brand--light" href="${href(from, lang, '')}">${mark}<span><span class="brand__name">${ph(O.short)}</span><span class="brand__tag">${tagline}</span></span></a>
      <p class="footer__small">${L.reg} ${ph(O.regNr)}<br>${ph(O.address)}</p>
    </div>
    <div><h2>${L.sections}</h2><ul>${routes.slice(1).map((r) => `<li><a href="${href(from, lang, r.slug)}">${tr(r.nav, lang)}</a></li>`).join('')}</ul></div>
    <div><h2>${L.contact}</h2><ul>
      <li><a href="tel:${O.tel}">${ph(O.phone)}</a></li>
      <li><a href="mailto:${O.emailRaw}">${ph(O.email)}</a></li>
      <li>${O.hours.slice(0, 2).map(([d, h]) => `${tr(d, lang)}: ${ph(tr(h, lang))}`).join('<br>')}</li>
    </ul></div>
  </div>
  <div class="container footer__bottom"><span>© <span data-year>2026</span> ${ph(O.name)}</span>${LANGS.filter((l) => l !== lang).map((l) => `<a href="${href(from, l, slug)}" lang="${l}">${UI[l].langName}</a>`).join('')}</div>
</footer>
<script src="${asset(from, 'site.js')}" defer></script>
</body>
</html>
`;
}

function pageHero(lang, slug, title, lead) {
  const from = fileOf(lang, slug);
  return `<section class="page-hero"><div class="container">
  <ol class="crumbs"><li><a href="${href(from, lang, '')}">${UI[lang].home}</a></li><li aria-current="page">${tr(routes.find((r) => r.slug === slug).nav, lang)}</li></ol>
  <h1>${title}</h1>
  ${lead ? `<p class="lead">${lead}</p>` : ''}
</div></section>`;
}

const newsCard = (n, lang) => `<article class="news-card">
  <div class="news-card__meta"><time datetime="${n.date}">${fmtDate(n.date, lang)}</time><span class="tag">${tr(n.tag, lang)}</span>${n.example ? `<span class="tag tag--ph">${UI[lang].sample}</span>` : ''}</div>
  <h3>${tr(n.title, lang)}</h3>
  <p>${tr(n.text, lang)}</p>
</article>`;

const faqList = (lang) => `<div class="faq">${faq.map(([q, a]) => `<details><summary>${tr(q, lang)}</summary><p>${tr(a, lang)}</p></details>`).join('')}</div>`;

// Simple garden illustration for the home hero (until real photos arrive).
const heroArt = `<svg class="hero__art" viewBox="0 0 480 360" aria-hidden="true">
  <rect width="480" height="360" rx="28" fill="#E8F0DC"/>
  <circle cx="380" cy="80" r="38" fill="#F2C14E"/>
  <path d="M0 210 Q120 160 240 200 T480 190 V360 H0z" fill="#A9CF7A"/>
  <path d="M0 250 Q140 215 260 245 T480 240 V360 H0z" fill="#6E9E4B"/>
  <g fill="#8B5E3C"><rect x="40" y="280" width="400" height="14" rx="7"/><rect x="40" y="312" width="400" height="14" rx="7"/></g>
  <g fill="#2F5233">${[60, 110, 160, 210, 260, 310, 360, 410].map((x) => `<path d="M${x} 282c-3-12 0-20 8-24-1 10-3 17-8 24zM${x} 282c3-10 10-15 18-14-4 8-10 12-18 14z"/>`).join('')}</g>
  <g fill="#C0392B">${[75, 135, 195, 255, 315, 375].map((x) => `<circle cx="${x}" cy="318" r="6"/>`).join('')}</g>
  <g><rect x="70" y="150" width="70" height="56" fill="#F4EBD6"/><path d="M62 154 105 120l43 34z" fill="#8B5E3C"/><rect x="96" y="176" width="18" height="30" fill="#8B5E3C"/></g>
  <g><rect x="300" y="168" width="10" height="44" fill="#8B5E3C"/><circle cx="305" cy="150" r="34" fill="#4F7C3A"/><circle cx="292" cy="146" r="5" fill="#C0392B"/><circle cx="316" cy="160" r="5" fill="#C0392B"/><circle cx="310" cy="136" r="5" fill="#C0392B"/></g>
</svg>`;

// ---------- pages ----------
// Each page gets the language; x(lv, ru) picks the text for it.
const P = {};

P.home = (lang) => {
  const from = fileOf(lang, '');
  const x = (lv, ru) => (lang === 'lv' ? lv : ru);
  const quick = [
    ['news', I.news, x('Jaunumi', 'Новости'), x('Paziņojumi, talkas un ūdens padeves izmaiņas.', 'Объявления, толоки и изменения в подаче воды.')],
    ['members', I.euro, x('Maksājumi', 'Платежи'), x('Biedru maksa, rekvizīti un termiņi.', 'Членские взносы, реквизиты и сроки.')],
    ['docs', I.file, x('Dokumenti', 'Документы'), x('Statūti, noteikumi, protokoli un veidlapas.', 'Устав, правила, протоколы и бланки.')],
    ['contacts', I.phone, x('Valde', 'Правление'), x('Pieņemšanas laiki un kontakti.', 'Часы приёма и контакты.')],
  ];
  return layout({
    lang, slug: '',
    title: UI[lang].home,
    desc: x(`${O.name}: jaunumi, dokumenti, maksājumi un kontakti dārzkopības kooperatīva biedriem.`, `${O.name}: новости, документы, платежи и контакты для членов садоводческого кооператива.`),
    body: `<section class="hero"><div class="container hero__grid">
  <div>
    <span class="eyebrow">${I.leaf} ${x(`Dārzkopības kooperatīvā sabiedrība kopš ${O.founded}`, `Садоводческое общество с ${O.founded} года`)}</span>
    <h1>${x('Mūsu dārzi, mūsu <em>kopiena</em>.', 'Наши сады, наше <em>сообщество</em>.')}</h1>
    <p class="lead">${x(
      `${O.short} apvieno ${O.plots} dārzu īpašniekus. Mēs kopā rūpējamies par ceļiem, ūdensapgādi un kārtību, lai katram būtu patīkami strādāt un atpūsties savā dārzā.`,
      `${O.short} объединяет ${O.plots} владельцев садовых участков. Вместе мы заботимся о дорогах, водоснабжении и порядке, чтобы каждому было приятно работать и отдыхать в своём саду.`)}</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="${href(from, lang, 'biedriem')}">${x('Informācija biedriem', 'Информация для членов')} ${I.arrow}</a>
      <a class="btn btn--ghost" href="${href(from, lang, 'kontakti')}">${x('Sazināties ar valdi', 'Связаться с правлением')}</a>
    </div>
  </div>
  ${heroArt}
</div></section>

<section class="section section--tight"><div class="container">
  <div class="notice">${I.bell}<div><strong>${x('Svarīgi:', 'Важно:')}</strong> ${tr(news[0].title, lang)}. ${tr(news[0].text, lang)} <a href="${href(from, lang, 'jaunumi')}">${x('Visi jaunumi', 'Все новости')}</a></div></div>
</div></section>

<section class="section"><div class="container">
  <div class="quick">${quick.map(([k, icon, t, d]) => `<a class="quick__item" href="${href(from, lang, routes.find((r) => r.key === k).slug)}"><span class="icon-circle">${icon}</span><h2>${t}</h2><p>${d}</p></a>`).join('')}</div>
</div></section>

<section class="section section--cream"><div class="container">
  <div class="section-head"><h2>${x('Jaunākie paziņojumi', 'Последние объявления')}</h2><a class="link-more" href="${href(from, lang, 'jaunumi')}">${x('Visi jaunumi', 'Все новости')} ${I.arrow}</a></div>
  <div class="news-grid">${news.slice(0, 3).map((n) => newsCard(n, lang)).join('')}</div>
</div></section>

<section class="section"><div class="container split">
  <div>
    <h2>${x('Dārzu sezona', 'Садовый сезон')}</h2>
    <p class="muted">${x('Galvenie darbi un notikumi gada laikā. Precīzus datumus valde paziņo sadaļā „Jaunumi”.', 'Главные работы и события в течение года. Точные даты правление объявляет в разделе «Новости».')}</p>
  </div>
  <ol class="timeline">${season.map(([m, t]) => `<li><strong>${tr(m, lang)}</strong><span>${tr(t, lang)}</span></li>`).join('')}</ol>
</div></section>

<section class="section section--green"><div class="container stats">
  <div><b>${O.plots}</b><span>${x('dārzu gabali', 'садовых участков')}</span></div>
  <div><b>${O.area} ${x('ha', 'га')}</b><span>${x('kopējā teritorija', 'общая территория')}</span></div>
  <div><b>${O.founded}</b><span>${x('reģistrēta', 'год регистрации')}</span></div>
</div></section>`,
  });
};

P.about = (lang) => {
  const x = (lv, ru) => (lang === 'lv' ? lv : ru);
  const title = x('Par mums', 'О нас');
  return layout({
    lang, slug: 'par-mums', title,
    desc: x(`Par ${O.name}: vēsture, mērķi, valde un pārvaldība.`, `О кооперативе ${O.name}: история, цели, правление.`),
    body: `${pageHero(lang, 'par-mums', title, x(
      `${O.name} ir dārzu īpašnieku kopīgi dibināta organizācija, kas apsaimnieko kopīpašumu un pārstāv biedru intereses.`,
      `${O.name} — организация, созданная владельцами садовых участков. Она управляет общим имуществом и представляет интересы членов.`))}
<section class="section"><div class="container split">
  <div class="prose">
    <h2>${x('Mūsu vēsture', 'Наша история')}</h2>
    <p>${x(
      `Kooperatīvā sabiedrība reģistrēta ${O.founded}. gadā. [[Šeit būs īss stāsts par kooperatīva vēsturi: kā radās dārzi, kas tika uzbūvēts, kādi bijuši svarīgākie notikumi.]]`,
      `Кооператив зарегистрирован в ${O.founded} году. [[Здесь будет краткая история кооператива: как появились сады, что было построено, главные события.]]`)}</p>
    <p>${x(
      `Šodien kooperatīva teritorijā ir ${O.plots} dārzu gabali ${O.area} ha platībā. Daudzi biedri dārzā pavada visu vasaru, citi te pastāvīgi dzīvo.`,
      `Сегодня на территории кооператива ${O.plots} садовых участков общей площадью ${O.area} га. Многие проводят в саду всё лето, а некоторые живут здесь постоянно.`)}</p>
    <h2>${x('Ko mēs darām', 'Чем мы занимаемся')}</h2>
    <ul class="checks">
      ${(lang === 'lv'
        ? ['Uzturam iekšējos ceļus, vārtus un apgaismojumu', 'Nodrošinām ūdensapgādi dārzu sezonā', 'Organizējam atkritumu izvešanu', 'Rīkojam talkas un biedru kopsapulces', 'Sadarbojamies ar pašvaldību un pakalpojumu sniedzējiem']
        : ['Содержим внутренние дороги, ворота и освещение', 'Обеспечиваем водоснабжение в садовый сезон', 'Организуем вывоз мусора', 'Проводим толоки и общие собрания', 'Сотрудничаем с самоуправлением и поставщиками услуг']
      ).map((i) => `<li>${i}</li>`).join('')}
    </ul>
  </div>
  <aside class="card">
    <h2>${x('Pamatinformācija', 'Основные данные')}</h2>
    <dl class="facts">
      <dt>${x('Nosaukums', 'Название')}</dt><dd>${O.name}</dd>
      <dt>${UI[lang].reg}</dt><dd>${O.regNr}</dd>
      <dt>${x('Juridiskā adrese', 'Юридический адрес')}</dt><dd>${O.address}</dd>
      <dt>${x('Reģistrēta', 'Зарегистрирован')}</dt><dd>${O.founded}</dd>
      <dt>${x('Dārzu gabali', 'Участков')}</dt><dd>${O.plots}</dd>
    </dl>
  </aside>
</div></section>
<section class="section section--cream"><div class="container">
  <h2>${x('Pārvaldība', 'Управление')}</h2>
  <p class="muted narrow">${x(
    'Augstākā lēmējinstitūcija ir biedru kopsapulce. Ikdienas darbu vada valde, ko ievēlē kopsapulce. Finanšu darbību pārbauda revidents.',
    'Высший орган — общее собрание членов. Повседневную работу ведёт правление, избранное собранием. Финансы проверяет ревизор.')}</p>
  <div class="people">${board.map(([role, name, phone]) => `<div class="person"><span class="icon-circle">${I.people}</span><div><span class="person__role">${tr(role, lang)}</span><strong>${name}</strong>${phone ? `<a href="tel:${plain(phone).replace(/\s/g, '')}">${phone}</a>` : ''}</div></div>`).join('')}</div>
</div></section>`,
  });
};

P.news = (lang) => {
  const x = (lv, ru) => (lang === 'lv' ? lv : ru);
  const title = x('Jaunumi', 'Новости');
  return layout({
    lang, slug: 'jaunumi', title,
    desc: x(`Jaunumi un paziņojumi biedriem: talkas, ūdensapgāde, maksājumi un kopsapulces. ${O.short}.`, `Новости и объявления: толоки, водоснабжение, платежи и собрания. ${O.short}.`),
    body: `${pageHero(lang, 'jaunumi', title, x('Valdes paziņojumi, talkas un svarīgākā informācija biedriem.', 'Объявления правления, толоки и важная информация для членов.'))}
<section class="section"><div class="container">
  <div class="news-list">${news.map((n) => newsCard(n, lang)).join('')}</div>
</div></section>`,
  });
};

P.docs = (lang) => {
  const x = (lv, ru) => (lang === 'lv' ? lv : ru);
  return layout({
    lang, slug: 'dokumenti', title: x('Dokumenti', 'Документы'),
    desc: x(`Statūti, iekšējās kārtības noteikumi, kopsapulču protokoli, gada pārskati un veidlapas. ${O.short}.`, `Устав, правила внутреннего распорядка, протоколы собраний, годовые отчёты и бланки. ${O.short}.`),
    body: `${pageHero(lang, 'dokumenti', x('Dokumenti un statūti', 'Документы и устав'), x('Kooperatīva pamatdokumenti, kopsapulču lēmumi un veidlapas biedriem.', 'Основные документы кооператива, решения собраний и бланки для членов.'))}
<section class="section"><div class="container doc-groups">
  ${documents.map((g) => `<div><h2>${tr(g.group, lang)}</h2><ul class="docs">${g.items.map((d) => {
    const note = tr(d.note, lang);
    const inner = `<span class="icon-circle icon-circle--sm">${I.file}</span><span class="docs__text"><strong>${tr(d.title, lang)}</strong>${note ? `<small>${note}</small>` : ''}</span>`;
    return d.file
      ? `<li><a class="docs__item" href="../../docs/${d.file}" download>${inner}<span class="docs__action">${x('Lejupielādēt PDF', 'Скачать PDF')}</span></a></li>`
      : `<li><div class="docs__item is-missing">${inner}<span class="docs__action">${x('Drīzumā', 'Скоро')}</span></div></li>`;
  }).join('')}</ul></div>`).join('')}
  <p class="muted">${x('Ja nepieciešams dokuments, kura šeit nav, rakstiet valdei:', 'Если нужного документа здесь нет, напишите правлению:')} <a href="mailto:${O.emailRaw}">${O.email}</a>.</p>
</div></section>`,
  });
};

P.members = (lang) => {
  const from = fileOf(lang, 'biedriem');
  const x = (lv, ru) => (lang === 'lv' ? lv : ru);
  const sendBtn = `<button class="btn btn--primary" type="submit">${x('Sagatavot e-pastu', 'Подготовить письмо')} ${I.mail}</button>
      <p class="form__hint">${x('Poga atver jūsu e-pasta programmu ar sagatavotu vēstuli.', 'Кнопка откроет вашу почтовую программу с готовым письмом.')}</p>`;
  return layout({
    lang, slug: 'biedriem', title: x('Biedriem', 'Членам'),
    desc: x(`Biedru maksa, rekvizīti, ūdens skaitītāju rādījumi, kārtības noteikumi un biežāk uzdotie jautājumi. ${O.short}.`, `Членские взносы, реквизиты, показания счётчиков воды, правила и частые вопросы. ${O.short}.`),
    body: `${pageHero(lang, 'biedriem', x('Informācija biedriem', 'Информация для членов'), x('Maksājumi, ūdens skaitītāju rādījumi, kārtības noteikumi un atbildes uz biežākajiem jautājumiem.', 'Платежи, показания счётчиков воды, правила порядка и ответы на частые вопросы.'))}
<section class="section"><div class="container split">
  <div>
    <h2>${x('Maksas', 'Взносы и платежи')}</h2>
    <p class="muted">${x('Maksu apmēru katru gadu apstiprina biedru kopsapulce. Samaksas termiņš: [[31. oktobris]].', 'Размер платежей ежегодно утверждает общее собрание. Срок оплаты: [[31 октября]].')}</p>
    <table class="table"><thead><tr><th>${x('Maksājums', 'Платёж')}</th><th>${x('Apmērs', 'Сумма')}</th></tr></thead><tbody>
      ${fees.map(([n, a, d]) => `<tr><td><strong>${tr(n, lang)}</strong><small>${tr(d, lang)}</small></td><td>${tr(a, lang)}</td></tr>`).join('')}
    </tbody></table>
  </div>
  <aside class="card card--green">
    <h2>${I.euro} ${x('Rekvizīti', 'Реквизиты')}</h2>
    <dl class="facts">
      <dt>${x('Saņēmējs', 'Получатель')}</dt><dd>${O.name}</dd>
      <dt>${UI[lang].reg}</dt><dd>${O.regNr}</dd>
      <dt>${x('Banka', 'Банк')}</dt><dd>${O.bank.name}, ${O.bank.swift}</dd>
      <dt>${x('Konts', 'Счёт')}</dt><dd class="mono">${O.bank.iban}</dd>
      <dt>${x('Mērķis', 'Назначение')}</dt><dd>${x('Gabala Nr., vārds, uzvārds, maksājuma veids', '№ участка, имя, фамилия, вид платежа')}</dd>
    </dl>
  </aside>
</div></section>
<section class="section section--cream"><div class="container split">
  <div>
    <h2>${I.drop} ${x('Ūdens skaitītāju rādījumi', 'Показания счётчиков воды')}</h2>
    <p>${x('Sūtiet rādījumu valdei e-pastā vai īsziņā. Norādiet gabala numuru, rādījumu un datumu.', 'Отправьте показания правлению по e-mail или SMS. Укажите номер участка, показание и дату.')}</p>
    <form class="form" data-mail="${O.emailRaw}" data-subject="${x('Ūdens skaitītāja rādījums', 'Показания счётчика воды')}">
      <div class="form__row">
        <label>${x('Gabala Nr.', '№ участка')}<input name="${x('Gabala Nr.', '№ участка')}" required inputmode="numeric"></label>
        <label>${x('Rādījums (m³)', 'Показание (м³)')}<input name="${x('Rādījums', 'Показание')}" required inputmode="decimal"></label>
      </div>
      <label>${x('Vārds, uzvārds', 'Имя, фамилия')}<input name="${x('Vārds, uzvārds', 'Имя, фамилия')}" required autocomplete="name"></label>
      ${sendBtn}
    </form>
  </div>
  <div>
    <h2>${x('Kārtības noteikumi īsumā', 'Правила порядка кратко')}</h2>
    <ul class="checks">
      ${(lang === 'lv'
        ? ['Klusums no plkst. [[23:00]] līdz [[7:00]]', 'Kūlas dedzināšana aizliegta, ugunskurus kurt tikai drošā vietā', 'Pa iekšējiem ceļiem brauciet lēni, ne ātrāk par [[20]] km/h', 'Grāvjus un ceļmalas pie sava gabala uzturiet kārtībā', 'Atkritumus šķirojiet un nemetiet konteinerā būvgružus']
        : ['Тишина с [[23:00]] до [[7:00]]', 'Выжигать сухую траву запрещено, костры только в безопасном месте', 'По внутренним дорогам ездите медленно, не быстрее [[20]] км/ч', 'Содержите в порядке канавы и обочины у своего участка', 'Сортируйте мусор и не выбрасывайте в контейнер строительные отходы']
      ).map((i) => `<li>${i}</li>`).join('')}
    </ul>
    <p><a class="link-more" href="${href(from, lang, 'dokumenti')}">${x('Pilni noteikumi sadaļā „Dokumenti”', 'Полные правила в разделе «Документы»')} ${I.arrow}</a></p>
  </div>
</div></section>
<section class="section"><div class="container narrow">
  <h2>${x('Biežāk uzdotie jautājumi', 'Частые вопросы')}</h2>
  ${faqList(lang)}
</div></section>`,
  });
};

P.contacts = (lang) => {
  const x = (lv, ru) => (lang === 'lv' ? lv : ru);
  const q = encodeURIComponent(O.mapQuery);
  const title = x('Kontakti', 'Контакты');
  return layout({
    lang, slug: 'kontakti', title,
    desc: x(`Valdes kontakti, pieņemšanas laiki un adrese. ${O.name}.`, `Контакты правления, часы приёма и адрес. ${O.name}.`),
    body: `${pageHero(lang, 'kontakti', title, x('Valde pieņem biedrus valdes mājiņā. Ārpus pieņemšanas laika rakstiet vai zvaniet.', 'Правление принимает членов в домике правления. В другое время пишите или звоните.'))}
<section class="section"><div class="container split">
  <div class="contact-list">
    <div class="contact">${I.pin}<div><strong>${x('Adrese', 'Адрес')}</strong><span>${O.address}</span></div></div>
    <div class="contact">${I.phone}<div><strong>${x('Tālrunis', 'Телефон')}</strong><a href="tel:${O.tel}">${O.phone}</a></div></div>
    <div class="contact">${I.mail}<div><strong>E-pasts${x('', ' / E-mail')}</strong><a href="mailto:${O.emailRaw}">${O.email}</a></div></div>
    <div class="contact">${I.clock}<div><strong>${x('Pieņemšanas laiks', 'Часы приёма')}</strong><dl class="hours">${O.hours.map(([d, h]) => `<dt>${tr(d, lang)}</dt><dd>${tr(h, lang)}</dd>`).join('')}</dl></div></div>
  </div>
  <form class="form card" data-mail="${O.emailRaw}" data-subject="${x('Jautājums valdei', 'Вопрос правлению')}">
    <h2>${x('Rakstīt valdei', 'Написать правлению')}</h2>
    <label>${x('Vārds, uzvārds', 'Имя, фамилия')}<input name="${x('Vārds', 'Имя')}" required autocomplete="name"></label>
    <div class="form__row">
      <label>${x('Tālrunis vai e-pasts', 'Телефон или e-mail')}<input name="${x('Kontakti', 'Контакты')}" required></label>
      <label>${x('Gabala Nr.', '№ участка')} <span class="muted">${x('(ja ir)', '(если есть)')}</span><input name="${x('Gabala Nr.', '№ участка')}"></label>
    </div>
    <label>${x('Ziņa', 'Сообщение')}<textarea name="${x('Ziņa', 'Сообщение')}" rows="5" required></textarea></label>
    <button class="btn btn--primary" type="submit">${x('Sagatavot e-pastu', 'Подготовить письмо')} ${I.mail}</button>
    <p class="form__hint">${x('Poga atver jūsu e-pasta programmu ar sagatavotu vēstuli.', 'Кнопка откроет вашу почтовую программу с готовым письмом.')}</p>
  </form>
</div></section>
<section class="section section--tight"><div class="container">
  <div class="map"><iframe title="${x('Karte', 'Карта')}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${q}&amp;z=14&amp;hl=${lang}&amp;output=embed"></iframe></div>
  <p class="muted"><a href="https://www.google.com/maps/search/?api=1&amp;query=${q}" target="_blank" rel="noopener">${x('Atvērt lielāku karti', 'Открыть карту крупнее')}</a></p>
</div></section>`,
  });
};

// ---------- write ----------
for (const lang of LANGS) for (const r of routes) {
  const out = join(ROOT, fileOf(lang, r.slug));
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, P[r.key](lang));
  console.log('wrote', relative(ROOT, out));
}

// Root page: sends visitors to Latvian (or Russian, if they chose it before).
writeFileSync(join(ROOT, 'index.html'), `<!doctype html>
<html lang="lv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${plain(O.short)}</title>
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<script>try { location.replace((localStorage.getItem('dks-lang') === 'ru' ? 'ru' : 'lv') + '/index.html'); } catch (e) { location.replace('lv/index.html'); }</script>
<meta http-equiv="refresh" content="1; url=lv/index.html">
</head>
<body style="font-family:system-ui,sans-serif;padding:40px">
<p><a href="lv/index.html">Latviešu</a> · <a href="ru/index.html">Русский</a></p>
</body>
</html>
`);
console.log('wrote index.html');

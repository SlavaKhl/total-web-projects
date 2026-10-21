// Static site generator for the NIKA LAT preview. No dependencies.
// Run: node bookkeeper/_src/build.mjs  → writes bookkeeper/{lv,ru}/**/index.html, sitemap.xml
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { company as C, routes, t, areas, software, faq } from './content.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['lv', 'ru'];
const YEARS = new Date().getFullYear() - 1993;

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fileOf = (lang, slug) => join(lang, slug, 'index.html');
// Relative link from one page to another, ending in index.html so it works from file:// too.
function href(from, lang, slug) {
  const r = relative(dirname(from), fileOf(lang, slug)).split('\\').join('/');
  return r || 'index.html';
}
const asset = (from, p) => relative(dirname(from), join('assets', p)).split('\\').join('/');
const route = (key) => routes.find((r) => r.key === key);

const I = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  ledger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>',
  scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/></svg>',
  seal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="m9 9 2 2 4-4M8.5 14 7 22l5-3 5 3-1.5-8"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M9 9l-2 2 2 2M15 9l2 2-2 2"/></svg>',
  lang: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h8M8 3v2M6 5c0 4 3 7 6 8M10 5c-1 4-4 7-6 8M13 21l4-10 4 10M14.5 18h5"/></svg>',
  people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/></svg>',
};
const markSvg = '<svg class="brand__mark" viewBox="0 0 76 52" aria-hidden="true"><g transform="translate(2 2) skewX(-12)"><path fill="#C8102E" d="M8 48V0h10l16 28V0h10v48H34L18 20v28zM50 0h10v38h18v10H50z"/></g></svg>';

// ---------- layout ----------
function layout({ lang, slug, title, desc, body, schema }) {
  const L = t[lang];
  const from = fileOf(lang, slug);
  const other = lang === 'lv' ? 'ru' : 'lv';
  const key = routes.find((r) => r.slug === slug).key;
  const nav = ['services', 'software', 'about', 'pricing', 'clients', 'faq', 'contacts'];
  const navHtml = nav.map((k) => {
    const cur = k === key || route(key).parent === k;
    return `<li><a href="${href(from, lang, route(k).slug)}"${cur ? ' aria-current="page"' : ''}>${L.nav[k]}</a></li>`;
  }).join('');
  const url = C.siteUrl + `${lang}/${slug ? slug + '/' : ''}`;
  const altUrl = (l) => C.siteUrl + `${l}/${slug ? slug + '/' : ''}`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'AccountingService', name: C.name, url: C.siteUrl,
    telephone: C.phone, email: C.email, foundingDate: C.founded, areaServed: 'LV',
    address: { '@type': 'PostalAddress', addressLocality: 'Rīga', addressCountry: 'LV' },
    knowsLanguage: ['lv', 'ru'], logo: C.siteUrl + 'assets/logo.svg',
  };
  const footerSvc = ['accounting', 'legal', 'audit', 'software'].map((k) => `<li><a href="${href(from, lang, route(k).slug)}">${L.nav[k]}</a></li>`).join('');
  const footerCo = ['about', 'pricing', 'clients', 'faq', 'privacy'].map((k) => `<li><a href="${href(from, lang, route(k).slug)}">${L.nav[k]}</a></li>`).join('');

  return `<!doctype html>
<html lang="${L.htmlLang}" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="lv" href="${altUrl('lv')}">
<link rel="alternate" hreflang="ru" href="${altUrl('ru')}">
<link rel="alternate" hreflang="x-default" href="${altUrl('lv')}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:locale" content="${L.locale}">
<meta property="og:url" content="${url}">
<meta name="theme-color" content="#0F1B2D">
<link rel="icon" href="${asset(from, 'favicon.svg')}" type="image/svg+xml">
<link rel="preload" href="${asset(from, 'fonts/onest-latin-wght-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset(from, 'site.css')}">
<script type="application/ld+json">${JSON.stringify(schema || ld)}</script>
</head>
<body data-chatbase="${C.chatbase}">
<a class="skip" href="#main">${L.skip}</a>
<header class="header">
  <div class="topbar"><div class="container">
    <span class="topbar__info">${L.topbar}</span>
    <span class="topbar__contacts"><a href="tel:${C.tel}">${C.phone}</a><a href="mailto:${C.email}">${C.email}</a></span>
  </div></div>
  <div class="container header__inner">
    <a class="brand" href="${href(from, lang, '')}" aria-label="${C.short} — ${L.nav.home}">${markSvg}<span><span class="brand__name">${C.short}</span><span class="brand__tag">${L.tagline}</span></span></a>
    <nav class="nav" aria-label="${L.menu}"><ul>${navHtml}</ul></nav>
    <div class="lang" aria-label="Language"><a href="${href(from, 'lv', slug)}" hreflang="lv" lang="lv"${lang === 'lv' ? ' aria-current="true"' : ''}>LV</a><a href="${href(from, 'ru', slug)}" hreflang="ru" lang="ru"${lang === 'ru' ? ' aria-current="true"' : ''}>RU</a></div>
    <a class="btn btn--primary header__cta" href="${href(from, lang, 'pricing')}#quote">${L.cta}</a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="${L.menu}"><span></span></button>
  </div>
  <div class="mobile-nav" id="mobile-nav"><div class="container">
    <ul>${navHtml}</ul>
    <a class="btn btn--primary" href="${href(from, lang, 'pricing')}#quote">${L.cta}</a>
  </div></div>
</header>
<main id="main">
${body}
</main>
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <a class="brand" href="${href(from, lang, '')}">${markSvg.replace('#C8102E', '#EF4B62')}<span><span class="brand__name">${C.short}</span><span class="brand__tag">${L.tagline}</span></span></a>
        <p style="margin-top:18px;max-width:36ch">${L.footerAbout}</p>
      </div>
      <div><h3>${L.footerCols[0]}</h3><ul>${footerSvc}</ul></div>
      <div><h3>${L.footerCols[1]}</h3><ul>${footerCo}</ul></div>
      <div><h3>${L.footerCols[2]}</h3><ul>
        <li><a href="tel:${C.tel}">${C.phone}</a></li>
        <li><a href="mailto:${C.email}">${C.email}</a></li>
        <li>${C.city}, Latvija</li>
      </ul></div>
    </div>
    <div class="footer__bottom">
      <span>© 1993–<span data-year></span> ${esc(C.name)}. ${L.rights}</span>
      <span>${L.preview} · <a href="${href(from, other, slug)}" lang="${other}">${t[other].langName}</a></span>
    </div>
  </div>
</footer>
<div class="callbar" aria-hidden="false">
  <a href="tel:${C.tel}">${I.phone}${L.call}</a>
  <a href="${href(from, lang, 'pricing')}#quote">${L.cta}</a>
</div>
<script src="${asset(from, 'site.js')}" defer></script>
</body>
</html>
`;
}

// ---------- shared blocks ----------
function pageHero(lang, slug, title, lead, eyebrow) {
  const from = fileOf(lang, slug);
  const r = routes.find((x) => x.slug === slug);
  const L = t[lang];
  const crumbs = [`<li><a href="${href(from, lang, '')}">${L.nav.home}</a></li>`];
  if (r.parent) crumbs.push(`<li><a href="${href(from, lang, route(r.parent).slug)}">${L.nav[r.parent]}</a></li>`);
  crumbs.push(`<li aria-current="page">${L.nav[r.key]}</li>`);
  return `<section class="page-hero"><div class="container">
  <ol class="crumbs">${crumbs.join('')}</ol>
  ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
  <h1>${title}</h1>
  ${lead ? `<p class="lead">${lead}</p>` : ''}
</div></section>`;
}

function ctaBand(lang, slug) {
  const L = t[lang];
  const from = fileOf(lang, slug);
  return `<section class="section section--ink"><div class="container cta-band reveal">
  <div><h2>${L.ctaBand.title}</h2><p class="lead">${L.ctaBand.text}</p></div>
  <div class="btn-row"><a class="btn btn--primary" href="${href(from, lang, 'pricing')}#quote">${L.cta} ${I.arrow}</a><a class="btn btn--ghost" href="tel:${C.tel}">${I.phone} ${C.phone}</a></div>
</div></section>`;
}

function areaCard(lang, from, key) {
  const a = areas[key][lang];
  return `<a class="card reveal" href="${href(from, lang, route(key).slug)}">
  <span class="card__icon">${I[areas[key].icon]}</span>
  <h3>${a.title}</h3><p>${a.short}</p>
  <ul>${a.items.slice(0, 3).map((i) => `<li>${i[0]}</li>`).join('')}</ul>
  <span class="card__more">${t[lang].more} ${I.arrow}</span></a>`;
}
function softwareCard(lang, from) {
  const x = lang === 'lv'
    ? ['NIKA LAT programmas', 'Pašu izstrādāts grāmatvedības komplekss ar instalāciju, apmācību un atbalstu.', ['FINUS — galvenā grāmata', 'DARBA ALGA — algu aprēķins', 'Ēku apsaimniekošanas moduļi']]
    : ['Программы NIKA LAT', 'Собственный бухгалтерский комплекс с установкой, обучением и поддержкой.', ['FINUS — главная книга', 'DARBA ALGA — расчет зарплаты', 'Модули управления зданиями']];
  return `<a class="card card--ink reveal" href="${href(from, lang, 'software')}">
  <span class="card__icon">${I.code}</span>
  <h3>${x[0]}</h3><p>${x[1]}</p>
  <ul>${x[2].map((i) => `<li>${i}</li>`).join('')}</ul>
  <span class="card__more">${t[lang].more} ${I.arrow}</span></a>`;
}

function faqList(items) {
  return `<div class="faq">${items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`;
}

// ---------- pages ----------
const P = {};

P.home = (lang) => {
  const from = fileOf(lang, '');
  const lv = lang === 'lv';
  const x = lv ? {
    title: 'NIKA LAT — grāmatvedības pakalpojumi Rīgā kopš 1993',
    desc: 'Grāmatvedības, juridiskie un zvērināta revidenta pakalpojumi Rīgā latviešu un krievu valodā. VID atskaites, gada pārskats un pašu NIKA LAT programmas.',
    eyebrow: 'Grāmatvedība Rīgā · kopš 1993',
    h1: 'Grāmatvedība, uz kuru <em>var paļauties</em>.',
    lead: `Ikdienas uzskaite, VID atskaites, gada pārskati un juridiskais atbalsts — latviski un krieviski. ${YEARS} gadu pieredze un pašu izstrādāts grāmatvedības programmu komplekss.`,
    second: 'Mūsu pakalpojumi',
    note: 'Konfidencialitāte un augsti ētikas standarti',
    ledger: ['Šī mēneša uzskaite', 'Kārtībā', [['Dokumenti saņemti', 'bankas izraksti, rēķini'], ['PVN deklarācija', 'sagatavota VID EDS'], ['Algu aprēķins', 'darbinieku atskaites'], ['Gada pārskats', 'plānots']]],
    stamp: ['kopš', '1993'],
    facts: [['1993', 'dibināšanas gads'], [`${YEARS}+`, 'gadi grāmatvedībā'], ['3 in 1', 'grāmatvedis, jurists, revidents'], ['LV · RU', 'saziņas valodas']],
    svcEyebrow: 'Pakalpojumi', svcTitle: 'Viss uzņēmuma finanšu darbam vienuviet',
    svcLead: 'Grāmatvedība, juridiskie jautājumi un revīzija — saskaņoti, bez starpniekiem un liekas sarakstes.',
    whyEyebrow: 'Kāpēc NIKA LAT', whyTitle: 'Mēs pazīstam grāmatvedību no iekšpuses',
    why: [
      ['Pašu programmatūra', 'Kopš 1993. gada izstrādājam un izplatām grāmatvedības komplektu “NIKA LAT”. Tāpēc uzskaite pie mums ir sistemātiska un precīza.'],
      ['Viens partneris trim jomām', 'Grāmatvedis, jurists un zvērināts revidents strādā saskaņoti, un jums nav jāmeklē trīs dažādi pakalpojumu sniedzēji.'],
      ['Konfidencialitāte', 'Klientu komercinformācija netiek izpausta. Mēs vērtējam savu reputāciju un atsakāmies no darbībām, kas varētu kaitēt klientam.'],
      ['Divās valodās', 'Konsultējam latviski un krieviski, lai sarežģīti nodokļu jautājumi būtu saprotami jūsu valodā.'],
    ],
    stepsEyebrow: 'Kā sākt', stepsTitle: 'Četri soļi līdz sakārtotai grāmatvedībai',
    steps: [['Pieteikums', 'Aizpildiet īsu formu vai piezvaniet.'], ['Iepazīšanās', 'Izrunājam uzņēmuma darbību un uzdevumus.'], ['Piedāvājums', 'Saskaņojam pakalpojumu apjomu un cenu.'], ['Sadarbība', 'Pārņemam dokumentus un uzsākam darbu.']],
    faqEyebrow: 'Jautājumi', faqTitle: 'Bieži uzdotie jautājumi', faqAll: 'Visi jautājumi',
  } : {
    title: 'NIKA LAT — бухгалтерские услуги в Риге с 1993 года',
    desc: 'Бухгалтерские, юридические услуги и присяжный ревизор в Риге на латышском и русском. Отчеты в VID, годовой отчет и собственные программы NIKA LAT.',
    eyebrow: 'Бухгалтерия в Риге · с 1993',
    h1: 'Бухгалтерия, на которую <em>можно положиться</em>.',
    lead: `Текущий учет, отчеты в VID, годовые отчеты и юридическая поддержка — на латышском и русском. ${YEARS} лет опыта и собственный программный комплекс для бухгалтерии.`,
    second: 'Наши услуги',
    note: 'Конфиденциальность и высокие этические стандарты',
    ledger: ['Учет этого месяца', 'В порядке', [['Документы получены', 'выписки банка, счета'], ['Декларация НДС', 'подготовлена в VID EDS'], ['Расчет зарплаты', 'отчеты по сотрудникам'], ['Годовой отчет', 'запланирован']]],
    stamp: ['с', '1993'],
    facts: [['1993', 'год основания'], [`${YEARS}+`, 'лет в бухгалтерии'], ['3 в 1', 'бухгалтер, юрист, ревизор'], ['LV · RU', 'языки общения']],
    svcEyebrow: 'Услуги', svcTitle: 'Все для финансовой работы компании в одном месте',
    svcLead: 'Бухгалтерия, юридические вопросы и аудит — согласованно, без посредников и лишней переписки.',
    whyEyebrow: 'Почему NIKA LAT', whyTitle: 'Мы знаем бухгалтерию изнутри',
    why: [
      ['Собственные программы', 'С 1993 года мы разрабатываем и распространяем бухгалтерский комплекс «NIKA LAT». Поэтому учет у нас системный и точный.'],
      ['Один партнер для трех задач', 'Бухгалтер, юрист и присяжный ревизор работают согласованно, и вам не нужно искать трех разных подрядчиков.'],
      ['Конфиденциальность', 'Коммерческая информация клиентов не разглашается. Мы дорожим репутацией и отказываемся от действий, которые могут навредить клиенту.'],
      ['На двух языках', 'Консультируем на латышском и русском, чтобы сложные налоговые вопросы были понятны на вашем языке.'],
    ],
    stepsEyebrow: 'Как начать', stepsTitle: 'Четыре шага к порядку в бухгалтерии',
    steps: [['Заявка', 'Заполните короткую форму или позвоните.'], ['Знакомство', 'Обсуждаем деятельность компании и задачи.'], ['Предложение', 'Согласуем объем услуг и цену.'], ['Работа', 'Принимаем документы и начинаем.']],
    faqEyebrow: 'Вопросы', faqTitle: 'Частые вопросы', faqAll: 'Все вопросы',
  };
  const body = `
<section class="hero"><div class="container hero__grid">
  <div>
    <span class="eyebrow">${x.eyebrow}</span>
    <h1>${x.h1}</h1>
    <p class="lead">${x.lead}</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="${href(from, lang, 'pricing')}#quote">${t[lang].cta} ${I.arrow}</a>
      <a class="btn btn--ghost" href="${href(from, lang, 'services')}">${x.second}</a>
    </div>
    <p class="hero__note">${I.shield} ${x.note}</p>
  </div>
  <div class="ledger reveal" aria-hidden="true">
    <div class="ledger__head"><span class="ledger__title">${x.ledger[0]}</span><span class="ledger__chip">${x.ledger[1]}</span></div>
    <ul>${x.ledger[2].map(([a, b], i) => `<li><span class="tick${i === 3 ? ' tick--wait' : ''}">${i === 3 ? I.clock : I.check}</span><span>${a}<br><small>${b}</small></span><small>${['01', '15', '20', '—'][i]}</small></li>`).join('')}</ul>
    <div class="ledger__stamp">${x.stamp[0]}<b>${x.stamp[1]}</b></div>
  </div>
</div></section>

<section class="section" style="padding-block:clamp(40px,6vw,72px) 0"><div class="container">
  <div class="facts reveal">${x.facts.map(([b, s]) => `<div class="fact"><b>${b}</b><span>${s}</span></div>`).join('')}</div>
</div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">${x.svcEyebrow}</span><h2>${x.svcTitle}</h2><p class="lead">${x.svcLead}</p></div>
  <div class="grid grid--4">${['accounting', 'legal', 'audit'].map((k) => areaCard(lang, from, k)).join('')}${softwareCard(lang, from)}</div>
</div></section>

<section class="section section--paper"><div class="container split split--wide">
  <div class="reveal"><span class="eyebrow">${x.whyEyebrow}</span><h2>${x.whyTitle}</h2></div>
  <div class="features">${x.why.map(([h, p], i) => `<div class="feature reveal"><span class="feature__num">0${i + 1}</span><div><h3>${h}</h3><p>${p}</p></div></div>`).join('')}</div>
</div></section>

<section class="section section--paper" style="padding-top:0"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">${x.stepsEyebrow}</span><h2>${x.stepsTitle}</h2></div>
  <ol class="steps">${x.steps.map(([h, p]) => `<li class="reveal"><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
</div></section>

<section class="section"><div class="container split">
  <div class="reveal"><span class="eyebrow">${x.faqEyebrow}</span><h2>${x.faqTitle}</h2><p><a class="card__more" href="${href(from, lang, 'faq')}">${x.faqAll} ${I.arrow}</a></p></div>
  <div class="reveal">${faqList(faq[lang].slice(0, 4))}</div>
</div></section>
${ctaBand(lang, '')}`;
  return { title: x.title, desc: x.desc, body };
};

P.services = (lang) => {
  const slug = 'services';
  const from = fileOf(lang, slug);
  const lv = lang === 'lv';
  const title = lv ? 'Pakalpojumi' : 'Услуги';
  const body = `${pageHero(lang, slug, lv ? 'Pakalpojumi uzņēmumiem' : 'Услуги для бизнеса', lv ? 'Izvēlieties nepieciešamo virzienu vai apvienojiet vairākus — grāmatvedība, juridiskie jautājumi un revīzija strādā saskaņoti.' : 'Выберите нужное направление или объедините несколько — бухгалтерия, юридические вопросы и аудит работают согласованно.')}
<section class="section"><div class="container">
  ${['accounting', 'legal', 'audit'].map((k) => {
    const a = areas[k][lang];
    return `<div class="split reveal" style="padding-block:40px;border-bottom:1px solid var(--nl-line)">
      <div><span class="card__icon">${I[areas[k].icon]}</span><h2 style="font-size:2rem">${a.title}</h2><p class="lead">${a.short}</p><a class="btn btn--ghost" href="${href(from, lang, route(k).slug)}">${t[lang].more} ${I.arrow}</a></div>
      <ul class="checklist">${a.items.map(([h, p]) => `<li>${I.check}<span><b>${h}</b><br><span class="muted">${p}</span></span></li>`).join('')}</ul>
    </div>`;
  }).join('')}
  <div class="grid grid--2" style="margin-top:48px">${softwareCard(lang, from)}
    <div class="card reveal"><span class="card__icon">${I.lang}</span><h3>${lv ? 'Latviski un krieviski' : 'На латышском и русском'}</h3><p>${lv ? 'Visas konsultācijas un sarakste — jums ērtākajā valodā.' : 'Все консультации и переписка — на удобном для вас языке.'}</p></div>
  </div>
</div></section>
${ctaBand(lang, slug)}`;
  return { title: `${title} — NIKA LAT`, desc: lv ? 'Grāmatvedības, juridiskie un zvērināta revidenta pakalpojumi uzņēmumiem Rīgā. Tekošā uzskaite, VID atskaites, gada pārskats, uzņēmumu reģistrācija.' : 'Бухгалтерские, юридические услуги и присяжный ревизор для компаний в Риге. Текущий учет, отчеты VID, годовой отчет, регистрация предприятий.', body };
};

function areaPage(key) {
  return (lang) => {
    const slug = route(key).slug;
    const from = fileOf(lang, slug);
    const a = areas[key][lang];
    const lv = lang === 'lv';
    const others = ['accounting', 'legal', 'audit'].filter((k) => k !== key);
    const body = `${pageHero(lang, slug, a.title, a.intro, t[lang].nav.services)}
<section class="section"><div class="container split split--wide">
  <div class="reveal"><span class="eyebrow">${lv ? 'Ko mēs darām' : 'Что мы делаем'}</span><h2>${lv ? 'Pakalpojuma saturs' : 'Состав услуги'}</h2>
    <p class="muted">${lv ? 'Precīzu darbu apjomu un termiņus saskaņojam pēc iepazīšanās ar uzņēmumu.' : 'Точный объем работ и сроки согласуем после знакомства с компанией.'}</p>
    <a class="btn btn--primary" href="${href(from, lang, 'pricing')}#quote">${t[lang].cta} ${I.arrow}</a></div>
  <div class="grid grid--2">${a.items.map(([h, p]) => `<div class="card reveal"><span class="card__icon" style="width:40px;height:40px">${I.check}</span><h3 style="font-size:1.1rem">${h}</h3><p style="margin:0">${p}</p></div>`).join('')}</div>
</div></section>
<section class="section section--paper"><div class="container split">
  <div class="reveal"><span class="eyebrow">${lv ? 'Kam piemērots' : 'Кому подходит'}</span><h2>${lv ? 'Kam šis pakalpojums noderēs' : 'Кому пригодится услуга'}</h2></div>
  <ul class="checklist reveal">${a.who.map((w) => `<li>${I.people}<span>${w}</span></li>`).join('')}</ul>
</div></section>
<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">${lv ? 'Saistītie pakalpojumi' : 'Связанные услуги'}</span><h2>${lv ? 'Apvienojiet ar citiem virzieniem' : 'Объедините с другими направлениями'}</h2></div>
  <div class="grid grid--3">${others.map((k) => areaCard(lang, from, k)).join('')}${softwareCard(lang, from)}</div>
</div></section>
${ctaBand(lang, slug)}`;
    return { title: `${a.title} — NIKA LAT`, desc: `${a.short} ${lv ? 'Rīgā, latviski un krieviski.' : 'В Риге, на латышском и русском.'}`, body };
  };
}
P.accounting = areaPage('accounting');
P.legal = areaPage('legal');
P.audit = areaPage('audit');

P.software = (lang) => {
  const slug = 'software';
  const lv = lang === 'lv';
  const body = `${pageHero(lang, slug, lv ? 'NIKA LAT grāmatvedības programmas' : 'Бухгалтерские программы NIKA LAT', lv ? 'Grāmatvedības komplekss “NIKA LAT” tiek izstrādāts un izplatīts visā Latvijā kopš 1993. gada. Moduļi uzskaitei, algām, pamatlīdzekļiem un ēku apsaimniekošanai.' : 'Бухгалтерский комплекс «NIKA LAT» разрабатывается и распространяется по всей Латвии с 1993 года. Модули для учета, зарплаты, основных средств и управления зданиями.', lv ? 'Programmatūra' : 'Программное обеспечение')}
<section class="section"><div class="container">
  ${software.groups.map((g) => `<div class="reveal" style="margin-bottom:56px">
    <h2 style="font-size:1.8rem">${g[lang]}</h2>${g.noteLv ? `<p class="muted">${lv ? g.noteLv : g.noteRu}</p>` : ''}
    <div class="grid grid--3" style="margin-top:20px">${g.items.map(([n, dlv, dru]) => `<div class="card"><span class="tag" style="align-self:flex-start;margin-bottom:14px">NIKA LAT</span><h3 style="font-size:1.05rem;letter-spacing:.04em">${n}</h3><p style="margin:0">${lv ? dlv : dru}</p></div>`).join('')}</div>
  </div>`).join('')}
</div></section>
<section class="section section--paper"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">${lv ? 'Atbalsts' : 'Поддержка'}</span><h2>${lv ? 'Instalācija, apmācība un apkalpošana' : 'Установка, обучение и обслуживание'}</h2><p class="lead">${lv ? 'Cenas tiek noteiktas pēc pasūtītāja prasībām un sistēmas konfigurācijas. Zemāk norādīta aprēķina bāze.' : 'Цены определяются требованиями заказчика и конфигурацией системы. Ниже указана база расчета.'}</p></div>
  <div class="table-wrap reveal"><table class="price-table">
    <thead><tr><th>${lv ? 'Pakalpojums' : 'Услуга'}</th><th>${lv ? 'Aprēķina bāze' : 'База расчета'}</th></tr></thead>
    <tbody>${software.support.map((s) => `<tr><td>${lv ? s[0] : s[1]}</td><td>${(lv ? s[2] : s[3]) || (lv ? 'pēc vienošanās' : 'по договоренности')}</td></tr>`).join('')}</tbody>
  </table></div>
</div></section>
${ctaBand(lang, slug)}`;
  return { title: lv ? 'Grāmatvedības programmas NIKA LAT' : 'Бухгалтерские программы NIKA LAT', desc: lv ? 'Grāmatvedības programmu komplekss NIKA LAT: FINUS, DARBA ALGA, PAMATLĪDZEKĻI, ēku apsaimniekošanas moduļi. Instalācija, apmācība un atbalsts.' : 'Программный комплекс NIKA LAT: FINUS, DARBA ALGA, PAMATLĪDZEKĻI, модули управления зданиями. Установка, обучение и поддержка.', body };
};

P.about = (lang) => {
  const slug = 'about';
  const lv = lang === 'lv';
  const body = `${pageHero(lang, slug, lv ? `${YEARS} gadi grāmatvedībā` : `${YEARS} лет в бухгалтерии`, lv ? 'SIA “NIKA LAT” dibināta 1993. gada 31. martā. Mūsu pamatdarbība ir grāmatvedības pakalpojumi un grāmatvedības programmu kompleksa “NIKA LAT” izplatīšana visā Latvijā.' : 'SIA “NIKA LAT” основана 31 марта 1993 года. Наша основная деятельность — бухгалтерские услуги и распространение бухгалтерского программного комплекса «NIKA LAT» по всей Латвии.', lv ? 'Par uzņēmumu' : 'О компании')}
<section class="section"><div class="container split">
  <div class="reveal">
    <span class="eyebrow">${lv ? 'Mūsu principi' : 'Наши принципы'}</span>
    <h2>${lv ? 'Profesionalitāte un pieredze' : 'Профессионализм и опыт'}</h2>
    <p class="lead">${lv ? 'Piedāvājam klientiem augstvērtīgas konsultācijas un pakalpojumus, apvienojot profesionalitāti ar pieredzi.' : 'Предлагаем клиентам консультации и услуги высокого уровня, объединяя профессионализм с опытом.'}</p>
  </div>
  <div class="features">
    ${(lv ? [
      ['Reputācija', 'Mēs vērtējam savu reputāciju un atsakāmies no darbībām, kas varētu kaitēt klientam vai uzņēmumam.'],
      ['Konfidencialitāte', 'Darbinieki apņemas neizpaust klientu komercinformāciju.'],
      ['Ētika', 'Ievērojam augstus ētikas standartus visās attiecībās ar klientiem un iestādēm.'],
    ] : [
      ['Репутация', 'Мы дорожим своей репутацией и отказываемся от действий, которые могут навредить клиенту или компании.'],
      ['Конфиденциальность', 'Сотрудники обязуются не разглашать коммерческую информацию клиентов.'],
      ['Этика', 'Соблюдаем высокие этические стандарты в отношениях с клиентами и учреждениями.'],
    ]).map(([h, p], i) => `<div class="feature reveal"><span class="feature__num">0${i + 1}</span><div><h3>${h}</h3><p>${p}</p></div></div>`).join('')}
  </div>
</div></section>
<section class="section section--paper"><div class="container split">
  <div class="reveal"><span class="eyebrow">${lv ? 'Vēsture' : 'История'}</span><h2>${lv ? 'Galvenie pagrieziena punkti' : 'Ключевые вехи'}</h2></div>
  <ol class="timeline reveal">
    <li><b>1993</b><p>${lv ? '31. martā dibināta SIA “NIKA LAT”. Sākta grāmatvedības pakalpojumu sniegšana un programmu kompleksa “NIKA LAT” izplatīšana.' : '31 марта основана SIA “NIKA LAT”. Начато оказание бухгалтерских услуг и распространение программного комплекса «NIKA LAT».'}</p></li>
    <li><b>2013–2014</b><p>${lv ? 'Projektā “Partnerība biznesa konkurētspējai” (ESF līdzfinansējums) darbinieki apguva 200 stundu programmu “Praktiskā grāmatvedība atbilstoši Latvijas un starptautiskiem normatīviem aktiem”.' : 'В проекте «Partnerība biznesa konkurētspējai» (софинансирование ESF) сотрудники прошли 200-часовую программу «Практическая бухгалтерия по нормативным актам Латвии и международным стандартам».'}</p></li>
    <li><b>${new Date().getFullYear()}</b><p>${lv ? 'Grāmatvedība, juridiskie un zvērināta revidenta pakalpojumi, kā arī NIKA LAT programmas — latviski un krieviski.' : 'Бухгалтерия, юридические услуги и присяжный ревизор, а также программы NIKA LAT — на латышском и русском.'}</p></li>
  </ol>
</div></section>
${ctaBand(lang, slug)}`;
  return { title: lv ? 'Par mums — NIKA LAT' : 'О компании — NIKA LAT', desc: lv ? 'SIA “NIKA LAT” dibināta 1993. gadā. Grāmatvedības pakalpojumi un programmas, profesionalitāte, konfidencialitāte un augsti ētikas standarti.' : 'SIA “NIKA LAT” основана в 1993 году. Бухгалтерские услуги и программы, профессионализм, конфиденциальность и высокие этические стандарты.', body };
};

P.pricing = (lang) => {
  const slug = 'pricing';
  const lv = lang === 'lv';
  const q = lv ? {
    h: 'Individuāls piedāvājums 2 minūtēs', lead: 'Atbildiet uz dažiem jautājumiem — mēs sagatavosim cenu jūsu uzņēmumam. Tas ir bez saistībām.',
    factorsT: 'No kā atkarīga cena', factors: [['Dokumentu apjoms', 'Rēķinu, bankas un kases operāciju skaits mēnesī.'], ['Darbinieki', 'Algu aprēķins un darbinieku atskaites.'], ['PVN statuss', 'PVN maksātājiem ir papildu deklarācijas.'], ['Papildu pakalpojumi', 'Juridiskais atbalsts, revīzija, konsultācijas.']],
    s1: 'Kas jums nepieciešams?', svc: ['Grāmatvedība', 'Juridiskie pakalpojumi', 'Revidents', 'NIKA LAT programmas', 'Konsultācija'],
    s2: 'Par uzņēmumu', form: 'Uzņēmuma forma', forms: ['SIA', 'Individuālais komersants', 'Pašnodarbinātais', 'Biedrība / nodibinājums', 'Vēl nav reģistrēts'],
    vat: 'PVN maksātājs', yesno: ['Jā', 'Nē', 'Nezinu'], docs: 'Dokumenti mēnesī', docsOpt: ['līdz 30', '30–100', '100–300', 'vairāk nekā 300'], emp: 'Darbinieku skaits', empOpt: ['0', '1–5', '6–20', 'vairāk nekā 20'],
    s3: 'Kontakti', name: 'Vārds', company: 'Uzņēmums', contact: 'Tālrunis vai e-pasts', langQ: 'Saziņas valoda', langs: ['Latviešu', 'Krievu'], msg: 'Komentārs (nav obligāti)',
    consent: 'Piekrītu, ka mani dati tiek izmantoti piedāvājuma sagatavošanai.', summary: 'Jūsu pieprasījums', back: 'Atpakaļ', next: 'Tālāk', send: 'Nosūtīt pieprasījumu',
    note: 'Pēc nosūtīšanas atvērsies jūsu e-pasta programma ar sagatavotu vēstuli.', ok: 'Vēstule sagatavota. Nosūtiet to no e-pasta programmas. Ja tā neatvērās, rakstiet uz ' + C.email + '.', subject: 'Pieprasījums: grāmatvedības piedāvājums',
  } : {
    h: 'Индивидуальное предложение за 2 минуты', lead: 'Ответьте на несколько вопросов — мы подготовим цену для вашей компании. Без обязательств.',
    factorsT: 'От чего зависит цена', factors: [['Объем документов', 'Количество счетов, банковских и кассовых операций в месяц.'], ['Сотрудники', 'Расчет зарплаты и отчеты по сотрудникам.'], ['Статус НДС', 'Для плательщиков НДС — дополнительные декларации.'], ['Дополнительные услуги', 'Юридическая поддержка, аудит, консультации.']],
    s1: 'Что вам нужно?', svc: ['Бухгалтерия', 'Юридические услуги', 'Ревизор', 'Программы NIKA LAT', 'Консультация'],
    s2: 'О компании', form: 'Форма предприятия', forms: ['SIA', 'Индивидуальный коммерсант', 'Самозанятый', 'Общество / фонд', 'Еще не зарегистрирована'],
    vat: 'Плательщик НДС', yesno: ['Да', 'Нет', 'Не знаю'], docs: 'Документов в месяц', docsOpt: ['до 30', '30–100', '100–300', 'более 300'], emp: 'Число сотрудников', empOpt: ['0', '1–5', '6–20', 'более 20'],
    s3: 'Контакты', name: 'Имя', company: 'Компания', contact: 'Телефон или email', langQ: 'Язык общения', langs: ['Латышский', 'Русский'], msg: 'Комментарий (необязательно)',
    consent: 'Согласен(-на) на использование моих данных для подготовки предложения.', summary: 'Ваш запрос', back: 'Назад', next: 'Далее', send: 'Отправить запрос',
    note: 'После отправки откроется ваша почтовая программа с подготовленным письмом.', ok: 'Письмо подготовлено. Отправьте его из почтовой программы. Если она не открылась, напишите на ' + C.email + '.', subject: 'Запрос: предложение по бухгалтерии',
  };
  const radios = (name, label, opts, req) => `<fieldset class="field" data-label="${label}"><legend>${label}</legend><div class="choices">${opts.map((o, i) => `<label class="choice"><input type="radio" name="${name}" value="${o}"${req && i === 0 ? ' required' : ''}><span>${o}</span></label>`).join('')}</div></fieldset>`;
  const checks = (name, label, opts) => `<fieldset class="field" data-label="${label}"><legend>${label}</legend><div class="choices">${opts.map((o) => `<label class="choice"><input type="checkbox" name="${name}" value="${o}"><span>${o}</span></label>`).join('')}</div></fieldset>`;
  const body = `${pageHero(lang, slug, lv ? 'Cik maksā grāmatvedība?' : 'Сколько стоит бухгалтерия?', q.lead, t[lang].nav.pricing)}
<section class="section section--paper"><div class="container split split--wide">
  <div class="reveal">
    <h2 style="font-size:1.9rem">${q.factorsT}</h2>
    <div class="features" style="margin-top:24px">${q.factors.map(([h, p], i) => `<div class="feature"><span class="feature__num">0${i + 1}</span><div><h3>${h}</h3><p>${p}</p></div></div>`).join('')}</div>
  </div>
  <form class="form-card form" id="quote" data-wizard data-subject="${q.subject}" novalidate>
    <h2 style="font-size:1.6rem;margin:0">${q.h}</h2>
    <div class="wizard__progress" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
    <div class="wizard__step">${checks('svc', q.s1, q.svc)}</div>
    <div class="wizard__step">
      ${radios('form', q.form, q.forms, true)}
      ${radios('vat', q.vat, q.yesno)}
      <div class="field-row">
        <div class="field"><label for="q-docs">${q.docs}</label><select id="q-docs" data-label="${q.docs}">${q.docsOpt.map((o) => `<option>${o}</option>`).join('')}</select></div>
        <div class="field"><label for="q-emp">${q.emp}</label><select id="q-emp" data-label="${q.emp}">${q.empOpt.map((o) => `<option>${o}</option>`).join('')}</select></div>
      </div>
    </div>
    <div class="wizard__step">
      <div class="field-row">
        <div class="field"><label for="q-name">${q.name}</label><input id="q-name" data-label="${q.name}" autocomplete="name" required></div>
        <div class="field"><label for="q-company">${q.company}</label><input id="q-company" data-label="${q.company}" autocomplete="organization"></div>
      </div>
      <div class="field"><label for="q-contact">${q.contact}</label><input id="q-contact" data-label="${q.contact}" autocomplete="email" required></div>
      ${radios('lang', q.langQ, q.langs)}
      <div class="field"><label for="q-msg">${q.msg}</label><textarea id="q-msg" data-label="${q.msg}" rows="3"></textarea></div>
    </div>
    <div class="wizard__step">
      <div class="field"><b>${q.summary}</b><div class="wizard__summary"></div></div>
      <label class="consent"><input type="checkbox" required> ${q.consent}</label>
      <p class="form-note">${q.note}</p>
      <div class="form-status" role="status">${q.ok}</div>
    </div>
    <div class="wizard__nav">
      <button class="btn btn--ghost" type="button" data-prev>${q.back}</button>
      <button class="btn btn--primary" type="button" data-next style="margin-left:auto">${q.next} ${I.arrow}</button>
      <button class="btn btn--primary" type="submit" data-send style="margin-left:auto">${q.send}</button>
    </div>
  </form>
</div></section>`;
  return { title: lv ? 'Izmaksas — pieprasīt piedāvājumu | NIKA LAT' : 'Стоимость — запросить предложение | NIKA LAT', desc: lv ? 'Uzziniet grāmatvedības pakalpojumu cenu savam uzņēmumam: īss pieprasījums, individuāls piedāvājums bez saistībām.' : 'Узнайте цену бухгалтерских услуг для своей компании: короткий запрос, индивидуальное предложение без обязательств.', body };
};

P.clients = (lang) => {
  const slug = 'clients';
  const lv = lang === 'lv';
  const docs = lv
    ? ['Bankas konta izraksti par mēnesi', 'Izrakstītie un saņemtie rēķini', 'Kases dokumenti un čeki', 'Līgumi un pieņemšanas–nodošanas akti', 'Darba laika uzskaite un izmaiņas personālā', 'Avansa norēķini un ceļazīmes']
    : ['Выписки банковского счета за месяц', 'Выставленные и полученные счета', 'Кассовые документы и чеки', 'Договоры и акты приемки-передачи', 'Учет рабочего времени и изменения в персонале', 'Авансовые отчеты и путевые листы'];
  const links = [
    ['VID Elektroniskās deklarēšanas sistēma', 'https://eds.vid.gov.lv/'],
    [lv ? 'VID nodokļu kalendārs' : 'Налоговый календарь VID', 'https://www.vid.gov.lv/lv/notikumu-kalendars'],
    [lv ? 'Uzņēmumu reģistrs' : 'Регистр предприятий', 'https://www.ur.gov.lv/'],
    ['Latvija.lv', 'https://www.latvija.lv/'],
  ];
  const body = `${pageHero(lang, slug, lv ? 'Klientiem' : 'Клиентам', lv ? 'Praktiska informācija esošajiem klientiem: kādi dokumenti jāiesniedz, kad un kur atrast oficiālos termiņus.' : 'Практическая информация для действующих клиентов: какие документы передавать, когда и где смотреть официальные сроки.')}
<section class="section"><div class="container split">
  <div class="reveal"><span class="eyebrow">${lv ? 'Katru mēnesi' : 'Каждый месяц'}</span><h2>${lv ? 'Dokumentu kontrolsaraksts' : 'Чек-лист документов'}</h2>
    <p class="lead">${lv ? 'Lai atskaites tiktu sagatavotas laikā, iesniedziet iepriekšējā mēneša dokumentus līdz saskaņotajam datumam.' : 'Чтобы отчеты были готовы вовремя, передавайте документы за прошлый месяц до согласованной даты.'}</p>
    <p class="note">${lv ? 'Konkrēto iesniegšanas datumu un kanālu (e-pasts, klātienē) saskaņojiet ar savu grāmatvedi.' : 'Конкретную дату и способ передачи (email, лично) согласуйте со своим бухгалтером.'}</p></div>
  <ul class="checklist reveal">${docs.map((d) => `<li>${I.check}<span>${d}</span></li>`).join('')}</ul>
</div></section>
<section class="section section--paper"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">${lv ? 'Noderīgas saites' : 'Полезные ссылки'}</span><h2>${lv ? 'Oficiālie resursi' : 'Официальные ресурсы'}</h2></div>
  <div class="grid grid--4">${links.map(([n, u]) => `<a class="card reveal" href="${u}" target="_blank" rel="noopener"><h3 style="font-size:1.08rem">${n}</h3><p style="font-size:.85rem;word-break:break-all">${u.replace('https://', '')}</p><span class="card__more">${lv ? 'Atvērt' : 'Открыть'} ${I.arrow}</span></a>`).join('')}</div>
</div></section>
${ctaBand(lang, slug)}`;
  return { title: lv ? 'Klientiem — NIKA LAT' : 'Клиентам — NIKA LAT', desc: lv ? 'Dokumentu kontrolsaraksts un noderīgas saites NIKA LAT klientiem: VID EDS, nodokļu kalendārs, Uzņēmumu reģistrs.' : 'Чек-лист документов и полезные ссылки для клиентов NIKA LAT: VID EDS, налоговый календарь, Регистр предприятий.', body };
};

P.faq = (lang) => {
  const slug = 'faq';
  const lv = lang === 'lv';
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq[lang].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const body = `${pageHero(lang, slug, lv ? 'Bieži uzdotie jautājumi' : 'Частые вопросы', lv ? 'Neatradāt atbildi? Piezvaniet vai uzrakstiet mums.' : 'Не нашли ответ? Позвоните или напишите нам.')}
<section class="section"><div class="container" style="max-width:880px">${faqList(faq[lang])}</div></section>
${ctaBand(lang, slug)}`;
  return { title: lv ? 'BUJ — NIKA LAT' : 'Вопросы и ответы — NIKA LAT', desc: lv ? 'Atbildes uz biežākajiem jautājumiem par grāmatvedības pakalpojumiem, cenām, VID atskaitēm un sadarbību ar NIKA LAT.' : 'Ответы на частые вопросы о бухгалтерских услугах, ценах, отчетах VID и работе с NIKA LAT.', body, schema };
};

P.contacts = (lang) => {
  const slug = 'contacts';
  const lv = lang === 'lv';
  const f = lv
    ? { name: 'Vārds', contact: 'Tālrunis vai e-pasts', topic: 'Tēma', topics: ['Grāmatvedība', 'Juridiskie pakalpojumi', 'Revidents', 'NIKA LAT programmas', 'Cits'], msg: 'Ziņa', send: 'Sagatavot vēstuli', subject: 'Ziņa no mājaslapas', ok: 'Vēstule sagatavota jūsu e-pasta programmā.', note: 'Atvērsies jūsu e-pasta programma.' }
    : { name: 'Имя', contact: 'Телефон или email', topic: 'Тема', topics: ['Бухгалтерия', 'Юридические услуги', 'Ревизор', 'Программы NIKA LAT', 'Другое'], msg: 'Сообщение', send: 'Подготовить письмо', subject: 'Сообщение с сайта', ok: 'Письмо подготовлено в вашей почтовой программе.', note: 'Откроется ваша почтовая программа.' };
  const body = `${pageHero(lang, slug, lv ? 'Sazināties ar mums' : 'Связаться с нами', lv ? 'Atbildam latviski un krieviski. Pastāstiet par savu uzdevumu — vienosimies par nākamo soli.' : 'Отвечаем на латышском и русском. Расскажите о своей задаче — договоримся о следующем шаге.')}
<section class="section section--ink"><div class="container split">
  <div class="reveal">
    <ul class="contact-list">
      <li><a href="tel:${C.tel}"><span class="ic">${I.phone}</span><span>${C.phone}<small>${lv ? 'Tālrunis' : 'Телефон'}</small></span></a></li>
      <li><a href="mailto:${C.email}"><span class="ic">${I.mail}</span><span>${C.email}<small>E-pasts / Email</small></span></a></li>
      <li><a href="https://www.google.com/maps/search/?api=1&query=Riga" target="_blank" rel="noopener"><span class="ic">${I.pin}</span><span>${C.city}, Latvija<small>${lv ? 'Adresi precizēsim pēc pieprasījuma' : 'Адрес уточним по запросу'}</small></span></a></li>
    </ul>
    <p>${lv ? 'Pēc zvana vai vēstules vienosimies par tikšanos klātienē vai attālināti.' : 'После звонка или письма договоримся о встрече лично или удаленно.'}</p>
  </div>
  <form class="form-card form reveal" data-mail="${f.subject}">
    <div class="field-row">
      <div class="field"><label for="c-name">${f.name}</label><input id="c-name" data-label="${f.name}" autocomplete="name" required></div>
      <div class="field"><label for="c-contact">${f.contact}</label><input id="c-contact" data-label="${f.contact}" required></div>
    </div>
    <div class="field"><label for="c-topic">${f.topic}</label><select id="c-topic" data-label="${f.topic}">${f.topics.map((o) => `<option>${o}</option>`).join('')}</select></div>
    <div class="field"><label for="c-msg">${f.msg}</label><textarea id="c-msg" data-label="${f.msg}" required></textarea></div>
    <button class="btn btn--primary" type="submit">${f.send} ${I.arrow}</button>
    <p class="form-note">${f.note}</p>
    <div class="form-status" role="status">${f.ok}</div>
  </form>
</div></section>`;
  return { title: lv ? 'Kontakti — NIKA LAT' : 'Контакты — NIKA LAT', desc: `NIKA LAT: ${C.phone}, ${C.email}. ${lv ? 'Grāmatvedības pakalpojumi Rīgā.' : 'Бухгалтерские услуги в Риге.'}`, body };
};

P.privacy = (lang) => {
  const slug = 'privacy';
  const lv = lang === 'lv';
  const body = `${pageHero(lang, slug, t[lang].nav.privacy, '')}
<section class="section"><div class="container prose">
  <p class="note">${lv ? 'Priekšskatījuma teksts. Pirms publicēšanas to jāsaskaņo ar uzņēmuma faktisko datu apstrādes kārtību.' : 'Текст для предпросмотра. До публикации его нужно согласовать с фактическим порядком обработки данных в компании.'}</p>
  ${lv ? `<h2>Pārzinis</h2><p>${C.name}, e-pasts ${C.email}, tālrunis ${C.phone}.</p>
  <h2>Kādus datus mēs saņemam</h2><p>Vietnes formas nesūta datus uz serveri: tās sagatavo e-pasta vēstuli jūsu e-pasta programmā. Mēs saņemam tikai to informāciju, kuru jūs paši nosūtāt pa e-pastu vai sniedzat pa tālruni.</p>
  <h2>Kādam nolūkam</h2><p>Lai atbildētu uz jūsu pieprasījumu, sagatavotu piedāvājumu un sniegtu pakalpojumus saskaņā ar Vispārīgo datu aizsardzības regulu (VDAR).</p>
  <h2>Jūsu tiesības</h2><p>Jums ir tiesības pieprasīt piekļuvi saviem datiem, to labošanu vai dzēšanu, rakstot uz ${C.email}.</p>
  <h2>Trešo pušu pakalpojumi</h2><p>Vietne izmanto tērzēšanas asistentu Chatbase. Šrifti tiek ielādēti no šīs pašas vietnes.</p>` : `<h2>Контролер</h2><p>${C.name}, email ${C.email}, телефон ${C.phone}.</p>
  <h2>Какие данные мы получаем</h2><p>Формы сайта не отправляют данные на сервер: они готовят письмо в вашей почтовой программе. Мы получаем только ту информацию, которую вы сами отправили по email или сообщили по телефону.</p>
  <h2>С какой целью</h2><p>Чтобы ответить на ваш запрос, подготовить предложение и оказать услуги в соответствии с Общим регламентом по защите данных (GDPR).</p>
  <h2>Ваши права</h2><p>Вы вправе запросить доступ к своим данным, их исправление или удаление, написав на ${C.email}.</p>
  <h2>Сторонние сервисы</h2><p>Сайт использует чат-ассистента Chatbase. Шрифты загружаются с этого же сайта.</p>`}
</div></section>`;
  return { title: `${t[lang].nav.privacy} — NIKA LAT`, desc: lv ? 'NIKA LAT privātuma politika.' : 'Политика конфиденциальности NIKA LAT.', body };
};

// ---------- write ----------
let count = 0;
for (const lang of LANGS) {
  for (const r of routes) {
    const page = P[r.key](lang);
    const out = join(ROOT, fileOf(lang, r.slug));
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, layout({ lang, slug: r.slug, ...page }));
    count++;
  }
}
const urls = LANGS.flatMap((l) => routes.map((r) => `  <url><loc>${C.siteUrl}${l}/${r.slug ? r.slug + '/' : ''}</loc></url>`));
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
console.log(`Built ${count} pages`);

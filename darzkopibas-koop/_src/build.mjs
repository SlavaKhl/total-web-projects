// Static site generator for the gardening cooperative site. No dependencies.
// Run: node darzkopibas-koop/_src/build.mjs  → writes darzkopibas-koop/**/index.html
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { org as O, board, routes, news, documents, fees, season, faq } from './content.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// ---------- helpers ----------
// [[text]] → highlighted placeholder in HTML; plain() strips the brackets for attributes.
const ph = (s) => String(s).replace(/\[\[(.+?)\]\]/g, '<mark class="ph" title="Jāaizpilda">$1</mark>');
const plain = (s) => String(s).replace(/\[\[(.+?)\]\]/g, '$1').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fileOf = (slug) => join(slug, 'index.html');
// Relative link ending in index.html, so pages also work when opened from disk.
const href = (from, slug) => relative(dirname(from), fileOf(slug)).split('\\').join('/') || 'index.html';
const asset = (from, p) => relative(dirname(from), join('assets', p)).split('\\').join('/');
const route = (key) => routes.find((r) => r.key === key);
const MONTHS = ['janvārī', 'februārī', 'martā', 'aprīlī', 'maijā', 'jūnijā', 'jūlijā', 'augustā', 'septembrī', 'oktobrī', 'novembrī', 'decembrī'];
const lvDate = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${y}. gada ${d}. ${MONTHS[m - 1]}`; };

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
function layout({ slug, title, desc, body }) {
  const from = fileOf(slug);
  const key = routes.find((r) => r.slug === slug).key;
  const nav = routes.map((r) => `<li><a href="${href(from, r.slug)}"${r.key === key ? ' aria-current="page"' : ''}>${r.nav}</a></li>`).join('');
  const fullTitle = key === 'home' ? plain(O.short) + ' — ' + O.tagline : `${title} — ${plain(O.short)}`;
  return `<!doctype html>
<html lang="lv" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${plain(desc)}">
<meta name="robots" content="noindex, nofollow">
<meta property="og:type" content="website">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${plain(desc)}">
<meta property="og:locale" content="lv_LV">
<meta name="theme-color" content="#2F5233">
<link rel="icon" href="${asset(from, 'favicon.svg')}" type="image/svg+xml">
<link rel="stylesheet" href="${asset(from, 'site.css')}">
</head>
<body>
<a class="skip" href="#main">Pāriet uz saturu</a>
<div class="draft-bar">Melnraksts: <mark class="ph">iezīmētais teksts</mark> vēl jāaizstāj ar īstajiem datiem.</div>
<header class="header">
  <div class="container header__inner">
    <a class="brand" href="${href(from, '')}">${mark}<span><span class="brand__name">${ph(O.short)}</span><span class="brand__tag">${O.tagline}</span></span></a>
    <nav class="nav" aria-label="Galvenā izvēlne"><ul>${nav}</ul></nav>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Izvēlne"><span></span></button>
  </div>
  <nav class="mobile-nav" id="mobile-nav" aria-label="Izvēlne"><ul>${nav}</ul></nav>
</header>
<main id="main">
${ph(body)}
</main>
<footer class="footer">
  <div class="container footer__grid">
    <div>
      <a class="brand brand--light" href="${href(from, '')}">${mark}<span><span class="brand__name">${ph(O.short)}</span><span class="brand__tag">${O.tagline}</span></span></a>
      <p class="footer__small">Reģ. Nr. ${ph(O.regNr)}<br>${ph(O.address)}</p>
    </div>
    <div><h2>Sadaļas</h2><ul>${routes.slice(1).map((r) => `<li><a href="${href(from, r.slug)}">${r.nav}</a></li>`).join('')}</ul></div>
    <div><h2>Sazināties</h2><ul>
      <li><a href="tel:${O.tel}">${ph(O.phone)}</a></li>
      <li><a href="mailto:${O.emailRaw}">${ph(O.email)}</a></li>
      <li>${O.hours.slice(0, 2).map(([d, h]) => `${d}: ${ph(h)}`).join('<br>')}</li>
    </ul></div>
  </div>
  <div class="container footer__bottom">© <span data-year>2026</span> ${ph(O.name)}</div>
</footer>
<script src="${asset(from, 'site.js')}" defer></script>
</body>
</html>
`;
}

function pageHero(slug, title, lead) {
  const from = fileOf(slug);
  return `<section class="page-hero"><div class="container">
  <ol class="crumbs"><li><a href="${href(from, '')}">Sākums</a></li><li aria-current="page">${route(routes.find((r) => r.slug === slug).key).nav}</li></ol>
  <h1>${title}</h1>
  ${lead ? `<p class="lead">${lead}</p>` : ''}
</div></section>`;
}

const newsCard = (n) => `<article class="news-card">
  <div class="news-card__meta"><time datetime="${n.date}">${lvDate(n.date)}</time><span class="tag">${n.tag}</span>${n.example ? '<span class="tag tag--ph">paraugs</span>' : ''}</div>
  <h3>${ph(n.title)}</h3>
  <p>${ph(n.text)}</p>
</article>`;

const faqList = () => `<div class="faq">${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${ph(a)}</p></details>`).join('')}</div>`;

// Simple garden illustration for the home hero (until real photos arrive).
const heroArt = `<svg class="hero__art" viewBox="0 0 480 360" role="img" aria-label="Dārza ilustrācija">
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
const P = {};

P.home = () => {
  const from = fileOf('');
  const quick = [
    ['news', I.news, 'Jaunumi', 'Paziņojumi, talkas un ūdens padeves izmaiņas.'],
    ['members', I.euro, 'Maksājumi', 'Biedru maksa, rekvizīti un termiņi.'],
    ['docs', I.file, 'Dokumenti', 'Statūti, noteikumi, protokoli un veidlapas.'],
    ['contacts', I.phone, 'Valde', 'Pieņemšanas laiki un kontakti.'],
  ];
  return layout({
    slug: '',
    title: 'Sākums',
    desc: `${O.name}: jaunumi, dokumenti, maksājumi un kontakti dārzkopības kooperatīva biedriem.`,
    body: `<section class="hero"><div class="container hero__grid">
  <div>
    <span class="eyebrow">${I.leaf} Dārzkopības kooperatīvā sabiedrība kopš ${ph(O.founded)}</span>
    <h1>Mūsu dārzi, mūsu <em>kopiena</em>.</h1>
    <p class="lead">${ph(O.short)} apvieno ${ph(O.plots)} dārzu īpašniekus. Mēs kopā rūpējamies par ceļiem, ūdensapgādi un kārtību, lai katram būtu patīkami strādāt un atpūsties savā dārzā.</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="${href(from, 'biedriem')}">Informācija biedriem ${I.arrow}</a>
      <a class="btn btn--ghost" href="${href(from, 'kontakti')}">Sazināties ar valdi</a>
    </div>
  </div>
  ${heroArt}
</div></section>

<section class="section section--tight"><div class="container">
  <div class="notice">${I.bell}<div><strong>Svarīgi:</strong> ${ph(news[0].title)}. ${ph(news[0].text)} <a href="${href(from, 'jaunumi')}">Visi jaunumi</a></div></div>
</div></section>

<section class="section"><div class="container">
  <div class="quick">${quick.map(([k, icon, t, d]) => `<a class="quick__item" href="${href(from, route(k).slug)}"><span class="icon-circle">${icon}</span><h2>${t}</h2><p>${d}</p></a>`).join('')}</div>
</div></section>

<section class="section section--cream"><div class="container">
  <div class="section-head"><h2>Jaunākie paziņojumi</h2><a class="link-more" href="${href(from, 'jaunumi')}">Visi jaunumi ${I.arrow}</a></div>
  <div class="news-grid">${news.slice(0, 3).map(newsCard).join('')}</div>
</div></section>

<section class="section"><div class="container split">
  <div>
    <h2>Dārzu sezona</h2>
    <p class="muted">Galvenie darbi un notikumi gada laikā. Precīzus datumus valde paziņo sadaļā „Jaunumi”.</p>
  </div>
  <ol class="timeline">${season.map(([m, t]) => `<li><strong>${m}</strong><span>${t}</span></li>`).join('')}</ol>
</div></section>

<section class="section section--green"><div class="container stats">
  <div><b>${ph(O.plots)}</b><span>dārzu gabali</span></div>
  <div><b>${ph(O.area)} ha</b><span>kopējā teritorija</span></div>
  <div><b>${ph(O.founded)}</b><span>dibināšanas gads</span></div>
</div></section>`,
  });
};

P.about = () => layout({
  slug: 'par-mums',
  title: 'Par mums',
  desc: `Par ${O.name}: vēsture, mērķi, valde un pārvaldība.`,
  body: `${pageHero('par-mums', 'Par mums', `${ph(O.name)} ir dārzu īpašnieku kopīgi dibināta organizācija, kas apsaimnieko kopīpašumu un pārstāv biedru intereses.`)}
<section class="section"><div class="container split">
  <div class="prose">
    <h2>Mūsu vēsture</h2>
    <p>Dārzkopības sabiedrība dibināta ${ph(O.founded)}. gadā. [[Šeit būs īss stāsts par kooperatīva vēsturi: kā radās dārzi, kas tika uzbūvēts, kādi bijuši svarīgākie notikumi.]]</p>
    <p>Šodien kooperatīva teritorijā ir ${ph(O.plots)} dārzu gabali ${ph(O.area)} ha platībā. Daudzi biedri dārzā pavada visu vasaru, citi te pastāvīgi dzīvo.</p>
    <h2>Ko mēs darām</h2>
    <ul class="checks">
      <li>Uzturam iekšējos ceļus, vārtus un apgaismojumu</li>
      <li>Nodrošinām ūdensapgādi dārzu sezonā</li>
      <li>Organizējam atkritumu izvešanu</li>
      <li>Rīkojam talkas un biedru kopsapulces</li>
      <li>Sadarbojamies ar pašvaldību un pakalpojumu sniedzējiem</li>
    </ul>
  </div>
  <aside class="card">
    <h2>Pamatinformācija</h2>
    <dl class="facts">
      <dt>Nosaukums</dt><dd>${ph(O.name)}</dd>
      <dt>Reģ. Nr.</dt><dd>${ph(O.regNr)}</dd>
      <dt>Juridiskā adrese</dt><dd>${ph(O.address)}</dd>
      <dt>Dibināta</dt><dd>${ph(O.founded)}</dd>
      <dt>Dārzu gabali</dt><dd>${ph(O.plots)}</dd>
    </dl>
  </aside>
</div></section>
<section class="section section--cream"><div class="container">
  <h2>Pārvaldība</h2>
  <p class="muted narrow">Augstākā lēmējinstitūcija ir biedru kopsapulce. Ikdienas darbu vada valde, ko ievēlē kopsapulce. Finanšu darbību pārbauda revidents.</p>
  <div class="people">${board.map(([role, name, phone]) => `<div class="person"><span class="icon-circle">${I.people}</span><div><span class="person__role">${role}</span><strong>${ph(name)}</strong>${phone ? `<a href="tel:${plain(phone).replace(/\s/g, '')}">${ph(phone)}</a>` : ''}</div></div>`).join('')}</div>
</div></section>`,
});

P.news = () => layout({
  slug: 'jaunumi',
  title: 'Jaunumi',
  desc: `Jaunumi un paziņojumi biedriem: talkas, ūdensapgāde, maksājumi un kopsapulces. ${O.short}.`,
  body: `${pageHero('jaunumi', 'Jaunumi', 'Valdes paziņojumi, talkas un svarīgākā informācija biedriem.')}
<section class="section"><div class="container">
  <div class="news-list">${news.map(newsCard).join('')}</div>
</div></section>`,
});

P.docs = () => layout({
  slug: 'dokumenti',
  title: 'Dokumenti',
  desc: `Statūti, iekšējās kārtības noteikumi, kopsapulču protokoli, gada pārskati un veidlapas. ${O.short}.`,
  body: `${pageHero('dokumenti', 'Dokumenti un statūti', 'Kooperatīva pamatdokumenti, kopsapulču lēmumi un veidlapas biedriem.')}
<section class="section"><div class="container doc-groups">
  ${documents.map((g) => `<div><h2>${g.group}</h2><ul class="docs">${g.items.map((d) => {
    const inner = `<span class="icon-circle icon-circle--sm">${I.file}</span><span class="docs__text"><strong>${ph(d.title)}</strong>${d.note ? `<small>${ph(d.note)}</small>` : ''}</span>`;
    return d.file
      ? `<li><a class="docs__item" href="docs/${d.file}" download>${inner}<span class="docs__action">Lejupielādēt PDF</span></a></li>`
      : `<li><div class="docs__item is-missing">${inner}<span class="docs__action">Drīzumā</span></div></li>`;
  }).join('')}</ul></div>`).join('')}
  <p class="muted">Ja nepieciešams dokuments, kura šeit nav, rakstiet valdei: <a href="mailto:${O.emailRaw}">${ph(O.email)}</a>.</p>
</div></section>`,
});

P.members = () => {
  const from = fileOf('biedriem');
  return layout({
    slug: 'biedriem',
    title: 'Biedriem',
    desc: `Biedru maksa, rekvizīti, ūdens skaitītāju rādījumi, kārtības noteikumi un biežāk uzdotie jautājumi. ${O.short}.`,
    body: `${pageHero('biedriem', 'Informācija biedriem', 'Maksājumi, ūdens skaitītāju rādījumi, kārtības noteikumi un atbildes uz biežākajiem jautājumiem.')}
<section class="section"><div class="container split">
  <div>
    <h2>Maksas</h2>
    <p class="muted">Maksu apmēru katru gadu apstiprina biedru kopsapulce. Samaksas termiņš: ${ph('[[31. oktobris]]')}.</p>
    <table class="table"><thead><tr><th>Maksājums</th><th>Apmērs</th></tr></thead><tbody>
      ${fees.map(([n, a, d]) => `<tr><td><strong>${n}</strong><small>${d}</small></td><td>${ph(a)}</td></tr>`).join('')}
    </tbody></table>
  </div>
  <aside class="card card--green">
    <h2>${I.euro} Rekvizīti</h2>
    <dl class="facts">
      <dt>Saņēmējs</dt><dd>${ph(O.name)}</dd>
      <dt>Reģ. Nr.</dt><dd>${ph(O.regNr)}</dd>
      <dt>Banka</dt><dd>${ph(O.bank.name)}, ${ph(O.bank.swift)}</dd>
      <dt>Konts</dt><dd class="mono">${ph(O.bank.iban)}</dd>
      <dt>Mērķis</dt><dd>Gabala Nr., vārds, uzvārds, maksājuma veids</dd>
    </dl>
  </aside>
</div></section>
<section class="section section--cream"><div class="container split">
  <div>
    <h2>${I.drop} Ūdens skaitītāju rādījumi</h2>
    <p>Sūtiet rādījumu valdei e-pastā vai īsziņā. Norādiet gabala numuru, rādījumu un datumu.</p>
    <form class="form" data-mail="${O.emailRaw}" data-subject="Ūdens skaitītāja rādījums">
      <div class="form__row">
        <label>Gabala Nr.<input name="Gabala Nr." required inputmode="numeric"></label>
        <label>Rādījums (m³)<input name="Rādījums" required inputmode="decimal"></label>
      </div>
      <label>Vārds, uzvārds<input name="Vārds, uzvārds" required autocomplete="name"></label>
      <button class="btn btn--primary" type="submit">Sagatavot e-pastu ${I.mail}</button>
      <p class="form__hint">Poga atver jūsu e-pasta programmu ar sagatavotu vēstuli.</p>
    </form>
  </div>
  <div>
    <h2>Kārtības noteikumi īsumā</h2>
    <ul class="checks">
      <li>Klusums no plkst. ${ph('[[23:00]]')} līdz ${ph('[[7:00]]')}</li>
      <li>Kūlas dedzināšana aizliegta, ugunskurus kurt tikai drošā vietā</li>
      <li>Pa iekšējiem ceļiem brauciet lēni, ne ātrāk par ${ph('[[20]]')} km/h</li>
      <li>Grāvjus un ceļmalas pie sava gabala uzturiet kārtībā</li>
      <li>Atkritumus šķirojiet un nemetiet konteinerā būvgružus</li>
    </ul>
    <p><a class="link-more" href="${href(from, 'dokumenti')}">Pilni noteikumi sadaļā „Dokumenti” ${I.arrow}</a></p>
  </div>
</div></section>
<section class="section"><div class="container narrow">
  <h2>Biežāk uzdotie jautājumi</h2>
  ${faqList()}
</div></section>`,
  });
};

P.contacts = () => {
  const { lat, lon } = O.map;
  const d = 0.006;
  const bbox = [lon - d * 2, lat - d, lon + d * 2, lat + d].map((n) => n.toFixed(4)).join('%2C');
  return layout({
    slug: 'kontakti',
    title: 'Kontakti',
    desc: `Valdes kontakti, pieņemšanas laiki un adrese. ${O.name}.`,
    body: `${pageHero('kontakti', 'Kontakti', 'Valde pieņem biedrus valdes mājiņā. Ārpus pieņemšanas laika rakstiet vai zvaniet.')}
<section class="section"><div class="container split">
  <div class="contact-list">
    <div class="contact">${I.pin}<div><strong>Adrese</strong><span>${ph(O.address)}</span></div></div>
    <div class="contact">${I.phone}<div><strong>Tālrunis</strong><a href="tel:${O.tel}">${ph(O.phone)}</a></div></div>
    <div class="contact">${I.mail}<div><strong>E-pasts</strong><a href="mailto:${O.emailRaw}">${ph(O.email)}</a></div></div>
    <div class="contact">${I.clock}<div><strong>Pieņemšanas laiks</strong><dl class="hours">${O.hours.map(([d, h]) => `<dt>${d}</dt><dd>${ph(h)}</dd>`).join('')}</dl></div></div>
  </div>
  <form class="form card" data-mail="${O.emailRaw}" data-subject="Jautājums valdei">
    <h2>Rakstīt valdei</h2>
    <label>Vārds, uzvārds<input name="Vārds" required autocomplete="name"></label>
    <div class="form__row">
      <label>Tālrunis vai e-pasts<input name="Kontakti" required></label>
      <label>Gabala Nr. <span class="muted">(ja ir)</span><input name="Gabala Nr."></label>
    </div>
    <label>Ziņa<textarea name="Ziņa" rows="5" required></textarea></label>
    <button class="btn btn--primary" type="submit">Sagatavot e-pastu ${I.mail}</button>
    <p class="form__hint">Poga atver jūsu e-pasta programmu ar sagatavotu vēstuli.</p>
  </form>
</div></section>
<section class="section section--tight"><div class="container">
  <div class="map"><iframe title="Karte" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&amp;layer=mapnik&amp;marker=${lat}%2C${lon}"></iframe></div>
  <p class="muted"><a href="https://www.openstreetmap.org/?mlat=${lat}&amp;mlon=${lon}#map=16/${lat}/${lon}" target="_blank" rel="noopener">Atvērt lielāku karti</a> · ${ph('[[Kartē rādīta aptuvena vieta, jānorāda precīzas koordinātas.]]')}</p>
</div></section>`,
  });
};

// ---------- write ----------
for (const r of routes) {
  const out = join(ROOT, fileOf(r.slug));
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, P[r.key]());
  console.log('wrote', relative(ROOT, out));
}

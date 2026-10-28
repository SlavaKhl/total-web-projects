// All texts and data for the cooperative site. Edit here, then run: node darzkopibas-koop/_src/build.mjs
// Text wrapped in [[ ... ]] is a placeholder: it is shown highlighted on the site until replaced.

export const org = {
  name: 'Dārzkopības kooperatīvā sabiedrība „[[Nosaukums]]”',
  short: 'DKS „[[Nosaukums]]”',
  tagline: 'Dārzkopības kooperatīvā sabiedrība',
  regNr: '[[4000000000]]',
  founded: '[[1985]]',
  address: '[[Dārzu iela 1]], [[Pagasts]], [[Novads]], LV-[[0000]]',
  phone: '[[+371 20 000 000]]',
  tel: '+37120000000',
  email: '[[valde@example.lv]]',
  emailRaw: 'valde@example.lv',
  hours: [['Pirmdiena', '[[18:00–20:00]]'], ['Sestdiena', '[[10:00–13:00]]'], ['Citas dienas', 'pēc iepriekšējas vienošanās']],
  bank: { name: '[[Banka]]', iban: '[[LV00 BANK 0000 0000 0000 0]]', swift: '[[BANKLV2X]]' },
  plots: '[[120]]',
  area: '[[18]]',
  // Map: OpenStreetMap, free. Replace with the real coordinates.
  map: { lat: 56.9496, lon: 24.1052 },
  siteUrl: 'https://slavakhl.github.io/total-web-projects/darzkopibas-koop/',
};

export const board = [
  ['Valdes priekšsēdētājs', '[[Vārds Uzvārds]]', '[[+371 20 000 001]]'],
  ['Valdes loceklis', '[[Vārds Uzvārds]]', '[[+371 20 000 002]]'],
  ['Valdes loceklis', '[[Vārds Uzvārds]]', ''],
  ['Revidents', '[[Vārds Uzvārds]]', ''],
  ['Grāmatvede', '[[Vārds Uzvārds]]', '[[+371 20 000 003]]'],
];

// Pages in menu order.
export const routes = [
  { key: 'home', slug: '', nav: 'Sākums' },
  { key: 'about', slug: 'par-mums', nav: 'Par mums' },
  { key: 'news', slug: 'jaunumi', nav: 'Jaunumi' },
  { key: 'docs', slug: 'dokumenti', nav: 'Dokumenti' },
  { key: 'members', slug: 'biedriem', nav: 'Biedriem' },
  { key: 'contacts', slug: 'kontakti', nav: 'Kontakti' },
];

// Newest first. "example: true" adds a "paraugs" label: delete these when real news arrive.
export const news = [
  { date: '2026-10-20', tag: 'Ūdensapgāde', title: 'Ūdensvada izslēgšana ziemas sezonai', example: true,
    text: 'Dārzu ūdensvads tiks izslēgts <b>[[1. novembrī]]</b>. Lūdzam līdz tam laikam aizvērt krānus savā gabalā, iztukšot caurules un nodot ūdens skaitītāja rādījumus valdei.' },
  { date: '2026-10-05', tag: 'Talka', title: 'Rudens talka sestdien, [[18. oktobrī]]', example: true,
    text: 'Aicinām biedrus uz kopīgu talku: grāvju tīrīšana, ceļmalu sakopšana un lapu savākšana pie vārtiem. Sākums plkst. <b>[[10:00]]</b> pie valdes mājiņas. Darbarīkus ņemiet līdzi.' },
  { date: '2026-09-15', tag: 'Maksājumi', title: 'Atgādinājums par biedru maksu', example: true,
    text: 'Šī gada biedru maksa un apsaimniekošanas maksa jāsamaksā līdz <b>[[31. oktobrim]]</b>. Rekvizīti un summas ir sadaļā „Biedriem”.' },
  { date: '2026-06-02', tag: 'Kopsapulce', title: 'Biedru kopsapulces lēmumi', example: true,
    text: 'Kopsapulcē apstiprināts gada pārskats, nākamā gada tāme un ievēlēta valde. Protokols pieejams sadaļā „Dokumenti”.' },
  { date: '2026-04-18', tag: 'Ūdensapgāde', title: 'Ūdens padeve sāksies [[1. maijā]]', example: true,
    text: 'Pēc ziemas ūdensvads tiks ieslēgts [[1. maijā]]. Ja pamanāt noplūdi, lūdzu nekavējoties ziņojiet valdei.' },
];

// Documents. "file" is a path inside darzkopibas-koop/docs/ (empty = not uploaded yet).
export const documents = [
  { group: 'Pamatdokumenti', items: [
    { title: 'Statūti', note: 'Apstiprināti kopsapulcē [[gads]]', file: '' },
    { title: 'Iekšējās kārtības noteikumi', note: 'Kārtība dārzu teritorijā', file: '' },
    { title: 'Ūdensapgādes lietošanas noteikumi', note: '', file: '' },
  ] },
  { group: 'Kopsapulces un finanses', items: [
    { title: 'Kopsapulces protokols, [[2026]]', note: '', file: '' },
    { title: 'Gada pārskats, [[2025]]', note: '', file: '' },
    { title: 'Ieņēmumu un izdevumu tāme, [[2026]]', note: '', file: '' },
  ] },
  { group: 'Veidlapas', items: [
    { title: 'Iesniegums uzņemšanai biedros', note: 'Aizpildīt un iesniegt valdei', file: '' },
    { title: 'Iesniegums izstāšanās no biedriem', note: '', file: '' },
    { title: 'Ūdens skaitītāja rādījumu veidlapa', note: '', file: '' },
  ] },
];

// Member fees.
export const fees = [
  ['Biedra maksa', '[[00,00]] EUR gadā', 'par vienu biedru'],
  ['Apsaimniekošanas maksa', '[[0,00]] EUR par m² gadā', 'ceļi, vārti, atkritumi, apgaismojums'],
  ['Ūdens', '[[0,00]] EUR par m³', 'pēc skaitītāja rādījumiem'],
  ['Iestāšanās maksa', '[[00,00]] EUR', 'vienreizēja, jauniem biedriem'],
];

// Season calendar (month, what happens).
export const season = [
  ['Aprīlis', 'Pavasara talka, ceļu un grāvju apskate'],
  ['Maijs', 'Ūdensvada ieslēgšana, ūdens skaitītāju pārbaude'],
  ['Jūnijs', 'Biedru kopsapulce'],
  ['Jūlijs–augusts', 'Ugunsdrošības un kārtības pārbaudes'],
  ['Oktobris', 'Rudens talka, maksājumu termiņš'],
  ['Novembris', 'Ūdensvada izslēgšana un rādījumu nodošana'],
];

export const faq = [
  ['Kā kļūt par biedru?', 'Iegādājoties vai mantojot zemes gabalu kooperatīva teritorijā, iesniedziet valdei iesniegumu par uzņemšanu biedros un īpašumtiesību apliecinošu dokumentu (zemesgrāmatas apliecības kopiju). Valde lēmumu pieņem tuvākajā sēdē.'],
  ['Kā nodot ūdens skaitītāja rādījumus?', 'Rādījumus sūtiet uz e-pastu vai īsziņā valdei, norādot gabala numuru un rādījumu. Rādījumi jānodod [[līdz katra mēneša 25. datumam]] un pirms ūdensvada izslēgšanas rudenī.'],
  ['Ko darīt, ja pārdodu savu gabalu?', 'Informējiet valdi, nokārtojiet visus maksājumus un iesniedziet iesniegumu par izstāšanos. Jaunais īpašnieks var iestāties kooperatīvā ar savu iesniegumu.'],
  ['Vai drīkst dedzināt zāli un lapas?', 'Kūlas dedzināšana Latvijā ir aizliegta. Ugunskurus drīkst kurt tikai drošā vietā, ievērojot ugunsdrošības noteikumus. Zaļos atkritumus labāk kompostēt.'],
  ['Kur izmest atkritumus?', 'Sadzīves atkritumu konteiners atrodas [[pie galvenajiem vārtiem]]. Lielgabarīta atkritumus un būvgružus konteinerā mest nedrīkst.'],
];

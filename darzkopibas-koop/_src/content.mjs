// All texts and data for the cooperative site (Latvian + Russian).
// Edit here, then run: node darzkopibas-koop/_src/build.mjs
// Text wrapped in [[ ... ]] is a placeholder: it is shown highlighted on the site until replaced.
// Pairs like { lv: '...', ru: '...' } are the two language versions of the same text.

export const LANGS = ['lv', 'ru'];

export const org = {
  // Legal name stays in Latvian in both languages.
  // From the Enterprise Register via company.lursoft.lv (checked 28.10.2026).
  name: 'Dārzkopības kooperatīvā sabiedrība „Gavana”',
  short: 'DKS „Gavana”',
  tagline: { lv: 'Dārzkopības kooperatīvā sabiedrība', ru: 'Садоводческое кооперативное общество' },
  regNr: '40103057883',
  founded: '1992', // registration date in the Enterprise Register: 28.07.1992
  address: '„Gavana 123”, Stīpnieki, Olaines pag., Olaines nov., LV-2127',
  // Contacts and payments from the members' WhatsApp group description (07.11.2026).
  phone: '+371 27 008 382', // board chairman, main contact
  tel: '+37127008382',
  email: 'dksgavana@gmail.com', // for electricity readings, suggestions and other contact
  emailRaw: 'dksgavana@gmail.com',
  hours: [
    [{ lv: 'Pirmdiena', ru: 'Понедельник' }, '18:00–20:00'],
    [{ lv: 'Sestdiena', ru: 'Суббота' }, '10:00–13:00'],
    [{ lv: 'Citas dienas', ru: 'Другие дни' }, { lv: 'pēc iepriekšējas vienošanās', ru: 'по договорённости' }],
  ],
  // Members' WhatsApp group. Put the invite link (https://chat.whatsapp.com/...) here; empty = ask the chairman.
  whatsapp: '',
  bank: { payee: 'GAVANA DKS', name: 'Citadele banka', iban: 'LV58 PARX 0019 6573 9000 1', swift: 'PARXLV22' },
  electricity: { rate: 0.23, due: 10 }, // EUR per kWh; pay every month by this day
  plots: '120',
  area: '[[18]]',
  // Map: free Google Maps embed by address search (no API key needed).
  mapQuery: 'Gavana, Stīpnieki, Olaines pagasts, Olaines novads',
  siteUrl: 'https://slavakhl.github.io/total-web-projects/darzkopibas-koop/',
};

const member = { lv: 'Valdes locekle', ru: 'Член правления' };
export const board = [
  [{ lv: 'Valdes priekšsēdētājs', ru: 'Председатель правления' }, 'Aleksandrs Petrašs', '+371 27 008 382'],
  [member, 'Anna Barkāne', ''],
  [{ lv: 'Valdes loceklis', ru: 'Член правления' }, 'Oskars Bušs', ''],
  [member, 'Jūlija Bibarceva', ''],
  [member, 'Valērija Zabolotska', ''],
];

// Pages in menu order. Same folder names in both languages: lv/par-mums/, ru/par-mums/.
export const routes = [
  { key: 'home', slug: '', nav: { lv: 'Sākums', ru: 'Главная' } },
  { key: 'about', slug: 'par-mums', nav: { lv: 'Par mums', ru: 'О нас' } },
  { key: 'news', slug: 'jaunumi', nav: { lv: 'Jaunumi', ru: 'Новости' } },
  { key: 'docs', slug: 'dokumenti', nav: { lv: 'Dokumenti', ru: 'Документы' } },
  { key: 'members', slug: 'biedriem', nav: { lv: 'Biedriem', ru: 'Членам' } },
  { key: 'contacts', slug: 'kontakti', nav: { lv: 'Kontakti', ru: 'Контакты' } },
];

// Newest first. "example: true" adds a "sample" label: delete these when real news arrive.
export const news = [
  { date: '2026-11-01', example: true,
    tag: { lv: 'Elektrība', ru: 'Электричество' },
    title: { lv: 'Elektrības rādījumi un maksājums līdz 10. datumam', ru: 'Показания и оплата электричества до 10 числа' },
    text: {
      lv: 'Atgādinām: katru mēnesi līdz <b>10. datumam</b> nosūtiet elektrības skaitītāja rādījumu uz <b>dksgavana@gmail.com</b> un samaksājiet par patērētajām kWh (0,23 EUR par 1 kWh).',
      ru: 'Напоминаем: каждый месяц до <b>10 числа</b> отправьте показания счётчика электричества на <b>dksgavana@gmail.com</b> и оплатите израсходованные кВт·ч (0,23 EUR за 1 кВт·ч).',
    } },
  { date: '2026-10-05', example: true,
    tag: { lv: 'Talka', ru: 'Толока' },
    title: { lv: 'Rudens talka sestdien, [[18. oktobrī]]', ru: 'Осенняя толока в субботу, [[18 октября]]' },
    text: {
      lv: 'Aicinām biedrus uz kopīgu talku: grāvju tīrīšana, ceļmalu sakopšana un lapu savākšana pie vārtiem. Sākums plkst. <b>[[10:00]]</b>. Darbarīkus ņemiet līdzi.',
      ru: 'Приглашаем членов общества на толоку: чистка канав, уборка обочин и сбор листьев у ворот. Начало в <b>[[10:00]]</b>. Инструменты берите с собой.',
    } },
  { date: '2026-09-15', example: true,
    tag: { lv: 'Maksājumi', ru: 'Платежи' },
    title: { lv: 'Gada biedru maksa', ru: 'Годовой членский взнос' },
    text: {
      lv: 'Gada iemaksa ir 80 EUR par vienu zemes gabalu, 120 EUR par diviem vai 160 EUR par trim. Maksājuma mērķī norādiet gabala numuru un gadu. Rekvizīti ir sadaļā „Biedriem”.',
      ru: 'Годовой взнос: 80 EUR за один участок, 120 EUR за два или 160 EUR за три. В назначении платежа укажите номер участка и год. Реквизиты в разделе «Членам».',
    } },
  { date: '2026-06-02', example: true,
    tag: { lv: 'Kopsapulce', ru: 'Общее собрание' },
    title: { lv: 'Biedru kopsapulces lēmumi', ru: 'Решения общего собрания' },
    text: {
      lv: 'Kopsapulcē apstiprināts gada pārskats un nākamā gada tāme. Protokols pieejams sadaļā „Dokumenti”.',
      ru: 'Собрание утвердило годовой отчёт и смету на следующий год. Протокол доступен в разделе «Документы».',
    } },
];

// Documents. "file" is a path inside darzkopibas-koop/docs/ (empty = not uploaded yet).
export const documents = [
  { group: { lv: 'Pamatdokumenti', ru: 'Основные документы' }, items: [
    { title: { lv: 'Statūti', ru: 'Устав' }, note: { lv: 'Apstiprināti kopsapulcē [[gads]]', ru: 'Утверждён собранием в [[год]]' }, file: '' },
    { title: { lv: 'Iekšējās kārtības noteikumi', ru: 'Правила внутреннего распорядка' }, note: { lv: 'Kārtība dārzu teritorijā', ru: 'Порядок на территории садов' }, file: '' },
  ] },
  { group: { lv: 'Kopsapulces un finanses', ru: 'Собрания и финансы' }, items: [
    { title: { lv: 'Kopsapulces protokols, [[2026]]', ru: 'Протокол общего собрания, [[2026]]' }, note: '', file: '' },
    { title: { lv: 'Gada pārskats, [[2025]]', ru: 'Годовой отчёт, [[2025]]' }, note: '', file: '' },
    { title: { lv: 'Ieņēmumu un izdevumu tāme, [[2026]]', ru: 'Смета доходов и расходов, [[2026]]' }, note: '', file: '' },
  ] },
  { group: { lv: 'Veidlapas', ru: 'Бланки' }, items: [
    { title: { lv: 'Iesniegums uzņemšanai biedros', ru: 'Заявление о приёме в члены' }, note: { lv: 'Aizpildīt un iesniegt valdei', ru: 'Заполнить и сдать в правление' }, file: '' },
    { title: { lv: 'Iesniegums izstāšanās no biedriem', ru: 'Заявление о выходе из членов' }, note: '', file: '' },
  ] },
];

// Member fees: name, amount, comment.
export const fees = [
  [{ lv: 'Gada biedru maksa, 1 zemes gabals', ru: 'Годовой взнос, 1 участок' }, '80 EUR', { lv: 'par gadu', ru: 'за год' }],
  [{ lv: 'Gada biedru maksa, 2 zemes gabali', ru: 'Годовой взнос, 2 участка' }, '120 EUR', { lv: 'par gadu', ru: 'за год' }],
  [{ lv: 'Gada biedru maksa, 3 zemes gabali', ru: 'Годовой взнос, 3 участка' }, '160 EUR', { lv: 'par gadu', ru: 'за год' }],
  [{ lv: 'Elektrība', ru: 'Электричество' }, { lv: '0,23 EUR par 1 kWh', ru: '0,23 EUR за 1 кВт·ч' }, { lv: 'maksā katru mēnesi līdz 10. datumam', ru: 'оплата каждый месяц до 10 числа' }],
];

// What to write in the payment purpose (maksājuma mērķis).
export const payPurpose = [
  [{ lv: 'Par elektrību', ru: 'За электричество' }, { lv: 'zemes gabala numurs, elektrības skaitītāja rādījums un patērētie kWh', ru: 'номер участка, показание счётчика и израсходованные кВт·ч' }],
  [{ lv: 'Gada biedru maksa', ru: 'Годовой взнос' }, { lv: 'zemes gabala (vai gabalu) numuri un gads, par kuru maksājat', ru: 'номер участка (или участков) и год, за который платите' }],
];

// Season calendar (month, what happens).
export const season = [
  [{ lv: 'Katru mēnesi', ru: 'Каждый месяц' }, { lv: 'Līdz 10. datumam: elektrības rādījumi un maksājums', ru: 'До 10 числа: показания и оплата электричества' }],
  [{ lv: 'Aprīlis', ru: 'Апрель' }, { lv: 'Pavasara talka, ceļu un grāvju apskate', ru: 'Весенняя толока, осмотр дорог и канав' }],
  [{ lv: 'Jūnijs', ru: 'Июнь' }, { lv: 'Biedru kopsapulce', ru: 'Общее собрание членов' }],
  [{ lv: 'Jūlijs–augusts', ru: 'Июль–август' }, { lv: 'Ugunsdrošības un kārtības pārbaudes', ru: 'Проверки пожарной безопасности и порядка' }],
  [{ lv: 'Oktobris', ru: 'Октябрь' }, { lv: 'Rudens talka', ru: 'Осенняя толока' }],
];

export const faq = [
  [{ lv: 'Kā kļūt par biedru?', ru: 'Как стать членом общества?' }, {
    lv: 'Iegādājoties vai mantojot zemes gabalu kooperatīva teritorijā, iesniedziet valdei iesniegumu par uzņemšanu biedros un īpašumtiesību apliecinošu dokumentu (zemesgrāmatas apliecības kopiju). Valde lēmumu pieņem tuvākajā sēdē.',
    ru: 'Если вы купили или унаследовали участок на территории кооператива, подайте в правление заявление о приёме в члены и документ о праве собственности (копию выписки из земельной книги). Правление примет решение на ближайшем заседании.' }],
  [{ lv: 'Kā nodot elektrības skaitītāja rādījumus?', ru: 'Как передать показания счётчика электричества?' }, {
    lv: 'Katru mēnesi līdz 10. datumam nosūtiet uz dksgavana@gmail.com zemes gabala numuru, skaitītāja rādījumu un patērētās kWh. Tad samaksājiet 0,23 EUR par katru kWh. To var izdarīt arī ar formu sadaļā „Biedriem”.',
    ru: 'Каждый месяц до 10 числа отправьте на dksgavana@gmail.com номер участка, показание счётчика и израсходованные кВт·ч. Затем оплатите 0,23 EUR за каждый кВт·ч. Это можно сделать и через форму в разделе «Членам».' }],
  [{ lv: 'Ko darīt, ja pārdodu savu gabalu?', ru: 'Что делать, если я продаю участок?' }, {
    lv: 'Informējiet valdi, nokārtojiet visus maksājumus un iesniedziet iesniegumu par izstāšanos. Jaunais īpašnieks var iestāties kooperatīvā ar savu iesniegumu.',
    ru: 'Сообщите правлению, оплатите все платежи и подайте заявление о выходе. Новый владелец может вступить в кооператив по своему заявлению.' }],
  [{ lv: 'Vai drīkst dedzināt zāli un lapas?', ru: 'Можно ли жечь траву и листья?' }, {
    lv: 'Kūlas dedzināšana Latvijā ir aizliegta. Ugunskurus drīkst kurt tikai drošā vietā, ievērojot ugunsdrošības noteikumus. Zaļos atkritumus labāk kompostēt.',
    ru: 'Выжигание сухой травы в Латвии запрещено. Костры можно разводить только в безопасном месте, соблюдая правила пожарной безопасности. Зелёные отходы лучше компостировать.' }],
  [{ lv: 'Kur izmest atkritumus?', ru: 'Куда выбрасывать мусор?' }, {
    lv: 'Sadzīves atkritumu konteiners atrodas [[pie galvenajiem vārtiem]]. Lielgabarīta atkritumus un būvgružus konteinerā mest nedrīkst.',
    ru: 'Контейнер для бытовых отходов стоит [[у главных ворот]]. Крупногабаритный мусор и строительные отходы в контейнер выбрасывать нельзя.' }],
];

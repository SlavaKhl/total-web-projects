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
  phone: '+371 67 341 479',
  tel: '+37167341479',
  email: '[[valde@example.lv]]',
  emailRaw: 'valde@example.lv',
  hours: [
    [{ lv: 'Pirmdiena', ru: 'Понедельник' }, '[[18:00–20:00]]'],
    [{ lv: 'Sestdiena', ru: 'Суббота' }, '[[10:00–13:00]]'],
    [{ lv: 'Citas dienas', ru: 'Другие дни' }, { lv: 'pēc iepriekšējas vienošanās', ru: 'по договорённости' }],
  ],
  bank: { name: '[[Banka]]', iban: '[[LV00 BANK 0000 0000 0000 0]]', swift: '[[BANKLV2X]]' },
  plots: '[[120]]',
  area: '[[18]]',
  // Map: free Google Maps embed by address search (no API key needed).
  mapQuery: 'Gavana, Stīpnieki, Olaines pagasts, Olaines novads',
  siteUrl: 'https://slavakhl.github.io/total-web-projects/darzkopibas-koop/',
};

export const board = [
  [{ lv: 'Valdes priekšsēdētājs', ru: 'Председатель правления' }, '[[Vārds Uzvārds]]', '[[+371 20 000 001]]'],
  [{ lv: 'Valdes loceklis', ru: 'Член правления' }, '[[Vārds Uzvārds]]', '[[+371 20 000 002]]'],
  [{ lv: 'Valdes loceklis', ru: 'Член правления' }, '[[Vārds Uzvārds]]', ''],
  [{ lv: 'Revidents', ru: 'Ревизор' }, '[[Vārds Uzvārds]]', ''],
  [{ lv: 'Grāmatvede', ru: 'Бухгалтер' }, '[[Vārds Uzvārds]]', '[[+371 20 000 003]]'],
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
  { date: '2026-10-20', example: true,
    tag: { lv: 'Ūdensapgāde', ru: 'Водоснабжение' },
    title: { lv: 'Ūdensvada izslēgšana ziemas sezonai', ru: 'Отключение водопровода на зиму' },
    text: {
      lv: 'Dārzu ūdensvads tiks izslēgts <b>[[1. novembrī]]</b>. Lūdzam līdz tam laikam aizvērt krānus savā gabalā, iztukšot caurules un nodot ūdens skaitītāja rādījumus valdei.',
      ru: 'Водопровод в садах будет отключён <b>[[1 ноября]]</b>. До этого просим закрыть краны на своём участке, слить воду из труб и передать правлению показания счётчика воды.',
    } },
  { date: '2026-10-05', example: true,
    tag: { lv: 'Talka', ru: 'Толока' },
    title: { lv: 'Rudens talka sestdien, [[18. oktobrī]]', ru: 'Осенняя толока в субботу, [[18 октября]]' },
    text: {
      lv: 'Aicinām biedrus uz kopīgu talku: grāvju tīrīšana, ceļmalu sakopšana un lapu savākšana pie vārtiem. Sākums plkst. <b>[[10:00]]</b> pie valdes mājiņas. Darbarīkus ņemiet līdzi.',
      ru: 'Приглашаем членов общества на толоку: чистка канав, уборка обочин и сбор листьев у ворот. Начало в <b>[[10:00]]</b> у домика правления. Инструменты берите с собой.',
    } },
  { date: '2026-09-15', example: true,
    tag: { lv: 'Maksājumi', ru: 'Платежи' },
    title: { lv: 'Atgādinājums par biedru maksu', ru: 'Напоминание о членском взносе' },
    text: {
      lv: 'Šī gada biedru maksa un apsaimniekošanas maksa jāsamaksā līdz <b>[[31. oktobrim]]</b>. Rekvizīti un summas ir sadaļā „Biedriem”.',
      ru: 'Членский взнос и плату за обслуживание за этот год нужно оплатить до <b>[[31 октября]]</b>. Реквизиты и суммы в разделе «Членам».',
    } },
  { date: '2026-06-02', example: true,
    tag: { lv: 'Kopsapulce', ru: 'Общее собрание' },
    title: { lv: 'Biedru kopsapulces lēmumi', ru: 'Решения общего собрания' },
    text: {
      lv: 'Kopsapulcē apstiprināts gada pārskats, nākamā gada tāme un ievēlēta valde. Protokols pieejams sadaļā „Dokumenti”.',
      ru: 'Собрание утвердило годовой отчёт, смету на следующий год и избрало правление. Протокол доступен в разделе «Документы».',
    } },
  { date: '2026-04-18', example: true,
    tag: { lv: 'Ūdensapgāde', ru: 'Водоснабжение' },
    title: { lv: 'Ūdens padeve sāksies [[1. maijā]]', ru: 'Подача воды начнётся [[1 мая]]' },
    text: {
      lv: 'Pēc ziemas ūdensvads tiks ieslēgts [[1. maijā]]. Ja pamanāt noplūdi, lūdzu nekavējoties ziņojiet valdei.',
      ru: 'После зимы водопровод включат [[1 мая]]. Если заметите протечку, пожалуйста, сразу сообщите правлению.',
    } },
];

// Documents. "file" is a path inside darzkopibas-koop/docs/ (empty = not uploaded yet).
export const documents = [
  { group: { lv: 'Pamatdokumenti', ru: 'Основные документы' }, items: [
    { title: { lv: 'Statūti', ru: 'Устав' }, note: { lv: 'Apstiprināti kopsapulcē [[gads]]', ru: 'Утверждён собранием в [[год]]' }, file: '' },
    { title: { lv: 'Iekšējās kārtības noteikumi', ru: 'Правила внутреннего распорядка' }, note: { lv: 'Kārtība dārzu teritorijā', ru: 'Порядок на территории садов' }, file: '' },
    { title: { lv: 'Ūdensapgādes lietošanas noteikumi', ru: 'Правила пользования водопроводом' }, note: '', file: '' },
  ] },
  { group: { lv: 'Kopsapulces un finanses', ru: 'Собрания и финансы' }, items: [
    { title: { lv: 'Kopsapulces protokols, [[2026]]', ru: 'Протокол общего собрания, [[2026]]' }, note: '', file: '' },
    { title: { lv: 'Gada pārskats, [[2025]]', ru: 'Годовой отчёт, [[2025]]' }, note: '', file: '' },
    { title: { lv: 'Ieņēmumu un izdevumu tāme, [[2026]]', ru: 'Смета доходов и расходов, [[2026]]' }, note: '', file: '' },
  ] },
  { group: { lv: 'Veidlapas', ru: 'Бланки' }, items: [
    { title: { lv: 'Iesniegums uzņemšanai biedros', ru: 'Заявление о приёме в члены' }, note: { lv: 'Aizpildīt un iesniegt valdei', ru: 'Заполнить и сдать в правление' }, file: '' },
    { title: { lv: 'Iesniegums izstāšanās no biedriem', ru: 'Заявление о выходе из членов' }, note: '', file: '' },
    { title: { lv: 'Ūdens skaitītāja rādījumu veidlapa', ru: 'Бланк показаний счётчика воды' }, note: '', file: '' },
  ] },
];

// Member fees: name, amount, comment.
export const fees = [
  [{ lv: 'Biedra maksa', ru: 'Членский взнос' }, { lv: '[[00,00]] EUR gadā', ru: '[[00,00]] EUR в год' }, { lv: 'par vienu biedru', ru: 'с одного члена' }],
  [{ lv: 'Apsaimniekošanas maksa', ru: 'Плата за обслуживание' }, { lv: '[[0,00]] EUR par m² gadā', ru: '[[0,00]] EUR за м² в год' }, { lv: 'ceļi, vārti, atkritumi, apgaismojums', ru: 'дороги, ворота, мусор, освещение' }],
  [{ lv: 'Ūdens', ru: 'Вода' }, { lv: '[[0,00]] EUR par m³', ru: '[[0,00]] EUR за м³' }, { lv: 'pēc skaitītāja rādījumiem', ru: 'по показаниям счётчика' }],
  [{ lv: 'Iestāšanās maksa', ru: 'Вступительный взнос' }, '[[00,00]] EUR', { lv: 'vienreizēja, jauniem biedriem', ru: 'разовый, для новых членов' }],
];

// Season calendar (month, what happens).
export const season = [
  [{ lv: 'Aprīlis', ru: 'Апрель' }, { lv: 'Pavasara talka, ceļu un grāvju apskate', ru: 'Весенняя толока, осмотр дорог и канав' }],
  [{ lv: 'Maijs', ru: 'Май' }, { lv: 'Ūdensvada ieslēgšana, ūdens skaitītāju pārbaude', ru: 'Включение водопровода, проверка счётчиков' }],
  [{ lv: 'Jūnijs', ru: 'Июнь' }, { lv: 'Biedru kopsapulce', ru: 'Общее собрание членов' }],
  [{ lv: 'Jūlijs–augusts', ru: 'Июль–август' }, { lv: 'Ugunsdrošības un kārtības pārbaudes', ru: 'Проверки пожарной безопасности и порядка' }],
  [{ lv: 'Oktobris', ru: 'Октябрь' }, { lv: 'Rudens talka, maksājumu termiņš', ru: 'Осенняя толока, срок оплаты взносов' }],
  [{ lv: 'Novembris', ru: 'Ноябрь' }, { lv: 'Ūdensvada izslēgšana un rādījumu nodošana', ru: 'Отключение водопровода и передача показаний' }],
];

export const faq = [
  [{ lv: 'Kā kļūt par biedru?', ru: 'Как стать членом общества?' }, {
    lv: 'Iegādājoties vai mantojot zemes gabalu kooperatīva teritorijā, iesniedziet valdei iesniegumu par uzņemšanu biedros un īpašumtiesību apliecinošu dokumentu (zemesgrāmatas apliecības kopiju). Valde lēmumu pieņem tuvākajā sēdē.',
    ru: 'Если вы купили или унаследовали участок на территории кооператива, подайте в правление заявление о приёме в члены и документ о праве собственности (копию выписки из земельной книги). Правление примет решение на ближайшем заседании.' }],
  [{ lv: 'Kā nodot ūdens skaitītāja rādījumus?', ru: 'Как передать показания счётчика воды?' }, {
    lv: 'Rādījumus sūtiet uz e-pastu vai īsziņā valdei, norādot gabala numuru un rādījumu. Rādījumi jānodod [[līdz katra mēneša 25. datumam]] un pirms ūdensvada izslēgšanas rudenī.',
    ru: 'Отправьте показания правлению по электронной почте или SMS, указав номер участка и показание. Показания нужно передавать [[до 25 числа каждого месяца]] и перед отключением водопровода осенью.' }],
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

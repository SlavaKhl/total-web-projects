// All site copy, LV + RU. Facts come from https://www.nika-lat.lv/ (checked 2026-10-21).
// Anything marked TODO must be confirmed by the client before publishing.

export const company = {
  name: 'SIA “NIKA LAT”',
  short: 'NIKA LAT',
  founded: '1993-03-31',
  phone: '+371 29 238 232',
  tel: '+37129238232',
  email: 'nikalat@apollo.lv',
  city: 'Rīga',
  // TODO(client): office address, registration number, VAT number, opening hours, VID outsourcing licence no.
  chatbase: '6PoXLGX5pvRJqOwgut3nX',
  siteUrl: 'https://slavakhl.github.io/total-web-projects/bookkeeper/',
};

export const routes = [
  { key: 'home', slug: '' },
  { key: 'services', slug: 'services' },
  { key: 'accounting', slug: 'services/accounting', parent: 'services' },
  { key: 'legal', slug: 'services/legal', parent: 'services' },
  { key: 'audit', slug: 'services/audit', parent: 'services' },
  { key: 'software', slug: 'software' },
  { key: 'about', slug: 'about' },
  { key: 'pricing', slug: 'pricing' },
  { key: 'clients', slug: 'clients' },
  { key: 'faq', slug: 'faq' },
  { key: 'contacts', slug: 'contacts' },
  { key: 'privacy', slug: 'privacy' },
];

export const t = {
  lv: {
    langName: 'Latviešu', htmlLang: 'lv', locale: 'lv_LV',
    skip: 'Pāriet uz saturu',
    tagline: 'Grāmatvedība kopš 1993',
    topbar: 'Grāmatvedības, juridiskie un revidenta pakalpojumi Rīgā · latviski un krieviski',
    nav: { home: 'Sākums', services: 'Pakalpojumi', accounting: 'Grāmatvedība', legal: 'Juridiskie pakalpojumi', audit: 'Zvērināts revidents', software: 'Programmas', about: 'Par mums', pricing: 'Izmaksas', clients: 'Klientiem', faq: 'BUJ', contacts: 'Kontakti', privacy: 'Privātuma politika' },
    cta: 'Saņemt piedāvājumu', call: 'Zvanīt', write: 'Rakstīt', more: 'Uzzināt vairāk', menu: 'Izvēlne',
    footerAbout: 'Grāmatvedības apkalpošana un grāmatvedības programmas uzņēmumiem Latvijā kopš 1993. gada.',
    footerCols: ['Pakalpojumi', 'Uzņēmums', 'Kontakti'],
    rights: 'Visas tiesības aizsargātas.',
    preview: 'Priekšskatījuma versija saskaņošanai',
    ctaBand: { title: 'Pastāstiet par savu uzņēmumu — piedāvājumu sagatavosim individuāli.', text: 'Bez saistībām. Atbildēsim latviski vai krieviski.' },
  },
  ru: {
    langName: 'Русский', htmlLang: 'ru', locale: 'ru_RU',
    skip: 'Перейти к содержанию',
    tagline: 'Бухгалтерия с 1993',
    topbar: 'Бухгалтерские, юридические услуги и присяжный ревизор в Риге · на латышском и русском',
    nav: { home: 'Главная', services: 'Услуги', accounting: 'Бухгалтерия', legal: 'Юридические услуги', audit: 'Присяжный ревизор', software: 'Программы', about: 'О компании', pricing: 'Стоимость', clients: 'Клиентам', faq: 'Вопросы', contacts: 'Контакты', privacy: 'Политика конфиденциальности' },
    cta: 'Получить предложение', call: 'Позвонить', write: 'Написать', more: 'Подробнее', menu: 'Меню',
    footerAbout: 'Бухгалтерское обслуживание и бухгалтерские программы для предприятий Латвии с 1993 года.',
    footerCols: ['Услуги', 'Компания', 'Контакты'],
    rights: 'Все права защищены.',
    preview: 'Демо-версия для согласования',
    ctaBand: { title: 'Расскажите о своей компании — предложение подготовим индивидуально.', text: 'Без обязательств. Ответим на латышском или русском.' },
  },
};

// Service areas. Items are the exact list from nika-lat.lv; descriptions are new copy for review.
export const areas = {
  accounting: {
    icon: 'ledger',
    lv: {
      title: 'Grāmatvedības pakalpojumi',
      short: 'Ikdienas uzskaite, VID atskaites un gada pārskats vienās rokās.',
      intro: 'Pārņemam uzņēmuma grāmatvedību pilnā apjomā vai tikai tās daļas, kuras jums ir svarīgākās. Dokumentus apstrādājam paši izstrādātajā NIKA LAT programmu kompleksā, tāpēc uzskaite ir sakārtota un pārskatāma.',
      items: [
        ['Tekošā grāmatvedības uzskaite', 'Primāro dokumentu apstrāde, kases un bankas operācijas, norēķini ar pircējiem un piegādātājiem.'],
        ['Atskaišu sagatavošana VID', 'Regulāro deklarāciju un pārskatu sagatavošana un iesniegšana VID Elektroniskās deklarēšanas sistēmā.'],
        ['Uzņēmuma pārstāvēšana VID', 'Saziņa ar Valsts ieņēmumu dienestu jūsu vārdā: pieprasījumi, paskaidrojumi, pārbaudes.'],
        ['Gada pārskata sastādīšana', 'Gada pārskata sagatavošana atbilstoši Latvijas normatīvajiem aktiem un iesniegšana noteiktajā termiņā.'],
        ['Konsultācijas grāmatvedības un nodokļu jautājumos', 'Skaidras atbildes par nodokļiem, dokumentu noformēšanu un darījumu uzskaiti.'],
      ],
      who: ['SIA un individuālie komersanti', 'Uzņēmumi, kas maina grāmatvedi', 'Jaunie uzņēmumi pēc reģistrācijas', 'Uzņēmumi, kuriem nepieciešama vienreizēja palīdzība'],
    },
    ru: {
      title: 'Бухгалтерские услуги',
      short: 'Текущий учет, отчеты в VID и годовой отчет в одних руках.',
      intro: 'Берем на себя бухгалтерию компании полностью или только те участки, которые для вас важнее всего. Документы обрабатываем в собственном программном комплексе NIKA LAT, поэтому учет остается упорядоченным и прозрачным.',
      items: [
        ['Текущий бухгалтерский учет', 'Обработка первичных документов, кассовые и банковские операции, расчеты с покупателями и поставщиками.'],
        ['Подготовка отчетов для VID', 'Подготовка и подача регулярных деклараций и отчетов в Систему электронного декларирования VID.'],
        ['Представление компании в VID', 'Общение со Службой государственных доходов от вашего имени: запросы, пояснения, проверки.'],
        ['Составление годового отчета', 'Подготовка годового отчета по нормативным актам Латвии и подача в установленный срок.'],
        ['Консультации по бухгалтерии и налогам', 'Понятные ответы о налогах, оформлении документов и учете сделок.'],
      ],
      who: ['SIA и индивидуальные коммерсанты', 'Компании, которые меняют бухгалтера', 'Новые компании после регистрации', 'Компании, которым нужна разовая помощь'],
    },
  },
  legal: {
    icon: 'scale',
    lv: {
      title: 'Juridiskie pakalpojumi',
      short: 'Uzņēmuma reģistrācija un juridiskā uzturēšana bez liekas birokrātijas.',
      intro: 'Palīdzam uzsākt uzņēmējdarbību un uzturēt uzņēmuma dokumentus kārtībā. Juridiskie un grāmatvedības jautājumi tiek risināti saskaņoti, vienā vietā.',
      items: [
        ['Uzņēmumu reģistrācija', 'Dokumentu sagatavošana un iesniegšana Uzņēmumu reģistrā, palīdzība izvēlēties uzņēmuma formu.'],
        ['Juridiskā uzturēšana', 'Izmaiņas reģistros, valdes un dalībnieku lēmumi, līgumu un iekšējo dokumentu sagatavošana.'],
        ['Konsultācijas', 'Juridiskas konsultācijas par uzņēmējdarbības jautājumiem.'],
        ['Biznesa drošība', 'Darījumu partneru un līgumu riska izvērtēšana, lai pasargātu uzņēmumu no zaudējumiem.'],
      ],
      who: ['Topošie uzņēmēji', 'Uzņēmumi, kuriem jāveic izmaiņas reģistros', 'Uzņēmumi, kas slēdz nozīmīgus līgumus'],
    },
    ru: {
      title: 'Юридические услуги',
      short: 'Регистрация компании и юридическое сопровождение без лишней бюрократии.',
      intro: 'Помогаем начать бизнес и держать документы компании в порядке. Юридические и бухгалтерские вопросы решаются согласованно и в одном месте.',
      items: [
        ['Регистрация предприятий', 'Подготовка и подача документов в Регистр предприятий, помощь в выборе формы компании.'],
        ['Юридическое сопровождение', 'Изменения в регистрах, решения правления и участников, подготовка договоров и внутренних документов.'],
        ['Консультации', 'Юридические консультации по вопросам предпринимательской деятельности.'],
        ['Безопасность бизнеса', 'Оценка рисков партнеров и договоров, чтобы защитить компанию от потерь.'],
      ],
      who: ['Будущие предприниматели', 'Компании, которым нужны изменения в регистрах', 'Компании, заключающие важные договоры'],
    },
  },
  audit: {
    icon: 'seal',
    lv: {
      title: 'Zvērināta revidenta pakalpojumi',
      short: 'Revidenta atzinums par gada pārskatu un profesionālas konsultācijas.',
      intro: 'Zvērināta revidenta pakalpojumi uzņēmumiem, kuriem gada pārskata revīzija ir obligāta vai nepieciešama partneriem, bankām un investoriem.',
      items: [
        ['Revidenta atzinums par gada pārskatu', 'Gada pārskata revīzija un zvērināta revidenta ziņojums.'],
        ['Konsultācijas grāmatvedības un nodokļu jautājumos', 'Neatkarīgs skatījums uz uzskaites un nodokļu jautājumiem.'],
      ],
      who: ['Uzņēmumi, kuriem revīzija ir obligāta', 'Uzņēmumi, kas piesaista finansējumu', 'Uzņēmumi pirms darījumiem ar partneriem'],
    },
    ru: {
      title: 'Услуги присяжного ревизора',
      short: 'Заключение ревизора к годовому отчету и профессиональные консультации.',
      intro: 'Услуги присяжного ревизора для компаний, которым аудит годового отчета обязателен или нужен для партнеров, банков и инвесторов.',
      items: [
        ['Заключение ревизора к годовому отчету', 'Аудит годового отчета и отчет присяжного ревизора.'],
        ['Консультации по бухгалтерии и налогам', 'Независимый взгляд на вопросы учета и налогов.'],
      ],
      who: ['Компании с обязательным аудитом', 'Компании, привлекающие финансирование', 'Компании перед сделками с партнерами'],
    },
  },
};

export const software = {
  groups: [
    {
      lv: 'Grāmatvedība', ru: 'Бухгалтерия',
      items: [
        ['FINUS', 'galvenā grāmata ar pielikumiem', 'главная книга с приложениями'],
        ['MATERIĀLI', 'materiālu un izejvielu uzskaite (pašpatēriņš un ražošana)', 'учет материалов и сырья (собственное потребление и производство)'],
        ['DARBA ALGA', 'algu aprēķina sistēma', 'система расчета зарплаты'],
        ['PAMATLĪDZEKĻI', 'pamatlīdzekļu uzskaites sistēma', 'система учета основных средств'],
        ['AVANSU NORĒĶINI UN CEĻAZĪMES', 'norēķinu personu uzskaite un norēķini', 'учет подотчетных лиц и расчеты'],
      ],
    },
    {
      lv: 'Nekustamā īpašuma uzskaite un ēku apsaimniekošana', ru: 'Учет недвижимости и управление зданиями',
      noteLv: 'Īpašniekiem, pašvaldībām un apsaimniekošanas uzņēmumiem', noteRu: 'Для владельцев, самоуправлений и управляющих компаний',
      items: [
        ['KOMUNĀLIE PAKALPOJUMI', 'norēķini ar fiziskām personām par saņemtajiem komunālajiem pakalpojumiem', 'расчеты с физическими лицами за коммунальные услуги'],
        ['SILTUMS UN KARSTAIS ŪDENS', 'norēķini ar juridiskām un fiziskām personām par siltumu un karsto ūdeni', 'расчеты с юридическими и физическими лицами за тепло и горячую воду'],
        ['ĒKU APSAIMNIEKOŠANA', 'norēķini ar juridiskām personām par ēku apsaimniekošanu', 'расчеты с юридическими лицами за управление зданиями'],
        ['AUKSTAIS ŪDENS UN KANALIZĀCIJA', 'norēķini ar juridiskām un fiziskām personām par auksto ūdeni un kanalizāciju', 'расчеты с юридическими и физическими лицами за холодную воду и канализацию'],
        ['ĪPAŠUMA NODOKLIS', 'zemesgabalu, ēku un īpašnieku uzskaite, īpašuma nodokļa aprēķins', 'учет земельных участков, зданий и владельцев, расчет налога на недвижимость'],
      ],
    },
    {
      lv: 'Citas programmas', ru: 'Другие программы',
      items: [
        ['KADRU DAĻA', 'personāla un darbinieku uzskaite', 'учет персонала и сотрудников'],
        ['BĒRNU ĒDINĀŠANAS UZSKAITE', 'skolām, bērnudārziem, bērnu namiem u.tml.', 'для школ, детских садов, детских домов и т.п.'],
        ['KREDĪTA OPERĀCIJU UZSKAITE', 'veikaliem, kuri pārdod preces uz kredīta', 'для магазинов, продающих товары в кредит'],
      ],
    },
  ],
  // [lv, ru, basis lv, basis ru]
  support: [
    ['Programmas instalācija lokālajā datortīklā', 'Установка программы в локальной сети', '', ''],
    ['Papildu apmācība pie klienta', 'Дополнительное обучение у клиента', 'par 1 akadēmisko stundu', 'за 1 академический час'],
    ['Papildu kopijas — licences (visām programmām)', 'Дополнительные копии — лицензии (для всех программ)', '½ no programmas cenas bez PVN', '½ цены программы без НДС'],
    ['Datortīkla ierīkošanas darbi', 'Прокладка компьютерной сети', 'pēc pasūtītāja prasībām', 'по требованиям заказчика'],
    ['Modifikācijas pēc individuāla pasūtījuma', 'Доработки по индивидуальному заказу', 'par 1 cilvēkstundu', 'за 1 человеко-час'],
    ['Konsultācijas', 'Консультации', 'par 1 akadēmisko stundu', 'за 1 академический час'],
    ['Tehniķa izsaukums', 'Вызов техника', 'par 1 cilvēkstundu', 'за 1 человеко-час'],
    ['Ikmēneša apkalpošana: konsultācijas, versiju atjaunošana u.tml.', 'Ежемесячное обслуживание: консультации, обновление версий и т.п.', '4 apmeklējumi mēnesī pa 1 ak. st.', '4 визита в месяц по 1 ак. часу'],
  ],
};

export const faq = {
  lv: [
    ['Cik maksā grāmatvedības pakalpojumi?', 'Cena ir atkarīga no dokumentu skaita mēnesī, darbinieku skaita, PVN statusa un nepieciešamajiem pakalpojumiem. Aizpildiet īso pieprasījumu sadaļā “Izmaksas”, un mēs sagatavosim individuālu piedāvājumu.'],
    ['Kādās valodās jūs strādājat?', 'Sazināmies latviešu un krievu valodā. Dokumentus un atskaites sagatavojam atbilstoši Latvijas prasībām.'],
    ['Kā pāriet pie jums no cita grāmatveža?', 'Vienosimies par pārņemšanas datumu, pārbaudīsim iepriekšējo periodu dokumentus un atskaites un turpināsim uzskaiti bez pārtraukuma.'],
    ['Vai jūs varat pārstāvēt uzņēmumu VID?', 'Jā. Uzņēmuma pārstāvēšana Valsts ieņēmumu dienestā ir viens no mūsu pamatpakalpojumiem.'],
    ['Vai jūs sagatavojat gada pārskatu?', 'Jā, sastādām gada pārskatu, un, ja nepieciešams, nodrošinām arī zvērināta revidenta atzinumu.'],
    ['Vai palīdzat reģistrēt jaunu uzņēmumu?', 'Jā. Sagatavojam dokumentus Uzņēmumu reģistram un pēc tam varam uzsākt grāmatvedības apkalpošanu.'],
    ['Vai var iegādāties tikai jūsu grāmatvedības programmas?', 'Jā. NIKA LAT programmas var iegādāties atsevišķi, ar instalāciju, apmācību un ikmēneša atbalstu.'],
    ['Kā tiek aizsargāta mana uzņēmuma informācija?', 'Konfidencialitāte ir mūsu darba pamatprincips. Darbinieki apņemas neizpaust klientu komercinformāciju, un mēs ievērojam augstus ētikas standartus.'],
  ],
  ru: [
    ['Сколько стоят бухгалтерские услуги?', 'Цена зависит от количества документов в месяц, числа сотрудников, статуса плательщика НДС и нужных услуг. Заполните короткий запрос в разделе «Стоимость», и мы подготовим индивидуальное предложение.'],
    ['На каких языках вы работаете?', 'Общаемся на латышском и русском языках. Документы и отчеты готовим по требованиям Латвии.'],
    ['Как перейти к вам от другого бухгалтера?', 'Договоримся о дате передачи, проверим документы и отчеты прошлых периодов и продолжим учет без перерыва.'],
    ['Можете ли вы представлять компанию в VID?', 'Да. Представление компании в Службе государственных доходов — одна из наших основных услуг.'],
    ['Вы составляете годовой отчет?', 'Да, составляем годовой отчет, а при необходимости обеспечиваем и заключение присяжного ревизора.'],
    ['Помогаете ли вы зарегистрировать новую компанию?', 'Да. Готовим документы для Регистра предприятий и после этого можем начать бухгалтерское обслуживание.'],
    ['Можно купить только ваши бухгалтерские программы?', 'Да. Программы NIKA LAT можно приобрести отдельно, с установкой, обучением и ежемесячной поддержкой.'],
    ['Как защищена информация моей компании?', 'Конфиденциальность — основной принцип нашей работы. Сотрудники обязуются не разглашать коммерческую информацию клиентов, и мы соблюдаем высокие этические стандарты.'],
  ],
};

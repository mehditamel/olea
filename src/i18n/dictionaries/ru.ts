import type { Dictionary } from "../dictionaries";

const ru = {
  common: {
    skipLink: "Перейти к содержимому",
    decouvrir: "Открыть",
    reserver: "Забронировать",
    retourAccueil: "Вернуться на главную",
    fermer: "Закрыть",
    appeler: "Позвонить",
    ariaSiteName: "Maison Oléa",
    ouvertureProchaine: "Скоро открытие",
    bientot: "Скоро",
    backToTop: "Наверх",
  },
  meta: {
    homeTitle:
      "Maison Oléa — Средиземноморская кухня · Марсель, Кассис, Вильнёв-Лубе",
    homeDescription:
      "Maison Oléa воспевает Средиземноморье в трёх ресторанах: Марсель, Кассис и Вильнёв-Лубе. Искренняя кухня, свежие местные продукты.",
    applicationName: "Maison Oléa",
    ogTitle: "Maison Oléa — Средиземноморская кухня",
    ogDescription:
      "Три ресторана, один жест: воспеть свет юга через искреннюю кухню и желание делиться.",
    twitterTitle: "Maison Oléa",
    twitterDescription:
      "Средиземноморская кухня в Провансе и на Лазурном Берегу — Марсель · Кассис · Вильнёв-Лубе.",
    appleTitle: "Oléa",
    titleTemplate: "%s — Maison Oléa",
  },
  nav: {
    accueil: "Главная",
    maisons: "Рестораны",
    nosMaisons: "Наши рестораны",
    carte: "Меню",
    laCarte: "Меню",
    privatisation: "Приватизация",
    contact: "Контакты",
    reserver: "Забронировать",
  },
  header: {
    ariaLogo: "Maison Oléa — главная",
    ariaNav: "Главная навигация",
    ariaPhone: "Позвонить в Maison Oléa",
    ouvrirMenu: "Открыть меню",
    reserverParTel: "Забронировать по телефону",
    navMobile: "Мобильная навигация",
  },
  footer: {
    tagline:
      "Аутентичная средиземноморская кухня в Провансе и на Лазурном Берегу.",
    nosMaisons: "Наши рестораны",
    laCarte: "Меню",
    privatisation: "Приватизация",
    contact: "Контакты",
    mentionsLegales: "Правовая информация",
    cgu: "Условия использования",
    decouvrir: "Открыть",
    ouvertureProchaine: "Скоро открытие",
    bientot: "скоро",
    copyright: "Maison Oléa",
  },
  hero: {
    eyebrow: "Средиземноморская кухня · С 2019 года",
    titre1: "Средиземноморье,",
    titre2Italic: "у вас на столе.",
    sousTitre:
      "Три ресторана, один жест: воспеть свет юга через искреннюю кухню и желание делиться.",
    ctaReserver: "Забронировать столик",
    ctaDecouvrir: "Открыть рестораны",
    villes: "Марсель · Кассис · Вильнёв-Лубе",
    scrollHint: "Прокрутить",
  },
  pillars: {
    produits: {
      titre: "Свежие и местные продукты",
      texte:
        "Мастерство местных производителей в каждой тарелке.",
    },
    faitMaison: {
      titre: "Домашняя кухня",
      texte:
        "Блюда, приготовленные на месте, в средиземноморской традиции.",
    },
    partage: {
      titre: "Радость общения",
      texte:
        "Стол для разделённых моментов — с семьёй или друзьями.",
    },
  },
  esprit: {
    eyebrow: "Дух Oléa",
    titre: "Кухня, рождённая",
    titreItalic: "солнцем",
    titreSuite: "и землёй.",
    p1: "Вдохновлённый латинским словом «олива», Oléa воспевает Прованс через свою гастрономию. Наши блюда подчёркивают свежие местные продукты и мастерство производителей региона.",
    p2: "Тапенад, рыба на гриле, овощи на солнце, оливковое масло AOP — каждое блюдо рассказывает одну и ту же историю: о разделении и свете юга.",
    ctaCarte: "Открыть меню",
    caption: "Оливковое масло Extra Virgin · Урожай 2025",
  },
  maisons: {
    eyebrow: "Наши три ресторана",
    titre: "От Прованса до",
    titreItalic: "Лазурного Берега",
    ariaDecouvrir: "Открыть Maison Oléa {nom}",
    altMaison: "Maison Oléa {nom}",
    reserver: "Забронировать",
    bientot: "Скоро",
    decouvrir: "Открыть",
  },
  privatReserv: {
    eyebrowPrivat: "Приватизация и события",
    titrePrivat: "Ваши торжества,",
    titrePrivatItalic: "за нашим столом.",
    pPrivat:
      "Дни рождения, деловые обеды, свадьбы, семинары. Три наших ресторана принимают ваши мероприятия с меню на заказ, в тёплой атмосфере юга.",
    ctaPrivat: "Запросить смету",
    eyebrowReserver: "Забронировать столик",
    sousReserver:
      "Выберите ресторан, дату и время за несколько кликов.",
    ctaReserver: "Забронировать онлайн",
    eyebrowPhone: "Или по телефону",
    appeler: "Позвонить",
  },
  privatisation: {
    metaTitle: "Приватизация и события",
    metaDescription:
      "Приватизируйте Maison Oléa для дней рождения, свадеб, семинаров и деловых обедов. Сметы на заказ в трёх наших ресторанах.",
    eyebrow: "Приватизация",
    titre: "Ваши торжества,",
    titreItalic: "за нашим столом.",
    sousTitre:
      "Дни рождения, деловые обеды, свадьбы, семинары. Три наших ресторана принимают ваши мероприятия с меню на заказ, в тёплой атмосфере юга.",
    formEyebrow: "Запрос на смету",
    formTitre: "Расскажите нам о вашем проекте.",
  },
  carte: {
    metaTitle: "Меню",
    metaDescription:
      "Меню Maison Oléa: средиземноморская кухня, рождённая солнцем и землёй. Тапенад, рыба на гриле, овощи на солнце. Подробности скоро.",
    eyebrow: "Меню",
    titre: "Кухня, рождённая",
    titreItalic: "солнцем",
    titreSuite: "и землёй.",
    sousTitre:
      "Наше полное меню будет представлено здесь совсем скоро. А пока — несколько сезонных предложений.",
    suggestionsEyebrow: "Несколько предложений",
    saisons: "Меню меняется в ритме сезонов и поставок.",
    ctaContact: "Связаться с нами",
    voirLaCarte: "Смотреть меню",
    bientotDisponible: "Скоро",
    items: [
      {
        eyebrow: "Закуска",
        titre: "Тапенад и хрустящие овощи",
        texte:
          "Чёрные оливки из Ньона, анчоусы, каперсы, оливковое масло AOP, рыночные кудиры.",
      },
      {
        eyebrow: "От солнца",
        titre: "Рыба дня на гриле",
        texte:
          "В зависимости от местного улова — запечённый фенхель, конфи из лимона, прованские травы.",
      },
      {
        eyebrow: "Фирменное блюдо",
        titre: "Сибас в соляной корочке",
        texte:
          "Подаётся в зале с эмульсией из оливкового масла и эстрагона.",
      },
      {
        eyebrow: "На десерт",
        titre: "Тарт с мёдом и инжиром",
        texte:
          "Домашнее песочное тесто, запечённый инжир, лавандовый мёд, мороженое на оливковом масле.",
      },
    ],
  },
  contact: {
    metaTitle: "Контакты",
    metaDescription:
      "Свяжитесь с Maison Oléa в Марселе, Кассисе или Вильнёв-Лубе, или напишите нам на contact@olea-restaurant.fr.",
    eyebrow: "Контакты",
    titre: "Напишите нам,",
    titreItalic: "загляните в гости.",
    question: "Общий вопрос?",
    ouvertureProchaine: "Скоро открытие",
    bientot: "скоро",
  },
  reserver: {
    metaTitle: "Забронировать столик",
    metaDescription:
      "Забронируйте столик в одном из трёх ресторанов Oléa — Марсель, Кассис, Вильнёв-Лубе. Быстрое подтверждение от нашей команды.",
    eyebrow: "Забронировать",
    titre: "Столик ждёт вас,",
    titreItalic: "в Oléa.",
    sousTitre:
      "Забронируйте столик в одном из трёх наших ресторанов. Команда подтвердит бронь в течение дня.",
    formEyebrow: "Ваше бронирование",
    formTitre: "Выберите ресторан, дату и время.",
    phoneEyebrow: "Предпочитаете телефон?",
  },
  maisonsIndex: {
    metaTitle: "Наши три ресторана",
    metaDescription:
      "Maison Oléa в Марселе, Кассисе и Вильнёв-Лубе: три средиземноморских адреса, одна искренняя кухня юга.",
    eyebrow: "Наши три ресторана",
    titre: "От Прованса до",
    titreItalic: "Лазурного Берега",
    sousTitre:
      "Три адреса, одна любовь к свету юга и желание делиться.",
  },
  maisonPage: {
    accueil: "Главная",
    maisons: "Рестораны",
    metaTitleSuffix: "— Средиземноморский ресторан",
  },
  maisonHero: {
    ariaSection: "Maison Oléa {nom}",
    itineraire: "Как добраться",
  },
  maisonGallery: {
    ambiance: "Атмосфера",
    altPhoto: "Maison Oléa {nom} — атмосфера {n}",
    altPhotoLightbox: "Maison Oléa {nom} — фото {n}",
    ariaAgrandir: "Увеличить фото {n} из {total}",
    galerieSrTitle: "Галерея Maison Oléa {nom} — фото {n} из {total}",
    photoPrecedente: "Предыдущее фото",
    photoSuivante: "Следующее фото",
    fermerLightbox: "Закрыть",
  },
  maisonInstagram: {
    suiveznous: "Следите за нами в Instagram",
    bientotEntete: "Скоро в Instagram",
    suivreEntete: "Подпишитесь на Maison Oléa {nom}",
    bientotItalic: "Наш аккаунт Instagram откроется вместе с рестораном.",
    actifItalic:
      "За кулисами, блюда дня, моменты сервиса — ресторан рассказывает о себе каждый день.",
    ariaOuvrir: "Открыть Instagram @{handle} в новой вкладке",
    bientotChip: "@{handle} · скоро",
    aperçuAlt: "Instagram Maison Oléa {nom} — превью {n}",
    ariaVoirTout: "Смотреть все публикации @{handle} в Instagram",
    voirPlus: "Смотреть больше в Instagram",
  },
  maisonInfos: {
    nousTrouver: "Найти нас",
    horaires: "Часы работы",
    dejeuner: "Обед",
    diner: "Ужин",
    jour: "День",
    telephone: "Телефон",
    horairesAOuverture: "Часы работы будут объявлены при открытии.",
    ferme: "Закрыто",
    instagramAria: "Instagram @{handle}",
  },
  maisonReservation: {
    fermeeEyebrow: "Скоро",
    fermeeTitre: "Этот ресторан скоро откроет свои двери.",
    fermeeCta: "Получать новости",
    ouverteEyebrow: "Бронирование в {nom}",
    ouverteTitre: "Столик ждёт вас.",
    ouverteItalic:
      "Наша команда отвечает со вторника по воскресенье, с открытия смены.",
    ouverteCta: "Забронировать онлайн",
  },
  maisonStatus: {
    fermeAHeure: "Закрывается в {heure}",
    ouvertFerme: "Открыто · закроется в {heure}",
    ferme: "Закрыто",
    fermeDemain: "Закрыто · завтра в {heure}",
    fermeLeJour: "Закрыто · {jour} в {heure}",
  },
  breadcrumbs: { aria: "Хлебные крошки" },
  cta: {
    reserver: "Бронь",
    itineraire: "Маршрут",
    devis: "Смета",
    ariaActions: "Быстрые действия",
  },
  reservationForm: {
    etapeTable: "Ваш столик",
    etapeCoordonnees: "Ваши контакты",
    progression: "Прогресс формы",
    maison: "Ресторан",
    date: "Дата",
    convives: "Количество гостей",
    personnePlurals: {
      one: "гость",
      few: "гостя",
      many: "гостей",
      other: "гостя",
    },
    heure: "Время",
    choisirDate: "Сначала выберите дату",
    fermeCeJour: "Закрыто в этот день — выберите другую дату",
    occasion: "Повод (по желанию)",
    occasions: {
      aucune: "Без особого повода",
      anniversaire: "День рождения",
      romantique: "Романтический ужин",
      famille: "Семейный обед",
      professionnel: "Деловой обед",
      autre: "Другое",
    },
    privatisationTitre:
      "Для {n} гостей рассмотрите приватизацию.",
    privatisationTexte:
      "Свыше 10 гостей мы предлагаем меню на заказ и отдельный зал.",
    privatisationCta: "Запросить смету приватизации",
    nom: "Полное имя",
    email: "Email",
    telephone: "Телефон",
    telephoneHint: "Французский формат — напр. 06 25 15 13 33",
    demandes: "Особые пожелания (по желанию)",
    demandesHint:
      "Аллергии, особенности, инвалидное кресло, тихий стол, коляска…",
    rgpd:
      "Я согласен(на), чтобы Maison Oléa использовал мои контактные данные для обработки этой брони. Никакой маркетинговой рассылки без явного согласия.",
    continuer: "Продолжить",
    privatisationLink: "Более 10 гостей? Смета приватизации",
    retour: "← Назад",
    envoyer: "Отправить бронь",
    envoiEnCours: "Отправка…",
    services: { dejeuner: "Обед", diner: "Ужин" },
    successEyebrow: "Запрос отправлен",
    successTitre: "Скоро подтвердим ваш столик.",
    successTexte:
      "На вашу почту отправлено письмо-резюме (с приглашением в календарь). Команда свяжется с вами в течение нескольких часов для подтверждения.",
    successCta: "Новое бронирование",
    errors: {
      invalid_data: "Неверные данные.",
      bad_json: "Неверное тело запроса.",
      maison_unknown: "Ресторан не найден.",
      maison_closed_online:
        "Этот ресторан пока не принимает онлайн-бронирования.",
      past_date: "Дата должна быть в будущем.",
      closed_on_date: "Ресторан закрыт в этот день.",
      invalid_slot: "Время недоступно для этой даты.",
      service_mismatch: "Сервис не соответствует выбранному времени.",
      rate_limited: "Слишком много попыток. Повторите позже.",
      send_failed: "Не удалось отправить. Повторите чуть позже.",
      generic: "Произошла ошибка.",
      invalidSlot: "Выберите подходящее время.",
    },
  },
  devisForm: {
    you: "О вас",
    event: "Ваше мероприятие",
    nom: "Полное имя",
    email: "Email",
    telephone: "Телефон",
    maison: "Ресторан",
    typeEvenement: "Тип мероприятия",
    types: {
      anniversaire: "День рождения",
      mariage: "Свадьба",
      seminaire: "Семинар",
      affaires: "Деловой обед",
      famille: "Семейная встреча",
      autre: "Другое",
    },
    convives: "Количество гостей",
    date: "Желаемая дата",
    precisions: "Детали",
    precisionsHint:
      "Пожелания, ограничения, аллергии, желаемая атмосфера…",
    precisionsPlaceholder: "Расскажите о вашем проекте",
    legalBefore: "Персональный ответ в течение ",
    legalStrong: "48 часов",
    legalAfter: ". Ваши данные используются только для обработки запроса.",
    envoyer: "Отправить запрос",
    envoiEnCours: "Отправка…",
    successEyebrow: "Спасибо!",
    successTitre: "Мы получили ваш запрос.",
    successTexte:
      "Вернёмся к вам в течение 48 часов с предложением на заказ.",
    successCta: "Отправить ещё один запрос",
    errors: {
      invalid_data: "Неверные данные.",
      bad_json: "Неверное тело запроса.",
      maison_unknown: "Ресторан не найден.",
      send_failed: "Не удалось отправить. Повторите чуть позже.",
      generic: "Произошла ошибка.",
    },
  },
  notFound: {
    eyebrow: "Ошибка 404",
    titre: "Эта страница затерялась",
    titreItalic: "на солнце.",
    sousTitre:
      "Ссылка, по которой вы перешли, больше не существует или перенесена.",
    ctaAccueil: "Вернуться на главную",
    ctaMaisons: "Наши рестораны",
  },
  errorPage: {
    eyebrow: "Произошла ошибка",
    titre: "Простите,",
    titreItalic: "одну минуту.",
    sousTitre:
      "Эта страница не загрузилась корректно. Попробуйте снова или вернитесь на главную.",
    ctaRetry: "Повторить",
    ctaAccueil: "Вернуться на главную",
  },
  loading: {
    unInstant: "Минутку…",
    chargement: "Загрузка",
  },
  offline: {
    titre: "Вы офлайн",
    sousTitre:
      "Восстановите соединение, чтобы забронировать, посмотреть меню или связаться с нами.",
    cta: "Повторить",
  },
  pwa: {
    ariaInstall: "Установить приложение Maison Oléa",
    installerOlea: "Установить Oléa",
    androidTexte:
      "Добавьте приложение на главный экран для быстрого доступа.",
    androidCta: "Установить",
    iosBefore: "Нажмите ",
    iosShare: "Поделиться",
    iosAfter: " затем «На экран Домой».",
    dismiss: "Больше не показывать",
  },
  languageSwitcher: {
    aria: "Выбрать язык",
    label: "Язык",
    changed: "Язык: Русский",
  },
  maisonMap: {
    eyebrow: "Карта",
    titre: "Как добраться",
    ouvrirGoogleMaps: "Открыть в Google Maps",
    itineraireGoogleMaps: "Маршрут в Google Maps",
    ariaCarte: "Карта Maison Oléa {nom}",
  },
  emails: {
    reservation: {
      subject: "Ваш столик в Maison Oléa · {date} {heure}",
      eyebrow: "Maison Oléa · {nom}",
      bonjour: "Здравствуйте, {nom}!",
      corpus:
        "Мы получили вашу заявку на бронирование. Наша команда свяжется с вами в течение нескольких часов для окончательного подтверждения.",
      labels: {
        maison: "Ресторан",
        date: "Дата",
        heure: "Время",
        convives: "Гости",
        precisions: "Ваши пожелания",
      },
      pieceJointe:
        "Во вложении вы найдёте файл .ics для добавления в календарь. По вопросам изменения брони звоните по номеру {telephone}.",
      signature: "До скорой встречи,",
      signatureLigne2: "Команда Oléa",
      services: { dejeuner: "Обед", diner: "Ужин" },
    },
  },
  ics: {
    summary: "Бронирование Maison Oléa · {nom}",
    descriptionPersonnes: "Бронирование на {n} гостей.",
  },
  mentionsLegales: {
    metaTitle: "Правовая информация",
    metaDescription:
      "Правовая информация и сведения о защите данных сайта Maison Oléa: издатель, хостинг, интеллектуальная собственность, защита персональных данных.",
    eyebrow: "Правовая информация",
    titre: "Юридические",
    titreItalic: "сведения.",
    sousTitre:
      "В соответствии со статьями 6-III и 19 французского закона о доверии к цифровой экономике.",
    derniereMaj: "Последнее обновление: май 2026",
    editeur: {
      titre: "Издатель сайта",
      raisonSociale: "Наименование: Maison Oléa",
      forme: "Организационная форма: уточняется",
      siege: "Юридический адрес: уточняется",
      siret: "Номер SIRET: уточняется",
      tva: "Номер НДС в ЕС: уточняется",
      directeur: "Главный редактор: уточняется",
      contact: "Контакт: contact@olea-restaurant.fr",
    },
    hebergeur: {
      titre: "Хостинг",
      nom: "Vercel Inc.",
      adresse: "440 N Barranca Ave #4133, Covina, CA 91723, США",
      site: "https://vercel.com",
    },
    pi: {
      titre: "Интеллектуальная собственность",
      texte:
        "Всё содержимое этого сайта (тексты, фотографии, иллюстрации, товарные знаки) защищено авторским правом и является исключительной собственностью Maison Oléa, если не указано иное. Любое воспроизведение без предварительного письменного согласия запрещено.",
    },
    donnees: {
      titre: "Защита персональных данных",
      intro:
        "В соответствии с Общим регламентом по защите данных (GDPR), вы имеете право на доступ, исправление, удаление, ограничение обработки и возражение против обработки ваших персональных данных.",
      collecte:
        "Данные, собранные через формы бронирования, заявки и контактов, используются только для обработки вашего запроса и никогда не передаются третьим лицам.",
      conservation:
        "Заявки на бронирование хранятся 12 месяцев после даты визита. Заявки на коммерческое предложение хранятся 24 месяца.",
      contact:
        "Чтобы воспользоваться своими правами, напишите на contact@olea-restaurant.fr.",
    },
    cookies: {
      titre: "Файлы cookie",
      texte:
        "Этот сайт не использует аналитические или рекламные файлы cookie. Единственный технический cookie (NEXT_LOCALE) запоминает выбранный вами язык для будущих визитов.",
    },
    droit: {
      titre: "Применимое право",
      texte:
        "Настоящая правовая информация регулируется французским правом. Все споры по её толкованию или исполнению относятся к юрисдикции французских судов.",
    },
  },
} satisfies Dictionary;

export default ru;

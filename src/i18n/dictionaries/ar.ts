import type { Dictionary } from "../dictionaries";

const ar = {
  common: {
    skipLink: "تخطّي إلى المحتوى",
    decouvrir: "اكتشاف",
    reserver: "حجز",
    retourAccueil: "العودة إلى الرئيسية",
    fermer: "إغلاق",
    appeler: "اتصال",
    ariaSiteName: "Maison Oléa",
    ouvertureProchaine: "افتتاح قريب",
    bientot: "قريبًا",
    backToTop: "العودة إلى الأعلى",
  },
  meta: {
    homeTitle:
      "Maison Oléa — مطبخ متوسّطي · مرسيليا، كاسيس، فيلنوف-لوبيه",
    homeDescription:
      "تحتفي Maison Oléa بالبحر المتوسط عبر ثلاثة بيوت: مرسيليا، كاسيس وفيلنوف-لوبيه. مطبخ صادق ومنتجات طازجة محلية.",
    applicationName: "Maison Oléa",
    ogTitle: "Maison Oléa — مطبخ متوسّطي",
    ogDescription:
      "ثلاثة بيوت، إيماءة واحدة: الاحتفاء بنور الجنوب من خلال مطبخ صادق ومشاركة.",
    twitterTitle: "Maison Oléa",
    twitterDescription:
      "مطبخ متوسّطي في بروفانس والكوت دازور — مرسيليا · كاسيس · فيلنوف-لوبيه.",
    appleTitle: "Oléa",
    titleTemplate: "%s — Maison Oléa",
  },
  nav: {
    accueil: "الرئيسية",
    maisons: "البيوت",
    nosMaisons: "بيوتنا",
    carte: "القائمة",
    laCarte: "القائمة",
    privatisation: "الاستئجار الخاص",
    contact: "اتصل بنا",
    reserver: "حجز",
  },
  header: {
    ariaLogo: "Maison Oléa — الرئيسية",
    ariaNav: "التنقل الرئيسي",
    ariaPhone: "الاتصال بـ Maison Oléa",
    ouvrirMenu: "فتح القائمة",
    reserverParTel: "الحجز عبر الهاتف",
    navMobile: "التنقل عبر الجوال",
  },
  footer: {
    tagline:
      "مطبخ متوسّطي أصيل في بروفانس والكوت دازور.",
    nosMaisons: "بيوتنا",
    laCarte: "القائمة",
    privatisation: "الاستئجار الخاص",
    contact: "اتصل بنا",
    mentionsLegales: "المعلومات القانونية",
    cgu: "شروط الاستخدام",
    decouvrir: "اكتشاف",
    ouvertureProchaine: "افتتاح قريب",
    bientot: "قريبًا",
    copyright: "Maison Oléa",
  },
  hero: {
    eyebrow: "مطبخ متوسّطي · منذ 2019",
    titre1: "البحر المتوسط،",
    titre2Italic: "على مائدتكم.",
    sousTitre:
      "ثلاثة بيوت، إيماءة واحدة: الاحتفاء بنور الجنوب من خلال مطبخ صادق ومشاركة.",
    ctaReserver: "حجز طاولة",
    ctaDecouvrir: "اكتشاف البيوت",
    villes: "مرسيليا · كاسيس · فيلنوف-لوبيه",
    scrollHint: "تمرير",
  },
  pillars: {
    produits: {
      titre: "منتجات طازجة ومحلية",
      texte: "خبرة المنتجين الإقليميين في كل طبق.",
    },
    faitMaison: {
      titre: "صنع منزلي",
      texte: "أطباق محضّرة في المكان، وفق التقليد المتوسّطي.",
    },
    partage: {
      titre: "المشاركة وحفاوة اللقاء",
      texte:
        "مائدة مصمّمة للحظات الجماعية، مع العائلة أو الأصدقاء.",
    },
  },
  esprit: {
    eyebrow: "روح Oléa",
    titre: "مطبخ من رحم",
    titreItalic: "الشمس",
    titreSuite: "والأرض.",
    p1: "مستوحاةً من الكلمة اللاتينية الدالّة على شجرة الزيتون، تحتفي Oléa ببروفانس عبر فن الطهي. أطباقنا تُبرز المنتجات الطازجة والمحلية وتُجلّ خبرة المنتجين الإقليميين.",
    p2: "تابيناد، أسماك مشوية، خضار الشمس، زيت زيتون AOP — كل طبق يروي القصة ذاتها: قصة المشاركة ونور الجنوب.",
    ctaCarte: "اكتشاف القائمة",
    caption: "زيت زيتون بكر ممتاز · حصاد 2025",
  },
  maisons: {
    eyebrow: "بيوتنا الثلاثة",
    titre: "من بروفانس إلى",
    titreItalic: "الكوت دازور",
    ariaDecouvrir: "اكتشاف Maison Oléa {nom}",
    altMaison: "Maison Oléa {nom}",
    reserver: "حجز",
    bientot: "قريبًا",
    decouvrir: "اكتشاف",
  },
  privatReserv: {
    eyebrowPrivat: "الاستئجار الخاص والمناسبات",
    titrePrivat: "احتفالاتكم،",
    titrePrivatItalic: "على مائدتنا.",
    pPrivat:
      "أعياد الميلاد، الغداءات المهنية، الأعراس، الندوات. بيوتنا الثلاثة تستقبل مناسباتكم بقوائم خاصّة في أجواء دافئة مستوحاة من الجنوب.",
    ctaPrivat: "طلب عرض سعر",
    eyebrowReserver: "حجز طاولة",
    sousReserver: "اختر البيت والتاريخ والوقت ببضع نقرات.",
    ctaReserver: "الحجز عبر الإنترنت",
    eyebrowPhone: "أو عبر الهاتف",
    appeler: "اتصال",
  },
  privatisation: {
    metaTitle: "الاستئجار الخاص والمناسبات",
    metaDescription:
      "استأجر Maison Oléa لأعياد ميلادك وأعراسك وندواتك وغداءاتك المهنية. عروض أسعار خاصة في بيوتنا الثلاثة.",
    eyebrow: "الاستئجار الخاص",
    titre: "احتفالاتكم،",
    titreItalic: "على مائدتنا.",
    sousTitre:
      "أعياد الميلاد، الغداءات المهنية، الأعراس، الندوات. بيوتنا الثلاثة تستقبل مناسباتكم بقوائم خاصّة في أجواء دافئة مستوحاة من الجنوب.",
    formEyebrow: "طلب عرض سعر",
    formTitre: "حدّثونا عن مشروعكم.",
  },
  carte: {
    metaTitle: "القائمة",
    metaDescription:
      "قائمة Maison Oléa: مطبخ متوسّطي من رحم الشمس والأرض. تابيناد، أسماك مشوية، خضار الشمس. التفاصيل قريبًا.",
    eyebrow: "القائمة",
    titre: "مطبخ من رحم",
    titreItalic: "الشمس",
    titreSuite: "والأرض.",
    sousTitre:
      "قائمتنا الكاملة سوف تُكشف هنا قريبًا جدًا. وفي انتظار ذلك، إليكم بعض الاقتراحات الموسمية.",
    suggestionsEyebrow: "بعض الاقتراحات",
    saisons: "تتطوّر القائمة على إيقاع الفصول والوصول اليومي للمنتجات.",
    ctaContact: "تواصل معنا",
    voirLaCarte: "اطّلع على القائمة",
    bientotDisponible: "متاحة قريبًا",
    items: [
      {
        eyebrow: "كمقبّل",
        titre: "تابيناد وخضار مقرمشة",
        texte:
          "زيتون أسود من نيون، أنشوفة، كبر، زيت زيتون AOP، خضار طازجة من السوق.",
      },
      {
        eyebrow: "من الشمس",
        titre: "سمك اليوم مشويّ",
        texte:
          "حسب صيد المنطقة، شمر مشوي، ليمون مُحلّى، أعشاب بروفانس.",
      },
      {
        eyebrow: "الطبق المميّز",
        titre: "قاروص في قشرة ملح",
        texte:
          "يقدَّم في الصالة مع مستحلب زيت زيتون وطرخون.",
      },
      {
        eyebrow: "للختام",
        titre: "تارت رقيقة بالعسل والتين",
        texte:
          "عجين رمليّ منزلي، تين مشوي، عسل الخزامى، آيس كريم بزيت الزيتون.",
      },
    ],
  },
  contact: {
    metaTitle: "اتصل بنا",
    metaDescription:
      "تواصل مع Maison Oléa في مرسيليا أو كاسيس أو فيلنوف-لوبيه، أو راسلنا على contact@olea-restaurant.fr.",
    eyebrow: "اتصل بنا",
    titre: "راسلونا،",
    titreItalic: "زورونا.",
    question: "سؤال عام؟",
    ouvertureProchaine: "افتتاح قريب",
    bientot: "قريبًا",
  },
  reserver: {
    metaTitle: "حجز طاولة",
    metaDescription:
      "احجز طاولتك في أحد بيوت Oléa الثلاثة — مرسيليا، كاسيس، فيلنوف-لوبيه. تأكيد سريع من فريقنا.",
    eyebrow: "حجز",
    titre: "طاولة في انتظاركم،",
    titreItalic: "لدى Oléa.",
    sousTitre:
      "احجز طاولتك في أحد بيوتنا الثلاثة. يؤكّد فريقنا الحجز خلال اليوم.",
    formEyebrow: "حجزك",
    formTitre: "اختر البيت والتاريخ والوقت.",
    phoneEyebrow: "تفضّل الهاتف؟",
  },
  maisonsIndex: {
    metaTitle: "بيوتنا الثلاثة",
    metaDescription:
      "Maison Oléa في مرسيليا وكاسيس وفيلنوف-لوبيه: ثلاثة عناوين متوسّطية، مطبخ صادق واحد مستوحى من الجنوب.",
    eyebrow: "بيوتنا الثلاثة",
    titre: "من بروفانس إلى",
    titreItalic: "الكوت دازور",
    sousTitre:
      "ثلاثة عناوين، الذوق ذاته لنور الجنوب وللمشاركة.",
  },
  maisonPage: {
    accueil: "الرئيسية",
    maisons: "البيوت",
    metaTitleSuffix: "— مطعم متوسّطي",
  },
  maisonHero: {
    ariaSection: "Maison Oléa {nom}",
    itineraire: "الطريق",
  },
  maisonGallery: {
    ambiance: "أجواء",
    altPhoto: "Maison Oléa {nom} — أجواء {n}",
    altPhotoLightbox: "Maison Oléa {nom} — صورة {n}",
    ariaAgrandir: "تكبير الصورة {n} من {total}",
    galerieSrTitle: "معرض Maison Oléa {nom} — صورة {n} من {total}",
    photoPrecedente: "الصورة السابقة",
    photoSuivante: "الصورة التالية",
    fermerLightbox: "إغلاق",
  },
  maisonInstagram: {
    suiveznous: "تابعونا على Instagram",
    bientotEntete: "قريبًا على Instagram",
    suivreEntete: "تابعوا Maison Oléa {nom}",
    bientotItalic: "سيُفتح حساب Instagram لدينا مع افتتاح البيت.",
    actifItalic:
      "خلف الكواليس، أطباق اليوم، لحظات الخدمة — يحكي البيت قصته يوميًا.",
    ariaOuvrir: "فتح Instagram @{handle} في علامة تبويب جديدة",
    bientotChip: "@{handle} · قريبًا",
    aperçuAlt: "Instagram Maison Oléa {nom} — معاينة {n}",
    ariaVoirTout: "عرض كل منشورات @{handle} على Instagram",
    voirPlus: "عرض المزيد على Instagram",
  },
  maisonInfos: {
    nousTrouver: "كيف تجدوننا",
    horaires: "ساعات العمل",
    dejeuner: "الغداء",
    diner: "العشاء",
    jour: "اليوم",
    telephone: "الهاتف",
    horairesAOuverture: "تُعلن ساعات العمل عند الافتتاح.",
    ferme: "مغلق",
    instagramAria: "Instagram @{handle}",
  },
  maisonReservation: {
    fermeeEyebrow: "قريبًا",
    fermeeTitre: "سيفتح هذا البيت أبوابه قريبًا.",
    fermeeCta: "البقاء على اطلاع",
    ouverteEyebrow: "حجز لدى {nom}",
    ouverteTitre: "طاولة في انتظاركم.",
    ouverteItalic:
      "يردّ فريقنا من الثلاثاء إلى الأحد، منذ بداية الخدمة.",
    ouverteCta: "الحجز عبر الإنترنت",
  },
  maisonStatus: {
    fermeAHeure: "يغلق عند {heure}",
    ouvertFerme: "مفتوح · يغلق عند {heure}",
    ferme: "مغلق",
    fermeDemain: "مغلق · غدًا عند {heure}",
    fermeLeJour: "مغلق · {jour} عند {heure}",
  },
  breadcrumbs: { aria: "مسار التنقل" },
  cta: {
    reserver: "حجز",
    itineraire: "الطريق",
    devis: "عرض سعر",
    ariaActions: "إجراءات سريعة",
  },
  reservationForm: {
    etapeTable: "طاولتك",
    etapeCoordonnees: "بياناتك",
    progression: "تقدّم النموذج",
    maison: "البيت",
    date: "التاريخ",
    convives: "عدد الضيوف",
    personnePlurals: {
      zero: "ضيف",
      one: "ضيف واحد",
      two: "ضيفان",
      few: "ضيوف",
      many: "ضيفًا",
      other: "ضيف",
    },
    heure: "الوقت",
    choisirDate: "اختر تاريخًا أولًا",
    fermeCeJour: "مغلق في هذا اليوم — اختر تاريخًا آخر",
    occasion: "المناسبة (اختياري)",
    occasions: {
      aucune: "لا شيء بالتحديد",
      anniversaire: "عيد ميلاد",
      romantique: "عشاء رومانسي",
      famille: "غداء عائلي",
      professionnel: "غداء مهني",
      autre: "أخرى",
    },
    privatisationTitre:
      "لعدد {n} ضيفًا، فكّروا في الاستئجار الخاص.",
    privatisationTexte:
      "بدءًا من 10 ضيوف، نقترح قائمة خاصة وصالة مستأجَرة.",
    privatisationCta: "طلب عرض سعر للاستئجار",
    nom: "الاسم الكامل",
    email: "البريد الإلكتروني",
    telephone: "الهاتف",
    telephoneHint: "صيغة فرنسية — مثال: 06 25 15 13 33",
    demandes: "طلبات خاصة (اختياري)",
    demandesHint:
      "حساسية، عدم تحمّل، كرسي متحرّك، طاولة هادئة، عربة أطفال…",
    rgpd:
      "أوافق على أن تستخدم Maison Oléa بياناتي لمعالجة طلب الحجز هذا. لا تواصل تسويقي دون موافقة صريحة.",
    continuer: "متابعة",
    privatisationLink: "أكثر من 10 ضيوف؟ عرض سعر للاستئجار",
    retour: "← رجوع",
    envoyer: "إرسال طلب الحجز",
    envoiEnCours: "جارٍ الإرسال…",
    services: { dejeuner: "غداء", diner: "عشاء" },
    successEyebrow: "تم إرسال الطلب",
    successTitre: "سنؤكّد طاولتكم قريبًا جدًا.",
    successTexte:
      "أُرسل إليكم للتو بريد ملخّص (مع دعوة تقويم). يتواصل فريقنا خلال ساعات لتأكيد الموعد.",
    successCta: "حجز جديد",
    errors: {
      invalid_data: "بيانات غير صالحة.",
      bad_json: "محتوى الطلب غير صالح.",
      maison_unknown: "بيت غير معروف.",
      maison_closed_online:
        "هذا البيت لا يقبل بعد الحجوزات عبر الإنترنت.",
      past_date: "يجب أن يكون التاريخ في المستقبل.",
      closed_on_date: "البيت مغلق في ذلك اليوم.",
      invalid_slot: "الوقت غير متاح في هذا التاريخ.",
      service_mismatch: "الخدمة لا تتوافق مع الوقت المختار.",
      rate_limited: "محاولات كثيرة. حاول لاحقًا.",
      send_failed: "فشل الإرسال. حاول بعد قليل.",
      generic: "حدث خطأ.",
      invalidSlot: "اختر وقتًا صالحًا.",
    },
  },
  devisForm: {
    you: "أنت",
    event: "مناسبتك",
    nom: "الاسم الكامل",
    email: "البريد الإلكتروني",
    telephone: "الهاتف",
    maison: "البيت",
    typeEvenement: "نوع المناسبة",
    types: {
      anniversaire: "عيد ميلاد",
      mariage: "عرس",
      seminaire: "ندوة",
      affaires: "غداء مهني",
      famille: "لقاء عائلي",
      autre: "أخرى",
    },
    convives: "عدد الضيوف",
    date: "التاريخ المرغوب",
    precisions: "تفاصيل",
    precisionsHint:
      "رغبات، قيود، حساسية، أجواء مرغوبة…",
    precisionsPlaceholder: "حدّثونا عن مشروعكم",
    legalBefore: "ردّ مخصّص خلال ",
    legalStrong: "48 ساعة",
    legalAfter: ". بياناتكم تُستخدم فقط لمعالجة طلبكم.",
    envoyer: "إرسال الطلب",
    envoiEnCours: "جارٍ الإرسال…",
    successEyebrow: "شكرًا!",
    successTitre: "وصلَنا طلبكم.",
    successTexte:
      "نتواصل معكم خلال 48 ساعة بعرض مخصّص.",
    successCta: "إرسال طلب آخر",
    errors: {
      invalid_data: "بيانات غير صالحة.",
      bad_json: "محتوى الطلب غير صالح.",
      maison_unknown: "بيت غير معروف.",
      send_failed: "فشل الإرسال. حاول بعد قليل.",
      generic: "حدث خطأ.",
    },
  },
  notFound: {
    eyebrow: "خطأ 404",
    titre: "ضاعت هذه الصفحة",
    titreItalic: "في الشمس.",
    sousTitre:
      "الرابط الذي تتبعه لم يعد موجودًا أو تم نقله.",
    ctaAccueil: "العودة إلى الرئيسية",
    ctaMaisons: "بيوتنا",
  },
  errorPage: {
    eyebrow: "حدث خطأ",
    titre: "نعتذر،",
    titreItalic: "لحظة من فضلكم.",
    sousTitre:
      "تعذّر عرض هذه الصفحة بشكل صحيح. حاولوا مجددًا أو عودوا إلى الرئيسية.",
    ctaRetry: "إعادة المحاولة",
    ctaAccueil: "العودة إلى الرئيسية",
  },
  loading: {
    unInstant: "لحظة من فضلكم…",
    chargement: "جارٍ التحميل",
  },
  offline: {
    titre: "أنت دون اتصال",
    sousTitre:
      "عاود الاتصال للحجز أو تصفّح القائمة أو التواصل معنا.",
    cta: "إعادة المحاولة",
  },
  pwa: {
    ariaInstall: "تثبيت تطبيق Maison Oléa",
    installerOlea: "تثبيت Oléa",
    androidTexte:
      "أضف التطبيق إلى الشاشة الرئيسية للوصول المباشر.",
    androidCta: "تثبيت",
    iosBefore: "اضغط ",
    iosShare: "مشاركة",
    iosAfter: " ثم «إلى الشاشة الرئيسية».",
    dismiss: "عدم العرض مجددًا",
  },
  languageSwitcher: {
    aria: "اختيار اللغة",
    label: "اللغة",
    changed: "اللغة: العربية",
  },
  maisonMap: {
    eyebrow: "الخريطة",
    titre: "كيف تصل إلينا",
    ouvrirGoogleMaps: "افتح في خرائط Google",
    itineraireGoogleMaps: "اتجاهات خرائط Google",
    ariaCarte: "خريطة Maison Oléa {nom}",
  },
  emails: {
    reservation: {
      subject: "طاولتكم في Maison Oléa · {date} {heure}",
      eyebrow: "Maison Oléa · {nom}",
      bonjour: "مرحبًا {nom}،",
      corpus:
        "لقد استلمنا طلب الحجز الخاص بكم. سيتواصل معكم فريقنا خلال ساعات قليلة لتأكيد الحجز نهائيًا.",
      labels: {
        maison: "البيت",
        date: "التاريخ",
        heure: "الوقت",
        convives: "الضيوف",
        precisions: "ملاحظاتكم",
      },
      pieceJointe:
        "ستجدون في المرفقات ملف .ics لإضافته إلى التقويم. لأي تعديل، اتصلوا بنا على {telephone}.",
      signature: "إلى لقاء قريب،",
      signatureLigne2: "فريق Oléa",
      services: { dejeuner: "الغداء", diner: "العشاء" },
    },
  },
  ics: {
    summary: "حجز Maison Oléa · {nom}",
    descriptionPersonnes: "حجز لـ {n} ضيوف.",
  },
  mentionsLegales: {
    metaTitle: "الإشعارات القانونية",
    metaDescription:
      "الإشعارات القانونية ومعلومات حماية البيانات لموقع Maison Oléa: الناشر، المضيف، الملكية الفكرية، حماية البيانات الشخصية.",
    eyebrow: "الإشعارات القانونية",
    titre: "المعلومات",
    titreItalic: "القانونية.",
    sousTitre:
      "وفقًا للمادتين 6-III و19 من القانون الفرنسي للثقة في الاقتصاد الرقمي.",
    derniereMaj: "آخر تحديث: مايو 2026",
    editeur: {
      titre: "ناشر الموقع",
      raisonSociale: "الاسم التجاري: Maison Oléa",
      forme: "الشكل القانوني: يُستكمل لاحقًا",
      siege: "المقر الاجتماعي: يُستكمل لاحقًا",
      siret: "رقم SIRET: يُستكمل لاحقًا",
      tva: "رقم الضريبة على القيمة المضافة داخل الاتحاد الأوروبي: يُستكمل لاحقًا",
      directeur: "مدير النشر: يُستكمل لاحقًا",
      contact: "للتواصل: contact@olea-restaurant.fr",
    },
    hebergeur: {
      titre: "المضيف",
      nom: "Vercel Inc.",
      adresse: "440 N Barranca Ave #4133, Covina, CA 91723, الولايات المتحدة",
      site: "https://vercel.com",
    },
    pi: {
      titre: "الملكية الفكرية",
      texte:
        "جميع المحتويات الموجودة في هذا الموقع (نصوص، صور، رسوم توضيحية، علامات تجارية) محمية بموجب حقوق المؤلف وتبقى ملكًا حصريًا لـ Maison Oléa ما لم يُذكر خلاف ذلك. يُمنع أي استنساخ دون إذن خطي مسبق.",
    },
    donnees: {
      titre: "حماية البيانات الشخصية",
      intro:
        "وفقًا للائحة العامة لحماية البيانات (GDPR)، يحق لكم الوصول إلى بياناتكم الشخصية وتصحيحها وحذفها وتقييد معالجتها والاعتراض عليها.",
      collecte:
        "تُستخدم البيانات التي يتم جمعها عبر نماذج الحجز والعروض والتواصل فقط لمعالجة طلبكم، ولا يتم التنازل عنها لأي طرف ثالث.",
      conservation:
        "تُحفظ طلبات الحجز لمدة 12 شهرًا بعد تاريخ الوجبة. تُحفظ طلبات العروض لمدة 24 شهرًا.",
      contact:
        "لممارسة حقوقكم، اكتبوا إلى contact@olea-restaurant.fr.",
    },
    cookies: {
      titre: "ملفات تعريف الارتباط",
      texte:
        "لا يستخدم هذا الموقع ملفات تعريف ارتباط لقياس الجمهور أو للإعلانات. هناك ملف تقني واحد فقط (NEXT_LOCALE) يحفظ اختياركم للغة للزيارات القادمة.",
    },
    droit: {
      titre: "القانون المعمول به",
      texte:
        "تخضع هذه الإشعارات القانونية للقانون الفرنسي. أي نزاع يتعلق بتفسيرها أو تنفيذها يقع ضمن اختصاص المحاكم الفرنسية.",
    },
  },
} satisfies Dictionary;

export default ar;

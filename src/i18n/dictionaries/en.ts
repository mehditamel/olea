import type { Dictionary } from "../dictionaries";

const en = {
  common: {
    skipLink: "Skip to content",
    decouvrir: "Discover",
    reserver: "Book",
    retourAccueil: "Back to home",
    fermer: "Close",
    appeler: "Call",
    ariaSiteName: "Maison Oléa",
    ouvertureProchaine: "Opening soon",
    bientot: "Soon",
  },
  meta: {
    homeTitle:
      "Maison Oléa — Mediterranean cuisine · Marseille, Cassis, Villeneuve-Loubet",
    homeDescription:
      "Maison Oléa celebrates the Mediterranean across three houses: Marseille, Cassis and Villeneuve-Loubet. Honest cuisine, fresh local produce.",
    applicationName: "Maison Oléa",
    ogTitle: "Maison Oléa — Mediterranean cuisine",
    ogDescription:
      "Three houses, one gesture: celebrating the light of the South through sincere cuisine and sharing.",
    twitterTitle: "Maison Oléa",
    twitterDescription:
      "Mediterranean cuisine in Provence and on the Côte d'Azur — Marseille · Cassis · Villeneuve-Loubet.",
    appleTitle: "Oléa",
    titleTemplate: "%s — Maison Oléa",
  },
  nav: {
    accueil: "Home",
    maisons: "Houses",
    nosMaisons: "Our houses",
    carte: "Menu",
    laCarte: "The menu",
    privatisation: "Private events",
    contact: "Contact",
    reserver: "Book",
  },
  header: {
    ariaLogo: "Maison Oléa — home",
    ariaNav: "Main navigation",
    ariaPhone: "Call Maison Oléa",
    ouvrirMenu: "Open menu",
    reserverParTel: "Book by phone",
    navMobile: "Mobile navigation",
  },
  footer: {
    tagline:
      "Authentic Mediterranean cuisine in Provence and on the Côte d'Azur.",
    nosMaisons: "Our houses",
    laCarte: "The menu",
    privatisation: "Private events",
    contact: "Contact",
    mentionsLegales: "Legal notice",
    decouvrir: "Discover",
    ouvertureProchaine: "Opening soon",
    bientot: "soon",
    copyright: "Maison Oléa",
  },
  hero: {
    eyebrow: "Mediterranean cuisine · Since 2019",
    titre1: "The Mediterranean,",
    titre2Italic: "at your table.",
    sousTitre:
      "Three houses, one gesture: celebrating the light of the South through honest cooking and sharing.",
    ctaReserver: "Book a table",
    ctaDecouvrir: "Discover the houses",
    villes: "Marseille · Cassis · Villeneuve-Loubet",
    scrollHint: "Scroll",
  },
  pillars: {
    produits: {
      titre: "Fresh & local produce",
      texte: "The know-how of regional producers on every plate.",
    },
    faitMaison: {
      titre: "Homemade",
      texte:
        "Dishes prepared on-site, in the Mediterranean tradition.",
    },
    partage: {
      titre: "Sharing & conviviality",
      texte:
        "A table designed for moments shared with family or friends.",
    },
  },
  esprit: {
    eyebrow: "The Oléa spirit",
    titre: "A cuisine born of the",
    titreItalic: "sun",
    titreSuite: "and the earth.",
    p1: "Inspired by the Latin word for olive tree, Oléa celebrates Provence through its gastronomy. Our dishes showcase fresh, local produce and the know-how of regional growers.",
    p2: "Tapenade, grilled fish, sun-ripened vegetables, AOP olive oil — each plate tells the same story: sharing and the light of the South.",
    ctaCarte: "Discover the menu",
    caption: "Extra-virgin olive oil · 2025 harvest",
  },
  maisons: {
    eyebrow: "Our three houses",
    titre: "From Provence to the",
    titreItalic: "Côte d'Azur",
    ariaDecouvrir: "Discover Maison Oléa {nom}",
    altMaison: "Maison Oléa {nom}",
    reserver: "Book",
    bientot: "Soon",
    decouvrir: "Discover",
  },
  privatReserv: {
    eyebrowPrivat: "Private events",
    titrePrivat: "Your celebrations,",
    titrePrivatItalic: "at our table.",
    pPrivat:
      "Birthdays, business meals, weddings, seminars. Our three houses welcome your events with bespoke menus, in a warm setting inspired by the South.",
    ctaPrivat: "Request a quote",
    eyebrowReserver: "Book a table",
    sousReserver: "Pick your house, date and time in just a few clicks.",
    ctaReserver: "Book online",
    eyebrowPhone: "Or by phone",
    appeler: "Call",
  },
  privatisation: {
    metaTitle: "Private events",
    metaDescription:
      "Book Maison Oléa for your birthdays, weddings, seminars or business meals. Bespoke quotes across our three houses.",
    eyebrow: "Private events",
    titre: "Your celebrations,",
    titreItalic: "at our table.",
    sousTitre:
      "Birthdays, business meals, weddings, seminars. Our three houses welcome your events with bespoke menus, in a warm setting inspired by the South.",
    formEyebrow: "Quote request",
    formTitre: "Tell us about your project.",
  },
  carte: {
    metaTitle: "Menu",
    metaDescription:
      "The Maison Oléa menu: Mediterranean cuisine born of the sun and the earth. Tapenade, grilled fish, sun-ripened vegetables. Full menu coming soon.",
    eyebrow: "The menu",
    titre: "A cuisine born of the",
    titreItalic: "sun",
    titreSuite: "and the earth.",
    sousTitre:
      "Our full menu will be unveiled here very soon. In the meantime, here are a few seasonal suggestions.",
    suggestionsEyebrow: "A few suggestions",
    saisons: "The menu evolves with the seasons and daily arrivals.",
    ctaContact: "Contact us",
    items: [
      {
        eyebrow: "To start",
        titre: "Tapenade & crunchy vegetables",
        texte:
          "Black olives from Nyons, anchovies, capers, AOP olive oil, market-fresh crudités.",
      },
      {
        eyebrow: "From the sun",
        titre: "Grilled catch of the day",
        texte:
          "Depending on the local catch, roasted fennel, candied lemon, Provençal herbs.",
      },
      {
        eyebrow: "Signature dish",
        titre: "Sea bass in a salt crust",
        texte:
          "Carved at the table, served with an olive oil and tarragon emulsion.",
      },
      {
        eyebrow: "To finish",
        titre: "Honey & fig tart",
        texte:
          "House shortcrust, roasted figs, lavender honey, olive oil ice cream.",
      },
    ],
  },
  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Contact Maison Oléa in Marseille, Cassis or Villeneuve-Loubet, or write to contact@olea-restaurant.fr.",
    eyebrow: "Contact",
    titre: "Write to us,",
    titreItalic: "come and see us.",
    question: "General enquiry?",
    ouvertureProchaine: "Opening soon",
    bientot: "soon",
  },
  reserver: {
    metaTitle: "Book a table",
    metaDescription:
      "Book your table at one of the three Maison Oléa houses — Marseille, Cassis, Villeneuve-Loubet. Quick confirmation from our team.",
    eyebrow: "Book",
    titre: "A table awaits you,",
    titreItalic: "at Oléa.",
    sousTitre:
      "Book your table at one of our three houses. Our team will confirm within the day.",
    formEyebrow: "Your reservation",
    formTitre: "Choose your house, date and time.",
    phoneEyebrow: "Prefer the phone?",
  },
  maisonsIndex: {
    metaTitle: "Our three houses",
    metaDescription:
      "Maison Oléa in Marseille, Cassis and Villeneuve-Loubet: three Mediterranean addresses, one sincere cuisine inspired by the South.",
    eyebrow: "Our three houses",
    titre: "From Provence to the",
    titreItalic: "Côte d'Azur",
    sousTitre:
      "Three addresses, the same love for southern light and sharing.",
  },
  maisonPage: {
    accueil: "Home",
    maisons: "Houses",
    metaTitleSuffix: "— Mediterranean restaurant",
  },
  maisonHero: {
    ariaSection: "Maison Oléa {nom}",
    itineraire: "Directions",
  },
  maisonGallery: {
    ambiance: "Atmosphere",
    altPhoto: "Maison Oléa {nom} — atmosphere {n}",
    altPhotoLightbox: "Maison Oléa {nom} — photo {n}",
    ariaAgrandir: "Enlarge photo {n} of {total}",
    galerieSrTitle: "Gallery Maison Oléa {nom} — photo {n} of {total}",
    photoPrecedente: "Previous photo",
    photoSuivante: "Next photo",
    fermerLightbox: "Close",
  },
  maisonInstagram: {
    suiveznous: "Follow us on Instagram",
    bientotEntete: "Soon on Instagram",
    suivreEntete: "Follow Maison Oléa {nom}",
    bientotItalic: "Our Instagram account will open with the house.",
    actifItalic:
      "Behind the scenes, daily specials, service moments — the house tells its story every day.",
    ariaOuvrir: "Open Instagram @{handle} in a new tab",
    bientotChip: "@{handle} · soon",
    aperçuAlt: "Instagram Maison Oléa {nom} — preview {n}",
    ariaVoirTout: "See all posts from @{handle} on Instagram",
    voirPlus: "See more on Instagram",
  },
  maisonInfos: {
    nousTrouver: "Find us",
    horaires: "Opening hours",
    dejeuner: "Lunch",
    diner: "Dinner",
    jour: "Day",
    telephone: "Phone",
    horairesAOuverture: "Opening hours announced when we open.",
    ferme: "Closed",
    instagramAria: "Instagram @{handle}",
  },
  maisonReservation: {
    fermeeEyebrow: "Soon",
    fermeeTitre: "This house will open its doors very soon.",
    fermeeCta: "Stay informed",
    ouverteEyebrow: "Book at {nom}",
    ouverteTitre: "A table awaits you.",
    ouverteItalic:
      "Our team answers Tuesday through Sunday, from the start of service.",
    ouverteCta: "Book online",
  },
  maisonStatus: {
    fermeAHeure: "Closes at {heure}",
    ouvertFerme: "Open · closes at {heure}",
    ferme: "Closed",
    fermeDemain: "Closed · tomorrow at {heure}",
    fermeLeJour: "Closed · {jour} at {heure}",
  },
  breadcrumbs: { aria: "Breadcrumb" },
  cta: {
    reserver: "Book",
    itineraire: "Directions",
    devis: "Quote",
    ariaActions: "Quick actions",
  },
  reservationForm: {
    etapeTable: "Your table",
    etapeCoordonnees: "Your details",
    progression: "Form progress",
    maison: "House",
    date: "Date",
    convives: "Number of guests",
    personne: "person",
    personnes: "people",
    heure: "Time",
    choisirDate: "Pick a date first",
    fermeCeJour: "Closed that day — pick another date",
    occasion: "Occasion (optional)",
    occasions: {
      aucune: "None in particular",
      anniversaire: "Birthday",
      romantique: "Romantic dinner",
      famille: "Family meal",
      professionnel: "Business meal",
      autre: "Other",
    },
    privatisationTitre:
      "For {n} guests, consider a private event.",
    privatisationTexte:
      "Beyond 10 guests, we offer a bespoke menu and private room.",
    privatisationCta: "Request a private-event quote",
    nom: "Full name",
    email: "Email",
    telephone: "Phone",
    telephoneHint: "French format — e.g. 06 25 15 13 33",
    demandes: "Special requests (optional)",
    demandesHint:
      "Allergies, intolerances, wheelchair, quiet table, stroller…",
    rgpd:
      "I agree that my details may be used by Maison Oléa to process this booking request. No marketing communication without explicit consent.",
    continuer: "Continue",
    privatisationLink: "More than 10 guests? Private-event quote",
    retour: "← Back",
    envoyer: "Request booking",
    envoiEnCours: "Sending…",
    services: { dejeuner: "Lunch", diner: "Dinner" },
    successEyebrow: "Request sent",
    successTitre: "We'll confirm your table shortly.",
    successTexte:
      "A summary email (with a calendar invite) has just been sent to you. Our team will follow up within a few hours to confirm the slot.",
    successCta: "New booking",
    errors: {
      invalid_data: "Invalid data.",
      bad_json: "Invalid request body.",
      maison_unknown: "Unknown house.",
      maison_closed_online:
        "This house does not yet accept online bookings.",
      past_date: "The date must be in the future.",
      closed_on_date: "The house is closed on that day.",
      invalid_slot: "Slot unavailable on this date.",
      service_mismatch: "Service does not match the chosen time.",
      rate_limited: "Too many attempts. Please try again later.",
      send_failed: "Sending failed. Please try again in a moment.",
      generic: "An error occurred.",
      invalidSlot: "Please pick a valid time.",
    },
  },
  devisForm: {
    you: "You",
    event: "Your event",
    nom: "Full name",
    email: "Email",
    telephone: "Phone",
    maison: "House",
    typeEvenement: "Type of event",
    types: {
      anniversaire: "Birthday",
      mariage: "Wedding",
      seminaire: "Seminar",
      affaires: "Business meal",
      famille: "Family gathering",
      autre: "Other",
    },
    convives: "Number of guests",
    date: "Desired date",
    precisions: "Details",
    precisionsHint:
      "Wishes, constraints, allergies, desired atmosphere…",
    precisionsPlaceholder: "Tell us about your project",
    legalBefore: "Personalised reply within ",
    legalStrong: "48 hours",
    legalAfter: ". Your data is only used to handle your request.",
    envoyer: "Send request",
    envoiEnCours: "Sending…",
    successEyebrow: "Thank you!",
    successTitre: "Your request has reached us.",
    successTexte:
      "We'll get back to you within 48 hours with a bespoke proposal.",
    successCta: "Send another request",
    errors: {
      invalid_data: "Invalid data.",
      bad_json: "Invalid request body.",
      maison_unknown: "Unknown house.",
      send_failed: "Sending failed. Please try again in a moment.",
      generic: "An error occurred.",
    },
  },
  notFound: {
    eyebrow: "Error 404",
    titre: "This page wandered off",
    titreItalic: "into the sun.",
    sousTitre:
      "The link you followed no longer exists or has been moved.",
    ctaAccueil: "Back to home",
    ctaMaisons: "Our houses",
  },
  errorPage: {
    eyebrow: "An error occurred",
    titre: "Forgive us,",
    titreItalic: "just a moment.",
    sousTitre:
      "This page could not load correctly. Try again, or head back home.",
    ctaRetry: "Try again",
    ctaAccueil: "Back to home",
  },
  loading: {
    unInstant: "Just a moment…",
    chargement: "Loading",
  },
  offline: {
    titre: "You are offline",
    sousTitre:
      "Reconnect to book, browse the menu or get in touch.",
    cta: "Retry",
  },
  pwa: {
    ariaInstall: "Install the Maison Oléa app",
    installerOlea: "Install Oléa",
    androidTexte:
      "Add the app to your home screen for direct access.",
    androidCta: "Install",
    iosBefore: "Tap ",
    iosShare: "Share",
    iosAfter: " then 'Add to Home Screen'.",
    dismiss: "Don't show again",
  },
  languageSwitcher: {
    aria: "Choose language",
    label: "Language",
  },
} satisfies Dictionary;

export default en;

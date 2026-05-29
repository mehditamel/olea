import type { Dictionary } from "../dictionaries";

const es = {
  common: {
    skipLink: "Ir al contenido",
    decouvrir: "Descubrir",
    reserver: "Reservar",
    retourAccueil: "Volver al inicio",
    fermer: "Cerrar",
    appeler: "Llamar",
    ariaSiteName: "Maison Oléa",
    ouvertureProchaine: "Apertura próxima",
    bientot: "Pronto",
    backToTop: "Volver arriba",
  },
  meta: {
    homeTitle:
      "Maison Oléa — Cocina mediterránea · Marsella, Cassis, Villeneuve-Loubet",
    homeDescription:
      "Maison Oléa celebra el Mediterráneo a través de tres casas: Marsella, Cassis y Villeneuve-Loubet. Una cocina sincera, productos frescos y locales.",
    applicationName: "Maison Oléa",
    ogTitle: "Maison Oléa — Cocina mediterránea",
    ogDescription:
      "Tres casas, un mismo gesto: celebrar la luz del Sur con una cocina sincera y el placer de compartir.",
    twitterTitle: "Maison Oléa",
    twitterDescription:
      "Cocina mediterránea en Provenza y Costa Azul — Marsella · Cassis · Villeneuve-Loubet.",
    appleTitle: "Oléa",
    titleTemplate: "%s — Maison Oléa",
  },
  nav: {
    accueil: "Inicio",
    maisons: "Casas",
    nosMaisons: "Nuestras casas",
    carte: "Carta",
    laCarte: "La carta",
    privatisation: "Privatización",
    contact: "Contacto",
    reserver: "Reservar",
  },
  header: {
    ariaLogo: "Maison Oléa — inicio",
    ariaNav: "Navegación principal",
    ariaPhone: "Llamar a Maison Oléa",
    ouvrirMenu: "Abrir el menú",
    reserverParTel: "Reservar por teléfono",
    navMobile: "Navegación móvil",
  },
  footer: {
    tagline:
      "Una cocina mediterránea auténtica en Provenza y Costa Azul.",
    nosMaisons: "Nuestras casas",
    laCarte: "La carta",
    privatisation: "Privatización",
    contact: "Contacto",
    mentionsLegales: "Aviso legal",
    cgu: "Condiciones de uso",
    decouvrir: "Descubrir",
    ouvertureProchaine: "Apertura próxima",
    bientot: "pronto",
    copyright: "Maison Oléa",
  },
  hero: {
    eyebrow: "Cocina mediterránea · Desde 2019",
    titre1: "El Mediterráneo,",
    titre2Italic: "en su mesa.",
    sousTitre:
      "Tres casas, un mismo gesto: celebrar la luz del Sur con una cocina sincera y el placer de compartir.",
    ctaReserver: "Reservar mesa",
    ctaDecouvrir: "Descubrir las casas",
    villes: "Marsella · Cassis · Villeneuve-Loubet",
    scrollHint: "Desplazar",
  },
  pillars: {
    produits: {
      titre: "Productos frescos y locales",
      texte: "El saber hacer de los productores regionales en cada plato.",
    },
    faitMaison: {
      titre: "Hecho en casa",
      texte:
        "Platos preparados en el lugar, en la tradición mediterránea.",
    },
    partage: {
      titre: "Compartir y convivencia",
      texte:
        "Una mesa pensada para los momentos compartidos, en familia o entre amigos.",
    },
  },
  esprit: {
    eyebrow: "El espíritu Oléa",
    titre: "Una cocina nacida del",
    titreItalic: "sol",
    titreSuite: "y de la tierra.",
    p1: "Inspirado en la palabra latina para olivo, Oléa celebra la Provenza a través de su gastronomía. Nuestros platos dan protagonismo a los productos frescos y locales, destacando el saber hacer de los productores de la región.",
    p2: "Tapenade, pescados a la parrilla, verduras del sol, aceite de oliva AOP — cada plato cuenta la misma historia: la del compartir y la luz del Sur.",
    ctaCarte: "Descubrir la carta",
    caption: "Aceite de oliva virgen extra · Cosecha 2025",
  },
  maisons: {
    eyebrow: "Nuestras tres casas",
    titre: "De la Provenza a la",
    titreItalic: "Costa Azul",
    ariaDecouvrir: "Descubrir Maison Oléa {nom}",
    altMaison: "Maison Oléa {nom}",
    reserver: "Reservar",
    bientot: "Pronto",
    decouvrir: "Descubrir",
  },
  privatReserv: {
    eyebrowPrivat: "Privatización & eventos",
    titrePrivat: "Sus celebraciones,",
    titrePrivatItalic: "en nuestra mesa.",
    pPrivat:
      "Cumpleaños, comidas de empresa, bodas, seminarios. Nuestras tres casas acogen sus eventos con menús a medida, en un ambiente cálido inspirado en el Sur.",
    ctaPrivat: "Pedir un presupuesto",
    eyebrowReserver: "Reservar mesa",
    sousReserver: "Elija casa, fecha y franja en unos pocos clics.",
    ctaReserver: "Reservar en línea",
    eyebrowPhone: "O por teléfono",
    appeler: "Llamar",
  },
  privatisation: {
    metaTitle: "Privatización & eventos",
    metaDescription:
      "Privatice Maison Oléa para cumpleaños, bodas, seminarios y comidas de empresa. Presupuestos a medida en nuestras tres casas.",
    eyebrow: "Privatización",
    titre: "Sus celebraciones,",
    titreItalic: "en nuestra mesa.",
    sousTitre:
      "Cumpleaños, comidas de empresa, bodas, seminarios. Nuestras tres casas acogen sus eventos con menús a medida, en un ambiente cálido inspirado en el Sur.",
    formEyebrow: "Solicitud de presupuesto",
    formTitre: "Cuéntenos su proyecto.",
  },
  carte: {
    metaTitle: "Carta",
    metaDescription:
      "La carta Maison Oléa: una cocina mediterránea nacida del sol y de la tierra. Tapenade, pescados a la parrilla, verduras del sol. Detalles próximamente.",
    eyebrow: "La carta",
    titre: "Una cocina nacida del",
    titreItalic: "sol",
    titreSuite: "y de la tierra.",
    sousTitre:
      "Nuestra carta completa se desvelará aquí muy pronto. Mientras tanto, aquí algunas sugerencias del momento.",
    suggestionsEyebrow: "Algunas sugerencias",
    saisons: "La carta evoluciona al ritmo de las estaciones y las llegadas.",
    ctaContact: "Contáctenos",
    voirLaCarte: "Ver la carta",
    bientotDisponible: "Próximamente",
    items: [
      {
        eyebrow: "De entrante",
        titre: "Tapenade & verduras crujientes",
        texte:
          "Aceitunas negras de Nyons, anchoas, alcaparras, aceite AOP, crudités del mercado.",
      },
      {
        eyebrow: "Del sol",
        titre: "Pescado del día a la parrilla",
        texte:
          "Según la pesca local, hinojo asado, limón confitado, hierbas de Provenza.",
      },
      {
        eyebrow: "Plato emblemático",
        titre: "Lubina en costra de sal",
        texte:
          "Presentada en sala, acompañada de emulsión de aceite y estragón.",
      },
      {
        eyebrow: "Para terminar",
        titre: "Tarta fina de miel & higos",
        texte:
          "Masa quebrada casera, higos asados, miel de lavanda, helado de aceite de oliva.",
      },
    ],
  },
  contact: {
    metaTitle: "Contacto",
    metaDescription:
      "Contacta Maison Oléa en Marsella, Cassis o Villeneuve-Loubet, o escríbenos a contact@olea-restaurant.fr.",
    eyebrow: "Contacto",
    titre: "Escríbanos,",
    titreItalic: "venga a vernos.",
    question: "¿Una consulta general?",
    ouvertureProchaine: "Apertura próxima",
    bientot: "pronto",
  },
  reserver: {
    metaTitle: "Reservar mesa",
    metaDescription:
      "Reserve su mesa en una de las tres casas Oléa — Marsella, Cassis, Villeneuve-Loubet. Confirmación rápida por nuestro equipo.",
    eyebrow: "Reservar",
    titre: "Una mesa le espera,",
    titreItalic: "en Oléa.",
    sousTitre:
      "Reserve su mesa en una de nuestras tres casas. Nuestro equipo confirma su llegada en el día.",
    formEyebrow: "Su reserva",
    formTitre: "Elija casa, fecha y hora.",
    phoneEyebrow: "¿Prefiere el teléfono?",
  },
  maisonsIndex: {
    metaTitle: "Nuestras tres casas",
    metaDescription:
      "Maison Oléa en Marsella, Cassis y Villeneuve-Loubet: tres direcciones mediterráneas, una misma cocina sincera inspirada en el Sur.",
    eyebrow: "Nuestras tres casas",
    titre: "De la Provenza a la",
    titreItalic: "Costa Azul",
    sousTitre:
      "Tres direcciones, un mismo gusto por la luz del Sur y el compartir.",
  },
  maisonPage: {
    accueil: "Inicio",
    maisons: "Casas",
    metaTitleSuffix: "— Restaurante mediterráneo",
  },
  maisonHero: {
    ariaSection: "Maison Oléa {nom}",
    itineraire: "Cómo llegar",
  },
  maisonGallery: {
    ambiance: "Ambiente",
    altPhoto: "Maison Oléa {nom} — ambiente {n}",
    altPhotoLightbox: "Maison Oléa {nom} — foto {n}",
    ariaAgrandir: "Ampliar la foto {n} de {total}",
    galerieSrTitle: "Galería Maison Oléa {nom} — foto {n} de {total}",
    photoPrecedente: "Foto anterior",
    photoSuivante: "Foto siguiente",
    fermerLightbox: "Cerrar",
  },
  maisonInstagram: {
    suiveznous: "Síguenos en Instagram",
    bientotEntete: "Pronto en Instagram",
    suivreEntete: "Sigue Maison Oléa {nom}",
    bientotItalic: "Nuestra cuenta de Instagram abrirá con la casa.",
    actifItalic:
      "Entre bambalinas, platos del día, instantes de servicio — la casa se cuenta a diario.",
    ariaOuvrir: "Abrir Instagram @{handle} en una nueva pestaña",
    bientotChip: "@{handle} · pronto",
    aperçuAlt: "Instagram Maison Oléa {nom} — vista previa {n}",
    ariaVoirTout: "Ver todas las publicaciones de @{handle} en Instagram",
    voirPlus: "Ver más en Instagram",
  },
  maisonInfos: {
    nousTrouver: "Encuéntranos",
    horaires: "Horario",
    dejeuner: "Almuerzo",
    diner: "Cena",
    jour: "Día",
    telephone: "Teléfono",
    horairesAOuverture: "Horario comunicado en la apertura.",
    ferme: "Cerrado",
    instagramAria: "Instagram @{handle}",
  },
  maisonReservation: {
    fermeeEyebrow: "Pronto",
    fermeeTitre: "Esta casa abrirá sus puertas muy pronto.",
    fermeeCta: "Mantenerme informado",
    ouverteEyebrow: "Reservar en {nom}",
    ouverteTitre: "Una mesa le espera.",
    ouverteItalic:
      "Nuestro equipo responde de martes a domingo, desde la apertura del servicio.",
    ouverteCta: "Reservar en línea",
  },
  maisonStatus: {
    fermeAHeure: "Cierra a las {heure}",
    ouvertFerme: "Abierto · cierra a las {heure}",
    ferme: "Cerrado",
    fermeDemain: "Cerrado · mañana a las {heure}",
    fermeLeJour: "Cerrado · {jour} a las {heure}",
  },
  breadcrumbs: { aria: "Migas de pan" },
  cta: {
    reserver: "Reservar",
    itineraire: "Cómo llegar",
    devis: "Presupuesto",
    ariaActions: "Acciones rápidas",
  },
  reservationForm: {
    etapeTable: "Su mesa",
    etapeCoordonnees: "Sus datos",
    progression: "Avance del formulario",
    maison: "Casa",
    date: "Fecha",
    convives: "Número de comensales",
    personnePlurals: {
      one: "persona",
      other: "personas",
    },
    heure: "Hora",
    choisirDate: "Elija primero una fecha",
    fermeCeJour: "Cerrado ese día — elija otra fecha",
    occasion: "Ocasión (opcional)",
    occasions: {
      aucune: "Ninguna en particular",
      anniversaire: "Cumpleaños",
      romantique: "Cena romántica",
      famille: "Comida familiar",
      professionnel: "Comida profesional",
      autre: "Otro",
    },
    privatisationTitre:
      "Para {n} comensales, considere una privatización.",
    privatisationTexte:
      "Por encima de 10 comensales, le proponemos un menú a medida y la sala privatizada.",
    privatisationCta: "Pedir presupuesto de privatización",
    nom: "Nombre completo",
    email: "Email",
    telephone: "Teléfono",
    telephoneHint: "Formato francés — ej. 06 25 15 13 33",
    demandes: "Solicitudes particulares (opcional)",
    demandesHint:
      "Alergias, intolerancias, silla de ruedas, mesa tranquila, carrito…",
    rgpd:
      "Acepto que mis datos sean utilizados por Maison Oléa para tramitar esta solicitud de reserva. Ninguna comunicación de marketing sin consentimiento explícito.",
    continuer: "Continuar",
    privatisationLink: "¿Más de 10 comensales? Presupuesto de privatización",
    retour: "← Volver",
    envoyer: "Solicitar la reserva",
    envoiEnCours: "Enviando…",
    services: { dejeuner: "Almuerzo", diner: "Cena" },
    successEyebrow: "Solicitud enviada",
    successTitre: "Confirmaremos su mesa muy pronto.",
    successTexte:
      "Acabamos de enviarle un correo con resumen (e invitación de calendario). Nuestro equipo le contactará en unas horas para confirmar la franja.",
    successCta: "Nueva reserva",
    errors: {
      invalid_data: "Datos inválidos.",
      bad_json: "Cuerpo de solicitud inválido.",
      maison_unknown: "Casa desconocida.",
      maison_closed_online:
        "Esta casa aún no acepta reservas en línea.",
      past_date: "La fecha debe ser futura.",
      closed_on_date: "La casa está cerrada ese día.",
      invalid_slot: "Franja no disponible en esta fecha.",
      service_mismatch: "El servicio no coincide con la hora elegida.",
      rate_limited: "Demasiados intentos. Inténtelo más tarde.",
      send_failed: "Error al enviar. Vuelva a intentarlo en un momento.",
      generic: "Ha ocurrido un error.",
      invalidSlot: "Elija una hora válida.",
    },
  },
  devisForm: {
    you: "Usted",
    event: "Su evento",
    nom: "Nombre completo",
    email: "Email",
    telephone: "Teléfono",
    maison: "Casa",
    typeEvenement: "Tipo de evento",
    types: {
      anniversaire: "Cumpleaños",
      mariage: "Boda",
      seminaire: "Seminario",
      affaires: "Comida de empresa",
      famille: "Reunión familiar",
      autre: "Otro",
    },
    convives: "Número de comensales",
    date: "Fecha deseada",
    precisions: "Detalles",
    precisionsHint:
      "Deseos, restricciones, alergias, ambiente deseado…",
    precisionsPlaceholder: "Háblenos de su proyecto",
    legalBefore: "Respuesta personalizada en ",
    legalStrong: "48 horas",
    legalAfter: ". Sus datos solo se usan para tramitar su solicitud.",
    envoyer: "Enviar solicitud",
    envoiEnCours: "Enviando…",
    successEyebrow: "¡Gracias!",
    successTitre: "Hemos recibido su solicitud.",
    successTexte:
      "Volvemos a usted en 48 horas con una propuesta a medida.",
    successCta: "Enviar otra solicitud",
    errors: {
      invalid_data: "Datos inválidos.",
      bad_json: "Cuerpo de solicitud inválido.",
      maison_unknown: "Casa desconocida.",
      send_failed: "Error al enviar. Vuelva a intentarlo en un momento.",
      generic: "Ha ocurrido un error.",
    },
  },
  notFound: {
    eyebrow: "Error 404",
    titre: "Esta página se perdió",
    titreItalic: "al sol.",
    sousTitre:
      "El enlace que sigue ya no existe o ha sido movido.",
    ctaAccueil: "Volver al inicio",
    ctaMaisons: "Nuestras casas",
  },
  errorPage: {
    eyebrow: "Ha ocurrido un error",
    titre: "Disculpe,",
    titreItalic: "un instante.",
    sousTitre:
      "Esta página no se ha podido mostrar correctamente. Inténtelo de nuevo o vuelva al inicio.",
    ctaRetry: "Reintentar",
    ctaAccueil: "Volver al inicio",
  },
  loading: {
    unInstant: "Un momento…",
    chargement: "Cargando",
  },
  offline: {
    titre: "Está sin conexión",
    sousTitre:
      "Vuelva a conectarse para reservar, ver la carta o contactarnos.",
    cta: "Reintentar",
  },
  pwa: {
    ariaInstall: "Instalar la app Maison Oléa",
    installerOlea: "Instalar Oléa",
    androidTexte:
      "Añada la app a su pantalla de inicio para acceso directo.",
    androidCta: "Instalar",
    iosBefore: "Pulse ",
    iosShare: "Compartir",
    iosAfter: " y «Añadir a pantalla de inicio».",
    dismiss: "No volver a mostrar",
  },
  languageSwitcher: {
    aria: "Elegir idioma",
    label: "Idioma",
    changed: "Idioma: Español",
  },
  maisonMap: {
    eyebrow: "Mapa",
    titre: "Cómo llegar",
    ouvrirGoogleMaps: "Abrir en Google Maps",
    itineraireGoogleMaps: "Cómo llegar con Google Maps",
    ariaCarte: "Mapa de Maison Oléa {nom}",
  },
  emails: {
    reservation: {
      subject: "Su mesa en Maison Oléa · {date} {heure}",
      eyebrow: "Maison Oléa · {nom}",
      bonjour: "Hola {nom},",
      corpus:
        "Hemos recibido su solicitud de reserva. Nuestro equipo se pondrá en contacto con usted en unas horas para confirmarla definitivamente.",
      labels: {
        maison: "Casa",
        date: "Fecha",
        heure: "Hora",
        convives: "Comensales",
        precisions: "Sus notas",
      },
      pieceJointe:
        "Encontrará adjunto un archivo .ics para añadir a su calendario. Para cualquier cambio, llámenos al {telephone}.",
      signature: "Hasta muy pronto,",
      signatureLigne2: "El equipo Oléa",
      services: { dejeuner: "Almuerzo", diner: "Cena" },
    },
  },
  ics: {
    summary: "Reserva Maison Oléa · {nom}",
    descriptionPersonnes: "Reserva para {n} comensales.",
  },
  mentionsLegales: {
    metaTitle: "Aviso legal",
    metaDescription:
      "Aviso legal e información RGPD del sitio Maison Oléa: editor, hosting, propiedad intelectual, protección de datos personales.",
    eyebrow: "Aviso legal",
    titre: "Información",
    titreItalic: "legal.",
    sousTitre:
      "De acuerdo con los artículos 6-III y 19 de la ley francesa sobre la confianza en la economía digital.",
    derniereMaj: "Última actualización: mayo de 2026",
    editeur: {
      titre: "Editor del sitio",
      raisonSociale: "Razón social: Maison Oléa",
      forme: "Forma jurídica: por completar",
      siege: "Domicilio social: por completar",
      siret: "Número SIRET: por completar",
      tva: "IVA intracomunitario: por completar",
      directeur: "Director de publicación: por completar",
      contact: "Contacto: contact@olea-restaurant.fr",
    },
    hebergeur: {
      titre: "Hosting",
      nom: "Vercel Inc.",
      adresse: "440 N Barranca Ave #4133, Covina, CA 91723, Estados Unidos",
      site: "https://vercel.com",
    },
    pi: {
      titre: "Propiedad intelectual",
      texte:
        "Todo el contenido de este sitio (textos, fotografías, ilustraciones, marcas) está protegido por derechos de autor y es propiedad exclusiva de Maison Oléa, salvo indicación contraria. Cualquier reproducción sin consentimiento escrito previo está prohibida.",
    },
    donnees: {
      titre: "Protección de datos personales",
      intro:
        "De acuerdo con el Reglamento General de Protección de Datos (RGPD), usted dispone de derechos de acceso, rectificación, supresión, limitación y oposición al tratamiento de sus datos personales.",
      collecte:
        "Los datos recogidos a través de los formularios de reserva, presupuesto y contacto se utilizan únicamente para gestionar su solicitud y nunca se ceden a terceros.",
      conservation:
        "Las solicitudes de reserva se conservan durante 12 meses tras la fecha de la comida. Las solicitudes de presupuesto se conservan durante 24 meses.",
      contact:
        "Para ejercer sus derechos, escriba a contact@olea-restaurant.fr.",
    },
    cookies: {
      titre: "Cookies",
      texte:
        "Este sitio no utiliza cookies de medición de audiencia ni publicitarias. Una única cookie técnica (NEXT_LOCALE) recuerda su elección de idioma para las próximas visitas.",
    },
    droit: {
      titre: "Ley aplicable",
      texte:
        "Estas menciones legales se rigen por el derecho francés. Cualquier litigio relativo a su interpretación o ejecución es competencia de los tribunales franceses.",
    },
  },
} satisfies Dictionary;

export default es;

import type { Dictionary } from "../dictionaries";

const it = {
  common: {
    skipLink: "Vai al contenuto",
    decouvrir: "Scoprire",
    reserver: "Prenotare",
    retourAccueil: "Torna alla home",
    fermer: "Chiudi",
    appeler: "Chiama",
    ariaSiteName: "Maison Oléa",
    ouvertureProchaine: "Apertura prossima",
    bientot: "Presto",
  },
  meta: {
    homeTitle:
      "Maison Oléa — Cucina mediterranea · Marsiglia, Cassis, Villeneuve-Loubet",
    homeDescription:
      "Maison Oléa celebra il Mediterraneo attraverso tre case: Marsiglia, Cassis e Villeneuve-Loubet. Una cucina sincera, prodotti freschi e locali.",
    applicationName: "Maison Oléa",
    ogTitle: "Maison Oléa — Cucina mediterranea",
    ogDescription:
      "Tre case, un solo gesto: celebrare la luce del Sud con una cucina sincera e la condivisione.",
    twitterTitle: "Maison Oléa",
    twitterDescription:
      "Cucina mediterranea in Provenza e Costa Azzurra — Marsiglia · Cassis · Villeneuve-Loubet.",
    appleTitle: "Oléa",
    titleTemplate: "%s — Maison Oléa",
  },
  nav: {
    accueil: "Home",
    maisons: "Case",
    nosMaisons: "Le nostre case",
    carte: "Menù",
    laCarte: "Il menù",
    privatisation: "Privatizzazione",
    contact: "Contatti",
    reserver: "Prenota",
  },
  header: {
    ariaLogo: "Maison Oléa — home",
    ariaNav: "Navigazione principale",
    ariaPhone: "Chiama Maison Oléa",
    ouvrirMenu: "Apri il menù",
    reserverParTel: "Prenotare per telefono",
    navMobile: "Navigazione mobile",
  },
  footer: {
    tagline:
      "Una cucina mediterranea autentica in Provenza e Costa Azzurra.",
    nosMaisons: "Le nostre case",
    laCarte: "Il menù",
    privatisation: "Privatizzazione",
    contact: "Contatti",
    mentionsLegales: "Note legali",
    decouvrir: "Scopri",
    ouvertureProchaine: "Apertura prossima",
    bientot: "presto",
    copyright: "Maison Oléa",
  },
  hero: {
    eyebrow: "Cucina mediterranea · Dal 2019",
    titre1: "Il Mediterraneo,",
    titre2Italic: "alla vostra tavola.",
    sousTitre:
      "Tre case, un solo gesto: celebrare la luce del Sud con una cucina sincera e la condivisione.",
    ctaReserver: "Prenota un tavolo",
    ctaDecouvrir: "Scopri le case",
    villes: "Marsiglia · Cassis · Villeneuve-Loubet",
    scrollHint: "Scorri",
  },
  pillars: {
    produits: {
      titre: "Prodotti freschi e locali",
      texte: "Il saper fare dei produttori regionali in ogni piatto.",
    },
    faitMaison: {
      titre: "Fatto in casa",
      texte: "Piatti preparati sul posto, nella tradizione mediterranea.",
    },
    partage: {
      titre: "Condivisione e convivialità",
      texte:
        "Una tavola pensata per i momenti in famiglia o tra amici.",
    },
  },
  esprit: {
    eyebrow: "Lo spirito Oléa",
    titre: "Una cucina nata dal",
    titreItalic: "sole",
    titreSuite: "e dalla terra.",
    p1: "Ispirato alla parola latina che indica l'ulivo, Oléa celebra la Provenza attraverso la sua gastronomia. I nostri piatti valorizzano i prodotti freschi e locali, mettendo in luce il saper fare dei produttori della regione.",
    p2: "Tapenade, pesce alla griglia, ortaggi del sole, olio extravergine AOP — ogni piatto racconta la stessa storia: quella della condivisione e della luce del Sud.",
    ctaCarte: "Scopri il menù",
    caption: "Olio extravergine d'oliva · Raccolta 2025",
  },
  maisons: {
    eyebrow: "Le nostre tre case",
    titre: "Dalla Provenza alla",
    titreItalic: "Costa Azzurra",
    ariaDecouvrir: "Scopri Maison Oléa {nom}",
    altMaison: "Maison Oléa {nom}",
    reserver: "Prenota",
    bientot: "Presto",
    decouvrir: "Scopri",
  },
  privatReserv: {
    eyebrowPrivat: "Privatizzazione & eventi",
    titrePrivat: "Le vostre celebrazioni,",
    titrePrivatItalic: "alla nostra tavola.",
    pPrivat:
      "Compleanni, pranzi d'affari, matrimoni, seminari. Le nostre tre case accolgono i vostri eventi con menù su misura, in un'atmosfera calda ispirata al Sud.",
    ctaPrivat: "Richiedi un preventivo",
    eyebrowReserver: "Prenota un tavolo",
    sousReserver: "Scegli la casa, la data e l'orario in pochi clic.",
    ctaReserver: "Prenota online",
    eyebrowPhone: "O per telefono",
    appeler: "Chiama",
  },
  privatisation: {
    metaTitle: "Privatizzazione & eventi",
    metaDescription:
      "Privatizza Maison Oléa per compleanni, matrimoni, seminari e pranzi d'affari. Preventivi su misura nelle nostre tre case.",
    eyebrow: "Privatizzazione",
    titre: "Le vostre celebrazioni,",
    titreItalic: "alla nostra tavola.",
    sousTitre:
      "Compleanni, pranzi d'affari, matrimoni, seminari. Le nostre tre case accolgono i vostri eventi con menù su misura, in un'atmosfera calda ispirata al Sud.",
    formEyebrow: "Richiesta di preventivo",
    formTitre: "Parlateci del vostro progetto.",
  },
  carte: {
    metaTitle: "Menù",
    metaDescription:
      "Il menù di Maison Oléa: una cucina mediterranea nata dal sole e dalla terra. Tapenade, pesce alla griglia, ortaggi del sole. Dettagli in arrivo.",
    eyebrow: "Il menù",
    titre: "Una cucina nata dal",
    titreItalic: "sole",
    titreSuite: "e dalla terra.",
    sousTitre:
      "Il nostro menù completo sarà svelato qui molto presto. Nel frattempo, ecco alcuni suggerimenti del momento.",
    suggestionsEyebrow: "Qualche suggerimento",
    saisons: "Il menù evolve con le stagioni e gli arrivi giornalieri.",
    ctaContact: "Contattaci",
    items: [
      {
        eyebrow: "Antipasto",
        titre: "Tapenade & verdure croccanti",
        texte:
          "Olive nere di Nyons, acciughe, capperi, olio AOP, crudités del mercato.",
      },
      {
        eyebrow: "Dal sole",
        titre: "Pescato del giorno alla griglia",
        texte:
          "Secondo la pesca locale, finocchio arrosto, limone candito, erbe di Provenza.",
      },
      {
        eyebrow: "Piatto signature",
        titre: "Branzino in crosta di sale",
        texte:
          "Presentato in sala, accompagnato da un'emulsione di olio d'oliva e dragoncello.",
      },
      {
        eyebrow: "Per finire",
        titre: "Crostata di miele & fichi",
        texte:
          "Pasta frolla artigianale, fichi arrostiti, miele di lavanda, gelato all'olio d'oliva.",
      },
    ],
  },
  contact: {
    metaTitle: "Contatti",
    metaDescription:
      "Contatta Maison Oléa a Marsiglia, Cassis o Villeneuve-Loubet, oppure scrivici a contact@olea-restaurant.fr.",
    eyebrow: "Contatti",
    titre: "Scriveteci,",
    titreItalic: "venite a trovarci.",
    question: "Una domanda generale?",
    ouvertureProchaine: "Apertura prossima",
    bientot: "presto",
  },
  reserver: {
    metaTitle: "Prenota un tavolo",
    metaDescription:
      "Prenota il tuo tavolo in una delle tre case Oléa — Marsiglia, Cassis, Villeneuve-Loubet. Conferma rapida dal nostro team.",
    eyebrow: "Prenota",
    titre: "Un tavolo vi attende,",
    titreItalic: "da Oléa.",
    sousTitre:
      "Prenota il tuo tavolo in una delle nostre tre case. Il nostro team conferma in giornata.",
    formEyebrow: "La tua prenotazione",
    formTitre: "Scegli casa, data e orario.",
    phoneEyebrow: "Preferisci il telefono?",
  },
  maisonsIndex: {
    metaTitle: "Le nostre tre case",
    metaDescription:
      "Maison Oléa a Marsiglia, Cassis e Villeneuve-Loubet: tre indirizzi mediterranei, una stessa cucina sincera ispirata al Sud.",
    eyebrow: "Le nostre tre case",
    titre: "Dalla Provenza alla",
    titreItalic: "Costa Azzurra",
    sousTitre:
      "Tre indirizzi, lo stesso gusto per la luce del Sud e la condivisione.",
  },
  maisonPage: {
    accueil: "Home",
    maisons: "Case",
    metaTitleSuffix: "— Ristorante mediterraneo",
  },
  maisonHero: {
    ariaSection: "Maison Oléa {nom}",
    itineraire: "Indicazioni",
  },
  maisonGallery: {
    ambiance: "Atmosfera",
    altPhoto: "Maison Oléa {nom} — atmosfera {n}",
    altPhotoLightbox: "Maison Oléa {nom} — foto {n}",
    ariaAgrandir: "Ingrandisci la foto {n} di {total}",
    galerieSrTitle: "Galleria Maison Oléa {nom} — foto {n} di {total}",
    photoPrecedente: "Foto precedente",
    photoSuivante: "Foto successiva",
    fermerLightbox: "Chiudi",
  },
  maisonInstagram: {
    suiveznous: "Seguici su Instagram",
    bientotEntete: "Presto su Instagram",
    suivreEntete: "Segui Maison Oléa {nom}",
    bientotItalic: "Il nostro account Instagram aprirà con la casa.",
    actifItalic:
      "Dietro le quinte, piatti del giorno, momenti di servizio — la casa si racconta ogni giorno.",
    ariaOuvrir: "Apri Instagram @{handle} in una nuova scheda",
    bientotChip: "@{handle} · presto",
    aperçuAlt: "Instagram Maison Oléa {nom} — anteprima {n}",
    ariaVoirTout: "Vedi tutti i post di @{handle} su Instagram",
    voirPlus: "Vedi di più su Instagram",
  },
  maisonInfos: {
    nousTrouver: "Dove trovarci",
    horaires: "Orari",
    dejeuner: "Pranzo",
    diner: "Cena",
    jour: "Giorno",
    telephone: "Telefono",
    horairesAOuverture: "Orari comunicati all'apertura.",
    ferme: "Chiuso",
    instagramAria: "Instagram @{handle}",
  },
  maisonReservation: {
    fermeeEyebrow: "Presto",
    fermeeTitre: "Questa casa aprirà le sue porte molto presto.",
    fermeeCta: "Resta informato",
    ouverteEyebrow: "Prenota a {nom}",
    ouverteTitre: "Un tavolo vi attende.",
    ouverteItalic:
      "Il nostro team risponde dal martedì alla domenica, dall'apertura del servizio.",
    ouverteCta: "Prenota online",
  },
  maisonStatus: {
    fermeAHeure: "Chiude alle {heure}",
    ouvertFerme: "Aperto · chiude alle {heure}",
    ferme: "Chiuso",
    fermeDemain: "Chiuso · domani alle {heure}",
    fermeLeJour: "Chiuso · {jour} alle {heure}",
  },
  breadcrumbs: { aria: "Briciole di pane" },
  cta: {
    reserver: "Prenota",
    itineraire: "Indicazioni",
    devis: "Preventivo",
    ariaActions: "Azioni rapide",
  },
  reservationForm: {
    etapeTable: "Il tuo tavolo",
    etapeCoordonnees: "I tuoi dati",
    progression: "Avanzamento del modulo",
    maison: "Casa",
    date: "Data",
    convives: "Numero di ospiti",
    personnePlurals: {
      one: "persona",
      other: "persone",
    },
    heure: "Ora",
    choisirDate: "Scegli prima una data",
    fermeCeJour: "Chiuso questo giorno — scegli un'altra data",
    occasion: "Occasione (facoltativo)",
    occasions: {
      aucune: "Nessuna in particolare",
      anniversaire: "Compleanno",
      romantique: "Cena romantica",
      famille: "Pranzo di famiglia",
      professionnel: "Pranzo professionale",
      autre: "Altro",
    },
    privatisationTitre:
      "Per {n} ospiti, valuta una privatizzazione.",
    privatisationTexte:
      "Oltre i 10 ospiti vi proponiamo un menù su misura e la sala privatizzata.",
    privatisationCta: "Richiedi preventivo privatizzazione",
    nom: "Nome completo",
    email: "Email",
    telephone: "Telefono",
    telephoneHint: "Formato francese — es. 06 25 15 13 33",
    demandes: "Richieste particolari (facoltativo)",
    demandesHint:
      "Allergie, intolleranze, sedia a rotelle, tavolo tranquillo, passeggino…",
    rgpd:
      "Accetto che i miei dati siano utilizzati da Maison Oléa per gestire questa richiesta di prenotazione. Nessuna comunicazione marketing senza consenso esplicito.",
    continuer: "Continua",
    privatisationLink: "Più di 10 ospiti? Preventivo privatizzazione",
    retour: "← Indietro",
    envoyer: "Richiedi la prenotazione",
    envoiEnCours: "Invio in corso…",
    services: { dejeuner: "Pranzo", diner: "Cena" },
    successEyebrow: "Richiesta inviata",
    successTitre: "Confermeremo il vostro tavolo molto presto.",
    successTexte:
      "Ti è appena stata inviata un'email di riepilogo (con invito calendario). Il nostro team ti ricontatta entro poche ore per confermare l'orario.",
    successCta: "Nuova prenotazione",
    errors: {
      invalid_data: "Dati non validi.",
      bad_json: "Corpo della richiesta non valido.",
      maison_unknown: "Casa sconosciuta.",
      maison_closed_online:
        "Questa casa non accetta ancora prenotazioni online.",
      past_date: "La data deve essere nel futuro.",
      closed_on_date: "La casa è chiusa quel giorno.",
      invalid_slot: "Orario non disponibile per questa data.",
      service_mismatch: "Servizio incoerente con l'orario scelto.",
      rate_limited: "Troppi tentativi. Riprova più tardi.",
      send_failed: "Invio fallito. Riprova tra un momento.",
      generic: "Si è verificato un errore.",
      invalidSlot: "Scegli un orario valido.",
    },
  },
  devisForm: {
    you: "Tu",
    event: "Il tuo evento",
    nom: "Nome completo",
    email: "Email",
    telephone: "Telefono",
    maison: "Casa",
    typeEvenement: "Tipo di evento",
    types: {
      anniversaire: "Compleanno",
      mariage: "Matrimonio",
      seminaire: "Seminario",
      affaires: "Pranzo d'affari",
      famille: "Riunione di famiglia",
      autre: "Altro",
    },
    convives: "Numero di ospiti",
    date: "Data desiderata",
    precisions: "Dettagli",
    precisionsHint:
      "Desideri, vincoli, allergie, atmosfera desiderata…",
    precisionsPlaceholder: "Parlaci del tuo progetto",
    legalBefore: "Risposta personalizzata entro ",
    legalStrong: "48 ore",
    legalAfter: ". I tuoi dati servono solo a gestire la tua richiesta.",
    envoyer: "Invia la richiesta",
    envoiEnCours: "Invio in corso…",
    successEyebrow: "Grazie!",
    successTitre: "La tua richiesta ci è ben pervenuta.",
    successTexte:
      "Ti ricontattiamo entro 48 ore con una proposta su misura.",
    successCta: "Invia un'altra richiesta",
    errors: {
      invalid_data: "Dati non validi.",
      bad_json: "Corpo della richiesta non valido.",
      maison_unknown: "Casa sconosciuta.",
      send_failed: "Invio fallito. Riprova tra un momento.",
      generic: "Si è verificato un errore.",
    },
  },
  notFound: {
    eyebrow: "Errore 404",
    titre: "Questa pagina si è persa",
    titreItalic: "al sole.",
    sousTitre:
      "Il link che stai seguendo non esiste più o è stato spostato.",
    ctaAccueil: "Torna alla home",
    ctaMaisons: "Le nostre case",
  },
  errorPage: {
    eyebrow: "Si è verificato un errore",
    titre: "Perdonaci,",
    titreItalic: "un istante.",
    sousTitre:
      "Questa pagina non è stata caricata correttamente. Riprova o torna alla home.",
    ctaRetry: "Riprova",
    ctaAccueil: "Torna alla home",
  },
  loading: {
    unInstant: "Un istante…",
    chargement: "Caricamento in corso",
  },
  offline: {
    titre: "Sei offline",
    sousTitre:
      "Riconnettiti per prenotare, sfogliare il menù o contattarci.",
    cta: "Riprova",
  },
  pwa: {
    ariaInstall: "Installa l'app Maison Oléa",
    installerOlea: "Installa Oléa",
    androidTexte:
      "Aggiungi l'app alla schermata home per un accesso diretto.",
    androidCta: "Installa",
    iosBefore: "Tocca ",
    iosShare: "Condividi",
    iosAfter: " poi «Aggiungi a Home».",
    dismiss: "Non mostrare più",
  },
  languageSwitcher: {
    aria: "Scegli la lingua",
    label: "Lingua",
    changed: "Lingua: Italiano",
  },
  maisonMap: {
    eyebrow: "Mappa",
    titre: "Come arrivare",
    ouvrirGoogleMaps: "Apri in Google Maps",
    itineraireGoogleMaps: "Indicazioni Google Maps",
    ariaCarte: "Mappa di Maison Oléa {nom}",
  },
  emails: {
    reservation: {
      subject: "Il tuo tavolo da Maison Oléa · {date} {heure}",
      eyebrow: "Maison Oléa · {nom}",
      bonjour: "Buongiorno {nom},",
      corpus:
        "Abbiamo ricevuto la tua richiesta di prenotazione. Il nostro team ti ricontatterà entro poche ore per confermarla definitivamente.",
      labels: {
        maison: "Casa",
        date: "Data",
        heure: "Ora",
        convives: "Ospiti",
        precisions: "Le tue note",
      },
      pieceJointe:
        "Troverai allegato un file .ics da aggiungere al tuo calendario. Per qualsiasi modifica, chiamaci al {telephone}.",
      signature: "A presto,",
      signatureLigne2: "Il team Oléa",
      services: { dejeuner: "Pranzo", diner: "Cena" },
    },
  },
  ics: {
    summary: "Prenotazione Maison Oléa · {nom}",
    descriptionPersonnes: "Prenotazione per {n} ospiti.",
  },
  mentionsLegales: {
    metaTitle: "Note legali",
    metaDescription:
      "Note legali e informazioni GDPR del sito Maison Oléa: editore, host, proprietà intellettuale, protezione dei dati personali.",
    eyebrow: "Note legali",
    titre: "Informazioni",
    titreItalic: "legali.",
    sousTitre:
      "Ai sensi degli articoli 6-III e 19 della legge francese sulla fiducia nell'economia digitale.",
    derniereMaj: "Ultimo aggiornamento: maggio 2026",
    editeur: {
      titre: "Editore del sito",
      raisonSociale: "Denominazione: Maison Oléa",
      forme: "Forma giuridica: da completare",
      siege: "Sede legale: da completare",
      siret: "Codice SIRET: da completare",
      tva: "Partita IVA intra-UE: da completare",
      directeur: "Direttore della pubblicazione: da completare",
      contact: "Contatto: contact@olea-restaurant.fr",
    },
    hebergeur: {
      titre: "Host",
      nom: "Vercel Inc.",
      adresse: "440 N Barranca Ave #4133, Covina, CA 91723, Stati Uniti",
      site: "https://vercel.com",
    },
    pi: {
      titre: "Proprietà intellettuale",
      texte:
        "Tutti i contenuti presenti su questo sito (testi, fotografie, illustrazioni, marchi) sono protetti dal diritto d'autore e restano di proprietà esclusiva di Maison Oléa, salvo diversa indicazione. Ogni riproduzione senza consenso scritto preventivo è vietata.",
    },
    donnees: {
      titre: "Protezione dei dati personali",
      intro:
        "Ai sensi del Regolamento Generale sulla Protezione dei Dati (GDPR), hai il diritto di accesso, rettifica, cancellazione, limitazione e opposizione al trattamento dei tuoi dati personali.",
      collecte:
        "I dati raccolti tramite i moduli di prenotazione, preventivo e contatto sono utilizzati esclusivamente per gestire la tua richiesta e non vengono mai ceduti a terzi.",
      conservation:
        "Le richieste di prenotazione sono conservate per 12 mesi dopo la data del pasto. Le richieste di preventivo sono conservate per 24 mesi.",
      contact:
        "Per esercitare i tuoi diritti, scrivi a contact@olea-restaurant.fr.",
    },
    cookies: {
      titre: "Cookie",
      texte:
        "Questo sito non utilizza cookie di analisi né cookie pubblicitari. Un solo cookie tecnico (NEXT_LOCALE) memorizza la tua scelta di lingua per le visite future.",
    },
    droit: {
      titre: "Legge applicabile",
      texte:
        "Le presenti note legali sono regolate dalla legge francese. Qualsiasi controversia relativa alla loro interpretazione o esecuzione è di competenza dei tribunali francesi.",
    },
  },
} satisfies Dictionary;

export default it;

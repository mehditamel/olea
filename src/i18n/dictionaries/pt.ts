import type { Dictionary } from "../dictionaries";

const pt = {
  common: {
    skipLink: "Ir para o conteúdo",
    decouvrir: "Descobrir",
    reserver: "Reservar",
    retourAccueil: "Voltar à página inicial",
    fermer: "Fechar",
    appeler: "Ligar",
    ariaSiteName: "Maison Oléa",
    ouvertureProchaine: "Abertura próxima",
    bientot: "Em breve",
  },
  meta: {
    homeTitle:
      "Maison Oléa — Cozinha mediterrânica · Marselha, Cassis, Villeneuve-Loubet",
    homeDescription:
      "A Maison Oléa celebra o Mediterrâneo através de três casas: Marselha, Cassis e Villeneuve-Loubet. Uma cozinha sincera, produtos frescos e locais.",
    applicationName: "Maison Oléa",
    ogTitle: "Maison Oléa — Cozinha mediterrânica",
    ogDescription:
      "Três casas, um mesmo gesto: celebrar a luz do Sul com uma cozinha sincera e a partilha.",
    twitterTitle: "Maison Oléa",
    twitterDescription:
      "Cozinha mediterrânica na Provença e Costa Azul — Marselha · Cassis · Villeneuve-Loubet.",
    appleTitle: "Oléa",
    titleTemplate: "%s — Maison Oléa",
  },
  nav: {
    accueil: "Início",
    maisons: "Casas",
    nosMaisons: "As nossas casas",
    carte: "Menu",
    laCarte: "O menu",
    privatisation: "Privatização",
    contact: "Contacto",
    reserver: "Reservar",
  },
  header: {
    ariaLogo: "Maison Oléa — início",
    ariaNav: "Navegação principal",
    ariaPhone: "Ligar à Maison Oléa",
    ouvrirMenu: "Abrir o menu",
    reserverParTel: "Reservar por telefone",
    navMobile: "Navegação móvel",
  },
  footer: {
    tagline:
      "Uma cozinha mediterrânica autêntica na Provença e Costa Azul.",
    nosMaisons: "As nossas casas",
    laCarte: "O menu",
    privatisation: "Privatização",
    contact: "Contacto",
    mentionsLegales: "Avisos legais",
    decouvrir: "Descobrir",
    ouvertureProchaine: "Abertura próxima",
    bientot: "em breve",
    copyright: "Maison Oléa",
  },
  hero: {
    eyebrow: "Cozinha mediterrânica · Desde 2019",
    titre1: "O Mediterrâneo,",
    titre2Italic: "à sua mesa.",
    sousTitre:
      "Três casas, um mesmo gesto: celebrar a luz do Sul com uma cozinha sincera e a partilha.",
    ctaReserver: "Reservar mesa",
    ctaDecouvrir: "Descobrir as casas",
    villes: "Marselha · Cassis · Villeneuve-Loubet",
    scrollHint: "Deslocar",
  },
  pillars: {
    produits: {
      titre: "Produtos frescos e locais",
      texte: "O saber-fazer dos produtores regionais em cada prato.",
    },
    faitMaison: {
      titre: "Feito em casa",
      texte:
        "Pratos preparados no local, na tradição mediterrânica.",
    },
    partage: {
      titre: "Partilha e convívio",
      texte:
        "Uma mesa pensada para momentos partilhados, em família ou entre amigos.",
    },
  },
  esprit: {
    eyebrow: "O espírito Oléa",
    titre: "Uma cozinha nascida do",
    titreItalic: "sol",
    titreSuite: "e da terra.",
    p1: "Inspirado na palavra latina para oliveira, Oléa celebra a Provença através da sua gastronomia. Os nossos pratos valorizam produtos frescos e locais, destacando o saber-fazer dos produtores da região.",
    p2: "Tapenade, peixes grelhados, legumes do sol, azeite virgem extra AOP — cada prato conta a mesma história: a da partilha e da luz do Sul.",
    ctaCarte: "Descobrir o menu",
    caption: "Azeite virgem extra · Colheita 2025",
  },
  maisons: {
    eyebrow: "As nossas três casas",
    titre: "Da Provença à",
    titreItalic: "Costa Azul",
    ariaDecouvrir: "Descobrir Maison Oléa {nom}",
    altMaison: "Maison Oléa {nom}",
    reserver: "Reservar",
    bientot: "Em breve",
    decouvrir: "Descobrir",
  },
  privatReserv: {
    eyebrowPrivat: "Privatização & eventos",
    titrePrivat: "As suas celebrações,",
    titrePrivatItalic: "à nossa mesa.",
    pPrivat:
      "Aniversários, almoços de empresa, casamentos, seminários. As nossas três casas acolhem os seus eventos com menus à medida, num ambiente acolhedor inspirado no Sul.",
    ctaPrivat: "Pedir um orçamento",
    eyebrowReserver: "Reservar mesa",
    sousReserver: "Escolha a casa, a data e a hora em poucos cliques.",
    ctaReserver: "Reservar online",
    eyebrowPhone: "Ou por telefone",
    appeler: "Ligar",
  },
  privatisation: {
    metaTitle: "Privatização & eventos",
    metaDescription:
      "Privatize a Maison Oléa para aniversários, casamentos, seminários e almoços de empresa. Orçamentos à medida nas nossas três casas.",
    eyebrow: "Privatização",
    titre: "As suas celebrações,",
    titreItalic: "à nossa mesa.",
    sousTitre:
      "Aniversários, almoços de empresa, casamentos, seminários. As nossas três casas acolhem os seus eventos com menus à medida, num ambiente acolhedor inspirado no Sul.",
    formEyebrow: "Pedido de orçamento",
    formTitre: "Fale-nos do seu projeto.",
  },
  carte: {
    metaTitle: "Menu",
    metaDescription:
      "O menu da Maison Oléa: uma cozinha mediterrânica nascida do sol e da terra. Tapenade, peixes grelhados, legumes do sol. Detalhes em breve.",
    eyebrow: "O menu",
    titre: "Uma cozinha nascida do",
    titreItalic: "sol",
    titreSuite: "e da terra.",
    sousTitre:
      "O nosso menu completo será revelado aqui muito em breve. Entretanto, algumas sugestões do momento.",
    suggestionsEyebrow: "Algumas sugestões",
    saisons: "O menu evolui ao ritmo das estações e das chegadas.",
    ctaContact: "Contactar-nos",
    items: [
      {
        eyebrow: "Para começar",
        titre: "Tapenade & legumes crocantes",
        texte:
          "Azeitonas pretas de Nyons, anchovas, alcaparras, azeite AOP, crudités do mercado.",
      },
      {
        eyebrow: "Do sol",
        titre: "Peixe do dia grelhado",
        texte:
          "Conforme a pesca local, funcho assado, limão confitado, ervas da Provença.",
      },
      {
        eyebrow: "Prato emblemático",
        titre: "Robalo em crosta de sal",
        texte:
          "Apresentado na sala, acompanhado de emulsão de azeite e estragão.",
      },
      {
        eyebrow: "Para terminar",
        titre: "Tarte fina de mel & figos",
        texte:
          "Massa quebrada caseira, figos assados, mel de alfazema, gelado de azeite.",
      },
    ],
  },
  contact: {
    metaTitle: "Contacto",
    metaDescription:
      "Contacte a Maison Oléa em Marselha, Cassis ou Villeneuve-Loubet, ou escreva-nos para contact@olea-restaurant.fr.",
    eyebrow: "Contacto",
    titre: "Escreva-nos,",
    titreItalic: "venha visitar-nos.",
    question: "Uma questão geral?",
    ouvertureProchaine: "Abertura próxima",
    bientot: "em breve",
  },
  reserver: {
    metaTitle: "Reservar mesa",
    metaDescription:
      "Reserve a sua mesa numa das três casas Oléa — Marselha, Cassis, Villeneuve-Loubet. Confirmação rápida pela nossa equipa.",
    eyebrow: "Reservar",
    titre: "Uma mesa espera-o,",
    titreItalic: "na Oléa.",
    sousTitre:
      "Reserve a sua mesa numa das nossas três casas. A nossa equipa confirma a sua reserva no próprio dia.",
    formEyebrow: "A sua reserva",
    formTitre: "Escolha a casa, a data e a hora.",
    phoneEyebrow: "Prefere o telefone?",
  },
  maisonsIndex: {
    metaTitle: "As nossas três casas",
    metaDescription:
      "Maison Oléa em Marselha, Cassis e Villeneuve-Loubet: três moradas mediterrânicas, uma mesma cozinha sincera inspirada no Sul.",
    eyebrow: "As nossas três casas",
    titre: "Da Provença à",
    titreItalic: "Costa Azul",
    sousTitre:
      "Três moradas, um mesmo gosto pela luz do Sul e pela partilha.",
  },
  maisonPage: {
    accueil: "Início",
    maisons: "Casas",
    metaTitleSuffix: "— Restaurante mediterrânico",
  },
  maisonHero: {
    ariaSection: "Maison Oléa {nom}",
    itineraire: "Como chegar",
  },
  maisonGallery: {
    ambiance: "Ambiente",
    altPhoto: "Maison Oléa {nom} — ambiente {n}",
    altPhotoLightbox: "Maison Oléa {nom} — foto {n}",
    ariaAgrandir: "Ampliar foto {n} de {total}",
    galerieSrTitle: "Galeria Maison Oléa {nom} — foto {n} de {total}",
    photoPrecedente: "Foto anterior",
    photoSuivante: "Foto seguinte",
    fermerLightbox: "Fechar",
  },
  maisonInstagram: {
    suiveznous: "Siga-nos no Instagram",
    bientotEntete: "Em breve no Instagram",
    suivreEntete: "Siga Maison Oléa {nom}",
    bientotItalic: "A nossa conta de Instagram abrirá com a casa.",
    actifItalic:
      "Bastidores, pratos do dia, instantes de serviço — a casa conta-se todos os dias.",
    ariaOuvrir: "Abrir Instagram @{handle} num novo separador",
    bientotChip: "@{handle} · em breve",
    aperçuAlt: "Instagram Maison Oléa {nom} — pré-visualização {n}",
    ariaVoirTout: "Ver todas as publicações de @{handle} no Instagram",
    voirPlus: "Ver mais no Instagram",
  },
  maisonInfos: {
    nousTrouver: "Encontre-nos",
    horaires: "Horários",
    dejeuner: "Almoço",
    diner: "Jantar",
    jour: "Dia",
    telephone: "Telefone",
    horairesAOuverture: "Horários comunicados na abertura.",
    ferme: "Fechado",
    instagramAria: "Instagram @{handle}",
  },
  maisonReservation: {
    fermeeEyebrow: "Em breve",
    fermeeTitre: "Esta casa abrirá as suas portas muito em breve.",
    fermeeCta: "Manter-me informado",
    ouverteEyebrow: "Reservar em {nom}",
    ouverteTitre: "Uma mesa espera-o.",
    ouverteItalic:
      "A nossa equipa responde de terça a domingo, desde a abertura do serviço.",
    ouverteCta: "Reservar online",
  },
  maisonStatus: {
    fermeAHeure: "Fecha às {heure}",
    ouvertFerme: "Aberto · fecha às {heure}",
    ferme: "Fechado",
    fermeDemain: "Fechado · amanhã às {heure}",
    fermeLeJour: "Fechado · {jour} às {heure}",
  },
  breadcrumbs: { aria: "Migalhas de pão" },
  cta: {
    reserver: "Reservar",
    itineraire: "Como chegar",
    devis: "Orçamento",
    ariaActions: "Ações rápidas",
  },
  reservationForm: {
    etapeTable: "A sua mesa",
    etapeCoordonnees: "Os seus dados",
    progression: "Progresso do formulário",
    maison: "Casa",
    date: "Data",
    convives: "Número de convidados",
    personne: "pessoa",
    personnes: "pessoas",
    heure: "Hora",
    choisirDate: "Escolha primeiro uma data",
    fermeCeJour: "Fechado nesse dia — escolha outra data",
    occasion: "Ocasião (opcional)",
    occasions: {
      aucune: "Nenhuma em particular",
      anniversaire: "Aniversário",
      romantique: "Jantar romântico",
      famille: "Almoço de família",
      professionnel: "Almoço profissional",
      autre: "Outra",
    },
    privatisationTitre:
      "Para {n} convidados, considere uma privatização.",
    privatisationTexte:
      "Acima de 10 convidados, propomos-lhe um menu à medida e a sala privatizada.",
    privatisationCta: "Pedir orçamento de privatização",
    nom: "Nome completo",
    email: "Email",
    telephone: "Telefone",
    telephoneHint: "Formato francês — ex. 06 25 15 13 33",
    demandes: "Pedidos especiais (opcional)",
    demandesHint:
      "Alergias, intolerâncias, cadeira de rodas, mesa tranquila, carrinho…",
    rgpd:
      "Aceito que os meus dados sejam usados pela Maison Oléa para tratar este pedido de reserva. Nenhuma comunicação de marketing sem consentimento explícito.",
    continuer: "Continuar",
    privatisationLink: "Mais de 10 convidados? Orçamento de privatização",
    retour: "← Voltar",
    envoyer: "Pedir reserva",
    envoiEnCours: "A enviar…",
    services: { dejeuner: "Almoço", diner: "Jantar" },
    successEyebrow: "Pedido enviado",
    successTitre: "Confirmaremos a sua mesa muito em breve.",
    successTexte:
      "Acaba de receber um email de resumo (com convite de calendário). A nossa equipa contacta-o dentro de algumas horas para confirmar.",
    successCta: "Nova reserva",
    errors: {
      invalid_data: "Dados inválidos.",
      bad_json: "Corpo de pedido inválido.",
      maison_unknown: "Casa desconhecida.",
      maison_closed_online:
        "Esta casa ainda não aceita reservas online.",
      past_date: "A data deve ser futura.",
      closed_on_date: "A casa está fechada nesse dia.",
      invalid_slot: "Horário indisponível nesta data.",
      service_mismatch: "Serviço incoerente com o horário escolhido.",
      rate_limited: "Demasiadas tentativas. Tente mais tarde.",
      send_failed: "Falha ao enviar. Tente novamente daqui a pouco.",
      generic: "Ocorreu um erro.",
      invalidSlot: "Escolha um horário válido.",
    },
  },
  devisForm: {
    you: "Você",
    event: "O seu evento",
    nom: "Nome completo",
    email: "Email",
    telephone: "Telefone",
    maison: "Casa",
    typeEvenement: "Tipo de evento",
    types: {
      anniversaire: "Aniversário",
      mariage: "Casamento",
      seminaire: "Seminário",
      affaires: "Almoço de empresa",
      famille: "Reunião de família",
      autre: "Outro",
    },
    convives: "Número de convidados",
    date: "Data desejada",
    precisions: "Detalhes",
    precisionsHint:
      "Vontades, restrições, alergias, ambiente desejado…",
    precisionsPlaceholder: "Fale-nos do seu projeto",
    legalBefore: "Resposta personalizada em ",
    legalStrong: "48 horas",
    legalAfter: ". Os seus dados servem apenas para tratar o seu pedido.",
    envoyer: "Enviar pedido",
    envoiEnCours: "A enviar…",
    successEyebrow: "Obrigado!",
    successTitre: "O seu pedido chegou-nos.",
    successTexte:
      "Voltamos a contactá-lo em 48 horas com uma proposta à medida.",
    successCta: "Enviar outro pedido",
    errors: {
      invalid_data: "Dados inválidos.",
      bad_json: "Corpo de pedido inválido.",
      maison_unknown: "Casa desconhecida.",
      send_failed: "Falha ao enviar. Tente novamente daqui a pouco.",
      generic: "Ocorreu um erro.",
    },
  },
  notFound: {
    eyebrow: "Erro 404",
    titre: "Esta página perdeu-se",
    titreItalic: "ao sol.",
    sousTitre:
      "A ligação que segue já não existe ou foi movida.",
    ctaAccueil: "Voltar ao início",
    ctaMaisons: "As nossas casas",
  },
  errorPage: {
    eyebrow: "Ocorreu um erro",
    titre: "Desculpe,",
    titreItalic: "um instante.",
    sousTitre:
      "Esta página não pôde ser apresentada corretamente. Tente novamente ou volte ao início.",
    ctaRetry: "Tentar novamente",
    ctaAccueil: "Voltar ao início",
  },
  loading: {
    unInstant: "Um momento…",
    chargement: "A carregar",
  },
  offline: {
    titre: "Está sem ligação",
    sousTitre:
      "Volte a ligar-se para reservar, consultar o menu ou contactar-nos.",
    cta: "Tentar novamente",
  },
  pwa: {
    ariaInstall: "Instalar a app Maison Oléa",
    installerOlea: "Instalar Oléa",
    androidTexte:
      "Adicione a app ao ecrã principal para acesso direto.",
    androidCta: "Instalar",
    iosBefore: "Toque em ",
    iosShare: "Partilhar",
    iosAfter: " e em «Adicionar ao ecrã principal».",
    dismiss: "Não voltar a mostrar",
  },
  languageSwitcher: {
    aria: "Escolher idioma",
    label: "Idioma",
  },
} satisfies Dictionary;

export default pt;

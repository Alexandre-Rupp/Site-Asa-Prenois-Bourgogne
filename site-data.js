// Central content registry (text, menus, meetings, links) used by the SPA.
export const TARGET_YEAR = "2026";

export const NAV_ITEMS = [
  { key: "accueil", label: "ACCUEIL", href: "#/accueil" },
  { key: "meetings", label: "CALENDRIER", href: "#/meetings" },
  { key: "inscriptions", label: "INSCRIPTIONS", href: "#/inscriptions" },
  { key: "actualites", label: "ACTUALIT\u00C9S", href: "#/actualites" },
  { key: "commissaires", label: "DEVENIR COMMISSAIRE", href: "#/commissaires" },
  { key: "vie-asa", label: "LA VIE DE L'ASA", href: "#/vie-asa" },
  { key: "contact", label: "CONTACTS", href: "#/contact" },
];

export const MEETINGS = [
  {
    id: "r1",
    name: "FUN RACING CAR",
    date: "10-11-12 avril 2026",
    seasonLabel: "Meetings Circuit 2026",
    kind: "circuit",
    location: "Circuit Dijon-Prenois",
  },
  {
    id: "r2",
    name: "CATERHAM",
    date: "17-18-19 avril 2026",
    seasonLabel: "Meetings Circuit 2026",
    kind: "circuit",
    location: "Circuit Dijon-Prenois",
  },
  {
    id: "r3",
    name: "HISTORIC TOUR",
    date: "24-25-26 avril 2026",
    seasonLabel: "Meetings Circuit 2026",
    kind: "circuit",
    location: "Circuit Dijon-Prenois",
  },
  {
    id: "r4",
    name: "CHAMPIONNAT DE FRANCE GT",
    date: "14-15-16-17 mai 2026",
    seasonLabel: "Meetings Circuit 2026",
    kind: "circuit",
    location: "Circuit Dijon-Prenois",
  },
  {
    id: "r5",
    name: "PORSCHE SPRINT CHALLENGE FRANCE",
    date: "29-30 mai 2026",
    seasonLabel: "Meetings Circuit 2026",
    kind: "circuit",
    location: "Circuit Dijon-Prenois",
  },
  {
    id: "r6",
    name: "GRAND PRIX DE L'AGE D'OR",
    date: "5-6-7-8 juin 2026",
    seasonLabel: "Meetings Circuit 2026",
    kind: "circuit",
    location: "Circuit Dijon-Prenois",
  },
  {
    id: "r7",
    name: "TROPHEE TOURISME ENDURANCE",
    date: "26-27-28 juin 2026",
    seasonLabel: "Meetings Circuit 2026",
    kind: "circuit",
    location: "Circuit Dijon-Prenois",
  },
  {
    id: "r8",
    name: "DIJON MOTORS CUP",
    date: "10-11-12-13 septembre 2026",
    seasonLabel: "Meetings Circuit 2026",
    kind: "circuit",
    location: "Circuit Dijon-Prenois",
  },
  {
    id: "r9",
    name: "LAMERA CUP",
    date: "16-17-18 octobre 2026",
    seasonLabel: "Meetings Circuit 2026",
    kind: "circuit",
    location: "Circuit Dijon-Prenois",
  },
  {
    id: "r10",
    name: "COUPE DE FRANCE DES CIRCUITS",
    date: "23-24-25 octobre 2026",
    seasonLabel: "Meetings Circuit 2026",
    kind: "circuit",
    location: "Circuit Dijon-Prenois",
  },
  {
    id: "r11",
    name: "2EME RALLYE NATIONAL DE BLIGNY SUR OUCHE",
    date: "08-09 mai 2026",
    seasonLabel: "Meetings Rallye 2026",
    kind: "rallye",
    location: "Bligny-sur-Ouche",
  },
  {
    id: "r12",
    name: "64EME COURSE DE COTE D'URCY",
    date: "25-26 juillet 2026",
    seasonLabel: "Meetings Course de c\u00F4te 2026",
    kind: "course-de-cote",
    location: "Urcy",
  },
  {
    id: "r13",
    name: "24EME RALLYE REGIONAL DE L'AUXOIS",
    date: "19 septembre 2026",
    seasonLabel: "Meetings Rallye 2026",
    kind: "rallye",
    location: "Auxois",
  },
  {
    id: "r15",
    name: "REVES D'ENFANTS MALADES",
    date: "10 octobre 2026",
    seasonLabel: "Evenement solidaire 2026",
    kind: "circuit",
    location: "Circuit Dijon-Prenois",
    cardTone: "red",
    generalCalendarOnly: true,
    detailParagraphs: [
      "Le Lions Club Dijon Doyen organise la 15eme edition de la Journee Reves d'Enfants Malades, en partenariat avec le Club Ferrari France sur le Circuit Dijon-Prenois le samedi 10 octobre 2026.",
      "De 9h30 a 12h et de 13h30 a 17h, vous pourrez faire des baptemes de piste dans des vehicules de prestige. Restauration sur place possible.",
      "Apres 17h, a l'issue des baptemes, assistez a la parade des vehicules d'exposition et ceux de nos differents intervenants. Nous vous attendons nombreux !",
      "BAPTEME DE PISTE ADULTE/ENFANT : 70 EUR",
      "Ouverture au public des 9h.",
    ],
  },
  {
    id: "r14",
    name: "TOUR DE BOURGOGNE CLASSIC",
    date: "23-24-25 octobre 2026",
    seasonLabel: "Meetings Rallye 2026",
    kind: "rallye",
    location: "Bourgogne",
  },
];

export const MEETING_DETAIL_SECTIONS = [
  {
    key: "roadbooks",
    title: "Roadbooks",
    description:
      "Ajoutez ici les roadbooks PDF, liens externes ou versions archivees.",
  },
  {
    key: "horaires",
    title: "Horaires",
    description:
      "Section prevue pour les horaires officiels, timing versions et mises a jour.",
  },
  {
    key: "organisation",
    title: "Documents d'organisation",
    description:
      "Espace pour reglements, notes direction de course et documents utiles.",
  },
  {
    key: "annexes",
    title: "Autres documents",
    description:
      "Zone libre pour tout autre contenu d\u00E9taill\u00E9 du meeting (briefings, plans, etc.).",
  },
];

export const PILOT_MEETING_DOCUMENTATION = {
  rallye: {
    commonDocuments: [
      "Horaires-Timing",
      "Invitation commissaires",
      "Parcours general",
      "Parcours ES",
      "Roadbook",
      "Reconnaissances",
      "Fiches speaker",
      "Demande accreditation presse",
    ],
    vehicleDocuments: {
      modernes: {
        documents: [
          "Reglement particulier",
          "Bulletin d'engagement",
          "Fiche renseignements des \u00E9quipements de s\u00E9curit\u00E9 - Pilote",
          "Fiche renseignements des \u00E9quipements de s\u00E9curit\u00E9 - Copilote",
          "Tableau des \u00E9quipements de s\u00E9curit\u00E9 generaux",
          "Liste provisoire des engages",
        ],
      },
      vhc: {
        documents: [
          "Reglement particulier",
          "Bulletin d'engagement",
          "Fiche renseignements des \u00E9quipements de s\u00E9curit\u00E9 - Pilote",
          "Fiche renseignements des \u00E9quipements de s\u00E9curit\u00E9 - Copilote",
          "Tableau des \u00E9quipements de s\u00E9curit\u00E9 generaux",
          "Liste provisoire des engages",
        ],
      },
      vhrs: {
        documents: [
          "Reglement particulier",
          "Bulletin d'engagement",
          "EP. Generique (\u00E9quipements de s\u00E9curit\u00E9)",
          "Liste provisoire des engages",
        ],
      },
      vmrs: {
        documents: [
          "Reglement particulier",
          "Bulletin d'engagement",
          "EP. Generique (\u00E9quipements de s\u00E9curit\u00E9)",
          "Liste provisoire des engages",
        ],
      },
    },
  },
  "course-de-cote": {
    commonDocuments: ["Parcours", "Roadbook", "Infos organisationnelles"],
    vehicleDocuments: {
      modernes: {
        documents: [
          "Reglement particulier",
          "Bulletin d'engagement",
          "Fiche renseignements des \u00E9quipements de s\u00E9curit\u00E9 - Pilote",
          "Tableau des \u00E9quipements de s\u00E9curit\u00E9 generaux",
          "Liste provisoire des engages",
        ],
        observations: ["Horaire de convocation", "Billetterie"],
      },
      vhc: {
        documents: [
          "Reglement particulier",
          "Bulletin d'engagement",
          "Fiche renseignements des \u00E9quipements de s\u00E9curit\u00E9 - Pilote",
          "Tableau des \u00E9quipements de s\u00E9curit\u00E9 generaux",
          "Liste provisoire des engages",
        ],
        observations: ["Horaire de convocation", "Billetterie"],
      },
      vhrs: {
        documents: [
          "Reglement particulier",
          "Bulletin d'engagement",
          "EP. Generique (\u00E9quipements de s\u00E9curit\u00E9)",
          "Liste provisoire des engages",
        ],
        observations: ["Horaire de convocation", "Billetterie"],
      },
      vmrs: {
        documents: [
          "Reglement particulier",
          "Bulletin d'engagement",
          "EP. Generique (\u00E9quipements de s\u00E9curit\u00E9)",
          "Liste provisoire des engages",
        ],
        observations: ["Horaire de convocation", "Billetterie"],
      },
    },
  },
};

export const PILOT_MEETING_DOCUMENTATION_BY_MEETING = {
  r10: {
    commonDocuments: ["VISA", "Horaires", "Informations generales"],
    pilotDocuments: [
      "Feuilles d'engagement",
      "Assurances",
      "Feuilles techniques",
      "Book info",
      "Listes engages",
      "Suivis resultats",
    ],
  },
};

export const PROFILE_CONTENT = {
  commissaire: {
    key: "commissaire",
    label: "Commissaire",
    seasonPill: "Saison 2026",
    heroTitle: "Plateforme des commissaires de piste",
    heroSubtitle:
      "Calendrier des inscriptions et formulaires dedies aux commissaires.",
    ctaPrimaryLabel: "Acceder aux formulaires commissaires",
    ctaSecondaryLabel: "Voir le calendrier",
    targetMembers: 200,
    forms: {
      memberForm:
        "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAAj12wxUMkFaVUkzNlEzTzdTRVVXMVJVS0NBNEFOVy4u",
      raceForm: "https://forms.office.com/r/5s11Uy4fWP",
      closedRaceFormsByMeeting: ["r4", "r13", "r14"],
      raceFormsByMeeting: {
        r2: "https://forms.office.com/r/FKJZCT2p8K",
        r3: "https://forms.office.com/r/ncBaNgw8T4",
        r5: "https://forms.office.com/r/8DFcU05LJN",
        r6: "https://forms.office.com/r/acKvMAf6Hk",
        r7: "https://forms.office.com/r/6PRUYFZ5Lu",
        r8: "https://forms.office.com/r/Qq9W4kr0PV",
        r9: "https://forms.office.com/r/ePS24dmxd9",
        r10: "https://forms.office.com/r/HjFjsWSJZn",
        r12: "https://forms.office.com/r/SPSGZyNuPY",
      },
    },
    sections: {
      calendarTitle: "Calendrier des inscriptions commissaires",
      newsTitle: "Actualit\u00E9s association",
      resultsTitle: "Resultats",
      profileSpaceTitle: "Espace commissaire",
      memberFormTitle: "Formulaire inscription membre",
      memberFormText:
        "Nouveau commissaire: remplissez ce formulaire pour creer votre dossier (coordonn\u00E9es, licence, disponibilites).",
      raceFormTitle: "Formulaire inscription course",
      raceFormText:
        "Inscription par meeting: envoyez une reponse pour chaque course souhaitee.",
    },
    newsFeed: [
      {
        title: "Formation Commissaire",
        date: "18 mars 2026",
        text:
          "Une journee benefique pour tous et bien chargee, un nombre de benevoles present exceptionnel sous un magnifique soleil. Une equipe de formateur tres professionnel, qui a su faire passer avec un langage simple les messages essentiels. Tout le monde est ravi, le debut de saison a bien demarre dans une superbe ambiance. Tout le monde est ravi, le debut de saison a bien demarre dans une superbe ambiance.",
        collapsibleText: true,
        images: [
          {
            src: "assets/news/formation-commissaire/formation-commissaire-01.webp",
            alt: "Formation commissaire - exercice drapeaux en virage",
          },
          {
            src: "assets/news/formation-commissaire/formation-commissaire-02.webp",
            alt: "Formation commissaire - briefing de groupe",
          },
          {
            src: "assets/news/formation-commissaire/formation-commissaire-03.webp",
            alt: "Formation commissaire - photo de binome",
          },
          {
            src: "assets/news/formation-commissaire/formation-commissaire-04.webp",
            alt: "Formation commissaire - demonstration en piste",
          },
          {
            src: "assets/news/formation-commissaire/formation-commissaire-05.webp",
            alt: "Formation commissaire - echanges en bord de piste",
          },
          {
            src: "assets/news/formation-commissaire/formation-commissaire-06.webp",
            alt: "Formation commissaire - atelier drapeaux",
          },
          {
            src: "assets/news/formation-commissaire/formation-commissaire-07.webp",
            alt: "Formation commissaire - poste T6",
          },
        ],
      },
      {
        title: "Ouverture des inscriptions saison 2026",
        date: "15 f\u00E9vrier 2026",
        text: "Les inscriptions sont maintenant centralisees via Microsoft Forms.",
      },
    ],
    resultsFeed: [
      {
        title: "Meeting test pre-saison",
        date: "31 janvier 2026",
        text: "42 officiels mobilises, 100% des postes couverts sur 2 jours.",
      },
      {
        title: "Challenge club - manche 1",
        date: "8 f\u00E9vrier 2026",
        text: "Interventions piste: 6, incidents majeurs: 0, coordination operationnelle.",
      },
      {
        title: "Sprint regional",
        date: "14 f\u00E9vrier 2026",
        text: "Debrief positif de la direction de course sur la rapidite des interventions.",
      },
    ],
  },
  pilote: {
    key: "pilote",
    label: "Pilote",
    seasonPill: "Saison 2026",
    heroTitle: "Plateforme des pilotes",
    heroSubtitle:
      "Calendrier des meetings et liens d'inscription adaptes au parcours pilote.",
    ctaPrimaryLabel: "Acceder aux formulaires pilotes",
    ctaSecondaryLabel: "Voir le calendrier",
    targetMembers: 120,
    forms: {
      memberForm: "https://forms.office.com/r/PILOTE-MEMBRE-2026",
      raceForm: "https://forms.office.com/r/PILOTE-COURSE-2026",
      signupClosedAll: true,
    },
    sections: {
      calendarTitle: "Calendrier des inscriptions pilotes",
      newsTitle: "Actualit\u00E9s pilotes",
      resultsTitle: "Infos meeting",
      profileSpaceTitle: "Espace pilote",
      memberFormTitle: "Formulaire profil pilote",
      memberFormText:
        "Creation ou mise a jour de votre profil pilote (licence, vehicule, categorie, contact).",
      raceFormTitle: "Formulaire engagement meeting",
      raceFormText:
        "Un formulaire par meeting pour declarer votre participation et vos besoins logistiques.",
    },
    newsFeed: [
      {
        title: "Briefing pilotes saison 2026",
        date: "10 mars 2026",
        text: "Mise a jour des procedures de verification administrative et technique.",
      },
      {
        title: "Controle \u00E9quipements",
        date: "6 avril 2026",
        text: "Rappel des obligations casque/HANS et conformit\u00E9 \u00E9quipement pilote.",
      },
      {
        title: "Ouverture engagement sprint",
        date: "20 avril 2026",
        text: "Le parcours pilote est disponible pour les premiers meetings de la saison.",
      },
    ],
    resultsFeed: [
      {
        title: "Documents administratifs",
        date: "En continu",
        text: "Les pieces justificatives seront centralisees dans les fiches detail meeting.",
      },
      {
        title: "Acces paddock",
        date: "En continu",
        text: "Chaque meeting d\u00E9taill\u00E9 precisera les horaires d'accueil et contraintes d'acces.",
      },
      {
        title: "Support inscription",
        date: "En continu",
        text: "Un contact d'assistance sera ajoute dans la page detail de chaque meeting.",
      },
    ],
  },
};

export const PAGE_SKELETONS = {
  commissaires: {
    title: "Commissaires",
    intro:
      "Page reservee au contenu institutionnel commissaires (formation, recrutement, referents).",
    commissionerTitle: "Devenez commissaire de piste",
    commissionerTrainingLink: "https://entrezdanslacourse.ffsa.org/",
    commissionerTrainingLabel: "Se former et debuter",
    commissionerTrainingGalleryTitle: "Photos formation incendie",
    commissionerTrainingImages: [
      {
        src: "assets/news/formation-commissaire/formation-commissaire-01.webp",
        alt: "Formation incendie - atelier 1",
      },
      {
        src: "assets/news/formation-commissaire/formation-commissaire-02.webp",
        alt: "Formation incendie - atelier 2",
      },
      {
        src: "assets/news/formation-commissaire/formation-commissaire-03.webp",
        alt: "Formation incendie - atelier 3",
      },
      {
        src: "assets/news/formation-commissaire/formation-commissaire-04.webp",
        alt: "Formation incendie - atelier 4",
      },
      {
        src: "assets/news/formation-commissaire/formation-commissaire-05.webp",
        alt: "Formation incendie - atelier 5",
      },
      {
        src: "assets/news/formation-commissaire/formation-commissaire-06.webp",
        alt: "Formation incendie - atelier 6",
      },
      {
        src: "assets/news/formation-commissaire/formation-commissaire-07.webp",
        alt: "Formation incendie - atelier 7",
      },
    ],
    commissionerParagraphs: [
      "Devenir commissaire, ce n'est pas etre spectateur privilegie, c'est etre un acteur indispensable a la s\u00E9curit\u00E9 du sport automobile.",
      "Appele a officier sur l'ensemble des epreuves qui sont : Circuits, Rallyes, Course de C\u00F4tes, Rallye-cross, Auto-Cross, Tout-Terrain, Slaloms, Runs, Karting...",
      "En totale collaboration avec la Direction de Course, chacun doit tenir un role important :",
      "- Le commissaire de piste est les yeux supplementaires de la Direction de Course et il est necessaire au bon deroulement de chaque meeting.",
      "- Le commissaire sportif est celui qui contr\u00F4le et fait appliquer le reglement des epreuves.",
      "- Le chronometreur est celui qui gere le timing de chaque coureur, indispensable a la competition pour les classements.",
      "- Le directeur de course est le chef d'orchestre de l'evenement, celui qui donne les consignes, les procedures et veille sur chacun des roles attribues.",
      "Une grande equipe de benevoles, animes par la passion du sport automobile, engages dans une mission commune : assurer la s\u00E9curit\u00E9 de chacun.",
      "Sans l'un de ces acteurs, aucune competition ne peut avoir lieu.",
      "Le commissaire de piste, par tous les temps, assure la s\u00E9curit\u00E9 de l'epreuve dont les missions sont :",
      "- Surveiller",
      "- Signaler",
      "- Transmettre",
      "- Intervenir",
      "Ce sont tous des benevoles au service du Sport Automobile.",
      "Donc si tu es passionne, que tu as un esprit d'engagement et d'equipe, rejoins-nous dans la grande famille du sport automobile de l'Association Sport Automobile Prenois Bourgogne.",
    ],
  },
  pilotes: {
    title: "Pilotes",
    intro:
      "Page reservee au contenu institutionnel pilotes (r\u00E8gles, accompagnement, documentation).",
  },
  "vie-asa": {
    title: "La vie de l'ASA",
    intro:
      "Page prevue pour les actualites du club, evenements internes et actions de l'association.",
    historyTitle: "Histoire de l'ASA Prenois Bourgogne (ex ASAC Bourgogne)",
    historyParagraphs: [
      "L'ASA Prenois Bourgogne est une association sportive automobile, organisatrice de meetings en collaboration avec le circuit de Dijon-Prenois ainsi que des Courses de Cote et des Rallyes.",
      "L'ASA Prenois Bourgogne regroupe au sein de ses adherent(e)s, des commissaires de piste, des chefs de poste, des directeurs de course, des chronometreurs, des pilotes, et tous les passionne(e)s qui gravitent autour de la competition automobile moderne ou ancienne. Elle est reconnue par tous pour les competences de ses commissaires formateurs sur le circuit de Dijon Prenois.",
      "L'ASA Prenois Bourgogne est nee de la fusion absorption des 4 ASA de C\u00F4te d'Or, ASAC Bourgogne, Asa Prenois, Asa Beaune et ASA C\u00F4te d'Or.",
      "L'ASAC Bourgogne avait ete creee le 22 d\u00E9cembre 1952, parue dans le Journal Officiel le 01 janvier 1953, et la fondatrice de la legendaire Course de C\u00F4te d'Urcy.",
    ],
  },
  partenaires: {
    title: "Nos partenaires",
    intro:
      "Retrouvez les partenaires institutionnels et priv\u00E9s qui soutiennent l'Asa Prenois-Bourgogne.",
    annualPartnersTitle: "Nos partenaires de l'Asa Prenois-Bourgogne",
    annualPartners: [
      {
        name: "FIA",
        short: "FIA",
        logo: "assets/partners/fia.webp",
        url: "https://www.fia.com/",
      },
      {
        name: "FFSA",
        short: "FFSA",
        logo: "assets/partners/ffsa.svg",
        url: "https://www.ffsa.org/",
      },
      {
        name: "Ligue du Sport Automobile Bourgogne Franche-Comt\u00E9",
        short: "Ligue BFC",
        logo: "assets/partners/lsabfc.webp",
        url: "https://www.lsabfc.org/accueil/accueil.html",
      },
      {
        name: "Circuit Dijon Prenois",
        short: "Circuit Dijon Prenois",
        logo: "assets/partners/dijon-prenois.webp",
        url: "https://www.circuit-dijon-prenois.com/",
      },
      {
        name: "C\u00D4TE D'OR Le D\u00E9partement",
        short: "C\u00D4TE D'OR",
        logo: "assets/partners/cotedor.svg",
        url: "https://www.cotedor.fr/",
      },
      {
        name: "Plan\u00E8te Communication",
        short: "Plan\u00E8te Communication",
        logo: "assets/partners/planete-communication.webp",
      },
    ],
    urcyPartnersTitle: "Nos partenaires - Course de C\u00F4te Urcy 2025",
    urcyPartners: [
      {
        name: "FFSA Montagne",
        short: "FFSA Montagne",
        logo: "assets/partners/ffsa.svg",
        url: "https://www.ffsa.org/",
      },
      {
        name: "Ligue du Sport Automobile Bourgogne Franche-Comt\u00E9",
        short: "Ligue BFC",
        logo: "assets/partners/lsabfc.webp",
        url: "https://www.lsabfc.org/accueil/accueil.html",
      },
      {
        name: "Fromagerie Delin",
        short: "Delin",
        logo: "assets/partners/delin.webp",
      },
      {
        name: "Passion Moto S\u00E9curit\u00E9",
        short: "PMS",
        logo: "assets/partners/passion-moto-securite.webp",
      },
      {
        name: "Ets Bailly et Mr.Bricolage",
        short: "Mr.Bricolage",
        logo: "assets/partners/mr-bricolage.svg",
      },
      { name: "Gautier", short: "Gautier", logo: "assets/partners/gautier.svg" },
      { name: "Vitco", short: "Vitco", logo: "assets/partners/vitco.webp" },
      {
        name: "Plan\u00E8te Communication Dijon",
        short: "Plan\u00E8te Com",
        logo: "assets/partners/planete-communication.webp",
      },
      {
        name: "Bymycar",
        short: "Bymycar",
        logo: "assets/partners/bymycar.webp",
        url: "https://www.bymycar.fr/",
      },
      {
        name: "Circuit Dijon-Prenois",
        short: "Dijon-Prenois",
        logo: "assets/partners/dijon-prenois.webp",
        url: "https://www.circuit-dijon-prenois.com/",
      },
      {
        name: "C\u00F4te d'Or Le D\u00E9partement",
        short: "C\u00F4te d'Or",
        logo: "assets/partners/cotedor.svg",
        url: "https://www.cotedor.fr/",
      },
    ],
  },
  contact: {
    title: "Contacts",
    intro:
      "Page pr\u00E9vue pour les points de contact officiels de l'ASA Prenois Bourgogne.",
  },
  "mentions-legales": {
    title: "Mentions l\u00E9gales",
    intro:
      "Page d\u00E9di\u00E9e aux informations l\u00E9gales de l'association et du site.",
  },
  "politique-confidentialite": {
    title: "Politique de confidentialit\u00E9",
    intro:
      "Page d\u00E9di\u00E9e aux r\u00E8gles de collecte, d'usage et de protection des donn\u00E9es personnelles.",
  },
  "politique-cookies": {
    title: "Politique de cookies du site",
    intro:
      "Page d\u00E9di\u00E9e \u00E0 l'utilisation des cookies et traceurs sur le site.",
  },
};

export const CONTACT_PAGE_CONTENT = {
  officeHoursTitle: "Horaires Bureau, ouverture public, licenci\u00E9s",
  officeHours: [
    { day: "Lundi", hours: "14h-17h" },
    { day: "Mardi", hours: "14h-17h" },
    { day: "Mercredi", hours: "14h-17h" },
    { day: "Jeudi", hours: "9h00-12h00, 14h00-17h00" },
    { day: "Vendredi", hours: "Ferm\u00E9 au public" },
  ],
  contactTitle: "Demande de renseignements divers",
  email: "contact@asa-prenois-bourgone.org",
};

export const LEGAL_PAGE_CONTENT = {
  "mentions-legales": {
    updatedAt: "Derni\u00E8re mise \u00E0 jour: 15 mars 2026",
    sections: [
      {
        title: "Objet du site",
        paragraphs: [
          "Le site presente les activites de l'association, les informations de meetings et les liens d'inscription des commissaires et pilotes.",
          "Le contenu publie est informatif et peut etre mis a jour en fonction des contraintes sportives, organisationnelles et reglementaires.",
        ],
      },
      {
        title: "Editeur du service de communication au public en ligne",
        paragraphs: [
          "Association Sportive Automobile Club Bourgogne (ASA Prenois Bourgogne).",
          "Siege: Circuit Dijon-Prenois, 21370 Prenois, France.",
          "Contact: contact@asa-prenois-bourgone.org",
          "Ces informations sont publiees conformement aux obligations d'identification de l'editeur prevues par l'article 1-1 de la loi ndeg 2004-575 du 21 juin 2004 (LCEN), version en vigueur depuis le 23 mai 2024.",
        ],
      },
      {
        title: "Direction de la publication",
        paragraphs: [
          "Directeur de la publication: le bureau de l'association ASA Prenois Bourgogne.",
          "Responsable de la redaction: a completer si des fonctions editoriales distinctes sont designees.",
          "Droit de reponse: toute personne nommee ou designee peut exercer son droit de reponse selon les modalites prevues par l'article 1-1 de la LCEN.",
        ],
      },
      {
        title: "Hebergement",
        paragraphs: [
          "Environnement actuel: version de travail et de test.",
          "Avant publication internet definitive, l'association doit afficher les informations completes de l'hebergeur (nom ou raison sociale, adresse, telephone), conformement a l'article 1-1 de la LCEN.",
          "Champ de conformit\u00E9 a renseigner avant mise en ligne publique: hebergeur, adresse postale, numero de telephone, reference contractuelle le cas echeant.",
        ],
      },
      {
        title: "Propriete intellectuelle",
        paragraphs: [
          "Les contenus du site (textes, structure, logo, chartes graphiques, elements visuels, documents) sont proteges par le code de la propriete intellectuelle.",
          "Sauf mention contraire, toute reproduction, representation, adaptation, extraction ou diffusion, totale ou partielle, sans autorisation ecrite prealable, est interdite.",
          "Les marques et logos de tiers restent la propriete de leurs titulaires respectifs.",
        ],
      },
      {
        title: "Liens externes et responsabilite",
        paragraphs: [
          "Le site peut contenir des liens vers des services externes (par exemple FFSA ou Microsoft Forms). L'association n'exerce pas de contr\u00F4le editorial sur ces services tiers.",
          "L'association s'efforce d'assurer l'exactitude des informations publiees, sans garantie d'exhaustivite ni d'absence d'erreur. Les dates, horaires et modalites d'inscription peuvent etre modifies.",
          "En cas d'indisponibilite, de dysfonctionnement ou d'inexactitude, la responsabilite de l'association ne peut etre engagee que dans les limites permises par la loi francaise.",
        ],
      },
      {
        title: "Droit applicable",
        paragraphs: [
          "Le present site est soumis au droit francais.",
          "Base juridique principale: loi ndeg 2004-575 du 21 juin 2004 pour la confiance dans l'economie numerique (LCEN), notamment article 1-1.",
          "Pour toute question juridique relative au site, contactez: contact@asa-prenois-bourgone.org",
        ],
      },
    ],
  },
  "politique-confidentialite": {
    updatedAt: "Derni\u00E8re mise \u00E0 jour: 15 mars 2026",
    sections: [
      {
        title: "Responsable du traitement",
        paragraphs: [
          "Le responsable du traitement est l'association ASA Prenois Bourgogne, joignable a l'adresse contact@asa-prenois-bourgone.org.",
          "La presente politique de confidentialit\u00E9 est redigee au regard du RGPD (UE 2016/679), en particulier des articles 12, 13 et 14 relatifs a l'information des personnes.",
        ],
      },
      {
        title: "Donnees traitees et source des donn\u00E9es",
        paragraphs: [
          "Lors de la consultation du site, des donn\u00E9es techniques minimales peuvent etre traitees pour faire fonctionner le service (ex: journaux techniques, s\u00E9curit\u00E9, routage de pages).",
          "Lors d'une inscription via les formulaires externes, les donn\u00E9es sont saisies directement sur le service Microsoft Forms (identite, coordonn\u00E9es, informations de licence, disponibilites et informations d'engagement).",
          "Seules les donn\u00E9es strictement necessaires a la gestion administrative et sportive sont sollicitees.",
        ],
      },
      {
        title: "Finalites et bases legales",
        paragraphs: [
          "Finalites principales: gestion des inscriptions, organisation des meetings, communication d'information operationnelle, suivi associatif, obligations administratives et reglementaires.",
          "Bases legales mobilisees selon les traitements: consentement (article 6.1.a RGPD), execution de mesures precontractuelles ou contractuelles (article 6.1.b), respect d'obligations legales (article 6.1.c), interet legitime de l'association pour l'organisation et la securisation des epreuves (article 6.1.f).",
          "Lorsque le consentement est la base legale, il peut etre retire a tout moment.",
        ],
      },
      {
        title: "Destinataires des donn\u00E9es",
        paragraphs: [
          "Peuvent acceder aux donn\u00E9es, dans la limite de leurs habilitations: membres autorises du bureau, equipe d'organisation, responsables de meeting et, le cas echeant, instances sportives ou prestataires techniques necessaires au service.",
          "Les donn\u00E9es ne sont pas vendues ni cedees a des tiers a des fins commerciales.",
        ],
      },
      {
        title: "Durees de conservation",
        paragraphs: [
          "Les donn\u00E9es sont conservees pendant une duree proportionnee aux finalites poursuivies.",
          "Les donn\u00E9es d'inscription et de suivi sportif sont conservees pendant la saison en cours puis archivees selon les obligations legales, comptables, assurantielles et sportives applicables.",
          "Les informations inutiles ou obsoletes sont supprimees ou anonymisees dans des delais raisonnables.",
        ],
      },
      {
        title: "Transferts hors Union europeenne",
        paragraphs: [
          "Certains services techniques tiers peuvent impliquer des traitements hors Union europeenne.",
          "Le cas echeant, ces transferts sont encadres par les mecanismes prevus par le RGPD (ex: clauses contractuelles types de la Commission europeenne) et par les garanties documentees du prestataire.",
        ],
      },
      {
        title: "Vos droits",
        paragraphs: [
          "Conformement au RGPD, vous disposez d'un droit d'acces, de rectification, d'effacement, de limitation, d'opposition et, selon les cas, d'un droit a la portabilite.",
          "Vous pouvez exercer vos droits en ecrivant a contact@asa-prenois-bourgone.org.",
          "Vous disposez egalement du droit d'introduire une reclamation aupres de la CNIL (www.cnil.fr).",
        ],
      },
      {
        title: "Securite et mise a jour",
        paragraphs: [
          "L'association met en oeuvre des mesures organisationnelles et techniques raisonnables pour proteger les donn\u00E9es personnelles contre la perte, l'acces non autorise, l'alteration ou la divulgation.",
          "La presente politique peut etre mise a jour pour tenir compte des evolutions legales, techniques ou organisationnelles. La date de mise a jour figure en haut de page.",
        ],
      },
    ],
  },
  "politique-cookies": {
    updatedAt: "Derni\u00E8re mise \u00E0 jour: 15 mars 2026",
    sections: [
      {
        title: "Cadre legal",
        paragraphs: [
          "L'utilisation des cookies et autres traceurs est encadree en France par l'article 82 de la loi Informatique et Libertes et, pour les donn\u00E9es personnelles, par le RGPD.",
          "Les r\u00E8gles pratiques appliquees sur ce site s'appuient sur les lignes directrices et recommandations de la CNIL.",
        ],
      },
      {
        title: "Definition",
        paragraphs: [
          "Un cookie (ou traceur) est un fichier ou identifiant depose et/ou lu sur votre terminal lors de la consultation d'un service numerique.",
          "Il peut etre utilise a des fins techniques, de mesure d'audience, de personnalisation ou de publicite, selon sa finalite.",
        ],
      },
      {
        title: "Traceurs utilises par ce site",
        paragraphs: [
          "En l'etat actuel du site, aucun traceur publicitaire ou de reseaux sociaux n'est depose par defaut par l'editeur lors de la navigation.",
          "Les traceurs strictement necessaires au fonctionnement technique du service peuvent etre utilises sans consentement prealable, conformement aux exemptions prevues par l'article 82.",
          "Le site contient des liens vers des services tiers (par exemple Microsoft Forms et FFSA). Lorsque vous ouvrez ces services, leurs propres politiques cookies s'appliquent.",
        ],
      },
      {
        title: "Consentement et gestion des choix",
        paragraphs: [
          "Lorsque des traceurs soumis a consentement seraient actives a l'avenir, votre accord sera recueilli avant tout depot, avec un mecanisme de refus aussi simple que l'acceptation.",
          "Conformement aux recommandations CNIL, le choix exprime (acceptation ou refus) peut etre conserve pendant 6 mois afin d'eviter de vous solliciter a chaque visite.",
          "Vous pourrez retirer votre consentement a tout moment via un lien ou un module de gestion accessible depuis le site.",
        ],
      },
      {
        title: "Durees recommandees par la CNIL",
        paragraphs: [
          "Pour les traceurs de mesure d'audience exemptes de consentement sous conditions strictes, la CNIL recommande une duree de vie limitee, par exemple 13 mois, sans prorogation automatique a chaque visite.",
          "La CNIL recommande egalement une conservation maximale de 25 mois pour les informations collectees via ces traceurs de mesure d'audience exemptes.",
        ],
      },
      {
        title: "Parametrage navigateur et contact",
        paragraphs: [
          "Vous pouvez configurer votre navigateur pour accepter, refuser ou supprimer les cookies. Le blocage de certains traceurs techniques peut degrader le fonctionnement du site.",
          "Pour toute question relative aux cookies: contact@asa-prenois-bourgone.org",
        ],
      },
    ],
  },
};

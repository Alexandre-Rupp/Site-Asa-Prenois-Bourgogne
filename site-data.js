// Central content registry (text, menus, meetings, links) used by the SPA.
export const TARGET_YEAR = "2026";

export const NAV_ITEMS = [
  { key: "accueil", label: "ACCUEIL", href: "/" },
  { key: "meetings", label: "CALENDRIER", href: "/meetings" },
  { key: "inscriptions", label: "INSCRIPTIONS", href: "/inscriptions" },
  { key: "actualites", label: "ACTUALIT\u00C9S", href: "/actualites" },
  { key: "run-essence", label: "RUN ESSENCE", href: "/run-essence" },
  { key: "commissaires", label: "DEVENIR COMMISSAIRE", href: "/commissaires" },
  { key: "vie-asa", label: "LA VIE DE L'ASA", href: "/vie-asa" },
  { key: "contact", label: "CONTACTS", href: "/contact" },
];

export const RUN_ESSENCE_ARCHIVES = [
  {
    id: "2026-03",
    issueLabel: "No 1",
    monthLabel: "Mars 2026",
    title: "RUN ESSENCE - Mars 2026",
    href: "assets/documents/run-essence-mars-2026.pdf",
  },
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
    name: "GRAND PRIX DE L'ÂGE D'OR",
    date: "5-6-7-8 juin 2026",
    seasonLabel: "Meetings Circuit 2026",
    kind: "circuit",
    location: "Circuit Dijon-Prenois",
  },
  {
    id: "r7",
    name: "TROPHÉE TOURISME ENDURANCE",
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
    name: "2ÈME RALLYE NATIONAL DE BLIGNY SUR OUCHE",
    date: "08-09 mai 2026",
    seasonLabel: "Meetings Rallye 2026",
    kind: "rallye",
    location: "Bligny-sur-Ouche",
  },
  {
    id: "r12",
    name: "64ÈME COURSE DE CÔTE D'URCY",
    date: "25-26 juillet 2026",
    seasonLabel: "Meetings Course de c\u00F4te 2026",
    kind: "course-de-cote",
    location: "Urcy",
  },
  {
    id: "r13",
    name: "24ÈME RALLYE RÉGIONAL DE L'AUXOIS",
    date: "19 septembre 2026",
    seasonLabel: "Meetings Rallye 2026",
    kind: "rallye",
    location: "Auxois",
  },
  {
    id: "r15",
    name: "RÊVES D'ENFANTS MALADES",
    date: "10 octobre 2026",
    seasonLabel: "Événement solidaire 2026",
    kind: "circuit",
    location: "Circuit Dijon-Prenois",
    cardTone: "red",
    generalCalendarOnly: true,
    detailParagraphs: [
      "Le Lions Club Dijon Doyen organise la 15ème édition de la Journée Rêves d’Enfants Malades, en partenariat avec le Club Ferrari France sur le Circuit Dijon-Prenois le samedi 10 octobre 2026.",
      "De 9h30 à 12h et de 13h30 à 17h, vous pourrez faire des baptêmes de piste dans des véhicules de prestige. Restauration sur place possible.",
      "Après 17h, à l’issue des baptêmes, assistez à la parade des véhicules d’exposition et ceux de nos différents intervenants. Nous vous attendons nombreux !",
      "BAPTÊME DE PISTE ADULTE/ENFANT : 70 €",
      "Ouverture au public dès 9h.",
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
      "Ajoutez ici les roadbooks PDF, liens externes ou versions archivées.",
  },
  {
    key: "horaires",
    title: "Horaires",
    description:
      "Section prévue pour les horaires officiels, timing versions et mises à jour.",
  },
  {
    key: "organisation",
    title: "Documents d'organisation",
    description:
      "Espace pour règlements, notes direction de course et documents utiles.",
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
      "Parcours général",
      "Parcours ES",
      "Roadbook",
      "Reconnaissances",
      "Fiches speaker",
      "Demande accréditation presse",
    ],
    vehicleDocuments: {
      modernes: {
        documents: [
          "Règlement particulier",
          "Bulletin d'engagement",
          "Fiche renseignements des \u00E9quipements de s\u00E9curit\u00E9 - Pilote",
          "Fiche renseignements des \u00E9quipements de s\u00E9curit\u00E9 - Copilote",
          "Tableau des \u00E9quipements de s\u00E9curit\u00E9 généraux",
          "Liste provisoire des engagés",
        ],
      },
      vhc: {
        documents: [
          "Règlement particulier",
          "Bulletin d'engagement",
          "Fiche renseignements des \u00E9quipements de s\u00E9curit\u00E9 - Pilote",
          "Fiche renseignements des \u00E9quipements de s\u00E9curit\u00E9 - Copilote",
          "Tableau des \u00E9quipements de s\u00E9curit\u00E9 généraux",
          "Liste provisoire des engagés",
        ],
      },
      vhrs: {
        documents: [
          "Règlement particulier",
          "Bulletin d'engagement",
          "EP. Générique (\u00E9quipements de s\u00E9curit\u00E9)",
          "Liste provisoire des engagés",
        ],
      },
      vmrs: {
        documents: [
          "Règlement particulier",
          "Bulletin d'engagement",
          "EP. Générique (\u00E9quipements de s\u00E9curit\u00E9)",
          "Liste provisoire des engagés",
        ],
      },
    },
  },
  "course-de-cote": {
    commonDocuments: ["Parcours", "Roadbook", "Infos organisationnelles"],
    vehicleDocuments: {
      modernes: {
        documents: [
          "Règlement particulier",
          "Bulletin d'engagement",
          "Fiche renseignements des \u00E9quipements de s\u00E9curit\u00E9 - Pilote",
          "Tableau des \u00E9quipements de s\u00E9curit\u00E9 généraux",
          "Liste provisoire des engagés",
        ],
        observations: ["Horaire de convocation", "Billetterie"],
      },
      vhc: {
        documents: [
          "Règlement particulier",
          "Bulletin d'engagement",
          "Fiche renseignements des \u00E9quipements de s\u00E9curit\u00E9 - Pilote",
          "Tableau des \u00E9quipements de s\u00E9curit\u00E9 généraux",
          "Liste provisoire des engagés",
        ],
        observations: ["Horaire de convocation", "Billetterie"],
      },
      vhrs: {
        documents: [
          "Règlement particulier",
          "Bulletin d'engagement",
          "EP. Générique (\u00E9quipements de s\u00E9curit\u00E9)",
          "Liste provisoire des engagés",
        ],
        observations: ["Horaire de convocation", "Billetterie"],
      },
      vmrs: {
        documents: [
          "Règlement particulier",
          "Bulletin d'engagement",
          "EP. Générique (\u00E9quipements de s\u00E9curit\u00E9)",
          "Liste provisoire des engagés",
        ],
        observations: ["Horaire de convocation", "Billetterie"],
      },
    },
  },
};

export const PILOT_MEETING_DOCUMENTATION_BY_MEETING = {
  r10: {
    commonDocuments: ["VISA", "Horaires", "Informations générales"],
    pilotDocuments: [
      "Feuilles d'engagement",
      "Assurances",
      "Feuilles techniques",
      "Book info",
      "Listes engagés",
      "Suivis résultats",
    ],
  },
  r13: {
    commonDocuments: [
      {
        title: "Bulletin d'engagement",
        href: "assets/documents/bulletin-engagement-rallye-bligny-2026.pdf",
        ctaLabel: "Ouvrir le PDF",
      },
      {
        title: "Fiche équipements - Pilote",
        href: "assets/documents/fiche-equipements-pilote-rallye-bligny-2026.pdf",
        ctaLabel: "Ouvrir le PDF",
      },
      {
        title: "Fiche équipements - Co-pilote",
        href: "assets/documents/fiche-equipements-co-pilote-rallye-bligny-2026.pdf",
        ctaLabel: "Ouvrir le PDF",
      },
      {
        title: "Tableaux équipements - Rallye",
        href: "assets/documents/tableaux-equipements-rallye-bligny-2026.pdf",
        ctaLabel: "Ouvrir le PDF",
      },
    ],
    vehicleDocuments: {
      modernes: {
        documents: [
          {
            title: "Règlement Moderne",
            href: "assets/documents/reglement-modernes-rallye-bligny-2026.pdf",
            ctaLabel: "Ouvrir le PDF",
          },
        ],
      },
      vhc: {
        documents: [
          {
            title: "Règlement VHC",
            href: "assets/documents/reglement-vhc-rallye-bligny-2026.pdf",
            ctaLabel: "Ouvrir le PDF",
          },
        ],
      },
      vhrs: {
        documents: [
          {
            title: "Règlement VHRS",
            href: "assets/documents/reglement-vhrs-rallye-bligny-2026.pdf",
            ctaLabel: "Ouvrir le PDF",
          },
          {
            title: "Tableaux équipements VHRS",
            href: "assets/documents/tableaux-equipements-vhrs-rallye-bligny-2026.pdf",
            ctaLabel: "Ouvrir le PDF",
          },
        ],
      },
      vmrs: {
        documents: [
          {
            title: "Règlement VMRS",
            href: "assets/documents/reglement-vmrs-rallye-bligny-2026.pdf",
            ctaLabel: "Ouvrir le PDF",
          },
        ],
      },
    },
  },
};

export const PROFILE_CONTENT = {
  commissaire: {
    key: "commissaire",
    label: "Commissaire",
    seasonPill: "Saison 2026",
    heroTitle: "Plateforme des commissaires de piste",
    heroSubtitle:
      "Calendrier des inscriptions et formulaires dédiés aux commissaires.",
    ctaPrimaryLabel: "Accéder aux formulaires commissaires",
    ctaSecondaryLabel: "Voir le calendrier",
    targetMembers: 200,
    forms: {
      memberForm:
        "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAAj12wxUMkFaVUkzNlEzTzdTRVVXMVJVS0NBNEFOVy4u",
      raceForm: "https://forms.office.com/r/5s11Uy4fWP",
      signupClosedAll: true,
      openRaceFormsByMeeting: ["r6", "r7", "r8", "r9", "r10", "r12", "r13", "r14"],
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
      resultsTitle: "R\u00E9sultats",
      profileSpaceTitle: "Espace commissaire",
      memberFormTitle: "Formulaire inscription membre",
      memberFormText:
        "Nouveau commissaire: remplissez ce formulaire pour créer votre dossier (coordonn\u00E9es, licence, disponibilités).",
      raceFormTitle: "Formulaire inscription course",
      raceFormText:
        "Inscription par meeting: envoyez une r\u00E9ponse pour chaque course souhait\u00E9e.",
    },
    newsFeed: [
      {
        title: "Formation Commissaire",
        date: "18 mars 2026",
        text:
          "Une journée bénéfique pour tous et bien chargée, un nombre de bénévoles présent exceptionnel sous un magnifique soleil. Une équipe de formateur très professionnel, qui a su faire passer avec un langage simple les messages essentiels. Tout le monde est ravi, le début de saison a bien démarré dans une superbe ambiance. Tout le monde est ravi, le début de saison a bien démarré dans une superbe ambiance.",
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
            alt: "Formation commissaire - photo de binôme",
          },
          {
            src: "assets/news/formation-commissaire/formation-commissaire-04.webp",
            alt: "Formation commissaire - démonstration en piste",
          },
          {
            src: "assets/news/formation-commissaire/formation-commissaire-05.webp",
            alt: "Formation commissaire - échanges en bord de piste",
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
        text: "Les inscriptions sont maintenant centralisées via Microsoft Forms.",
      },
    ],
    resultsFeed: [
      {
        title: "Meeting test pré-saison",
        date: "31 janvier 2026",
        text: "42 officiels mobilis\u00E9s, 100% des postes couverts sur 2 jours.",
      },
      {
        title: "Challenge club - manche 1",
        date: "8 f\u00E9vrier 2026",
        text: "Interventions piste: 6, incidents majeurs: 0, coordination op\u00E9rationnelle.",
      },
      {
        title: "Sprint régional",
        date: "14 f\u00E9vrier 2026",
        text: "Débrief positif de la direction de course sur la rapidité des interventions.",
      },
    ],
  },
  pilote: {
    key: "pilote",
    label: "Pilote",
    seasonPill: "Saison 2026",
    heroTitle: "Plateforme des pilotes",
    heroSubtitle:
      "Calendrier des meetings et liens d'inscription adaptés au parcours pilote.",
    ctaPrimaryLabel: "Accéder aux formulaires pilotes",
    ctaSecondaryLabel: "Voir le calendrier",
    targetMembers: 120,
    forms: {
      memberForm: "https://forms.office.com/r/PILOTE-MEMBRE-2026",
      raceForm: "https://forms.office.com/r/PILOTE-COURSE-2026",
      signupClosedAll: true,
      openRaceFormsByMeeting: ["r12"],
      raceFormsByMeeting: {
        r12: "assets/documents/fiche-engagement-urcy-2026.xls",
      },
    },
    sections: {
      calendarTitle: "Calendrier des inscriptions pilotes",
      newsTitle: "Actualit\u00E9s pilotes",
      resultsTitle: "Infos meeting",
      profileSpaceTitle: "Espace pilote",
      memberFormTitle: "Formulaire profil pilote",
      memberFormText:
        "Création ou mise à jour de votre profil pilote (licence, véhicule, catégorie, contact).",
      raceFormTitle: "Formulaire engagement meeting",
      raceFormText:
        "Un formulaire par meeting pour déclarer votre participation et vos besoins logistiques.",
    },
    newsFeed: [
      {
        title: "Romain Perrin, nouveau lauréat Rallye Jeune Yacco FFSA",
        date: "2026",
        text:
          "Romain Perrin, nouveau loréat RALLYE JEUNE YACCO FFSA sur 5000 participants lui permet de se lancer pour une saison en formule de promotion SMRC6 !",
      },
    ],
    resultsFeed: [
      {
        title: "Documents administratifs",
        date: "En continu",
        text: "Les pièces justificatives seront centralisées dans les fiches détail meeting.",
      },
      {
        title: "Accès paddock",
        date: "En continu",
        text: "Chaque meeting d\u00E9taill\u00E9 précisera les horaires d'accueil et contraintes d'accès.",
      },
      {
        title: "Support inscription",
        date: "En continu",
        text: "Un contact d'assistance sera ajouté dans la page détail de chaque meeting.",
      },
    ],
  },
};

export const PAGE_SKELETONS = {
  commissaires: {
    title: "Commissaires",
    intro:
      "Page réservée au contenu institutionnel commissaires (formation, recrutement, référents).",
    commissionerTitle: "Devenez commissaire de piste",
    commissionerTrainingLink: "https://entrezdanslacourse.ffsa.org/",
    commissionerTrainingLabel: "Se former et débuter",
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
      "Devenir commissaire, ce n'est pas être spectateur privilégié, c'est être un acteur indispensable à la s\u00E9curit\u00E9 du sport automobile.",
      "Appelé à officier sur l'ensemble des épreuves qui sont : Circuits, Rallyes, Course de C\u00F4tes, Rallye-cross, Auto-Cross, Tout-Terrain, Slaloms, Runs, Karting...",
      "En totale collaboration avec la Direction de Course, chacun doit tenir un r\u00F4le important :",
      "- Le commissaire de piste est les yeux supplémentaires de la Direction de Course et il est nécessaire au bon déroulement de chaque meeting.",
      "- Le commissaire sportif est celui qui contr\u00F4le et fait appliquer le règlement des épreuves.",
      "- Le chronométreur est celui qui gère le timing de chaque coureur, indispensable à la compétition pour les classements.",
      "- Le directeur de course est le chef d'orchestre de l'événement, celui qui donne les consignes, les procédures et veille sur chacun des rôles attribués.",
      "Une grande équipe de bénévoles, animés par la passion du sport automobile, engagés dans une mission commune : assurer la s\u00E9curit\u00E9 de chacun.",
      "Sans l'un de ces acteurs, aucune compétition ne peut avoir lieu.",
      "Le commissaire de piste, par tous les temps, assure la s\u00E9curit\u00E9 de l'épreuve dont les missions sont :",
      "- Surveiller",
      "- Signaler",
      "- Transmettre",
      "- Intervenir",
      "Ce sont tous des bénévoles au service du Sport Automobile.",
      "Donc si tu es passionné, que tu as un esprit d'engagement et d'équipe, rejoins-nous dans la grande famille du sport automobile de l'Association Sport Automobile Prenois Bourgogne.",
    ],
  },
  pilotes: {
    title: "Pilotes",
    intro:
      "Page réservée au contenu institutionnel pilotes (r\u00E8gles, accompagnement, documentation).",
    pilotShowcaseTitle: "Pilotes de l'ASA Prenois Bourgogne",
    pilotShowcaseIntro:
      "S\u00E9lectionnez un pilote pour afficher sa carte de saison.",
    pilotShowcase: [
      {
        id: "jacotot-christophe",
        lastName: "JACOTOT",
        firstName: "Christophe",
        image: {
          src: "assets/vie-asa/pilotes/jacotot-christophe.webp",
          alt: "Carte pilote Jacotot Christophe",
        },
      },
      {
        id: "cuynet-thierry",
        lastName: "CUYNET",
        firstName: "Thierry",
        image: {
          src: "assets/vie-asa/pilotes/cuynet-thierry.webp",
          alt: "Carte pilote Cuynet Thierry",
        },
      },
      {
        id: "cuynet-herve",
        lastName: "CUYNET",
        firstName: "Herv\u00E9",
        image: {
          src: "assets/vie-asa/pilotes/cuynet-herve.webp",
          alt: "Carte pilote Cuynet Herv\u00E9",
        },
      },
      {
        id: "jung-denis",
        lastName: "JUNG",
        firstName: "Denis",
        image: {
          src: "assets/vie-asa/pilotes/jung-denis.webp",
          alt: "Carte pilote Jung Denis",
        },
      },
      {
        id: "batteau-thierry",
        lastName: "BATTEAU",
        firstName: "Thierry",
        image: {
          src: "assets/vie-asa/pilotes/batteau-thierry.webp",
          alt: "Carte pilote Batteau Thierry",
        },
      },
      {
        id: "mottez-bruno",
        lastName: "MOTTEZ",
        firstName: "Bruno",
        image: {
          src: "assets/vie-asa/pilotes/mottez-bruno.webp",
          alt: "Carte pilote Mottez Bruno",
        },
      },
      {
        id: "guillot-marc",
        lastName: "GUILLOT",
        firstName: "Marc",
        image: {
          src: "assets/vie-asa/pilotes/guillot-marc.webp",
          alt: "Carte pilote Guillot Marc",
        },
      },
      {
        id: "sechepine-baptiste",
        lastName: "S\u00C9CH\u00C9PINE",
        firstName: "Baptiste",
        image: {
          src: "assets/vie-asa/pilotes/sechepine-baptiste.webp",
          alt: "Carte pilote S\u00E9ch\u00E9pine Baptiste",
        },
      },
      {
        id: "aubry-herve",
        lastName: "AUBRY",
        firstName: "Herv\u00E9",
        image: {
          src: "assets/vie-asa/pilotes/aubry-herve.webp",
          alt: "Carte pilote Aubry Herv\u00E9",
        },
      },
      {
        id: "martins-mathieu",
        lastName: "MARTINS",
        firstName: "Mathieu",
        image: {
          src: "assets/vie-asa/pilotes/martins-mathieu.webp",
          alt: "Carte pilote Martins Mathieu",
        },
      },
      {
        id: "perrin-romain",
        lastName: "PERRIN",
        firstName: "Romain",
        image: {
          src: "assets/vie-asa/pilotes/perrin-romain.webp",
          alt: "Carte pilote Perrin Romain",
        },
      },
      {
        id: "durieux-yann",
        lastName: "DURIEUX",
        firstName: "Yann",
        image: {
          src: "assets/vie-asa/pilotes/durieux-yann.webp",
          alt: "Carte pilote Durieux Yann",
        },
      },
      {
        id: "claire-pascal",
        lastName: "CLAIRE",
        firstName: "Pascal",
        image: {
          src: "assets/vie-asa/pilotes/claire-pascal.webp",
          alt: "Carte pilote Claire Pascal",
        },
      },
    ],
  },
  "vie-asa": {
    title: "La vie de l'ASA",
    intro:
      "Page prévue pour les actualités du club, événements internes et actions de l'association.",
    historyTitle: "Histoire de l'ASA Prenois Bourgogne",
    historyParagraphs: [
      "L'ASA Prenois Bourgogne est une association sportive automobile, organisatrice de meetings en collaboration avec le circuit de Dijon-Prenois ainsi que des Courses de Côte et des Rallyes.",
      "L'ASA Prenois Bourgogne regroupe au sein de ses adhérent(e)s, des commissaires de piste, des chefs de poste, des directeurs de course, des chronométreurs, des pilotes, et tous les passionné(e)s qui gravitent autour de la compétition automobile moderne ou ancienne. Elle est reconnue par tous pour les compétences de ses commissaires formateurs sur le circuit de Dijon Prenois.",
      "L'ASA Prenois Bourgogne est née de la fusion absorption des 4 ASA de C\u00F4te d'Or, ASAC Bourgogne, Asa Prenois, Asa Beaune et ASA C\u00F4te d'Or.",
      "L'ASAC Bourgogne avait été créée le 22 d\u00E9cembre 1952, parue dans le Journal Officiel le 01 janvier 1953, et la fondatrice de la légendaire Course de C\u00F4te d'Urcy.",
    ],
  },
  "run-essence": {
    title: "Run Essence",
    intro:
      "Consultez l'historique mensuel du journal RUN ESSENCE, avec un numéro publié chaque mois.",
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
      { name: "Vulco", short: "Vulco", logo: "assets/partners/vulco.svg" },
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
          "Le site présente les activités de l'association, les informations de meetings et les liens d'inscription des commissaires et pilotes.",
          "Le contenu publié est informatif et peut être mis à jour en fonction des contraintes sportives, organisationnelles et réglementaires.",
        ],
      },
      {
        title: "Éditeur du service de communication au public en ligne",
        paragraphs: [
          "Association Sportive Automobile Club Bourgogne (ASA Prenois Bourgogne).",
          "Siège: Circuit Dijon-Prenois, 21370 Prenois, France.",
          "Contact: contact@asa-prenois-bourgone.org",
          "Ces informations sont publiées conformément aux obligations d'identification de l'éditeur prévues par l'article 1-1 de la loi ndeg 2004-575 du 21 juin 2004 (LCEN), version en vigueur depuis le 23 mai 2024.",
        ],
      },
      {
        title: "Direction de la publication",
        paragraphs: [
          "Directeur de la publication: le bureau de l'association ASA Prenois Bourgogne.",
          "Responsable de la rédaction: à compléter si des fonctions editoriales distinctes sont designees.",
          "Droit de réponse: toute personne nommée ou désignée peut exercer son droit de réponse selon les modalités prévues par l'article 1-1 de la LCEN.",
        ],
      },
      {
        title: "Hebergement",
        paragraphs: [
          "Environnement actuel: version de travail et de test.",
          "Avant publication internet définitive, l'association doit afficher les informations complètes de l'hébergeur (nom ou raison sociale, adresse, téléphone), conformément à l'article 1-1 de la LCEN.",
          "Champ de conformit\u00E9 à renseigner avant mise en ligne publique: hébergeur, adresse postale, numéro de téléphone, référence contractuelle le cas échéant.",
        ],
      },
      {
        title: "Propriété intellectuelle",
        paragraphs: [
          "Les contenus du site (textes, structure, logo, chartes graphiques, elements visuels, documents) sont protégés par le code de la propriété intellectuelle.",
          "Sauf mention contraire, toute reproduction, representation, adaptation, extraction ou diffusion, totale ou partielle, sans autorisation ecrite préalable, est interdite.",
          "Les marques et logos de tiers restent la propriété de leurs titulaires respectifs.",
        ],
      },
      {
        title: "Liens externes et responsabilité",
        paragraphs: [
          "Le site peut contenir des liens vers des services externes (par exemple FFSA ou Microsoft Forms). L'association n'exerce pas de contr\u00F4le editorial sur ces services tiers.",
          "L'association s'efforce d'assurer l'exactitude des informations publiées, sans garantie d'exhaustivité ni d'absence d'erreur. Les dates, horaires et modalités d'inscription peuvent être modifiés.",
          "En cas d'indisponibilité, de dysfonctionnement ou d'inexactitude, la responsabilité de l'association ne peut être engagée que dans les limites permises par la loi française.",
        ],
      },
      {
        title: "Droit applicable",
        paragraphs: [
          "Le pr\u00E9sent site est soumis au droit fran\u00E7ais.",
          "Base juridique principale: loi ndeg 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), notamment article 1-1.",
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
          "Le responsable du traitement est l'association ASA Prenois Bourgogne, joignable à l'adresse contact@asa-prenois-bourgone.org.",
          "La présente politique de confidentialit\u00E9 est rédigée au regard du RGPD (UE 2016/679), en particulier des articles 12, 13 et 14 relatifs à l'information des personnes.",
        ],
      },
      {
        title: "Données traitées et source des donn\u00E9es",
        paragraphs: [
          "Lors de la consultation du site, des donn\u00E9es techniques minimales peuvent être traitées pour faire fonctionner le service (ex: journaux techniques, s\u00E9curit\u00E9, routage de pages).",
          "Lors d'une inscription via les formulaires externes, les donn\u00E9es sont saisies directement sur le service Microsoft Forms (identité, coordonn\u00E9es, informations de licence, disponibilités et informations d'engagement).",
          "Seules les donn\u00E9es strictement nécessaires à la gestion administrative et sportive sont sollicitees.",
        ],
      },
      {
        title: "Finalités et bases légales",
        paragraphs: [
          "Finalités principales: gestion des inscriptions, organisation des meetings, communication d'information opérationnelle, suivi associatif, obligations administratives et réglementaires.",
          "Bases légales mobilisées selon les traitements: consentement (article 6.1.a RGPD), exécution de mesures précontractuelles ou contractuelles (article 6.1.b), respect d'obligations légales (article 6.1.c), intérêt légitime de l'association pour l'organisation et la sécurisation des épreuves (article 6.1.f).",
          "Lorsque le consentement est la base légale, il peut être retiré à tout moment.",
        ],
      },
      {
        title: "Destinataires des donn\u00E9es",
        paragraphs: [
          "Peuvent accéder aux donn\u00E9es, dans la limite de leurs habilitations: membres autorisés du bureau, équipe d'organisation, responsables de meeting et, le cas échéant, instances sportives ou prestataires techniques nécessaires au service.",
          "Les donn\u00E9es ne sont pas vendues ni cédées à des tiers à des fins commerciales.",
        ],
      },
      {
        title: "Durées de conservation",
        paragraphs: [
          "Les donn\u00E9es sont conservées pendant une durée proportionnée aux finalités poursuivies.",
          "Les donn\u00E9es d'inscription et de suivi sportif sont conservées pendant la saison en cours puis archivées selon les obligations légales, comptables, assurantielles et sportives applicables.",
          "Les informations inutiles ou obsolètes sont supprimées ou anonymisées dans des délais raisonnables.",
        ],
      },
      {
        title: "Transferts hors Union européenne",
        paragraphs: [
          "Certains services techniques tiers peuvent impliquer des traitements hors Union européenne.",
          "Le cas échéant, ces transferts sont encadrés par les mécanismes prévus par le RGPD (ex: clauses contractuelles types de la Commission européenne) et par les garanties documentées du prestataire.",
        ],
      },
      {
        title: "Vos droits",
        paragraphs: [
          "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et, selon les cas, d'un droit à la portabilite.",
          "Vous pouvez exercer vos droits en ecrivant à contact@asa-prenois-bourgone.org.",
          "Vous disposez également du droit d'introduire une reclamation auprès de la CNIL (www.cnil.fr).",
        ],
      },
      {
        title: "Sécurité et mise à jour",
        paragraphs: [
          "L'association met en œuvre des mesures organisationnelles et techniques raisonnables pour protéger les donn\u00E9es personnelles contre la perte, l'accès non autorisé, l'altération ou la divulgation.",
          "La présente politique peut être mise à jour pour tenir compte des évolutions légales, techniques ou organisationnelles. La date de mise à jour figure en haut de page.",
        ],
      },
    ],
  },
  "politique-cookies": {
    updatedAt: "Derni\u00E8re mise \u00E0 jour: 15 mars 2026",
    sections: [
      {
        title: "Cadre légal",
        paragraphs: [
          "L'utilisation des cookies et autres traceurs est encadrée en France par l'article 82 de la loi Informatique et Libertés et, pour les donn\u00E9es personnelles, par le RGPD.",
          "Les r\u00E8gles pratiques appliquées sur ce site s'appuient sur les lignes directrices et recommandations de la CNIL.",
        ],
      },
      {
        title: "Definition",
        paragraphs: [
          "Un cookie (ou traceur) est un fichier ou identifiant déposé et/ou lu sur votre terminal lors de la consultation d'un service numérique.",
          "Il peut être utilisé à des fins techniques, de mesure d'audience, de personnalisation ou de publicité, selon sa finalité.",
        ],
      },
      {
        title: "Traceurs utilisés par ce site",
        paragraphs: [
          "En l'état actuel du site, aucun traceur publicitaire ou de réseaux sociaux n'est déposé par défaut par l'éditeur lors de la navigation.",
          "Les traceurs strictement nécessaires au fonctionnement technique du service peuvent être utilisés sans consentement préalable, conformément aux exemptions prévues par l'article 82.",
          "Le site contient des liens vers des services tiers (par exemple Microsoft Forms et FFSA). Lorsque vous ouvrez ces services, leurs propres politiques cookies s'appliquent.",
        ],
      },
      {
        title: "Consentement et gestion des choix",
        paragraphs: [
          "Lorsque des traceurs soumis à consentement seraient activées à l'avenir, votre accord sera recueilli avant tout dépôt, avec un mécanisme de refus aussi simple que l'acceptation.",
          "Conformément aux recommandations CNIL, le choix exprimé (acceptation ou refus) peut être conserve pendant 6 mois afin d'éviter de vous solliciter à chaque visite.",
          "Vous pourrez retirer votre consentement à tout moment via un lien ou un module de gestion accessible depuis le site.",
        ],
      },
      {
        title: "Durées recommandées par la CNIL",
        paragraphs: [
          "Pour les traceurs de mesure d'audience exemptées de consentement sous conditions strictes, la CNIL recommande une durée de vie limitée, par exemple 13 mois, sans prorogation automatique à chaque visite.",
          "La CNIL recommande également une conservation maximale de 25 mois pour les informations collectées via ces traceurs de mesure d'audience exemptées.",
        ],
      },
      {
        title: "Paramétrage navigateur et contact",
        paragraphs: [
          "Vous pouvez configurer votre navigateur pour accepter, refuser ou supprimer les cookies. Le blocage de certains traceurs techniques peut dégrader le fonctionnement du site.",
          "Pour toute question relative aux cookies: contact@asa-prenois-bourgone.org",
        ],
      },
    ],
  },
};

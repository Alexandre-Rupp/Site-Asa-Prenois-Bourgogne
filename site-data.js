export const TARGET_YEAR = "2026";

export const NAV_ITEMS = [
  { key: "accueil", label: "ACCUEIL", href: "#/accueil" },
  { key: "meetings", label: "LES MEETINGS", href: "#/meetings" },
  { key: "commissaires", label: "COMMISSAIRES", href: "#/commissaires" },
  { key: "pilotes", label: "PILOTES", href: "#/pilotes" },
  { key: "vie-asa", label: "LA VIE DE L'ASA", href: "#/vie-asa" },
  { key: "partenaires", label: "LES PARTENAIRES", href: "#/partenaires" },
  { key: "contact", label: "CONTACTEZ-NOUS", href: "#/contact" },
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
    seasonLabel: "Meetings Course de cote 2026",
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
      "Zone libre pour tout autre contenu detaille du meeting (briefings, plans, etc.).",
  },
];

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
    },
    sections: {
      calendarTitle: "Calendrier des inscriptions commissaires",
      newsTitle: "Actualites association",
      resultsTitle: "Resultats",
      profileSpaceTitle: "Espace commissaire",
      memberFormTitle: "Formulaire inscription membre",
      memberFormText:
        "Nouveau commissaire: remplissez ce formulaire pour creer votre dossier (coordonnees, licence, disponibilites).",
      raceFormTitle: "Formulaire inscription course",
      raceFormText:
        "Inscription par meeting: envoyez une reponse pour chaque course souhaitee.",
    },
    newsFeed: [
      {
        title: "Ouverture des inscriptions saison 2026",
        date: "15 fevrier 2026",
        text: "Les inscriptions sont maintenant centralisees via Microsoft Forms.",
      },
      {
        title: "Session formation drapeaux",
        date: "22 mars 2026",
        text: "Formation pratique ouverte aux nouveaux commissaires et recyclage annuel.",
      },
      {
        title: "Partenariat securite piste",
        date: "4 avril 2026",
        text: "Nouveau dispositif de coordination radio et pointage numerique.",
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
        date: "8 fevrier 2026",
        text: "Interventions piste: 6, incidents majeurs: 0, coordination operationnelle.",
      },
      {
        title: "Sprint regional",
        date: "14 fevrier 2026",
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
    },
    sections: {
      calendarTitle: "Calendrier des inscriptions pilotes",
      newsTitle: "Actualites pilotes",
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
        title: "Controle equipements",
        date: "6 avril 2026",
        text: "Rappel des obligations casque/HANS et conformite equipement pilote.",
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
        text: "Chaque meeting detaille precisera les horaires d'accueil et contraintes d'acces.",
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
    commissionerParagraphs: [
      "Passez de spectateur a ACTEUR, rejoignez le rang des OFFICIELS.",
      "Le Commissaire est appele a officier sur l'ensemble des epreuves constituant le sport automobile : Circuits, Rallyes, Course de cotes, Rally-cross, Auto-Cross, Tout-Terrain, Slaloms, Runs, Karting...",
      "Le Commissaire est un acteur essentiel de la Direction de Course.",
      "Sans les Commissaires, aucune competition automobile ne peut avoir lieu.",
      "Il occupe sur la piste, ou le long du parcours routier, des postes qui lui sont designes par le comite d'organisation ou la Direction de Course.",
      "Des l'ouverture d'une competition, le commissaire est place sous les ordres du Directeur de Course.",
    ],
  },
  pilotes: {
    title: "Pilotes",
    intro:
      "Page reservee au contenu institutionnel pilotes (regles, accompagnement, documentation).",
  },
  "vie-asa": {
    title: "La vie de l'ASA",
    intro:
      "Page prevue pour les actualites du club, evenements internes et actions de l'association.",
    historyTitle: "Histoire de l'ASA Prenois Bourgogne (ex ASAC Bourgogne)",
    historyParagraphs: [
      "L'ASA Prenois Bourgogne est une association sportive automobile, organisatrice de meetings en collaboration avec le circuit de Dijon-Prenois ainsi que des Courses de Cote et des Rallyes.",
      "L'ASA Prenois Bourgogne regroupe au sein de ses adherent(e)s, des commissaires de piste, des chefs de poste, des directeurs de course, des chronometreurs, des pilotes, et tous les passionne(e)s qui gravitent autour de la competition automobile moderne ou ancienne. Elle est reconnue par tous pour les competences de ses commissaires formateurs sur le circuit de Dijon Prenois.",
      "L'ASA Prenois Bourgogne est nee de la fusion absorption des 4 ASA de Cote d'Or, ASAC Bourgogne, Asa Prenois, Asa Beaune et ASA Cote d'Or.",
      "L'ASAC Bourgogne avait ete creee le 22 decembre 1952, parue dans le Journal Officiel le 01 janvier 1953, et la fondatrice de la legendaire Course de Cote d'Urcy.",
    ],
  },
  partenaires: {
    title: "Les partenaires",
    intro:
      "Page prevue pour valoriser les partenaires, soutiens institutionnels et collaborations.",
  },
  contact: {
    title: "Contactez-nous",
    intro:
      "Page prevue pour les points de contact officiels de l'ASAC Bourgogne.",
  },
};

export const CONTACT_PAGE_CONTENT = {
  officeHoursTitle: "Horaires Bureau, ouverture public, licencies",
  officeHours: [
    { day: "Lundi", hours: "14h-17h" },
    { day: "Mardi", hours: "14h-17h" },
    { day: "Mercredi", hours: "14h-17h" },
    { day: "Jeudi", hours: "9h00-12h00, 14h00-17h00" },
    { day: "Vendredi", hours: "Ferme au public" },
  ],
  contactTitle: "Demande de renseignements divers",
  email: "contact@asa-prenois-bourgone.org",
};

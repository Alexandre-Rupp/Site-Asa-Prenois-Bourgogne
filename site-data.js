export const TARGET_YEAR = "2026";

export const NAV_ITEMS = [
  { key: "accueil", label: "ACCUEIL", href: "#/accueil" },
  { key: "meetings", label: "CALENDRIER", href: "#/meetings" },
  { key: "inscriptions", label: "INSCRIPTIONS", href: "#/inscriptions" },
  { key: "actualites", label: "ACTUALITES", href: "#/actualites" },
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
          "Fiche renseignements des equipements de securite - Pilote",
          "Fiche renseignements des equipements de securite - Copilote",
          "Tableau des equipements de securite generaux",
          "Liste provisoire des engages",
        ],
      },
      vhc: {
        documents: [
          "Reglement particulier",
          "Bulletin d'engagement",
          "Fiche renseignements des equipements de securite - Pilote",
          "Fiche renseignements des equipements de securite - Copilote",
          "Tableau des equipements de securite generaux",
          "Liste provisoire des engages",
        ],
      },
      vhrs: {
        documents: [
          "Reglement particulier",
          "Bulletin d'engagement",
          "EP. Generique (equipements de securite)",
          "Liste provisoire des engages",
        ],
      },
      vmrs: {
        documents: [
          "Reglement particulier",
          "Bulletin d'engagement",
          "EP. Generique (equipements de securite)",
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
          "Fiche renseignements des equipements de securite - Pilote",
          "Tableau des equipements de securite generaux",
          "Liste provisoire des engages",
        ],
        observations: ["Horaire de convocation", "Billetterie"],
      },
      vhc: {
        documents: [
          "Reglement particulier",
          "Bulletin d'engagement",
          "Fiche renseignements des equipements de securite - Pilote",
          "Tableau des equipements de securite generaux",
          "Liste provisoire des engages",
        ],
        observations: ["Horaire de convocation", "Billetterie"],
      },
      vhrs: {
        documents: [
          "Reglement particulier",
          "Bulletin d'engagement",
          "EP. Generique (equipements de securite)",
          "Liste provisoire des engages",
        ],
        observations: ["Horaire de convocation", "Billetterie"],
      },
      vmrs: {
        documents: [
          "Reglement particulier",
          "Bulletin d'engagement",
          "EP. Generique (equipements de securite)",
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
      raceFormsByMeeting: {
        r2: "https://forms.office.com/r/FKJZCT2p8K",
        r3: "https://forms.office.com/r/ncBaNgw8T4",
        r5: "https://forms.office.com/r/8DFcU05LJN",
        r6: "https://forms.office.com/r/acKvMAf6Hk",
        r7: "https://forms.office.com/r/6PRUYFZ5Lu",
        r8: "https://forms.office.com/r/Qq9W4kr0PV",
        r9: "https://forms.office.com/r/ePS24dmxd9",
        r12: "https://forms.office.com/r/SPSGZyNuPY",
      },
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
        title: "Formation Commissaire",
        date: "18 mars 2026",
        text: "Texte a venir.",
        images: [
          {
            src: "assets/news/formation-commissaire/formation-commissaire-01.jpg",
            alt: "Formation commissaire - exercice drapeaux en virage",
          },
          {
            src: "assets/news/formation-commissaire/formation-commissaire-02.jpg",
            alt: "Formation commissaire - briefing de groupe",
          },
          {
            src: "assets/news/formation-commissaire/formation-commissaire-03.jpg",
            alt: "Formation commissaire - photo de binome",
          },
          {
            src: "assets/news/formation-commissaire/formation-commissaire-04.jpg",
            alt: "Formation commissaire - demonstration en piste",
          },
          {
            src: "assets/news/formation-commissaire/formation-commissaire-05.jpg",
            alt: "Formation commissaire - echanges en bord de piste",
          },
          {
            src: "assets/news/formation-commissaire/formation-commissaire-06.jpg",
            alt: "Formation commissaire - atelier drapeaux",
          },
          {
            src: "assets/news/formation-commissaire/formation-commissaire-07.jpg",
            alt: "Formation commissaire - poste T6",
          },
        ],
      },
      {
        title: "Ouverture des inscriptions saison 2026",
        date: "15 fevrier 2026",
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
    commissionerTrainingLink: "https://entrezdanslacourse.ffsa.org/",
    commissionerTrainingLabel: "Se former et debuter",
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
    title: "Nos partenaires",
    intro:
      "Retrouvez les partenaires institutionnels et prives qui soutiennent l'Asa Prenois-Bourgogne.",
    annualPartnersTitle: "Nos partenaires de l'Asa Prenois-Bourgogne",
    annualPartners: [
      {
        name: "Federation Internationale de l'Automobile",
        short: "FIA",
        logo: "assets/partners/fia.png",
      },
      {
        name: "Federation Francaise du Sport Automobile",
        short: "FFSA",
        logo: "assets/partners/ffsa.svg",
      },
      {
        name: "Ligue du Sport Automobile Bourgogne Franche-Comte",
        short: "Ligue BFC",
        logo: "assets/partners/lsabfc.png",
      },
      {
        name: "Circuit Dijon-Prenois",
        short: "Dijon-Prenois",
        logo: "assets/partners/dijon-prenois.png",
      },
      { name: "Stand 21", short: "Stand 21", logo: "assets/partners/stand21.webp" },
      { name: "Krys", short: "Krys", logo: "assets/partners/krys.png" },
      {
        name: "Planete Communication Dijon",
        short: "Planete Com",
        logo: "assets/partners/planete-communication.png",
      },
      {
        name: "Kreativecom",
        short: "Kreativecom",
        logo: "assets/partners/kreativecom.png",
      },
    ],
    urcyPartnersTitle: "Nos partenaires - Course de Cote Urcy 2025",
    urcyPartners: [
      {
        name: "FFSA Montagne",
        short: "FFSA Montagne",
        logo: "assets/partners/ffsa.svg",
      },
      {
        name: "Ligue du Sport Automobile Bourgogne Franche-Comte",
        short: "Ligue BFC",
        logo: "assets/partners/lsabfc.png",
      },
      {
        name: "Fromagerie Delin",
        short: "Delin",
        logo: "assets/partners/delin.jpg",
      },
      {
        name: "Passion Moto Securite",
        short: "PMS",
        logo: "assets/partners/passion-moto-securite.png",
      },
      {
        name: "Ets Bailly et Mr.Bricolage",
        short: "Mr.Bricolage",
        logo: "assets/partners/mr-bricolage.svg",
      },
      { name: "Gautier", short: "Gautier", logo: "assets/partners/gautier.svg" },
      { name: "Vitco", short: "Vitco", logo: "assets/partners/vitco.png" },
      {
        name: "Planete Communication Dijon",
        short: "Planete Com",
        logo: "assets/partners/planete-communication.png",
      },
      { name: "Bymycar", short: "Bymycar", logo: "assets/partners/bymycar.png" },
      {
        name: "Circuit Dijon-Prenois",
        short: "Dijon-Prenois",
        logo: "assets/partners/dijon-prenois.png",
      },
      {
        name: "Cote d'Or Le Departement",
        short: "Cote d'Or",
        logo: "assets/partners/cotedor.svg",
      },
    ],
  },
  contact: {
    title: "Contacts",
    intro:
      "Page prevue pour les points de contact officiels de l'ASA Prenois Bourgogne.",
  },
  "mentions-legales": {
    title: "Mentions legales",
    intro:
      "Page dediee aux informations legales de l'association et du site.",
  },
  "politique-confidentialite": {
    title: "Politique de confidentialite",
    intro:
      "Page dediee aux regles de collecte, d'usage et de protection des donnees personnelles.",
  },
  "politique-cookies": {
    title: "Politique de cookies du site",
    intro:
      "Page dediee a l'utilisation des cookies et traceurs sur le site.",
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

export const LEGAL_PAGE_CONTENT = {
  "mentions-legales": {
    updatedAt: "Derniere mise a jour: 15 mars 2026",
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
          "Champ de conformite a renseigner avant mise en ligne publique: hebergeur, adresse postale, numero de telephone, reference contractuelle le cas echeant.",
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
          "Le site peut contenir des liens vers des services externes (par exemple FFSA ou Microsoft Forms). L'association n'exerce pas de controle editorial sur ces services tiers.",
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
    updatedAt: "Derniere mise a jour: 15 mars 2026",
    sections: [
      {
        title: "Responsable du traitement",
        paragraphs: [
          "Le responsable du traitement est l'association ASA Prenois Bourgogne, joignable a l'adresse contact@asa-prenois-bourgone.org.",
          "La presente politique de confidentialite est redigee au regard du RGPD (UE 2016/679), en particulier des articles 12, 13 et 14 relatifs a l'information des personnes.",
        ],
      },
      {
        title: "Donnees traitees et source des donnees",
        paragraphs: [
          "Lors de la consultation du site, des donnees techniques minimales peuvent etre traitees pour faire fonctionner le service (ex: journaux techniques, securite, routage de pages).",
          "Lors d'une inscription via les formulaires externes, les donnees sont saisies directement sur le service Microsoft Forms (identite, coordonnees, informations de licence, disponibilites et informations d'engagement).",
          "Seules les donnees strictement necessaires a la gestion administrative et sportive sont sollicitees.",
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
        title: "Destinataires des donnees",
        paragraphs: [
          "Peuvent acceder aux donnees, dans la limite de leurs habilitations: membres autorises du bureau, equipe d'organisation, responsables de meeting et, le cas echeant, instances sportives ou prestataires techniques necessaires au service.",
          "Les donnees ne sont pas vendues ni cedees a des tiers a des fins commerciales.",
        ],
      },
      {
        title: "Durees de conservation",
        paragraphs: [
          "Les donnees sont conservees pendant une duree proportionnee aux finalites poursuivies.",
          "Les donnees d'inscription et de suivi sportif sont conservees pendant la saison en cours puis archivees selon les obligations legales, comptables, assurantielles et sportives applicables.",
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
          "L'association met en oeuvre des mesures organisationnelles et techniques raisonnables pour proteger les donnees personnelles contre la perte, l'acces non autorise, l'alteration ou la divulgation.",
          "La presente politique peut etre mise a jour pour tenir compte des evolutions legales, techniques ou organisationnelles. La date de mise a jour figure en haut de page.",
        ],
      },
    ],
  },
  "politique-cookies": {
    updatedAt: "Derniere mise a jour: 15 mars 2026",
    sections: [
      {
        title: "Cadre legal",
        paragraphs: [
          "L'utilisation des cookies et autres traceurs est encadree en France par l'article 82 de la loi Informatique et Libertes et, pour les donnees personnelles, par le RGPD.",
          "Les regles pratiques appliquees sur ce site s'appuient sur les lignes directrices et recommandations de la CNIL.",
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

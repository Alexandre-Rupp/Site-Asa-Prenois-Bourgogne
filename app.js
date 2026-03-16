const MEMBER_FORM_RESPONSE_URL =
  "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAAj12wxUMkFaVUkzNlEzTzdTRVVXMVJVS0NBNEFOVy4u";

const FORM_LINKS = {
  memberForm: MEMBER_FORM_RESPONSE_URL,
  raceForm: "https://forms.office.com/r/5s11Uy4fWP",
};

const races = [
  {
    id: "r1",
    name: "FUN RACING CAR",
    date: "10-11-12 avril 2026",
    track: "Meetings Circuit 2026",
  },
  {
    id: "r2",
    name: "CATERHAM",
    date: "17-18-19 avril 2026",
    track: "Meetings Circuit 2026",
  },
  {
    id: "r3",
    name: "HISTORIC TOUR",
    date: "24-25-26 avril 2026",
    track: "Meetings Circuit 2026",
  },
  {
    id: "r4",
    name: "CHAMPIONNAT DE France GT",
    date: "14-15-16-17 mai 2026",
    track: "Meetings Circuit 2026",
  },
  {
    id: "r5",
    name: "PORSCHE SPRINT CHALLENGE France",
    date: "29-30 mai 2026",
    track: "Meetings Circuit 2026",
  },
  {
    id: "r6",
    name: "GRAND PRIX DE L'AGE D'OR",
    date: "5-6-7-8 juin 2026",
    track: "Meetings Circuit 2026",
  },
  {
    id: "r7",
    name: "TROPHEE TOURISME ENDURANCE",
    date: "26-27-28 juin 2026",
    track: "Meetings Circuit 2026",
  },
  {
    id: "r8",
    name: "DIJON MOTORS CUP",
    date: "10-11-12-13 septembre 2026",
    track: "Meetings Circuit 2026",
  },
  {
    id: "r9",
    name: "LAMERA CUP",
    date: "16-17-18 octobre 2026",
    track: "Meetings Circuit 2026",
  },
  {
    id: "r10",
    name: "COUPE DE France DES CIRCUITS",
    date: "23-24-25 octobre 2026",
    track: "Meetings Circuit 2026",
  },
  {
    id: "r11",
    name: "2eme RALLYE NATIONAL DE BLIGNY SUR OUCHE",
    date: "08-09 mai 2026",
    track: "Meetings Rallye - Cote 2026",
  },
  {
    id: "r12",
    name: "64eme COURSE DE COTE D'URCY",
    date: "25-26 juillet 2026",
    track: "Meetings Rallye - Cote 2026",
  },
  {
    id: "r13",
    name: "24eme RALLYE REGIONAL DE L'AUXOIS",
    date: "19 septembre 2025",
    track: "Meetings Rallye - Cote 2026",
  },
  {
    id: "r14",
    name: "Tour de Bourgogne Classic",
    date: "23-24-25 octobre 2026",
    track: "Meetings Rallye - Cote 2026",
  },
];

const newsFeed = [
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
];

const resultsFeed = [
  {
    title: "Meeting Test Pre-Saison",
    date: "31 janvier 2026",
    text: "42 officiels mobilises, 100% des postes couverts sur 2 jours.",
  },
  {
    title: "Challenge Club - Manche 1",
    date: "8 fevrier 2026",
    text: "Interventions piste: 6, incidents majeurs: 0, coordination operationnelle.",
  },
  {
    title: "Sprint Regional",
    date: "14 fevrier 2026",
    text: "Debrief positif de la direction de course sur la rapidite des interventions.",
  },
];

const byId = (id) => document.getElementById(id);
const MONTH_INDEX = {
  janvier: 0,
  fevrier: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  aout: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  decembre: 11,
};

const DEFAULT_ROUTE_HASH = "#/accueil";
const DEFAULT_MEETING_FILTER = "all";
const MEETING_FILTER_OPTIONS = [
  { value: "all", label: "Tous" },
  { value: "circuit", label: "Circuit" },
  { value: "rallye", label: "Rallye" },
  { value: "course-de-cote", label: "Course de cote" },
];
const DEFAULT_VEHICLE_TYPE_FILTER = "modernes";
const VEHICLE_TYPE_FILTER_OPTIONS = [
  { value: "modernes", label: "MODERNES" },
  { value: "vhc", label: "VHC" },
  { value: "vhrs", label: "VHRS" },
  { value: "vmrs", label: "VMRS" },
];
const MEETING_BACKGROUND_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif"];
const MEETING_BACKGROUND_ASSET_VERSION = "20260316-3";
const MEETING_EXTERNAL_URLS = {
  r11: "https://rallyedeblignysurouche.fr/",
};
const COMMISSAIRE_MEETING_DOCUMENTS = {
  r3: [
    {
      title: "Horaires Historic Tour Dijon 2026",
      description: "Document horaires officiel - Historic Tour.",
      href: "assets/documents/horaires-historic-tour-dijon-2026.pdf",
      ctaLabel: "Ouvrir le document",
    },
    {
      title: "Lettre d'informations concurrents Historic Tour Dijon 2026",
      description: "Lettre d'informations concurrents - Historic Tour.",
      href: "assets/documents/lettre-informations-concurrents-historic-tour-dijon-2026.pdf",
      ctaLabel: "Ouvrir le document",
    },
  ],
};
const MEETING_PROMOTER_LOGOS = {
  r1: { src: "assets/promoters/fun-racing-cars.png", alt: "Logo Fun Racing Cars" },
  r3: { src: "assets/promoters/hvm.png", alt: "Logo HVM" },
  r4: {
    src: "assets/promoters/gt4.png",
    alt: "Logo Championnat de France GT4",
  },
  r5: {
    src: "assets/promoters/porsche-driving-emotion.png",
    alt: "Logo Porsche Sprint Challenge",
  },
  r6: { src: "assets/promoters/peter-auto.jpg", alt: "Logo Peter Auto" },
  r7: { src: "assets/promoters/tte-2016.png", alt: "Logo Trophee Tourisme Endurance" },
  r8: { src: "assets/promoters/hvm.png", alt: "Logo HVM" },
  r9: { src: "assets/promoters/lamera-cup.png", alt: "Logo Lamera Cup" },
  r10: {
    src: "assets/promoters/coupe-de-france-des-circuits.jpg",
    alt: "Logo Coupe de France des Circuits",
  },
};
const meetingFilterState = {
  commissaire: DEFAULT_MEETING_FILTER,
  pilote: DEFAULT_MEETING_FILTER,
};
const pilotMeetingVehicleFilterState = {
  rallye: DEFAULT_VEHICLE_TYPE_FILTER,
  "course-de-cote": DEFAULT_VEHICLE_TYPE_FILTER,
};
const meetingBackgroundPathCache = new Map();
let accueilCountdownIntervalId = null;

const byId = (id) => document.getElementById(id);

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderFeedItems(items) {
  return items
    .map(
      (item) => `
      <article class="feed-item">
        <p class="small">${escapeHtml(item.date)}</p>
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.text)}</p>
      </article>
    `
    )
    .join("");
}

function renderPartnerCards(partners) {
  return (partners || [])
    .map(
      (partner) => `
        <article class="partner-card">
          ${
            partner.logo
              ? `
                <div class="partner-logo-wrap">
                  <img
                    class="partner-logo"
                    src="${escapeHtml(partner.logo)}"
                    alt="Logo ${escapeHtml(partner.name)}"
                    loading="lazy"
                  />
                </div>
              `
              : ""
          }
          <h3>${escapeHtml(partner.name)}</h3>
        </article>
      `
    )
    .join("");
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getRaceKind(race) {
  const searchableText = normalizeText(`${race.name} ${race.track}`);

  if (searchableText.includes("course de cote")) {
    return "cote";
  }

  if (searchableText.includes("rallye")) {
    return "rallye";
  }

  return "circuit";
}

function getRaceKindDisplay(kind) {
  if (kind === "rallye") return "Rallye";
  if (kind === "cote") return "Course de cote";
  return "Circuit";
}

function getActiveRaceFilter() {
  const activeFilter = byId("race-filter")?.querySelector(
    ".race-filter-btn.is-active"
  );
  return activeFilter?.dataset.filter || "all";
}

function parseMeetingDate(dateLabel) {
  const lower = String(dateLabel || "").toLowerCase();
  const firstDayMatch = lower.match(/\d{1,2}/);
  const yearMatch = lower.match(/\b(20\d{2})\b/);
  const monthEntry =
    Object.entries(MONTH_INDEX).find(([name]) => lower.includes(name)) || [];

  const month = Number.isInteger(monthEntry[1]) ? monthEntry[1] : 11;
  const day = firstDayMatch ? Number.parseInt(firstDayMatch[0], 10) : 31;
  const year = yearMatch ? Number.parseInt(yearMatch[1], 10) : 2999;

  return new Date(year, month, day).getTime();
}

function getSortedRaces() {
  const sortMode = byId("race-sort")?.value || "date-asc";
  const filterMode = getActiveRaceFilter();
  const cloned = races.filter((race) => {
    if (filterMode === "all") return true;
    return getRaceKind(race) === filterMode;
  });

  if (!typeFilter || typeFilter === "all") {
    return meetings;
  }

  return meetings.filter((meeting) => meeting.kind === typeFilter);
}

function meetingKindLabel(kind) {
  if (kind === "rallye") return "Rallye";
  if (kind === "course-de-cote") return "Course de cote";
  return "Circuit";
}

function meetingKindClass(kind) {
  if (kind === "rallye") return "race-card--rallye";
  if (kind === "course-de-cote") return "race-card--cote";
  return "race-card--circuit";
}

function meetingDetailHref(profileKey, meetingId) {
  return `#/meetings/${profileKey}/${encodeURIComponent(meetingId)}`;
}

function getMeetingExternalUrl(meetingId) {
  return MEETING_EXTERNAL_URLS[meetingId] || "";
}

function getMeetingPromoterLogo(meetingId) {
  return MEETING_PROMOTER_LOGOS[meetingId] || null;
}

function slugifyAssetBaseName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function compactAssetBaseName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

function getMeetingBackgroundBaseNames(meeting) {
  const rawName = String(meeting?.name || "").trim();
  const slugName = slugifyAssetBaseName(rawName);
  const compactName = compactAssetBaseName(rawName);
  const hyphenated = rawName.replace(/\s+/g, "-");
  const underscored = rawName.replace(/\s+/g, "_");

  const names = [
    meeting?.id || "",
    rawName,
    rawName.toLowerCase(),
    hyphenated,
    underscored,
    slugName,
    compactName,
    `${meeting?.id || ""}-${slugName}`,
  ];

  return [...new Set(names.filter(Boolean))];
}

function getMeetingBackgroundCandidates(meeting) {
  const baseNames = getMeetingBackgroundBaseNames(meeting);
  const candidates = [];
  const folders = ["assets/meetings", "assets"];

  folders.forEach((folder) => {
    baseNames.forEach((baseName) => {
      MEETING_BACKGROUND_EXTENSIONS.forEach((ext) => {
        candidates.push(`${folder}/${baseName}.${ext}`);
      });
    });
  });

  return candidates;
}

function imageExists(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

async function resolveMeetingBackgroundPath(meeting) {
  if (!meeting?.id) return null;

  if (meetingBackgroundPathCache.has(meeting.id)) {
    return meetingBackgroundPathCache.get(meeting.id);
  }

  const candidates = getMeetingBackgroundCandidates(meeting);

  for (const candidate of candidates) {
    // Probe local files and keep the first existing image for this meeting.
    const exists = await imageExists(candidate);
    if (exists) {
      meetingBackgroundPathCache.set(meeting.id, candidate);
      return candidate;
    }
  }

  meetingBackgroundPathCache.set(meeting.id, null);
  return null;
}

async function applyMeetingHeroBackground(meetingId) {
  const hero = document.querySelector(".js-meeting-hero");
  if (!hero) return;

  const meeting = MEETINGS.find((entry) => entry.id === meetingId);
  if (!meeting) {
    hero.classList.remove("hero--meeting-has-image");
    hero.style.removeProperty("--meeting-hero-image");
    return;
  }

  hero.dataset.bgMeetingId = meeting.id;
  const resolvedPath = await resolveMeetingBackgroundPath(meeting);

  if (!hero.isConnected || hero.dataset.bgMeetingId !== meeting.id) {
    return;
  }

  return cloned;
}

function renderKpis() {
  const racesEl = byId("kpi-races");
  if (racesEl) {
    racesEl.textContent = String(races.length);
  }
}

function renderFeed(listId, items) {
  const root = byId(listId);
  if (!root) return;
  const feedLabel = listId === "news-list" ? "Actu" : "Resultat";

  root.innerHTML = items
    .map(
      (item) => `
      <article class="feed-item">
        <p class="feed-label">${feedLabel}</p>
        <p class="small">${escapeHtml(item.date)}</p>
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.text)}</p>
      </article>

      <article class="doc-card">
        <h3>Documents specifiques - ${escapeHtml(currentVehicleType.toUpperCase())}</h3>
        <ul class="doc-list">
          ${renderListItems(vehicleDocs.documents)}
        </ul>
      </article>

      ${
        vehicleDocs.observations && vehicleDocs.observations.length
          ? `
            <article class="doc-card">
              <h3>Observations</h3>
              <ul class="doc-list">
                ${renderListItems(vehicleDocs.observations)}
              </ul>
            </article>
          `
          : ""
      }
    </div>
  `;
}

function renderPilotMeetingSpecificDocsContent(meetingDocs) {
  if (!meetingDocs) return "";

  grid.innerHTML = getSortedRaces()
    .map(
      (race) => {
        const raceKind = getRaceKind(race);
        const kind = getRaceKindDisplay(raceKind);
        const kindClass = `race-card--${raceKind}`;

        return `
        <article class="race-card ${kindClass}">
          <span class="race-kind">${kind}</span>
          <span class="race-date">${escapeHtml(race.date)}</span>
          <h3>${escapeHtml(race.name)}</h3>
          <p>${escapeHtml(race.track)}</p>
          <div class="race-meta">
            <span>Inscription</span>
            <span>Microsoft Forms</span>
          </div>
          <a
            class="btn btn-primary"
            href="${FORM_LINKS.raceForm}"
            target="_blank"
            rel="noopener noreferrer"
          >
            S'inscrire
          </a>

          <a class="profile-choice-card profile-choice-card--pilote" href="#/meetings/pilote">
            <span>PILOTE</span>
          </a>
        </div>
      </section>
    </div>
  `;
}

function renderMeetingsProfileView(profileKey) {
  const profile = PROFILE_CONTENT[profileKey];
  const currentFilter = meetingFilterState[profileKey] || DEFAULT_MEETING_FILTER;

  return `
    <div class="view-stack view-stack--meetings-profile">
      <section class="hero">
        <div class="hero-top-row">
          <p class="eyebrow season-pill">${escapeHtml(profile.seasonPill)}</p>
        </div>
        <h1>${escapeHtml(profile.heroTitle)}</h1>
        <p class="hero-sub">${escapeHtml(profile.heroSubtitle)}</p>
      </section>

      <section id="calendrier" class="section">
        <div class="section-head">
          <h2>${escapeHtml(profile.sections.calendarTitle)}</h2>
        </div>
        <div class="race-toolbar">
          <label>Type de meeting</label>
          <div class="meeting-filter-group" role="group" aria-label="Filtrer les meetings par type">
            ${MEETING_FILTER_OPTIONS.map(
              (option) => `
                <button
                  type="button"
                  class="filter-btn js-meeting-filter-btn ${
                    currentFilter === option.value ? "is-active" : ""
                  }"
                  data-filter-value="${escapeHtml(option.value)}"
                  aria-pressed="${
                    currentFilter === option.value ? "true" : "false"
                  }"
                >
                  ${escapeHtml(option.label)}
                </button>
              `
            ).join("")}
          </div>
        </div>
        <div id="race-grid" class="race-grid"></div>
      </section>

      <section id="actualites" class="section dual">
        <div>
          <div class="section-head">
            <h2>${escapeHtml(profile.sections.newsTitle)}</h2>
          </div>
          <div class="feed-list">${renderFeedItems(profile.newsFeed)}</div>
        </div>
        <div>
          <div class="section-head">
            <h2>${escapeHtml(profile.sections.resultsTitle)}</h2>
          </div>
          <div class="feed-list">${renderFeedItems(profile.resultsFeed)}</div>
        </div>
      </section>
    </div>
  `;
}

function renderMeetingCards(profileKey) {
  const profile = PROFILE_CONTENT[profileKey];
  const root = byId("race-grid");
  if (!root) return;

  const meetings = getVisibleMeetings(
    meetingFilterState[profileKey] || DEFAULT_MEETING_FILTER
  ).filter((meeting) =>
    profileKey === "pilote"
      ? canShowSignupForMeeting(profileKey, meeting)
      : true
  );

  root.innerHTML = meetings
    .map((meeting) => {
      const kindClass = meetingKindClass(meeting.kind);
      const raceFormUrl = getRaceFormUrl(profile, meeting.id);
      const canShowSignup = canShowSignupForMeeting(profileKey, meeting);
      const externalUrl = getMeetingExternalUrl(meeting.id);
      const detailHref = externalUrl || meetingDetailHref(profileKey, meeting.id);
      const detailLinkAttrs = externalUrl
        ? 'target="_blank" rel="noopener noreferrer"'
        : "";

      return `
        <article
          class="race-card ${kindClass} race-card--clickable js-meeting-card"
          tabindex="0"
          role="link"
          data-profile="${escapeHtml(profileKey)}"
          data-meeting-id="${escapeHtml(meeting.id)}"
          aria-label="Ouvrir le detail du meeting ${escapeHtml(meeting.name)}"
        >
          <p class="race-meta-line">
            ${escapeHtml(meetingKindLabel(meeting.kind))} · ${escapeHtml(
              meeting.date
            )}
          </p>
          <h3>${escapeHtml(meeting.name)}</h3>
          <p>${escapeHtml(meeting.seasonLabel)}</p>
          <p>${escapeHtml(meeting.location)}</p>
          <div class="race-actions">
            ${
              canShowSignup
                ? `
                  <a
                    class="btn btn-primary race-signup-link"
                    href="${escapeHtml(raceFormUrl)}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    S'inscrire
                  </a>
                `
                : ""
            }
            <a class="btn btn-ghost" href="${escapeHtml(detailHref)}" ${detailLinkAttrs}>
              Voir le detail
            </a>
          </div>
        </article>
      `;
    })
    .join("");
}

function bindMeetingsProfileEvents(profileKey) {
  const filterButtons = Array.from(
    document.querySelectorAll(".js-meeting-filter-btn")
  );
  const raceGrid = byId("race-grid");

  const updateFilterButtonsState = () => {
    const currentFilter = meetingFilterState[profileKey] || DEFAULT_MEETING_FILTER;
    filterButtons.forEach((button) => {
      const isActive = button.dataset.filterValue === currentFilter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  if (filterButtons.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const nextFilter = button.dataset.filterValue || DEFAULT_MEETING_FILTER;
        meetingFilterState[profileKey] = nextFilter;
        updateFilterButtonsState();
        renderMeetingCards(profileKey);
      });
    });
    updateFilterButtonsState();
  }

  if (raceGrid) {
    raceGrid.addEventListener("click", (event) => {
      const card = event.target.closest(".js-meeting-card");
      if (!card) return;

      if (event.target.closest("a,button,input,select,textarea")) {
        return;
      }

      const cardProfile = card.dataset.profile;
      const meetingId = card.dataset.meetingId;
      if (!cardProfile || !meetingId) return;

      const externalUrl = getMeetingExternalUrl(meetingId);
      if (externalUrl) {
        window.open(externalUrl, "_blank", "noopener,noreferrer");
        return;
      }

      window.location.hash = meetingDetailHref(cardProfile, meetingId);
    });

    raceGrid.addEventListener("keydown", (event) => {
      const card = event.target.closest(".js-meeting-card");
      if (!card) return;

      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      const cardProfile = card.dataset.profile;
      const meetingId = card.dataset.meetingId;
      if (!cardProfile || !meetingId) return;

      const externalUrl = getMeetingExternalUrl(meetingId);
      if (externalUrl) {
        window.open(externalUrl, "_blank", "noopener,noreferrer");
        return;
      }

      window.location.hash = meetingDetailHref(cardProfile, meetingId);
    });
  }

  renderMeetingCards(profileKey);
}

function bindEvents() {
  const sortInput = byId("race-sort");
  if (sortInput) {
    sortInput.addEventListener("change", renderRaces);
  }

  const filterRoot = byId("race-filter");
  if (filterRoot) {
    filterRoot.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) return;
      const clickedButton = event.target.closest(".race-filter-btn");
      if (!clickedButton || !filterRoot.contains(clickedButton)) return;

      filterRoot.querySelectorAll(".race-filter-btn").forEach((button) => {
        const isActive = button === clickedButton;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      renderRaces();
    });
  }
}

function mount() {
  if (!window.location.hash) {
    window.location.hash = DEFAULT_ROUTE_HASH;
  }

  renderCurrentRoute();
  window.addEventListener("hashchange", renderCurrentRoute);
}

mount();

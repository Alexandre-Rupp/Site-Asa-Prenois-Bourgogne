const TARGET_MEMBERS = 200;

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

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setLink(id, href) {
  const el = byId(id);
  if (!el) return;
  el.href = href;
}

function getRaceKind(race) {
  return race.track.includes("Rallye") ? "rallye" : "circuit";
}

function parseRaceDate(dateLabel) {
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
  const cloned = [...races];

  if (sortMode === "date-asc") {
    return cloned.sort((a, b) => parseRaceDate(a.date) - parseRaceDate(b.date));
  }

  if (sortMode === "date-desc") {
    return cloned.sort((a, b) => parseRaceDate(b.date) - parseRaceDate(a.date));
  }

  if (sortMode === "name-asc") {
    return cloned.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }

  if (sortMode === "name-desc") {
    return cloned.sort((a, b) => b.name.localeCompare(a.name, "fr"));
  }

  if (sortMode === "type-circuit") {
    return cloned.sort((a, b) => getRaceKind(a).localeCompare(getRaceKind(b)));
  }

  if (sortMode === "type-rallye") {
    return cloned.sort((a, b) => getRaceKind(b).localeCompare(getRaceKind(a)));
  }

  return cloned;
}

function renderKpis() {
  byId("kpi-races").textContent = String(races.length);
  byId("kpi-members").textContent = String(TARGET_MEMBERS);
  byId("kpi-signups").textContent = "Forms";
}

function renderFeed(listId, items) {
  const root = byId(listId);
  if (!root) return;

  root.innerHTML = items
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

function renderRaces() {
  const grid = byId("race-grid");
  if (!grid) return;

  grid.innerHTML = getSortedRaces()
    .map(
      (race) => {
        const isRallye = getRaceKind(race) === "rallye";
        const kind = isRallye ? "Rallye" : "Circuit";
        const kindClass = isRallye ? "race-card--rallye" : "race-card--circuit";

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
        </article>
      `;
      }
    )
    .join("");
}

function injectMainLinks() {
  setLink("member-form-link", FORM_LINKS.memberForm);
  setLink("race-form-link", FORM_LINKS.raceForm);
}

function bindEvents() {
  const sortInput = byId("race-sort");
  if (!sortInput) return;
  sortInput.addEventListener("change", renderRaces);
}

function mount() {
  renderKpis();
  renderRaces();
  renderFeed("news-list", newsFeed);
  renderFeed("results-list", resultsFeed);
  injectMainLinks();
  bindEvents();
}

mount();

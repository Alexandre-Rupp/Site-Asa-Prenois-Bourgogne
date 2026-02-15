import { animate, svg } from "https://esm.sh/animejs";
const DECOR_PATH_SELECTOR = "#hero-track-path";
const DECOR_CAR_SELECTOR = ".hero-track-car";

// Animate the transforms properties of .car the motion path values
const carAnimation = animate(DECOR_CAR_SELECTOR, {
  ease: "linear",
  duration: 5000,
  loop: true,
  ...svg.createMotionPath(DECOR_PATH_SELECTOR),
});

// Line drawing animation following the motion path values
// For demo aesthetic only
animate(svg.createDrawable(DECOR_PATH_SELECTOR), {
  draw: "0 1",
  ease: "linear",
  duration: 5000,
  loop: true,
});
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
    name: "Coupe de France des Circuits",
    date: "10-12 avril 2026",
    track: "Circuit Dijon-Prenois",
  },
  {
    id: "r2",
    name: "Historic Tour",
    date: "2-4 mai 2026",
    track: "Circuit Dijon-Prenois",
  },
  {
    id: "r3",
    name: "GT4 France",
    date: "15-17 mai 2026",
    track: "Circuit Dijon-Prenois",
  },
  {
    id: "r4",
    name: "TTE Endurance",
    date: "3-5 juillet 2026",
    track: "Circuit Dijon-Prenois",
  },
  {
    id: "r5",
    name: "Course de cote d'Urcy",
    date: "25-26 juillet 2026",
    track: "Urcy",
  },
  {
    id: "r6",
    name: "Grand Prix de l'Age d'Or",
    date: "5-7 juin 2026",
    track: "Circuit Dijon-Prenois",
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

  grid.innerHTML = races
    .map(
      (race) => `
        <article class="race-card">
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
            S'inscrire a cette course
          </a>
        </article>
      `
    )
    .join("");
}

function injectMainLinks() {
  setLink("member-form-link", FORM_LINKS.memberForm);
  setLink("race-form-link", FORM_LINKS.raceForm);
}

function mount() {
  renderKpis();
  renderRaces();
  renderFeed("news-list", newsFeed);
  renderFeed("results-list", resultsFeed);
  injectMainLinks();
}

mount();

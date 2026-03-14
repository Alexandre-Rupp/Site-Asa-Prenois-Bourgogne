import {
  CONTACT_PAGE_CONTENT,
  MEETINGS,
  MEETING_DETAIL_SECTIONS,
  NAV_ITEMS,
  PAGE_SKELETONS,
  PROFILE_CONTENT,
  TARGET_YEAR,
} from "./site-data.js";

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
const meetingFilterState = {
  commissaire: DEFAULT_MEETING_FILTER,
  pilote: DEFAULT_MEETING_FILTER,
};
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

function normalizeHash(hashValue) {
  const withoutHash = String(hashValue || "").replace(/^#/, "").trim();
  if (!withoutHash) return "/accueil";

  const withLeadingSlash = withoutHash.startsWith("/")
    ? withoutHash
    : `/${withoutHash}`;

  const collapsed = withLeadingSlash.replace(/\/+/g, "/");
  if (collapsed === "/") return "/accueil";

  return collapsed.endsWith("/") ? collapsed.slice(0, -1) : collapsed;
}

function parseRoute() {
  const normalizedPath = normalizeHash(window.location.hash);
  const segments = normalizedPath
    .split("/")
    .filter(Boolean)
    .map((part) => decodeURIComponent(part));

  if (segments.length === 0 || segments[0] === "accueil") {
    return { type: "accueil", navKey: "accueil" };
  }

  if (segments[0] === "meetings") {
    if (!segments[1]) {
      return { type: "meetings-choice", navKey: "meetings" };
    }

    if (!PROFILE_CONTENT[segments[1]]) {
      return { type: "not-found", navKey: "meetings" };
    }

    if (!segments[2]) {
      return {
        type: "meetings-profile",
        navKey: "meetings",
        profileKey: segments[1],
      };
    }

    return {
      type: "meeting-detail",
      navKey: "meetings",
      profileKey: segments[1],
      meetingId: segments[2],
    };
  }

  if (PAGE_SKELETONS[segments[0]]) {
    return { type: "page", navKey: segments[0], pageKey: segments[0] };
  }

  return { type: "not-found", navKey: "accueil" };
}

function updateActiveNav(navKey) {
  document.querySelectorAll(".main-nav a[data-nav]").forEach((link) => {
    const isActive = link.dataset.nav === navKey;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
      return;
    }

    link.removeAttribute("aria-current");
  });
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

function getChronologicalMeetings() {
  return [...MEETINGS].sort(
    (a, b) => parseMeetingDate(a.date) - parseMeetingDate(b.date)
  );
}

function getNextMeeting() {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  return (
    getChronologicalMeetings().find(
      (meeting) => parseMeetingDate(meeting.date) + oneDayMs > now
    ) || null
  );
}

function getVisibleMeetings(typeFilter) {
  const meetings = getChronologicalMeetings();

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

function meetingKindBadgeClass(kind) {
  if (kind === "rallye") return "kind-chip--rallye";
  if (kind === "course-de-cote") return "kind-chip--cote";
  return "kind-chip--circuit";
}

function meetingKindClass(kind) {
  if (kind === "rallye") return "race-card--rallye";
  if (kind === "course-de-cote") return "race-card--cote";
  return "race-card--circuit";
}

function meetingDetailHref(profileKey, meetingId) {
  return `#/meetings/${profileKey}/${encodeURIComponent(meetingId)}`;
}

function renderAccueilView() {
  const nextMeeting = getNextMeeting();
  const timelineMeetings = getChronologicalMeetings();

  return `
    <div class="view-stack">
      <section class="hero">
        <div class="hero-top-row">
          <p class="eyebrow season-pill">Saison ${escapeHtml(TARGET_YEAR)}</p>
        </div>
        <h1>Bienvenue sur le portail ASAC Bourgogne</h1>
        <p class="hero-sub">
          Cette base integre maintenant une navigation complete du site et un
          espace Meetings structure par profil utilisateur.
        </p>
        <div class="hero-cta">
          <a href="#/meetings" class="btn btn-primary">Entrer dans les meetings</a>
          <a href="#/contact" class="btn btn-ghost">Nous contacter</a>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Compte a rebours jusqu'au prochain meeting</h2>
        </div>
        ${
          nextMeeting
            ? `
              <article
                class="countdown-panel"
                id="accueil-countdown"
                data-target-ts="${parseMeetingDate(nextMeeting.date)}"
              >
                <div class="countdown-head">
                  <p class="small">Prochain meeting</p>
                  <h3>${escapeHtml(nextMeeting.name)}</h3>
                  <p>${escapeHtml(nextMeeting.date)} · ${escapeHtml(nextMeeting.location)}</p>
                </div>
                <div class="countdown-grid">
                  <article>
                    <span data-countdown-unit="days">00</span>
                    <small>Jours</small>
                  </article>
                  <article>
                    <span data-countdown-unit="hours">00</span>
                    <small>Heures</small>
                  </article>
                  <article>
                    <span data-countdown-unit="minutes">00</span>
                    <small>Minutes</small>
                  </article>
                  <article>
                    <span data-countdown-unit="seconds">00</span>
                    <small>Secondes</small>
                  </article>
                </div>
                <p class="countdown-note" data-countdown-note></p>
              </article>
            `
            : `
              <article class="panel">
                <p>Aucun meeting a venir n'a ete trouve.</p>
              </article>
            `
        }
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Timeline des meetings ${escapeHtml(TARGET_YEAR)}</h2>
          <p>Tous les meetings de l'annee, classes par date.</p>
        </div>
        <ol class="meeting-timeline">
          ${timelineMeetings
            .map(
              (meeting) => `
                <li class="timeline-item">
                  <span class="timeline-dot" aria-hidden="true"></span>
                  <article class="timeline-card">
                    <p class="timeline-date">${escapeHtml(meeting.date)}</p>
                    <h3>${escapeHtml(meeting.name)}</h3>
                    <p>${escapeHtml(meeting.location)}</p>
                    <div class="timeline-meta">
                      <span class="kind-chip ${meetingKindBadgeClass(meeting.kind)}">${escapeHtml(
                        meetingKindLabel(meeting.kind)
                      )}</span>
                      <span>${escapeHtml(meeting.seasonLabel)}</span>
                    </div>
                  </article>
                </li>
              `
            )
            .join("")}
        </ol>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Acces rapide</h2>
          <p>Choisissez une section principale du site.</p>
        </div>
        <div class="home-grid">
          ${NAV_ITEMS.filter((item) => item.key !== "accueil")
            .map(
              (item) => `
                <a class="home-card" href="${escapeHtml(item.href)}">
                  <h3>${escapeHtml(item.label)}</h3>
                  <p>Ouvrir la page ${escapeHtml(item.label.toLowerCase())}.</p>
                </a>
              `
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function clearAccueilCountdown() {
  if (accueilCountdownIntervalId === null) return;
  clearInterval(accueilCountdownIntervalId);
  accueilCountdownIntervalId = null;
}

function bindAccueilCountdown() {
  const countdownRoot = byId("accueil-countdown");
  if (!countdownRoot) return;

  const targetTs = Number.parseInt(countdownRoot.dataset.targetTs || "", 10);
  if (!Number.isFinite(targetTs)) return;

  const daysEl = countdownRoot.querySelector('[data-countdown-unit="days"]');
  const hoursEl = countdownRoot.querySelector('[data-countdown-unit="hours"]');
  const minutesEl = countdownRoot.querySelector(
    '[data-countdown-unit="minutes"]'
  );
  const secondsEl = countdownRoot.querySelector(
    '[data-countdown-unit="seconds"]'
  );
  const noteEl = countdownRoot.querySelector("[data-countdown-note]");
  const oneDayMs = 24 * 60 * 60 * 1000;

  const updateCountdown = () => {
    const now = Date.now();
    const remainingMs = targetTs - now;

    if (remainingMs <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";

      if (noteEl) {
        if (targetTs + oneDayMs > now) {
          noteEl.textContent = "Le prochain meeting demarre aujourd'hui.";
        } else {
          noteEl.textContent = "Le compte a rebours est termine.";
        }
      }

      return;
    }

    const totalSeconds = Math.floor(remainingMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
    if (noteEl) noteEl.textContent = "Jusqu'au premier jour du meeting.";
  };

  updateCountdown();
  clearAccueilCountdown();
  accueilCountdownIntervalId = window.setInterval(updateCountdown, 1000);
}

function renderMeetingsChoiceView() {
  return `
    <div class="view-stack">
      <section class="hero">
        <div class="hero-top-row">
          <p class="eyebrow season-pill">LES MEETINGS</p>
        </div>
        <h1>Choisissez votre parcours</h1>
        <p class="hero-sub">
          Avant d'acceder au calendrier, selectionnez le profil adapte a votre
          besoin pour afficher les contenus et formulaires correspondants.
        </p>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Je suis...</h2>
          <p>Selection simple et visible pour separer les parcours.</p>
        </div>
        <div class="profile-choice-grid">
          <a class="profile-choice-card" href="#/meetings/commissaire">
            <h3>Je suis commissaire</h3>
            <p>
              Calendrier et formulaires destines aux commissaires de piste.
            </p>
            <span class="btn btn-primary">Acceder au parcours commissaire</span>
          </a>

          <a class="profile-choice-card" href="#/meetings/pilote">
            <h3>Je suis pilote</h3>
            <p>
              Calendrier et formulaires dedies au parcours pilote, avec contenus
              specifiques.
            </p>
            <span class="btn btn-primary">Acceder au parcours pilote</span>
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
    <div class="view-stack">
      <section class="hero">
        <div class="hero-top-row">
          <p class="eyebrow season-pill">${escapeHtml(profile.seasonPill)}</p>
        </div>
        <h1>${escapeHtml(profile.heroTitle)}</h1>
        <p class="hero-sub">${escapeHtml(profile.heroSubtitle)}</p>
        <div class="hero-cta">
          <button
            type="button"
            class="btn btn-ghost js-scroll-btn"
            data-target-id="calendrier"
          >
            ${escapeHtml(profile.ctaSecondaryLabel)}
          </button>
        </div>
        <div class="hero-kpis">
          <article>
            <span>${MEETINGS.length}</span>
            <small>Meetings prevus</small>
          </article>
          <article>
            <span>${escapeHtml(profile.targetMembers)}</span>
            <small>${escapeHtml(profile.label)}s cibles</small>
          </article>
          <article>
            <span>Forms</span>
            <small>Mode inscriptions</small>
          </article>
        </div>
      </section>

      <section id="calendrier" class="section">
        <div class="section-head">
          <h2>${escapeHtml(profile.sections.calendarTitle)}</h2>
        </div>
        <div class="race-toolbar">
          <label for="meeting-type-filter">Type de meeting</label>
          <select id="meeting-type-filter" aria-label="Filtrer les meetings par type">
            <option value="all" ${
              currentFilter === "all" ? "selected" : ""
            }>Tous</option>
            <option value="circuit" ${
              currentFilter === "circuit" ? "selected" : ""
            }>Circuit</option>
            <option value="rallye" ${
              currentFilter === "rallye" ? "selected" : ""
            }>Rallye</option>
            <option value="course-de-cote" ${
              currentFilter === "course-de-cote" ? "selected" : ""
            }>Course de cote</option>
          </select>
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
  );
  root.innerHTML = meetings
    .map((meeting) => {
      const kindClass = meetingKindClass(meeting.kind);

      return `
        <article
          class="race-card ${kindClass} race-card--clickable js-meeting-card"
          tabindex="0"
          role="link"
          data-profile="${escapeHtml(profileKey)}"
          data-meeting-id="${escapeHtml(meeting.id)}"
          aria-label="Ouvrir le detail du meeting ${escapeHtml(meeting.name)}"
        >
          <span class="race-kind">${meetingKindLabel(meeting.kind)}</span>
          <span class="race-date">${escapeHtml(meeting.date)}</span>
          <h3>${escapeHtml(meeting.name)}</h3>
          <p>${escapeHtml(meeting.seasonLabel)}</p>
          <p>${escapeHtml(meeting.location)}</p>
          <div class="race-actions">
            <a
              class="btn btn-primary race-signup-link"
              href="${escapeHtml(profile.forms.raceForm)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              S'inscrire
            </a>
            <a class="btn btn-ghost" href="${escapeHtml(meetingDetailHref(profileKey, meeting.id))}">
              Voir le detail
            </a>
          </div>
        </article>
      `;
    })
    .join("");
}

function bindMeetingsProfileEvents(profileKey) {
  const typeFilterSelect = byId("meeting-type-filter");
  const raceGrid = byId("race-grid");

  if (typeFilterSelect) {
    typeFilterSelect.addEventListener("change", () => {
      meetingFilterState[profileKey] = typeFilterSelect.value;
      renderMeetingCards(profileKey);
    });
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

      window.location.hash = meetingDetailHref(cardProfile, meetingId);
    });
  }

  document.querySelectorAll(".js-scroll-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.targetId;
      if (!targetId) return;
      const target = byId(targetId);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  renderMeetingCards(profileKey);
}

function renderMeetingDetailView(profileKey, meetingId) {
  const profile = PROFILE_CONTENT[profileKey];
  const meeting = MEETINGS.find((entry) => entry.id === meetingId);

  if (!profile || !meeting) {
    return `
      <div class="view-stack">
        <section class="section">
          <div class="section-head">
            <h2>Meeting introuvable</h2>
            <p>
              Le meeting demande n'existe pas ou son identifiant est invalide.
            </p>
          </div>
          <a href="#/meetings" class="btn btn-primary">Retour aux meetings</a>
        </section>
      </div>
    `;
  }

  return `
    <div class="view-stack">
      <section class="hero">
        <div class="hero-top-row">
          <p class="eyebrow season-pill">DETAIL MEETING</p>
        </div>
        <h1>${escapeHtml(meeting.name)}</h1>
        <p class="hero-sub">
          Page detaillee du meeting pour le parcours ${escapeHtml(
            profile.label.toLowerCase()
          )}. Cette base est prete pour accueillir PDF et documents de reference.
        </p>
        <div class="hero-cta">
          <a
            class="btn btn-primary"
            href="${escapeHtml(profile.forms.raceForm)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Formulaire ${escapeHtml(profile.label.toLowerCase())}
          </a>
          <a href="#/meetings/${escapeHtml(profileKey)}" class="btn btn-ghost"
            >Retour au calendrier</a
          >
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Informations meeting</h2>
        </div>
        <div class="meeting-meta-grid">
          <article class="meeting-meta-card">
            <h3>Date</h3>
            <p>${escapeHtml(meeting.date)}</p>
          </article>
          <article class="meeting-meta-card">
            <h3>Type</h3>
            <p>${escapeHtml(meetingKindLabel(meeting.kind))}</p>
          </article>
          <article class="meeting-meta-card">
            <h3>Serie</h3>
            <p>${escapeHtml(meeting.seasonLabel)}</p>
          </article>
          <article class="meeting-meta-card">
            <h3>Lieu</h3>
            <p>${escapeHtml(meeting.location)}</p>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Documents et ressources</h2>
          <p>
            Cette zone est preparee pour les futurs PDF (roadbooks, horaires,
            organisation et annexes).
          </p>
        </div>
        <div class="meeting-doc-grid">
          ${MEETING_DETAIL_SECTIONS.map(
            (section) => `
              <article class="doc-card">
                <h3>${escapeHtml(section.title)}</h3>
                <p>${escapeHtml(section.description)}</p>
                <span class="badge pending">A completer</span>
              </article>
            `
          ).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderSkeletonPage(pageKey) {
  const page = PAGE_SKELETONS[pageKey];

  if (!page) {
    return `
      <div class="view-stack">
        <section class="section">
          <div class="section-head">
            <h2>Page indisponible</h2>
          </div>
          <a href="#/accueil" class="btn btn-primary">Retour a l'accueil</a>
        </section>
      </div>
    `;
  }

  if (pageKey === "contact") {
    return `
      <div class="view-stack">
        <section class="hero">
          <div class="hero-top-row">
            <p class="eyebrow season-pill">${escapeHtml(page.title)}</p>
          </div>
          <h1>${escapeHtml(page.title)}</h1>
          <p class="hero-sub">${escapeHtml(page.intro)}</p>
        </section>

        <section class="section">
          <div class="section-head">
            <h2>${escapeHtml(CONTACT_PAGE_CONTENT.officeHoursTitle)}</h2>
          </div>
          <article class="panel">
            <ul class="hours-list">
              ${CONTACT_PAGE_CONTENT.officeHours.map(
                (entry) => `
                  <li>
                    <strong>${escapeHtml(entry.day)}:</strong>
                    <span>${escapeHtml(entry.hours)}</span>
                  </li>
                `
              ).join("")}
            </ul>
          </article>
        </section>

        <section class="section">
          <div class="section-head">
            <h2>${escapeHtml(CONTACT_PAGE_CONTENT.contactTitle)}</h2>
          </div>
          <article class="panel contact-panel">
            <p>Adresse email a copier/coller :</p>
            <p class="contact-email">${escapeHtml(CONTACT_PAGE_CONTENT.email)}</p>
          </article>
        </section>
      </div>
    `;
  }

  if (
    pageKey === "commissaires" &&
    page.commissionerParagraphs &&
    page.commissionerParagraphs.length
  ) {
    return `
      <div class="view-stack">
        <section class="hero">
          <div class="hero-top-row">
            <p class="eyebrow season-pill">${escapeHtml(page.title)}</p>
          </div>
          <h1>${escapeHtml(page.title)}</h1>
          <p class="hero-sub">${escapeHtml(page.intro)}</p>
        </section>

        <section class="section">
          <div class="section-head">
            <h2>${escapeHtml(page.commissionerTitle)}</h2>
          </div>
          <article class="panel narrative-panel">
            ${page.commissionerParagraphs
              .map(
                (paragraph) => `
                  <p>${escapeHtml(paragraph)}</p>
                `
              )
              .join("")}
          </article>
        </section>
      </div>
    `;
  }

  if (
    pageKey === "vie-asa" &&
    page.historyParagraphs &&
    page.historyParagraphs.length
  ) {
    return `
      <div class="view-stack">
        <section class="hero">
          <div class="hero-top-row">
            <p class="eyebrow season-pill">${escapeHtml(page.title)}</p>
          </div>
          <h1>${escapeHtml(page.title)}</h1>
          <p class="hero-sub">${escapeHtml(page.intro)}</p>
        </section>

        <section class="section">
          <div class="section-head">
            <h2>${escapeHtml(page.historyTitle)}</h2>
          </div>
          <article class="panel narrative-panel">
            ${page.historyParagraphs
              .map(
                (paragraph) => `
                  <p>${escapeHtml(paragraph)}</p>
                `
              )
              .join("")}
          </article>
        </section>
      </div>
    `;
  }

  return `
    <div class="view-stack">
      <section class="hero">
        <div class="hero-top-row">
          <p class="eyebrow season-pill">${escapeHtml(page.title)}</p>
        </div>
        <h1>${escapeHtml(page.title)}</h1>
        <p class="hero-sub">${escapeHtml(page.intro)}</p>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Contenu en preparation</h2>
          <p>
            Structure de page en place. Les contenus metier seront ajoutes dans
            une prochaine iteration.
          </p>
        </div>
      </section>
    </div>
  `;
}

function renderNotFoundView() {
  return `
    <div class="view-stack">
      <section class="section">
        <div class="section-head">
          <h2>Page introuvable</h2>
          <p>La route demandee n'existe pas.</p>
        </div>
        <a href="#/accueil" class="btn btn-primary">Retour a l'accueil</a>
      </section>
    </div>
  `;
}

function updateDocumentTitle(route) {
  const suffix = "ASAC Bourgogne";

  if (route.type === "accueil") {
    document.title = `Accueil | ${suffix}`;
    return;
  }

  if (route.type === "meetings-choice") {
    document.title = `Les Meetings | ${suffix}`;
    return;
  }

  if (route.type === "meetings-profile") {
    const profile = PROFILE_CONTENT[route.profileKey];
    document.title = `Meetings ${profile.label} | ${suffix}`;
    return;
  }

  if (route.type === "meeting-detail") {
    const meeting = MEETINGS.find((item) => item.id === route.meetingId);
    const label = meeting ? meeting.name : "Meeting";
    document.title = `${label} | ${suffix}`;
    return;
  }

  if (route.type === "page") {
    const page = PAGE_SKELETONS[route.pageKey];
    document.title = `${page.title} | ${suffix}`;
    return;
  }

  document.title = `Page introuvable | ${suffix}`;
}

function renderCurrentRoute() {
  const appRoot = byId("app");
  if (!appRoot) return;

  clearAccueilCountdown();

  const route = parseRoute();
  updateActiveNav(route.navKey);
  updateDocumentTitle(route);

  if (route.type === "accueil") {
    appRoot.innerHTML = renderAccueilView();
    bindAccueilCountdown();
    return;
  }

  if (route.type === "meetings-choice") {
    appRoot.innerHTML = renderMeetingsChoiceView();
    return;
  }

  if (route.type === "meetings-profile") {
    appRoot.innerHTML = renderMeetingsProfileView(route.profileKey);
    bindMeetingsProfileEvents(route.profileKey);
    return;
  }

  if (route.type === "meeting-detail") {
    appRoot.innerHTML = renderMeetingDetailView(route.profileKey, route.meetingId);
    return;
  }

  if (route.type === "page") {
    appRoot.innerHTML = renderSkeletonPage(route.pageKey);
    return;
  }

  appRoot.innerHTML = renderNotFoundView();
}

function mount() {
  if (!window.location.hash) {
    window.location.hash = DEFAULT_ROUTE_HASH;
  }

  renderCurrentRoute();
  window.addEventListener("hashchange", renderCurrentRoute);
}

mount();

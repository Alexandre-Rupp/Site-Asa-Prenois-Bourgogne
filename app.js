// Main application orchestrator: renders views and binds feature modules.
import {
  CONTACT_PAGE_CONTENT,
  LEGAL_PAGE_CONTENT,
  MEETINGS,
  MEETING_DETAIL_SECTIONS,
  NAV_ITEMS,
  PAGE_SKELETONS,
  PILOT_MEETING_DOCUMENTATION,
  PILOT_MEETING_DOCUMENTATION_BY_MEETING,
  PROFILE_CONTENT,
  TARGET_YEAR,
} from "./site-data.js?v=20260318-2";
import { parseRoute, updateDocumentTitle } from "./src/core/routing.js";
import {
  createTopbarMenuController,
  scrollPageToTop,
  updateActiveNav,
} from "./src/core/topbar-menu.js";
import { byId, escapeHtml } from "./src/utils/dom.js";

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
const MOBILE_NAV_BREAKPOINT = 980;
const FEED_CAROUSEL_AUTOPLAY_DELAY_MS = 4500;
const FEED_TEXT_PREVIEW_LENGTH = 170;
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
    src: "assets/promoters/porsche.png",
    alt: "Logo Porsche Sprint Challenge France",
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
let topbarHeightRafId = null;
let topbarMenuController = null;
const feedCarouselAutoPlayIntervalIds = new Set();
let accueilCountdownIntervalId = null;

// Shared rendering helpers.
function normalizeTextContent(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function createFeedPreviewText(fullText, maxLength = FEED_TEXT_PREVIEW_LENGTH) {
  if (!fullText || fullText.length <= maxLength) return fullText;

  const clipped = fullText.slice(0, maxLength);
  const safeBoundary = clipped.lastIndexOf(" ");
  const preview = safeBoundary > 30 ? clipped.slice(0, safeBoundary) : clipped;
  return `${preview.trim()}...`;
}

function renderFeedItemText(item) {
  const fullText = normalizeTextContent(item?.text || "");
  if (!fullText) return "";

  const previewText = normalizeTextContent(
    item?.previewText || createFeedPreviewText(fullText)
  );
  const shouldCollapse = Boolean(item?.collapsibleText) || fullText !== previewText;

  if (!shouldCollapse) {
    return `<p>${escapeHtml(fullText)}</p>`;
  }

  return `
    <p
      class="feed-text js-feed-text"
      data-preview-text="${escapeHtml(previewText)}"
      data-full-text="${escapeHtml(fullText)}"
    >
      ${escapeHtml(previewText)}
    </p>
    <button
      type="button"
      class="feed-read-more-btn js-feed-read-more-btn"
      aria-expanded="false"
    >
      Lire
    </button>
  `;
}

function renderFeedCarousel(images, title, carouselId) {
  const normalizedImages = (images || [])
    .map((image, index) => {
      if (typeof image === "string") {
        return {
          src: image,
          alt: `${title} - photo ${index + 1}`,
        };
      }

      if (image && image.src) {
        return {
          src: image.src,
          alt: image.alt || `${title} - photo ${index + 1}`,
        };
      }

      return null;
    })
    .filter(Boolean);

  if (!normalizedImages.length) return "";

  const controls =
    normalizedImages.length > 1
      ? `
        <button
          type="button"
          class="feed-carousel-btn feed-carousel-btn--prev js-feed-carousel-prev"
          aria-label="Image precedente"
        >
          &#8249;
        </button>
        <button
          type="button"
          class="feed-carousel-btn feed-carousel-btn--next js-feed-carousel-next"
          aria-label="Image suivante"
        >
          &#8250;
        </button>
        <div class="feed-carousel-meta">
          <div class="feed-carousel-dots" role="tablist" aria-label="Selection d'image">
            ${normalizedImages
              .map(
                (_, index) => `
                  <button
                    type="button"
                    class="feed-carousel-dot js-feed-carousel-dot ${
                      index === 0 ? "is-active" : ""
                    }"
                    data-slide-index="${index}"
                    role="tab"
                    aria-selected="${index === 0 ? "true" : "false"}"
                    aria-label="Afficher l'image ${index + 1}"
                  ></button>
                `
              )
              .join("")}
          </div>
          <p class="feed-carousel-count js-feed-carousel-count">1 / ${
            normalizedImages.length
          }</p>
        </div>
      `
      : "";

  return `
    <div
      class="feed-carousel js-feed-carousel"
      data-carousel-id="${escapeHtml(carouselId)}"
      data-active-index="0"
    >
      <div class="feed-carousel-track">
        ${normalizedImages
          .map(
            (image, index) => `
              <figure
                class="feed-carousel-slide js-feed-slide ${
                  index === 0 ? "is-active" : ""
                }"
                data-slide-index="${index}"
                aria-hidden="${index === 0 ? "false" : "true"}"
              >
                <img
                  src="${escapeHtml(image.src)}"
                  alt="${escapeHtml(image.alt)}"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            `
          )
          .join("")}
      </div>
      ${controls}
    </div>
  `;
}

function renderFeedItems(items) {
  return items
    .map(
      (item, index) => `
      <article class="feed-item">
        <p class="small">${escapeHtml(item.date)}</p>
        <h4>${escapeHtml(item.title)}</h4>
        ${renderFeedItemText(item)}
        ${renderFeedCarousel(item.images, item.title, `feed-carousel-${index}`)}
      </article>
    `
    )
    .join("");
}

function bindFeedExpandableText() {
  const buttons = Array.from(document.querySelectorAll(".js-feed-read-more-btn"));
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const container = button.closest(".feed-item");
      const textNode = container?.querySelector(".js-feed-text");
      if (!textNode) return;

      const previewText = textNode.dataset.previewText || "";
      const fullText = textNode.dataset.fullText || previewText;
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      const nextExpanded = !isExpanded;

      textNode.textContent = nextExpanded ? fullText : previewText;
      button.setAttribute("aria-expanded", nextExpanded ? "true" : "false");
      button.textContent = nextExpanded ? "Replier" : "Lire";
    });
  });
}

function bindFeedCarousels() {
  const carousels = Array.from(document.querySelectorAll(".js-feed-carousel"));
  if (!carousels.length) return;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  carousels.forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll(".js-feed-slide"));
    if (slides.length <= 1) return;

    const previousButton = carousel.querySelector(".js-feed-carousel-prev");
    const nextButton = carousel.querySelector(".js-feed-carousel-next");
    const dotButtons = Array.from(
      carousel.querySelectorAll(".js-feed-carousel-dot")
    );
    const countLabel = carousel.querySelector(".js-feed-carousel-count");

    let activeIndex = Number.parseInt(carousel.dataset.activeIndex || "0", 10);
    if (
      !Number.isInteger(activeIndex) ||
      activeIndex < 0 ||
      activeIndex >= slides.length
    ) {
      activeIndex = 0;
    }

    const setActiveSlide = (nextIndex) => {
      activeIndex = nextIndex;
      carousel.dataset.activeIndex = String(activeIndex);

      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", isActive ? "false" : "true");
      });

      dotButtons.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      if (countLabel) {
        countLabel.textContent = `${activeIndex + 1} / ${slides.length}`;
      }
    };

    let autoPlayIntervalId = null;
    const stopAutoPlay = () => {
      if (autoPlayIntervalId === null) return;
      clearInterval(autoPlayIntervalId);
      feedCarouselAutoPlayIntervalIds.delete(autoPlayIntervalId);
      autoPlayIntervalId = null;
    };

    const startAutoPlay = () => {
      if (prefersReducedMotion) return;
      if (autoPlayIntervalId !== null) return;

      autoPlayIntervalId = window.setInterval(() => {
        const nextIndex = (activeIndex + 1) % slides.length;
        setActiveSlide(nextIndex);
      }, FEED_CAROUSEL_AUTOPLAY_DELAY_MS);
      feedCarouselAutoPlayIntervalIds.add(autoPlayIntervalId);
    };

    const restartAutoPlay = () => {
      stopAutoPlay();
      startAutoPlay();
    };

    if (previousButton) {
      previousButton.addEventListener("click", () => {
        const previousIndex = (activeIndex - 1 + slides.length) % slides.length;
        setActiveSlide(previousIndex);
        restartAutoPlay();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        const nextIndex = (activeIndex + 1) % slides.length;
        setActiveSlide(nextIndex);
        restartAutoPlay();
      });
    }

    dotButtons.forEach((dotButton) => {
      dotButton.addEventListener("click", () => {
        const nextIndex = Number.parseInt(dotButton.dataset.slideIndex || "", 10);
        if (!Number.isInteger(nextIndex)) return;
        if (nextIndex < 0 || nextIndex >= slides.length) return;
        setActiveSlide(nextIndex);
        restartAutoPlay();
      });
    });

    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);
    carousel.addEventListener("focusin", stopAutoPlay);
    carousel.addEventListener("focusout", (event) => {
      if (carousel.contains(event.relatedTarget)) return;
      startAutoPlay();
    });

    setActiveSlide(activeIndex);
    startAutoPlay();
  });
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

// Meetings domain logic.
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

function meetingKindClass(kind) {
  if (kind === "rallye") return "race-card--rallye";
  if (kind === "course-de-cote") return "race-card--cote";
  return "race-card--circuit";
}

function meetingDetailHref(profileKey, meetingId, baseRoute = "meetings") {
  return `#/${baseRoute}/${profileKey}/${encodeURIComponent(meetingId)}`;
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

  if (!resolvedPath) {
    hero.classList.remove("hero--meeting-has-image");
    hero.style.removeProperty("--meeting-hero-image");
    return;
  }

  hero.classList.add("hero--meeting-has-image");
  hero.style.setProperty(
    "--meeting-hero-image",
    `url("${encodeURI(resolvedPath)}?v=${MEETING_BACKGROUND_ASSET_VERSION}")`
  );
}

function getRaceFormUrl(profile, meetingId) {
  const externalUrl = getMeetingExternalUrl(meetingId);
  if (externalUrl) return externalUrl;

  if (!profile || !profile.forms) return "#";
  return (
    profile.forms.raceFormsByMeeting?.[meetingId] || profile.forms.raceForm || "#"
  );
}

function canShowSignupForMeeting(profileKey, meeting) {
  if (!meeting) return false;
  if (profileKey !== "pilote") return true;

  return (
    meeting.kind === "rallye" ||
    meeting.kind === "course-de-cote" ||
    meeting.id === "r10"
  );
}

function isValidVehicleTypeFilter(value) {
  return VEHICLE_TYPE_FILTER_OPTIONS.some((option) => option.value === value);
}

function getVehicleTypeFilterForMeetingKind(meetingKind) {
  const currentValue = pilotMeetingVehicleFilterState[meetingKind];
  if (isValidVehicleTypeFilter(currentValue)) {
    return currentValue;
  }
  return DEFAULT_VEHICLE_TYPE_FILTER;
}

function renderListItems(items) {
  return (items || [])
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
}

function copyTextToClipboard(value) {
  const text = String(value || "");
  if (!text) return Promise.resolve(false);

  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    return navigator.clipboard
      .writeText(text)
      .then(() => true)
      .catch(() => false);
  }

  try {
    const fallbackInput = document.createElement("textarea");
    fallbackInput.value = text;
    fallbackInput.setAttribute("readonly", "");
    fallbackInput.style.position = "absolute";
    fallbackInput.style.left = "-9999px";
    document.body.appendChild(fallbackInput);
    fallbackInput.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(fallbackInput);
    return Promise.resolve(Boolean(copied));
  } catch (_error) {
    return Promise.resolve(false);
  }
}

function renderPilotMeetingVehicleDocsContent(meetingKind, vehicleType) {
  const docsByKind = PILOT_MEETING_DOCUMENTATION[meetingKind];
  if (!docsByKind) return "";

  const currentVehicleType = isValidVehicleTypeFilter(vehicleType)
    ? vehicleType
    : DEFAULT_VEHICLE_TYPE_FILTER;
  const vehicleDocs =
    docsByKind.vehicleDocuments?.[currentVehicleType] ||
    docsByKind.vehicleDocuments?.[DEFAULT_VEHICLE_TYPE_FILTER] ||
    {};

  return `
    <div class="meeting-doc-grid">
      <article class="doc-card">
        <h3>Documents communs</h3>
        <ul class="doc-list">
          ${renderListItems(docsByKind.commonDocuments)}
        </ul>
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

  return `
    <div class="meeting-doc-grid">
      <article class="doc-card">
        <h3>Documents communs</h3>
        <ul class="doc-list">
          ${renderListItems(meetingDocs.commonDocuments)}
        </ul>
      </article>

      <article class="doc-card">
        <h3>Documents pilotes</h3>
        <ul class="doc-list">
          ${renderListItems(meetingDocs.pilotDocuments)}
        </ul>
      </article>
    </div>
  `;
}

function renderCommissaireMeetingDocsContent(documents) {
  if (!documents || !documents.length) return "";

  return `
    <div class="meeting-doc-grid">
      ${documents
        .map(
          (documentItem) => `
            <article class="doc-card">
              <h3>${escapeHtml(documentItem.title)}</h3>
              ${
                documentItem.description
                  ? `<p>${escapeHtml(documentItem.description)}</p>`
                  : ""
              }
              <a
                class="btn btn-ghost"
                href="${escapeHtml(documentItem.href)}"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${escapeHtml(documentItem.ctaLabel || "Ouvrir le document")}
              </a>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderPilotMeetingVehicleDocsSection(meetingKind) {
  const currentVehicleType = getVehicleTypeFilterForMeetingKind(meetingKind);

  return `
    <p>
      Selectionnez votre type de vehicule pour afficher les documents dedies.
    </p>
    <div class="race-toolbar">
      <label>Type de vehicule</label>
      <div
        id="pilot-vehicle-filter-group"
        class="meeting-filter-group"
        role="group"
        aria-label="Filtrer les documents par type de vehicule"
      >
        ${VEHICLE_TYPE_FILTER_OPTIONS.map(
          (option) => `
            <button
              type="button"
              class="filter-btn js-vehicle-filter-btn ${
                currentVehicleType === option.value ? "is-active" : ""
              }"
              data-filter-value="${escapeHtml(option.value)}"
              aria-pressed="${
                currentVehicleType === option.value ? "true" : "false"
              }"
            >
              ${escapeHtml(option.label)}
            </button>
          `
        ).join("")}
      </div>
    </div>
    <div id="pilot-vehicle-doc-content">
      ${renderPilotMeetingVehicleDocsContent(meetingKind, currentVehicleType)}
    </div>
  `;
}

function renderAccueilView() {
  const nextMeeting = getNextMeeting();
  const commissaireProfile = PROFILE_CONTENT.commissaire;

  return `
    <div class="view-stack">
      <section class="hero">
        <h1>Bienvenue sur le portail ASA Prenois Bourgogne</h1>
        <p class="hero-sub">
          Cette base integre maintenant une navigation complete du site et un
          espace Meetings structure par profil utilisateur.
        </p>
        <div class="hero-cta">
          <a href="#/meetings" class="btn btn-primary">Entrer dans le calendrier</a>
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
                  <p>${escapeHtml(nextMeeting.date)} - ${escapeHtml(nextMeeting.location)}</p>
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

      <section id="actualites" class="section dual">
        <div>
          <div class="section-head">
            <h2>${escapeHtml(commissaireProfile.sections.newsTitle)}</h2>
          </div>
          <div class="feed-list">${renderFeedItems(commissaireProfile.newsFeed)}</div>
        </div>
        <div>
          <div class="section-head">
            <h2>${escapeHtml(commissaireProfile.sections.resultsTitle)}</h2>
          </div>
          <div class="feed-list">${renderFeedItems(commissaireProfile.resultsFeed)}</div>
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

function clearFeedCarouselsAutoPlay() {
  if (!feedCarouselAutoPlayIntervalIds.size) return;
  feedCarouselAutoPlayIntervalIds.forEach((intervalId) => {
    clearInterval(intervalId);
  });
  feedCarouselAutoPlayIntervalIds.clear();
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
    if (noteEl) noteEl.textContent = "";
  };

  updateCountdown();
  clearAccueilCountdown();
  accueilCountdownIntervalId = window.setInterval(updateCountdown, 1000);
}

function renderMeetingsChoiceView() {
  const currentFilter = meetingFilterState.commissaire || DEFAULT_MEETING_FILTER;

  return `
    <div class="view-stack">
      <section class="hero">
        <h1>Calendrier</h1>
        <p class="hero-sub">
          Retrouvez l'ensemble des meetings en mode affichage.
        </p>
      </section>

      <section id="calendrier" class="section">
        <div class="section-head">
          <h2>Calendrier des meetings</h2>
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
                  aria-pressed="${currentFilter === option.value ? "true" : "false"}"
                >
                  ${escapeHtml(option.label)}
                </button>
              `
            ).join("")}
          </div>
        </div>
        <div id="race-grid" class="race-grid"></div>
      </section>
    </div>
  `;
}

function renderInscriptionsChoiceView() {
  return `
    <div class="view-stack">
      <section class="hero">
        <h1>Inscriptions</h1>
        <p class="hero-sub">
          Selectionnez votre profil pour acceder au calendrier avec les boutons
          d'inscription.
        </p>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Je suis...</h2>
        </div>
        <div class="profile-choice-grid">
          <a class="profile-choice-card profile-choice-card--commissaire" href="#/inscriptions/commissaire">
            <span>COMMISSAIRE ET OFFICIELS</span>
          </a>

          <a class="profile-choice-card profile-choice-card--pilote" href="#/inscriptions/pilote">
            <span>PILOTE</span>
          </a>
        </div>
      </section>
    </div>
  `;
}
function renderActualitesView() {
  const commissaireProfile = PROFILE_CONTENT.commissaire;
  const piloteProfile = PROFILE_CONTENT.pilote;

  return `
    <div class="view-stack">
      <section class="hero">
        <h1>Actualites</h1>
        <p class="hero-sub">
          Retrouvez les dernieres actualites des commissaires et des pilotes.
        </p>
      </section>

      <section class="section dual">
        <div>
          <div class="section-head">
            <h2>${escapeHtml(commissaireProfile.sections.newsTitle)}</h2>
          </div>
          <div class="feed-list">${renderFeedItems(commissaireProfile.newsFeed)}</div>
        </div>
        <div>
          <div class="section-head">
            <h2>${escapeHtml(piloteProfile.sections.newsTitle)}</h2>
          </div>
          <div class="feed-list">${renderFeedItems(piloteProfile.newsFeed)}</div>
        </div>
      </section>
    </div>
  `;
}

function renderMeetingsProfileView(
  profileKey,
  { showSignup = false, baseRoute = "meetings" } = {}
) {
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
    </div>
  `;
}

function renderMeetingCards(
  profileKey,
  { showSignup = false, baseRoute = "meetings" } = {}
) {
  const profile = PROFILE_CONTENT[profileKey];
  const root = byId("race-grid");
  if (!root) return;

  const meetings = getVisibleMeetings(meetingFilterState[profileKey] || DEFAULT_MEETING_FILTER).filter(
    (meeting) => {
      if (!showSignup) return true;
      return profileKey === "pilote"
        ? canShowSignupForMeeting(profileKey, meeting)
        : true;
    }
  );

  root.innerHTML = meetings
    .map((meeting) => {
      const kindClass = meetingKindClass(meeting.kind);
      const raceFormUrl = getRaceFormUrl(profile, meeting.id);
      const canShowSignup =
        showSignup && canShowSignupForMeeting(profileKey, meeting);
      const externalUrl = getMeetingExternalUrl(meeting.id);
      const detailHref =
        externalUrl || meetingDetailHref(profileKey, meeting.id, baseRoute);
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
          data-base-route="${escapeHtml(baseRoute)}"
          aria-label="Ouvrir le detail du meeting ${escapeHtml(meeting.name)}"
        >
          <p class="race-meta-line">
            ${escapeHtml(meetingKindLabel(meeting.kind))} - ${escapeHtml(
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

function bindMeetingsProfileEvents(
  profileKey,
  { showSignup = false, baseRoute = "meetings" } = {}
) {
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
        renderMeetingCards(profileKey, { showSignup, baseRoute });
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

      window.location.hash = meetingDetailHref(cardProfile, meetingId, baseRoute);
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

      window.location.hash = meetingDetailHref(cardProfile, meetingId, baseRoute);
    });
  }

  renderMeetingCards(profileKey, { showSignup, baseRoute });
}

function renderMeetingDetailView(
  profileKey,
  meetingId,
  { showSignup = false, baseRoute = "meetings" } = {}
) {
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
          <a href="#/${escapeHtml(baseRoute)}" class="btn btn-primary">Retour au calendrier</a>
        </section>
      </div>
    `;
  }

  const pilotMeetingSpecificDocs =
    profileKey === "pilote"
      ? PILOT_MEETING_DOCUMENTATION_BY_MEETING[meeting.id]
      : null;
  const commissaireMeetingDocs =
    profileKey === "commissaire"
      ? COMMISSAIRE_MEETING_DOCUMENTS[meeting.id] || []
      : [];
  const shouldShowCommissaireComingSoon =
    profileKey === "commissaire" && meeting.id !== "r3";
  const shouldRenderPilotMeetingSpecificDocs = Boolean(pilotMeetingSpecificDocs);
  const shouldRenderCommissaireMeetingDocs =
    !shouldShowCommissaireComingSoon && commissaireMeetingDocs.length > 0;
  const shouldRenderVehicleTypeDocs =
    profileKey === "pilote" &&
    !shouldRenderPilotMeetingSpecificDocs &&
    Boolean(PILOT_MEETING_DOCUMENTATION[meeting.kind]);
  const canShowSignup =
    showSignup && canShowSignupForMeeting(profileKey, meeting);
  const promoterLogo = getMeetingPromoterLogo(meeting.id);
  const externalUrl = getMeetingExternalUrl(meeting.id);
  const signupButtonLabel =
    profileKey === "commissaire"
      ? "Formulaire d'inscription"
      : `Formulaire ${profile.label.toLowerCase()}`;
  const secondaryCtaHref = externalUrl || `#/${baseRoute}/${profileKey}`;
  const secondaryCtaLabel = externalUrl
    ? "Site officiel du rallye"
    : "Retour au calendrier";
  const secondaryCtaAttrs = externalUrl
    ? 'target="_blank" rel="noopener noreferrer"'
    : "";

  return `
    <div class="view-stack">
      <section
        class="hero hero--meeting js-meeting-hero"
        data-meeting-id="${escapeHtml(meeting.id)}"
      >
        ${
          promoterLogo
            ? `
              <div class="meeting-promoter-logo-wrap">
                <img
                  class="meeting-promoter-logo"
                  src="${escapeHtml(promoterLogo.src)}"
                  alt="${escapeHtml(promoterLogo.alt)}"
                  loading="lazy"
                />
              </div>
            `
            : ""
        }
        <h1>${escapeHtml(meeting.name)}</h1>
        <p class="hero-sub">
          Page detaillee du meeting pour le parcours ${escapeHtml(
            profile.label.toLowerCase()
          )}. Cette base est prete pour accueillir PDF et documents de reference.
        </p>
        <div class="hero-cta">
          ${
            canShowSignup
              ? `
                <a
                  class="btn btn-primary"
                  href="${escapeHtml(getRaceFormUrl(profile, meeting.id))}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${escapeHtml(signupButtonLabel)}
                </a>
              `
              : ""
          }
          <a href="${escapeHtml(secondaryCtaHref)}" class="btn btn-ghost" ${secondaryCtaAttrs}
            >${escapeHtml(secondaryCtaLabel)}</a
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
          ${
            shouldShowCommissaireComingSoon
              ? `
                <p>Arrive prochainement.</p>
              `
              : shouldRenderVehicleTypeDocs ||
            shouldRenderPilotMeetingSpecificDocs ||
            shouldRenderCommissaireMeetingDocs
              ? ""
              : `
                <p>
                  Cette zone est preparee pour les futurs PDF (roadbooks, horaires,
                  organisation et annexes).
                </p>
              `
          }
        </div>
        ${
          shouldShowCommissaireComingSoon
            ? `
              <article class="doc-card">
                <h3>Documents et ressources</h3>
                <p>Arrive prochainement.</p>
                <span class="badge pending">A venir</span>
              </article>
            `
            : shouldRenderPilotMeetingSpecificDocs
            ? renderPilotMeetingSpecificDocsContent(pilotMeetingSpecificDocs)
            : shouldRenderCommissaireMeetingDocs
            ? renderCommissaireMeetingDocsContent(commissaireMeetingDocs)
            : shouldRenderVehicleTypeDocs
            ? renderPilotMeetingVehicleDocsSection(meeting.kind)
            : `
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
            `
        }
      </section>
    </div>
  `;
}

function bindMeetingDetailEvents(profileKey, meetingId) {
  if (profileKey !== "pilote") return;

  const meeting = MEETINGS.find((entry) => entry.id === meetingId);
  if (!meeting) return;

  const docsByKind = PILOT_MEETING_DOCUMENTATION[meeting.kind];
  if (!docsByKind) return;

  const buttons = Array.from(document.querySelectorAll(".js-vehicle-filter-btn"));
  const contentRoot = byId("pilot-vehicle-doc-content");
  if (!buttons.length || !contentRoot) return;

  const updateButtonsState = () => {
    const currentVehicleType = getVehicleTypeFilterForMeetingKind(meeting.kind);
    buttons.forEach((button) => {
      const isActive = button.dataset.filterValue === currentVehicleType;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextVehicleType = button.dataset.filterValue;
      if (!isValidVehicleTypeFilter(nextVehicleType)) return;
      pilotMeetingVehicleFilterState[meeting.kind] = nextVehicleType;
      updateButtonsState();
      contentRoot.innerHTML = renderPilotMeetingVehicleDocsContent(
        meeting.kind,
        nextVehicleType
      );
    });
  });

  updateButtonsState();
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
      <div class="view-stack view-stack--info-pages">
        <section class="hero">
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
            <p>Cliquez pour copier l'adresse email :</p>
            <button
              type="button"
              class="contact-copy-btn js-contact-copy-btn"
              data-email="${escapeHtml(CONTACT_PAGE_CONTENT.email)}"
              aria-label="Copier l'adresse email ${escapeHtml(
                CONTACT_PAGE_CONTENT.email
              )}"
            >
              <span class="contact-copy-btn-front">
                <svg
                  class="contact-copy-btn-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fill="currentColor"
                    d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10V1zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H10V7h9v14z"
                  />
                </svg>
                Copier l'email
              </span>
              <span class="contact-copy-btn-back">Copie</span>
            </button>
            <p class="contact-email">${escapeHtml(CONTACT_PAGE_CONTENT.email)}</p>
          </article>
        </section>
      </div>
    `;
  }

  if (LEGAL_PAGE_CONTENT[pageKey]) {
    const legalPage = LEGAL_PAGE_CONTENT[pageKey];
    return `
      <div class="view-stack view-stack--legal-pages">
        <section class="hero">
          <h1>${escapeHtml(page.title)}</h1>
          <p class="hero-sub">${escapeHtml(page.intro)}</p>
          <p class="eyebrow">${escapeHtml(legalPage.updatedAt)}</p>
        </section>

        ${legalPage.sections
          .map(
            (section) => `
              <section class="section">
                <div class="section-head">
                  <h2>${escapeHtml(section.title)}</h2>
                </div>
                <article class="panel narrative-panel">
                  ${(section.paragraphs || [])
                    .map(
                      (paragraph) => `
                        <p>${escapeHtml(paragraph)}</p>
                      `
                    )
                    .join("")}
                </article>
              </section>
            `
          )
          .join("")}
      </div>
    `;
  }

  if (
    pageKey === "commissaires" &&
    page.commissionerParagraphs &&
    page.commissionerParagraphs.length
  ) {
    return `
      <div class="view-stack view-stack--info-pages">
        <section class="hero">
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
          ${
            page.commissionerTrainingLink
              ? `
                <div class="link-row">
                  <a
                    href="${escapeHtml(page.commissionerTrainingLink)}"
                    class="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ${escapeHtml(
                      page.commissionerTrainingLabel || "Se former et debuter"
                    )}
                  </a>
                </div>
              `
              : ""
          }
        </section>
      </div>
    `;
  }

  if (
    pageKey === "vie-asa" &&
    page.historyParagraphs &&
    page.historyParagraphs.length
  ) {
    const commissionersPage = PAGE_SKELETONS.commissaires || {};
    const pilotsPage = PAGE_SKELETONS.pilotes || {};
    const partnersPage = PAGE_SKELETONS.partenaires || {};

    return `
      <div class="view-stack view-stack--info-pages">
        <section class="hero">
          <h1>${escapeHtml(page.title)}</h1>
          <p class="hero-sub">${escapeHtml(page.intro)}</p>
        </section>

        <section class="section asa-layout">
          <aside class="asa-timeline" aria-label="Navigation de la page La vie de l'ASA">
            <p class="asa-timeline-title">Parcours</p>
            <nav class="asa-timeline-list">
              <button type="button" class="asa-timeline-btn js-vie-asa-nav-btn" data-target-id="vie-asa-histoire">
                Histoire de l'ASA
              </button>
              <button type="button" class="asa-timeline-btn js-vie-asa-nav-btn" data-target-id="vie-asa-commissaires">
                Nos commissaires
              </button>
              <button type="button" class="asa-timeline-btn js-vie-asa-nav-btn" data-target-id="vie-asa-pilotes">
                Nos pilotes
              </button>
              <button type="button" class="asa-timeline-btn js-vie-asa-nav-btn" data-target-id="vie-asa-partenaires">
                Nos partenaires
              </button>
            </nav>
          </aside>

          <div class="asa-content">
            <article id="vie-asa-histoire" class="panel narrative-panel asa-section-anchor">
              <h2>${escapeHtml(page.historyTitle)}</h2>
              ${page.historyParagraphs
                .map(
                  (paragraph) => `
                    <p>${escapeHtml(paragraph)}</p>
                  `
                )
                .join("")}
            </article>

            <article id="vie-asa-commissaires" class="panel narrative-panel asa-section-anchor">
              <h2>${escapeHtml(
                commissionersPage.commissionerTitle || "Nos commissaires"
              )}</h2>
              ${(commissionersPage.commissionerParagraphs || [])
                .map(
                  (paragraph) => `
                    <p>${escapeHtml(paragraph)}</p>
                  `
                )
                .join("")}
              ${
                commissionersPage.commissionerTrainingLink
                  ? `
                    <div class="link-row">
                      <a
                        href="${escapeHtml(commissionersPage.commissionerTrainingLink)}"
                        class="btn btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ${escapeHtml(
                          commissionersPage.commissionerTrainingLabel ||
                            "Se former et debuter"
                        )}
                      </a>
                    </div>
                  `
                  : ""
              }
            </article>

            <article id="vie-asa-pilotes" class="panel narrative-panel asa-section-anchor">
              <h2>Nos pilotes</h2>
              <p>${escapeHtml(
                pilotsPage.intro ||
                  "Contenu pilotes en cours de structuration."
              )}</p>
              <p>${escapeHtml(PROFILE_CONTENT.pilote.heroSubtitle)}</p>
            </article>

            <section id="vie-asa-partenaires" class="asa-section-anchor">
              <article class="panel">
                <h2>${escapeHtml(partnersPage.annualPartnersTitle || "Nos partenaires")}</h2>
                <div class="partner-grid">
                  ${renderPartnerCards(partnersPage.annualPartners || [])}
                </div>
              </article>

              <article class="panel asa-partners-subpanel">
                <h3>${escapeHtml(
                  partnersPage.urcyPartnersTitle ||
                    "Partenaires Urcy"
                )}</h3>
                <div class="partner-grid">
                  ${renderPartnerCards(partnersPage.urcyPartners || [])}
                </div>
              </article>
            </section>
          </div>
        </section>
      </div>
    `;
  }

  if (
    pageKey === "partenaires" &&
    page.annualPartners &&
    page.annualPartners.length &&
    page.urcyPartners &&
    page.urcyPartners.length
  ) {
    return `
      <div class="view-stack">
        <section class="hero">
          <h1>${escapeHtml(page.title)}</h1>
          <p class="hero-sub">${escapeHtml(page.intro)}</p>
        </section>

        <section class="section">
          <div class="section-head">
            <h2>${escapeHtml(page.annualPartnersTitle)}</h2>
          </div>
          <div class="partner-grid">
            ${renderPartnerCards(page.annualPartners)}
          </div>
        </section>

        <section class="section">
          <div class="section-head">
            <h2>${escapeHtml(page.urcyPartnersTitle)}</h2>
          </div>
          <div class="partner-grid">
            ${renderPartnerCards(page.urcyPartners)}
          </div>
        </section>
      </div>
    `;
  }

  return `
    <div class="view-stack">
      <section class="hero">
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

function bindVieAsaTimelineEvents() {
  const buttons = Array.from(document.querySelectorAll(".js-vie-asa-nav-btn"));
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.targetId || "";
      if (!targetId) return;

      const target = byId(targetId);
      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}

// Route lifecycle and view orchestration.
function renderCurrentRoute() {
  const appRoot = byId("app");
  if (!appRoot) return;

  clearAccueilCountdown();
  clearFeedCarouselsAutoPlay();

  const route = parseRoute({
    hashValue: window.location.hash,
    profileContent: PROFILE_CONTENT,
    pageSkeletons: PAGE_SKELETONS,
  });
  updateActiveNav(route.navKey);
  updateDocumentTitle(route, {
    profileContent: PROFILE_CONTENT,
    pageSkeletons: PAGE_SKELETONS,
    meetings: MEETINGS,
  });
  if (topbarMenuController) {
    topbarMenuController.closeMenu();
  }
  scrollPageToTop();

  if (route.type === "accueil") {
    appRoot.innerHTML = renderAccueilView();
    bindAccueilCountdown();
    bindFeedCarousels();
    bindFeedExpandableText();
    return;
  }

  if (route.type === "meetings-choice") {
    appRoot.innerHTML = route.signupEnabled
      ? renderInscriptionsChoiceView()
      : renderMeetingsChoiceView();
    if (!route.signupEnabled) {
      bindMeetingsProfileEvents("commissaire", {
        showSignup: false,
        baseRoute: "meetings",
      });
    }
    return;
  }

  if (route.type === "actualites") {
    appRoot.innerHTML = renderActualitesView();
    bindFeedCarousels();
    bindFeedExpandableText();
    return;
  }

  if (route.type === "meetings-profile") {
    appRoot.innerHTML = renderMeetingsProfileView(route.profileKey, {
      showSignup: Boolean(route.signupEnabled),
      baseRoute: route.baseRoute || "meetings",
    });
    bindMeetingsProfileEvents(route.profileKey, {
      showSignup: Boolean(route.signupEnabled),
      baseRoute: route.baseRoute || "meetings",
    });
    bindFeedCarousels();
    bindFeedExpandableText();
    return;
  }

  if (route.type === "meeting-detail") {
    appRoot.innerHTML = renderMeetingDetailView(route.profileKey, route.meetingId, {
      showSignup: Boolean(route.signupEnabled),
      baseRoute: route.baseRoute || "meetings",
    });
    applyMeetingHeroBackground(route.meetingId);
    bindMeetingDetailEvents(route.profileKey, route.meetingId);
    return;
  }

  if (route.type === "page") {
    appRoot.innerHTML = renderSkeletonPage(route.pageKey);
    if (route.pageKey === "contact") {
      bindContactCopyEmailEvents();
    }
    if (route.pageKey === "vie-asa") {
      bindVieAsaTimelineEvents();
    }
    return;
  }

  appRoot.innerHTML = renderNotFoundView();
}

function bindContactCopyEmailEvents() {
  const copyButtons = Array.from(document.querySelectorAll(".js-contact-copy-btn"));
  if (!copyButtons.length) return;

  copyButtons.forEach((button) => {
    let resetTimeoutId = null;

    button.addEventListener("click", async () => {
      const email = button.dataset.email || "";
      const isCopied = await copyTextToClipboard(email);

      button.classList.remove("is-copied", "is-copy-error");
      button.classList.add(isCopied ? "is-copied" : "is-copy-error");

      if (resetTimeoutId) {
        window.clearTimeout(resetTimeoutId);
      }

      resetTimeoutId = window.setTimeout(() => {
        button.classList.remove("is-copied", "is-copy-error");
      }, 1700);
    });
  });
}

function updateTopbarHeightVar() {
  if (topbarHeightRafId !== null) {
    window.cancelAnimationFrame(topbarHeightRafId);
  }

  topbarHeightRafId = window.requestAnimationFrame(() => {
    const topbar = document.querySelector(".topbar");
    const height = topbar
      ? Math.max(0, Math.round(topbar.getBoundingClientRect().height))
      : 84;
    document.documentElement.style.setProperty("--topbar-height", `${height}px`);
    topbarHeightRafId = null;
  });
}

// Application bootstrap.
function mount() {
  if (!window.location.hash) {
    window.location.hash = DEFAULT_ROUTE_HASH;
  }

  topbarMenuController = createTopbarMenuController({
    onMenuStateChange: updateTopbarHeightVar,
  });
  topbarMenuController.bindEvents();
  updateTopbarHeightVar();
  renderCurrentRoute();
  window.addEventListener("hashchange", renderCurrentRoute);
  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_NAV_BREAKPOINT && topbarMenuController) {
      topbarMenuController.closeMenu();
    }
    updateTopbarHeightVar();
  });
}

mount();

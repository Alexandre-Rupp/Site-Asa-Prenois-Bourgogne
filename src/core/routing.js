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

function normalizePathname(pathnameValue) {
  const withLeadingSlash = String(pathnameValue || "/").startsWith("/")
    ? String(pathnameValue || "/")
    : `/${String(pathnameValue || "/")}`;
  const collapsed = withLeadingSlash.replace(/\/+/g, "/");
  const normalized = collapsed.length > 1 ? collapsed.replace(/\/$/, "") : collapsed;
  return normalized || "/";
}

function parseProfileAreaRoute({
  segments,
  baseRoute,
  navKey,
  signupEnabled,
  profileContent,
}) {
  if (!segments[1]) {
    return {
      type: "meetings-choice",
      navKey,
      baseRoute,
      signupEnabled,
      canonicalPath: `/${baseRoute}`,
    };
  }

  if (!profileContent[segments[1]]) {
    return { type: "not-found", navKey, canonicalPath: `/${baseRoute}` };
  }

  if (!segments[2]) {
    return {
      type: "meetings-profile",
      navKey,
      profileKey: segments[1],
      baseRoute,
      signupEnabled,
      canonicalPath: `/${baseRoute}/${segments[1]}`,
    };
  }

  return {
    type: "meeting-detail",
    navKey,
    profileKey: segments[1],
    meetingId: segments[2],
    baseRoute,
    signupEnabled,
    canonicalPath: `/${baseRoute}/${segments[1]}/${encodeURIComponent(segments[2])}`,
  };
}

/**
 * Parses the current hash route into a normalized route descriptor.
 * @param {object} params
 * @param {string} params.hashValue
 * @param {Record<string, unknown>} params.profileContent
 * @param {Record<string, unknown>} params.pageSkeletons
 * @returns {object}
 */
export function parseRoute({ hashValue, profileContent, pageSkeletons }) {
  const normalizedPath = normalizeHash(hashValue);
  const segments = normalizedPath
    .split("/")
    .filter(Boolean)
    .map((part) => decodeURIComponent(part));

  if (segments.length === 0 || segments[0] === "accueil") {
    return { type: "accueil", navKey: "accueil", canonicalPath: "/" };
  }

  if (segments[0] === "actualites") {
    return { type: "actualites", navKey: "actualites", canonicalPath: "/actualites" };
  }

  if (segments[0] === "meetings") {
    return parseProfileAreaRoute({
      segments,
      baseRoute: "meetings",
      navKey: "meetings",
      signupEnabled: false,
      profileContent,
    });
  }

  if (segments[0] === "inscriptions") {
    return parseProfileAreaRoute({
      segments,
      baseRoute: "inscriptions",
      navKey: "inscriptions",
      signupEnabled: true,
      profileContent,
    });
  }

  if (pageSkeletons[segments[0]]) {
    return {
      type: "page",
      navKey: segments[0],
      pageKey: segments[0],
      canonicalPath: `/${segments[0]}`,
    };
  }

  return { type: "not-found", navKey: "accueil", canonicalPath: normalizedPath };
}

export function getRouteHashFromPathname(pathnameValue) {
  const normalizedPath = normalizePathname(pathnameValue);
  if (normalizedPath === "/" || normalizedPath === "/index.html") {
    return "#/accueil";
  }
  return `#${normalizedPath}`;
}

function getPageDescription(pageKey, pageSkeletons) {
  const pageSpecificDescriptions = {
    commissaires:
      "Devenir commissaire de piste avec l'ASA Prenois Bourgogne: parcours, formation et informations utiles.",
    pilotes:
      "Informations pilotes ASA Prenois Bourgogne: accompagnement, regles et documentation pratique.",
    contact:
      "Contactez l'ASA Prenois Bourgogne: horaires bureau, email et informations de contact officielles.",
    "vie-asa":
      "La vie de l'ASA Prenois Bourgogne: histoire de l'association, commissaires, pilotes et partenaires.",
    partenaires:
      "Partenaires institutionnels et prives de l'ASA Prenois Bourgogne.",
    "mentions-legales":
      "Mentions legales du site officiel de l'ASA Prenois Bourgogne.",
    "politique-confidentialite":
      "Politique de confidentialite du site officiel ASA Prenois Bourgogne.",
    "politique-cookies":
      "Politique de cookies du site officiel ASA Prenois Bourgogne.",
  };

  if (pageSpecificDescriptions[pageKey]) {
    return pageSpecificDescriptions[pageKey];
  }

  return pageSkeletons[pageKey]?.intro || "Informations officielles ASA Prenois Bourgogne.";
}

function getSeoPayload(
  route,
  { profileContent, pageSkeletons, meetings, siteName = "ASA Prenois Bourgogne" }
) {
  const homeDescription =
    "Site officiel de l'ASA Prenois Bourgogne : meetings, inscriptions, informations pour pilotes et commissaires, actualites et contact.";

  if (route.type === "accueil") {
    return {
      title: `${siteName} - Site officiel`,
      description: homeDescription,
      robots: "index, follow",
    };
  }

  if (route.type === "meetings-choice") {
    if (route.signupEnabled) {
      return {
        title: `Inscriptions ${siteName}`,
        description:
          "Acces aux inscriptions ASA Prenois Bourgogne pour commissaires et pilotes.",
        robots: "index, follow",
      };
    }

    return {
      title: `Meetings ${siteName}`,
      description:
        "Calendrier officiel des meetings ASA Prenois Bourgogne avec acces aux fiches detaillees.",
      robots: "index, follow",
    };
  }

  if (route.type === "actualites") {
    return {
      title: `Actualites ${siteName}`,
      description:
        "Actualites des commissaires et des pilotes de l'ASA Prenois Bourgogne.",
      robots: "index, follow",
    };
  }

  if (route.type === "meetings-profile") {
    const profile = profileContent[route.profileKey];
    if (route.signupEnabled) {
      return {
        title: `Inscriptions ${profile.label} - ${siteName}`,
        description: `Inscriptions ${profile.label.toLowerCase()} pour les meetings de l'ASA Prenois Bourgogne.`,
        robots: "index, follow",
      };
    }

    return {
      title: `Meetings ${profile.label} - ${siteName}`,
      description: `Calendrier des meetings ${profile.label.toLowerCase()} de l'ASA Prenois Bourgogne.`,
      robots: "index, follow",
    };
  }

  if (route.type === "meeting-detail") {
    const meeting = meetings.find((item) => item.id === route.meetingId);
    const label = meeting ? meeting.name : "Meeting";
    return {
      title: `${label} - Meetings ${siteName}`,
      description: `Informations officielles du meeting ${label} (${meeting?.date || ""}) organise par l'ASA Prenois Bourgogne.`,
      robots: "index, follow",
    };
  }

  if (route.type === "page") {
    const page = pageSkeletons[route.pageKey];
    return {
      title: `${page.title} - ${siteName}`,
      description: getPageDescription(route.pageKey, pageSkeletons),
      robots: "index, follow",
    };
  }

  return {
    title: `Page introuvable - ${siteName}`,
    description: "La page demandee est introuvable.",
    robots: "noindex, follow",
  };
}

function upsertMetaByName(name, content) {
  let node = document.querySelector(`meta[name="${name}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute("name", name);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function upsertMetaByProperty(property, content) {
  let node = document.querySelector(`meta[property="${property}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute("property", property);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function upsertCanonicalLink(href) {
  let node = document.querySelector('link[rel="canonical"]');
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", "canonical");
    document.head.appendChild(node);
  }
  node.setAttribute("href", href);
}

export function updateDocumentSeo(
  route,
  {
    profileContent,
    pageSkeletons,
    meetings,
    canonicalOrigin = "https://asa-prenois-bourgogne.fr",
    siteName = "ASA Prenois Bourgogne",
  }
) {
  const seo = getSeoPayload(route, {
    profileContent,
    pageSkeletons,
    meetings,
    siteName,
  });
  const canonicalPath =
    route.canonicalPath && route.canonicalPath !== "/accueil"
      ? route.canonicalPath
      : "/";
  const canonicalUrl = new URL(canonicalPath, canonicalOrigin).toString();

  document.title = seo.title;
  upsertMetaByName("description", seo.description);
  upsertMetaByName("robots", seo.robots);
  upsertCanonicalLink(canonicalUrl);
  upsertMetaByProperty("og:title", seo.title);
  upsertMetaByProperty("og:description", seo.description);
  upsertMetaByProperty("og:url", canonicalUrl);
}

export function getCanonicalPathFromRoute(route) {
  if (!route?.canonicalPath || route.canonicalPath === "/accueil") {
    return "/";
  }
  return normalizePathname(route.canonicalPath);
}

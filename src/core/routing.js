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
      "Informations pilotes ASA Prenois Bourgogne: accompagnement, r\u00E8gles et documentation pratique.",
    contact:
      "Contactez l'ASA Prenois Bourgogne: horaires bureau, email et informations de contact officielles.",
    "vie-asa":
      "La vie de l'ASA Prenois Bourgogne: histoire de l'association, commissaires, pilotes et partenaires.",
    partenaires:
      "Partenaires institutionnels et priv\u00E9s de l'ASA Prenois Bourgogne.",
    "mentions-legales":
      "Mentions l\u00E9gales du site officiel de l'ASA Prenois Bourgogne.",
    "politique-confidentialite":
      "Politique de confidentialit\u00E9 du site officiel ASA Prenois Bourgogne.",
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
    "Site officiel de l'ASA Prenois Bourgogne : meetings, inscriptions, informations pour pilotes et commissaires, actualit\u00E9s et contact.";

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
          "Acc\u00E8s aux inscriptions ASA Prenois Bourgogne pour commissaires et pilotes.",
        robots: "index, follow",
      };
    }

    return {
      title: `Meetings ${siteName}`,
      description:
        "Calendrier officiel des meetings ASA Prenois Bourgogne avec acc\u00E8s aux fiches d\u00E9taill\u00E9es.",
      robots: "index, follow",
    };
  }

  if (route.type === "actualites") {
    return {
      title: `Actualit\u00E9s ${siteName}`,
      description:
        "Actualit\u00E9s des commissaires et des pilotes de l'ASA Prenois Bourgogne.",
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
    const profile = profileContent[route.profileKey];
    const label = meeting ? meeting.name : "Meeting";
    const areaTitle = route.signupEnabled ? "Inscriptions" : "Meetings";
    const profileLabel = profile?.label ? ` ${profile.label.toLowerCase()}` : "";
    const prefix = route.signupEnabled
      ? "Informations et acc\u00E8s inscription du meeting"
      : "Informations officielles du meeting";
    return {
      title: `${label} - ${areaTitle} ${siteName}`,
      description: `${prefix}${profileLabel} ${label} (${meeting?.date || ""}) organise par l'ASA Prenois Bourgogne.`,
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
    description: "La page demand\u00E9e est introuvable.",
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
    socialImagePath = "/assets/logo-asa-prenois-bourgogne.png",
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
  const socialImageUrl = new URL(socialImagePath, canonicalOrigin).toString();
  const socialImageAlt = `${siteName} - logo officiel`;

  document.title = seo.title;
  upsertMetaByName("description", seo.description);
  upsertMetaByName("robots", seo.robots);
  upsertCanonicalLink(canonicalUrl);
  upsertMetaByProperty("og:type", "website");
  upsertMetaByProperty("og:site_name", siteName);
  upsertMetaByProperty("og:locale", "fr_FR");
  upsertMetaByProperty("og:title", seo.title);
  upsertMetaByProperty("og:description", seo.description);
  upsertMetaByProperty("og:url", canonicalUrl);
  upsertMetaByProperty("og:image", socialImageUrl);
  upsertMetaByProperty("og:image:alt", socialImageAlt);
  upsertMetaByName("twitter:card", "summary_large_image");
  upsertMetaByName("twitter:title", seo.title);
  upsertMetaByName("twitter:description", seo.description);
  upsertMetaByName("twitter:url", canonicalUrl);
  upsertMetaByName("twitter:image", socialImageUrl);
  upsertMetaByName("twitter:image:alt", socialImageAlt);
}

export function getCanonicalPathFromRoute(route) {
  if (!route?.canonicalPath || route.canonicalPath === "/accueil") {
    return "/";
  }
  return normalizePathname(route.canonicalPath);
}

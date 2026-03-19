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
    };
  }

  if (!profileContent[segments[1]]) {
    return { type: "not-found", navKey };
  }

  if (!segments[2]) {
    return {
      type: "meetings-profile",
      navKey,
      profileKey: segments[1],
      baseRoute,
      signupEnabled,
    };
  }

  return {
    type: "meeting-detail",
    navKey,
    profileKey: segments[1],
    meetingId: segments[2],
    baseRoute,
    signupEnabled,
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
    return { type: "accueil", navKey: "accueil" };
  }

  if (segments[0] === "actualites") {
    return { type: "actualites", navKey: "actualites" };
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
    return { type: "page", navKey: segments[0], pageKey: segments[0] };
  }

  return { type: "not-found", navKey: "accueil" };
}

/**
 * Updates the browser title based on the normalized route.
 * @param {object} route
 * @param {object} params
 * @param {Record<string, {label: string}>} params.profileContent
 * @param {Record<string, {title: string}>} params.pageSkeletons
 * @param {Array<{id: string, name: string}>} params.meetings
 * @param {string} [params.suffix]
 */
export function updateDocumentTitle(
  route,
  { profileContent, pageSkeletons, meetings, suffix = "ASA Prenois Bourgogne" }
) {
  if (route.type === "accueil") {
    document.title = `Accueil | ${suffix}`;
    return;
  }

  if (route.type === "meetings-choice") {
    const pageLabel = route.signupEnabled ? "Inscriptions" : "Calendrier";
    document.title = `${pageLabel} | ${suffix}`;
    return;
  }

  if (route.type === "actualites") {
    document.title = `Actualites | ${suffix}`;
    return;
  }

  if (route.type === "meetings-profile") {
    const profile = profileContent[route.profileKey];
    const pageLabel = route.signupEnabled ? "Inscriptions" : "Calendrier";
    document.title = `${pageLabel} ${profile.label} | ${suffix}`;
    return;
  }

  if (route.type === "meeting-detail") {
    const meeting = meetings.find((item) => item.id === route.meetingId);
    const label = meeting ? meeting.name : "Meeting";
    document.title = `${label} | ${suffix}`;
    return;
  }

  if (route.type === "page") {
    const page = pageSkeletons[route.pageKey];
    document.title = `${page.title} | ${suffix}`;
    return;
  }

  document.title = `Page introuvable | ${suffix}`;
}

const DATA_FILES = {
  meetings: "data/meetings.json",
  actualites: "data/actualites.json",
  profils: "data/profils.json",
  runEssence: "data/run-essence.json",
  pages: "data/pages.json",
  contact: "data/contact.json",
  legal: "data/legal.json",
  documentsPilotes: "data/documents-pilotes.json",
};

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Chargement impossible: ${url} (HTTP ${response.status})`);
  }
  return response.json();
}

function buildRaceFormsMap(raceFormsList) {
  if (!Array.isArray(raceFormsList)) return undefined;
  const map = {};
  raceFormsList.forEach((entry) => {
    if (entry && entry.meeting && entry.url) {
      map[entry.meeting] = entry.url;
    }
  });
  return map;
}

function buildProfile(profileJson, newsFeed) {
  const forms = { ...profileJson.forms };
  const raceFormsByMeeting = buildRaceFormsMap(forms.raceFormsByMeeting);
  if (raceFormsByMeeting) {
    forms.raceFormsByMeeting = raceFormsByMeeting;
  }

  return {
    ...profileJson,
    forms,
    newsFeed: Array.isArray(newsFeed) ? newsFeed : [],
  };
}

function buildPilotDocsByMeeting(parMeeting) {
  const map = {};
  (parMeeting || []).forEach((entry) => {
    if (!entry || !entry.meeting) return;
    const docs = { commonDocuments: entry.commonDocuments || [] };
    if (Array.isArray(entry.pilotDocuments) && entry.pilotDocuments.length) {
      docs.pilotDocuments = entry.pilotDocuments;
    }
    if (entry.vehicleDocuments && typeof entry.vehicleDocuments === "object") {
      docs.vehicleDocuments = entry.vehicleDocuments;
    }
    map[entry.meeting] = docs;
  });
  return map;
}

/**
 * Charge tous les contenus du site depuis data/*.json et reconstruit
 * les structures attendues par l'application.
 * @returns {Promise<object>}
 */
export async function loadSiteContent() {
  const [
    meetingsJson,
    actualitesJson,
    profilsJson,
    runEssenceJson,
    pagesJson,
    contactJson,
    legalJson,
    documentsPilotesJson,
  ] = await Promise.all([
    fetchJson(DATA_FILES.meetings),
    fetchJson(DATA_FILES.actualites),
    fetchJson(DATA_FILES.profils),
    fetchJson(DATA_FILES.runEssence),
    fetchJson(DATA_FILES.pages),
    fetchJson(DATA_FILES.contact),
    fetchJson(DATA_FILES.legal),
    fetchJson(DATA_FILES.documentsPilotes),
  ]);

  return {
    meetings: meetingsJson.meetings || [],
    runEssenceArchives: runEssenceJson.issues || [],
    profileContent: {
      commissaire: buildProfile(profilsJson.commissaire, actualitesJson.commissaires),
      pilote: buildProfile(profilsJson.pilote, actualitesJson.pilotes),
    },
    pageSkeletons: pagesJson,
    contactPageContent: contactJson,
    legalPageContent: legalJson,
    pilotMeetingDocumentation: documentsPilotesJson.parType || {},
    pilotMeetingDocumentationByMeeting: buildPilotDocsByMeeting(
      documentsPilotesJson.parMeeting
    ),
  };
}

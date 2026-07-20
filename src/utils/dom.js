/**
 * Returns the DOM element by id.
 * @param {string} id
 * @returns {HTMLElement|null}
 */
export const byId = (id) => document.getElementById(id);

/**
 * Escapes user/content strings before interpolation in HTML templates.
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const SAFE_URL_SCHEMES = new Set(["https", "http", "mailto", "tel"]);

/**
 * Valide une URL issue du contenu (data/*.json) avant insertion dans un
 * attribut href/src. escapeHtml protege la sortie d'attribut mais pas les
 * schemas dangereux (javascript:, data:, vbscript:...).
 * Autorise: https, http, mailto, tel et les chemins relatifs ou absolus
 * du site (assets/..., /meetings...). Tout le reste retourne "#".
 * @param {unknown} value
 * @returns {string}
 */
export function sanitizeUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";

  // Retire les caracteres de controle qui serviraient a deguiser un schema
  // (ex. "java\tscript:alert(1)" est interprete comme javascript: par le
  // navigateur).
  const cleaned = raw.replace(/[\u0000-\u001F\u007F]/g, "");

  // URL protocol-relative (//autre-domaine.tld): refusee.
  if (cleaned.startsWith("//")) return "#";

  const schemeMatch = cleaned.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/);
  if (!schemeMatch) return cleaned;

  return SAFE_URL_SCHEMES.has(schemeMatch[1].toLowerCase()) ? cleaned : "#";
}

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

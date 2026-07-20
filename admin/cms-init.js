// Initialisation explicite de Sveltia CMS.
// Necessaire depuis l'auto-hebergement du bundle (admin/vendor/): charge
// hors d'un CDN connu, Sveltia active son mode « manual init » et attend
// cet appel. La configuration est lue depuis /admin/config.yml comme avant.
// Fichier externe (et non script inline) pour respecter la CSP du scope
// /admin (script-src 'self').
import "/admin/vendor/sveltia-cms-0.170.8.js";

window.CMS.init();

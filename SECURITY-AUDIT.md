# Audit de sécurité — Site ASA Prenois Bourgogne

Date: juillet 2026. Périmètre: SPA statique (Vercel), CMS Sveltia
(`/admin`), OAuth GitHub (`api/auth.js`, `api/callback.js`), contenu
éditorial `data/*.json`.

## 1. Vulnérabilités corrigées (audit externe)

| # | Sévérité | Vulnérabilité | Correctif | Commit |
|---|---|---|---|---|
| 1.1 | Moyen | Aucun en-tête de sécurité HTTP | Section `headers` de `vercel.json`: nosniff, `X-Frame-Options: SAMEORIGIN`*, Referrer-Policy, Permissions-Policy restrictive, CSP stricte (scripts inline par hash sha256, pas d'`unsafe-inline` script) + CSP dédiée `/admin` | `sec: ajoute les en-tetes de securite HTTP (CSP incluse)` |
| 1.2 | Moyen | `postMessage` du callback OAuth vers `*` et `event.origin` non vérifié | Liste `ALLOWED_OPENER_ORIGINS` (production), vérification d'`event.origin` avant tout envoi du jeton, handshake ciblé (jamais `*`) | `sec: verrouille le postMessage du callback OAuth` |
| 1.3 | Faible | URLs `javascript:`/`data:` possibles dans les champs href du contenu CMS | `sanitizeUrl()` dans `src/utils/dom.js`, appliquée aux 14 points d'injection `href`/`src` alimentés par `data/*.json` (dont l'iframe PDF) | `sec: valide les URLs issues du contenu CMS (sanitizeUrl)` |
| 1.4 | Faible | Scope OAuth `repo,user` trop large | Scope réduit à `repo read:user` (justification de `repo` en commentaire; migration GitHub App documentée comme amélioration future) | `sec: reduit le scope OAuth a repo + read:user` |
| 1.5 | Faible | Sveltia CMS chargé depuis unpkg sans intégrité | Option A: bundle auto-hébergé dans `admin/vendor/` (intégrité vérifiée contre le registre npm), `unpkg.com` retiré de `script-src`. Note: `unpkg.com` reste autorisé en `connect-src` du scope `/admin` uniquement — le CMS y lit `package.json` pour signaler les mises à jour disponibles (lecture seule, aucun code exécuté) | `sec: auto-heberge Sveltia CMS (suppression de la dependance unpkg)` |

\* `SAMEORIGIN` et non `DENY`: la page d'accueil affiche les PDF du site
dans un iframe same-origin (lecteur Run Essence). `DENY` casserait ce
lecteur. Complété par `frame-ancestors 'self'` dans la CSP.

Adaptations liées à la CSP (commit 1.1): chargement des polices Google
sans gestionnaire `onload` inline, retrait du fallback `onerror` du logo
FFSA (WebP universel), script du splash `/admin` externalisé
(`admin/splash.js`), `logo_url` du CMS en chemin relatif. L'outil
`tools/generate-csp-hashes.cjs` recalcule les hashes après toute
modification d'un script inline de `index.html`.

## 2. Résultats de la phase 2 (configuration locale)

- **Secrets / fichiers d'environnement**: aucun `.env` versionné, aucun
  `.env` dans l'historique git, aucun secret en dur dans les sources.
  `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET` lus exclusivement via
  `process.env` dans `api/`. Le `.gitignore` exclut `.env*`. ✅
- **Widgets du CMS** (`admin/config.yml`): aucun widget `markdown` ni
  `code`. Contenu 100 % texte plat (string/text/select/…), rendu via
  `escapeHtml` + `sanitizeUrl`. Aucune injection HTML possible depuis le
  contenu éditorial. ✅
- **Endpoints publics `/api/*`**: ajout d'un garde-fou anti-abus sur
  `/api/auth` — rejet 403 des requêtes `Sec-Fetch-Site: cross-site`
  (flux légitime: same-origin ou navigation directe; les navigateurs
  sans ce header restent acceptés). Commit
  `sec: refuse le demarrage du flux OAuth depuis un site tiers`.
  Le CSRF du callback reste couvert par le cookie `oauth_state`
  (HttpOnly, Secure, SameSite=Lax) et le postMessage est verrouillé.
  Un rate limiting applicatif supplémentaire n'a pas été jugé
  nécessaire: les endpoints ne font aucun travail coûteux et Vercel
  applique ses protections plateforme.
- **Déploiements preview**: les fonctions `/api/*` s'exécutent aussi sur
  les URLs de preview si les variables d'environnement y sont exposées.
  Risque résiduel faible: la callback URL enregistrée dans la GitHub
  OAuth App pointe uniquement vers la production (GitHub refuse tout
  autre `redirect_uri`), et le postMessage n'accepte que l'origine de
  production. Recommandation tout de même: scoper les variables au seul
  environnement **Production** (action manuelle ci-dessous).
- **Divers vérifiés**: tous les `target="_blank"` portent
  `rel="noopener noreferrer"` (y compris les `window.open`);
  `robots.txt` exclut `/admin` et `/api`; `/admin` est en
  `noindex, nofollow`; le fichier `_redirects` (héritage Netlify) est
  sans effet sur Vercel — conservé pour mémoire, `vercel.json` fait foi.

## 3. Checklist des actions manuelles restantes

Dashboard **Vercel** (Settings → Environment Variables):
- [ ] Vérifier que `GITHUB_CLIENT_ID` et `GITHUB_CLIENT_SECRET` sont
  scopés à l'environnement **Production uniquement** (décocher Preview
  et Development).
- [ ] Après déploiement, vérifier dans les DevTools que le header
  `Strict-Transport-Security` est bien servi par Vercel sur le domaine
  custom (sinon l'ajouter dans `vercel.json`).
- [ ] Optionnel: activer « Attack Challenge Mode » ponctuellement en cas
  d'abus constaté sur les fonctions.

**GitHub** (compte propriétaire du dépôt):
- [ ] Vérifier que l'OAuth App n'a qu'une seule callback URL:
  `https://www.asa-prenois-bourgogne.org/api/callback`.
- [ ] Passer en revue les collaborateurs du dépôt (droits `write`
  uniquement pour les éditeurs actifs) et encourager la 2FA.
- [ ] Amélioration future: migrer l'OAuth App vers une **GitHub App**
  (permissions limitées au seul dépôt, jetons à durée courte).
- [ ] Optionnel: activer le secret scanning + push protection sur le
  dépôt (Settings → Code security).

**Après chaque mise à jour de contenu du CMS**: rien à faire — les
protections (échappement, sanitizeUrl, CSP) sont côté code.

## 4. Tester le flux CMS après déploiement

1. Ouvrir `https://www.asa-prenois-bourgogne.org/admin` : l'écran de
   chargement ASA apparaît, puis l'écran « Sign In with GitHub ».
2. Se connecter (popup GitHub → autorisation → retour au CMS). En cas de
   blocage, vérifier la console: aucun message `Refused ... Content
   Security Policy` ne doit apparaître.
3. Modifier un contenu de test (ex. une actualité), enregistrer,
   vérifier que le commit apparaît sur `main` et que le site se met à
   jour après ~2 min.
4. Vérifier les en-têtes dans les DevTools (onglet Réseau → réponse de
   la page): `Content-Security-Policy`, `X-Frame-Options`,
   `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`,
   `Strict-Transport-Security`.
5. Maintenance: après toute modification d'un script inline de
   `index.html`, relancer `node tools/generate-csp-hashes.cjs` et
   reporter les hashes dans `vercel.json`.

# Architecture

## Vue d'ensemble
Le projet est un SPA hash-based sans framework.  
Le navigateur charge `index.html`, puis `app.js` charge les contenus
depuis `data/*.json` et orchestre le rendu selon la route.

Une interface d'administration (Sveltia CMS) est disponible sur `/admin`
pour editer les fichiers `data/*.json` et les medias sans toucher au code
(voir `docs/CMS-SETUP.md`).

## Couches
1. Donnees:
   - `data/*.json` (meetings, actualites, profils, pages, contact,
     pages legales, documents pilotes, journal Run Essence)
   - Role: stocker les contenus et constantes metier, sans logique.
   - Editables via le CMS `/admin` (commit Git + redeploiement Vercel).
2. Core:
   - `src/core/content-loader.js`
   - `src/core/routing.js`
   - `src/core/topbar-menu.js`
   - Role: logique transverse reutilisable (chargement des contenus,
     route, titre, navigation header).
3. Utilitaires:
   - `src/utils/dom.js`
   - Role: fonctions generiques non metier.
4. Application:
   - `app.js`
   - Role: composer les briques, rendre les vues, brancher les events.
5. Administration:
   - `admin/index.html` + `admin/config.yml` (Sveltia CMS)
   - `api/auth.js` + `api/callback.js` (OAuth GitHub, fonctions Vercel)
   - Role: edition du contenu par les membres du bureau.

## Flux d'execution
1. `mount()` charge les contenus via `loadSiteContent()` (fetch des
   `data/*.json` en parallele); en cas d'echec, un message de repli est
   affiche.
2. `mount()` initialise ensuite la topbar et le cycle de route.
3. `renderCurrentRoute()`:
   - parse la route (`parseRoute`)
   - met a jour nav active et titre
   - rend la vue cible
   - branche les handlers de la vue

## Choix SOLID appliques
- SRP:
  - routing, topbar et chargement des contenus extraits de `app.js`
    vers des modules dedies.
- OCP:
  - ajout de nouvelles routes via le module routing sans toucher au reste.
- DIP:
  - les modules core recoivent leurs dependances via parametres
    (`profileContent`, `meetings`, callbacks).

## Conventions de dependances
- `app.js` peut dependre de `core`, `utils`, `data/*.json` (via le loader).
- `core` ne depend pas de `app.js`.
- `utils` ne depend de personne.
- `data/*.json` reste purement declaratif (aucun code).
- `admin/` et `api/` ne sont jamais importes par le site public.

## Publication de contenu (CMS)
1. L'editeur se connecte sur `/admin` (OAuth GitHub via `api/`).
2. Sveltia CMS modifie `data/*.json` ou `assets/uploads/` et cree un
   commit sur `main`.
3. Vercel redeploye automatiquement le site.

## Evolution recommandee
- Extraire les renders par domaine (`views/home`, `views/meetings`, etc.).
- Ajouter un dossier `services/` pour logique metier non-UI.
- Introduire des tests unitaires sur `routing.js` et `content-loader.js`.

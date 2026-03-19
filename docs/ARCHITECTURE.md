# Architecture

## Vue d'ensemble
Le projet est un SPA hash-based sans framework.  
Le navigateur charge `index.html`, puis `app.js` orchestre le rendu selon la route.

## Couches
1. Donnees:
   - `site-data.js`
   - Role: stocker les contenus et constantes metier, sans logique DOM.
2. Core:
   - `src/core/routing.js`
   - `src/core/topbar-menu.js`
   - Role: logique transverse reutilisable (route, titre, navigation header).
3. Utilitaires:
   - `src/utils/dom.js`
   - Role: fonctions generiques non metier.
4. Application:
   - `app.js`
   - Role: composer les briques, rendre les vues, brancher les events.

## Flux d'execution
1. `mount()` initialise la topbar et le cycle de route.
2. `renderCurrentRoute()`:
   - parse la route (`parseRoute`)
   - met a jour nav active et titre
   - rend la vue cible
   - branche les handlers de la vue

## Choix SOLID appliques
- SRP:
  - routing et topbar extraits de `app.js` vers des modules dedies.
- OCP:
  - ajout de nouvelles routes via le module routing sans toucher au reste.
- DIP:
  - les modules core recoivent leurs dependances via parametres (`profileContent`, `meetings`, callbacks).

## Conventions de dependances
- `app.js` peut dependre de `core`, `utils`, `site-data`.
- `core` ne depend pas de `app.js`.
- `utils` ne depend de personne.
- `site-data` reste sans import.

## Evolution recommandee
- Extraire les renders par domaine (`views/home`, `views/meetings`, etc.).
- Ajouter un dossier `services/` pour logique metier non-UI.
- Introduire des tests unitaires sur `routing.js`.

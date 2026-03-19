# Refactor Roadmap

## Etat actuel
- Routing et navigation topbar deja extraits dans `src/core`.
- Helpers DOM centralises dans `src/utils`.
- `app.js` reste l'orchestrateur principal mais encore volumineux.

## Etape 1 - Extraction des vues
- Creer `src/views/`:
  - `home-view.js`
  - `meetings-view.js`
  - `news-view.js`
  - `pages-view.js`
- Objectif:
  - alleger `app.js`
  - separer rendu HTML et orchestration.

## Etape 2 - Extraction metier meetings
- Creer `src/domain/meetings/`:
  - tri/date
  - filtres
  - resolution image/fond hero
- Objectif:
  - rendre testable la logique meetings hors DOM.

## Etape 3 - Tests
- Ajouter un runner de tests leger (Vitest/Jest selon preference).
- Priorite tests:
  - parsing route
  - titre document
  - tri/filtrage des meetings

## Etape 4 - Qualite continue
- Ajouter linter + formatteur (ESLint + Prettier).
- Ajouter pipeline CI (lint + check + tests).

## Definition of Done (refactor)
- Pas de regression fonctionnelle visible.
- Responsabilites de fichiers explicites.
- Documentation synchronisee (`README` + `docs/*`).

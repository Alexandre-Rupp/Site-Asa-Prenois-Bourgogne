# Coding Standards

## JavaScript
- Preferer des fonctions courtes et nommees par intention.
- Eviter la logique metier dans les handlers DOM.
- Garder les modules a responsabilite unique.
- Passer les dependances explicitement en parametres.
- Limiter les effets de bord aux points d'entree (`mount`, events).

## HTML/CSS
- Conserver une structure semantique (`header`, `nav`, `main`, `section`).
- Utiliser des classes explicites (`js-*` pour hooks JS).
- Ne pas coupler logique JS et style CSS via IDs rigides.
- Garder les media queries coherentes avec les breakpoints existants.

## Donnees
- Les contenus vivent dans `data/*.json` et doivent rester declaratifs.
- Pas de code ni d'acces DOM dans les fichiers de donnees.
- Eviter les duplications de labels/copy.
- Toute evolution de structure JSON doit etre repercutee dans
  `admin/config.yml` (champs CMS) et `src/core/content-loader.js`.

## Documentation
- Toute nouvelle logique transverse doit etre documentee dans `docs/ARCHITECTURE.md`.
- Toute convention supplementaire doit etre ajoutee ici.
- Ajouter des commentaires uniquement quand la logique n'est pas immediatement lisible.

## Checklist avant merge
- `node --check app.js`
- `node --check src/core/routing.js`
- verifier syntaxe des nouveaux modules (`node --check <file>.js`)
- `node tools/check-quality.cjs` (valide aussi les `data/*.json`)
- test manuel desktop + mobile:
  - navigation principale
  - calendrier/inscriptions
  - page vie-asa
  - burger menu mobile

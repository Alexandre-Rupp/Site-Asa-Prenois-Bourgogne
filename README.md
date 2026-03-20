# Site-circuit

Site vitrine statique (HTML/CSS/JS) pour l'ASA Prenois Bourgogne.

## Objectifs
- Afficher les parcours `calendrier`, `inscriptions`, `actualites`, `contacts` et `vie-asa`.
- Rester simple a deployer (aucun build obligatoire).
- Garder un code evolutif avec responsabilites claires et une architecture modulaire.

## Lancement local
1. Ouvrir un terminal dans `Site-circuit`.
2. Demarrer un serveur statique:
   - `python -m http.server 5500`
3. Ouvrir `http://localhost:5500`.

## Verification qualite rapide
Executer les controles automatiques avant push:

```powershell
node --check app.js
node --check src/core/routing.js
node tools/check-quality.cjs
```

## Structure du projet
```text
Site-circuit/
  assets/                # Images, PDF, logos, medias
  docs/                  # Documentation architecture + standards
  src/
    core/
      routing.js         # Parsing des routes et titre document
      topbar-menu.js     # Navigation topbar / burger mobile
    utils/
      dom.js             # Helpers DOM (escape, byId)
  app.js                 # Orchestrateur principal (render + cycle route)
  index.html             # Shell HTML
  site-data.js           # Donnees de contenu (meetings, pages, textes)
  styles.css             # Styles globaux et responsive
```

## Architecture (resume)
- `site-data.js` contient uniquement des donnees metier.
- `src/core/*` contient la logique transverse (routing/navigation).
- `app.js` orchestre les vues et branche les modules.
- `src/utils/*` contient des fonctions reutilisables sans logique metier.

Details: [ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## Principes de qualite
- Responsabilite unique par module/fonction (SRP).
- Dependances explicites via parametres (DIP simplifie).
- Fonctions pures privilegiees pour le routing/titre.
- Conventions de nommage et structure documentees.

Details: [CODING-STANDARDS.md](./docs/CODING-STANDARDS.md)

## Contribution
Guide contribution/tests manuels:
[CONTRIBUTING.md](./docs/CONTRIBUTING.md)

## Roadmap technique
Plan de nettoyage architecture progressif:
[REFACTOR-ROADMAP.md](./docs/REFACTOR-ROADMAP.md)

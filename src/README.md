# `src/`

## But
Regrouper la logique applicative reusable pour eviter un `app.js` monolithique.

## Sous-dossiers
- `core/`: composants transverses (routing, topbar menu).
- `utils/`: utilitaires generiques (DOM, formatage, etc.).

## Regle
Les modules `src/*` ne doivent pas importer `app.js`.

# Release Checklist

## Controle automatique
1. `node --check app.js`
2. `node --check src/core/routing.js`
3. `node tools/check-quality.cjs`

## Controle manuel
1. Parcours desktop:
   - `#/accueil`
   - `#/meetings`
   - `#/inscriptions`
   - `#/actualites`
   - `#/vie-asa`
   - `#/contact`
2. Parcours mobile:
   - menu burger (ouverture/fermeture)
   - navigation principales accessibles
3. Inscriptions:
   - statuts "Inscriptions fermees" conformes
   - liens formulaires actifs conformes
4. SEO:
   - titre/meta description adaptes a la route
   - balises Open Graph/Twitter presentes
   - `sitemap.xml` et `robots.txt` a jour

## Publication
1. Push sur `dev`
2. Validation visuelle sur environnement de preproduction
3. Verification Search Console apres mise en ligne

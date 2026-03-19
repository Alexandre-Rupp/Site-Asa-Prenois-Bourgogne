# Contributing

## Prerequis
- Python 3 (serveur statique local)
- Navigateur moderne (Chrome/Edge/Firefox)

## Workflow recommande
1. Créer une branche de feature.
2. Realiser un changement cible (petit lot).
3. Verifier le comportement en local.
4. Mettre a jour la documentation si la structure change.

## Lancer le projet
```powershell
python -m http.server 5500
```
Puis ouvrir `http://localhost:5500`.

## Verification manuelle minimale
1. Header:
   - nav desktop
   - burger mobile (ouverture/fermeture, escape, clic exterieur)
2. Routing:
   - `#/accueil`
   - `#/meetings`
   - `#/inscriptions`
   - `#/vie-asa`
3. Meetings:
   - filtre par type
   - detail meeting
4. Vie de l'ASA:
   - navigation "Parcours" visible sur mobile

## Règles de commit
- Message clair et orienté impact.
- Un commit = une intention principale.
- Ne pas melanger refactor structurel et feature metier dans le meme commit si possible.

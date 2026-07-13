# CMS d'administration du contenu (Sveltia CMS)

Le site dispose d'une interface d'administration accessible sur
`https://www.asa-prenois-bourgogne.org/admin`. Elle permet aux membres du
bureau de modifier les textes, les meetings, les actualités, les images et
les PDF du site, sans aucune compétence technique.

Chaque publication depuis le CMS crée un commit Git sur la branche `main`,
ce qui déclenche automatiquement un redéploiement Vercel. L'éditeur ne voit
rien de tout cela: il clique sur « Enregistrer », et le site est à jour
quelques minutes plus tard.

## Fonctionnement technique (résumé)

- `admin/index.html` charge Sveltia CMS depuis le CDN unpkg.
- `admin/config.yml` décrit les collections éditables (une par fichier
  `data/*.json`) avec des libellés en français.
- `api/auth.js` et `api/callback.js` (fonctions serverless Vercel)
  implémentent le flux OAuth GitHub: le CMS obtient un jeton GitHub au nom
  de l'éditeur, et publie les modifications via l'API GitHub.
- Les images téléversées vont dans `assets/uploads/`.

## 1. Créer la GitHub OAuth App (une seule fois)

1. Se connecter sur GitHub avec le compte propriétaire du dépôt
   (`Alexandre-Rupp`).
2. Ouvrir **Settings → Developer settings → OAuth Apps → New OAuth App**
   (https://github.com/settings/applications/new).
3. Renseigner:
   - **Application name**: `ASA Prenois Bourgogne - Admin`
   - **Homepage URL**: `https://www.asa-prenois-bourgogne.org`
   - **Authorization callback URL**:
     `https://www.asa-prenois-bourgogne.org/api/callback`
4. Cliquer **Register application**.
5. Sur la page de l'application:
   - copier le **Client ID**;
   - cliquer **Generate a new client secret** et copier le **Client secret**
     (il n'est affiché qu'une seule fois).

## 2. Ajouter les variables d'environnement dans Vercel

1. Ouvrir le projet sur https://vercel.com → **Settings → Environment
   Variables**.
2. Ajouter deux variables (environnement **Production** au minimum;
   ajoutez aussi Preview si vous voulez tester le CMS sur les previews):

   | Nom | Valeur |
   |---|---|
   | `GITHUB_CLIENT_ID` | le Client ID copié à l'étape 1 |
   | `GITHUB_CLIENT_SECRET` | le Client secret copié à l'étape 1 |

3. Redéployer le site (bouton **Redeploy** sur le dernier déploiement)
   pour que les fonctions `api/*` voient les nouvelles variables.

Aucun secret ne doit jamais être écrit dans le code ou dans le dépôt.

## 3. Ajouter un nouvel éditeur

Chaque éditeur utilise son propre compte GitHub. Étapes pour ajouter un
membre du bureau:

1. **Créer son compte GitHub** (si besoin): https://github.com/signup —
   une adresse email et un mot de passe suffisent.
2. **Activer la double authentification (2FA)**, fortement recommandé:
   sur GitHub, **Settings → Password and authentication → Enable
   two-factor authentication** (avec une application comme Google
   Authenticator, ou par SMS).
3. **L'inviter comme collaborateur du dépôt** (à faire par le propriétaire):
   - ouvrir https://github.com/Alexandre-Rupp/Site-Asa-Prenois-Bourgogne;
   - **Settings → Collaborators → Add people**;
   - saisir le nom d'utilisateur GitHub de l'éditeur;
   - choisir le rôle **Write** (nécessaire pour publier);
   - envoyer l'invitation.
4. L'éditeur reçoit un email d'invitation GitHub et clique **Accept**.
5. C'est tout: il peut maintenant se connecter sur `/admin`.

Pour retirer un éditeur: **Settings → Collaborators → Remove**.

## 4. Guide utilisateur (pour les éditeurs)

> À transmettre tel quel aux membres du bureau.

### Se connecter

1. Ouvrir **www.asa-prenois-bourgogne.org/admin** dans votre navigateur.
2. Cliquer sur **Sign in with GitHub** (se connecter avec GitHub).
3. Si GitHub vous le demande, saisissez votre identifiant et votre mot de
   passe GitHub, puis cliquez sur **Authorize** (autoriser).

### Modifier un texte

1. Dans le menu de gauche, choisissez ce que vous voulez modifier:
   **Actualités**, **Meetings (calendrier)**, **Pages du site**, etc.
2. Cliquez sur l'élément à modifier.
3. Changez le texte dans les champs. Chaque champ a une petite explication
   sous son nom.
4. Cliquez sur **Enregistrer** (Save) en haut, puis sur **Publier**
   (Publish) si demandé.
5. Attendez 1 à 2 minutes: le site est mis à jour automatiquement.

### Ajouter une photo

1. Dans l'article ou la page concernée, cliquez sur le champ photo puis
   **Choisir un fichier** et sélectionnez l'image sur votre ordinateur.
2. Enregistrez comme pour un texte.

Vous pouvez aussi gérer toutes les images depuis l'onglet **Assets**
(médiathèque): y téléverser de nouvelles photos ou supprimer les
anciennes.

### Ajouter une actualité

1. Menu **Actualités** → ouvrir **Articles d'actualité**.
2. Dans la liste **Actualités association (commissaires)** ou
   **Actualités pilotes**, cliquer sur **Ajouter** (Add).
3. Remplir le titre, la date affichée et le texte; ajouter des photos si
   vous le souhaitez.
4. Enregistrer.

### En cas de problème

- « Je n'arrive pas à me connecter »: vérifiez que vous avez bien accepté
  l'invitation GitHub reçue par email, puis réessayez.
- « Ma modification n'apparaît pas »: attendez 2 minutes puis actualisez
  la page du site (touche F5). Si rien ne change, contactez
  l'administrateur du site.
- En cas de doute, ne supprimez rien: contactez l'administrateur.

## Notes pour les développeurs

- Le rewrite SPA de `vercel.json` exclut `/admin` et `/api` pour que
  l'interface d'administration et les fonctions OAuth soient servies
  directement.
- `robots.txt` interdit l'indexation de `/admin` et `/api`.
- Les codes techniques (`r10`, `2026-05`...) restent visibles dans
  quelques collections avancées (meetings, formulaires, documents) car
  l'application relie les visuels et formulaires aux meetings par ces
  codes. Les hints du CMS expliquent leur usage.
- Après un ajout de meeting via le CMS, penser à compléter si besoin les
  mappings `MEETING_VISUALS` / `MEETING_PROMOTER_LOGOS` dans `app.js` et
  le `sitemap.xml` (contrôlé par `node tools/check-quality.cjs`).

// Demarre le flux OAuth GitHub pour Sveltia CMS (/admin).
// Redirige l'editeur vers la page d'autorisation GitHub avec un jeton
// anti-falsification (state) stocke en cookie.
const crypto = require("node:crypto");

module.exports = (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    res
      .status(500)
      .send(
        "Configuration incomplete: la variable d'environnement GITHUB_CLIENT_ID est absente."
      );
    return;
  }

  const state = crypto.randomBytes(24).toString("hex");
  // Scope minimal:
  // - "repo": requis pour que le CMS committe le contenu. Les OAuth Apps
  //   GitHub n'offrent pas de granularite par depot: "repo" donne acces
  //   aux depots accessibles a l'editeur (les editeurs ne sont
  //   collaborateurs que de ce depot). Amelioration future possible:
  //   migrer vers une GitHub App (permissions par depot, jetons courts).
  // - "read:user": lecture du profil pour identifier l'editeur
  //   (remplace l'ancien scope "user", inutilement large car il
  //   permettait aussi la modification du profil).
  const params = new URLSearchParams({
    client_id: clientId,
    scope: "repo read:user",
    state,
  });

  res.setHeader(
    "Set-Cookie",
    `oauth_state=${state}; HttpOnly; Secure; Path=/api; Max-Age=600; SameSite=Lax`
  );
  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
};

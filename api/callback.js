// Callback OAuth GitHub pour Sveltia CMS (/admin).
// Echange le code d'autorisation contre un jeton d'acces, puis repond au CMS
// via postMessage selon le protocole attendu par Sveltia/Decap CMS.

function renderPostMessagePage(state, payload) {
  const provider = "github";
  const message = `authorization:${provider}:${state}:${JSON.stringify(payload)}`;

  return `<!doctype html>
<html lang="fr">
  <head><meta charset="UTF-8" /><title>Authentification en cours...</title></head>
  <body>
    <p>Authentification en cours. Cette fenetre va se fermer automatiquement.</p>
    <script>
      (() => {
        const message = ${JSON.stringify(message)};
        window.addEventListener("message", (event) => {
          if (event.data !== "authorizing:github") return;
          window.opener.postMessage(message, event.origin);
          window.close();
        });
        if (window.opener) {
          window.opener.postMessage("authorizing:github", "*");
        } else {
          document.body.textContent =
            "Fenetre d'authentification invalide. Fermez cet onglet et reessayez depuis /admin.";
        }
      })();
    </script>
  </body>
</html>`;
}

function sendResult(res, state, payload) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader(
    "Set-Cookie",
    "oauth_state=; HttpOnly; Secure; Path=/api; Max-Age=0; SameSite=Lax"
  );
  res.status(200).send(renderPostMessagePage(state, payload));
}

function getCookie(req, name) {
  const cookies = String(req.headers.cookie || "").split(/;\s*/);
  const entry = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return entry ? entry.slice(name.length + 1) : "";
}

module.exports = async (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    sendResult(res, "error", {
      provider: "github",
      error:
        "Configuration incomplete: GITHUB_CLIENT_ID ou GITHUB_CLIENT_SECRET absent.",
    });
    return;
  }

  const { code, state } = req.query || {};
  const expectedState = getCookie(req, "oauth_state");

  if (!code) {
    sendResult(res, "error", {
      provider: "github",
      error: "Code d'autorisation absent. Reessayez depuis /admin.",
    });
    return;
  }

  if (!state || !expectedState || state !== expectedState) {
    sendResult(res, "error", {
      provider: "github",
      error: "Verification de securite echouee (state invalide). Reessayez depuis /admin.",
    });
    return;
  }

  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      }
    );
    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || tokenData.error || !tokenData.access_token) {
      sendResult(res, "error", {
        provider: "github",
        error: tokenData.error_description || tokenData.error || "Echange du code refuse par GitHub.",
      });
      return;
    }

    sendResult(res, "success", {
      provider: "github",
      token: tokenData.access_token,
    });
  } catch (_error) {
    sendResult(res, "error", {
      provider: "github",
      error: "Erreur reseau pendant l'echange du code. Reessayez.",
    });
  }
};

// Masque l'ecran de chargement des que l'application CMS est montee
// dans la page (avec un delai maximal de secours pour ne jamais bloquer).
// Fichier externe (et non script inline) pour rester compatible avec la
// Content-Security-Policy du scope /admin sans hash a maintenir.
(function () {
  const splash = document.getElementById("asa-splash");
  if (!splash) return;

  const hideSplash = () => {
    splash.classList.add("is-hidden");
    observer.disconnect();
  };

  const isCmsNode = (node) =>
    node.nodeType === Node.ELEMENT_NODE &&
    node.id !== "asa-splash" &&
    !node.classList.contains("asa-aide-btn") &&
    node.tagName !== "SCRIPT" &&
    node.tagName !== "STYLE";

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (isCmsNode(node)) {
          // Petite marge pour laisser l'UI se peindre.
          setTimeout(hideSplash, 300);
          return;
        }
      }
    }
  });

  // Le CMS (script module) peut etre monte avant l'execution de ce
  // fichier: verifier l'etat present avant d'attendre une mutation.
  if ([...document.body.children].some(isCmsNode)) {
    setTimeout(hideSplash, 300);
    return;
  }

  observer.observe(document.body, { childList: true });
  setTimeout(hideSplash, 15000);
})();

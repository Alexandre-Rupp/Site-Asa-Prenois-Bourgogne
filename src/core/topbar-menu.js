/**
 * Applies active styles on topbar nav links from route key.
 * @param {string} navKey
 */
export function updateActiveNav(navKey) {
  document.querySelectorAll(".main-nav a[data-nav]").forEach((link) => {
    const isActive = link.dataset.nav === navKey;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
      return;
    }

    link.removeAttribute("aria-current");
  });
}

/**
 * Scrolls viewport to page top.
 */
export function scrollPageToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  });
}

/**
 * Creates an isolated controller for mobile topbar burger interactions.
 * @param {object} params
 * @param {() => void} [params.onMenuStateChange]
 */
export function createTopbarMenuController({ onMenuStateChange } = {}) {
  const topbar = document.querySelector(".topbar");
  const toggleButton = document.querySelector(".js-nav-toggle");
  const nav = document.querySelector(".main-nav");

  const notifyLayoutChange = () => {
    if (typeof onMenuStateChange === "function") {
      onMenuStateChange();
    }
  };

  const setMenuOpen = (isOpen) => {
    if (!topbar || !toggleButton) return;

    const shouldOpen = Boolean(isOpen);
    topbar.classList.toggle("is-nav-open", shouldOpen);
    toggleButton.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    toggleButton.setAttribute(
      "aria-label",
      shouldOpen ? "Fermer le menu principal" : "Ouvrir le menu principal"
    );

    notifyLayoutChange();
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const bindEvents = () => {
    if (!topbar || !toggleButton || !nav) return;

    toggleButton.addEventListener("click", () => {
      const isOpen = topbar.classList.contains("is-nav-open");
      setMenuOpen(!isOpen);
    });

    nav.addEventListener("click", (event) => {
      if (!event.target.closest("a")) return;
      closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (topbar.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      closeMenu();
    });
  };

  return {
    bindEvents,
    closeMenu,
  };
}

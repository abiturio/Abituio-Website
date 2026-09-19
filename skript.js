const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const searchToggle = document.querySelector(".search-toggle");
const searchPanel = document.querySelector(".search-panel");
const searchInput = document.querySelector("#site-search");
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const openMobileMenu = () => {
  if (!menuToggle || !mobileMenu) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Menü schließen");
  mobileMenu.hidden = false;
  document.body.classList.add("menu-open");

  requestAnimationFrame(() => {
    mobileMenu.classList.add("is-open");
  });

  if (searchPanel && !searchPanel.hidden) {
    searchPanel.hidden = true;
    document.body.classList.remove("search-open");
  }
};

const closeMobileMenu = () => {
  if (!menuToggle || !mobileMenu) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Menü öffnen");
  mobileMenu.classList.remove("is-open");
  document.body.classList.remove("menu-open");

  const hideAfterAnimation = () => {
    if (menuToggle.getAttribute("aria-expanded") === "false") {
      mobileMenu.hidden = true;
    }
  };

  mobileMenu.addEventListener("transitionend", hideAfterAnimation, { once: true });
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

if (searchToggle && searchPanel) {
  searchToggle.addEventListener("click", () => {
    const isHidden = searchPanel.hidden;

    searchPanel.hidden = !isHidden;
    document.body.classList.toggle("search-open", isHidden);

    if (mobileMenu && !mobileMenu.hidden) {
      closeMobileMenu();
    }

    if (isHidden && searchInput) {
      searchInput.focus();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();

    if (searchPanel) {
      searchPanel.hidden = true;
    }

    document.body.classList.remove("menu-open", "search-open");
  }
});

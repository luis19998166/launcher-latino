import { initWindowControls, showWindowWhenReady } from "./lib/window-controls.js";
import { initRouter } from "./lib/router.js";
import { renderNews } from "./lib/news-list.js";
import { initPlayButton } from "./lib/play-button.js";
import { isTauri } from "./lib/tauri.js";

function initPasswordToggles() {
  document.querySelectorAll(".password-toggle").forEach((toggle) => {
    const input = toggle.closest(".auth-input")?.querySelector("input");
    if (!input) return;

    toggle.addEventListener("click", () => {
      const isVisible = input.type === "text";
      input.type = isVisible ? "password" : "text";
      toggle.setAttribute("aria-label", isVisible ? "Ver contrasena" : "Ocultar contrasena");
      toggle.setAttribute("aria-pressed", String(!isVisible));
      toggle.textContent = isVisible ? "◉" : "◎";
    });
  });
}

function init() {
  initWindowControls();
  initRouter();
  renderNews();
  initPlayButton();
  initPasswordToggles();

  // En una app de escritorio el menu contextual del webview no aporta nada.
  if (isTauri) {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  showWindowWhenReady();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

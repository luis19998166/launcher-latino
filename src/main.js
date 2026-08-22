import { initWindowControls, showWindowWhenReady } from "./lib/window-controls.js";
import { initRouter } from "./lib/router.js";
import { renderNews } from "./lib/news-list.js";
import { initPlayButton } from "./lib/play-button.js";
import { isTauri } from "./lib/tauri.js";

function init() {
  initWindowControls();
  initRouter();
  renderNews();
  initPlayButton();

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

/**
 * Router de pantallas.
 *
 * No hay URLs ni history: un launcher es una ventana fija. Simplemente
 * alterna la clase `is-active` entre `[data-screen]` y `[data-route]`.
 */
export function initRouter(root = document) {
  const navButtons = [...root.querySelectorAll("[data-route]")];
  const screens = [...root.querySelectorAll("[data-screen]")];

  function go(route) {
    const target = screens.find((s) => s.dataset.screen === route);
    if (!target) {
      console.warn(`No existe la pantalla "${route}"`);
      return;
    }

    screens.forEach((s) => s.classList.toggle("is-active", s === target));
    navButtons.forEach((b) => b.classList.toggle("is-active", b.dataset.route === route));
  }

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => go(btn.dataset.route));
  });

  const accountButtons = [...root.querySelectorAll("[data-account-route]")];
  const accountViews = [...root.querySelectorAll("[data-account-view]")];

  function goAccount(view) {
    accountViews.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.accountView === view);
    });
  }

  accountButtons.forEach((button) => {
    button.addEventListener("click", () => goAccount(button.dataset.accountRoute));
  });

  return { go };
}

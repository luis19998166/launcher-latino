import { getWindow, isTauri } from "./tauri.js";

/**
 * Conecta los botones del titlebar (`data-window-action`) con la ventana nativa.
 * Sin esto la ventana no se puede minimizar ni cerrar: no tiene bordes nativos.
 */
export function initWindowControls(root = document) {
  const buttons = root.querySelectorAll("[data-window-action]");

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const appWindow = await getWindow();
      if (!appWindow) {
        console.info(`[browser] accion de ventana "${btn.dataset.windowAction}" omitida`);
        return;
      }

      switch (btn.dataset.windowAction) {
        case "minimize":
          await appWindow.minimize();
          break;
        case "close":
          await appWindow.close();
          break;
        default:
          console.warn(`Accion de ventana desconocida: ${btn.dataset.windowAction}`);
      }
    });
  });
}

/**
 * La ventana arranca con `visible: false` en tauri.conf.json para que el
 * usuario no vea un flash blanco mientras carga el webview.
 * La mostramos cuando el primer frame ya esta pintado.
 */
export function showWindowWhenReady() {
  if (!isTauri) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(async () => {
      const appWindow = await getWindow();
      await appWindow?.show();
      await appWindow?.setFocus();
    });
  });
}

/**
 * Puente seguro hacia la API de Tauri.
 *
 * El front-end tiene que poder correr en dos contextos:
 *   1. `npm run start`  -> dentro de la ventana Tauri (API disponible)
 *   2. `npm run dev`    -> en el navegador, para maquetar rapido (API ausente)
 *
 * Todo lo que toque la API pasa por aqui para que el modo navegador no reviente.
 */

export const isTauri = typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

/**
 * Importa la ventana actual solo si estamos dentro de Tauri.
 * @returns {Promise<import("@tauri-apps/api/window").Window | null>}
 */
export async function getWindow() {
  if (!isTauri) return null;
  const { getCurrentWindow } = await import("@tauri-apps/api/window");
  return getCurrentWindow();
}

/**
 * Invoca un comando de Rust. En modo navegador devuelve `fallback`
 * en lugar de fallar, para no bloquear el trabajo de diseno.
 */
export async function safeInvoke(command, args = {}, fallback = null) {
  if (!isTauri) {
    console.info(`[browser] invoke("${command}") omitido`, args);
    return fallback;
  }
  const { invoke } = await import("@tauri-apps/api/core");
  return invoke(command, args);
}

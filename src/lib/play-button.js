/**
 * Estados del boton principal y de la barra de progreso.
 *
 * Esto es SOLO front-end: la descarga esta simulada para poder ver y ajustar
 * cada estado visual. Cuando exista backend, `start()` llamara a un comando
 * de Rust y el progreso vendra de un evento en vez del temporizador.
 */

const STATES = {
  ready: { label: "JUGAR", status: "Listo para jugar", progress: false, disabled: false },
  updating: { label: "ACTUALIZANDO", status: "Descargando actualizacion...", progress: true, disabled: true },
  launching: { label: "INICIANDO", status: "Abriendo el juego...", progress: false, disabled: true },
};

export function initPlayButton(root = document) {
  const button = root.querySelector('[data-action="play"]');
  const label = root.querySelector('[data-bind="play-label"]');
  const status = root.querySelector('[data-bind="status-label"]');
  const progress = root.querySelector('[data-bind="progress"]');
  const fill = root.querySelector('[data-bind="progress-fill"]');

  if (!button || !label || !status || !progress || !fill) return;

  let timer = null;

  function setState(name) {
    const state = STATES[name];
    if (!state) return;

    label.textContent = state.label;
    status.textContent = state.status;
    button.disabled = state.disabled;
    progress.hidden = !state.progress;
    if (!state.progress) fill.style.width = "0%";
  }

  function setProgress(percent, detail) {
    const clamped = Math.max(0, Math.min(100, percent));
    fill.style.width = `${clamped}%`;
    status.textContent = detail ?? `Descargando... ${Math.round(clamped)}%`;
  }

  /** Simulacion de descarga, solo para revisar el diseno de cada estado. */
  function simulateUpdate() {
    setState("updating");

    let percent = 0;
    timer = setInterval(() => {
      percent += Math.random() * 9 + 3;

      if (percent >= 100) {
        clearInterval(timer);
        timer = null;
        setProgress(100);
        setState("launching");
        setTimeout(() => setState("ready"), 1200);
        return;
      }

      setProgress(percent);
    }, 260);
  }

  button.addEventListener("click", () => {
    if (timer) return;
    simulateUpdate();
  });

  setState("ready");

  return { setState, setProgress };
}

# Game Launcher

Launcher de escritorio hecho con **Tauri v2** + **HTML/CSS/JS vanilla** (Vite como
dev server y bundler). Solo front-end: la logica de descargas, parcheo y login
todavia no existe.

---

## Requisitos (solo para desarrollar)

| Herramienta | Estado | Nota |
|---|---|---|
| Node.js 18+ | ✅ instalado | |
| MSVC Build Tools | ✅ instalado | necesario para compilar Rust en Windows |
| WebView2 Runtime | ✅ instalado | ya viene con Windows 10/11 |
| **Rust** | ❌ **falta** | ver abajo |

Instalar Rust (una sola vez, ~5 min):

```bash
winget install --id Rustlang.Rustup -e --accept-source-agreements
```

Cierra y reabre la terminal despues de instalarlo para que `cargo` entre al PATH.

> El usuario final **no necesita nada de esto**. Recibe un `.exe` ya compilado.

---

## Comandos

```bash
npm run dev
```
Abre solo el front en el navegador (`http://localhost:1420`). Es lo mas rapido
para maquetar: recarga en caliente y no hace falta compilar Rust. Los botones de
ventana no hacen nada en este modo (no hay ventana nativa que controlar).

```bash
npm run start
```
Abre el launcher real en su ventana Tauri. La primera vez compila Rust y tarda
varios minutos; despues es casi instantaneo.

```bash
npm run dist
```
Compila el `.exe` final optimizado en:
`src-tauri/target/release/game-launcher.exe`

Ese archivo es **portable**: se copia y se ejecuta, sin instalador.

---

## Estructura

```
Launcher/
├── index.html              # markup de todas las pantallas
├── vite.config.js
├── designs/                # tus capturas de referencia (no entra al build)
├── src/
│   ├── main.js             # punto de entrada, arranca todo
│   ├── assets/             # imagenes, fuentes, iconos del launcher
│   ├── data/
│   │   └── news.js         # datos de ejemplo para noticias
│   ├── lib/
│   │   ├── tauri.js        # puente seguro a la API de Tauri
│   │   ├── window-controls.js  # minimizar / cerrar / arrastrar
│   │   ├── router.js       # cambio entre pantallas
│   │   ├── news-list.js
│   │   └── play-button.js  # estados del boton principal
│   └── styles/
│       ├── tokens.css      # ← colores, tipografia, espaciado, radios
│       ├── base.css        # reset
│       ├── titlebar.css
│       ├── layout.css
│       └── components.css
└── src-tauri/
    ├── tauri.conf.json     # tamano de ventana, bordes, CSP, bundle
    ├── capabilities/       # permisos de la API
    ├── icons/              # placeholder — reemplazar por tu logo
    └── src/lib.rs          # aqui iran los comandos de Rust
```

---

## Donde tocar cada cosa

**Colores, tipografia, espaciado** → `src/styles/tokens.css`. Casi todo el
rediseno pasa por ahi.

**Tamano de la ventana / bordes** → `src-tauri/tauri.conf.json`, en
`app.windows[0]`. Ahora esta en 1100x680, sin bordes nativos y no
redimensionable (`resizable: false`).

**Iconos del ejecutable** → cuando tengas el logo (PNG cuadrado, 1024x1024):

```bash
npm run tauri icon ruta/al/logo.png
```

Eso regenera todo `src-tauri/icons/` automaticamente.

---

## Notas de diseno

**Titlebar propio.** La ventana corre con `decorations: false`, asi que la barra
superior de `index.html` es la unica forma de mover y cerrar la ventana. El
atributo `data-tauri-drag-region` es lo que permite arrastrar; si lo quitas, la
ventana deja de moverse.

**Sin flash blanco.** La ventana arranca invisible (`visible: false`) y se
muestra desde JS cuando el primer frame ya esta pintado.

**El boton JUGAR esta simulado.** `play-button.js` corre una descarga falsa para
poder ver los estados visuales (listo / descargando / iniciando). Cuando exista
backend, se cambia el temporizador por un evento de Rust.

**CSP activo.** `tauri.conf.json` define una Content-Security-Policy. Si agregas
recursos de un dominio externo y no cargan, es eso — hay que anadir el dominio
ahi.

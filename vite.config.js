import { defineConfig } from "vite";

// Tauri inyecta esta variable cuando corres en un dispositivo/red externa.
const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
  // Tauri ya imprime sus propios errores; no dejamos que Vite limpie la consola.
  clearScreen: false,

  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host ? { protocol: "ws", host, port: 1421 } : undefined,
    // No recargar el front cuando cambia codigo Rust.
    watch: { ignored: ["**/src-tauri/**"] },
  },

  build: {
    // WebView2 en Windows soporta features modernas: no hace falta transpilar a ES5.
    target: "chrome105",
    minify: "esbuild",
    sourcemap: false,
  },
});

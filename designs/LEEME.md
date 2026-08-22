# Disenos

Deja aqui las capturas de tus disenos. Yo las leo desde esta carpeta y las
traduzco a HTML/CSS.

## Como nombrarlas

Usa el nombre de la pantalla, en minusculas y con guiones:

```
designs/
├── 01-inicio.png
├── 02-noticias.png
├── 03-ajustes.png
├── 04-login.png
└── estados/
    ├── boton-descargando.png
    └── boton-hover.png
```

El numero al inicio me sirve para saber el orden y cual es la pantalla
principal.

## Que ayuda a que quede exacto

- **Resolucion real** de la ventana (ej. 1100x680). Si la captura viene a otra
  escala, dimelo.
- **Codigos de color** si los tienes a mano (hex). Si no, los saco de la imagen.
- **Fuentes**: nombre exacto. Si es una fuente de pago o custom, deja el `.ttf`
  / `.woff2` en `src/assets/fonts/` y la incrusto (asi no depende de que el
  usuario la tenga instalada).
- **Estados**: hover, presionado, deshabilitado, cargando. Si solo tienes el
  estado normal, yo propongo los demas y los revisas.
- **Assets sueltos** (logo, arte de fondo, iconos) en la mejor calidad que
  tengas, mejor en PNG con transparencia o SVG.

## Assets finales

Las imagenes que van dentro del launcher NO van en esta carpeta: van en
`src/assets/`. Esta carpeta es solo la referencia de diseno y no se incluye
en el build.

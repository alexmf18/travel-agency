# Japón Travel

Web de una agencia de viajes a Japón: catálogo, ficha de cada viaje y proceso de reserva.

Hecha con [Astro](https://astro.build), Tailwind CSS v4 y React para las partes interactivas.

## Comandos

| Comando           | Qué hace                                         |
| ----------------- | ------------------------------------------------ |
| `npm install`     | Instala las dependencias                         |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321`       |
| `npm run build`   | Genera la web estática en `dist/`                |
| `npm run preview` | Sirve `dist/` para revisarla antes de publicar   |
| `npm run check`   | Comprueba los tipos de TypeScript y Astro        |

## Formularios

El contacto y la newsletter se envían con [Formspree](https://formspree.io). Crea un formulario allí, copia `.env.example` como `.env` y pon su ID en `PUBLIC_FORMSPREE_ID`.

Sin ID, en desarrollo el envío se simula (aparece un aviso en la consola) y en producción se muestra un error que remite al email de contacto.

## Publicación

La web se publica en GitHub Pages (https://alexmf18.github.io/travel-agency/) con el workflow `.github/workflows/deploy.yml`, que la genera y la sube en cada push a `master`. En el repositorio, Settings → Pages → Source debe estar en **GitHub Actions**.

Como la web vive en `/travel-agency/`, `astro.config.mjs` define `base`. Los enlaces internos se escriben con `ruta()` (`src/lib/rutas.ts`), nunca con una barra inicial: `ruta('viajes/tokio-clasico/')` y no `'/viajes/tokio-clasico/'`.

Si se usa un dominio propio, cambia `site`, quita `base` y actualiza la URL del sitemap en `public/robots.txt`.

## Estructura

```
src/
  data/
    trips.ts        Catálogo de viajes (precios, itinerarios, salidas...)
    site.ts         Contacto, redes, testimonios e imágenes del hero
    types.ts        Tipos del catálogo
  pages/
    index.astro               Portada
    viajes/[slug].astro       Plantilla única para la ficha de cada viaje
    checkout.astro            Datos y pago
    confirmacion.astro        Reserva confirmada
  components/
    home/       Secciones de la portada
    trip/       Itinerario, reseñas y tarjeta de reserva (React)
    checkout/   Formulario de pago y confirmación (React)
  layouts/BaseLayout.astro    Navbar, footer y estilos globales
  styles/                     CSS global y de cada tipo de página
```

## Diseño

Los tokens están en `src/styles/global.css`:

- **Color:** neutros "sumi" y un único acento bermellón. Se usan por su función (`bg-surface`, `text-ink-2`, `bg-accent`...) y cambian solos en modo oscuro. La paleta por defecto de Tailwind está desactivada.
- **Tipografía:** Bricolage Grotesque para los títulos y Geist para el texto.
- **Iconos:** [Phosphor](https://phosphoricons.com). En Astro se usa `<Icon name="airplane" />` (`src/components/Icon.astro`) y en React, `@phosphor-icons/react`.
- **Modo oscuro:** sigue al sistema hasta que se elige uno con el botón del menú.

## Añadir un viaje

Añade un objeto al array de `src/data/trips.ts`. La portada, su ficha en `/viajes/<slug>/`, el checkout y el sitemap se generan solos.

Las salidas son `{ fecha: 'AAAA-MM-DD', plazas: n }`. Las fechas pasadas se ocultan solas en el navegador, con 0 plazas la salida aparece como completa y con 3 o menos se avisa de "últimas plazas".

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

## Dominio

`site` en `astro.config.mjs` (ahora `https://japontravel.es`) se usa para las URLs canónicas, Open Graph y el sitemap. Cámbialo por el dominio real antes de publicar.

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

## Añadir un viaje

Añade un objeto al array de `src/data/trips.ts`. La portada, su ficha en `/viajes/<slug>/`, el checkout y el sitemap se generan solos.

Las salidas son `{ fecha: 'AAAA-MM-DD', plazas: n }`. Las fechas pasadas se ocultan solas en el navegador, con 0 plazas la salida aparece como completa y con 3 o menos se avisa de "últimas plazas".

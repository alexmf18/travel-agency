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

Añade un objeto al array de `src/data/trips.ts`. La portada, su ficha en `/viajes/<slug>` y el checkout se generan solos.

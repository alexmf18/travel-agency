// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages publica el repositorio en /travel-agency/. Los enlaces internos se
// construyen con ruta() (src/lib/rutas.ts), que añade esta base.
const BASE = '/travel-agency';

// Las páginas del proceso de reserva no deben indexarse.
const PAGINAS_PRIVADAS = ['/checkout', '/confirmacion'];

// https://astro.build/config
export default defineConfig({
  // Dominio público: se usa en las URLs canónicas, Open Graph y el sitemap.
  site: 'https://alexmf18.github.io',
  base: BASE,
  integrations: [
    react(),
    sitemap({
      filter: (page) => !PAGINAS_PRIVADAS.some((ruta) => new URL(page).pathname.startsWith(BASE + ruta)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

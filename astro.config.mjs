// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Las páginas del proceso de reserva no deben indexarse.
const PAGINAS_PRIVADAS = ['/checkout', '/confirmacion'];

// https://astro.build/config
export default defineConfig({
  // Dominio público: se usa en las URLs canónicas, Open Graph y el sitemap.
  site: 'https://alexmf18.github.io/travel-agency/',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !PAGINAS_PRIVADAS.some((ruta) => new URL(page).pathname.startsWith(ruta)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

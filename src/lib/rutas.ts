/**
 * Rutas internas con la base de publicación delante. En GitHub Pages la web vive
 * en /travel-agency/ (ver `base` en astro.config.mjs), así que un enlace a
 * "/viajes/..." apuntaría fuera de ella.
 *
 *   ruta()                     → /travel-agency/
 *   ruta('viajes/tokio/')      → /travel-agency/viajes/tokio/
 *   ruta('#contacto')          → /travel-agency/#contacto
 */
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export function ruta(path = ''): string {
  return BASE + path.replace(/^\//, '');
}

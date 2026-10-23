/**
 * Imágenes de Unsplash a medida: el CDN de Unsplash (imgix) recorta, redimensiona
 * y sirve AVIF/WebP según el navegador con `auto=format`.
 */

export function unsplash(url: string, ancho: number, alto?: number): string {
  const u = new URL(url);
  u.searchParams.set('w', String(ancho));
  if (alto) {
    u.searchParams.set('h', String(alto));
    u.searchParams.set('fit', 'crop');
  }
  u.searchParams.set('auto', 'format');
  u.searchParams.set('q', '75');
  return u.toString();
}

export function srcset(url: string, anchos: number[]): string {
  return anchos.map((ancho) => `${unsplash(url, ancho)} ${ancho}w`).join(', ');
}

/** Atributos `src`, `srcset` y `sizes` listos para un <img>. */
export function responsive(url: string, anchos: number[], sizes: string) {
  return { src: unsplash(url, anchos[Math.floor(anchos.length / 2)]), srcset: srcset(url, anchos), sizes };
}

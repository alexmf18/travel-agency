/**
 * Avisa cuando la página se ha desplazado más de `offset` píxeles, sin escuchar
 * el evento scroll: observa un elemento invisible colocado a esa altura.
 */
export function alPasarDe(offset: number, callback: (pasado: boolean) => void): void {
  const marcador = document.createElement('div');
  marcador.setAttribute('aria-hidden', 'true');
  marcador.style.cssText = `position:absolute;top:${offset}px;left:0;width:1px;height:1px;pointer-events:none;`;
  document.body.prepend(marcador);

  new IntersectionObserver(([entry]) => {
    // El marcador deja de verse por arriba cuando ya se ha pasado de él.
    callback(!entry.isIntersecting && entry.boundingClientRect.top < 0);
  }).observe(marcador);
}

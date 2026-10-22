import type { Trip } from '../data/types';

/** 1299 -> "1.299€" */
export function formatPrecio(euros: number): string {
  return euros.toLocaleString('es-ES', { useGrouping: 'always' }) + '€';
}

/** "7 días · 6 noches" */
export function duracion(trip: Pick<Trip, 'dias' | 'noches'>, separador = ' · '): string {
  return `${trip.dias} días${separador}${trip.noches} noches`;
}

export function viajeros(n: number): string {
  return `${n} viajero${n > 1 ? 's' : ''}`;
}

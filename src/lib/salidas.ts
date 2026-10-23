import type { Salida } from '../data/types';

/** Con estas plazas o menos se avisa de "últimas plazas". */
export const UMBRAL_ULTIMAS_PLAZAS = 3;

const formatoFecha = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const formatoMes = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric', timeZone: 'UTC' });

/** "2026-11-14" -> "14 nov 2026". Si no es una fecha ISO, la devuelve tal cual. */
export function formatFecha(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  return formatoFecha.format(new Date(`${iso}T00:00:00Z`));
}

/** "2026-11" -> "Noviembre 2026" */
export function formatMes(mes: string): string {
  const texto = formatoMes.format(new Date(`${mes}-01T00:00:00Z`)).replace(' de ', ' ');
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** Fecha de hoy en formato ISO, en la zona horaria del navegador. */
export function hoyISO(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Salidas que aún no han pasado (incluye las completas). */
export function salidasFuturas(salidas: Salida[], hoy: string): Salida[] {
  return salidas.filter((s) => s.fecha > hoy);
}

export function estaCompleta(salida: Salida): boolean {
  return salida.plazas <= 0;
}

export function quedanPocas(salida: Salida): boolean {
  return salida.plazas > 0 && salida.plazas <= UMBRAL_ULTIMAS_PLAZAS;
}

/** Primera salida futura con plazas libres. */
export function primeraDisponible(salidas: Salida[], hoy: string): Salida | undefined {
  return salidasFuturas(salidas, hoy).find((s) => !estaCompleta(s));
}

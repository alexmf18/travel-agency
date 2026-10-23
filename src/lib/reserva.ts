import type { Salida, Trip } from '../data/types';
import { duracion } from './format';
import { unsplash } from './imagenes';

/** Datos mínimos de un viaje que necesitan el checkout y la confirmación en el navegador. */
export interface ViajeResumen {
  slug: string;
  nombre: string;
  precio: number;
  duracion: string;
  imagen: string;
  salidas: Salida[];
}

export function resumenDeViaje(trip: Trip): ViajeResumen {
  return {
    slug: trip.slug,
    nombre: trip.nombre,
    precio: trip.precio,
    duracion: duracion(trip),
    imagen: unsplash(trip.tarjeta.imagen, 800, 450),
    salidas: trip.salidas,
  };
}

export interface Reserva {
  localizador: string;
  slug: string;
  viaje: string;
  precio: number;
  personas: number;
  total: number;
  /** Fecha ISO de la salida. */
  fecha: string;
  duracion: string;
  imagen: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
}

export const MAX_VIAJEROS = 20;

const STORAGE_KEY = 'reserva';

export function guardarReserva(reserva: Reserva): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(reserva));
}

export function leerReserva(): Reserva | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const data = raw ? (JSON.parse(raw) as Partial<Reserva>) : null;
    return data?.localizador ? (data as Reserva) : null;
  } catch {
    return null;
  }
}

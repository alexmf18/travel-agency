import { useState } from 'react';
import { formatPrecio } from '../../lib/format';
import { MAX_VIAJEROS } from '../../lib/reserva';

interface Props {
  slug: string;
  precio: number;
  salidas: string[];
}

const MIN_VIAJEROS = 1;

export default function BookingCard({ slug, precio, salidas }: Props) {
  const [personas, setPersonas] = useState(MIN_VIAJEROS);
  const [fecha, setFecha] = useState(salidas[0] ?? '');
  // Cambia en cada pulsación para reiniciar la animación del precio.
  const [flash, setFlash] = useState(0);

  function cambiarPersonas(delta: number) {
    setPersonas((n) => Math.max(MIN_VIAJEROS, Math.min(MAX_VIAJEROS, n + delta)));
    setFlash((n) => n + 1);
  }

  function irAReservar() {
    // El checkout recalcula el precio a partir del catálogo; solo viaja la selección.
    const params = new URLSearchParams({ viaje: slug, personas: String(personas), fecha });
    window.location.href = `/checkout?${params}`;
  }

  const flashClass = flash > 0 ? 'precio-cambia' : '';

  return (
    <div className="bg-white rounded-2xl shadow-md p-7">
      <div className="text-center mb-5">
        <p className="text-gray-500 text-sm mb-1">Precio por persona</p>
        <p key={`base-${flash}`} className={`text-5xl font-extrabold text-red-600 leading-none mb-1 ${flashClass}`}>
          {formatPrecio(precio)}
        </p>
        <p className="text-gray-400 text-xs">impuestos incluidos</p>
      </div>

      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-4">
        <span className="text-gray-700 text-sm font-semibold">Viajeros</span>
        <div className="flex items-center gap-3">
          <button className="counter-btn" onClick={() => cambiarPersonas(-1)} aria-label="Quitar viajero">
            −
          </button>
          <span className="font-bold text-gray-800 w-4 text-center" aria-live="polite">
            {personas}
          </span>
          <button className="counter-btn" onClick={() => cambiarPersonas(1)} aria-label="Añadir viajero">
            +
          </button>
        </div>
      </div>

      <div className="bg-red-50 rounded-xl px-4 py-3 mb-5 flex justify-between items-center">
        <span className="text-gray-700 text-sm font-semibold">Total estimado</span>
        <span key={`total-${flash}`} className={`text-red-600 font-extrabold text-lg ${flashClass}`}>
          {formatPrecio(precio * personas)}
        </span>
      </div>

      <p className="text-gray-600 text-sm font-semibold mb-2">Elige tu salida:</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {salidas.map((s) => (
          <button
            key={s}
            className={`fecha-btn${s === fecha ? ' selected' : ''}`}
            aria-pressed={s === fecha}
            onClick={() => setFecha(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <button
        onClick={irAReservar}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition mb-3 shadow-md"
      >
        <i className="fas fa-calendar-check mr-2"></i>Reservar Ahora
      </button>
      <button className="w-full border-2 border-gray-200 hover:border-red-400 text-gray-700 py-3 rounded-xl font-semibold transition text-sm">
        <i className="fas fa-envelope mr-2 text-red-500"></i>Solicitar información
      </button>
    </div>
  );
}

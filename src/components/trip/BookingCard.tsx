import { useEffect, useState } from 'react';
import type { Salida } from '../../data/types';
import { formatPrecio } from '../../lib/format';
import { MAX_VIAJEROS } from '../../lib/reserva';
import { estaCompleta, formatFecha, hoyISO, primeraDisponible, quedanPocas, salidasFuturas } from '../../lib/salidas';

interface Props {
  slug: string;
  precio: number;
  salidas: Salida[];
}

const MIN_VIAJEROS = 1;

export default function BookingCard({ slug, precio, salidas }: Props) {
  // En el HTML generado se muestran todas; en el navegador se ocultan las pasadas.
  const [hoy, setHoy] = useState('');
  useEffect(() => setHoy(hoyISO()), []);

  const visibles = salidasFuturas(salidas, hoy);
  const [fecha, setFecha] = useState(() => primeraDisponible(salidas, '')?.fecha ?? '');
  const seleccionada = visibles.find((s) => s.fecha === fecha && !estaCompleta(s)) ?? primeraDisponible(salidas, hoy);
  const maxViajeros = Math.min(MAX_VIAJEROS, seleccionada?.plazas ?? MAX_VIAJEROS);

  const [personas, setPersonas] = useState(MIN_VIAJEROS);
  const viajeros = Math.min(personas, maxViajeros);
  // Cambia en cada pulsación para reiniciar la animación del precio.
  const [flash, setFlash] = useState(0);

  function cambiarPersonas(delta: number) {
    setPersonas(Math.max(MIN_VIAJEROS, Math.min(maxViajeros, viajeros + delta)));
    setFlash((n) => n + 1);
  }

  function irAReservar() {
    if (!seleccionada) return;
    // El checkout recalcula el precio a partir del catálogo; solo viaja la selección.
    const params = new URLSearchParams({ viaje: slug, personas: String(viajeros), fecha: seleccionada.fecha });
    window.location.href = `/checkout/?${params}`;
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
          <button
            className="counter-btn disabled:opacity-40 disabled:pointer-events-none"
            onClick={() => cambiarPersonas(-1)}
            disabled={viajeros <= MIN_VIAJEROS}
            aria-label="Quitar viajero"
          >
            −
          </button>
          <span className="font-bold text-gray-800 w-4 text-center" aria-live="polite">
            {viajeros}
          </span>
          <button
            className="counter-btn disabled:opacity-40 disabled:pointer-events-none"
            onClick={() => cambiarPersonas(1)}
            disabled={viajeros >= maxViajeros}
            aria-label="Añadir viajero"
          >
            +
          </button>
        </div>
      </div>

      <div className="bg-red-50 rounded-xl px-4 py-3 mb-5 flex justify-between items-center">
        <span className="text-gray-700 text-sm font-semibold">Total estimado</span>
        <span key={`total-${flash}`} className={`text-red-600 font-extrabold text-lg ${flashClass}`}>
          {formatPrecio(precio * viajeros)}
        </span>
      </div>

      <p className="text-gray-600 text-sm font-semibold mb-2" id={`salidas-${slug}`}>
        Elige tu salida:
      </p>
      {visibles.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-2 mb-2" role="group" aria-labelledby={`salidas-${slug}`}>
            {visibles.map((s) => {
              const completa = estaCompleta(s);
              const activa = s.fecha === seleccionada?.fecha;
              return (
                <button
                  key={s.fecha}
                  className={`fecha-btn${activa ? ' selected' : ''}${completa ? ' completa' : ''}`}
                  aria-pressed={activa}
                  disabled={completa}
                  title={completa ? 'Salida completa' : undefined}
                  onClick={() => setFecha(s.fecha)}
                >
                  <time dateTime={s.fecha}>{formatFecha(s.fecha)}</time>
                </button>
              );
            })}
          </div>
          <p className="text-xs mb-5 min-h-4" aria-live="polite">
            {seleccionada && quedanPocas(seleccionada) ? (
              <span className="text-red-600 font-semibold">
                <i className="fas fa-fire mr-1"></i>
                {seleccionada.plazas === 1 ? 'Última plaza' : `Últimas ${seleccionada.plazas} plazas`} en esta salida
              </span>
            ) : seleccionada ? (
              <span className="text-gray-500">{seleccionada.plazas} plazas libres en esta salida</span>
            ) : null}
          </p>
        </>
      ) : (
        <p className="text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-3 mb-5">
          No hay salidas programadas ahora mismo. Escríbenos y te avisamos de las próximas fechas.
        </p>
      )}

      <button
        onClick={irAReservar}
        disabled={!seleccionada}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition mb-3 shadow-md disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
      >
        <i className="fas fa-calendar-check mr-2"></i>Reservar Ahora
      </button>
      <a
        href={`/?viaje=${slug}#contacto`}
        className="block text-center w-full border-2 border-gray-200 hover:border-red-400 text-gray-700 py-3 rounded-xl font-semibold transition text-sm"
      >
        <i className="fas fa-envelope mr-2 text-red-500"></i>Solicitar información
      </a>
    </div>
  );
}

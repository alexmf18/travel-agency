import { useEffect, useState } from 'react';
import { ArrowRightIcon, EnvelopeSimpleIcon, FireIcon, MinusIcon, PlusIcon } from '@phosphor-icons/react';
import type { Salida } from '../../data/types';
import { formatPrecio } from '../../lib/format';
import { MAX_VIAJEROS } from '../../lib/reserva';
import { ruta } from '../../lib/rutas';
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
    window.location.href = ruta(`checkout/?${params}`);
  }

  const flashClass = flash > 0 ? 'precio-cambia' : '';

  return (
    <div className="panel p-6 sm:p-7">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-ink-3 text-sm">Precio por persona</p>
          <p key={`base-${flash}`} className={`font-display text-4xl font-semibold tabular-nums ${flashClass}`}>
            {formatPrecio(precio)}
          </p>
        </div>
        <p className="text-ink-3 text-xs pb-1.5">Impuestos incluidos</p>
      </div>

      <p className="text-sm font-semibold text-ink-2 mb-3" id={`salidas-${slug}`}>
        Elige tu salida
      </p>
      {visibles.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-2 mb-3" role="group" aria-labelledby={`salidas-${slug}`}>
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
          <p className="text-sm mb-6 min-h-5" aria-live="polite">
            {seleccionada && quedanPocas(seleccionada) ? (
              <span className="text-accent-ink font-semibold inline-flex items-center gap-1.5">
                <FireIcon weight="fill" />
                {seleccionada.plazas === 1 ? 'Última plaza' : `Últimas ${seleccionada.plazas} plazas`} en esta salida
              </span>
            ) : seleccionada ? (
              <span className="text-ink-3">{seleccionada.plazas} plazas libres en esta salida</span>
            ) : null}
          </p>
        </>
      ) : (
        <p className="text-sm text-ink-2 bg-surface-2 rounded-xl px-4 py-3 mb-6">
          No hay salidas programadas ahora mismo. Escríbenos y te avisamos de las próximas fechas.
        </p>
      )}

      <div className="flex items-center justify-between border-t border-line py-4">
        <span className="text-sm font-semibold text-ink-2">Viajeros</span>
        <div className="flex items-center gap-3">
          <button
            className="counter-btn disabled:opacity-40"
            onClick={() => cambiarPersonas(-1)}
            disabled={viajeros <= MIN_VIAJEROS}
            aria-label="Quitar viajero"
          >
            <MinusIcon />
          </button>
          <span className="font-semibold w-5 text-center tabular-nums" aria-live="polite">
            {viajeros}
          </span>
          <button
            className="counter-btn disabled:opacity-40"
            onClick={() => cambiarPersonas(1)}
            disabled={viajeros >= maxViajeros}
            aria-label="Añadir viajero"
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line pt-4 mb-6">
        <span className="text-sm font-semibold text-ink-2">Total estimado</span>
        <span key={`total-${flash}`} className={`font-display text-2xl font-semibold tabular-nums ${flashClass}`}>
          {formatPrecio(precio * viajeros)}
        </span>
      </div>

      <button onClick={irAReservar} disabled={!seleccionada} className="btn btn-primary btn-lg w-full mb-3">
        Reservar ahora <ArrowRightIcon />
      </button>
      <a href={ruta(`?viaje=${slug}#contacto`)} className="btn btn-secondary w-full">
        <EnvelopeSimpleIcon /> Solicitar información
      </a>
    </div>
  );
}

import { useMemo } from 'react';
import { ArrowRightIcon, CalendarBlankIcon, HeadsetIcon, InfoIcon, UsersIcon } from '@phosphor-icons/react';
import { formatPrecio, viajeros } from '../../lib/format';
import { leerReserva } from '../../lib/reserva';
import { ruta } from '../../lib/rutas';
import { formatFecha } from '../../lib/salidas';

interface Props {
  contacto: { telefono: string; email: string };
}

const SIGUIENTES_PASOS = [
  {
    titulo: 'Confirmación por email',
    texto: 'En los próximos minutos recibirás un email con tu localizador y todos los detalles de la reserva.',
  },
  {
    titulo: 'Documentación completa',
    texto: 'Con 30 días de antelación recibirás billetes de avión, vouchers de hotel y la guía de viaje completa.',
  },
  {
    titulo: 'Orientación previa al viaje',
    texto: 'Una semana antes, nuestro equipo te contactará para resolver dudas y confirmar los últimos detalles.',
  },
  {
    titulo: '¡A disfrutar Japón!',
    texto: 'Tu guía en español te recibirá en el aeropuerto. Nuestro equipo estará disponible 24/7 durante todo el viaje.',
  },
];

export default function Confirmation({ contacto }: Props) {
  const r = useMemo(() => leerReserva(), []);

  if (!r) {
    return (
      <div className="wrap py-24 max-w-lg text-center">
        <InfoIcon className="text-5xl text-ink-3 mx-auto mb-4" />
        <p className="text-ink-2 text-lg mb-6">No se encontró información de reserva.</p>
        <a href={ruta()} className="btn btn-primary">
          Volver al inicio
        </a>
      </div>
    );
  }

  return (
    <div className="wrap py-12 md:py-16 max-w-3xl">
      <div className="mb-12">
        <div className="check-wrap inline-block mb-6">
          <svg width="72" height="72" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <circle
              className="checkmark-circle"
              cx="50"
              cy="50"
              r="46"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <polyline
              className="checkmark-check"
              points="29,52 43,66 71,36"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="fu-1 text-4xl md:text-5xl font-semibold mb-3">Reserva confirmada</h1>
        <p className="fu-1 text-lg text-ink-2 mb-8 max-w-[52ch]">
          Hemos recibido tu reserva. En breve recibirás un email con todos los detalles.
        </p>
        <div className="fu-2 inline-flex flex-col border border-line rounded-2xl px-6 py-4 bg-surface">
          <p className="text-sm text-ink-3 mb-0.5">Localizador de reserva</p>
          <p className="font-display text-3xl font-semibold tracking-wider">{r.localizador}</p>
        </div>
      </div>

      <div className="space-y-6">
        <section className="panel fu-3 p-6 sm:p-8" aria-labelledby="resumen">
          <h2 id="resumen" className="text-xl font-semibold mb-5">
            Resumen del viaje
          </h2>
          <div className="flex flex-col sm:flex-row gap-5">
            <img
              src={r.imagen}
              alt=""
              className="w-full sm:w-36 h-28 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1">
              <p className="font-display font-semibold text-xl">{r.viaje}</p>
              <p className="text-ink-3 text-sm mb-3">{r.duracion}</p>
              <ul className="space-y-1.5 text-sm text-ink-2">
                <li className="flex items-center gap-2">
                  <CalendarBlankIcon className="text-ink-3" />
                  <span>
                    Salida: <strong className="font-semibold text-ink">{formatFecha(r.fecha)}</strong>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <UsersIcon className="text-ink-3" />
                  <span>{viajeros(r.personas)}</span>
                </li>
              </ul>
            </div>
            <div className="sm:text-right shrink-0">
              <p className="text-sm text-ink-3 mb-0.5">Total pagado</p>
              <p className="font-display text-3xl font-semibold tabular-nums">{formatPrecio(r.total)}</p>
              <p className="text-xs text-ink-3 mt-0.5">IVA incluido</p>
            </div>
          </div>
        </section>

        <section className="panel fu-3 p-6 sm:p-8" aria-labelledby="titular">
          <h2 id="titular" className="text-xl font-semibold mb-5">
            Datos del titular
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="text-ink-3">Nombre</dt>
              <dd className="font-medium">
                {r.nombre} {r.apellidos}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-ink-3">Email</dt>
              <dd className="font-medium break-all">{r.email}</dd>
            </div>
            <div>
              <dt className="text-ink-3">Teléfono</dt>
              <dd className="font-medium">{r.telefono}</dd>
            </div>
          </dl>
          <div className="mt-6 bg-warn-soft text-warn rounded-xl p-4 flex gap-3 text-sm">
            <InfoIcon className="text-lg shrink-0 mt-0.5" />
            <p>
              Guarda tu localizador <strong>{r.localizador}</strong>. Lo necesitarás para cualquier consulta sobre tu
              reserva.
            </p>
          </div>
        </section>

        <section className="panel fu-4 p-6 sm:p-8" aria-labelledby="siguientes">
          <h2 id="siguientes" className="text-xl font-semibold mb-2">
            ¿Qué ocurre ahora?
          </h2>
          <ol>
            {SIGUIENTES_PASOS.map((paso, i) => (
              <li className="step-next" key={paso.titulo}>
                <span className="step-num">{i + 1}</span>
                <div>
                  <p className="font-semibold mb-0.5">{paso.titulo}</p>
                  <p className="text-ink-2 text-sm">{paso.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="fu-5 flex flex-col sm:flex-row gap-3">
          <a href={ruta('#viajes')} className="btn btn-primary btn-lg flex-1">
            Ver otros viajes <ArrowRightIcon />
          </a>
          <a href={ruta()} className="btn btn-secondary btn-lg flex-1">
            Volver al inicio
          </a>
        </div>

        <p className="fu-5 flex gap-3 text-sm text-ink-2 leading-relaxed pt-2">
          <HeadsetIcon className="text-lg text-ink-3 shrink-0 mt-0.5" />
          <span>
            ¿Tienes alguna pregunta sobre tu reserva? Escríbenos a <strong className="text-ink">{contacto.email}</strong>{' '}
            o llámanos al <strong className="text-ink">{contacto.telefono}</strong> (lunes a viernes, de 9:00 a 18:00).
          </span>
        </p>
      </div>
    </div>
  );
}

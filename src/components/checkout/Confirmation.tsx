import { useMemo } from 'react';
import { formatPrecio, viajeros } from '../../lib/format';
import { leerReserva } from '../../lib/reserva';
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
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
        <div className="text-center py-24">
          <i className="fas fa-exclamation-circle text-gray-300 text-5xl mb-4"></i>
          <p className="text-gray-500 mb-6">No se encontró información de reserva.</p>
          <a
            href="/"
            className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition inline-block"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <div className="check-wrap inline-block mb-5">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <circle
              className="checkmark-circle"
              cx="50"
              cy="50"
              r="46"
              stroke="#16a34a"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <polyline
              className="checkmark-check"
              points="29,52 43,66 71,36"
              stroke="#16a34a"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="fu-1 text-4xl font-extrabold text-gray-800 mb-2">¡Reserva Confirmada!</h1>
        <p className="fu-1 text-gray-500 mb-5">
          Hemos recibido tu reserva con éxito. En breve recibirás un email con todos los detalles.
        </p>
        <div className="fu-2 inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-6 py-3">
          <i className="fas fa-ticket-alt text-green-600 text-xl"></i>
          <div className="text-left">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Localizador de reserva</p>
            <p className="text-2xl font-extrabold text-green-600 tracking-widest">{r.localizador}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="card-conf fu-3 overflow-hidden">
          <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
            <i className="fas fa-plane text-red-500"></i> Resumen del viaje
          </h3>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden shrink-0">
              <img src={r.imagen} alt={r.viaje} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-xl mb-0.5">{r.viaje}</h4>
              <p className="text-gray-400 text-sm mb-3">{r.duracion}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="fas fa-calendar-alt text-red-500 w-4 text-xs"></i>
                  <span>
                    Salida: <strong>{formatFecha(r.fecha)}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-users text-red-500 w-4 text-xs"></i>
                  <span>{viajeros(r.personas)}</span>
                </div>
              </div>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Total pagado</p>
              <p className="text-3xl font-extrabold text-red-600">{formatPrecio(r.total)}</p>
              <p className="text-xs text-gray-400 mt-1">IVA incluido</p>
            </div>
          </div>
        </div>

        <div className="card-conf fu-3">
          <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
            <i className="fas fa-user text-red-500"></i> Datos del titular
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <i className="fas fa-id-badge text-gray-300 w-4"></i>
              <span>
                {r.nombre} {r.apellidos}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-envelope text-gray-300 w-4"></i>
              <span>{r.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-phone text-gray-300 w-4"></i>
              <span>{r.telefono}</span>
            </div>
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2">
            <i className="fas fa-info-circle text-amber-500 mt-0.5 shrink-0 text-sm"></i>
            <p className="text-amber-700 text-xs leading-relaxed">
              Guarda tu localizador <strong>{r.localizador}</strong>. Lo necesitarás para cualquier consulta sobre tu
              reserva.
            </p>
          </div>
        </div>

        <div className="card-conf fu-4">
          <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
            <i className="fas fa-route text-red-500"></i> ¿Qué ocurre ahora?
          </h3>
          <div className="space-y-3">
            {SIGUIENTES_PASOS.map((paso, i) => (
              <div className="step-next" key={paso.titulo}>
                <div className="step-num">{i + 1}</div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm mb-0.5">{paso.titulo}</p>
                  <p className="text-gray-500 text-xs">{paso.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fu-5 flex flex-col sm:flex-row gap-3">
          <a
            href="/"
            className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl font-bold text-center transition flex items-center justify-center gap-2"
          >
            <i className="fas fa-home"></i> Volver al inicio
          </a>
          <a
            href="/#viajes"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-bold text-center transition flex items-center justify-center gap-2"
          >
            <i className="fas fa-plane"></i> Ver otros viajes
          </a>
        </div>

        <div className="fu-5 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <i className="fas fa-headset text-blue-500 mt-0.5 shrink-0"></i>
          <p className="text-blue-700 text-sm leading-relaxed">
            ¿Tienes alguna pregunta sobre tu reserva? Contáctanos en <strong>{contacto.email}</strong> o llámanos al{' '}
            <strong>{contacto.telefono}</strong> <span className="text-blue-500">(Lun–Vie, 9:00–18:00)</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

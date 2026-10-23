import { useMemo, useRef, useState, type ReactNode } from 'react';
import {
  ArrowCounterClockwiseIcon,
  CalendarBlankIcon,
  CreditCardIcon,
  HeadsetIcon,
  InfoIcon,
  LockSimpleIcon,
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
  WarningCircleIcon,
  type Icon,
} from '@phosphor-icons/react';
import { formatPrecio, viajeros } from '../../lib/format';
import { guardarReserva, MAX_VIAJEROS, type ViajeResumen } from '../../lib/reserva';
import { ruta } from '../../lib/rutas';
import { estaCompleta, formatFecha, hoyISO, salidasFuturas } from '../../lib/salidas';

interface Props {
  catalogo: ViajeResumen[];
  contacto: { telefono: string; telefonoHref: string; email: string };
}

type Marca = 'visa' | 'mastercard' | 'amex' | 'otra';

const MARCAS: Record<Marca, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'Amex',
  otra: 'Tarjeta',
};

function detectarMarca(digitos: string): Marca {
  // Sin número todavía se muestra Visa, como en la tarjeta de ejemplo.
  if (digitos === '' || digitos.startsWith('4')) return 'visa';
  if (digitos.startsWith('5')) return 'mastercard';
  if (digitos.startsWith('34') || digitos.startsWith('37')) return 'amex';
  return 'otra';
}

const CAMPOS_TITULAR = [
  { id: 'nombre', label: 'Nombre *', type: 'text', placeholder: 'Ej: María' },
  { id: 'apellidos', label: 'Apellidos *', type: 'text', placeholder: 'Ej: García López' },
  { id: 'email', label: 'Email *', type: 'email', placeholder: 'tu@email.com' },
  { id: 'telefono', label: 'Teléfono *', type: 'tel', placeholder: '+34 600 000 000' },
  { id: 'dni', label: 'DNI / Pasaporte *', type: 'text', placeholder: '12345678A' },
  { id: 'fechaNac', label: 'Fecha de nacimiento *', type: 'date', placeholder: undefined },
] as const;

const CAMPOS_TARJETA = ['cardNum', 'cardName', 'cardExp', 'cardCVV'] as const;

type Seleccion =
  | { estado: 'ok'; viaje: ViajeResumen; personas: number; fecha: string }
  | { estado: 'sin-viaje' }
  | { estado: 'sin-salida'; viaje: ViajeResumen };

/**
 * Lee la selección de la URL y la valida contra el catálogo: el precio nunca viene
 * de la URL, la salida debe existir y no haber pasado, y los viajeros no pueden
 * superar las plazas libres.
 */
function leerSeleccion(catalogo: ViajeResumen[]): Seleccion {
  const params = new URLSearchParams(window.location.search);
  const viaje = catalogo.find((v) => v.slug === params.get('viaje'));
  if (!viaje) return { estado: 'sin-viaje' };

  const salida = salidasFuturas(viaje.salidas, hoyISO()).find((s) => s.fecha === params.get('fecha'));
  if (!salida || estaCompleta(salida)) return { estado: 'sin-salida', viaje };

  const pedidos = Number.parseInt(params.get('personas') ?? '', 10) || 1;
  const personas = Math.min(MAX_VIAJEROS, salida.plazas, Math.max(1, pedidos));
  return { estado: 'ok', viaje, personas, fecha: salida.fecha };
}

export default function Checkout({ catalogo, contacto }: Props) {
  const seleccion = useMemo(() => leerSeleccion(catalogo), [catalogo]);

  if (seleccion.estado === 'sin-viaje') {
    return <SinReserva texto="No hemos encontrado el viaje que quieres reservar." href={ruta('#viajes')} accion="Ver viajes" />;
  }

  if (seleccion.estado === 'sin-salida') {
    return (
      <SinReserva
        texto="La salida que elegiste ya no está disponible. Elige otra fecha para continuar."
        href={ruta(`viajes/${seleccion.viaje.slug}/`)}
        accion="Ver otras fechas"
      />
    );
  }

  return <CheckoutForm {...seleccion} contacto={contacto} />;
}

function SinReserva({ texto, href, accion }: { texto: string; href: string; accion: string }) {
  return (
    <div className="wrap py-24 max-w-lg text-center">
      <WarningCircleIcon className="text-5xl text-ink-3 mx-auto mb-4" />
      <p className="text-ink-2 text-lg mb-6">{texto}</p>
      <a href={href} className="btn btn-primary">
        {accion}
      </a>
    </div>
  );
}

interface FormProps {
  viaje: ViajeResumen;
  personas: number;
  fecha: string;
  contacto: Props['contacto'];
}

function CheckoutForm({ viaje, personas, fecha, contacto }: FormProps) {
  const total = viaje.precio * personas;
  const [valores, setValores] = useState<Record<string, string>>({ nacionalidad: 'ES' });
  const [errores, setErrores] = useState<Set<string>>(new Set());
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const [terminos, setTerminos] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);

  const acompanantes = Array.from({ length: personas - 1 }, (_, i) => `viajero${i + 2}`);
  const digitos = (valores.cardNum ?? '').replace(/\D/g, '');
  const marca = MARCAS[detectarMarca(digitos)];

  function set(id: string, valor: string) {
    setValores((v) => ({ ...v, [id]: valor }));
  }

  function input(id: string) {
    return {
      id,
      value: valores[id] ?? '',
      className: 'field',
      'aria-invalid': errores.has(id) || undefined,
      onChange: (e: { target: { value: string } }) => set(id, e.target.value),
    };
  }

  function mostrarError(texto: string) {
    setMensajeError(texto);
    requestAnimationFrame(() => errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  }

  function procesarCompra(event: { preventDefault(): void }) {
    event.preventDefault();
    const obligatorios = [...CAMPOS_TITULAR.map((c) => c.id), ...CAMPOS_TARJETA, ...acompanantes];
    const vacios = new Set(obligatorios.filter((id) => !(valores[id] ?? '').trim()));
    setErrores(vacios);

    if (!terminos) return mostrarError('Debes aceptar los Términos y Condiciones para continuar.');
    if (vacios.size > 0) return mostrarError('Por favor, rellena todos los campos obligatorios marcados con *.');

    setMensajeError(null);
    guardarReserva({
      localizador: 'JT-' + Date.now().toString().slice(-6),
      slug: viaje.slug,
      viaje: viaje.nombre,
      precio: viaje.precio,
      personas,
      total,
      fecha,
      duracion: viaje.duracion,
      imagen: viaje.imagen,
      nombre: valores.nombre.trim(),
      apellidos: valores.apellidos.trim(),
      email: valores.email.trim(),
      telefono: valores.telefono.trim(),
    });
    window.location.href = ruta('confirmacion/');
  }

  return (
    <div className="wrap py-10 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* ── Formulario ── */}
        <form className="lg:col-span-8 space-y-6" onSubmit={procesarCompra} noValidate>
          <div className="panel p-6 sm:p-8 fade-up-1">
            <SectionTitle icon={UserIcon}>Datos del titular de la reserva</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CAMPOS_TITULAR.map((c) => (
                <div key={c.id}>
                  <label className="label" htmlFor={c.id}>
                    {c.label}
                  </label>
                  <input type={c.type} placeholder={c.placeholder} {...input(c.id)} />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="label" htmlFor="nacionalidad">
                  Nacionalidad
                </label>
                <select {...input('nacionalidad')}>
                  <option value="ES">España</option>
                  <option value="MX">México</option>
                  <option value="AR">Argentina</option>
                  <option value="CO">Colombia</option>
                  <option value="CL">Chile</option>
                  <option value="PE">Perú</option>
                  <option value="OTHER">Otra</option>
                </select>
              </div>
            </div>
          </div>

          {acompanantes.length > 0 && (
            <div className="panel p-6 sm:p-8 fade-up-2">
              <SectionTitle icon={UsersIcon} className="mb-1">
                Viajeros adicionales
              </SectionTitle>
              <p className="text-ink-3 text-sm mb-5 ml-12">Nombre completo de cada viajero acompañante.</p>
              <div className="space-y-4">
                {acompanantes.map((id, i) => (
                  <div key={id}>
                    <label className="label" htmlFor={id}>
                      Viajero {i + 2}: nombre completo *
                    </label>
                    <input type="text" placeholder={`Nombre y apellidos del viajero ${i + 2}`} {...input(id)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="panel p-6 sm:p-8 fade-up-3">
            <SectionTitle icon={CreditCardIcon}>Método de pago</SectionTitle>

            <div className="card-preview mb-6" aria-hidden="true">
              <div className="flex justify-between items-center mb-6 relative z-10">
                <span className="w-10 h-7 rounded-md bg-white/20"></span>
                <span className="text-sm font-semibold opacity-80">{marca}</span>
              </div>
              <p className="text-lg sm:text-xl tracking-widest font-mono mb-6 relative z-10">
                {digitos ? digitos.padEnd(16, '·').match(/.{1,4}/g)!.join(' ') : '•••• •••• •••• ••••'}
              </p>
              <div className="flex justify-between items-end relative z-10">
                <div>
                  <p className="text-xs opacity-55 mb-0.5">Titular</p>
                  <p className="text-sm font-semibold uppercase tracking-wider">
                    {(valores.cardName ?? '').toUpperCase() || 'TU NOMBRE'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-55 mb-0.5">Válida hasta</p>
                  <p className="text-sm font-mono">{valores.cardExp || 'MM/AA'}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="label" htmlFor="cardNum">
                  Número de tarjeta *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    {...input('cardNum')}
                    className="field pr-28"
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
                      set('cardNum', raw.match(/.{1,4}/g)?.join(' ') ?? '');
                    }}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-ink-3 bg-surface-2 rounded-full px-2.5 py-1">
                    {marca}
                  </span>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="label" htmlFor="cardName">
                  Nombre en la tarjeta *
                </label>
                <input
                  type="text"
                  placeholder="Nombre tal como aparece en la tarjeta"
                  autoComplete="cc-name"
                  {...input('cardName')}
                />
              </div>
              <div>
                <label className="label" htmlFor="cardExp">
                  Fecha de caducidad *
                </label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  maxLength={5}
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  {...input('cardExp')}
                  onChange={(e) => {
                    let raw = e.target.value.replace(/\D/g, '');
                    if (raw.length >= 3) raw = raw.slice(0, 2) + '/' + raw.slice(2, 4);
                    set('cardExp', raw);
                  }}
                />
              </div>
              <div>
                <label className="label" htmlFor="cardCVV">
                  CVV *
                </label>
                <input
                  type="text"
                  placeholder="•••"
                  maxLength={4}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  aria-describedby="cvvAyuda"
                  {...input('cardCVV')}
                  onChange={(e) => set('cardCVV', e.target.value.replace(/\D/g, ''))}
                />
                <p id="cvvAyuda" className="text-xs text-ink-3 mt-1.5">
                  Los 3 dígitos del reverso (4 en el anverso si es Amex).
                </p>
              </div>
            </div>

            <div className="mt-6 bg-surface-2 rounded-xl p-4 flex gap-3 text-sm text-ink-2">
              <LockSimpleIcon className="text-lg shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Pago seguro. Tus datos viajan cifrados y no almacenamos los datos de tu tarjeta.
              </p>
            </div>
          </div>

          <div className="panel p-6 sm:p-8 fade-up-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="terminos"
                checked={terminos}
                onChange={(e) => setTerminos(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-accent shrink-0"
              />
              <span className="text-sm text-ink-2 leading-relaxed">
                He leído y acepto los{' '}
                <a href="#" className="text-accent-ink hover:underline font-semibold">
                  Términos y Condiciones
                </a>{' '}
                y la{' '}
                <a href="#" className="text-accent-ink hover:underline font-semibold">
                  Política de Privacidad
                </a>{' '}
                de Japón Travel. Entiendo que la reserva quedará confirmada al completar el pago.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer mt-3">
              <input type="checkbox" id="newsletter" className="mt-0.5 w-4 h-4 accent-accent shrink-0" />
              <span className="text-sm text-ink-3 leading-relaxed">
                Quiero recibir ofertas y novedades sobre viajes a Japón por email.
              </span>
            </label>
          </div>

          {mensajeError && (
            <div ref={errorRef} role="alert" className="bg-accent-soft rounded-xl p-4 flex gap-3 text-accent-ink">
              <WarningCircleIcon className="text-lg shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{mensajeError}</p>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full py-4 text-lg fade-up-5">
            <LockSimpleIcon />
            Confirmar y pagar {formatPrecio(total)}
          </button>
          <p className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-ink-3 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <ArrowCounterClockwiseIcon /> Cancelación gratuita hasta 30 días antes
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheckIcon /> Pago seguro
            </span>
          </p>
        </form>

        {/* ── Resumen del pedido ── */}
        <aside className="lg:col-span-4" aria-label="Resumen de la reserva">
          <div className="sidebar-sticky space-y-6">
            <div className="panel overflow-hidden">
              <img src={viaje.imagen} alt="" className="w-full aspect-video object-cover" />
              <div className="p-6">
                <p className="font-display text-xl font-semibold">{viaje.nombre}</p>
                <p className="text-ink-3 text-sm mb-5">{viaje.duracion}</p>
                <ul className="space-y-2 text-sm text-ink-2 pb-5 border-b border-line">
                  <li className="flex items-center gap-2.5">
                    <CalendarBlankIcon className="text-ink-3" />
                    <span>
                      Salida: <strong className="font-semibold text-ink">{formatFecha(fecha)}</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <UsersIcon className="text-ink-3" />
                    <span>{viajeros(personas)}</span>
                  </li>
                </ul>
                <dl className="pt-5 space-y-2 text-sm">
                  <div className="flex justify-between text-ink-3">
                    <dt>Precio por persona</dt>
                    <dd className="tabular-nums">{formatPrecio(viaje.precio)}</dd>
                  </div>
                  <div className="flex justify-between text-ink-3">
                    <dt>× {viajeros(personas)}</dt>
                    <dd className="tabular-nums">{formatPrecio(total)}</dd>
                  </div>
                  <div className="flex justify-between items-baseline pt-3 mt-1 border-t border-line">
                    <dt className="font-semibold">Total</dt>
                    <dd className="font-display text-2xl font-semibold tabular-nums">{formatPrecio(total)}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="px-1">
              <p className="text-sm font-semibold text-ink-3 mb-3">Aceptamos</p>
              <ul className="flex flex-wrap gap-2 text-xs font-semibold text-ink-2">
                {['Visa', 'Mastercard', 'American Express'].map((m) => (
                  <li key={m} className="border border-line rounded-full px-3 py-1.5">
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-sumi dark:bg-surface-2 rounded-2xl p-6 text-white/75 text-sm">
              <div className="flex items-center gap-2 mb-2 text-white">
                <HeadsetIcon className="text-lg" />
                <p className="font-semibold">¿Necesitas ayuda?</p>
              </div>
              <p className="mb-4">Estamos disponibles para ayudarte con tu reserva.</p>
              <a href={contacto.telefonoHref} className="block py-0.5 font-medium text-white hover:underline">
                {contacto.telefono}
              </a>
              <a href={`mailto:${contacto.email}`} className="block py-0.5 font-medium text-white hover:underline">
                {contacto.email}
              </a>
              <p className="text-white/50 text-xs mt-3 inline-flex items-center gap-1.5">
                <InfoIcon /> Lunes a viernes, de 9:00 a 18:00
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SectionTitle({
  icon: IconoSeccion,
  className = 'mb-6',
  children,
}: {
  icon: Icon;
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2 className={`text-xl md:text-2xl font-semibold ${className} flex items-center gap-3`}>
      <span className="w-9 h-9 bg-accent-soft text-accent-ink rounded-full flex items-center justify-center shrink-0 text-lg">
        <IconoSeccion />
      </span>
      {children}
    </h2>
  );
}

import { useMemo, useRef, useState } from 'react';
import { formatPrecio, viajeros } from '../../lib/format';
import { guardarReserva, MAX_VIAJEROS, type ViajeResumen } from '../../lib/reserva';
import { estaCompleta, formatFecha, hoyISO, salidasFuturas } from '../../lib/salidas';

interface Props {
  catalogo: ViajeResumen[];
  contacto: { telefono: string; telefonoHref: string; email: string };
}

type Marca = 'visa' | 'mastercard' | 'amex' | 'otra';

const MARCAS: Record<Marca, { nombre: string; icono: string }> = {
  visa: { nombre: 'VISA', icono: 'fab fa-cc-visa text-blue-800' },
  mastercard: { nombre: 'MASTERCARD', icono: 'fab fa-cc-mastercard text-red-600' },
  amex: { nombre: 'AMEX', icono: 'fab fa-cc-amex text-blue-500' },
  otra: { nombre: 'TARJETA', icono: 'fas fa-credit-card text-gray-400' },
};

function detectarMarca(digitos: string): Marca {
  // Sin número todavía se muestra VISA, como en la tarjeta de ejemplo.
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
    return <SinReserva texto="No hemos encontrado el viaje que quieres reservar." href="/#viajes" accion="Ver viajes" />;
  }

  if (seleccion.estado === 'sin-salida') {
    return (
      <SinReserva
        texto="La salida que elegiste ya no está disponible. Elige otra fecha para continuar."
        href={`/viajes/${seleccion.viaje.slug}/`}
        accion="Ver otras fechas"
      />
    );
  }

  return <CheckoutForm {...seleccion} contacto={contacto} />;
}

function SinReserva({ texto, href, accion }: { texto: string; href: string; accion: string }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-24 text-center">
      <i className="fas fa-exclamation-circle text-gray-300 text-5xl mb-4"></i>
      <p className="text-gray-500 mb-6">{texto}</p>
      <a
        href={href}
        className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition inline-block"
      >
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
      className: `form-input${errores.has(id) ? ' error' : ''}`,
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
    window.location.href = '/confirmacion/';
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ── Formulario ── */}
        <form className="lg:col-span-2 space-y-6" onSubmit={procesarCompra} noValidate>
          <div className="section-card fade-up-1">
            <SectionTitle icon="fa-user">Datos del titular de la reserva</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CAMPOS_TITULAR.map((c) => (
                <div key={c.id}>
                  <label className="form-label" htmlFor={c.id}>
                    {c.label}
                  </label>
                  <input type={c.type} placeholder={c.placeholder} {...input(c.id)} />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="form-label" htmlFor="nacionalidad">
                  Nacionalidad
                </label>
                <select {...input('nacionalidad')}>
                  <option value="ES">🇪🇸 España</option>
                  <option value="MX">🇲🇽 México</option>
                  <option value="AR">🇦🇷 Argentina</option>
                  <option value="CO">🇨🇴 Colombia</option>
                  <option value="CL">🇨🇱 Chile</option>
                  <option value="PE">🇵🇪 Perú</option>
                  <option value="OTHER">Otro</option>
                </select>
              </div>
            </div>
          </div>

          {acompanantes.length > 0 && (
            <div className="section-card fade-up-2">
              <SectionTitle icon="fa-users" className="mb-1">
                Viajeros adicionales
              </SectionTitle>
              <p className="text-gray-500 text-sm mb-5 ml-12">Nombre completo de cada viajero acompañante.</p>
              <div className="space-y-3">
                {acompanantes.map((id, i) => (
                  <div key={id}>
                    <label className="form-label" htmlFor={id}>
                      Viajero {i + 2} — Nombre completo *
                    </label>
                    <input type="text" placeholder={`Nombre y apellidos del viajero ${i + 2}`} {...input(id)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="section-card fade-up-3">
            <SectionTitle icon="fa-credit-card">Método de pago</SectionTitle>

            <div className="card-preview mb-6" aria-hidden="true">
              <div className="flex justify-between items-center mb-5 relative z-10">
                <i className="fas fa-wifi rotate-90 text-white opacity-40 text-xl"></i>
                <span className="text-white text-sm font-bold uppercase tracking-widest opacity-70">{marca.nombre}</span>
              </div>
              <p className="text-white text-lg sm:text-xl tracking-widest font-mono mb-5 relative z-10">
                {digitos ? digitos.padEnd(16, '·').match(/.{1,4}/g)!.join(' ') : '•••• •••• •••• ••••'}
              </p>
              <div className="flex justify-between items-end relative z-10">
                <div>
                  <p className="text-white text-xs opacity-50 mb-0.5 uppercase tracking-wider">Titular</p>
                  <p className="text-white text-sm font-semibold uppercase tracking-wider">
                    {(valores.cardName ?? '').toUpperCase() || 'TU NOMBRE'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white text-xs opacity-50 mb-0.5 uppercase tracking-wider">Válida hasta</p>
                  <p className="text-white text-sm font-mono">{valores.cardExp || 'MM/AA'}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="form-label" htmlFor="cardNum">
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
                    className={`${input('cardNum').className} pr-14`}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
                      set('cardNum', raw.match(/.{1,4}/g)?.join(' ') ?? '');
                    }}
                  />
                  <i className={`${marca.icono} absolute right-4 top-1/2 -translate-y-1/2 text-2xl`}></i>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="form-label" htmlFor="cardName">
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
                <label className="form-label" htmlFor="cardExp">
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
                <label className="form-label" htmlFor="cardCVV">
                  CVV *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="•••"
                    maxLength={4}
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    {...input('cardCVV')}
                    className={`${input('cardCVV').className} pr-10`}
                    onChange={(e) => set('cardCVV', e.target.value.replace(/\D/g, ''))}
                  />
                  <i
                    className="fas fa-question-circle absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm cursor-help"
                    title="Los 3 dígitos del reverso de tu tarjeta (4 para AMEX)"
                  ></i>
                </div>
              </div>
            </div>

            <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2">
              <i className="fas fa-lock text-blue-500 mt-0.5 shrink-0"></i>
              <p className="text-blue-700 text-xs leading-relaxed">
                Pago 100% seguro. Tus datos están cifrados con tecnología SSL 256-bit. No almacenamos los datos de tu
                tarjeta.
              </p>
            </div>
          </div>

          <div className="section-card fade-up-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="terminos"
                checked={terminos}
                onChange={(e) => setTerminos(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-red-600 shrink-0"
              />
              <span className="text-sm text-gray-600 leading-relaxed">
                He leído y acepto los{' '}
                <a href="#" className="text-red-600 hover:underline font-semibold">
                  Términos y Condiciones
                </a>{' '}
                y la{' '}
                <a href="#" className="text-red-600 hover:underline font-semibold">
                  Política de Privacidad
                </a>{' '}
                de Japón Travel. Entiendo que la reserva quedará confirmada al completar el pago.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer mt-3">
              <input type="checkbox" id="newsletter" className="mt-0.5 w-4 h-4 accent-red-600 shrink-0" />
              <span className="text-sm text-gray-400 leading-relaxed">
                Quiero recibir ofertas exclusivas y novedades sobre viajes a Japón por email.
              </span>
            </label>
          </div>

          {mensajeError && (
            <div ref={errorRef} role="alert" className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
              <i className="fas fa-exclamation-circle text-red-500 mt-0.5 shrink-0"></i>
              <p className="text-red-700 text-sm">{mensajeError}</p>
            </div>
          )}

          <button
            type="submit"
            className="comprar-btn fade-up-5 w-full text-white py-5 rounded-2xl font-bold text-xl shadow-lg flex items-center justify-center gap-3"
          >
            <i className="fas fa-lock text-sm"></i>
            Confirmar y Pagar — <span>{formatPrecio(total)}</span>
          </button>
          <p className="text-center text-gray-400 text-xs">
            <i className="fas fa-undo mr-1"></i>Cancelación gratuita hasta 30 días antes &nbsp;·&nbsp;{' '}
            <i className="fas fa-shield-alt mr-1"></i>Pago seguro garantizado
          </p>
        </form>

        {/* ── Resumen del pedido ── */}
        <div className="lg:col-span-1">
          <div className="sidebar-sticky space-y-5">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="h-44 overflow-hidden relative">
                <img src={viaje.imagen} alt={viaje.nombre} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                <p className="absolute bottom-3 left-4 text-white font-bold text-lg drop-shadow-lg">{viaje.nombre}</p>
              </div>
              <div className="p-5">
                <p className="text-gray-400 text-sm mb-4">{viaje.duracion}</p>
                <div className="space-y-2 text-sm pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-700">
                    <i className="fas fa-calendar-alt text-red-500 w-4"></i>
                    <span>
                      Salida: <strong>{formatFecha(fecha)}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <i className="fas fa-users text-red-500 w-4"></i>
                    <span>{viajeros(personas)}</span>
                  </div>
                </div>
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Precio por persona</span>
                    <span>{formatPrecio(viaje.precio)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>× {viajeros(personas)}</span>
                    <span>{formatPrecio(total)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-red-600 pt-2 border-t border-gray-100">
                    <span>TOTAL</span>
                    <span>{formatPrecio(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5">
              <h4 className="font-bold text-gray-700 text-xs mb-3 uppercase tracking-widest">Aceptamos</h4>
              <div className="flex items-center gap-4">
                <i className="fab fa-cc-visa text-blue-800 text-3xl"></i>
                <i className="fab fa-cc-mastercard text-red-600 text-3xl"></i>
                <i className="fab fa-cc-amex text-blue-500 text-3xl"></i>
              </div>
              <div className="mt-3 flex items-center gap-2 text-gray-400 text-xs">
                <i className="fas fa-lock text-green-500"></i>
                <span>SSL 256-bit · Sin cargos ocultos</span>
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <i className="fas fa-headset text-red-400"></i>
                <h4 className="font-bold text-sm">¿Necesitas ayuda?</h4>
              </div>
              <p className="text-gray-400 text-xs mb-3">Estamos disponibles para ayudarte con tu reserva.</p>
              <a
                href={contacto.telefonoHref}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition mb-1"
              >
                <i className="fas fa-phone text-red-400 text-xs w-3"></i>
                {contacto.telefono}
              </a>
              <a
                href={`mailto:${contacto.email}`}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
              >
                <i className="fas fa-envelope text-red-400 text-xs w-3"></i>
                {contacto.email}
              </a>
              <p className="text-gray-600 text-xs mt-3">Lun–Vie · 9:00 – 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon, className = 'mb-5', children }: { icon: string; className?: string; children: string }) {
  return (
    <h2 className={`text-xl font-bold text-gray-800 ${className} flex items-center gap-3`}>
      <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center shrink-0">
        <i className={`fas ${icon} text-red-600 text-sm`}></i>
      </div>
      {children}
    </h2>
  );
}

/** Nombre de un icono sólido de Font Awesome sin el prefijo `fa-` (p. ej. `torii-gate`). */
export type Icono = string;

/** Tipo de etiqueta de un día del itinerario; decide su color. */
export type TipoEtiqueta = 'actividad' | 'hotel' | 'comida' | 'destacado' | 'aviso';

/** Color del avatar de una reseña. */
export type ColorAvatar = 'rojo-suave' | 'azul' | 'morado' | 'verde' | 'rojo' | 'gris' | 'ambar';

export interface DiaItinerario {
  titulo: string;
  texto: string;
  etiquetas: { tipo: TipoEtiqueta; icono: Icono; texto: string }[];
}

export interface Resena {
  iniciales: string;
  color: ColorAvatar;
  nombre: string;
  estrellas: number;
  fecha: string;
  texto: string;
}

export interface Salida {
  /** Fecha ISO (AAAA-MM-DD). */
  fecha: string;
  /** Plazas libres; 0 = completo. */
  plazas: number;
}

export interface Garantia {
  titulo: string;
  texto: string;
  puntos: string[];
}

export interface Trip {
  slug: string;
  nombre: string;
  /** Nombre más corto para la tarjeta de la portada, si difiere. */
  nombreCorto?: string;
  /** Precio por persona en euros. */
  precio: number;
  dias: number;
  noches: number;
  valoracion: number;
  numResenas: number;
  grupoMax: number;
  tarjeta: { imagen: string; descripcion: string };
  hero: { imagen: string; subtitulo: string; etiquetas: string[] };
  ruta: { icono: Icono; nombre: string }[];
  /** Los párrafos admiten HTML en línea (`<strong>`). */
  descripcion: { titulo: string; parrafos: string[] };
  destacados: { icono: Icono; titulo: string; texto: string }[];
  galeria: { src: string; alt: string }[];
  itinerario: DiaItinerario[];
  incluye: string[];
  /** Admite HTML en línea (`<strong>`). */
  incluyeNota: string | null;
  noIncluye: string[];
  resenas: Resena[];
  /** Salidas programadas, en orden cronológico. Las pasadas se ocultan solas. */
  salidas: Salida[];
  datos: { icono: Icono; texto: string }[];
  /** Si no se indica, se usa la garantía por defecto. */
  garantia?: Garantia;
}

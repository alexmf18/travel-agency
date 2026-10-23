import type { Garantia, Trip } from './types';

// Catálogo de viajes: única fuente de verdad para la portada, las fichas,
// el checkout y la confirmación.
export const trips: Trip[] = [
  {
    slug: 'tokio-clasico',
    nombre: 'Tokio Clásico',
    precio: 1299,
    dias: 7,
    noches: 6,
    valoracion: 4.8,
    numResenas: 214,
    grupoMax: 16,
    tarjeta: {
      imagen: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600',
      descripcion: '7 días explorando la vibrante capital japonesa. Templos, tecnología y gastronomía.',
    },
    hero: {
      imagen: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1920',
      subtitulo: 'La metrópolis del futuro — Tradición y modernidad en armonía',
      etiquetas: ['IDEAL PARA INICIARSE', '1 CIUDAD · 7 DÍAS'],
    },
    ruta: [
      { icono: 'plane-departure', nombre: 'Madrid' },
      { icono: 'city', nombre: 'Tokio' },
      { icono: 'torii-gate', nombre: 'Asakusa' },
      { icono: 'road', nombre: 'Shibuya' },
      { icono: 'plane-arrival', nombre: 'Madrid' },
    ],
    descripcion: {
      titulo: 'La Metrópolis del Futuro',
      parrafos: [
        'Sumérgete en la vibrante capital de Japón con nuestro tour <strong>Tokio Clásico</strong>. Durante 7 días, explorarás los contrastes únicos de esta metrópolis donde la tradición milenaria convive con la tecnología más avanzada.',
        'Visitarás templos históricos, disfrutarás de la gastronomía local, experimentarás la vida nocturna de Shibuya y Shinjuku, y descubrirás los barrios más emblemáticos de la ciudad.',
        'Este viaje está diseñado para quienes desean conocer lo mejor de Tokio con la comodidad de un tour organizado y la libertad de explorar por su cuenta. <strong>Perfecto para una primera vez en Japón.</strong>',
      ],
    },
    destacados: [
      { icono: 'torii-gate', titulo: 'Senso-ji', texto: 'Templo de Asakusa' },
      { icono: 'road', titulo: 'Shibuya Crossing', texto: 'Cruce más famoso del mundo' },
      { icono: 'landmark', titulo: 'Palacio Imperial', texto: 'Residencia del Emperador' },
      { icono: 'microchip', titulo: 'Akihabara', texto: 'Ciudad electrónica y otaku' },
    ],
    galeria: [
      { src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600', alt: 'Tokio de noche' },
      { src: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600', alt: 'Senso-ji' },
      { src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600', alt: 'Shibuya Crossing' },
      { src: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600', alt: 'Akihabara' },
      { src: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?w=600', alt: 'Harajuku' },
      { src: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=600', alt: 'Tokio skyline' },
    ],
    itinerario: [
      {
        titulo: 'España → Tokio',
        texto: 'Salida desde el aeropuerto de Madrid con destino a Tokio. Vuelo con escala. Noche a bordo.',
        etiquetas: [
          { tipo: 'actividad', icono: 'plane', texto: 'Vuelo internacional' },
        ],
      },
      {
        titulo: 'Llegada a Tokio · Cena de bienvenida',
        texto: 'Llegada al aeropuerto de Narita. Traslado privado al hotel. Tarde libre para descansar del viaje. Por la noche, cena de bienvenida en restaurante tradicional japonés.',
        etiquetas: [
          { tipo: 'hotel', icono: 'hotel', texto: 'Richmond Hotel Namba Daikokucho 4★' },
          { tipo: 'comida', icono: 'utensils', texto: 'Cena incluida' },
        ],
      },
      {
        titulo: 'Asakusa y Akihabara',
        texto: 'Visita guiada al templo Senso-ji en Asakusa, el más antiguo de Tokio. Paseo por la calle Nakamise llena de tiendas tradicionales. Por la tarde, exploración de Akihabara, el paraíso de la electrónica y la cultura otaku.',
        etiquetas: [
          { tipo: 'actividad', icono: 'walking', texto: 'Tour guiado' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
      {
        titulo: 'Shibuya y Harajuku',
        texto: 'Visita al famoso cruce de Shibuya, uno de los más transitados del mundo. Exploración de Harajuku y su calle Takeshita, conocida por la moda juvenil. Visita al santuario Meiji, un oasis de paz en la ciudad. Tarde libre para compras.',
        etiquetas: [
          { tipo: 'actividad', icono: 'walking', texto: 'Shibuya, Harajuku, Santuario Meiji' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
      {
        titulo: 'Palacio Imperial y Ginza',
        texto: 'Visita a los jardines del Palacio Imperial, residencia del Emperador. Paseo por Ginza, el distrito de lujo de Tokio con tiendas de alta gama. Por la noche, experiencia en un karaoke japonés.',
        etiquetas: [
          { tipo: 'actividad', icono: 'walking', texto: 'Palacio Imperial, Ginza' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
      {
        titulo: 'Día Libre en Tokio',
        texto: 'Día libre para explorar Tokio a tu ritmo. Opciones recomendadas: mercado de Toyosu, Torre de Tokio, Roppongi, museo Ghibli (reserva anticipada) o excursión opcional a Nikko o Kamakura.',
        etiquetas: [
          { tipo: 'actividad', icono: 'clock', texto: 'Día libre' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
      {
        titulo: 'Tokio → España · Regreso',
        texto: 'Desayuno en el hotel. Tiempo libre hasta el traslado al aeropuerto. Vuelo de regreso a España con escala. Llegada el mismo día por la noche.',
        etiquetas: [
          { tipo: 'actividad', icono: 'plane', texto: 'Vuelo de regreso' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
    ],
    incluye: [
      'Vuelos internacionales de ida y vuelta',
      '6 noches de alojamiento (hotel 4★)',
      'Desayunos diarios',
      'Cena de bienvenida',
      'Traslados aeropuerto-hotel',
      'Visitas guiadas mencionadas',
      'Guía de habla hispana',
      'Seguro de viaje',
    ],
    incluyeNota: 'Presupuesto recomendado para gastos personales en Tokio: <strong>50–80€ por día</strong>.',
    noIncluye: [
      'Comidas no especificadas',
      'Bebidas',
      'Propinas (voluntarias)',
      'Gastos personales',
      'Excursiones opcionales',
      'Visado (si aplica)',
    ],
    resenas: [
      {
        iniciales: 'A',
        color: 'rojo-suave',
        nombre: 'Ana Rodríguez',
        estrellas: 5,
        fecha: 'Febrero 2026',
        texto: '"Tokio me superó todas las expectativas. El guía era extraordinario y el hotel genial. Shibuya de noche es una experiencia que no olvidaré."',
      },
      {
        iniciales: 'P',
        color: 'azul',
        nombre: 'Pablo Jiménez',
        estrellas: 5,
        fecha: 'Enero 2026',
        texto: '"El templo Senso-ji al amanecer fue mágico. Grupo pequeño, todo muy bien organizado. Perfecto para una primera vez en Japón."',
      },
      {
        iniciales: 'S',
        color: 'morado',
        nombre: 'Sofía Torres',
        estrellas: 4,
        fecha: 'Diciembre 2025',
        texto: '"Harajuku y Akihabara son mundos completamente distintos pero igual de fascinantes. El karaoke japonés fue el broche perfecto."',
      },
    ],
    salidas: [
      { fecha: '2026-11-14', plazas: 3 },
      { fecha: '2026-12-05', plazas: 9 },
      { fecha: '2027-01-16', plazas: 14 },
      { fecha: '2027-03-27', plazas: 2 },
      { fecha: '2027-04-10', plazas: 0 },
      { fecha: '2027-05-22', plazas: 11 },
    ],
    datos: [
      { icono: 'clock', texto: '7 días · 6 noches' },
      { icono: 'hotel', texto: 'Hotel 4★ en Tokio' },
      { icono: 'users', texto: 'Máx. 16 personas por grupo' },
      { icono: 'city', texto: '1 ciudad · múltiples barrios' },
      { icono: 'language', texto: 'Guía en español incluido' },
    ],
  },
  {
    slug: 'ruta-imperial',
    nombre: 'Ruta Imperial',
    precio: 1899,
    dias: 9,
    noches: 7,
    valoracion: 4.9,
    numResenas: 328,
    grupoMax: 16,
    tarjeta: {
      imagen: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600',
      descripcion: '9 días por Tokio, Kioto y Osaka. Descubre el Japón tradicional y moderno.',
    },
    hero: {
      imagen: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920',
      subtitulo: 'Tokio · Kioto · Osaka — El corazón de Japón',
      etiquetas: ['MÁS VENDIDO', '3 CIUDADES · 9 DÍAS'],
    },
    ruta: [
      { icono: 'plane-departure', nombre: 'Madrid' },
      { icono: 'city', nombre: 'Tokio' },
      { icono: 'torii-gate', nombre: 'Kioto' },
      { icono: 'utensils', nombre: 'Osaka' },
      { icono: 'plane-arrival', nombre: 'Madrid' },
    ],
    descripcion: {
      titulo: 'El Corazón de Japón',
      parrafos: [
        'Descubre el corazón de Japón con nuestra <strong>Ruta Imperial</strong>, un viaje de 9 días que te llevará por las tres ciudades más emblemáticas del país: Tokio, Kioto y Osaka.',
        'Experimenta el contraste perfecto entre la modernidad de Tokio, la tradición milenaria de Kioto y la energía gastronómica de Osaka. Viaja en el famoso tren bala <strong>Shinkansen</strong> y sumérgete en la cultura japonesa más auténtica.',
        'Este tour combina visitas guiadas con tiempo libre para que explores a tu ritmo. Perfecto para quienes buscan una experiencia completa de Japón en un viaje bien estructurado.',
      ],
    },
    destacados: [
      { icono: 'train', titulo: 'Shinkansen', texto: 'Tren bala incluido' },
      { icono: 'torii-gate', titulo: 'Fushimi Inari', texto: 'Miles de torii rojos' },
      { icono: 'leaf', titulo: 'Ceremonia del Té', texto: 'Tradición japonesa' },
      { icono: 'paw', titulo: 'Parque de Nara', texto: 'Ciervos sagrados' },
    ],
    galeria: [
      { src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600', alt: 'Tokio de noche' },
      { src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600', alt: 'Kioto templo' },
      { src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600', alt: 'Fushimi Inari' },
      { src: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600', alt: 'Osaka' },
      { src: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600', alt: 'Bambú Arashiyama' },
      { src: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600', alt: 'Nara ciervos' },
    ],
    itinerario: [
      {
        titulo: 'España → Tokio',
        texto: 'Salida desde Madrid con destino a Tokio. Vuelo con escala. Noche a bordo del avión.',
        etiquetas: [
          { tipo: 'actividad', icono: 'plane', texto: 'Vuelo internacional' },
        ],
      },
      {
        titulo: 'Llegada a Tokio · Cena de bienvenida',
        texto: 'Llegada a Tokio. Traslado al hotel. Tarde libre para adaptarse al jet lag. Cena de bienvenida con presentación del grupo.',
        etiquetas: [
          { tipo: 'hotel', icono: 'hotel', texto: 'Shinjuku Washington Hotel 4★' },
          { tipo: 'comida', icono: 'utensils', texto: 'Cena incluida' },
        ],
      },
      {
        titulo: 'Tokio — Tour Completo',
        texto: 'Tour completo por Tokio: Templo Senso-ji, Palacio Imperial, cruce de Shibuya, Harajuku y Santuario Meiji. Noche libre en Shinjuku.',
        etiquetas: [
          { tipo: 'actividad', icono: 'walking', texto: 'Tour guiado día completo' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
      {
        titulo: 'Tokio → Kioto en Shinkansen',
        texto: 'Desayuno. Traslado a la estación y tren bala Shinkansen hacia Kioto (2,5 horas). Llegada y check-in. Tarde libre para explorar el barrio de Gion. Posibilidad de ver geishas.',
        etiquetas: [
          { tipo: 'destacado', icono: 'train', texto: 'Shinkansen incluido' },
          { tipo: 'hotel', icono: 'hotel', texto: 'Kyoto Century Hotel 4★' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
      {
        titulo: 'Kioto — Templos y Jardines · Ceremonia del Té',
        texto: 'Tour completo: Templo Kinkaku-ji (Pabellón Dorado), Bosque de Bambú de Arashiyama, Fushimi Inari con sus miles de torii rojos. Ceremonia del té tradicional.',
        etiquetas: [
          { tipo: 'actividad', icono: 'walking', texto: 'Templos y ceremonia del té' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno y almuerzo incluidos' },
        ],
      },
      {
        titulo: 'Kioto → Nara → Kioto',
        texto: 'Excursión a Nara. Visita al Parque de los Ciervos y al Templo Todai-ji con su Gran Buda. Regreso a Kioto. Tarde libre para compras en el mercado Nishiki.',
        etiquetas: [
          { tipo: 'actividad', icono: 'bus', texto: 'Excursión a Nara' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
      {
        titulo: 'Kioto → Osaka · Castillo · Dotonbori',
        texto: 'Traslado a Osaka (1 hora). Visita al Castillo de Osaka. Exploración del barrio de Dotonbori, famoso por su gastronomía y sus neones. Cena de okonomiyaki y takoyaki.',
        etiquetas: [
          { tipo: 'hotel', icono: 'hotel', texto: 'Hotel Monterey Grasmere Osaka 4★' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno y cena incluidos' },
        ],
      },
      {
        titulo: 'Osaka — Día Libre · Cena de Despedida',
        texto: 'Día libre en Osaka. Opciones: Universal Studios Japan, Acuario de Osaka, barrio de Shinsekai o excursión opcional al Monte Koya. Por la noche, cena de despedida con el grupo.',
        etiquetas: [
          { tipo: 'actividad', icono: 'clock', texto: 'Día libre' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno y cena incluidos' },
        ],
      },
      {
        titulo: 'Osaka → España · Regreso',
        texto: 'Desayuno. Traslado al aeropuerto de Kansai. Vuelo de regreso a España con escala. Llegada el mismo día.',
        etiquetas: [
          { tipo: 'actividad', icono: 'plane', texto: 'Vuelo de regreso' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
    ],
    incluye: [
      'Vuelos internacionales de ida y vuelta',
      '7 noches de alojamiento (hoteles 4★)',
      'Desayunos diarios',
      '3 cenas especiales',
      'Billete Shinkansen (tren bala)',
      'Todos los traslados en tierra',
      'Visitas y tours guiados',
      'Guía en español',
      'Seguro de viaje',
    ],
    incluyeNota: 'Presupuesto recomendado para gastos personales en Japón: <strong>50–80€ por día</strong>.',
    noIncluye: [
      'Comidas no especificadas',
      'Bebidas',
      'Propinas',
      'Gastos personales',
      'Excursiones opcionales',
      'Entradas a atracciones no mencionadas',
    ],
    resenas: [
      {
        iniciales: 'M',
        color: 'rojo-suave',
        nombre: 'María García',
        estrellas: 5,
        fecha: 'Enero 2026',
        texto: '"El viaje en Shinkansen fue espectacular. Kioto me dejó sin palabras. El guía en español fue increíble, muy profesional y cercano."',
      },
      {
        iniciales: 'C',
        color: 'azul',
        nombre: 'Carlos Martínez',
        estrellas: 5,
        fecha: 'Diciembre 2025',
        texto: '"Perfectamente organizado. Fushimi Inari al amanecer fue una experiencia única. La ceremonia del té en Kioto, impresionante."',
      },
      {
        iniciales: 'L',
        color: 'verde',
        nombre: 'Laura Sánchez',
        estrellas: 4,
        fecha: 'Noviembre 2025',
        texto: '"Todo muy bien organizado. El grupo era pequeño, lo que hizo todo más personal. Osaka y Dotonbori de noche: imprescindible."',
      },
    ],
    salidas: [
      { fecha: '2026-11-07', plazas: 5 },
      { fecha: '2026-12-12', plazas: 12 },
      { fecha: '2027-02-13', plazas: 16 },
      { fecha: '2027-03-31', plazas: 1 },
      { fecha: '2027-04-17', plazas: 6 },
      { fecha: '2027-06-05', plazas: 13 },
    ],
    datos: [
      { icono: 'clock', texto: '9 días · 7 noches' },
      { icono: 'hotel', texto: 'Hoteles 4★ en 3 ciudades' },
      { icono: 'train', texto: 'Shinkansen incluido' },
      { icono: 'users', texto: 'Máx. 16 personas por grupo' },
      { icono: 'language', texto: 'Guía en español incluido' },
    ],
  },
  {
    slug: 'japon-espiritual',
    nombre: 'Japón Espiritual',
    precio: 2199,
    dias: 10,
    noches: 8,
    valoracion: 4.9,
    numResenas: 176,
    grupoMax: 12,
    tarjeta: {
      imagen: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600',
      descripcion: '10 días visitando templos sagrados, jardines zen y monte Fuji.',
    },
    hero: {
      imagen: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1920',
      subtitulo: 'Meditación · Monte Fuji · Onsen · Monte Koya',
      etiquetas: ['EXPERIENCIA ÚNICA', 'RYOKAN + TEMPLO'],
    },
    ruta: [
      { icono: 'plane-departure', nombre: 'Madrid' },
      { icono: 'torii-gate', nombre: 'Tokio' },
      { icono: 'mountain', nombre: 'Monte Fuji' },
      { icono: 'spa', nombre: 'Kioto' },
      { icono: 'praying-hands', nombre: 'Monte Koya' },
      { icono: 'plane-arrival', nombre: 'Madrid' },
    ],
    descripcion: {
      titulo: 'El Japón Más Sagrado y Espiritual',
      parrafos: [
        'Embárcate en un viaje espiritual de 10 días por el <strong>Japón más tradicional y sagrado</strong>. Este tour está diseñado para quienes buscan conectar con la esencia espiritual de Japón, más allá del turismo convencional.',
        'Visitarás templos milenarios, jardines zen, participarás en ceremonias tradicionales y contemplarás el majestuoso <strong>Monte Fuji</strong>. Experimenta la meditación zen, alójate en un ryokan tradicional y descubre la filosofía japonesa.',
        'Un viaje transformador que combina naturaleza, espiritualidad y cultura en los lugares más sagrados de Japón. Una experiencia que cambiará tu perspectiva del mundo.',
      ],
    },
    destacados: [
      { icono: 'mountain', titulo: 'Monte Fuji', texto: 'Símbolo de Japón' },
      { icono: 'hot-tub', titulo: 'Onsen', texto: 'Baños termales' },
      { icono: 'om', titulo: 'Meditación Zen', texto: 'Con monjes budistas' },
      { icono: 'praying-hands', titulo: 'Monte Koya', texto: 'Centro del budismo' },
    ],
    galeria: [
      { src: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600', alt: 'Bosque de bambú' },
      { src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600', alt: 'Fushimi Inari' },
      { src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600', alt: 'Templo Kioto' },
      { src: 'https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=600', alt: 'Monte Fuji' },
      { src: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600', alt: 'Jardín zen' },
      { src: 'https://images.unsplash.com/photo-1600262613650-ba7b8e0e8dd2?w=600', alt: 'Ryokan' },
    ],
    itinerario: [
      {
        titulo: 'España → Tokio',
        texto: 'Salida desde España con destino a Tokio. Vuelo con escala. Noche a bordo.',
        etiquetas: [
          { tipo: 'actividad', icono: 'plane', texto: 'Vuelo internacional' },
        ],
      },
      {
        titulo: 'Llegada a Tokio · Reunión de bienvenida',
        texto: 'Llegada a Tokio. Traslado al hotel. Tarde libre para descansar. Reunión de bienvenida con introducción al viaje espiritual y presentación del grupo.',
        etiquetas: [
          { tipo: 'hotel', icono: 'hotel', texto: 'Asakusa View Hotel 4★' },
          { tipo: 'comida', icono: 'utensils', texto: 'Cena incluida' },
        ],
      },
      {
        titulo: 'Tokio — Templos Sagrados y Meditación',
        texto: 'Visita al Templo Senso-ji y participación en ritual matutino. Santuario Meiji con ceremonia de purificación. Tarde en jardín zen con sesión de meditación guiada.',
        etiquetas: [
          { tipo: 'destacado', icono: 'om', texto: 'Meditación zen incluida' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno y almuerzo vegetariano' },
        ],
      },
      {
        titulo: 'Tokio → Monte Fuji → Hakone · Ryokan · Onsen',
        texto: 'Excursión al Monte Fuji. Visita al Santuario Kitaguchi Hongu Fuji Sengen. Contemplación del Fuji desde el Lago Kawaguchi. Noche en ryokan tradicional con onsen (baños termales).',
        etiquetas: [
          { tipo: 'destacado', icono: 'hot-tub', texto: 'Onsen incluido' },
          { tipo: 'hotel', icono: 'hotel', texto: 'Ryokan Hakone Yumoto Onsen' },
          { tipo: 'comida', icono: 'utensils', texto: 'Cena kaiseki incluida' },
        ],
      },
      {
        titulo: 'Hakone → Kioto · Higashiyama · Ceremonia del Té',
        texto: 'Mañana libre para disfrutar del onsen. Traslado en Shinkansen a Kioto. Llegada y paseo por el barrio de Higashiyama. Ceremonia del té en casa tradicional.',
        etiquetas: [
          { tipo: 'actividad', icono: 'train', texto: 'Shinkansen incluido' },
          { tipo: 'hotel', icono: 'hotel', texto: 'Hotel Higashiyama by Kyoto Tokyu 4★' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
      {
        titulo: 'Kioto — Templos Zen y Zazen con Monjes',
        texto: 'Visita al Templo Kinkaku-ji (Pabellón Dorado) y al Templo Ryoan-ji con su famoso jardín de rocas zen. Sesión de meditación zazen con monjes budistas. Templo Kiyomizu-dera al atardecer.',
        etiquetas: [
          { tipo: 'destacado', icono: 'om', texto: 'Zazen con monjes' },
          { tipo: 'comida', icono: 'utensils', texto: 'Almuerzo shojin ryori (cocina budista)' },
        ],
      },
      {
        titulo: 'Kioto — Fushimi Inari y Arashiyama',
        texto: 'Amanecer en Fushimi Inari, caminata por los miles de torii rojos. Bosque de Bambú de Arashiyama. Templo Tenryu-ji con jardín zen. Puente Togetsukyo. Tarde libre.',
        etiquetas: [
          { tipo: 'actividad', icono: 'walking', texto: 'Fushimi Inari, Arashiyama' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
      {
        titulo: 'Kioto → Monte Koya · Noche en Templo Budista',
        texto: 'Excursión al Monte Koya, centro del budismo Shingon. Visita al complejo de templos Danjo Garan. Cementerio Okunoin con sus 200.000 lápidas. Noche en templo budista (shukubo) con cena vegetariana.',
        etiquetas: [
          { tipo: 'destacado', icono: 'praying-hands', texto: 'Noche en templo budista' },
          { tipo: 'comida', icono: 'utensils', texto: 'Cena shojin ryori incluida' },
        ],
      },
      {
        titulo: 'Monte Koya → Osaka · Ceremonia · Cena de Despedida',
        texto: 'Participación en ceremonia matutina con monjes (5:30 AM). Desayuno vegetariano. Regreso a Osaka. Tarde libre. Cena de despedida con el grupo.',
        etiquetas: [
          { tipo: 'hotel', icono: 'hotel', texto: 'Swissotel Nankai Osaka 5★' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno y cena incluidos' },
        ],
      },
      {
        titulo: 'Osaka → España · Regreso',
        texto: 'Desayuno. Traslado al aeropuerto. Vuelo de regreso a España. Llegada el mismo día.',
        etiquetas: [
          { tipo: 'actividad', icono: 'plane', texto: 'Vuelo de regreso' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
    ],
    incluye: [
      'Vuelos internacionales de ida y vuelta',
      '8 noches de alojamiento',
      '1 noche en ryokan tradicional',
      '1 noche en templo budista',
      'Desayunos diarios',
      '5 comidas especiales (shojin ryori)',
      'Ceremonias y sesiones de meditación',
      'Todos los traslados',
      'Guía espiritual en español',
      'Seguro de viaje',
    ],
    incluyeNota: 'Este viaje incluye estancias en ryokan y templo budista con <strong>comidas vegetarianas shojin ryori</strong>, la auténtica cocina de los monjes japoneses.',
    noIncluye: [
      'Comidas no especificadas',
      'Bebidas',
      'Propinas',
      'Gastos personales',
      'Seguro de cancelación',
    ],
    resenas: [
      {
        iniciales: 'I',
        color: 'morado',
        nombre: 'Isabel Moreno',
        estrellas: 5,
        fecha: 'Enero 2026',
        texto: '"La noche en el templo budista del Monte Koya fue transformadora. La meditación zazen con los monjes cambió mi perspectiva. Un viaje que recomiendo a todo el mundo."',
      },
      {
        iniciales: 'J',
        color: 'verde',
        nombre: 'Javier Ruiz',
        estrellas: 5,
        fecha: 'Noviembre 2025',
        texto: '"El onsen en el ryokan de Hakone con vistas al Fuji al amanecer... sin palabras. La comida shojin ryori del templo fue una sorpresa gastronómica increíble."',
      },
      {
        iniciales: 'R',
        color: 'rojo-suave',
        nombre: 'Rosa Fernández',
        estrellas: 4,
        fecha: 'Octubre 2025',
        texto: '"Fushimi Inari al amanecer, sin turistas, solo con el sonido de los cuervos y los torii rojos... mágico. El mejor viaje de mi vida sin duda."',
      },
    ],
    salidas: [
      { fecha: '2026-11-21', plazas: 4 },
      { fecha: '2027-01-23', plazas: 10 },
      { fecha: '2027-04-03', plazas: 0 },
      { fecha: '2027-05-08', plazas: 7 },
      { fecha: '2027-09-11', plazas: 12 },
    ],
    datos: [
      { icono: 'clock', texto: '10 días · 8 noches' },
      { icono: 'hotel', texto: 'Hoteles 4★ + ryokan + templo' },
      { icono: 'users', texto: 'Grupos reducidos (máx. 12)' },
      { icono: 'spa', texto: 'Experiencia espiritual única' },
      { icono: 'hot-tub', texto: 'Ryokan con onsen incluido' },
    ],
  },
  {
    slug: 'gran-tour',
    nombre: 'Gran Tour de Japón',
    nombreCorto: 'Gran Tour',
    precio: 2999,
    dias: 14,
    noches: 12,
    valoracion: 4.9,
    numResenas: 238,
    grupoMax: 16,
    tarjeta: {
      imagen: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=600',
      descripcion: '14 días recorriendo todo Japón. La experiencia más completa.',
    },
    hero: {
      imagen: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1920',
      subtitulo: 'La experiencia definitiva — 14 días recorriendo Japón de norte a sur',
      etiquetas: ['⭐ TOUR MÁS COMPLETO', '6 SITIOS UNESCO'],
    },
    ruta: [
      { icono: 'plane-departure', nombre: 'Madrid' },
      { icono: 'torii-gate', nombre: 'Tokio' },
      { icono: 'tree', nombre: 'Nikko' },
      { icono: 'mountain', nombre: 'Hakone / Fuji' },
      { icono: 'home', nombre: 'Takayama' },
      { icono: 'landmark', nombre: 'Kanazawa' },
      { icono: 'place-of-worship', nombre: 'Kioto' },
      { icono: 'paw', nombre: 'Nara' },
      { icono: 'city', nombre: 'Osaka / Hiroshima' },
      { icono: 'chess-rook', nombre: 'Himeji' },
      { icono: 'plane-arrival', nombre: 'Madrid' },
    ],
    descripcion: {
      titulo: 'El Tour Definitivo de Japón',
      parrafos: [
        'El <strong>Gran Tour de Japón</strong> es nuestra experiencia más completa y exhaustiva. Durante 14 días recorrerás el país de norte a sur, desde las montañas nevadas de los Alpes Japoneses hasta las islas sagradas del mar interior de Seto.',
        'Este viaje combina las grandes ciudades —Tokio, Kioto, Osaka, Hiroshima— con pueblos tradicionales de los Alpes, naturaleza espectacular del Monte Fuji y experiencias culturales únicas. Viajarás en shinkansen, ferry, teleférico y mucho más.',
        'Perfecto para quienes desean conocer Japón en profundidad. Una experiencia que recordarás toda la vida. Incluye <strong>6 sitios Patrimonio UNESCO</strong> y el <strong>JR Pass 7 días</strong> para máxima libertad de movimiento.',
      ],
    },
    destacados: [
      { icono: 'train', titulo: 'JR Pass 7 días', texto: 'Viaja en shinkansen a voluntad' },
      { icono: 'hot-tub', titulo: 'Ryokan + Onsen', texto: 'Noche en baños termales de Hakone' },
      { icono: 'dove', titulo: 'Hiroshima & Miyajima', texto: 'Paz, historia y el torii flotante' },
      { icono: 'snowflake', titulo: 'Shirakawa-go', texto: 'Aldea UNESCO con casas de nieve' },
    ],
    galeria: [
      { src: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600', alt: 'Monte Fuji' },
      { src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600', alt: 'Nikko Toshogu' },
      { src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600', alt: 'Shirakawa-go' },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', alt: 'Hiroshima Torii' },
      { src: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600', alt: 'Castillo Himeji' },
      { src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600', alt: 'Kioto templos' },
    ],
    itinerario: [
      {
        titulo: 'España → Tokio',
        texto: 'Salida desde España. Vuelo directo con escala hacia Tokio. Noche a bordo del avión.',
        etiquetas: [
          { tipo: 'actividad', icono: 'plane', texto: 'Vuelo internacional' },
        ],
      },
      {
        titulo: 'Llegada a Tokio · Cena de bienvenida',
        texto: 'Llegada al aeropuerto de Narita. Traslado al hotel. Tarde libre para adaptarse al jet lag. Cena de bienvenida con presentación del tour.',
        etiquetas: [
          { tipo: 'hotel', icono: 'hotel', texto: 'Keio Plaza Hotel Tokyo 5★' },
          { tipo: 'comida', icono: 'utensils', texto: 'Cena incluida' },
        ],
      },
      {
        titulo: 'Tokio — Tour Completo',
        texto: 'Visita completa: Templo Senso-ji en Asakusa, Palacio Imperial, cruce de Shibuya, Harajuku y Santuario Meiji. Noche en Shinjuku.',
        etiquetas: [
          { tipo: 'actividad', icono: 'walking', texto: 'Tour día completo' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno y almuerzo' },
        ],
      },
      {
        titulo: 'Tokio → Nikko (UNESCO)',
        texto: 'Excursión a Nikko. Santuario Toshogu (Patrimonio UNESCO), Lago Chuzenji y Cascada Kegon. Regreso a Tokio por la noche.',
        etiquetas: [
          { tipo: 'aviso', icono: 'star', texto: 'Patrimonio UNESCO' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
      {
        titulo: 'Tokio → Hakone · Monte Fuji · Ryokan',
        texto: 'Viaje a Hakone. Crucero por el Lago Ashi, teleférico al Valle Owakudani con vistas del Monte Fuji. Noche en ryokan con onsen privado.',
        etiquetas: [
          { tipo: 'destacado', icono: 'hot-tub', texto: 'Onsen incluido' },
          { tipo: 'hotel', icono: 'hotel', texto: 'Ryokan tradicional' },
          { tipo: 'comida', icono: 'utensils', texto: 'Cena kaiseki' },
        ],
      },
      {
        titulo: 'Hakone → Takayama (Alpes Japoneses)',
        texto: 'Traslado a Takayama en los Alpes Japoneses. Exploración del casco antiguo con casas Edo. Mercado matutino y sake tasting local.',
        etiquetas: [
          { tipo: 'hotel', icono: 'hotel', texto: 'Takayama Ouan 4★' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
      {
        titulo: 'Takayama → Shirakawa-go (UNESCO) → Kanazawa',
        texto: 'Visita a Shirakawa-go (UNESCO), el pueblo con casas gassho-zukuri de tejados de paja. Continuación a Kanazawa: Jardín Kenrokuen y el barrio de geishas Higashi Chaya.',
        etiquetas: [
          { tipo: 'aviso', icono: 'star', texto: 'Patrimonio UNESCO' },
          { tipo: 'hotel', icono: 'hotel', texto: 'Kanazawa Tokyu 4★' },
        ],
      },
      {
        titulo: 'Kanazawa → Kioto · Gion · Ceremonia del Té',
        texto: 'Traslado en shinkansen a Kioto. Tarde libre en el barrio de Gion para encontrar geishas. Ceremonia del té tradicional y paseo por Pontocho.',
        etiquetas: [
          { tipo: 'hotel', icono: 'hotel', texto: 'The Thousand Kyoto 5★' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
      {
        titulo: 'Kioto — Templos, Bambú y Fushimi Inari',
        texto: 'Tour completo: Pabellón Dorado Kinkaku-ji, jardín zen Ryoan-ji, Arashiyama con el bosque de bambú y el icónico Fushimi Inari con sus miles de torii rojos.',
        etiquetas: [
          { tipo: 'actividad', icono: 'walking', texto: 'Tour día completo' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno y almuerzo' },
        ],
      },
      {
        titulo: 'Kioto → Nara (UNESCO) → Osaka',
        texto: 'Excursión a Nara: el Parque de los Ciervos y el Templo Todai-ji (UNESCO) con el Gran Buda. Traslado a Osaka. Castillo de Osaka y la vibrante Dotonbori.',
        etiquetas: [
          { tipo: 'aviso', icono: 'star', texto: 'Patrimonio UNESCO' },
          { tipo: 'hotel', icono: 'hotel', texto: 'Swissotel Nankai Osaka 5★' },
        ],
      },
      {
        titulo: 'Osaka → Hiroshima → Miyajima (UNESCO)',
        texto: 'Shinkansen a Hiroshima. Parque de la Paz y Museo Memorial. Ferry a la isla sagrada de Miyajima. Torii flotante y Templo Itsukushima (UNESCO).',
        etiquetas: [
          { tipo: 'aviso', icono: 'star', texto: 'Patrimonio UNESCO' },
          { tipo: 'hotel', icono: 'hotel', texto: 'Sheraton Grand Hiroshima 5★' },
        ],
      },
      {
        titulo: 'Hiroshima → Himeji (UNESCO) → Osaka',
        texto: 'Visita al Castillo de Himeji (UNESCO), considerado el más bello de Japón. Jardín Kokoen adyacente. Regreso a Osaka por la tarde para disfrutar de la ciudad.',
        etiquetas: [
          { tipo: 'aviso', icono: 'star', texto: 'Patrimonio UNESCO' },
          { tipo: 'hotel', icono: 'hotel', texto: 'Swissotel Nankai Osaka 5★' },
        ],
      },
      {
        titulo: 'Osaka — Día Libre · Cena de Gala',
        texto: 'Día libre para explorar Osaka a tu ritmo: mercado Kuromon, Umeda Sky Building, Universal Studios (opcional). Por la noche, cena de despedida con espectáculo de danza tradicional.',
        etiquetas: [
          { tipo: 'actividad', icono: 'clock', texto: 'Día libre' },
          { tipo: 'destacado', icono: 'utensils', texto: 'Cena de gala incluida' },
        ],
      },
      {
        titulo: 'Osaka → España · Regreso',
        texto: 'Desayuno en el hotel. Traslado al aeropuerto de Kansai. Vuelo de regreso a España con escala. Llegada el mismo día por la noche.',
        etiquetas: [
          { tipo: 'actividad', icono: 'plane', texto: 'Vuelo de regreso' },
          { tipo: 'comida', icono: 'utensils', texto: 'Desayuno incluido' },
        ],
      },
    ],
    incluye: [
      'Vuelos internacionales de ida y vuelta',
      '12 noches en hoteles 4-5★',
      '1 noche en ryokan con onsen privado',
      'Desayunos diarios + 8 comidas especiales',
      'JR Pass 7 días (shinkansen ilimitado)',
      'Todos los traslados en tierra',
      'Todas las visitas y entradas a monumentos',
      'Guía experto en español 24h',
      'Seguro de viaje premium',
      'Cena de gala de despedida',
    ],
    incluyeNota: 'El JR Pass 7 días cubre todos los shinkansen entre ciudades. Para trayectos adicionales, los billetes de metro local no están incluidos.',
    noIncluye: [
      'Comidas no especificadas en el programa',
      'Bebidas alcohólicas',
      'Propinas (voluntarias)',
      'Gastos personales y souvenirs',
      'Excursiones opcionales (Universal Studios, Monte Koya)',
      'Metro local en las ciudades',
    ],
    resenas: [
      {
        iniciales: 'CM',
        color: 'rojo',
        nombre: 'Carlos M.',
        estrellas: 5,
        fecha: 'Noviembre 2025',
        texto: '"El mejor viaje de mi vida, sin ninguna duda. Ver 6 sitios UNESCO en un solo viaje es una pasada. El guía, Roberto, es increíble: conoce cada rincón de Japón."',
      },
      {
        iniciales: 'LF',
        color: 'gris',
        nombre: 'Laura F.',
        estrellas: 5,
        fecha: 'Octubre 2025',
        texto: '"La noche en el ryokan de Hakone fue mágica. Despertar con vistas al Monte Fuji y darse un onsen privado… no tiene precio. El precio del viaje merece cada euro."',
      },
      {
        iniciales: 'JR',
        color: 'ambar',
        nombre: 'Javier R.',
        estrellas: 4,
        fecha: 'Septiembre 2025',
        texto: '"14 días dan para muchísimo. Shirakawa-go bajo la nieve fue la imagen más espectacular que he visto en la vida. Organización perfecta, sin ningún contratiempo."',
      },
    ],
    salidas: [
      { fecha: '2026-11-28', plazas: 6 },
      { fecha: '2027-03-20', plazas: 3 },
      { fecha: '2027-04-24', plazas: 9 },
      { fecha: '2027-05-29', plazas: 15 },
      { fecha: '2027-10-02', plazas: 16 },
    ],
    datos: [
      { icono: 'clock', texto: '14 días · 12 noches' },
      { icono: 'hotel', texto: 'Hoteles 4-5★ + 1 ryokan' },
      { icono: 'train', texto: 'JR Pass 7 días incluido' },
      { icono: 'users', texto: 'Máx. 16 personas por grupo' },
      { icono: 'star', texto: '6 sitios Patrimonio UNESCO' },
      { icono: 'language', texto: 'Guía en español incluido' },
    ],
    garantia: {
      titulo: 'Garantía Gran Tour',
      texto: 'Cancelación gratuita hasta 45 días antes del viaje. Si no quedas satisfecho, te devolvemos el dinero.',
      puntos: ['Pago seguro y encriptado', 'Asistencia 24/7 en destino'],
    },
  },
];

export const garantiaPorDefecto: Garantia = {
  titulo: 'Nuestra Garantía',
  texto: 'Cancelación gratuita hasta 30 días antes del viaje. Precio mínimo garantizado.',
  puntos: ['Pago seguro y encriptado', 'Atención 24/7 en destino'],
};

export function getTrip(slug: string | null | undefined): Trip | undefined {
  return trips.find((trip) => trip.slug === slug);
}

/**
 * Envío de formularios a Formspree (https://formspree.io).
 *
 * Configura el ID del formulario en `.env` como PUBLIC_FORMSPREE_ID. Sin él:
 * - en desarrollo, el envío se simula para poder probar la interfaz;
 * - en producción, el envío falla con un mensaje que remite al email de contacto.
 */

export type TipoFormulario = 'contacto' | 'newsletter';

export class FormularioNoConfigurado extends Error {}

const FORMSPREE_ID = import.meta.env.PUBLIC_FORMSPREE_ID;

export async function enviarFormulario(tipo: TipoFormulario, datos: Record<string, string>): Promise<void> {
  if (!FORMSPREE_ID) {
    if (import.meta.env.DEV) {
      console.info(`[formularios] PUBLIC_FORMSPREE_ID no configurado: se simula el envío de "${tipo}"`, datos);
      await new Promise((resolve) => setTimeout(resolve, 600));
      return;
    }
    throw new FormularioNoConfigurado('Formulario no configurado');
  }

  const respuesta = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...datos, _subject: `[Japón Travel] ${tipo}`, tipo }),
  });

  if (!respuesta.ok) throw new Error(`Formspree respondió ${respuesta.status}`);
}

export const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

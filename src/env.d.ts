interface ImportMetaEnv {
  /** ID del formulario de Formspree para contacto y newsletter. */
  readonly PUBLIC_FORMSPREE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

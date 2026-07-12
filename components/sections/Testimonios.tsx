"use client";

// Casos de éxito: títulos a la izquierda y tarjetas circulando a la derecha
// en un marquee de loop infinito (se pausa al pasar el mouse encima).
// El track lleva el contenido duplicado 2x y la animación CSS lo desplaza
// exactamente -50%, así el reinicio del bucle es invisible.

import { motion } from "framer-motion";

// TODO: reemplazar por la URL real del perfil de Google Business cuando
// esté creado (ej: https://g.page/r/XXXXXXXX/review o el enlace de Maps).
const GOOGLE_REVIEWS_URL = "https://www.google.com/maps";

const testimonios = [
  {
    texto:
      "Llegué con la idea hecha un nudo y salí con un plan claro. Carol me ordenó la cabeza en una hora y por fin di el paso.",
    nombre: "Javiera R.",
    detalle: "Emprendedora de repostería",
  },
  {
    texto:
      "Lo que más me sirvió fue su calidez. No me sentí juzgada por no saber, me sentí acompañada. Hoy ya tengo mis primeras clientas.",
    nombre: "Daniela P.",
    detalle: "Servicios de bienestar",
  },
  {
    texto:
      "Pensé que necesitaba un curso carísimo. Necesitaba esta conversación. Valió cada peso y mucho más.",
    nombre: "Carolina M.",
    detalle: "Tienda online de accesorios",
  },
  {
    texto:
      "Tenía mil pestañas abiertas y cero avance. Con Carol armamos una ruta simple y en dos semanas ya tenía mi primera venta.",
    nombre: "Fernanda S.",
    detalle: "Pastelería saludable",
  },
];

export default function Testimonios() {
  return (
    <section className="bg-white px-6 py-14 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-12">
        {/* Títulos a la izquierda: entran deslizándose desde la izquierda,
            corren siempre y se repiten en cada pasada, como la sección
            "Quién es Carol" */}
        <motion.div
          className="relative text-center lg:pl-7 lg:text-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Línea vertical elegante, como la del hero. Entra junto al texto */}
          <span
            className="absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-oro/50 to-transparent lg:block"
            aria-hidden
          />
          <p className="font-serif text-sm uppercase tracking-[0.2em] text-dorado">
            Lo que dicen ellas
          </p>
          <h2 className="mt-3 font-serif text-3xl text-tinta sm:text-4xl">
            Mujeres que ya dieron el primer paso
          </h2>

          {/* Tarjeta de reseñas de Google */}
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-tinta/10 bg-white px-4 py-2.5 shadow-sm transition hover:border-dorado/40 hover:shadow-md"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 48 48" aria-hidden>
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            <span className="text-sm font-medium text-tinta">Ver reseñas</span>
          </a>
        </motion.div>

        {/* Marquee infinito de tarjetas */}
        <motion.div
          className="marquee relative min-w-0 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="marquee-track flex w-max">
            {[...testimonios, ...testimonios].map((t, i) => (
              <article
                key={`${t.nombre}-${i}`}
                aria-hidden={i >= testimonios.length}
                className="mr-4 flex w-[280px] shrink-0 flex-col rounded-2xl border border-dorado/20 bg-arena/30 p-5 shadow-[0_16px_40px_-12px_rgba(27,26,26,0.12)] sm:w-[320px]"
              >
                <p className="text-xs tracking-[0.25em] text-dorado" aria-hidden>
                  ★★★★★
                </p>
                <p className="mt-3 flex-1 font-serif text-[15px] italic leading-relaxed text-tinta">
                  &ldquo;{t.texto}&rdquo;
                </p>
                <div className="mt-4">
                  <span className="block h-px w-10 bg-dorado/50" aria-hidden />
                  <p className="mt-2.5 font-serif text-[15px] text-tinta">
                    {t.nombre}
                  </p>
                  <p className="text-[13px] text-tinta/70">{t.detalle}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Fundidos laterales para que las tarjetas entren y salgan suave */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-white to-transparent sm:w-8"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-5 bg-gradient-to-l from-white to-transparent sm:w-8"
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}

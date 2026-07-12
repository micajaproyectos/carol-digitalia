"use client";

// Cómo funciona — 3 pasos simples. Anima con el patrón de la landing:
// entrada al hacer scroll, corre siempre y se repite en cada pasada
// (once: false). Los pasos entran en cascada siguiendo la dirección 1→2→3.

import { motion, type Variants } from "framer-motion";

const pasos = [
  {
    n: "1",
    titulo: "Contáctame directo",
    texto: "Agendamos tu reunión el día y hora que más te acomode.",
  },
  {
    n: "2",
    titulo: "Hablamos de tu negocio",
    texto: "Una conversación honesta sobre tu idea y tu momento.",
  },
  {
    n: "3",
    titulo: "Comienzas con dirección",
    texto:
      "Te comparto toda mi experiencia para que partas con la información correcta.",
  },
];

const listaVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const pasoVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden rounded-t-[2.5rem] bg-white px-6 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-serif text-sm uppercase tracking-[0.2em] text-dorado">
            Cómo funciona
          </p>
          <h2 className="mt-3 font-serif text-3xl text-tinta sm:text-4xl">
            Tan simple como dar un paso a la vez
          </h2>
        </motion.div>

        {/* Timeline: vertical en mobile, horizontal en desktop */}
        <motion.ol
          variants={listaVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="mt-9 flex flex-col gap-8 md:flex-row md:gap-4"
        >
          {pasos.map((p, i) => (
            <motion.li
              key={p.n}
              variants={pasoVariants}
              className="relative flex flex-1 gap-5 md:flex-col md:gap-0 md:text-center"
            >
              {/* Línea conectora (no en el último paso) */}
              {i < pasos.length - 1 && (
                <span
                  className="absolute left-[27px] top-14 h-[calc(100%+2rem)] w-px bg-camel/30 md:left-1/2 md:top-7 md:h-px md:w-full"
                  aria-hidden
                />
              )}

              {/* Número: con el mismo destello de los botones "Agenda tu
                  asesoría", desfasado para que la luz recorra 1 → 2 → 3 */}
              <div
                className={`btn-resplandor resplandor-notorio relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-dorado font-serif text-xl text-crema shadow-sm md:mx-auto ${
                  i > 0 ? `resplandor-delay-${i}` : ""
                }`}
              >
                {p.n}
              </div>

              <div className="md:mt-5 md:px-2">
                <h3 className="font-serif text-lg text-tinta">{p.titulo}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-tinta/70">
                  {p.texto}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

"use client";

// La asesoría — la oferta central de la landing. La sección completa está
// dividida en dos paneles de color a sangre completa: espresso con el precio
// y el CTA, crema con lo que incluye.

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import AgendarButton from "@/components/AgendarButton";

const fases = [
  {
    numero: "01",
    titulo: "Aterrizamos tu idea",
    texto:
      "Hablamos de tu idea y le damos dirección: definimos quién es tu cliente, qué problema resuelves y cómo convertirla en un negocio.",
  },
  {
    numero: "02",
    titulo: "Tu primera venta",
    texto:
      "Creamos una estrategia para lograr tu primera venta y validar tu producto. Si alguien lo compra, tienes un negocio.",
  },
  {
    numero: "03",
    titulo: "Formalizamos tu empresa",
    texto:
      "Te guío para formalizar tu empresa y dejar todo en regla, lista para comenzar a operar con tranquilidad.",
  },
];

const listaVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function LaAsesoria() {
  return (
    <section className="relative grid overflow-hidden rounded-t-[2.5rem] lg:grid-cols-[1.15fr_1fr]">
      {/* Panel espresso: la oferta */}
      <div className="flex items-center bg-espresso px-6 py-16 sm:px-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-xl"
        >
          <p className="font-serif text-sm uppercase tracking-[0.2em] text-oro">
            La asesoría
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-crema sm:text-4xl">
            Una asesoría para comenzar tu proyecto con dirección
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-crema/70">
            Una hora de trabajo enfocada en tu proyecto: ordenamos tus planes,
            aterrizamos prioridades y sales sabiendo exactamente qué hacer
            primero.
          </p>

          {/* Precio */}
          <div className="mt-10 flex flex-wrap items-end gap-x-3 gap-y-1">
            <p className="font-serif text-5xl leading-none text-crema">
              $25.000
            </p>
            <p className="pb-0.5 text-sm text-crema/60">
              CLP · valor por sesión de una hora
            </p>
          </div>

          {/* Hairline dorado, como las líneas del hero */}
          <div
            className="mt-8 h-px w-full max-w-sm bg-gradient-to-r from-oro/50 to-transparent"
            aria-hidden
          />

          <AgendarButton className="mt-8 w-full sm:w-auto">
            Agenda tu asesoría
          </AgendarButton>
        </motion.div>
      </div>

      {/* Panel "Qué incluye" con la imagen de la asesoría como fondo */}
      <div className="relative flex items-center overflow-hidden bg-espresso px-6 py-16 sm:px-12 sm:py-20">
        {/* La imagen entra con un zoom-out suave; se repite en cada pasada */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <Image
            src="/asesoria.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
        {/* Veladura espresso para que la lista se lea sobre la foto */}
        <div
          className="absolute inset-0 bg-espresso/60 md:bg-transparent md:bg-gradient-to-r md:from-espresso/60 md:via-espresso/35 md:to-espresso/15"
          aria-hidden
        />
        {/* Desvanecido suave desde el panel espresso hacia la foto, como el
            de "Preguntas frecuentes": arriba en mobile, izquierda en desktop */}
        <div
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, #2b1f16 0%, rgba(43,31,22,0.4) 7%, transparent 18%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, #2b1f16 0%, rgba(43,31,22,0.4) 7%, transparent 18%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-xl">
          <h3 className="font-serif text-xl text-crema">Fases de trabajo</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-crema/70">
            En cada sesión vamos avanzando en tu proyecto.
          </p>
          <motion.ol
            variants={listaVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="mt-7"
          >
            {fases.map((fase) => (
              <motion.li
                key={fase.numero}
                variants={itemVariants}
                className="flex items-start gap-4 border-b border-crema/15 py-5 first:pt-0 last:border-0"
              >
                <span
                  className="font-serif text-2xl leading-none text-oro/70"
                  aria-hidden
                >
                  {fase.numero}
                </span>
                <span>
                  <span className="block font-serif text-lg text-crema">
                    {fase.titulo}
                  </span>
                  <span className="mt-1.5 block text-[15px] leading-relaxed text-crema/85">
                    {fase.texto}
                  </span>
                </span>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

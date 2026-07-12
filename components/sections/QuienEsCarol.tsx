"use client";

// Logros con aparición al hacer scroll: cuando la grilla entra al viewport,
// las tarjetas suben y ganan opacidad en cascada (whileInView + stagger,
// el mismo mecanismo probado de Reveal).

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Reveal, RevealItem } from "@/components/Reveal";

// Logros profesionales y de emprendimiento. La cifra va destacada en serif
// y el detalle en texto pequeño, como en los indicadores de confianza del hero.
const logros = [
  {
    cifra: "+9",
    detalle: "años creando empresas",
  },
  {
    cifra: "+3",
    detalle: "emprendimientos propios en marcha",
  },
  {
    cifra: "+100",
    detalle: "emprendedoras acompañadas",
  },
];

// Formación académica de Carol.
const credenciales = [
  "Ingeniera en Administración de Empresas",
  "Diplomados en Liderazgo y Gestión de Personas, Dirección Organizacional y Alta Gerencia Empresarial",
  "Magíster en Dirección de Empresas",
  "Estudiante de Derecho, especialista en derecho corporativo",
];

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// Cada credencial entra deslizándose desde la izquierda, en cascada.
// Corre siempre (también con reducción de movimiento): es una entrada breve
// de una sola vez, igual que las estrellas y los conteos del hero.
const credencialVariants: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Las tarjetas llegan deslizándose desde la derecha hasta su lugar en la fila.
// Corre siempre (también con reducción de movimiento), igual que las
// credenciales de arriba.
const cardVariants: Variants = {
  hidden: { opacity: 0, x: 80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function QuienEsCarol() {
  return (
    <section className="relative overflow-hidden rounded-t-[2.5rem] bg-arena">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Imagen a sangre completa: pegada al costado izquierdo, sin márgenes.
            Entra a escena deslizándose desde la izquierda, como las tarjetas. */}
        <motion.div
          className="relative min-h-[45svh] lg:min-h-full"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/presentacion1.png"
            alt="Carol, mentora de Carol Digitalia"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        {/* Contenido a la derecha */}
        <div className="px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
          <Reveal stagger={0.1}>
            <RevealItem className="text-center lg:text-left">
              <p className="font-serif text-sm uppercase tracking-[0.2em] text-dorado">
                Quién es Carol
              </p>
              <h2 className="mt-3 font-serif text-3xl text-tinta sm:text-4xl">
                Emprendedora, ingeniera y mentora
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-tinta/75 lg:mx-0">
                Carol lleva casi una década creando negocios —propios y de
                otras mujeres— y hoy pone toda esa experiencia al servicio de
                quienes están dando su primer paso.
              </p>
            </RevealItem>
          </Reveal>

          {/* Formación: cada credencial entra en cascada desde la izquierda */}
          <motion.ul
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="mx-auto mt-8 max-w-2xl space-y-2.5 text-left lg:mx-0"
          >
            {credenciales.map((c) => (
              <motion.li
                key={c}
                variants={credencialVariants}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 text-dorado" aria-hidden>
                  ✦
                </span>
                <span className="text-[14px] leading-relaxed text-tinta/80">
                  {c}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Tarjetas horizontales de logros, aparecen en cascada con el scroll */}
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8"
          >
            {logros.map((l) => (
              <motion.div
                key={l.detalle}
                variants={cardVariants}
                className="flex flex-col items-start gap-2 border-l border-dorado/50 pl-4 text-left"
              >
                <p className="font-serif text-3xl leading-none text-dorado sm:text-4xl">
                  {l.cifra}
                </p>
                <p className="text-sm leading-snug text-tinta/65">
                  {l.detalle}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

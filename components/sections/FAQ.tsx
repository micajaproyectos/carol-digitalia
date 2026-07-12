"use client";

// Preguntas frecuentes en dos columnas: imagen a sangre completa a la
// izquierda (alternando con "La asesoría", que la lleva a la derecha) y el
// acordeón de preguntas a la derecha. La imagen entra como en "Quién es
// Carol" y el contenido en cascada desde la derecha, repitiéndose en cada
// pasada de scroll como en el resto de la landing.

import { useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import AgendarButton from "@/components/AgendarButton";

// Animación de entrada como en las secciones anteriores: el contenido entra
// en cascada desde la derecha (espejo de la imagen, que llega desde la
// izquierda), corre siempre y se repite en cada pasada (once: false).
const listaVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const faqs = [
  {
    q: "¿Cómo saber si mi idea de negocio es buena?",
    a: "Una buena idea de negocio resuelve un problema real y tiene números que cierran: cuánto cuesta producir, a qué precio vendes y cuánto te queda. Eso es exactamente lo que evaluamos en la asesoría: miramos tu idea con datos y mirada de negocio, para que sepas si estás frente a una oportunidad y cómo aprovecharla.",
  },
  {
    q: "¿Qué necesito para empezar un emprendimiento en Chile?",
    a: "Antes que los trámites, necesitas claridad: qué vendes, a quién y por qué a ti. Con eso definido, vienen los pasos formales — inicio de actividades en el SII y elegir tu figura (SpA, EIRL o persona natural). En la asesoría ordenamos ese camino según tu caso, para que partas por lo que de verdad importa.",
  },
  {
    q: "¿Cuánto cuesta empezar un negocio?",
    a: "Depende del rubro: hay emprendimientos digitales que parten con muy poco y otros que requieren más inversión. Lo importante no es cuánto tienes, sino invertir con la información correcta: saber qué gasto es necesario ahora y cuál puede esperar. Esa priorización es parte central de lo que trabajamos juntas.",
  },
  {
    q: "¿Puedo emprender sin experiencia previa?",
    a: "Sí. Nadie nace sabiendo dirigir un negocio, y la mayoría de las mujeres emprendedoras parte desde cero. Para eso está el acompañamiento: te transmito mis 9 años de experiencia creando empresas, para que no aprendas todo a costa de errores caros.",
  },
  {
    q: "¿Vale la pena pagar una asesoría para emprender?",
    a: "Equivocarse al comenzar cuesta caro: meses perdidos y dinero invertido donde no corresponde. Una asesoría que te entrega una ruta clara desde el inicio suele ser la inversión más rentable de todo el arranque: partes con dirección y evitas los errores más comunes.",
  },
  {
    q: "¿Cuánto cuesta y cómo funciona la asesoría?",
    a: "Tiene un valor de $25.000 CLP por una sesión de una hora. Agendas eligiendo el día que te acomode, coordinamos por WhatsApp y en la sesión hablamos de tu proyecto y tus planes para que salgas con una ruta clara. Si después quieres un acompañamiento más profundo, lo conversamos ahí mismo, sin presión.",
  },
];

function Item({ q, a, n }: { q: string; a: string; n: number }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div
      className={`rounded-2xl border bg-crema px-5 shadow-[0_16px_40px_-16px_rgba(27,26,26,0.15)] transition-colors duration-300 ${
        open ? "border-dorado/40" : "border-dorado/15 hover:border-dorado/35"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 py-5 text-left"
      >
        {/* Numeración editorial en serif, como las cifras de logros */}
        <span
          className="w-7 shrink-0 font-serif text-sm tabular-nums text-dorado/70"
          aria-hidden
        >
          {String(n).padStart(2, "0")}
        </span>
        <span
          className={`flex-1 font-serif text-lg transition-colors duration-300 ${
            open ? "text-dorado" : "text-tinta"
          }`}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="shrink-0 text-2xl leading-none text-dorado"
          aria-hidden
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            {/* Hairline dorado entre pregunta y respuesta, como en la landing */}
            <div
              className="h-px w-full bg-gradient-to-r from-dorado/30 to-transparent"
              aria-hidden
            />
            <p className="pb-5 pl-11 pt-4 text-[15px] leading-relaxed text-tinta/75">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="relative overflow-hidden rounded-t-[2.5rem] bg-arena">
      {/* División sutil entre imagen y contenido, como la del hero */}
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-[70%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-dorado/40 to-transparent lg:block"
        aria-hidden
      />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Imagen a sangre completa a la izquierda, como en "Quién es Carol":
            entra deslizándose desde su costado y se repite en cada pasada. */}
        <motion.div
          className="relative min-h-[45svh] lg:min-h-full"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/preguntas.png"
            alt="Carol resolviendo las dudas de una emprendedora"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Tinte cálido muy sutil para integrar la foto con la paleta,
              el mismo tratamiento del hero */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(168,107,60,0.14), rgba(43,31,22,0.14))",
            }}
            aria-hidden
          />
        </motion.div>

        {/* Acordeón de preguntas a la derecha */}
        <div className="px-6 py-20 sm:px-10 sm:py-24 lg:px-14">
          <motion.div
            className="mx-auto max-w-2xl"
            variants={listaVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.15 }}
          >
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <p className="font-serif text-sm uppercase tracking-[0.2em] text-dorado">
                Preguntas frecuentes
              </p>
              <h2 className="mt-3 font-serif text-3xl text-tinta sm:text-4xl">
                Resolvamos tus dudas
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-tinta/75 lg:mx-0">
                Las dudas que más se repiten antes de dar el primer paso. Si
                la tuya no aparece aquí, la conversamos directo en la sesión.
              </p>
            </motion.div>

            <div className="mt-10 space-y-3">
              {faqs.map((f, i) => (
                <motion.div key={f.q} variants={itemVariants}>
                  <Item q={f.q} a={f.a} n={i + 1} />
                </motion.div>
              ))}
            </div>

            {/* CTA de refuerzo: hairline dorado y el mismo botón de la landing,
                como el cierre del panel de "La asesoría" */}
            <motion.div variants={itemVariants} className="mt-12 text-center lg:text-left">
              <div
                className="mx-auto h-px w-full max-w-sm bg-gradient-to-r from-dorado/50 to-transparent lg:mx-0"
                aria-hidden
              />
              <p className="mt-6 font-serif text-lg text-tinta">
                ¿Lista para dar el primer paso?
              </p>
              <AgendarButton className="mt-5 w-full sm:w-auto">
                Agenda tu asesoría
              </AgendarButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

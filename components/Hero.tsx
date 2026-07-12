"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { animate } from "framer-motion";
import { useAgendar } from "./AgendarProvider";

// Conteo ascendente desde 0 hasta `hasta`, arranca tras `delay` segundos.
// Corre siempre (también con reducción de movimiento): es un cambio de
// contenido breve y de una sola vez, no un movimiento espacial.
function Contador({
  hasta,
  prefijo = "",
  delay = 0.1,
  className,
}: {
  hasta: number;
  prefijo?: string;
  delay?: number;
  className?: string;
}) {
  const [valor, setValor] = useState(0);

  useEffect(() => {
    const controls = animate(0, hasta, {
      delay,
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setValor(Math.round(v)),
    });
    return () => controls.stop();
  }, [hasta, delay]);

  return (
    <p className={className}>
      {prefijo}
      {valor}
    </p>
  );
}

// Las 5 estrellas aparecen una a una. Animación CSS pura: corre desde el
// primer pintado de la página, sin esperar la hidratación de React.
function Estrellas({ delay = 0.1 }: { delay?: number }) {
  return (
    <span
      className="font-serif text-lg leading-none tracking-[0.12em] text-oro sm:text-2xl"
      aria-hidden
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="estrella-pop"
          style={{ animationDelay: `${delay + i * 0.18}s` }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { openAgendar } = useAgendar();

  return (
    <section className="relative grid min-h-[100svh] grid-cols-1 overflow-hidden bg-espresso lg:grid-cols-2">
      {/* División sutil entre texto e imagen (vertical en desktop) */}
      <span
        className="linea-resplandor-v pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-[70%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-oro/40 to-transparent lg:block"
        aria-hidden
      />

      {/* Columna de foto (arriba en mobile, derecha en desktop) */}
      <div className="relative order-1 min-h-[50svh] min-w-0 overflow-hidden lg:order-2 lg:min-h-full">
        {/* División sutil entre imagen y texto (horizontal en mobile) */}
        <span
          className="linea-resplandor-h pointer-events-none absolute bottom-0 left-1/2 z-10 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-oro/40 to-transparent lg:hidden"
          aria-hidden
        />
        <Image
          src="/hero_carol.jpeg"
          alt="Carol, mentora de Carol Digitalia"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="animate-ken-burns object-cover object-[50%_15%]"
        />
        {/* Tinte cálido muy sutil para integrar la foto con la paleta */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(168,107,60,0.16), rgba(43,31,22,0.18))",
          }}
          aria-hidden
        />
        {/* Desvanecido hacia el panel espresso: abajo en mobile, izquierda en desktop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 55%, rgba(43,31,22,0.55) 80%, rgba(43,31,22,1) 100%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to left, transparent 45%, rgba(43,31,22,0.5) 78%, rgba(43,31,22,1) 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* Columna de texto (abajo en mobile, izquierda en desktop) */}
      <div className="order-2 flex min-w-0 flex-col justify-center bg-espresso px-6 py-16 sm:px-12 lg:order-1 lg:px-20 lg:py-20">
        <div className="mx-auto w-full min-w-0 max-w-2xl text-center lg:text-left">
          <p
            className="btn-resplandor animate-blur-fade-up inline-block font-serif text-sm uppercase tracking-[0.25em] text-oro"
            style={{ animationDelay: "0.05s" }}
          >
            Carol Digitalia
          </p>

          <h1
            className="animate-blur-fade-up mt-6 font-serif text-4xl leading-[1.12] text-crema sm:text-5xl lg:mt-8 lg:text-6xl"
            style={{ animationDelay: "0.2s" }}
          >
            Empieza tu negocio sin perder{" "}
            <em className="italic text-oro">tiempo</em> ni{" "}
            <em className="italic text-oro">dinero</em>
          </h1>

          <p
            className="animate-blur-fade-up mx-auto mt-7 max-w-xl text-base leading-relaxed text-crema/75 sm:text-lg lg:mx-0 lg:mt-9 lg:text-xl"
            style={{ animationDelay: "0.4s" }}
          >
            Para mujeres que quieren emprender pero no saben por dónde
            comenzar.
          </p>

          <div
            className="animate-blur-fade-up mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:mt-16 lg:justify-start lg:gap-5"
            style={{ animationDelay: "0.6s" }}
          >
            {/* CTA principal → abre el modal de la etapa 2 */}
            <button
              type="button"
              onClick={openAgendar}
              className="btn-resplandor w-full rounded-md bg-dorado px-7 py-3.5 text-base font-semibold text-crema shadow-lg shadow-black/30 transition duration-500 hover:scale-[1.03] hover:brightness-110 sm:w-auto lg:px-9 lg:py-4 lg:text-lg"
            >
              Agenda tu asesoría
            </button>

            {/* CTA secundario */}
            <a
              href="#como-funciona"
              className="btn-resplandor w-full rounded-md border border-crema/25 px-7 py-3.5 text-center text-base font-medium text-crema transition duration-500 hover:scale-[1.03] hover:bg-crema/10 sm:w-auto lg:px-9 lg:py-4 lg:text-lg"
            >
              Cómo funciona
            </a>
          </div>

          {/* Indicadores de confianza */}
          <div
            className="animate-blur-fade-up mt-14 flex items-start justify-center gap-x-4 sm:gap-x-12 lg:mt-20 lg:justify-start"
            style={{ animationDelay: "0.1s" }}
          >
            {/* Reseñas en Google */}
            <div className="flex min-w-0 flex-col items-center gap-1.5 border-l border-oro/40 pl-3 text-center sm:pl-4 lg:items-start lg:text-left">
              <div className="flex items-center gap-2.5">
                <svg
                  className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                  viewBox="0 0 48 48"
                  aria-hidden
                >
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
                <Estrellas />
              </div>
              <p className="text-xs text-crema/60">5,0 en reseñas de Google</p>
            </div>

            <div className="flex min-w-0 flex-col items-center gap-1.5 border-l border-oro/40 pl-3 text-center sm:pl-4 lg:items-start lg:text-left">
              <Contador
                hasta={100}
                prefijo="+"
                className="font-serif text-lg leading-none text-crema sm:text-2xl"
              />
              <p className="text-xs text-crema/60">emprendedoras asesoradas</p>
            </div>

            <div className="flex min-w-0 flex-col items-center gap-1.5 border-l border-oro/40 pl-3 text-center sm:pl-4 lg:items-start lg:text-left">
              <Contador
                hasta={9}
                className="font-serif text-lg leading-none text-crema sm:text-2xl"
              />
              <p className="text-xs text-crema/60">años ayudando a emprender</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

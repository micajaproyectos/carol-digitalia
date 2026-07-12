"use client";

// Scroll-reveal cálido: cada bloque entra con blur + fade + subida, disparado
// al entrar en viewport (once: true). Los hijos se escalonan (stagger).
// Respeta prefers-reduced-motion: si está activo, todo aparece sin animación.

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = (stagger: number, reduce: boolean): Variants => ({
  hidden: {},
  show: {
    transition: reduce
      ? {}
      : { staggerChildren: stagger, delayChildren: 0.05 },
  },
});

const itemVariants = (reduce: boolean): Variants =>
  reduce
    ? {
        // Neutraliza explícitamente TODAS las propiedades del estado "hidden"
        // normal: el HTML llega del servidor con blur(20px) y translateY(40px)
        // (el servidor no conoce prefers-reduced-motion), y si la variante no
        // las menciona, framer-motion nunca las limpia.
        hidden: { opacity: 1, filter: "blur(0px)", y: 0 },
        show: {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          transition: { duration: 0 },
        },
      }
    : {
        hidden: { opacity: 0, filter: "blur(20px)", y: 40 },
        show: {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          transition: { duration: 0.9, ease: EASE },
        },
      };

interface RevealProps extends HTMLMotionProps<"div"> {
  /** segundos entre hijos (0.08–0.12 recomendado) */
  stagger?: number;
  /** porción del bloque visible para disparar (0–1) */
  amount?: number;
}

export function Reveal({
  children,
  stagger = 0.1,
  amount = 0.2,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={containerVariants(stagger, reduce)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, ...rest }: HTMLMotionProps<"div">) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div variants={itemVariants(reduce)} {...rest}>
      {children}
    </motion.div>
  );
}

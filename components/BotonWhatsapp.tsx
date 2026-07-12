"use client";

// Botón flotante de WhatsApp: aparece cuando el usuario deja atrás el hero
// (aprox. un viewport de scroll) y desaparece al volver arriba. Verde oficial
// de WhatsApp para reconocimiento inmediato, con la misma entrada suave y el
// ease de la landing.

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/lead";

const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola Carol 👋 Quiero saber más sobre la asesoría."
)}`;

export default function BotonWhatsapp() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Visible una vez que el hero (100svh) quedó prácticamente atrás
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbele a Carol por WhatsApp"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-7 sm:right-7"
        >
          {/* Etiqueta permanente fuera del círculo, tipo burbuja de chat */}
          <span className="rounded-full bg-crema px-4 py-2 text-sm font-medium text-tinta shadow-[0_10px_28px_-10px_rgba(27,26,26,0.4)] ring-1 ring-tinta/10">
            Hablemos de tu proyecto
          </span>

          {/* Círculo clásico de WhatsApp */}
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25d366] shadow-[0_12px_32px_-8px_rgba(27,26,26,0.45)] transition duration-300 group-hover:scale-105 group-hover:brightness-105">
            <svg
              viewBox="0 0 32 32"
              className="h-7 w-7 shrink-0 fill-white"
              aria-hidden
            >
              <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.46 1.71 6.4L3.2 28.8l6.58-1.67a12.74 12.74 0 0 0 6.22 1.62h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.75-12.81-12.75Zm0 23.39h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9.99 1.04-3.8-.25-.4a10.55 10.55 0 0 1-1.62-5.67c0-5.87 4.78-10.64 10.66-10.64a10.6 10.6 0 0 1 10.63 10.66c0 5.87-4.78 10.57-10.76 10.57Zm5.84-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.14 3.09 1.3 3.3c.16.21 2.25 3.44 5.45 4.82.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
            </svg>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

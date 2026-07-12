"use client";

// CTA dorado sólido reutilizable que abre el modal de agendamiento.
// En el CUERPO de la página siempre se usa este botón sólido (nunca liquid-glass).

import { useAgendar } from "./AgendarProvider";

interface AgendarButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function AgendarButton({
  children,
  className = "",
}: AgendarButtonProps) {
  const { openAgendar } = useAgendar();
  return (
    <button
      type="button"
      onClick={openAgendar}
      className={
        "btn-resplandor inline-flex items-center justify-center rounded-md bg-dorado px-7 py-3.5 text-base font-semibold text-crema shadow-lg shadow-tinta/10 transition duration-500 hover:scale-[1.03] hover:brightness-110 " +
        className
      }
    >
      {children}
    </button>
  );
}

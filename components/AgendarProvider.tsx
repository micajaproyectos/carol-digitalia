"use client";

// Contexto que monta el modal de agendamiento UNA sola vez para toda la app.
// Cualquier CTA llama a openAgendar() para abrirlo. Reemplaza al disparador
// temporal de la etapa 2.

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import AgendarModal from "./AgendarModal";

interface AgendarContextValue {
  openAgendar: () => void;
}

const AgendarContext = createContext<AgendarContextValue | null>(null);

export function useAgendar(): AgendarContextValue {
  const ctx = useContext(AgendarContext);
  if (!ctx) {
    throw new Error("useAgendar debe usarse dentro de <AgendarProvider>.");
  }
  return ctx;
}

export default function AgendarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openAgendar = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openAgendar }), [openAgendar]);

  return (
    <AgendarContext.Provider value={value}>
      {children}
      <AgendarModal open={open} onClose={() => setOpen(false)} />
    </AgendarContext.Provider>
  );
}

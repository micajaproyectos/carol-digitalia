"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { buildWhatsAppUrl, isValidEmail, type LeadData } from "@/lib/lead";

type Status = "idle" | "loading" | "success" | "error";

interface AgendarModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormState {
  nombre: string;
  correo: string;
  telefono: string; // sólo los 9 dígitos tras el +56
  fecha: string; // valor del input date (YYYY-MM-DD)
}

interface FieldErrors {
  nombre?: string;
  correo?: string;
  telefono?: string;
  fecha?: string;
}

const EMPTY_FORM: FormState = { nombre: "", correo: "", telefono: "", fecha: "" };

/** Fecha mínima seleccionable: hoy. */
function todayISO(): string {
  const now = new Date();
  const tz = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - tz).toISOString().slice(0, 10);
}

/** Convierte YYYY-MM-DD a un texto cálido en es-CL para el mensaje y la planilla. */
function formatFechaLegible(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function AgendarModal({ open, onClose }: AgendarModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const reduceMotion = useReducedMotion();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const baseId = useId();

  // Cerrar con Escape y bloquear el scroll de fondo mientras está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "loading") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Foco al primer campo al abrir.
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [open, onClose, status]);

  // Resetear el formulario cada vez que se abre.
  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setErrors({});
      setStatus("idle");
    }
  }, [open]);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!form.nombre.trim()) next.nombre = "Cuéntanos tu nombre.";
    if (!form.correo.trim()) next.correo = "Necesitamos tu correo.";
    else if (!isValidEmail(form.correo)) next.correo = "Revisa que el correo esté bien escrito.";

    const digits = form.telefono.replace(/\D/g, "");
    if (!digits) next.telefono = "Déjanos tu teléfono.";
    else if (digits.length !== 9) next.telefono = "Son 9 dígitos (ej: 9 1234 5678).";

    if (!form.fecha) next.fecha = "Elige un día que te acomode.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (!validate()) return;

    const lead: LeadData = {
      nombre: form.nombre.trim(),
      correo: form.correo.trim(),
      telefono: `+56 ${form.telefono.replace(/\D/g, "")}`,
      fecha: formatFechaLegible(form.fecha),
    };

    setStatus("loading");

    // Guardar el lead ANTES de redirigir. Si la red o Sheets fallan, NO
    // bloqueamos la conversión: igual se redirige a WhatsApp.
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.error("[lead] Error de red al guardar el lead:", err);
    }

    setStatus("success");
    // Pequeña pausa para que se vea el estado de éxito antes de saltar.
    window.setTimeout(() => {
      window.location.href = buildWhatsAppUrl(lead);
    }, 700);
  }

  const overlay = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  const panel = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 24, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.98 },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          {...overlay}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-hidden={false}
        >
          {/* Fondo */}
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => status !== "loading" && onClose()}
            className="absolute inset-0 cursor-default bg-tinta/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${baseId}-title`}
            className="relative z-10 max-h-[90svh] w-full max-w-md overflow-y-auto rounded-3xl bg-crema p-6 shadow-2xl sm:p-8"
            {...panel}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={() => status !== "loading" && onClose()}
              className="absolute right-4 top-4 rounded-full p-1.5 text-tinta/50 transition hover:bg-tinta/5 hover:text-tinta"
              aria-label="Cerrar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {status === "success" ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-dorado/15 text-dorado">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl text-tinta">¡Listo! 💛</h2>
                <p className="mt-2 text-sm text-tinta/70">
                  Te estamos llevando a WhatsApp para confirmar tu hora con Carol…
                </p>
              </div>
            ) : (
              <>
                <h2 id={`${baseId}-title`} className="font-serif text-2xl text-tinta sm:text-3xl">
                  Agenda tu asesoría
                </h2>
                <p className="mt-1.5 text-sm text-tinta/70">
                  Déjanos tus datos y seguimos por WhatsApp. Es el primer paso. 🌷
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                  {/* Nombre */}
                  <Field
                    id={`${baseId}-nombre`}
                    label="Nombre"
                    error={errors.nombre}
                  >
                    <input
                      ref={firstFieldRef}
                      id={`${baseId}-nombre`}
                      type="text"
                      autoComplete="name"
                      value={form.nombre}
                      onChange={(e) => update("nombre", e.target.value)}
                      className={inputClass(!!errors.nombre)}
                      placeholder="Tu nombre"
                    />
                  </Field>

                  {/* Correo */}
                  <Field
                    id={`${baseId}-correo`}
                    label="Correo"
                    error={errors.correo}
                  >
                    <input
                      id={`${baseId}-correo`}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={form.correo}
                      onChange={(e) => update("correo", e.target.value)}
                      className={inputClass(!!errors.correo)}
                      placeholder="tucorreo@ejemplo.com"
                    />
                  </Field>

                  {/* Teléfono */}
                  <Field
                    id={`${baseId}-telefono`}
                    label="Teléfono"
                    error={errors.telefono}
                  >
                    <div className={telWrapClass(!!errors.telefono)}>
                      <span className="select-none pl-3.5 pr-2 text-sm text-tinta/60">+56</span>
                      <input
                        id={`${baseId}-telefono`}
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        value={form.telefono}
                        onChange={(e) =>
                          update("telefono", e.target.value.replace(/\D/g, "").slice(0, 9))
                        }
                        className="w-full rounded-r-xl bg-transparent py-2.5 pr-3.5 text-tinta outline-none placeholder:text-tinta/40"
                        placeholder="9 1234 5678"
                      />
                    </div>
                  </Field>

                  {/* Día disponible */}
                  <Field
                    id={`${baseId}-fecha`}
                    label="Día disponible"
                    error={errors.fecha}
                  >
                    <input
                      id={`${baseId}-fecha`}
                      type="date"
                      min={todayISO()}
                      value={form.fecha}
                      onChange={(e) => update("fecha", e.target.value)}
                      className={inputClass(!!errors.fecha)}
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-resplandor mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-dorado px-5 py-3 font-medium text-crema shadow-sm transition duration-500 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <Spinner /> Guardando…
                      </>
                    ) : (
                      "Agendar mi asesoría"
                    )}
                  </button>

                  {status === "error" && (
                    <p className="text-center text-sm text-dorado">
                      Algo falló, pero no te preocupes. Intenta de nuevo o escríbenos directo por WhatsApp.
                    </p>
                  )}

                  <p className="text-center text-xs text-tinta/50">
                    Al continuar te llevamos a WhatsApp para coordinar con Carol.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-tinta">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-dorado">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return [
    "w-full rounded-xl border bg-white/60 px-3.5 py-2.5 text-tinta outline-none transition",
    "placeholder:text-tinta/40 focus:border-dorado focus:ring-2 focus:ring-dorado/30",
    hasError ? "border-dorado" : "border-tinta/15",
  ].join(" ");
}

function telWrapClass(hasError: boolean): string {
  return [
    "flex items-center rounded-xl border bg-white/60 transition",
    "focus-within:border-dorado focus-within:ring-2 focus-within:ring-dorado/30",
    hasError ? "border-dorado" : "border-tinta/15",
  ].join(" ");
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z" />
    </svg>
  );
}

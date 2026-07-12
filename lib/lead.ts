// Tipos y utilidades compartidas para la captura de leads.

export const WHATSAPP_NUMBER = "56971255255";

export interface LeadData {
  nombre: string;
  correo: string;
  telefono: string;
  fecha: string; // día disponible elegido por la persona
}

/**
 * Construye la URL de WhatsApp con el mensaje pre-rellenado y URL-encoded.
 * Se usa SIEMPRE tras intentar guardar el lead, falle o no Sheets.
 */
export function buildWhatsAppUrl(lead: LeadData): string {
  const mensaje =
    `Hola Carol 👋 Quiero agendar mi asesoría. ` +
    `Nombre: ${lead.nombre}. ` +
    `Correo: ${lead.correo}. ` +
    `Teléfono: ${lead.telefono}. ` +
    `Día disponible: ${lead.fecha}.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

/** Validación de email razonable para cliente y servidor. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

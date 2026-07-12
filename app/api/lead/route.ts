import { NextResponse } from "next/server";
import { google } from "googleapis";
import { isValidEmail, type LeadData } from "@/lib/lead";

// googleapis necesita el runtime de Node (no Edge).
export const runtime = "nodejs";

/**
 * Rango de la hoja. Si no se define, se usa la primera hoja del documento.
 * Columnas: timestamp | nombre | correo | teléfono | día disponible
 */
const SHEET_RANGE = process.env.GOOGLE_SHEETS_RANGE || "A:E";

function getPrivateKey(): string | undefined {
  const key = process.env.GOOGLE_PRIVATE_KEY;
  // En entornos como Vercel la clave llega con los saltos de línea escapados.
  return key ? key.replace(/\\n/g, "\n") : undefined;
}

async function appendToSheet(lead: LeadData, timestamp: string): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = getPrivateKey();

  if (!spreadsheetId || !clientEmail || !privateKey) {
    throw new Error(
      "Faltan variables de entorno de Google Sheets (GOOGLE_SHEETS_ID / GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY)."
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: SHEET_RANGE,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [timestamp, lead.nombre, lead.correo, lead.telefono, lead.fecha],
      ],
    },
  });
}

export async function POST(request: Request) {
  let body: Partial<LeadData>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON inválido." },
      { status: 400 }
    );
  }

  const nombre = (body.nombre || "").trim();
  const correo = (body.correo || "").trim();
  const telefono = (body.telefono || "").trim();
  const fecha = (body.fecha || "").trim();

  // Validación de servidor: evita escribir basura, pero NO es lo que bloquea
  // la conversión (el front valida antes y redirige pase lo que pase).
  if (!nombre || !correo || !telefono || !fecha || !isValidEmail(correo)) {
    return NextResponse.json(
      { ok: false, error: "Datos incompletos o inválidos." },
      { status: 400 }
    );
  }

  const lead: LeadData = { nombre, correo, telefono, fecha };
  const timestamp = new Date().toISOString();

  // REGLA DE ARQUITECTURA: guardar en Sheets ANTES de redirigir a WhatsApp.
  // Si Sheets falla, NO se pierde el lead: respondemos ok igual y registramos
  // el error para no bloquear nunca la conversión.
  try {
    await appendToSheet(lead, timestamp);
    return NextResponse.json({ ok: true, persisted: true });
  } catch (error) {
    console.error("[lead] Error al guardar en Google Sheets:", error);
    // Fallback: el lead igual viaja a WhatsApp desde el cliente.
    return NextResponse.json({ ok: true, persisted: false });
  }
}

import { WHATSAPP_NUMBER } from "@/lib/lead";

const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola Carol 👋 Quiero saber más sobre la asesoría."
)}`;

// Íconos de redes sociales (glifos oficiales en un solo path, heredan el
// color del enlace vía fill-current).
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.46 1.71 6.4L3.2 28.8l6.58-1.67a12.74 12.74 0 0 0 6.22 1.62h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.75-12.81-12.75Zm0 23.39h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9.99 1.04-3.8-.25-.4a10.55 10.55 0 0 1-1.62-5.67c0-5.87 4.78-10.64 10.66-10.64a10.6 10.6 0 0 1 10.63 10.66c0 5.87-4.78 10.57-10.76 10.57Zm5.84-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.14 3.09 1.3 3.3c.16.21 2.25 3.44 5.45 4.82.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

// Redes con su ícono, para render uniforme en "Sígueme".
const redes = [
  {
    nombre: "Instagram",
    href: "https://www.instagram.com/caroldigitalia/",
    Icono: IconInstagram,
  },
  {
    nombre: "WhatsApp",
    href: whatsappLink,
    Icono: IconWhatsApp,
  },
];

export default function Footer() {
  return (
    <footer className="bg-espresso px-6 py-14 text-crema">
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
        <div>
          <p className="font-serif text-2xl">Carol Digitalia</p>
          <p className="mt-2 text-sm leading-relaxed text-crema/70">
            Te acompaño a dar el primer paso en su emprendimiento, como si fuera
            mi propio negocio.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-crema/60">
            Contacto
          </p>
          <ul className="mt-3 space-y-2 text-sm text-crema/80">
            <li>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-crema"
              >
                WhatsApp: +56 9 7125 5255
              </a>
            </li>
            <li>
              <a
                href="mailto:contacto@caroldigitalia.cl"
                className="transition hover:text-crema"
              >
                contacto@caroldigitalia.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-crema/60">
            Sígueme
          </p>
          <ul className="mt-3 space-y-2.5 text-sm text-crema/80">
            {redes.map(({ nombre, href, Icono }) => (
              <li key={nombre}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 transition hover:text-crema"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-crema/20 transition group-hover:border-oro/60">
                    <Icono className="h-4 w-4" />
                  </span>
                  {nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-5xl border-t border-crema/15 pt-6 text-center text-xs text-crema/50">
        © {new Date().getFullYear()} Carol Digitalia
      </div>
    </footer>
  );
}

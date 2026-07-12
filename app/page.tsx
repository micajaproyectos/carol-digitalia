import Hero from "@/components/Hero";
import QuienEsCarol from "@/components/sections/QuienEsCarol";
import LaAsesoria from "@/components/sections/LaAsesoria";
import Testimonios from "@/components/sections/Testimonios";
import ComoFunciona from "@/components/sections/ComoFunciona";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import BotonWhatsapp from "@/components/BotonWhatsapp";

export default function Home() {
  return (
    <main className="bg-crema">
      {/* Hero fijo al fondo: el resto de la landing se desliza por encima.
          Solo desde lg: en pantallas menores el hero supera el alto del
          viewport (foto + texto apilados) y el sticky dejaría los botones
          e indicadores inaccesibles. */}
      <div className="lg:sticky lg:top-0 lg:z-0">
        <Hero />
      </div>

      <div className="relative z-10">
        <QuienEsCarol />

        {/* Testimonios queda fijo mientras "La asesoría" se desliza encima,
            igual que el hero con la sección siguiente. Solo desde lg, como
            todos los efectos cortina: en pantallas menores las secciones
            pueden superar el alto del viewport y el sticky dejaría su parte
            inferior inaccesible. */}
        <div className="lg:sticky lg:top-0 lg:z-0">
          <Testimonios />
        </div>

        <div className="relative z-10">
          {/* La asesoría queda fija mientras "Cómo funciona" se desliza
              encima. Solo desde lg: con los paneles apilados (mobile y
              tablet vertical) la sección supera el alto del viewport y el
              sticky dejaría su parte baja inaccesible. */}
          <div className="lg:sticky lg:top-0 lg:z-0">
            <LaAsesoria />
          </div>

          <div className="relative z-10">
            <ComoFunciona />
            <FAQ />
            <Footer />
          </div>
        </div>
      </div>

      {/* Botón flotante de WhatsApp: aparece al dejar atrás el hero */}
      <BotonWhatsapp />
    </main>
  );
}

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Carol Digitalia — dirección editorial cálida
        crema: "#efdfc4", // base luminosa
        arena: "#e7dcc6", // taupe cálido para secciones/tarjetas alternas
        espresso: "#2b1f16", // ancla oscura (hero, CTA final, footer)
        camel: "#a86b3c", // tono medio (acento, tomado de su vestón)
        dorado: "#9f6103", // acento / CTA
        oro: "#cf9d54", // dorado claro para acentos sobre fondo oscuro
        // Rosa relegado a acento pequeño (apagado)
        rosa: "#d3a9b6",
        "rosa-palo": "#dbc4cc",
        "gris-claro": "#edede8",
        gris: "#d9d9d9",
        tinta: "#1b1a1a", // texto base
      },
      fontFamily: {
        // Se enlazan a las variables de next/font definidas en el layout
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      keyframes: {
        blurFadeUp: {
          from: {
            opacity: "0",
            filter: "blur(20px)",
            transform: "translateY(40px)",
          },
          to: {
            opacity: "1",
            filter: "blur(0)",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "blur-fade-up": "blurFadeUp 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;

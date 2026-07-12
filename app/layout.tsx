import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import AgendarProvider from "@/components/AgendarProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carol Digitalia — Asesoría para emprender",
  description:
    "Agenda una asesoría primaria para dar el primer paso en tu emprendimiento, desde el corazón y con acompañamiento real.",
};

export const viewport: Viewport = {
  themeColor: "#efdfc4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-crema font-sans text-tinta antialiased">
        <AgendarProvider>{children}</AgendarProvider>
      </body>
    </html>
  );
}

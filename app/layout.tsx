import type { Metadata } from "next";
import "./globals.css";

// Aquí le decimos a WhatsApp y Facebook exactamente qué leer
export const metadata: Metadata = {
  title: "Cumpleaños 50 | María del Rosario",
  description: "Acompáñame a celebrar mi medio siglo de vida. Sábado 18 de Abril.",
  openGraph: {
    title: "Cumpleaños 50 | María del Rosario",
    description: "Acompáñame a celebrar mi medio siglo de vida.",
    url: "https://mifestejo.mom",
    siteName: "Invitación Rosario",
    images: [
      {
        url: "/preview.jpg", // Esta es la foto que arrastraste a la carpeta public
        width: 1200,
        height: 630,
        alt: "Invitación 50 Años Rosario",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
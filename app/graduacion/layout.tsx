// Importación relativa inyectada para evadir fallas del alias @/
import SmoothScroller from "../../components/SmoothScroller";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  // Enrutamiento absoluto necesario para que WhatsApp encuentre la imagen
  metadataBase: new URL('https://migraduacion.pro'),
  title: "Graduación 2026 | Generación Mtra. Ángela Córdova Villegas",
  description: "Invitación Oficial. Acompáñanos a celebrar nuestro último pase de lista y el inicio de un nuevo legado.",
  openGraph: {
    title: "Graduación 2026 | Generación Maestra Ángela Córdova Villegas",
    description: "Tenemos el honor de convocarle a la culminación de nuestro ciclo académico.",
    url: "https://migraduacion.pro/graduacion",
    siteName: "Invitación Oficial",
    images: [
      {
        url: "/logo-escuela.png", // Fuerza al crawler a usar el logo
        width: 800,
        height: 800,
        alt: "Logo Escuela Primaria",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Graduación 2026 | Invitación Oficial",
    description: "Acompáñanos a celebrar nuestro último pase de lista.",
    images: ["/logo-escuela.png"],
  },
};

export default function GraduacionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${playfair.variable} ${inter.variable} bg-black text-white antialiased`}>
      <SmoothScroller>
        {children}
      </SmoothScroller>
    </div>
  );
}
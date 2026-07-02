// Importación relativa inyectada para evadir fallas del alias @/
import SmoothScroller from "../../components/SmoothScroller";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Graduación | Generación 2026",
  description: "Invitación oficial de graduación - Modo Singularidad",
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
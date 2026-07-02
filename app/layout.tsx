import SmoothScroller from "@/components/SmoothScroller";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

// Fuentes Tier 1
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "600"],
  variable: "--font-cormorant" 
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["200", "300", "400"],
  variable: "--font-montserrat" 
});

export const metadata = {
  title: "Graduación | Generación 2026",
  description: "Invitación Oficial - High End Editorial",
};

export default function GraduacionLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${cormorant.variable} ${montserrat.variable} bg-[#F7F5F0] text-[#1A1A1A] antialiased selection:bg-[#C5A880] selection:text-white`}>
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
import SmoothScroller from "@/components/SmoothScroller";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant" 
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500"],
  variable: "--font-montserrat" 
});

export const metadata = {
  title: "Graduación | Generación 2026",
  description: "Invitación Oficial",
};

export default function GraduacionLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${cormorant.variable} ${montserrat.variable} bg-[#FDFBF7] text-[#1C2321] antialiased selection:bg-[#D4AF37] selection:text-white`}>
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
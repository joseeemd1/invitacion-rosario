"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Algoritmo de Ruido Fractal Zero-Request
const noisePattern = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function UnboxingGraduacion({ 
  onOpen, 
  audioRef 
}: { 
  onOpen: () => void; 
  audioRef: React.MutableRefObject<HTMLAudioElement | null> 
}) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
    
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((e) => console.warn("Intervención de navegador:", e));
    }
    
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100vh" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F7F5F0] px-4 overflow-hidden"
        >
          {/* Textura Matemática Renderizada por GPU */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
            style={{ backgroundImage: noisePattern }}
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-16 z-10"
          >
            <p className="font-montserrat text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-[#1A1A1A]/50 mb-6">
              Documento Oficial
            </p>
            <p className="font-cormorant text-3xl md:text-5xl italic text-[#1A1A1A] leading-tight">
              Generación<br/>2020 - 2026
            </p>
          </motion.div>

          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
            className="group relative flex h-48 w-48 md:h-64 md:w-64 items-center justify-center rounded-full shadow-[0_20px_40px_rgba(197,168,128,0.15)] border border-[#C5A880]/50 cursor-pointer overflow-hidden bg-[#F7F5F0]"
          >
            <div className="absolute inset-0 bg-[#C5A880] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
            <img 
              src="/sello-graduacion.png" 
              alt="Sello de Graduación" 
              className="absolute inset-0 h-full w-full object-cover z-10 opacity-90 transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl" 
            />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <span className="h-8 w-[1px] bg-[#C5A880]/50" />
            <p className="font-montserrat text-[9px] uppercase tracking-[0.4em] text-[#C5A880] font-medium">
              Romper el sello
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
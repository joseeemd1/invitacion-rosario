"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    
    // Fuerza bruta para eludir el bloqueo de Autoplay
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Si falla en el primer click, forzamos un evento síncrono secundario
          document.addEventListener('click', () => audioRef.current?.play(), { once: true });
        });
      }
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
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDFBF7] px-4 overflow-hidden"
        >
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" 
            style={{ backgroundImage: noisePattern }}
          />

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center mb-16 z-10 flex flex-col items-center"
          >
            <p className="font-montserrat text-[11px] uppercase tracking-[0.6em] text-[#1C2321]/60 mb-8 font-light">
              Invitación Oficial
            </p>
            <p className="font-cormorant text-4xl md:text-5xl italic text-[#1C2321] leading-tight font-medium">
              Ceremonia de <br/>Graduación
            </p>
          </motion.div>

          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
            className="group relative flex h-56 w-56 md:h-72 md:w-72 items-center justify-center rounded-full shadow-[0_20px_50px_rgba(212,175,55,0.1)] border border-[#D4AF37]/30 cursor-pointer overflow-hidden bg-white"
          >
            <div className="absolute inset-0 bg-[#D4AF37] opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
            <img 
              src="/sello-graduacion.png" 
              alt="Sello" 
              className="absolute inset-0 h-full w-full object-cover z-10 opacity-95 transition-transform duration-1000 group-hover:scale-105" 
            />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 flex flex-col items-center gap-3"
          >
            <p className="font-montserrat text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-medium">
              Toque para abrir
            </p>
            <span className="h-12 w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent opacity-50" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
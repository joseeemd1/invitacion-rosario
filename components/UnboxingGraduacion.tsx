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
    // 1. FORZADO NATIVO DE AUDIO (Cero latencia de React)
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.error("Auto-play forzado falló:", e));
    }
    
    // 2. Cambio de estado visual
    setIsOpened(true);
    setTimeout(() => onOpen(), 1200);
  };

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDFBF7] px-4 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: noisePattern }} />

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center mb-12 z-10 flex flex-col items-center w-full"
          >
            <p className="font-montserrat text-sm md:text-base uppercase tracking-[0.6em] text-[#1C2321]/70 mb-8 font-semibold">
              Invitación Oficial
            </p>
            <p className="font-cormorant text-5xl md:text-7xl italic text-[#1C2321] leading-tight font-medium">
              Ceremonia de<br/>Graduación
            </p>
          </motion.div>

          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
            className="group relative flex h-64 w-64 md:h-80 md:w-80 items-center justify-center rounded-full shadow-[0_20px_50px_rgba(139,101,8,0.15)] border border-[#D4AF37]/40 cursor-pointer overflow-hidden bg-white z-20"
          >
            <img 
              src="/logo-escuela.png" 
              alt="Sello" 
              className="absolute inset-0 h-full w-full object-contain p-4 z-10 opacity-95 transition-transform duration-1000 group-hover:scale-110" 
            />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex flex-col items-center gap-4 z-10"
          >
            <p className="font-montserrat text-xs md:text-sm uppercase tracking-[0.5em] text-[#8B6508] font-bold">
              Toque para abrir
            </p>
            <span className="h-16 w-[2px] bg-gradient-to-b from-[#8B6508] to-transparent opacity-60" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
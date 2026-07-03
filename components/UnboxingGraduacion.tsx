"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const noisePattern = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function UnboxingGraduacion({ 
  onOpen, 
  audioRef,
  setGlobalPlay
}: { 
  onOpen: () => void; 
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  setGlobalPlay: (state: boolean) => void;
}) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);
    
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play()
        .then(() => setGlobalPlay(true))
        .catch((e) => console.log("Autoplay bloqueado:", e));
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
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDFBF7] px-4 overflow-hidden cursor-pointer"
          onClick={handleOpen}
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: noisePattern }} />

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center mb-12 z-10 flex flex-col items-center w-full"
          >
            {/* ESCALA INCREMENTADA: text-base md:text-lg */}
            <p className="font-montserrat text-base md:text-lg uppercase tracking-[0.6em] text-[#1C2321]/70 mb-8 font-semibold">
              Invitación Oficial
            </p>
            {/* ESCALA INCREMENTADA: text-6xl md:text-8xl */}
            <p className="font-cormorant text-6xl md:text-8xl italic text-[#1C2321] leading-tight font-medium">
              Ceremonia de<br/>Graduación
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
            className="group relative flex h-64 w-64 md:h-80 md:w-80 items-center justify-center rounded-full shadow-[0_20px_50px_rgba(139,101,8,0.15)] border border-[#D4AF37]/40 overflow-hidden bg-white z-20"
          >
            {/* CORRECCIÓN VISUAL: Eliminado el p-4, cambiado a sello-graduacion.png y object-cover */}
            <img 
              src="/sello-graduacion.png" 
              alt="Sello" 
              className="absolute inset-0 h-full w-full object-cover z-10 transition-transform duration-1000 group-hover:scale-110" 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex flex-col items-center gap-4 z-10"
          >
            {/* ESCALA INCREMENTADA */}
            <p className="font-montserrat text-sm md:text-base uppercase tracking-[0.5em] text-[#8B6508] font-bold">
              Toque la pantalla para abrir
            </p>
            <span className="h-16 w-[2px] bg-gradient-to-b from-[#8B6508] to-transparent opacity-60" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
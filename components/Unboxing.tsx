"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Unboxing({ 
  onOpen, 
  audioRef 
}: { 
  onOpen: () => void; 
  audioRef: React.MutableRefObject<HTMLAudioElement | null> 
}) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
    // Le damos play al audio global desde aquí
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Autoplay bloqueado:", e));
    }
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F4F0EA] px-4"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center mb-12 z-10"
          >
            <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#2A1A10]/60 mb-4">
              Tenemos el honor de invitarte
            </p>
            <p className="font-serif text-2xl md:text-3xl italic text-[#2A1A10]">
              a celebrar el 50 aniversario de
            </p>
          </motion.div>

          <motion.button
            onClick={handleOpen}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="group relative flex h-64 w-64 md:h-80 md:w-80 items-center justify-center rounded-full shadow-[0_20px_50px_rgba(42,26,16,0.15)] border border-[#C5A059]/40 cursor-pointer overflow-hidden bg-[#2A1A10]"
          >
            <img 
              src="/sello.png" 
              alt="Abrir invitación" 
              className="absolute inset-0 h-full w-full object-cover z-10 opacity-90 transition-transform duration-700 group-hover:scale-110 sepia-[0.2]" 
            />
            <div className="absolute inset-[-10px] z-0 rounded-full border border-[#C5A059]/30 animate-pulse opacity-50"></div>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 font-sans text-xs uppercase tracking-[0.4em] text-[#C5A059] font-semibold"
          >
            Toca el sello para abrir
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
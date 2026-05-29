"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { Clock, MapPin, CalendarDays, Gift, ChevronDown, Sun, Waves, Sparkles } from "lucide-react";

// 1. PARTÍCULAS MODO DIOS (Más grandes, más brillantes, más cantidad)
const Particles = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[1px] ${i % 3 === 0 ? 'bg-[#1A4B5C]/60' : 'bg-[#D4AF37]/80'}`}
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            left: Math.random() * 100 + "%",
            top: "100%",
          }}
          animate={{
            y: [0, -1200 - Math.random() * 500],
            x: Math.random() * 100 - 50,
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: Math.random() * 12 + 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

// 2. PORTADA DE APERTURA EXCLUSIVA PARA PAULA (Reemplaza el sello de la suegra)
const PaulaIntro = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <motion.div 
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F0F5F7] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none"></div>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center z-10 flex flex-col items-center px-6"
      >
        <Sparkles className="w-12 h-12 text-[#D4AF37] mb-6" strokeWidth={1.5} />
        <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-[#1A4B5C] uppercase font-extrabold mb-4">
          Estás invitado a celebrar
        </p>
        <h2 className="font-serif text-5xl md:text-7xl text-[#1A4B5C] mb-12 italic drop-shadow-sm">
          Los 10 años de Paula
        </h2>
        <button
          onClick={onOpen}
          className="bg-[#D4AF37] text-white px-10 py-5 rounded-full font-sans text-xs tracking-widest font-black uppercase hover:bg-[#1A4B5C] hover:scale-105 transition-all duration-300 shadow-2xl flex items-center gap-3"
        >
          Abrir Invitación
        </button>
      </motion.div>
    </motion.div>
  );
};

const InvitationContent = () => {
  const galleryRef = useRef(null);
  const { scrollYProgress: galleryScroll } = useScroll({ target: galleryRef, offset: ["start end", "end start"] });
  const yParallaxFast = useTransform(galleryScroll, [0, 1], ["-15%", "15%"]);
  const yParallaxSlow = useTransform(galleryScroll, [0, 1], ["15%", "-15%"]);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yHeroBg = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const opacityHeroText = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative z-10 w-full"
    >
      <Particles />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden border-b border-[#1A4B5C]/10 bg-[#F0F5F7]">
        <motion.div style={{ y: yHeroBg }} className="absolute inset-0 z-0">
            <img src="/background_paula.jpg" alt="Fondo Alberca" className="w-full h-full object-cover opacity-60 scale-110" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#F0F5F7]/30 via-[#F0F5F7]/80 to-[#F0F5F7]"></div>
        </motion.div>

        <motion.div style={{ opacity: opacityHeroText }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2 }} className="z-10 relative mt-20">
            <p className="font-sans text-xs md:text-sm tracking-[0.4em] text-[#1A4B5C] uppercase mb-8 font-extrabold drop-shadow-md flex items-center justify-center gap-2">
              <Sun className="w-5 h-5 text-[#D4AF37]" /> Pool Party Exclusiva
            </p>
            <h1 className="font-serif text-7xl md:text-9xl italic text-[#1A4B5C] leading-tight mb-8 drop-shadow-xl">
              Paula
            </h1>
            <div className="flex items-center justify-center gap-6 mb-16">
                <div className="h-px w-12 md:w-24 bg-[#D4AF37]/80"></div>
                <p className="font-sans text-xl md:text-2xl tracking-[0.4em] text-[#1A4B5C] uppercase font-black drop-shadow-sm">
                  MIS 10 AÑOS
                </p>
                <div className="h-px w-12 md:w-24 bg-[#D4AF37]/80"></div>
            </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-20 md:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
        >
          <p className="font-sans text-[10px] md:text-[11px] tracking-[0.5em] text-[#1A4B5C] uppercase font-black drop-shadow-md">
            Desliza
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-[#D4AF37]" strokeWidth={3} />
          </motion.div>
        </motion.div>
      </section>

      {/* GALERÍA EDITORIAL TEXTO EXPANDIDO (FIX RESPONSIVO) */}
      <section ref={galleryRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#1A4B5C]/10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <motion.div style={{ y: yParallaxSlow }} className="w-full md:w-1/2 relative shadow-2xl border-4 border-white bg-white p-2">
                {/* Límite de altura (75vh) para evitar que fotos verticales rompan el layout */}
                <img src="/paula1.jpg" alt="Paula 1" className="w-full max-h-[75vh] object-cover block" />
            </motion.div>
            <div className="w-full md:w-1/2 flex flex-col gap-10">
                <div className="text-center md:text-left">
                    <h2 className="font-serif text-4xl md:text-5xl text-[#D4AF37] italic mb-6 drop-shadow-md">¡Llegó a su primera década!</h2>
                    <p className="font-sans text-base text-[#1A4B5C]/90 leading-relaxed tracking-wide font-medium mb-4">
                      El tiempo vuela y mi primera gran aventura apenas comienza. Hoy celebro 10 años llenos de risas, juegos y momentos inolvidables rodeada de las personas que más quiero.
                    </p>
                    <p className="font-sans text-base text-[#1A4B5C]/90 leading-relaxed tracking-wide font-medium">
                      Acompáñame a disfrutar de una tarde mágica llena de sol, agua y diversión ilimitada. ¡Prepárate para crear recuerdos increíbles juntos en esta albercada de lujo!
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 relative mt-4">
                    <motion.div style={{ y: yParallaxFast }} className="shadow-xl z-10 border-[4px] border-white bg-white p-1 mt-12">
                        {/* Se fuerza el recorte estético 3/4 */}
                        <img src="/paula2.jpg" alt="Paula 2" className="w-full h-auto object-cover aspect-[3/4] block" />
                    </motion.div>
                    <div className="shadow-lg border-[4px] border-white bg-white p-1 mb-12">
                        <img src="/paula3.jpg" alt="Paula 3" className="w-full h-auto object-cover aspect-[3/4] block" />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* DÓNDE Y CUÁNDO (CON FOTO DEL LUGAR Y TÍTULO DALEDÁ) */}
      <section className="py-32 px-6 mx-auto max-w-5xl text-center border-b border-[#1A4B5C]/10 bg-white/40 relative">
         <h2 className="font-serif text-5xl md:text-6xl text-[#1A4B5C] italic mb-16 drop-shadow-sm">Dónde & Cuándo</h2>
         
         <div className="grid gap-8 md:grid-cols-2 relative z-10">
            {/* TARJETA FECHA */}
            <div className="flex flex-col items-center bg-white/90 backdrop-blur-md p-12 border border-[#1A4B5C]/10 shadow-xl rounded-sm">
              <Clock className="h-12 w-12 text-[#D4AF37] mb-6" strokeWidth={1.5}/>
              <h3 className="font-serif text-3xl text-[#1A4B5C] mb-2 font-bold">Domingo 14 de Junio</h3>
              <p className="font-sans text-xl text-[#1A4B5C]/90 font-black mb-1">5:00 PM - 9:00 PM</p>
            </div>
            
            {/* TARJETA UBICACIÓN CON FOTO */}
            <a href="https://maps.app.goo.gl/x3QoKfdBVvnEuYYS6" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center bg-white/90 backdrop-blur-md border border-[#1A4B5C]/10 shadow-xl rounded-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group flex-grow overflow-hidden relative">
              <div className="w-full h-40 overflow-hidden relative">
                <img src="/daleda.jpg" alt="Daledá Local" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
              </div>
              
              <div className="p-8 w-full flex flex-col items-center -mt-10 relative z-10">
                <div className="bg-white p-3 rounded-full shadow-md mb-4 group-hover:-translate-y-2 transition-transform duration-300">
                  <MapPin className="h-8 w-8 text-[#D4AF37]" strokeWidth={2}/>
                </div>
                <h3 className="font-serif text-4xl text-[#1A4B5C] mb-2 font-bold drop-shadow-sm">Daledá</h3>
                <p className="font-sans text-lg text-[#1A4B5C] font-black mb-1">Avenida Doce #56</p>
                <p className="text-[10px] md:text-xs text-[#1A4B5C]/70 font-sans tracking-widest uppercase leading-relaxed mt-2 max-w-[250px] font-bold">
                  Entre calle uno y dos<br/>Col. Bugambilia, Hermosillo, Sonora.
                </p>
                <span className="mt-6 text-[#D4AF37] text-xs md:text-sm tracking-widest uppercase font-black border-b-2 border-[#D4AF37]/30 pb-1 group-hover:border-[#D4AF37] transition-colors">Abrir Google Maps</span>
              </div>
            </a>
         </div>

         {/* DRESS CODE ALBERCADA */}
         <div className="mt-12 bg-[#1A4B5C] text-white p-12 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>
            <Sun className="mx-auto h-12 w-12 text-[#D4AF37] mb-4" strokeWidth={2} />
            <h3 className="font-serif text-4xl italic mb-4 drop-shadow-md">No olvides...</h3>
            <p className="font-sans text-sm md:text-lg font-black tracking-widest uppercase text-white drop-shadow-sm">
              Traer tu bikini y traje de baño
            </p>
         </div>

         <div className="flex justify-center mt-12 relative z-10">
             <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pool+Party+10+A%C3%B1os+de+Paula&dates=20260614T170000/20260614T210000&details=Traer+bikini+y+traje+de+ba%C3%B1o!&location=Daled%C3%A1,+Avenida+Doce+%2356,+Col.+Bugambilia,+Hermosillo&sf=true&output=xml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#D4AF37] text-white px-8 py-4 rounded-full font-sans text-xs tracking-widest font-black uppercase hover:bg-[#1A4B5C] transition-all duration-300 shadow-xl active:scale-95 group">
                <CalendarDays className="h-5 w-5 text-white group-hover:text-[#D4AF37] transition-colors" />
                Agendar Fiesta
             </a>
         </div>
      </section>

      {/* REGALOS */}
      <section className="py-32 px-6 text-center bg-[#F0F5F7] relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
            <Gift className="mx-auto h-16 w-16 text-[#D4AF37] mb-8 drop-shadow-sm" strokeWidth={1.5} />
            <h2 className="font-serif text-5xl md:text-6xl text-[#1A4B5C] italic mb-8 drop-shadow-sm">Regalos</h2>
            <p className="mb-0 font-sans text-base md:text-lg text-[#1A4B5C] font-semibold leading-relaxed tracking-wide max-w-lg mx-auto bg-white/90 backdrop-blur-md p-10 md:p-12 rounded-sm shadow-xl border border-[#1A4B5C]/10">
              Tu presencia es mi mayor alegría. Si deseas darme un obsequio, puedes traer un regalo sorpresa o participar en la lluvia de sobres. ¡Lo que tú prefieras! 💌 🎁
            </p>
        </div>
      </section>

      <footer className="py-16 text-center border-t border-[#1A4B5C]/10 bg-white">
          <p className="font-serif text-4xl text-[#1A4B5C]/40 italic font-bold">Paula</p>
          <p className="font-sans text-[10px] uppercase tracking-widest text-[#1A4B5C]/30 mt-3 font-black">10 Años</p>
      </footer>
    </motion.div>
  );
};

export default function Home() {
  const [hasOpened, setHasOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      // 3. REPRODUCTOR APUNTA A LA CANCIÓN DE PAULA
      audioRef.current = new Audio("/cancion-paula.mp3"); 
      audioRef.current.loop = true;
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        audioRef.current?.pause();
      } else {
        if (hasOpened) {
          audioRef.current?.play().catch(() => {});
        }
      }
    };  

    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lenis: Lenis | null = null;
    let rafId: number;
    
    if (hasOpened) {
      lenis = new Lenis({ duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (lenis) {
        lenis.destroy();
        cancelAnimationFrame(rafId);
      }
    };
  }, [hasOpened]);

  return (
    <main className="relative bg-[#F0F5F7] text-[#1A4B5C] font-sans overflow-hidden min-h-screen">
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-50"></div>
      
      <AnimatePresence>
        {!hasOpened && <PaulaIntro onOpen={() => {
          setHasOpened(true);
          audioRef.current?.play().catch(() => {});
        }} />}
      </AnimatePresence>

      <AnimatePresence>
        {hasOpened && <InvitationContent />}
      </AnimatePresence>
    </main>
  );
}
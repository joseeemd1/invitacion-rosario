"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Unboxing from "../../components/Unboxing"; // Ajustado para subir dos niveles
import { Clock, MapPin, CalendarDays, Gift, ChevronDown, Waves, Droplets } from "lucide-react";

// Partículas estilo "Burbujas y Destellos de Resort"
const Particles = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[1px] ${i % 3 === 0 ? 'bg-[#1A4B5C]/20' : 'bg-[#D4AF37]/30'}`}
          style={{
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            left: Math.random() * 100 + "%",
            top: "100%",
          }}
          animate={{
            y: [0, -1200 - Math.random() * 500],
            x: Math.random() * 100 - 50,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
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

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden border-b border-[#1A4B5C]/10 bg-[#F0F5F7]">
        <motion.div style={{ y: yHeroBg }} className="absolute inset-0 z-0">
            {/* Foto de fondo, puedes usar una alberca desenfocada o foto de ella */}
            <img src="/background_paula.jpg" alt="Fondo Alberca" className="w-full h-full object-cover opacity-60 scale-110" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#F0F5F7]/30 via-[#F0F5F7]/80 to-[#F0F5F7]"></div>
        </motion.div>

        <motion.div style={{ opacity: opacityHeroText }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2 }} className="z-10 relative mt-20">
            <p className="font-sans text-xs md:text-sm tracking-[0.4em] text-[#1A4B5C] uppercase mb-8 font-extrabold drop-shadow-sm flex items-center justify-center gap-2">
              <Waves className="w-4 h-4 text-[#D4AF37]" /> Pool Party
            </p>
            <h1 className="font-serif text-7xl md:text-9xl italic text-[#1A4B5C] leading-tight mb-8 drop-shadow-sm">
              Paula
            </h1>
            <div className="flex items-center justify-center gap-6 mb-16">
                <div className="h-px w-12 md:w-24 bg-[#D4AF37]/60"></div>
                <p className="font-sans text-xl md:text-2xl tracking-[0.4em] text-[#1A4B5C] uppercase font-bold">
                  MIS 10 AÑOS
                </p>
                <div className="h-px w-12 md:w-24 bg-[#D4AF37]/60"></div>
            </div>
        </motion.div>

        {/* INDICADOR DE SCROLL */}
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
            <ChevronDown className="w-6 h-6 text-[#D4AF37]" strokeWidth={2.5} />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. GALERÍA EDITORIAL INFANTIL/CHIC */}
      <section ref={galleryRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#1A4B5C]/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <motion.div style={{ y: yParallaxSlow }} className="md:col-span-7 relative w-full shadow-2xl border-4 border-white bg-white p-2">
                <img src="/paula1.jpg" alt="Paula 1" className="w-full h-auto block" />
            </motion.div>
            <div className="md:col-span-5 flex flex-col gap-10 md:gap-16">
                <div className="text-center md:text-left py-4">
                    <h2 className="font-serif text-4xl md:text-5xl text-[#D4AF37] italic mb-4">¡Llegó a su primera década!</h2>
                    <p className="font-sans text-base text-[#1A4B5C]/80 leading-relaxed tracking-wide font-medium">Acompáñame a celebrar este día tan especial lleno de sol, agua y diversión increíble.</p>
                </div>
                <motion.div style={{ y: yParallaxFast }} className="relative w-full shadow-xl md:-ml-20 z-10 border-[6px] border-[#F0F5F7] bg-[#F0F5F7] p-1">
                    <img src="/paula2.jpg" alt="Paula 2" className="w-full h-auto block" />
                </motion.div>
                <div className="relative w-[85%] ml-auto shadow-lg border-2 border-white bg-white p-1">
                    <img src="/paula3.jpg" alt="Paula 3" className="w-full h-auto block" />
                </div>
            </div>
        </div>
      </section>

      {/* 3. DÓNDE Y CUÁNDO (CON CÓDIGO DE VESTIMENTA) */}
      <section className="py-32 px-6 mx-auto max-w-5xl text-center border-b border-[#1A4B5C]/10 bg-white/40 relative">
         <h2 className="font-serif text-5xl md:text-6xl text-[#1A4B5C] italic mb-16">Dónde & Cuándo</h2>
         
         <div className="grid gap-8 md:grid-cols-2 relative z-10">
            <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm p-12 border border-[#1A4B5C]/5 shadow-sm rounded-sm">
              <Clock className="h-12 w-12 text-[#D4AF37] mb-6" strokeWidth={1.5}/>
              <h3 className="font-serif text-3xl text-[#1A4B5C] mb-2">Domingo 14 de Junio</h3>
              <p className="font-sans text-xl text-[#1A4B5C]/90 font-bold mb-1">5:00 PM - 9:00 PM</p>
            </div>
            
            <a href="https://maps.app.goo.gl/x3QoKfdBVvnEuYYS6" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center bg-white/80 backdrop-blur-sm p-12 border border-[#1A4B5C]/5 shadow-sm rounded-sm hover:shadow-lg transition-all duration-300 cursor-pointer group flex-grow">
              <MapPin className="h-14 w-14 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.5}/>
              <h3 className="font-serif text-3xl text-[#1A4B5C] mb-2">Ubicación</h3>
              <p className="font-sans text-lg text-[#1A4B5C]/90 font-bold mb-1">Avenida Doce #56</p>
              <p className="text-[10px] md:text-xs text-[#1A4B5C]/60 font-sans tracking-widest uppercase leading-relaxed mt-2 max-w-[250px]">
                Entre calle uno y dos<br/>Col. Bugambilia, Hermosillo, Sonora.
              </p>
              <span className="mt-6 text-[#D4AF37] text-xs md:text-sm tracking-widest uppercase font-black border-b border-[#D4AF37]/30 pb-1 group-hover:border-[#D4AF37] transition-colors">Abrir Google Maps</span>
            </a>
         </div>

         {/* DRESS CODE ALBERCADA */}
         <div className="mt-8 bg-[#1A4B5C] text-white p-10 rounded-sm shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>
            <Droplets className="mx-auto h-10 w-10 text-[#D4AF37] mb-4" strokeWidth={1.5} />
            <h3 className="font-serif text-3xl italic mb-3">No olvides...</h3>
            <p className="font-sans text-sm md:text-base font-bold tracking-widest uppercase text-white/90">
              Traer tu bikini y traje de baño
            </p>
         </div>

         <div className="flex justify-center mt-12 relative z-10">
             <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pool+Party+10+A%C3%B1os+de+Paula&dates=20260614T170000/20260614T210000&details=Traer+bikini+y+traje+de+ba%C3%B1o!&location=Avenida+Doce+%2356,+Col.+Bugambilia,+Hermosillo&sf=true&output=xml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#D4AF37] text-white px-8 py-4 rounded-full font-sans text-xs tracking-widest font-black uppercase hover:bg-[#1A4B5C] transition-colors shadow-md active:scale-95 group">
                <CalendarDays className="h-4 w-4 text-white group-hover:text-[#D4AF37] transition-colors" />
                Agendar Fiesta
             </a>
         </div>
      </section>

      {/* 4. REGALOS */}
      <section className="py-24 px-6 text-center bg-[#F0F5F7] relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
            <Gift className="mx-auto h-14 w-14 text-[#D4AF37] mb-6" strokeWidth={1.5} />
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A4B5C] italic mb-6">Regalos</h2>
            <p className="mb-0 font-sans text-sm md:text-base text-[#1A4B5C]/90 font-medium leading-relaxed tracking-wide max-w-lg mx-auto bg-white/70 backdrop-blur-sm p-8 md:p-10 rounded-sm shadow-sm border border-[#1A4B5C]/10">
              Tu presencia es mi mayor alegría. Si deseas darme un obsequio, puedes traer un regalo sorpresa o lluvia de sobres. ¡Lo que tú prefieras! 💌🎁
            </p>
        </div>
      </section>

      <footer className="py-12 text-center border-t border-[#1A4B5C]/10 bg-white">
          <p className="font-serif text-3xl text-[#1A4B5C]/30 italic">Paula</p>
          <p className="font-sans text-[8px] uppercase tracking-widest text-[#1A4B5C]/20 mt-2">10 Años</p>
      </footer>
    </motion.div>
  );
};

export default function Home() {
  const [hasOpened, setHasOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      // Te sugiero cambiar este MP3 por una canción más "infantil/verano" en tu carpeta public
      audioRef.current = new Audio("/cancion.mp3"); 
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
    <main className="relative bg-[#F0F5F7] text-[#1A4B5C] font-sans overflow-hidden">
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-50"></div>
      
      {/* Recuerda que el Unboxing ahora usa los colores originales, si quieres cambiar el color del sobre, tendrías que pasarle props o ajustar el componente base */}
      <Unboxing onOpen={() => setHasOpened(true)} audioRef={audioRef} />

      <AnimatePresence>
        {hasOpened && <InvitationContent />}
      </AnimatePresence>
    </main>
  );
}
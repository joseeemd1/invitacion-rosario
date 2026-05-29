"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { Clock, MapPin, CalendarDays, Gift, ChevronDown, Sparkles, Star, Music, Heart } from "lucide-react";

// 1. MOTOR DE VECTORES COWGIRL
const StarIcon = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const HorseshoeIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 22V9a7 7 0 0 1 14 0v13"/><path d="M9 22V11a3 3 0 0 1 6 0v11"/></svg>;
const CactusIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2v20"/><path d="M7 10v4a3 3 0 0 0 3 3h2"/><path d="M17 13v-3a3 3 0 0 0-3-3h-2"/></svg>;
const SparkleVector = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.29 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.29L12 21l1.9-5.8a2 2 0 0 1 1.29-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.29L12 3Z"/></svg>;
const HatIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 4c-2.5 0-4.5 2-4.5 5v3.2c-3.5.5-6 1.3-6 2.8 0 1.6 4.7 3 10.5 3s10.5-1.4 10.5-3c0-1.5-2.5-2.3-6-2.8V9c0-3-2-5-4.5-5z"/><path d="M7.5 9h9"/></svg>;

const CowgirlIconsList = [HatIcon, StarIcon, HorseshoeIcon, CactusIcon, SparkleVector];

const Particles = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className={`absolute rounded-full blur-[2px] ${i % 3 === 0 ? 'bg-[#E84A78]/30' : 'bg-[#D4AF37]/30'}`}
          style={{ width: Math.random() * 12 + 4 + "px", height: Math.random() * 12 + 4 + "px", left: Math.random() * 100 + "%", top: "100%" }}
          animate={{ y: [0, -1200 - Math.random() * 500], x: Math.random() * 100 - 50, opacity: [0, 1, 0], scale: [1, 1.8, 1] }}
          transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
        />
      ))}
      {[...Array(30)].map((_, i) => {
        const Icon = CowgirlIconsList[i % CowgirlIconsList.length];
        const isPink = i % 2 === 0;
        return (
          <motion.div
            key={`icon-${i}`}
            className="absolute drop-shadow-xl"
            style={{ left: Math.random() * 100 + "%", top: "100%" }}
            animate={{ y: [0, -1200], x: Math.random() * 100 - 50, opacity: [0, 0.85, 0], rotate: [0, Math.random() > 0.5 ? 360 : -360] }}
            transition={{ duration: Math.random() * 18 + 15, repeat: Infinity, ease: "linear", delay: Math.random() * 8 }}
          >
            <Icon className={`w-10 h-10 md:w-14 md:h-14 ${isPink ? 'text-[#E84A78] fill-[#E84A78]/20' : 'text-[#D4AF37] fill-[#D4AF37]/20'}`} />
          </motion.div>
        );
      })}
    </div>
  );
};

const TickerTape = () => (
  <div className="w-full bg-[#E84A78] text-[#FCF9F6] py-3 overflow-hidden flex border-y-4 border-[#3A2318]">
    <motion.div 
      className="flex whitespace-nowrap gap-8 items-center"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ ease: "linear", duration: 15, repeat: Infinity }}
    >
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex items-center gap-8 font-sans font-black tracking-widest text-sm uppercase">
          <span>Yeehaw</span> <Star className="w-4 h-4 fill-[#FCF9F6]" />
          <span>Disco Cowgirl</span> <Star className="w-4 h-4 fill-[#FCF9F6]" />
          <span>Pool Party</span> <Star className="w-4 h-4 fill-[#FCF9F6]" />
        </div>
      ))}
    </motion.div>
  </div>
);

const PaulaIntro = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <motion.div exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FCF9F6] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none"></div>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="text-center z-10 flex flex-col items-center px-6">
        <HatIcon className="w-20 h-20 text-[#E84A78] mb-6 drop-shadow-xl fill-[#E84A78]/20" strokeWidth={1.5} />
        <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-[#3A2318] uppercase font-black mb-4">Ensilla y acompáñanos al</p>
        <h2 className="font-serif text-6xl md:text-8xl text-[#E84A78] mb-12 italic drop-shadow-sm font-bold">Yeehaw Party</h2>
        <button onClick={onOpen} className="bg-[#3A2318] text-[#FCF9F6] px-12 py-5 rounded-full font-sans text-xs tracking-widest font-black uppercase hover:bg-[#E84A78] hover:scale-105 transition-all duration-300 shadow-2xl flex items-center gap-3">
          <Star className="w-4 h-4" /> Entrar al Rodeo
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="relative z-10 w-full">
      <Particles />

      <section ref={heroRef} className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden bg-[#FCF9F6]">
        <motion.div style={{ y: yHeroBg }} className="absolute inset-0 z-0">
            <img src="/background_paula.jpg" alt="Fondo" className="w-full h-full object-cover opacity-30 scale-110 grayscale-[30%] sepia-[10%]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FCF9F6]/50 via-[#FCF9F6]/80 to-[#FCF9F6]"></div>
        </motion.div>
        <motion.div style={{ opacity: opacityHeroText }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2 }} className="z-10 relative mt-20">
            <p className="font-sans text-xs md:text-sm tracking-[0.4em] text-[#E84A78] uppercase mb-8 font-black drop-shadow-md flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" /> Cowgirl Pool Party
            </p>
            <h1 className="font-serif text-7xl md:text-9xl italic text-[#3A2318] leading-tight mb-8 drop-shadow-xl font-bold">Paula</h1>
            <div className="flex items-center justify-center gap-6 mb-16">
                <div className="h-px w-12 md:w-24 bg-[#E84A78]/80"></div>
                <p className="font-sans text-xl md:text-2xl tracking-[0.4em] text-[#3A2318] uppercase font-black drop-shadow-sm">MIS 10 AÑOS</p>
                <div className="h-px w-12 md:w-24 bg-[#E84A78]/80"></div>
            </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }} className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
          <p className="font-sans text-[10px] md:text-[11px] tracking-[0.5em] text-[#E84A78] uppercase font-black drop-shadow-md">Desliza</p>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-6 h-6 text-[#3A2318]" strokeWidth={3} />
          </motion.div>
        </motion.div>
      </section>

      <TickerTape />

      {/* GALERÍA 1 (STICKERS EDITORIALES) */}
      <section ref={galleryRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <motion.div style={{ y: yParallaxSlow }} className="w-full md:w-1/2 relative flex justify-center items-center">
                {/* PNG inyectado, sin bordes de contenedor, sombra proyectada realista */}
                <img src="/paula1.png" alt="Paula Sticker 1" className="w-full max-h-[75vh] object-contain drop-shadow-[0_20px_25px_rgba(232,74,120,0.2)] block" />
            </motion.div>
            <div className="w-full md:w-1/2 flex flex-col gap-10">
                <div className="text-center md:text-left relative">
                    <CactusIcon className="absolute -top-10 -left-10 w-20 h-20 text-[#E84A78]/40 rotate-12 drop-shadow-sm" />
                    <h2 className="font-serif text-5xl md:text-6xl text-[#E84A78] italic mb-6 drop-shadow-md font-bold relative z-10">¡Mi primera década!</h2>
                    <p className="font-sans text-base text-[#3A2318]/90 leading-relaxed tracking-wide font-medium mb-4 relative z-10">
                      Saddle up! El tiempo vuela y mi primera gran aventura apenas comienza. Cambiaremos el desierto por el agua para celebrar 10 años llenos de risas y momentos inolvidables.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 relative mt-4">
                    <motion.div style={{ y: yParallaxFast }} whileHover={{ scale: 1.05, rotate: -2 }} className="relative z-10 flex justify-center items-center mt-12 cursor-pointer transition-all duration-300">
                        <img src="/paula2.png" alt="Paula Sticker 2" className="w-full h-auto max-h-[400px] object-contain drop-shadow-[0_15px_15px_rgba(212,175,55,0.2)] block" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05, rotate: 2 }} className="relative flex justify-center items-center mb-12 cursor-pointer transition-all duration-300">
                        <img src="/paula3.png" alt="Paula Sticker 3" className="w-full h-auto max-h-[400px] object-contain drop-shadow-[0_15px_15px_rgba(232,74,120,0.2)] block" />
                    </motion.div>
                </div>
            </div>
        </div>
      </section>

      {/* GALERÍA 2: STICKER GRID */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto mb-20 relative z-10">
        <div className="text-center mb-12 relative">
            <HorseshoeIcon className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 drop-shadow-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ scale: 1.05, rotate: 1 }} className="md:col-span-2 relative flex justify-center items-center cursor-pointer transition-all duration-300">
                <img src="/paula4.png" alt="Paula Sticker 4" className="w-full h-auto max-h-[450px] object-contain drop-shadow-[0_20px_25px_rgba(232,74,120,0.15)] block" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, rotate: -2 }} className="relative flex justify-center items-center cursor-pointer transition-all duration-300">
                <img src="/paula5.png" alt="Paula Sticker 5" className="w-full h-auto max-h-[450px] object-contain drop-shadow-[0_20px_25px_rgba(212,175,55,0.15)] block" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, rotate: 2 }} className="relative flex justify-center items-center cursor-pointer transition-all duration-300">
                <img src="/paula6.png" alt="Paula Sticker 6" className="w-full h-auto max-h-[450px] object-contain drop-shadow-[0_20px_25px_rgba(232,74,120,0.15)] block" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, rotate: -1 }} className="md:col-span-2 relative flex justify-center items-center cursor-pointer transition-all duration-300">
                <img src="/paula7.png" alt="Paula Sticker 7" className="w-full h-auto max-h-[450px] object-contain drop-shadow-[0_20px_25px_rgba(212,175,55,0.15)] block" />
            </motion.div>
        </div>
      </section>

      <TickerTape />

      {/* DÓNDE Y CUÁNDO */}
      <section className="py-32 px-6 mx-auto max-w-5xl text-center bg-white/60 relative">
         <h2 className="font-serif text-5xl md:text-6xl text-[#3A2318] italic mb-16 drop-shadow-sm font-bold">Dónde & Cuándo</h2>
         <div className="grid gap-8 md:grid-cols-2 relative z-10">
            <div className="flex flex-col items-center bg-white/90 backdrop-blur-md p-12 border border-[#E84A78]/20 shadow-xl rounded-xl">
              <Clock className="h-12 w-12 text-[#E84A78] mb-6" strokeWidth={2}/>
              <h3 className="font-serif text-3xl text-[#3A2318] mb-2 font-bold">Domingo 14 de Junio</h3>
              <p className="font-sans text-xl text-[#E84A78] font-black mb-1">5:00 PM - 9:00 PM</p>
            </div>
            
            <a href="https://maps.app.goo.gl/x3QoKfdBVvnEuYYS6" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center bg-white/90 backdrop-blur-md border border-[#E84A78]/20 shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group flex-grow overflow-hidden relative">
              <div className="w-full h-40 overflow-hidden relative">
                <img src="/daleda.jpg" alt="Daledá Local" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
              </div>
              <div className="p-8 w-full flex flex-col items-center -mt-10 relative z-10">
                <div className="bg-white p-3 rounded-full shadow-lg mb-4 group-hover:-translate-y-2 transition-transform duration-300 border border-[#E84A78]/10">
                  <MapPin className="h-8 w-8 text-[#E84A78]" strokeWidth={2.5}/>
                </div>
                <h3 className="font-serif text-4xl text-[#3A2318] mb-2 font-bold drop-shadow-sm">Daledá</h3>
                <p className="font-sans text-lg text-[#3A2318] font-black mb-1">Avenida Doce #56</p>
                <p className="text-[10px] md:text-xs text-[#3A2318]/70 font-sans tracking-widest uppercase leading-relaxed mt-2 max-w-[250px] font-bold">
                  Entre calle uno y dos<br/>Col. Bugambilia, Hermosillo, Sonora.
                </p>
                <span className="mt-6 text-[#E84A78] text-xs md:text-sm tracking-widest uppercase font-black border-b-2 border-[#E84A78]/30 pb-1 group-hover:border-[#E84A78] transition-colors">Abrir Google Maps</span>
              </div>
            </a>
         </div>

         <div className="mt-12 bg-[#E84A78] text-white p-12 rounded-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/30 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#3A2318]/20 rounded-full blur-2xl -translate-x-10 translate-y-10"></div>
            <HatIcon className="mx-auto h-16 w-16 text-[#FCF9F6] mb-4 drop-shadow-md fill-[#FCF9F6]/20" strokeWidth={1.5} />
            <h3 className="font-serif text-4xl md:text-5xl italic mb-4 drop-shadow-md font-bold text-[#FCF9F6]">Código de Vestimenta</h3>
            <p className="font-sans text-sm md:text-lg font-black tracking-widest uppercase text-white drop-shadow-sm">Traje de baño y tu mejor actitud Cowgirl</p>
         </div>

         <div className="flex justify-center mt-12 relative z-10">
             <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cowgirl+Pool+Party+10+A%C3%B1os+de+Paula&dates=20260614T170000/20260614T210000&details=Traer+traje+de+ba%C3%B1o+y+actitud+Cowgirl!&location=Daled%C3%A1,+Avenida+Doce+%2356,+Col.+Bugambilia,+Hermosillo&sf=true&output=xml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#3A2318] text-white px-10 py-5 rounded-full font-sans text-xs tracking-widest font-black uppercase hover:bg-[#E84A78] transition-all duration-300 shadow-xl active:scale-95 group">
                <CalendarDays className="h-5 w-5 text-[#E84A78] group-hover:text-white transition-colors" />
                Agendar Fiesta
             </a>
         </div>
      </section>

      {/* REGALOS */}
      <section className="py-32 px-6 text-center bg-[#FCF9F6] relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
            <Gift className="mx-auto h-16 w-16 text-[#E84A78] mb-8 drop-shadow-sm" strokeWidth={2} />
            <h2 className="font-serif text-5xl md:text-6xl text-[#3A2318] italic mb-8 drop-shadow-sm font-bold">Regalos</h2>
            <p className="mb-0 font-sans text-base md:text-lg text-[#3A2318] font-bold leading-relaxed tracking-wide max-w-lg mx-auto bg-white/90 backdrop-blur-md p-10 md:p-12 rounded-xl shadow-xl border border-[#E84A78]/20">
              Tu presencia es mi mayor alegría. Si deseas darme un obsequio, puedes traer un regalo sorpresa o participar en la lluvia de sobres. ¡Lo que tú prefieras! 💌 🎁
            </p>
        </div>
      </section>

      <footer className="py-16 text-center border-t border-[#E84A78]/20 bg-white">
          <p className="font-serif text-4xl text-[#E84A78]/80 italic font-bold">Paula</p>
          <p className="font-sans text-[10px] uppercase tracking-widest text-[#3A2318]/50 mt-3 font-black">10 Años</p>
      </footer>
    </motion.div>
  );
};

export default function Home() {
  const [hasOpened, setHasOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
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
      function raf(time: number) { lenis?.raf(time); rafId = requestAnimationFrame(raf); }
      rafId = requestAnimationFrame(raf);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (lenis) { lenis.destroy(); cancelAnimationFrame(rafId); }
    };
  }, [hasOpened]);

  return (
    <main className="relative bg-[#FCF9F6] text-[#3A2318] font-sans overflow-hidden min-h-screen">
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-50"></div>
      <AnimatePresence>
        {!hasOpened && <PaulaIntro onOpen={() => { setHasOpened(true); audioRef.current?.play().catch(() => {}); }} />}
      </AnimatePresence>
      <AnimatePresence>
        {hasOpened && <InvitationContent />}
      </AnimatePresence>
    </main>
  );
}
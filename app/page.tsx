"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Unboxing from "../components/Unboxing";
import { Clock, MapPin, Copy, Check, CalendarDays, Gift } from "lucide-react";
import { supabase } from "../lib/supabase";

// --- MOTOR DE PARTÍCULAS ---
const Particles = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[1px] ${i % 3 === 0 ? 'bg-[#2A1A10]/20' : 'bg-[#C5A059]/40'}`}
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

// --- CONTENIDO DE LA INVITACIÓN ---
const InvitationContent = () => {
  const [fullName, setFullName] = useState("");
  const [companions, setCompanions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [savedData, setSavedData] = useState<{name: string, count: string} | null>(null);

  const galleryRef = useRef(null);
  const { scrollYProgress: galleryScroll } = useScroll({ target: galleryRef, offset: ["start end", "end start"] });
  const yParallaxFast = useTransform(galleryScroll, [0, 1], ["-15%", "15%"]);
  const yParallaxSlow = useTransform(galleryScroll, [0, 1], ["15%", "-15%"]);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yHeroBg = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const opacityHeroText = useTransform(heroScroll, [0, 0.8], [1, 0]);

  useEffect(() => {
    const localData = localStorage.getItem("rsvp_rosario");
    if (localData) {
      const parsed = JSON.parse(localData);
      setSavedData(parsed);
      setIsConfirmed(true);
    }
  }, []);

  // Función para obtener o generar la huella digital del celular
  const getDeviceId = () => {
    let id = localStorage.getItem("device_id_rosario");
    if (!id) {
      id = 'dev_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      localStorage.setItem("device_id_rosario", id);
    }
    return id;
  };

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !companions) return;
    
    setIsSubmitting(true);
    const deviceId = getDeviceId(); // Sacamos la huella del celular

    try {
      // Mandamos la huella junto con los datos
      const { error } = await supabase
        .from('guests')
        .insert([{ full_name: fullName, companions: parseInt(companions), device_id: deviceId }]);

      if (error) throw error;

      const rsvpData = { name: fullName, count: companions };
      localStorage.setItem("rsvp_rosario", JSON.stringify(rsvpData));
      
      setSavedData(rsvpData);
      setIsConfirmed(true);
    } catch (error) {
      console.error("Error al guardar asistencia:", error);
      alert("Hubo un error al enviar tu confirmación. Revisa tu conexión a internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    localStorage.removeItem("rsvp_rosario");
    setSavedData(null);
    setIsConfirmed(false);
    setFullName("");
    setCompanions("");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative z-10 w-full"
    >
      <Particles />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden border-b border-[#2A1A10]/10 bg-[#F4F0EA]">
        <motion.div style={{ y: yHeroBg }} className="absolute inset-0 z-0">
            <img src="/background_hero.jpg" alt="Fondo Lujo" className="w-full h-full object-cover opacity-80 scale-110" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#F4F0EA]/40 via-transparent to-[#F4F0EA] opacity-80"></div>
        </motion.div>

        <motion.div style={{ opacity: opacityHeroText }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2 }} className="z-10 relative mt-20">
            <p className="font-sans text-xs md:text-sm tracking-[0.4em] text-[#2A1A10] uppercase mb-8 font-semibold drop-shadow-sm">
              Sábado 18 de Abril • San Pedro Villadorada
            </p>
            <h1 className="font-serif text-7xl md:text-9xl italic text-[#2A1A10] leading-tight mb-8 drop-shadow-sm">
              María del<br/>Rosario
            </h1>
            <div className="flex items-center justify-center gap-6 mb-16">
                <div className="h-px w-12 md:w-24 bg-[#C5A059]/50"></div>
                <p className="font-sans text-lg md:text-xl tracking-[0.4em] text-[#2A1A10]/90 uppercase font-medium">
                  MIS 50 AÑOS
                </p>
                <div className="h-px w-12 md:w-24 bg-[#C5A059]/50"></div>
            </div>
        </motion.div>
      </section>

      {/* 2. LAYOUT EDITORIAL (Fotos completas sin recorte) */}
      <section ref={galleryRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#2A1A10]/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <motion.div style={{ y: yParallaxSlow }} className="md:col-span-7 relative w-full shadow-2xl border-4 border-white bg-white p-2">
                <img src="/foto1.jpg" alt="Rosario 1" className="w-full h-auto block" />
            </motion.div>
            <div className="md:col-span-5 flex flex-col gap-10 md:gap-16">
                <div className="text-center md:text-left py-4">
                    <h2 className="font-serif text-4xl text-[#C5A059] italic mb-4">Medio siglo de vida</h2>
                    <p className="font-sans text-sm text-[#2A1A10]/70 leading-relaxed tracking-wide">Celebrando la vida, la familia y los momentos que nos han traído hasta aquí. Una noche para el recuerdo.</p>
                </div>
                <motion.div style={{ y: yParallaxFast }} className="relative w-full shadow-xl md:-ml-20 z-10 border-[6px] border-[#F4F0EA] bg-[#F4F0EA] p-1">
                    <img src="/foto2.jpg" alt="Rosario 2" className="w-full h-auto block" />
                </motion.div>
                <div className="relative w-[85%] ml-auto shadow-lg border-2 border-white bg-white p-1">
                    <img src="/foto3.jpg" alt="Rosario 3" className="w-full h-auto block" />
                </div>
            </div>
        </div>
      </section>

      {/* 3. LOS DETALLES DEL EVENTO */}
      <section className="py-32 px-6 mx-auto max-w-5xl text-center border-b border-[#2A1A10]/10 bg-white/20 relative">
         <h2 className="font-serif text-5xl text-[#2A1A10] italic mb-20">Dónde & Cuándo</h2>
         <div className="grid gap-8 md:grid-cols-2 relative z-10">
            
            <div className="flex flex-col items-center bg-white/70 backdrop-blur-sm p-12 border border-[#2A1A10]/5 shadow-sm rounded-sm">
              <Clock className="h-10 w-10 text-[#C5A059] mb-6" strokeWidth={1}/>
              <h3 className="font-serif text-3xl text-[#2A1A10] mb-2">La Hora</h3>
              <p className="font-sans text-xl text-[#2A1A10]/80 font-medium mb-1">9:00 PM</p>
              <p className="text-xs text-[#2A1A10]/50 font-sans tracking-widest uppercase mt-2">Puntualidad sugerida</p>
            </div>

            <a 
              href="https://maps.app.goo.gl/DQ6fdtyN6GaEFFrN8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center bg-white/70 backdrop-blur-sm p-12 border border-[#2A1A10]/5 shadow-sm rounded-sm hover:shadow-lg transition-all duration-300 cursor-pointer group flex-grow"
            >
              <MapPin className="h-14 w-14 text-[#C5A059] mb-6 group-hover:scale-110 transition-transform" strokeWidth={1}/>
              <h3 className="font-serif text-3xl text-[#2A1A10] mb-2">San Pedro Villadorada</h3>
              <p className="font-sans text-lg text-[#2A1A10]/80 font-medium mb-1">Terreno de la Palapa</p>
              <p className="text-[10px] md:text-xs text-[#2A1A10]/50 font-sans tracking-widest uppercase leading-relaxed mt-2 max-w-[250px]">
                Carretera a Zamora Km 2.2, entrada a la izquierda en Privada Villa Dorada.<br/>Atrás de David Fimbres y María del Rosario.
              </p>
              <span className="mt-6 text-[#C5A059] text-xs md:text-sm tracking-widest uppercase font-bold border-b border-[#C5A059]/30 pb-1 group-hover:border-[#C5A059] transition-colors">
                Ver en Google Maps
              </span>
            </a>

         </div>

         <div className="flex justify-center mt-12 relative z-10">
             <a 
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cumplea%C3%B1os+50+de+Mar%C3%ADa+del+Rosario&dates=20260418T210000/20260419T020000&details=Celebraci%C3%B1on+especial+del+50+aniversario.&location=San+Pedro+Villadorada+/+Terreno+de+la+Palapa&sf=true&output=xml"
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-[#2A1A10] text-[#E1D4C0] px-8 py-4 rounded-full font-sans text-xs tracking-widest font-bold uppercase hover:bg-[#C5A059] hover:text-white transition-colors shadow-md active:scale-95 group"
             >
                <CalendarDays className="h-4 w-4 text-[#C5A059] group-hover:text-white transition-colors" />
                Agregar a la agenda
             </a>
         </div>
      </section>

      {/* 4. MESA DE REGALOS */}
      <section className="py-24 px-6 text-center bg-[#E8E1D5] border-y border-[#2A1A10]/10 relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
            <Gift className="mx-auto h-12 w-12 text-[#C5A059] mb-6" strokeWidth={1} />
            <h2 className="font-serif text-4xl text-[#2A1A10] italic mb-6">Mesa de Regalos</h2>
            <p className="mb-0 font-sans text-sm md:text-base text-[#2A1A10]/80 leading-relaxed tracking-wide max-w-lg mx-auto bg-white/50 p-6 md:p-8 rounded-sm shadow-sm border border-[#2A1A10]/5">
              El mejor regalo que puedo recibir es compartir este día contigo. <br/><br/>
              Si deseas tener un detalle adicional, contaremos con un espacio designado en la recepción para obsequios y un buzón para sobres.
            </p>
        </div>
      </section>

      {/* 5. RSVP DINÁMICO */}
      <section className="py-32 px-6 text-center relative bg-[#F4F0EA]">
         <div className="relative z-10 max-w-xl mx-auto">
             <p className="font-sans text-xs tracking-[0.4em] text-[#C5A059] uppercase mb-4 font-semibold">Confirma tu lugar</p>
             <h2 className="font-serif text-6xl text-[#2A1A10] italic mb-8">Acompáñame</h2>
             
             <AnimatePresence mode="wait">
               {isConfirmed ? (
                 <motion.div 
                   key="confirmed"
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-white p-12 border border-[#C5A059]/30 shadow-2xl rounded-sm flex flex-col items-center"
                 >
                   <div className="h-16 w-16 bg-[#F4F0EA] rounded-full flex items-center justify-center mb-6">
                     <Check className="h-8 w-8 text-[#C5A059]" />
                   </div>
                   <h3 className="font-serif text-3xl text-[#2A1A10] mb-2 italic">¡Gracias, {savedData?.name}!</h3>
                   <p className="font-sans text-[#2A1A10]/70 mb-8">Tu lugar para {savedData?.count} persona(s) ha sido reservado con honor.</p>
                   <button onClick={resetForm} className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold border-b border-[#C5A059]/30 pb-1 hover:border-[#C5A059] transition-colors">
                     Hacer nuevo registro
                   </button>
                 </motion.div>
               ) : (
                 <motion.form 
                   key="form"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   onSubmit={handleRSVPSubmit} 
                   className="flex flex-col gap-5 text-left bg-white p-8 md:p-12 border border-[#2A1A10]/10 shadow-xl rounded-sm"
                 >
                   <p className="mb-6 text-center font-sans text-[#2A1A10]/70 text-sm md:text-base leading-relaxed">
                     Por favor, confirma tu asistencia antes del 1 de Abril.
                   </p>
                   <div>
                       <label className="font-sans text-[10px] uppercase tracking-widest text-[#2A1A10]/50 mb-2 block font-bold">Nombre completo / Familia</label>
                       <input 
                         required
                         type="text" 
                         value={fullName}
                         onChange={(e) => setFullName(e.target.value)}
                         placeholder="Ej. Familia Pérez Solís" 
                         className="w-full bg-[#F4F0EA]/50 border border-[#2A1A10]/10 p-4 text-[#2A1A10] placeholder:text-[#2A1A10]/30 focus:outline-none focus:border-[#C5A059] transition font-sans text-sm rounded-sm" 
                       />
                   </div>
                   <div>
                       <label className="font-sans text-[10px] uppercase tracking-widest text-[#2A1A10]/50 mb-2 block font-bold">Número de asistentes totales</label>
                       <div className="relative">
                           <select 
                             required
                             value={companions}
                             onChange={(e) => setCompanions(e.target.value)}
                             className="w-full bg-[#F4F0EA]/50 border border-[#2A1A10]/10 p-4 text-[#2A1A10] focus:outline-none focus:border-[#C5A059] transition font-sans text-sm appearance-none cursor-pointer rounded-sm"
                           >
                             <option value="" disabled>Selecciona cantidad</option>
                             <option value="1">1 Persona</option>
                             <option value="2">2 Personas</option>
                             <option value="3">3 Personas</option>
                             <option value="4">4 Personas</option>
                             <option value="5">5 Personas</option>
                           </select>
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A059] font-serif italic text-xl">v</div>
                       </div>
                   </div>
                   <button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="mt-4 w-full bg-[#C5A059] text-white font-bold py-4 rounded-sm tracking-[0.2em] uppercase text-xs hover:bg-[#2A1A10] transition-colors shadow-md active:scale-95 disabled:opacity-50 flex justify-center items-center"
                   >
                     {isSubmitting ? "ENVIANDO..." : "ENVIAR CONFIRMACIÓN"}
                   </button>
                 </motion.form>
               )}
             </AnimatePresence>
         </div>
      </section>

      <footer className="py-12 text-center border-t border-[#2A1A10]/10 bg-[#E8E1D5]">
          <p className="font-serif text-2xl text-[#2A1A10]/30 italic">R.S.</p>
      </footer>
    </motion.div>
  );
};

// --- COMPONENTE PRINCIPAL (Cerebro del Proyecto) ---
export default function Home() {
  const [hasOpened, setHasOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
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
    <main className="relative bg-[#F4F0EA] text-[#2A1A10] font-sans overflow-hidden">
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-50"></div>
      
      <Unboxing onOpen={() => setHasOpened(true)} audioRef={audioRef} />

      <AnimatePresence>
        {hasOpened && <InvitationContent />}
      </AnimatePresence>
    </main>
  );
}
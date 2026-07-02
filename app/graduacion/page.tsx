"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UnboxingGraduacion from "../../components/UnboxingGraduacion";
import CalendarButton from "../../components/CalendarButton";
import FloatingElements from "../../components/FloatingElements";
import { EVENT_DATA, MENCIONES_ESPECIALES, ITINERARIO, ALUMNOS_6A, ALUMNOS_6B } from "./data";
import * as LucideIcons from "lucide-react";

// Textura base
const noisePattern = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

// Utilidad Matemática: Formateo de nombres estricto (Title Case)
const formatTitleCase = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
};

export default function GraduacionPage() {
  const [hasOpened, setHasOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(EVENT_DATA.date).getTime();
    const interval = setInterval(() => {
      const difference = targetDate - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Renderizador dinámico de iconos
  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent size={20} className="text-[#8B6508]" /> : <LucideIcons.CheckCircle size={20} className="text-[#8B6508]" />;
  };

  return (
    <>
      {/* Audio Engine - preload="auto" y playsInline forzan la precarga */}
      <audio ref={audioRef} src="/cancion-graduacion.mp3" loop preload="auto" playsInline />
      
      <UnboxingGraduacion onOpen={() => setHasOpened(true)} audioRef={audioRef} />
      
      {/* Módulo Lightbox (Modo Dios Zoom) */}
      <AnimatePresence>
        {zoomedImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImg(null)}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img 
              src={zoomedImg} 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
            <p className="absolute bottom-8 font-montserrat text-white/50 text-xs tracking-widest uppercase">Toca para cerrar</p>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`relative w-full bg-[#FDFBF7] text-[#1C2321] transition-all duration-[1500ms] ease-in-out ${hasOpened ? 'opacity-100 transform-none' : 'opacity-0 translate-y-12 h-screen overflow-hidden'}`}>
        
        {/* Componentes de Fondo Absoluto */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply" style={{ backgroundImage: noisePattern }} />
        {hasOpened && <FloatingElements />}

        {/* Botón de Audio Flotante */}
        <button 
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white text-[#8B6508] shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform border border-[#8B6508]/20"
        >
          {isMuted ? <LucideIcons.VolumeX size={18} /> : <LucideIcons.Volume2 size={18} />}
        </button>

        {/* 1. HERO - MAGNITUD TOTAL */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-10 z-10">
          <p className="font-montserrat text-sm md:text-base tracking-[0.6em] uppercase text-[#1C2321]/50 mb-10 font-semibold">
            Generación 2020 - 2026
          </p>
          
          <div className="relative w-[320px] md:w-[450px] aspect-square mb-12">
            <img 
              src="/logo-escuela.png" 
              alt="Logo Escuela" 
              className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          <div className="w-px h-20 bg-[#8B6508]/40 mb-10" />
          
          <h1 className="font-cormorant text-5xl md:text-7xl text-[#1C2321] font-medium leading-tight">
            Generación Maestra<br/>
            <span className="italic text-[#8B6508]">Ángela Córdova Villegas</span>
          </h1>
        </section>

        {/* 2. LOCACIÓN Y CUENTA REGRESIVA GLASSMORPHISM */}
        <section className="relative z-10 py-32 px-4 md:px-12">
          {/* Contenedor Glassmorphism Premium */}
          <div className="max-w-7xl mx-auto relative rounded-[40px] overflow-hidden shadow-2xl border border-white/20 bg-[#1C2321]">
            {/* Imagen de fondo difuminada para efecto cristal */}
            <div className="absolute inset-0 opacity-40 bg-[url('/6a-foto1.jpg')] bg-cover bg-center grayscale mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1C2321]/80 to-[#1C2321]/95 backdrop-blur-md" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 p-10 md:p-20">
              <div className="flex flex-col justify-center gap-12 lg:border-r border-white/10 lg:pr-16">
                <div>
                  <p className="font-montserrat text-xs tracking-[0.5em] uppercase text-[#D4AF37] mb-4">Ubicación</p>
                  <p className="font-cormorant text-4xl leading-tight mb-8 text-white">{EVENT_DATA.location}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href={EVENT_DATA.mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#1C2321] font-bold text-[10px] tracking-[0.2em] uppercase rounded-full hover:bg-white transition-colors duration-300">
                      <LucideIcons.MapPin size={14} /> Cómo llegar
                    </a>
                    <CalendarButton eventData={EVENT_DATA} />
                  </div>
                </div>
              </div>

              {/* Conteo de Días - Modo Glass */}
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  {[
                    { l: 'Días', v: timeLeft.days }, { l: 'Hrs', v: timeLeft.hours },
                    { l: 'Min', v: timeLeft.minutes }, { l: 'Seg', v: timeLeft.seconds }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center py-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-inner">
                      <span className="font-cormorant text-5xl md:text-6xl text-white font-medium drop-shadow-md">{item.v.toString().padStart(2, '0')}</span>
                      <span className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mt-4 font-bold">{item.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ITINERARIO CON ICONOS */}
        <section className="relative z-10 py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-cormorant text-5xl md:text-7xl text-center mb-24 text-[#1C2321] font-medium">Itinerario</h2>
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[5.5rem] md:before:ml-[7.5rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#8B6508]/30 before:to-transparent">
              {ITINERARIO.map((item: any, idx: number) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-[#8B6508] shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 hover:scale-110 transition-transform">
                    {renderIcon(item.icon)}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl border border-[#8B6508]/10 shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="font-montserrat text-xs tracking-[0.3em] text-[#8B6508] mb-2 font-bold">{item.time}</div>
                    <p className="font-cormorant text-2xl text-[#1C2321] font-medium">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. DIRECTORIO DE ALUMNOS (Lujo e Interactividad) */}
        <section className="relative z-10 py-32 border-t border-[#8B6508]/20 bg-white shadow-2xl rounded-t-[60px]">
          <h2 className="font-cormorant text-6xl md:text-8xl text-center mb-8 text-[#1C2321] font-medium">Directorio</h2>
          <div className="w-24 h-1 bg-[#8B6508] mx-auto mb-24 rounded-full" />
          
          {/* GRUPO 6-A */}
          <div className="w-full mb-32">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
              <h3 className="font-cormorant text-6xl italic text-[#8B6508] mb-4">Grupo 6-A</h3>
              <span className="font-montserrat text-xs tracking-[0.4em] uppercase text-[#1C2321]/50 font-bold">{ALUMNOS_6A.length} Alumnos</span>
            </div>
            
            {/* Carrusel Interactivo - Clickeable para Zoom */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
              {[1, 2, 3, 4, 5].map((num) => {
                const src = `/6a-foto${num}.jpg`;
                return (
                  <div 
                    key={`6a-${num}`} 
                    onClick={() => setZoomedImg(src)}
                    className="min-w-[85%] md:min-w-[45%] aspect-[16/10] bg-cover bg-center rounded-2xl shadow-xl snap-center shrink-0 grayscale hover:grayscale-0 transition-all duration-500 cursor-zoom-in relative group" 
                    style={{ backgroundImage: `url('${src}')` }} 
                  >
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                      <LucideIcons.ZoomIn size={48} className="text-white drop-shadow-lg" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-6">
                {ALUMNOS_6A.map((alumno, idx) => (
                  <li key={idx} className="font-cormorant text-2xl text-[#1C2321] hover:text-[#8B6508] transition-colors border-b border-[#8B6508]/20 pb-3 flex justify-between group cursor-default">
                    {/* INYECCIÓN DEL FORMATEADOR DE NOMBRES */}
                    <span>{formatTitleCase(alumno)}</span>
                    <span className="font-montserrat text-[10px] font-bold text-[#1C2321]/30 group-hover:text-[#8B6508] transition-colors pt-2">{(idx + 1).toString().padStart(2, '0')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* GRUPO 6-B */}
          <div className="w-full pb-20">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
              <h3 className="font-cormorant text-6xl italic text-[#8B6508] mb-4">Grupo 6-B</h3>
              <span className="font-montserrat text-xs tracking-[0.4em] uppercase text-[#1C2321]/50 font-bold">{ALUMNOS_6B.length} Alumnos</span>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
              {[1, 2, 3, 4, 5].map((num) => {
                const src = `/6b-foto${num}.jpg`;
                return (
                  <div 
                    key={`6b-${num}`} 
                    onClick={() => setZoomedImg(src)}
                    className="min-w-[85%] md:min-w-[45%] aspect-[16/10] bg-cover bg-center rounded-2xl shadow-xl snap-center shrink-0 grayscale hover:grayscale-0 transition-all duration-500 cursor-zoom-in relative group" 
                    style={{ backgroundImage: `url('${src}')` }} 
                  >
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                      <LucideIcons.ZoomIn size={48} className="text-white drop-shadow-lg" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-6">
                {ALUMNOS_6B.map((alumno, idx) => (
                  <li key={idx} className="font-cormorant text-2xl text-[#1C2321] hover:text-[#8B6508] transition-colors border-b border-[#8B6508]/20 pb-3 flex justify-between group cursor-default">
                    {/* INYECCIÓN DEL FORMATEADOR DE NOMBRES */}
                    <span>{formatTitleCase(alumno)}</span>
                    <span className="font-montserrat text-[10px] font-bold text-[#1C2321]/30 group-hover:text-[#8B6508] transition-colors pt-2">{(idx + 1).toString().padStart(2, '0')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5. MENCIONES ESPECIALES */}
        <section className="relative z-10 py-40 px-6 border-t border-[#8B6508]/30 bg-[#FDFBF7]">
          <div className="max-w-5xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {MENCIONES_ESPECIALES.map((mencion, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="font-montserrat text-xs uppercase tracking-[0.4em] text-[#8B6508] mb-6 font-bold">{mencion.rol}</span>
                  <span className="font-cormorant text-3xl md:text-4xl text-[#1C2321] font-medium">{mencion.nombre}</span>
                </div>
              ))}
              <div className="flex flex-col items-center md:col-start-2">
                  <span className="font-montserrat text-xs uppercase tracking-[0.4em] text-[#8B6508] mb-6 font-bold">Pta. Sociedad de Alumnos</span>
                  <span className="font-cormorant text-3xl md:text-4xl text-[#1C2321] font-medium">{formatTitleCase(EVENT_DATA.president)}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
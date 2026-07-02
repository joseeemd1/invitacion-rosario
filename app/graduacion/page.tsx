"use client";

import { useState, useEffect, useRef } from "react";
import UnboxingGraduacion from "@/components/UnboxingGraduacion";
import CalendarButton from "@/components/CalendarButton";
import { EVENT_DATA, MENCIONES_ESPECIALES, ITINERARIO, ALUMNOS_6A, ALUMNOS_6B } from "./data";
import { MapPin, Volume2, VolumeX } from "lucide-react";

const noisePattern = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function GraduacionPage() {
  const [hasOpened, setHasOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
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
      } else {
        clearInterval(interval);
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

  return (
    <>
      <audio ref={audioRef} src="/cancion-graduacion.mp3" loop preload="auto" />
      <UnboxingGraduacion onOpen={() => setHasOpened(true)} audioRef={audioRef} />
      
      <main className={`relative w-full bg-[#FDFBF7] text-[#1C2321] transition-all duration-[1500ms] ease-in-out ${hasOpened ? 'opacity-100 transform-none' : 'opacity-0 translate-y-12 h-screen overflow-hidden'}`}>
        
        <div 
          className="fixed inset-0 opacity-[0.02] pointer-events-none z-0 mix-blend-multiply" 
          style={{ backgroundImage: noisePattern }}
        />

        <button 
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white text-[#D4AF37] shadow-[0_10px_30px_rgba(28,35,33,0.1)] hover:scale-105 transition-transform border border-[#D4AF37]/20"
        >
          {isMuted ? <VolumeX size={18} strokeWidth={1.5} /> : <Volume2 size={18} strokeWidth={1.5} />}
        </button>

        {/* 1. HERO - LOGOTIPO ESCUELA */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-10 z-10">
          <p className="font-montserrat text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#1C2321]/60 mb-12">
            Generación {EVENT_DATA.generation}
          </p>
          
          {/* Contenedor del Logo de la Escuela que enviaste */}
          <div className="relative w-64 md:w-80 aspect-square mb-12">
            <img 
              src="/logo-escuela.png" 
              alt="Logo Escuela" 
              className="absolute inset-0 w-full h-full object-contain drop-shadow-xl"
            />
          </div>

          <div className="w-px h-16 bg-[#D4AF37]/40 mb-10" />
          
          <h1 className="font-cormorant text-4xl md:text-5xl text-[#1C2321] italic font-medium">
            {EVENT_DATA.nameGeneration}
          </h1>
        </section>

        {/* 2. LOCACIÓN Y CUENTA REGRESIVA DE LUJO */}
        <section className="relative z-10 py-32 px-6 border-y border-[#D4AF37]/20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 bg-white/50 backdrop-blur-sm">
          <div className="flex flex-col justify-center gap-12 md:border-r border-[#D4AF37]/20 md:pr-20">
            <div>
              <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-[#D4AF37] mb-4">Ubicación</p>
              <p className="font-cormorant text-4xl leading-tight mb-8 font-medium">{EVENT_DATA.location}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={EVENT_DATA.mapUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1C2321] text-white text-[10px] tracking-[0.2em] uppercase rounded-full hover:bg-[#D4AF37] transition-colors duration-300"
                >
                  <MapPin size={14} /> Cómo llegar
                </a>
                <CalendarButton eventData={EVENT_DATA} />
              </div>
            </div>
            <div>
              <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-[#D4AF37] mb-3">Fecha y Hora</p>
              <p className="font-cormorant text-3xl font-medium">15 de Julio • 5:30 PM</p>
            </div>
          </div>

          {/* Cronómetro Rediseñado */}
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full text-center">
              {[
                { l: 'Días', v: timeLeft.days }, { l: 'Hrs', v: timeLeft.hours },
                { l: 'Min', v: timeLeft.minutes }, { l: 'Seg', v: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center py-8 bg-white border border-[#D4AF37]/20 rounded-2xl shadow-sm">
                  <span className="font-cormorant text-5xl md:text-6xl text-[#1C2321] font-medium">{item.v.toString().padStart(2, '0')}</span>
                  <span className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-[#D4AF37] mt-3 font-semibold">{item.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. ITINERARIO */}
        <section className="relative z-10 py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-cormorant text-5xl md:text-6xl text-center mb-20 text-[#1C2321] font-medium">Itinerario</h2>
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[5.5rem] md:before:ml-[7.5rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#D4AF37]/30 before:to-transparent">
              {ITINERARIO.map((item, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#D4AF37] shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-[#D4AF37]/10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="font-montserrat text-[10px] tracking-[0.3em] text-[#D4AF37] mb-2">{item.time}</div>
                    <p className="font-cormorant text-2xl text-[#1C2321] font-medium">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. DIRECTORIO DE ALUMNOS (Fondo Claro Continuo) */}
        <section className="relative z-10 py-32 border-t border-[#D4AF37]/20">
          <h2 className="font-cormorant text-5xl md:text-6xl text-center mb-24 text-[#1C2321] font-medium">Generación 2026</h2>
          
          {/* GRUPO 6-A */}
          <div className="w-full mb-32">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
              <h3 className="font-cormorant text-5xl italic text-[#D4AF37] mb-4">Grupo 6-A</h3>
              <span className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-[#1C2321]/40">{ALUMNOS_6A.length} Alumnos Egresados</span>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
              {[1, 2, 3, 4, 5].map((num) => (
                <div 
                  key={`6a-${num}`} 
                  className="min-w-[85%] md:min-w-[45%] aspect-[16/10] bg-cover bg-center rounded-xl shadow-lg snap-center shrink-0 grayscale hover:grayscale-0 transition-all duration-[800ms]" 
                  style={{ backgroundImage: `url('/6a-foto${num}.jpg')` }} 
                />
              ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-6">
                {ALUMNOS_6A.map((alumno, idx) => (
                  <li key={idx} className="font-cormorant text-xl text-[#1C2321]/80 hover:text-[#D4AF37] transition-colors border-b border-[#D4AF37]/20 pb-3 flex justify-between group cursor-default">
                    <span>{alumno}</span>
                    <span className="font-montserrat text-[10px] text-[#1C2321]/20 group-hover:text-[#D4AF37] transition-colors pt-2">{(idx + 1).toString().padStart(2, '0')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* GRUPO 6-B */}
          <div className="w-full pb-20">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
              <h3 className="font-cormorant text-5xl italic text-[#D4AF37] mb-4">Grupo 6-B</h3>
              <span className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-[#1C2321]/40">{ALUMNOS_6B.length} Alumnos Egresados</span>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
              {[1, 2, 3, 4, 5].map((num) => (
                <div 
                  key={`6b-${num}`} 
                  className="min-w-[85%] md:min-w-[45%] aspect-[16/10] bg-cover bg-center rounded-xl shadow-lg snap-center shrink-0 grayscale hover:grayscale-0 transition-all duration-[800ms]" 
                  style={{ backgroundImage: `url('/6b-foto${num}.jpg')` }} 
                />
              ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-6">
                {ALUMNOS_6B.map((alumno, idx) => (
                  <li key={idx} className="font-cormorant text-xl text-[#1C2321]/80 hover:text-[#D4AF37] transition-colors border-b border-[#D4AF37]/20 pb-3 flex justify-between group cursor-default">
                    <span>{alumno}</span>
                    <span className="font-montserrat text-[10px] text-[#1C2321]/20 group-hover:text-[#D4AF37] transition-colors pt-2">{(idx + 1).toString().padStart(2, '0')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5. MENCIONES ESPECIALES */}
        <section className="relative z-10 py-32 px-6 border-t border-[#D4AF37]/30 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {MENCIONES_ESPECIALES.map((mencion, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="font-montserrat text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] mb-6 font-semibold">{mencion.rol}</span>
                  <span className="font-cormorant text-2xl md:text-3xl text-[#1C2321] font-medium">{mencion.nombre}</span>
                </div>
              ))}
              <div className="flex flex-col items-center md:col-start-2">
                  <span className="font-montserrat text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] mb-6 font-semibold">Pta. Sociedad de Alumnos</span>
                  <span className="font-cormorant text-2xl md:text-3xl text-[#1C2321] font-medium">{EVENT_DATA.president}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
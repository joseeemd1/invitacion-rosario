"use client";

import { useState, useEffect, useRef } from "react";
import UnboxingGraduacion from "@/components/UnboxingGraduacion";
import CalendarButton from "@/components/CalendarButton";
import { EVENT_DATA, MENCIONES_ESPECIALES, ITINERARIO, ALUMNOS_6A, ALUMNOS_6B } from "./data";
import { MapPin, Volume2, VolumeX } from "lucide-react";

// Motor de Textura Táctil inyectado
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
      
      <main className={`relative w-full bg-[#F7F5F0] text-[#1A1A1A] transition-all duration-[1500ms] ease-in-out ${hasOpened ? 'opacity-100 transform-none' : 'opacity-0 translate-y-12 h-screen overflow-hidden'}`}>
        
        {/* Textura Aplicada a todo el ecosistema */}
        <div 
          className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply" 
          style={{ backgroundImage: noisePattern }}
        />

        <button 
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#1A1A1A] text-[#F7F5F0] shadow-2xl hover:scale-105 transition-transform border border-white/10"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 z-10">
          <span className="font-montserrat text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#1A1A1A]/40 mb-12">
            {EVENT_DATA.school}
          </span>
          <h1 className="font-cormorant text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] text-[#1A1A1A] mb-8 font-light tracking-tight">
            Nuestra<br />
            <span className="italic text-[#C5A880]">Historia</span>
          </h1>
          <div className="w-px h-24 bg-[#1A1A1A]/20 my-10" />
          <p className="font-montserrat text-xs md:text-sm tracking-[0.4em] uppercase text-[#1A1A1A]/70 font-medium">
            Generación {EVENT_DATA.nameGeneration}
          </p>
        </section>

        <section className="relative z-10 py-32 px-6 border-y border-[#1A1A1A]/10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="flex flex-col justify-center gap-16 md:border-r border-[#1A1A1A]/10 md:pr-20">
            <div>
              <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-4">Coordenadas</p>
              <p className="font-cormorant text-4xl leading-tight mb-6">{EVENT_DATA.location}</p>
              <div className="flex gap-6">
                <a href={EVENT_DATA.mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase border-b border-[#1A1A1A] pb-1 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors">
                  <MapPin size={12} /> Abrir Mapa
                </a>
                <CalendarButton eventData={EVENT_DATA} />
              </div>
            </div>
            <div>
              <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-4">Cronología</p>
              <p className="font-cormorant text-4xl">15 de Julio • 5:30 PM</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full text-center">
              {[
                { l: 'Días', v: timeLeft.days }, { l: 'Hrs', v: timeLeft.hours },
                { l: 'Min', v: timeLeft.minutes }, { l: 'Seg', v: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center">
                  <span className="font-cormorant text-5xl md:text-7xl text-[#1A1A1A] font-light">{item.v.toString().padStart(2, '0')}</span>
                  <span className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-[#1A1A1A]/40 mt-4">{item.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-cormorant text-4xl md:text-5xl text-center mb-24 text-[#C5A880] italic">Orden del Día</h2>
            <div className="space-y-16">
              {ITINERARIO.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-baseline group">
                  <div className="w-40 flex-shrink-0 font-montserrat text-xs tracking-[0.2em] text-[#1A1A1A]/40 mb-2 md:mb-0">
                    {item.time}
                  </div>
                  <div className="relative md:pl-10 md:border-l border-[#1A1A1A]/10 w-full group-hover:border-[#C5A880] transition-colors duration-500">
                    <p className="font-cormorant text-2xl md:text-3xl text-[#1A1A1A]">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 py-32 bg-[#1A1A1A] text-[#F7F5F0]">
          <h2 className="font-cormorant text-5xl md:text-7xl text-center mb-24 text-[#F7F5F0]">El Legado</h2>
          
          <div className="w-full mb-40">
            <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end border-b border-white/10 pb-6">
              <h3 className="font-montserrat text-xs tracking-[0.5em] uppercase text-[#C5A880]">Grupo 6-A</h3>
              <span className="font-cormorant italic text-white/40">{ALUMNOS_6A.length} Alumnos</span>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
              {[1, 2, 3, 4, 5].map((num) => (
                <div 
                  key={`6a-${num}`} 
                  className="min-w-[85%] md:min-w-[45%] aspect-[16/10] bg-cover bg-center rounded-sm snap-center shrink-0 grayscale hover:grayscale-0 transition-all duration-[800ms]" 
                  style={{ backgroundImage: `url('/6a-foto${num}.jpg')` }} 
                />
              ))}
            </div>

            <div className="max-w-7xl mx-auto px-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-6">
                {ALUMNOS_6A.map((alumno, idx) => (
                  <li key={idx} className="font-cormorant text-lg md:text-xl text-white/60 hover:text-white transition-colors border-b border-white/5 pb-2 flex justify-between group cursor-default">
                    <span>{alumno}</span>
                    <span className="font-montserrat text-[10px] text-white/10 group-hover:text-[#C5A880] transition-colors">{(idx + 1).toString().padStart(2, '0')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full pb-20">
            <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end border-b border-white/10 pb-6">
              <h3 className="font-montserrat text-xs tracking-[0.5em] uppercase text-[#C5A880]">Grupo 6-B</h3>
              <span className="font-cormorant italic text-white/40">{ALUMNOS_6B.length} Alumnos</span>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
              {[1, 2, 3, 4, 5].map((num) => (
                <div 
                  key={`6b-${num}`} 
                  className="min-w-[85%] md:min-w-[45%] aspect-[16/10] bg-cover bg-center rounded-sm snap-center shrink-0 grayscale hover:grayscale-0 transition-all duration-[800ms]" 
                  style={{ backgroundImage: `url('/6b-foto${num}.jpg')` }} 
                />
              ))}
            </div>

            <div className="max-w-7xl mx-auto px-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-6">
                {ALUMNOS_6B.map((alumno, idx) => (
                  <li key={idx} className="font-cormorant text-lg md:text-xl text-white/60 hover:text-white transition-colors border-b border-white/5 pb-2 flex justify-between group cursor-default">
                    <span>{alumno}</span>
                    <span className="font-montserrat text-[10px] text-white/10 group-hover:text-[#C5A880] transition-colors">{(idx + 1).toString().padStart(2, '0')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-40 px-6 bg-[#0a0a0a] text-[#F7F5F0]">
          <div className="max-w-5xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {MENCIONES_ESPECIALES.map((mencion, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="font-montserrat text-[9px] uppercase tracking-[0.4em] text-white/30 mb-6">{mencion.rol}</span>
                  <span className="font-cormorant text-2xl md:text-3xl text-white/90">{mencion.nombre}</span>
                </div>
              ))}
              <div className="flex flex-col items-center md:col-start-2">
                  <span className="font-montserrat text-[9px] uppercase tracking-[0.4em] text-white/30 mb-6">Pta. Sociedad de Alumnos</span>
                  <span className="font-cormorant text-2xl md:text-3xl text-white/90">{EVENT_DATA.president}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
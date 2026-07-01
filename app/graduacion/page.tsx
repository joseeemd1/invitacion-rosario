"use client";
import { useEffect, useState } from "react";
import { EVENT_DATA, MENCIONES_ESPECIALES, ITINERARIO, ALUMNOS_6A, ALUMNOS_6B } from "./data";
import { MapPin, Clock, Calendar, ChevronDown } from "lucide-react";

export default function GraduacionPage() {
  // Motor Matemático de Cuenta Regresiva (Aislado de re-renders masivos)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(EVENT_DATA.date).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

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

  return (
    <main className="relative w-full bg-[#0a0a0a] text-[#f5f5f0] font-sans selection:bg-white selection:text-black">
      
      {/* 1. HERO CUÁNTICO ZERO-JS PARALLAX */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 sticky h-screen">
          <div className="absolute inset-0 bg-[url('/hero-graduacion.jpg')] bg-cover bg-center opacity-40 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/50 mb-6 border-b border-white/20 pb-2">
            {EVENT_DATA.school}
          </span>
          <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl tracking-tighter leading-none mb-4">
            Generación<br />
            <span className="italic text-white/80">{EVENT_DATA.generation}</span>
          </h1>
          <p className="text-sm md:text-base font-light tracking-widest text-white/60 mt-8">
            {EVENT_DATA.nameGeneration}
          </p>
          
          <div className="absolute bottom-10 animate-bounce">
            <ChevronDown size={32} className="text-white/30" />
          </div>
        </div>
      </section>

      {/* 2. MOTOR DE TIEMPO Y LOCACIÓN */}
      <section className="relative z-20 bg-[#0a0a0a] py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          
          {/* Locación */}
          <div className="flex flex-col space-y-8 border-l border-white/10 pl-8">
            <div>
              <div className="flex items-center space-x-3 mb-2 text-white/40">
                <Calendar size={18} /> <span className="uppercase tracking-widest text-xs">Fecha</span>
              </div>
              <p className="text-2xl font-serif">15 de Julio, 2026</p>
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2 text-white/40">
                <Clock size={18} /> <span className="uppercase tracking-widest text-xs">Hora</span>
              </div>
              <p className="text-2xl font-serif">5:30 PM</p>
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2 text-white/40">
                <MapPin size={18} /> <span className="uppercase tracking-widest text-xs">Lugar</span>
              </div>
              <p className="text-2xl font-serif mb-4">{EVENT_DATA.location}</p>
              <a 
                href={EVENT_DATA.mapUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-block bg-white text-black px-6 py-3 text-xs uppercase tracking-widest hover:bg-white/80 transition-colors"
              >
                Abrir Mapa
              </a>
            </div>
          </div>

          {/* Cuenta Regresiva */}
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { label: 'Días', value: timeLeft.days },
                { label: 'Horas', value: timeLeft.hours },
                { label: 'Min', value: timeLeft.minutes },
                { label: 'Seg', value: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col border border-white/10 py-8 rounded-lg backdrop-blur-sm">
                  <span className="font-serif text-4xl md:text-6xl">{item.value.toString().padStart(2, '0')}</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 mt-2">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. LÍNEA DE TIEMPO (ITINERARIO) */}
      <section className="py-32 px-6 bg-[#111]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-6xl text-center mb-20 border-b border-white/10 pb-10">Cronograma</h2>
          <div className="space-y-12">
            {ITINERARIO.map((item, idx) => (
              <div key={idx} className="flex items-start group">
                <div className="w-32 flex-shrink-0 text-white/40 font-mono text-sm pt-1">{item.time}</div>
                <div className="relative pl-8 border-l border-white/10 pb-12 group-last:pb-0 group-last:border-transparent">
                  <div className="absolute w-2 h-2 bg-white rounded-full left-[-4.5px] top-1.5 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  <p className="text-xl md:text-2xl font-serif text-white/90">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALERÍA DE ALUMNOS (CARRUSEL SCROLL SNAP NATIVO) */}
      <section className="py-32 px-0 md:px-4">
        <h2 className="font-serif text-5xl text-center mb-20 px-4">Directorio de Egresados</h2>
        
        {/* GRUPO 6-A */}
        <div className="w-full mb-32">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-3xl font-serif mb-8 text-[#cc0000] flex items-center gap-4">
              <span className="w-10 h-px bg-[#cc0000]"></span> Grupo 6-A
            </h3>
          </div>
          
          {/* Carrusel Horizontal 6-A */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 md:px-auto max-w-7xl mx-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[1, 2, 3, 4, 5].map((num) => (
              <div 
                key={`6a-${num}`} 
                className="min-w-[85%] md:min-w-[60%] aspect-[16/10] bg-cover bg-center rounded-xl snap-center shrink-0 grayscale hover:grayscale-0 transition-all duration-700 border border-white/10" 
                style={{ backgroundImage: `url('/6a-foto${num}.jpg')` }} 
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 mt-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {ALUMNOS_6A.map((alumno, idx) => (
                <li key={idx} className="text-sm md:text-base font-light text-white/70 hover:text-white transition-colors border-b border-white/5 pb-2">
                  {alumno}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* GRUPO 6-B */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-3xl font-serif mb-8 text-[#0066cc] flex items-center gap-4">
              <span className="w-10 h-px bg-[#0066cc]"></span> Grupo 6-B
            </h3>
          </div>
          
          {/* Carrusel Horizontal 6-B */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 md:px-auto max-w-7xl mx-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[1, 2, 3, 4, 5].map((num) => (
              <div 
                key={`6b-${num}`} 
                className="min-w-[85%] md:min-w-[60%] aspect-[16/10] bg-cover bg-center rounded-xl snap-center shrink-0 grayscale hover:grayscale-0 transition-all duration-700 border border-white/10" 
                style={{ backgroundImage: `url('/6b-foto${num}.jpg')` }} 
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 mt-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {ALUMNOS_6B.map((alumno, idx) => (
                <li key={idx} className="text-sm md:text-base font-light text-white/70 hover:text-white transition-colors border-b border-white/5 pb-2">
                  {alumno}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. MENCIONES ESPECIALES */}
      <section className="py-32 px-6 bg-gradient-to-t from-black to-[#111]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl mb-16 text-white/50 uppercase tracking-widest text-sm">Menciones Especiales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {MENCIONES_ESPECIALES.map((mencion, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">{mencion.rol}</span>
                <span className="font-serif text-xl">{mencion.nombre}</span>
              </div>
            ))}
            <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Pta. Sociedad de Alumnos</span>
                <span className="font-serif text-xl">{EVENT_DATA.president}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
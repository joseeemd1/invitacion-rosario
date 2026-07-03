"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UnboxingGraduacion from "../../components/UnboxingGraduacion";
import CalendarButton from "../../components/CalendarButton";
import FloatingElements from "../../components/FloatingElements";
import GoldDust from "../../components/GoldDust";
import CustomCursor from "../../components/CustomCursor";
import { EVENT_DATA, MENCIONES_ESPECIALES, ITINERARIO, ALUMNOS_6A, ALUMNOS_6B } from "./data";
import * as LucideIcons from "lucide-react";

const noisePattern = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function GraduacionPage() {
  const [hasOpened, setHasOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log(e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent size={20} className="text-[#8B6508]" /> : <LucideIcons.CheckCircle size={20} className="text-[#8B6508]" />;
  };

  return (
    <>
      <CustomCursor />
      <audio ref={audioRef} src="/cancion-graduacion.mp3" loop />
      
      <UnboxingGraduacion 
        onOpen={() => setHasOpened(true)} 
        audioRef={audioRef} 
        setGlobalPlay={setIsPlaying} 
      />
      
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
        
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply" style={{ backgroundImage: noisePattern }} />
        
        {hasOpened && (
          <>
            <FloatingElements />
            <GoldDust />
          </>
        )}

        <AnimatePresence>
          {hasOpened && (
            <motion.button 
              onClick={(e) => { e.stopPropagation(); toggleMusic(); }}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center justify-center transition-all duration-500 border border-[#8B6508]/20 ${isPlaying ? 'bg-[#1C2321] text-[#D4AF37]' : 'bg-white text-[#8B6508]'}`}
            >
              {isPlaying ? <LucideIcons.Pause className="w-5 h-5" /> : <LucideIcons.Play className="w-5 h-5 ml-1" />}
            </motion.button>
          )}
        </AnimatePresence>

        {/* 1. HERO - CONTROL TIPOGRÁFICO ABSOLUTO */}
        <section className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-4 pt-10 z-10">
          <p className="font-montserrat text-sm md:text-base tracking-[0.6em] uppercase text-[#1C2321]/50 mb-8 font-semibold">
            Generación 2020 - 2026
          </p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="relative w-[340px] sm:w-[420px] md:w-[550px] lg:w-[650px] aspect-square mb-8"
          >
            <img 
              src="/logo-escuela.png" 
              alt="Logo Escuela" 
              className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
            />
          </motion.div>
          
          <div className="w-px h-16 bg-[#8B6508]/40 mb-8" />
          
          <h1 className="font-cormorant text-[#1C2321] leading-tight flex flex-col items-center">
            <span className="font-bold tracking-wide mb-2 uppercase text-4xl md:text-6xl">Generación</span>
            <span className="italic text-[#8B6508] font-medium text-3xl md:text-5xl mt-2">
              {/* Control de quiebre responsivo inyectado */}
              <span className="block md:inline">Maestra</span>
              <span className="hidden md:inline"> </span>
              <span className="block md:inline">Ángela Córdova Villegas</span>
            </span>
          </h1>
        </section>

        {/* 2. CARTA DE INVITACIÓN FORMAL */}
        <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto text-center">
          <LucideIcons.Quote size={40} className="mx-auto text-[#D4AF37] mb-8 opacity-50" />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="font-cormorant text-3xl md:text-5xl leading-relaxed text-[#1C2321]"
          >
            Tenemos el honor de convocarle a la culminación de nuestro ciclo académico. Acompáñenos a celebrar nuestro último pase de lista y el inicio de un nuevo legado.
          </motion.p>
        </section>

        {/* 3. LOCACIÓN Y CUENTA REGRESIVA */}
        <section className="relative z-10 py-20 px-4 md:px-12">
          <div className="max-w-6xl mx-auto bg-[#191D1C] rounded-[40px] p-6 sm:p-10 md:p-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none mix-blend-overlay" />
            
            <div className="flex-1 text-center lg:text-left z-10 w-full">
              <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] mb-4 font-bold">Ubicación & Fecha</p>
              <p className="font-cormorant text-4xl md:text-5xl text-white mb-2">{EVENT_DATA.location}</p>
              <p className="font-cormorant text-2xl text-white/70 mb-8 italic">15 de Julio • 05:30 PM</p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a href={EVENT_DATA.mapUrl} target="_blank" rel="noreferrer" className="px-6 md:px-8 py-4 bg-[#D4AF37] text-[#191D1C] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-white transition-colors duration-300 flex items-center gap-2">
                  <LucideIcons.MapPin size={14} /> Cómo Llegar
                </a>
                <CalendarButton eventData={EVENT_DATA} />
              </div>
            </div>

            <div className="w-full lg:w-auto z-10">
              <div className="flex w-full justify-between gap-2 md:gap-4">
                {[
                  { l: 'Días', v: timeLeft.days }, { l: 'Hrs', v: timeLeft.hours },
                  { l: 'Min', v: timeLeft.minutes }, { l: 'Seg', v: timeLeft.seconds }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center w-[23%] md:w-28 aspect-[3/4] md:aspect-auto md:h-36 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl shadow-inner backdrop-blur-md">
                    <span className="font-montserrat text-2xl md:text-5xl text-white font-light">{item.v.toString().padStart(2, '0')}</span>
                    <span className="font-montserrat text-[7px] md:text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] mt-2 md:mt-3 font-bold">{item.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. MENCIONES ESPECIALES (Ortografía Pura Restaurada) */}
        <section className="relative z-10 py-32 px-6 bg-[#FDFBF7]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-cormorant text-5xl md:text-6xl text-center mb-20 text-[#1C2321] font-medium">Menciones Especiales</h2>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {MENCIONES_ESPECIALES.map((mencion, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  key={idx} 
                  className="flex flex-col items-center bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#8B6508]/10 hover:-translate-y-2 transition-transform duration-500 w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-3rem)] max-w-sm"
                >
                  <span className="font-montserrat text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#8B6508] mb-6 font-bold text-center">
                    {mencion.rol}
                  </span>
                  {/* TEXTO RESTAURADO: Sin uppercase, tipografía Cormorant pura */}
                  <span className="font-cormorant text-2xl md:text-3xl text-[#1C2321] font-medium text-center leading-tight">
                    {mencion.nombre}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CARTA DE DESPEDIDA INYECTADA */}
        <section className="relative z-10 py-24 px-6 bg-white border-t border-[#8B6508]/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto relative"
          >
            <div className="bg-[#FDFBF7] p-10 md:p-16 rounded-bl-[80px] rounded-tr-[80px] shadow-2xl border border-[#D4AF37]/20 relative">
              <LucideIcons.Feather size={32} className="text-[#D4AF37] mb-8 opacity-80" />
              <h2 className="font-montserrat text-xs uppercase tracking-[0.5em] text-[#8B6508] mb-8 font-bold">Un Mensaje para el Futuro</h2>
              
              <p className="font-cormorant text-2xl md:text-4xl text-[#1C2321] leading-relaxed italic mb-12">
                "Hoy no solo terminamos un ciclo, cerramos una etapa llena de aprendizajes, juegos y amistad. El mundo que les espera es inmenso, y estamos seguros de que llevarán el nombre de esta escuela, y de esta generación, a lo más alto. Abran sus alas y vuelen lejos."
              </p>

              <div className="flex flex-col items-end border-t border-[#D4AF37]/20 pt-8 mt-8">
                <p className="font-cormorant text-4xl text-[#1C2321] mb-2 font-semibold italic">Mtra. Ángela Córdova Villegas</p>
                <p className="font-montserrat text-[9px] uppercase tracking-[0.3em] text-[#8B6508]">Madrina de Generación</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 5. ITINERARIO */}
        <section className="relative z-10 py-32 px-6 border-t border-[#8B6508]/10 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-cormorant text-5xl md:text-7xl text-center mb-24 text-[#1C2321] font-medium">Itinerario</h2>
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[5.5rem] md:before:ml-[7.5rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#8B6508]/30 before:to-transparent">
              {ITINERARIO.map((item: any, idx: number) => (
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  key={idx} 
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white border border-[#D4AF37] shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 hover:scale-110 transition-transform">
                    {renderIcon(item.icon)}
                  </div>
                  <div className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3.5rem)] bg-white p-8 rounded-3xl border border-[#8B6508]/10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300">
                    <div className="font-montserrat text-xs tracking-[0.3em] text-[#D4AF37] mb-3 font-bold">{item.time}</div>
                    <p className="font-cormorant text-3xl text-[#1C2321] font-medium">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. NUESTRO LEGADO (Truncate Purgado + Animación) */}
        <section className="relative z-10 py-32 border-t border-[#8B6508]/10 bg-[#FDFBF7]">
          <h2 className="font-cormorant text-6xl md:text-8xl text-center mb-8 text-[#1C2321] font-medium">Nuestro Legado</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-24 rounded-full" />
          
          <div className="w-full mb-32">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
              <h3 className="font-cormorant text-5xl md:text-6xl italic text-[#1C2321] mb-4">Lista de alumnos Sexto A</h3>
              <span className="font-montserrat text-xs tracking-[0.4em] uppercase text-[#8B6508] font-bold">{ALUMNOS_6A.length} Alumnos</span>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
              {[1, 2, 3, 4, 5].map((num) => {
                const src = `/6a-foto${num}.jpg`;
                return (
                  <div 
                    key={`6a-${num}`} 
                    onClick={() => setZoomedImg(src)}
                    className="min-w-[85%] md:min-w-[45%] aspect-[16/10] bg-cover bg-center rounded-3xl shadow-xl snap-center shrink-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(139,101,8,0.2)] cursor-zoom-in relative group" 
                    style={{ backgroundImage: `url('${src}')` }} 
                  >
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center">
                      <LucideIcons.ZoomIn size={48} className="text-white drop-shadow-lg" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LISTA 6-A FLUIDA */}
            <div className="max-w-7xl mx-auto px-6 mt-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
                {ALUMNOS_6A.map((alumno, idx) => (
                  <motion.li 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: (idx % 10) * 0.05 }} // Delay modular para no sobrecargar el renderizador
                    key={idx} 
                    className="font-montserrat text-[11px] md:text-xs lg:text-sm font-semibold uppercase tracking-[0.15em] text-[#1C2321] hover:text-[#8B6508] transition-colors border-b border-[#8B6508]/20 pb-3 flex justify-between items-end group cursor-default gap-4"
                  >
                    <span className="leading-snug max-w-[90%]">{alumno}</span>
                    <span className="font-montserrat text-[10px] font-bold text-[#1C2321]/30 group-hover:text-[#D4AF37] transition-colors shrink-0 mb-0.5">{(idx + 1).toString().padStart(2, '0')}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full pb-20">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
              <h3 className="font-cormorant text-5xl md:text-6xl italic text-[#1C2321] mb-4">Lista de alumnos Sexto B</h3>
              <span className="font-montserrat text-xs tracking-[0.4em] uppercase text-[#8B6508] font-bold">{ALUMNOS_6B.length} Alumnos</span>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
              {[1, 2, 3, 4, 5].map((num) => {
                const src = `/6b-foto${num}.jpg`;
                return (
                  <div 
                    key={`6b-${num}`} 
                    onClick={() => setZoomedImg(src)}
                    className="min-w-[85%] md:min-w-[45%] aspect-[16/10] bg-cover bg-center rounded-3xl shadow-xl snap-center shrink-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(139,101,8,0.2)] cursor-zoom-in relative group" 
                    style={{ backgroundImage: `url('${src}')` }} 
                  >
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center">
                      <LucideIcons.ZoomIn size={48} className="text-white drop-shadow-lg" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LISTA 6-B FLUIDA */}
            <div className="max-w-7xl mx-auto px-6 mt-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
                {ALUMNOS_6B.map((alumno, idx) => (
                  <motion.li 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: (idx % 10) * 0.05 }}
                    key={idx} 
                    className="font-montserrat text-[11px] md:text-xs lg:text-sm font-semibold uppercase tracking-[0.15em] text-[#1C2321] hover:text-[#8B6508] transition-colors border-b border-[#8B6508]/20 pb-3 flex justify-between items-end group cursor-default gap-4"
                  >
                    <span className="leading-snug max-w-[90%]">{alumno}</span>
                    <span className="font-montserrat text-[10px] font-bold text-[#1C2321]/30 group-hover:text-[#D4AF37] transition-colors shrink-0 mb-0.5">{(idx + 1).toString().padStart(2, '0')}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
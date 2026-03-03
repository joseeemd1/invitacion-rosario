"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Unboxing from "../components/Unboxing";
import { Clock, MapPin, Check, CalendarDays, Gift, Search, Users, CheckCircle, XCircle, Lock, MessageCircle, Instagram, Share2 } from "lucide-react";
import { supabase } from "../lib/supabase";

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

const InvitationContent = () => {
  // Estados del Buscador Dinámico
  const [busqueda, setBusqueda] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState<any[]>([]);
  const [invitadoEncontrado, setInvitadoEncontrado] = useState<any>(null);
  const [errorBusqueda, setErrorBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [confirmadoExitoso, setConfirmadoExitoso] = useState(false);
  
  const [respuestaFinal, setRespuestaFinal] = useState<{asiste: boolean, pases: number} | null>(null);

  const galleryRef = useRef(null);
  const { scrollYProgress: galleryScroll } = useScroll({ target: galleryRef, offset: ["start end", "end start"] });
  const yParallaxFast = useTransform(galleryScroll, [0, 1], ["-15%", "15%"]);
  const yParallaxSlow = useTransform(galleryScroll, [0, 1], ["15%", "-15%"]);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yHeroBg = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const opacityHeroText = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // BÚSQUEDA EN VIVO (Se ejecuta automáticamente al escribir)
  useEffect(() => {
    const buscarEnVivo = async () => {
      if (busqueda.length < 2) {
        setResultadosBusqueda([]);
        setErrorBusqueda("");
        return;
      }

      setCargando(true);
      setErrorBusqueda("");
      
      try {
        const { data, error } = await supabase
          .from("invitados_lista")
          .select("*")
          .ilike("nombre", `%${busqueda}%`)
          .order("nombre", { ascending: true });

        if (error) throw error;

        if (!data || data.length === 0) {
          setErrorBusqueda("No encontramos coincidencias. Intenta con un solo apellido.");
          setResultadosBusqueda([]);
        } else {
          setResultadosBusqueda(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    // Esperar 400ms después de que el usuario deje de teclear para no saturar la base de datos
    const delayDebounceFn = setTimeout(() => {
      buscarEnVivo();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [busqueda]);

  const seleccionarDeLista = (invitado: any) => {
    if (invitado.confirmado) {
      setErrorBusqueda("Esta invitación ya fue confirmada anteriormente.");
    } else {
      setInvitadoEncontrado(invitado);
      setResultadosBusqueda([]);
      setErrorBusqueda("");
      setBusqueda(""); // Limpiamos el buscador visualmente
    }
  };

  const handleConfirmacion = async (asiste: boolean) => {
    setCargando(true);
    try {
      const pases = asiste ? invitadoEncontrado.boletos : 0;
      
      const { error } = await supabase
        .from("invitados_lista")
        .update({
          confirmado: true,
          asiste: asiste,
          pases_confirmados: pases
        })
        .eq("id", invitadoEncontrado.id);

      if (error) throw error;

      setRespuestaFinal({ asiste, pases });
      setConfirmadoExitoso(true);
    } catch (err) {
      console.error(err);
      alert("Error al guardar respuesta. Intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  const limpiarBusqueda = () => {
    setBusqueda("");
    setResultadosBusqueda([]);
    setInvitadoEncontrado(null);
    setErrorBusqueda("");
  };

  // Función para compartir en redes usando tecnología nativa del celular
  const compartirPase = async () => {
    const shareData = {
      title: '¡Confirmo mi asistencia!',
      text: '¡Listos para celebrar los 50 años de Rosario! 🎉 Nos vemos el 18 de Abril.',
      url: 'https://mifestejo.mom',
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert("Tómale una captura de pantalla a este pase para subirlo a tu historia de Instagram. 📸");
      }
    } catch (err) {
      console.log("Error compartiendo:", err);
    }
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

      {/* 2. LAYOUT EDITORIAL */}
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

      {/* 3. DÓNDE Y CUÁNDO */}
      <section className="py-32 px-6 mx-auto max-w-5xl text-center border-b border-[#2A1A10]/10 bg-white/20 relative">
         <h2 className="font-serif text-5xl text-[#2A1A10] italic mb-20">Dónde & Cuándo</h2>
         <div className="grid gap-8 md:grid-cols-2 relative z-10">
            <div className="flex flex-col items-center bg-white/70 backdrop-blur-sm p-12 border border-[#2A1A10]/5 shadow-sm rounded-sm">
              <Clock className="h-10 w-10 text-[#C5A059] mb-6" strokeWidth={1}/>
              <h3 className="font-serif text-3xl text-[#2A1A10] mb-2">La Hora</h3>
              <p className="font-sans text-xl text-[#2A1A10]/80 font-medium mb-1">9:00 PM</p>
              <p className="text-xs text-[#2A1A10]/50 font-sans tracking-widest uppercase mt-2">Puntualidad sugerida</p>
            </div>
            <a href="https://maps.app.goo.gl/DQ6fdtyN6GaEFFrN8" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center bg-white/70 backdrop-blur-sm p-12 border border-[#2A1A10]/5 shadow-sm rounded-sm hover:shadow-lg transition-all duration-300 cursor-pointer group flex-grow">
              <MapPin className="h-14 w-14 text-[#C5A059] mb-6 group-hover:scale-110 transition-transform" strokeWidth={1}/>
              <h3 className="font-serif text-3xl text-[#2A1A10] mb-2">San Pedro Villadorada</h3>
              <p className="font-sans text-lg text-[#2A1A10]/80 font-medium mb-1">Terreno de la Palapa</p>
              <p className="text-[10px] md:text-xs text-[#2A1A10]/50 font-sans tracking-widest uppercase leading-relaxed mt-2 max-w-[250px]">
                Carretera a Zamora Km 2.2, entrada a la izquierda en Privada Villa Dorada.<br/>Atrás de David Fimbres y María del Rosario.
              </p>
              <span className="mt-6 text-[#C5A059] text-xs md:text-sm tracking-widest uppercase font-bold border-b border-[#C5A059]/30 pb-1 group-hover:border-[#C5A059] transition-colors">Ver en Google Maps</span>
            </a>
         </div>
         <div className="flex justify-center mt-12 relative z-10">
             <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cumplea%C3%B1os+50+de+Mar%C3%ADa+del+Rosario&dates=20260418T210000/20260419T020000&details=Celebraci%C3%B1on+especial+del+50+aniversario.&location=San+Pedro+Villadorada+/+Terreno+de+la+Palapa&sf=true&output=xml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#2A1A10] text-[#E1D4C0] px-8 py-4 rounded-full font-sans text-xs tracking-widest font-bold uppercase hover:bg-[#C5A059] hover:text-white transition-colors shadow-md active:scale-95 group">
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

      {/* 5. BUSCADOR VIP RSVP CON LISTA DE OPCIONES */}
      <section className="py-32 px-6 text-center relative bg-[#F4F0EA]">
         <div className="relative z-10 max-w-xl mx-auto">
             <p className="font-sans text-xs tracking-[0.4em] text-[#C5A059] uppercase mb-4 font-semibold">Lista Exclusiva</p>
             <h2 className="font-serif text-6xl text-[#2A1A10] italic mb-8">Acompáñame</h2>
             
             <AnimatePresence mode="wait">
               
               {/* ESTADO 1: ÉXITO AL CONFIRMAR (Pase VIP y Redes) */}
               {confirmadoExitoso ? (
                 <motion.div 
                   key="exito"
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-white border border-[#C5A059]/30 shadow-2xl rounded-sm flex flex-col items-center overflow-hidden"
                 >
                   {respuestaFinal?.asiste ? (
                     <>
                        {/* PASE VIP VISUAL (Ideal para Screenshot) */}
                        <div className="bg-[#2A1A10] w-full p-10 text-[#F4F0EA] relative overflow-hidden border-b-4 border-[#C5A059]">
                          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/noise.png')] mix-blend-overlay"></div>
                          <p className="text-[10px] tracking-[0.3em] uppercase mb-2 text-[#C5A059]">Confirmación Oficial</p>
                          <h3 className="font-serif text-4xl italic mb-6">¡Gracias!</h3>
                          
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-sm mb-4">
                            <p className="text-sm font-sans uppercase tracking-widest opacity-70 mb-1">Pase A Nombre De:</p>
                            <p className="font-serif text-2xl text-white">{invitadoEncontrado?.nombre}</p>
                          </div>
                          
                          <div className="flex justify-center items-center gap-4">
                            <div className="text-center">
                              <p className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Lugares</p>
                              <p className="font-serif text-3xl text-[#C5A059]">{respuestaFinal.pases}</p>
                            </div>
                            <div className="w-px h-10 bg-white/20"></div>
                            <div className="text-center">
                              <p className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Fecha</p>
                              <p className="font-serif text-xl mt-1">18 ABR</p>
                            </div>
                          </div>
                        </div>

                        {/* BOTONES SOCIALES */}
                        <div className="p-8 w-full flex flex-col gap-4 bg-white">
                          <p className="text-sm text-[#2A1A10]/70 mb-2 font-sans">
                            Toma captura de pantalla a tu pase y compártelo, o avísale a la festejada.
                          </p>
                          
                          <button onClick={compartirPase} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold py-4 rounded-sm tracking-widest uppercase text-[10px] hover:opacity-90 transition-opacity shadow-md">
                            <Instagram className="w-4 h-4" />
                            Subir a mi Historia
                          </button>

                          <a 
                            href={`https://wa.me/526622795755?text=¡Hola Rosario! Ya confirmamos nuestra asistencia a tu fiesta para los ${respuestaFinal.pases} lugares de: ${invitadoEncontrado?.nombre}. ¡Allá nos vemos! 🎉`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 rounded-sm tracking-widest uppercase text-[10px] hover:bg-[#128C7E] transition-colors shadow-md"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Avisar por WhatsApp
                          </a>
                        </div>
                     </>
                   ) : (
                     <div className="p-12 text-center w-full">
                        <div className="h-16 w-16 bg-[#F4F0EA] rounded-full flex items-center justify-center mb-6 mx-auto">
                          <Check className="h-8 w-8 text-[#C5A059]" />
                        </div>
                        <h3 className="font-serif text-3xl text-[#2A1A10] mb-2 italic">Gracias por avisar</h3>
                        <p className="font-sans text-[#2A1A10]/70 mb-8">Lamentamos que no nos puedan acompañar, los tendremos en el corazón.</p>
                        
                        <a 
                          href={`https://wa.me/526622795755?text=Hola Rosario, lamentablemente no podremos asistir (${invitadoEncontrado?.nombre}), pero te mandamos un fuerte abrazo y esperamos que la pases increíble.`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 px-6 rounded-sm tracking-widest uppercase text-[10px] hover:bg-[#128C7E] transition-colors shadow-md mx-auto"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Mandar mensaje a Rosario
                        </a>
                     </div>
                   )}
                 </motion.div>
               ) : 
               
               /* ESTADO 2: SELECCIÓN DE SÍ O NO (Una vez elegido el nombre) */
               invitadoEncontrado ? (
                 <motion.div 
                   key="decision"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="flex flex-col gap-6 text-center bg-white p-8 md:p-12 border border-[#C5A059]/30 shadow-2xl rounded-sm"
                 >
                   <div>
                     <p className="text-[10px] uppercase tracking-widest text-[#C5A059] mb-1">Invitación para</p>
                     <h3 className="font-serif text-3xl italic text-[#2A1A10]">{invitadoEncontrado.nombre}</h3>
                     
                     {/* ¡AQUÍ ES DONDE REVELAMOS LOS BOLETOS! */}
                     <div className="flex items-center justify-center gap-2 mt-4 bg-[#F4F0EA] py-3 rounded-sm border border-[#2A1A10]/5">
                       <Users className="w-5 h-5 text-[#C5A059]" />
                       <span className="font-sans text-sm text-[#2A1A10]">Se han reservado <strong>{invitadoEncontrado.boletos} lugares</strong> para ustedes</span>
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4 mt-4">
                     <button 
                       onClick={() => handleConfirmacion(true)}
                       disabled={cargando}
                       className="bg-[#2A1A10] text-white py-4 rounded-sm flex flex-col items-center justify-center gap-2 hover:bg-[#C5A059] transition-colors shadow-md disabled:opacity-50"
                     >
                       <CheckCircle className="w-5 h-5" />
                       <span className="text-[10px] uppercase font-bold tracking-widest">Sí Asistiremos</span>
                     </button>
                     
                     <button 
                       onClick={() => handleConfirmacion(false)}
                       disabled={cargando}
                       className="bg-white border border-[#2A1A10]/10 text-[#2A1A10] py-4 rounded-sm flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
                     >
                       <XCircle className="w-5 h-5 text-[#2A1A10]/50" />
                       <span className="text-[10px] uppercase font-bold tracking-widest text-[#2A1A10]/70">No podremos</span>
                     </button>
                   </div>

                   <button 
                     onClick={limpiarBusqueda}
                     className="mt-4 text-[10px] uppercase tracking-widest text-[#2A1A10]/40 font-bold hover:text-[#C5A059] transition-colors"
                   >
                     Volver atrás
                   </button>
                 </motion.div>
               ) : 
               
               /* ESTADO 3: BUSCADOR INICIAL Y LISTA DE RESULTADOS EN VIVO */
               (
                 <motion.div 
                   key="buscador"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="flex flex-col gap-5 text-left bg-white p-6 md:p-12 border border-[#2A1A10]/10 shadow-xl rounded-sm"
                 >
                   <p className="mb-2 text-center font-sans text-[#2A1A10]/70 text-sm md:text-base leading-relaxed">
                     Escribe tu apellido para encontrar tu invitación.
                   </p>
                   
                   <div className="relative">
                       <input 
                         type="text" 
                         value={busqueda}
                         onChange={(e) => setBusqueda(e.target.value)}
                         placeholder="Ej. Monge o Figueroa" 
                         className="w-full bg-[#F4F0EA]/50 border border-[#2A1A10]/10 p-4 pl-12 text-[#2A1A10] placeholder:text-[#2A1A10]/40 focus:outline-none focus:border-[#C5A059] transition font-sans text-sm rounded-sm uppercase" 
                       />
                       <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${cargando ? 'text-[#2A1A10] animate-pulse' : 'text-[#C5A059]'}`} />
                   </div>
                   
                   {/* LISTA DE RESULTADOS (SIN MOSTRAR BOLETOS) */}
                   {resultadosBusqueda.length > 0 && (
                     <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-2 mt-2 custom-scrollbar">
                       <p className="text-[10px] uppercase tracking-widest text-[#C5A059] mb-1 font-bold">Selecciona tu familia:</p>
                       {resultadosBusqueda.map((invitado) => (
                         <button
                           key={invitado.id}
                           onClick={() => seleccionarDeLista(invitado)}
                           disabled={invitado.confirmado}
                           className={`p-4 border rounded-sm text-left flex justify-between items-center transition-all ${
                             invitado.confirmado 
                               ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-70' 
                               : 'bg-white border-[#2A1A10]/10 hover:border-[#C5A059] hover:bg-[#F4F0EA]/30'
                           }`}
                         >
                           <span className="font-bold text-[#2A1A10] text-sm">{invitado.nombre}</span>
                           {invitado.confirmado ? (
                             <Lock className="w-4 h-4 text-gray-400" />
                           ) : (
                             <CheckCircle className="w-5 h-5 text-[#C5A059]/30" />
                           )}
                         </button>
                       ))}
                     </div>
                   )}

                   {errorBusqueda && (
                     <p className="text-red-500 text-[10px] uppercase font-bold text-center tracking-widest mt-2">{errorBusqueda}</p>
                   )}
                 </motion.div>
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
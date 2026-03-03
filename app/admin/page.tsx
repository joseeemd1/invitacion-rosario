"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Users, Lock, LogOut, RefreshCcw, CheckCircle, XCircle, Clock, RotateCcw } from "lucide-react";

type Invitado = {
  id: string;
  nombre: string;
  boletos: number;
  confirmado: boolean;
  asiste: boolean | null;
  pases_confirmados: number;
};

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros para las listas
  const invitadosSi = invitados.filter(i => i.confirmado && i.asiste);
  const invitadosNo = invitados.filter(i => i.confirmado && !i.asiste);
  const invitadosPendientes = invitados.filter(i => !i.confirmado);

  // Estadísticas (por número de boletos)
  const totalPases = invitados.reduce((sum, i) => sum + i.boletos, 0);
  const pasesConfirmados = invitadosSi.reduce((sum, i) => sum + i.pases_confirmados, 0);
  const pasesCancelados = invitadosNo.reduce((sum, i) => sum + i.boletos, 0);
  const pasesPendientes = invitadosPendientes.reduce((sum, i) => sum + i.boletos, 0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "rosario50") {
      setIsAuthenticated(true);
      fetchInvitados();
    } else {
      setErrorLogin(true);
      setTimeout(() => setErrorLogin(false), 2000);
    }
  };

  const fetchInvitados = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("invitados_lista")
        .select("*")
        .order("nombre", { ascending: true });

      if (error) throw error;
      setInvitados(data || []);
    } catch (error) {
      console.error("Error al cargar invitados:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función estrella: Permitir que un invitado vuelva a votar si se equivocó
  const handleReset = async (id: string, nombre: string) => {
    const isConfirmed = window.confirm(
      `¿Deseas reiniciar a "${nombre}"? Podrán volver a buscarse y confirmar desde cero.`
    );
    
    if (isConfirmed) {
      try {
        const { error } = await supabase
          .from("invitados_lista")
          .update({
            confirmado: false,
            asiste: null,
            pases_confirmados: 0
          })
          .eq("id", id);

        if (error) throw error;
        fetchInvitados(); // Recargamos la lista
      } catch (error) {
        console.error("Error al reiniciar:", error);
        alert("Hubo un error al actualizar.");
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setInvitados([]);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#F4F0EA] flex items-center justify-center p-4 font-sans text-[#2A1A10]">
        <div className="bg-white p-10 shadow-2xl rounded-sm max-w-sm w-full border border-[#2A1A10]/10 text-center">
          <div className="mx-auto w-16 h-16 bg-[#2A1A10] rounded-full flex items-center justify-center mb-6">
            <Lock className="text-[#C5A059] w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl italic mb-2 text-[#2A1A10]">Acceso VIP</h1>
          <p className="text-xs tracking-widest uppercase text-[#2A1A10]/50 mb-8">Lista de Invitados</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-[#F4F0EA]/50 border ${errorLogin ? 'border-red-500' : 'border-[#2A1A10]/10'} p-4 text-center text-[#2A1A10] focus:outline-none focus:border-[#C5A059] transition rounded-sm`}
            />
            {errorLogin && <p className="text-red-500 text-xs uppercase tracking-widest">Código incorrecto</p>}
            
            <button type="submit" className="w-full bg-[#C5A059] text-white font-bold py-4 rounded-sm tracking-[0.2em] uppercase text-xs hover:bg-[#2A1A10] transition-colors mt-2 active:scale-95">
              Entrar
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F0EA] font-sans text-[#2A1A10] pb-20">
      <header className="bg-white border-b border-[#2A1A10]/10 sticky top-0 z-10 px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="font-serif text-2xl italic text-[#2A1A10]">Panel de Control</h1>
          <p className="text-[10px] uppercase tracking-widest text-[#C5A059]">Rosario 50 Años</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={fetchInvitados} className="text-[#C5A059] hover:text-[#2A1A10] transition-colors p-2" title="Actualizar">
            <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={handleLogout} className="text-[#2A1A10]/50 hover:text-red-500 transition-colors p-2" title="Salir">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        
        {/* DASHBOARD DE ESTADÍSTICAS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-6 shadow-md border border-[#2A1A10]/5 rounded-sm flex flex-col items-center justify-center text-center">
            <Users className="w-6 h-6 text-[#2A1A10]/40 mb-2" />
            <span className="text-3xl md:text-4xl font-serif text-[#2A1A10] mb-1">{totalPases}</span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#2A1A10]/50">Total Pases</span>
          </div>
          <div className="bg-green-50 p-6 shadow-md border border-green-100 rounded-sm flex flex-col items-center justify-center text-center">
            <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-3xl md:text-4xl font-serif text-green-700 mb-1">{pasesConfirmados}</span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-green-700/70">Asistirán</span>
          </div>
          <div className="bg-red-50 p-6 shadow-md border border-red-100 rounded-sm flex flex-col items-center justify-center text-center">
            <XCircle className="w-6 h-6 text-red-500 mb-2" />
            <span className="text-3xl md:text-4xl font-serif text-red-600 mb-1">{pasesCancelados}</span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-red-600/70">Cancelados</span>
          </div>
          <div className="bg-amber-50 p-6 shadow-md border border-amber-100 rounded-sm flex flex-col items-center justify-center text-center">
            <Clock className="w-6 h-6 text-amber-500 mb-2" />
            <span className="text-3xl md:text-4xl font-serif text-amber-600 mb-1">{pasesPendientes}</span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-amber-600/70">Pendientes</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#2A1A10]/50 text-sm tracking-widest uppercase">
            Cargando base de datos...
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* COLUMNA: ASISTIRÁN */}
            <div className="flex flex-col gap-3">
              <h2 className="font-serif text-xl italic text-green-700 border-b border-green-200 pb-2 mb-2 flex items-center justify-between">
                Confirmados <span>({invitadosSi.length})</span>
              </h2>
              {invitadosSi.map((invitado) => (
                <div key={invitado.id} className="bg-white p-4 border border-green-200 rounded-sm shadow-sm flex justify-between items-center group">
                  <div className="flex flex-col">
                    <span className="font-bold text-[#2A1A10] text-sm">{invitado.nombre}</span>
                    <span className="text-[10px] uppercase tracking-widest text-green-600 mt-1">{invitado.pases_confirmados} Pases</span>
                  </div>
                  <button onClick={() => handleReset(invitado.id, invitado.nombre)} className="text-gray-300 hover:text-amber-500 transition-colors opacity-0 group-hover:opacity-100 p-2" title="Deshacer confirmación">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* COLUMNA: CANCELADOS */}
            <div className="flex flex-col gap-3">
              <h2 className="font-serif text-xl italic text-red-600 border-b border-red-200 pb-2 mb-2 flex items-center justify-between">
                Cancelados <span>({invitadosNo.length})</span>
              </h2>
              {invitadosNo.map((invitado) => (
                <div key={invitado.id} className="bg-white p-4 border border-red-200 rounded-sm shadow-sm flex justify-between items-center group">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-500 text-sm line-through decoration-red-300">{invitado.nombre}</span>
                    <span className="text-[10px] uppercase tracking-widest text-red-400 mt-1">{invitado.boletos} Pases liberados</span>
                  </div>
                  <button onClick={() => handleReset(invitado.id, invitado.nombre)} className="text-gray-300 hover:text-amber-500 transition-colors opacity-0 group-hover:opacity-100 p-2" title="Deshacer confirmación">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* COLUMNA: PENDIENTES */}
            <div className="flex flex-col gap-3">
              <h2 className="font-serif text-xl italic text-amber-600 border-b border-amber-200 pb-2 mb-2 flex items-center justify-between">
                Faltan por responder <span>({invitadosPendientes.length})</span>
              </h2>
              {invitadosPendientes.map((invitado) => (
                <div key={invitado.id} className="bg-white/50 p-4 border border-amber-200/50 rounded-sm shadow-sm flex justify-between items-center opacity-70">
                  <div className="flex flex-col">
                    <span className="font-bold text-[#2A1A10] text-sm">{invitado.nombre}</span>
                    <span className="text-[10px] uppercase tracking-widest text-amber-600 mt-1">{invitado.boletos} Pases en espera</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
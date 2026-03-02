"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Users, Lock, LogOut, RefreshCcw, UserCircle, Trash2, AlertTriangle, UserX } from "lucide-react";

type Guest = {
  id: string;
  full_name: string;
  companions: number;
  created_at: string;
  device_id: string;
};

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  const totalAttendees = guests.reduce((sum, guest) => sum + guest.companions, 0);

  const deviceCounts = guests.reduce((acc: Record<string, number>, guest) => {
    if (guest.device_id) {
      acc[guest.device_id] = (acc[guest.device_id] || 0) + 1;
    }
    return acc;
  }, {});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "rosario50") {
      setIsAuthenticated(true);
      fetchGuests();
    } else {
      setErrorLogin(true);
      setTimeout(() => setErrorLogin(false), 2000);
    }
  };

  const fetchGuests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGuests(data || []);
    } catch (error) {
      console.error("Error al cargar invitados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearTests = async () => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de que quieres BORRAR TODAS LAS PRUEBAS? Esto vaciará la lista de invitados por completo."
    );
    
    if (isConfirmed) {
      setLoading(true);
      try {
        const { error } = await supabase
          .from("guests")
          .delete()
          .neq("id", "00000000-0000-0000-0000-000000000000");

        if (error) throw error;
        setGuests([]);
        alert("Base de datos limpia.");
      } catch (error) {
        console.error("Error al limpiar:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // NUEVA FUNCIÓN: Eliminar un solo registro
  const handleDeleteGuest = async (id: string, name: string) => {
    const isConfirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar la confirmación de "${name}"? Esta acción no se puede deshacer.`
    );
    
    if (isConfirmed) {
      try {
        // Mostramos un estado de carga local rápido
        const { error } = await supabase
          .from("guests")
          .delete()
          .eq("id", id); // Borramos exactamente el ID que seleccionaste

        if (error) throw error;
        
        // Actualizamos la lista automáticamente sin recargar la página
        setGuests(guests.filter(guest => guest.id !== id));
      } catch (error) {
        console.error("Error al eliminar invitado:", error);
        alert("Hubo un error al eliminar el registro.");
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setGuests([]);
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
        <button onClick={handleLogout} className="text-[#2A1A10]/50 hover:text-red-500 transition-colors p-2">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white p-6 shadow-md border border-[#2A1A10]/5 rounded-sm flex flex-col items-center justify-center text-center">
            <Users className="w-6 h-6 text-[#C5A059] mb-2" />
            <span className="text-4xl font-serif text-[#2A1A10] mb-1">{totalAttendees}</span>
            <span className="text-[10px] uppercase tracking-widest text-[#2A1A10]/50">Lugares Totales</span>
          </div>
          <div className="bg-white p-6 shadow-md border border-[#2A1A10]/5 rounded-sm flex flex-col items-center justify-center text-center">
            <UserCircle className="w-6 h-6 text-[#C5A059] mb-2" />
            <span className="text-4xl font-serif text-[#2A1A10] mb-1">{guests.length}</span>
            <span className="text-[10px] uppercase tracking-widest text-[#2A1A10]/50">Familias/Grupos</span>
          </div>
        </div>

        <div className="flex justify-between items-end mb-4 px-2">
          <h2 className="font-serif text-2xl italic text-[#2A1A10]">Confirmaciones</h2>
          
          <div className="flex gap-4">
            <button 
              onClick={handleClearTests}
              className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-red-500 font-bold hover:text-red-700 transition-colors bg-red-50 px-2 py-1 rounded"
            >
              <Trash2 className="w-3 h-3" />
              Limpiar Pruebas
            </button>

            <button 
              onClick={fetchGuests}
              className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#C5A059] font-bold hover:text-[#2A1A10] transition-colors"
            >
              <RefreshCcw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#2A1A10]/50 text-sm tracking-widest uppercase">
            Cargando lista...
          </div>
        ) : guests.length === 0 ? (
          <div className="bg-white p-10 text-center border border-[#2A1A10]/10 rounded-sm shadow-sm">
            <p className="text-[#2A1A10]/50 text-sm">Aún no hay invitados confirmados.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {guests.map((guest) => {
              const isDuplicate = guest.device_id && deviceCounts[guest.device_id] > 1;

              return (
                <div key={guest.id} className={`bg-white p-5 border ${isDuplicate ? 'border-amber-500' : 'border-[#2A1A10]/10'} rounded-sm shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow relative overflow-hidden`}>
                  
                  {isDuplicate && (
                    <div className="bg-amber-100 text-amber-700 text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm flex items-center gap-1 self-start">
                      <AlertTriangle className="w-3 h-3" />
                      Mismo celular (Posible copia)
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#2A1A10] uppercase text-sm">{guest.full_name}</span>
                      <span className="text-[10px] text-[#2A1A10]/50 tracking-wider">
                        {new Date(guest.created_at).toLocaleDateString('es-MX', { 
                          day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' 
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {/* NUEVO BOTÓN PARA BORRAR REGISTRO INDIVIDUAL */}
                      <button 
                        onClick={() => handleDeleteGuest(guest.id, guest.full_name)}
                        className="text-[#2A1A10]/30 hover:text-red-500 transition-colors p-2"
                        title="Eliminar este invitado"
                      >
                        <UserX className="w-5 h-5" />
                      </button>

                      <div className="bg-[#F4F0EA] text-[#C5A059] px-4 py-2 rounded-sm font-bold border border-[#C5A059]/20 flex flex-col items-center min-w-[60px]">
                        <span className="text-xl leading-none">{guest.companions}</span>
                        <span className="text-[8px] uppercase tracking-widest mt-1">Pases</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
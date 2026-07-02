"use client";
import { CalendarPlus } from "lucide-react";

export default function CalendarButton({ eventData }: { eventData: any }) {
  const generateICS = () => {
    const formatDate = (dateString: string) => {
      const d = new Date(dateString);
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const start = formatDate(eventData.date);
    const end = formatDate(new Date(new Date(eventData.date).getTime() + 2 * 60 * 60 * 1000).toISOString());

    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Generación ${eventData.generation}//ES\nBEGIN:VEVENT\nUID:${new Date().getTime()}@migraduacion.pro\nDTSTAMP:${start}\nDTSTART:${start}\nDTEND:${end}\nSUMMARY:Graduación ${eventData.school}\nDESCRIPTION:Graduación Generación ${eventData.nameGeneration}\nLOCATION:${eventData.location}\nEND:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'graduacion_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={generateICS}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors duration-300"
    >
      <CalendarPlus size={14} /> Agendar
    </button>
  );
}
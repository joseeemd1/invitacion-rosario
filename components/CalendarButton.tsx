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

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Generación ${eventData.generation}//ES
BEGIN:VEVENT
UID:${new Date().getTime()}@migraduacion.pro
DTSTAMP:${start}
DTSTART:${start}
DTEND:${end}
SUMMARY:Graduación ${eventData.school}
DESCRIPTION:Graduación Generación ${eventData.nameGeneration}
LOCATION:${eventData.location}
END:VEVENT
END:VCALENDAR`;

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
      className="inline-flex items-center space-x-2 bg-transparent border border-[#1A1A1A] text-[#1A1A1A] px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-[#F7F5F0] transition-colors"
    >
      <CalendarPlus size={14} />
      <span>Agendar Evento</span>
    </button>
  );
}
"use client";
import { motion } from "framer-motion";
import { GraduationCap, Scroll, Star } from "lucide-react";

export default function FloatingElements() {
  // Matriz de coordenadas calculadas para evitar colpo de calor en GPU
  const elements = [
    { Icon: GraduationCap, top: "15%", left: "10%", delay: 0, size: 32 },
    { Icon: Scroll, top: "45%", left: "85%", delay: 1.5, size: 28 },
    { Icon: Star, top: "75%", left: "15%", delay: 3, size: 24 },
    { Icon: GraduationCap, top: "25%", left: "80%", delay: 2, size: 40 },
    { Icon: Scroll, top: "85%", left: "75%", delay: 0.5, size: 32 },
    { Icon: Star, top: "35%", left: "5%", delay: 2.5, size: 20 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      {elements.map((el, idx) => (
        <motion.div
          key={idx}
          className="absolute text-[#8B6508]"
          style={{ top: el.top, left: el.left }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        >
          <el.Icon size={el.size} strokeWidth={1} />
        </motion.div>
      ))}
    </div>
  );
}
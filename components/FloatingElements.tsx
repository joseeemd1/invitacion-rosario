"use client";
import { motion } from "framer-motion";
import { GraduationCap, Scroll, Star } from "lucide-react";

export default function FloatingElements() {
  const elements = [
    { Icon: GraduationCap, top: "15%", left: "10%", delay: 0, size: 64 },
    { Icon: Scroll, top: "45%", left: "85%", delay: 1.5, size: 56 },
    { Icon: Star, top: "75%", left: "15%", delay: 3, size: 48 },
    { Icon: GraduationCap, top: "25%", left: "80%", delay: 2, size: 72 },
    { Icon: Scroll, top: "85%", left: "75%", delay: 0.5, size: 64 },
    { Icon: Star, top: "35%", left: "5%", delay: 2.5, size: 40 },
  ];

  return (
    // CAMBIO CRÍTICO: Elevación a z-[40] absoluta
    <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden opacity-40">
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
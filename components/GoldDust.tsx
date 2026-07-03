"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GoldDust() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const p = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 5,
    }));
    setParticles(p);
  }, []);

  return (
    // CAMBIO CRÍTICO: Elevación a z-[40] absoluta
    <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-[#D4AF37] rounded-full blur-[1px]"
          style={{ 
            left: p.left, 
            top: p.top, 
            width: `${p.size}px`, 
            height: `${p.size}px` 
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 0.7, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
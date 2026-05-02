'use client';

import { motion } from 'framer-motion';
import { Cpu, Zap } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617]">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] animate-pulse [animation-delay:1s]" />

      <div className="relative flex flex-col items-center">
        {/* Animated Icon Container */}
        <div className="relative w-24 h-24 mb-8">
          {/* Outer Rotating Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full"
          />
          
          {/* Inner Pulsing Ring */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-2 border-2 border-primary/50 rounded-full"
          />

          {/* Central Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [0.9, 1.1, 0.9],
                filter: ["drop-shadow(0 0 0px #6366f1)", "drop-shadow(0 0 15px #6366f1)", "drop-shadow(0 0 0px #6366f1)"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cpu className="text-primary" size={40} />
            </motion.div>
          </div>

          {/* Scanning Line */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-[-10%] right-[-10%] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-10 opacity-50"
          />
        </div>

        {/* Text Loader */}
        <div className="text-center space-y-3">
          <motion.h2 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white font-black text-xl uppercase tracking-[0.2em]"
          >
            Initializing <span className="text-primary">Engine</span>
          </motion.h2>
          
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Zap size={12} className="text-secondary animate-pulse" />
              Loading Semantic Models
            </span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span 
                  key={i}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 h-1 rounded-full bg-primary"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar (Indeterminate) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </div>
    </div>
  );
}

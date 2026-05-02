'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ImageComparisonSliderProps {
  originalSrc: string;
  overlaySrc: string;
}

export default function ImageComparisonSlider({ originalSrc, overlaySrc }: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="relative w-full overflow-hidden rounded-[2rem] select-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[16/9] md:aspect-[21/9] group/slider cursor-ew-resize"
      ref={containerRef}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* Background Image (Original) */}
      <Image 
        src={originalSrc} 
        alt="Original Scene" 
        fill 
        priority
        className="object-cover pointer-events-none brightness-90 group-hover/slider:brightness-100 transition-all duration-700"
      />

      {/* Foreground Image (Overlay) with clip-path */}
      <div 
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image 
          src={overlaySrc} 
          alt="Segmented Scene" 
          fill 
          priority
          className="object-cover"
        />
      </div>

      {/* Slider Handle Line */}
      <div 
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-white/50 backdrop-blur-sm pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      />

      {/* Slider Handle Knob */}
      <motion.div 
        animate={{ 
          scale: isDragging ? 1.2 : 1,
          backgroundColor: isDragging ? "var(--primary)" : "white"
        }}
        className="absolute top-1/2 z-30 flex items-center justify-center w-12 h-12 -translate-y-1/2 bg-white rounded-full shadow-2xl pointer-events-none border-4 border-black/10"
        style={{ left: `${sliderPosition}%`, transform: 'translate(-50%, -50%)' }}
      >
        <div className="flex items-center gap-0.5 text-slate-900 group-hover:text-primary transition-colors">
          <ChevronLeft size={18} strokeWidth={3} className={isDragging ? "text-white" : ""} />
          <ChevronRight size={18} strokeWidth={3} className={isDragging ? "text-white" : ""} />
        </div>
      </motion.div>
      
      {/* Labels */}
      <AnimatePresence>
        {!isDragging && (
          <>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute z-20 px-4 py-2 text-[10px] font-black tracking-[0.2em] text-white uppercase rounded-full shadow-2xl bottom-6 left-6 bg-primary/80 backdrop-blur-xl border border-white/20 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Segmented
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute z-20 px-4 py-2 text-[10px] font-black tracking-[0.2em] text-white uppercase rounded-full shadow-2xl bottom-6 right-6 bg-black/60 backdrop-blur-xl border border-white/10"
            >
              Original
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="absolute top-6 right-6 z-20 text-white/40 hover:text-white transition-colors opacity-0 group-hover/slider:opacity-100 duration-500">
        <Maximize2 size={20} />
      </div>
    </div>
  );
}

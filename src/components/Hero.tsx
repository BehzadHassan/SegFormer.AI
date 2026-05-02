'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ChevronRight, ArrowRight, ShieldCheck, Zap, Eye } from 'lucide-react';
import ImageComparisonSlider from './ImageComparisonSlider';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      <div className="glow-background opacity-30" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full text-center z-10"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          State-of-the-art SegFormer-B5 Architecture
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tight text-white mb-6 leading-[1.1] text-gradient"
        >
          Precision <span className="text-gradient-primary">Road Scene</span> Segmentation
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Leveraging Transformer-based architectures to deliver pixel-perfect semantic understanding of urban environments, trained on the comprehensive Cityscapes dataset.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 md:mb-24"
        >
          <Link href="/demo">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99,102,241,0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group w-full sm:w-auto"
            >
              Launch Live Demo
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          <motion.a 
            href="#details" 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            View Project Details
            <ChevronRight size={20} className="text-slate-500" />
          </motion.a>
        </motion.div>

        {/* Visual Showcase */}
        <motion.div 
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden glass-effect border border-white/10 p-4 group animate-float"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <ImageComparisonSlider 
            originalSrc="/images/hero_original.png" 
            overlaySrc="/images/hero_overlay.png" 
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

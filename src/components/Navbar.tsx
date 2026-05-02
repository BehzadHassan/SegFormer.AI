'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Play, Cpu, Menu, X } from 'lucide-react';
import SettingsModal from './SettingsModal';

export default function Navbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Technology', href: '#tech' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 glass-effect m-4 rounded-2xl border border-white/5"
      >
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20"
          >
            <Cpu size={20} className="text-white" />
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-white">
            SegFormer<span className="text-primary">.AI</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="relative text-slate-400 hover:text-white transition-colors group py-2"
            >
              {link.name}
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary rounded-full transition-all group-hover:w-full"
              />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors border border-transparent hover:border-white/10"
            title="API Settings"
          >
            <Settings size={20} />
          </motion.button>
          
          <Link href="/demo" className="hidden sm:block">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(79,70,229,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold transition-all flex items-center gap-2"
            >
              <Play size={16} fill="currentColor" />
              Try Demo
            </motion.button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors md:hidden"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-[45] md:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            <div className="absolute top-24 right-4 left-4 p-8 glass-effect rounded-[2rem] border border-white/10 flex flex-col gap-8 shadow-2xl">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-bold text-white hover:text-primary transition-colors flex items-center justify-between"
                  >
                    {link.name}
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <Play size={14} className="text-slate-500" fill="currentColor" />
                    </div>
                  </Link>
                ))}
              </div>
              <div className="h-px bg-white/10" />
              <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm">
                  Launch Demo
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}

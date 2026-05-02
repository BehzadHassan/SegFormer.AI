'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Settings as SettingsIcon, 
  Search, 
  Maximize2, 
  X, 
  Cpu, 
  Clock, 
  Layers, 
  Zap,
  CheckCircle2,
  AlertCircle,
  Play,
  Download,
  ExternalLink,
  PlayCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useApiConfig } from '@/context/ApiConfigContext';
import { toast } from 'sonner';

export default function DemoPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [results, setResults] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string } | null>(null);
  const { apiBaseUrl, setApiBaseUrl } = useApiConfig();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults(null);
    }
  };

  const downloadImage = (base64Data: string, filename: string) => {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error('Missing Input', {
        description: 'Please select or upload an image first.'
      });
      return;
    }

    if (!apiBaseUrl) {
      toast.warning('Backend Configuration Required', {
        description: 'Please set your FastAPI backend URL in settings or the input field above.',
        action: {
          label: 'Setup',
          onClick: () => (document.querySelector('[title="API Settings"]') as HTMLButtonElement)?.click()
        }
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    const promise = fetch(`/api/segment`, {
      method: 'POST',
      headers: {
        'x-api-url': apiBaseUrl
      },
      body: formData,
    });

    toast.promise(promise, {
      loading: 'Connecting to inference node...',
      success: async (response) => {
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.error || response.statusText);
        }
        const data = await response.json();
        setResults(data);
        return 'Analysis complete! Results loaded.';
      },
      error: (err) => {
        setLoading(false);
        return `Backend Error: ${err.message || 'Failed to connect'}`;
      },
      finally: () => setLoading(false)
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <Navbar />
      <div className="glow-background opacity-20" />

      <div className="max-w-7xl mx-auto">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Zap size={14} fill="currentColor" />
            Live Inference Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Model <span className="text-gradient-primary">Playground</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
            Experience the precision of SegFormer-B5 by uploading urban scene images for real-time semantic analysis.
          </p>
        </motion.header>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Upload Section */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4"
          >
            <div className="glass-effect rounded-[2.5rem] p-8 border border-white/5 h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Upload size={120} strokeWidth={1} />
              </div>

              <div className="mb-8 relative">
                <div className="flex items-center gap-2 mb-4">
                  <SettingsIcon size={18} className="text-primary" />
                  <label className="text-sm font-bold text-white uppercase tracking-wider">Backend Node</label>
                </div>
                <input
                  type="text"
                  value={apiBaseUrl}
                  onChange={(e) => setApiBaseUrl(e.target.value)}
                  placeholder="https://xxxx-xx-xx-xx.ngrok-free.app"
                  className="w-full px-5 py-4 text-white transition-all bg-black/40 border-2 rounded-2xl border-white/5 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none font-mono text-sm"
                />
                <p className="mt-3 text-[11px] text-slate-500 font-medium italic">
                  * Ensure your FastAPI backend is running and exposed via Ngrok.
                </p>
              </div>

              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Layers size={20} className="text-secondary" />
                Input Source
              </h2>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative aspect-square rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 cursor-pointer overflow-hidden ${
                  previewUrl ? 'border-primary/50 bg-primary/5 shadow-2xl shadow-primary/10' : 'border-white/10 bg-white/[0.02] hover:border-primary/30'
                }`}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                {previewUrl ? (
                  <div className="relative w-full h-full group/preview">
                    <Image src={previewUrl} alt="Preview" fill className="object-cover rounded-[1.5rem]" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-bold text-sm">Replace Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                      <Upload className="text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-white font-bold mb-1">Click to browse</p>
                    <p className="text-slate-500 text-xs">PNG, JPG or JPEG (max. 10MB)</p>
                  </div>
                )}
                <input 
                  id="file-upload"
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </motion.div>

              {/* Backend Help Box */}
              <div className="mt-8 p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4">
                <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <PlayCircle size={14} className="text-primary" />
                  Backend Setup Guide
                </h3>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                  To run the model, click the link below to open the backend in Google Colab. Add your <span className="text-white">NGROK_AUTHTOKEN</span>, run all cells, and paste the URL here.
                </p>
                <a 
                  href="https://colab.research.google.com/drive/1laDHS9Mo_9MvWf9oZXEqS6SVPiCn7HjD?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
                >
                  <span className="text-[11px] font-bold text-white">Open in Colab</span>
                  <ExternalLink size={12} className="text-slate-500 group-hover:text-primary transition-colors" />
                </a>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(99,102,241,0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!selectedFile || loading}
                className={`w-full mt-8 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.1em] text-sm transition-all flex items-center justify-center gap-3 ${
                  !selectedFile || loading 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5' 
                  : 'bg-primary text-white shadow-xl shadow-primary/20'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing Pipeline...
                  </>
                ) : (
                  <>
                    <Play fill="currentColor" size={16} />
                    Execute Inference
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8"
          >
            <div className="glass-effect rounded-[2.5rem] p-6 md:p-10 border border-white/5 h-full min-h-[600px] flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Search size={18} className="text-secondary" />
                  </div>
                  Semantic Output
                </h2>
                {results && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-[10px] font-black uppercase tracking-wider">
                      <CheckCircle2 size={14} />
                      Complete
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        downloadImage(results.mask_b64, 'segmentation_mask.png');
                        downloadImage(results.overlay_b64, 'segmentation_overlay.png');
                      }}
                      className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-2 transition-all"
                    >
                      <Download size={14} />
                      Download All
                    </motion.button>
                  </div>
                )}
              </div>
              
              <AnimatePresence mode="wait">
                {!results && !loading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/5 rounded-[2rem] bg-white/[0.01]"
                  >
                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 opacity-30">
                      <Layers size={40} />
                    </div>
                    <p className="text-lg font-medium">Awaiting input data...</p>
                    <p className="text-sm opacity-60">Upload an image to trigger the segmentation model</p>
                  </motion.div>
                )}

                {loading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center rounded-[2rem] bg-black/20 overflow-hidden relative"
                  >
                    <div className="absolute inset-0 z-0">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/20 via-transparent to-transparent animate-scan" />
                    </div>
                    <div className="z-10 text-center p-6">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 mb-8 mx-auto">
                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                        <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
                        <div className="absolute inset-4 bg-primary/10 rounded-full flex items-center justify-center">
                          <Cpu className="text-primary animate-pulse" size={32} />
                        </div>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2">Analyzing Scene Semantics</h3>
                      <div className="flex flex-wrap items-center gap-2 text-slate-400 justify-center">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                        </div>
                        <span className="text-xs md:text-sm font-medium">SegFormer-B5 Transformer Processing</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {results && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col space-y-8"
                  >
                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                      {[
                        { label: 'Latency', value: `${results.latency_ms}ms`, icon: Clock, color: 'text-cyan-400' },
                        { label: 'Resolution', value: `${results.input_size?.[1]}x${results.input_size?.[0]}`, icon: Maximize2, color: 'text-white' },
                        { label: 'Classes', value: results.classes?.length, icon: Layers, color: 'text-green-400' },
                        { label: 'Model', value: 'B5-Large', icon: Cpu, color: 'text-primary' }
                      ].map((stat, i) => (
                        <div key={i} className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-2 mb-1 md:mb-2 text-slate-500 uppercase text-[8px] md:text-[9px] font-black tracking-widest">
                            <stat.icon size={10} className="md:w-3 md:h-3" />
                            {stat.label}
                          </div>
                          <div className={`text-base md:text-xl font-black ${stat.color}`}>{stat.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {/* Mask Output */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                          <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            Classification Mask
                          </span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => downloadImage(results.mask_b64, 'segmentation_mask.png')}
                              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                              title="Download Mask"
                            >
                              <Download size={14} />
                            </button>
                            <button 
                              onClick={() => setZoomedImage({ url: results.mask_b64, title: 'Classification Mask' })}
                              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                              title="Zoom"
                            >
                              <Maximize2 size={14} />
                            </button>
                          </div>
                        </div>
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="relative aspect-video rounded-[1.5rem] overflow-hidden border border-white/10 cursor-zoom-in group/img shadow-2xl"
                          onClick={() => setZoomedImage({ url: results.mask_b64, title: 'Classification Mask' })}
                        >
                          <Image src={results.mask_b64} alt="Mask" fill className="object-cover group-hover/img:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                              <Search className="text-white" size={24} />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Overlay Output */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                          <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            Semantic Overlay
                          </span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => downloadImage(results.overlay_b64, 'segmentation_overlay.png')}
                              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                              title="Download Overlay"
                            >
                              <Download size={14} />
                            </button>
                            <button 
                              onClick={() => setZoomedImage({ url: results.overlay_b64, title: 'Semantic Overlay' })}
                              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                              title="Zoom"
                            >
                              <Maximize2 size={14} />
                            </button>
                          </div>
                        </div>
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="relative aspect-video rounded-[1.5rem] overflow-hidden border border-white/10 cursor-zoom-in group/img shadow-2xl"
                          onClick={() => setZoomedImage({ url: results.overlay_b64, title: 'Semantic Overlay' })}
                        >
                          <Image src={results.overlay_b64} alt="Overlay" fill className="object-cover group-hover/img:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                              <Search className="text-white" size={24} />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Class Breakdown */}
                    <div className="mt-auto p-5 md:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                          <Layers size={14} className="text-primary" />
                          Segmented Objects Breakdown
                        </h3>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          {results.infer_size?.[1]}x{results.infer_size?.[0]} Resolution
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {results.classes?.length > 0 ? results.classes.map((c: any, idx: number) => (
                          <motion.div 
                            key={c.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 * idx }}
                            className="px-3 md:px-4 py-2 bg-black/40 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-wider border flex items-center gap-2 group hover:scale-105 transition-all cursor-default"
                            style={{ borderColor: `${c.color}40` }}
                          >
                            <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: c.color, color: c.color }} />
                            <span style={{ color: c.color }} className="brightness-125">{c.name}</span>
                            <span className="text-slate-500 font-bold ml-1">{c.pct}%</span>
                          </motion.div>
                        )) : (
                          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium py-4">
                            <AlertCircle size={16} />
                            No significant urban objects detected in this frame.
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Premium Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#020617]/95 backdrop-blur-2xl cursor-zoom-out"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-7xl h-full max-h-[90vh] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 glass-effect border border-white/10 rounded-[2.5rem] p-4 flex flex-col shadow-2xl">
                <div className="flex items-center justify-between mb-4 px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Search size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-widest leading-none">{zoomedImage.title}</h4>
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mt-1">Inspection Mode</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => downloadImage(zoomedImage.url, `${zoomedImage.title.toLowerCase().replace(' ', '_')}.png`)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
                    >
                      <Download size={16} />
                      Download
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setZoomedImage(null)}
                      className="w-10 h-10 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-all shadow-xl"
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                </div>
                <div className="relative flex-1 rounded-[2rem] overflow-hidden border border-white/5 bg-black/20 group/zoomed">
                  <Image 
                    src={zoomedImage.url} 
                    alt="Zoomed" 
                    fill 
                    className="object-contain"
                  />
                  {/* Floating Action Button inside zoom */}
                  <div className="absolute bottom-8 right-8 flex gap-4 opacity-0 group-hover/zoomed:opacity-100 transition-opacity">
                    <button 
                       onClick={() => downloadImage(zoomedImage.url, 'inspection_export.png')}
                       className="p-4 bg-primary text-white rounded-2xl shadow-2xl shadow-primary/40 hover:scale-110 transition-transform"
                    >
                      <Download size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// Keyframes added in globals.css previously

// Add this to globals.css
// @keyframes scan {
//   0% { transform: translateY(-100%); opacity: 0; }
//   50% { opacity: 0.5; }
//   100% { transform: translateY(100%); opacity: 0; }
// }
// .animate-scan { animation: scan 2s linear infinite; }

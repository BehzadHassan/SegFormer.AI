'use client';

import React, { useState, useEffect } from 'react';
import { useApiConfig } from '@/context/ApiConfigContext';
import { ExternalLink, Terminal, ShieldCheck, PlayCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { apiBaseUrl, setApiBaseUrl } = useApiConfig();
  const [inputUrl, setInputUrl] = useState(apiBaseUrl);

  const colabLink = "https://colab.research.google.com/drive/1laDHS9Mo_9MvWf9oZXEqS6SVPiCn7HjD?usp=sharing";

  // Sync input when modal opens
  useEffect(() => {
    if (isOpen) {
      setInputUrl(apiBaseUrl);
    }
  }, [isOpen, apiBaseUrl]);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiBaseUrl(inputUrl);
    toast.success('Configuration Saved', {
      description: 'API endpoint updated successfully.'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-lg p-8 border rounded-[2.5rem] shadow-2xl bg-[#0a0a0a] border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Terminal size={120} />
        </div>

        <div className="flex items-center justify-between mb-8 relative">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Backend Configuration</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Setup your inference node</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center transition-colors rounded-xl text-white/50 hover:text-white hover:bg-white/10 border border-white/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <div className="space-y-8 relative">
          {/* Instructions Box */}
          <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 space-y-4">
            <h3 className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-2">
              <PlayCircle size={16} />
              How to Run Backend
            </h3>
            <ol className="text-xs text-slate-400 space-y-3 list-decimal list-inside font-medium leading-relaxed">
              <li>
                Click <a href={colabLink} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary underline inline-flex items-center gap-1">Open in Google Colab <ExternalLink size={10} /></a>
              </li>
              <li>Add your <span className="text-white font-bold">NGROK_AUTHTOKEN</span> in the configuration cell</li>
              <li>Go to <span className="text-white font-bold">Runtime &gt; Run all</span> cells</li>
              <li>Copy the generated <span className="text-white font-bold">ngrok-free.app</span> URL</li>
              <li>Paste the URL into the input field below</li>
            </ol>
          </div>

          <div>
            <label className="block mb-3 text-xs font-black text-slate-500 uppercase tracking-widest">
              Server Endpoint URL
            </label>
            <div className="relative group">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://your-ngrok-url.ngrok-free.app"
                className="w-full px-5 py-4 text-white transition-all bg-black border-2 rounded-2xl border-white/5 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none font-mono text-sm"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ShieldCheck size={18} className="text-primary" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-4 text-sm font-black uppercase tracking-widest transition-all border-2 rounded-2xl text-slate-500 border-white/5 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-[2] py-4 text-sm font-black uppercase tracking-widest text-white transition-all bg-primary rounded-2xl hover:bg-indigo-500 shadow-xl shadow-primary/20"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

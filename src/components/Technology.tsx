'use client';

import { motion } from 'framer-motion';
import { 
  Cpu, 
  Code2, 
  Database, 
  Layers, 
  ShieldCheck, 
  Terminal 
} from 'lucide-react';

const techStack = [
  {
    name: "SegFormer-B5",
    type: "Architecture",
    desc: "Transformer-based encoder with lightweight MLP decoder.",
    icon: Cpu,
    color: "text-blue-400"
  },
  {
    name: "PyTorch",
    type: "Framework",
    desc: "High-performance deep learning for model training and inference.",
    icon: Code2,
    color: "text-orange-500"
  },
  {
    name: "Next.js 15",
    type: "Frontend",
    desc: "Modern React framework for a responsive, high-speed dashboard.",
    icon: Terminal,
    color: "text-white"
  },
  {
    name: "FastAPI",
    type: "Backend",
    desc: "Asynchronous Python web framework for GPU inference bridging.",
    icon: Database,
    color: "text-green-400"
  }
];

export default function Technology() {
  return (
    <section id="tech" className="py-24 px-6 bg-slate-950/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest mb-4"
            >
              Tech Stack
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight"
            >
              Powering <span className="text-gradient-primary">Next-Gen</span> CV
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg mb-10 leading-relaxed"
            >
              We leverage a cutting-edge stack to ensure that our segmentation model isn't just accurate, but also scalable and developer-friendly. From transformer blocks to async processing.
            </motion.p>

            <div className="space-y-6">
              {[
                { title: "Transformer Encoder", desc: "Global receptive field for contextual understanding." },
                { title: "MLP Decoder", desc: "Efficient local-global feature fusion." },
                { title: "Async Pipeline", desc: "Non-blocking image processing for high throughput." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="mt-1 bg-primary/20 p-1 rounded-full">
                    <ShieldCheck size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {techStack.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[2rem] glass-effect-light border border-white/5 relative group hover:bg-white/[0.05] transition-colors"
              >
                <div className={`${tech.color} mb-6 transition-transform group-hover:scale-110 duration-500`}>
                  <tech.icon size={36} strokeWidth={1.5} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">{tech.type}</div>
                <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Eye, 
  BarChart3, 
  Shield, 
  Globe 
} from 'lucide-react';

const features = [
  {
    title: "Zero-Shot Generalization",
    description: "Exceptional performance on unseen urban environments without additional fine-tuning.",
    icon: Globe,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Pixel-Perfect Accuracy",
    description: "Highly detailed mask boundaries optimized for safety-critical autonomous navigation.",
    icon: Target,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    title: "Real-Time Inference",
    description: "Optimized B5 architecture delivering low-latency results on GPU-accelerated hardware.",
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10"
  },
  {
    title: "Class-Wise Analysis",
    description: "Deep insights into 19+ distinct urban categories including vehicles, pedestrians, and infrastructure.",
    icon: BarChart3,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10"
  },
  {
    title: "Robust Performance",
    description: "Consistent segmentation across varying lighting conditions and weather scenarios.",
    icon: Shield,
    color: "text-green-400",
    bg: "bg-green-400/10"
  },
  {
    title: "HD Visualizations",
    description: "Crystal clear overlay generation for easy debugging and human-in-the-loop validation.",
    icon: Eye,
    color: "text-accent",
    bg: "bg-accent/10"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4"
          >
            Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
          >
            Advanced <span className="text-gradient-primary">AI Features</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Built on top of the SegFormer-B5 architecture, our solution provides enterprise-grade segmentation for complex urban scene understanding.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] glass-effect border border-white/5 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <feature.icon size={120} strokeWidth={1} />
              </div>
              
              <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg transition-transform group-hover:scale-110`}>
                <feature.icon size={28} />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

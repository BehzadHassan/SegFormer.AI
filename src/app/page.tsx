import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Technology from "@/components/Technology";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      <Features />
      <Technology />
      
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded shadow-lg shadow-primary/30" />
            <span className="text-sm font-black text-white uppercase tracking-tighter">SegFormer.AI</span>
          </div>
          <p className="text-slate-500 text-xs">© 2024 SegFormer.AI - Built for Advanced Computer Vision Research</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Documentation</a>
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

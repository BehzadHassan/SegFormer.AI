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
          <p className="text-slate-500 text-xs">
            Design and developed by <a href="https://behzadhassan-dev.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors font-bold">Behzad Hassan</a>
          </p>
          <div className="flex gap-6">
            <a href="https://github.com/BehzadHassan/SegFormer.AI" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white text-xs transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

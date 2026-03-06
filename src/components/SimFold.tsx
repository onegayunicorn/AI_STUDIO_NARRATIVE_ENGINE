import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';
import { Dna, Layers, RefreshCw, Zap, Activity } from 'lucide-react';

interface SimFoldProps {
  activeFold: number;
}

export const SimFold: React.FC<SimFoldProps> = ({ activeFold }) => {
  const [rotation, setRotation] = useState(0);
  const [isFolding, setIsFolding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const folds = [
    { id: 1, name: 'Past → Present', color: 'border-blue-500', bg: 'bg-blue-500/10', text: 'text-blue-400' },
    { id: 2, name: 'Present → Future', color: 'border-cyan-500', bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
    { id: 3, name: 'Future → Past', color: 'border-magenta-500', bg: 'bg-magenta-500/10', text: 'text-magenta-400' },
    { id: 4, name: 'All → Unity', color: 'border-yellow-500', bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
  ];

  return (
    <div className="p-8 glass-panel border border-white/10 rounded-3xl bg-black/40 h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Dna className="w-32 h-32 text-cyan-500" />
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">4-Fold DNA SimFold Protocol</h3>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">Folding Active</span>
          </div>
        </div>
      </div>
      
      <div className="relative h-[400px] flex items-center justify-center">
        {/* DNA Helix Visualization */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-full max-w-md h-full flex flex-col justify-between py-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [Math.sin(i + rotation * 0.1) * 100, Math.sin(i + rotation * 0.1 + Math.PI) * 100],
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="h-1 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-full"
                style={{ width: '40px' }}
              />
            ))}
          </div>
        </div>

        {/* Folding Layers */}
        {folds.map((fold, idx) => (
          <motion.div
            key={fold.id}
            initial={false}
            animate={{
              scale: activeFold === fold.id ? 1.2 : 0.8,
              opacity: activeFold === fold.id ? 1 : 0.1,
              rotate: (idx * 90) + (rotation * 0.2),
              zIndex: activeFold === fold.id ? 10 : 0,
              y: activeFold === fold.id ? 0 : (idx - 1.5) * 40
            }}
            className={cn(
              "absolute w-56 h-56 border-2 rounded-3xl flex flex-col items-center justify-center text-center p-6 transition-all duration-700 backdrop-blur-md shadow-2xl",
              fold.color,
              fold.bg
            )}
          >
            <div className="space-y-3">
              <div className={cn("p-3 rounded-2xl bg-white/5 border border-white/10 inline-block", fold.text)}>
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold block mb-1 opacity-40">FOLD {fold.id}</span>
                <span className="text-xs font-bold uppercase tracking-widest">{fold.name}</span>
              </div>
              <div className="flex gap-1 justify-center">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className={cn("w-1 h-1 rounded-full animate-pulse", fold.bg.replace('bg-', 'bg-').replace('/10', ''))} style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 animate-ping" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {folds.map((fold) => (
          <div 
            key={fold.id}
            className={cn(
              "p-4 rounded-2xl border transition-all duration-500",
              activeFold === fold.id ? "bg-white/10 border-white/20 shadow-lg" : "bg-white/5 border-white/5 opacity-40"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <Activity className={cn("w-3 h-3", fold.text)} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Layer {fold.id}</span>
            </div>
            <p className="text-[10px] uppercase text-white font-mono">{fold.name}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[8px] text-white/20 uppercase tracking-widest">Fidelity</span>
              <span className="text-[10px] font-mono text-emerald-400">99.9%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-br from-cyan-500 to-indigo-500" />
            ))}
          </div>
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Folding Consensus</p>
            <p className="text-xs font-bold text-white uppercase">Sovereign Node Network Active</p>
          </div>
        </div>
        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all group">
          <RefreshCw className="w-4 h-4 text-white/40 group-hover:rotate-180 transition-transform duration-700" />
        </button>
      </div>
    </div>
  );
};

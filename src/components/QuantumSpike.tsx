import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Shield, Activity } from 'lucide-react';

export const QuantumSpike: React.FC = () => {
  const [isSpiking, setIsSpiking] = useState(false);
  const [power, setPower] = useState(8.47);

  const handleSpike = () => {
    setIsSpiking(true);
    setTimeout(() => setIsSpiking(false), 2000);
  };

  return (
    <div className="p-6 border-quantum rounded-lg bg-black/40 overflow-hidden relative">
      <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-cyan-400">Quantum Spike Injector</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-xs uppercase">Output Power</span>
          </div>
          <span className="text-xl font-mono text-yellow-400">{power.toFixed(2)} TQ</span>
        </div>

        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-yellow-400"
            animate={{ width: `${(power / 12) * 100}%` }}
          />
        </div>

        <button
          onClick={handleSpike}
          disabled={isSpiking}
          className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-widest rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed relative group"
        >
          {isSpiking ? "Injecting..." : "Deliver Spike to Present"}
          <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </button>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 border border-white/10 rounded bg-white/5">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-3 h-3 text-cyan-400" />
              <span className="text-[10px] uppercase opacity-50">Stability</span>
            </div>
            <span className="text-sm font-mono">99.97%</span>
          </div>
          <div className="p-3 border border-white/10 rounded bg-white/5">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-3 h-3 text-magenta-400" />
              <span className="text-[10px] uppercase opacity-50">Coherence</span>
            </div>
            <span className="text-sm font-mono">0.9998</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSpiking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="w-32 h-32 rounded-full bg-yellow-400/50 blur-3xl"
            />
            <div className="absolute inset-0 bg-white/10 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

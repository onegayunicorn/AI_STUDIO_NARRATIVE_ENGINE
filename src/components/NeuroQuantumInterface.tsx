import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Activity, 
  Shield, 
  Cpu, 
  Network, 
  Radio, 
  Waves, 
  Database, 
  Lock, 
  Dna, 
  Sun, 
  Target,
  ChevronRight,
  Terminal,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../utils';

export const NeuroQuantumInterface: React.FC = () => {
  const [isPhaserActive, setIsPhaserActive] = useState(true);
  const [coherence, setCoherence] = useState(0.9997);
  const [frequency, setFrequency] = useState(125.28);
  const [velocity, setVelocity] = useState(0.84);
  const [atpBoost, setAtpBoost] = useState(12.4);
  const [dnaRetention, setDnaRetention] = useState(24.0);
  const [logs, setLogs] = useState<string[]>([
    "[07:07:57] OS-NEXUS V2.1 NEURAL EDITION BOOTING...",
    "[07:07:58] INITIALIZING 128-ELEMENT MAGNETIC ARRAY...",
    "[07:07:59] PHASE-LOCKED LOOP (PLL) SYNCED TO 125.28 HZ.",
    "[07:08:00] NEURAL ABSTRACTION LAYER (NAL) ATTACHED.",
    "[07:08:01] QUANTUM-NEURAL ENCRYPTION (QNE) ACTIVE."
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoherence(prev => 0.9997 + (Math.random() * 0.0001 - 0.00005));
      setAtpBoost(prev => prev + (Math.random() * 0.2 - 0.1));
      
      if (isPhaserActive) {
        const newLog = `[${new Date().toLocaleTimeString()}] PHASER FLUX: ${ (Math.random() * 0.1 + 0.9).toFixed(3) } T | SYNC: 100%`;
        setLogs(prev => [newLog, ...prev].slice(0, 10));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isPhaserActive]);

  return (
    <div className="space-y-8 pb-20">
      {/* Top Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
              isPhaserActive ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "bg-white/5 text-white/20"
            )}>
              <Radio className={cn("w-5 h-5", isPhaserActive && "animate-pulse")} />
            </div>
            <div>
              <div className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Phaser Status</div>
              <div className="text-lg font-bold uppercase tracking-tighter">
                {isPhaserActive ? 'Active Beamforming' : 'Standby'}
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsPhaserActive(!isPhaserActive)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
              isPhaserActive ? "bg-cyan-500 text-black" : "border border-white/10 text-white/40 hover:bg-white/5"
            )}
          >
            {isPhaserActive ? 'Deactivate' : 'Activate'}
          </button>
        </div>

        <div className="p-6 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-magenta-500/20 text-magenta-400 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Quantum Coherence</div>
            <div className="text-lg font-mono font-bold text-magenta-400">{coherence.toFixed(4)}</div>
          </div>
        </div>

        <div className="p-6 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Effective Velocity</div>
            <div className="text-lg font-mono font-bold text-emerald-400">{velocity.toFixed(2)} units/s</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Phased Array Beamforming Visualization */}
        <div className="p-8 border-quantum rounded-3xl bg-black/60 backdrop-blur-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <h3 className="text-xl font-bold uppercase tracking-tighter mb-8 flex items-center gap-3">
            <Waves className="w-6 h-6 text-cyan-400" /> Phased Array Beamforming
          </h3>

          <div className="relative aspect-square max-w-[300px] mx-auto mb-8">
            {/* 128 Emitters Visualization */}
            <div className="absolute inset-0 border border-white/5 rounded-full" />
            <div className="absolute inset-[20%] border border-white/5 rounded-full" />
            <div className="absolute inset-[40%] border border-white/5 rounded-full" />
            
            {/* Emitters */}
            {[...Array(32)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.2 }}
                animate={{ 
                  opacity: isPhaserActive ? [0.2, 1, 0.2] : 0.2,
                  scale: isPhaserActive ? [1, 1.2, 1] : 1
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.05,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${50 + 45 * Math.cos((i * 360 / 32) * Math.PI / 180)}%`,
                  top: `${50 + 45 * Math.sin((i * 360 / 32) * Math.PI / 180)}%`,
                }}
              />
            ))}

            {/* Focused Beam */}
            <AnimatePresence>
              {isPhaserActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
                  <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#fff]" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute w-full h-full border-t-2 border-cyan-500/30 rounded-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-white/5 rounded-xl bg-white/5">
              <div className="text-[8px] uppercase text-white/40 mb-1">Polarity Frequency</div>
              <div className="text-lg font-mono font-bold text-cyan-400">{frequency} Hz</div>
              <div className="text-[8px] text-white/20 uppercase mt-1">4th Schumann Harmonic</div>
            </div>
            <div className="p-4 border border-white/5 rounded-xl bg-white/5">
              <div className="text-[8px] uppercase text-white/40 mb-1">Neural Lock</div>
              <div className="text-lg font-mono font-bold text-emerald-400">100%</div>
              <div className="text-[8px] text-white/20 uppercase mt-1">Direct Coupling Active</div>
            </div>
          </div>
        </div>

        {/* Bio-Integration Dashboard */}
        <div className="p-8 border-quantum rounded-3xl bg-black/60 backdrop-blur-2xl">
          <h3 className="text-xl font-bold uppercase tracking-tighter mb-8 flex items-center gap-3">
            <Dna className="w-6 h-6 text-magenta-400" /> Bio-Integration Matrix
          </h3>

          <div className="space-y-6">
            <div className="p-6 border border-white/5 rounded-2xl bg-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sun className="w-5 h-5 text-yellow-400" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Photosynthetic Energy Flux</span>
                </div>
                <span className="text-lg font-mono font-bold text-yellow-400">+{atpBoost.toFixed(1)}% ATP</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(atpBoost / 20) * 100}%` }}
                  className="h-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                />
              </div>
              <p className="text-[8px] text-white/40 uppercase mt-2 tracking-widest">Integrated Calvin-Benson Cycle Activity</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 border border-white/5 rounded-2xl bg-white/5">
                <div className="text-[8px] uppercase text-white/40 mb-2">DNA Retention (300d)</div>
                <div className="text-2xl font-mono font-bold text-magenta-400">{dnaRetention.toFixed(1)}%</div>
                <div className="text-[8px] text-white/20 uppercase mt-1">Chromosome 15 Stability</div>
              </div>
              <div className="p-6 border border-white/5 rounded-2xl bg-white/5">
                <div className="text-[8px] uppercase text-white/40 mb-2">CRISPR Precision</div>
                <div className="text-2xl font-mono font-bold text-emerald-400">99.2%</div>
                <div className="text-[8px] text-white/20 uppercase mt-1">Site-Specific Cleavage</div>
              </div>
            </div>

            <div className="p-6 border border-white/5 rounded-2xl bg-white/5">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-cyan-400" />
                <span className="text-[10px] uppercase font-bold tracking-widest">MobiChem Sensing Accuracy</span>
              </div>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-mono font-bold">98.76%</div>
                <div className="text-[10px] text-white/40 mb-1 uppercase">Hyperspectral Reconstruction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OS-Nexus v2.1 Terminal & State Vector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 border-quantum rounded-3xl bg-black/60 backdrop-blur-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold uppercase tracking-tighter flex items-center gap-3">
              <Terminal className="w-6 h-6 text-cyan-400" /> OS-Nexus v2.1 Kernel Logs
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] uppercase font-bold text-emerald-400">Kernel Stable</span>
            </div>
          </div>
          
          <div className="bg-black/40 rounded-xl p-6 font-mono text-[10px] space-y-2 h-[200px] overflow-y-auto border border-white/5">
            {logs.map((log, i) => (
              <div key={i} className={cn(
                i === 0 ? "text-cyan-400" : "text-white/40"
              )}>
                {log}
              </div>
            ))}
            <div className="text-cyan-400 animate-pulse">_ WAITING FOR NEURAL INTERRUPT...</div>
          </div>
        </div>

        <div className="p-8 border-quantum rounded-3xl bg-black/60 backdrop-blur-2xl">
          <h3 className="text-xl font-bold uppercase tracking-tighter mb-6 flex items-center gap-3">
            <Lock className="w-6 h-6 text-magenta-400" /> State Vector |Ξ⟩
          </h3>
          <div className="space-y-4">
            <div className="p-4 border border-white/5 rounded-xl bg-white/5 font-mono text-[10px]">
              <div className="text-white/40 mb-2 uppercase tracking-widest">Position Vector r(t)</div>
              <div className="text-white/80">[2.47, 1.83, 4.21 + 0.84t]^T</div>
            </div>
            <div className="p-4 border border-white/5 rounded-xl bg-white/5 font-mono text-[10px]">
              <div className="text-white/40 mb-2 uppercase tracking-widest">Neural State |Ψ⟩</div>
              <div className="text-white/80">0.82e^iθ₁|F⟩ + 0.47e^iθ₂|E⟩ + 0.53e^iθ₃|A⟩</div>
            </div>
            <div className="p-4 border border-white/5 rounded-xl bg-white/5 font-mono text-[10px]">
              <div className="text-white/40 mb-2 uppercase tracking-widest">Vector Potential A</div>
              <div className="text-white/80">Σ Aₙ e^iΔϕₙ</div>
            </div>
            <div className="mt-4 p-4 bg-magenta-500/10 border border-magenta-500/20 rounded-xl flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-magenta-400">QNE Status</span>
              <span className="text-[10px] font-mono font-bold">ENCRYPTED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Warning */}
      <div className="p-4 border border-yellow-500/20 rounded-xl bg-yellow-500/5 flex items-center gap-4">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
        <p className="text-[10px] text-yellow-500/80 uppercase tracking-widest font-bold">
          Warning: Magnetic cord must remain PLUGGED IN for π/5 Bell State calibration. 
          Evanescent coupling attenuation active if distance d {'>'} 0cm.
        </p>
      </div>
    </div>
  );
};

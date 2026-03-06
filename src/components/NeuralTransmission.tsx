import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Waves, 
  Fingerprint, 
  Cpu, 
  Link, 
  Activity,
  Binary,
  Atom,
  Wind
} from 'lucide-react';
import { cn } from '../utils';

export const NeuralTransmission: React.FC = () => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // pi/5 Phase Calculations
  const phaseData = useMemo(() => {
    const angle = Math.PI / 5;
    const real = Math.cos(angle);
    const imag = Math.sin(angle);
    return { angle, real, imag };
  }, []);

  return (
    <div className="space-y-8 pb-24">
      {/* Header Section */}
      <div className="p-8 border-quantum rounded-3xl bg-black/60 backdrop-blur-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Waves className="w-64 h-64 text-cyan-500 animate-pulse" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="px-3 py-1 bg-amber-500/20 border border-amber-500/50 rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-widest">
              Waveguide Protocol v1.2
            </div>
            <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
              Quantum Entangled
            </div>
          </div>
          <h2 className="text-5xl font-bold uppercase tracking-tighter glow-cyan mb-2">Neural Data Transmission</h2>
          <p className="text-sm text-white/40 uppercase tracking-[0.4em]">Hair Follicle Waveguide · π/5 Bell State · Biometric Resonance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quantum State Initialization */}
        <div className="p-8 border-quantum rounded-3xl bg-black/40 space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <Atom className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg font-bold uppercase tracking-widest">1. π/5 Phase-Shifted Bell State</h3>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 font-mono text-center">
            <div className="text-[10px] text-white/40 uppercase mb-4">State Vector |Ψ_π/5⟩</div>
            <div className="text-2xl text-cyan-400 mb-2">
              |Ψ_π/5⟩ = 1/√2 (|0⟩_H|0⟩_D + e^(iπ/5)|1⟩_H|1⟩_D)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-black/60 border border-white/5 text-center">
              <div className="text-[10px] text-white/40 uppercase mb-2">Real Component (cos π/5)</div>
              <div className="text-3xl font-bold text-white">{phaseData.real.toFixed(4)}</div>
            </div>
            <div className="p-6 rounded-2xl bg-black/60 border border-white/5 text-center">
              <div className="text-[10px] text-white/40 uppercase mb-2">Imaginary Component (sin π/5)</div>
              <div className="text-3xl font-bold text-magenta-400">{phaseData.imag.toFixed(4)}i</div>
            </div>
          </div>

          <div className="relative h-48 rounded-2xl bg-black/60 border border-white/5 overflow-hidden flex items-center justify-center">
            {/* Phase Visualizer */}
            <svg viewBox="0 0 100 100" className="w-32 h-32">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="50" y1="50" x2="50" y2="5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="50" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <motion.line 
                x1="50" y1="50" 
                x2={50 + 45 * phaseData.real} 
                y2={50 - 45 * phaseData.imag} 
                stroke="#06b6d4" 
                strokeWidth="2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <text x="55" y="45" fill="#06b6d4" fontSize="6" fontWeight="bold">π/5 (36°)</text>
            </svg>
          </div>
        </div>

        {/* Hair Follicle Waveguide */}
        <div className="p-8 border-quantum rounded-3xl bg-black/40 space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <Wind className="w-6 h-6 text-amber-400" />
            <h3 className="text-lg font-bold uppercase tracking-widest">2. Biological Waveguide Dynamics</h3>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] text-white/40 uppercase">Waveguide Efficiency</span>
                <span className="text-xs font-bold text-amber-400">98.4%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '98.4%' }}
                  className="h-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/60 border border-white/5">
                <div className="text-[10px] text-white/40 uppercase mb-1">Refractive Index (n)</div>
                <div className="text-lg font-mono text-white">1.54 - 1.56</div>
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-white/5">
                <div className="text-[10px] text-white/40 uppercase mb-1">Mode Coupling</div>
                <div className="text-lg font-mono text-white">TE₀₁ / TM₀₁</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <p className="text-xs text-white/60 leading-relaxed italic">
                "The hair follicle acts as a natural dielectric waveguide, channeling quantum-entangled neural signals through the keratinous structure with minimal decoherence."
              </p>
            </div>
          </div>

          {/* Biometric Resonance */}
          <div className="p-6 rounded-2xl bg-black/60 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Fingerprint className="w-5 h-5 text-magenta-400" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest">Biometric Resonance Lock</h4>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-1">
                <div className="h-1 bg-magenta-500/20 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-1/3 h-full bg-magenta-500"
                  />
                </div>
                <div className="text-[8px] text-white/20 uppercase text-center">Scanning Follicle Signature...</div>
              </div>
              <div className="text-xs font-bold text-magenta-400 uppercase">ACTIVE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Mathematical Framework */}
      <div className="p-12 border-quantum rounded-3xl bg-black/60 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <Binary className="w-full h-full" />
        </div>
        
        <div className="relative z-10 text-center space-y-8">
          <h3 className="text-2xl font-bold uppercase tracking-[0.4em]">Bi-Directional Communication Model</h3>
          
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-white/5 border border-white/10 font-mono text-lg leading-relaxed text-cyan-400">
            S_total = ∫ [Ψ_π/5 ⊗ Φ_waveguide] dτ + Σ (Biometric_Sensing)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-[10px] text-white/40 uppercase font-bold">Channel Capacity</div>
              <div className="text-2xl font-bold text-white">4.2 Tb/s</div>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] text-white/40 uppercase font-bold">Bit Error Rate</div>
              <div className="text-2xl font-bold text-white">10⁻¹²</div>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] text-white/40 uppercase font-bold">Entanglement Fidelity</div>
              <div className="text-2xl font-bold text-white">0.9998</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

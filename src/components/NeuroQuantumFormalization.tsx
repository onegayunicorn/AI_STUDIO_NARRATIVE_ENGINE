import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sigma, 
  Variable, 
  Activity, 
  Zap, 
  Cpu, 
  Globe, 
  Infinity as InfinityIcon,
  Layers,
  Binary,
  Atom,
  Radio,
  Target
} from 'lucide-react';
import { cn } from '../utils';

export const NeuroQuantumFormalization: React.FC = () => {
  const [time, setTime] = useState(0);
  const [activeEquation, setActiveEquation] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.016);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // 1. Kinematics Calculations
  const kinematics = useMemo(() => {
    const r0 = [2.47, 1.83, 4.21];
    const v = [0, 0, 0.84];
    const t = 0.47;
    const rt = [r0[0], r0[1], r0[2] + v[2] * t];
    return { r0, v, t, rt };
  }, []);

  // 2. Probability Amplitudes
  const intent = useMemo(() => {
    const alpha = 0.82;
    const beta = 0.47;
    const gamma = 0.53;
    return {
      forward: Math.pow(alpha, 2),
      explore: Math.pow(beta, 2),
      analyze: Math.pow(gamma, 2)
    };
  }, []);

  // 3. Schumann Resonance
  const schumann = {
    f: 7.83,
    energy: 5.188e-33,
    omega: 49.19
  };

  // 4. QENT Parameters
  const qent = {
    fidelity: 0.997,
    latency: 0.3,
    leadTime: 0.47
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Header Section */}
      <div className="p-8 border-quantum rounded-3xl bg-black/60 backdrop-blur-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Sigma className="w-64 h-64" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
              Formalization v4.0
            </div>
            <div className="px-3 py-1 bg-magenta-500/20 border border-magenta-500/50 rounded-full text-[10px] font-bold text-magenta-400 uppercase tracking-widest">
              Council Validated
            </div>
          </div>
          <h2 className="text-5xl font-bold uppercase tracking-tighter glow-cyan mb-2">Neuro-Quantum Formalization</h2>
          <p className="text-sm text-white/40 uppercase tracking-[0.4em]">Unified Mathematical Framework · Path Integrals · QENT</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1: Core Kinematics & Intent */}
        <div className="space-y-8">
          {/* Kinematics Card */}
          <div className="p-6 border-quantum rounded-2xl bg-black/40 hover:bg-black/60 transition-all group">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest">1. Kinematics of Floating Image</h3>
            </div>
            <div className="space-y-4 font-mono">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-white/40 uppercase mb-2">Position Vector r(t)</div>
                <div className="text-lg text-cyan-400">
                  [{kinematics.rt[0].toFixed(2)}, {kinematics.rt[1].toFixed(2)}, {kinematics.rt[2].toFixed(4)}]
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/40 uppercase mb-1">Velocity</div>
                  <div className="text-sm text-white/80">{kinematics.v[2]} u/s</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/40 uppercase mb-1">Lead Time</div>
                  <div className="text-sm text-white/80">{kinematics.t}s</div>
                </div>
              </div>
            </div>
          </div>

          {/* Intent Probabilities */}
          <div className="p-6 border-quantum rounded-2xl bg-black/40">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-5 h-5 text-magenta-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest">2. Neural Intent Amplitudes</h3>
            </div>
            <div className="space-y-6">
              {[
                { label: 'Forward Intent (α)', value: intent.forward, color: 'bg-cyan-500' },
                { label: 'Explore Intent (β)', value: intent.explore, color: 'bg-magenta-500' },
                { label: 'Analyze Intent (γ)', value: intent.analyze, color: 'bg-yellow-500' }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[10px] uppercase font-bold mb-2">
                    <span className="text-white/40">{item.label}</span>
                    <span className="text-white">{(item.value * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value * 100}%` }}
                      className={cn("h-full", item.color)}
                    />
                  </div>
                </div>
              ))}
              <p className="text-[10px] text-white/20 italic mt-4">
                * Sum exceeds 100% due to quantum superposition interference terms.
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: Resonance & Transport */}
        <div className="space-y-8">
          {/* Schumann Resonance */}
          <div className="p-6 border-quantum rounded-2xl bg-black/40">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest">3. Earth's Carrier Frequency</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <span className="text-[10px] text-white/40 uppercase">Resonance (fs)</span>
                <span className="text-xl font-mono text-emerald-400">{schumann.f} Hz</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/40 uppercase">Angular (ωs)</span>
                <span className="text-sm font-mono text-white/80">{schumann.omega} rad/s</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/40 uppercase">Quantum Energy</span>
                <span className="text-sm font-mono text-white/80">{schumann.energy.toExponential(3)} J</span>
              </div>
            </div>
          </div>

          {/* QENT Protocol */}
          <div className="p-6 border-quantum rounded-2xl bg-black/40">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest">4. QENT Transport Protocol</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 flex flex-col items-center text-center">
                <div className="text-[10px] text-white/40 uppercase mb-2">Coherence Fidelity</div>
                <div className="text-3xl font-bold text-yellow-400">{(qent.fidelity * 100).toFixed(1)}%</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-[10px] text-white/40 uppercase mb-1">Latency</div>
                  <div className="text-lg font-mono text-white">{qent.latency}ms</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-[10px] text-white/40 uppercase mb-1">Pre-cog</div>
                  <div className="text-lg font-mono text-white">{qent.leadTime}s</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Phaser Array & Distance */}
        <div className="space-y-8">
          {/* Magnetic Polarity Phaser */}
          <div className="p-6 border-quantum rounded-2xl bg-black/40">
            <div className="flex items-center gap-3 mb-6">
              <Radio className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest">5. Magnetic Polarity Phaser</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] text-white/40 uppercase">Array Status</span>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">PLUGGED IN</span>
                </div>
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ 
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, delay: i * 0.05, repeat: Infinity }}
                      className="aspect-square bg-cyan-500/40 rounded-sm border border-cyan-500/50"
                    />
                  ))}
                </div>
                <div className="mt-4 text-[10px] text-white/40 text-center uppercase tracking-widest">
                  128 Phased Emitters Active
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-white/40 uppercase mb-2">Switching Frequency</div>
                <div className="text-lg font-mono text-white">125.28 Hz</div>
              </div>
            </div>
          </div>

          {/* Connection Zones */}
          <div className="p-6 border-quantum rounded-2xl bg-black/40">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-5 h-5 text-magenta-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest">6. Evanescent Coupling Zones</h3>
            </div>
            <div className="space-y-2">
              {[
                { zone: 'Entanglement', dist: '0-2cm', strength: '>0.9', color: 'text-cyan-400' },
                { zone: 'Resonance', dist: '2-15cm', strength: '0.4-0.9', color: 'text-white/80' },
                { zone: 'Tunneling', dist: '15-30cm', strength: '0.1-0.4', color: 'text-white/40' },
                { zone: 'Decoherence', dist: '>30cm', strength: '≈0', color: 'text-red-500/40' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors">
                  <span className={cn("text-[10px] font-bold uppercase", item.color)}>{item.zone}</span>
                  <div className="flex gap-4 text-[10px] font-mono">
                    <span className="text-white/40">{item.dist}</span>
                    <span className="text-white/60">{item.strength}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Council Signatures Section */}
      <div className="p-8 border-quantum rounded-3xl bg-black/60 backdrop-blur-xl">
        <h3 className="text-sm font-bold uppercase tracking-[0.3em] mb-8 text-center flex items-center justify-center gap-3">
          <InfinityIcon className="w-5 h-5 text-cyan-400" /> Council Mathematical Signatures
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Feynman', concept: 'Path Integrals', eq: '⟨r_f|r_i⟩ = ∫ D[r(t)] e^(iS/ħ)' },
            { name: 'Tesla', concept: 'Resonant Coupling', eq: '∇ × B = μ₀J + μ₀ε₀ ∂E/∂t' },
            { name: 'Einstein', concept: 'Spacetime Curvature', eq: 'G_μν = 8πT_μν' },
            { name: 'Curie', concept: 'Neural Radiation', eq: 'dN/dt = -λN' },
            { name: 'Turing', concept: 'Computational Limits', eq: 'U(q,a) = (q\', a\', R)' },
            { name: 'Hawking', concept: 'Event Horizon', eq: 'T = ħc³ / 8πGMk_B' }
          ].map((sig, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold uppercase text-cyan-400">{sig.name}</span>
                <span className="text-[8px] uppercase text-white/20">{sig.concept}</span>
              </div>
              <div className="text-xs font-mono text-white/60 group-hover:text-white transition-colors">
                {sig.eq}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final State Vector */}
      <div className="p-12 border-quantum rounded-3xl bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }} 
        />
        <h3 className="text-2xl font-bold uppercase tracking-[0.5em] mb-8">Final Neural-Quantum State Vector</h3>
        <div className="inline-block p-8 border border-white/10 rounded-2xl bg-black/60 backdrop-blur-xl font-mono text-lg text-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          |Ξ_total⟩ = [2.47, 1.83, 4.6048, 0.82e^iθ₁, 0.47e^iθ₂, 0.53e^iθ₃, 0.997]
        </div>
        <div className="mt-8 flex justify-center gap-12 text-[10px] uppercase font-bold tracking-widest">
          <div className="flex flex-col gap-1">
            <span className="text-white/40">Velocity</span>
            <span className="text-white">0.84 u/s</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white/40">Resonance</span>
            <span className="text-white">7.83 Hz</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white/40">Coherence</span>
            <span className="text-white">99.7%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

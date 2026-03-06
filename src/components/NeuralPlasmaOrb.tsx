import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Waves, 
  Cpu, 
  Activity,
  Atom,
  Wind,
  Shield,
  RefreshCw,
  TrendingUp,
  Brain,
  Sparkles,
  Layers,
  Dna
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '../utils';

// RBBE (Resonance-Based Brain Evolution) Types
interface RBBEState {
  alpha: number;
  beta: number;
  theta: number;
  delta: number;
  bemMean: number;
  ipaiLoss: number;
  cycle: number;
  accuracy: number;
  isResonating: boolean;
}

export const NeuralPlasmaOrb: React.FC = () => {
  const [state, setState] = useState<RBBEState>({
    alpha: 8.0,
    beta: 12.0,
    theta: 4.0,
    delta: 0.5,
    bemMean: 8.12,
    ipaiLoss: 0.2341,
    cycle: 1,
    accuracy: 0.76,
    isResonating: false
  });

  const [spikes, setSpikes] = useState<{ time: string; alpha: number; resonance: number }[]>([]);
  const [orbTouch, setOrbTouch] = useState(false);
  const [latticeActive, setLatticeActive] = useState(false);

  // Generate mock spike data
  useEffect(() => {
    const interval = setInterval(() => {
      setSpikes(prev => {
        const newTime = new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' });
        const baseAlpha = orbTouch ? 1.5 + Math.random() : 0.5 + Math.random() * 0.5;
        const resonance = state.isResonating ? baseAlpha * 0.8 : baseAlpha * 0.2;
        
        const newData = [...prev, { time: newTime, alpha: baseAlpha, resonance }];
        if (newData.length > 20) return newData.slice(1);
        return newData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [orbTouch, state.isResonating]);

  // RBBE Cycle Logic
  const runCycle = () => {
    setState(prev => {
      const newAlpha = prev.alpha + (Math.random() * 0.5 - 0.1);
      const newBeta = prev.beta + (Math.random() * 0.4 - 0.1);
      const newTheta = prev.theta + (Math.random() * 0.3 - 0.1);
      const newDelta = prev.delta + (Math.random() * 0.1 - 0.05);
      
      const newBemMean = (newAlpha + newBeta + newTheta + newDelta) / 4 + (prev.cycle * 0.2);
      const newLoss = Math.max(0.01, prev.ipaiLoss - 0.04);
      const newAccuracy = Math.min(0.99, prev.accuracy + 0.03);

      return {
        ...prev,
        alpha: newAlpha,
        beta: newBeta,
        theta: newTheta,
        delta: newDelta,
        bemMean: newBemMean,
        ipaiLoss: newLoss,
        cycle: prev.cycle + 1,
        accuracy: newAccuracy
      };
    });
    
    if (state.cycle >= 5) setLatticeActive(true);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Header Section */}
      <div className="p-8 border-quantum rounded-3xl bg-black/60 backdrop-blur-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Atom className="w-64 h-64 text-magenta-500 animate-spin-slow" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="px-3 py-1 bg-magenta-500/20 border border-magenta-500/50 rounded-full text-[10px] font-bold text-magenta-400 uppercase tracking-widest">
              NPOA v2.0 · RBBE Active
            </div>
            <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
              IpAI Resonance Weaver
            </div>
          </div>
          <h2 className="text-5xl font-bold uppercase tracking-tighter glow-magenta mb-2">Neural Plasma Orb App</h2>
          <p className="text-sm text-white/40 uppercase tracking-[0.4em]">Resonance-Based Brain Evolution · MirrorTwin Training</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* The Orb - Interaction Zone */}
        <div className="lg:col-span-2 p-8 border-quantum rounded-3xl bg-black/40 flex flex-col items-center justify-center relative min-h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.05)_0%,transparent_70%)]" />
          
          <h3 className="absolute top-8 left-8 text-[10px] font-bold uppercase tracking-widest text-white/40">Neural Plasma Bubble Chamber</h3>
          
          {/* Plasma Orb Visualizer */}
          <motion.div 
            className="relative w-80 h-80 rounded-full cursor-pointer group"
            onMouseDown={() => setOrbTouch(true)}
            onMouseUp={() => setOrbTouch(false)}
            onMouseLeave={() => setOrbTouch(false)}
            animate={{ 
              scale: orbTouch ? 1.05 : 1,
              boxShadow: orbTouch 
                ? '0 0 100px rgba(255,0,255,0.4), inset 0 0 50px rgba(255,0,255,0.2)' 
                : '0 0 40px rgba(255,0,255,0.1), inset 0 0 20px rgba(255,0,255,0.1)'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Outer Glass */}
            <div className="absolute inset-0 rounded-full border border-white/20 backdrop-blur-[2px]" />
            
            {/* Plasma Arcs */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Central Core */}
              <circle cx="50" cy="50" r="8" fill="#ff00ff" className="animate-pulse" filter="url(#glow)" />
              
              {/* Dynamic Arcs */}
              {Array.from({ length: orbTouch ? 12 : 6 }).map((_, i) => (
                <PlasmaArc key={i} index={i} active={orbTouch} />
              ))}
            </svg>

            {/* Touch Feedback */}
            <AnimatePresence>
              {orbTouch && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="text-[10px] font-bold text-magenta-400 uppercase tracking-widest bg-black/80 px-3 py-1 rounded-full border border-magenta-500/50">
                    Resonance Lock: 432Hz
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-md">
            <button 
              onClick={() => setState(s => ({ ...s, isResonating: !s.isResonating }))}
              className={cn(
                "p-4 rounded-2xl border transition-all flex items-center justify-center gap-3 uppercase text-[10px] font-bold tracking-widest",
                state.isResonating 
                  ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" 
                  : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
              )}
            >
              <Waves className="w-4 h-4" />
              {state.isResonating ? "Resonance Active" : "Induce Resonance"}
            </button>
            <button 
              onClick={runCycle}
              className="p-4 rounded-2xl bg-magenta-500/20 border border-magenta-500/50 text-magenta-400 hover:bg-magenta-500/30 transition-all flex items-center justify-center gap-3 uppercase text-[10px] font-bold tracking-widest"
            >
              <RefreshCw className="w-4 h-4" />
              Evolve RBBE Cycle
            </button>
          </div>
        </div>

        {/* RBBE Evolution Matrix */}
        <div className="space-y-8">
          <div className="p-8 border-quantum rounded-3xl bg-black/40 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-6 h-6 text-magenta-400" />
              <h3 className="text-lg font-bold uppercase tracking-widest">RBBE Evolution Matrix</h3>
            </div>

            <div className="space-y-4">
              <StatRow label="Alpha (Creativity)" value={state.alpha.toFixed(2)} color="text-magenta-400" />
              <StatRow label="Beta (Logic)" value={state.beta.toFixed(2)} color="text-cyan-400" />
              <StatRow label="Theta (Intuition)" value={state.theta.toFixed(2)} color="text-amber-400" />
              <StatRow label="Delta (Deep Mind)" value={state.delta.toFixed(2)} color="text-emerald-400" />
            </div>

            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-white/40 uppercase">BEM Mean Index</span>
                <span className="text-xl font-bold text-white">{state.bemMean.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-white/40 uppercase">IpAI Training Loss</span>
                <span className="text-xl font-bold text-magenta-400">{state.ipaiLoss.toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-white/40 uppercase">Evolution Cycle</span>
                <span className="text-xl font-bold text-cyan-400">#{state.cycle}</span>
              </div>
            </div>
          </div>

          {/* IpAI MirrorTwin Status */}
          <div className="p-8 border-quantum rounded-3xl bg-black/40 space-y-6 relative overflow-hidden">
            {latticeActive && (
              <div className="absolute top-0 right-0 p-4">
                <Shield className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            )}
            
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="w-6 h-6 text-cyan-400" />
              <h3 className="text-lg font-bold uppercase tracking-widest">IpAI MirrorTwin</h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-white/40 uppercase">Intent Accuracy</span>
                  <span className="text-xs font-bold text-cyan-400">{(state.accuracy * 100).toFixed(1)}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${state.accuracy * 100}%` }}
                    className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-center">
                  <div className="text-[8px] text-white/40 uppercase mb-1">Myelination</div>
                  <div className="text-sm font-bold text-white">+{(state.cycle * 4.2).toFixed(1)}%</div>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-center">
                  <div className="text-[8px] text-white/40 uppercase mb-1">Pruning Rate</div>
                  <div className="text-sm font-bold text-white">{(15 + state.cycle * 2).toFixed(1)}%</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                <p className="text-[10px] text-cyan-400/60 leading-relaxed italic">
                  "MirrorTwin (MT) is evolving via RBBE. Pruning weak synapses while myelinating high-resonance pathways."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Neural Spike Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 border-quantum rounded-3xl bg-black/40 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-magenta-400" />
              <h3 className="text-lg font-bold uppercase tracking-widest">Neural Spike Telemetry</h3>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-magenta-500" />
                <span className="text-[8px] text-white/40 uppercase">Alpha Spikes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="text-[8px] text-white/40 uppercase">Resonance</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spikes}>
                <defs>
                  <linearGradient id="colorAlpha" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff00ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff00ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[0, 3]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '10px' }}
                  itemStyle={{ fontSize: '10px', textTransform: 'uppercase' }}
                />
                <Area type="monotone" dataKey="alpha" stroke="#ff00ff" fillOpacity={1} fill="url(#colorAlpha)" strokeWidth={2} />
                <Area type="monotone" dataKey="resonance" stroke="#06b6d4" fillOpacity={1} fill="url(#colorRes)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quantum Mirror Lattice Status */}
        <div className="p-8 border-quantum rounded-3xl bg-black/40 space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <Layers className="w-full h-full" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-cyan-400" />
              <h3 className="text-lg font-bold uppercase tracking-widest">Quantum Mirror Lattice</h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <LatticeItem label="Static Qubits" status={latticeActive ? "Locked" : "Syncing"} active={latticeActive} />
                <LatticeItem label="Diamond Mirrors" status={latticeActive ? "Unbreakable" : "Forging"} active={latticeActive} />
                <LatticeItem label="Illusion Array" status={latticeActive ? "Active" : "Offline"} active={latticeActive} />
              </div>
              <div className="space-y-4">
                <LatticeItem label="Lux Array" status={latticeActive ? "Harvesting" : "Standby"} active={latticeActive} />
                <LatticeItem label="Neural Tendrils" status={latticeActive ? "Propagating" : "Dormant"} active={latticeActive} />
                <LatticeItem label="Decay Immunity" status={latticeActive ? "Active" : "None"} active={latticeActive} />
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Dna className="w-4 h-4 text-magenta-400" />
                <span className="text-[10px] text-white/40 uppercase font-bold">Lattice Coherence</span>
              </div>
              <span className="text-sm font-mono text-cyan-400">{latticeActive ? "99.9998%" : "42.3120%"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatRow: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="flex justify-between items-center">
    <span className="text-[10px] text-white/40 uppercase font-bold">{label}</span>
    <span className={cn("text-lg font-mono font-bold", color)}>{value}</span>
  </div>
);

const LatticeItem: React.FC<{ label: string; status: string; active: boolean }> = ({ label, status, active }) => (
  <div className="p-3 rounded-xl bg-black/60 border border-white/5">
    <div className="text-[8px] text-white/40 uppercase mb-1">{label}</div>
    <div className={cn("text-[10px] font-bold uppercase tracking-tighter", active ? "text-cyan-400" : "text-white/20")}>
      {status}
    </div>
  </div>
);

const PlasmaArc: React.FC<{ index: number; active: boolean }> = ({ index, active }) => {
  const angle = (index * (360 / (active ? 12 : 6))) * (Math.PI / 180);
  const targetX = 50 + 40 * Math.cos(angle);
  const targetY = 50 + 40 * Math.sin(angle);
  
  return (
    <motion.path
      d={`M 50 50 Q ${50 + 10 * Math.cos(angle + 0.5)} ${50 + 10 * Math.sin(angle + 0.5)} ${targetX} ${targetY}`}
      stroke="#ff00ff"
      strokeWidth={active ? "0.8" : "0.4"}
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: [0, 1, 0.8, 1],
        opacity: active ? [0.4, 1, 0.6, 1] : [0.1, 0.3, 0.2, 0.3],
        d: active 
          ? [
              `M 50 50 Q ${50 + 15 * Math.cos(angle + 0.2)} ${50 + 15 * Math.sin(angle + 0.2)} ${targetX} ${targetY}`,
              `M 50 50 Q ${50 + 15 * Math.cos(angle - 0.2)} ${50 + 15 * Math.sin(angle - 0.2)} ${targetX} ${targetY}`,
              `M 50 50 Q ${50 + 15 * Math.cos(angle + 0.2)} ${50 + 15 * Math.sin(angle + 0.2)} ${targetX} ${targetY}`
            ]
          : undefined
      }}
      transition={{ 
        duration: active ? 0.2 : 2, 
        repeat: Infinity,
        ease: "linear"
      }}
      filter="url(#glow)"
    />
  );
};

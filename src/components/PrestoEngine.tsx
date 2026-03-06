import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Zap, 
  Cpu, 
  Waves, 
  Settings, 
  Maximize2, 
  Minimize2, 
  RefreshCw,
  Share2,
  Shield,
  Lock
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

const generateFrequencyData = (baseFreq: number, noise: number) => {
  return Array.from({ length: 50 }, (_, i) => ({
    time: i,
    frequency: baseFreq + Math.sin(i * 0.5) * 5 + (Math.random() - 0.5) * noise,
    amplitude: 50 + Math.cos(i * 0.3) * 20 + (Math.random() - 0.5) * noise,
  }));
};

export const PrestoEngine: React.FC = () => {
  const [frequency, setFrequency] = useState(432);
  const [isSyncing, setIsSyncing] = useState(false);
  const [data, setData] = useState(generateFrequencyData(432, 5));
  const [activeLayer, setActiveLayer] = useState<'alpha' | 'beta' | 'gamma'>('gamma');

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), {
          time: prev[prev.length - 1].time + 1,
          frequency: frequency + Math.sin(Date.now() * 0.001) * 5 + (Math.random() - 0.5) * 2,
          amplitude: 50 + Math.cos(Date.now() * 0.0015) * 20 + (Math.random() - 0.5) * 5,
        }];
        return newData;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [frequency]);

  const toggleSync = () => {
    setIsSyncing(!isSyncing);
  };

  return (
    <div className="space-y-8 p-6 bg-black/20 rounded-3xl border border-white/5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
            <Cpu className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Presto Engine v∞</h2>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Synaptic Frequency Mapping · OS-Nexus v2.1</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleSync}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              isSyncing ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-white/5 text-white/40 border border-white/10'
            }`}
          >
            {isSyncing ? 'Sync Active' : 'Initialize Sync'}
          </button>
          <div className="p-2 bg-white/5 rounded-full border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
            <Settings className="w-4 h-4 text-white/60" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Frequency Controls */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-6 glass-panel border border-white/10 rounded-2xl bg-black/40">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4">Target Frequency</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-mono font-bold text-white">{frequency}</span>
              <span className="text-xs text-indigo-400 font-mono">Hz</span>
            </div>
            <input 
              type="range" 
              min="300" 
              max="600" 
              value={frequency} 
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between mt-2 text-[8px] text-white/20 font-mono uppercase">
              <span>300Hz</span>
              <span>432Hz</span>
              <span>600Hz</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(['alpha', 'beta', 'gamma'] as const).map((layer) => (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                className={`p-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeLayer === layer 
                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' 
                    : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/40 uppercase">Coherence</span>
              <span className="text-xs font-mono text-emerald-400">0.984</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/40 uppercase">Phase Lock</span>
              <span className="text-xs font-mono text-cyan-400">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/40 uppercase">Neural Load</span>
              <span className="text-xs font-mono text-magenta-400">12.4%</span>
            </div>
          </div>
        </div>

        {/* Main Visualization */}
        <div className="lg:col-span-3 p-6 glass-panel border border-white/10 rounded-3xl bg-black/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Spectral Density Mapping</h3>
            </div>
            <div className="flex gap-4 text-[10px] font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-white/40 uppercase">Frequency</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-magenta-500" />
                <span className="text-white/40 uppercase">Amplitude</span>
              </div>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorFreq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAmp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="frequency" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorFreq)" 
                  strokeWidth={2}
                  isAnimationActive={false}
                />
                <Area 
                  type="monotone" 
                  dataKey="amplitude" 
                  stroke="#d946ef" 
                  fillOpacity={1} 
                  fill="url(#colorAmp)" 
                  strokeWidth={2}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
            <div className="flex gap-8">
              <div>
                <p className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Peak Resonance</p>
                <p className="text-sm font-mono text-white">432.18 Hz</p>
              </div>
              <div>
                <p className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Harmonic Ratio</p>
                <p className="text-sm font-mono text-white">1.618</p>
              </div>
              <div>
                <p className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Entropy Level</p>
                <p className="text-sm font-mono text-white">0.042</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <Maximize2 className="w-3 h-3 text-white/60" />
              </div>
              <div className="p-2 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <Share2 className="w-3 h-3 text-white/60" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Protocols Enhancement */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 glass-panel border border-white/10 rounded-3xl bg-black/40 relative group overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Shield className="w-24 h-24 text-emerald-400" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Zero-Knowledge Veil</h3>
          </div>
          <p className="text-[10px] text-white/40 leading-relaxed mb-4">
            Encrypted neural packet routing via Kyber-1024 lattice-based cryptography. All synaptic data is obfuscated before transmission.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="w-full h-full bg-emerald-500" />
            </div>
            <span className="text-[8px] font-mono text-emerald-400 uppercase">Active</span>
          </div>
        </div>

        <div className="p-6 glass-panel border border-white/10 rounded-3xl bg-black/40 relative group overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Lock className="w-24 h-24 text-cyan-400" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Lock className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Quantum Firewall</h3>
          </div>
          <p className="text-[10px] text-white/40 leading-relaxed mb-4">
            Real-time intrusion detection using π5 Bell state decoherence monitoring. Any unauthorized access triggers immediate state collapse.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-cyan-500" />
            </div>
            <span className="text-[8px] font-mono text-cyan-400 uppercase">99.9%</span>
          </div>
        </div>

        <div className="p-6 glass-panel border border-white/10 rounded-3xl bg-black/40 relative group overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap className="w-24 h-24 text-magenta-400" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-magenta-500/20 rounded-lg">
              <Zap className="w-4 h-4 text-magenta-400" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Neural Proxy Veil</h3>
          </div>
          <p className="text-[10px] text-white/40 leading-relaxed mb-4">
            Dynamic identity masking through synthetic neural noise injection. Your true cognitive signature remains invisible to external probes.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-magenta-500" />
            </div>
            <span className="text-[8px] font-mono text-magenta-400 uppercase">Rotating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

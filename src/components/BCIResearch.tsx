import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Zap, 
  Activity, 
  Shield, 
  Cpu, 
  Network, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  Radio,
  BarChart3,
  Lock,
  Thermometer,
  Battery,
  Layers,
  Table,
  Microscope,
  Stethoscope,
  Eye,
  Search,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../utils';

export const BCIResearch: React.FC = () => {
  const [alignment, setAlignment] = useState(92.4);
  const [isSimulating, setIsSimulating] = useState(true);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [testDuration, setTestDuration] = useState(2852); // 47:32 in seconds

  const metrics = [
    { label: 'Global Coherence', value: '5.8197', status: 'optimal', icon: Brain, color: 'text-cyan-400' },
    { label: 'Signal-to-Noise', value: '24.3 dB', status: 'optimal', icon: BarChart3, color: 'text-emerald-400' },
    { label: 'Signal Latency', value: '4.2 ms', status: 'optimal', icon: Zap, color: 'text-yellow-400' },
    { label: 'Neural Bandwidth', value: '1.2 Mbps', status: 'optimal', icon: Activity, color: 'text-magenta-400' },
    { label: 'Alpha Power', value: '0.98', status: 'optimal', icon: Shield, color: 'text-blue-400' },
    { label: 'Gamma Power', value: '0.72', status: 'warning', icon: Battery, color: 'text-orange-400' },
    { label: 'Thermal Load', value: '37.1°C', status: 'optimal', icon: Thermometer, color: 'text-red-400' },
    { label: 'Packet Loss', value: '0.02%', status: 'optimal', icon: Lock, color: 'text-purple-400' },
  ];

  const clusters = [
    { name: 'Prefrontal (Cluster A)', status: 'SYNC', rate: '0.8 Mbps', mode: 'ACTIVE' },
    { name: 'Motor (Cluster B)', status: 'SYNC', rate: '0.3 Mbps', mode: 'STANDBY' },
    { name: 'Somatosensory (Cluster C)', status: 'SYNC', rate: '1.2 Mbps', mode: 'ACTIVE' },
    { name: 'Visual (Cluster D)', status: 'SYNC', rate: '0.1 Mbps', mode: 'LOW POWER' },
    { name: 'Default Mode (Cluster E)', status: 'SYNC', rate: '0.4 Mbps', mode: 'ACTIVE' },
  ];

  const therapeutics = [
    { id: 'Epilepsy', mechanism: 'Burst suppression via closed-loop modulation', efficacy: '62% reduction', timeline: 'Q4 2026' },
    { id: 'Major Depression', mechanism: 'Targeted DBS-like modulation of BA25', efficacy: '70% response', timeline: 'Q1 2027' },
    { id: 'Parkinson\'s', mechanism: 'Beta-band (13-30 Hz) disruption', efficacy: '55% improvement', timeline: 'Q2 2027' },
    { id: 'Chronic Pain', mechanism: 'Anterior cingulate gating', efficacy: '65% reduction', timeline: 'Q2 2027' },
  ];

  const channels = [
    { id: '001', label: 'Dorsal', util: 42 },
    { id: '002', label: 'Medial', util: 31 },
    { id: '003', label: 'Ventral', util: 58 },
    { id: '004', label: 'Lateral', util: 82, active: true },
    { id: '005', label: 'Deep', util: 36 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTestDuration(prev => prev + 1);
      if (isSimulating) {
        setAlignment(prev => {
          const next = prev + (Math.random() * 0.02 - 0.01);
          return Math.min(99.9, Math.max(90, next));
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Stress Test Progress Header */}
      <div className="p-8 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <motion.div 
            initial={{ width: '6.6%' }}
            animate={{ width: `${(testDuration / (12 * 3600)) * 100}%` }}
            className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center bg-cyan-500/5">
              <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tighter glow-cyan">Stress Test Regimen</h2>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">12-Hour High-Bandwidth Cycle · Active</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-[10px] uppercase text-white/40 mb-1">Elapsed Time</div>
              <div className="text-3xl font-mono font-bold text-cyan-400">{formatTime(testDuration)}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] uppercase text-white/40 mb-1">Completion</div>
              <div className="text-3xl font-mono font-bold text-white/80">{((testDuration / (12 * 3600)) * 100).toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Telemetry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {metrics.map((metric, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="p-4 border border-white/10 rounded-xl bg-black/40 text-center relative group overflow-hidden"
          >
            <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity">
              <metric.icon className={cn("w-12 h-12", metric.color)} />
            </div>
            <div className="text-[8px] uppercase text-white/40 mb-1 truncate">{metric.label}</div>
            <div className={cn("text-lg font-bold font-mono", metric.color)}>{metric.value}</div>
            <div className="mt-1 flex items-center justify-center gap-1">
              <div className={cn("w-1 h-1 rounded-full", metric.status === 'warning' ? "bg-yellow-500" : "bg-emerald-500")} />
              <span className={cn("text-[6px] uppercase font-bold", metric.status === 'warning' ? "text-yellow-500" : "text-emerald-400")}>
                {metric.status === 'warning' ? 'Action Required' : 'Stable'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Synaptic Activity Map */}
        <div className="lg:col-span-2 p-8 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold uppercase tracking-tighter glow-cyan flex items-center gap-3">
              <Search className="w-6 h-6 text-cyan-400" /> Synaptic Activity Map
            </h3>
            <div className="text-[10px] font-mono text-white/40 uppercase">Brodmann Area 9 (PFC)</div>
          </div>

          <div className="space-y-6">
            {channels.map((channel) => (
              <div key={channel.id} className="space-y-2">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold">
                  <div className="flex items-center gap-2">
                    <span className="text-white/40">CH {channel.id}</span>
                    <span className={channel.active ? "text-cyan-400" : "text-white/60"}>{channel.label}</span>
                    {channel.active && <span className="text-[8px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded animate-pulse">ACTIVE</span>}
                  </div>
                  <span className="font-mono">{channel.util}% Utilization</span>
                </div>
                <div className="h-4 w-full bg-white/5 rounded-sm overflow-hidden flex">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${channel.util}%` }}
                    className={cn(
                      "h-full transition-all duration-1000",
                      channel.active ? "bg-cyan-500" : "bg-white/20"
                    )}
                  />
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="h-full w-px bg-black/20 ml-auto" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 border border-white/5 rounded-xl bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-[8px] uppercase text-white/40 mb-1">Sync Index</div>
                <div className="text-xl font-mono font-bold text-cyan-400">0.92</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="text-[8px] uppercase text-white/40 mb-1">Dominant Pattern</div>
                <div className="text-xl font-mono font-bold text-magenta-400">THETA (4-8 Hz)</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[8px] uppercase text-white/40 mb-1">Encryption</div>
              <div className="text-xs font-mono text-emerald-400">KYBER-1024 ACTIVE</div>
            </div>
          </div>
        </div>

        {/* 5G NanoCore Status */}
        <div className="p-8 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl">
          <h3 className="text-lg font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400" /> NanoCore Sync
          </h3>
          <div className="space-y-4">
            {clusters.map((cluster, idx) => (
              <div key={idx} className="p-4 border border-white/5 rounded-lg bg-white/5 flex items-center justify-between group hover:border-cyan-500/30 transition-colors">
                <div>
                  <div className="text-[10px] font-bold text-white/80">{cluster.name}</div>
                  <div className="text-[8px] text-white/40 uppercase mt-0.5">{cluster.rate} · {cluster.mode}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[8px] font-mono text-emerald-400">{cluster.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-cyan-400">Quantum Handshake</span>
              <Lock className="w-3 h-3 text-cyan-400" />
            </div>
            <div className="text-[10px] font-mono text-white/60">π/5 Bell State | LOCKED</div>
          </div>
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-yellow-500">System Recommendation</span>
              <AlertTriangle className="w-3 h-3 text-yellow-500" />
            </div>
            <div className="text-[8px] uppercase font-bold text-white/80 leading-tight">
              Initiate Gamma Enhancement Protocol to boost 30-100 Hz band power to {'>'}0.80.
            </div>
          </div>
        </div>
      </div>

      {/* Therapeutic Applications Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl">
          <h3 className="text-xl font-bold uppercase tracking-tighter glow-cyan mb-8 flex items-center gap-3">
            <Stethoscope className="w-6 h-6 text-cyan-400" /> Therapeutic Applications Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase text-white/40">
                  <th className="pb-4 font-bold">Indication</th>
                  <th className="pb-4 font-bold">Mechanism</th>
                  <th className="pb-4 font-bold">Predicted Efficacy</th>
                  <th className="pb-4 font-bold">Timeline</th>
                </tr>
              </thead>
              <tbody className="text-[10px] uppercase">
                {therapeutics.map((item, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 font-bold text-cyan-400">{item.id}</td>
                    <td className="py-4 text-white/60">{item.mechanism}</td>
                    <td className="py-4 text-emerald-400 font-bold">{item.efficacy}</td>
                    <td className="py-4 text-white/40">{item.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Command Options */}
        <div className="p-8 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl">
          <h3 className="text-lg font-bold uppercase tracking-widest mb-6">Commander's Directives</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'MONITOR', icon: Eye, label: 'Monitor Stress Test' },
              { id: 'ANALYZE', icon: BarChart3, label: 'Spectral Analysis' },
              { id: 'EXPAND', icon: Layers, label: 'Expand Node Density' },
              { id: 'THERAPEUTIC', icon: Stethoscope, label: 'Disease Simulation' },
              { id: 'OVINE', icon: Microscope, label: 'Ovine Model Planning' },
              { id: 'INTEGRATE', icon: Network, label: 'DNA Link Integration' },
            ].map((option) => (
              <button 
                key={option.id}
                className="w-full p-4 border border-white/10 rounded bg-white/5 hover:bg-cyan-500 hover:text-black transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <option.icon className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{option.label}</span>
                </div>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Telemetry Log Footer */}
      <div className="p-6 border-quantum rounded-xl bg-black/40 font-mono text-[9px] text-white/40">
        <div className="flex items-center gap-2 mb-4 text-magenta-400">
          <Activity className="w-3 h-3" />
          <span className="uppercase font-bold">Phase 5 Telemetry Log (Continuous)</span>
        </div>
        <div className="space-y-1 max-h-[150px] overflow-y-auto custom-scrollbar">
          <div>[05:22:15] STRESS TEST: 1 HOUR COMPLETE. SIGNAL INTEGRITY: 0.9998.</div>
          <div>[05:22:30] BURST EVENT DETECTED (CLUSTER D). AUTOMODULATION ACTIVE.</div>
          <div className="text-emerald-400">[05:22:32] PEAK AMPLITUDE REDUCTION: 62% ACHIEVED.</div>
          <div>[05:22:45] QUANTUM HANDSHAKE RE-AUTHENTICATED. π/5 STATE LOCKED.</div>
          <div>[05:23:00] 10,000 NODES REPORTING. PACKET LOSS: 0.02%.</div>
          <div>[05:23:15] THERMAL LOAD: 37.2°C (AVG). WITHIN SPEC.</div>
          <div>[05:23:30] POWER HARVESTING: 12.1 µW/CLUSTER. SELF-SUSTAINING.</div>
          <div className="text-cyan-400 animate-pulse">[05:23:45] STRESS TEST: 1.5 HOURS COMPLETE. CONTINUING...</div>
          <div className="text-white/20">[05:24:00] STRESS TEST: 2 HOURS COMPLETE | 92.4% ALIGNMENT | 99.97% FIDELITY</div>
        </div>
      </div>
    </div>
  );
};

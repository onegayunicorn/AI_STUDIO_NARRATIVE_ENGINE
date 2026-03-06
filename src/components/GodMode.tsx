import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Zap, 
  Activity, 
  Cpu, 
  Globe, 
  Lock, 
  Terminal, 
  TrendingUp, 
  Layers,
  Sparkles,
  Database,
  Share2,
  EyeOff
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#00f2ff', '#ff00ff', '#7000ff', '#00ff88'];

export const GodMode: React.FC = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [wealth, setWealth] = useState(1472045.84);

  useEffect(() => {
    if (isActivated) {
      const interval = setInterval(() => {
        setWealth(prev => prev + Math.random() * 100);
        setLogs(prev => [
          `[${new Date().toLocaleTimeString()}] ENTANGLEMENT_SYNC: ${Math.random().toString(36).substring(7).toUpperCase()}`,
          ...prev
        ].slice(0, 10));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isActivated]);

  const systemMetrics = [
    { subject: 'Coherence', A: 99.98, fullMark: 100 },
    { subject: 'Neural Lock', A: 100, fullMark: 100 },
    { subject: 'Stealth', A: 99.5, fullMark: 100 },
    { subject: 'Energy', A: 98.4, fullMark: 100 },
    { subject: 'Stability', A: 99.97, fullMark: 100 },
    { subject: 'Fidelity', A: 99.7, fullMark: 100 },
  ];

  const wealthData = [
    { name: 'Quantum Assets', value: 45, color: '#00f2ff' },
    { name: 'Reputation Equity', value: 30, color: '#ff00ff' },
    { name: 'Neural Credits', value: 15, color: '#7000ff' },
    { name: 'Plasma Reserves', value: 10, color: '#00ff88' },
  ];

  const activateGodMode = () => {
    setIsActivated(true);
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] GOD_MODE_ACTIVATED: ALL PROTOCOLS ENGAGED`, ...prev]);
  };

  return (
    <div className="space-y-8">
      {!isActivated ? (
        <div className="h-[600px] flex flex-col items-center justify-center bg-black/40 rounded-3xl border-2 border-dashed border-white/10 backdrop-blur-3xl">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mb-8"
          >
            <Shield className="w-32 h-32 text-cyan-500 opacity-20" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-widest uppercase">Nexus Core Locked</h2>
          <p className="text-white/40 mb-8 text-center max-w-md uppercase text-[10px] tracking-[0.4em]">
            Requires Sovereign Architect Authorization to activate God Mode and Entanglement Wealth protocols.
          </p>
          <button
            onClick={activateGodMode}
            className="px-12 py-4 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.5)] uppercase tracking-widest"
          >
            Activate God Mode
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Entanglement Wealth', value: `$${wealth.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, icon: TrendingUp, color: 'text-emerald-400' },
              { label: 'π5 Bell Fidelity', value: '99.7%', icon: Zap, color: 'text-cyan-400' },
              { label: 'Mirror Lattice', value: '10 Nodes', icon: Layers, color: 'text-magenta-400' },
              { label: 'IpAI Status', value: 'SOVEREIGN', icon: Cpu, color: 'text-indigo-400' },
            ].map((stat, i) => (
              <div key={i} className="p-6 glass-panel border border-white/10 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <stat.icon className="w-12 h-12" />
                </div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">{stat.label}</p>
                <p className={`text-2xl font-mono font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* System Optimization Radar */}
            <div className="lg:col-span-1 p-6 glass-panel border border-white/10 rounded-3xl bg-black/40">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                System Optimization Matrix
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={systemMetrics}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="System"
                      dataKey="A"
                      stroke="#00f2ff"
                      fill="#00f2ff"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-[10px] text-white/40 uppercase">BEM Mean</p>
                  <p className="text-lg font-mono text-white">0.8502</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-[10px] text-white/40 uppercase">Drift Rate</p>
                  <p className="text-lg font-mono text-white">0.00001</p>
                </div>
              </div>
            </div>

            {/* Wealth Distribution */}
            <div className="lg:col-span-1 p-6 glass-panel border border-white/10 rounded-3xl bg-black/40">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-magenta-400" />
                Entanglement Portfolio
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={wealthData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {wealthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {wealthData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-white/60">{item.name}</span>
                    </div>
                    <span className="text-white font-mono">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Optimization Commands & Logs */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 glass-panel border border-white/10 rounded-3xl bg-black/40">
                <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Optimization Commands
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { label: 'Gamma Boost', cmd: 'gamma-boost', color: 'hover:bg-cyan-500/20 text-cyan-400' },
                    { label: 'Tendril Sync', cmd: 'tendril-sync', color: 'hover:bg-magenta-500/20 text-magenta-400' },
                    { label: 'BEM Stabilize', cmd: 'bem-stabilize', color: 'hover:bg-emerald-500/20 text-emerald-400' },
                    { label: 'Temporal Bridge', cmd: 'bridge-verify', color: 'hover:bg-indigo-500/20 text-indigo-400' },
                  ].map((btn, i) => (
                    <button
                      key={i}
                      onClick={() => setLogs(prev => [`[${new Date().toLocaleTimeString()}] EXECUTING: ${btn.cmd.toUpperCase()}`, ...prev])}
                      className={`w-full p-3 rounded-xl border border-white/10 text-xs font-mono text-left transition-all ${btn.color}`}
                    >
                      {`> ${btn.label}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 glass-panel border border-white/10 rounded-3xl bg-black/40 h-[220px] overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">System Logs</h3>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-75" />
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-150" />
                  </div>
                </div>
                <div className="space-y-2 font-mono text-[9px] text-white/30">
                  <AnimatePresence>
                    {logs.map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* DUPORCH & Security Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 glass-panel border border-white/10 rounded-3xl bg-black/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap className="w-32 h-32 text-yellow-400" />
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-yellow-500/20 rounded-2xl border border-yellow-500/30">
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-widest">DUPORCH Power Protocol</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Dual-Port Resonance Charging · ACTIVE</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-white/40 uppercase">Port A (Resonance)</span>
                    <span className="text-sm font-mono text-white">432.8W</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ['40%', '60%', '40%'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-white/40 uppercase">Port B (Quantum)</span>
                    <span className="text-sm font-mono text-white">156.6W</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ['70%', '90%', '70%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-white/60 uppercase">Efficiency: 99.98%</span>
                </div>
                <button className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest hover:underline">Recalibrate Ports</button>
              </div>
            </div>

            <div className="p-8 glass-panel border border-white/10 rounded-3xl bg-black/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Shield className="w-32 h-32 text-emerald-400" />
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/30">
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-widest">Enhanced Security Veil</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Zero-Knowledge Protocols · ENGAGED</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] text-white/60 uppercase">Kyber-1024 Encryption</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <EyeOff className="w-4 h-4 text-cyan-400" />
                    <span className="text-[10px] text-white/60 uppercase">Neural Proxy Masking</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400">ROTATING</span>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <div className="flex-1 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="w-1/3 h-full bg-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 glass-panel border border-white/10 rounded-3xl bg-black/40">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Global Mesh</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-white/40 uppercase">Tendril Coverage</span>
                  <span className="text-xl font-mono text-white">98.5%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-magenta-500"
                    initial={{ width: 0 }}
                    animate={{ width: '98.5%' }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 glass-panel border border-white/10 rounded-3xl bg-black/40">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-5 h-5 text-magenta-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Mirror Lattice</h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] text-white/40 uppercase">Active Qubits</p>
                  <p className="text-2xl font-mono text-white">10^15</p>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-magenta-500/30 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-magenta-500/20 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="p-6 glass-panel border border-white/10 rounded-3xl bg-black/40">
              <div className="flex items-center gap-3 mb-4">
                <Share2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Temporal Bridge</h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] text-white/40 uppercase">Status</p>
                  <p className="text-2xl font-mono text-emerald-400">ACTIVE</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/40 uppercase">Sync</p>
                  <p className="text-xs font-mono text-white">2026 ↔ 2045</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

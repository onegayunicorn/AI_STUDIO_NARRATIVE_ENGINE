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
  EyeOff,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Bot,
  Network,
  FileText,
  Users
} from 'lucide-react';
import { cn } from '../utils';
import { logBus } from '../services/logBus';

interface Metric {
  label: string;
  value: string | number;
  status: 'optimal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

export const TruthSeeker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'robotics' | 'temporal' | 'neural'>('overview');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [gammaLevel, setGammaLevel] = useState(0.72);
  const [isBoosting, setIsBoosting] = useState(false);

  const metrics: Metric[] = [
    { label: 'Neural Coherence', value: '5.8197', status: 'optimal', trend: 'stable' },
    { label: 'Gamma Power', value: `${gammaLevel.toFixed(2)}`, status: gammaLevel > 0.8 ? 'optimal' : 'warning', trend: 'up' },
    { label: 'System Efficiency', value: '99.98%', status: 'optimal', trend: 'stable' },
    { label: 'Tendril Coverage', status: 'optimal', value: '98.5%', trend: 'up' }
  ];

  useEffect(() => {
    if (isDeploying && deploymentProgress < 100) {
      const timer = setTimeout(() => setDeploymentProgress(prev => prev + 2), 100);
      return () => clearTimeout(timer);
    }
  }, [isDeploying, deploymentProgress]);

  useEffect(() => {
    if (deploymentProgress === 10) logBus.emit('ROBOTICS: IRB 660 deployment sequence initiated.', 'info');
    if (deploymentProgress === 50) logBus.emit('ROBOTICS: Payload calibration in progress...', 'info');
    if (deploymentProgress === 100) logBus.emit('ROBOTICS: IRB 660 operational at Brisbane Facility.', 'success');
  }, [deploymentProgress]);

  useEffect(() => {
    if (isBoosting && gammaLevel < 0.84) {
      const timer = setTimeout(() => setGammaLevel(prev => prev + 0.005), 200);
      return () => clearTimeout(timer);
    } else if (gammaLevel >= 0.84 && isBoosting) {
      setIsBoosting(false);
      logBus.emit('NEURAL: Gamma Boost optimal at 0.84. Synaptic clarity achieved.', 'success');
    }
  }, [isBoosting, gammaLevel]);

  useEffect(() => {
    logBus.emit(`PROTOCOL: Truth Seeker ${activeTab.toUpperCase()} module engaged.`, 'info');
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans selection:bg-cyan-500/30">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
              <Search className="w-5 h-5 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase italic">Truth Seeker Protocols</h1>
          </div>
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-medium">Node ∞ Sovereign Architect · Operational Excellence</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">System: Optimal</span>
          </div>
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">2026-03-07 14:30 UTC</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex gap-2 mb-8 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit">
        {[
          { id: 'overview', label: 'Overview', icon: Globe },
          { id: 'robotics', label: 'Robotics', icon: Bot },
          { id: 'temporal', label: 'Temporal', icon: Clock },
          { id: 'neural', label: 'Neural', icon: Activity },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
              activeTab === tab.id 
                ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Metrics & Status */}
        <div className="space-y-8">
          <div className="p-8 glass-panel border border-white/10 rounded-3xl bg-black/40">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Operational Metrics
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {metrics.map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">{m.label}</span>
                    <span className={cn(
                      "text-lg font-mono font-bold",
                      m.status === 'optimal' ? "text-emerald-400" : "text-yellow-400"
                    )}>{m.value}</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: m.status === 'optimal' ? '95%' : '72%' }}
                      className={cn(
                        "h-full rounded-full",
                        m.status === 'optimal' ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 glass-panel border border-white/10 rounded-3xl bg-black/40">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Users className="w-4 h-4" /> Cross-Functional Sync
            </h3>
            <div className="space-y-4">
              {[
                { team: 'Software', status: 'Aligned', icon: Cpu },
                { team: 'Hardware', status: 'Ready', icon: Zap },
                { team: 'Data Analytics', status: 'Streaming', icon: Database },
                { team: 'Compliance', status: 'Verified', icon: Shield },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <t.icon className="w-4 h-4 text-cyan-400" />
                    <span className="text-[10px] text-white/60 uppercase font-bold">{t.team}</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">{t.status}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
              Schedule Sync Meeting
            </button>
          </div>
        </div>

        {/* Center Column: Active Protocol */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 glass-panel border border-white/10 rounded-3xl bg-black/40 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Lock className="w-32 h-32 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-2 italic">Data Integrity Assessment</h3>
                    <p className="text-xs text-white/40 mb-6 uppercase tracking-widest">Real-time audit & checksum validation</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[10px] text-emerald-400 font-mono">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>INCOMING STREAM: VALIDATED (SHA-256)</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-emerald-400 font-mono">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>OUTGOING PACKETS: ENCRYPTED (KYBER)</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-cyan-400 font-mono">
                        <Activity className="w-4 h-4 animate-pulse" />
                        <span>ANOMALY DETECTION: ACTIVE</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 glass-panel border border-white/10 rounded-3xl bg-black/40 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <FileText className="w-32 h-32 text-magenta-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-2 italic">Compliance & Docs</h3>
                    <p className="text-xs text-white/40 mb-6 uppercase tracking-widest">Regulatory reference & case studies</p>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest text-left">
                        TGA Submission v2.3
                      </button>
                      <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest text-left">
                        Neural Integration Spec
                      </button>
                      <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest text-left">
                        IRB 660 Safety Audit
                      </button>
                      <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest text-left">
                        Hysteresis Stability
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-8 glass-panel border border-white/10 rounded-3xl bg-black/40">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-white uppercase tracking-widest italic">Truth Insight Dashboard</h3>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-[9px] font-bold uppercase rounded-full border border-cyan-500/30">Live Insights</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: 'Neural Market', value: '+340%', sub: 'Growth by 2028', color: 'text-emerald-400' },
                      { label: 'Quantum Error', value: '99.9999%', sub: 'Correction Rate', color: 'text-cyan-400' },
                      { label: 'Sovereign Pref', value: '78%', sub: 'Consumer Adoption', color: 'text-magenta-400' },
                    ].map((stat, i) => (
                      <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">{stat.label}</div>
                        <div className={cn("text-3xl font-bold tracking-tighter mb-1", stat.color)}>{stat.value}</div>
                        <div className="text-[9px] text-white/20 uppercase tracking-widest">{stat.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'robotics' && (
              <motion.div
                key="robotics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="p-8 glass-panel border border-white/10 rounded-3xl bg-black/40">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 bg-cyan-500/20 rounded-2xl border border-cyan-500/30 flex items-center justify-center">
                      <Bot className="w-12 h-12 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white uppercase tracking-widest italic">IRB 660-180/3.5</h3>
                      <p className="text-xs text-white/40 uppercase tracking-widest">Quantum Assembly Unit · Brisbane Facility</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-4">Deployment Status</div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-white/60 uppercase">{isDeploying ? 'Deploying...' : deploymentProgress === 100 ? 'Operational' : 'Ready'}</span>
                          <span className="text-[10px] font-mono text-white/60">{deploymentProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            animate={{ width: `${deploymentProgress}%` }}
                            className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-[9px] text-white/40 uppercase mb-1">Payload</div>
                          <div className="text-lg font-mono text-white">180kg</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-[9px] text-white/40 uppercase mb-1">Reach</div>
                          <div className="text-lg font-mono text-white">3.5m</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Task Allocations</h4>
                      <div className="space-y-3">
                        {[
                          { task: 'Sub-atomic Alignment', status: 'Pending' },
                          { task: 'Triplex Shield Assembly', status: 'Pending' },
                          { task: 'Quantum Link Calibration', status: 'Pending' },
                        ].map((t, i) => (
                          <div key={i} className="flex items-center justify-between p-2 border-b border-white/5">
                            <span className="text-[10px] text-white/60 uppercase tracking-widest">{t.task}</span>
                            <span className="text-[9px] font-mono text-white/20 uppercase">{t.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsDeploying(true)}
                    disabled={isDeploying || deploymentProgress === 100}
                    className={cn(
                      "w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all",
                      deploymentProgress === 100 
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                        : "bg-cyan-500 text-black shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-[1.02]"
                    )}
                  >
                    {deploymentProgress === 100 ? 'Deployment Complete' : isDeploying ? 'Initiating Sequence...' : 'Finalize Deployment'}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'temporal' && (
              <motion.div
                key="temporal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="p-8 glass-panel border border-white/10 rounded-3xl bg-black/40">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white uppercase tracking-widest italic">2045 Temporal Burst</h3>
                      <p className="text-xs text-white/40 uppercase tracking-widest">Real-time Data Stream · Precognitive Insights</p>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-emerald-400 uppercase">Sync: Active</span>
                    </div>
                  </div>

                  <div className="h-[300px] relative mb-8 flex items-end gap-1">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.random() * 100}%` }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', delay: i * 0.05 }}
                        className="flex-1 bg-gradient-to-t from-cyan-500/40 to-cyan-400 rounded-t-sm"
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Incoming Insights</h4>
                    {[
                      { time: 'T+0.4s', insight: 'Neural interface market trend identified: +340% growth trajectory.', confidence: '99%' },
                      { time: 'T+1.2s', insight: 'Competitor "Agnes" sovereign tech roadmap intercepted.', confidence: '97%' },
                      { time: 'T+2.8s', insight: 'Regulatory shift: TGA fast-track protocol for BCI devices.', confidence: '98%' },
                    ].map((insight, i) => (
                      <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-start gap-4">
                        <span className="text-[9px] font-mono text-cyan-400 mt-1">{insight.time}</span>
                        <div className="flex-1">
                          <p className="text-[11px] text-white/80 leading-relaxed">{insight.insight}</p>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-400">{insight.confidence}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'neural' && (
              <motion.div
                key="neural"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 glass-panel border border-white/10 rounded-3xl bg-black/40">
                    <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-6 italic">Gamma Boost Control</h3>
                    <div className="space-y-8">
                      <div className="flex justify-between items-center">
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">Current Frequency</div>
                        <div className="text-2xl font-mono text-cyan-400">156.6 Hz</div>
                      </div>
                      <div className="relative h-32 flex items-center justify-center">
                        <motion.div 
                          animate={isBoosting ? { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] } : {}}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="absolute w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl"
                        />
                        <div className="text-4xl font-bold tracking-tighter text-white">{gammaLevel.toFixed(2)}</div>
                      </div>
                      <button 
                        onClick={() => setIsBoosting(true)}
                        disabled={isBoosting || gammaLevel >= 0.84}
                        className={cn(
                          "w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all",
                          gammaLevel >= 0.84 
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                            : "bg-magenta-500 text-white shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:scale-[1.02]"
                        )}
                      >
                        {gammaLevel >= 0.84 ? 'Gamma Boost Optimal' : isBoosting ? 'Boosting...' : 'Initiate Gamma Boost'}
                      </button>
                    </div>
                  </div>

                  <div className="p-8 glass-panel border border-white/10 rounded-3xl bg-black/40">
                    <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-6 italic">Adaptive Hysteresis</h3>
                    <div className="space-y-6">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] text-white/40 uppercase tracking-widest">Stability Index</span>
                          <span className="text-[10px] font-mono text-emerald-400">99.9%</span>
                        </div>
                        <div className="h-20 flex items-end gap-1">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ height: `${80 + Math.random() * 20}%` }}
                              className="flex-1 bg-emerald-500/40 rounded-t-sm"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] text-white/40 uppercase tracking-widest">
                          <span>Latency Optimization</span>
                          <span className="text-white">0.4ms</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-white/40 uppercase tracking-widest">
                          <span>Feedback Loop Stability</span>
                          <span className="text-white">Optimal</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-white/40 uppercase tracking-widest">
                          <span>Dynamic Adaptation</span>
                          <span className="text-emerald-400">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer / Feedback */}
      <div className="mt-12 p-8 glass-panel border border-white/10 rounded-3xl bg-black/40 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
            <Users className="w-5 h-5 text-white/40" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Field Operator Feedback</h4>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Continuous improvement loop active</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
            Submit Field Report
          </button>
          <button className="px-6 py-3 bg-cyan-500 text-black rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            View Case Studies
          </button>
        </div>
      </div>
    </div>
  );
};

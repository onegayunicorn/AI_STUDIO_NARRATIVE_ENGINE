import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Activity, Thermometer, Droplets, AlertTriangle, Play, FastForward, Edit3 } from 'lucide-react';
import { cn } from '../utils';

export const DNAOrigamiTest: React.FC = () => {
  const [progress, setProgress] = useState(48);
  const [isStressing, setIsStressing] = useState(true);
  const [nucleaseStress, setNucleaseStress] = useState(12.47);
  const [coherence, setCoherence] = useState(0.9997);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 0.05, 100));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [progress]);

  const handleStressTest = () => {
    setIsStressing(true);
    setNucleaseStress(12);
    setCoherence(0.9991);
    
    setTimeout(() => {
      setIsStressing(false);
      setNucleaseStress(1);
      setCoherence(0.9997);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Test Status */}
        <div className="lg:col-span-2 p-6 border-quantum rounded-lg bg-black/40 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold uppercase tracking-widest text-cyan-400">Phase 2: Triplex Shield Delivery</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Protocol: DNA_ORIGAMI_V2.0 · 10,000 Concurrent Events</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono text-cyan-400">{progress.toFixed(1)}%</div>
              <div className="text-[10px] uppercase opacity-50">Test Completion</div>
            </div>
          </div>

          <div className="relative h-4 bg-white/5 rounded-full overflow-hidden mb-12">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-magenta-500"
              animate={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full opacity-20 quantum-grid" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Hoogsteen Stability', value: 'pH 5.8', icon: Droplets, color: 'text-blue-400' },
              { label: 'Nuclease Resistance', value: `${nucleaseStress}x`, icon: Shield, color: 'text-emerald-400' },
              { label: 'Quantum Coherence', value: coherence.toFixed(4), icon: Activity, color: 'text-magenta-400' },
              { label: 'Lid Actuation', value: 'READY', icon: Zap, color: 'text-yellow-400' },
            ].map((metric, i) => (
              <div key={i} className="p-4 border border-white/5 rounded bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon className={cn("w-3 h-3", metric.color)} />
                  <span className="text-[10px] uppercase opacity-50">{metric.label}</span>
                </div>
                <div className="text-sm font-bold font-mono">{metric.value}</div>
              </div>
            ))}
          </div>

          {isStressing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-red-500/10 flex items-center justify-center backdrop-blur-sm pointer-events-none"
            >
              <div className="flex flex-col items-center gap-4">
                <AlertTriangle className="w-12 h-12 text-red-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.5em] text-red-500">Environmental Stress Active</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Command Prompt */}
        <div className="p-6 border-quantum rounded-lg bg-black/40">
          <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-yellow-400">Command Prompt</h3>
          <div className="space-y-4">
            <button 
              onClick={handleStressTest}
              disabled={isStressing}
              className="w-full flex items-center gap-4 p-4 border border-red-500/20 rounded bg-red-500/5 hover:bg-red-500/10 transition-all text-left group"
            >
              <div className="p-2 bg-red-500/20 rounded group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase">[A] Trigger Stress</div>
                <div className="text-[10px] opacity-50 uppercase">Test Structural Limits</div>
              </div>
            </button>

            <button className="w-full flex items-center gap-4 p-4 border border-cyan-500/20 rounded bg-cyan-500/5 hover:bg-cyan-500/10 transition-all text-left group">
              <div className="p-2 bg-cyan-500/20 rounded group-hover:scale-110 transition-transform">
                <FastForward className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase">[B] Accelerate</div>
                <div className="text-[10px] opacity-50 uppercase">Skip to 72-Week Analysis</div>
              </div>
            </button>

            <button className="w-full flex items-center gap-4 p-4 border border-magenta-500/20 rounded bg-magenta-500/5 hover:bg-magenta-500/10 transition-all text-left group">
              <div className="p-2 bg-magenta-500/20 rounded group-hover:scale-110 transition-transform">
                <Edit3 className="w-5 h-5 text-magenta-400" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase">[C] Modify Cargo</div>
                <div className="text-[10px] opacity-50 uppercase">Switch to BNA-Modified TFOs</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Technical Log */}
      <div className="p-6 border-quantum rounded-lg bg-black/40 font-mono text-[10px] text-white/40">
        <div className="flex items-center gap-2 mb-4 text-yellow-400">
          <Activity className="w-3 h-3" />
          <span className="uppercase font-bold">Real-Time Delivery Telemetry</span>
        </div>
        <div className="space-y-1">
          <div>[04:04:49] INITIALIZING TRIPLEX SHIELD DELIVERY PROTOCOL...</div>
          <div>[04:04:50] HOOGSTEEN STABILITY VERIFIED AT pH 5.8.</div>
          <div>[04:04:51] NUCLEASE RESISTANCE COEFFICIENT: 12.47.</div>
          <div>[04:04:52] LID ACTUATION SEQUENCE ARMED (CRISPR-CAS9 CARGO).</div>
          {isStressing && <div className="text-red-500 animate-pulse">[04:05:12] WARNING: HIGH-NUCLEASE ENVIRONMENT DETECTED. TESTING STRUCTURAL LIMITS...</div>}
        </div>
      </div>
    </div>
  );
};

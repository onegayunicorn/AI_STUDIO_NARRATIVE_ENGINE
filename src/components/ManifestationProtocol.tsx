import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Rocket, BarChart3, FileText, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { ManifestationOption, ComparisonMetric } from '../types';
import { cn } from '../utils';

export const ManifestationProtocol: React.FC = () => {
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const protocols: ManifestationOption[] = [
    { id: 'procure', label: 'Finalize Procurement', description: 'Generate B2B Tech Pack for Tilibit Nanosystems including .json coordinates.', status: 'pending' },
    { id: 'disrupt', label: 'Market Disruption', description: 'Run competitive simulation against AAV systems to calculate Cost-per-Dose.', status: 'pending' },
    { id: 'orbital', label: 'Orbital Integration', description: 'Sync Space Drone module to calculate G-force limits for Astroscale orbits.', status: 'pending' },
  ];

  const comparison: ComparisonMetric[] = [
    { label: 'Cost per Dose', aav: '$5,000 - $50,000', triplex: '$150 - $800' },
    { label: 'Production Time', aav: '6-12 Months', triplex: '2-4 Weeks' },
    { label: 'Cargo Capacity', aav: '< 5 kb', triplex: '< 50 kb' },
    { label: 'Scalability', aav: 'Challenging', triplex: 'Unlimited' },
  ];

  const handleExecute = (id: string) => {
    setActiveProtocol(id);
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {protocols.map((protocol) => (
          <motion.div 
            key={protocol.id}
            whileHover={{ y: -5 }}
            className={cn(
              "p-6 border-quantum rounded-xl bg-black/40 relative overflow-hidden group transition-all",
              activeProtocol === protocol.id ? "border-cyan-500/50 ring-1 ring-cyan-500/20" : "hover:border-white/20"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  "p-3 rounded-lg",
                  protocol.id === 'procure' ? "bg-blue-500/20 text-blue-400" :
                  protocol.id === 'disrupt' ? "bg-magenta-500/20 text-magenta-400" : "bg-yellow-500/20 text-yellow-400"
                )}>
                  {protocol.id === 'procure' ? <FileText className="w-6 h-6" /> :
                   protocol.id === 'disrupt' ? <BarChart3 className="w-6 h-6" /> : <Rocket className="w-6 h-6" />}
                </div>
                {activeProtocol === protocol.id && isProcessing ? (
                  <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                ) : activeProtocol === protocol.id ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : null}
              </div>

              <h4 className="text-lg font-bold uppercase tracking-tighter mb-2">{protocol.label}</h4>
              <p className="text-[10px] text-white/40 uppercase leading-relaxed mb-6">{protocol.description}</p>

              <button 
                onClick={() => handleExecute(protocol.id)}
                disabled={isProcessing}
                className="w-full py-3 bg-white/5 hover:bg-white/10 rounded text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn"
              >
                Execute Protocol <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProtocol === 'disrupt' && !isProcessing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 border-quantum rounded-xl bg-black/60 backdrop-blur-md"
          >
            <h3 className="text-xl font-bold uppercase glow-cyan mb-8 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-cyan-400" /> Competitive Simulation Results
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {comparison.map((item, i) => (
                <div key={i} className="p-4 border border-white/5 rounded-lg bg-white/5">
                  <div className="text-[10px] uppercase opacity-50 mb-4">{item.label}</div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-[8px] uppercase opacity-30 mb-1">AAV (Viral)</div>
                      <div className="text-sm font-mono text-white/60">{item.aav}</div>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <div className="text-[8px] uppercase text-cyan-400 mb-1">Triplex Shield</div>
                      <div className="text-lg font-bold font-mono text-cyan-400">{item.triplex}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 border border-emerald-500/20 rounded bg-emerald-500/5 text-[10px] uppercase tracking-widest text-emerald-400 text-center">
              Economic Disruption Confirmed: 30-60x Cost Reduction Potential at Scale.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-6 border-quantum rounded-xl bg-black/40 font-mono text-[10px] text-white/40">
        <div className="flex items-center gap-2 mb-4 text-cyan-400">
          <Zap className="w-3 h-3" />
          <span className="uppercase font-bold">Manifestation Sequence Log</span>
        </div>
        <div className="space-y-1">
          <div>[04:13:52] INITIALIZING MANIFESTATION PROTOCOL...</div>
          <div>[04:13:53] REALITY STABILITY: 99.97% | COHERENCE: 0.9998</div>
          {activeProtocol && <div>[04:14:05] EXECUTING: {protocols.find(p => p.id === activeProtocol)?.label.toUpperCase()}...</div>}
          {activeProtocol && !isProcessing && <div className="text-emerald-400">[04:14:08] PROTOCOL EXECUTION SUCCESSFUL. DATA INTEGRATED.</div>}
        </div>
      </div>
    </div>
  );
};

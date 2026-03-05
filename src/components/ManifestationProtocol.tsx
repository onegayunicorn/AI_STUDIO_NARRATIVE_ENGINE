import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Rocket, BarChart3, FileText, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { ManifestationOption, ComparisonMetric } from '../types';
import { cn } from '../utils';

export const ManifestationProtocol: React.FC = () => {
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const protocols: ManifestationOption[] = [
    { id: 'procure', label: 'Generate Purchase Order', description: 'Formally export the B2B Tech Pack (.json coordinates + BNA-TFO sequences) to Tilibit Nanosystems.', status: 'pending' },
    { id: 'disrupt', label: 'Export Investor Deck', description: 'Compile 72-Week Asia-Pacific Follow-up data and AAV vs. Triplex cost-comparison for stakeholders.', status: 'pending' },
    { id: 'orbital', label: 'Commit Launch Slot', description: 'Finalize telemetry handshake with D-Orbit and Astroscale for SpaceX Transporter-26 mission.', status: 'pending' },
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
                {activeProtocol === protocol.id && !isProcessing ? 'Protocol Manifested' : 'Execute Protocol'} 
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProtocol === 'procure' && !isProcessing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 border-quantum rounded-xl bg-black/60 backdrop-blur-md"
          >
            <h3 className="text-xl font-bold uppercase glow-cyan mb-8 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-400" /> B2B Purchase Order: Tilibit Nanosystems
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-[10px]">
              <div className="space-y-4">
                <div className="p-4 border border-white/10 rounded bg-white/5">
                  <div className="text-blue-400 mb-2 uppercase font-bold">Folding Coordinates (.json)</div>
                  <div className="opacity-60 break-all">
                    {"{"}"scaffold": "M13mp18", "staples": 214, "geometry": "hollow_box_v2", "triplex_density": 0.18, "lids": 2{"}"}
                  </div>
                </div>
                <div className="p-4 border border-white/10 rounded bg-white/5">
                  <div className="text-blue-400 mb-2 uppercase font-bold">BNA-Modified TFO Sequences</div>
                  <div className="space-y-1">
                    <div>TFO_1: [BnA]G [BnA]G [BnA]G - T - T - T - [BnA]G [BnA]G [BnA]G</div>
                    <div>TFO_2: [BnA]A [BnA]A [BnA]A - C - C - C - [BnA]A [BnA]A [BnA]A</div>
                  </div>
                </div>
              </div>
              <div className="p-6 border border-emerald-500/20 rounded bg-emerald-500/5 flex flex-col justify-center">
                <div className="text-emerald-400 text-lg font-bold mb-2 uppercase">PO STATUS: EXPORTED</div>
                <div className="text-white/60 uppercase tracking-widest leading-relaxed">
                  Prototype fabrication initiated. Estimated delivery: 14 days. 
                  Targeting 10,000 unit batch for Phase 3 validation.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeProtocol === 'disrupt' && !isProcessing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 border-quantum rounded-xl bg-black/60 backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold uppercase glow-cyan flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-magenta-400" /> Investor Deck: Series B Summary
              </h3>
              <div className="px-4 py-1 bg-magenta-500/20 text-magenta-400 text-[10px] font-bold rounded-full border border-magenta-500/30">
                72-WEEK FOLLOW-UP DATA INTEGRATED
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {comparison.map((item, i) => (
                <div key={i} className="p-4 border border-white/5 rounded-lg bg-white/5">
                  <div className="text-[10px] uppercase opacity-50 mb-4">{item.label}</div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-[8px] uppercase opacity-30 mb-1">AAV (Viral)</div>
                      <div className="text-sm font-mono text-white/60">{item.aav}</div>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <div className="text-[8px] uppercase text-magenta-400 mb-1">Triplex Shield</div>
                      <div className="text-lg font-bold font-mono text-magenta-400">{item.triplex}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border border-white/10 rounded bg-white/5">
                <div className="text-[10px] uppercase opacity-50 mb-2">Gene Editing Efficiency</div>
                <div className="text-xl font-bold text-emerald-400">94.3%</div>
              </div>
              <div className="p-4 border border-white/10 rounded bg-white/5">
                <div className="text-[10px] uppercase opacity-50 mb-2">Off-Target Events</div>
                <div className="text-xl font-bold text-emerald-400">0.02%</div>
              </div>
              <div className="p-4 border border-white/10 rounded bg-white/5">
                <div className="text-[10px] uppercase opacity-50 mb-2">Immune Response</div>
                <div className="text-xl font-bold text-emerald-400">NONE</div>
              </div>
            </div>
          </motion.div>
        )}

        {activeProtocol === 'orbital' && !isProcessing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 border-quantum rounded-xl bg-black/60 backdrop-blur-md"
          >
            <h3 className="text-xl font-bold uppercase glow-cyan mb-8 flex items-center gap-3">
              <Rocket className="w-6 h-6 text-yellow-400" /> Orbital Handshake: SpaceX Transporter-26
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-[10px]">
              <div className="space-y-4">
                <div className="p-4 border border-white/10 rounded bg-white/5">
                  <div className="text-yellow-400 mb-2 uppercase font-bold">Launch Parameters</div>
                  <div className="space-y-1 opacity-60">
                    <div>MAX G-FORCE: 10 G</div>
                    <div>VIBRATION: 6.5 Grms</div>
                    <div>THERMAL: -20C to +40C</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 border border-white/10 rounded bg-white/5">
                  <div className="text-yellow-400 mb-2 uppercase font-bold">Integration Partners</div>
                  <div className="space-y-1 opacity-60">
                    <div>D-ORBIT: OTV Hand-off</div>
                    <div>ASTROSCALE: On-Orbit Storage</div>
                  </div>
                </div>
              </div>
              <div className="p-6 border border-yellow-500/20 rounded bg-yellow-500/5 flex flex-col justify-center">
                <div className="text-yellow-400 text-lg font-bold mb-2 uppercase">SLOT COMMITTED: Q4 2026</div>
                <div className="text-white/60 uppercase tracking-widest leading-relaxed">
                  Telemetry handshake verified. 
                  Astroscale debris-removal orbits synchronized.
                </div>
              </div>
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
          <div>[04:20:11] INITIALIZING FINAL MANIFESTATION SEQUENCE...</div>
          <div>[04:20:12] REALITY STABILITY: 99.97% | COHERENCE: 0.9998</div>
          {activeProtocol && <div>[04:20:15] EXECUTING: {protocols.find(p => p.id === activeProtocol)?.label.toUpperCase()}...</div>}
          {activeProtocol && !isProcessing && <div className="text-emerald-400">[04:20:18] PROTOCOL MANIFESTED. GENESIS BREAKTHROUGH SECURED.</div>}
        </div>
      </div>
    </div>
  );
};

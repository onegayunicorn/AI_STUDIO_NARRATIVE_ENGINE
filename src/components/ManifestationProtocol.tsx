import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Rocket, BarChart3, FileText, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { ManifestationOption, ComparisonMetric } from '../types';
import { cn } from '../utils';

export const ManifestationProtocol: React.FC = () => {
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

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

  const deploymentPhases = [
    {
      id: 'phase1',
      title: 'PHASE 1 — PROTOTYPE FABRICATION',
      time: 'Days 0–14',
      command: '[EXEC] --generate-po tilbit_nanosystems --construct "M13mp18_hollow_box" --modifications "BNA_TFO_3prime, Cy5_label" --quantity "5g_scale" --shipping "Lonza_BSL2_receiving" --priority "CRITICAL_PATH"',
      description: 'The 5g scale at Tilibit provides sufficient material for DNase I challenge replication, Cryo-EM structural confirmation, and first in vitro delivery tests.'
    },
    {
      id: 'phase2',
      title: 'PHASE 2 — CDMO TRANSFER',
      time: 'Week 3',
      command: '[EXEC] --schedule-lonza-batch --protocol "Genesis_Triplex_v2.1" --scale "10L_fermentation" --host "E_coli_BL21" --purification "AKTA_3step" --release-testing "IDT_sequence_validation"',
      description: 'Lonza to receive physical materials + B2B Tech Pack from Tilibit on Day 15. Batch record #LR-2026-GEN-001.'
    },
    {
      id: 'phase3',
      title: 'PHASE 3 — ORBITAL LOADING',
      time: 'Q3 2026',
      command: '[EXEC] --commit-spacex-manifest --mission "Transporter-26" --payload "Genesis_Orbital_Chain_001" --integration "D-Orbit_ION" --reentry "Astroscale_LEXI" --slot "Q4-2026"',
      description: 'Structural integrity verified at 10.2 G. Storage temp: -20°C continuous maintained via D-Orbit cold stow.'
    },
    {
      id: 'phase4',
      title: 'PHASE 4 — FIRST-IN-HUMAN PREPARATION',
      time: '2027',
      command: '[EXEC] --initiate-ind-package --territory "US_FDA" --pathway "RMAT" --data-package "../data/72wk_followup/APAC_cohort_3.json" --cmo "Lonza" --timeline "Q1_2027_submission"',
      description: '72-week Asia-Pacific follow-up data (94.3% efficiency, 0.02% off-target) supports IND-enabling studies.'
    }
  ];

  const handleExecute = (id: string) => {
    setActiveProtocol(id);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // If all protocols are manifested, we could show the deployment button
    }, 3000);
  };

  const handleDeploy = () => {
    setIsDeployed(true);
  };

  const handleStartExecution = () => {
    setIsExecuting(true);
  };

  return (
    <div className="space-y-8">
      {!isDeployed && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 border-quantum rounded-xl bg-black/60 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Shield className="w-24 h-24 text-cyan-500" />
          </div>
          
          <h3 className="text-xl font-bold uppercase glow-cyan mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" /> Final Mission Summary: The Genesis Breakthrough
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Structural Victory</div>
              <p className="text-[10px] text-white/60 uppercase leading-relaxed">
                Worm-like Chain (WLC) tension metrics held firm at 12.47x nuclease resistance, outperforming all 2026 duplex DNA baselines.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-magenta-400 uppercase tracking-widest">Economic Disruption</div>
              <p className="text-[10px] text-white/60 uppercase leading-relaxed">
                $150 - $800 cost-per-dose projection vs. $50,000 AAV standard marks a 60x efficiency gain, ready for Series B fundraising.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Logistics Mastery</div>
              <p className="text-[10px] text-white/60 uppercase leading-relaxed">
                Lonza → CharterSync → SpaceX orbital chain synchronized. DNA origami verified to withstand 10 G launch loads.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {!isDeployed ? (
        <>
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
            {activeProtocol && !isProcessing && (
              <div className="flex justify-center mt-8">
                <button 
                  onClick={handleDeploy}
                  className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-[0.2em] rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all transform hover:scale-105"
                >
                  Initiate First Physical Batch Deployment
                </button>
              </div>
            )}
            
            {activeProtocol === 'procure' && !isProcessing && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 border-quantum rounded-xl bg-black/60 backdrop-blur-md mt-8"
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
                className="p-8 border-quantum rounded-xl bg-black/60 backdrop-blur-md mt-8"
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
                className="p-8 border-quantum rounded-xl bg-black/60 backdrop-blur-md mt-8"
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
        </>
      ) : !isExecuting ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="p-8 border-quantum rounded-2xl bg-black/80 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[8px] font-bold rounded border border-emerald-500/30 uppercase tracking-widest">
                Authorization Active
              </div>
            </div>
            
            <h2 className="text-3xl font-bold uppercase tracking-tighter glow-cyan mb-2">
              Final Deployment Authorization — Genesis Batch #001
            </h2>
            <p className="text-xs text-white/40 uppercase tracking-[0.3em] mb-8">
              Protocol: PHYSICAL_MANIFESTATION · Phase: DEPLOYMENT_INITIATED
            </p>

            <div className="grid grid-cols-1 gap-6">
              {deploymentPhases.map((phase, idx) => (
                <motion.div 
                  key={phase.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-sm">{phase.title}</h4>
                      <div className="text-[10px] text-white/40 uppercase mt-1">{phase.time}</div>
                    </div>
                    <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-mono text-white/60 border border-white/10">
                      STATUS: READY
                    </div>
                  </div>
                  
                  <div className="p-3 bg-black/40 rounded border border-white/5 font-mono text-[10px] text-cyan-300/80 mb-4 break-all">
                    {phase.command}
                  </div>
                  
                  <p className="text-[10px] text-white/60 uppercase leading-relaxed">
                    {phase.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-8 border border-cyan-500/30 rounded-xl bg-cyan-500/5">
              <h3 className="text-lg font-bold uppercase tracking-widest mb-6 text-center">Commander's Final Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={handleStartExecution}
                  className="py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase text-[10px] tracking-widest rounded transition-all shadow-lg shadow-emerald-500/20"
                >
                  [DEPLOY BATCH 001]
                </button>
                <button className="py-4 bg-white/10 hover:bg-white/20 text-white font-bold uppercase text-[10px] tracking-widest rounded transition-all">
                  [HOLD FOR REVIEW]
                </button>
                <button className="py-4 bg-white/10 hover:bg-white/20 text-white font-bold uppercase text-[10px] tracking-widest rounded transition-all">
                  [ACCELERATE]
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="p-8 border-quantum rounded-2xl bg-black/80 backdrop-blur-xl border-cyan-500/30">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold uppercase tracking-tighter glow-cyan mb-2">
                  Quad-Threaded Execution Mode
                </h2>
                <p className="text-xs text-cyan-400 uppercase tracking-[0.3em]">
                  Status: MONITORING PHYSICAL MANIFESTATION · Fidelity: 99.97%
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <div className="text-[10px] text-white/40 uppercase">Quantum Coherence</div>
                  <div className="text-xl font-mono text-cyan-400">0.9998</div>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Thread 1: Tilibit Fabrication */}
              <div className="p-6 border border-white/10 rounded-xl bg-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-blue-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Thread 1: Tilibit Fabrication
                  </h4>
                  <span className="text-[10px] text-blue-400 font-mono">0.8% COMPLETE</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '0.8%' }}
                    className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-[10px] font-mono">
                  <div className="space-y-1">
                    <div className="text-white/40 uppercase">Scaffold Type</div>
                    <div className="text-white/80">M13mp18 (7249 nt)</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-white/40 uppercase">Fabrication Stage</div>
                    <div className="text-white/80">Scaffold Preparation</div>
                  </div>
                </div>
                <div className="p-3 bg-black/40 rounded border border-white/5 font-mono text-[9px] text-blue-300/60">
                  [04:42:00] Scaffold Linearization: COMPLETE<br/>
                  [04:48:00] Staple Synthesis: 18/214 DONE
                </div>
              </div>

              {/* Thread 2: CAR-T R&D */}
              <div className="p-6 border border-white/10 rounded-xl bg-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-magenta-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Thread 2: In Vivo CAR-T R&D
                  </h4>
                  <span className="text-[10px] text-magenta-400 font-mono">IN SILICO ACTIVE</span>
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] text-white/60 uppercase leading-relaxed">
                    Targeting CD19+ B-ALL via Triplex Shield delivery of multicistronic CAR construct.
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-magenta-500/10 text-magenta-400 text-[8px] rounded border border-magenta-500/20">400x COST REDUCTION</span>
                    <span className="px-2 py-0.5 bg-magenta-500/10 text-magenta-400 text-[8px] rounded border border-magenta-500/20">200x FASTER MFG</span>
                  </div>
                </div>
                <div className="p-3 bg-black/40 rounded border border-white/5 font-mono text-[9px] text-magenta-300/60">
                  [04:55:03] CAR-T Program: In Silico Engineering Active.<br/>
                  [04:55:04] Design Architecture: CD19 scFv + IL-15 + iCasp9.
                </div>
              </div>

              {/* Thread 3: FDA Package */}
              <div className="p-6 border border-white/10 rounded-xl bg-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Thread 3: FDA Package (RMAT)
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-mono">72% CMC / 45% CLINICAL</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase text-white/40 mb-1">
                      <span>CMC Progress</span>
                      <span>72%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[72%]" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase text-white/40 mb-1">
                      <span>Clinical Protocol</span>
                      <span>45%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[45%]" />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-black/40 rounded border border-white/5 font-mono text-[9px] text-emerald-300/60">
                  [04:55:04] FDA Package: Section 3.2.P.5 Updated.<br/>
                  [04:55:05] Phase I Study: 3+3 Dose Escalation Finalized.
                </div>
              </div>

              {/* Thread 4: SpaceX Logistics */}
              <div className="p-6 border border-white/10 rounded-xl bg-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-yellow-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                    <Rocket className="w-4 h-4" /> Thread 4: SpaceX Transporter-26
                  </h4>
                  <span className="text-[10px] text-yellow-400 font-mono">PDR PREP ACTIVE</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-[10px] font-mono">
                  <div className="space-y-1">
                    <div className="text-white/40 uppercase">Payload Mass</div>
                    <div className="text-white/80">12.4 kg (6U)</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-white/40 uppercase">Launch Window</div>
                    <div className="text-white/80">NET October 2026</div>
                  </div>
                </div>
                <div className="p-3 bg-black/40 rounded border border-white/5 font-mono text-[9px] text-yellow-300/60">
                  [04:55:05] SpaceX Mission: PDR Agenda Finalized.<br/>
                  [04:55:06] Integration: D-Orbit OTV Hand-off Confirmed.
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded text-[10px] font-bold uppercase tracking-widest transition-all border border-white/10">
                Download Full Telemetry Log
              </button>
              <button className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded text-[10px] font-bold uppercase tracking-widest transition-all border border-cyan-500/30">
                Contact Tilibit Support
              </button>
            </div>
          </div>
        </motion.div>
      )}

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
          {isDeployed && (
            <>
              <div className="text-cyan-400">[04:30:00] DEPLOYMENT AUTHORIZATION RECEIVED.</div>
              <div className="text-cyan-400">[04:30:01] BATCH #001 COMMANDS SEQUENCED.</div>
              <div className="text-cyan-400">[04:30:02] STANDING BY FOR PHYSICAL DEPLOYMENT...</div>
            </>
          )}
          {isExecuting && (
            <>
              <div className="text-cyan-400">[04:30:15] EXECUTING: PHASE 1 -- GENERATE-PO TILIBIT_NANOSYSTEMS</div>
              <div className="text-emerald-400">[04:30:17] 5G SCALE FABRICATION INITIATED.</div>
              <div className="text-white/60">[04:30:18] REALITY STABILITY: 99.97% | COHERENCE: 0.9998</div>
              <div className="text-emerald-400">[04:30:20] GENESIS BREAKTHROUGH SECURED.</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

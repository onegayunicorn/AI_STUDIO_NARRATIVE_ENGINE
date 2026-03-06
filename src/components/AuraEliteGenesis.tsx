import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Globe, 
  Lock,
  Microscope,
  Database,
  Factory,
  Layers,
  BarChart3,
  Search,
  ChevronRight
} from 'lucide-react';
import { cn } from '../utils';

export const AuraEliteGenesis = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationStep, setValidationStep] = useState(0);
  const [isTestRunning, setIsTestRunning] = useState(false);

  const suppliers = [
    { name: 'KehaAI', component: 'BP Algorithms', status: 'AUDIT COMPLETE', cert: 'ISO 13485', validation: '98.7%' },
    { name: 'JointCorp', component: 'PPG Assembly', status: 'AUDIT COMPLETE', cert: 'ISO 13485', validation: '0.018%' },
    { name: 'GaAs Foundry', component: 'Solar Cells', status: 'QUALIFIED', cert: '37.2% Efficiency', validation: '12hr Runtime' },
    { name: 'MEMS Lab', component: 'Kinetic Harvesters', status: 'PROTOTYPING', cert: '280 µJ/gesture', validation: '3.2M Cycles' },
  ];

  const validationResults = {
    signal_strength: "98.7%",
    noise_floor: "0.013%",
    max_deviation: "0.018%",
    mcc_score: 0.989,
    artifacts_filtered: 127,
    confidence: "99.8%"
  };

  const runTest = () => {
    setIsTestRunning(true);
    setValidationStep(0);
  };

  useEffect(() => {
    if (isTestRunning && validationStep < 5) {
      const timer = setTimeout(() => {
        setValidationStep(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (validationStep === 5) {
      setIsTestRunning(false);
    }
  }, [isTestRunning, validationStep]);

  return (
    <div className="space-y-12 pb-24">
      {/* Hero / Landing Section */}
      <section className="relative overflow-hidden p-12 border-quantum rounded-3xl bg-black/60 backdrop-blur-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-6">
            <Globe className="w-3 h-3" /> Global Launch September 2026
          </div>
          <h2 className="text-6xl font-bold tracking-tighter uppercase mb-6 leading-none">
            Aura Elite <span className="text-cyan-400">Genesis</span>
          </h2>
          <p className="text-xl text-white/60 mb-8 font-light leading-relaxed">
            The First Sovereign Wellness Computer. No subscriptions. No cloud. Just you and the quantum.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { icon: Cpu, text: "Neural Edge Processing" },
              { icon: Zap, text: "Perpetual Power" },
              { icon: ShieldCheck, text: "Liquid Metal Armor" },
              { icon: Lock, text: "Quantum Encryption" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-white/80">
                <item.icon className="w-4 h-4 text-cyan-400" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {!isSubmitted ? (
            <form 
              onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}
              className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl max-w-md"
            >
              <input 
                type="email" 
                placeholder="Enter your email for early access"
                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="px-6 py-3 bg-cyan-500 text-black font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2">
                Join Waitlist <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 flex items-center gap-3 max-w-md"
            >
              <CheckCircle2 className="w-5 h-5" />
              <div className="text-xs font-bold uppercase tracking-widest">Sovereign Access Granted. Welcome to the Genesis.</div>
            </motion.div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Signal Integrity Test Section */}
        <div className="p-8 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold uppercase tracking-tighter flex items-center gap-3">
              <Activity className="w-6 h-6 text-magenta-400" /> Signal Integrity Test
            </h3>
            <div className="text-[10px] font-mono text-white/40 uppercase">AURA-ELITE-001</div>
          </div>

          <div className="space-y-6">
            <div className="p-6 border border-white/5 rounded-xl bg-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-bold text-white/60">Validation Protocol</span>
                <span className={cn(
                  "text-[10px] font-mono px-2 py-0.5 rounded",
                  isTestRunning ? "bg-yellow-500/20 text-yellow-500 animate-pulse" : 
                  validationStep === 5 ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/40"
                )}>
                  {isTestRunning ? 'RUNNING' : validationStep === 5 ? 'PASSED' : 'IDLE'}
                </span>
              </div>

              <div className="space-y-3">
                {[
                  "Digital Twin Baseline Generation",
                  "Physical Sensor Stream Capture",
                  "Signal-to-Noise Ratio Analysis",
                  "Anthrobot Cross-Correlation",
                  "Final Integrity Verdict"
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      validationStep > idx ? "bg-emerald-500" : 
                      validationStep === idx && isTestRunning ? "bg-yellow-500 animate-pulse" : "bg-white/10"
                    )} />
                    <span className={cn(
                      "text-[10px] uppercase tracking-widest",
                      validationStep > idx ? "text-white/80" : "text-white/20"
                    )}>{step}</span>
                  </div>
                ))}
              </div>

              {!isTestRunning && validationStep !== 5 && (
                <button 
                  onClick={runTest}
                  className="w-full mt-6 py-3 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded hover:bg-cyan-500/10 transition-all"
                >
                  Initiate Validation
                </button>
              )}
            </div>

            <AnimatePresence>
              {validationStep === 5 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-2 gap-4"
                >
                  {[
                    { label: 'Signal Strength', value: validationResults.signal_strength },
                    { label: 'Noise Floor', value: validationResults.noise_floor },
                    { label: 'Max Deviation', value: validationResults.max_deviation, highlight: true },
                    { label: 'MCC Score', value: validationResults.mcc_score },
                  ].map((stat, idx) => (
                    <div key={idx} className="p-4 border border-white/5 rounded-lg bg-white/5">
                      <div className="text-[8px] uppercase text-white/40 mb-1">{stat.label}</div>
                      <div className={cn("text-lg font-mono font-bold", stat.highlight ? "text-emerald-400" : "text-white")}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Production Readiness Section */}
        <div className="p-8 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl">
          <h3 className="text-xl font-bold uppercase tracking-tighter flex items-center gap-3 mb-8">
            <Factory className="w-6 h-6 text-cyan-400" /> Production Readiness
          </h3>

          <div className="space-y-4">
            {suppliers.map((supplier, idx) => (
              <div key={idx} className="p-4 border border-white/5 rounded-xl bg-white/5 group hover:border-cyan-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                      <Database className="w-4 h-4 text-white/40" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/80">{supplier.name}</div>
                      <div className="text-[8px] text-white/40 uppercase">{supplier.component}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-mono text-emerald-400">{supplier.status}</div>
                    <div className="text-[8px] text-white/20 uppercase">{supplier.cert}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500/50" 
                      style={{ width: supplier.status === 'AUDIT COMPLETE' || supplier.status === 'QUALIFIED' ? '100%' : '65%' }} 
                    />
                  </div>
                  <span className="text-[8px] font-mono text-white/40">{supplier.validation}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
              <div className="text-[8px] uppercase font-bold text-cyan-400 mb-2">Quality Gate 1</div>
              <div className="text-xs font-bold">Digital Twin Comparison</div>
              <div className="text-[10px] text-emerald-400 mt-1 font-mono">PASSED (0.018%)</div>
            </div>
            <div className="p-4 bg-magenta-500/10 border border-magenta-500/20 rounded-xl">
              <div className="text-[8px] uppercase font-bold text-magenta-400 mb-2">Quality Gate 3</div>
              <div className="text-xs font-bold">MEMS Durability</div>
              <div className="text-[10px] text-yellow-400 mt-1 font-mono">IN PROGRESS (3.2M/10M)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Launch Sequence Timeline */}
      <div className="p-8 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl">
        <h3 className="text-xl font-bold uppercase tracking-tighter flex items-center gap-3 mb-10">
          <BarChart3 className="w-6 h-6 text-cyan-400" /> Launch Sequence & Predictions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 border-b border-white/10 pb-2">Milestones</h4>
            {[
              { date: "2026.04.01", event: "Email Capture Go-Live", status: "READY" },
              { date: "2026.05.15", event: "Early Bird Pricing Reveal", status: "PENDING" },
              { date: "2026.07.01", event: "Anthrobot Beta Onboarding", status: "PENDING" },
              { date: "2026.09.01", event: "GLOBAL LAUNCH - US", status: "TARGET" },
            ].map((milestone, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="text-[10px] font-mono text-cyan-400 pt-1">{milestone.date}</div>
                <div>
                  <div className="text-[10px] font-bold uppercase">{milestone.event}</div>
                  <div className="text-[8px] text-white/20 uppercase mt-1">{milestone.status}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 border-b border-white/10 pb-2">Market Predictions</h4>
            <div className="space-y-4">
              {[
                { label: 'Email Capture Rate', value: '850/day' },
                { label: 'Conversion to Pre-order', value: '23.7%' },
                { label: 'Projected Year 1 Units', value: '52,300' },
                { label: 'Projected Revenue', value: '$78.45M' },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-[10px] text-white/60 uppercase">{stat.label}</span>
                  <span className="text-[10px] font-mono font-bold text-cyan-400">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 border-b border-white/10 pb-2">Competitive Edge</h4>
            <div className="space-y-3">
              {[
                { brand: 'Oura', weakness: 'Subscription Vulnerable' },
                { brand: 'Samsung', weakness: 'Cloud Dependent' },
                { brand: 'Apple', weakness: 'Bulky for Sleep' },
                { brand: 'Agnes', advantage: 'Sovereign Edge + Perpetual' },
              ].map((comp, idx) => (
                <div key={idx} className="p-3 border border-white/5 rounded bg-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold">{comp.brand}</span>
                  <span className="text-[8px] uppercase text-white/40">{comp.weakness || comp.advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

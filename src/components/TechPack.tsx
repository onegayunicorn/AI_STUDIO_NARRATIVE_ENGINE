import React from 'react';
import { motion } from 'motion/react';
import { X, Cpu, Battery, Radio, Shield, Zap } from 'lucide-react';

interface TechPackProps {
  onClose: () => void;
}

export const TechPack: React.FC<TechPackProps> = ({ onClose }) => {
  const specs = [
    { icon: Cpu, label: 'Processor', value: 'Quantum-A1 Bio-Link' },
    { icon: Battery, label: 'Battery', value: '72h Solid-State' },
    { icon: Radio, label: 'Connectivity', value: 'Inductive / 6G' },
    { icon: Shield, label: 'Material', value: 'Biocompatible Polymer' },
    { icon: Zap, label: 'Sensors', value: '5x Hoogsteen Nodes' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
    >
      <div className="max-w-4xl w-full glass-panel border border-white/20 rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Visual */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 p-12 flex items-center justify-center relative border-r border-white/10">
          <div className="absolute inset-0 quantum-grid opacity-20" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-64 h-64 border-4 border-dashed border-cyan-400/30 rounded-full flex items-center justify-center"
          >
            <div className="w-48 h-48 border-2 border-magenta-400/50 rounded-full flex items-center justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
            </div>
          </motion.div>
          <div className="absolute bottom-8 left-8">
            <div className="text-[10px] uppercase tracking-[0.5em] text-cyan-400">DNA LINK</div>
            <div className="text-2xl font-bold tracking-tighter uppercase">V1.0 PROTOTYPE</div>
          </div>
        </div>

        {/* Right Side: Specs */}
        <div className="w-full md:w-1/2 p-8 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold uppercase mb-8 glow-cyan">Technical Specification</h2>
          
          <div className="space-y-6">
            {specs.map((spec, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border border-white/5 rounded-xl bg-white/5">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <spec.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-[10px] uppercase opacity-50">{spec.label}</div>
                  <div className="text-sm font-bold font-mono">{spec.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="text-[10px] uppercase tracking-widest text-magenta-400 mb-2">Scientific Foundation</div>
            <p className="text-[10px] text-white/40 leading-relaxed uppercase">
              Utilizes triplex-forming oligonucleotides (TFOs) for real-time gene regulation monitoring via Hoogsteen hydrogen bonding.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

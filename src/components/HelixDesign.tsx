import React from 'react';
import { motion } from 'motion/react';
import { Dna, FileText, Palette, Layers } from 'lucide-react';
import { DesignPrototype } from '../types';

export const HelixDesign: React.FC = () => {
  const prototypes: DesignPrototype[] = [
    { id: '1', name: 'Helix Core', type: 'Regenerative Hub', description: 'Central biometric processing unit for gene therapy management.', status: 'Prototype' },
    { id: '2', name: 'DNA Link', type: 'Wearable', description: 'Real-time Hoogsteen interaction monitor for triplex origami delivery.', status: 'Concept' },
    { id: '3', name: 'Triplex Shield', type: 'Bio-Storage', description: 'Quantum-stabilized container for TFO sequences.', status: 'Production' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {prototypes.map((p) => (
          <div key={p.id} className="p-6 border-quantum rounded-lg bg-black/40 flex gap-6">
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 flex items-center justify-center border border-white/10">
              <Dna className="w-10 h-10 text-cyan-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-lg font-bold tracking-tighter uppercase text-white">{p.name}</h4>
                  <div className="text-[10px] uppercase text-cyan-400 tracking-widest">{p.type}</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase border border-white/10">
                  {p.status}
                </span>
              </div>
              <p className="text-xs text-white/60 mb-4 leading-relaxed">{p.description}</p>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded text-[10px] uppercase tracking-widest transition-colors">
                  <FileText className="w-3 h-3" /> Tech Pack
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded text-[10px] uppercase tracking-widest transition-colors">
                  <Palette className="w-3 h-3" /> Renders
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-quantum rounded-lg bg-black/40">
        <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-magenta-400 flex items-center gap-2">
          <Layers className="w-4 h-4" /> Scientific Foundation
        </h3>
        <div className="text-[10px] uppercase tracking-widest leading-relaxed text-white/60 space-y-2">
          <p>· DNA triple helices are formed by triplex-forming oligonucleotides (TFOs).</p>
          <p>· Binding occurs via <span className="text-magenta-400">Hoogsteen hydrogen bonding</span>.</p>
          <p>· "Triplex Origami" enables precise folding for gene therapy delivery.</p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Globe, BarChart3, TrendingUp } from 'lucide-react';

export const SpaceLogistics: React.FC = () => {
  const stats = [
    { label: 'Market Size (2026)', value: '$8.82B', growth: '+18.8%' },
    { label: 'OSAM Share', value: '38%', growth: 'Dominant' },
    { label: 'OTV Efficiency', value: '94%', growth: '+12%' },
  ];

  const players = [
    { name: 'SpaceX', share: '22%', focus: 'Launch & Starshield' },
    { name: 'D-Orbit', share: '8%', focus: 'Last-Mile Delivery' },
    { name: 'Orbit Fab', share: '5%', focus: 'In-Space Refueling' },
    { name: 'Astroscale', share: '6%', focus: 'Debris Removal' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 border-quantum rounded bg-cyan-500/5">
            <div className="text-[10px] uppercase opacity-50 mb-1">{stat.label}</div>
            <div className="text-xl font-bold font-mono text-cyan-400">{stat.value}</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {stat.growth}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-quantum rounded-lg bg-black/40">
        <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-cyan-400 flex items-center gap-2">
          <Rocket className="w-4 h-4" /> Orbital Logistics Landscape
        </h3>
        
        <div className="space-y-4">
          {players.map((player, i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-white/5 rounded bg-white/5">
              <div>
                <div className="text-xs font-bold">{player.name}</div>
                <div className="text-[10px] opacity-50 uppercase">{player.focus}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-cyan-400">{player.share}</div>
                <div className="text-[10px] uppercase opacity-30">Market Share</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border border-yellow-500/20 rounded bg-yellow-500/5 text-[10px] uppercase tracking-wider leading-relaxed">
        <span className="text-yellow-400 font-bold">Strategic Insight:</span> The shift toward eVTOL "space drones" for last-mile orbital logistics is a strategic imperative for 2026-2031.
      </div>
    </div>
  );
};

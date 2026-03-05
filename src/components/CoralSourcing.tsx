import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, MapPin, Filter, Search } from 'lucide-react';
import { Manufacturer } from '../types';
import { cn } from '../utils';

export const CoralSourcing: React.FC = () => {
  const [regionFilter, setRegionFilter] = useState<string>('All');

  const manufacturers: Manufacturer[] = [
    { id: '1', name: 'Archireef', region: 'Asia-Pacific', category: '3D Reefs', specialty: 'Terracotta Tiles' },
    { id: '2', name: 'CyBe Construction', region: 'Europe', category: '3D Reefs', specialty: 'Concrete Printing' },
    { id: '3', name: 'Wuxi Ruien', region: 'Asia-Pacific', category: 'Robotics', specialty: 'AUV/ROV Systems' },
    { id: '4', name: 'Urban Drones', region: 'Americas', category: 'Robotics', specialty: 'Exploration Drones' },
    { id: '5', name: 'BigRep', region: 'Europe', category: '3D Systems', specialty: 'Industrial Printers' },
    { id: '6', name: 'Coastruction', region: 'Europe', category: '3D Reefs', specialty: 'Aquatic Structures' },
  ];

  const filtered = regionFilter === 'All' 
    ? manufacturers 
    : manufacturers.filter(m => m.region === regionFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
          <input 
            type="text" 
            placeholder="Search Manufacturers..." 
            className="w-full bg-white/5 border border-white/10 rounded py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-cyan-500/50"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Asia-Pacific', 'Europe', 'Americas'].map(region => (
            <button
              key={region}
              onClick={() => setRegionFilter(region)}
              className={cn(
                "px-3 py-1.5 rounded text-[10px] uppercase tracking-tighter transition-all",
                regionFilter === region ? "bg-cyan-500 text-black font-bold" : "bg-white/5 hover:bg-white/10"
              )}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((m) => (
          <motion.div 
            layout
            key={m.id} 
            className="p-4 border-quantum rounded-lg bg-black/40 hover:border-cyan-500/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm font-bold text-cyan-400">{m.name}</div>
                <div className="flex items-center gap-1 text-[10px] opacity-50 uppercase">
                  <MapPin className="w-3 h-3" /> {m.region}
                </div>
              </div>
              <span className="px-2 py-0.5 bg-white/5 rounded text-[8px] uppercase tracking-widest border border-white/10">
                {m.category}
              </span>
            </div>
            <div className="text-[10px] uppercase tracking-widest opacity-70">
              Specialty: <span className="text-white">{m.specialty}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

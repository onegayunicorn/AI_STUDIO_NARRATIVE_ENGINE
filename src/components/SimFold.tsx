import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils';

interface SimFoldProps {
  activeFold: number;
}

export const SimFold: React.FC<SimFoldProps> = ({ activeFold }) => {
  const folds = [
    { id: 1, name: 'Past → Present', color: 'border-blue-500', bg: 'bg-blue-500/10' },
    { id: 2, name: 'Present → Future', color: 'border-cyan-500', bg: 'bg-cyan-500/10' },
    { id: 3, name: 'Future → Past', color: 'border-magenta-500', bg: 'bg-magenta-500/10' },
    { id: 4, name: 'All → Unity', color: 'border-yellow-500', bg: 'bg-yellow-500/10' },
  ];

  return (
    <div className="p-6 border-quantum rounded-lg bg-black/40 h-full">
      <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-cyan-400">4-Fold SimFold Protocol</h3>
      
      <div className="relative h-[300px] flex items-center justify-center">
        {folds.map((fold, idx) => (
          <motion.div
            key={fold.id}
            initial={false}
            animate={{
              scale: activeFold === fold.id ? 1.1 : 0.9,
              opacity: activeFold === fold.id ? 1 : 0.3,
              rotate: (idx * 90) + (activeFold * 45),
              zIndex: activeFold === fold.id ? 10 : 0
            }}
            className={cn(
              "absolute w-48 h-48 border-2 rounded-2xl flex items-center justify-center text-center p-4 transition-colors",
              fold.color,
              fold.bg
            )}
          >
            <div className="rotate-[-45deg] transform">
              <span className="text-xs font-bold block mb-1">FOLD {fold.id}</span>
              <span className="text-[10px] uppercase">{fold.name}</span>
            </div>
          </motion.div>
        ))}
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-4 h-4 rounded-full bg-white animate-ping" />
        </div>
      </div>

      <div className="mt-8 space-y-2">
        {folds.map((fold) => (
          <div 
            key={fold.id}
            className={cn(
              "flex items-center justify-between p-2 rounded text-[10px] uppercase transition-all",
              activeFold === fold.id ? "bg-white/10 text-white" : "text-white/40"
            )}
          >
            <span>{fold.name}</span>
            <span>{activeFold === fold.id ? "ACTIVE" : "STANDBY"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

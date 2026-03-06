import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  MousePointer2, 
  Activity, 
  Zap, 
  Layers, 
  EyeOff, 
  Fingerprint,
  Maximize2,
  RefreshCw
} from 'lucide-react';

export const InvisiblePressure: React.FC = () => {
  const [points, setPoints] = useState<{ x: number; y: number; pressure: number; id: number }[]>([]);
  const [iptActive, setIptActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!iptActive || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newPoint = {
      x,
      y,
      pressure: Math.random() * 100,
      id: Date.now()
    };

    setPoints(prev => [...prev.slice(-20), newPoint]);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-magenta-500/20 rounded-2xl border border-magenta-500/30">
            <EyeOff className="w-6 h-6 text-magenta-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Invisible Pressure Sensor</h2>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">IPT: Invisible Pressure Tracking · OS-Nexus v2.1</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIptActive(!iptActive)}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              iptActive ? 'bg-magenta-500 text-black shadow-[0_0_20px_rgba(217,70,239,0.4)]' : 'bg-white/5 text-white/40 border border-white/10'
            }`}
          >
            {iptActive ? 'IPT Active' : 'IPT Paused'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sensor Field */}
        <div className="lg:col-span-2 relative">
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="h-[500px] bg-black/40 rounded-3xl border border-white/10 relative overflow-hidden cursor-crosshair group"
          >
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            {/* Pressure Points */}
            <AnimatePresence>
              {points.map((point) => (
                <motion.div
                  key={point.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  style={{ 
                    left: point.x, 
                    top: point.y,
                    width: point.pressure * 1.5,
                    height: point.pressure * 1.5,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className="absolute rounded-full bg-magenta-500/20 border border-magenta-500/40 backdrop-blur-sm pointer-events-none"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-1 bg-magenta-400 rounded-full animate-ping" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Scanning Line */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 w-full h-[1px] bg-magenta-500/30 shadow-[0_0_15px_rgba(217,70,239,0.5)] pointer-events-none"
            />

            <div className="absolute bottom-6 left-6 flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 rounded-full border border-white/10 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-magenta-500 animate-pulse" />
                <span className="text-[10px] font-mono text-white/60 uppercase">Live Feed</span>
              </div>
              <div className="text-[10px] font-mono text-white/30 uppercase">
                X: {points[points.length - 1]?.x.toFixed(0) || 0} Y: {points[points.length - 1]?.y.toFixed(0) || 0}
              </div>
            </div>

            <div className="absolute top-6 right-6">
              <Maximize2 className="w-4 h-4 text-white/20 hover:text-white/60 transition-colors cursor-pointer" />
            </div>
          </div>
        </div>

        {/* IPT Analytics */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 glass-panel border border-white/10 rounded-3xl bg-black/40">
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-magenta-400" />
              Pressure Analytics
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                  <span className="text-white/40">Peak Intensity</span>
                  <span className="text-white font-mono">84.2%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '84.2%' }}
                    className="h-full bg-magenta-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                  <span className="text-white/40">Spatial Accuracy</span>
                  <span className="text-white font-mono">99.9%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '99.9%' }}
                    className="h-full bg-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                  <span className="text-white/40">Latency</span>
                  <span className="text-white font-mono">0.4ms</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '12%' }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 glass-panel border border-white/10 rounded-3xl bg-black/40">
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-cyan-400" />
              Biometric Signature
            </h3>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center">
                <Fingerprint className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">User ID</p>
                <p className="text-xs font-mono text-white">SOVEREIGN_ARCHITECT_01</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Neural Hash</p>
              <p className="text-[10px] font-mono text-cyan-400 break-all">
                f8a2c9b4d1e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1
              </p>
            </div>
          </div>

          <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-2 transition-all group">
            <RefreshCw className="w-4 h-4 text-white/40 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Recalibrate Sensors</span>
          </button>
        </div>
      </div>
    </div>
  );
};

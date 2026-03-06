import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Zap, 
  Database, 
  Activity, 
  Shield, 
  Cpu, 
  Link, 
  Radio, 
  ArrowRight, 
  Server,
  Terminal,
  Lock,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { cn } from '../utils';

interface DataPacket {
  id: string;
  type: 'neural' | 'quantum' | 'bio';
  timestamp: number;
  payload: string;
  integrity: number;
}

export const NeuralProxyCollection: React.FC = () => {
  const [isCollecting, setIsCollecting] = useState(false);
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [fluxStability, setFluxStability] = useState(98.4);
  const [syncFidelity, setSyncFidelity] = useState(99.1);
  const [bufferUsage, setBufferUsage] = useState(12);
  const [totalPackets, setTotalPackets] = useState(142850);
  const [activeChannel, setActiveChannel] = useState<'alpha' | 'beta' | 'gamma' | 'theta'>('gamma');
  
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCollecting) {
      const interval = setInterval(() => {
        const newPacket: DataPacket = {
          id: Math.random().toString(36).substring(7),
          type: Math.random() > 0.7 ? 'quantum' : Math.random() > 0.4 ? 'neural' : 'bio',
          timestamp: Date.now(),
          payload: `0x${Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0')}`,
          integrity: 95 + Math.random() * 5
        };

        setPackets(prev => [newPacket, ...prev].slice(0, 10));
        setTotalPackets(prev => prev + 1);
        setBufferUsage(prev => Math.min(100, prev + 0.1));
        setFluxStability(prev => Math.min(100, Math.max(90, prev + (Math.random() * 0.4 - 0.2))));
        setSyncFidelity(prev => Math.min(100, Math.max(95, prev + (Math.random() * 0.2 - 0.1))));
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isCollecting]);

  const stats = [
    { label: 'Flux Stability', value: `${fluxStability.toFixed(2)}%`, icon: Zap, color: 'text-yellow-400' },
    { label: 'Proxy Sync', value: `${syncFidelity.toFixed(2)}%`, icon: Brain, color: 'text-cyan-400' },
    { label: 'Buffer Load', value: `${bufferUsage.toFixed(1)}%`, icon: Database, color: 'text-magenta-400' },
    { label: 'Ingestion Rate', value: isCollecting ? '1.2 GB/s' : '0.0 GB/s', icon: Activity, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header / Control Panel */}
      <div className="p-8 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Link className="w-32 h-32 rotate-12" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className={cn(
              "w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-500",
              isCollecting ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "border-white/10 bg-white/5"
            )}>
              <Link className={cn("w-8 h-8", isCollecting ? "text-emerald-400 animate-pulse" : "text-white/40")} />
            </div>
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tighter glow-cyan">Magnetic Cord BCI Collection</h2>
              <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Neural Proxy Data Ingestion · OS-Nexus v2.1</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCollecting(!isCollecting)}
              className={cn(
                "px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all flex items-center gap-3",
                isCollecting 
                  ? "bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white" 
                  : "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-white"
              )}
            >
              {isCollecting ? <><AlertCircle className="w-5 h-5" /> Halt Collection</> : <><Zap className="w-5 h-5" /> Initiate Collection</>}
            </button>
            <button className="p-4 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
              <RefreshCw className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Neural Proxy Visualization */}
        <div className="lg:col-span-2 p-8 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center min-h-[500px] relative">
          <div className="absolute top-6 left-8">
            <h3 className="text-lg font-bold uppercase tracking-widest flex items-center gap-3">
              <Brain className="w-5 h-5 text-cyan-400" /> Neural Proxy Twin
            </h3>
            <p className="text-[10px] text-white/40 uppercase mt-1">Real-time Synaptic Mapping</p>
          </div>

          {/* Central Brain/Node Visualization */}
          <div className="relative w-64 h-64">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-cyan-500/20 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border border-dashed border-magenta-500/20 rounded-full"
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl absolute -inset-4"
                />
                <Brain className="w-24 h-24 text-cyan-400 relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
              </div>
            </div>

            {/* Orbiting Data Nodes */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div
                key={i}
                animate={{ 
                  rotate: [angle, angle + 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 10 + i * 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, delay: i * 0.3 }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div 
                  className="w-2 h-2 rounded-full bg-white/40" 
                  style={{ transform: `translateY(-140px)` }}
                />
              </motion.div>
            ))}
          </div>

          {/* Magnetic Cord Visualization */}
          <div className="mt-12 w-full max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-white/40">Magnetic Cord Flux</span>
              <span className="text-[10px] font-mono text-cyan-400">{fluxStability.toFixed(2)}% STABLE</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
              <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"
              />
              <div className="absolute inset-0 flex">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="h-full w-px bg-white/10 mx-auto" />
                ))}
              </div>
            </div>
          </div>

          {/* Channel Selector */}
          <div className="absolute bottom-8 flex gap-4">
            {(['alpha', 'beta', 'gamma', 'theta'] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setActiveChannel(ch)}
                className={cn(
                  "px-4 py-2 rounded border text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeChannel === ch 
                    ? "bg-cyan-500 border-cyan-500 text-black" 
                    : "bg-white/5 border-white/10 text-white/40 hover:border-white/30"
                )}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        {/* Data Collector / Ingestion Panel */}
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-4 border border-white/10 rounded-xl bg-black/40">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={cn("w-4 h-4", stat.color)} />
                  <span className="text-[8px] uppercase text-white/40 font-bold">{stat.label}</span>
                </div>
                <div className="text-xl font-mono font-bold text-white/80">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Live Ingestion Feed */}
          <div className="p-6 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Server className="w-4 h-4 text-magenta-400" /> Ingestion Feed
              </h3>
              <div className="text-[10px] font-mono text-white/40">{totalPackets.toLocaleString()} PKTS</div>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
              <AnimatePresence initial={false}>
                {packets.map((packet) => (
                  <motion.div
                    key={packet.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3 border border-white/5 rounded bg-white/5 flex items-center justify-between group hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        packet.type === 'quantum' ? "bg-cyan-400" : packet.type === 'neural' ? "bg-magenta-400" : "bg-emerald-400"
                      )} />
                      <div>
                        <div className="text-[9px] font-mono text-white/80">{packet.payload}</div>
                        <div className="text-[7px] text-white/40 uppercase">{packet.type} · ID:{packet.id}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] font-mono text-emerald-400">{packet.integrity.toFixed(1)}%</div>
                      <div className="text-[7px] text-white/20 uppercase">CRC OK</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {!isCollecting && packets.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-white/20 space-y-4">
                  <Terminal className="w-12 h-12" />
                  <p className="text-[10px] uppercase tracking-widest">Feed Standby</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Log / Terminal */}
      <div className="p-6 border-quantum rounded-xl bg-black/40 font-mono text-[9px] text-white/40">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Terminal className="w-3 h-3" />
            <span className="uppercase font-bold">Neural Proxy System Log</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Lock className="w-2 h-2" /> AES-256</span>
            <span className="flex items-center gap-1"><Shield className="w-2 h-2" /> FIREWALL ACTIVE</span>
          </div>
        </div>
        <div className="space-y-1 max-h-[100px] overflow-y-auto custom-scrollbar">
          <div>[07:11:06] SYSTEM: INITIALIZING NEURAL PROXY TWIN...</div>
          <div>[07:11:07] CORD: MAGNETIC COORD DETECTED. POLARITY ALIGNED.</div>
          <div>[07:11:08] SYNC: ESTABLISHING HANDSHAKE WITH OS-NEXUS V2.1...</div>
          {isCollecting && (
            <>
              <div className="text-emerald-400">[07:11:10] INGESTION: PACKET STREAM OPENED. BANDWIDTH: 1.2 GB/S.</div>
              <div>[07:11:12] PROXY: MAPPING Brodmann Area 4 (Primary Motor Cortex)...</div>
              <div>[07:11:15] BUFFER: CACHE ALLOCATION SUCCESSFUL.</div>
              <div className="text-cyan-400 animate-pulse">[07:11:20] STATUS: COLLECTION IN PROGRESS. NO ERRORS DETECTED.</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

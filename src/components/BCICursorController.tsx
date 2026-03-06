import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MousePointer2, 
  Brain, 
  Zap, 
  Target, 
  Activity, 
  Maximize2, 
  Settings,
  ShieldCheck,
  Cpu,
  Link as LinkIcon,
  Crosshair
} from 'lucide-react';
import { cn } from '../utils';
import { logBus } from '../services/logBus';

export const BCICursorController: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [targetPos, setTargetPos] = useState({ x: 70, y: 30 });
  const [score, setScore] = useState(0);
  const [neuralJitter, setNeuralJitter] = useState(0.5);
  const [magneticTether, setMagneticTether] = useState(85);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  const startCalibration = () => {
    setIsCalibrating(true);
    setCalibrationProgress(0);
    logBus.emit('BCI: Initiating magnetic cord calibration sequence.', 'info');
  };

  useEffect(() => {
    if (isCalibrating) {
      const interval = setInterval(() => {
        setCalibrationProgress(prev => {
          if (prev >= 100) return 100;
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isCalibrating]);

  useEffect(() => {
    if (isCalibrating && calibrationProgress >= 100) {
      setIsCalibrating(false);
      setIsActive(true);
      logBus.emit('BCI: Neural link established. Motor cortex mapping active.', 'success');
    }
  }, [isCalibrating, calibrationProgress]);

  // Simulated Neural Cursor Logic
  const updateCursor = useCallback(() => {
    if (!isActive) return;

    let hit = false;
    let nextTargetPos = targetPos;

    setCursorPos(prev => {
      // Add some "neural noise" and magnetic pull towards target
      const dx = (targetPos.x - prev.x) * 0.05;
      const dy = (targetPos.y - prev.y) * 0.05;
      
      const jitterX = (Math.random() - 0.5) * neuralJitter;
      const jitterY = (Math.random() - 0.5) * neuralJitter;

      const newX = Math.max(5, Math.min(95, prev.x + dx + jitterX));
      const newY = Math.max(5, Math.min(95, prev.y + dy + jitterY));

      // Check for target hit
      const dist = Math.sqrt(Math.pow(newX - targetPos.x, 2) + Math.pow(newY - targetPos.y, 2));
      if (dist < 5) {
        hit = true;
      }

      return { x: newX, y: newY };
    });

    if (hit) {
      const newTarget = {
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80
      };
      setScore(s => s + 1);
      setTargetPos(newTarget);
      logBus.emit(`BCI: Neural lock confirmed. Score: ${score + 1}`, 'neural');
    }

    requestRef.current = requestAnimationFrame(updateCursor);
  }, [isActive, targetPos, neuralJitter, score]);

  useEffect(() => {
    if (isActive) {
      requestRef.current = requestAnimationFrame(updateCursor);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive, updateCursor]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="p-8 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <MousePointer2 className="w-32 h-32 -rotate-12" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className={cn(
              "w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-500",
              isActive ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.3)]" : "border-white/10 bg-white/5"
            )}>
              <Target className={cn("w-8 h-8", isActive ? "text-cyan-400 animate-pulse" : "text-white/40")} />
            </div>
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tighter glow-cyan">Neural Cursor Controller</h2>
              <p className="text-xs text-white/40 uppercase tracking-widest mt-1">BCI Magnetic Cord Interface · Motor Cortex Mapping</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!isActive && !isCalibrating && (
              <button 
                onClick={startCalibration}
                className="px-8 py-4 bg-cyan-500 text-black font-bold uppercase tracking-widest rounded-full hover:bg-white transition-all flex items-center gap-3"
              >
                <Zap className="w-5 h-5" /> Calibrate Neural Link
              </button>
            )}
            {isActive && (
              <button 
                onClick={() => setIsActive(false)}
                className="px-8 py-4 bg-red-500/20 border border-red-500/50 text-red-400 font-bold uppercase tracking-widest rounded-full hover:bg-red-500 hover:text-white transition-all"
              >
                Disconnect Link
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Control Interface */}
        <div className="lg:col-span-3 p-4 border-quantum rounded-3xl bg-black/80 relative overflow-hidden min-h-[600px] cursor-none" ref={containerRef}>
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }} 
          />

          <AnimatePresence mode="wait">
            {isCalibrating ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/90"
              >
                <Brain className="w-20 h-20 text-cyan-400 mb-8 animate-pulse" />
                <h3 className="text-2xl font-bold uppercase tracking-[0.3em] mb-4">Calibrating Magnetic Cord</h3>
                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${calibrationProgress}%` }}
                  />
                </div>
                <p className="mt-4 text-xs font-mono text-cyan-400/60 uppercase tracking-widest">
                  Mapping Synaptic Vectors: {calibrationProgress}%
                </p>
              </motion.div>
            ) : !isActive ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-10"
              >
                <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md text-center max-w-md">
                  <ShieldCheck className="w-12 h-12 text-white/20 mx-auto mb-6" />
                  <h3 className="text-xl font-bold uppercase tracking-widest mb-2">Interface Locked</h3>
                  <p className="text-sm text-white/40 mb-8">Establish a secure magnetic cord connection and calibrate your neural proxy to enable cursor control.</p>
                  <button 
                    onClick={startCalibration}
                    className="w-full py-4 border border-cyan-500/50 text-cyan-400 font-bold uppercase tracking-widest rounded-xl hover:bg-cyan-500 hover:text-black transition-all"
                  >
                    Initialize Handshake
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full h-full"
              >
                {/* Target */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute w-12 h-12 flex items-center justify-center"
                  style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className="absolute inset-0 border-2 border-cyan-500 rounded-full animate-ping" />
                  <Target className="w-8 h-8 text-cyan-400" />
                </motion.div>

                {/* Neural Cursor */}
                <motion.div 
                  className="absolute w-8 h-8 pointer-events-none z-30"
                  style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className="absolute inset-0 bg-magenta-500/20 rounded-full blur-md" />
                  <div className="relative flex items-center justify-center">
                    <Crosshair className="w-6 h-6 text-magenta-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]" />
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-magenta-500 text-[8px] font-bold text-white rounded uppercase whitespace-nowrap">
                      Neural Proxy
                    </div>
                  </div>
                </motion.div>

                {/* Magnetic Tether Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <line 
                    x1={`${cursorPos.x}%`} 
                    y1={`${cursorPos.y}%`} 
                    x2={`${targetPos.x}%`} 
                    y2={`${targetPos.y}%`} 
                    stroke="#06b6d4" 
                    strokeWidth="1" 
                    strokeDasharray="4 4"
                  />
                </svg>

                {/* HUD Overlay */}
                <div className="absolute top-4 left-4 flex gap-4">
                  <div className="px-4 py-2 border border-white/10 rounded-lg bg-black/40 backdrop-blur-sm">
                    <div className="text-[8px] text-white/40 uppercase font-bold mb-1">Neural Lock Score</div>
                    <div className="text-xl font-mono font-bold text-cyan-400">{score.toString().padStart(4, '0')}</div>
                  </div>
                  <div className="px-4 py-2 border border-white/10 rounded-lg bg-black/40 backdrop-blur-sm">
                    <div className="text-[8px] text-white/40 uppercase font-bold mb-1">Magnetic Flux</div>
                    <div className="text-xl font-mono font-bold text-magenta-400">{magneticTether}%</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="p-6 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Settings className="w-4 h-4 text-cyan-400" /> Interface Tuning
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] uppercase font-bold mb-2">
                  <span className="text-white/40">Neural Jitter</span>
                  <span className="text-cyan-400">{neuralJitter.toFixed(2)}ms</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="2.0" 
                  step="0.1"
                  value={neuralJitter}
                  onChange={(e) => setNeuralJitter(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-white/10 rounded-lg appearance-none h-1"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] uppercase font-bold mb-2">
                  <span className="text-white/40">Magnetic Tether</span>
                  <span className="text-magenta-400">{magneticTether}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={magneticTether}
                  onChange={(e) => setMagneticTether(parseInt(e.target.value))}
                  className="w-full accent-magenta-500 bg-white/10 rounded-lg appearance-none h-1"
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-quantum rounded-2xl bg-black/60 backdrop-blur-xl">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> System Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                <span className="text-[10px] text-white/40 uppercase">Cord Polarity</span>
                <span className="text-[10px] font-mono text-emerald-400">ALIGNED</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                <span className="text-[10px] text-white/40 uppercase">Latency</span>
                <span className="text-[10px] font-mono text-cyan-400">0.3ms</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                <span className="text-[10px] text-white/40 uppercase">Encryption</span>
                <span className="text-[10px] font-mono text-white/80">QNE-V2</span>
              </div>
            </div>
          </div>

          <div className="p-6 border border-cyan-500/20 rounded-2xl bg-cyan-500/5">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest">OS-Nexus Kernel</span>
            </div>
            <p className="text-[10px] text-white/40 leading-relaxed">
              The magnetic cord facilitates a direct Bell State coupling between the neural proxy and the hardware transceiver, enabling zero-latency motor cortex mapping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

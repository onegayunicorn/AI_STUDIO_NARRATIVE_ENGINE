import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Lock, AlertTriangle, Info, Zap, Activity } from 'lucide-react';
import { cn } from '../utils';
import { logBus } from '../services/logBus';

export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'neural' | 'quantum';
  message: string;
}

export const SystemLog: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    const now = new Date();
    const timestamp = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(7),
      timestamp,
      type,
      message,
    };
    setLogs(prev => [...prev, newLog].slice(-50)); // Keep last 50 logs
  };

  useEffect(() => {
    // Initial logs
    const initialLogs: LogEntry[] = [
      { id: '1', timestamp: '[10:59:08]', type: 'info', message: 'SYSTEM: INITIALIZING QUANTUM NARRATIVE ENGINE...' },
      { id: '2', timestamp: '[10:59:09]', type: 'quantum', message: 'ENTANGLING 8,470,000 STATES...' },
      { id: '3', timestamp: '[10:59:10]', type: 'success', message: '4-FOLD SIMFOLD PROTOCOL ENGAGED.' },
      { id: '4', timestamp: '[10:59:11]', type: 'info', message: 'REALITY MANIFESTATION AT 99.97% FIDELITY.' },
    ];
    setLogs(initialLogs);

    // Subscribe to logBus
    const unsubscribe = logBus.subscribe((event) => {
      addLog(event.message, event.type);
    });

    // Simulated real-time logs (background system noise)
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.95) { // Less frequent background noise
        const events = [
          { msg: 'SYSTEM: Protocol FULFILLMENT_V1.0 heartbeat nominal.', type: 'info' as const },
          { msg: 'SECURITY: Nighthawk firewall blocked external probe.', type: 'success' as const },
          { msg: 'QUANTUM: Coherence fluctuation detected. Auto-stabilizing...', type: 'quantum' as const },
        ];
        const event = events[Math.floor(Math.random() * events.length)];
        addLog(event.msg, event.type);
      }
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getTypeStyles = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return 'text-emerald-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'neural': return 'text-magenta-400';
      case 'quantum': return 'text-cyan-400';
      default: return 'text-white/60';
    }
  };

  const getTypeIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return <Shield className="w-3 h-3" />;
      case 'warning': return <AlertTriangle className="w-3 h-3" />;
      case 'error': return <AlertTriangle className="w-3 h-3" />;
      case 'neural': return <Activity className="w-3 h-3" />;
      case 'quantum': return <Zap className="w-3 h-3" />;
      default: return <Info className="w-3 h-3" />;
    }
  };

  return (
    <div className="flex flex-col h-full font-mono text-[10px]">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 text-cyan-400">
          <Terminal className="w-3 h-3" />
          <span className="uppercase font-bold tracking-widest">Real-Time System Manifest</span>
        </div>
        <div className="flex items-center gap-4 opacity-50">
          <span className="flex items-center gap-1"><Lock className="w-2 h-2" /> AES-256-GCM</span>
          <span className="flex items-center gap-1"><Shield className="w-2 h-2" /> OS-NEXUS ACTIVE</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1 pr-2">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-3 group"
            >
              <span className="text-white/20 shrink-0">{log.timestamp}</span>
              <span className={cn("shrink-0 mt-0.5", getTypeStyles(log.type))}>
                {getTypeIcon(log.type)}
              </span>
              <span className={cn("flex-1", getTypeStyles(log.type))}>
                {log.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={logEndRef} />
      </div>
      
      <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between opacity-30">
        <div className="flex gap-4">
          <span>LOGS: {logs.length}/50</span>
          <span>UPTIME: 14:22:08</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>LIVE FEED ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

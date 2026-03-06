import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Activity, Brain, Zap, Waves } from 'lucide-react';

interface WaveData {
  time: number;
  alpha: number;
  beta: number;
  theta: number;
  delta: number;
}

export const BrainwaveAnalysis: React.FC = () => {
  const [data, setData] = useState<WaveData[]>([]);
  const [activeBand, setActiveBand] = useState<string>('alpha');

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const nextTime = prev.length > 0 ? prev[prev.length - 1].time + 1 : 0;
        const newData = {
          time: nextTime,
          alpha: 40 + Math.random() * 20 + Math.sin(nextTime * 0.5) * 10,
          beta: 20 + Math.random() * 40 + Math.cos(nextTime * 0.8) * 15,
          theta: 10 + Math.random() * 10 + Math.sin(nextTime * 0.2) * 5,
          delta: 5 + Math.random() * 5 + Math.cos(nextTime * 0.1) * 3,
        };
        const updated = [...prev, newData];
        return updated.slice(-30);
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const bands = [
    { id: 'alpha', label: 'Alpha (8-13 Hz)', color: '#8884d8', desc: 'Relaxation, visualization, creativity' },
    { id: 'beta', label: 'Beta (13-30 Hz)', color: '#82ca9d', desc: 'Alertness, concentration, cognition' },
    { id: 'theta', label: 'Theta (4-8 Hz)', color: '#ffc658', desc: 'Deep relaxation, meditation, memory' },
    { id: 'delta', label: 'Delta (0.5-4 Hz)', color: '#ff7300', desc: 'Deep sleep, healing, regeneration' },
  ];

  return (
    <div className="space-y-6 p-4 bg-black/40 rounded-2xl border border-white/10 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Brain className="text-indigo-400" />
            Neural Brainwave Analysis
          </h2>
          <p className="text-white/50 text-sm italic">Real-time synaptic frequency mapping via Presto Engine</p>
        </div>
        <div className="flex gap-2">
          {bands.map(band => (
            <button
              key={band.id}
              onClick={() => setActiveBand(band.id)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                activeBand === band.id 
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                  : 'bg-white/5 text-white/40 hover:bg-white/10'
              }`}
            >
              {band.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[400px] bg-black/20 rounded-xl border border-white/5 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={bands.find(b => b.id === activeBand)?.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={bands.find(b => b.id === activeBand)?.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" hide />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey={activeBand} 
                stroke={bands.find(b => b.id === activeBand)?.color} 
                fillOpacity={1} 
                fill="url(#colorWave)" 
                animationDuration={300}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Band Diagnostics</h3>
          {bands.map(band => (
            <motion.div 
              key={band.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-xl border transition-all ${
                activeBand === band.id ? 'bg-white/10 border-white/20' : 'bg-white/5 border-transparent opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white">{band.label}</span>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: band.color }} />
              </div>
              <p className="text-xs text-white/50 leading-relaxed">{band.desc}</p>
              {activeBand === band.id && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-indigo-500"
                      animate={{ width: `${(data[data.length-1]?.[band.id as keyof WaveData] as number || 0)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400">
                    {Math.round(data[data.length-1]?.[band.id as keyof WaveData] as number || 0)}%
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Activity, label: 'Coherence', value: '0.94' },
          { icon: Zap, label: 'Peak Power', value: '42.1 mW' },
          { icon: Waves, label: 'Phase Lock', value: 'Active' },
          { icon: Brain, label: 'Neural Load', value: '12%' },
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3">
            <stat.icon className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-tighter">{stat.label}</p>
              <p className="text-lg font-mono font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

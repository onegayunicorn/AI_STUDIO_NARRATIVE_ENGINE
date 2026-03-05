import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Database, Cpu, CheckCircle2, Loader2 } from 'lucide-react';
import { RepoState } from '../types';

export const GitHubSynth: React.FC = () => {
  const [repos, setRepos] = useState<RepoState[]>([
    { id: '1', name: 'tele-quantum-os', status: 'complete', progress: 100 },
    { id: '2', name: 'taka-ai', status: 'synthesizing', progress: 45 },
    { id: '3', name: 'genesis-cure', status: 'pending', progress: 0 },
    { id: '4', name: 'space-drone', status: 'pending', progress: 0 },
    { id: '5', name: 'coral-guardian', status: 'pending', progress: 0 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRepos(prev => prev.map(repo => {
        if (repo.status === 'synthesizing') {
          const nextProgress = repo.progress + Math.random() * 5;
          if (nextProgress >= 100) {
            return { ...repo, status: 'complete', progress: 100 };
          }
          return { ...repo, progress: nextProgress };
        }
        if (repo.status === 'pending' && Math.random() > 0.95) {
          return { ...repo, status: 'synthesizing', progress: 0 };
        }
        return repo;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 border-quantum rounded-lg bg-black/40 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400">GitHub Synthesizer</h3>
        <Github className="w-5 h-5 text-white/50" />
      </div>

      <div className="space-y-4">
        {repos.map((repo) => (
          <div key={repo.id} className="p-3 border border-white/5 rounded bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {repo.status === 'complete' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : repo.status === 'synthesizing' ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                ) : (
                  <Database className="w-4 h-4 text-white/20" />
                )}
                <span className="text-xs font-mono">{repo.name}</span>
              </div>
              <span className="text-[10px] uppercase opacity-50">{repo.status}</span>
            </div>
            
            <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-cyan-400"
                animate={{ width: `${repo.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 border border-cyan-500/20 rounded bg-cyan-500/5 flex items-center gap-4">
        <div className="p-2 bg-cyan-500/20 rounded">
          <Cpu className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <div className="text-[10px] uppercase opacity-50">Hyperfusion Core</div>
          <div className="text-xs font-bold">847 Repositories Entangled</div>
        </div>
      </div>
    </div>
  );
};

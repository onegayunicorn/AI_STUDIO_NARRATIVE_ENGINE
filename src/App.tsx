import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Clock, 
  Activity, 
  ShieldAlert, 
  Menu, 
  X, 
  LayoutDashboard, 
  Dna, 
  Layers, 
  Github as GithubIcon,
  Terminal,
  Rocket,
  Globe,
  Palette,
  Box,
  Cpu,
  Brain,
  Radio,
  Link,
  Target,
  MousePointer2,
  Sigma,
  Variable,
  Waves,
  Zap,
  Shield,
  EyeOff
} from 'lucide-react';
import { TripleHelix } from './components/TripleHelix';
import { SimFold } from './components/SimFold';
import { QuantumSpike } from './components/QuantumSpike';
import { GitHubSynth } from './components/GitHubSynth';
import { SpaceLogistics } from './components/SpaceLogistics';
import { CoralSourcing } from './components/CoralSourcing';
import { HelixDesign } from './components/HelixDesign';
import { DNAOrigamiTest } from './components/DNAOrigamiTest';
import { ManifestationProtocol } from './components/ManifestationProtocol';
import { BCIResearch } from './components/BCIResearch';
import { AuraEliteGenesis } from './components/AuraEliteGenesis';
import { NeuroQuantumInterface } from './components/NeuroQuantumInterface';
import { NeuralProxyCollection } from './components/NeuralProxyCollection';
import { BCICursorController } from './components/BCICursorController';
import { NeuroQuantumFormalization } from './components/NeuroQuantumFormalization';
import { NeuralTransmission } from './components/NeuralTransmission';
import { NeuralPlasmaOrb } from './components/NeuralPlasmaOrb';
import { BrainwaveAnalysis } from './components/BrainwaveAnalysis';
import { GodMode } from './components/GodMode';
import { PrestoEngine } from './components/PrestoEngine';
import { InvisiblePressure } from './components/InvisiblePressure';
import { cn } from './utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeFold, setActiveFold] = useState(1);
  const [users, setUsers] = useState(8470);
  const [coherence, setCoherence] = useState(0.9997);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'origami', icon: Box, label: 'DNA Origami' },
    { id: 'manifest', icon: Cpu, label: 'Manifestation' },
    { id: 'aura', icon: Zap, label: 'Aura Genesis' },
    { id: 'nqi', icon: Radio, label: 'Neuro-Quantum' },
    { id: 'proxy', icon: Link, label: 'Neural Proxy' },
    { id: 'cursor', icon: MousePointer2, label: 'Neural Cursor' },
    { id: 'formal', icon: Sigma, label: 'Formalization' },
    { id: 'transmit', icon: Waves, label: 'Neural Transmit' },
    { id: 'orb', icon: Zap, label: 'Plasma Orb' },
    { id: 'brainwave', icon: Activity, label: 'Brainwaves' },
    { id: 'presto', icon: Cpu, label: 'Presto Engine' },
    { id: 'pressure', icon: EyeOff, label: 'IPT Sensor' },
    { id: 'godmode', icon: Shield, label: 'God Mode' },
    { id: 'bci', icon: Brain, label: 'BCI R&D' },
    { id: 'space', icon: Rocket, label: 'Space Logistics' },
    { id: 'coral', icon: Globe, label: 'Coral Sourcing' },
    { id: 'helix', icon: Palette, label: 'Helix Design' },
    { id: 'simulation', icon: Terminal, label: 'Simulation Core' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFold(prev => (prev % 4) + 1);
      setUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
      setCoherence(prev => 0.9997 + (Math.random() * 0.0002 - 0.0001));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen quantum-grid relative flex overflow-hidden">
      <div className="scanline pointer-events-none" />

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="glass-panel border-r border-white/10 flex flex-col z-20"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
                <Terminal className="w-5 h-5 text-black" />
              </div>
              <span className="font-bold text-sm tracking-tighter uppercase">Genesis Engine</span>
            </motion.div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 p-3 rounded-lg transition-all group",
                activeTab === item.id ? "bg-cyan-500 text-black font-bold" : "hover:bg-white/5 text-white/60 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {isSidebarOpen && <span className="text-xs uppercase tracking-widest">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-magenta-500" />
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-xs font-bold">TAKA AI</span>
                <span className="text-[10px] opacity-50 uppercase">Reality Admin</span>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter uppercase glow-cyan mb-2">
              {activeTab === 'dashboard' ? 'Execution Control Center' : 
               activeTab === 'origami' ? 'DNA Origami Delivery Test' :
               activeTab === 'manifest' ? 'Manifestation Protocol' :
               activeTab === 'aura' ? 'Aura Elite Genesis' :
               activeTab === 'nqi' ? 'Neuro-Quantum Interface' :
               activeTab === 'proxy' ? 'Neural Proxy Data Collection' :
               activeTab === 'cursor' ? 'Neural Cursor Controller' :
               activeTab === 'formal' ? 'Neuro-Quantum Formalization' :
               activeTab === 'transmit' ? 'Neural Data Transmission' :
               activeTab === 'orb' ? 'Neural Plasma Orb App (NPOA)' :
               activeTab === 'brainwave' ? 'Neural Brainwave Analysis' :
               activeTab === 'presto' ? 'Presto Engine: Synaptic Mapping' :
               activeTab === 'pressure' ? 'Invisible Pressure Tracking (IPT)' :
               activeTab === 'godmode' ? 'Nexus Core: God Mode Activated' :
               activeTab === 'bci' ? 'Neural Nanotether R&D' :
               activeTab === 'space' ? 'Space Logistics Intelligence' :
               activeTab === 'coral' ? 'Coral Guardian Sourcing' :
               activeTab === 'helix' ? 'Triple Helix Design Lab' : 'Simulation Core'}
            </h1>
            <p className="text-xs text-white/40 uppercase tracking-[0.3em]">
              {activeTab === 'dashboard' ? 'Protocol: FULFILLMENT_V1.0 · Phase: EXECUTION' : 
               activeTab === 'origami' ? 'Phase 2: Triplex Shield Delivery · Active' :
               activeTab === 'manifest' ? 'Final Command Selection · Reality Manifestation' :
               activeTab === 'aura' ? 'Global Launch September 2026 · Active' :
               activeTab === 'nqi' ? 'OS-Nexus v2.1 (Neural Edition) · Active' :
               activeTab === 'proxy' ? 'Magnetic Cord Ingestion · Real-time' :
               activeTab === 'cursor' ? 'Motor Cortex Cursor Mapping · Active' :
               activeTab === 'formal' ? 'Unified Mathematical Framework · Council Validated' :
               activeTab === 'transmit' ? 'Hair Follicle Waveguide · Quantum Channel' :
               activeTab === 'orb' ? 'RBBE Evolution · IpAI Resonance Weaver' :
               activeTab === 'brainwave' ? 'Synaptic Frequency Mapping · Presto Engine' :
               activeTab === 'presto' ? 'Real-time Neural Synchronization · OS-Nexus' :
               activeTab === 'pressure' ? 'Invisible Pressure Sensor · Biometric Tracking' :
               activeTab === 'godmode' ? 'Sovereign Architect Control · Entanglement Wealth' :
               activeTab === 'bci' ? 'Phase 5: Brain-Computer Interface · In Silico' :
               'Operational Intelligence · B2B Integration Active'}
            </p>
          </div>

          <div className="flex gap-6">
            <div className="text-right">
              <div className="text-[10px] uppercase opacity-50 mb-1">Quantum Coherence</div>
              <div className="text-xl font-mono text-cyan-400">{coherence.toFixed(4)}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase opacity-50 mb-1">Reality Stability</div>
              <div className="text-xl font-mono text-magenta-400">99.97%</div>
            </div>
          </div>
        </header>

        {/* Dynamic View Content */}
        {activeTab === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Users, label: 'Concurrent Users', value: users.toLocaleString(), color: 'text-cyan-400' },
                { icon: Clock, label: 'Year Progress', value: '64.2%', color: 'text-yellow-400' },
                { icon: Activity, label: 'Input Volume', value: '1.47 TB/s', color: 'text-magenta-400' },
                { icon: ShieldAlert, label: 'Anomalies', value: '0', color: 'text-emerald-400' },
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="p-6 glass-panel border border-white/10 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-[10px] uppercase opacity-50 mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold font-mono">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <TripleHelix />
              </div>
              <div className="lg:col-span-1">
                <SimFold activeFold={activeFold} />
              </div>
              <div className="lg:col-span-1">
                <div className="flex flex-col gap-8">
                  <QuantumSpike />
                  <GitHubSynth />
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'space' && <SpaceLogistics />}
        {activeTab === 'origami' && <DNAOrigamiTest />}
        {activeTab === 'manifest' && <ManifestationProtocol />}
        {activeTab === 'aura' && <AuraEliteGenesis />}
        {activeTab === 'nqi' && <NeuroQuantumInterface />}
        {activeTab === 'proxy' && <NeuralProxyCollection />}
        {activeTab === 'cursor' && <BCICursorController />}
        {activeTab === 'formal' && <NeuroQuantumFormalization />}
        {activeTab === 'transmit' && <NeuralTransmission />}
        {activeTab === 'orb' && <NeuralPlasmaOrb />}
        {activeTab === 'brainwave' && <BrainwaveAnalysis />}
        {activeTab === 'presto' && <PrestoEngine />}
        {activeTab === 'pressure' && <InvisiblePressure />}
        {activeTab === 'godmode' && <GodMode />}
        {activeTab === 'bci' && <BCIResearch />}
        {activeTab === 'coral' && <CoralSourcing />}
        {activeTab === 'helix' && <HelixDesign />}
        {activeTab === 'simulation' && (
          <div className="p-12 border-quantum rounded-xl bg-black/40 text-center">
            <Terminal className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold uppercase mb-4">Simulation Core Active</h2>
            <p className="text-white/40 max-w-md mx-auto uppercase text-[10px] tracking-widest">
              Accessing hyperfusion matrix... 847 repositories entangled.
              Reality manifestation fidelity at 99.97%.
            </p>
          </div>
        )}

        {/* Terminal / Logs Footer */}
        <footer className="mt-12 p-6 glass-panel border border-white/10 rounded-xl font-mono text-[10px] text-white/40">
          <div className="flex items-center gap-2 mb-4 text-cyan-400">
            <Terminal className="w-3 h-3" />
            <span className="uppercase font-bold">System Manifest</span>
          </div>
          <div className="space-y-1">
            <div>[02:56:40] INITIALIZING QUANTUM NARRATIVE ENGINE...</div>
            <div>[02:56:41] ENTANGLING 8,470,000 STATES...</div>
            <div>[02:56:42] 4-FOLD SIMFOLD PROTOCOL ENGAGED.</div>
            <div>[02:56:43] REALITY MANIFESTATION AT 99.97% FIDELITY.</div>
            <div className="text-cyan-400 animate-pulse">_ WAITING FOR USER INPUT...</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

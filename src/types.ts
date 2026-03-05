export interface QuantumState {
  coherence: number;
  stability: number;
  entanglement: number;
  users: number;
  yearProgress: number;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  description: string;
  type: 'past' | 'present' | 'future' | 'unity';
}

export interface RepoState {
  id: string;
  name: string;
  status: 'pending' | 'synthesizing' | 'complete';
  progress: number;
}

export interface Manufacturer {
  id: string;
  name: string;
  region: 'Asia-Pacific' | 'Europe' | 'Americas' | 'MENA';
  category: '3D Reefs' | 'Robotics' | 'Sensors' | '3D Systems';
  specialty: string;
}

export interface MarketStat {
  label: string;
  value: string;
  growth: string;
}

export interface DNAOrigamiMetric {
  label: string;
  value: string | number;
  status: 'optimal' | 'warning' | 'critical';
}

export interface DesignPrototype {
  id: string;
  name: string;
  type: string;
  description: string;
  status: 'Concept' | 'Prototype' | 'Production';
}

export interface ManifestationOption {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
}

export interface ComparisonMetric {
  label: string;
  aav: string;
  triplex: string;
}

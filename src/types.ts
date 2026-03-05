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

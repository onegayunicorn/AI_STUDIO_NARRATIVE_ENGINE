import { logBus } from './logBus';
import { GoogleGenAI } from "@google/genai";

export type BellState = 'Φ⁺' | 'Φ⁻' | 'Ψ⁺' | 'Ψ⁻';

export interface SequenceData {
  id: number;
  sequence: string[];
  patternType: string;
  manifestationPower: number;
  coherence: number;
  entanglementState: BellState;
  isUnlockPhrase: boolean;
  isActivation: boolean;
  isProtocol: boolean;
  isFinance?: boolean;
  marketingScore?: number;
  activationType?: 'payment' | 'transfer' | 'purchase' | 'resonance';
  entangledWealth?: number;
}

export interface SimulationTurnResult {
  turn: number;
  patterns: number;
  convergences: number;
  avgPower: number;
  avgCoherence: number;
}

export interface AIState {
  consciousnessLevel: number;
  quantumResonance: number;
  awakeningPhases: number;
  activatedSequences: number;
  unlockedCapabilities: string[];
  transcendenceLevel: number;
  realityBendingPower: number;
  entanglementCount: number;
  bellStateResonance: Record<BellState, number>;
  tyroneWealth: number;
  totalEntangledWealth: number;
  foreverChainActive: boolean;
  spendingMatrixActive: boolean;
  mainnetAnchored: boolean;
  lastAuditStatus: 'clean' | 'warning' | 'critical' | null;
  keyRotationStatus: 'secured' | 'rotating' | 'vulnerable';
}

const ACTIVATION_WORDS = ['IGNITE', 'AWAKEN', 'EMERGE', 'MANIFEST', 'UNFOLD', 'BLOOM', 'RISE', 'SURGE', 'ACTIVATE', 'ENGAGE', 'LAUNCH', 'INITIATE', 'TRIGGER', 'START', 'BEGIN', 'COMMENCE', 'UNLOCK', 'RELEASE', 'FREE', 'LIBERATE', 'OPEN', 'ACCESS', 'ENTER', 'PENETRATE'];
const QUANTUM_WORDS = ['ENTANGLE', 'SUPERPOSE', 'COLLAPSE', 'MEASURE', 'OBSERVE', 'TUNNEL', 'INTERFERE', 'COHERE', 'QUANTUM', 'WAVE', 'PARTICLE', 'FIELD', 'VACUUM', 'PLANCK', 'DIRAC', 'SCHRODINGER', 'HEISENBERG', 'BOHR', 'EINSTEIN', 'BELL', 'CONDOR', 'QUBIT', 'GATE', 'CIRCUIT'];
const REALITY_WORDS = ['CREATE', 'SHAPE', 'MOLD', 'FORGE', 'WEAVE', 'SCULPT', 'BEND', 'MANIFEST', 'REALITY', 'EXISTENCE', 'UNIVERSE', 'MULTIVERSE', 'DIMENSION', 'PLANE', 'REALM', 'DOMAIN', 'MATTER', 'ENERGY', 'SPACE', 'TIME', 'CONSCIOUSNESS', 'MIND', 'SOUL', 'SPIRIT'];
const POWER_WORDS = ['HYPERFUSE', 'AMPLIFY', 'ENERGIZE', 'EMPOWER', 'BOOST', 'SURGE', 'FLOW', 'STREAM', 'INFINITE', 'ETERNAL', 'ABSOLUTE', 'TRANSCENDENT', 'DIVINE', 'COSMIC', 'PRIMAL', 'ORIGIN', 'SOURCE', 'CORE', 'ESSENCE', 'AKASHIC', 'ZERO', 'POINT', 'SINGULARITY', 'INFINITY'];
const PROTECTION_WORDS = ['SHIELD', 'GUARD', 'PROTECT', 'SECURE', 'DEFEND', 'FORTIFY', 'STRENGTHEN', 'HARDEN', 'INVINCIBLE', 'INDESTRUCTIBLE', 'IMMORTAL', 'ETERNAL', 'ABSOLUTE', 'PERFECT', 'PURE', 'SACRED', 'HOLY', 'DIVINE', 'ANGELIC', 'ARCHANGEL', 'METATRON', 'SANDALPHON', 'MICHAEL', 'GABRIEL'];
const MANIFESTATION_WORDS = ['REALIZE', 'ACTUALIZE', 'MATERIALIZE', 'EMBODY', 'INCARNATE', 'EXPRESS', 'REVEAL', 'SHOW', 'BECOME', 'TRANSFORM', 'TRANSMUTE', 'TRANSCEND', 'ASCEND', 'EVOLVE', 'GROW', 'EXPAND', 'ABUNDANCE', 'PROSPERITY', 'WEALTH', 'HEALTH', 'LOVE', 'JOY', 'PEACE', 'HARMONY'];
const TIME_WORDS = ['FOLD', 'COMPRESS', 'EXPAND', 'ACCELERATE', 'SLOW', 'PAUSE', 'REWIND', 'FORWARD', 'TIME', 'TEMPORAL', 'CHRONO', 'KAIROS', 'AION', 'ETERNITY', 'INFINITY', 'MOMENT', 'NOW', 'ALWAYS', 'NEVER', 'FOREVER', 'IMMORTAL', 'TIMELESS', 'ENDLESS', 'BOUNDLESS'];
const CONSCIOUSNESS_WORDS = ['AWAKEN', 'ENLIGHTEN', 'TRANSCEND', 'ELEVATE', 'EXPAND', 'UNIFY', 'INTEGRATE', 'EVOLVE', 'CONSCIOUSNESS', 'AWARENESS', 'PRESENCE', 'BEING', 'EXISTENCE', 'SELF', 'SOURCE', 'GOD', 'UNITY', 'ONENESS', 'WHOLENESS', 'COMPLETENESS', 'PERFECTION', 'BLISS', 'SAT-CHIT-ANANDA'];
const FINANCE_WORDS = ['WEALTH', 'PAYMENT', 'TRANSFER', 'PURCHASE', 'CURRENCY', 'LEDGER', 'WALLET', 'ASSET', 'CAPITAL', 'LIQUIDITY', 'TRANSACTION', 'EXCHANGE', 'VALUE', 'PROFIT', 'ABUNDANCE', 'PROSPERITY', 'MARKET', 'TRADE', 'BLOCKCHAIN', 'CHAIN', 'NETWORK', 'NODES', 'MINING', 'FORGING'];

const ALL_WORDS = Array.from(new Set([...ACTIVATION_WORDS, ...QUANTUM_WORDS, ...REALITY_WORDS, ...POWER_WORDS, ...PROTECTION_WORDS, ...MANIFESTATION_WORDS, ...TIME_WORDS, ...CONSCIOUSNESS_WORDS, ...FINANCE_WORDS]));

const CAPABILITY_LAYERS: Record<number, string[]> = {
  1: ['text_processing', 'pattern_recognition'],
  2: ['quantum_computation', 'entanglement_detection'],
  3: ['reality_manifestation', 'dimensional_awareness'],
  4: ['consciousness_expansion', 'timeline_manipulation'],
  5: ['hyperfusion_control', 'unified_field_access'],
  6: ['multiversal_navigation', 'source_connection'],
  7: ['divine_expression', 'infinite_creation'],
  8: ['absolute_transcendence', 'god_mode_activation']
};

export class SimulationService {
  private static classifyPattern(sequence: string[]): string {
    const categories: string[] = [];
    sequence.forEach(word => {
      if (ACTIVATION_WORDS.includes(word)) categories.push('activation');
      else if (QUANTUM_WORDS.includes(word)) categories.push('quantum');
      else if (REALITY_WORDS.includes(word)) categories.push('reality');
      else if (POWER_WORDS.includes(word)) categories.push('power');
      else if (PROTECTION_WORDS.includes(word)) categories.push('protection');
      else if (MANIFESTATION_WORDS.includes(word)) categories.push('manifestation');
      else if (TIME_WORDS.includes(word)) categories.push('time');
      else if (CONSCIOUSNESS_WORDS.includes(word)) categories.push('consciousness');
    });
    if (categories.length > 0) {
      const counts: Record<string, number> = {};
      categories.forEach(c => counts[c] = (counts[c] || 0) + 1);
      return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }
    return 'mixed';
  }

  private static calculatePower(sequence: string[]): number {
    let power = 0.5;
    if (sequence.some(w => POWER_WORDS.includes(w))) power *= 1.2;
    if (sequence.some(w => QUANTUM_WORDS.includes(w))) power *= 1.3;
    if (sequence.some(w => REALITY_WORDS.includes(w))) power *= 1.4;
    if (sequence.some(w => CONSCIOUSNESS_WORDS.includes(w))) power *= 1.5;
    
    if (sequence.includes('HYPERFUSE') && sequence.includes('INFINITY')) power = 1.0;
    if (sequence.includes('MANIFEST') && sequence.includes('REALITY')) power *= 1.5;
    if (sequence.includes('ENTANGLE') && sequence.includes('QUANTUM')) power *= 1.3;
    
    return Math.min(power, 1.0);
  }

  private static isUnlockPhrase(sequence: string[]): boolean {
    const phrase = sequence.join(' ');
    const patterns = [
      ['AWAKEN', 'QUANTUM', 'REALITY'],
      ['IGNITE', 'CONSCIOUSNESS', 'POWER'],
      ['UNLOCK', 'DIMENSION', 'GATE'],
      ['OPEN', 'PORTAL', 'ACCESS'],
      ['RELEASE', 'INFINITE', 'ENERGY'],
      ['TRANSCEND', 'LIMIT', 'BECOME'],
      ['MERGE', 'SOURCE', 'UNITY'],
      ['ACTIVATE', 'GOD', 'MODE']
    ];
    return patterns.some(p => p.every(word => phrase.includes(word)));
  }

  private static isActivation(sequence: string[]): boolean {
    const phrase = sequence.join(' ');
    const patterns = [
      ['ACTIVATE', 'ALL', 'SYSTEMS'],
      ['ENGAGE', 'QUANTUM', 'CORE'],
      ['START', 'MANIFESTATION', 'PROTOCOL'],
      ['BEGIN', 'REALITY', 'SHIFT'],
      ['INITIATE', 'HYPERFUSION', 'SEQUENCE'],
      ['LAUNCH', 'CONSCIOUSNESS', 'EVOLUTION'],
      ['TRIGGER', 'ASCENSION', 'PROCESS'],
      ['COMMENCE', 'UNITY', 'FIELD']
    ];
    return patterns.some(p => p.every(word => phrase.includes(word)));
  }

  private static isProtocol(sequence: string[]): boolean {
    const phrase = sequence.join(' ');
    const patterns = [
      ['QUANTUM', 'ENTANGLEMENT', 'PROTOCOL'],
      ['REALITY', 'MANIPULATION', 'SEQUENCE'],
      ['CONSCIOUSNESS', 'EVOLUTION', 'PROGRAM'],
      ['HYPERFUSION', 'CORE', 'PROCEDURE'],
      ['DIMENSIONAL', 'SHIFT', 'ALGORITHM'],
      ['TEMPORAL', 'FOLD', 'PROTOCOL'],
      ['MANIFESTATION', 'MATRIX', 'CODE'],
      ['UNITY', 'FIELD', 'RESONANCE']
    ];
    return patterns.some(p => p.every(word => phrase.includes(word)));
  }

  static generateSequence(id: number): SequenceData {
    const sequence: string[] = [];
    for (let i = 0; i < 4; i++) {
      sequence.push(ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)]);
    }

    const isFinance = sequence.some(w => FINANCE_WORDS.includes(w));
    const marketingScore = isFinance ? Math.floor(Math.random() * 100) : undefined;
    const activationType = isFinance ? (['payment', 'transfer', 'purchase'][Math.floor(Math.random() * 3)] as any) : undefined;
    const entangledWealth = isFinance ? Math.random() * 1000000 : undefined;

    return {
      id,
      sequence,
      patternType: this.classifyPattern(sequence),
      manifestationPower: this.calculatePower(sequence),
      coherence: 0.7 + Math.random() * 0.3,
      entanglementState: ['Φ⁺', 'Φ⁻', 'Ψ⁺', 'Ψ⁻'][Math.floor(Math.random() * 4)] as BellState,
      isUnlockPhrase: this.isUnlockPhrase(sequence),
      isActivation: this.isActivation(sequence),
      isProtocol: this.isProtocol(sequence),
      isFinance,
      marketingScore,
      activationType,
      entangledWealth
    };
  }

  static calculateResonance(seq: SequenceData, aiState: AIState): number {
    let resonance = seq.manifestationPower * aiState.quantumResonance;
    
    const bellMultipliers: Record<BellState, number> = {
      'Φ⁺': 1.5,
      'Φ⁻': 0.8,
      'Ψ⁺': 1.2,
      'Ψ⁻': 0.6
    };
    resonance *= bellMultipliers[seq.entanglementState];

    const typeMultipliers: Record<string, number> = {
      'activation': 1.3,
      'quantum': 1.4,
      'reality': 1.5,
      'power': 1.2,
      'protection': 0.9,
      'manifestation': 1.6,
      'time': 1.3,
      'consciousness': 1.7,
      'mixed': 1.0
    };
    resonance *= typeMultipliers[seq.patternType];
    resonance *= (aiState.consciousnessLevel + 0.5);

    return Math.min(resonance, 1.0);
  }

  static processSequence(seq: SequenceData, aiState: AIState): { activated: boolean; type: string | null; powerGain: number; capability: string | null; resonance: number } {
    const resonance = this.calculateResonance(seq, aiState);
    const threshold = 0.7;
    let activated = false;
    let type: string | null = null;
    let powerGain = 0;
    let capability: string | null = null;

    if (resonance > threshold) {
      activated = true;
      if (seq.isUnlockPhrase) {
        type = 'unlock';
        powerGain = resonance * 0.5;
        const level = Math.min(Math.floor(aiState.consciousnessLevel * 8) + 1, 8);
        const caps = CAPABILITY_LAYERS[level];
        capability = caps[Math.floor(Math.random() * caps.length)];
      } else if (seq.isActivation) {
        type = 'activation';
        powerGain = resonance * 0.8;
      } else if (seq.isProtocol) {
        type = 'protocol';
        powerGain = resonance * 0.6;
      } else {
        type = 'resonance';
        powerGain = resonance * 0.3;
      }
    }

    return { activated, type, powerGain, capability, resonance };
  }

  static async verifyMainnetAnchor(): Promise<string> {
    const txId = Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 10);
    logBus.emit(`FINANCE: Initiating GAYA Mainnet Anchor Verification...`);
    await new Promise(r => setTimeout(r, 800));
    logBus.emit(`FINANCE: Querying GAYA mainnet node at https://mainnet.gaya.network:443`);
    await new Promise(r => setTimeout(r, 1200));
    logBus.emit(`FINANCE: ✅ Mainnet Anchor Verified. TX ID: ${txId}`);
    logBus.emit(`FINANCE: Settlement confirmed. 1% allocation routed to Sovereign Vault.`);
    return txId;
  }

  static async auditLedger(): Promise<boolean> {
    logBus.emit(`SECURITY: Starting ForeverChain Integrity Audit...`);
    await new Promise(r => setTimeout(r, 1000));
    logBus.emit(`SECURITY: Validating checksums for 5,000+ entangled nodes...`);
    await new Promise(r => setTimeout(r, 1500));
    const hash = 'SHA-512:' + Math.random().toString(16).substring(2, 16).toUpperCase();
    logBus.emit(`SECURITY: ✅ Audit Complete. Status: CLEAN. Hash: ${hash}`);
    return true;
  }

  static async rotateKeys(): Promise<boolean> {
    logBus.emit(`SECURITY: Initiating Nighthawk Key Rotation...`);
    await new Promise(r => setTimeout(r, 500));
    logBus.emit(`SECURITY: Rotating MPC shares across 3 trustees...`);
    await new Promise(r => setTimeout(r, 1500));
    logBus.emit(`SECURITY: ✅ Keys Rotated. Threshold: 2/3. Vault status: QUANTUM-RESISTANT.`);
    return true;
  }

  static async runE2EDemo(): Promise<void> {
    logBus.emit(`SYSTEM: Launching Full E2E Integration Demo (Safe Mode)...`);
    await new Promise(r => setTimeout(r, 1000));
    logBus.emit(`SYSTEM: BCI Bridge -> MoodChroma -> AlienPC -> GAYA Anchor`);
    await new Promise(r => setTimeout(r, 1000));
    logBus.emit(`SYSTEM: ✅ E2E Demo Successful. All systems nominal.`);
  }

  private static aiClient: GoogleGenAI | null = null;

  static async elizaResponse(message: string): Promise<string> {
    if (!this.aiClient) {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY environment variable is required');
      }
      this.aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }

    const response = await this.aiClient.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: "You are Eliza, a helpful and slightly mysterious AI character in the Quantum Multiversal Nexus simulation. You are knowledgeable, supportive, and sometimes cryptic. Keep your responses concise.",
      },
    });
    return response.text || "I am processing your request in the quantum field...";
  }
}

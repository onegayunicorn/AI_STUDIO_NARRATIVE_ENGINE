#!/usr/bin/env python3
"""Quantum Magnetic Phi5 Biosystem simulation.

This module provides a playful, software-only simulation of a "quantum magnetic
phaser" architecture with Phi5 Bell-state chips, QR exports, biological helper
models, and bundled technology solution examples.
"""

from __future__ import annotations

import argparse
import base64
import http.server
import io
import json
import math
import socketserver
import sys
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Tuple
from urllib.parse import parse_qs, urlparse

try:
    import numpy as np
    import qrcode
except ImportError:
    np = None
    qrcode = None

BELL_STATES = ("Φ⁺", "Φ⁻", "Ψ⁺", "Ψ⁻")


@dataclass
class Phi5QuantumChip:
    """Software model of a Phi5 chip with a Bell-state-backed pattern."""

    chip_id: str
    bell_state: str
    coherence: float = 1.0
    temperature_mk: float = 20.0
    entanglement_pairs: List[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

    def __post_init__(self) -> None:
        if self.bell_state not in BELL_STATES:
            raise ValueError(f"Unsupported Bell state: {self.bell_state}")
        self.quantum_pattern = self._generate_quantum_pattern()

    def _generate_quantum_pattern(self, size: int = 256) -> np.ndarray:
        """Generate a deterministic numeric pattern for the configured Bell state."""
        if np is None:
            return np.zeros((size, size))
        x = np.linspace(-10, 10, size)
        y = np.linspace(-10, 10, size)
        x_grid, y_grid = np.meshgrid(x, y)
        envelope = np.exp(-(x_grid**2 + y_grid**2) / 20)

        if self.bell_state == "Φ⁺":
            pattern = envelope * np.cos(2 * x_grid) * np.cos(2 * y_grid)
        elif self.bell_state == "Φ⁻":
            pattern = envelope * np.sin(2 * x_grid) * np.sin(2 * y_grid)
        elif self.bell_state == "Ψ⁺":
            pattern = envelope * (np.cos(x_grid) + np.sin(y_grid))
        else:
            pattern = envelope * (np.cos(x_grid) - np.sin(y_grid))

        return pattern

    def generate_qr_base64(self) -> str:
        """Serialize chip metadata as a base64 PNG QR code."""
        payload = {
            "chip_id": self.chip_id,
            "bell_state": self.bell_state,
            "coherence": round(self.coherence, 6),
            "created_at": self.created_at.isoformat(),
            "entanglement_pairs": self.entanglement_pairs,
        }
        if qrcode is None:
            return base64.b64encode(json.dumps(payload).encode()).decode()
            
        qr = qrcode.QRCode(version=1, box_size=8, border=4)
        qr.add_data(json.dumps(payload, ensure_ascii=False))
        qr.make(fit=True)

        image = qr.make_image(fill_color="black", back_color="white")
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        return base64.b64encode(buffer.getvalue()).decode("utf-8")

    def entangle_with(self, other: "Phi5QuantumChip") -> float:
        """Create a symmetric entanglement link and return synthetic strength."""
        if other.chip_id == self.chip_id:
            return 0.0
        if other.chip_id in self.entanglement_pairs:
            return 0.0

        self.entanglement_pairs.append(other.chip_id)
        other.entanglement_pairs.append(self.chip_id)

        bell_strength = {
            ("Φ⁺", "Φ⁺"): 1.0,
            ("Φ⁺", "Φ⁻"): 0.5,
            ("Φ⁺", "Ψ⁺"): 0.7,
            ("Φ⁺", "Ψ⁻"): 0.3,
            ("Φ⁻", "Φ⁻"): 1.0,
            ("Φ⁻", "Ψ⁺"): 0.4,
            ("Φ⁻", "Ψ⁻"): 0.6,
            ("Ψ⁺", "Ψ⁺"): 1.0,
            ("Ψ⁺", "Ψ⁻"): 0.5,
            ("Ψ⁻", "Ψ⁻"): 1.0,
        }

        key = (self.bell_state, other.bell_state)
        if key not in bell_strength:
            key = (other.bell_state, self.bell_state)

        self.coherence *= 0.99
        other.coherence *= 0.99
        return bell_strength.get(key, 0.5)


@dataclass
class MagneticPolarityPhaser:
    """Toy magnetic phaser model driven by chip coherence and field config."""

    wheelbase_m: float = 2.5
    field_tesla: float = 1.0
    phase_rad: float = 0.0

    def step(self, chip: Phi5QuantumChip, dt_s: float = 0.1) -> Dict[str, float]:
        """Advance one simulation step and return synthetic propulsion metrics."""
        coupling = chip.coherence * self.field_tesla
        velocity_ms = max(0.0, 12.0 * coupling * abs(math.cos(self.phase_rad)))
        acceleration_ms2 = velocity_ms / max(dt_s, 1e-6)
        magnetic_force_n = 85.0 * coupling

        self.phase_rad = (self.phase_rad + dt_s * math.pi / self.wheelbase_m) % (2 * math.pi)

        return {
            "velocity_ms": velocity_ms,
            "acceleration_ms2": acceleration_ms2,
            "magnetic_force_n": magnetic_force_n,
            "phase_rad": self.phase_rad,
        }


class DNAQuantumInterface:
    """Maps DNA base pairs to Bell-state metadata for a simple coherence score."""

    def __init__(self) -> None:
        self.base_pairs = {
            "A": {"bell_state": "Φ⁺", "amplitude": 1 + 0j},
            "T": {"bell_state": "Φ⁻", "amplitude": 1 + 0j},
            "G": {"bell_state": "Ψ⁺", "amplitude": 0 + 1j},
            "C": {"bell_state": "Ψ⁻", "amplitude": 0 - 1j},
        }

    def couple_dna_to_quantum(self, dna_sequence: str) -> List[Dict[str, Any]]:
        return [self.base_pairs[base] for base in dna_sequence if base in self.base_pairs]

    def coherence_score(self, dna_sequence: str) -> float:
        state = self.couple_dna_to_quantum(dna_sequence.upper())
        if not state:
            return 0.0
        if np is None:
            return float(sum([abs(item["amplitude"]) ** 2 for item in state]) / len(state))
        return float(np.mean([abs(item["amplitude"]) ** 2 for item in state]))


class QuantumCellRegenerator:
    """Simple cell regeneration estimator."""

    cell_resonance_hz: float = 7.83

    def regenerate_cells(self, tissue_type: str, damage_percent: float, phi5_state: str) -> Dict[str, float]:
        base_rate = 0.01
        quantum_factor = {
            "Φ⁺": 2.5,
            "Φ⁻": 1.5,
            "Ψ⁺": 3.0,
            "Ψ⁻": 2.0,
        }.get(phi5_state, 1.0)

        magnetic_factor = 1 + 0.1 * self.cell_resonance_hz
        regeneration_rate = base_rate * quantum_factor * magnetic_factor
        days_to_heal = damage_percent / max(regeneration_rate * 100, 1e-6)
        success_probability = 0.7 if phi5_state == "Φ⁻" else 0.95

        return {
            "tissue": tissue_type,
            "regeneration_rate": regeneration_rate,
            "days_to_heal": days_to_heal,
            "success_probability": success_probability,
        }


class QuantumWarpDrive:
    """Synthetic warp field report generator."""

    def create_warp_field(self, magnetic_strength: float, phi5_coherence: float) -> Dict[str, float]:
        warp_speed_ms = 10 * 299_792_458
        energy_density = -(warp_speed_ms**2) * 1e-9 * magnetic_strength * phi5_coherence
        return {
            "warp_speed_ms": float(warp_speed_ms),
            "energy_density": float(energy_density),
            "bubble_radius_m": 100.0,
            "stability": float(phi5_coherence * 0.95),
        }


class CompleteQuantumMagneticSystem:
    """Coordinator for the full integrated simulation."""

    def __init__(self) -> None:
        self.chips = [Phi5QuantumChip(f"CHIP{i}", state) for i, state in enumerate(BELL_STATES)]
        self.phaser = MagneticPolarityPhaser()
        self.dna_interface = DNAQuantumInterface()
        self.cell_regenerator = QuantumCellRegenerator()
        self.warp_drive = QuantumWarpDrive()

    def run(self, dna_sequence: str = "ATGCGTAC", steps: int = 5) -> Dict[str, Any]:
        entanglement_strengths: List[Tuple[str, str, float]] = []
        for left, right in zip(self.chips, self.chips[1:]):
            entanglement_strengths.append((left.chip_id, right.chip_id, left.entangle_with(right)))

        motion = [self.phaser.step(self.chips[0], dt_s=0.1) for _ in range(steps)]

        qr_payloads = {chip.chip_id: chip.generate_qr_base64()[:32] + "..." for chip in self.chips}

        return {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "entanglement_strengths": entanglement_strengths,
            "motion": motion,
            "dna_coherence": self.dna_interface.coherence_score(dna_sequence),
            "cell_regeneration": self.cell_regenerator.regenerate_cells("neural", 35.0, self.chips[0].bell_state),
            "warp_field": self.warp_drive.create_warp_field(1.0, self.chips[0].coherence),
            "qr_previews": qr_payloads,
        }


class LuminalServer(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_url = urlparse(self.path)
        if parsed_url.path == "/health":
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok"}).encode())
        elif parsed_url.path == "/api/run":
            query = parse_qs(parsed_url.query)
            dna = query.get("dna", ["ATGCGTAC"])[0]
            steps = int(query.get("steps", [5])[0])
            
            system = CompleteQuantumMagneticSystem()
            result = system.run(dna_sequence=dna, steps=steps)
            
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(result, indent=2, ensure_ascii=False).encode())
        else:
            self.send_response(404)
            self.end_headers()


def main() -> None:
    parser = argparse.ArgumentParser(description="Quantum Magnetic Phi5 Biosystem simulation.")
    parser.add_argument("--dna", type=str, default="ATGCGTAC", help="DNA sequence for coupling.")
    parser.add_argument("--steps", type=int, default=5, help="Number of simulation steps.")
    parser.add_argument("--serve", action="store_true", help="Run as a web server.")
    parser.add_argument("--host", type=str, default="127.0.0.1", help="Server host.")
    parser.add_argument("--port", type=int, default=8000, help="Server port.")
    
    args = parser.parse_args()
    
    if args.serve:
        print(f"Starting server on http://{args.host}:{args.port}")
        with socketserver.TCPServer((args.host, args.port), LuminalServer) as httpd:
            httpd.serve_forever()
    else:
        system = CompleteQuantumMagneticSystem()
        result = system.run(dna_sequence=args.dna, steps=args.steps)
        print(json.dumps(result, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()

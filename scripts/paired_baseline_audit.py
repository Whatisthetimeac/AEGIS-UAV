#!/usr/bin/env python3
"""AEGIS-UAV: paired, auditable threshold comparison.

Uses existing modeled geometry. Does not measure PDR, latency, or field performance.
Usage: python3 scripts/paired_baseline_audit.py
"""
import csv
import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data" / "iecon_model_replay_1806.csv"
THRESHOLDS = {"C2 waypoint": -6.7, "C2 direct-stick": -6.7,
              "VLOS video": 5.9, "N-VLOS video": 14.1}
BASELINE = 14.1
LOSSES = (0.0, 3.0, 6.0, 10.0)

with SOURCE.open(newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))
assert len(rows) == 1806, "Expected 1806 modeled positions"
assert len({(r["uav"], r["time_s"]) for r in rows}) == len(rows), "Duplicate samples"
assert {r["uav"] for r in rows} == {"A1", "B3", "C2", "D4", "E5", "F6"}

results = []
for loss in LOSSES:
    for name, threshold in THRESHOLDS.items():
        by_uav = defaultdict(lambda: {"n": 0, "uniform": 0, "service": 0, "rescued": 0})
        for r in rows:
            snr = float(r["snr_db"]) - loss
            a = snr >= BASELINE
            b = snr >= threshold
            assert not a or b, "Ordered thresholds violated"
            x = by_uav[r["uav"]]
            x["n"] += 1
            x["uniform"] += int(a)
            x["service"] += int(b)
            x["rescued"] += int(b and not a)
        n = sum(x["n"] for x in by_uav.values())
        u = sum(x["uniform"] for x in by_uav.values())
        s = sum(x["service"] for x in by_uav.values())
        rescued = sum(x["rescued"] for x in by_uav.values())
        assert n == 1806 and s-u == rescued
        results.append({"additional_loss_db": loss, "service": name,
                        "modeled_positions": n, "uniform_admitted": u,
                        "service_admitted": s, "additional_admissions": rescued,
                        "difference_pp": round(100 * rescued/n, 4),
                        "per_uav": dict(sorted(by_uav.items()))})

base = {r["service"]: r for r in results if r["additional_loss_db"] == 0}
assert all(base[k]["additional_admissions"] == 244
           for k in ("C2 waypoint", "C2 direct-stick", "VLOS video"))
assert base["N-VLOS video"]["additional_admissions"] == 0
print(json.dumps({"source": str(SOURCE.relative_to(ROOT)),
                  "scope": "deterministic modeled samples, not independent flights",
                  "baseline_threshold_db": BASELINE,
                  "comparison": "paired service-specific threshold",
                  "warning": "Admission is not packet delivery, safety, throughput, or mission success.",
                  "results": results}, ensure_ascii=False, indent=2))

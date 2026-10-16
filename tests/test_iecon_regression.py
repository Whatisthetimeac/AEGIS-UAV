"""Reproducibility guard for the IECON 2026 model replay.
Run: python tests/test_iecon_regression.py
Samples are correlated model positions, not independent flights.
"""
from pathlib import Path
import csv
import math

ROOT=Path(__file__).resolve().parents[1]
CSV=ROOT/"data"/"iecon_model_replay_1806.csv"
with CSV.open(encoding="utf-8",newline="") as handle:
    records=list(csv.DictReader(handle))
assert len(records)==1806
assert set(row["uav"] for row in records)=={"A1","B3","C2","D4","E5","F6"}
snr=[float(row["snr_db"]) for row in records]
assert all(math.isfinite(value) for value in snr)
assert min(snr)>5.9
assert sum(value>=14.1 for value in snr)==1562
assert sum(math.ceil(value)>=14.1 for value in snr)==1581
assert sum(5.9<=value<14.1 for value in snr)==244
thresholds={"C2 waypoint":-6.7,"C2 direct stick":-6.7,"VLOS video":5.9,"N-VLOS video":14.1}
uniform=[value>=14.1 for value in snr]
for service,threshold in thresholds.items():
    mapped=[value>=threshold for value in snr]
    assert all((not base) or own for base,own in zip(uniform,mapped))
    assert sum(mapped)-sum(uniform)==(0 if service=="N-VLOS video" else 244)
expected={"A1":0,"B3":48,"C2":96,"D4":86,"E5":0,"F6":14}
for label,count in expected.items():
    rows=[row for row in records if row["uav"]==label]
    assert len(rows)==301
    assert sorted(int(row["time_s"]) for row in rows)==list(range(301))
    assert sum(5.9<=float(row["snr_db"])<14.1 for row in rows)==count
sample=next(row for row in records if row["uav"]=="D4" and int(row["time_s"])==145)
assert abs(float(sample["snr_db"])-13.990980068)<1e-6
assert [float(sample["snr_db"])>=threshold for threshold in thresholds.values()]==[True,True,True,False]
assert float(sample["snr_db"])<14.1
print("PASS: 1806 model samples, 1562 continuous, 1581 legacy, 244 avoided per lower-rate profile")
print("PASS: service ordering, six trajectories, D4 at 145s demonstrator")

"""Static safeguards for the AEGIS-UAV visual release.
Run: python tests/test_visual_contract.py
This verifies wiring and semantics; screenshot/device checks remain separate.
"""
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
def read(path):
    p=ROOT/path
    assert p.is_file(), f"missing file: {path}"
    return p.read_text(encoding="utf-8")

html=read("index.html")
design=read("blue-signature.css")
finish=read("neutral-finish.css")
mapcss=read("map-refinement.css")
mapjs=read("map-refinement.js")
demo=read("competition-mode.js")
read("docs/GUIA_VISUAL_SIGNATURE_BLUE.md")
for style in ["map-refinement.css","competition-mode.css","blue-signature.css","neutral-finish.css"]:
    assert style in html, f"stylesheet not linked: {style}"
assert html.index("blue-signature.css")<html.index("neutral-finish.css")
for script in ["map-refinement.js","competition-mode.js"]:
    assert script in html
assert html.index("map-refinement.js")>html.index("</style>")
assert "proof-ribbon" in html
assert "aegisCase" in demo
assert "145" in demo and "D4" in demo
assert "getComputedStyle" not in demo  # no styling hack to change scientific results
assert "const COLORS=['#8de0ee','#ffd68e','#bda8f2','#5ce3d0','#f3a8b1','#86b1f6'];" in html
assert "var(--aircraft-color)" in design
assert "colorDot.style.backgroundColor=COLORS[i]" in mapjs
assert "const colorDot" in mapjs
assert re.search(r"\.aegis-waypoint-diamond\s*\{",mapcss)
assert "--bg:#08111f" in finish
assert "#f4f7fb" in finish
assert "#b4c0cc" in finish
assert not re.search(r"\.aegis-aircraft\{--aircraft-color:[^}]*!important",design)
print("PASS: blue-white-gray interface, six pastel UAV markers, map/demos wired")
print("PASS: visual guide and scientific interface files are present")

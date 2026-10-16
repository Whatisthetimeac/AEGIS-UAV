"""Compatibility entrypoint for the original numerical-regression test command."""
from pathlib import Path
import subprocess
import sys
root=Path(__file__).resolve().parents[1]
sys.exit(subprocess.run(['node',str(root/'tests/test_core.cjs')],cwd=root).returncode)

"""Bundle the reviewed modular source into the portable GitHub Pages entrypoint."""
from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]
s=(root/'src/index.html').read_text()
for name in ['styles.css','../design-upgrade.css']:
    content=(root/'src'/name).read_text()
    s=s.replace(f'<link rel="stylesheet" href="{name}">', '<style>\n'+content+'\n</style>')
for name in ['missions.js','data/iecon_replay.js','app.js','research.js']:
    content=(root/'src'/name).read_text()
    s=s.replace(f'<script defer src="{name}"></script>','')
    s=s.replace('</body>', '<script>\n'+content+'\n</script></body>')
s=s.replace('href="../docs/','href="docs/').replace('href="../data/','href="data/').replace('href="assets/','href="src/assets/')
s='\n'.join(line.rstrip() for line in s.splitlines())+'\n'
(root/'index.html').write_text(s)
print('Built index.html from src/; inline application and data, optional online map.')

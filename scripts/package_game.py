"""Assemble a self-contained offline HTML game and the identical Android asset."""
from pathlib import Path
import json,base64
root=Path(__file__).resolve().parents[1]
html=(root/'src/index.html').read_text()
for marker,file in [('STYLE','style.css'),('DATA','data.js'),('GAME','game.js')]:
 html=html.replace('/* '+marker+' */',(root/'src'/file).read_text())
audio={p.stem:'data:audio/mpeg;base64,'+base64.b64encode(p.read_bytes()).decode() for p in sorted((root/'assets/audio').glob('*.mp3'))}
html=html.replace('/* AUDIO */','const VOICE='+json.dumps(audio,separators=(',',':'))+';')
for path in [root/'index.html',root/'android/app/src/main/assets/index.html',root/'outputs/Racing-Learn-Fun-v1.0.0-offline.html']:
 path.parent.mkdir(parents=True,exist_ok=True);path.write_text(html)
print(f'Packaged {len(audio)} offline voice prompts; {len(html):,} characters')

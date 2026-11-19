"""Optional regeneration: ESPEAK_BIN/ESPEAK_DATA_PATH and ffmpeg must be available."""
import json,os,subprocess,tempfile
from pathlib import Path
root=Path(__file__).resolve().parents[1]
worlds=json.loads(subprocess.check_output(['node','-e',"console.log(JSON.stringify(require('./src/data.js').worlds))"],cwd=root))
phrases={f"{w['id']}-{i['id']}":'Collect '+i['label'] for w in worlds for i in w['items']}
phrases.update({'correct':'Great finding!','combo':'Amazing! Keep it up!','finish':'Wonderful racing! You are a learning star!','try-again':'Keep trying! You can do it!'})
(root/'assets/audio').mkdir(parents=True,exist_ok=True)
for key,phrase in phrases.items():
 with tempfile.TemporaryDirectory() as tmp:
  wav=tmp+'/voice.wav'
  subprocess.run([os.getenv('ESPEAK_BIN','espeak-ng'),'-v','en-us','-s','145','-p','58','-w',wav,phrase],check=True)
  subprocess.run(['ffmpeg','-y','-loglevel','error','-i',wav,'-codec:a','libmp3lame','-b:a','48k',str(root/'assets/audio'/f'{key}.mp3')],check=True)
print(f'Generated {len(phrases)} prompts')

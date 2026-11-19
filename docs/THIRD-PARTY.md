# Assets and dependencies

- Car SVG illustrations, UI, road graphics, music-like feedback tones, and game logic were created for this project. The palette/layout follows the user's Pop Parade reference.
- Emoji are rendered by each device's installed system fonts; appearance varies by platform. No emoji font is redistributed in the app.
- English speech clips were generated using eSpeak NG 1.52.0 and encoded with FFmpeg/libmp3lame. These build tools are not redistributed in the app. The engine is GPLv3; see its [license](https://github.com/espeak-ng/espeak-ng/blob/master/COPYING), including its section on program output. The clips contain only the original short educational prompts listed in the generation script.
- Gradle wrapper and Android build tools retain their upstream licenses. Playwright is a development-only dependency, absent from the shipped game. Android System WebView is supplied by the device.

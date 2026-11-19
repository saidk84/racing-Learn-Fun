# Racing: Learn & Fun — 1.0.0

An offline educational Android racing game inspired by the cream/pastel, rounded-card interface of Pop Parade. Pick one of ten illustrated cars, steer across three lanes, and collect the spoken target.

## Play

- Download `index.html` and open it in a modern desktop browser. All artwork, sounds, and 172 spoken English clips are inside the file; no server or internet is needed. On Android, install the test APK for dependable local-file handling and saved progress.
- APK: `apk/Racing-Learn-Fun-v1.0.0-test.apk` (R8 optimized, signed with a **test** certificate; sideload only).
- AAB: `aab/Racing-Learn-Fun-v1.0.0-unsigned.aab` (R8 optimized; needs the publisher's upload key before Play submission).
- Tap a lane, swipe, or use the left/right buttons. Desktop players can also use arrow keys or A/D. Pause with Space/Escape.

## Learning worlds

| World | Curriculum | Levels |
|---|---|---:|
| Alphabet Avenue | A–Z | 18 |
| Rainbow Road | 10 named colors | 6 |
| Number Highway | 1–100 | 60 |
| Safari Speedway | 20 animals | 12 |
| Fruit Garden | 12 fruits | 9 |

105 levels in three rounds: Discover, Practice, Shine. Each race presents ten targets. Every item appears at least six times across the full curriculum. Later rounds are a little faster; Gentle driving gives 50% more time. One star opens the next level. All ten cars are available immediately.

Accuracy = correct / (correct + wrong + missed). Score = accuracy × 1000, rounded. Stars: 50% → 1, 70% → 2, 90% → 3. Consecutive correct collections trigger combos and special sounds; combos do not inflate accuracy. Best stars and scores persist locally. No advertisements, purchases, accounts, analytics, network permission, or remote resources.

## Develop and test

Requires Node 18+, Python 3, JDK 17, Android SDK platform 36/build tools 36.0.0. Gradle 8.13 and AGP 8.13.2 are pinned.

```sh
npm ci
npm run build
# Uses /usr/bin/chromium by default; set CHROMIUM_BIN for another executable.
npm test
cd android
./gradlew --no-daemon :app:assembleDebug :app:assembleRelease :app:bundleRelease :app:lintRelease
```

`src/` is authoritative. `scripts/package_game.py` produces identical root HTML and Android assets. CI checks both are in sync. Audio is already committed; regenerating it is optional (`scripts/generate_audio.py`, eSpeak NG + FFmpeg). The speech clips are synthesized, not human recordings. Review pronunciation with children/educators before launch.

Android uses a local HTTPS origin intercepted by WebView, blocks network loads and external navigation, disables file/content access, and exposes no JavaScript bridge. It respects system-bar/cutout insets, supports resizing and both orientations, handles Android Back, and pauses on backgrounding. Minimum Android 7.0/API 24; target Android 16/API 36. Keep Android System WebView current.

## Release

See [Play release checklist](docs/PLAY-RELEASE.md), [validation](docs/VALIDATION.md), [privacy policy draft](docs/PRIVACY-POLICY.md), and [store listing](docs/STORE-LISTING.md). Never commit signing keys or passwords. Set `RACING_KEYSTORE`, `RACING_STORE_PASSWORD`, `RACING_KEY_ALIAS`, `RACING_KEY_PASSWORD` to build a publisher-signed release. Omit them for an unsigned bundle. Google Play acceptance is subject to its review and the publisher's console/account setup.

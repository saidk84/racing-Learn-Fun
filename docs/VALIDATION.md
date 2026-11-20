# Validation — version 2.1.0

Verified in the Linux build workspace on 20 November 2026.

## Passed

- `npm test`: curriculum checks cover all 300 per-world levels (five topics × 60), all learning objects repeated at least six times, ten distinct car definitions, voice-file coverage, accuracy/star boundaries, and identical web/Android assets.
- Headless Chromium/Playwright: all five worlds completed through spawn/collection/result code with deliberate wrong answers; accurate answers produce mode-specific scores and stars; next levels unlock; stars and car choice persist after reload. One row also runs through the animation's collision path using keyboard steering.
- Offline browser context with the initial local HTML supplied by the test harness: bundled speech MP3 decoding, UI gameplay, and local persistence work with networking disabled. No remote assets are used.
- Pause/resume, native-facing Back/pause functions, leave-race navigation, touch-button steering and keyboard input. No JavaScript errors.
- Viewport bounds: 320×568, 390×844, 768×1024, 1024×768, 844×390. No horizontal overflow; controls retain a bottom gap. Actual phone/tablet screenshots reviewed.
- Gradle `:app:assembleDebug :app:assembleRelease :app:bundleRelease :app:lintRelease`: successful with JDK 17, SDK 36 and build tools 36.0.0.
- Android lint: zero errors; four reviewed warnings (newer-API manifest attributes, newer Gradle available, required JavaScript enablement). API 33+ has an explicit OnBackInvoked callback; legacy onBackPressed is retained only for older devices with a documented targeted lint suppression.
- APK signature verified (v2/v3), correct application ID/version/target SDK, no requested permissions, identical bundled HTML, nonempty R8 mapping, no native shared objects.
- Bundletool 1.18.2 validates the AAB structure and successfully generates a universal test APK whose signature also verifies. Manifest dump and SHA-256 hashes are included in `release/`.

## Not yet verified

No physical Android phone/tablet or emulator was available for installation in this workspace. Android lifecycle, WebView audio on actual devices, minimum-API behavior, 16 KB device behavior, accessibility services, and Play pre-launch reports remain release checks. Browser automation is not a substitute for these device checks.

The release APK is optimized but signed with a development/test certificate. The AAB is optimized and unsigned. No private production/upload key was created, borrowed, or committed. No Play Console submission was made. Publisher identity/contact details, public privacy-policy hosting, declarations, account testing, and Google review remain required.

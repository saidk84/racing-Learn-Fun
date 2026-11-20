# Play release checklist — reviewed 20 November 2026

## Implemented technical requirements

- Unique application ID `com.racinglearnfun.app`, versionCode 3, versionName 2.1.0. Confirm this ID before the first Play upload; it cannot change for that listing later.
- compileSdk/targetSdk 36, minSdk 24, Android Gradle Plugin 8.13.2, Gradle 8.13, Java 17.
- Release R8 code optimization/obfuscation and resource shrinking enabled. Retain `mapping.txt` per version for crash deobfuscation. R8 optimizes the Android shell; bundled HTML/JavaScript is a separate asset.
- No native `.so` libraries: no app-owned native page-alignment or ABI dependency. Google documents Java/Kotlin-only apps as compatible with 16 KB page-size devices; the system WebView is OS-provided. Still run the Play pre-launch report/device tests.
- No permissions, ad SDKs, analytics, billing, account creation, external navigation, personal data collection, or internet access. Backup disabled; progress stored only on device.
- Resizable tablet/phone layout, portrait/landscape support, safe area below controls, Android 16 Back support, app-background pause, sound/voice controls, reduced-motion support, gentle-speed option.
- Local English audio shipped in full, so voice does not depend on a downloaded TTS engine or connection.

## Publisher actions before submission

1. Confirm publisher identity, support email, package ID, app ownership and Play Console verification. Do not upload the test-signed APK as a production release.
2. Use your private upload key and Play App Signing. The delivered AAB is deliberately **unsigned**, not upload-ready. Keep the upload key/passwords outside Git. Use the four `RACING_*` environment variables documented in README and rebuild `:app:bundleRelease`. Increment versionCode for every later upload.
3. Complete the developer/contact details in `PRIVACY-POLICY.md`, host the policy on a public, non-geofenced HTML URL, and enter that URL in Play Console. The app already describes local storage and no collection in Settings. Review disclosures whenever dependencies/features change.
4. Complete Data safety accurately: this version does not collect or share user data. No account deletion flow is needed because the game has no accounts; reset local progress through the parent corner or clear app data.
5. Declare a child-directed audience reflecting actual testing and design (intended 3+ with separate 7+ and 13+ modes; review “5 and under” and “6–8” choices). Complete the Families policy declaration and IARC content-rating questionnaire. No ads; no purchases; all content accessible without login. Do not select an older audience just to avoid Families requirements.
6. Upload the 512×512 icon, 1024×500 feature graphic, phone screenshots, and tablet screenshots. Add the short/full descriptions and support email. Inspect screenshots and wording for accuracy; do not claim Teacher Approved status without approval.
7. Test a **publisher-signed release**, not only debug: Android 7 and Android 16; an actual phone and tablet; gestures and three-button navigation; small screens; rotation/multiwindow; airplane mode from first launch; voice volume; Home/Back/lock screen; resume; reset; slow mode; restored process; all learning modes. Run Play's pre-launch report and address crashes/ANRs/accessibility feedback.
8. Complete internal/closed testing required by your developer account. For personal accounts created after 13 November 2023, Google currently requires 12 opted-in testers for 14 continuous days before applying for production access.
9. Submit the signed AAB through Play Console. App-content declarations, privacy-policy hosting, account requirements and review are independent of build success. Acceptance cannot be guaranteed by code or R8 optimization.

## Official references

- [Target API requirements (API 36 for new apps/updates)](https://developer.android.com/google/play/requirements/target-sdk)
- [16 KB page sizes](https://developer.android.com/guide/practices/page-sizes)
- [Google Play Families policies](https://support.google.com/googleplay/android-developer/answer/9893335)
- [Target audience declarations](https://support.google.com/googleplay/android-developer/answer/9867159)
- [Personal-account testing requirements](https://support.google.com/googleplay/android-developer/answer/14151465)
- [App signing](https://developer.android.com/studio/publish/app-signing)

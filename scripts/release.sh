#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
: "${ANDROID_SDK_ROOT:?Set ANDROID_SDK_ROOT}"
buildtools="$ANDROID_SDK_ROOT/build-tools/36.0.0"
mkdir -p apk aab release outputs
cmp index.html android/app/src/main/assets/index.html
cp android/app/build/outputs/bundle/release/app-release.aab aab/Racing-Learn-Fun-v2.1.0-unsigned.aab
# This script packages unsigned releases for review. A publisher-signed release is a separate workflow.
if unzip -Z1 aab/Racing-Learn-Fun-v2.1.0-unsigned.aab | grep -qi 'META-INF/.*\.RSA'; then
  echo 'Refusing to label a signed publisher bundle as unsigned.' >&2; exit 1
fi
cp android/app/build/outputs/apk/debug/app-debug.apk apk/Racing-Learn-Fun-v2.1.0-debug.apk
"$buildtools/zipalign" -f 4 android/app/build/outputs/apk/release/app-release-unsigned.apk outputs/aligned.apk
keystore="${ANDROID_USER_HOME:-$HOME/.android}/debug.keystore"
"$buildtools/apksigner" sign --ks "$keystore" --ks-key-alias androiddebugkey --ks-pass pass:android --key-pass pass:android --out apk/Racing-Learn-Fun-v2.1.0-test.apk outputs/aligned.apk
"$buildtools/apksigner" verify --verbose apk/Racing-Learn-Fun-v2.1.0-test.apk
"$buildtools/aapt" dump badging apk/Racing-Learn-Fun-v2.1.0-test.apk > release/apk-badging.txt
grep -F "name='com.racinglearnfun.app' versionCode='3' versionName='2.1.0'" release/apk-badging.txt
grep -F "targetSdkVersion:'36'" release/apk-badging.txt
if grep -q '^uses-permission' release/apk-badging.txt; then echo 'Unexpected permission'; exit 1; fi
unzip -p aab/Racing-Learn-Fun-v2.1.0-unsigned.aab base/assets/index.html | cmp - index.html
unzip -p apk/Racing-Learn-Fun-v2.1.0-test.apk assets/index.html | cmp - index.html
if unzip -Z1 aab/Racing-Learn-Fun-v2.1.0-unsigned.aab | grep -q '\.so$'; then echo 'Unexpected native library'; exit 1; fi
test -s android/app/build/outputs/mapping/release/mapping.txt
cp android/app/build/outputs/mapping/release/mapping.txt release/mapping-v2.1.0.txt
cp android/app/build/outputs/mapping/release/mapping.txt release/mapping.txt
cp android/app/build/reports/lint-results-release.txt release/lint-results-v2.1.0.txt
cp android/app/build/reports/lint-results-release.txt release/lint-results-release.txt
sha256sum index.html apk/*.apk aab/*.aab release/mapping-v2.1.0.txt > release/SHA256SUMS
cp index.html outputs/Racing-Learn-Fun-v2.1.0-offline.html
cp apk/Racing-Learn-Fun-v2.1.0-test.apk outputs/
cp aab/Racing-Learn-Fun-v2.1.0-unsigned.aab outputs/
rm outputs/aligned.apk

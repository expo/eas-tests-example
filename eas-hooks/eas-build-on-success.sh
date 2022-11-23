#!/usr/bin/env bash

set -eox pipefail

ANDROID_EMULATOR=pixel_4

if [[ "$EAS_BUILD_PLATFORM" == "android" ]]; then
  # Start emulator
  $ANDROID_SDK_ROOT/emulator/emulator @$ANDROID_EMULATOR -no-audio -no-boot-anim -no-window -use-system-libs 2>&1 >/dev/null &

  # Wait for emulator
  max_retry=10
  counter=0
  until adb shell getprop sys.boot_completed; do
    sleep 10
    [[ counter -eq $max_retry ]] && echo "Failed to start the emulator!" && exit 1
    counter=$((counter + 1))
  done

  if [[ "$EAS_BUILD_PROFILE" == "test" ]]; then
    detox test --configuration android.release --headless
  fi
  if [[ "$EAS_BUILD_PROFILE" == "test_debug" ]]; then
    detox test --configuration android.debug --headless
  fi

  # Kill emulator
  adb emu kill
else
  if [[  "$EAS_BUILD_PROFILE" == "test" ]]; then
    detox test --configuration ios.release --headless
  fi
  if [[ "$EAS_BUILD_PROFILE" == "test_debug" ]]; then
    detox test --configuration ios.debug --headless
  fi
fi

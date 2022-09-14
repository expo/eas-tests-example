#!/usr/bin/env bash

set -eox pipefail

if [[ "$EAS_BUILD_PLATFORM" == "ios" && "$EAS_BUILD_PROFILE" == "test" ]]; then
  detox test --configuration ios.release --headless
fi

if [[ "$EAS_BUILD_PLATFORM" == "ios" && "$EAS_BUILD_PROFILE" == "test_debug" ]]; then
  detox test --configuration ios.debug --headless
fi

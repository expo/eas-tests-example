#!/usr/bin/env bash

set -eox pipefail

if [[ "$EAS_BUILD_PLATFORM" == "ios" && "$EAS_BUILD_PROFILE" == "test" ]]; then
  brew tap wix/brew
  brew install applesimutils
fi

if [[ "$EAS_BUILD_PLATFORM" == "ios" && "$EAS_BUILD_PROFILE" == "test_debug" ]]; then
  brew tap wix/brew
  brew install applesimutils
fi

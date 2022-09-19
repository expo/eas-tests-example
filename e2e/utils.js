const {exec} = require('child_process');
const argparse = require('detox/src/utils/argparse');
const appConfig = require('../app.json');

//////////// General util methods //////////////

// Async wait for n milliseconds
const sleepAsync = t => new Promise(res => setTimeout(res, t));

// Base64 encoding
const base64Encode = (url) => {
  let buff = Buffer.alloc(url.length, url);
  return buff.toString('base64');
};


// Get Detox configuration being used
const getConfigurationName = () => argparse.getArgValue('configuration');

// Get EAS app ID
const getAppId = () => appConfig?.expo?.extra?.eas?.projectId || "";

///////////// Methods to construct test URLs ///////////////

// For local dev testing, returns the packager URL with the disable onboarding query param
const getDevLauncherPackagerUrl = (platform) => {
  return `http://localhost:8081/index.bundle?platform=${platform}&dev=true&minify=false&disableOnboarding=1`;
};

// Returns the URL for the most recent update for the 'test_debug' EAS update channel
const getLatestUpdateUrl = () => `https://u.expo.dev/${getAppId()}?channel-name=test_debug&disableOnboarding=1`;

// Wraps a React Native bundle URL in the deep link form required by expo-dev-launcher for this app
const getDeepLinkUrl = (url) =>   `eastestsexample://expo-development-client/?url=${encodeURIComponent(url)}`;

////////////// Launch test app with a deep link url //////////////////

const invokeDevLauncherUrl = (platform, deepLinkUrl) => {
  if (platform === 'android') {
    exec(`adb shell \"am start -W -a android.intent.action.VIEW -d \'\'\'${deepLinkUrl}\'\'\' com.dsokal.eas-tests-example/.MainActivity\"`);
  } else if (platform === 'ios') {
    exec(`xcrun simctl openurl \"iPhone 11\" ${deepLinkUrl}`);
  }
};

module.exports = {
  sleepAsync,
  base64Encode,
  getConfigurationName,
  getAppId,
  getDevLauncherPackagerUrl,
  getLatestUpdateUrl,
  getDeepLinkUrl,
  invokeDevLauncherUrl,
};




const appConfig = require('../../../app.json');

module.exports.openAppForDebugBuild = async function openAppForDebugBuild() {
  const [platform, target] = process.env.DETOX_CONFIGURATION.split('.');
  if (target !== 'debug') {
    return;
  }

  await sleep(1000);
  await device.openURL({
    url: process.env.EXPO_USE_UPDATES
      // Testing latest published EAS update for the test_debug channel
      ? getDeepLinkUrl(getLatestUpdateUrl())
      // Local testing with packager
      : getDeepLinkUrl(getDevLauncherPackagerUrl(platform)),
  });
  await sleep(3000);
}

const getDeepLinkUrl = (url) =>
  `eastestsexample://expo-development-client/?url=${encodeURIComponent(url)}`;

const getDevLauncherPackagerUrl = (platform) =>
  `http://localhost:8081/index.bundle?platform=${platform}&dev=true&minify=false&disableOnboarding=1`;

const getLatestUpdateUrl = () =>
  `https://u.expo.dev/${getAppId()}?channel-name=test_debug&disableOnboarding=1`;

const getAppId = () => appConfig?.expo?.extra?.eas?.projectId ?? '';

const sleep = t => new Promise(res => setTimeout(res, t));

// Usage: node ./e2e/testdeeplink.js <ios|android>
//
// If app is running in the simulator or emulator, invokes the deep link for the dev launcher
// to load this app's JS bundle from the packager
//
const {
  base64Encode,
  getDevLauncherPackagerUrl,
  getDeepLinkUrl,
  invokeDevLauncherUrl,
} = require('./utils');

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

const lastArg = process.argv[process.argv.length - 1];
const platform = (lastArg === 'android') ? 'android' : 'ios';

invokeDevLauncherUrl(platform, getDeepLinkUrl(base64Encode(getDevLauncherPackagerUrl(platform))));

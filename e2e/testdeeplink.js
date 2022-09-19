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
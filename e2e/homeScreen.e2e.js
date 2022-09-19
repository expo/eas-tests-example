const {
  sleepAsync,
  getConfigurationName,
  getAppId,
  getDevLauncherPackagerUrl,
  getLatestUpdateUrl,
  getDeepLinkUrl,
  invokeDevLauncherUrl,
} = require('./utils');

describe('Home screen', () => {
  beforeEach(async () => {
    const appId = getAppId();
    const platform = device.getPlatform();
    console.warn('appId = ' + appId);
    await device.launchApp({
      newInstance: true,
    });
    if (getConfigurationName().indexOf('debug') !== -1) {
      await device.openURL({
        //url: getDeepLinkUrl(getDevLauncherPackagerUrl(platform)),
        url: getDeepLinkUrl(getLatestUpdateUrl()),
      });
        // await sleepAsync(1000);
      // Test latest EAS update
      // invokeDevLauncherUrl(platform, getDeepLinkUrl(getLatestUpdateUrl()));
      // Test local packager URL
      // invokeDevLauncherUrl(platform, getDeepLinkUrl(getDevLauncherPackagerUrl(platform)));
      // await sleepAsync(1000);
    }
    // Only need this for local packager testing
    await sleepAsync(3000);
//    await device.reloadReactNative();
  });

  it('"Click me" button should be visible', async () => {
    await expect(element(by.id('click-me-button'))).toBeVisible();
  });

  it('shows "Hi!" after tapping "Click me"', async () => {
    await element(by.id('click-me-button')).tap();
    await expect(element(by.text('Hi!'))).toBeVisible();
  });
});

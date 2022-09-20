const {
  sleepAsync,
  getConfigurationName,
  // getDevLauncherPackagerUrl,
  getLatestUpdateUrl,
  getDeepLinkUrl,
} = require('./utils');

describe('Home screen', () => {
  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
    });
    if (getConfigurationName().indexOf('debug') !== -1) {
      await device.openURL({
        // Local testing with packager
        //url: getDeepLinkUrl(getDevLauncherPackagerUrl(platform)),
        // Testing latest published EAS update for the test_debug channel
        url: getDeepLinkUrl(getLatestUpdateUrl()),
      });
    }
    await sleepAsync(3000);
  });

  it('"Click me" button should be visible', async () => {
    await expect(element(by.id('click-me-button'))).toBeVisible();
  });

  it('shows "Hi!" after tapping "Click me"', async () => {
    await element(by.id('click-me-button')).tap();
    await expect(element(by.text('Hi!'))).toBeVisible();
  });
});

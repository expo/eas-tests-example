const { fail } = require('assert');
const {exec} = require('child_process');
const argparse = require('detox/src/utils/argparse');
const appConfig = require('../app.json');

const devLauncherPackagerUrl = (platform) => {
  const url = `http://localhost:8081/index.bundle?platform=${platform}&dev=true&minify=false&disableOnboarding=1`;
  return `eastestsexample://expo-development-client/?url=${encodeURIComponent(url)}`;
};

const invokeDevLauncherUrl = (platform) => {
  if (platform === 'android') {
    exec(`adb shell \"am start -W -a android.intent.action.VIEW -d \'\'\'${devLauncherPackagerUrl(platform)}\'\'\' com.dsokal.eas-tests-example/.MainActivity\"`);
  } else if (platform === 'ios') {
    exec(`xcrun simctl openurl \"iPhone 11\" ${devLauncherPackagerUrl(platform)}`);
  }
};

const sleepAsync = t => new Promise(res => setTimeout(res, t));

describe('Home screen', () => {
  beforeEach(async () => {
    const appId = appConfig?.expo?.extra?.eas?.projectId || fail('EAS application ID not found');
    console.warn('appId = ' + appId);
    await device.launchApp({
      newInstance: true,
    });
    const configurationName = argparse.getArgValue('configuration');
    if (configurationName.indexOf('debug') !== -1) {
      await sleepAsync(1000);
      invokeDevLauncherUrl(device.getPlatform());
      await sleepAsync(1000);
    }
    await device.reloadReactNative();
  });

  it('"Click me" button should be visible', async () => {
    await expect(element(by.id('click-me-button'))).toBeVisible();
  });

  it('shows "Hi!" after tapping "Click me"', async () => {
    await element(by.id('click-me-button')).tap();
    await expect(element(by.text('Hi!'))).toBeVisible();
  });
});

const {exec} = require('child_process');

const link_url = (platform) => {
  const url = `http%3A%2F%2Flocalhost%3A8081%2Findex.bundle%3Fplatform%3D${platform}%26dev%3Dtrue%26minify%3Dfalse%26disableOnboarding%3D1`;
  return `eastestsexample://expo-development-client/?url=${url}`;
};

const invoke_url = (platform) => {
  if (platform === 'android') {
    exec(`adb shell \"am start -W -a android.intent.action.VIEW -d \'\'\'${link_url(platform)}\'\'\' com.dsokal.eas-tests-example/.MainActivity\"`);
  } else if (platform === 'ios') {
    exec(`xcrun simctl openurl \"iPhone 11\" ${link_url(platform)}`);
  }
};

const sleepAsync = t => new Promise(res => setTimeout(res, t));

describe('Home screen', () => {
  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
    //    launchArgs: {
    //      EXDevMenuIsOnboardingFinished: true,
    //    },
      });
    await sleepAsync(1000);
    invoke_url(device.getPlatform());
    await sleepAsync(1000);
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

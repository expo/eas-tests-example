const {exec} = require('child_process');

const link_url = (platform) => {
  const url = `http://localhost:8081/index.bundle?platform=${platform}&dev=true&minify=false&disableOnboarding=1`;
  return `com.dsokal.eas-tests-example://expo-development-client/?url=${encodeURI(url)}`;
};

const invoke_url = (platform) => {
  if (platform === 'android') {
    exec(`adb shell \"am start -W -a android.intent.action.VIEW -d \'\'\'${link_url(platform)}\'\'\' com.dsokal.eas-tests-example/.MainActivity\"`);
  } else if (platform === 'ios') {
    exec(`xcrun simctl openurl booted ${link_url(platform)}`);
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
    //await device.reloadReactNative();
  });

  it('"Click me" button should be visible', async () => {
    await expect(element(by.id('click-me-button'))).toBeVisible();
  });

  it('shows "Hi!" after tapping "Click me"', async () => {
    await element(by.id('click-me-button')).tap();
    await expect(element(by.text('Hi!'))).toBeVisible();
  });
});

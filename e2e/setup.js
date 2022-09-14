const { cleanup } = require('detox');
const adapter = require('detox/runners/jest/adapter');

afterEach(async () => {
  if (testFailed) {
    await device.takeScreenshot('screenshot');
  }
});

afterAll(async () => {
  device.uninstallApp();
  await adapter.afterAll();
})

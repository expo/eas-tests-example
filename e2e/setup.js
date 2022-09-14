const { cleanup, beforeEach } = require('detox');
const adapter = require('detox/runners/jest/adapter');

beforeEach(async () => {
  await adapter.beforeEach();
});

afterEach(async () => {
  if (testFailed) {
    await device.takeScreenshot('screenshot');
  }
});

afterAll(async () => {
  await adapter.afterAll();
  await cleanup();
})

const { cleanup } = require('detox');
const adapter = require('detox/runners/jest/adapter');

afterAll(async () => {
  device.uninstallApp();
  await adapter.afterAll();
})

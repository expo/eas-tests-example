const { cleanup } = require('detox');
const adapter = require('detox/runners/jest/adapter');

delete global.__RESOLVED_TMP_DIR_;

afterAll(async () => {
  device.uninstallApp();
  await adapter.afterAll();
})

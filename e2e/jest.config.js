/** @type {import('jest').Config} */
module.exports = {
  setupFilesAfterEnv: ['./setup.js'],
  reporters: ['detox/runners/jest/reporter'],
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  testEnvironment: 'detox/runners/jest/testEnvironment',
  testTimeout: 120000,
  rootDir: '..',
  testMatch: **['<rootDir>/e2e/**/*.e2e.js'],**
  verbose: true,
};

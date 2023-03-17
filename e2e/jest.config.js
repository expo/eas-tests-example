/** @type {import('jest').Config} */
module.exports = {
  reporters: ['detox/runners/jest/reporter'],
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  testEnvironment: 'detox/runners/jest/testEnvironment',
  testTimeout: 120000,
  rootDir: '..',
  setupFilesAfterEnv: ['<rootDir>/e2e/setup.js'],
  testMatch: ['<rootDir>/e2e/**/*.e2e.js'],
  verbose: true,
};

afterEach(async () => {
  if (testFailed) {
    await device.takeScreenshot('screenshot');
  }
});

afterAll(async () => {
  await device.uninstallApp();
});

afterEach(async () => {
  if (testFailed) {
    await device.takeScreenshot('screenshot');
  }
});

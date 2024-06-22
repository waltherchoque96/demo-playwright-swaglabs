const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  reporter: [['html', { outputFolder: 'my-report' }]],
  use: {
    video: {
      mode: 'on',
      size: { width: 1200, height: 860 }
    },
    launchOptions: {
      headless: true,
      args: ['--start-maximized'],
    },
  },
  projects: [
    {
      name: "chromium",
      use: {
        viewport: null,
      },
    },
  ],
  outputDir: 'test-results',

  //globalSetup: require.resolve('./global-setup'),
  //globalTeardown: require.resolve('./global-teardown'),
  timeout: 30000,
});
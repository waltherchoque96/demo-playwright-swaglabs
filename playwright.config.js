const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    launchOptions: {
      headless: false,
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
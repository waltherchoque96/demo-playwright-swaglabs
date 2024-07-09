const { defineConfig } = require('@playwright/test');
import * as os from "os";

module.exports = defineConfig({
  reporter: [
    //["list"],
    ["line"],
    [
      "allure-playwright",
      {
        detail: true,
        suiteTitle: false,
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      },
    ],
  ],
  //reporter: [['line'], ['allure-playwright']],
  //reporter: [['junit', { outputFile: 'test-results/results.xml' }]],
  //reporter: [['html', { outputFolder: 'my-report' }]],
  use: {
    video: {
      mode: 'on',
      size: { width: 1200, height: 860 }
    },
    executablePath: '/usr/bin/google-chrome-stable',
    launchOptions: {
      headless: true,
      args: ['--start-maximized'],
    },
  },
  projects: [
    {
      name: `Chrome`,
      use: {
        browserName: `chromium`,
        channel: `chrome`,
        headless: true,
        viewport: null,
      }
    },
    {
      name: `Firefox`,
      use: {
        browserName: `firefox`,
        viewport: null,
        ignoreHTTPSErrors: true,
        headless: true,
        screenshot: `only-on-failure`,
        launchOptions: {
          slowMo: 200
        }
      }
    },
    {
      name: `Edge`,
      use: {
        browserName: `chromium`,
        channel: `msedge`,
        viewport: null,
        ignoreHTTPSErrors: true,
        headless: true,
        screenshot: `only-on-failure`,
        launchOptions: {
          slowMo: 100
        }
      }
    },
  ],
  outputDir: 'test-results',

  //globalSetup: require.resolve('./global-setup'),
  //globalTeardown: require.resolve('./global-teardown'),
  timeout: 30000,
});
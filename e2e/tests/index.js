const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false, // Launch in non-headless mode
    args: ['--start-maximized'] // Start the browser maximized
  });

  //const context = await browser.newContext();
  const context = await browser.newContext({ viewport: null });


  // Create a new page
  const page = await context.newPage();

  // Get screen dimensions
  const { width, height } = await page.evaluate(() => {
    return {
      width: window.screen.availWidth,
      height: window.screen.availHeight
    };
  });
  console.log(width, height);
  //await page.setViewportSize({ width, height });

  await page.goto('https://www.saucedemo.com/');
  console.log('Page title:', await page.title());

  await browser.close();
})();
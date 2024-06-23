import Utils from '../../../support/utils/UtilsManager';

const { LoginPage } = require('../../page/LoginPage')
const { HomePage } = require('../../page/HomePage');
const { test, expect } = require('@playwright/test');

test.describe('Home Swags Lab', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page)
        const home = new HomePage(page)
        await login.goto();
        await login.enterToSwagsLabs('standard_user', 'secret_sauce');
        await page.waitForTimeout(500);
        await home.verifyProductsTitle();
    });
  
    test('Verify social networks', async ({ page }) => {
        const home = new HomePage(page)
        await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));

        await home.verifyLabelFacebook();
        await home.verifyLabelTwiter();
        await home.verifyLabelLinkedin();
        
        await page.waitForTimeout(1000);
    });

    test('Verify ascending order of items', async ({ page }) => {
        const home = new HomePage(page)

        await home.filterBy('Price (low to high)');
        
        await home.initialize();
        const prices = await home.loopThroughPrices();
        const isOrder = Utils.verifyAscendingOrder(prices);
        
        expect(isOrder).toBeTruthy();
        console.log("["+prices+"] " + (isOrder ? "Los precios están ordenado de menor a mayor." : "Los precios NO están ordenado de menor a mayor."));
        
        await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);
    });

    test('Verify descending order of items', async ({ page }) => {
        const home = new HomePage(page)

        await home.filterBy('Price (high to low)');

        await home.initialize();
        const prices = await home.loopThroughPrices();
        const isOrder = Utils.verifyDescendingOrder(prices);

        expect(isOrder).toBeTruthy();
        console.log("["+prices+"] " + (isOrder ? "Los precios están ordenado de mayor a menor." : "Los precios NO están ordenado de mayor a menor."));
        
        await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);
    });

    test.afterEach(async ( { page } ) => {
        await page.close();
        //console.log(`Finished ${test.info().title} with status ${test.info().status}`);
    });
 
});

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
        await home.verifyProductsTitle();
    });
  
    test('verify social networks', async ({ page }) => {
        const home = new HomePage(page)
    
        await home.verifyLabelFacebook();
        await home.verifyLabelTwiter();
        await home.verifyLabelLinkedin();
    });

    test('verify ascending order of items', async ({ page }) => {
        await page.locator('.product_sort_container').selectOption('Price (low to high)');

        var cords = [];
        const prices = await page.$$('div[class="inventory_item_price"]');
        for (const element of prices) {
            const text = await element.textContent();
            const numberMatch = text.match(/\d+(\.\d+)?/);
            
            if (numberMatch) {
                cords.push(Number(numberMatch[0]));
            }
        }
        console.log(cords);
        
        let isOrder = Utils.verifyAscendingOrder(cords);
        expect(isOrder).toBeTruthy();

        if (isOrder) {
            console.log("El arreglo está ordenado de menor a mayor.");
        } else {
            console.log("El arreglo NO está ordenado de menor a mayor.");
        }
        

    });

    test('verify descending order of items', async ({ page }) => {
        await page.locator('.product_sort_container').selectOption('Price (high to low)');

        var cords = [];
        const prices = await page.$$('div[class="inventory_item_price"]');
        for (const element of prices) {
            const text = await element.textContent();
            const numberMatch = text.match(/\d+(\.\d+)?/);
            
            if (numberMatch) {
                cords.push(Number(numberMatch[0]));
            }
        }
        console.log(cords);
        
        let isOrder = Utils.verifyDescendingOrder(cords);
        expect(isOrder).toBeTruthy();
        if (isOrder) {
            console.log("El arreglo está ordenado de mayor a menor.");
        } else {
            console.log("El arreglo NO está ordenado de mayor a menor.");
        }
        
    });

 
});

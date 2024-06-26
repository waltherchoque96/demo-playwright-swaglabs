const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../../page/LoginPage')
const { HomePage } = require('../../page/HomePage')

test.describe('Login Swags Lab', () => {

    test.beforeEach(async ( { page } ) => {
        const login = new LoginPage(page)
        await login.goto();
    })

    test('Login success', async ({ page }) => {
        const login = new LoginPage(page)
        const home = new HomePage(page)
        await login.enterUsername('standard_user');
        await login.enterPassword('secret_sauce');
        await login.clickLoginButton();
        await home.verifySwagsLabsTitle();
        await home.verifyProductsTitle();
        await page.waitForTimeout(1000);
    });

    test('Login not success', async ({ page }) => {
        const login = new LoginPage(page)
        await login.enterUsername('locked_out_user');
        await login.enterPassword('secret_sauce');
        await login.clickLoginButton();
        await login.verifyLoginError();
        await page.waitForTimeout(1000);
    });

    test.afterEach(async ( { page } ) => {
        await page.close();
        console.log(`Finished ${test.info().title} with status ${test.info().status}`);
    });

})


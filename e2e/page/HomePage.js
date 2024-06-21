const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

    constructor(page) {
      this.page = page;
      this.titleSwagsLabs = page.getByText('Swag Labs')
      this.titleProducts = page.locator('.title')
      this.labelTwiter = page.locator('[class="social_twitter"]');
      this.labelFacebook = page.locator('[class="social_facebook"]');
      this.labelLinkedin = page.locator('[class="social_linkedin"]');
    }

    async verifySwagsLabsTitle() {
      await expect(this.titleSwagsLabs).toBeVisible();
    }

    async verifyProductsTitle() {
      await expect(this.titleProducts).toBeVisible();
    }
    async verifyLabelTwiter() {
      await expect(this.labelTwiter).toBeVisible();
    }
    async verifyLabelFacebook() {
      await expect(this.labelFacebook).toBeVisible();
    }
    async verifyLabelLinkedin() {
      await expect(this.labelLinkedin).toBeVisible();
    }

}

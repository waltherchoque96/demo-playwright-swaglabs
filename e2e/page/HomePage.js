const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

  constructor(page) {
      this.page = page;
      this.titleSwagsLabs = page.getByText('Swag Labs')
      this.titleProducts = page.locator('.title')
      this.labelTwiter = page.locator('[class="social_twitter"]');
      this.labelFacebook = page.locator('[class="social_facebook"]');
      this.labelLinkedin = page.locator('[class="social_linkedin"]');
      this.comboBoxFilter = page.locator('.product_sort_container');
      this.pricesList = [];
    }

    async initialize() {
      this.pricesList = await this.page.$$('div.inventory_item_price');
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
    async filterBy(item){
      await this.comboBoxFilter.selectOption(item);
    }
    async loopThroughPrices() {
      const elements = this.pricesList;
      const prices = [];
      for (const el of elements) {
          const text = await el.textContent();
          const numberMatch = text.match(/\d+(\.\d+)?/);
          if (numberMatch) {
              prices.push(parseFloat(numberMatch[0]));
          }
      }
      return prices;
    }
}

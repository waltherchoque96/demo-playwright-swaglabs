const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  constructor(page) {
    this.page = page;
    this.inputUsername = page.locator('id=user-name')
    this.inputPassword = page.locator('id=password')
    this.buttonLogin = page.locator('#login-button')
    this.titleSwagsLabs = page.getByText('Swag Labs')
    this.titleProducts = page.locator('.title')
    this.labelError = page.getByText('Epic sadface: Sorry, this user has been locked out.')
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }
  async enterUsername(username) {
    await this.inputUsername.fill(username);
  }
  async enterPassword(password) {
    await this.inputPassword.fill(password);
  }
  async clickLoginButton() {
    await this.buttonLogin.click();
  }
  async verifyLoginError() {
    await expect(this.labelError).toBeVisible();
  }
  async enterToSwagsLabs(user, pass){
    await this.inputUsername.fill(user);
    await this.inputPassword.fill(pass);
    await this.buttonLogin.click();
  }

}
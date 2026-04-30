const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const SharingAction = require('../actions/sharing.actions');

let driver;
let sharingAction;

// Hook: before semua test
before(async () => {
  console.log('=== Mulai Suite Login Test ===');
});

// Hook: after semua test
after(async () => {
  console.log('=== Selesai Suite Login Test ===');
});

describe('Login SauceDemo', () => {

  // Hook: sebelum setiap test
  beforeEach(async () => {
    console.log('Membuka browser...');
    let options = new chrome.Options();
    options.addArguments('--headless');
    driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    sharingAction = new SharingAction(driver);
    await driver.get('https://www.saucedemo.com/');
  });

  // Hook: setelah setiap test
  afterEach(async () => {
    console.log('Menutup browser...');
    await driver.quit();
  });

  // Skenario 1: Login berhasil
  it('Login with valid credential', async function () {
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();
    await driver.wait(until.elementLocated(By.className('title')), 5000);
    const title = await driver.findElement(By.className('title')).getText();
    assert.strictEqual(title, 'Products');
    await sharingAction.fullPageScreenshot('positive_login_success');
  });

  // Skenario 2: Login dengan username kosong
  it('Login with empty username', async function () {
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();
    const error = await driver.findElement(By.css('[data-test="error"]')).getText();
    assert.ok(error.includes('Username is required'));
    await sharingAction.fullPageScreenshot('negative_empty_username');
  });

  // Skenario 3: Login dengan password kosong
  it('Login with empty password', async function () {
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('login-button')).click();
    const error = await driver.findElement(By.css('[data-test="error"]')).getText();
    assert.ok(error.includes('Password is required'));
    await sharingAction.fullPageScreenshot('negative_empty_password');
  });

  // Skenario 4: Login dengan password salah
  it('Login dengan password salah', async function () {
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('wrong_password');
    await driver.findElement(By.id('login-button')).click();
    const error = await driver.findElement(By.css('[data-test="error"]')).getText();
    assert.ok(error.includes('Username and password do not match'));
    await sharingAction.fullPageScreenshot('negative_wrong_password');
  });

  // Skenario 5: Login dengan akun terkunci
  it('Login dengan akun locked_out_user', async function () {
    await driver.findElement(By.id('user-name')).sendKeys('locked_out_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();
    const error = await driver.findElement(By.css('[data-test="error"]')).getText();
    assert.ok(error.includes('Sorry, this user has been locked out'));
    await sharingAction.fullPageScreenshot('negative_locked_out_user');
  });

});
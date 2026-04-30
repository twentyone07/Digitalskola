const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Google Search Test', function () {
    let driver;

    it('Visit SauceDemo dan cek page title', async function () {
        driver = await new Builder().forBrowser('chrome').build();

        await driver.get('https://www.saucedemo.com');
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLogin.click()

        // tunggu element tampil
        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')),
            10000
        );

        await driver.wait(until.elementIsVisible(buttonCart), 5000, 'Shopping cart harus tampil');

        //tunggu
        await driver.sleep(1700)

    });
    it('Drop down', async function () {
        // dropdown search
        let dropdownSort = await driver.findElement(By.xpath('//select[@data-test="product-sort-container"]'));

        //low to high
        await dropdownSort.click();
        let option1 = await driver.findElement(By.xpath('//option[text()="Price (low to high)"]'));
        await option1.click();

        //tunggu
        await driver.sleep(1700)

        // ambil ulang element 
        let dropdownSort2 = await driver.findElement(By.xpath('//select[@data-test="product-sort-container"]'));

        await dropdownSort2.click();

        //A to Z
        await dropdownSort2.click();
        let option2 = await driver.findElement(By.xpath('//option[text()="Name (A to Z)"]'));
        await option2.click();

        //tunggu
        await driver.sleep(600)
    });

    it('Add to cart and checkout', async function () {
        //tambah backkpack bag
        let addtochartbag = await driver.findElement(By.xpath('//button[@data-test="add-to-cart-sauce-labs-backpack"]'))
        await addtochartbag.click()

        //tunggu    
        await driver.sleep(600)

        //cek keranjang
        let cek = await driver.findElement(By.xpath('//*[@data-test="shopping-cart-link"]'))
        await cek.click()

        //tunggu
        await driver.sleep(1700)

        await driver.get('https://www.saucedemo.com/cart.html');


        await driver.quit();

    });
});
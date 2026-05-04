const { Builder, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { compareScreenshot } = require("../../utilities/visual_regression.helper");
const LoginAction = require("../actions/login.actions");

let driver;
let loginAction;

// Hook: before semua test
before(async () => {
  console.log("=== Mulai Suite Login Test ===");
});

// Hook: after semua test
after(async () => {
  console.log("=== Selesai Suite Login Test ===");
});

describe("Login SauceDemo", () => {

  // Hook: sebelum setiap test
  beforeEach(async () => {
    console.log("Membuka browser...");
    let options = new chrome.Options();
    options.addArguments("--headless");
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    loginAction = new LoginAction(driver); 
    await driver.get("https://www.saucedemo.com/");
  });

  // Hook: setelah setiap test
  afterEach(async () => {
    console.log("Menutup browser...");
    await driver.quit();
  });

  // Skenario 1: Login berhasil
  it("Login with valid credential", async function () {
    await loginAction.login("standard_user", "secret_sauce");
    await loginAction.assertLoginSuccess("Products");
    await driver.sleep(1000);
    await compareScreenshot(driver, "positive_product_page");
  });

  // Skenario 2: Login dengan username kosong
  it("Login with empty username", async function () {
    await loginAction.inputPassword("secret_sauce");
    await loginAction.clickLoginButton();
    await loginAction.assertLoginFailed("Username is required");
    await driver.sleep(1000);
    await compareScreenshot(driver, "negative_empty_username");
  });

  // Skenario 3: Login dengan password kosong
  it("Login with empty password", async function () {
    await loginAction.inputUsername("standard_user");
    await loginAction.clickLoginButton();
    await loginAction.assertLoginFailed("Password is required");
    await driver.sleep(1000);
    await compareScreenshot(driver, "negative_empty_password");
  });

  // Skenario 4: Login dengan password salah
  it("Login dengan password salah", async function () {
    await loginAction.login("standard_user", "wrong_password");
    await loginAction.assertLoginFailed("Username and password do not match");
    await driver.sleep(1000);
    await compareScreenshot(driver, "negative_wrong_password");
  });

  // Skenario 5: Login dengan akun terkunci
  it("Login dengan akun locked_out_user", async function () {
    await loginAction.login("locked_out_user", "secret_sauce");
    await loginAction.assertLoginFailed("Sorry, this user has been locked out");
    await driver.sleep(1000);
    await compareScreenshot(driver, "negative_locked_out_user");
  });

});
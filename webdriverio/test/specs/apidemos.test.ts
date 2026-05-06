import { APIDemosActions } from "../actions/apidemos.action";

const apiDemosAction = new APIDemosActions();

describe("ApiDemos", async () => {
    before(async function () {
    console.log('=== Mulai Suite APIDemos Test ===');
  });

  after(async function () {
    console.log('=== Selesai Suite APIDemos Test ===');
    await driver.terminateApp('io.appium.android.apis');
  });

  beforeEach(async function () {
    await driver.relaunchActiveApp();
  });

  afterEach(async function () {
    if (this.currentTest?.state === 'failed') {
      await driver.saveScreenshot(`./screenshots/${this.currentTest.title}.png`);
    }
  });

  it('@TC001 - Should fill name and password field and verify the value', async () => {
    const nameValue = 'Alex';
    const passwordValue = 'cek123';

    await apiDemosAction.waitForAppBtn();
    await apiDemosAction.clickAppBtn();
    await apiDemosAction.clickAlertDialogsBtn();
    await apiDemosAction.clickTextEntryDialogBtn();
    await apiDemosAction.fillNameField(nameValue);
    await apiDemosAction.fillPasswordField(passwordValue);

    expect(await apiDemosAction.getNameFieldValue()).toEqual(nameValue);
    expect(await apiDemosAction.getPasswordFieldValue()).toEqual(passwordValue);
  });
});
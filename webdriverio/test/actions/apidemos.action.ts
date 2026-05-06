import { APIDemosPage } from "../pageobjects/apidemos.page";

export class APIDemosActions {

  async waitForAppBtn() {
    await APIDemosPage.appBtn().waitForDisplayed({ timeout: 5000 });
  }

  async clickAppBtn() {
    await APIDemosPage.appBtn().click();
  }

  async clickAlertDialogsBtn() {
    await APIDemosPage.alertDialogsBtn().waitForDisplayed({ timeout: 5000 });
    await APIDemosPage.alertDialogsBtn().click();
  }

  async clickTextEntryDialogBtn() {
    await APIDemosPage.textEntryDialogBtn().waitForDisplayed({ timeout: 5000 });
    await APIDemosPage.textEntryDialogBtn().click();
  }

  async fillNameField(name: string) {
    await APIDemosPage.nameField().setValue(name);
  }

  async fillPasswordField(password: string) {
    await APIDemosPage.passwordField().setValue(password);
  }

  async getNameFieldValue() {
    return await APIDemosPage.nameField().getText();
  }

  async getPasswordFieldValue() {
    return await APIDemosPage.passwordField().getText();
  }

}
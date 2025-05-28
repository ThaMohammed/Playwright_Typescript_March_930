import { Page, expect } from "@playwright/test";

export class loginPage {
  page;
  constructor(_page: Page) {
    this.page = _page;
  }

  get email() {
    return this.page.getByPlaceholder("Enter Username");
  }
  get password() {
    return this.page.getByPlaceholder("Enter Password");
  }
  get login() {
    return this.page.getByText("");
  }

  async loginToAzkasurvey(_email, _password, isRememberChecked: boolean) {
    await this.email.fill(_email);
    await this.password.fill(_password);
    if (isRememberChecked == true) {
      await this.page.locator("#inlineFormCheck").setChecked(true);
    }
    await this.page.waitForTimeout(2000);
    // await this.page.getByText("login").nth(1).click();
    await this.page.getByRole("button", { name: "login" }).click();
  }
  async clearData() {
    await this.email.clear();
  }
  async verifyLoginPage() {
    await expect(this.email).toBeVisible();
  }
}

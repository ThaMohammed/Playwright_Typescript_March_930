import { Page, expect } from "@playwright/test";

export class personalDetailsPage {
  page;
  constructor(_page: Page) {
    this.page = _page;
  }
  async verifyPersonalDetails() {
    await expect(this.page.locator("#name")).toBeVisible();
    await expect(this.page).toHaveTitle("Home");
    await console.log(this.page.url());
  }
  async enterPersonalDetails() {
    await this.page.locator("[type='text']").nth(0).fill("Hello")
    await this.page.locator("[value='female']").click();
    await this.page
      .locator("[name='state']")
      .selectOption("DadraandNagarHaveli");
  }
  async clearDefaultData() {
    await this.page.locator("#name").clear();
  }
}

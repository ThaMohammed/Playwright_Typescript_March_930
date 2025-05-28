import { Page } from "@playwright/test";

export class uiHelpers {
  page;
  constructor(_page: Page) {
    this.page = _page;
  }
  async navigateToAzkasurvey(url) {
    await this.page.goto(url);
  }
  async verifyLogin() {
    try {
      await this.page.locator("[name='emai']").toBeVisible();
    } catch (error) {
      console.log(error.message);
    }
  }
}

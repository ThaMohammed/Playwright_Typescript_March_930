import { Page } from "@playwright/test";

export class dashboardPage {
  page: Page;
  constructor(_page: Page) {
    this.page = _page;
  }
  get backbutton() {
    return this.page.getByRole("link", { name: "Back" });
  }
  async viewTheExistingRecord() {
    await this.page.getByText("Dashboard").click();
    await this.page.getByRole("link", { name: "View" }).nth(0).click();
  }
  async navigateToDashboard() {
    this.page.waitForTimeout(1000);
    await this.backbutton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(2000);
    await this.backbutton.highlight();
    await this.page.waitForTimeout(2000);
    await this.backbutton.hover();
    await this.backbutton.click();

    let drag=this.page.getByRole("link", { name: "Back" })
    let drop=this.page.getByRole("link", { name: "Back" })
    await drag.dragTo(drop)
  }
}

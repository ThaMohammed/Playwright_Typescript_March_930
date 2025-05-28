import { Page } from "@playwright/test";

export class homePage {
  page: Page;
  constructor(_page: Page) {
    this.page = _page;
  }
  get uploadJson() {
    return this.page.getByRole("button",{name:"Upload Json"})
  }
  get chooseFile() {
    return this.page.locator("#jsonFileInput");
  }
  get uploadbutton() {
    return this.page.locator("#uploadButton");
  }
  async uploadTheFile() {
    await this.page.waitForTimeout(1000)
    await this.uploadJson.click();
    await this.chooseFile.setInputFiles("./uploadData/SampleImage.jpg");
    await this.page.waitForTimeout(1000)
    await this.uploadbutton.click();
    await this.page.waitForTimeout(1000)
  }
}

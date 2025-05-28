import {
  test,
  expect,
  Browser,
  chromium,
  Page,
  firefox,
  webkit,
} from "@playwright/test";
import { uiHelpers } from "../azkasurvey.pages/uiHelpers";
import { loginPage } from "../azkasurvey.pages/loginPage";
import { personalDetailsPage } from "../azkasurvey.pages/personalDetailsPage";
import { dashboardPage } from "../azkasurvey.pages/dashboardPage";
import { homePage } from "../azkasurvey.pages/homePage";
import fs from "fs";

let page: Page;
let env: string;
test.describe("fill form functionality", () => {
  test.beforeAll("pre-requisite for all tests", async () => {
    let datafile = fs.readFileSync("./testData/env.json", "utf-8");
    let jData = await JSON.parse(datafile);
    env = jData.environment;
  });
  test.beforeEach("start test", async () => {
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, "0")}${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${now.getFullYear()}${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    let datafile = fs.readFileSync(`./testData/azkasurvey_${env}.json`, "utf-8");
    let jData = await JSON.parse(datafile);

    let browser: Browser = await chromium.launch({ headless: true });
    let context = await browser.newContext({
      recordVideo: { dir: `./videos/${formattedDate}` },
    });
    page = await context.newPage();
    let uiHelper = new uiHelpers(page);
    await uiHelper.navigateToAzkasurvey(jData.url);
    let login = new loginPage(page);
    await login.loginToAzkasurvey(jData.email, jData.password, false);
  });
  test.afterEach("stop test", async () => {
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, "0")}${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${now.getFullYear()}${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    //ddMMyyyyhhmmss
    await page.screenshot({
      fullPage: true,
      path: `./screenshots/screen_${formattedDate}.jpg`,
    });
    await page.waitForTimeout(3000);
  });
  test("Verify that user can login to the azkasurvey", async () => {});
  test("verify that user can enter the personal details in azkasurvey", async () => {
    let personDetails = new personalDetailsPage(page);
    await personDetails.enterPersonalDetails();
  });
  test("verify that user can upload the file", async ({ page }) => {
    let home = new homePage(page);
    await home.uploadTheFile();
  });
});

test.describe("Dashboard functionality", () => {
  test.beforeEach("start test", async () => {
    let browser: Browser = await webkit.launch({ headless: true });
    let context = await browser.newContext();
    page = await context.newPage();
    let uiHelper = new uiHelpers(page);
    // await uiHelper.navigateToAzkasurvey();
    // let login = new loginPage(page);
    // await login.loginToAzkasurvey(true);
  });
  test("Verify that user can view the existing record", async () => {
    let dashboard = new dashboardPage(page);
    await dashboard.viewTheExistingRecord();
  });

  test("verify scroll and highlight", async () => {
    let dashboard = new dashboardPage(page);
    await dashboard.viewTheExistingRecord();
    await dashboard.navigateToDashboard();
  });
  test.afterEach("stop test", async () => {
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, "0")}${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${now.getFullYear()}${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    //ddMMyyyyhhmmss
    await page.screenshot({
      fullPage: true,
      path: `./screenshots/screen_${formattedDate}.jpg`,
    });
    await page.waitForTimeout(3000);
  });
});
/*
test('test case title',async({page})=>{
    test steps
    Username: veena@azkasurvey.com, Password: tdR6AMCb
})
    Username: latha@azkasurvey.com, Password: IGrUJzpa
*/

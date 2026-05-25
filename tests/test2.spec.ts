import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html', { timeout: 60000 });
}); 

test("Checking the CI/CD works fine in the github action", async({ page }) => {
    await expect(page.locator("//*[@class='inventory_item_name '][text()='Sauce Labs Backpack']")).toBeVisible()
})

// one important issue that I have figuredout is that, if you use the envfiles, there should be a change 
// in the playwright.yaml files of the github workflows. the changes are: 

// jobs:
//   test:
//     env:
//       BASE_URL: https://www.saucedemo.com // your base url aligned with envfiles. 
//       testenv: uat // which sholud be alligned with the text in the envfiles. 


// allure reporting process goes like this
// 1. Install the allure-report and its dependencies :
//   npm install -D allure-playwright allure-commandline
// 2. Run your tests 
//   npx playwrihgt test
// 3. Generate Allure report using the command below
//   npx allure generate allure-results --clean
// 4. Open the report to show what is going on the test sofar
//    npx allure open allure-report


// Make sure that you have enabled the allure reporat format in the config flie so that you can 
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
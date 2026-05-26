# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test2.spec.ts >> Checking the CI/CD works fine in the github action
- Location: tests\test2.spec.ts:7:5

# Error details

```
Error: page.goto: NS_ERROR_UNKNOWN_HOST
Call log:
  - navigating to "https://www.saucedemo.com/inventory.html", waiting until "load"

```

# Page snapshot

```yaml
- article "Server Not Found" [ref=e3]:
  - img "Illustration of a fox looking at disconnected network cables." [ref=e5]
  - generic [ref=e7]:
    - heading "Server Not Found" [level=1] [ref=e8]
    - paragraph [ref=e9]:
      - text: Nightly can’t connect to the server at
      - strong [ref=e10]: www.saucedemo.com
    - generic [ref=e11]:
      - heading "What can you do about it?" [level=3] [ref=e12]
      - paragraph [ref=e13]: Try connecting on a different device. Check your modem or router. Disconnect and reconnect to Wi-Fi.
    - paragraph [ref=e14]:
      - link "Learn more…" [ref=e15] [cursor=pointer]:
        - /url: https://support.mozilla.org/1/firefox/150.0.2/WINNT/en-US/server-not-found-connection-problem
    - button "Try Again" [ref=e18]:
      - generic [ref=e20]:
        - generic: Try Again
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.beforeEach(async ({ page }) => {
> 4  |   await page.goto('https://www.saucedemo.com/inventory.html', { timeout: 60000 });
     |              ^ Error: page.goto: NS_ERROR_UNKNOWN_HOST
  5  | }); 
  6  | 
  7  | test("Checking the CI/CD works fine in the github action", async({ page }) => {
  8  |     await expect(page.locator("//*[@class='inventory_item_name '][text()='Sauce Labs Backpack23']")).toBeVisible()
  9  | })
  10 | 
  11 | // one important issue that I have figuredout is that, if you use the envfiles, there should be a change 
  12 | // in the playwright.yaml files of the github workflows. the changes are: 
  13 | 
  14 | // jobs:
  15 | //   test:
  16 | //     env:
  17 | //       BASE_URL: https://www.saucedemo.com // your base url aligned with envfiles. 
  18 | //       testenv: uat // which sholud be alligned with the text in the envfiles. 
  19 | 
  20 | 
  21 | // allure reporting process goes like this
  22 | // 1. Install the allure-report and its dependencies :
  23 | //   npm install -D allure-playwright allure-commandline
  24 | // 2. Run your tests 
  25 | //   npx playwrihgt test
  26 | // 3. Generate Allure report using the command below
  27 | //   npx allure generate allure-results --clean
  28 | // 4. Open the report to show what is going on the test sofar
  29 | //    npx allure open allure-report
  30 | 
  31 | 
  32 | // Make sure that you have enabled the allure reporat format in the config flie so that you can 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test.spec.ts >> should complete the checkout process
- Location: tests\test.spec.ts:34:5

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
  7  | 
  8  | test('should have the correct title', async ({ page }) => {
  9  |     //await page.goto('https://www.saucedemo.com/inventory.html')
  10 |   //await expect(page).toHaveTitle('Swag Labs');
  11 |     await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
  12 |     await expect(page.locator('[data-test="item-0-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Bike Light');
  13 |     await expect(page.locator('[data-test="item-1-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
  14 | });
  15 | 
  16 | test('should add items to the cart', async ({ page }) => {
  17 |     //await page.goto('https://www.saucedemo.com/inventory.html')
  18 |     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  19 |     await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  20 |     await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  21 |     await page.locator('.shopping_cart_link').click();
  22 |     await expect(page.locator('.cart_item')).toHaveCount(3);
  23 | });
  24 | 
  25 | test('should remove items from the cart', async ({ page }) => {
  26 |     //await page.goto('https://www.saucedemo.com/inventory.html')
  27 |     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  28 |     await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  29 |     await page.locator('.shopping_cart_link').click();
  30 |     await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  31 |     await expect(page.locator('.cart_item')).toHaveCount(1);
  32 | });
  33 | 
  34 | test('should complete the checkout process', async ({ page }) => {
  35 |     //await page.goto('https://www.saucedemo.com/inventory.html')
  36 |     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();    
  37 |     await page.locator('.shopping_cart_link').click();
  38 |     await page.locator('[data-test="checkout"]').click();
  39 |     await page.locator('[data-test="firstName"]').fill('John');
  40 |     await page.locator('[data-test="lastName"]').fill('Doe');   
  41 |     await page.locator('[data-test="postalCode"]').fill('12345');
  42 |     await page.locator('[data-test="continue"]').click();
  43 |     await page.locator('[data-test="finish"]').click();
  44 |     await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  45 | });
  46 | 
  47 | 
  48 | 
```
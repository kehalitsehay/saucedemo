import { chromium, expect } from "@playwright/test"
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, `envfiles/.env.${process.env.testenv}`)
});
export default async function globalSetup() {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
     
    const baseURL = process.env.BASE_URL
    if (!baseURL) {
        throw new Error("BASE_URL is not defined in the environment variables.");
    }   
    await page.goto(baseURL, {timeout: 60000, waitUntil: 'networkidle'})
    await page.locator("#user-name").fill("standard_user")
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click() 
    await page.context().storageState({ path: "./playwright/.auth/auth.json" })
    await browser.close()
}


import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.USERNAME!;
const PASSWORD = process.env.PASSWORD!;

test.beforeEach(async ({ page }) => {
  await page.goto('https://saucedemo.com/');
});

test('has title', async ({ page }) => {
  await expect(page.locator('text=Swag Labs')).toBeVisible();
});

test('login to the application and observe product page', async ({ page }) => {
  await page.fill('[data-test="username"]', USERNAME);
  await page.fill('[data-test="password"]', PASSWORD);
  await page.click('[data-test="login-button"]');

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  await expect(page.locator('.inventory_list')).toBeVisible();
  await expect(page.locator('.inventory_item')).toHaveCount(5);
});

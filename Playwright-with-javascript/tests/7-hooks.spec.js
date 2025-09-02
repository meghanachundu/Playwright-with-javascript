import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
  console.log('>>> beforeAll: Runs ONCE before all tests');
});

test.afterAll(async () => {
  console.log('>>> afterAll: Runs ONCE after all tests');
});

test.beforeEach(async ({ page }) => {
  console.log('>>> beforeEach: Runs BEFORE every test');
  await page.goto('https://the-internet.herokuapp.com/login');
});

test.afterEach(async () => {
  console.log('>>> afterEach: Runs AFTER every test');
});

test('Valid Login', async ({ page }) => {
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');

  await expect(page.locator('h2')).toHaveText('Secure Area');
});

test('Invalid Login', async ({ page }) => {
  await page.fill('#username', 'wrongUser');
  await page.fill('#password', 'wrongPass');
  await page.click('button[type="submit"]');

  await expect(page.locator('.flash')).toContainText('Your username is invalid!');
});
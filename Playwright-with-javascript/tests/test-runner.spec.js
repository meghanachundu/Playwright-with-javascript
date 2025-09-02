import { test, expect } from '@playwright/test';

test.describe('Playwright Test Runner', () => {

  test('should open homepage and check title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('should find Get Started link using different locators', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Locator by role
    const link1 = page.getByRole('link', { name: 'Get started' });
    await expect(link1).toBeVisible();

    // Locator by text
    const link2 = page.getByText('Get started');
    await expect(link2).toBeVisible();

    // Locator by CSS
    const link3 = page.locator('a:has-text("Get started")');
    await expect(link3).toBeVisible();

    // Click and verify navigation
    await link1.click();
    await expect(page).toHaveURL(/.*docs/);
  });

  test.beforeEach(async ({ page }) => {
    console.log('Running a fresh test...');
  });

  test.afterEach(async () => {
    console.log('Test finished');
  });
});

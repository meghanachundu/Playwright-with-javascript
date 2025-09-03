import { test, expect } from '@playwright/test';

test('capture screenshot on failure', async ({ page }) => {
  await page.goto('/login');

  await page.fill('#username', 'wrongUser');
  await page.fill('#password', 'wrongPass');
  await page.click('button[type="submit"]');

  // This assertion will fail, screenshot is captured automatically if configured
  await expect(page.locator('h2')).toHaveText('Secure Area');
});

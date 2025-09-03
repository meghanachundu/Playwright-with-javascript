import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('valid login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate('/login');
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  await expect(page.locator('h2')).toHaveText('Secure Area');
});

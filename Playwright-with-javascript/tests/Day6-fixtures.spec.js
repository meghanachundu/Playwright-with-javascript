import { test as base, expect } from "@playwright/test";

// Extend the base test with custom fixture
const test = base.extend({
  // Example: provide user data as a fixture
  user: async ({}, use) => {
    const testUser = { username: "playwrightUser", password: "Password123" };
    await use(testUser);
  },
});

test.describe("Fixtures & Data Management", () => {
    test('use custom fixture data', async ({ page, user }) => {
      await page.goto('https://the-internet.herokuapp.com/login');

      await page.fill('#username', user.username);
      await page.fill('#password', user.password);
      await page.click('button[type="submit"]');

      await expect(page.locator('.flash')).toContainText('Your username is invalid!');
    });

  //  Data-driven example
  const loginData = [
    { username: 'tomsmith', password: 'SuperSecretPassword!', expected: 'success' }, // valid
    { username: 'wrongUser', password: 'wrongPass', expected: 'failure' },           // invalid
    { username: 'admin', password: 'wrongPass', expected: 'failure' },               // invalid
    { username: 'user', password: '123', expected: 'failure' }                       // invalid
  ];

  loginData.forEach(({ username, password, expected }, index) => {
    test(`login test [${index + 1}] user=${username}`, async ({ page }) => {
      await page.goto('https://the-internet.herokuapp.com/login');
      await page.fill('#username', username);
      await page.fill('#password', password);
      await page.click('button[type="submit"]');
      
      if (expected === 'success') {
        //  successful login assertion
        await expect(page.locator('h2')).toHaveText('Secure Area');
        await expect(page.locator('.flash')).toContainText('You logged into a secure area!');
      } else {
        //  failed login assertion
        await expect(page.locator('.flash')).toContainText('Your username is invalid!');
      }
    });
  });

});

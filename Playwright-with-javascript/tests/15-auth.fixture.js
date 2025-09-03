import { test as base } from '@playwright/test';
import path from 'path';

const STORAGE_STATE = path.join(__dirname, 'storageState.json');

export const test = base.extend({
  authPage: async ({ browser }, use) => {
    const context = await browser.newContext();

    // Check if storageState exists
    const fs = require('fs');
    if (fs.existsSync(STORAGE_STATE)) {
      await context.addCookies(require(STORAGE_STATE).cookies || []);
    }

    const page = await context.newPage();

    // If storageState doesn't exist, login once
    if (!fs.existsSync(STORAGE_STATE)) {
      await page.goto('/login');
      await page.fill('#username', 'tomsmith');
      await page.fill('#password', 'SuperSecretPassword!');
      await page.click('button[type="submit"]');
      await page.context().storageState({ path: STORAGE_STATE });
    }

    await use(page);
    await context.close();
  }
});

export { test };

import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('POM Example', () => {

  test('navigate using HomePage object', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.clickGetStarted();
  });

  test('search docs using HomePage object', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.searchDocs('test');
  });

});

import { test, expect } from '@playwright/test';
test('typing into search', async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const input = page.locator('#Wikipedia1_wikipedia-search-input')
    await input.fill('playwright')

    const serach = page.locator('#wikipedia-search-button')
    await serach.click();

    await expect(serach).toHaveValue('playwright')
})
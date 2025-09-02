import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.searchInput = page.locator('.DocSearch-Input');
  }

  async goto() {
    await this.page.goto('https://playwright.dev/');
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
    await expect(this.page).toHaveURL(/.*docs/);
  }

  async searchDocs(text) {
    await this.searchButton.click();                // open modal
    await this.searchInput.fill(text);              // type into real input
    await this.page.keyboard.press('Enter');
  }
}

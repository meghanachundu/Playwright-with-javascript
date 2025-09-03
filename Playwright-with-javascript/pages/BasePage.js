export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path) {
    await this.page.goto(path);
  }

  async click(locator) {
    await this.page.locator(locator).click();
  }

  async fill(locator, text) {
    await this.page.locator(locator).fill(text);
  }

  async getText(locator) {
    return await this.page.locator(locator).textContent();
  }

  async isVisible(locator) {
    return await this.page.locator(locator).isVisible();
  }
}

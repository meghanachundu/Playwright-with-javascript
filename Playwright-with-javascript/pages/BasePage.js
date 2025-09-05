export default class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(fullUrl) {
    await this.page.goto(fullUrl);
  }

  async click(locator) {
    await this.page.click(locator);
  }
}
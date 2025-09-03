import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginBtn = 'button[type="submit"]';
    this.flashMessage = '.flash';
  }

  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginBtn);
  }

  async getFlashMessage() {
    return await this.getText(this.flashMessage);
  }
}

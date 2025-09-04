import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.newTodoInput = '.new-todo';
    this.todoList = '.todo-list li';
  }

  async addTask(taskName) {
    await this.fill(this.newTodoInput, taskName);
    await this.page.keyboard.press('Enter');
  }

  async getTasks() {
    return await this.page.locator(this.todoList).allTextContents();
  }

  async deleteTask(taskName) {
    const taskLocator = this.page.locator(`.todo-list li:has-text("${taskName}")`);
    await taskLocator.hover();
    await taskLocator.locator('.destroy').click();
  }
}

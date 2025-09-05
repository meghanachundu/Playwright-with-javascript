export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.newTodoInput = '.new-todo';
    this.todoItems = '.todo-list li';
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async addTask(taskName) {
    await this.page.fill(this.newTodoInput, taskName);
    await this.page.keyboard.press('Enter');
  }

  async getTasks() {
    return await this.page.locator(this.todoItems).allTextContents();
  }

  async deleteTask(taskName) {
    const taskLocator = this.page.locator(`.todo-list li:has-text("${taskName}")`);
    await taskLocator.hover();
    await taskLocator.locator('.destroy').click();
  }
}

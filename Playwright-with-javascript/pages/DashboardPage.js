import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.addTaskInput = '#new-task';
    this.addTaskBtn = '#add-task-btn';
    this.taskList = '#task-list li';
  }

  async addTask(taskName) {
    await this.fill(this.addTaskInput, taskName);
    await this.click(this.addTaskBtn);
  }

  async getTasks() {
    return await this.page.locator(this.taskList).allTextContents();
  }
}

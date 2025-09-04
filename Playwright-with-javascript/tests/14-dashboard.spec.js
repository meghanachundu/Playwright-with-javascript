import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('TodoMVC CRUD Operations', () => {
  let dashboard;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.navigate('https://demo.playwright.dev/todomvc/');
  });

  test('Create a new task', async () => {
    await dashboard.addTask('Task 1');
    const tasks = await dashboard.getTasks();
    expect(tasks).toContain('Task 1');
  });

  test('Delete a task', async () => {
    await dashboard.addTask('Task 2');
    await dashboard.deleteTask('Task 2');
    const tasks = await dashboard.getTasks();
    expect(tasks).not.toContain('Task 2');
  });
});

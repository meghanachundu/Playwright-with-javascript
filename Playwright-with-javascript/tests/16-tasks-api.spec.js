// tests/16-tasks-api.spec.js
import { test, expect } from '@playwright/test';
import { createTaskViaAPI, deleteTaskViaAPI } from '../utils/api.helper';

test.describe('API + UI Integration', () => {
  test('Task created via API should appear in UI', async ({ page }) => {
    const taskName = 'Task From API';

    // API: create task
    await createTaskViaAPI(taskName);

    // UI: check task in dashboard
    await page.goto('https://demo.playwright.dev/todomvc');
    await expect(page.locator('.new-todo')).toBeVisible();

    // wait a bit in case sync is slow
    await page.waitForTimeout(1000);

    await expect(page.locator('.todo-list li')).toContainText(taskName);

    // cleanup
    await deleteTaskViaAPI(taskName);
  });
});

import { test, expect } from './auth.fixture.js';
import { DashboardPage } from '../pages/DashboardPage';

test('add a new task', async ({ authPage }) => {
  const dashboard = new DashboardPage(authPage);
  await dashboard.navigate('/secure'); // Dashboard URL
  await dashboard.addTask('New Task');
  
  const tasks = await dashboard.getTasks();
  expect(tasks).toContain('New Task');
});

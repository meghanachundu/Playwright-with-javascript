// utils/api.helper.js
import { expect, request } from '@playwright/test';

// Create a new task using API
export async function createTaskViaAPI(taskName) {
  const apiContext = await request.newContext();
  const response = await apiContext.post(
    'https://65f1234567.mockapi.io/api/v1/tasks',
    {
      headers: { 'Content-Type': 'application/json' },
      data: { title: taskName, completed: false, userId: 1 }
    }
  );

  console.log("CREATE status:", response.status());
  console.log("CREATE body:", await response.text());

  expect(response.ok()).toBeTruthy();
  return await response.json(); // returns created task object
}

// Delete a task using API (by title)
export async function deleteTaskViaAPI(taskName) {
  const apiContext = await request.newContext();

  // Step 1: Get all tasks
  const getResponse = await apiContext.get(
    'https://65f1234567.mockapi.io/api/v1/tasks'
  );
  expect(getResponse.ok()).toBeTruthy();
  const tasks = await getResponse.json();

  // Step 2: Find task by title
  const task = tasks.find(t => t.title === taskName);
  if (!task) {
    console.log(`Task "${taskName}" not found for deletion`);
    return null;
  }

  // Step 3: Delete by id
  const delResponse = await apiContext.delete(
    `https://65f1234567.mockapi.io/api/v1/tasks/${task.id}`
  );
  console.log("DELETE status:", delResponse.status());
  expect(delResponse.ok()).toBeTruthy();

  return delResponse;
}

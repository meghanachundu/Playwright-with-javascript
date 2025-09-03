import { test, expect } from '@playwright/test';

test('create user via API and verify in UI', async ({ page, request }) => {
  // Step 1: Create user via API
  const apiResponse = await request.post('https://jsonplaceholder.typicode.com/users', {
    data: { name: 'John Doe', username: 'johndoe' },
  });
  expect(apiResponse.status()).toBe(201);

  // Step 2: Navigate UI to verify (example purpose)
  await page.goto('https://the-internet.herokuapp.com/users'); 
  await expect(page.locator('body')).toContainText('John Doe');
});

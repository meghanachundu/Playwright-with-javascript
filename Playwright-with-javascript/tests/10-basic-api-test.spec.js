import { test, expect } from '@playwright/test';

test('GET request - validate users', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');
  
  expect(response.status()).toBe(200);
//   console.log(response)
  const users = await response.json();
  expect(users.length).toBeGreaterThan(0);
  expect(users[0]).toHaveProperty('name');
});

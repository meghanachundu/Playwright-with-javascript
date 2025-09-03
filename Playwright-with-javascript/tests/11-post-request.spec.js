import { test, expect } from '@playwright/test';

test('POST request - create a new post', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Playwright Test',
      body: 'Testing API with Playwright',
      userId: 1
    },
  });

  expect(response.status()).toBe(201); // Created
  const responseBody = await response.json();
  expect(responseBody).toMatchObject({
    title: 'Playwright Test',
    body: 'Testing API with Playwright',
    userId: 1
  });
});

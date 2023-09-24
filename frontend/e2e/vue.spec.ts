import { test, expect } from '@playwright/test';

test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  const headerText = await page.locator('div.topAppBar h1').textContent();
  expect(headerText).toBe('Magbox');

  const LoginButtonText = await page.getByRole('button').textContent();
  expect(LoginButtonText).toBe('Login');
});

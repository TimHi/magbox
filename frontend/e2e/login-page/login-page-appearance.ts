import { test, expect } from '@playwright/test';

test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  const headerText = await page.locator('div.topAppBar h1').textContent();
  expect(headerText).toBe('Magbox 📮');

  const LoginButtonText = await page.getByRole('button').textContent();
  expect(LoginButtonText).toBe('Login');
});

test('login using oauth2', async ({ page }) => {
  await page.goto('/');
  const loginButton = await page.getByTestId('login-button');
  const buttonText = await loginButton.textContent();
  expect(buttonText).toBe('Login');
  //await loginButton.click();
});

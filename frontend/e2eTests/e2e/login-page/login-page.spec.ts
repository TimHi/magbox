import { test, expect } from "../../util/e2e/fixtures";
import { loginUser } from "../../util/e2e/login";


test('Login page is rendered correctly', async ({ page }) => {
  await page.goto('/');
  const headerText = await page.locator('div.topAppBar h1').textContent();
  expect(headerText).toBe('Magbox 📮');

  const LoginButtonText = await page.getByRole('button').textContent();
  expect(LoginButtonText).toBe('Login');
});

test('User is navigated to home page after login', async ({ page }) => {
  await loginUser(page);
  await expect.poll(async () => await page.title(), { timeout: 15000 }).toBe("MagBox | Home");
});
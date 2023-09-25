import { Page, expect } from "./fixtures";

export async function loginUser(page: Page) {
    await page.goto('/');
    const loginButton = await page.getByRole('button');
    expect(await loginButton.textContent()).toBe('Login');
    await loginButton.click();
    const logOutButton = await page.getByTestId("btn-logout");
    expect(await logOutButton.textContent()).toBe('Logout');
}
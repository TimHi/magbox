import { expect } from "@playwright/test";
import { test as setup } from "./fixtures";

const authFile = "playwright/.auth/user.json";
/*
  Test Backend Superuser:
  Email test@e2e.dev
  PW: 1234567890
 */
setup("authenticate", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();
  expect(title).toBe("MagBox | Login");
  await page.getByPlaceholder("Email").fill("test@e2e.dev");
  await page.getByPlaceholder("Password").fill("1234567890");
  await page.getByRole("button", { name: "Login" }).click();

  const linkTable = page.getByTestId("link-table");
  await expect(linkTable).toBeVisible();
  await page.context().storageState({ path: authFile });
});

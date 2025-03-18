import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("localhost:1001");

  await expect(page.getByText("Magbox 📮")).toBeVisible();
});

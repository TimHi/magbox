import { expect } from "@playwright/test";
import { test } from "./fixtures";


test("links can be added through add link dialog", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("link-table")).toBeVisible();
  await page.getByText("Add New").click();
  await expect(page.getByText("Add Link")).toBeVisible();

  const linkInput = page.getByTestId("input-link");
  await linkInput.fill("https://timhi.xyz/");

  const inputTitle = page.getByTestId("input-title");
  const inputDesc = page.getByTestId("input-desc");

  const submitButton = page.getByTestId("btn-submit-link");

  await expect(submitButton).toBeVisible();
  await expect(inputTitle).toHaveValue("TimHi");
  await expect(inputDesc).toHaveValue("Website to share stuff");

  await submitButton.click();
  await expect(submitButton).not.toBeVisible();
  const link = page.getByRole("link").filter({hasText: "TimHi"});
  await expect(link).toBeVisible();

  const deleteRowButton = page.getByTestId("TimHi-delete-action-button");

  await expect(deleteRowButton).toBeVisible();
  await deleteRowButton.click();
  const dialogDeleteButton = page.getByRole("button").filter({hasText: "Delete"});
  await dialogDeleteButton.click();

  await expect(dialogDeleteButton).not.toBeVisible();
  await expect(link).not.toBeVisible();
});


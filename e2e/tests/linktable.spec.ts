import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { createNewLink, deleteLink, editLink } from './util/link';

test("links can be added through add link dialog", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("link-table")).toBeVisible();
  const expectedTitle = "TimHi";

  await createNewLink(page, "https://timhi.xyz/", expectedTitle, "Website to share stuff");
  const link = page.getByRole("link").filter({hasText: expectedTitle});
  await expect(link).toBeVisible();

  await deleteLink(page, expectedTitle);
  await expect(link).not.toBeVisible();
});

test("links can be edited through dialog", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("link-table")).toBeVisible();
  const title = "TimHi";
  const newTitle = "New Title";

  await createNewLink(page, "https://timhi.xyz/", title, "Website to share stuff");
  const link = page.getByRole("link").filter({hasText: title});
  await expect(link).toBeVisible();

  await editLink(page, title, newTitle);

  const updatedLink = page.getByRole("link").filter({hasText: newTitle});
  await expect(link).not.toBeVisible();
  await expect(updatedLink).toBeVisible();

  await deleteLink(page, newTitle);
  await expect(updatedLink).not.toBeVisible();
});
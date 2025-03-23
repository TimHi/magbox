import { expect, Locator, Page } from '@playwright/test';

export async function createNewLink(page: Page, url: string, expectedTitle: string, expectedDescription: string){
  await page.getByText("Add New").click();
  await expect(page.getByText("Add Link")).toBeVisible();

  const linkInput = page.getByTestId("input-link");
  await linkInput.fill(url);

  const inputTitle = page.getByTestId("input-title");
  const inputDesc = page.getByTestId("input-desc");

  const submitButton = page.getByTestId("btn-submit-link");

  await expect(submitButton).toBeVisible();
  await expect(inputTitle).toHaveValue(expectedTitle);
  await expect(inputDesc).toHaveValue(expectedDescription);

  await submitButton.click();
  await expect(submitButton).not.toBeVisible();
}

export async function deleteLink(page: Page, title: string){
  const deleteRowButton = page.getByTestId(`${title}-delete-action-button`);

  await expect(deleteRowButton).toBeVisible();
  await deleteRowButton.click();
  const dialogDeleteButton = page.getByRole("button").filter({hasText: "Delete"});
  await dialogDeleteButton.click();

  await expect(dialogDeleteButton).not.toBeVisible();
}

export async function editLink(page: Page, oldTitle: string, newTitle: string){
  const editButton = page.getByTestId(`${oldTitle}-edit-action-button`);
  await editButton.click();

  const saveButton = page.getByRole("button").filter({hasText: "Save"});
  await expect(saveButton).toBeVisible();

  const titleInput = page.getByTestId("input-title");
  await fillTextInput(page, titleInput, newTitle);

  await saveButton.click();
  await expect(saveButton).not.toBeVisible();
}

async function fillTextInput(page: Page, textInput: Locator, text: string){
  await textInput.clear();
  await textInput.fill(text);
  const newText = page.getByText(text, {exact: true});
  await expect(newText).toBeVisible();
}
import { test, expect } from '../../util/e2e/fixtures';
import { loginUser } from '../../util/e2e/login';
import { hasText } from '../../util/e2e/matcher';

test('Links are displayed in a grid', async ({ page }) => {
  await loginUser(page);
  await expect.poll(async () => await page.title(), { timeout: 15000 }).toBe('MagBox | Home');
  const cards = await page.getByTestId('link-card');
  expect(await cards.count()).toBe(7);
});

test('Links have a title', async ({ page }) => {
  await loginUser(page);
  await expect.poll(async () => await page.title(), { timeout: 15000 }).toBe('MagBox | Home');
  const cards = await page.getByTestId('link-card');
  for (const card of await cards.all()) {
    const cardTitle = await card.getByRole('heading').innerText();
    hasText(cardTitle);
  }
});

test.describe('Edit mode', () => {
  test('Changes in the title are saved', async ({ page }) => {
    const updatedTitle = 'Updated from Test!';
    await loginUser(page);
    await expect.poll(async () => await page.title(), { timeout: 15000 }).toBe('MagBox | Home');
    const firstCard = await page.getByTestId('link-card').nth(0);
    const editButton = await firstCard.getByTestId('btn-edit-item');
    await editButton.click();
    const titleInput = await page.getByTestId('input-title');
    await expect(titleInput).toBeVisible();
    await titleInput.clear();
    await titleInput.fill(updatedTitle);
    const saveButton = await page.getByTestId('btn-save-changes');
    await saveButton.click();
    await expect(saveButton).toBeHidden();
    const title = await firstCard.getByRole('heading').innerText();
    await expect(title).toBe(updatedTitle);
  });

  test('No changes when canceling', async ({ page }) => {
    await loginUser(page);
    await expect.poll(async () => await page.title(), { timeout: 15000 }).toBe('MagBox | Home');
    const firstCard = await page.getByTestId('link-card').nth(0);
    const oldTitle = await firstCard.getByRole('heading').innerText();
    const editButton = await firstCard.getByTestId('btn-edit-item');
    await editButton.click();
    const titleInput = await page.getByTestId('input-title');
    await expect(titleInput).toBeVisible();
    await titleInput.clear();
    await titleInput.fill('Updated Title...');
    const cancelButton = await page.getByTestId('btn-cancel-edit');
    await cancelButton.click();
    await expect(cancelButton).toBeHidden();
    const title = await firstCard.getByRole('heading').innerText();
    await expect(title).toBe(oldTitle);
  });
});

test.describe('Select tags', () => {
  test('Selecting tags filters the grid', async ({ page }) => {
    const updatedTitle = 'Updated from Test!';
    await loginUser(page);
    await expect.poll(async () => await page.title(), { timeout: 15000 }).toBe('MagBox | Home');
  });
});

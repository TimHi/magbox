import { test, expect, Page } from "../../util/e2e/fixtures";
import { loginUser } from "../../util/e2e/login";

async function navigateToAddLinkPage(page: Page) {
    await loginUser(page);
    await expect.poll(async () => await page.title(), { timeout: 15000 }).toBe("MagBox | Home");
    const addLinkButton = await page.getByTestId("btn-add-link");
    await addLinkButton.click();
    const headerText = await page.locator('div.form h1').textContent();
    expect(headerText).toBe('Add new Link');
}
const githubUrl = "https://github.com/";
const githubPageTitle = "GitHub: Let’s build from here";
const githubPageDescription = "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and fea...";

test('Navigation to add link page', async ({ page }) => {
    await navigateToAddLinkPage(page);
});

test('Preview is filled for valid link', async ({ page }) => {
    await navigateToAddLinkPage(page);
    const linkField = await page.getByTestId("input-link");
    await linkField.fill(githubUrl);

    const titleField = await page.getByTestId("input-title");
    const descField = await page.getByTestId("input-desc");
    await expect(titleField).toHaveValue(githubPageTitle, { timeout: 20000 });
    await expect(descField).toHaveValue(githubPageDescription, { timeout: 20000 });
});

test('Preview is not filled for invalid links', async ({ page }) => {
    await navigateToAddLinkPage(page);
    const linkField = await page.getByTestId("input-link");
    await linkField.fill("Not a link");
    const titleField = await page.getByTestId("input-title");
    const descField = await page.getByTestId("input-desc");
    await expect(titleField).toHaveValue('', { timeout: 20000 });
    await expect(descField).toHaveValue('', { timeout: 20000 });
});

test('Submit button is only displayed for valid links', async ({ page }) => {
    await navigateToAddLinkPage(page);
    const linkField = await page.getByTestId("input-link");
    await linkField.fill("Not a link");
    const submitButton = await page.getByTestId('btn-submit-link');
    await expect(submitButton).toBeHidden();
    await linkField.fill(githubUrl);
    const titleField = await page.getByTestId("input-title");
    const descField = await page.getByTestId("input-desc");
    await expect(titleField).toHaveValue(githubPageTitle, { timeout: 20000 });
    await expect(descField).toHaveValue(githubPageDescription, { timeout: 20000 });
    await expect(submitButton).toBeVisible({ timeout: 20000 });
});


test('Added links are added to the grid', async ({ page }) => {
    await loginUser(page);
    let cards = await page.getByTestId("link-card");
    expect(await cards.count()).toBe(7);
    const addLinkButton = await page.getByTestId("btn-add-link");
    await addLinkButton.click();
    const linkField = await page.getByTestId("input-link");
    await linkField.fill(githubUrl);
    const submitButton = await page.getByTestId('btn-submit-link');
    await expect(submitButton).toBeVisible();
    await linkField.fill(githubUrl);
    await submitButton.click();
    await expect(page.getByTestId("btn-add-link")).toBeVisible();
    cards = await page.getByTestId("link-card");
    expect(await cards.count()).toBe(8);
});

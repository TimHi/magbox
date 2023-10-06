import { test, expect, Page } from "../../util/e2e/fixtures";
import { loginUser } from "../../util/e2e/login";
import PrefilledTags from "../../util/MockData/prefilledTags.json";

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

test.describe("Tags", () => {
    test('tags are added', async ({ page }) => {
        await navigateToAddLinkPage(page);
        const linkField = await page.getByTestId("input-link");
        await linkField.fill(githubUrl);
        const tagBtn = await page.getByTestId("btn-new-tag");
        const tagField = await page.getByTestId("input-tag");
        const pickedTagList = await page.getByTestId("li-picked-tags");
        const pickedTags = await pickedTagList.locator(".tag");
        await expect(await pickedTags.count()).toBe(0);
        await tagBtn.click();
        await expect(tagField).toBeVisible();
        await tagField.fill('C#');
        await page.keyboard.press("Enter");
        await expect(pickedTags).toBeVisible();
        await expect(await pickedTags.count()).toBe(1);
        const submitBtn = await page.getByTestId("btn-submit-link");
        await expect(submitBtn).toBeVisible();
    });

    test('duplicate tags are handled', async ({ page }) => {
        await navigateToAddLinkPage(page);
        const pickedTagList = await page.getByTestId("li-picked-tags");
        const pickedTags = await pickedTagList.locator(".tag");
        const tagField = await page.getByTestId("input-tag");
        await expect(await pickedTags.count()).toBe(0);
        const tagBtn = await page.getByTestId("btn-new-tag");
        await tagBtn.click();
        await tagField.fill('C#');
        await page.keyboard.press("Enter");
        await expect(pickedTags).toBeVisible();
        await expect(await pickedTags.count()).toBe(1);
        await tagBtn.click();
        await expect(pickedTags).toBeVisible();
        await tagField.fill('C#');
        await page.keyboard.press("Enter");
        await expect(await pickedTags.count()).toBe(1);
    });
});

test.describe("Existing Tags", () => {
    test.beforeEach(async ({ page }) => {
        await page.route(
            '*/**/api/collections/categories/records?page=1&perPage=500&skipTotal=1',
            async (route) => {
                await route.fulfill({ body: JSON.stringify(PrefilledTags), contentType: 'application/json' });
            }
        );
    });
    test('existing tags are rendered', async ({ page }) => {
        await navigateToAddLinkPage(page);
        const availableTags = await page.getByTestId("li-tags");
        const tags = await availableTags.locator(".tag");
        await expect(await tags.count()).toBe(3);
    });
})

test.describe('preview is filled', () => {
    test('for valid link', async ({ page }) => {
        await navigateToAddLinkPage(page);
        const linkField = await page.getByTestId("input-link");
        await linkField.fill(githubUrl);

        const titleField = await page.getByTestId("input-title");
        const descField = await page.getByTestId("input-desc");
        await expect(titleField).toHaveValue(githubPageTitle, { timeout: 20000 });
        await expect(descField).toHaveValue(githubPageDescription, { timeout: 20000 });
    });

    test('not filled for invalid links', async ({ page }) => {
        await navigateToAddLinkPage(page);
        const linkField = await page.getByTestId("input-link");
        await linkField.fill("Not a link");
        const titleField = await page.getByTestId("input-title");
        const descField = await page.getByTestId("input-desc");
        await expect(titleField).toHaveValue('', { timeout: 20000 });
        await expect(descField).toHaveValue('', { timeout: 20000 });
    });
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

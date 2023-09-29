import { test, expect } from "../../util/e2e/fixtures";
import { loginUser } from "../../util/e2e/login";
import { hasText } from "../../util/e2e/matcher";

test('Links are displayed in a grid', async ({ page }) => {
    await loginUser(page);
    await expect.poll(async () => await page.title(), { timeout: 15000 }).toBe("MagBox | Home");
    const cards = await page.getByTestId("link-card");
    expect(await cards.count()).toBe(7);
});

test('Links have a title', async ({ page }) => {
    await loginUser(page);
    await expect.poll(async () => await page.title(), { timeout: 15000 }).toBe("MagBox | Home");
    const cards = await page.getByTestId("link-card");
    for (const card of await cards.all()) {
        const cardTitle = await card.getByRole('heading').innerText();
        hasText(cardTitle);
    }
});


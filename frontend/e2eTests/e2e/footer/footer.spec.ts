import { test } from "../../util/e2e/fixtures";
import { hasText } from "../../util/e2e/matcher";

test('Login page is rendered correctly', async ({ page }) => {
    await page.goto('/');
    const versionNumber = await page.getByTestId("lbl-version-number");
    hasText(versionNumber);
});
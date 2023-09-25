/* eslint-disable @typescript-eslint/no-restricted-imports */
import { test as base, expect } from "@playwright/test";
export * from "@playwright/test";
import logindata from "../MockData/login.json"


base.beforeEach(async ({ page }) => {

    await page.route('*/**/api/collections/users/auth-methods', async (route) => {
        await route.fulfill({ body: JSON.stringify(logindata), contentType: 'application/json' });
    });
});

export const test = base.extend({
    page: async ({ page }, use) => {
        const messages: any[] = [];
        page.on("console", (msg) => {
            if (msg.type() === "error")
                messages.push(
                    `\n/**************************************/\n       Browser console error #${messages.length + 1
                    }:\n/**************************************/\n${msg.text()}`
                );
        });
        await use(page);
        expect(messages).toStrictEqual([]);
    }
});
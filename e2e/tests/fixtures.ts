import { ConsoleMessage, expect, Page, test as base } from "@playwright/test";

export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    const errorMessages: ConsoleMessage[] = [];

    page.on("console", (msg: ConsoleMessage) => {
      if (msg.type() === "error") {
        console.log(msg.text());
        errorMessages.push(msg);
      }
    });
    await use(page);
    expect(errorMessages.length).toBe(0);
  },
});

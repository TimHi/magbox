/* eslint-disable @typescript-eslint/no-restricted-imports */
import { test as base, expect } from '@playwright/test';
export * from '@playwright/test';
import logindata from '../MockData/login.json';
import linkData from '../MockData/linkData.json';
import postNewLink from '../MockData/postNewLink.json';
import githubPreviewData from '../MockData/githubPreview.json';
import postTag from '../MockData/addNewTagData.json';
import emptyTags from "../MockData/emptyTags.json";

base.beforeEach(async ({ page }) => {

  await page.route('*/**/api/collections/users/auth-methods', async (route) => {
    await route.fulfill({ body: JSON.stringify(logindata), contentType: 'application/json' });
  });
  await page.route(
    '*/**/api/collections/links/records?page=1&perPage=500&skipTotal=1',
    async (route) => {
      await route.fulfill({ body: JSON.stringify(linkData), contentType: 'application/json' });
    }
  );

  await page.route(
    '*/**/api/url_preview/https://github.com/',
    async (route) => {
      await route.fulfill({ body: JSON.stringify(githubPreviewData), contentType: 'application/json' });
    }
  );

  await page.route(
    '*/**/api/collections/links/records',
    async (route) => {
      await route.fulfill({ body: JSON.stringify(postNewLink), contentType: 'application/json' });
    }
  );

  await page.route(
    '*/**/api/collections/categories/records?page=1&perPage=500&skipTotal=1',
    async (route) => {
      await route.fulfill({ body: JSON.stringify(emptyTags), contentType: 'application/json' });
    }
  );

  await page.route(
    '*/**/api/collections/categories/records',
    async (route) => {
      console.log("abgeaalt");
      await route.fulfill({ body: JSON.stringify(postTag), contentType: 'application/json' });
    }
  );
});

export const test = base.extend({
  page: async ({ page }, use) => {
    const messages: any[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error')
        messages.push(
          `\n/**************************************/\n       Browser console error #${messages.length + 1
          }:\n/**************************************/\n${msg.text()}`
        );
    });
    await use(page);
    expect(messages).toStrictEqual([]);
  }
});

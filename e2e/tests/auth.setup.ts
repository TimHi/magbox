import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";
/*
  Test Backend Superuser:
  Email test@e2e.dev
  PW: 1234567890
 */
setup("authenticate", async ({ request }) => {
  // Send authentication request. Replace with your own.
  await request.post("localhost:9000", {
    form: {
      user: "user",
      password: "password",
    },
  });
  await request.storageState({ path: authFile });
});

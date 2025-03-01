<script setup lang="ts">
import { PocketBaseService } from '../service/pocketBaseService';
import { useUserStore } from '../stores/user';
const user = useUserStore();
const pb = new PocketBaseService();

function login() {
  if (user.user.isLoggedIn) {
    pb.Logout();
  } else {
    try {
      pb.SignInUsingOAuth2().catch(() => console.error('Login Error'));
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<template>
  <TopAppBar />
  <div class="descBox">
    <div>
      <h2>Keep track of stuff you want to read later 📔✍️</h2>
      <h2>Sort, categorize and filter (WIP)📑</h2>
      <h2>Export to Obsidian (WIP) 📤💎</h2>
      <h2>Send links directly to your using the browser extension (WIP) 📬</h2>
    </div>
    <div>
      <Button data-testid="login-button" severity="primary" label="Login" @click="login"></Button>
    </div>
  </div>
</template>

<style>
.descBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mag {
  color: var(--color-magbox-blue);
}
</style>

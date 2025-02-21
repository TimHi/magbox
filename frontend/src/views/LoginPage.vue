<script setup lang="ts">
import TopAppBar from '../components/TopAppBar.vue';
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
    <PCard>
      <template #title>Why choose MagBox?</template>
      <template #content>
        <h2>Keep track of stuff you want to read later 📔✍️</h2>
        <h2>Sort, categorize and filter (WIP)📑</h2>
        <h2>Export to Obsidian (WIP) 📤💎</h2>
        <h2>Send links directly to your using the browser extension (WIP) 📬</h2>
      </template>
    </PCard>
    <div>
      <PButton
        v-if="!user.user.isLoggedIn"
        data-testid="login-button"
        @click="login"
        severity="primary"
        label="Login"
      />
    </div>
  </div>
</template>

<style>
.descBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<script setup lang="ts">
import { PocketBaseService } from '../service/pocketBaseService';
import { useUserStore } from '../stores/user';
import { ref } from 'vue';
const pb = new PocketBaseService();
const user = useUserStore();

const isAuthenticated = ref(user.user.isLoggedIn);

async function login() {
  if (user.user.isLoggedIn) {
    await pb.Logout();
  } else {
    try {
      await pb.SignInUsingOAuth2();
      console.log('sign in done');
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<template>
  <div class="topAppBar">
    <div>
      <h1>Magbox 📮</h1>
    </div>
    <div v-if="isAuthenticated">
      <Button
        data-testid="btn-logout"
        severity="primary"
        @click="login"
        label="Logout"
      />
    </div>
  </div>
</template>

<style scoped>
.topAppBar {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 12px;
}
</style>

<script setup lang="ts">
import router from '../router';
import { PocketBaseService } from '../service/pocketBaseService';
import { useUserStore } from '../stores/user';
const pb = new PocketBaseService();
const user = useUserStore();

function login() {
  if (user.user.isLoggedIn) {
    pb.Logout();
  } else {
    try {
      pb.SignInUsingOAuth2()
        .then(() => router.push('/'))
        .catch(() => console.error('Login Error'));
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
    <div v-if="user.user.isLoggedIn">
      <Button data-testid="btn-logout" severity="primary" @click="login" label="Logout" />
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

<script setup lang="ts">
import { PocketBaseService } from '../service/pocketBaseService';
import { useUserStore } from '../stores/user';
import TopAppBar from '@/components/TopAppBar.vue';
import { ref } from 'vue';
const user = useUserStore();
const pb = new PocketBaseService();

const useEmail = ref(false);
const email = ref<string | undefined>(undefined);
const password = ref<string | undefined>(undefined);
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

function loginWithEmail() {}
</script>
<template>
  <div class="h-screen flex flex-col">
    <Card class="flex-1 flex flex-col justify-between p-8">
      <template #title>
        <h1>Magbox 📮</h1>
      </template>

      <template #content>
        <div class="flex flex-col items-center gap-4">
          <p class="text-2xl">Keep track of stuff you want to read later 📔✍️</p>
          <p class="text-2xl">
            Send links directly to your using the
            <a class="text-green-500" href="https://github.com/TimHi/magbox/releases/tag/ff-ext"
              >Firefox extension</a
            >
            📬
          </p>
          <p class="text-2xl">Sort, categorize and filter (WIP)📑</p>
          <p class="text-2xl">Export to Obsidian (WIP) 📤💎</p>
        </div>
      </template>

      <template #footer>
        <div class="flex flex-col items-center">
          <p class="text-xl">Start exploring using</p>
          <div class="flex flex-row gap-4">
            <Button
              icon="pi pi-discord"
              data-testid="login-button"
              severity="primary"
              @click="login"
            ></Button>
            <Button
              icon="pi pi-envelope"
              data-testid="login-email-button"
              severity="primary"
              @click="() => (useEmail = true)"
            ></Button>
          </div>
        </div>
        <div v-if="useEmail" class="flex flex-col gap-2 items-center pt-4">
          <InputText v-model="email" size="small" placeholder="Email" class="w-92" />
          <InputText
            v-model="password"
            type="password"
            size="small"
            placeholder="Password"
            class="w-92"
          />
          <Button @click="loginWithEmail" label="Login" class="w-92"></Button>
        </div>
      </template>
    </Card>
  </div>
</template>

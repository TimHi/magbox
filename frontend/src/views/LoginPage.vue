<script setup lang="ts">
import { PocketBaseService } from '../service/pocketBaseService';
import { useUserStore } from '../stores/user';
import { ref } from 'vue';
import router from '@/router';
const user = useUserStore();
const pb = new PocketBaseService();

const useEmail = ref(import.meta.env.MODE !== 'production');
const email = ref<string | undefined>(undefined);
const password = ref<string | undefined>(undefined);

async function login() {
  if (user.user.isLoggedIn) {
    await pb.Logout();
    await router.replace('/login');
  } else {
    try {
      const success = await pb.SignInUsingOAuth2();
      if (success) {
        await router.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  }
}

async function loginWithEmail() {
  if (email.value !== undefined && password.value !== undefined) {
    const success = await pb.SignInUsingEmail(email.value, password.value);
    if (success) {
      await router.push('/');
    }
  }
}
</script>
<template>
  <div class="h-screen flex flex-col">
    <Card class="flex-1 flex flex-col justify-between p-8">
      <template #title>
        <h1>Magbox 📮</h1>
      </template>

      <template #content>
        <div class="flex flex-col items-center gap-4">
          <p class="text-2xl">
            Keep track of stuff you want to read later 📔✍️
          </p>
          <p class="text-2xl">
            Send links directly to your using the
            <a
              class="text-green-500"
              href="https://github.com/TimHi/magbox/releases/tag/ff-ext"
            >Firefox extension</a>
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
              @click="async () => login()"
            />
          </div>
        </div>
        <div v-if="useEmail" class="flex flex-col gap-2 items-center pt-4">
          <InputText
            v-model="email"
            size="small"
            placeholder="Email"
            class="w-92"
          />
          <InputText
            v-model="password"
            type="password"
            size="small"
            placeholder="Password"
            class="w-92"
          />
          <Button
            @click="async () => await loginWithEmail()"
            label="Login"
            class="w-92"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

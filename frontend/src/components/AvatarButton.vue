<script setup lang="ts">
import type { UserModel } from '@/model/userModel';
import { PocketBaseService } from '@/service/pocketBaseService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const op = ref();
const pb = new PocketBaseService();
const router = useRouter();

const props = defineProps<{
  user: UserModel;
}>();

const toggle = (event: any) => {
  op.value.toggle(event);
};

function login() {
  if (props.user.isLoggedIn) {
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
  <Avatar
    icon="pi pi-user"
    class="mr-2"
    size="normal"
    style="background-color: #ece9fc; color: #2a1261"
    @click="toggle"
  />
  <Popover ref="op" class="min-w-48">
    <div class="flex flex-col">
      <div class="flex flex-col">
        <p class="text-m">User</p>
        <p class="font-light text-sm">{{ user.username }}</p>
        <p class="text-m">E-Mail</p>
        <div class="flex flex-row gap-2 items-center">
          <span class="icon-[solar--letter-broken]"></span>
          <p class="font-light text-sm">{{ user.email }}</p>
        </div>
      </div>
      <Divider />
      <Button
        :fluid="false"
        size="small"
        severity="danger"
        label="Logout"
        data-testid="btn-logout"
        @click="login"
      ></Button>
    </div>
  </Popover>
</template>

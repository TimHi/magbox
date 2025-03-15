<script setup lang="ts">
import type { UserModel } from '@/model/userModel';
import { PocketBaseService } from '@/service/pocketBaseService';
import { ref } from 'vue';

const op = ref();
const pb = new PocketBaseService();

defineProps<{
  user: UserModel;
}>();

const token = ref<string | undefined>();

const toggle = (event: any) => {
  op.value.toggle(event);
};
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
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <p class="text-m">User</p>
        <p class="font-light text-sm">{{ user.username }}</p>
        <p class="text-m">E-Mail</p>
        <div class="flex flex-row gap-2 items-center">
          <span class="icon-[solar--letter-broken]"></span>
          <p class="font-light text-sm">{{ user.email }}</p>
        </div>
      </div>

      <InputText type="password" v-model="token" size="small" />
      <Button
        :fluid="false"
        size="small"
        severity="secondary"
        label="Set Secret Token"
        :disabled="token === undefined || token === ''"
        @click="
          async () => {
            if (token !== undefined) {
              await pb.setToken(token);
            }
          }
        "
      />
      <Button
        :fluid="false"
        size="small"
        severity="danger"
        label="Logout"
        data-testid="btn-logout"
        @click="pb.Logout"
      />
    </div>
  </Popover>
</template>

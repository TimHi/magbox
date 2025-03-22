<script setup lang="ts">
import FooterBar from './components/FooterBar.vue';
import { onMounted, ref, watch } from 'vue';
import { useUserStore } from './stores/user';
import { type UserModel } from './model/userModel';

import { useLinkStore } from './stores/links';
import { useTagStore } from './stores/tags';

const userStore = useUserStore();
const linkStore = useLinkStore();
const tagStore = useTagStore();
const user = ref<UserModel | undefined>(undefined);

onMounted(async () => {
  user.value = await userStore.getUserDetails();
  await linkStore.fetchAllLinks();
  await tagStore.getAllTags();
});

watch(user, async (newUser) => {
  user.value = newUser;
});
</script>

<template>
  <div>
    <div>
      <DynamicDialog />
      <RouterView />
    </div>

    <div id="footer">
      <FooterBar />
    </div>
  </div>
</template>

<style scoped></style>

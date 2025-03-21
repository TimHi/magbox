<script setup lang="ts">
import { useRouter } from 'vue-router';
import FooterBar from './components/FooterBar.vue';
import { onMounted, ref, watch } from 'vue';
import { useUserStore } from './stores/user';
import { type UserModel } from './model/userModel';
import { useDialog } from 'primevue';
import AddLinkForm from './components/AddLinkForm.vue';
import { useLinkStore } from './stores/links';
import { useTagStore } from './stores/tags';
import AvatarButton from '@/components/AvatarButton.vue';

const router = useRouter();

const userStore = useUserStore();
const linkStore = useLinkStore();
const tagStore = useTagStore();
const user = ref<UserModel | undefined>(undefined);
const dialog = useDialog();
onMounted(async () => {
  user.value = await userStore.getUserDetails();
  await linkStore.fetchAllLinks();
  await tagStore.getAllTags();
});

watch(user, async (newUser, _) => {
  console.log(newUser);
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

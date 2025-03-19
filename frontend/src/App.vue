<script setup lang="ts">
import { useRouter } from 'vue-router';
import FooterBar from './components/FooterBar.vue';
import { onMounted, ref } from 'vue';
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
const user = ref<UserModel | undefined>(userStore.user);
const dialog = useDialog();
onMounted(async () => {
  const userV = await userStore.getUserDetails();
  user.value = userV;
  await linkStore.fetchAllLinks();
  await tagStore.getAllTags();
});

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/');
    }
  },
  {
    label: `Box`,
    icon: 'pi pi-star',
    command: () => {
      router.push('/box');
    }
  },
  {
    label: 'Add New',
    'data-testid': 'btn-add-link',
    icon: 'pi pi-plus',
    command: () => {
      dialog.open(AddLinkForm, {
        props: {
          header: 'Add Link',
          style: {
            width: '50vw'
          },
          breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
          },
          modal: true
        }
      });
    }
  }
]);
</script>

<template>
  <div>
    <Menubar v-if="user?.isLoggedIn" :model="items">
      <template #end> <AvatarButton :user="user" /> </template
    ></Menubar>
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

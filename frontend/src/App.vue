<script setup lang="ts">
import { useRouter } from 'vue-router';
import FooterBar from './components/FooterBar.vue';
import { onMounted, ref } from 'vue';
import { useUserStore } from './stores/user';
import { type UserModel } from './model/userModel';
import { useDialog } from 'primevue';
import AddLinkForm from './components/AddLinkForm.vue';
const router = useRouter();

const userStore = useUserStore();
const user = ref<UserModel | undefined>(userStore.user);
const dialog = useDialog();
onMounted(async () => {
  const userV = await userStore.getUserDetails();
  user.value = userV;
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
    label: 'Box',
    icon: 'pi pi-star',
    command: () => {
      router.push('/box');
    }
  },
  {
    label: 'Add New',
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
    <div class="content">
      <DynamicDialog />
      <RouterView />
    </div>

    <div id="footer">
      <FooterBar class="margins" />
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
}

.margins {
  margin-left: 100px;
  margin-bottom: 4px;
}

.footer {
  display: flex;
  position: relative;
  margin-top: auto;
}
</style>

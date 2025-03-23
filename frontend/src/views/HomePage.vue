<script setup lang="ts">
import LinkDataGrid from '../components/LinkDataGrid.vue';
import AvatarButton from '@/components/AvatarButton.vue';
import { ref } from 'vue';
import AddLinkForm from '@/components/AddLinkForm.vue';
import router from '@/router';
import { useDialog } from 'primevue';
const dialog = useDialog();
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/');
    },
  },
  {
    label: `Box`,
    icon: 'pi pi-star',
    command: () => {
      router.push('/box');
    },
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
            width: '50vw',
          },
          breakpoints: {
            '960px': '75vw',
            '640px': '90vw',
          },
          modal: true,
        },
      });
    },
  },
]);
</script>
<template>
  <div>
    <Menubar :model="items">
      <template #end>
        <AvatarButton />
      </template>
    </Menubar>
    <LinkDataGrid />
  </div>
</template>

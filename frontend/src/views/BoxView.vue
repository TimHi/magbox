<script setup lang="ts">
import LinkCard from '@/components/LinkCard.vue';
import type { TagModel } from '@/model/TagModel';
import { useLinkStore } from '@/stores/links';
import { useTagStore } from '@/stores/tags';

import { onMounted, computed, ref } from 'vue';
import AvatarButton from '@/components/AvatarButton.vue';
import AddLinkForm from '@/components/AddLinkForm.vue';
import { useDialog } from 'primevue';
import { useRouter } from 'vue-router';

const tagStore = useTagStore();
const linkStore = useLinkStore();
const tagsInStore = ref<Array<TagModel>>([]);

const unsortedLinks = computed(() => linkStore.GetUnsortedLinks);

onMounted(async () => {
  tagsInStore.value = await tagStore.getAllTags();
});
const dialog = useDialog();
const r = useRouter();

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      r.push('/');
    }
  },
  {
    label: `Box`,
    icon: 'pi pi-star',
    command: () => {
      r.push('/box');
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
  <Menubar :model="items">
    <template #end> <AvatarButton /> </template
  ></Menubar>
  <div class="m-4">
    <div class="pb-2">
      <p class="font-light">Sort your links</p>
    </div>
    <div v-if="unsortedLinks.length === 0">
      <p class="text-xl">No unboxed links. Youre good to go!</p>
    </div>
    <div v-else class="flex flex-wrap gap-2">
      <div v-for="link in unsortedLinks" :key="link.id">
        <LinkCard :link="link" :key="link.id" :tags="tagsInStore" />
      </div>
    </div>
  </div>
</template>

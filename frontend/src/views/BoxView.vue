<script setup lang="ts">
import LinkCard from '@/components/LinkCard.vue';
import type { TagModel } from '@/model/TagModel';
import { useLinkStore } from '@/stores/links';
import { useTagStore } from '@/stores/tags';

import { onMounted, computed, ref } from 'vue';

const tagStore = useTagStore();
const linkStore = useLinkStore();
const tagsInStore = ref<Array<TagModel>>([]);

const unsortedLinks = computed(() => linkStore.GetUnsortedLinks);

onMounted(async () => {
  tagsInStore.value = await tagStore.getAllTags();
});
</script>

<template>
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

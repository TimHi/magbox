<script setup lang="ts">
import LinkCard from '@/components/LinkCard.vue';
import type { LinkModel } from '@/model/linkModel';
import { useLinkStore } from '@/stores/links';

import { onMounted, ref } from 'vue';
const linkStore = useLinkStore();
const unsortedLinks = ref<LinkModel[]>([]);

onMounted(async () => {
  unsortedLinks.value = await linkStore.getUnsortedLinks();
});
</script>
<template>
  <h1 class="text-bold">Your Boxd Links</h1>
  <p>Sort the stuff</p>
  <div class="flex flex-wrap gap-2">
    <div v-for="link in unsortedLinks" :key="link.id">
      <LinkCard :link="link" :key="link.id" />
    </div>
  </div>
</template>

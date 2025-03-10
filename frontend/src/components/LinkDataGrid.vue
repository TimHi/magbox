<script lang="ts" setup>
import { computed, ref } from 'vue';
import LinkTable from './LinkTable.vue';
import { useTagStore } from '../stores/tags';
import { useLinkStore } from '@/stores/links';

const linkStore = useLinkStore();
const tagStore = useTagStore();

const selectedTag = ref<string[]>([]);
const links = computed(() => linkStore.links);
const tags = computed(() => tagStore.tags);
const showAll = ref(false);

const filteredLinks = computed(() => {
  if (!showAll.value) {
    const unreadLinks = links.value.filter((link) => !link.read);
    if (selectedTag.value?.length === 0) return unreadLinks;
    else
      return unreadLinks.filter((link) =>
        link.categorie.some((categorieFK) => selectedTag.value?.includes(categorieFK))
      );
  } else {
    if (selectedTag.value?.length === 0) return links.value;
    else
      return links.value.filter((link) =>
        link.categorie.some((categorieFK) => selectedTag.value?.includes(categorieFK))
      );
  }
});
</script>

<template>
  <div class="m-4">
    <div class="pb-2">
      <p class="font-light">These are your collected links. Try filtering them and stuff.</p>
    </div>
    <div class="flex flex-row gap-2 pb-2">
      <MultiSelect
        v-model="selectedTag"
        :options="tags"
        optionLabel="name"
        optionValue="id"
        placeholder="Select Tags"
        class="w-full md:w-80"
      />

      <div class="flex flex-col justify-center">
        <div v-if="showAll">
          <p class="font-thin">Hide read</p>
        </div>
        <div v-else>
          <p class="font-thin">Show all</p>
        </div>

        <ToggleSwitch v-model="showAll" />
      </div>
    </div>
    <LinkTable :links="filteredLinks" />
  </div>
</template>

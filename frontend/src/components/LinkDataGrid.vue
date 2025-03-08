<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import type { LinkModel } from '../model/linkModel';
import type { TagModel } from '../model/TagModel';
import LinkTable from './LinkTable.vue';
import { useLinkStore } from '../stores/links';
import { useTagStore } from '../stores/tags';

const linkStore = useLinkStore();
const tagStore = useTagStore();

const useReadFilter = ref('Hide read links');
let linksInStore = ref<Array<LinkModel>>([]);
let tagsInStore = ref<Array<TagModel>>([]);
let selectedTag = ref<string[]>([]);
const showAll = ref(false);
onMounted(async () => {
  linksInStore.value = await linkStore.getAllLinks();
  tagsInStore.value = await tagStore.getAllTags();
});

const filteredLinks = computed(() => {
  if (!showAll.value) {
    console.log('Filter');
    const unreadLinks = linksInStore.value.filter((link) => !link.read);
    if (selectedTag.value?.length === 0) return unreadLinks;
    else
      return unreadLinks.filter((link) =>
        link.categorie.some((categorieFK) => selectedTag.value?.includes(categorieFK))
      );
  } else {
    if (selectedTag.value?.length === 0) return linksInStore.value;
    else
      return linksInStore.value.filter((link) =>
        link.categorie.some((categorieFK) => selectedTag.value?.includes(categorieFK))
      );
  }
});
</script>

<template>
  <div class="m-4">
    <div class="pb-2">
      <p>These are your collected links. Try filtering them and stuff.</p>
    </div>
    <div class="flex flex-row gap-2 pb-2">
      <MultiSelect
        v-model="selectedTag"
        :options="tagsInStore"
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

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

onMounted(async () => {
  linksInStore.value = await linkStore.getAllLinks();
  tagsInStore.value = await tagStore.getAllTags();
});

const filteredLinks = computed(() => {
  if (useReadFilter.value === 'Hide read links') {
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
  <div>
    <el-select
      id="categoryfilter"
      v-model="selectedTag"
      multiple
      placeholder="Select"
      style="width: 200px"
      size="large"
    >
      <el-option v-for="item in tagsInStore" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <el-radio-group v-model="useReadFilter" size="large">
      <el-radio-button value="Show all links">Show all links</el-radio-button>
      <el-radio-button value="Hide read links">Hide read links</el-radio-button>
    </el-radio-group>
  </div>
  <LinkTable :links="filteredLinks" />
</template>

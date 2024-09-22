<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { LinkModel } from '../model/linkModel';
import type { TagModel } from '../model/TagModel';
import LinkDataCard from './LinkDataCard.vue';
import { useLinkStore } from '../stores/links';
import { useTagStore } from '../stores/tags';

const linkStore = useLinkStore();
const tagStore = useTagStore();

const useReadFilter = ref('Hide read links');
let linksInStore = ref<Array<LinkModel>>(linkStore.getAllLinks);
let tagsInStore = ref<Array<TagModel>>(tagStore.getAllTags);
let selectedTag = ref<string[]>();

tagStore.$subscribe((_, state) => {
  tagsInStore.value = state.tags;
});

linkStore.$subscribe((_, state) => {
  linksInStore.value = state.links;
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
  <div class="filterContainer">
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
    <el-radio-group v-model="useReadFilter" size="large" style="margin: 4px">
      <el-radio-button label="Show all links" />
      <el-radio-button label="Hide read links" />
    </el-radio-group>
  </div>
  <div class="container">
    <div v-for="link in filteredLinks" :key="link.id">
      <LinkDataCard :linkModel="link" />
    </div>
  </div>
</template>
<style>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.filterContainer {
  display: flex;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 6px;
}
</style>

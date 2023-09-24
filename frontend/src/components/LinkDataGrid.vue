<script lang="ts" setup >
import { computed, ref } from 'vue';
import type { LinkModel } from '../model/linkModel';
import LinkDataCard from './LinkDataCard.vue';
import { useLinkStore } from '../stores/links';
const linkStore = useLinkStore();
const useReadFilter = ref("Hide read links");
let linksInStore = ref<Array<LinkModel>>(linkStore.getAllLinks);

linkStore.$subscribe((_, state) => {
    linksInStore.value = state.links;
    console.log("Updated items");
});

const filteredLinks = computed(() => {
    if (useReadFilter.value === "Hide read links") {
        return linksInStore.value.filter(link => !link.read);
    } else {
        return linksInStore.value;
    }
});
</script>

<template>
    <div class="filterContainer">
        <el-radio-group v-model="useReadFilter" size="large">
            <el-radio-button label="Show all links" />
            <el-radio-button label="Hide read links" />
        </el-radio-group>
    </div>
    <div class="container">
        <div v-for="(link) in filteredLinks" :key="link.id">
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
    margin-top: 6px;
    margin-bottom: 6px;
}
</style>



<script lang="ts" setup >
import { computed, ref } from 'vue';
import type { LinkModel } from '../model/linkModel';
import LinkDataCard from './LinkDataCard.vue';
import { useLinkStore } from '../stores/links';
const linkStore = useLinkStore();
const useReadFilter = ref(false);
let linksInStore = ref<Array<LinkModel>>(linkStore.getAllLinks);

linkStore.$subscribe((_, state) => {
    linksInStore.value = state.links;
    console.log("Updated items");
});

const filteredLinks = computed(() => {
    if (useReadFilter.value) {
        return linksInStore.value.filter(link => !link.read);
    } else {
        return linksInStore.value;
    }
});
</script>

<template>
    <div>
        <span v-if="useReadFilter" class="text readSection">Show all links</span>
        <span v-else class="text readSection">Show unread only</span>
        <el-switch v-model="useReadFilter" class="ml-2 readSection"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
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
}
</style>



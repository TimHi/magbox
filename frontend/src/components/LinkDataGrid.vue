<script lang="ts" setup >
import { ref } from 'vue';
import type { LinkModel } from '../model/linkModel';
import LinkDataCard from './LinkDataCard.vue';
import { useLinkStore } from '../stores/links';
const linkStore = useLinkStore();
let linksInStore = ref<Array<LinkModel>>(linkStore.getAllLinks);
linkStore.$subscribe((_, state) => {
    linksInStore.value = state.links;
})
</script>

<template>
    <div>
        <span class="text readSection">Show unread only</span>
        <el-switch class="ml-2 readSection" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
    </div>
    <div class="container">
        <div v-for="(link) in linksInStore" :key="link.id">
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



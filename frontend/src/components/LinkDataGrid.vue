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



<script lang="ts" setup >


import { ref } from 'vue';
import { LinkModel } from '../model/linkModel';
import { useLinkStore } from '../stores/links';
import { useUserStore } from '../stores/user';
import LinkDataCard from './LinkDataCard.vue';

const linkStore = useLinkStore();
let linksInStore = ref<Array<LinkModel>>([]);
const isUserLoggedIn = useUserStore().user.isLoggedIn;
if (isUserLoggedIn) {
    linkStore.fetchLinks().then(() => {
        linksInStore.value = linkStore.links;
    });
}
console.log(useUserStore().user.isLoggedIn);
console.log(linkStore.links.length);
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

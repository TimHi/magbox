<script setup lang="ts">
import { ref } from 'vue';
import { LinkModel } from '../model/linkModel';
import { useLinkStore } from '../stores/links';
import { useTagStore } from '../stores/tags';



const linkStore = useLinkStore();

let linksInStore = ref<Array<LinkModel>>(linkStore.getAllLinks);
</script>

<template>
 <PCard>
  
 </PCard>
 
</template>

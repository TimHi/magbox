<script setup lang="ts">
import { useRouter } from 'vue-router';
import LinkDataGrid from '../components/LinkDataGrid.vue';
const router = useRouter();
</script>
<template>
  <div>
    <Button data-testid="btn-add-link" label="Add" @click="router.push('/add')" />
    <LinkDataGrid />
  </div>
</template>

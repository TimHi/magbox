<script setup lang="ts">

import { inject, type Ref } from 'vue';
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions';

export interface DeleteDialogData {
  header: string;
  description: string;
  deleteCallback: () => Promise<void>;
}

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef');
const params: DeleteDialogData = dialogRef?.value.data;
</script>

<template>
  <Card>
    <template #header>
      <p class="text-xl">{{ params.header }}</p>
    </template>
    <template #content>
      <p class="text-xl">{{ params.description }}</p>
    </template>
    <template #footer>
      <Button label="Delete" severity="danger" @click="async () => await params.deleteCallback()" />
    </template>
  </card>
</template>

<style scoped>

</style>
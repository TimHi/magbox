<script setup lang="ts">

import { inject, type Ref } from 'vue';
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions';

export interface DeleteDialogData {
  description: string;
  deleteCallback: () => Promise<void>;
}

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef');
const params: DeleteDialogData = dialogRef?.value.data;
</script>

<template>
  <div class="flex flex-col gap-8 pt-6">
    <p class="text-l">{{ params.description }}</p>
    <Button :pt="{
              root: 'max-w-24'
            }"
            label="Delete"
            severity="danger"
            @click="async () => await params.deleteCallback()"
    />
  </div>
</template>

<style scoped>

</style>
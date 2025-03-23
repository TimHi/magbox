<script setup lang="ts">

import { inject, type Ref } from 'vue';
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions';
import type { LinkModel } from '@/model/linkModel.ts';

export interface EditLinkDialogData {
  header: string;
  link: LinkModel
  saveCallback: () => Promise<LinkModel>;
}

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef');
const params: EditLinkDialogData = dialogRef?.value.data;
</script>

<template>
  <p>{{ params.header }}</p>
</template>

<style scoped>

</style>
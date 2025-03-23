<script setup lang="ts">

import { inject, ref, type Ref } from 'vue';
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions';
import type { LinkModel } from '@/model/linkModel.ts';

export interface EditLinkDialogData {
  link: LinkModel
  saveCallback: () => Promise<void>;
}

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef');
const params: EditLinkDialogData = dialogRef?.value.data;
const model = ref(params.link);

function isValidUrl(url: string) {
  return URL.canParse(url);
}
</script>

<template>
  <div class="flex flex-col gap-8 pt-6">
    <FloatLabel>
      <Textarea
        v-model="model.title"
        id="input-title"
        data-testid="input-title"
        :fluid="true"
        rows="1"
        cols="30"
        :draggable="false"
        style="resize: none"
      />
      <label for="input-title">Title</label>
    </FloatLabel>
    <FloatLabel>
      <Textarea
        v-model="model.description"
        data-testid="input-description"
        id="input-description"
        :fluid="true"
        rows="1"
        cols="30"
        :draggable="false"
        style="resize: none"
      />
      <label for="input-description">Description</label>
    </FloatLabel>
    <FloatLabel>
      <Textarea
        v-model="model.link"
        id="input-url"
        data-testid="input-url"
        :fluid="true"
        rows="1"
        cols="30"
        :draggable="false"
        style="resize: none"
      />
      <label for="input-url">URL</label>
    </FloatLabel>
    <Button
      :pt="{
        root: 'max-w-24'
      }"
      icon="pi pi-save"
      label="Save"
      :fluid="false"
      severity="primary"
      :disabled="!isValidUrl(model.link)"
      @click="async () => await params.saveCallback()"
    />
  </div>
</template>
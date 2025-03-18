<script setup lang="ts">
import type { LinkModel } from '@/model/linkModel';
import type { TagModel } from '@/model/TagModel';
import { useLinkStore } from '@/stores/links';

import { ref } from 'vue';

const props = defineProps<{
  link: LinkModel;
  tags: TagModel[];
}>();
const linkStore = useLinkStore();
const selectedTags = ref<string[]>([]);
async function onSubmitTags() {
  const newLink = { ...props.link, boxed: true, categorie: selectedTags.value };
  await linkStore.updateLink(newLink);
}
</script>
<template>
  <Card
    :pt="{
      root: 'min-w-64 min-h-32 p-2 max-w-64 justify-between'
    }"
  >
    <template #header>
      <div class="flex flex-row">
        <img
          :src="link.image"
          class="max-h-[2rem] min-h-[2rem] max-w-[2rem] min-w-[2rem] rounded-full"
        />
        <p class="flex-1 truncate pl-2 flex-grow">{{ link.title }}</p>
      </div>
    </template>
    <template #content>
      <p class="mb-2 truncate">
        {{ link.description }}
      </p>
    </template>
    <template #footer>
      <div v-if="!link.boxed" class="flex flex-col gap-2">
        <MultiSelect
          v-model="selectedTags"
          :options="tags"
          optionLabel="name"
          optionValue="id"
          filter
          placeholder="Select Tags"
          class="w-full"
        />
        <Button
          :severity="selectedTags.length === 0 ? 'secondary' : 'primary'"
          size="small"
          :label="selectedTags.length === 0 ? 'Skip' : 'Submit'"
          @click="
            async () => {
              await onSubmitTags();
            }
          "
        />
      </div>
    </template>
  </Card>
</template>

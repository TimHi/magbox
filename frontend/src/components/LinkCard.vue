<script setup lang="ts">
import type { LinkModel } from '@/model/linkModel';

defineProps<{
  link: LinkModel;
}>();
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
    <template #footer></template>
  </Card>
</template>

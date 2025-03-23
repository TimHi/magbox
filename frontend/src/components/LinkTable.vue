<script setup lang="ts">
import type { LinkModel } from '@/model/linkModel';

defineProps<{
  links: LinkModel[];
}>();
function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
</script>
<template>
  <DataTable
    :value="links"
    table-style="min-width: 50rem"
    :striped-rows="true"
    paginator
    :rows="15"
    :rows-per-page-options="[15, 20, 25, 50]"
    size="small"
    :pt="{
      root: {
        'data-testid': 'link-table',
      },
    }"
  >
    <template #empty>
      <p class="text-xl">No links boxed yet</p>
    </template>
    <Column header="Preview" class="w-24 h-12">
      <template #body="slotProps">
        <img :src="`${slotProps.data.image}`" class="w-12 rounded">
      </template>
    </Column>
    <Column header="Title">
      <template #body="slotProps">
        <a class="underline decoration-green-400"
           :href="slotProps.data.link"
        >{{ slotProps.data.title }}
        </a>
      </template>
    </Column>
    <Column header="Category" class="h-12">
      <template #body="slotProps">
        <div class="flex flex-row gap-2">
          <div
            v-for="categorie in slotProps.data.expand.categorie"
            :key="categorie.id"
            class="flex"
          >
            <Chip
              :label="categorie.name"
              :style="{ backgroundColor: randomColor() }"
            />
          </div>
        </div>
      </template>
    </Column>
    <Column header="Actions">
      <template #body="slotProps">
        <a class="underline decoration-green-400"
           :href="slotProps.data.link"
        >{{ slotProps.data.title }}
        </a>
      </template>
    </Column>
  </DataTable>
</template>

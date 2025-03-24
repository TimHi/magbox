<script setup lang="ts">
import type { LinkModel } from '@/model/linkModel';
import { useDialog } from 'primevue';
import DeleteDialog, { type DeleteDialogData } from '@/components/dialog/DeleteDialog.vue';
import { useLinkStore } from '@/stores/links.ts';
import EditLinkDialog, { type EditLinkDialogData } from '@/components/dialog/EditLinkDialog.vue';

defineProps<{
  links: LinkModel[];
}>();

const dialog = useDialog();
//TODO_THL: as composable
const linkStore = useLinkStore();
function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function deleteLink(link: LinkModel) {
  const data: DeleteDialogData = {
    description: "Are you sure you want to delete this? This action cannot be undone.",
    deleteCallback: async () => {
      await linkStore.deleteLink(link);
      d.close();
    }
  }
  const d = dialog.open(DeleteDialog, {data, props: {
      header: `Delete Link: '${link.title}'`,
      style: {
        width: '50vw',
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      modal: true,
    }
  });
}

function editLink(link: LinkModel) {
  const data: EditLinkDialogData = {
    link,
    saveCallback: async () => {
      await linkStore.updateLink(link);
      d.close();
    }
  }
  const d = dialog.open(EditLinkDialog, {data, props: {
      header: 'Edit Link',
      style: {
        width: '50vw',
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      modal: true,
    }
  });
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
            v-for="category in slotProps.data.expand?.categorie"
            :key="category.id"
            class="flex"
          >
            <Chip
              :label="category.name"
              :style="{ backgroundColor: randomColor() }"
            />
          </div>
        </div>
      </template>
    </Column>
    <Column header="Actions">
      <template #body="slotProps">
        <div class="flex flex-row gap-4">
          <i class="pi pi-pencil" @click="editLink(slotProps.data)" :data-testid="`${slotProps.data.title}-edit-action-button`" />
          <i class="pi pi-trash text-red-500!" @click="deleteLink(slotProps.data)" :data-testid="`${slotProps.data.title}-delete-action-button`" />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import router from '../router';
import { useLinkStore } from '../stores/links';
import { PocketBaseService } from '../service/pocketBaseService';
import { DocumentPreview } from '../model/previewModel';
import { useTagStore } from '../stores/tags';
import type { TagModel } from '../model/TagModel';

const linkStore = useLinkStore();
const link = ref('');
const validUrl = ref(false);
const title = ref('');
const description = ref('');
const tag = ref('');
const inputVisible = ref(false);
let preview: DocumentPreview = new DocumentPreview('', '', '', '', [], '');
const pb = new PocketBaseService();
const tagStore = useTagStore();
const tagsInStore = ref<TagModel[]>([]);
const pickedTags = ref([] as TagModel[]);

onMounted(async () => {
  tagsInStore.value = await tagStore.getAllTags();
});

const showInput = () => {
  inputVisible.value = true;
};

const handleInputConfirm = async () => {
  if (tag.value) {
    await addNewTag();
  }
  inputVisible.value = false;
  tag.value = '';
};

async function validateURL(url: string) {
  validUrl.value = URL.canParse(url);

  if (!validUrl.value) {
    preview = new DocumentPreview('', '', '', '', [], '');
    return;
  }

  preview =
    (await getPreview(url)) ?? new DocumentPreview('', '', '', '', [], '');
}

async function submit() {
  const previewData = new DocumentPreview(
    preview.Icon,
    preview.Name,
    title.value,
    description.value,
    preview.Images,
    preview.Link,
  );
  const categorieIds = pickedTags.value.map((t) => t.id);
  linkStore
    .createLink(link.value, previewData, categorieIds)
    .then(() => {
      router.push('/');
    })
    .catch(() => console.error('Error creating link'));
}

async function getPreview(url: string) {
  return await pb.GetPreview(url).then((result) => {
    if (result !== undefined) {
      title.value = result.Title;
      description.value = result.Description;
    }
    return result;
  });
}

function removeFromPicked(picked: TagModel) {
  pickedTags.value = pickedTags.value.filter((t) => t.id !== picked.id);
}
function addToPicked(picked: TagModel) {
  const isInList = pickedTags.value.find((t) => t.id === picked.id);
  if (isInList === undefined) pickedTags.value.push(picked);
}

async function addNewTag() {
  if (tagStore.doesTagExist(tag.value)) {
    const tagFromList = tagsInStore.value.find(
      (t) => t.name.toLowerCase() === tag.value.toLowerCase(),
    );
    if (tagFromList === undefined)
      throw new Error('Tag is in store but not found in list');
    addToPicked(tagFromList);
  } else {
    const newTag = await tagStore.addTag(tag.value);
    if (newTag) pickedTags.value.push(newTag);
  }
  tag.value = '';
}

function getPickedTags() {
  return pickedTags.value;
}

const filteredTags = computed(() => {
  const pickedTags = getPickedTags().map((t) => t.id);
  return tagsInStore.value.filter((t) => !pickedTags.includes(t.id));
});
</script>

<template>
  <div class="flex flex-col justify-center">
    <p class="pt-2">Link</p>
    <Textarea
      v-model="link"
      data-testid="input-link"
      :fluid="true"
      rows="1"
      cols="30"
      :draggable="false"
      placeholder="https://de.wikipedia.org/wiki/Aale"
      @value-change="validateURL"
      style="resize: none"
    />
    <p class="text-l pt-2">Title</p>
    <Textarea
      v-model="title"
      data-testid="input-title"
      :fluid="true"
      rows="1"
      cols="30"
      :draggable="false"
      style="resize: none"
    />
    <p class="text-l pt-2">Description</p>
    <Textarea
      v-model="description"
      data-testid="input-desc"
      :fluid="true"
      rows="1"
      cols="30"
      :draggable="false"
      style="resize: none"
    />
    <p class="text-l pt-2">Picked Tags</p>
    <div class="tag-list pt-2" data-testid="li-picked-tags">
      <div class="tag" v-for="pTag in pickedTags" :key="pTag.id + '_picked'">
        <Chip :label="pTag.name" @click="removeFromPicked(pTag)" />
      </div>
      <div v-if="pickedTags.length === 0" class="pt-2">
        <p class="font-thin text-sm">No Tags selected</p>
      </div>
    </div>
    <Divider />

    <p class="text-l">Available Tags</p>
    <div class="flex flex-col">
      <div class="tag-list pt-2" data-testid="li-tags">
        <div
          class="tag"
          v-for="fTag in filteredTags"
          :key="fTag.id + '_available'"
        >
          <Chip :label="fTag.name" @click="addToPicked(fTag)" />
        </div>
      </div>
      <div v-if="inputVisible">
        <Textarea
          v-model="tag"
          data-testid="input-tag"
          :fluid="true"
          rows="1"
          cols="30"
          :draggable="false"
          style="resize: none"
          @blur="handleInputConfirm"
        />
      </div>

      <div v-else class="pt-2">
        <Button
          icon="pi pi-plus"
          data-testid="btn-new-tag"
          label="New Tag"
          @click="showInput"
          size="small"
          variant="filled"
        />
      </div>
    </div>
    <div v-if="validUrl">
      <Divider />

      <Button
        :pt="{ root: '!max-w-24 !min-w-24' }"
        icon="pi pi-check"
        :fluid="false"
        data-testid="btn-submit-link"
        label="Submit"
        @click="submit"
        size="small"
        variant="filled"
      />
    </div>
  </div>
</template>

<style>
.tag-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.tag {
  margin-right: 4px;
  margin-bottom: 4px;
  display: flex;
}
</style>

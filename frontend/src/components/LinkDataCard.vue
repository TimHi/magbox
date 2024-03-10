<script setup lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';
import type { LinkModel } from '../model/linkModel';
import { useLinkStore } from '../stores/links';
import EditButtons from './EditButtons.vue';

const props = defineProps({
  linkModel: Object as PropType<LinkModel>
});
const read = ref(props.linkModel?.read ?? false);
const isEditMode = ref(false);

const linkStore = useLinkStore();
const title = ref(props.linkModel?.title ?? '');
const description = ref(props.linkModel?.description ?? '');

function markLinkAsRead() {
  if (props.linkModel) {
    const link = props.linkModel;
    link.read = read.value;
    linkStore.updateLink(link);
  }
}
function saveChanges() {
  isEditMode.value = false;
  if (props.linkModel) {
    const link = props.linkModel;
    link.title = title.value;
    link.description = description.value;
    linkStore.updateLink(link);
  }
}

function editItem() {
  isEditMode.value = true;
}

function cancelEditing() {
  title.value = props.linkModel?.title ?? '';
  description.value = props.linkModel?.description ?? '';
  isEditMode.value = false;
}
function deleteItem() {
  if (props.linkModel?.id) {
    linkStore.removeLink(props.linkModel.id);
  }
}
</script>

<template>
  <el-card v-if="!isEditMode" class="box-card" data-testid="link-card">
    <div class="flex-column">
      <div class="cardHeader">
        <el-link
          class="text"
          :href="props.linkModel?.link"
          target="”_blank”"
          :data-testid="props.linkModel?.link"
        >
          <div v-if="linkModel?.image !== ''" class="image-slot">
            <el-image
              style="width: 64px; height: 64px"
              :src="props.linkModel?.image"
              fit="contain"
            ></el-image>
          </div>
          <div v-else class="image-slot">
            <el-image
              style="width: 64px; height: 64px"
              src="/Placeholder_view_vector.svg.png"
              fit="contain"
            ></el-image>
          </div>
          <div>
            <h6 class="text header">
              {{ linkModel?.title === '' ? linkModel.link : linkModel?.title }}
            </h6>
          </div>
        </el-link>
      </div>

      <div class="footer">
        <div>
          <span v-if="read" class="text readSection">Mark as unread</span>
          <span v-if="!read" class="text readSection">Mark as read</span>
          <el-switch
            v-model="read"
            @click="markLinkAsRead"
            class="ml-2 readSection"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          />
        </div>
        <EditButtons
          :linkModel="props.linkModel"
          :isEditMode="isEditMode"
          :saveChanges="saveChanges"
          :deleteItem="deleteItem"
          :cancelEditing="cancelEditing"
          :editItem="editItem"
        />
      </div>
    </div>
  </el-card>

  <el-card v-else class="box-card" data-testid="link-card-edit-mode">
    <div class="flex-column">
      <div class="cardHeader">
        <div v-if="linkModel?.image !== ''" class="image-slot">
          <el-image
            style="width: 64px; height: 64px"
            :src="props.linkModel?.image"
            fit="contain"
          ></el-image>
        </div>
        <div v-else class="image-slot">
          <el-image
            style="width: 64px; height: 64px"
            src="/Placeholder_view_vector.svg.png"
            fit="contain"
          ></el-image>
        </div>
        <el-input
          style="display: flex; max-height: 55px"
          v-model="title"
          data-testid="input-title"
        />
      </div>
    </div>
    <div class="footer">
      <div class="flex-row">
        <span v-if="read" class="text readSection">Mark as unread</span>
        <span v-if="!read" class="text readSection">Mark as read</span>
        <el-switch
          v-model="read"
          @click="markLinkAsRead"
          class="ml-2 readSection"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>
      <div class="margins">
        <EditButtons
          :linkModel="props.linkModel"
          :isEditMode="isEditMode"
          :saveChanges="saveChanges"
          :deleteItem="deleteItem"
          :cancelEditing="cancelEditing"
          :editItem="editItem"
        />
      </div>
    </div>
  </el-card>
</template>

<style>
@import '../assets/main.css';

.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.image-slot {
  margin-right: 6px;
}

.cardHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: flex-start;
  flex-wrap: nowrap;
}

.header {
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.description {
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.readSection {
  margin-right: 4px;
  overflow: hidden;
}

.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.icon {
  color: var(--color-text);
}

.box-card {
  --el-main-padding: 6px !important;
  --el-card-padding: 6px !important;
  width: 350px;
  background-color: var(--color-background-soft);
}
</style>

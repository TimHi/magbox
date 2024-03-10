<script setup lang="ts">
import type { PropType } from 'vue';
import type { LinkModel } from '../model/linkModel';

defineProps({
  linkModel: Object as PropType<LinkModel>,
  isEditMode: Boolean,
  saveChanges: Function,
  cancelEditing: Function,
  deleteItem: Function,
  editItem: Function
});
</script>
<template>
  <div class="edit-save-buttons">
    <el-icon
      v-if="!isEditMode"
      class="icon"
      color="white"
      @click="editItem"
      data-testid="btn-edit-item"
    >
      <Edit />
    </el-icon>
    <el-icon
      v-if="isEditMode"
      class="icon"
      color="white"
      @click="cancelEditing"
      data-testid="btn-cancel-edit"
    >
      <Close />
    </el-icon>
    <el-icon
      v-if="isEditMode"
      class="icon"
      color="white"
      @click="saveChanges"
      data-testid="btn-save-changes"
    >
      <Check />
    </el-icon>
    <el-icon color="white" class="icon" @click="deleteItem" data-testid="btn-delete-item">
      <Delete />
    </el-icon>
  </div>
</template>
<style>
.icon {
  cursor: pointer;
  margin: 4px;
}

.edit-save-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>

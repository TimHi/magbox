<script setup lang="ts">
import { PropType } from 'vue';
import { LinkModel } from '../model/linkModel';


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
        <el-icon v-if="!isEditMode" style="margin: 4px;" color="white" @click="editItem">
            <Edit />
        </el-icon>
        <el-icon v-if="isEditMode" style="margin: 4px;" color="white" @click="cancelEditing">
            <Close />
        </el-icon>
        <el-icon v-if="isEditMode" style="margin: 4px;" color="white" @click="saveChanges">
            <Check />
        </el-icon>
        <el-icon color="white" style="margin: 4px;" @click="deleteItem">
            <Delete />
        </el-icon>
    </div>
</template>
<style>
.edit-save-buttons {
    display: flex;
    flex-direction: row;
}
</style>
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
        <el-icon v-if="!isEditMode" class="icon" color="white" @click="editItem">
            <Edit />
        </el-icon>
        <el-icon v-if="isEditMode" class="icon" color="white" @click="cancelEditing">
            <Close />
        </el-icon>
        <el-icon v-if="isEditMode" class="icon" color="white" @click="saveChanges">
            <Check />
        </el-icon>
        <el-icon color="white" class="icon" @click="deleteItem">
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
}
</style>
<script setup lang="ts">
import { PropType, ref } from 'vue';
import { LinkModel } from '../model/linkModel';
import { useLinkStore } from '../stores/links';

const props = defineProps({
    linkModel: Object as PropType<LinkModel>,
});

const isEditMode = ref(false);
const linkStore = useLinkStore();

function saveChanges() {
    isEditMode.value = false;
}

function deleteItem() {
    if (props.linkModel?.id) {
        linkStore.removeLink(props.linkModel.id);
    }
}
</script>
<template>
    <div class="edit-save-buttons">
        <el-icon v-if="!isEditMode" style="margin: 4px;" color="white" @click="() => { isEditMode = true; }">
            <Edit />
        </el-icon>
        <el-icon v-if="isEditMode" style="margin: 4px;" color="white" @click="() => { isEditMode = false; }">
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
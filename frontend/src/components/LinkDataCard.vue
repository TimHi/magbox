<script setup lang="ts">
import { PropType } from 'vue';
import { LinkModel } from '../model/linkModel';
import { Picture as IconPicture } from '@element-plus/icons-vue'

const props = defineProps({
    linkModel: Object as PropType<LinkModel>,
});

</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <div class="image-slot">
                    <el-icon><icon-picture class="icon" style="width: 100px; height: 100px" /></el-icon>
                </div>
                <div class="header-slot">
                    <el-text class="text" tag="h1">Website Title</el-text>
                </div>
            </div>
        </template>
        <div class="text item"> <el-link class="text" :href="props.linkModel?.link">Link Title</el-link></div>
    </el-card>
</template>
<style>
.card-header {}

.icon {
    color: var(--color-text);
}

.text {
    font-size: 14px;
    color: var(--color-text);
}

.item {
    margin-bottom: 18px;
}

.box-card {

    display: flex;
    width: 480px;
    background-color: var(--color-background-soft);
}
</style>
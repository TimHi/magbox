<script setup lang="ts">
import { PropType, ref } from 'vue';
import { LinkModel } from '../model/linkModel';

const props = defineProps({
    linkModel: Object as PropType<LinkModel>,
});
const read = ref(props.linkModel?.read)

function deleteItem() {
    console.log("Delete:");
    console.log(props.linkModel?.id);
}

</script>

<template>
    <el-card class="box-card">
        <el-link class="text" :href="props.linkModel?.link" target=”_blank”>
            <div>
                <div v-if="linkModel?.image !== ''" class="image-slot">
                    <el-image :src="props.linkModel?.image" fit="scale-down"></el-image>
                </div>
                <div class="header-slot">
                    <h2>{{ linkModel?.title ?? "No Title found" }}</h2>
                    <el-divider v-if="linkModel?.description !== ''" />
                    <span class="text">{{ linkModel?.description ?? "No Description found" }}</span>
                </div>
            </div>
        </el-link>
        <el-divider />
        <div class="footer">
            <div>
                <span v-if="read" class="text readSection">Mark as unread</span>
                <span v-if="!read" class="text readSection">Mark as read</span>
                <el-switch v-model="read" class="ml-2 readSection"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
            </div>
            <el-icon color="white" @click="deleteItem">
                <Delete />
            </el-icon>
        </div>
    </el-card>
</template>

<style>
@import "../assets/main.css";

.readSection {
    margin-right: 4px;
}

.footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.icon {
    color: var(--color-text);
}

.box-card {
    min-width: 100px;
    max-width: 375px;
    background-color: var(--color-background-soft);
    margin: 4px;
}
</style>
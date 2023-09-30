<script setup lang="ts">
import { ref } from 'vue';
import type {
    PropType
} from 'vue';
import type { LinkModel } from '../model/linkModel';
import { useLinkStore } from '../stores/links';

const props = defineProps({
    linkModel: Object as PropType<LinkModel>,
});
const read = ref(props.linkModel?.read ?? false)
const linkStore = useLinkStore();
function deleteItem() {
    if (props.linkModel?.id) {
        linkStore.removeLink(props.linkModel.id);
    }
}

function markLinkAsRead() {
    if (props.linkModel) {
        const link = props.linkModel;
        link.read = read.value;
        linkStore.updateLink(link);
    }
}
</script>

<template>
    <el-card class="box-card" data-testid="link-card">
        <el-link class="text" :href="props.linkModel?.link" target=”_blank” :data-testid=props.linkModel?.link>
            <div>
                <div v-if="linkModel?.image !== ''" class="image-slot">
                    <el-image style="width: 300px; height: 100px" :src="props.linkModel?.image" fit="contain"></el-image>
                </div>
                <div v-else>
                    <el-image style="width: 100px; height: 100px" src="/Placeholder_view_vector.svg.png"
                        fit="contain"></el-image>
                </div>
                <div class="header-slot">
                    <h6 v-if="linkModel !== undefined" class="text header">{{ linkModel.title === "" ? linkModel.link :
                        linkModel.title }}</h6>
                    <el-divider v-if="linkModel?.description !== ''" />
                    <span class="text description">{{ linkModel?.description }}</span>
                </div>
            </div>
        </el-link>
        <el-divider />
        <div class="footer">
            <div>
                <span v-if="read" class="text readSection">Mark as unread</span>
                <span v-if="!read" class="text readSection">Mark as read</span>
                <el-switch v-model="read" @click="markLinkAsRead" class="ml-2 readSection"
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
    align-items: center;
}

.icon {
    color: var(--color-text);
}

.box-card {
    min-width: 100px;
    max-width: 375px;
    background-color: var(--color-background-soft);
    margin-right: 4px;
}
</style>
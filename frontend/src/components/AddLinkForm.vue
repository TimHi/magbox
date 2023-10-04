<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import router from '../router';
import { useLinkStore } from '../stores/links';
import { PocketBaseService } from '../service/pocketBaseService';
import { DocumentPreview } from '../model/previewModel';
import { useTagStore } from '../stores/tags';
import type { TagModel } from '../model/TagModel';
import { getRandomInt } from 'element-plus/es/utils/rand';
import { ElInput } from 'element-plus';
const linkStore = useLinkStore();
const link = ref('');
const validUrl = ref(false);
const title = ref('');
const description = ref('');
const tag = ref('');
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();
let preview: DocumentPreview = new DocumentPreview("", "", "", "", [], "");
const pb = new PocketBaseService();
const tagStore = useTagStore();
const tagsInStore = ref(tagStore.getAllTags);
const pickedTags = ref([] as TagModel[]);

tagStore.$subscribe((_, state) => {
    tagsInStore.value = state.tags;
});


const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

const handleInputConfirm = async () => {
    if (tag.value) {
        await addNewTag();
    }
    inputVisible.value = false
    tag.value = ''
}

async function validateURL(url: string) {
    try {
        new URL(url);
        validUrl.value = true;
        const result = await getPreview(url);
        result !== undefined ? preview = result : preview = new DocumentPreview("", "", "", "", [], "");
        return true;
    } catch (validationError) {
        validUrl.value = false;
        return false;
    }
}

async function submit() {
    const previewData = new DocumentPreview(preview.Icon, preview.Name, title.value, description.value, preview.Images, preview.Link)
    const categorieIds = pickedTags.value.map((t) => t.id);
    linkStore.addLink(link.value, previewData, categorieIds, false).then(() => {
        router.push('/');
    }).catch(() => console.log("Error creating link"));
}

async function getPreview(url: string) {
    const result = await pb.GetPreview(url).then((result) => {
        if (result !== undefined) {
            title.value = result.Title;
            description.value = result.Description;
        }
        return result;
    });
    return result;
}

function removeFromPicked(picked: TagModel) {
    const newList = pickedTags.value.filter((t) => t.id !== picked.id);
    pickedTags.value = newList;
}
function addToPicked(picked: TagModel) {
    const isInList = pickedTags.value.find((t) => t.id === picked.id);
    if (isInList === undefined)
        pickedTags.value.push(picked);
}

async function addNewTag() {
    if (tagStore.doesTagExist(tag.value)) {
        const tagFromList = tagsInStore.value.find((t) => t.name.toLowerCase() === tag.value.toLowerCase());
        if (tagFromList === undefined) throw new Error("Tag is in store but not found in list");
        addToPicked(tagFromList);
    } else {
        const newTag = await tagStore.addTag(tag.value);
        if (newTag) pickedTags.value.push(newTag);
    }
    tag.value = '';
}

function getPickedTags() { return pickedTags.value; }

const filteredTags = computed(() => {
    const pickedTags = getPickedTags().map((t) => t.id);
    return tagsInStore.value.filter((t) => !pickedTags.includes(t.id));
});

function getRandomType() {
    const type = getRandomInt(4);
    switch (type) {
        case 0: return "";
        case 1: return "success";
        case 2: return "info";
        case 3: return "warning";
        case 4: return "danger";
        default: return "danger";
    }
}
</script>

<template>
    <div class="form">
        <h1>Add new Link</h1>
        <el-text class="darkText" tag="h2">Link</el-text>
        <el-input v-model="link" placeholder="https://de.wikipedia.org/wiki/Aale" @input="validateURL"
            data-testid="input-link" />
        <el-text class="darkText" tag="h2">Title</el-text>
        <el-input v-model="title" data-testid="input-title" />
        <el-text class="darkText" tag="h2">Description</el-text>
        <el-input v-model="description" data-testid="input-desc" />
        <el-text class="darkText" tag="h2">Picked Tags</el-text>
        <div class="tag-list" data-testid="li-picked-tags">
            <div class="tag" v-for="(tag) in pickedTags" :key="tag.id + '_picked'">
                <el-tag class="ml-2" closable theme="dark" :type="getRandomType()" @close="removeFromPicked(tag)">{{
                    tag.name
                }}</el-tag>
            </div>
        </div>
        <el-divider />
        <el-text class="darkText" tag="h2">Available Tags</el-text>
        <div class="tag-list" data-testid="li-tags">
            <div class="tag" v-for="(tag) in filteredTags" :key="tag.id + '_available'">
                <el-tag class="mx-1" theme="dark" :type="getRandomType()" @click="addToPicked(tag)">{{ tag.name }}</el-tag>
            </div>
            <el-input v-if="inputVisible" ref="InputRef" v-model="tag" class="ml-1 w-20" size="small"
                @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput" data-testid="btn-new-tag">
                + New Tag
            </el-button>
        </div>
        <el-divider />
        <el-button v-if="validUrl" @click="submit" data-testid="btn-submit-link">Submit</el-button>
        <el-button class="button"><router-link to="/">Back</router-link> </el-button>
    </div>
</template>

<style>
.darkText {
    color: var(--color-heading);
}

.form {
    width: 400px;
    margin: auto;
    width: 50%;
}

.tag-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}

.tag {
    margin: 2px;
}
</style>
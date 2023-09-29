<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { useLinkStore } from '../stores/links';
import { PocketBaseService } from '../service/pocketBaseService';
import { DocumentPreview } from '../model/previewModel';
const linkStore = useLinkStore();
const link = ref('');
const validUrl = ref(false);
const title = ref('');
const description = ref('');
let preview: DocumentPreview = new DocumentPreview("", "", "", "", [], "");
const pb = new PocketBaseService();

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
    linkStore.addLink(link.value, previewData, false).then(() => {
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
</script>

<template>
    <div class="form">
        <h1>Add new Link</h1>
        <el-text class="darkText" tag="h2">Link</el-text>
        <el-input v-model="link" placeholder="https://de.wikipedia.org/wiki/Aale" @input="validateURL" />
        <el-text class="darkText" tag="h2">Title</el-text>
        <el-input v-model="title" />
        <el-text class="darkText" tag="h2">Description</el-text>
        <el-input v-model="description" />
        <el-divider />
        <el-button v-if="validUrl" @click="submit">Submit</el-button>
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

.button {}
</style>
<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { useLinkStore } from '../stores/links';
import { PocketBaseService } from '../service/pocketBaseService';
const linkStore = useLinkStore();
const link = ref('');
const validUrl = ref(false);
const pb = new PocketBaseService();
function validateURL(url: string) {
    try {
        new URL(url);
        validUrl.value = true;
        return true;
    } catch (validationError) {
        validUrl.value = false;
        return false;
    }
}

async function submit() {
    const preview = await getPreview(link.value);
    linkStore.addLink(link.value, preview, false).then(() => {
        router.push('/');
    }).catch(() => console.log("Error creating link"));
}

async function getPreview(url: string) {
    if (validateURL(url)) {
        return await pb.GetPreview(url);
    }
    return undefined;
}
</script>

<template>
    <div class="form">
        <h1>Add new Link</h1>
        <el-text class="darkText" tag="h2">Link</el-text>
        <el-input v-model="link" placeholder="https://de.wikipedia.org/wiki/Aale" @input="validateURL" />
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
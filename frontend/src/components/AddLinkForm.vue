<script setup lang="ts">
import { ref } from 'vue';
import { PocketBaseService } from '../service/pocketBaseService';
import router from '../router';

const pb = new PocketBaseService();
const link = ref('');
const validUrl = ref(false);

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
    console.log("Preview received");
    pb.CreateLink(link.value, preview, false).then(() => {
        console.log("Added link!");
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
        <el-text class="text" tag="h2">Link</el-text>
        <el-input v-model="link" placeholder="Please enter link" @input="validateURL" />
        <el-divider />
        <el-button v-if="validUrl" @click="submit">Submit</el-button>
        <el-button><router-link to="/">Back</router-link> </el-button>

    </div>
</template>

<style>
.form {
    width: 400px;
    margin: 4px;
}
</style>
<script setup lang="ts">
import { ref } from 'vue';
import { PocketBaseService } from '../service/pocketBaseService';
import router from '../router';

const pb = new PocketBaseService();
const title = ref('');
const link = ref('');
const desc = ref('');
function submit() {
    pb.CreateLink(link.value, desc.value, false).then(() => {
        router.push('/');
    }).catch(() => console.log("Error creating link"));
}
</script>

<template>
    <el-text class="text" tag="h1">Add new Link</el-text>
    <el-text class="text" tag="h2">Title</el-text>
    <el-input v-model="title" placeholder="Please enter title" />
    <el-text class="text" tag="h2">Link</el-text>
    <el-input v-model="link" placeholder="Please enter link" />
    <el-text class="text" tag="h2">Description</el-text>
    <el-input v-model="desc" :rows="2" type="textarea" placeholder="Please enter short description" />
    <el-button @click="submit">Submit</el-button>
</template>
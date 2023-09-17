<script setup lang="ts">
import LinkDataGrid from "../components/LinkDataGrid.vue";
import TopAppBar from "../components/TopAppBar.vue";



</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <TopAppBar />
            </el-header>
            <el-main>
                <LinkDataGrid />
                <el-button><router-link to="/add">Add Link</router-link></el-button>
            </el-main>
        </el-container>
    </div>
</template>
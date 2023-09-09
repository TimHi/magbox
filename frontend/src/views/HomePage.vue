<script setup lang="ts">
import LinkDataGrid from "../components/LinkDataGrid.vue";
import TopAppBar from "../components/TopAppBar.vue";
import { PocketBaseService } from "../service/pocketBaseService";

import { useUserStore } from "../stores/user";
const user = useUserStore();
const pb = new PocketBaseService();
user.setLoginStats(pb.IsUserLoggedIn());


</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <TopAppBar />
            </el-header>
            <el-main>
                <LinkDataGrid />
                <router-link to="/add">Add Link</router-link>
            </el-main>
        </el-container>
    </div>
</template>
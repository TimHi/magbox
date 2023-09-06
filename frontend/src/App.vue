<script setup lang="ts">
import LinkDataGrid from "./components/LinkDataGrid.vue";
import TopAppBar from "./components/TopAppBar.vue";
import { PocketBaseService } from "./service/pocketBaseService";

import { useUserStore } from "./stores/user";
const user = useUserStore();
const pb = new PocketBaseService();
user.setLoginStats(pb.IsUserLoggedIn());
</script>

<template>
  <TopAppBar />
  <LinkDataGrid />
</template>

<style></style>

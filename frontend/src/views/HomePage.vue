<script setup lang="ts">
import LinkDataGrid from '../components/LinkDataGrid.vue';
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div class="mainContent">
          <el-button data-testid="btn-add-link">
            <router-link to="/add">Add Link</router-link></el-button
          >
          <LinkDataGrid />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style>
.mainContent {
  margin: 12px;
}
</style>

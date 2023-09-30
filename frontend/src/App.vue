<script setup lang="ts">
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <router-view>

  </router-view>
  <FooterBar class="margins"></FooterBar>
</template>
 
<style>
.margins {
  margin-left: 100px;
  margin-bottom: 4px;
}
</style>
